import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import {
  computeTotal,
  CUSTOM_VIDEO_CODE,
  type ComputeTotalResult,
} from '@/lib/pricing'

// Builds and returns a live quote for an invite.
// Pass useServiceClient=true for anonymous draft contexts where
// RLS would otherwise block the read.
export async function buildQuote(
  inviteId: string,
  { useServiceClient = false }: { useServiceClient?: boolean } = {}
): Promise<ComputeTotalResult | { error: string }> {
  const db = useServiceClient ? createServiceClient() : await createClient()

  // All the reads this quote needs in ONE parallel round-trip instead of 6
  // sequential ones (the old version was ~6×DB-latency ≈ 700ms on a remote DB).
  // None of these depend on each other's RESULTS — `plan` is resolved from the
  // (tiny) plans catalog in memory rather than via a second query keyed on plan_id,
  // and the custom-video price is fetched unconditionally and only applied if used.
  const [inviteRes, sectionsRes, extrasRes, plansRes, cvRes] = await Promise.all([
    db.from('invites').select('plan_id').eq('id', inviteId).single(),
    // One read covers BOTH the section count and the opening-section config.
    db.from('invite_sections').select('type, config').eq('invite_id', inviteId),
    db.from('invite_extras').select('id, quantity, unit_price_cents, extras(code)').eq('invite_id', inviteId),
    db.from('plans').select('id, code, base_price_cents, included_sections'),
    db.from('extras').select('price_cents').eq('code', CUSTOM_VIDEO_CODE).eq('active', true).maybeSingle(),
  ])

  const planId = inviteRes.data?.plan_id
  if (!planId) return { error: 'no_plan_selected' }

  const plan = (plansRes.data ?? []).find((p) => p.id === planId)
  if (!plan) return { error: 'plan_not_found' }

  const sections = sectionsRes.data ?? []
  const sections_count = sections.length

  // Extras with snapshotted prices + their catalog code for labels
  const extras = (extrasRes.data ?? []).map((ie) => ({
    invite_extra_id: ie.id,
    extra_code: (ie.extras as { code: string } | null)?.code ?? '',
    quantity: ie.quantity,
    unit_price_cents: ie.unit_price_cents,
  }))

  // Custom film upload — a flat per-invite fee whenever the couple supply their
  // own opening video (vs. a curated preset). Derived server-side from the
  // opening section so it can't be skipped and stays consistent across the live
  // quote and checkout (both call buildQuote). Preset films are free.
  const openingSection = sections.find((s) => s.type === 'opening')
  const hasCustomVideo = !!(openingSection?.config as { video_asset_id?: string | null } | null)?.video_asset_id
  if (hasCustomVideo && cvRes.data?.price_cents) {
    extras.push({
      invite_extra_id: CUSTOM_VIDEO_CODE,
      extra_code: CUSTOM_VIDEO_CODE,
      quantity: 1,
      unit_price_cents: cvRes.data.price_cents,
    })
  }

  // Pages are all included — we do NOT charge per page. The only paid add-on is a
  // couple's own uploaded opening film (CUSTOM_VIDEO_CODE, added above). Passing a
  // null overage price disables the section-overage line entirely.
  return computeTotal({
    plan: {
      code: plan.code,
      base_price_cents: plan.base_price_cents,
      included_sections: plan.included_sections,
    },
    extras,
    sections_count: sections_count ?? 0,
    overage_price_cents: null,
  })
}
