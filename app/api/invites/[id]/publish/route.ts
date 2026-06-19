import { NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'
import { createServiceClient } from '@/lib/supabase/service'
import { resolveInviteWriteAccess } from '@/lib/invites/access'
import { renderSnapshot } from '@/lib/publish/render-snapshot'
import { purgeCloudflareCache } from '@/lib/publish/cdn-purge'
import { newManageToken, manageUrl } from '@/lib/invites/manage-token'
import { sendEmail, manageLinkEmail } from '@/lib/email'
import type { Json } from '@/lib/supabase/database.types'
import { ok, badRequest, serverError } from '@/lib/api/response'
import { logger } from '@/lib/logger'

type Params = { params: Promise<{ id: string }> }

// POST /api/invites/:id/publish
//
// Handles both first publish (paid → published) and re-publish
// (published → published, new snapshot version).
//
// Sequence:
//   1. Auth + ownership
//   2. Guard: invite must be paid or already published
//   3. Guard: no media assets still processing (would produce broken snapshot)
//   4. Render snapshot (parallel DB fetches + signed URL generation)
//   5. Write immutable published_snapshots row (version = max + 1)
//   6. Update invites.published_snapshot_id + status
//   7. Audit log
//   8. Purge Cloudflare CDN cache (fire-and-forget)
export async function POST(req: NextRequest, { params }: Params) {
  const { id } = await params

  // Login-free: the authenticated owner OR the anonymous draft's claim-token
  // holder publishing their own (already paid) invite.
  const access = await resolveInviteWriteAccess(id, req.headers)
  if (!access.ok) return Response.json({ error: access.message }, { status: access.status })
  const invite = access.invite
  const actorId = access.userId

  if (!['paid', 'published'].includes(invite.status)) {
    return badRequest('invite_must_be_paid_before_publishing')
  }
  if (!invite.plan_id) {
    return badRequest('no_plan_selected')
  }

  const service = createServiceClient()

  // Block publish if any media is still uploading/transcoding
  const { count: pendingMedia } = await service
    .from('media_assets')
    .select('*', { count: 'exact', head: true })
    .eq('invite_id', id)
    .in('status', ['uploading', 'processing'])

  if ((pendingMedia ?? 0) > 0) {
    return badRequest('media_assets_still_processing')
  }

  // Render snapshot — parallel fetches + signed URL generation for all assets
  let content: Awaited<ReturnType<typeof renderSnapshot>>
  try {
    content = await renderSnapshot(id)
  } catch (err) {
    logger.error({ event: 'publish.render.failed', invite_id: id, error: String(err) })
    return serverError('snapshot_render_failed')
  }

  // Next version number (first publish = 1)
  const { data: latest } = await service
    .from('published_snapshots')
    .select('version')
    .eq('invite_id', id)
    .order('version', { ascending: false })
    .limit(1)
    .maybeSingle()

  const nextVersion = (latest?.version ?? 0) + 1

  // Write immutable snapshot row
  const { data: snapshot, error: snapErr } = await service
    .from('published_snapshots')
    .insert({
      invite_id:    id,
      version:      nextVersion,
      content:      content as unknown as Json,
      published_by: actorId,
    })
    .select('id, version')
    .single()

  if (snapErr || !snapshot) {
    logger.error({ event: 'publish.snapshot_insert.failed', invite_id: id, error: snapErr?.message })
    return serverError()
  }

  // Mint the couple's private, login-free RSVP link on FIRST publish only —
  // kept stable across re-publishes (rotate via /api/manage/:token/rotate).
  const mintedManage = invite.manage_token_hash ? null : newManageToken()

  // Link invite to the new snapshot and flip status
  const { error: inviteErr } = await service
    .from('invites')
    .update({
      status:                'published',
      published_snapshot_id: snapshot.id,
      ...(mintedManage ? { manage_token_hash: mintedManage.hash } : {}),
    })
    .eq('id', id)

  if (inviteErr) {
    logger.error({ event: 'publish.invite_update.failed', invite_id: id, error: inviteErr.message })
    return serverError()
  }

  // Email the private RSVP link the first time it's created (best-effort — a
  // bounced email must never fail the publish).
  let manage_url: string | undefined
  if (mintedManage) {
    manage_url = manageUrl(mintedManage.token)
    if (invite.draft_email) {
      const { subject, html } = manageLinkEmail({ coupleName: invite.display_title, link: manage_url })
      void sendEmail({ to: invite.draft_email, subject, html })
    }
  }

  // Audit
  await service.from('audit_log').insert({
    actor_id:  actorId,
    action:    nextVersion === 1 ? 'invite.published' : 'invite.republished',
    entity:    'invites',
    entity_id: id,
    metadata:  { version: nextVersion, snapshot_id: snapshot.id },
  }).then(({ error }) => {
    if (error) logger.warn({ event: 'audit_log.insert.failed', error: error.message })
  })

  // Purge CDN cache (fire-and-forget — don't fail publish on purge error)
  const appUrl      = process.env.NEXT_PUBLIC_APP_URL!
  const deliveryUrl = `${appUrl}/api/snapshots/${invite.slug}`
  purgeCloudflareCache([deliveryUrl]).catch((err) =>
    logger.warn({ event: 'cdn_purge.error', invite_id: id, error: String(err) })
  )

  // Refresh the cached (ISR) guest page so a publish/re-publish shows immediately.
  try { revalidatePath(`/invite/${invite.slug}`); revalidatePath(`/invite/${id}`) } catch { /* noop */ }

  logger.info({
    event:       nextVersion === 1 ? 'invite.published' : 'invite.republished',
    invite_id:   id,
    slug:        invite.slug,
    version:     nextVersion,
    snapshot_id: snapshot.id,
  })

  return ok({
    slug:        invite.slug,
    version:     nextVersion,
    snapshot_id: snapshot.id,
    url:         deliveryUrl,
    manage_url,   // present only on first publish; show + store on the client
  })
}
