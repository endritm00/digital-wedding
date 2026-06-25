// Belle Nuit — CREATE/write-path load test (raw HTTP, guaranteed per-request IP)
//
// autocannon's setupRequest didn't reliably rotate X-Forwarded-For, so every
// request shared one IP and tripped the 10-creates/IP/hour draft limiter. This
// driver uses node:http directly and sets a UNIQUE X-Forwarded-For on every
// request, faithfully simulating N distinct users (each with their own limiter
// budget) — the real production condition.
//
// Writes are tagged draft_email=loadtest@bellenuit.test for cleanup.
//
// Usage: BASE=http://127.0.0.1:3100 node loadtest/create-raw.mjs

import http from 'node:http'
import { writeFileSync } from 'node:fs'

const BASE   = new URL(process.env.BASE || 'http://127.0.0.1:3100')
const TAG    = process.env.TAG || 'loadtest@bellenuit.test'
const STAGES = (process.env.STAGES || '25,100,250,500').split(',').map(Number)
const DURATION = Number(process.env.DURATION || 8) * 1000

const payload = Buffer.from(JSON.stringify({ draft_email: TAG }))

let ipCounter = 0
function nextIp() {
  ipCounter++
  // 11.x.x.x space — unique per request, valid-looking public-ish IP
  return `11.${(ipCounter >> 16) & 255}.${(ipCounter >> 8) & 255}.${(ipCounter & 255) || 1}`
}

function once(agent) {
  return new Promise((resolve) => {
    const start = process.hrtime.bigint()
    const req = http.request(
      {
        hostname: BASE.hostname,
        port: BASE.port,
        path: '/api/invites',
        method: 'POST',
        agent,
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          'x-forwarded-for': nextIp(),
          'content-length': payload.length,
        },
      },
      (res) => {
        res.on('data', () => {})
        res.on('end', () => {
          const ms = Number(process.hrtime.bigint() - start) / 1e6
          resolve({ status: res.statusCode, ms })
        })
      },
    )
    req.on('error', () => resolve({ status: 0, ms: Number(process.hrtime.bigint() - start) / 1e6 }))
    req.write(payload)
    req.end()
  })
}

function pct(sorted, p) {
  if (!sorted.length) return 0
  const i = Math.min(sorted.length - 1, Math.floor((p / 100) * sorted.length))
  return Math.round(sorted[i])
}

async function stage(concurrency, durationMs) {
  const agent = new http.Agent({ keepAlive: true, maxSockets: concurrency, maxFreeSockets: concurrency })
  const lat = []
  const codes = {}
  let inflight = 0
  let stop = false
  const deadline = Date.now() + durationMs

  await new Promise((done) => {
    function pump() {
      while (!stop && inflight < concurrency) {
        if (Date.now() >= deadline) { stop = true; break }
        inflight++
        once(agent).then((r) => {
          inflight--
          lat.push(r.ms)
          codes[r.status] = (codes[r.status] || 0) + 1
          if (!stop) pump()
          else if (inflight === 0) done()
        })
      }
      if (stop && inflight === 0) done()
    }
    pump()
  })
  agent.destroy()

  lat.sort((a, b) => a - b)
  const secs = durationMs / 1000
  return {
    rps: +(lat.length / secs).toFixed(0),
    total: lat.length,
    p50: pct(lat, 50), p90: pct(lat, 90), p99: pct(lat, 99), max: Math.round(lat.at(-1) || 0),
    codes,
    created: codes[201] || 0,
    rate_limited: codes[429] || 0,
    errors: (codes[0] || 0) + (codes[500] || 0) + (codes[503] || 0),
  }
}

const results = { base: BASE.href, tag: TAG, startedAt: new Date().toISOString(), stages: {} }
console.log(`\n=== Belle Nuit CREATE-path load test (raw, unique IP/request) ===`)
console.log(`POST ${BASE.href}api/invites   stages=[${STAGES}]  ${DURATION / 1000}s each\n`)

for (const c of STAGES) {
  process.stdout.write(`c=${String(c).padStart(3)} … `)
  const m = await stage(c, DURATION)
  results.stages[c] = m
  console.log(
    `rps=${String(m.rps).padStart(5)}  p50=${String(m.p50).padStart(4)}ms  p99=${String(m.p99).padStart(5)}ms  max=${String(m.max).padStart(5)}ms  201=${m.created}  429=${m.rate_limited}  err=${m.errors}  codes=${JSON.stringify(m.codes)}`,
  )
}

results.finishedAt = new Date().toISOString()
results.totalCreated = Object.values(results.stages).reduce((s, m) => s + m.created, 0)
writeFileSync(new URL('./create-results.json', import.meta.url), JSON.stringify(results, null, 2))
console.log(`\n✓ wrote loadtest/create-results.json   (${results.totalCreated} rows created, tagged ${TAG})\n`)
