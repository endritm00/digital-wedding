import { Page, TestInfo, expect } from '@playwright/test'
import fs from 'node:fs'
import path from 'node:path'

const FIX = path.join(process.cwd(), 'tests', 'fixtures')
const FINDINGS_DIR = path.join(process.cwd(), 'test-results', 'findings')

// ───────────────────────────────────────────────────────────────────────────
// Recorder — captures everything that signals a breakage or rough edge, plus
// manual UX observations. One JSON file per scenario; aggregated afterwards.
// ───────────────────────────────────────────────────────────────────────────
export class Recorder {
  consoleErrors: string[] = []
  consoleWarnings: string[] = []
  pageErrors: string[] = []
  failedRequests: string[] = []
  serverErrors: string[] = []
  notes: string[] = []        // neutral observations / steps reached
  frictions: string[] = []    // UX friction / confusion points
  breakages: string[] = []    // hard breakages (stuck, needed refresh, crash)

  constructor(public page: Page, public info: TestInfo) {
    page.on('console', (m) => {
      const t = m.type()
      const txt = `${m.text()}`.slice(0, 300)
      const loc = m.location()?.url || ''
      // Only OUR app's console — ignore third-party (Stripe/hCaptcha/Google Pay) noise
      if (loc && !loc.includes('localhost:3000')) return
      if (/\[Fast Refresh\]|Download the React DevTools|Turbopack/i.test(txt)) return
      if (t === 'error') this.consoleErrors.push(txt)
      else if (t === 'warning') this.consoleWarnings.push(txt)
    })
    page.on('pageerror', (e) => this.pageErrors.push(`${e.message}`.slice(0, 300)))
    page.on('requestfailed', (r) => {
      const u = r.url()
      const err = r.failure()?.errorText || ''
      // _rsc=… are Next.js route-prefetch aborts on fast navigation — not real failures
      if (!u.includes('localhost:3000')) return
      if (u.includes('_rsc=') || err.includes('ERR_ABORTED')) return
      this.failedRequests.push(`${r.method()} ${u} — ${err}`)
    })
    page.on('response', (r) => {
      if (r.status() >= 500 && r.url().includes('localhost:3000')) {
        this.serverErrors.push(`${r.status()} ${r.request().method()} ${r.url()}`)
      }
    })
  }

  note(m: string) { this.notes.push(m); console.log(`   · ${m}`) }
  friction(m: string) { this.frictions.push(m); console.log(`   ⚠ FRICTION: ${m}`) }
  breakage(m: string) { this.breakages.push(m); console.log(`   ✗ BREAKAGE: ${m}`) }

  async flush() {
    fs.mkdirSync(FINDINGS_DIR, { recursive: true })
    const safe = `${this.info.project.name}__${this.info.title}`.replace(/[^a-z0-9_-]+/gi, '_')
    const out = {
      scenario: this.info.title,
      project: this.info.project.name,
      status: this.info.status,
      durationMs: this.info.duration,
      breakages: this.breakages,
      frictions: this.frictions,
      pageErrors: this.pageErrors,
      consoleErrors: this.consoleErrors,
      serverErrors: this.serverErrors,
      failedRequests: this.failedRequests,
      consoleWarnings: dedupe(this.consoleWarnings).slice(0, 20),
      notes: this.notes,
    }
    fs.writeFileSync(path.join(FINDINGS_DIR, `${safe}.json`), JSON.stringify(out, null, 2))
  }
}

function dedupe(a: string[]) { return [...new Set(a)] }

// Human-ish pause — a 25-50yo first-timer reads, hesitates, looks around.
export async function read(page: Page, ms = 700) { await page.waitForTimeout(ms) }

// ───────────────────────────────────────────────────────────────────────────
// Flow helpers — scoped to the StepSheet (role="dialog") so the persistent
// header "Preview" and per-card "Preview" buttons never collide with primaries.
// ───────────────────────────────────────────────────────────────────────────
// The StepTransition (sync-mode AnimatePresence) leaves the OUTGOING sheet in
// the DOM while the incoming one mounts on top. The active sheet is painted last,
// so target the last dialog. (The lingering sheet is itself a finding — tracked.)
function sheet(page: Page) { return page.getByRole('dialog').last() }

// Give the cross-fade a beat to bring the new sheet on top before acting.
export async function settle(page: Page) {
  await page.waitForTimeout(450)
}

export async function startBuilder(page: Page, rec: Recorder): Promise<string> {
  await page.goto('/builder')
  await page.waitForURL(/\/builder\/[0-9a-f-]+\/names/, { timeout: 45_000 })
  const id = page.url().match(/builder\/([0-9a-f-]+)\//)![1]
  await expect(sheet(page).getByRole('heading')).toBeVisible()
  rec.note(`builder started, invite ${id.slice(0, 8)}`)
  return id
}

export async function primary(page: Page, name: string | RegExp) {
  await settle(page)
  await sheet(page).getByRole('button', { name }).click()
}
export async function later(page: Page, name: string | RegExp) {
  await settle(page)
  await sheet(page).getByRole('button', { name }).click()
}

// Assert we actually advanced to the expected step; otherwise it's a breakage.
export async function expectStep(page: Page, slug: string, rec: Recorder) {
  try {
    await page.waitForURL(new RegExp(`/builder/[0-9a-f-]+/${slug}(\\?|$|#)`), { timeout: 15_000 })
  } catch {
    rec.breakage(`did not reach step "${slug}" — stuck at ${page.url()}`)
    throw new Error(`stuck before ${slug}`)
  }
}

export async function fillNames(page: Page, a: string, b: string) {
  await settle(page)
  await sheet(page).getByPlaceholder('e.g. Emma').fill(a)
  await sheet(page).getByPlaceholder('e.g. Luca').fill(b)
}

export async function pickDate(page: Page, day: number, monthName: string, year: string) {
  await page.getByLabel('Day').selectOption(String(day).padStart(2, '0'))
  await page.getByLabel('Month').selectOption({ label: monthName })
  await page.getByLabel('Year').selectOption(year)
}

export async function pickFilmPreset(page: Page, name: string) {
  await settle(page)
  // The preset card has a gradient overlay <div> that intercepts pointer events,
  // so force the click — but scroll it into view first (force skips auto-scroll;
  // on the small mobile sheet the card is otherwise outside the viewport).
  const btn = sheet(page).getByRole('button', { name: new RegExp(name, 'i') }).first()
  await btn.scrollIntoViewIfNeeded()
  await btn.click({ force: true })
}

export async function uploadVideo(page: Page) {
  await settle(page)
  await sheet(page).locator('input[type="file"][accept^="video"]').setInputFiles(path.join(FIX, 'clip.mp4'))
}

export async function pickOpener(page: Page, name: 'The Letter' | 'The Veil') {
  await settle(page)
  await sheet(page).getByText(name, { exact: true }).click()
}
export async function previewOpener(page: Page, name: 'The Letter' | 'The Veil') {
  const card = sheet(page).getByText(name, { exact: true }).locator('xpath=ancestor::*[@role="button"][1]')
  await card.getByRole('button', { name: new RegExp(`Preview ${name}`) }).click()
}
export async function pickPalette(page: Page, name: string) {
  await settle(page)
  await sheet(page).getByRole('button', { name: new RegExp(name, 'i') }).click()
}

export async function pickMusic(page: Page, title: string) {
  await settle(page)
  await sheet(page).getByText(title, { exact: true }).click()
}
export async function previewMusic(page: Page, title: string) {
  await settle(page)
  const row = sheet(page).getByText(title, { exact: true }).locator('xpath=ancestor::*[@role="button"][1]')
  await row.getByRole('button', { name: new RegExp(`Preview ${title}`) }).click()
}
export async function uploadMusic(page: Page) {
  await settle(page)
  await sheet(page).locator('input[type="file"][accept^="audio"]').setInputFiles(path.join(FIX, 'music.mp3'))
}

export async function saveEmail(page: Page, email: string) {
  await settle(page)
  await sheet(page).getByPlaceholder('you@example.com').fill(email)
  await sheet(page).getByRole('button', { name: /Send me a link/i }).click()
}

export async function toggleSection(page: Page, label: string) {
  await settle(page)
  await sheet(page).getByRole('button', { name: new RegExp(label, 'i') }).first().click()
}

// ── Review + payment ────────────────────────────────────────────────────────
export async function gotoReviewFromDetails(page: Page) {
  await primary(page, /Continue/)
}

// Returns the on-screen total text if the price resolved, else null (stuck).
export async function readTotal(page: Page, rec: Recorder): Promise<string | null> {
  await settle(page)
  const payBtn = sheet(page).getByRole('button', { name: /Pay & publish/i })
  try {
    await expect(payBtn).toBeVisible({ timeout: 20_000 })
    const t = (await payBtn.textContent())?.trim() ?? ''
    rec.note(`price resolved: "${t}"`)
    return t
  } catch {
    const calc = await sheet(page).getByText(/Calculating price/i).isVisible().catch(() => false)
    if (calc) rec.breakage('review stuck on "Calculating price…" — price never resolved')
    else rec.breakage('Pay & publish button never appeared on review')
    return null
  }
}

// Drives the full payment: email gate (if shown) → Stripe hosted checkout test
// card → back to /success → wait for the live/publish result. Returns the final
// success-page state observed.
export async function payAndPublish(page: Page, rec: Recorder, opts: { name: string; email: string }) {
  await sheet(page).getByRole('button', { name: /Pay & publish/i }).click()

  // Email gate (only if draft_email wasn't already saved)
  const emailField = sheet(page).getByPlaceholder('you@email.com')
  if (await emailField.isVisible({ timeout: 4000 }).catch(() => false)) {
    rec.note('email gate shown before payment')
    await emailField.fill(opts.email)
    await sheet(page).getByRole('button', { name: /Continue to payment/i }).click()
  }

  // Stripe hosted checkout
  try {
    await page.waitForURL(/checkout\.stripe\.com/, { timeout: 30_000 })
  } catch {
    rec.breakage('never redirected to Stripe checkout after Pay & publish')
    return 'no_redirect'
  }
  rec.note('reached Stripe hosted checkout')
  await page.waitForLoadState('domcontentloaded')
  await fillStripe(page, rec, opts.name)

  // Back to our success page
  try {
    await page.waitForURL(/\/invite\/[0-9a-f-]+\/success/, { timeout: 60_000 })
  } catch {
    rec.breakage(`did not return to success page after paying — at ${page.url()}`)
    return 'no_return'
  }
  rec.note('redirected back to success page')

  // Wait for a terminal success state
  const live = page.getByText(/It.?s beautiful|Your invitation is live/i).first()
  const manage = page.getByText(/private RSVP link/i).first()
  const failed = page.getByText(/couldn.?t confirm your payment/i).first()
  const deadline = Date.now() + 90_000
  while (Date.now() < deadline) {
    if (await live.isVisible().catch(() => false)) {
      rec.note('SUCCESS: invitation published & live screen shown')
      if (await manage.isVisible().catch(() => false)) rec.note('manage/RSVP link surfaced on success screen')
      else rec.friction('no private RSVP/manage link visible on success screen')
      return 'live'
    }
    if (await failed.isVisible().catch(() => false)) {
      rec.breakage('"We couldn\'t confirm your payment" shown after a successful test payment')
      return 'failed'
    }
    await page.waitForTimeout(1500)
  }
  rec.breakage('success page never resolved to live/failed within 90s')
  return 'timeout'
}

async function fillStripe(page: Page, rec: Recorder, name: string) {
  // The hosted checkout form renders a few seconds after domcontentloaded —
  // wait for the (first-party) card field before filling.
  const card = page.locator('input[name="cardNumber"]')
  try {
    await card.waitFor({ state: 'visible', timeout: 30_000 })
  } catch {
    rec.breakage('Stripe card form never rendered on the hosted checkout page')
    return
  }
  const fill = async (sel: string, value: string, label: string) => {
    const el = page.locator(sel).first()
    if (await el.isVisible().catch(() => false)) { await el.fill(value); return }
    if (label !== 'email' && label !== 'postal') rec.friction(`Stripe field "${label}" missing`)
  }
  await fill('input[name="email"]', `${name.replace(/\s+/g, '.').toLowerCase()}@example.com`, 'email')
  await fill('input[name="cardNumber"]', '4242 4242 4242 4242', 'card number')
  await fill('input[name="cardExpiry"]', '12 / 34', 'expiry')
  await fill('input[name="cardCvc"]', '123', 'cvc')
  await fill('input[name="billingName"]', name, 'name on card')
  await fill('input[name="billingPostalCode"]', '10115', 'postal')

  await page.locator('button[data-testid="hosted-payment-submit-button"]').click({ timeout: 10_000 })
    .catch(() => rec.friction('Stripe Pay button click failed'))
}

// Refresh and flag it as a breakage signal (per the user's definition).
export async function forcedRefresh(page: Page, rec: Recorder, why: string) {
  rec.breakage(`needed a manual refresh: ${why}`)
  await page.reload()
}
