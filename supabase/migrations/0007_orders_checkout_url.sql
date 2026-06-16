-- Stores the Stripe-hosted checkout URL so the double-submit check
-- can return it without an extra Stripe API round-trip.
alter table public.orders
  add column checkout_url text;
