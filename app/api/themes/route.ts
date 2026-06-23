import { NextRequest } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'
import type { Database } from '@/lib/supabase/database.types'
import { cached, serverError } from '@/lib/api/response'

type ThemeCategory = Database['public']['Enums']['theme_category']
const THEME_CATEGORIES: ThemeCategory[] = ['wedding', 'save_the_date', 'birthday']

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  // Public catalog → cookieless service client so the response is shareable and
  // CDN-cacheable (a cookie-reading client forces a private, per-request render).
  const supabase = createServiceClient()
  let query = supabase
    .from('themes')
    .select('id, slug, name, category, status, config, preview_url, sort_order')
    .neq('status', 'retired')
    .order('sort_order')

  // Only filter on a recognised category; ignore arbitrary query input.
  if (category && THEME_CATEGORIES.includes(category as ThemeCategory)) {
    query = query.eq('category', category as ThemeCategory)
  }

  const { data, error } = await query
  if (error) return serverError()
  return cached(data)
}
