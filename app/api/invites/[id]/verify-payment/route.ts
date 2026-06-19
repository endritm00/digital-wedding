import { NextRequest } from 'next/server'
import { z } from 'zod'
import { createServiceClient } from '@/lib/supabase/service'
import { resolveInviteWriteAccess } from '@/lib/invites/access'
import { stripe } from '@/lib/stripe'
import { ok, badRequest, notFound } from '@/lib/api/response'
import { logger } from '@/lib/logger'

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

  // Owner OR the anonymous draft's claim-token holder — confirms the caller
  // controls this invite before exposing its order (closes the IDOR gap).
  const access = await resolveInviteWriteAccess(id, request.headers)
  if (!access.ok) return Response.json({ error: access.message }, { status: access.status })

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
    .select('id, status, amount_cents, currency, paid_at')
    .eq('invite_id', id)
    .eq('stripe_session_id', parsed.data.session_id)
    .single()

  if (!order) return notFound('order_not_found')

  // The webhook (checkout.session.completed) is the primary path that flips an
  // order to 'paid'. But it can be delayed, and in local dev Stripe can't reach
  // localhost at all — so the buyer would be stuck on "confirming payment". The
  // success redirect carries the session_id, so when the order is still pending
  // we authoritatively ask Stripe whether THIS session was paid and reconcile.
  // (This is Stripe's recommended pattern for the redirect/success path; the
  // webhook remains the reliable async backstop. Both writes are idempotent.)
  if (order.status === 'pending') {
    try {
      const session = await stripe.checkout.sessions.retrieve(parsed.data.session_id)
      if (session.payment_status === 'paid') {
        const paidAt = new Date().toISOString()
        await service
          .from('orders')
          .update({
            status:                'paid',
            paid_at:               paidAt,
            stripe_payment_intent: (session.payment_intent as string) ?? null,
          })
          .eq('id', order.id)
          .eq('status', 'pending')   // don't clobber a concurrent webhook update

        // Flip the invite draft → paid so the success page can publish it.
        await service
          .from('invites')
          .update({ status: 'paid' })
          .eq('id', id)
          .eq('status', 'draft')

        logger.info({ event: 'verify_payment.reconciled', invite_id: id, session_id: parsed.data.session_id })

        return ok({
          status:       'paid',
          amount_cents: order.amount_cents,
          currency:     order.currency,
          paid_at:      paidAt,
        })
      }
    } catch (err) {
      // Stripe lookup failed — fall through and report the stored status so the
      // client keeps polling (the webhook may still resolve it).
      logger.warn({ event: 'verify_payment.stripe_retrieve_failed', invite_id: id, error: String(err) })
    }
  }

  return ok({
    status:       order.status,           // 'pending' | 'paid' | 'failed' | 'expired'
    amount_cents: order.amount_cents,
    currency:     order.currency,
    paid_at:      order.paid_at ?? null,
  })
}
