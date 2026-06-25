import { NextRequest } from 'next/server'
import { resolveInviteAccess } from '@/lib/invites/access'
import { buildQuote } from '@/lib/invites/quote'
import { ok, badRequest, serverError } from '@/lib/api/response'
import { detectCurrency, convertCents } from '@/lib/currency'

type Params = { params: Promise<{ id: string }> }

// GET /api/invites/:id/quote
// Returns a live server-side price breakdown for the current draft config.
// Currency is detected from the Vercel IP-country header: Americas → USD,
// everywhere else → EUR. The checkout route applies the same logic so the
// displayed price always matches what Stripe charges.
export async function GET(request: NextRequest, { params }: Params) {
  const { id } = await params
  const result = await resolveInviteAccess(id, request.headers)
  if (!result.ok) return Response.json({ error: result.message }, { status: result.status })

  const quote = await buildQuote(id, { useServiceClient: result.via === 'claim_token' })

  if ('error' in quote) return badRequest(quote.error)
  if (!quote) return serverError()

  const currency = detectCurrency(request.headers.get('x-vercel-ip-country'))

  return ok({
    amount_cents: convertCents(quote.amount_cents, currency),
    line_items: quote.line_items.map((li) => ({
      ...li,
      amount_cents: convertCents(li.amount_cents, currency),
    })),
    currency,
  })
}
