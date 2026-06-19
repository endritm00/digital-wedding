import { logger } from '@/lib/logger'

// Minimal transactional email via Resend's REST API (no SDK dependency).
// Sending is best-effort: a failure is logged and returns false, never throws —
// publishing must not fail because an email bounced.

const RESEND_ENDPOINT = 'https://api.resend.com/emails'

interface SendOpts {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: SendOpts): Promise<boolean> {
  const key = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM ?? 'onboarding@resend.dev'

  if (!key) {
    logger.warn({ event: 'email.skipped_no_key', to })
    return false
  }

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to, subject, html }),
    })

    if (!res.ok) {
      const body = await res.text().catch(() => '')
      logger.error({ event: 'email.send_failed', to, status: res.status, body: body.slice(0, 300) })
      return false
    }

    logger.info({ event: 'email.sent', to, subject })
    return true
  } catch (err) {
    logger.error({ event: 'email.send_error', to, error: String(err) })
    return false
  }
}

// ── Templates ────────────────────────────────────────────────────────────────

const wrap = (inner: string) => `
  <div style="margin:0;padding:32px 16px;background:#F8F4EF;font-family:Helvetica,Arial,sans-serif;">
    <div style="max-width:480px;margin:0 auto;background:#FDFCF9;border:1px solid #ECE6DA;border-radius:18px;padding:36px 32px;">
      ${inner}
      <p style="margin:28px 0 0;font-size:11px;line-height:1.6;color:rgba(26,24,22,0.4);">
        Keep this link private — anyone with it can see your guest list. You can regenerate it anytime from the page.
      </p>
    </div>
  </div>
`

/** Email delivering the couple's private RSVP-management link. */
export function manageLinkEmail(opts: { coupleName?: string | null; link: string; inviteUrl?: string | null }): { subject: string; html: string } {
  const who = opts.coupleName?.trim() || 'there'
  const subject = 'Your private RSVP link'
  const inviteSection = opts.inviteUrl
    ? `
    <h2 style="margin:18px 0 8px;font-size:14px;font-weight:600;color:#1A1816;">View your invitation</h2>
    <p style="margin:0 0 12px;font-size:14px;line-height:1.5;color:rgba(26,24,22,0.7);">
      Your published invitation is live — share the public link with guests who should see it.
    </p>
    <a href="${opts.inviteUrl}" style="display:inline-block;background:#FDFCF9;color:#1A1816;border:1px solid #ECE6DA;text-decoration:none;font-size:14px;padding:10px 18px;border-radius:8px;margin-bottom:8px;">
      View invitation
    </a>
    <p style="margin:8px 0 0;font-size:12px;line-height:1.6;color:rgba(26,24,22,0.45);word-break:break-all;">
      Or paste this into your browser:<br/>${opts.inviteUrl}
    </p>
  `
    : ''

  const html = wrap(`
    <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#A8854B;">Your invitation is live</p>
    <h1 style="margin:0 0 16px;font-size:24px;font-weight:400;color:#1A1816;">Hi ${escapeHtml(who)},</h1>

    ${inviteSection}

    <p style="margin:0 0 20px;font-size:14px;line-height:1.7;color:rgba(26,24,22,0.7);">
      Here's your private link to see who's coming — no login needed. Bookmark it; we'll keep it updated as guests reply.
    </p>
    <a href="${opts.link}" style="display:inline-block;background:#1A1816;color:#FDFCF9;text-decoration:none;font-size:14px;padding:13px 26px;border-radius:999px;">
      See your RSVPs
    </a>
    <p style="margin:18px 0 0;font-size:12px;line-height:1.6;color:rgba(26,24,22,0.45);word-break:break-all;">
      Or paste this into your browser:<br/>${opts.link}
    </p>
  `)

  return { subject, html }
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string
  ))
}
