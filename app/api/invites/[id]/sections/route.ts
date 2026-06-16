import { NextRequest } from 'next/server'
import { z } from 'zod'
import { resolveInviteAccess } from '@/lib/invites/access'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import { ok, badRequest, serverError } from '@/lib/api/response'
import { logger } from '@/lib/logger'

const SECTION_TYPES = [
  'opening', 'story', 'schedule', 'venue', 'rsvp',
  'gallery', 'travel', 'gifts', 'countdown', 'dress_code', 'faq', 'custom',
] as const

const AddSectionSchema = z.object({
  type:   z.enum(SECTION_TYPES),
  config: z.record(z.unknown()).optional().default({}),
})

type Params = { params: Promise<{ id: string }> }

// GET /api/invites/:id/sections
export async function GET(request: NextRequest, { params }: Params) {
  const { id } = await params
  const result = await resolveInviteAccess(id, request.headers)
  if (!result.ok) return Response.json({ error: result.message }, { status: result.status })

  const db = result.via === 'claim_token' ? createServiceClient() : await createClient()

  const { data, error } = await db
    .from('invite_sections')
    .select('id, type, position, config, created_at, updated_at')
    .eq('invite_id', id)
    .order('position')

  if (error) return serverError()
  return ok(data)
}

// POST /api/invites/:id/sections
// Appends a new section at the end (max position + 1).
export async function POST(request: NextRequest, { params }: Params) {
  const { id } = await params
  const result = await resolveInviteAccess(id, request.headers)
  if (!result.ok) return Response.json({ error: result.message }, { status: result.status })

  if (['published', 'archived'].includes(result.invite.status)) {
    return badRequest('invite_not_editable')
  }

  let body: unknown
  try { body = await request.json() } catch { return badRequest('invalid_json') }

  const parsed = AddSectionSchema.safeParse(body)
  if (!parsed.success) return badRequest(parsed.error.issues[0].message)

  const db = result.via === 'claim_token' ? createServiceClient() : await createClient()

  // Get current max position to append at the end
  const { data: maxRow } = await db
    .from('invite_sections')
    .select('position')
    .eq('invite_id', id)
    .order('position', { ascending: false })
    .limit(1)
    .single()

  const position = (maxRow?.position ?? 0) + 1

  const { data, error } = await db
    .from('invite_sections')
    .insert({ invite_id: id, type: parsed.data.type, position, config: parsed.data.config })
    .select('id, type, position, config, created_at, updated_at')
    .single()

  if (error) {
    logger.error({ event: 'section.add.failed', invite_id: id, error: error.message })
    return serverError()
  }

  return ok(data, 201)
}
