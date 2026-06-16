import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/lib/supabase/database.types'
import { ok, serverError } from '@/lib/api/response'

type ThemeCategory = Database['public']['Enums']['theme_category']
const THEME_CATEGORIES: ThemeCategory[] = ['wedding', 'save_the_date', 'birthday']

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  const supabase = await createClient()
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
  return ok(data)
}
