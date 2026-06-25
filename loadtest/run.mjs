// Belle Nuit — load-test driver (autocannon)
//
// Drives staged concurrency against a LOCAL production build (`next start`).
// Two endpoint classes are measured separately because they behave differently:
//
//   CACHED  — ISR/static pages. After warm-up they serve from the Next cache,
//             so this models the *guest best-case* (what most of 10k guests get
//             once the edge/ISR cache is warm). Origin & Supabase are NOT hit.
//
//   ORIGIN  — API route handlers. Locally there is no CDN, so the handler RUNS
//             on every request and the s-maxage header is moot. This models the
//             *all-cache-miss worst case*: real Supabase read capacity + per-
//             request compute under concurrency. This is the number that drives
//             Vercel function GB-s and Supabase pool pressure.
//
// Usage:
//   BASE=http://127.0.0.1:3100 SLUG=77a2fa7287 ID=03d31d1d-... node loadtest/run.mjs
//
// Output: loadtest/results.json (raw) + console summary table.

import autocannon from 'autocannon'
import { writeFileSync } from 'node:fs'

const BASE = process.env.BASE || 'http://127.0.0.1:3100'
const SLUG = process.env.SLUG || '77a2fa7287'
const ID   = process.env.ID   || '03d31d1d-b3b6-49b8-8848-cae6f89e11db'

// Concurrency stages (simultaneous open connections). A single local Next
// instance is the bottleneck — these map the latency/throughput curve as
// contention rises, which is what we extrapolate from. Each stage runs for
// `DURATION` seconds with a short pipeline depth of 1 (HTTP/1.1 keep-alive).
const STAGES   = (process.env.STAGES || '10,50,100,200').split(',').map(Number)
const DURATION = Number(process.env.DURATION || 12)
const WARMUP   = Number(process.env.WARMUP || 5)

/** @type {{name:string, class:'CACHED'|'ORIGIN', path:string, method?:string}[]} */
const TARGETS = [
  // CACHED — what a warm guest hit looks like (ISR/static serve)
  { name: 'home',            class: 'CACHED', path: '/' },
  { name: 'themes-gallery',  class: 'CACHED', path: '/themes' },
  { name: 'guest-invite',    class: 'CACHED', path: `/invite/${SLUG}` },

  // ORIGIN — every request executes the handler + Supabase read (worst case)
  { name: 'api-snapshot',    class: 'ORIGIN', path: `/api/snapshots/${SLUG}` },
  { name: 'api-themes',      class: 'ORIGIN', path: '/api/themes' },
  { name: 'api-plans',       class: 'ORIGIN', path: '/api/plans' },
  { name: 'api-extras',      class: 'ORIGIN', path: '/api/extras' },
  { name: 'api-health',      class: 'ORIGIN', path: '/api/health' }, // pure DB round-trip probe
]

function fire({ path, connections, duration, method = 'GET' }) {
  return new Promise((resolve, reject) => {
    autocannon(
      {
        url: BASE + path,
        connections,
        duration,
        method,
        // realistic browser-ish header so we don't accidentally hit a bot path
        headers: { accept: 'text/html,application/json', 'user-agent': 'bellenuit-loadtest/1.0' },
      },
      (err, res) => (err ? reject(err) : resolve(res)),
    )
  })
}

async function warm(path) {
  try { await fire({ path, connections: 4, duration: WARMUP }) } catch { /* ignore */ }
}

function row(r) {
  return {
    rps:      r.requests.average,
    rps_min:  r.requests.min,
    p50:      r.latency.p50,
    p90:      r.latency.p90,
    p99:      r.latency.p99,
    max:      r.latency.max,
    bytes_s:  r.throughput.average,
    non2xx:   (r.non2xx || 0) + (r.errors || 0),
    timeouts: r.timeouts || 0,
    total:    r.requests.total,
  }
}

const results = { base: BASE, slug: SLUG, startedAt: new Date().toISOString(), stages: STAGES, duration: DURATION, targets: {} }

console.log(`\n=== Belle Nuit load test ===`)
console.log(`base=${BASE}  stages=[${STAGES}]  duration=${DURATION}s each\n`)

for (const t of TARGETS) {
  console.log(`\n▶ ${t.name}  (${t.class})  ${t.path}`)
  await warm(t.path)
  results.targets[t.name] = { class: t.class, path: t.path, stages: {} }
  for (const c of STAGES) {
    process.stdout.write(`   c=${String(c).padStart(3)} … `)
    const res = await fire({ path: t.path, connections: c, duration: DURATION })
    const m = row(res)
    results.targets[t.name].stages[c] = m
    console.log(
      `rps=${m.rps.toFixed(0).padStart(6)}  p50=${String(m.p50).padStart(4)}ms  p99=${String(m.p99).padStart(5)}ms  max=${String(m.max).padStart(5)}ms  non2xx=${m.non2xx}  timeouts=${m.timeouts}`,
    )
  }
}

results.finishedAt = new Date().toISOString()
writeFileSync(new URL('./results.json', import.meta.url), JSON.stringify(results, null, 2))
console.log(`\n✓ wrote loadtest/results.json\n`)
