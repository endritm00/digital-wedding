-- ============================================================
-- Row-Level Security
-- RLS-on + zero permissive policies = deny-all (service-role only).
-- The API layer enforces authz first; RLS is the second line —
-- a bug in a handler cannot expose another buyer's data.
-- ============================================================

alter table public.profiles             enable row level security;
alter table public.themes               enable row level security;
alter table public.plans                enable row level security;
alter table public.extras               enable row level security;
alter table public.invites              enable row level security;
alter table public.invite_contact       enable row level security;
alter table public.invite_sections      enable row level security;
alter table public.invite_extras        enable row level security;
alter table public.media_assets         enable row level security;
alter table public.orders               enable row level security;
alter table public.processed_webhook_events enable row level security;
alter table public.published_snapshots  enable row level security;
alter table public.rsvps                enable row level security;
alter table public.audit_log            enable row level security;

-- ============================================================
-- profiles
-- ============================================================
create policy "profiles: self read"
  on public.profiles for select
  using (auth.uid() = id);

-- Buyers can update display_name; role changes are blocked by
-- the prevent_role_escalation trigger for non-admins.
create policy "profiles: self update"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "profiles: staff read all"
  on public.profiles for select
  using (public.is_staff());

create policy "profiles: admin all"
  on public.profiles for all
  using (public.is_admin());

-- ============================================================
-- catalog — themes, plans, extras (storefront reads without auth)
-- ============================================================
create policy "themes: public read non-retired"
  on public.themes for select
  using (status <> 'retired');

create policy "themes: admin write"
  on public.themes for all
  using (public.is_admin());

create policy "plans: public read active"
  on public.plans for select
  using (active = true);

create policy "plans: admin write"
  on public.plans for all
  using (public.is_admin());

create policy "extras: public read active"
  on public.extras for select
  using (active = true);

create policy "extras: admin write"
  on public.extras for all
  using (public.is_admin());

-- ============================================================
-- invites
-- Anonymous drafts are NOT reached through a broad anon policy.
-- Anon access goes through claim_invite_draft() RPC (SECURITY DEFINER).
-- ============================================================
create policy "invites: owner all"
  on public.invites for all
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create policy "invites: staff all"
  on public.invites for all
  using (public.is_staff());

-- ============================================================
-- invite_contact
-- ============================================================
create policy "invite_contact: owner via invite"
  on public.invite_contact for all
  using (
    exists (
      select 1 from public.invites
      where invites.id = invite_contact.invite_id
        and invites.owner_id = auth.uid()
    )
  );

create policy "invite_contact: staff all"
  on public.invite_contact for all
  using (public.is_staff());

-- ============================================================
-- invite_sections
-- ============================================================
create policy "invite_sections: owner via invite"
  on public.invite_sections for all
  using (
    exists (
      select 1 from public.invites
      where invites.id = invite_sections.invite_id
        and invites.owner_id = auth.uid()
    )
  );

create policy "invite_sections: staff all"
  on public.invite_sections for all
  using (public.is_staff());

-- ============================================================
-- invite_extras
-- ============================================================
create policy "invite_extras: owner via invite"
  on public.invite_extras for all
  using (
    exists (
      select 1 from public.invites
      where invites.id = invite_extras.invite_id
        and invites.owner_id = auth.uid()
    )
  );

create policy "invite_extras: staff all"
  on public.invite_extras for all
  using (public.is_staff());

-- ============================================================
-- media_assets
-- ============================================================
create policy "media_assets: owner via invite"
  on public.media_assets for all
  using (
    exists (
      select 1 from public.invites
      where invites.id = media_assets.invite_id
        and invites.owner_id = auth.uid()
    )
  );

create policy "media_assets: staff all"
  on public.media_assets for all
  using (public.is_staff());

-- ============================================================
-- orders
-- Buyers read their own orders via the invite they own.
-- No buyer write policy — writes are service-role only.
-- ============================================================
create policy "orders: buyer read own"
  on public.orders for select
  using (
    exists (
      select 1 from public.invites
      where invites.id = orders.invite_id
        and invites.owner_id = auth.uid()
    )
  );

create policy "orders: staff read all"
  on public.orders for select
  using (public.is_staff());

-- processed_webhook_events: no permissive policies → service-role only.

-- ============================================================
-- published_snapshots
-- No permissive policies → service-role only for writes.
-- Public content is served from the CDN, not through RLS.
-- ============================================================

-- ============================================================
-- rsvps
-- INSERT is via submit_rsvp() RPC (SECURITY DEFINER).
-- No direct-INSERT policy for anon/buyer.
-- ============================================================
create policy "rsvps: owner read via invite"
  on public.rsvps for select
  using (
    exists (
      select 1 from public.invites
      where invites.id = rsvps.invite_id
        and invites.owner_id = auth.uid()
    )
  );

create policy "rsvps: staff all"
  on public.rsvps for all
  using (public.is_staff());

-- ============================================================
-- audit_log
-- Staff read; no write policy (append-only via service-role).
-- ============================================================
create policy "audit_log: staff read"
  on public.audit_log for select
  using (public.is_staff());
