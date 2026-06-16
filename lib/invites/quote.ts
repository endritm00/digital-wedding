import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import {
  computeTotal,
  SECTION_OVERAGE_CODE,
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

  // Fetch plan via the invite's plan_id
  const { data: invite } = await db
    .from('invites')
    .select('plan_id')
    .eq('id', inviteId)
    .single()

  if (!invite?.plan_id) return { error: 'no_plan_selected' }

  const { data: plan } = await db
    .from('plans')
    .select('code, base_price_cents, included_sections')
    .eq('id', invite.plan_id)
    .single()

  if (!plan) return { error: 'plan_not_found' }

  // Section count drives overage calculation
  const { count: sections_count } = await db
    .from('invite_sections')
    .select('*', { count: 'exact', head: true })
    .eq('invite_id', inviteId)

  // Extras with snapshotted prices + their catalog code for labels
  const { data: rawExtras } = await db
    .from('invite_extras')
    .select('id, quantity, unit_price_cents, extras(code)')
    .eq('invite_id', inviteId)

  // Overage price from the live catalog (not snapshotted — it's a config value)
  const { data: overageExtra } = await db
    .from('extras')
    .select('price_cents')
    .eq('code', SECTION_OVERAGE_CODE)
    .eq('active', true)
    .single()

  return computeTotal({
    plan: {
      code: plan.code,
      base_price_cents: plan.base_price_cents,
      included_sections: plan.included_sections,
    },
    extras: (rawExtras ?? []).map((ie) => ({
      invite_extra_id: ie.id,
      extra_code: (ie.extras as { code: string } | null)?.code ?? '',
      quantity: ie.quantity,
      unit_price_cents: ie.unit_price_cents,
    })),
    sections_count: sections_count ?? 0,
    overage_price_cents: overageExtra?.price_cents ?? null,
  })
}
