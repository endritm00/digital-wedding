'use client'

// Client-side API layer for the builder.
// Anonymous drafts authenticate with X-Claim-Token (stored per invite in
// localStorage) until the draft is claimed via magic link.
// The client never computes prices — the quote endpoint is the only source.

export interface Invite {
  id: string
  slug: string
  status: string
  theme_id: string | null
  plan_id: string | null
  draft_email: string | null
  display_title: string | null
  event_date: string | null
  venue_name: string | null
  venue_address: string | null
  additional_notes: string | null
  needs_review: boolean
  published_snapshot_id: string | null
  created_at: string
  updated_at: string
}

export interface InvitePatch {
  theme_id?: string
  plan_id?: string
  draft_email?: string
  display_title?: string
  event_date?: string
  venue_name?: string
  venue_address?: string
  additional_notes?: string
}

export interface Plan {
  id: string
  code: string
  name: string
  base_price_cents: number
  included_sections: number | null
  sort_order: number
}

export interface Theme {
  id: string
  slug: string
  name: string
  category: string | null
  status: string
  config: Record<string, unknown>
  preview_url: string | null
  sort_order: number
}

export interface Section {
  id: string
  type: string
  position: number
  config: Record<string, unknown>
}

export interface QuoteLineItem {
  label: string
  amount_cents: number
}

export interface Quote {
  amount_cents: number
  line_items: QuoteLineItem[]
  currency: string
}

export interface MediaAsset {
  id: string
  kind: string
  status: 'uploading' | 'processing' | 'ready' | 'failed'
  variants: Record<string, unknown>
  bytes: number | null
  duration_ms: number | null
  mime: string | null
}

export interface ExtraCatalogItem {
  id: string
  code: string
  name: string
  price_cents: number
}

export interface InviteExtra {
  id: string
  extra_id: string
  quantity: number
  unit_price_cents: number
  extras?: { code: string; name: string } | null
}

export interface UploadTicket {
  asset_id: string
  upload_url: string
  upload_token?: string
  storage_path?: string
  upload_method: 'PUT'
}

export class ApiError extends Error {
  status: number
  code: string
  constructor(status: number, code: string) {
    super(code)
    this.status = status
    this.code = code
  }
}

// ── claim-token storage ──────────────────────────────────────────────────────

const TOKEN_PREFIX = 'di:claim:'
const LAST_INVITE_KEY = 'di:last-invite'

export const claimStore = {
  get(inviteId: string): string | null {
    try { return localStorage.getItem(TOKEN_PREFIX + inviteId) } catch { return null }
  },
  set(inviteId: string, token: string) {
    try {
      localStorage.setItem(TOKEN_PREFIX + inviteId, token)
      localStorage.setItem(LAST_INVITE_KEY, inviteId)
    } catch { /* private mode — draft still works for this page load */ }
  },
  clear(inviteId: string) {
    try { localStorage.removeItem(TOKEN_PREFIX + inviteId) } catch { /* noop */ }
  },
  lastInviteId(): string | null {
    try { return localStorage.getItem(LAST_INVITE_KEY) } catch { return null }
  },
}

// ── request core ─────────────────────────────────────────────────────────────

async function request<T>(
  path: string,
  opts: { method?: string; body?: unknown; inviteId?: string } = {}
): Promise<T> {
  const headers: Record<string, string> = {}
  if (opts.body !== undefined) headers['Content-Type'] = 'application/json'
  if (opts.inviteId) {
    const token = claimStore.get(opts.inviteId)
    if (token) headers['X-Claim-Token'] = token
  }

  const res = await fetch(path, {
    method: opts.method ?? 'GET',
    headers,
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
  })

  if (res.status === 204) return undefined as T

  let payload: unknown = null
  try { payload = await res.json() } catch { /* empty body */ }

  if (!res.ok) {
    const code =
      (payload as { error?: string } | null)?.error ?? `http_${res.status}`
    throw new ApiError(res.status, code)
  }
  return payload as T
}

// ── endpoints ────────────────────────────────────────────────────────────────

export const api = {
  plans: () => request<Plan[]>('/api/plans'),
  themes: () => request<Theme[]>('/api/themes'),
  extrasCatalog: () => request<ExtraCatalogItem[]>('/api/extras'),

  createInvite: (input: { theme_id?: string; plan_id?: string }) =>
    request<{ id: string; slug: string; claim_token?: string }>('/api/invites', {
      method: 'POST',
      body: input,
    }),

  getInvite: (id: string) =>
    request<Invite>(`/api/invites/${id}`, { inviteId: id }),

  patchInvite: (id: string, fields: InvitePatch) =>
    request<Invite>(`/api/invites/${id}`, { method: 'PATCH', body: fields, inviteId: id }),

  getQuote: (id: string) =>
    request<Quote>(`/api/invites/${id}/quote`, { inviteId: id }),

  listSections: (id: string) =>
    request<Section[]>(`/api/invites/${id}/sections`, { inviteId: id }),

  addSection: (id: string, type: string, config: Record<string, unknown> = {}) =>
    request<Section>(`/api/invites/${id}/sections`, {
      method: 'POST',
      body: { type, config },
      inviteId: id,
    }),

  patchSection: (id: string, sectionId: string, config: Record<string, unknown>) =>
    request<Section>(`/api/invites/${id}/sections/${sectionId}`, {
      method: 'PATCH',
      body: { config },
      inviteId: id,
    }),

  deleteSection: (id: string, sectionId: string) =>
    request<void>(`/api/invites/${id}/sections/${sectionId}`, {
      method: 'DELETE',
      inviteId: id,
    }),

  listExtras: (id: string) =>
    request<InviteExtra[]>(`/api/invites/${id}/extras`, { inviteId: id }),

  addExtra: (id: string, extraId: string) =>
    request<InviteExtra>(`/api/invites/${id}/extras`, {
      method: 'POST',
      body: { extra_id: extraId, quantity: 1 },
      inviteId: id,
    }),

  removeExtra: (id: string, inviteExtraId: string) =>
    request<void>(`/api/invites/${id}/extras/${inviteExtraId}`, {
      method: 'DELETE',
      inviteId: id,
    }),

  listMedia: (id: string) =>
    request<MediaAsset[]>(`/api/invites/${id}/media`, { inviteId: id }),

  initiateUpload: (id: string, input: { kind: string; filename: string; mime: string; bytes?: number }) =>
    request<UploadTicket>(`/api/invites/${id}/media`, {
      method: 'POST',
      body: input,
      inviteId: id,
    }),

  completeUpload: (id: string, assetId: string) =>
    request<{ status: string }>(`/api/invites/${id}/media/${assetId}/complete`, {
      method: 'POST',
      body: {},
      inviteId: id,
    }),

  getAsset: (id: string, assetId: string) =>
    request<MediaAsset>(`/api/invites/${id}/media/${assetId}`, { inviteId: id }),

  claim: (id: string, claimToken: string) =>
    request<{ invite_id: string }>(`/api/invites/${id}/claim`, {
      method: 'POST',
      body: { claim_token: claimToken },
    }),

  checkout: (id: string) =>
    request<{ url: string }>(`/api/invites/${id}/checkout`, { method: 'POST', inviteId: id }),

  verifyPayment: (id: string, sessionId: string) =>
    request<{ status: string; amount_cents: number; currency: string; paid_at: string | null }>(
      `/api/invites/${id}/verify-payment?session_id=${encodeURIComponent(sessionId)}`,
      { inviteId: id }
    ),

  // Renders the snapshot + flips the invite to 'published'. Requires the
  // authenticated owner. `manage_url` is present only on the FIRST publish.
  publish: (id: string) =>
    request<{ slug: string; version: number; snapshot_id: string; url: string; manage_url?: string }>(
      `/api/invites/${id}/publish`,
      { method: 'POST', inviteId: id }
    ),
}

// ── upload pipeline ──────────────────────────────────────────────────────────

const MUX_KINDS = ['opening_video', 'hero_video']

// Initiate → direct PUT → (storage only) complete. Returns the asset id.
// The file never passes through the app server.
export async function uploadFile(
  inviteId: string,
  kind: string,
  file: File
): Promise<string> {
  const ticket = await api.initiateUpload(inviteId, {
    kind,
    filename: file.name,
    mime: file.type || 'application/octet-stream',
    bytes: file.size,
  })

  const putRes = await fetch(ticket.upload_url, {
    method: 'PUT',
    body: file,
    headers: MUX_KINDS.includes(kind)
      ? {}
      : { 'Content-Type': file.type || 'application/octet-stream' },
  })
  if (!putRes.ok) throw new ApiError(putRes.status, 'upload_failed')

  // Mux finalizes via webhook; storage kinds are finalized by us
  if (!MUX_KINDS.includes(kind)) {
    await api.completeUpload(inviteId, ticket.asset_id)
  }
  return ticket.asset_id
}

// Polls an asset until it leaves uploading/processing. Returns a stop function.
export function pollAsset(
  inviteId: string,
  assetId: string,
  onUpdate: (asset: MediaAsset) => void,
  intervalMs = 3000
): () => void {
  let stopped = false
  const tick = async () => {
    if (stopped) return
    try {
      const asset = await api.getAsset(inviteId, assetId)
      onUpdate(asset)
      if (asset.status === 'ready' || asset.status === 'failed') return
    } catch { /* transient — keep polling */ }
    if (!stopped) setTimeout(tick, intervalMs)
  }
  tick()
  return () => { stopped = true }
}

// ── display helpers ──────────────────────────────────────────────────────────

export function euros(cents: number): string {
  const v = cents / 100
  return Number.isInteger(v) ? `€${v}` : `€${v.toFixed(2)}`
}

// Quote line-item labels arrive as machine codes ("plan:premium",
// "extra:section_overage"). Render them in the interface's voice.
export function lineItemLabel(label: string, planName?: string | null): string {
  if (label.startsWith('plan:')) return planName ?? 'Your invitation'
  const code = label.replace(/^extra:/, '')
  if (code === 'section_overage') return 'Additional sections'
  if (code === 'custom_video') return 'Custom film'
  return code.replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase())
}
