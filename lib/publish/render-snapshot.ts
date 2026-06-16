import { createServiceClient } from '@/lib/supabase/service'
import { muxUrls } from '@/lib/mux'

// 1-year TTL for Storage asset URLs embedded in the snapshot.
// Re-publish refreshes the clock. Mux URLs have no expiry.
const SIGNED_URL_TTL = 365 * 24 * 60 * 60

const MUX_KINDS   = new Set(['opening_video', 'hero_video'])
const IMAGE_KINDS = new Set(['gallery_image', 'illustration'])

// ── Public types (used by publish route + delivery endpoint) ─────────────────

export interface MuxAssetEntry {
  asset_id:    string
  hls:         string
  poster:      string
  mp4:         string
  duration_ms: number | null
}

export interface StorageAssetEntry {
  asset_id:   string
  kind:       string
  url:        string         // full quality
  url_medium?: string        // 800w webp (images only)
  url_thumb?:  string        // 200×200 crop webp (images only)
}

export interface AssetManifest {
  opening_video?:   MuxAssetEntry
  hero_video?:      MuxAssetEntry
  background_music?: StorageAssetEntry
  illustration?:    StorageAssetEntry
  gallery_images:   StorageAssetEntry[]
}

export interface SnapshotContent {
  slug:          string
  display_title: string | null
  event_date:    string | null
  venue_name:    string | null
  venue_address: string | null
  theme: {
    slug:   string
    name:   string
    config: Record<string, unknown>
  } | null
  sections: Array<{
    id:       string
    type:     string
    position: number
    config:   Record<string, unknown>
  }>
  asset_manifest: AssetManifest
  rsvp_enabled:   boolean
  generated_at:   string
}

// ── Renderer ─────────────────────────────────────────────────────────────────

export async function renderSnapshot(inviteId: string): Promise<SnapshotContent> {
  const service = createServiceClient()

  // Fetch all required data in parallel — no PII from invite_contact
  const [inviteRes, sectionsRes, assetsRes] = await Promise.all([
    service
      .from('invites')
      .select(`
        slug, display_title, event_date, venue_name, venue_address,
        themes ( slug, name, config )
      `)
      .eq('id', inviteId)
      .single(),

    service
      .from('invite_sections')
      .select('id, type, position, config')
      .eq('invite_id', inviteId)
      .order('position'),

    service
      .from('media_assets')
      .select('id, kind, storage_key, variants, duration_ms')
      .eq('invite_id', inviteId)
      .eq('status', 'ready'),
  ])

  if (inviteRes.error || !inviteRes.data) {
    throw new Error(`invite_fetch_failed: ${inviteRes.error?.message}`)
  }

  const invite   = inviteRes.data
  const sections = sectionsRes.data ?? []
  const assets   = assetsRes.data ?? []

  const themeRaw = invite.themes as { slug: string; name: string; config: Record<string, unknown> } | null

  const asset_manifest = await buildAssetManifest(assets, service)

  return {
    slug:          invite.slug,
    display_title: invite.display_title,
    event_date:    invite.event_date,
    venue_name:    invite.venue_name,
    venue_address: invite.venue_address,
    theme: themeRaw
      ? { slug: themeRaw.slug, name: themeRaw.name, config: themeRaw.config }
      : null,
    sections: sections.map((s) => ({
      id:       s.id,
      type:     s.type,
      position: s.position,
      config:   s.config as Record<string, unknown>,
    })),
    asset_manifest,
    rsvp_enabled: sections.some((s) => s.type === 'rsvp'),
    generated_at: new Date().toISOString(),
  }
}

// ── Asset manifest builder ────────────────────────────────────────────────────

async function buildAssetManifest(
  assets: Array<{
    id: string
    kind: string
    storage_key: string | null
    variants: unknown
    duration_ms: number | null
  }>,
  service: ReturnType<typeof createServiceClient>
): Promise<AssetManifest> {
  const manifest: AssetManifest = { gallery_images: [] }

  await Promise.all(
    assets.map(async (asset) => {
      const v = asset.variants as Record<string, unknown>

      // ── Mux video ──────────────────────────────────────────────────────────
      if (MUX_KINDS.has(asset.kind)) {
        const playbackId = v?.playback_id as string | undefined
        if (!playbackId) return

        const entry: MuxAssetEntry = {
          asset_id:    asset.id,
          hls:         muxUrls.hls(playbackId),
          poster:      muxUrls.poster(playbackId),
          mp4:         muxUrls.mp4(playbackId),
          duration_ms: asset.duration_ms,
        }

        if (asset.kind === 'opening_video') manifest.opening_video = entry
        if (asset.kind === 'hero_video')    manifest.hero_video    = entry
        return
      }

      // ── Supabase Storage ───────────────────────────────────────────────────
      if (!asset.storage_key) return

      if (IMAGE_KINDS.has(asset.kind)) {
        const [url, url_medium, url_thumb] = await Promise.all([
          signUrl(service, asset.storage_key, SIGNED_URL_TTL, undefined),
          signUrl(service, asset.storage_key, SIGNED_URL_TTL, {
            width: 800, format: 'webp', quality: 85, resize: 'contain',
          }),
          signUrl(service, asset.storage_key, SIGNED_URL_TTL, {
            width: 200, height: 200, format: 'webp', quality: 80, resize: 'cover',
          }),
        ])

        const entry: StorageAssetEntry = { asset_id: asset.id, kind: asset.kind, url, url_medium, url_thumb }
        if (asset.kind === 'gallery_image') manifest.gallery_images.push(entry)
        if (asset.kind === 'illustration')  manifest.illustration = entry
        return
      }

      if (asset.kind === 'background_music') {
        const url = await signUrl(service, asset.storage_key, SIGNED_URL_TTL, undefined)
        manifest.background_music = { asset_id: asset.id, kind: asset.kind, url }
      }
    })
  )

  return manifest
}

async function signUrl(
  service: ReturnType<typeof createServiceClient>,
  storagePath: string,
  ttl: number,
  transform: {
    width?: number; height?: number
    format?: 'webp' | 'origin'
    quality?: number
    resize?: 'cover' | 'contain' | 'fill'
  } | undefined
): Promise<string> {
  // Supabase's transform `format` only accepts 'origin'; webp is auto-served via
  // content negotiation, so drop any other format value before forwarding.
  const safeTransform = transform
    ? {
        width: transform.width,
        height: transform.height,
        quality: transform.quality,
        resize: transform.resize,
        ...(transform.format === 'origin' ? { format: 'origin' as const } : {}),
      }
    : undefined
  const { data, error } = await service.storage
    .from('invite-media')
    .createSignedUrl(storagePath, ttl, { transform: safeTransform })

  if (error || !data) throw new Error(`sign_url_failed(${storagePath}): ${error?.message}`)
  return data.signedUrl
}
