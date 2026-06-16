import { NextRequest } from 'next/server'
import type Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase/service'
import { logger } from '@/lib/logger'

// Disable body parsing — Stripe signature verification requires the raw body.
export const config = { api: { bodyParser: false } }

// POST /api/webhooks/stripe
//
// Idempotency design:
//   - On arrival: INSERT event_id into processed_webhook_events.
//     ON CONFLICT = already processed → return 200 immediately (stops retries).
//   - On handler failure: DELETE the idempotency row and return 500.
//     Stripe will retry; the next delivery will see no conflict and try again.
//
// Race condition note: if two workers simultaneously receive the same event,
// both attempt the INSERT. The loser sees the conflict and returns 200 before
// the winner finishes processing. If the winner then fails and deletes the row,
// that delivery is lost — Stripe will not retry because the loser's 200 was
// already acknowledged. This is an inherent limitation of the insert-first
// pattern without a distributed lock; acceptable at this scale. Manual webhook
// retries via the Stripe dashboard are the recovery path for these rare cases.
export async function POST(request: NextRequest) {
  const sig = request.headers.get('stripe-signature')
  if (!sig) return new Response('missing_signature', { status: 400 })

  const rawBody = await request.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    logger.warn({ event: 'webhook.signature_invalid', error: String(err) })
    return new Response('invalid_signature', { status: 400 })
  }

  const service = createServiceClient()

  // ── Idempotency check ───────────────────────────────────────────────────
  const { error: idempotencyError, count } = await service
    .from('processed_webhook_events')
    .insert({ event_id: event.id }, { count: 'exact' })
    // PostgREST returns 409 on PK conflict; with upsert=false the JS client
    // surfaces this as an error with code '23505'. We check count instead
    // because a successful insert returns count=1.
    .select()

  if (idempotencyError?.code === '23505' || count === 0) {
    logger.info({ event: 'webhook.already_processed', stripe_event_id: event.id })
    return new Response('already_processed', { status: 200 })
  }

  // ── Event handling ──────────────────────────────────────────────────────
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleSessionCompleted(event.data.object as Stripe.Checkout.Session, service)
        break

      case 'checkout.session.expired':
        await handleSessionExpired(event.data.object as Stripe.Checkout.Session, service)
        break

      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.PaymentIntent, service)
        break

      default:
        // Unhandled event type — still 200 so Stripe stops delivering it
        logger.info({ event: 'webhook.unhandled_type', type: event.type })
    }
  } catch (err) {
    // Handler failed — delete the idempotency row so Stripe can retry
    await service
      .from('processed_webhook_events')
      .delete()
      .eq('event_id', event.id)

    logger.error({
      event:           'webhook.handler_failed',
      stripe_event_id: event.id,
      type:            event.type,
      error:           String(err),
    })

    return new Response('handler_error', { status: 500 })
  }

  return new Response('ok', { status: 200 })
}

// ── Handlers ────────────────────────────────────────────────────────────────

async function handleSessionCompleted(
  session: Stripe.Checkout.Session,
  service: ReturnType<typeof createServiceClient>
) {
  const inviteId = session.client_reference_id
  const orderId  = session.metadata?.order_id

  if (!inviteId) {
    logger.error({ event: 'webhook.session_completed.no_invite_id', session_id: session.id })
    return
  }

  // Update order — look up by session_id (source of truth), not the metadata
  // order_id, in case the order row was created by a different request.
  const { data: order, error: orderFetchErr } = await service
    .from('orders')
    .select('id, status')
    .eq('stripe_session_id', session.id)
    .maybeSingle()

  if (orderFetchErr) throw orderFetchErr

  if (!order) {
    // Order row missing — the insert in /checkout may have failed.
    // Log but don't throw: we still want to flip the invite to paid.
    logger.warn({
      event:      'webhook.session_completed.order_missing',
      session_id: session.id,
      invite_id:  inviteId,
    })
  }

  if (order && order.status !== 'paid') {
    const { error } = await service
      .from('orders')
      .update({
        status:                 'paid',
        paid_at:                new Date().toISOString(),
        stripe_payment_intent:  session.payment_intent as string ?? null,
      })
      .eq('id', order.id)

    if (error) throw error
  }

  // Flip invite to paid — idempotent (update is a no-op if already 'paid')
  const { error: inviteError } = await service
    .from('invites')
    .update({ status: 'paid' })
    .eq('id', inviteId)
    .eq('status', 'draft')   // guard: only advance from draft → paid

  if (inviteError) throw inviteError

  // Append to audit log (best-effort — don't throw if this fails)
  await service.from('audit_log').insert({
    actor_id:  null,
    action:    'order.paid',
    entity:    'orders',
    entity_id: order?.id ?? null,
    metadata: {
      invite_id:  inviteId,
      session_id: session.id,
      amount:     session.amount_total,
      currency:   session.currency,
    },
  }).then(({ error }) => {
    if (error) logger.warn({ event: 'audit_log.insert.failed', error: error.message })
  })

  logger.info({
    event:      'order.paid',
    invite_id:  inviteId,
    order_id:   order?.id ?? orderId,
    session_id: session.id,
    amount:     session.amount_total,
  })
}

async function handleSessionExpired(
  session: Stripe.Checkout.Session,
  service: ReturnType<typeof createServiceClient>
) {
  const { error } = await service
    .from('orders')
    .update({ status: 'expired' })
    .eq('stripe_session_id', session.id)
    .eq('status', 'pending')   // only transition from pending

  if (error) throw error

  logger.info({ event: 'order.expired', session_id: session.id })
}

async function handlePaymentFailed(
  intent: Stripe.PaymentIntent,
  service: ReturnType<typeof createServiceClient>
) {
  const { error } = await service
    .from('orders')
    .update({ status: 'failed', stripe_payment_intent: intent.id })
    .eq('stripe_payment_intent', intent.id)
    .in('status', ['pending'])

  if (error) throw error

  logger.info({ event: 'order.failed', payment_intent: intent.id })
}
