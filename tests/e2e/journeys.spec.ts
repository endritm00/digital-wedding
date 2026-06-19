import { test as base, expect } from '@playwright/test'
import {
  Recorder, read, startBuilder, primary, later, expectStep,
  fillNames, pickDate, pickFilmPreset, uploadVideo, pickOpener, previewOpener,
  pickPalette, pickMusic, previewMusic, uploadMusic, saveEmail, toggleSection,
  readTotal, payAndPublish,
} from './helpers'

// Fixture: auto-create a Recorder per test and flush it (findings JSON) at the end.
// Each test also gets a unique X-Forwarded-For so per-IP rate limits (draft
// creation is 10/IP/hr) never block the suite — every scenario gets its own
// bucket, exactly as 20 different real users on different connections would.
let ipSeq = 0
const test = base.extend<{ rec: Recorder }>({
  rec: async ({ page }, use, info) => {
    ipSeq += 1
    const ip = `203.0.113.${(ipSeq % 250) + 1}`
    // Inject the forwarded-for ONLY for our own origin — never for cross-origin
    // (Stripe/hCaptcha reject unexpected request headers via CORS preflight).
    await page.route('http://localhost:3000/**', (route) => {
      route.continue({ headers: { ...route.request().headers(), 'x-forwarded-for': ip } })
    })
    const rec = new Recorder(page, info)
    await use(rec)
    await rec.flush()
  },
})

const isMobile = (info: { project: { name: string } }) => info.project.name === 'mobile'

// ─────────────────────────────────────────────────────────────────────────────
// 1. Linda, 48 — cautious minimalist. Reads everything, skips every optional
//    step, no extra pages. Just wants the simplest possible invitation.
// ─────────────────────────────────────────────────────────────────────────────
test('01 Linda — cautious minimalist, skips all optionals', async ({ page, rec }) => {
  await startBuilder(page, rec)
  await read(page, 900)
  await fillNames(page, 'Linda', 'Robert')
  await pickDate(page, 14, 'September', '2026')
  await read(page)
  await primary(page, /Continue/)
  await expectStep(page, 'opening-video', rec)

  await read(page, 800)
  await pickFilmPreset(page, 'In Bloom')
  await primary(page, /Continue/)
  await expectStep(page, 'style', rec)

  await read(page)
  await pickPalette(page, 'Sage Garden')
  await primary(page, /Continue/)
  await expectStep(page, 'music', rec)

  await later(page, /No music/)
  await expectStep(page, 'save', rec)
  await later(page, /Skip for now/)
  await expectStep(page, 'sections', rec)

  rec.note('Linda left all pages unselected (default plan only)')
  await primary(page, /Continue/)
  await expectStep(page, 'details', rec)
  await primary(page, /Continue/)
  await expectStep(page, 'review', rec)

  const total = await readTotal(page, rec)
  expect.soft(total, 'price should resolve on review').not.toBeNull()
})

// ─────────────────────────────────────────────────────────────────────────────
// 2. Sarah, 34 — the editor. Adds several pages, then second-guesses her palette
//    and goes BACK two steps to change it, then forward again (autosave test).
// ─────────────────────────────────────────────────────────────────────────────
test('02 Sarah — adds pages, back-navigates to change palette', async ({ page, rec }) => {
  await startBuilder(page, rec)
  await fillNames(page, 'Sarah', 'James')
  await pickDate(page, 2, 'May', '2026')
  await primary(page, /Continue/)
  await expectStep(page, 'opening-video', rec)
  await pickFilmPreset(page, 'First Dance')
  await primary(page, /Continue/)
  await expectStep(page, 'style', rec)
  await pickPalette(page, 'Ivory & Gold')
  await primary(page, /Continue/)
  await expectStep(page, 'music', rec)
  await pickMusic(page, 'Down the aisle')
  await primary(page, /Continue/)
  await later(page, /Skip for now/)
  await expectStep(page, 'sections', rec)

  for (const p of ['Your story', 'The day', 'The venue']) {
    await toggleSection(page, p)
    await read(page, 350)
  }
  rec.note('added 3 pages')

  // Second-guess the palette — go back through music → style
  await sheet(page).getByRole('button', { name: /^Back$/ }).click().catch(async () => {
    rec.friction('no in-sheet Back on sections; used browser back')
    await page.goBack()
  })
  await read(page, 500)
  // back lands on save; keep going back to style
  await page.goBack()
  await page.goBack().catch(() => {})
  await page.waitForTimeout(1500)
  if (/\/style/.test(page.url())) {
    rec.note('reached style via back; changing palette')
    await pickPalette(page, 'Blush Romance')
    await read(page, 400)
    await primary(page, /Continue/)
  } else {
    rec.friction(`back navigation landed unexpectedly at ${page.url()}`)
  }
  // Navigate forward to review directly (sections persisted?)
  const id = page.url().match(/builder\/([0-9a-f-]+)\//)![1]
  await page.goto(`/builder/${id}/details`)
  await expectStep(page, 'details', rec)
  await primary(page, /Continue/)
  await expectStep(page, 'review', rec)
  // Verify the 3 pages survived the back-and-forth
  const pagesRow = await page.getByText(/Your story/i).first().isVisible().catch(() => false)
  if (pagesRow) rec.note('pages persisted through back-navigation (autosave OK)')
  else rec.friction('could not confirm pages persisted after back-navigation')
  await readTotal(page, rec)

  function sheet(p = page) { return p.getByRole('dialog').last() }
})

// ─────────────────────────────────────────────────────────────────────────────
// 3. Maria, 29 — uploads her own clip, sees the €4.99 fee, gets cold feet about
//    the cost and switches to a free curated film instead.
// ─────────────────────────────────────────────────────────────────────────────
test('03 Maria — uploads video then switches to a free preset', async ({ page, rec }) => {
  await startBuilder(page, rec)
  await fillNames(page, 'Maria', 'Tom')
  await pickDate(page, 20, 'June', '2026')
  await primary(page, /Continue/)
  await expectStep(page, 'opening-video', rec)

  rec.note('attempting custom video upload')
  await uploadVideo(page)
  // Either it uploads (fee + processing) or Mux is unavailable (coming soon)
  const uploaded = page.getByText(/Uploaded ✓|processing/i)
  const unavailable = page.getByText(/coming soon/i)
  const fee = page.getByText('+€4.99')
  let videoState = 'unknown'
  const deadline = Date.now() + 30_000
  while (Date.now() < deadline) {
    if (await uploaded.first().isVisible().catch(() => false)) { videoState = 'uploaded'; break }
    if (await unavailable.first().isVisible().catch(() => false)) { videoState = 'unavailable'; break }
    await page.waitForTimeout(1000)
  }
  if (videoState === 'uploaded') rec.note('custom video upload accepted (UI shows uploaded/processing)')
  else if (videoState === 'unavailable') rec.friction('custom video upload shows "coming soon" (Mux not accepting) — feature not usable')
  else rec.friction('custom video upload: no clear confirmation within 30s')

  // Change her mind → pick a free curated film
  await read(page, 800)
  await pickFilmPreset(page, 'The Vows')
  rec.note('switched to free curated film')
  await primary(page, /Continue/)
  await expectStep(page, 'style', rec)
  await pickPalette(page, 'Tuscan Terracotta')
  await primary(page, /Continue/)
  await later(page, /No music/)
  await later(page, /Skip for now/)
  await primary(page, /Continue/) // sections
  await primary(page, /Continue/) // details
  await expectStep(page, 'review', rec)
  await readTotal(page, rec)
})

// ─────────────────────────────────────────────────────────────────────────────
// 4. Jen, 41 — the wanderer. Clicks around, uses the browser Back button, and
//    REFRESHES mid-flow (does her work survive a refresh?).
// ─────────────────────────────────────────────────────────────────────────────
test('04 Jen — wanders, browser-back, refreshes mid-flow', async ({ page, rec }) => {
  await startBuilder(page, rec)
  await fillNames(page, 'Jennifer', 'Mark')
  await pickDate(page, 11, 'July', '2026')
  await primary(page, /Continue/)
  await expectStep(page, 'opening-video', rec)
  await pickFilmPreset(page, 'Open Air')
  await primary(page, /Continue/)
  await expectStep(page, 'style', rec)
  await pickPalette(page, 'Midnight & Pearl')

  // Refresh on the style step — verify selections persist
  await read(page, 600)
  await page.reload()
  rec.note('refreshed on style step (testing persistence, not as a fix)')
  await page.waitForTimeout(2500)
  // Re-open should still be on style with names intact downstream
  if (/\/style/.test(page.url())) {
    rec.note('refresh kept us on the style step')
  } else {
    rec.friction(`refresh changed the URL unexpectedly to ${page.url()}`)
  }
  // Go back to names via browser back to confirm names persisted
  await page.goto(page.url().replace(/\/style.*/, '/names'))
  await page.waitForTimeout(1500)
  const nameVal = await page.getByPlaceholder('e.g. Emma').inputValue().catch(() => '')
  if (nameVal === 'Jennifer') rec.note('names persisted after refresh + back (autosave OK)')
  else rec.breakage(`names lost after refresh — expected "Jennifer", got "${nameVal}"`)

  // Jump straight to review (her selections persisted) and confirm the price still
  // resolves after all that wandering — the real question for this persona.
  const jid = page.url().match(/builder\/([0-9a-f-]+)\//)![1]
  await page.goto(`/builder/${jid}/review`)
  await expectStep(page, 'review', rec)
  const total = await readTotal(page, rec)
  if (total) rec.note('price still resolves after refresh + heavy back-navigation')
})

// ─────────────────────────────────────────────────────────────────────────────
// 5. Emma, 52 — the full journey & payment. Picks music, saves email, adds a
//    couple of pages, pays with a test card, expects a live invitation + link.
// ─────────────────────────────────────────────────────────────────────────────
test('05 Emma — complete flow + real test-card payment', async ({ page, rec }) => {
  await startBuilder(page, rec)
  await fillNames(page, 'Emma', 'Liam')
  await pickDate(page, 5, 'August', '2026')
  await primary(page, /Continue/)
  await pickFilmPreset(page, 'In Bloom')
  await primary(page, /Continue/)
  await pickOpener(page, 'The Letter')
  await pickPalette(page, 'Ivory & Gold')
  await primary(page, /Continue/)
  await pickMusic(page, 'The vows')
  await primary(page, /Continue/)
  await saveEmail(page, 'emma.test@example.com')
  await expectStep(page, 'sections', rec)
  await toggleSection(page, 'Your story')
  await toggleSection(page, 'The venue')
  await primary(page, /Continue/)
  await expectStep(page, 'details', rec)
  // Fill the open (story) accordion
  await sheet().getByPlaceholder(/How you met/i).fill('We met at a small bookshop in Lisbon.').catch(() => rec.friction('story field not auto-open on details'))
  await primary(page, /Continue/)
  await expectStep(page, 'review', rec)

  const total = await readTotal(page, rec)
  expect.soft(total).not.toBeNull()
  const result = await payAndPublish(page, rec, { name: 'Emma Liam', email: 'emma.test@example.com' })
  expect.soft(result, 'payment journey should end live').toBe('live')

  function sheet() { return page.getByRole('dialog').last() }
})

// ─────────────────────────────────────────────────────────────────────────────
// 6. Rachel, 38 — skips her date (date nudge), never saves email, then pays at
//    review where the email gate must catch her.
// ─────────────────────────────────────────────────────────────────────────────
test('06 Rachel — skips date, hits email gate at checkout, pays', async ({ page, rec }) => {
  await startBuilder(page, rec)
  await fillNames(page, 'Rachel', 'David')
  // Try to continue with no date → expect the gentle nudge
  await primary(page, /Continue/)
  await read(page, 800)
  const nudge = await page.getByText(/Adding your date lets guests/i).isVisible().catch(() => false)
  if (nudge) rec.note('date nudge appeared (good — explains why a date matters)')
  else rec.friction('no date nudge shown when continuing without a date')
  await primary(page, /Continue without a date/)
  await expectStep(page, 'opening-video', rec)

  await pickFilmPreset(page, 'Eternal')
  await primary(page, /Continue/)
  await pickPalette(page, 'Blush Romance')
  await primary(page, /Continue/)
  await later(page, /No music/)
  await later(page, /Skip for now/)   // never saves email
  await primary(page, /Continue/)
  await primary(page, /Continue/)
  await expectStep(page, 'review', rec)
  await readTotal(page, rec)

  const result = await payAndPublish(page, rec, { name: 'Rachel David', email: 'rachel.test@example.com' })
  expect.soft(result).toBe('live')
})

// ─────────────────────────────────────────────────────────────────────────────
// 7. Nicole, 45 — music lover. Previews tracks, uploads her own song, then adds
//    the Photos page and discovers how photo upload actually works.
// ─────────────────────────────────────────────────────────────────────────────
test('07 Nicole — previews + uploads music, explores Photos page', async ({ page, rec }) => {
  await startBuilder(page, rec)
  await fillNames(page, 'Nicole', 'Paul')
  await pickDate(page, 18, 'April', '2026')
  await primary(page, /Continue/)
  await pickFilmPreset(page, 'The Rings')
  await primary(page, /Continue/)
  await pickPalette(page, 'Parchment & Sienna')
  await primary(page, /Continue/)
  await expectStep(page, 'music', rec)

  // Preview a track (play button)
  await previewMusic(page, 'First look').catch(() => rec.friction('could not trigger music preview'))
  await read(page, 1800)
  rec.note('previewed a music track')

  // Upload her own music
  rec.note('attempting custom music upload')
  await uploadMusic(page)
  const musicOk = page.getByText(/Custom track uploaded ✓/i)
  const musicErr = page.getByText(/Upload failed/i)
  let ms = 'unknown'
  const dl = Date.now() + 25_000
  while (Date.now() < dl) {
    if (await musicOk.isVisible().catch(() => false)) { ms = 'ok'; break }
    if (await musicErr.isVisible().catch(() => false)) { ms = 'err'; break }
    await page.waitForTimeout(1000)
  }
  if (ms === 'ok') rec.note('custom music upload succeeded (UI confirmed)')
  else if (ms === 'err') rec.friction('custom music upload failed in UI')
  else rec.friction('custom music upload: no confirmation within 25s')

  await primary(page, /Continue/)
  await later(page, /Skip for now/)
  await expectStep(page, 'sections', rec)
  await toggleSection(page, 'Photos')
  await primary(page, /Continue/)
  await expectStep(page, 'details', rec)
  // The Photos accordion — does it let her actually add photos?
  const placeholder = await page.getByText(/Photo uploads will be available after/i).isVisible().catch(() => false)
  if (placeholder) rec.friction('Photos page has no uploader in the builder — only a "available after saving" note + a text box; a user expecting to add photos now will be confused')
  else rec.note('Photos page exposed an uploader')
  await primary(page, /Continue/)
  await expectStep(page, 'review', rec)
  await readTotal(page, rec)
})

// ─────────────────────────────────────────────────────────────────────────────
// 8. Beth, 31 — mobile-native. On phones, tries the drag-to-preview gesture and
//    relies on the bottom sheet. (On desktop the gesture is a no-op.)
// ─────────────────────────────────────────────────────────────────────────────
test('08 Beth — mobile bottom-sheet & peek gesture', async ({ page, rec }, info) => {
  await startBuilder(page, rec)
  await fillNames(page, 'Beth', 'Chris')
  await pickDate(page, 9, 'October', '2026')

  if (isMobile(info)) {
    // Discover the live preview by dragging the sheet grip down
    const grip = page.getByRole('button', { name: /see your invitation|keep editing/i }).first()
    if (await grip.isVisible().catch(() => false)) {
      const box = await grip.boundingBox()
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
        await page.mouse.down()
        await page.mouse.move(box.x + box.width / 2, box.y + 400, { steps: 12 })
        await page.mouse.up()
        await read(page, 1200)
        rec.note('performed drag-down peek gesture on mobile')
        // Pull back up
        await grip.click().catch(() => {})
        await read(page, 800)
      }
    } else {
      rec.friction('could not find the drag grip / peek affordance on mobile')
    }
  } else {
    rec.note('desktop — no bottom-sheet gesture (right-side panel)')
  }

  await primary(page, /Continue/)
  await expectStep(page, 'opening-video', rec)
  await pickFilmPreset(page, 'First Dance')
  await primary(page, /Continue/)
  await pickPalette(page, 'Onyx & Gold')
  await primary(page, /Continue/)
  await later(page, /No music/)
  await later(page, /Skip for now/)
  await primary(page, /Continue/)
  await primary(page, /Continue/)
  await expectStep(page, 'review', rec)
  await readTotal(page, rec)
})

// ─────────────────────────────────────────────────────────────────────────────
// 9. Karen, 50 — re-enters data. Goes back to change names, then uses the
//    persistent "Preview" affordance to see the whole thing before paying.
// ─────────────────────────────────────────────────────────────────────────────
test('09 Karen — edits names mid-flow, uses Preview', async ({ page, rec }) => {
  const id = await startBuilder(page, rec)
  await fillNames(page, 'Karne', 'Steven') // typo on purpose
  await pickDate(page, 27, 'March', '2026')
  await primary(page, /Continue/)
  await expectStep(page, 'opening-video', rec)
  await read(page, 600)

  // Realises she mistyped her name → goes back
  await page.goto(`/builder/${id}/names`)
  await page.waitForTimeout(1200)
  const cur = await page.getByPlaceholder('e.g. Emma').inputValue().catch(() => '')
  if (cur === 'Karne') rec.note('name retained on returning to edit')
  else rec.friction(`name not retained on return (got "${cur}")`)
  await page.getByPlaceholder('e.g. Emma').fill('Karen')
  rec.note('corrected the name typo')
  await primary(page, /Continue/)
  await expectStep(page, 'opening-video', rec)
  await pickFilmPreset(page, 'In Bloom')
  await primary(page, /Continue/)
  await pickPalette(page, 'Ivory & Rose')
  await primary(page, /Continue/)
  await later(page, /No music/)
  await later(page, /Skip for now/)
  await primary(page, /Continue/)
  await primary(page, /Continue/)
  await expectStep(page, 'review', rec)

  // Use the "Preview my invitation" button to see the whole thing
  const previewBtn = page.getByRole('button', { name: /Preview my invitation/i }).first()
  if (await previewBtn.isVisible().catch(() => false)) {
    await previewBtn.click()
    await page.waitForURL(/\/invite\/[0-9a-f-]+\/preview/, { timeout: 20_000 }).catch(() => {})
    if (/\/preview/.test(page.url())) {
      rec.note('Preview opened the full invitation before paying (good for confidence)')
      await read(page, 2500)
    } else {
      rec.friction(`Preview did not open the full invitation (at ${page.url()})`)
    }
  } else {
    rec.friction('no obvious "Preview" affordance on the review step')
  }
})

// ─────────────────────────────────────────────────────────────────────────────
// 10. Amy, 27 — pays, then opens her published guest page to understand what
//     she'll actually share with guests, and looks for the manage link.
// ─────────────────────────────────────────────────────────────────────────────
test('10 Amy — pays, opens published guest page + manage link', async ({ page, rec }) => {
  const id = await startBuilder(page, rec)
  await fillNames(page, 'Amy', 'Daniel')
  await pickDate(page, 13, 'November', '2026')
  await primary(page, /Continue/)
  await pickFilmPreset(page, 'In Bloom')
  await primary(page, /Continue/)
  await pickPalette(page, 'Sage Garden')
  await primary(page, /Continue/)
  await pickMusic(page, 'Into the evening')
  await primary(page, /Continue/)
  await saveEmail(page, 'amy.test@example.com')
  await expectStep(page, 'sections', rec)
  await toggleSection(page, 'Your story')
  await primary(page, /Continue/)
  await primary(page, /Continue/)
  await expectStep(page, 'review', rec)
  await readTotal(page, rec)

  const result = await payAndPublish(page, rec, { name: 'Amy Daniel', email: 'amy.test@example.com' })
  expect.soft(result).toBe('live')

  if (result === 'live') {
    // Look for + copy the manage link
    const manageInput = page.locator('input[readonly]')
    if (await manageInput.first().isVisible().catch(() => false)) {
      const val = await manageInput.first().inputValue().catch(() => '')
      if (/\/manage\//.test(val)) rec.note(`manage link present & shaped correctly: ${val.slice(0, 48)}…`)
      else rec.friction(`a readonly link is shown but doesn't look like a manage link: ${val.slice(0, 48)}`)
    }
    // Open the guest page
    await page.getByRole('link', { name: /View your invitation/i }).click().catch(() => page.goto(`/invite/${id}`))
    await page.waitForURL(/\/invite\//, { timeout: 20_000 }).catch(() => {})
    await page.waitForTimeout(3500)
    const looksLive = await page.locator('video, [class*="invitation"], h1, h2').first().isVisible().catch(() => false)
    if (looksLive) rec.note('published guest invitation renders (the thing she shares)')
    else rec.breakage('published guest page did not render visible invitation content')
  }
})
