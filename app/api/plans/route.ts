import { createClient } from '@/lib/supabase/server'
import { ok, serverError } from '@/lib/api/response'

export async function GET() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('plans')
    .select('id, code, name, base_price_cents, included_sections, sort_order')
    .eq('active', true)
    .order('sort_order')

  if (error) return serverError()
  return ok(data)
}
