import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { ok, serverError } from '@/lib/api/response'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  const supabase = await createClient()
  let query = supabase
    .from('themes')
    .select('id, slug, name, category, status, config, preview_url, sort_order')
    .neq('status', 'retired')
    .order('sort_order')

  if (category) query = query.eq('category', category)

  const { data, error } = await query
  if (error) return serverError()
  return ok(data)
}
