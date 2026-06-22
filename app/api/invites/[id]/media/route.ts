import { NextRequest } from 'next/server'
import { z } from 'zod'
import { resolveInviteAccess } from '@/lib/invites/access'
import { createServiceClient } from '@/lib/supabase/service'
import type { Database } from '@/lib/supabase/database.types'
import { mux } from '@/lib/mux'

type MediaKind = Database['public']['Enums']['media_kind']
import { reconcileMuxAssets, ASSET_COLUMNS, type AssetRow } from '@/lib/mux/reconcile'
import { ok, badRequest, serverError } from '@/lib/api/response'
import { logger } from '@/lib/logger'
import path from 'node:path'

// Kinds that go through Mux Direct Upload (video)
const MUX_KINDS = ['opening_video', 'hero_video'] as const
// Kinds that go through Supabase Storage presigned PUT
const STORAGE_KINDS = ['background_music', 'gallery_image', 'illustration'] as const
const ALL_KINDS = [...MUX_KINDS, ...STORAGE_KINDS] as const

const STORAGE_BUCKET = 'invite-media'

const InitiateSchema = z.object({
  kind:     z.enum(ALL_KINDS),
  filename: z.string().min(1).max(255),
  mime:     z.string().min(1).max(100),
  bytes:    z.number().int().positive().optional(),
})

type Params = { params: Promise<{ id: string }> }

// GET /api/invites/:id/media
export async function GET(request: NextRequest, { params }: Params) {
  const { id } = await params
  const result = await resolveInviteAccess(id, request.headers)
  if (!result.ok) return Response.json({ error: result.message }, { status: result.status })

  const service = createServiceClient()
  const { data, error } = await service
    .from('media_assets')
    .select(`${ASSET_COLUMNS}, storage_key`)
    .eq('invite_id', id)
    .order('created_at')

  if (error) return serverError()

  // Self-finalize any Mux videos still pending (webhook can't reach localhost,
  // and may be missed in prod) so the preview/builder sees them as ready.
  const rows = await reconcileMuxAssets((data ?? []) as AssetRow[], id, service)

  // Attach short-lived signed URLs to image assets so the builder uploader AND
  // the live/creator preview can display them (the published snapshot embeds its
  // own long-lived URLs). storage_key is stripped from the response.
  const enriched = await Promise.all(rows.map((r) => withImageUrls(r, service)))
  return ok(enriched)
}

const PREVIEW_IMAGE_KINDS = new Set(['gallery_image', 'illustration'])
const PREVIEW_TTL = 3600  // 1h — builder/preview only

async function withImageUrls(
  row: AssetRow,
  service: ReturnType<typeof createServiceClient>,
): Promise<AssetRow> {
  const { storage_key, ...rest } = row as AssetRow & { storage_key?: string | null }
  if (!PREVIEW_IMAGE_KINDS.has(row.kind) || row.status !== 'ready' || !storage_key) {
    return rest as AssetRow
  }
  const bucket = service.storage.from('invite-media')
  const sign = async (transform?: { width?: number; height?: number; resize?: 'cover' | 'contain'; quality?: number }) => {
    const { data } = await bucket.createSignedUrl(storage_key, PREVIEW_TTL, transform ? { transform } : undefined)
    return data?.signedUrl
  }
  const [url, thumb, medium] = await Promise.all([
    sign(),
    sign({ width: 400, height: 400, resize: 'cover', quality: 80 }),
    sign({ width: 1000, resize: 'contain', quality: 85 }),
  ])
  return { ...rest, variants: { ...(row.variants ?? {}), url, thumb, medium } } as AssetRow
}

// POST /api/invites/:id/media
// Initiates an upload. Returns { asset_id, upload_url } for the client to
// PUT directly (Mux or Supabase Storage) — never streams through the server.
export async function POST(request: NextRequest, { params }: Params) {
  const { id } = await params
  const result = await resolveInviteAccess(id, request.headers)
  if (!result.ok) return Response.json({ error: result.message }, { status: result.status })

  if (['published', 'archived'].includes(result.invite.status)) {
    return badRequest('invite_not_editable')
  }

  let body: unknown
  try { body = await request.json() } catch { return badRequest('invalid_json') }

  const parsed = InitiateSchema.safeParse(body)
  if (!parsed.success) return badRequest(parsed.error.issues[0].message)
  const { kind, filename, mime, bytes } = parsed.data

  const service = createServiceClient()

  if ((MUX_KINDS as readonly string[]).includes(kind)) {
    return initiateMuxUpload({ inviteId: id, kind, mime, bytes, service })
  }
  return initiateStorageUpload({ inviteId: id, kind, filename, mime, bytes, service })
}

// ── Mux (video) ─────────────────────────────────────────────────────────────

async function initiateMuxUpload({
  inviteId, kind, mime, bytes, service,
}: {
  inviteId: string
  kind: MediaKind
  mime: string
  bytes?: number
  service: ReturnType<typeof createServiceClient>
}) {
  // Pre-generate our asset ID so we can embed it as Mux passthrough.
  // The webhook uses passthrough to find this row instantly.
  const assetId = crypto.randomUUID()

  let muxUpload: Awaited<ReturnType<typeof mux.video.uploads.create>>
  try {
    muxUpload = await mux.video.uploads.create({
      cors_origin: process.env.NEXT_PUBLIC_APP_URL!,
      new_asset_settings: {
        playback_policy: ['public'],
        passthrough: assetId,   // ties the Mux webhook back to our row
        // Static MP4 rendition so a plain <video> can play it (no HLS player).
        mp4_support: 'capped-1080p',
      },
    })
  } catch (err) {
    const msg = String(err)
    logger.error({ event: 'mux.upload.create.failed', invite_id: inviteId, error: msg })
    // Distinguish "Mux not configured" (permanent → coming soon) from transient
    // API failures like plan limits (retryable → show error + keep card enabled).
    if (msg.includes('not configured') || msg.includes('MUX_TOKEN')) {
      return serverError('video_provider_unavailable')
    }
    return serverError('video_provider_error')
  }

  const { error } = await service.from('media_assets').insert({
    id:          assetId,
    invite_id:   inviteId,
    kind,
    status:      'uploading',
    storage_key: muxUpload.id,   // Mux upload ID — resolved to asset ID on webhook
    variants:    { mux_upload_id: muxUpload.id },
    mime,
    bytes:       bytes ?? null,
  })

  if (error) {
    logger.error({ event: 'media_asset.insert.failed', invite_id: inviteId, error: error.message })
    return serverError()
  }

  logger.info({ event: 'media.upload_initiated', kind, via: 'mux', invite_id: inviteId })
  return ok(
    {
      asset_id:      assetId,
      upload_url:    muxUpload.url,
      upload_method: 'PUT' as const,
    },
    201
  )
}

// ── Supabase Storage (images + audio) ───────────────────────────────────────

async function initiateStorageUpload({
  inviteId, kind, filename, mime, bytes, service,
}: {
  inviteId: string
  kind: MediaKind
  filename: string
  mime: string
  bytes?: number
  service: ReturnType<typeof createServiceClient>
}) {
  const ext = path.extname(filename).toLowerCase() || ''
  const storagePath = `invites/${inviteId}/${kind}/${crypto.randomUUID()}${ext}`

  const { data: signed, error: signErr } = await service.storage
    .from(STORAGE_BUCKET)
    .createSignedUploadUrl(storagePath)

  if (signErr || !signed) {
    logger.error({ event: 'storage.presign.failed', invite_id: inviteId, error: signErr?.message })
    return serverError('storage_error')
  }

  const assetId = crypto.randomUUID()
  const { error } = await service.from('media_assets').insert({
    id:          assetId,
    invite_id:   inviteId,
    kind,
    status:      'uploading',
    storage_key: storagePath,
    variants:    {},
    mime,
    bytes:       bytes ?? null,
  })

  if (error) {
    logger.error({ event: 'media_asset.insert.failed', invite_id: inviteId, error: error.message })
    return serverError()
  }

  logger.info({ event: 'media.upload_initiated', kind, via: 'storage', invite_id: inviteId })
  return ok(
    {
      asset_id:      assetId,
      upload_url:    signed.signedUrl,
      upload_token:  signed.token,      // needed for the PUT request header
      storage_path:  storagePath,
      upload_method: 'PUT' as const,
    },
    201
  )
}
