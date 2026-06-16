import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { ok, notFound, serverError } from '@/lib/api/response'

type Params = { params: Promise<{ slug: string }> }

export async function GET(_req: NextRequest, { params }: Params) {
  const { slug } = await params
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('themes')
    .select('id, slug, name, category, status, config, preview_url, sort_order')
    .eq('slug', slug)
    .neq('status', 'retired')
    .single()

  if (error || !data) return notFound('theme_not_found')
  return ok(data)
}
