-- ============================================================
-- Invites — the cart AND the product
-- ============================================================
create table public.invites (
  id          uuid primary key default gen_random_uuid(),
  -- Slug assigned at creation; short, collision-resistant, URL-safe.
  -- Application layer retries on the rare uniqueness conflict.
  -- A vanity slug (couple names) can overwrite this at publish time.
  slug        text not null unique
                default substring(replace(gen_random_uuid()::text, '-', ''), 1, 10),

  -- Ownership: exactly one of (owner_id, claim_token) must be set.
  -- anonymous draft  → claim_token set, owner_id null
  -- claimed draft    → owner_id set, claim_token null
  owner_id    uuid references public.profiles(id) on delete set null,
  claim_token uuid unique,

  draft_email text,          -- for abandoned-cart recovery before auth
  theme_id    uuid references public.themes(id),
  plan_id     uuid references public.plans(id),
  status      public.invite_status not null default 'draft',

  -- Public content (rendered on the guest invite page, never secret)
  display_title   text,      -- "Alex & Diane"
  event_date      date,
  venue_name      text,
  venue_address   text,

  -- Hybrid fulfillment trigger (invisible to buyer)
  additional_notes text,
  needs_review     boolean not null default false,

  -- Set after first publish; FK added after published_snapshots is created
  published_snapshot_id uuid,

  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),

  constraint invite_ownership check (
    (owner_id is not null and claim_token is null) or
    (owner_id is null     and claim_token is not null)
  )
);

create index invites_owner_id_idx    on public.invites (owner_id);
create index invites_status_idx      on public.invites (status);
create index invites_needs_review_idx on public.invites (id) where needs_review = true;
create index invites_claim_token_idx on public.invites (claim_token) where claim_token is not null;

-- Sets needs_review when notes are non-empty; also keeps updated_at fresh.
create or replace function public.handle_invite_mutate()
returns trigger
language plpgsql
as $$
begin
  if new.additional_notes is not null and trim(new.additional_notes) <> '' then
    new.needs_review := true;
  end if;
  new.updated_at := now();
  return new;
end;
$$;

create trigger on_invite_mutate
  before insert or update on public.invites
  for each row execute function public.handle_invite_mutate();

-- ============================================================
-- Anonymous draft → account claim (SECURITY DEFINER)
-- Called from the app after magic-link auth completes.
-- ============================================================
create or replace function public.claim_invite_draft(
  p_claim_token uuid,
  p_owner_id    uuid
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_invite_id uuid;
begin
  if auth.uid() is distinct from p_owner_id then
    raise exception 'forbidden' using errcode = 'P0002';
  end if;

  update public.invites
  set owner_id = p_owner_id, claim_token = null
  where claim_token = p_claim_token
    and owner_id is null
    and status = 'draft'
  returning id into v_invite_id;

  if v_invite_id is null then
    raise exception 'claim_token_invalid_or_expired' using errcode = 'P0001';
  end if;

  return v_invite_id;
end;
$$;

-- ============================================================
-- Isolated PII — separate table for encryption boundary
-- Buyer email, phone, IBAN stored as KMS-encrypted bytea.
-- key_id tracks which KMS key version was used (for rotation).
-- ============================================================
create table public.invite_contact (
  id         uuid primary key default gen_random_uuid(),
  invite_id  uuid not null unique references public.invites(id) on delete cascade,
  email_enc  bytea,
  phone_enc  bytea,
  iban_enc   bytea,
  key_id     text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger invite_contact_updated_at
  before update on public.invite_contact
  for each row execute function public.set_updated_at();

-- ============================================================
-- Sections
-- ============================================================
create table public.invite_sections (
  id        uuid primary key default gen_random_uuid(),
  invite_id uuid not null references public.invites(id) on delete cascade,
  type      public.section_type not null,
  position  int not null,
  config    jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- Deferrable so within-transaction position swaps don't violate uniqueness
  unique (invite_id, position) deferrable initially deferred
);

create index invite_sections_invite_id_idx on public.invite_sections (invite_id);

create trigger invite_sections_updated_at
  before update on public.invite_sections
  for each row execute function public.set_updated_at();

-- ============================================================
-- Extras junction
-- unit_price_cents is snapshotted at add time — a later catalog
-- price change cannot silently reprice an in-flight cart.
-- ============================================================
create table public.invite_extras (
  id               uuid primary key default gen_random_uuid(),
  invite_id        uuid not null references public.invites(id) on delete cascade,
  extra_id         uuid not null references public.extras(id),
  quantity         int not null default 1 check (quantity > 0),
  unit_price_cents int not null check (unit_price_cents >= 0),
  created_at       timestamptz not null default now(),
  unique (invite_id, extra_id)
);

-- ============================================================
-- Media assets
-- Originals arrive via presigned PUT; a transcode worker flips
-- status to 'ready' and fills variants jsonb.
-- ============================================================
create table public.media_assets (
  id          uuid primary key default gen_random_uuid(),
  invite_id   uuid not null references public.invites(id) on delete cascade,
  kind        public.media_kind not null,
  status      public.media_status not null default 'uploading',
  storage_key text not null,
  variants    jsonb not null default '{}',  -- {hls, poster, mp3, webp[]}
  bytes       bigint,
  duration_ms int,
  mime        text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index media_assets_invite_id_idx on public.media_assets (invite_id);

create trigger media_assets_updated_at
  before update on public.media_assets
  for each row execute function public.set_updated_at();
