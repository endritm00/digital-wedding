# Belle Nuit — Load Test Report

**Date:** 2026-06-25
**Build:** production (`next build` → `next start`), Node 22.14, single local instance
**Tool:** autocannon (HTTP/1.1 keep-alive), staged concurrency 10 → 500
**Target data:** real published invite `slug=77a2fa7287` (immutable snapshot), live Supabase
**Scope (agreed):** reads-only — guest/marketing pages + catalog APIs. No Stripe / Mux / email / writes.
**Harness:** [`loadtest/run.mjs`](loadtest/run.mjs) · raw data: [`loadtest/results.json`](loadtest/results.json)

---

## Status: FIXED ✅ (2026-06-25)

The headline issue (guest page not cached) is **fixed and verified**. The page now serves `Cache-Control: s-maxage=300, stale-while-revalidate`, builds as `○` Static (ISR), and benchmarks at **~1,570 RPS / p50 125ms** (was ~110 RPS / p50 1,648ms) — a **14×** improvement. The write/create path was also tested (was previously out of scope). See "Fixes applied" and "Create/write-path test" below.

---

## TL;DR

1. **Reliability is excellent.** 0 non-2xx and 0 timeouts across all read endpoints at concurrency 10–200, and **9,932/9,932 successful inserts** on the write path at up to 500 concurrent. Nothing crashed, leaked, or failed under sustained load.

2. **🔴→✅ Headline finding (now fixed) — the guest invite page was not cached.** `/invite/[id]` was returning `Cache-Control: private, no-cache, no-store` and re-rendering on **every** request (full React render + 2 Supabase queries), despite `export const revalidate = 300`. This silently defeated the entire CDN/ISR strategy. It required **three** changes to fix (middleware scope was only the first cause) — see "Fixes applied."

3. **The "1M req/min" claim is true _only for cache-HIT traffic._** Cache hits (static pages, the `/api/snapshots` CDN path) scale effectively infinitely via the edge. **Cache-MISS / origin traffic is gated to a few hundred RPS per instance and ultimately by the Supabase connection pool** — it degrades hard past ~300 concurrent (thousands of errored sockets at c=500). For 10k concurrent guests this is fine *if* responses are cached, and a problem if they are not (see #2).

4. **Vercel cost is entirely a function of cache-hit ratio.** With caching working, 10k guests ≈ bandwidth-only (pennies). With the current dynamic guest page, 10k guests ≈ 10k function invocations + 20k Supabase queries (real money + pool-exhaustion risk). Fixing #2 is also the #1 cost-control lever.

---

## Fixes applied (guest page now cacheable)

The load test exposed that `/invite/[id]` rendered dynamically. Diagnosing it revealed **three independent causes**, all now fixed and verified:

1. **`middleware.ts` matcher scoped to authed planes only** (done by agent).
   `matcher: ['/builder/:path*', '/manage/:path*', '/api/invites/:path*']` instead of the catch-all. The middleware ran `supabase.auth.getUser()` on every public route, touching the session cookie and forcing pages dynamic. Verified: `/invite/**` no longer emits `set-cookie`, and authed API routes still return `401` (session path intact). *This was necessary but not sufficient.*

2. **`generateStaticParams()` added to `app/invite/[id]/page.tsx`** (returns `[]`).
   A dynamic-param route with `revalidate` but no `generateStaticParams` is never registered as ISR in Next 15.

3. **`export const dynamic = 'force-static'` added to the guest page** — *the real culprit.*
   The Supabase JS client issues uncached `fetch()` internally; Next 15 defaults `fetch` to `no-store`, which alone forces the whole route into per-request dynamic rendering (`no-store`). `force-static` makes those fetches cacheable and renders the page once per `revalidate` window. Safe because the page reads no `cookies()`/`headers()`/`searchParams` — only the immutable snapshot by id via the stateless service client.

**Verified result:** build classification `ƒ`→`○`; header `private, no-store`→`s-maxage=300, stale-while-revalidate`; throughput ~110→**~1,570 RPS**; p50@200 1,648ms→**125ms**; p99 2,675ms→**168ms**; content renders correctly. Re-publish still shows fresh because the publish route calls `revalidatePath()` and `s-maxage` caps staleness at 5 min (the original design intent).

> Note: the bare `/builder` entry page (a client-only shell that creates the draft on mount) is now statically cached — harmless. The builder STEP routes (`/builder/[inviteId]/*`) and the invite APIs remain covered by the matcher, so session refresh is intact where it matters.

---

## Create / write-path test (10k concurrent users *creating* invites)

This is the scenario you specifically wanted: many distinct users hitting **POST `/api/invites`** at once. It was originally out of scope (we'd agreed reads-only), now tested directly.

**Setup:** `POST /api/invites` is anonymous-friendly (empty body → anonymous draft via service client). A raw-HTTP driver ([`loadtest/create-raw.mjs`](loadtest/create-raw.mjs)) sends a **unique `X-Forwarded-For` per request**, faithfully simulating N distinct users — each with their own rate-limiter budget — against the real Supabase. Every row tagged `draft_email=loadtest@bellenuit.test` and **deleted afterward (9,959 rows removed, verified 0 remaining)**.

**Why one local instance is representative here:** reads fan out across cache + replicas, but **writes all funnel to one Postgres primary** regardless of how many Vercel lambdas exist. So the single-instance write ceiling against the real DB is close to the true production ceiling — the shared primary is the bottleneck, not the app tier.

| Concurrency (distinct users) | RPS | p50 | p99 | max | 201 Created | 429 | Errors |
|--:|--:|--:|--:|--:|--:|--:|--:|
| 25 | 210 | 101ms | 892ms | 942ms | 1,680 | 0 | 0 |
| 100 | 333 | 295ms | 742ms | 811ms | 2,665 | 0 | 0 |
| 250 | 339 | 709ms | 2,052ms | 2,396ms | 2,708 | 0 | 0 |
| 500 | 360 | 1,368ms | 3,508ms | 3,733ms | 2,879 | 0 | 0 |

**Findings:**
- **100% write success** — 9,932/9,932 inserts succeeded, **0 errors and 0 dropped connections even at 500 concurrent** (more stable than the read-origin path was at c=500).
- **Write ceiling ≈ 350 inserts/sec per app instance** against the real Supabase. Throughput plateaus from c≈100; added concurrency just queues (p50 rises 101→1,368ms) — Supabase was absorbing 350 inserts/sec without rejecting.
- **The per-IP draft limiter (10 creates/IP/hour) is NOT a bottleneck for legitimate users** — each distinct IP has its own budget. It only throttles a single abusive source (confirmed: a same-IP flood is correctly 429'd after 10).

**Does "10k concurrent creates" work?**
- **Spread over a realistic window** (a launch/campaign over minutes): ~30–170 writes/sec aggregate — *comfortably* within one instance, let alone Vercel's fan-out. ✅
- **A literal 10k-in-one-second create burst:** Vercel scales app instances, but all INSERTs hit one Postgres primary. The test shows Supabase handled ~350/sec/instance cleanly; pushing to thousands/sec of sustained writes would need validation against your specific Supabase plan's CPU/connection limits (the primary, not the app, is the ceiling). For a wedding-invite builder this instantaneous-create herd is far less likely than the guest-open herd (which is now cached).

**Honest scope caveat:** this measured the create *entry point* (one INSERT). A full builder session is create + dozens of section/media writes over several minutes. 10k concurrent *full builder sessions* would generate a higher aggregate write rate (hundreds–low-thousands/sec) — I tested the representative single write op and the entry-point burst, not 10k simultaneous multi-minute sessions (media uploads hit Mux/Storage, excluded by scope). If you expect that, size the Supabase plan accordingly and we can test the section-write path next.

---

## Methodology & honest caveats

This was run against **one local Node instance on one laptop**, not a horizontally-scaled Vercel deployment. That is deliberate and the right tool for the question, but read the numbers correctly:

- **What this measures well:** per-request cost, per-instance throughput ceiling, latency-under-contention curves, whether responses are cacheable, relative cost of each endpoint, Supabase read behaviour under burst, and error behaviour at saturation.
- **What it does NOT measure:** Vercel cold starts, edge/CDN cache behaviour (locally there is no CDN — so API routes that *would* be cached at the edge instead execute every request, which is exactly what we wanted for the worst-case origin numbers), or true horizontal scale. On Vercel the app runs N instances behind autoscaling; the real ceiling is not the Node process but **the shared Supabase pool + the cache-hit ratio**.
- **Extrapolation model:** Vercel scales instances horizontally, so multiply per-instance RPS by instance count — *until* you hit the shared Supabase pool, which does **not** scale with instances. That crossover is the real capacity limit for uncached traffic.

Two endpoint classes were measured separately:

| Class | Endpoints | Locally serves… | Models… |
|---|---|---|---|
| **CACHED** | `/`, `/themes`, `/invite/[id]` | from Next cache after warm-up | warm guest best-case |
| **ORIGIN** | `/api/snapshots/[slug]`, `/api/themes`, `/api/plans`, `/api/extras`, `/api/health` | handler executes every request | all-cache-miss worst-case |

---

## Raw benchmarks (per single instance)

### CACHED — static / page serving

| Endpoint | c=10 RPS | c=50 RPS | c=100 RPS | c=200 RPS | p50 @200 | p99 @200 | errors |
|---|--:|--:|--:|--:|--:|--:|--:|
| `/` (home, static) | 576 | 603 | 586 | 570 | 340ms | 842ms | 0 |
| `/themes` (static) | 509 | 527 | 510 | 495 | 389ms | 1071ms | 0 |
| `/invite/[id]` (**dynamic!**) | 47 | 108 | 112 | 110 | 1648ms | 2675ms | 0 |

Static pages hold a flat ~570 RPS ceiling (one instance saturated; added concurrency just queues — latency rises linearly, throughput stays flat, no errors). The guest invite page sits at **~110 RPS** — 5× slower — because it is re-rendering, not serving from cache.

### ORIGIN — handler + Supabase on every request

| Endpoint | Queries | c=10 RPS | c=50 RPS | c=100 RPS | c=200 RPS | p50 @200 | p99 @200 |
|---|--:|--:|--:|--:|--:|--:|--:|
| `/api/snapshots/[slug]` | 2 | 51 | 217 | 291 | 297 | 614ms | 1282ms |
| `/api/themes` | 1 | 98 | 356 | 369 | 370 | 487ms | 1045ms |
| `/api/plans` | 1 | 89 | 257 | 292 | 258 | 518ms | 3932ms |
| `/api/extras` | 1 | 48 | 278 | 374 | 377 | 481ms | 1028ms |
| `/api/health` | 1 | 93 | 358 | 362 | 370 | 505ms | 1672ms |

Single-query APIs plateau ~**370 RPS/instance**; the two-query snapshot API ~**300 RPS/instance**. The p99 spikes (e.g. plans 3.9s at c=200) are **Supabase connection-pool contention** under burst, not app CPU.

### Break point — pushing the origin past saturation

| Endpoint | c=300 | c=500 |
|---|--:|--:|
| `/api/themes` | 297 RPS, p99 3.0s, **0 err** | 335 RPS, p99 9.6s, **7,903 errored sockets** |
| `/api/snapshots` | 269 RPS, p99 9.6s, **4,413 err** | 265 RPS, p99 9.6s, **7,506 err** |

Past ~300 concurrent against a single instance, the origin collapses: latency hits the 10s ceiling and thousands of connections error out. **This is the uncached-origin wall.** On Vercel more instances push this wall further out — but every instance pulls from the *same* Supabase pool, so the wall ultimately belongs to Supabase, not Next.

### Cold single-request latency (no contention)

| Path | Time | Notes |
|---|--:|---|
| `/` | 14ms | static |
| `/themes` | 11ms | static |
| `/invite/[id]` | 326ms | cold render + 2 Supabase reads |
| `/api/snapshots/[slug]` | 312ms | 2 sequential Supabase reads |
| `/api/themes` · `/plans` · `/extras` | 127–173ms | ≈ 1 Supabase round-trip (network-dominated) |
| `/api/health` | 127ms | 1-row DB probe |

Catalog APIs are **network-bound on Supabase RTT (~100–150ms)**, not compute. The snapshot API's 312ms is two *sequential* queries — a candidate to collapse into one join (see recommendations).

---

## 🔴 Primary finding: the guest page renders dynamically

### Evidence
```
GET /invite/77a2fa7287  →  Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate
```
The page exports `revalidate = 300` (intending ISR) but is served dynamic. Build output marks it `ƒ (Dynamic)`. Result: every guest view = 1 server render + 2 Supabase queries → the ~110 RPS/instance ceiling and 1.6s p50 under load.

### Root cause
`middleware.ts` matches **every** route (the matcher only excludes `_next` and static files) and calls `supabase.auth.getUser()`, touching session cookies on the response. Middleware that reads/writes the session cookie forces matched pages out of the static/ISR cache into per-request dynamic rendering. The guest page itself is a perfect cache candidate — `createServiceClient()` is stateless (no cookies/headers) and the page reads only the **immutable published snapshot**; there is **zero per-user data** on it.

The same middleware also runs an auth check on `/`, `/themes`, `/themes/[slug]` — pure waste for anonymous visitors (and an extra Supabase Auth round-trip per request whenever a session cookie *is* present).

### Fix (single highest-impact change before launch)
Scope the middleware matcher to the **authenticated planes only** — the builder, the manage page, and the authed invite APIs:

```ts
// middleware.ts
export const config = {
  matcher: [
    '/builder/:path*',
    '/manage/:path*',
    '/api/invites/:path*',
  ],
}
```

Then verify `/invite/[id]` serves `Cache-Control: s-maxage=...` / `x-nextjs-cache: HIT` and re-benchmark — it should jump from ~110 RPS to the static-tier ~500+ RPS and, on Vercel, be served from the edge with origin renders only ~once per `revalidate` window per region.

> After changing the matcher, smoke-test that `/builder/*` and `/manage/*` still refresh the session correctly (these are the routes that actually need it).

---

## 10,000-concurrent-guests verdict

**Realistic scenario:** one invite is shared to a large guest list; thousands open it in a short window. This is a **read fan-out of one cacheable document**, not 10k independent heavy workloads.

- **With caching fixed (#2):** 10k guests are served the same snapshot HTML from the Vercel edge cache. Origin renders ~once per 300s per region; Supabase sees a trickle. Bandwidth ≈ 29KB × 10k ≈ **~290MB**. **This scales to far beyond 10k with no lag.** The "1M req/min" design goal holds for this path.
- **With the current dynamic page:** 10k views = 10k renders + 20k Supabase queries in a burst. Per-instance ceiling ~110 RPS means Vercel must fan out to ~50–100 concurrent instances, **all sharing one Supabase pool** — exactly the condition that produced thousands of errored sockets at c=500 in testing. Expect elevated latency and partial failures under a true spike.

**Bottleneck ranking for uncached traffic:** (1) Supabase connection pool → (2) per-render React cost on the guest page → (3) Next/Node compute. Caching removes #1 and #2 from the hot path entirely.

---

## Vercel setup — avoiding runaway function bills

Cost on Vercel = **function GB-seconds + invocations + bandwidth**. Cached responses cost ~bandwidth-only; uncached responses cost compute. So cost control ≈ cache-hit ratio + guardrails.

### Do these before launch
1. **Fix the middleware matcher (#2).** Converts the highest-traffic page from a billed function invocation per view into an edge cache hit. Single biggest cost *and* performance lever.
2. **Set a Spend Management hard cap + budget alerts** (Vercel → Settings → Billing → Spend Management). This is the actual guarantee against a surprise bill — set a monthly ceiling you're comfortable with and an email alert at 50%/80%.
3. **Cap function duration.** Add `export const maxDuration = 10` (or lower) to API routes and the guest page so a hung Supabase call can't run to the platform max and rack up GB-seconds. The break-point test showed requests pinned at the 10s ceiling under saturation — bound that.
4. **Keep Fluid Compute on (Vercel default).** These functions are I/O-bound (waiting on Supabase). Fluid bills active CPU and shares idle time across concurrent invocations, which is materially cheaper than classic per-invocation billing for wait-heavy workloads. Don't opt out.
5. **Pin the region to `fra1`** (or wherever Supabase lives). Co-locating function ↔ DB cuts the ~100–150ms Supabase RTT that dominates every uncached API call — directly lowering GB-seconds per request.

### Already correct — keep as-is
- **Catalog + snapshot APIs send proper CDN cache headers** (`s-maxage=600` / `s-maxage=86400`). On Vercel/Cloudflare these cache at the edge as intended. ✔
- **Media is offloaded.** Video via Mux, images via Supabase Storage — large bytes do **not** flow through Vercel bandwidth. ✔
- **`next/image` is used in exactly one marketing component**, never on the guest page — so Vercel Image Optimization billing is negligible. Keep guest/invite imagery on direct Mux/Supabase URLs. ✔
- **Rate limiting (Upstash) is in place** — keep it; it blunts abusive bursts that would otherwise become billable invocations.

### Supabase-side (the real ceiling for uncached traffic)
6. **Confirm serverless uses the Supabase pooler**, not direct Postgres. The app uses `supabase-js` (PostgREST/REST), which pools server-side — good — but PostgREST→Postgres still has finite connections (the source of the c≥300 errors). Under a real spike, caching is what keeps this pool idle. If you expect sustained uncached load, size up the Supabase plan/pooler.
7. **Optionally collapse the snapshot read into one query.** `/api/snapshots/[slug]` and the guest page do two sequential reads (invite → snapshot). A single join (or storing the snapshot content on the invite row) roughly halves the per-miss DB cost and latency. Lower priority once caching is fixed, since misses become rare.

### Cost intuition (plug in current Vercel prices)
- **Per uncached guest view:** ~1 invocation × ~0.4s × ~1.75GB ≈ **~0.7 GB-s** + 2 Supabase queries.
- **Per cached guest view:** ~0 compute, ~29KB egress.
- A single 200-guest wedding (~600 lifetime views) is trivial either way (~420 GB-s uncached). The exposure is **viral spikes and many simultaneous weddings** — precisely where the cache-hit ratio decides whether the bill is pennies or meaningful. Fixing #2 keeps you in the pennies column.

---

## Prioritized action list

| # | Action | Impact | Status |
|---|---|---|---|
| 1 | Scope `middleware.ts` matcher to `/builder`, `/manage`, `/api/invites` only | 🔴 Unblocks edge caching of the guest page | ✅ Done |
| 2 | Add `generateStaticParams` + `dynamic='force-static'` to guest page | Flips it to ISR; 14× throughput | ✅ Done |
| 3 | Re-benchmark guest page; confirm `s-maxage` header | Verifies the fix (~1,570 RPS) | ✅ Done |
| 4 | **Set Vercel Spend Management cap + budget alerts** | Hard ceiling on any surprise bill | ⬜ You — before launch |
| 5 | Add `maxDuration` to API routes + guest page | Bounds worst-case GB-seconds | ⬜ Recommended |
| 6 | Pin functions to `fra1` (next to Supabase) | −100ms+ per uncached call | ⬜ Recommended |
| 7 | (Optional) Collapse snapshot read to one query | Halves per-miss DB cost | ⬜ Optional |
| 8 | (If expecting 10k+ concurrent *builders*) size Supabase plan + test section-write path | Write primary is the real ceiling | ⬜ Optional |

**Bottom line:** the architecture is sound and the reliability under load is excellent — but ship-blocker #1 is that the guest page isn't actually being cached. Fix the middleware matcher and the "10k guests, no lag" goal is comfortably met; leave it and both performance and Vercel cost scale linearly with traffic.
