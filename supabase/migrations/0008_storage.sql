-- ============================================================
-- Storage bucket for invite media assets
-- Private bucket — all access goes through signed URLs.
-- The API layer (resolveInviteAccess) enforces ownership;
-- RLS here is a backstop, not the primary gate.
-- ============================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'invite-media',
  'invite-media',
  false,
  52428800,   -- 50 MB per file
  array[
    'image/jpeg', 'image/png', 'image/webp', 'image/gif',
    'audio/mpeg', 'audio/mp4', 'audio/wav', 'audio/ogg',
    -- Video originals are uploaded directly to Mux, not here.
    -- These entries are kept for fallback / thumbnail originals.
    'video/mp4', 'video/quicktime'
  ]
)
on conflict (id) do nothing;

-- Authenticated owners can upload to their own invite paths.
-- Path convention: invites/{invite_id}/{kind}/{uuid}.{ext}
create policy "invite-media: owner upload"
  on storage.objects for insert
  with check (
    bucket_id = 'invite-media'
    and auth.uid() is not null
    and exists (
      select 1 from public.invites
      where id::text = (string_to_array(name, '/'))[2]
        and owner_id = auth.uid()
    )
  );

-- Owners can read their own invite media
create policy "invite-media: owner read"
  on storage.objects for select
  using (
    bucket_id = 'invite-media'
    and auth.uid() is not null
    and exists (
      select 1 from public.invites
      where id::text = (string_to_array(name, '/'))[2]
        and owner_id = auth.uid()
    )
  );

-- Staff can read all
create policy "invite-media: staff read"
  on storage.objects for select
  using (
    bucket_id = 'invite-media'
    and public.is_staff()
  );

-- Owners can delete their own media
create policy "invite-media: owner delete"
  on storage.objects for delete
  using (
    bucket_id = 'invite-media'
    and auth.uid() is not null
    and exists (
      select 1 from public.invites
      where id::text = (string_to_array(name, '/'))[2]
        and owner_id = auth.uid()
    )
  );
