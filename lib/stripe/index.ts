import Stripe from 'stripe'

// Lazily-constructed Stripe client. Server-only — STRIPE_SECRET_KEY must never
// reach the browser. Built lazily (same pattern as lib/mux) so that importing a
// route module at build time — when `next build` collects page data and the env
// var may be absent — doesn't throw. The client is only instantiated on first
// real use, at request time, when the key is present.
let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (_stripe) return _stripe
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('Stripe is not configured (STRIPE_SECRET_KEY missing).')
  _stripe = new Stripe(key, { typescript: true })
  return _stripe
}

// Back-compat proxy: existing `stripe.checkout...` call sites keep working, but
// the real client is only built on first property access, not at import time.
export const stripe: Stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    const client = getStripe() as unknown as Record<string | symbol, unknown>
    const value = client[prop]
    return typeof value === 'function' ? (value as (...a: unknown[]) => unknown).bind(client) : value
  },
})
