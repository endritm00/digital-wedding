import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import { renderSnapshot } from '@/lib/publish/render-snapshot'
import { purgeCloudflareCache } from '@/lib/publish/cdn-purge'
import type { Json } from '@/lib/supabase/database.types'
import { ok, badRequest, unauthorized, notFound, serverError } from '@/lib/api/response'
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
export async function POST(_req: NextRequest, { params }: Params) {
  const { id } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return unauthorized()

  // Fetch invite through RLS — confirms ownership or staff access
  const { data: invite } = await supabase
    .from('invites')
    .select('id, status, slug, plan_id')
    .eq('id', id)
    .single()

  if (!invite) return notFound('invite_not_found')

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
      published_by: user.id,
    })
    .select('id, version')
    .single()

  if (snapErr || !snapshot) {
    logger.error({ event: 'publish.snapshot_insert.failed', invite_id: id, error: snapErr?.message })
    return serverError()
  }

  // Link invite to the new snapshot and flip status
  const { error: inviteErr } = await service
    .from('invites')
    .update({
      status:                'published',
      published_snapshot_id: snapshot.id,
    })
    .eq('id', id)

  if (inviteErr) {
    logger.error({ event: 'publish.invite_update.failed', invite_id: id, error: inviteErr.message })
    return serverError()
  }

  // Audit
  await service.from('audit_log').insert({
    actor_id:  user.id,
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
  })
}
