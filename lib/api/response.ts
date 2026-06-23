import { NextResponse } from 'next/server'

export const ok = <T>(data: T, status = 200) =>
  NextResponse.json(data, { status })

// For PUBLIC, rarely-changing catalog data (themes/plans/extras). The route must
// not read cookies/auth (use the cookieless service client) so the response is
// genuinely shared — then Vercel's CDN caches it at the edge: the first request
// hits the DB, the rest (for s-maxage seconds) are served instantly, and
// stale-while-revalidate refreshes in the background without ever blocking a load.
export const cached = <T>(data: T, sMaxAge = 600, swr = 86400) =>
  NextResponse.json(data, {
    status: 200,
    headers: { 'Cache-Control': `public, s-maxage=${sMaxAge}, stale-while-revalidate=${swr}` },
  })

const err = (message: string, status: number) =>
  NextResponse.json({ error: message }, { status })

export const badRequest    = (message: string)      => err(message, 400)
export const unauthorized  = (message = 'unauthorized') => err(message, 401)
export const forbidden     = (message = 'forbidden')    => err(message, 403)
export const notFound      = (message = 'not_found')    => err(message, 404)
export const serverError   = (message = 'internal_server_error') => err(message, 500)
