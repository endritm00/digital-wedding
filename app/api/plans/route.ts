import { createServiceClient } from '@/lib/supabase/service'
import { cached, serverError } from '@/lib/api/response'

export async function GET() {
  // Public catalog → cookieless service client so Vercel's CDN can cache it.
  const supabase = createServiceClient()

  const { data, error } = await supabase
    .from('plans')
    .select('id, code, name, base_price_cents, included_sections, sort_order')
    .eq('active', true)
    .order('sort_order')

  if (error) return serverError()
  return cached(data)
}
