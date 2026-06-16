-- ============================================================
-- Orders — one row per checkout attempt
-- Written only by service-role (edge functions / webhook handler).
-- Buyers have SELECT via RLS; no write policy for buyers.
-- ============================================================
create table public.orders (
  id                     uuid primary key default gen_random_uuid(),
  invite_id              uuid not null references public.invites(id),
  buyer_email            text not null,
  amount_cents           int not null check (amount_cents > 0),
  currency               text not null default 'eur',
  plan_code              text not null,   -- snapshot at checkout time
  -- Frozen breakdown: [{label, amount_cents}] — used for audit and disputes.
  -- Never re-derived from live catalog; this is the receipt.
  line_items             jsonb not null default '[]',
  status                 public.order_status not null default 'pending',
  stripe_session_id      text unique,
  stripe_payment_intent  text,
  paid_at                timestamptz,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

create index orders_invite_id_idx        on public.orders (invite_id);
create index orders_stripe_session_idx   on public.orders (stripe_session_id);

create trigger orders_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

-- ============================================================
-- Stripe webhook idempotency ledger
-- Insert-first; ON CONFLICT DO NOTHING.
-- RLS-on with no permissive policies = service-role only.
-- ============================================================
create table public.processed_webhook_events (
  event_id     text primary key,   -- Stripe event ID (evt_...)
  processed_at timestamptz not null default now()
);
