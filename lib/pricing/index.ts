// Single source of truth for invite pricing.
// Imported by the live-quote API route AND the create-payment edge function.
// Never duplicate this logic in SQL.

export const SECTION_OVERAGE_CODE = 'section_overage' as const

export interface PricingPlan {
  code: string
  base_price_cents: number
  included_sections: number | null  // null = unlimited
}

export interface PricingExtra {
  invite_extra_id: string
  extra_code: string
  quantity: number
  unit_price_cents: number  // snapshotted at add time — never re-read from catalog
}

export interface LineItem {
  label: string
  amount_cents: number
}

export interface ComputeTotalResult {
  amount_cents: number
  line_items: LineItem[]
}

export interface ComputeTotalInput {
  plan: PricingPlan
  extras: PricingExtra[]
  sections_count: number
  // Price per overage section. Caller resolves this from the extras catalog.
  // Pass null/undefined when the plan has unlimited sections.
  overage_price_cents?: number | null
}

export function computeTotal(input: ComputeTotalInput): ComputeTotalResult {
  const { plan, extras, sections_count, overage_price_cents } = input
  const line_items: LineItem[] = []

  // Base plan
  line_items.push({
    label: `plan:${plan.code}`,
    amount_cents: plan.base_price_cents,
  })

  // Extras — use the snapshotted unit price, not the current catalog price
  for (const e of extras) {
    if (e.unit_price_cents > 0) {
      line_items.push({
        label: `extra:${e.extra_code}`,
        amount_cents: e.unit_price_cents * e.quantity,
      })
    }
  }

  // Section overage
  // Guard: plan.included_sections = null means unlimited; treat as Infinity
  // so null arithmetic doesn't silently produce NaN.
  const cap = plan.included_sections ?? Infinity
  const overage_count = Math.max(0, sections_count - cap)
  if (overage_count > 0 && overage_price_cents != null && overage_price_cents > 0) {
    line_items.push({
      label: `extra:${SECTION_OVERAGE_CODE}`,
      amount_cents: overage_price_cents * overage_count,
    })
  }

  const amount_cents = line_items.reduce((sum, li) => sum + li.amount_cents, 0)

  return { amount_cents, line_items }
}
