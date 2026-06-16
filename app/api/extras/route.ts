import { createClient } from '@/lib/supabase/server'
import { ok, serverError } from '@/lib/api/response'

// GET /api/extras — public catalog of purchasable extras.
// Prices here are display-only; the server snapshots the price at add time
// and the quote endpoint remains the sole source of truth for totals.
export async function GET() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('extras')
    .select('id, code, name, price_cents')
    .eq('active', true)
    .order('price_cents')

  if (error) return serverError()
  return ok(data)
}
