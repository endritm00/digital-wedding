import { NextRequest } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'
import { resolveInviteWriteAccess } from '@/lib/invites/access'
import { buildQuote } from '@/lib/invites/quote'
import { stripe } from '@/lib/stripe'
import { ok, badRequest, serverError } from '@/lib/api/response'
import { limiters, rateLimitedResponse } from '@/lib/rate-limit'
import { logger } from '@/lib/logger'
import { detectCurrency, convertCents } from '@/lib/currency'

type Params = { params: Promise<{ id: string }> }

// POST /api/invites/:id/checkout
//
// Idempotency strategy (three layers):
//   1. Before calling Stripe: check for a recent pending order at the same
//      price (within 30 min). If found, return the stored checkout_url.
//      Handles double-clicks, page-refresh, and browser-back.
//   2. Stripe idempotency key `checkout_${id}_${amount_cents}`:
//      same invite + same price returns the same Stripe session within 24h.
//   3. Unique constraint on orders.stripe_session_id: if a concurrent request
//      slips past layer 1 and Stripe returns the same session, the DB insert
//      conflicts — we catch that and return the existing order's URL.
export async function POST(request: NextRequest, { params }: Params) {
  const { id } = await params

  // Login-free: the authenticated owner OR the anonymous draft's claim-token holder.
  const access = await resolveInviteWriteAccess(id, request.headers)
  if (!access.ok) return Response.json({ error: access.message }, { status: access.status })
  const invite = access.invite

  // 5 checkout attempts per buyer per 10 min (keyed by account, or by invite for anon)
  const checkoutLimit = await limiters.checkout(`checkout:${access.userId ?? id}`)
  if (!checkoutLimit.allowed) return rateLimitedResponse(checkoutLimit)

  if (invite.status === 'paid')    return badRequest('invite_already_paid')
  if (invite.status !== 'draft')   return badRequest('invite_not_checkoutable')
  if (!invite.plan_id)             return badRequest('no_plan_selected')

  // Require the buyer's email up front (collected on the review step if missing),
  // so we can email the manage link after payment.
  const buyerEmail = invite.draft_email ?? ''
  if (!buyerEmail) return badRequest('email_required')

  // Server-side price — the client total is never trusted. Anonymous (login-free)
  // buyers reach here via their claim token, so the price must be computed with
  // the service client; the RLS server client would read nothing as an anon user.
  const quote = await buildQuote(id, { useServiceClient: access.via === 'claim_token' })
  if ('error' in quote) return badRequest(quote.error)

  // Detect buyer's currency from Vercel's IP-country header (same logic as the
  // quote route so the displayed price always matches what Stripe charges).
  const currency = detectCurrency(request.headers.get('x-vercel-ip-country'))
  const totalCents = convertCents(quote.amount_cents, currency)
  const lineItems = quote.line_items.map((li) => ({
    ...li,
    amount_cents: convertCents(li.amount_cents, currency),
  }))

  // Layer 1: existing pending order at the same price + currency, created < 30 min ago
  const service = createServiceClient()
  const cutoff = new Date(Date.now() - 30 * 60 * 1000).toISOString()

  type ExistingOrderRow = { checkout_url: string }

  const { data: existing } = await service
    .from('orders')
    .select('checkout_url')
    .eq('invite_id', id)
    .eq('status', 'pending')
    .eq('amount_cents', totalCents)
    .eq('currency', currency)
    .gte('created_at', cutoff)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle() as { data: ExistingOrderRow | null }

  if (existing?.checkout_url) {
    logger.info({ event: 'checkout.reused_session', invite_id: id })
    return ok({ url: existing.checkout_url })
  }

  // Fetch plan code snapshot and buyer email
  type PlanRow = { code: string | null }

  const { data: plan } = await service
    .from('plans')
    .select('code')
    .eq('id', invite.plan_id)
    .single() as { data: PlanRow | null }

  const appUrl     = process.env.NEXT_PUBLIC_APP_URL!
  const orderId    = crypto.randomUUID()

  // Layer 2: Stripe idempotency key — same invite + currency + price → same session
  let session: Awaited<ReturnType<typeof stripe.checkout.sessions.create>>
  try {
    session = await stripe.checkout.sessions.create(
      {
        mode:           'payment',
        currency,
        customer_email: buyerEmail || undefined,
        // One line-item per pricing component for a clean Stripe receipt
        line_items: lineItems.map((li) => ({
          price_data: {
            currency,
            unit_amount:  li.amount_cents,
            product_data: { name: li.label },
          },
          quantity: 1,
        })),
        client_reference_id: id,
        metadata: { order_id: orderId, invite_id: id },
        success_url: `${appUrl}/invite/${id}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url:  `${appUrl}/builder/${id}/review`,
      },
      { idempotencyKey: `checkout_${id}_${currency}_${totalCents}` }
    )
  } catch (err) {
    logger.error({ event: 'checkout.stripe_session.failed', invite_id: id, error: String(err) })
    return serverError('payment_provider_error')
  }

  if (!session.url) {
    logger.error({ event: 'checkout.session.no_url', invite_id: id, session_id: session.id })
    return serverError()
  }

  // Insert order — pre-generated ID was embedded in Stripe metadata
  const { error: insertError } = await service.from('orders').insert({
    id:               orderId,
    invite_id:        id,
    buyer_email:      buyerEmail,
    amount_cents:     totalCents,
    currency,
    plan_code:        plan?.code ?? 'unknown',
    line_items:       lineItems,
    status:           'pending',
    stripe_session_id: session.id,
    checkout_url:     session.url,
  } as any)

  if (insertError) {
    // Layer 3: unique conflict on stripe_session_id means a concurrent request
    // already inserted this session — return the existing order's URL
    if (insertError.code === '23505') {
        type ConcurrentOrderRow = { checkout_url: string | null }

        const { data: concurrent } = await service
          .from('orders')
          .select('checkout_url')
          .eq('stripe_session_id', session.id)
          .single() as unknown as { data: ConcurrentOrderRow | null }

        if (concurrent?.checkout_url) return ok({ url: concurrent.checkout_url })
      }
    // The Stripe session was created but the order row failed.
    // Log and still return the URL — the webhook will handle the missing order.
    logger.error({
      event:      'checkout.order_insert.failed',
      invite_id:  id,
      session_id: session.id,
      error:      insertError.message,
    })
  }

  return ok({ url: session.url }, 201)
}
