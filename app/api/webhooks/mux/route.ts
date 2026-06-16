import { NextRequest } from 'next/server'
import { mux, muxUrls } from '@/lib/mux'
import { createServiceClient } from '@/lib/supabase/service'
import { logger } from '@/lib/logger'

// POST /api/webhooks/mux
//
// Handles Mux video lifecycle events.
// Idempotency: media_assets status transitions are guarded by
// `.eq('status', 'processing')` (or 'uploading') so duplicate
// deliveries of the same event are no-ops.
//
// Events handled:
//   video.upload.asset_created — upload complete, Mux asset created
//   video.asset.ready          — transcoding done, playback available
//   video.asset.errored        — transcoding failed
export async function POST(request: NextRequest) {
  const sig  = request.headers.get('mux-signature')
  const body = await request.text()

  if (!sig) {
    logger.warn({ event: 'mux_webhook.missing_signature' })
    return new Response('missing_signature', { status: 400 })
  }

  try {
    mux.webhooks.verifySignature(body, request.headers as unknown as Record<string, string>, process.env.MUX_WEBHOOK_SECRET!)
  } catch (err) {
    logger.warn({ event: 'mux_webhook.invalid_signature', error: String(err) })
    return new Response('invalid_signature', { status: 400 })
  }

  let event: { type: string; data: Record<string, unknown> }
  try {
    event = JSON.parse(body)
  } catch {
    return new Response('invalid_json', { status: 400 })
  }

  const service = createServiceClient()

  try {
    switch (event.type) {
      case 'video.upload.asset_created':
        await handleUploadAssetCreated(event.data, service)
        break

      case 'video.asset.ready':
      // Static MP4 finishes after the asset is otherwise ready; we need it for
      // plain-<video> playback, so finalize on whichever lands last.
      case 'video.asset.static_renditions.ready':
        await handleAssetReady(event.data, service)
        break

      case 'video.asset.errored':
        await handleAssetErrored(event.data, service)
        break

      default:
        logger.info({ event: 'mux_webhook.unhandled', type: event.type })
    }
  } catch (err) {
    logger.error({ event: 'mux_webhook.handler_failed', type: event.type, error: String(err) })
    return new Response('handler_error', { status: 500 })
  }

  return new Response('ok', { status: 200 })
}

// ── Handlers ────────────────────────────────────────────────────────────────

// Upload completed → Mux created an asset. Store the Mux asset ID for
// later lookup when the asset becomes ready.
async function handleUploadAssetCreated(
  data: Record<string, unknown>,
  service: ReturnType<typeof createServiceClient>
) {
  const muxAssetId  = data.asset_id as string | undefined
  const muxUploadId = data.id       as string | undefined   // upload ID
  const passthrough = (data.new_asset_settings as Record<string, unknown>)?.passthrough as string | undefined

  if (!passthrough || !muxAssetId) {
    logger.warn({ event: 'mux.upload.asset_created.missing_fields', data })
    return
  }

  // Stamp the Mux asset ID — we need it when video.asset.ready fires
  const { error } = await service
    .from('media_assets')
    .update({
      status:  'processing',
      variants: { mux_upload_id: muxUploadId, mux_asset_id: muxAssetId },
    })
    .eq('id', passthrough)
    .eq('status', 'uploading')   // idempotency guard

  if (error) throw error
  logger.info({ event: 'media.processing', asset_id: passthrough, mux_asset_id: muxAssetId })
}

// Asset transcoded and ready for playback.
async function handleAssetReady(
  data: Record<string, unknown>,
  service: ReturnType<typeof createServiceClient>
) {
  const passthrough = data.passthrough as string | undefined
  if (!passthrough) {
    logger.warn({ event: 'mux.asset.ready.no_passthrough', mux_asset_id: data.id })
    return
  }

  const playbackIds = data.playback_ids as Array<{ id: string; policy: string }> | undefined
  const playbackId  = playbackIds?.find((p) => p.policy === 'public')?.id
  if (!playbackId) {
    logger.error({ event: 'mux.asset.ready.no_playback_id', mux_asset_id: data.id })
    throw new Error('no_public_playback_id')
  }

  // We serve a static MP4 (plain <video> can't play HLS). Don't finalize until
  // the rendition is ready, or muxUrls.mp4() would 404. The later
  // video.asset.static_renditions.ready event finalizes it.
  const renditions = data.static_renditions as { status?: string } | undefined
  if (renditions && renditions.status && renditions.status !== 'ready') {
    logger.info({ event: 'mux.asset.ready.awaiting_mp4', asset_id: passthrough })
    return
  }

  const durationS = data.duration as number | undefined

  const { error } = await service
    .from('media_assets')
    .update({
      status:      'ready',
      duration_ms: durationS ? Math.round(durationS * 1000) : null,
      variants: {
        mux_asset_id: data.id,
        playback_id:  playbackId,
        hls:          muxUrls.hls(playbackId),
        poster:       muxUrls.poster(playbackId),
        mp4:          muxUrls.mp4(playbackId),
      },
    })
    .eq('id', passthrough)
    .in('status', ['uploading', 'processing'])   // idempotency: no-op if already ready

  if (error) throw error
  logger.info({ event: 'media.ready', asset_id: passthrough, playback_id: playbackId })
}

// Transcoding failed — flip to error state so the builder can surface it.
async function handleAssetErrored(
  data: Record<string, unknown>,
  service: ReturnType<typeof createServiceClient>
) {
  const passthrough = data.passthrough as string | undefined
  if (!passthrough) {
    logger.warn({ event: 'mux.asset.errored.no_passthrough', mux_asset_id: data.id })
    return
  }

  const { error } = await service
    .from('media_assets')
    .update({ status: 'failed' })
    .eq('id', passthrough)
    .in('status', ['uploading', 'processing'])

  if (error) throw error
  logger.error({ event: 'media.transcode_failed', asset_id: passthrough, mux_asset_id: data.id })
}
