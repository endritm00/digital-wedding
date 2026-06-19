import { NextRequest } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'
import { hashManageToken } from '@/lib/invites/manage-token'
import { ok, forbidden, serverError } from '@/lib/api/response'
import { limiters, rateLimitedResponse } from '@/lib/rate-limit'

type Params = { params: Promise<{ token: string }> }

// GET /api/manage/:token
// Login-free, capability-based: the unguessable token IS the credential.
// Returns the invite summary, headcount stats, and the guest list. PII columns
// (email/dietary) are encrypted-at-rest and intentionally not returned here.
export async function GET(request: NextRequest, { params }: Params) {
  const { token } = await params

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const limit = await limiters.draft(`manage:${ip}`)
  if (!limit.allowed) return rateLimitedResponse(limit)

  const service = createServiceClient()

  const { data: invite, error } = await service
    .from('invites')
    .select('id, slug, display_title, event_date, status')
    .eq('manage_token_hash', hashManageToken(token))
    .maybeSingle()

  if (error) return serverError()
  if (!invite) return forbidden()

  const { data: rsvps, error: rErr } = await service
    .from('rsvps')
    .select('id, name, attending, guest_count, created_at')
    .eq('invite_id', invite.id)
    .order('created_at', { ascending: false })

  if (rErr) return serverError()

  const rows = rsvps ?? []
  const attending_count = rows.filter((r) => r.attending).length
  const declined_count = rows.filter((r) => !r.attending).length
  const total_guests = rows
    .filter((r) => r.attending)
    .reduce((sum, r) => sum + (r.guest_count ?? 0), 0)

  return ok({
    invite: {
      slug: invite.slug,
      display_title: invite.display_title,
      event_date: invite.event_date,
      status: invite.status,
    },
    stats: {
      response_count: rows.length,
      attending_count,
      declined_count,
      total_guests,
    },
    rsvps: rows,
  })
}
