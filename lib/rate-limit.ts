import { Ratelimit, type Duration } from '@upstash/ratelimit'
import { Redis }      from '@upstash/redis'

export interface RateLimitResult {
  allowed:   boolean
  remaining: number
  resetAt:   number  // Unix ms
}

// ─── in-memory fallback (single-process, resets on cold start) ────────────────
class InMemoryStore {
  private readonly buckets = new Map<string, { count: number; resetAt: number }>()

  check(key: string, max: number, windowMs: number): RateLimitResult {
    const now    = Date.now()
    let   bucket = this.buckets.get(key)

    if (!bucket || bucket.resetAt <= now) {
      bucket = { count: 1, resetAt: now + windowMs }
      this.buckets.set(key, bucket)
      return { allowed: true, remaining: max - 1, resetAt: bucket.resetAt }
    }

    if (bucket.count >= max) {
      return { allowed: false, remaining: 0, resetAt: bucket.resetAt }
    }

    bucket.count++
    return { allowed: true, remaining: max - bucket.count, resetAt: bucket.resetAt }
  }
}

const mem = new InMemoryStore()

// ─── Upstash factory ──────────────────────────────────────────────────────────
// Returns null when UPSTASH env vars are absent → caller falls back to mem.
function makeUpstash(name: string, max: number, window: Duration): Ratelimit | null {
  const url   = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null

  return new Ratelimit({
    redis:   new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(max, window),
    prefix:  `di:rl:${name}`,
  })
}

// Module-level singletons — recreated only on cold start.
// Each limiter gets its own Ratelimit instance so sliding-window counters
// are completely isolated and never share key space.
const _rsvpLimiter     = makeUpstash('rsvp',      3,  '1 h')
const _checkoutLimiter = makeUpstash('checkout',  5,  '10 m')
const _draftLimiter    = makeUpstash('draft',     10, '1 h')
const _mediaLimiter    = makeUpstash('media',     20, '1 h')

async function check(
  rl:       Ratelimit | null,
  key:      string,
  max:      number,
  windowMs: number,
): Promise<RateLimitResult> {
  if (!rl) return mem.check(key, max, windowMs)
  const r = await rl.limit(key)
  return { allowed: r.success, remaining: r.remaining, resetAt: r.reset }
}

// ─── named limiters ───────────────────────────────────────────────────────────
export const limiters = {
  // 3 RSVPs per (slug × IP) per hour
  rsvp:     (key: string) => check(_rsvpLimiter,     key,  3,  60 * 60 * 1000),
  // 5 checkout attempts per user per 10 min
  checkout: (key: string) => check(_checkoutLimiter, key,  5,  10 * 60 * 1000),
  // 10 invite creates per IP per hour
  draft:    (key: string) => check(_draftLimiter,    key, 10,  60 * 60 * 1000),
  // 20 media uploads per invite per hour
  media:    (key: string) => check(_mediaLimiter,    key, 20,  60 * 60 * 1000),
}

// ─── response helper ──────────────────────────────────────────────────────────
export function rateLimitedResponse(result: RateLimitResult): Response {
  const retryAfterSec = Math.ceil((result.resetAt - Date.now()) / 1000)
  return new Response(JSON.stringify({ error: 'rate_limited' }), {
    status:  429,
    headers: {
      'Content-Type':          'application/json',
      'Retry-After':           String(retryAfterSec),
      'X-RateLimit-Remaining': '0',
      'X-RateLimit-Reset':     String(Math.ceil(result.resetAt / 1000)),
    },
  })
}
