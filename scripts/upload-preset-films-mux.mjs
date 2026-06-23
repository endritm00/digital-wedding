// One-off: give the remaining preset films an adaptive-HLS rendition on Mux.
//
//   node scripts/upload-preset-films-mux.mjs
//
// The films already live as public MP4s in Supabase Storage, so we let Mux PULL
// each one straight from its public URL (no local re-upload). For every asset we
// poll to ready and print the public playback id, ready to paste as
// `hls: muxHls('<playbackId>')` onto the matching preset in lib/builder/presets.ts.
//
// Only the films that DON'T already have HLS are listed below. Re-running creates
// NEW Mux assets, so run it deliberately. Reads MUX_TOKEN_ID / MUX_TOKEN_SECRET
// from .env.local.

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

const SUPABASE_URL = 'https://gngoqwenvnhyfbkkszfl.supabase.co'
const filmUrl = (id) => `${SUPABASE_URL}/storage/v1/object/public/preset-media/presets/${id}/film.mp4`

// Preset ids still missing `hls` in lib/builder/presets.ts.
const PRESET_IDS = ['the-rings', 'open-air', 'eternal', 'the-letter', 'the-veil']

async function uploadOne(id) {
  console.log(`\n[${id}] creating asset from ${filmUrl(id)}`)
  const asset0 = await mux.video.assets.create({
    input: [{ url: filmUrl(id) }],
    playback_policy: ['public'],
    // The Supabase MP4 stays the universal fallback (preset.src), so we don't need
    // Mux to also store an MP4 — HLS is the whole point here. Keeps storage lean.
    mp4_support: 'none',
    passthrough: `preset-${id}`,
  })

  // poll asset → ready
  let asset = asset0
  for (let i = 0; i < 150; i++) {
    if (asset.status === 'ready') break
    if (asset.status === 'errored') throw new Error(`[${id}] asset errored: ${JSON.stringify(asset.errors)}`)
    await sleep(2500)
    asset = await mux.video.assets.retrieve(asset0.id)
    process.stdout.write('.')
  }
  if (asset.status !== 'ready') throw new Error(`[${id}] timed out waiting for ready`)

  const playbackId = asset.playback_ids?.find((p) => p.policy === 'public')?.id
  console.log(`\n[${id}] READY  playbackId=${playbackId}  duration=${asset.duration}s  ${asset.max_stored_resolution}`)
  return { id, assetId: asset.id, playbackId, duration: asset.duration }
}

const results = []
for (const id of PRESET_IDS) {
  try {
    results.push(await uploadOne(id))
  } catch (err) {
    console.error(`\n[${id}] FAILED:`, err.message)
    results.push({ id, error: err.message })
  }
}

console.log('\n\n══════════════ RESULTS ══════════════')
for (const r of results) {
  if (r.error) { console.log(`${r.id.padEnd(12)} ERROR  ${r.error}`); continue }
  console.log(`${r.id.padEnd(12)} hls: muxHls('${r.playbackId}'),   // asset ${r.assetId}  ${r.duration}s`)
}
console.log('\nPaste each `hls:` line onto the matching preset in lib/builder/presets.ts')
