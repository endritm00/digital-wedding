import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'

// Minimal invite shape needed for access decisions.
// Route handlers get the full row back so they can work with it.
export interface InviteRow {
  id: string
  slug: string
  owner_id: string | null
  claim_token: string | null
  status: string
  theme_id: string | null
  plan_id: string | null
  draft_email: string | null
  display_title: string | null
  event_date: string | null
  venue_name: string | null
  venue_address: string | null
  additional_notes: string | null
  needs_review: boolean
  published_snapshot_id: string | null
  created_at: string
  updated_at: string
}

export type AccessVia = 'owner' | 'staff' | 'claim_token'

export type AccessResult =
  | { ok: true;  invite: InviteRow; via: AccessVia }
  | { ok: false; status: 401 | 403 | 404; message: string }

// Resolves whether the caller can access an invite and returns the row.
// Authenticated users go through RLS (owner or staff).
// Anonymous callers must supply a matching X-Claim-Token header
// and the invite must still be in draft status.
export async function resolveInviteAccess(
  inviteId: string,
  headers: Headers
): Promise<AccessResult> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    const { data, error } = await supabase
      .from('invites')
      .select('*')
      .eq('id', inviteId)
      .single()

    if (error || !data) return { ok: false, status: 404, message: 'invite_not_found' }

    const via: AccessVia = data.owner_id === user.id ? 'owner' : 'staff'
    return { ok: true, invite: data as InviteRow, via }
  }

  // Unauthenticated path — validate claim token
  const claimToken = headers.get('x-claim-token')
  if (!claimToken) return { ok: false, status: 401, message: 'unauthorized' }

  const service = createServiceClient()
  const { data, error } = await service
    .from('invites')
    .select('*')
    .eq('id', inviteId)
    .eq('claim_token', claimToken)
    .eq('status', 'draft')
    .single()

  if (error || !data) return { ok: false, status: 403, message: 'forbidden' }
  return { ok: true, invite: data as InviteRow, via: 'claim_token' }
}
