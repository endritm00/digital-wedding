import { NextRequest } from 'next/server'
import { resolveInviteAccess } from '@/lib/invites/access'
import { createServiceClient } from '@/lib/supabase/service'
import { ok, serverError } from '@/lib/api/response'

type Params = { params: Promise<{ id: string }> }

// GET /api/invites/:id/rsvps
// Owner or staff only. Returns the guest list without PII columns
// (email_enc / dietary_notes_enc remain null until Phase 7 wires up KMS).
export async function GET(request: NextRequest, { params }: Params) {
  const { id } = await params
  const result = await resolveInviteAccess(id, request.headers)
  if (!result.ok) return Response.json({ error: result.message }, { status: result.status })

  // Reject anonymous claim-token access — guest list is owner/staff only
  if (result.via === 'claim_token') {
    return Response.json({ error: 'forbidden' }, { status: 403 })
  }

  const service = createServiceClient()
  const { data, error } = await service
    .from('rsvps')
    .select('id, name, attending, guest_count, created_at')
    .eq('invite_id', id)
    .order('created_at', { ascending: false })

  if (error) return serverError()
  return ok(data ?? [])
}
