import Mux from '@mux/mux-node'

// Lazily-constructed Mux client. Server-only — never import in client code.
// Building it lazily means routes that merely import this module (e.g. the
// media LIST endpoint) don't crash when MUX_* env vars are absent in dev — the
// client is only instantiated when an upload/transcode path actually needs it.
let _mux: Mux | null = null

export function getMux(): Mux {
  if (_mux) return _mux
  const tokenId = process.env.MUX_TOKEN_ID
  const tokenSecret = process.env.MUX_TOKEN_SECRET
  if (!tokenId || !tokenSecret) {
    throw new Error('Mux is not configured (MUX_TOKEN_ID / MUX_TOKEN_SECRET missing).')
  }
  _mux = new Mux({ tokenId, tokenSecret })
  return _mux
}

// Back-compat proxy: existing `mux.video...` call sites keep working, but the
// real client is only built on first property access, not at import time.
export const mux: Mux = new Proxy({} as Mux, {
  get(_target, prop) {
    const client = getMux() as unknown as Record<string | symbol, unknown>
    const value = client[prop]
    return typeof value === 'function' ? (value as (...a: unknown[]) => unknown).bind(client) : value
  },
})

// Playback URL helpers — keeps URL construction in one place.
export const muxUrls = {
  hls:    (playbackId: string) => `https://stream.mux.com/${playbackId}.m3u8`,
  poster: (playbackId: string, time = 0) =>
    `https://image.mux.com/${playbackId}/thumbnail.jpg?time=${time}`,
  // Static MP4 rendition. We request mp4_support 'capped-1080p' at upload time
  // (the deprecated 'standard' / 'high.mp4' isn't allowed on basic assets), which
  // Mux serves at this fixed path once the rendition finishes preparing.
  mp4:    (playbackId: string) =>
    `https://stream.mux.com/${playbackId}/capped-1080p.mp4`,
}

// Webhook-free reconciliation. Given the Mux upload id (and/or a known asset id)
// we ask Mux directly what state the video is in. This is how a poll can finalize
// an asset when the `video.asset.ready` webhook can't reach us — e.g. on
// localhost, or as a safety net if a production webhook is ever dropped.
export type MuxReadyState =
  | { status: 'pending' }
  | { status: 'failed' }
  | { status: 'ready'; muxAssetId: string; playbackId: string; durationS: number | null }

export async function resolveMuxReadyState({
  uploadId,
  muxAssetId,
}: {
  uploadId?: string | null
  muxAssetId?: string | null
}): Promise<MuxReadyState> {
  // Resolve the upload → asset id if we don't have it yet.
  let assetId = muxAssetId ?? null
  if (!assetId && uploadId) {
    const upload = await mux.video.uploads.retrieve(uploadId)
    if (upload.status === 'errored' || upload.status === 'cancelled' || upload.status === 'timed_out') {
      return { status: 'failed' }
    }
    assetId = upload.asset_id ?? null
    if (!assetId) return { status: 'pending' }   // upload still in flight
  }
  if (!assetId) return { status: 'pending' }

  const asset = await mux.video.assets.retrieve(assetId)
  if (asset.status === 'errored') return { status: 'failed' }
  if (asset.status !== 'ready') return { status: 'pending' }

  const playbackId = asset.playback_ids?.find((p) => p.policy === 'public')?.id
  if (!playbackId) return { status: 'pending' }   // ready but no public id yet

  // We serve a static MP4 (plain <video> can't play HLS). The asset reports
  // 'ready' for streaming before the MP4 rendition finishes preparing, so hold
  // 'pending' until it's done — otherwise muxUrls.mp4() would 404 for a beat.
  const renditions = asset.static_renditions as { status?: string } | undefined
  if (renditions && renditions.status && renditions.status !== 'ready') {
    return { status: 'pending' }
  }

  return {
    status: 'ready',
    muxAssetId: assetId,
    playbackId,
    durationS: typeof asset.duration === 'number' ? asset.duration : null,
  }
}
