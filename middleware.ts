import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

type CookieToSet = { name: string; value: string; options?: CookieOptions }

// Refreshes the Supabase session on every request so Server Components
// always receive a non-expired session. Required by @supabase/ssr.
export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: CookieToSet[]) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Do not remove — required to keep session cookies refreshed.
  await supabase.auth.getUser()

  return supabaseResponse
}

export const config = {
  // Scope session refresh to the authenticated planes only. Public routes
  // (/, /themes, /invite/**, catalog & webhook APIs) read no cookie session
  // and must stay statically/ISR cacheable — running auth middleware on them
  // forces per-request dynamic rendering and defeats the CDN/ISR cache.
  matcher: ['/builder/:path*', '/manage/:path*', '/api/invites/:path*'],
}
