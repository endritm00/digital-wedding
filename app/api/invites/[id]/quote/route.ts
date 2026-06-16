import { NextRequest } from 'next/server'
import { resolveInviteAccess } from '@/lib/invites/access'
import { buildQuote } from '@/lib/invites/quote'
import { ok, badRequest, serverError } from '@/lib/api/response'

type Params = { params: Promise<{ id: string }> }

// GET /api/invites/:id/quote
// Returns a live server-side price breakdown for the current draft config.
// The client displays this as the running total; the create-payment edge
// function recomputes independently before creating the Stripe session.
export async function GET(request: NextRequest, { params }: Params) {
  const { id } = await params
  const result = await resolveInviteAccess(id, request.headers)
  if (!result.ok) return Response.json({ error: result.message }, { status: result.status })

  const quote = await buildQuote(id, { useServiceClient: result.via === 'claim_token' })

  if ('error' in quote) return badRequest(quote.error)
  if (!quote) return serverError()

  return ok({ ...quote, currency: 'eur' })
}
