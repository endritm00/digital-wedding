import { notFound } from 'next/navigation'
import { createServiceClient } from '@/lib/supabase/service'
import type { SnapshotContent } from '@/lib/publish/render-snapshot'
import type { MediaAsset, Section } from '@/lib/builder/api'
import { InvitationView } from '@/components/invite/invitation-view'

// Public, login-free guest page for a PUBLISHED invitation. Reads the immutable
// snapshot and renders the SAME full InvitationView the couple previews — opener,
// theme, hero film, all content sections, countdown, RSVP. Accepts the vanity
// slug (shared with guests) or the invite uuid (the success page links by id).
type Params = { params: Promise<{ id: string }> }

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

// A published snapshot is immutable per version, so the page is cacheable. ISR
// serves guests pre-rendered HTML (near-instant) instead of two remote-DB round
// trips per hit; the publish route calls revalidatePath() so a (re)publish shows
// immediately. Tune the window as needed.
export const revalidate = 300

// Opt this dynamic route into on-demand ISR. We prerender NO ids at build (they
// are user-generated); generateStaticParams registers the route as ISR-capable.
export function generateStaticParams() {
  return []
}

// force-static is required because the Supabase JS client issues uncached
// fetch() calls internally, and Next 15 defaults fetch to no-store — which by
// itself opts the whole route into per-request dynamic rendering (Cache-Control:
// no-store) and defeats the cache. force-static makes those fetches cacheable
// and renders the page once per `revalidate` window. Safe here: the page reads
// no cookies()/headers()/searchParams (only the immutable published snapshot by
// id via the stateless service client), so forcing static changes no behavior.
export const dynamic = 'force-static'

// Rebuild the MediaAsset[] the renderer expects from the snapshot's resolved
// asset manifest (the renderer looks media up by the asset ids in the opening
// section config).
function snapshotMedia(am: SnapshotContent['asset_manifest']): MediaAsset[] {
  const media: MediaAsset[] = []
  const pushVideo = (e: { asset_id: string; hls: string; mp4: string; poster: string; duration_ms: number | null }, kind: string) =>
    media.push({ id: e.asset_id, kind, status: 'ready', variants: { hls: e.hls, mp4: e.mp4, poster: e.poster }, bytes: null, duration_ms: e.duration_ms, mime: null })
  if (am.opening_video) pushVideo(am.opening_video, 'opening_video')
  if (am.hero_video) pushVideo(am.hero_video, 'hero_video')
  if (am.background_music) media.push({ id: am.background_music.asset_id, kind: 'background_music', status: 'ready', variants: { url: am.background_music.url }, bytes: null, duration_ms: null, mime: null })
  for (const g of am.gallery_images ?? []) {
    media.push({ id: g.asset_id, kind: 'gallery_image', status: 'ready', variants: { url: g.url, thumb: g.url_thumb, medium: g.url_medium }, bytes: null, duration_ms: null, mime: null })
  }
  return media
}

export default async function GuestInvitePage({ params }: Params) {
  const { id } = await params
  const service = createServiceClient()

  const base = service.from('invites').select('published_snapshot_id').eq('status', 'published')
  const { data: invite } = UUID_RE.test(id)
    ? await base.eq('id', id).maybeSingle()
    : await base.eq('slug', id).maybeSingle()

  if (!invite?.published_snapshot_id) notFound()

  const { data: snap } = await service
    .from('published_snapshots')
    .select('content')
    .eq('id', invite.published_snapshot_id)
    .single()

  if (!snap?.content) notFound()
  const content = snap.content as unknown as SnapshotContent

  return (
    <InvitationView
      invite={{
        display_title: content.display_title,
        event_date: content.event_date,
        venue_name: content.venue_name,
        venue_address: content.venue_address,
      }}
      sections={content.sections as unknown as Section[]}
      media={snapshotMedia(content.asset_manifest)}
      rsvp={{ kind: 'snapshot', slug: content.slug }}
      enableOpener
    />
  )
}
