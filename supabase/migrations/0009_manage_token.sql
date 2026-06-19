-- ============================================================
-- Manage token — the couple's private, login-free RSVP link
-- ============================================================
-- Lets the couple view their guest list via an unguessable link
-- (e.g. /manage/<token>) with NO account. We store only a SHA-256
-- hash; the raw token lives solely in the email we send and in the
-- creator's browser. A DB leak therefore never exposes a live link.
--
-- Orthogonal to the invite_ownership check (owner_id XOR claim_token):
-- this column is independent and may be set on a draft, paid, or
-- published invite regardless of ownership state.
alter table public.invites
  add column manage_token_hash text unique;

create index invites_manage_token_hash_idx
  on public.invites (manage_token_hash)
  where manage_token_hash is not null;

comment on column public.invites.manage_token_hash is
  'SHA-256 hash of the couple''s private RSVP-management token. Raw token is never stored; delivered by email + held in the creator browser. Rotatable.';
