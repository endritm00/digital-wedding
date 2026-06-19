/**
 * scripts/mirror-music.mjs
 *
 * One-off (idempotent) script: downloads every MUSIC_TRACKS preview clip from
 * Pixabay and uploads it to Supabase Storage bucket "preset-media" under
 * music/<id>.mp3, so the builder's music step does NOT depend on Pixabay's
 * CDN/CORS uptime (and is not blocked by our media-src CSP, which only allows
 * 'self' + Supabase + Mux).
 *
 * Usage (from the project root):
 *   node scripts/mirror-music.mjs
 *
 * Prerequisites:
 *   - .env.local must contain NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 *   - @supabase/supabase-js installed (project dependency)
 *   - Node 18+ (built-in fetch used for downloads)
 *
 * Idempotent: if a file already exists in the bucket it is skipped.
 * Mirrors the pattern in scripts/mirror-presets.mjs.
 *
 * After a successful run, lib/builder/presets.ts already points MUSIC_TRACKS at
 * the stable Supabase public URLs:
 *   https://<project>.supabase.co/storage/v1/object/public/preset-media/music/<id>.mp3
 */

import { readFileSync } from 'fs'
import { createClient } from '@supabase/supabase-js'

// ── 1. Parse .env.local ──────────────────────────────────────────────────────
function loadEnv(filePath = '.env.local') {
  let raw
  try {
    raw = readFileSync(filePath, 'utf-8')
  } catch {
    console.error(`Could not read ${filePath}`)
    process.exit(1)
  }
  const env = {}
  for (const line of raw.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const val = trimmed.slice(eqIdx + 1).trim()
    env[key] = val
  }
  return env
}

const env = loadEnv()
const SUPABASE_URL = env['NEXT_PUBLIC_SUPABASE_URL']
const SERVICE_KEY = env['SUPABASE_SERVICE_ROLE_KEY']

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
})

const BUCKET = 'preset-media'

// ── 2. Track definitions (mirrors MUSIC_TRACKS in lib/builder/presets.ts) ────
// Pixabay source URLs — kept here as provenance; previews are served from Supabase.
const TRACKS = [
  { id: 'aisle',      src: 'https://cdn.pixabay.com/audio/2022/10/25/audio_946bc8f1a2.mp3' },
  { id: 'vows',       src: 'https://cdn.pixabay.com/audio/2022/03/10/audio_5ad6e6fe69.mp3' },
  { id: 'first-look', src: 'https://cdn.pixabay.com/audio/2021/11/25/audio_91b32e02f9.mp3' },
  { id: 'evening',    src: 'https://cdn.pixabay.com/audio/2022/08/02/audio_884fe92c21.mp3' },
  { id: 'lanterns',   src: 'https://cdn.pixabay.com/audio/2022/02/22/audio_d1718ab41b.mp3' },
]

// ── 3. Helpers ───────────────────────────────────────────────────────────────
async function download(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; music-mirror/1.0)' },
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  const buf = await res.arrayBuffer()
  return Buffer.from(buf)
}

async function exists(storagePath) {
  const folder = storagePath.substring(0, storagePath.lastIndexOf('/'))
  const filename = storagePath.substring(storagePath.lastIndexOf('/') + 1)
  const { data } = await supabase.storage.from(BUCKET).list(folder, { search: filename, limit: 1 })
  return (data ?? []).some((f) => f.name === filename)
}

async function upload(storagePath, data, contentType) {
  const { error } = await supabase.storage.from(BUCKET).upload(storagePath, data, {
    contentType,
    cacheControl: '31536000', // 1 year
    upsert: false,
  })
  if (error) throw new Error(error.message)
}

function publicUrl(storagePath) {
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${storagePath}`
}

// ── 4. Ensure bucket allows audio/mpeg ───────────────────────────────────────
// The bucket was created (migration 0010) for video + images only. Widen its
// allowed_mime_types so audio uploads are accepted. Idempotent.
async function ensureAudioAllowed() {
  const { error } = await supabase.storage.updateBucket(BUCKET, {
    public: true,
    allowedMimeTypes: [
      'video/mp4',
      'image/jpeg',
      'image/jpg',
      'image/webp',
      'audio/mpeg',
      'audio/mp3',
    ],
  })
  if (error) throw new Error(`updateBucket: ${error.message}`)
}

// ── 5. Main ──────────────────────────────────────────────────────────────────
const results = { succeeded: [], skipped: [], failed: [] }

async function mirrorTrack(track) {
  const key = `music/${track.id}.mp3`
  try {
    if (await exists(key)) {
      console.log(`  [SKIP] ${key} already in bucket`)
      results.skipped.push(key)
      return
    }
    console.log(`  [DL]   ${track.src}`)
    const buf = await download(track.src)
    console.log(`  [UP]   ${key} (${(buf.length / 1024 / 1024).toFixed(2)} MB)`)
    await upload(key, buf, 'audio/mpeg')
    results.succeeded.push({ id: track.id, key, url: publicUrl(key) })
    console.log(`  [OK]   ${publicUrl(key)}`)
  } catch (err) {
    console.error(`  [FAIL] ${key}: ${err.message}`)
    results.failed.push({ id: track.id, key, reason: err.message })
  }
}

async function main() {
  console.log(`\nMirroring ${TRACKS.length} music previews → Supabase bucket "${BUCKET}"\n`)
  await ensureAudioAllowed()

  for (const track of TRACKS) {
    console.log(`\n── ${track.id}`)
    await mirrorTrack(track)
  }

  console.log('\n══════════════════════════════════════════════')
  console.log('Summary')
  console.log('══════════════════════════════════════════════')
  console.log(`Succeeded : ${results.succeeded.length}`)
  console.log(`Skipped   : ${results.skipped.length}`)
  console.log(`Failed    : ${results.failed.length}`)

  if (results.succeeded.length) {
    console.log('\nUploaded assets:')
    for (const r of results.succeeded) console.log(`  ${r.id}  →  ${r.url}`)
  }
  if (results.failed.length) {
    console.log('\nFailed assets (re-run to retry):')
    for (const r of results.failed) console.log(`  ${r.key}: ${r.reason}`)
    process.exit(1)
  }

  console.log('\nPublic URL pattern:')
  console.log(`  Music : ${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/music/<id>.mp3`)
}

main().catch((err) => {
  console.error('Fatal:', err)
  process.exit(1)
})
