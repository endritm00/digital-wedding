import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'

// GET /api/snapshots/:slug
//
// Public delivery endpoint — the URL Cloudflare caches and guests resolve to.
// No auth. Service client for fast reads (bypasses RLS).
//
// Cache strategy:
//   s-maxage=86400        CDN caches for 24h
//   max-age=300           Browser caches for 5min (graceful fallback)
//   stale-while-revalidate=86400  Serve stale while CDN fetches fresh
//
// On re-publish: the publish route fires a targeted Cloudflare cache purge for
// this URL. The next request after purge misses the CDN and fetches a fresh
// snapshot from origin. All subsequent requests within the new 24h window are
// served from the CDN edge — origin sees one request per CDN PoP per day.
//
// ETag: "v{version}" — supports conditional requests (304 Not Modified).
// This is particularly useful for the Cloudflare revalidation request.
//
// Load-test target: 1M req/min against this URL via Cloudflare.
// Origin only needs to handle cache misses (~1 per CDN PoP per 24h per slug).
type Params = { params: Promise<{ slug: string }> }

export async function GET(request: NextRequest, { params }: Params) {
  const { slug } = await params
  const service = createServiceClient()

  // Single join: invite → published_snapshot
  const { data: invite } = await service
    .from('invites')
    .select('published_snapshot_id')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!invite?.published_snapshot_id) {
    return new Response('Not Found', { status: 404 })
  }

  const { data: snapshot } = await service
    .from('published_snapshots')
    .select('content, version, created_at')
    .eq('id', invite.published_snapshot_id)
    .single()

  if (!snapshot) {
    return new Response('Not Found', { status: 404 })
  }

  const etag = `"v${snapshot.version}"`

  // Conditional request — 304 if the CDN or browser already has this version
  if (request.headers.get('if-none-match') === etag) {
    return new Response(null, { status: 304 })
  }

  return NextResponse.json(snapshot.content, {
    headers: {
      ETag:           etag,
      'Last-Modified': new Date(snapshot.created_at as string).toUTCString(),
      'Cache-Control': 'public, s-maxage=86400, max-age=300, stale-while-revalidate=86400',
      Vary:            'Accept-Encoding',
    },
  })
}
