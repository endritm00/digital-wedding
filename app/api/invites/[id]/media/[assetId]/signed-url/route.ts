import { NextRequest } from 'next/server'
import { z } from 'zod'
import { resolveInviteAccess } from '@/lib/invites/access'
import { createServiceClient } from '@/lib/supabase/service'
import { muxUrls } from '@/lib/mux'
import { ok, badRequest, notFound, serverError } from '@/lib/api/response'

const QuerySchema = z.object({
  variant: z.enum(['thumb', 'medium', 'full', 'original']).default('original'),
})

const SIGNED_URL_TTL = 3600  // 1 hour — builder preview only
const MUX_KINDS = ['opening_video', 'hero_video'] as const

type Params = { params: Promise<{ id: string; assetId: string }> }

// GET /api/invites/:id/media/:assetId/signed-url?variant=thumb|medium|full|original
//
// Returns a short-lived URL for builder preview of a private (pre-publish) asset.
// For Mux video: returns the Mux HLS URL stored in variants (already accessible).
// For Storage assets: returns a Supabase signed URL, with transform params applied
//   for image variants (thumb / medium / full).
// After publish, the snapshot embeds stable CDN URLs — this endpoint is builder-only.
export async function GET(request: NextRequest, { params }: Params) {
  const { id, assetId } = await params
  const result = await resolveInviteAccess(id, request.headers)
  if (!result.ok) return Response.json({ error: result.message }, { status: result.status })

  const parsed = QuerySchema.safeParse(
    Object.fromEntries(new URL(request.url).searchParams)
  )
  if (!parsed.success) return badRequest(parsed.error.issues[0].message)
  const { variant } = parsed.data

  const service = createServiceClient()
  const { data: asset, error } = await service
    .from('media_assets')
    .select('id, kind, status, storage_key, variants')
    .eq('id', assetId)
    .eq('invite_id', id)
    .single()

  if (error || !asset) return notFound('media_asset_not_found')
  if (asset.status !== 'ready') return badRequest('asset_not_ready')

  // ── Mux video ────────────────────────────────────────────────────────────
  if ((MUX_KINDS as readonly string[]).includes(asset.kind)) {
    const v = asset.variants as Record<string, string>
    const playbackId = v?.playback_id
    if (!playbackId) return badRequest('playback_id_not_yet_available')

    return ok({
      url:        muxUrls.hls(playbackId),
      poster_url: muxUrls.poster(playbackId),
      expires_at: null,   // Mux URLs don't expire
    })
  }

  // ── Supabase Storage (images + audio) ────────────────────────────────────
  if (!asset.storage_key) return notFound('storage_key_missing')

  const isImage = asset.kind === 'gallery_image' || asset.kind === 'illustration'
  const variantSpec = isImage
    ? (asset.variants as Record<string, Record<string, unknown>>)?.[variant]
    : undefined

  const transform = (isImage && variant !== 'original' && variantSpec)
    ? {
        width:   variantSpec.width   as number | undefined,
        height:  variantSpec.height  as number | undefined,
        resize:  variantSpec.resize  as 'cover' | 'contain' | 'fill' | undefined,
        format:  variantSpec.format  as 'webp' | 'origin' | undefined,
        quality: variantSpec.quality as number | undefined,
      }
    : undefined

  const { data: signed, error: signErr } = await service.storage
    .from('invite-media')
    .createSignedUrl(asset.storage_key, SIGNED_URL_TTL, { transform })

  if (signErr || !signed) return serverError('signed_url_failed')

  return ok({
    url:        signed.signedUrl,
    expires_at: new Date(Date.now() + SIGNED_URL_TTL * 1000).toISOString(),
  })
}
