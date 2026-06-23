// One-off: build the shared /themes sample-invite photo gallery.
//
//   node scripts/mirror-sample-gallery.mjs
//
// The gallery on the theme sample invitation needs a few photos to look "fully
// filled". To stay 100% safe (no real people, no copyright risk) we DON'T source
// external stock — we pull people-free SCENERY frames from our own licensed
// preset films via the Mux thumbnail API and mirror them to Supabase
// preset-media/samples/<n>.jpg. lib/templates/templates.ts SAMPLE_GALLERY points
// at these keys. Re-run any time (upsert:true).
//
// Frames were hand-picked + eyeballed to contain NO people:
//   the-vows  = empty white ceremony aisle
//   the-veil  = aerial of the set reception tables

import { readFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

function loadEnv(filePath = '.env.local') {
  const raw = readFileSync(new URL(`../${filePath}`, import.meta.url), 'utf-8')
  const env = {}
  for (const line of raw.split('\n')) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const i = t.indexOf('=')
    if (i === -1) continue
    env[t.slice(0, i).trim()] = t.slice(i + 1).trim()
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
const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } })
const BUCKET = 'preset-media'

const VOWS = '4hkfQ1wFn5wFekS9b2qZk9exFU00JPwQYEQ9Bex02amNA' // empty ceremony aisle
const VEIL = 'dBT1k6uxX3j7jqP1153CAPxzF00Ce9cKewZgQisH5SEQ'   // aerial reception tables

// n = sample file number; alternate aisle / tables for visual rhythm.
const FRAMES = [
  { n: 1, pid: VOWS, time: 6 },
  { n: 2, pid: VEIL, time: 4 },
  { n: 3, pid: VOWS, time: 0 },
  { n: 4, pid: VEIL, time: 8 },
]

const muxThumb = (pid, time) =>
  `https://image.mux.com/${pid}/thumbnail.jpg?width=1280&height=720&fit_mode=crop&time=${time}`

for (const { n, pid, time } of FRAMES) {
  const key = `samples/${n}.jpg`
  try {
    const res = await fetch(muxThumb(pid, time))
    if (!res.ok) throw new Error(`mux thumb HTTP ${res.status}`)
    const bytes = Buffer.from(await res.arrayBuffer())
    const { error } = await supabase.storage.from(BUCKET).upload(key, bytes, {
      contentType: 'image/jpeg',
      cacheControl: '31536000',
      upsert: true,
    })
    if (error) throw new Error(error.message)
    console.log(`[OK] ${key}  ${(bytes.length / 1024).toFixed(0)} KB`)
  } catch (err) {
    console.error(`[FAIL] ${key}: ${err.message}`)
  }
}
console.log('\nDone → preset-media/samples/{1..4}.jpg (SAMPLE_GALLERY in lib/templates/templates.ts)')
