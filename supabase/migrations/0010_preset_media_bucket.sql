-- ============================================================
-- Public storage bucket for curated opening-film presets.
-- Assets are uploaded once via scripts/mirror-presets.mjs and
-- served from our own CDN so we never depend on Pexels URLs.
-- The bucket is PUBLIC: no auth needed to stream the videos or
-- display the poster images (they are not user-private data).
-- ============================================================
-- file_size_limit intentionally omitted — inherits the Supabase project default
-- (50 MB on free tier; upgrade plan for larger uploads).
insert into storage.buckets (id, name, public, allowed_mime_types)
values (
  'preset-media',
  'preset-media',
  true,
  array[
    'video/mp4',
    'image/jpeg',
    'image/jpg',
    'image/webp'
  ]
)
on conflict (id) do nothing;

-- Public read — anyone can fetch preset assets (needed for <video> / <img> tags).
-- Insert/Update/Delete are admin-only (service-role key bypasses RLS).
create policy "preset-media: public read"
  on storage.objects for select
  using (bucket_id = 'preset-media');
