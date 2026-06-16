import { NextRequest } from 'next/server'
import { z } from 'zod'
import { resolveInviteAccess } from '@/lib/invites/access'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import { ok, badRequest, serverError } from '@/lib/api/response'
import { logger } from '@/lib/logger'

const AddExtraSchema = z.object({
  extra_id: z.string().uuid(),
  quantity: z.number().int().min(1).default(1),
})

type Params = { params: Promise<{ id: string }> }

// GET /api/invites/:id/extras
export async function GET(request: NextRequest, { params }: Params) {
  const { id } = await params
  const result = await resolveInviteAccess(id, request.headers)
  if (!result.ok) return Response.json({ error: result.message }, { status: result.status })

  const db = result.via === 'claim_token' ? createServiceClient() : await createClient()

  const { data, error } = await db
    .from('invite_extras')
    .select('id, extra_id, quantity, unit_price_cents, created_at, extras(code, name)')
    .eq('invite_id', id)

  if (error) return serverError()
  return ok(data)
}

// POST /api/invites/:id/extras
// Snapshots the current catalog price into unit_price_cents at add time.
export async function POST(request: NextRequest, { params }: Params) {
  const { id } = await params
  const result = await resolveInviteAccess(id, request.headers)
  if (!result.ok) return Response.json({ error: result.message }, { status: result.status })

  if (['published', 'archived'].includes(result.invite.status)) {
    return badRequest('invite_not_editable')
  }

  let body: unknown
  try { body = await request.json() } catch { return badRequest('invalid_json') }

  const parsed = AddExtraSchema.safeParse(body)
  if (!parsed.success) return badRequest(parsed.error.issues[0].message)

  const db = result.via === 'claim_token' ? createServiceClient() : await createClient()

  // Read current catalog price — this becomes the immutable snapshot
  const { data: extra, error: extraErr } = await db
    .from('extras')
    .select('price_cents, active')
    .eq('id', parsed.data.extra_id)
    .single()

  if (extraErr || !extra) return badRequest('extra_not_found')
  if (!extra.active) return badRequest('extra_not_available')

  const { data, error } = await db
    .from('invite_extras')
    .upsert(
      {
        invite_id:        id,
        extra_id:         parsed.data.extra_id,
        quantity:         parsed.data.quantity,
        unit_price_cents: extra.price_cents,
      },
      { onConflict: 'invite_id,extra_id' }
    )
    .select('id, extra_id, quantity, unit_price_cents')
    .single()

  if (error) {
    logger.error({ event: 'extra.add.failed', invite_id: id, error: error.message })
    return serverError()
  }

  return ok(data, 201)
}
