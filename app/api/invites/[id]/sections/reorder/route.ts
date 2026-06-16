import { NextRequest } from 'next/server'
import { z } from 'zod'
import { resolveInviteAccess } from '@/lib/invites/access'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import { ok, badRequest, serverError } from '@/lib/api/response'
import { logger } from '@/lib/logger'

const ReorderSchema = z.object({
  // Ordered array of section UUIDs — index 0 becomes position 1
  section_ids: z.array(z.string().uuid()).min(1),
})

type Params = { params: Promise<{ id: string }> }

// POST /api/invites/:id/sections/reorder
// Atomically reassigns positions via the reorder_sections RPC.
// The deferrable unique constraint on (invite_id, position) handles
// mid-loop duplicates within the single transaction.
export async function POST(request: NextRequest, { params }: Params) {
  const { id } = await params
  const result = await resolveInviteAccess(id, request.headers)
  if (!result.ok) return Response.json({ error: result.message }, { status: result.status })

  if (['published', 'archived'].includes(result.invite.status)) {
    return badRequest('invite_not_editable')
  }

  let body: unknown
  try { body = await request.json() } catch { return badRequest('invalid_json') }

  const parsed = ReorderSchema.safeParse(body)
  if (!parsed.success) return badRequest(parsed.error.issues[0].message)

  // RPC is SECURITY DEFINER and validates ownership internally.
  // For claim_token drafts, owner_id is null so auth.uid() won't match;
  // use service client and rely on the access check above.
  const db = result.via === 'claim_token' ? createServiceClient() : await createClient()

  const { error } = await db.rpc('reorder_sections', {
    p_invite_id:   id,
    p_section_ids: parsed.data.section_ids,
  })

  if (error) {
    if (error.message.includes('forbidden'))         return badRequest('forbidden')
    if (error.message.includes('section_ids_invalid')) return badRequest('section_ids_invalid')
    logger.error({ event: 'sections.reorder.failed', invite_id: id, error: error.message })
    return serverError()
  }

  return ok({ ok: true })
}
