import { NextRequest } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'
import { hashManageToken, newManageToken, manageUrl } from '@/lib/invites/manage-token'
import { sendEmail, manageLinkEmail } from '@/lib/email'
import { ok, forbidden, serverError } from '@/lib/api/response'
import { limiters, rateLimitedResponse } from '@/lib/rate-limit'
import { logger } from '@/lib/logger'

type Params = { params: Promise<{ token: string }> }

// POST /api/manage/:token/rotate
// "Regenerate link" — invalidates the current token and issues a new one,
// re-emailing it to the couple. Use this if the old link leaks. The caller must
// prove they hold the *current* token (capability), so no login is required.
export async function POST(request: NextRequest, { params }: Params) {
  const { token } = await params

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const limit = await limiters.draft(`manage-rotate:${ip}`)
  if (!limit.allowed) return rateLimitedResponse(limit)

  const service = createServiceClient()

  const { data: invite, error } = await service
    .from('invites')
    .select('id, draft_email, display_title, slug, status')
    .eq('manage_token_hash', hashManageToken(token))
    .maybeSingle()

  if (error) return serverError()
  if (!invite) return forbidden()

  const next = newManageToken()
  const { error: updErr } = await service
    .from('invites')
    .update({ manage_token_hash: next.hash })
    .eq('id', invite.id)

  if (updErr) {
    logger.error({ event: 'manage.rotate.failed', invite_id: invite.id, error: updErr.message })
    return serverError()
  }

  const link = manageUrl(next.token)
  const appUrl = process.env.NEXT_PUBLIC_APP_URL
  const inviteUrl = invite?.status === 'published' && invite?.slug && appUrl ? `${appUrl}/invite/${invite.slug}` : null

  if (invite.draft_email) {
    const { subject, html } = manageLinkEmail({ coupleName: invite.display_title, link, inviteUrl })
    void sendEmail({ to: invite.draft_email, subject, html })
  }

  logger.info({ event: 'manage.rotated', invite_id: invite.id })

  // Return the raw token once so the page can update its URL + localStorage.
  return ok({ token: next.token, manage_url: link })
}
