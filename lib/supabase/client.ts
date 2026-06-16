'use client'

import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

// Use in Client Components only.
// Creates a singleton per page load; safe to call multiple times.
export function createClient(): SupabaseClient<Database> {
  // Cast bridges @supabase/ssr@0.6.1's stale return type vs supabase-js 2.108's
  // newer generic signature; the runtime object is a SupabaseClient<Database>.
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  ) as unknown as SupabaseClient<Database>
}
