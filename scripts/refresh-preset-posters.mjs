// One-off: replace the low-res (387×218) preset posters with crisp 1280×720
// stills pulled from the Mux master, uploaded OVER the same Supabase keys
// (ids stable → every surface — home showcase, /themes, builder, published —
// inherits the sharper image with no code change and no new URLs/requests).
//
//   node scripts/refresh-preset-posters.mjs

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

// Hand-picked clean frames (verified by eye): playbackId + time(s) into the clip.
const POSTERS = [
  { id: 'the-vows',    playbackId: '4hkfQ1wFn5wFekS9b2qZk9exFU00JPwQYEQ9Bex02amNA',    time: 3 },
  { id: 'open-air',    playbackId: '9GnRFbyWrcxTsU00tIoU00as1N8aGzmGUy00j701Gmen268',  time: 1 },
  { id: 'the-veil',    playbackId: 'dBT1k6uxX3j7jqP1153CAPxzF00Ce9cKewZgQisH5SEQ',    time: 1 },
  // golden-hour: floral arch clip; "Marry Me" lettering is scene decor, not a watermark.
  { id: 'golden-hour', playbackId: 'lWsz00A95012Md025lu01a5Xs1029yquxeDtuMNUlvSULEoo', time: 2 },
]

const muxThumb = (pid, time) =>
  `https://image.mux.com/${pid}/thumbnail.jpg?width=1280&height=720&fit_mode=crop&time=${time}`

for (const { id, playbackId, time } of POSTERS) {
  const key = `presets/${id}/poster.jpg`
  try {
    const url = muxThumb(playbackId, time)
    const res = await fetch(url)
    if (!res.ok) throw new Error(`mux thumb HTTP ${res.status}`)
    const bytes = Buffer.from(await res.arrayBuffer())
    const { error } = await supabase.storage.from(BUCKET).upload(key, bytes, {
      contentType: 'image/jpeg',
      cacheControl: '31536000',
      upsert: true,
    })
    if (error) throw new Error(error.message)
    console.log(`[OK] ${key}  ${(bytes.length / 1024).toFixed(0)} KB  (t=${time}s)`)
  } catch (err) {
    console.error(`[FAIL] ${key}: ${err.message}`)
  }
}
console.log('\nDone. Supabase CDN may cache the old image briefly — append ?v= or wait for TTL when verifying.')
