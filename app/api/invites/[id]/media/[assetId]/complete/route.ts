import { NextRequest } from 'next/server'
import { resolveInviteAccess } from '@/lib/invites/access'
import { createServiceClient } from '@/lib/supabase/service'
import type { Json } from '@/lib/supabase/database.types'
import { ok, badRequest, notFound, serverError } from '@/lib/api/response'
import { logger } from '@/lib/logger'

type Params = { params: Promise<{ id: string; assetId: string }> }

// POST /api/invites/:id/media/:assetId/complete
//
// Called by the client after a successful Supabase Storage PUT.
// Not used for Mux uploads — those are finalized via the Mux webhook.
//
// For images: stamps computed variant transform params into media_assets.variants.
// For audio:  marks ready immediately (served as-is; format is already web-compatible).
export async function POST(request: NextRequest, { params }: Params) {
  const { id, assetId } = await params
  const result = await resolveInviteAccess(id, request.headers)
  if (!result.ok) return Response.json({ error: result.message }, { status: result.status })

  const service = createServiceClient()

  const { data: asset, error: fetchErr } = await service
    .from('media_assets')
    .select('id, kind, status, storage_key, mime, bytes')
    .eq('id', assetId)
    .eq('invite_id', id)
    .single()

  if (fetchErr || !asset) return notFound('media_asset_not_found')

  // Mux assets must not call this endpoint — they're finalized by webhook
  const MUX_KINDS = ['opening_video', 'hero_video']
  if (MUX_KINDS.includes(asset.kind)) {
    return badRequest('use_mux_webhook_for_video')
  }

  if (asset.status === 'ready') return ok({ status: 'ready' })
  if (asset.status === 'failed') return badRequest('asset_in_failed_state')

  let variants: Json = {}

  if (asset.kind === 'gallery_image' || asset.kind === 'illustration') {
    // Store the transform spec for each variant.
    // The signed-url endpoint and the publish snapshot renderer
    // use these specs to generate the correct Supabase transform URL.
    variants = {
      thumb:  { width: 200, height: 200, resize: 'cover',    format: 'webp', quality: 80 },
      medium: { width: 800,              resize: 'contain',   format: 'webp', quality: 85 },
      full:   {                                                format: 'webp', quality: 90 },
    }
  }
  // For audio: variants stays empty — the original file is served directly

  const { error } = await service
    .from('media_assets')
    .update({ status: 'ready', variants })
    .eq('id', assetId)

  if (error) {
    logger.error({ event: 'media_asset.complete.failed', asset_id: assetId, error: error.message })
    return serverError()
  }

  logger.info({ event: 'media.upload_complete', kind: asset.kind, asset_id: assetId })
  return ok({ status: 'ready', variants })
}
