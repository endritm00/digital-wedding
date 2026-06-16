import { muxUrls, resolveMuxReadyState } from '@/lib/mux'
import { createServiceClient } from '@/lib/supabase/service'
import { logger } from '@/lib/logger'

// Mux finalizes a video via the `video.asset.ready` webhook — but that webhook
// can't reach localhost, and may occasionally be dropped in production. These
// helpers ask Mux directly and self-finalize a pending row, so a status poll (or
// a media fetch on the preview page) resolves an asset without a webhook.

export const MUX_KINDS = ['opening_video', 'hero_video']
export const ASSET_COLUMNS =
  'id, kind, status, variants, bytes, duration_ms, mime, created_at, updated_at'

export type AssetRow = {
  id: string
  invite_id?: string
  kind: string
  status: string
  variants: Record<string, unknown> | null
  [key: string]: unknown
}

function isPendingMux(row: AssetRow): boolean {
  return MUX_KINDS.includes(row.kind) && (row.status === 'uploading' || row.status === 'processing')
}

// Pulls live state from Mux and, if the video is ready/failed, writes the same
// row shape the webhook would. Returns the updated row, or null on no change.
export async function reconcileMuxAsset(
  row: AssetRow,
  inviteId: string,
  service: ReturnType<typeof createServiceClient>
): Promise<AssetRow | null> {
  if (!isPendingMux(row)) return null

  const variants = (row.variants ?? {}) as { mux_upload_id?: string; mux_asset_id?: string }
  try {
    const state = await resolveMuxReadyState({
      uploadId: variants.mux_upload_id,
      muxAssetId: variants.mux_asset_id,
    })

    if (state.status === 'pending') return null

    const update =
      state.status === 'ready'
        ? {
            status: 'ready',
            duration_ms: state.durationS ? Math.round(state.durationS * 1000) : null,
            variants: {
              ...variants,
              mux_asset_id: state.muxAssetId,
              playback_id:  state.playbackId,
              hls:          muxUrls.hls(state.playbackId),
              poster:       muxUrls.poster(state.playbackId),
              mp4:          muxUrls.mp4(state.playbackId),
            },
          }
        : { status: 'failed' as const }

    const { data: updated, error } = await service
      .from('media_assets')
      .update(update)
      .eq('id', row.id)
      .eq('invite_id', inviteId)
      .in('status', ['uploading', 'processing'])   // idempotency: lost the race? no-op
      .select(ASSET_COLUMNS)
      .maybeSingle()

    if (error) {
      logger.warn({ event: 'media.reconcile.update_failed', asset_id: row.id, error: error.message })
      return null
    }
    if (updated) logger.info({ event: `media.reconcile.${state.status}`, asset_id: row.id })
    return updated ? (updated as unknown as AssetRow) : null
  } catch (err) {
    // Mux unreachable / not configured — fall back to the stored row.
    logger.warn({ event: 'media.reconcile.failed', asset_id: row.id, error: String(err) })
    return null
  }
}

// Reconcile a batch of rows in parallel; returns rows with any updates applied.
export async function reconcileMuxAssets(
  rows: AssetRow[],
  inviteId: string,
  service: ReturnType<typeof createServiceClient>
): Promise<AssetRow[]> {
  const pending = rows.filter(isPendingMux)
  if (pending.length === 0) return rows

  const updates = new Map<string, AssetRow>()
  await Promise.all(
    pending.map(async (row) => {
      const updated = await reconcileMuxAsset(row, inviteId, service)
      if (updated) updates.set(row.id, updated)
    })
  )
  if (updates.size === 0) return rows
  return rows.map((r) => updates.get(r.id) ?? r)
}
