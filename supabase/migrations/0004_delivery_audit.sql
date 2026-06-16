-- ============================================================
-- Published snapshots — immutable; re-publish = new row + purge
-- Written by service-role only (publish job).
-- Public serving is via CDN, not through RLS.
-- ============================================================
create table public.published_snapshots (
  id            uuid primary key default gen_random_uuid(),
  invite_id     uuid not null references public.invites(id),
  version       int not null,
  -- Fully rendered invite + asset manifest (CDN URLs only, never origin paths).
  -- Guests consume this; it must contain no PII from invite_contact.
  content       jsonb not null,
  published_by  uuid references public.profiles(id) on delete set null,
  created_at    timestamptz not null default now(),
  unique (invite_id, version)
);

-- Deferred FK: invites → published_snapshots (circular — snapshots didn't exist at migration 0002)
alter table public.invites
  add constraint invites_published_snapshot_fk
  foreign key (published_snapshot_id)
  references public.published_snapshots(id)
  on delete set null;

-- ============================================================
-- RSVPs
-- Guest PII (email, dietary notes) stored encrypted; attending
-- and guest_count are plain (needed for dashboard aggregates).
-- ============================================================
create table public.rsvps (
  id                  uuid primary key default gen_random_uuid(),
  invite_id           uuid not null references public.invites(id),
  name                text not null,
  attending           boolean not null,
  guest_count         int not null default 1 check (guest_count >= 0),
  email_enc           bytea,
  dietary_notes_enc   bytea,
  key_id              text,
  created_at          timestamptz not null default now()
);

create index rsvps_invite_id_idx on public.rsvps (invite_id);

-- ============================================================
-- submit_rsvp — the only anon write path in the whole system.
-- SECURITY DEFINER so anon role never touches the rsvps table
-- directly. Validates the invite is published before inserting.
-- Rate-limit this endpoint aggressively in the API layer.
-- ============================================================
create or replace function public.submit_rsvp(
  p_slug              text,
  p_name              text,
  p_attending         boolean,
  p_guest_count       int     default 1,
  p_email_enc         bytea   default null,
  p_dietary_notes_enc bytea   default null,
  p_key_id            text    default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_invite_id uuid;
  v_rsvp_id   uuid;
begin
  select id into v_invite_id
  from public.invites
  where slug = p_slug and status = 'published'
  limit 1;

  if v_invite_id is null then
    raise exception 'invite_not_found_or_not_published' using errcode = 'P0001';
  end if;

  insert into public.rsvps (
    invite_id, name, attending, guest_count,
    email_enc, dietary_notes_enc, key_id
  )
  values (
    v_invite_id, p_name, p_attending, p_guest_count,
    p_email_enc, p_dietary_notes_enc, p_key_id
  )
  returning id into v_rsvp_id;

  return v_rsvp_id;
end;
$$;

-- ============================================================
-- Audit log — append-only; written by service-role / SECURITY
-- DEFINER functions. Staff can read; nobody can write via RLS.
-- ============================================================
create table public.audit_log (
  id         uuid primary key default gen_random_uuid(),
  actor_id   uuid references public.profiles(id) on delete set null,
  action     text not null,       -- e.g. 'order.paid', 'invite.published'
  entity     text not null,       -- table name
  entity_id  uuid,
  metadata   jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create index audit_log_actor_id_idx  on public.audit_log (actor_id);
create index audit_log_entity_idx    on public.audit_log (entity, entity_id);
create index audit_log_created_at_idx on public.audit_log (created_at desc);
