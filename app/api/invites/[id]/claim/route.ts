import { NextRequest } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { ok, badRequest, unauthorized, serverError } from '@/lib/api/response'
import { logger } from '@/lib/logger'

const ClaimSchema = z.object({
  claim_token: z.string().uuid(),
})

type Params = { params: Promise<{ id: string }> }

// POST /api/invites/:id/claim
// Called after magic-link auth completes to link an anonymous draft to the user's account.
// The client supplies the claim_token it stored during anonymous draft creation.
export async function POST(request: NextRequest, { params }: Params) {
  const { id } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return unauthorized()

  let body: unknown
  try { body = await request.json() } catch { return badRequest('invalid_json') }

  const parsed = ClaimSchema.safeParse(body)
  if (!parsed.success) return badRequest(parsed.error.issues[0].message)

  const { data, error } = await supabase.rpc('claim_invite_draft', {
    p_claim_token: parsed.data.claim_token,
    p_owner_id: user.id,
  })

  if (error) {
    if (error.message.includes('claim_token_invalid')) return badRequest('claim_token_invalid_or_expired')
    if (error.message.includes('forbidden')) return badRequest('forbidden')
    logger.error({ event: 'invite.claim.failed', invite_id: id, user_id: user.id, error: error.message })
    return serverError()
  }

  return ok({ invite_id: data })
}
