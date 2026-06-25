import { NextRequest } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'
import { sendEmail, abandonedDraftEmail } from '@/lib/email'
import { logger } from '@/lib/logger'

// GET /api/cron/abandon-reminder
//
// Called every 15 minutes by Vercel Cron. Finds draft invites where:
//   - a draft_email was saved 25+ minutes ago (25 not 30 to absorb cron drift)
//   - status is still 'draft' (not paid / published)
//   - reminder has not been sent yet
//
// Sends one reminder email per invite then marks abandon_reminder_sent = true.
// Capped at 50 per run to stay within function time limits.
//
// Secured with CRON_SECRET — Vercel injects Authorization: Bearer <secret>
// automatically for cron invocations. Set the same secret as an env var.
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (secret) {
    const auth = request.headers.get('authorization')
    if (auth !== `Bearer ${secret}`) {
      return new Response('unauthorized', { status: 401 })
    }
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL
  if (!appUrl) {
    logger.error({ event: 'cron.abandon_reminder.no_app_url' })
    return new Response('missing_app_url', { status: 500 })
  }

  const service = createServiceClient()

  // 25-min lower bound absorbs scheduling jitter; 48-hour upper bound stops
  // pestering someone who started a draft days ago.
  const minAge = new Date(Date.now() - 25 * 60 * 1000).toISOString()
  const maxAge = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()

  type DraftRow = {
    id: string
    draft_email: string
    display_title: string | null
  }

  const { data: drafts, error } = await (service
    .from('invites')
    .select('id, draft_email, display_title')
    .eq('status', 'draft')
    .eq('abandon_reminder_sent' as any, false)
    .not('draft_email', 'is', null)
    .lte('draft_email_saved_at' as any, minAge)
    .gte('draft_email_saved_at' as any, maxAge)
    .limit(50)) as unknown as { data: DraftRow[] | null; error: unknown }

  if (error) {
    logger.error({ event: 'cron.abandon_reminder.query_failed', error: String(error) })
    return new Response('query_failed', { status: 500 })
  }

  const rows = drafts ?? []
  let sent = 0
  let failed = 0

  for (const draft of rows) {
    const resumeUrl = `${appUrl}/builder/${draft.id}/review`
    const { subject, html } = abandonedDraftEmail({
      coupleName: draft.display_title,
      resumeUrl,
    })

    const ok = await sendEmail({ to: draft.draft_email, subject, html })

    // Mark sent regardless of email result so we don't retry on a bad address.
    await service
      .from('invites')
      .update({ abandon_reminder_sent: true } as any)
      .eq('id', draft.id)

    if (ok) {
      sent++
      logger.info({ event: 'cron.abandon_reminder.sent', invite_id: draft.id })
    } else {
      failed++
      logger.warn({ event: 'cron.abandon_reminder.email_failed', invite_id: draft.id })
    }
  }

  logger.info({ event: 'cron.abandon_reminder.done', sent, failed, total: rows.length })
  return Response.json({ sent, failed, total: rows.length })
}
