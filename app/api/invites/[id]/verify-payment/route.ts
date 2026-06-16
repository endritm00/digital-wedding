import { NextRequest } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import { ok, badRequest, unauthorized, notFound } from '@/lib/api/response'

const QuerySchema = z.object({
  session_id: z.string().min(1),
})

type Params = { params: Promise<{ id: string }> }

// GET /api/invites/:id/verify-payment?session_id=cs_...
//
// Called by the success page to confirm payment status.
// The webhook may not have fired yet when Stripe redirects the buyer,
// so the client polls this until it gets status 'paid' or 'failed'.
export async function GET(request: NextRequest, { params }: Params) {
  const { id } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return unauthorized()

  const parsed = QuerySchema.safeParse(
    Object.fromEntries(new URL(request.url).searchParams)
  )
  if (!parsed.success) return badRequest(parsed.error.issues[0].message)

  // Use service client — RLS on orders only allows buyers to read via their
  // invite ownership, which requires the invite to already be 'paid'. During
  // the window between redirect and webhook, status is still 'draft', so RLS
  // would block a regular client read.
  const service = createServiceClient()

  const { data: order } = await service
    .from('orders')
    .select('status, amount_cents, currency, paid_at')
    .eq('invite_id', id)
    .eq('stripe_session_id', parsed.data.session_id)
    .single()

  if (!order) return notFound('order_not_found')

  return ok({
    status:       order.status,           // 'pending' | 'paid' | 'failed' | 'expired'
    amount_cents: order.amount_cents,
    currency:     order.currency,
    paid_at:      order.paid_at ?? null,
  })
}
