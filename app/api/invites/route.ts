import { NextRequest } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import { ok, badRequest, serverError } from '@/lib/api/response'
import { limiters, rateLimitedResponse } from '@/lib/rate-limit'
import { logger } from '@/lib/logger'

const CreateSchema = z.object({
  theme_id:    z.string().uuid().optional(),
  plan_id:     z.string().uuid().optional(),
  draft_email: z.string().email().optional(),
})

// POST /api/invites
// Auth optional. Authenticated → owner_id set. Anonymous → claim_token returned.
export async function POST(request: NextRequest) {
  const ip        = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const draftLimit = await limiters.draft(`draft:${ip}`)
  if (!draftLimit.allowed) return rateLimitedResponse(draftLimit)

  let body: unknown
  try { body = await request.json() } catch { body = {} }

  const parsed = CreateSchema.safeParse(body)
  if (!parsed.success) return badRequest(parsed.error.issues[0].message)
  const { theme_id, plan_id, draft_email } = parsed.data

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    const { data, error } = await supabase
      .from('invites')
      .insert({ owner_id: user.id, theme_id, plan_id, draft_email })
      .select('id, slug')
      .single()

    if (error) {
      logger.error({ event: 'invite.create.failed', user_id: user.id, error: error.message })
      return serverError()
    }
    return ok(data, 201)
  }

  // Anonymous draft — service client (RLS blocks anon inserts)
  const claim_token = crypto.randomUUID()
  const { data, error } = await createServiceClient()
    .from('invites')
    .insert({ claim_token, theme_id, plan_id, draft_email })
    .select('id, slug')
    .single()

  if (error) {
    logger.error({ event: 'invite.create_anon.failed', error: error.message })
    return serverError()
  }

  // claim_token is returned once — client must store it (localStorage / httpOnly cookie)
  return ok({ ...data, claim_token }, 201)
}
