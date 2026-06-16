import { NextRequest } from 'next/server'
import { resolveInviteAccess } from '@/lib/invites/access'
import { createServiceClient } from '@/lib/supabase/service'
import { reconcileMuxAsset, ASSET_COLUMNS, type AssetRow } from '@/lib/mux/reconcile'
import { ok, notFound, serverError } from '@/lib/api/response'
import { logger } from '@/lib/logger'

type Params = { params: Promise<{ id: string; assetId: string }> }

// GET /api/invites/:id/media/:assetId
// Returns current asset status and variants. Poll this until status = 'ready'.
export async function GET(request: NextRequest, { params }: Params) {
  const { id, assetId } = await params
  const result = await resolveInviteAccess(id, request.headers)
  if (!result.ok) return Response.json({ error: result.message }, { status: result.status })

  const service = createServiceClient()
  const { data, error } = await service
    .from('media_assets')
    .select(ASSET_COLUMNS)
    .eq('id', assetId)
    .eq('invite_id', id)
    .single()

  if (error || !data) return notFound('media_asset_not_found')

  // Mux finalizes via webhook, but that can't reach localhost (and may be missed
  // in prod). If a Mux video is still pending, ask Mux directly and self-finalize
  // so the poll resolves without a webhook.
  const reconciled = await reconcileMuxAsset(data as AssetRow, id, service)
  return ok(reconciled ?? data)
}

// DELETE /api/invites/:id/media/:assetId
// Removes the asset row and the backing Storage file (if applicable).
// Mux assets are left to expire naturally — Mux charges per minute, not per asset.
export async function DELETE(request: NextRequest, { params }: Params) {
  const { id, assetId } = await params
  const result = await resolveInviteAccess(id, request.headers)
  if (!result.ok) return Response.json({ error: result.message }, { status: result.status })

  const service = createServiceClient()

  const { data: asset, error: fetchErr } = await service
    .from('media_assets')
    .select('kind, storage_key')
    .eq('id', assetId)
    .eq('invite_id', id)
    .single()

  if (fetchErr || !asset) return notFound('media_asset_not_found')

  // Delete Storage file for non-Mux assets
  const MUX_KINDS = ['opening_video', 'hero_video']
  if (!MUX_KINDS.includes(asset.kind) && asset.storage_key) {
    const { error: storageErr } = await service.storage
      .from('invite-media')
      .remove([asset.storage_key])

    if (storageErr) {
      // Log but don't abort — delete the DB row regardless
      logger.warn({ event: 'storage.delete.failed', asset_id: assetId, error: storageErr.message })
    }
  }

  const { error } = await service
    .from('media_assets')
    .delete()
    .eq('id', assetId)
    .eq('invite_id', id)

  if (error) {
    logger.error({ event: 'media_asset.delete.failed', asset_id: assetId, error: error.message })
    return serverError()
  }

  return new Response(null, { status: 204 })
}
