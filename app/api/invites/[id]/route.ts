import { NextRequest } from 'next/server'
import { z } from 'zod'
import { resolveInviteAccess } from '@/lib/invites/access'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import { ok, badRequest, serverError } from '@/lib/api/response'
import { logger } from '@/lib/logger'

const PatchSchema = z.object({
  theme_id:         z.string().uuid().optional(),
  plan_id:          z.string().uuid().optional(),
  draft_email:      z.string().email().optional(),
  display_title:    z.string().max(200).optional(),
  event_date:       z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'event_date must be YYYY-MM-DD').optional(),
  venue_name:       z.string().max(200).optional(),
  venue_address:    z.string().max(500).optional(),
  additional_notes: z.string().max(2000).optional(),
}).strict()

const SAFE_SELECT =
  'id, slug, status, theme_id, plan_id, draft_email, display_title, event_date, venue_name, venue_address, additional_notes, needs_review, published_snapshot_id, created_at, updated_at'

type Params = { params: Promise<{ id: string }> }

// GET /api/invites/:id
export async function GET(request: NextRequest, { params }: Params) {
  const { id } = await params
  const result = await resolveInviteAccess(id, request.headers)
  if (!result.ok) return Response.json({ error: result.message }, { status: result.status })

  // Strip claim_token — caller already holds it; don't re-expose it in GET responses
  const { claim_token: _ct, ...invite } = result.invite
  return ok(invite)
}

// PATCH /api/invites/:id
export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params
  const result = await resolveInviteAccess(id, request.headers)
  if (!result.ok) return Response.json({ error: result.message }, { status: result.status })

  if (['published', 'archived'].includes(result.invite.status)) {
    return badRequest('invite_not_editable')
  }

  let body: unknown
  try { body = await request.json() } catch { return badRequest('invalid_json') }

  const parsed = PatchSchema.safeParse(body)
  if (!parsed.success) return badRequest(parsed.error.issues[0].message)
  if (Object.keys(parsed.data).length === 0) return badRequest('no_fields_provided')

  const db = result.via === 'claim_token' ? createServiceClient() : await createClient()

  // Stamp the first time a draft_email is saved so the abandon-reminder cron
  // knows when to fire. Resets if they clear and re-enter their email.
  const updates: Record<string, unknown> = { ...parsed.data }
  if (parsed.data.draft_email && !result.invite.draft_email) {
    updates.draft_email_saved_at = new Date().toISOString()
  }

  const { data, error } = await db
    .from('invites')
    .update(updates as any)
    .eq('id', id)
    .select(SAFE_SELECT)
    .single()

  if (error) {
    logger.error({ event: 'invite.patch.failed', invite_id: id, error: error.message })
    return serverError()
  }

  return ok(data)
}
