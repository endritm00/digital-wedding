import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

// Service-role client — bypasses RLS entirely.
// Use ONLY in Edge Functions, webhook handlers, and server-side jobs.
// Never expose SUPABASE_SERVICE_ROLE_KEY to the browser.
// Explicit return type so a `cond ? createServiceClient() : await createClient()`
// ternary collapses to one client type instead of an uncallable union.
export function createServiceClient(): SupabaseClient<Database> {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
