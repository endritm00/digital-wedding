import Stripe from 'stripe'

// Single Stripe client instance for the entire app.
// Never import this in client-side code — STRIPE_SECRET_KEY is server-only.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
})
