// One-off: upload the two brand "envelope" opener videos (desktop + mobile) to
// Mux as permanent app-level assets, then print their playback IDs so they can be
// hard-wired into lib/invite/envelope-video.ts.
//
//   node scripts/upload-envelope-videos.mjs
//
// Reads MUX_TOKEN_ID / MUX_TOKEN_SECRET from .env.local. Idempotency is manual:
// re-running creates NEW assets, so only run when you intend to (re)upload.

import { readFileSync } from 'node:fs'
import { setTimeout as sleep } from 'node:timers/promises'
import Mux from '@mux/mux-node'

// ── load .env.local (minimal parser; avoids adding a dep) ──────────────────────
function loadEnv() {
  const raw = readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
  for (const line of raw.split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (!m) continue
    let v = m[2].trim()
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1)
    if (!(m[1] in process.env)) process.env[m[1]] = v
  }
}
loadEnv()

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
})

const VIDEOS = [
  { key: 'desktop', file: 'C:/Users/Endrit/Downloads/Envelope - Desktop.mp4' },
  { key: 'mobile',  file: 'C:/Users/Endrit/Downloads/Envelope - Mobile .mp4' },
]

async function uploadOne({ key, file }) {
  console.log(`\n[${key}] creating direct upload…`)
  const upload = await mux.video.uploads.create({
    cors_origin: '*',
    new_asset_settings: {
      playback_policy: ['public'],
      mp4_support: 'capped-1080p',
      passthrough: `envelope-${key}`,
    },
  })

  const bytes = readFileSync(file)
  console.log(`[${key}] PUT ${(bytes.length / 1e6).toFixed(2)} MB → Mux…`)
  const put = await fetch(upload.url, { method: 'PUT', body: bytes })
  if (!put.ok) throw new Error(`[${key}] PUT failed: ${put.status} ${await put.text()}`)

  // upload → asset id
  let assetId = null
  for (let i = 0; i < 60 && !assetId; i++) {
    await sleep(2000)
    const u = await mux.video.uploads.retrieve(upload.id)
    if (['errored', 'cancelled', 'timed_out'].includes(u.status)) throw new Error(`[${key}] upload ${u.status}`)
    assetId = u.asset_id ?? null
    process.stdout.write('.')
  }
  if (!assetId) throw new Error(`[${key}] timed out waiting for asset id`)
  console.log(`\n[${key}] asset ${assetId} — waiting for ready + mp4 rendition…`)

  // asset → ready (+ static mp4 rendition ready)
  let asset = null
  for (let i = 0; i < 120; i++) {
    await sleep(2500)
    asset = await mux.video.assets.retrieve(assetId)
    if (asset.status === 'errored') throw new Error(`[${key}] asset errored: ${JSON.stringify(asset.errors)}`)
    const sr = asset.static_renditions
    const srReady = !sr || !sr.status || sr.status === 'ready'
    if (asset.status === 'ready' && srReady) break
    process.stdout.write('.')
  }
  const playbackId = asset.playback_ids?.find((p) => p.policy === 'public')?.id
  console.log(`\n[${key}] READY  playbackId=${playbackId}  duration=${asset.duration}s  ${asset.max_stored_resolution}`)
  return { key, assetId, playbackId, duration: asset.duration }
}

const results = []
for (const v of VIDEOS) results.push(await uploadOne(v))

console.log('\n\n══════════════ RESULTS ══════════════')
for (const r of results) {
  console.log(`${r.key.padEnd(8)} playbackId=${r.playbackId}  asset=${r.assetId}  ${r.duration}s`)
}
console.log('\nHLS:    https://stream.mux.com/{playbackId}.m3u8')
console.log('MP4:    https://stream.mux.com/{playbackId}/capped-1080p.mp4')
console.log('Poster: https://image.mux.com/{playbackId}/thumbnail.jpg?time=0')
