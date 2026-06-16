-- Extensions
create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- ============================================================
-- Enums
-- ============================================================
create type public.user_role        as enum ('buyer', 'designer', 'admin');
create type public.invite_status    as enum ('draft', 'paid', 'published', 'archived');
create type public.section_type     as enum (
  'opening', 'story', 'schedule', 'venue', 'rsvp',
  'gallery', 'travel', 'gifts', 'countdown', 'dress_code', 'faq', 'custom'
);
create type public.media_kind       as enum (
  'opening_video', 'hero_video', 'background_music', 'gallery_image', 'illustration'
);
create type public.media_status     as enum ('uploading', 'processing', 'ready', 'failed');
create type public.order_status     as enum ('pending', 'paid', 'failed', 'refunded', 'expired');
create type public.extra_pricing    as enum ('per_invite', 'per_unit');
create type public.theme_status     as enum ('active', 'coming_soon', 'retired');
create type public.theme_category   as enum ('wedding', 'save_the_date', 'birthday');
create type public.plan_code        as enum ('save_the_date', 'experience', 'premium');

-- ============================================================
-- Shared updated_at trigger function
-- ============================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- ============================================================
-- Profiles — auto-provisioned from auth.users
-- ============================================================
create table public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  role         public.user_role not null default 'buyer',
  display_name text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Auto-provision profile on user creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role)
  values (new.id, 'buyer');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Prevent non-admins from escalating their own role
create or replace function public.prevent_role_escalation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if old.role != new.role and not public.is_admin() then
    raise exception 'insufficient_privilege' using errcode = '42501';
  end if;
  return new;
end;
$$;

create trigger on_profile_role_change
  before update on public.profiles
  for each row
  when (old.role is distinct from new.role)
  execute function public.prevent_role_escalation();

-- ============================================================
-- RBAC helpers — SECURITY DEFINER + fixed search_path
-- Required so policies on other tables can call these without
-- triggering recursive RLS on profiles.
-- ============================================================
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.is_staff()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('designer', 'admin')
  );
$$;

-- ============================================================
-- Catalog: Themes
-- ============================================================
create table public.themes (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  category    public.theme_category not null,
  status      public.theme_status not null default 'active',
  -- config keys: palette, fonts, allowed_sections, default_sections, default_media
  config      jsonb not null default '{}',
  preview_url text,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index themes_category_status_idx on public.themes (category, status);

create trigger themes_updated_at
  before update on public.themes
  for each row execute function public.set_updated_at();

-- ============================================================
-- Catalog: Plans
-- ============================================================
create table public.plans (
  id                 uuid primary key default gen_random_uuid(),
  code               public.plan_code not null unique,
  name               text not null,
  base_price_cents   int not null check (base_price_cents >= 0),
  included_sections  int check (included_sections > 0), -- NULL = unlimited
  sort_order         int not null default 0,
  active             boolean not null default true,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create trigger plans_updated_at
  before update on public.plans
  for each row execute function public.set_updated_at();

-- ============================================================
-- Catalog: Extras
-- ============================================================
create table public.extras (
  id          uuid primary key default gen_random_uuid(),
  code        text not null unique,
  name        text not null,
  price_cents int not null check (price_cents >= 0),
  pricing     public.extra_pricing not null default 'per_invite',
  active      boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create trigger extras_updated_at
  before update on public.extras
  for each row execute function public.set_updated_at();
