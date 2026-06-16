import { NextRequest } from 'next/server'
import { z } from 'zod'
import { resolveInviteAccess } from '@/lib/invites/access'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import type { Json } from '@/lib/supabase/database.types'
import { ok, badRequest, notFound, serverError } from '@/lib/api/response'
import { logger } from '@/lib/logger'

const PatchSectionSchema = z.object({
  config: z.record(z.unknown()),
}).strict()

type Params = { params: Promise<{ id: string; sectionId: string }> }

// PATCH /api/invites/:id/sections/:sectionId
export async function PATCH(request: NextRequest, { params }: Params) {
  const { id, sectionId } = await params
  const result = await resolveInviteAccess(id, request.headers)
  if (!result.ok) return Response.json({ error: result.message }, { status: result.status })

  if (['published', 'archived'].includes(result.invite.status)) {
    return badRequest('invite_not_editable')
  }

  let body: unknown
  try { body = await request.json() } catch { return badRequest('invalid_json') }

  const parsed = PatchSectionSchema.safeParse(body)
  if (!parsed.success) return badRequest(parsed.error.issues[0].message)

  const db = result.via === 'claim_token' ? createServiceClient() : await createClient()

  const { data, error } = await db
    .from('invite_sections')
    .update({ config: parsed.data.config as Json })
    .eq('id', sectionId)
    .eq('invite_id', id)   // prevents cross-invite writes
    .select('id, type, position, config, updated_at')
    .single()

  if (error) {
    logger.error({ event: 'section.patch.failed', section_id: sectionId, error: error.message })
    return serverError()
  }
  if (!data) return notFound('section_not_found')

  return ok(data)
}

// DELETE /api/invites/:id/sections/:sectionId
export async function DELETE(request: NextRequest, { params }: Params) {
  const { id, sectionId } = await params
  const result = await resolveInviteAccess(id, request.headers)
  if (!result.ok) return Response.json({ error: result.message }, { status: result.status })

  if (['published', 'archived'].includes(result.invite.status)) {
    return badRequest('invite_not_editable')
  }

  const db = result.via === 'claim_token' ? createServiceClient() : await createClient()

  const { error, count } = await db
    .from('invite_sections')
    .delete({ count: 'exact' })
    .eq('id', sectionId)
    .eq('invite_id', id)

  if (error) {
    logger.error({ event: 'section.delete.failed', section_id: sectionId, error: error.message })
    return serverError()
  }
  if (count === 0) return notFound('section_not_found')

  return new Response(null, { status: 204 })
}
