import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { detectCurrency } from '@/lib/currency'

type CookieToSet = { name: string; value: string; options?: CookieOptions }

const CURRENCY_COOKIE = 'di:currency'
const AUTHED_PATHS = ['/builder', '/manage', '/api/invites']

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  // Stamp currency cookie at edge on first visit — pure header read, no DB call.
  // Client components read this cookie to show the right currency on static pages.
  if (!request.cookies.get(CURRENCY_COOKIE)) {
    const currency = detectCurrency(request.headers.get('x-vercel-ip-country'))
    supabaseResponse.cookies.set(CURRENCY_COOKIE, currency, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: 'lax',
      path: '/',
    })
  }

  // Supabase session refresh only for authenticated planes.
  const { pathname } = request.nextUrl
  if (AUTHED_PATHS.some((p) => pathname.startsWith(p))) {
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
  }

  return supabaseResponse
}

export const config = {
  // Run on all routes except Next.js internals and static assets.
  // Currency cookie stamping is cheap (edge-only, no DB). Supabase auth
  // is scoped to authed paths inside the handler above.
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico).*)'],
}
