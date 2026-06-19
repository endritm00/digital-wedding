/**
 * scripts/mirror-presets.mjs
 *
 * One-off (idempotent) script: downloads every VIDEO_PRESETS clip + poster
 * from Pexels and uploads them to Supabase Storage bucket "preset-media".
 *
 * Usage (from the project root):
 *   node scripts/mirror-presets.mjs
 *
 * Prerequisites:
 *   - .env.local must contain NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 *   - @supabase/supabase-js must be installed (it is, as a project dependency)
 *   - Node 18+ (built-in fetch used for downloads)
 *
 * Idempotent: if a file already exists in the bucket it is skipped.
 * Failures are logged and the script continues; a summary is printed at the end.
 *
 * After a successful run, update lib/builder/presets.ts to use the
 * Supabase public URLs printed by this script (they follow the stable pattern
 * https://<project>.supabase.co/storage/v1/object/public/preset-media/presets/<id>/film.mp4
 * https://<project>.supabase.co/storage/v1/object/public/preset-media/presets/<id>/poster.jpg
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

// ── 2. Preset definitions (mirrors lib/builder/presets.ts) ───────────────────
// Pexels attribution: videos.pexels.com — free license, CORS: *
// Keep these source URLs here as provenance; they are replaced in presets.ts.
const pexelsVideo = (id, file) => `https://videos.pexels.com/video-files/${id}/${file}`
const pexelsPoster = (id) => `https://images.pexels.com/videos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1280`
const pexelsPreview = (id) => `https://images.pexels.com/videos/${id}/pictures/preview-0.jpg`
const pexelsPreviewJpeg = (id) => `https://images.pexels.com/videos/${id}/pictures/preview-0.jpeg`

const PRESETS = [
  {
    id: 'golden-hour',
    filmSrc: pexelsVideo('33113979', '14114596_1920_1080_25fps.mp4'),
    posterSrc: pexelsPreview('33113979'),
  },
  {
    id: 'first-dance',
    filmSrc: pexelsVideo('8775886', '8775886-hd_1920_1080_25fps.mp4'),
    posterSrc: pexelsPoster('8775886'),
  },
  {
    id: 'the-vows',
    filmSrc: pexelsVideo('27979648', '12279941_1920_1080_25fps.mp4'),
    posterSrc: pexelsPreview('27979648'),
  },
  {
    id: 'the-rings',
    filmSrc: pexelsVideo('8776123', '8776123-hd_1920_1080_25fps.mp4'),
    posterSrc: pexelsPoster('8776123'),
  },
  {
    id: 'open-air',
    filmSrc: pexelsVideo('11038003', '11038003-hd_2560_1440_24fps.mp4'),
    posterSrc: pexelsPreviewJpeg('11038003'),
  },
  {
    id: 'eternal',
    filmSrc: pexelsVideo('13038199', '13038199-hd_1920_1080_25fps.mp4'),
    posterSrc: pexelsPreviewJpeg('13038199'),
  },
  {
    id: 'the-letter',
    filmSrc: pexelsVideo('7343467', '7343467-hd_1920_1080_25fps.mp4'),
    posterSrc: pexelsPoster('7343467'),
  },
  {
    id: 'the-veil',
    filmSrc: pexelsVideo('8442722', '8442722-hd_1920_1080_30fps.mp4'),
    posterSrc: pexelsPreviewJpeg('8442722'),
  },
]

// ── 3. Helpers ───────────────────────────────────────────────────────────────

/** Download a URL and return its bytes as a Buffer. */
async function download(url) {
  const res = await fetch(url, {
    headers: {
      // Pexels sometimes requires a referrer to serve downloads without redirect issues
      'User-Agent': 'Mozilla/5.0 (compatible; preset-mirror/1.0)',
    },
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  const buf = await res.arrayBuffer()
  return Buffer.from(buf)
}

/** Check if an object already exists in the bucket. */
async function exists(storagePath) {
  // list the parent folder and look for the file name
  const folder = storagePath.substring(0, storagePath.lastIndexOf('/'))
  const filename = storagePath.substring(storagePath.lastIndexOf('/') + 1)
  const { data } = await supabase.storage.from(BUCKET).list(folder, { search: filename, limit: 1 })
  return (data ?? []).some((f) => f.name === filename)
}

/** Upload a Buffer to the bucket under storagePath. */
async function upload(storagePath, data, contentType) {
  const { error } = await supabase.storage.from(BUCKET).upload(storagePath, data, {
    contentType,
    cacheControl: '31536000', // 1 year
    upsert: false,
  })
  if (error) throw new Error(error.message)
}

/** Return the canonical public URL for a storage path. */
function publicUrl(storagePath) {
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${storagePath}`
}

// ── 4. Ensure bucket exists (the migration creates it, but be defensive) ─────
async function ensureBucket() {
  const { data: buckets, error } = await supabase.storage.listBuckets()
  if (error) throw new Error(`listBuckets: ${error.message}`)
  if (!buckets.find((b) => b.id === BUCKET)) {
    // migration should have created it; try to create it now as a fallback
    // Note: do NOT pass fileSizeLimit here — Supabase free-tier rejects values
    // above its own platform cap (50 MB) with a 413 error. The bucket inherits
    // the project default. Large video uploads rely on the platform limit being
    // sufficient; upgrade to Pro plan if clips exceed 50 MB.
    const { error: ce } = await supabase.storage.createBucket(BUCKET, {
      public: true,
      allowedMimeTypes: ['video/mp4', 'image/jpeg', 'image/jpg', 'image/webp'],
    })
    if (ce && !ce.message.includes('already exists')) throw new Error(`createBucket: ${ce.message}`)
  }
}

// ── 5. Main ──────────────────────────────────────────────────────────────────
const results = { succeeded: [], skipped: [], failed: [] }

async function mirrorPreset(preset) {
  const filmKey = `presets/${preset.id}/film.mp4`
  const posterKey = `presets/${preset.id}/poster.jpg`

  // Film
  try {
    if (await exists(filmKey)) {
      console.log(`  [SKIP] ${filmKey} already in bucket`)
      results.skipped.push(filmKey)
    } else {
      console.log(`  [DL]   ${preset.filmSrc}`)
      const buf = await download(preset.filmSrc)
      console.log(`  [UP]   ${filmKey} (${(buf.length / 1024 / 1024).toFixed(1)} MB)`)
      await upload(filmKey, buf, 'video/mp4')
      results.succeeded.push({ id: preset.id, key: filmKey, url: publicUrl(filmKey) })
      console.log(`  [OK]   ${publicUrl(filmKey)}`)
    }
  } catch (err) {
    console.error(`  [FAIL] ${filmKey}: ${err.message}`)
    results.failed.push({ id: preset.id, key: filmKey, reason: err.message })
  }

  // Poster
  try {
    if (await exists(posterKey)) {
      console.log(`  [SKIP] ${posterKey} already in bucket`)
      results.skipped.push(posterKey)
    } else {
      console.log(`  [DL]   ${preset.posterSrc}`)
      const buf = await download(preset.posterSrc)
      console.log(`  [UP]   ${posterKey} (${(buf.length / 1024).toFixed(0)} KB)`)
      await upload(posterKey, buf, 'image/jpeg')
      results.succeeded.push({ id: preset.id, key: posterKey, url: publicUrl(posterKey) })
      console.log(`  [OK]   ${publicUrl(posterKey)}`)
    }
  } catch (err) {
    console.error(`  [FAIL] ${posterKey}: ${err.message}`)
    results.failed.push({ id: preset.id, key: posterKey, reason: err.message })
  }
}

async function main() {
  console.log(`\nMirroring ${PRESETS.length} presets → Supabase bucket "${BUCKET}"\n`)
  await ensureBucket()

  for (const preset of PRESETS) {
    console.log(`\n── ${preset.id}`)
    await mirrorPreset(preset)
  }

  console.log('\n══════════════════════════════════════════════')
  console.log('Summary')
  console.log('══════════════════════════════════════════════')
  console.log(`Succeeded : ${results.succeeded.length}`)
  console.log(`Skipped   : ${results.skipped.length}`)
  console.log(`Failed    : ${results.failed.length}`)

  if (results.succeeded.length) {
    console.log('\nUploaded assets:')
    for (const r of results.succeeded) {
      console.log(`  ${r.id}  →  ${r.url}`)
    }
  }

  if (results.failed.length) {
    console.log('\nFailed assets (re-run to retry):')
    for (const r of results.failed) {
      console.log(`  ${r.key}: ${r.reason}`)
    }
  }

  console.log('\nPublic URL pattern:')
  console.log(`  Film  : ${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/presets/<id>/film.mp4`)
  console.log(`  Poster: ${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/presets/<id>/poster.jpg`)

  if (results.failed.length > 0) process.exit(1)
}

main().catch((err) => {
  console.error('Fatal:', err)
  process.exit(1)
})
