// Belle Nuit — CREATE / write-path load test
//
// Simulates many DISTINCT users creating a draft invite simultaneously.
// POST /api/invites is anonymous-friendly (empty/optional body) and reads the
// client IP from X-Forwarded-For, so rotating that header per request gives us
// N distinct "users" — which also bypasses the per-IP draft rate limiter exactly
// the way N real IPs would in production.
//
// Why this is representative despite running on one local instance:
//   Reads fan out across cache + replicas; WRITES all funnel to ONE Postgres
//   primary no matter how many Vercel lambdas exist. So the write ceiling here
//   (one app instance + your real Supabase) is close to the true prod ceiling —
//   the shared DB primary is the bottleneck, not the app tier.
//
// Every created row is tagged draft_email=loadtest@bellenuit.test for cleanup.
//
// Usage: BASE=http://127.0.0.1:3100 node loadtest/create.mjs

import autocannon from 'autocannon'
import { writeFileSync } from 'node:fs'

const BASE   = process.env.BASE || 'http://127.0.0.1:3100'
const TAG    = process.env.TAG  || 'loadtest@bellenuit.test'
const STAGES = (process.env.STAGES || '10,50,100,200').split(',').map(Number)
const DURATION = Number(process.env.DURATION || 10)

const body = JSON.stringify({ draft_email: TAG })

// Deterministic-ish unique IP per request so every POST is a distinct "user".
let counter = 0
function nextIp() {
  counter++
  const a = 10 + (counter % 200)
  const b = (counter >> 8) % 256
  const c = (counter >> 16) % 256
  return `${a}.${b}.${c}.${(counter % 254) + 1}`
}

function fire(connections, duration) {
  return new Promise((resolve, reject) => {
    const inst = autocannon(
      {
        url: BASE + '/api/invites',
        method: 'POST',
        connections,
        duration,
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body,
        // mutate each request so every POST carries a unique source IP
        setupRequest: (req) => {
          req.headers = { ...req.headers, 'x-forwarded-for': nextIp() }
          return req
        },
      },
      (err, res) => (err ? reject(err) : resolve(res)),
    )
    return inst
  })
}

const results = { base: BASE, tag: TAG, startedAt: new Date().toISOString(), stages: {} }

console.log(`\n=== Belle Nuit CREATE-path load test ===`)
console.log(`POST ${BASE}/api/invites  (rotated X-Forwarded-For = distinct users)`)
console.log(`stages=[${STAGES}]  duration=${DURATION}s each  tag=${TAG}\n`)

// tiny warm-up so the first stage isn't paying cold-route cost
await fire(4, 3)

for (const c of STAGES) {
  process.stdout.write(`c=${String(c).padStart(3)} … `)
  const r = await fire(c, DURATION)
  const m = {
    rps:      r.requests.average,
    p50:      r.latency.p50,
    p90:      r.latency.p90,
    p99:      r.latency.p99,
    max:      r.latency.max,
    total:    r.requests.total,
    '2xx':    r['2xx'] || 0,
    non2xx:   r.non2xx || 0,
    errors:   r.errors || 0,
    timeouts: r.timeouts || 0,
  }
  results.stages[c] = m
  console.log(
    `rps=${m.rps.toFixed(0).padStart(5)}  p50=${String(m.p50).padStart(4)}ms  p99=${String(m.p99).padStart(5)}ms  max=${String(m.max).padStart(5)}ms  2xx=${m['2xx']}  non2xx=${m.non2xx}  errors=${m.errors}  timeouts=${m.timeouts}`,
  )
}

results.finishedAt = new Date().toISOString()
const totalCreated = Object.values(results.stages).reduce((s, m) => s + (m['2xx'] || 0), 0)
results.totalCreated = totalCreated
writeFileSync(new URL('./create-results.json', import.meta.url), JSON.stringify(results, null, 2))
console.log(`\n✓ wrote loadtest/create-results.json   (≈${totalCreated} rows created, tagged ${TAG})\n`)
