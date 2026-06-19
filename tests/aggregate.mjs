// Aggregates per-scenario findings JSON into a single readable summary.
// Run: node tests/aggregate.mjs
import fs from 'node:fs'
import path from 'node:path'

const dir = path.join(process.cwd(), 'test-results', 'findings')
if (!fs.existsSync(dir)) { console.error('no findings dir'); process.exit(1) }

const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'))
const all = files.map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')))
all.sort((a, b) => (a.scenario + a.project).localeCompare(b.scenario + b.project))

const C = { breakages: 0, frictions: 0, pageErrors: 0, consoleErrors: 0, serverErrors: 0, failedRequests: 0 }
const bumps = (o) => { for (const k of Object.keys(C)) C[k] += (o[k]?.length || 0) }

let out = '# E2E findings — aggregated\n\n'
for (const r of all) {
  bumps(r)
  const flag = r.breakages.length ? '✗' : (r.frictions.length || r.pageErrors.length || r.serverErrors.length) ? '⚠' : '✓'
  out += `## ${flag} [${r.project}] ${r.scenario}  (${(r.durationMs/1000).toFixed(0)}s, ${r.status})\n`
  const sec = (title, arr) => { if (arr && arr.length) { out += `- **${title}:**\n`; for (const x of arr) out += `  - ${x}\n` } }
  sec('BREAKAGES', r.breakages)
  sec('Frictions', r.frictions)
  sec('Page errors (JS exceptions)', r.pageErrors)
  sec('Server 5xx', r.serverErrors)
  sec('Failed requests', r.failedRequests)
  sec('App console errors', r.consoleErrors)
  out += '\n'
}

out += '\n# Totals across all runs\n'
for (const k of Object.keys(C)) out += `- ${k}: ${C[k]}\n`

const summaryPath = path.join(process.cwd(), 'test-results', 'findings-summary.md')
fs.writeFileSync(summaryPath, out)
console.log(out)
console.log('\nwritten to', summaryPath)
