import { NextRequest } from 'next/server'
import { resolveInviteAccess } from '@/lib/invites/access'
import { createServiceClient } from '@/lib/supabase/service'
import { ok, serverError } from '@/lib/api/response'

type Params = { params: Promise<{ id: string }> }

// GET /api/invites/:id/rsvps/stats
// Returns confirmed/declined counts and total expected guest headcount.
// Aggregation is done in TypeScript — typical guest lists are ≤500 rows.
// Phase 7: promote to a Postgres view if list sizes grow.
export async function GET(request: NextRequest, { params }: Params) {
  const { id } = await params
  const result = await resolveInviteAccess(id, request.headers)
  if (!result.ok) return Response.json({ error: result.message }, { status: result.status })

  if (result.via === 'claim_token') {
    return Response.json({ error: 'forbidden' }, { status: 403 })
  }

  const service = createServiceClient()
  const { data: rsvps, error } = await service
    .from('rsvps')
    .select('attending, guest_count')
    .eq('invite_id', id)

  if (error) return serverError()

  const rows = rsvps ?? []

  const attending_count  = rows.filter((r) => r.attending).length
  const declined_count   = rows.filter((r) => !r.attending).length
  const total_guests     = rows
    .filter((r) => r.attending)
    .reduce((sum, r) => sum + (r.guest_count ?? 0), 0)

  return ok({
    response_count:  rows.length,
    attending_count,
    declined_count,
    total_guests,
  })
}
