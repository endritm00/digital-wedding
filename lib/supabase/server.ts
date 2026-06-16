import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

type CookieToSet = { name: string; value: string; options?: CookieOptions }

// Use in Server Components, Route Handlers, and Server Actions.
// Each call creates a fresh client bound to the current request's cookies.
// Explicit return type so it unifies with createServiceClient() at call sites
// that pick one or the other via a ternary. The cast bridges a known type-version
// skew: @supabase/ssr@0.6.1's return type predates a generic param added in
// supabase-js 2.108, but the runtime object IS a SupabaseClient<Database>.
export async function createClient(): Promise<SupabaseClient<Database>> {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: CookieToSet[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // setAll is called from Server Components where cookies are read-only.
            // The middleware handles the actual cookie refresh; this is a no-op there.
          }
        },
      },
    }
  ) as unknown as SupabaseClient<Database>
}
