import { createServiceClient } from '@/lib/supabase/service'
import { cached, serverError } from '@/lib/api/response'

// GET /api/extras — public catalog of purchasable extras.
// Prices here are display-only; the server snapshots the price at add time
// and the quote endpoint remains the sole source of truth for totals.
export async function GET() {
  // Public catalog → cookieless service client so Vercel's CDN can cache it.
  const supabase = createServiceClient()

  const { data, error } = await supabase
    .from('extras')
    .select('id, code, name, price_cents')
    .eq('active', true)
    .order('price_cents')

  if (error) return serverError()
  return cached(data)
}
