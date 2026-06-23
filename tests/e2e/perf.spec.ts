import { test, expect, type Page } from '@playwright/test'
import fs from 'node:fs'
import path from 'node:path'

// ─────────────────────────────────────────────────────────────────────────────
// PERFORMANCE BENCHMARK (audit only — changes nothing in the app)
//
// Runs against the PRODUCTION build (next start on :3000). Acts like a human:
// reads/skims with realistic pauses, types at ~human cadence, navigates step to
// step, adds items, and scrolls. At every step it records:
//   • wall   — wall-clock latency the user actually waits (click → next paint)
//   • TBT    — total blocking time (Σ longtask over 50ms) during the action:
//              the main-thread "jank" budget; >200ms in a window feels sloppy
//   • LT     — total longtask ms + count + worst single longtask
//   • CLS    — layout shift accumulated during scroll
//
// CPU is throttled per project (desktop ≈ real machine, mobile ≈ 4× = mid-range
// phone) so the numbers reflect what real guests/couples feel.
// ─────────────────────────────────────────────────────────────────────────────

test.use({
  headless: true,
  launchOptions: { slowMo: 0 },
  video: 'off',
  trace: 'off',
  screenshot: 'off',
})

type Metric = { step: string; wallMs?: number; tbtMs: number; longtaskMs: number; longtaskCount: number; maxLongtaskMs: number; clsX1000?: number; note?: string }

const CPU_RATE: Record<string, number> = { desktop: 1, mobile: 4 }

async function instrument(page: Page) {
  await page.addInitScript(() => {
    // @ts-expect-error test global
    window.__perf = { longtasks: [], shifts: 0 }
    try {
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) {
          // @ts-expect-error test global
          window.__perf.longtasks.push({ s: e.startTime, d: e.duration })
        }
      }).observe({ entryTypes: ['longtask'] })
    } catch { /* unsupported */ }
    try {
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) {
          // @ts-expect-error layout-shift fields
          if (!e.hadRecentInput) window.__perf.shifts += (e as { value: number }).value
        }
      }).observe({ type: 'layout-shift', buffered: true })
    } catch { /* unsupported */ }
  })
}

const pnow = (page: Page) => page.evaluate(() => performance.now())

async function since(page: Page, t0: number) {
  return page.evaluate((t0) => {
    // @ts-expect-error test global
    const lts: { s: number; d: number }[] = window.__perf.longtasks.filter((x: { s: number }) => x.s >= t0)
    const tbt = lts.reduce((a, x) => a + Math.max(0, x.d - 50), 0)
    const sum = lts.reduce((a, x) => a + x.d, 0)
    const max = lts.reduce((a, x) => Math.max(a, x.d), 0)
    return { tbtMs: Math.round(tbt), longtaskMs: Math.round(sum), longtaskCount: lts.length, maxLongtaskMs: Math.round(max) }
  }, t0)
}

const results: Metric[] = []
function rec(m: Metric) { results.push(m); console.log(`   ▸ ${m.step.padEnd(34)} wall=${(m.wallMs ?? 0).toString().padStart(5)}ms  TBT=${m.tbtMs.toString().padStart(5)}ms  LT=${m.longtaskMs}ms/${m.longtaskCount} max=${m.maxLongtaskMs}ms${m.clsX1000 != null ? `  CLS=${(m.clsX1000 / 1000).toFixed(3)}` : ''}${m.note ? `  (${m.note})` : ''}`) }

const sheet = (page: Page) => page.getByRole('dialog').last()

test('builder + invite performance walk (human-paced)', async ({ page }, info) => {
  test.setTimeout(240_000)
  const rate = CPU_RATE[info.project.name] ?? 1
  const client = await page.context().newCDPSession(page)
  await client.send('Emulation.setCPUThrottlingRate', { rate })
  await instrument(page)
  console.log(`\n══ PERF (${info.project.name}, CPU ${rate}×) ══`)

  // ── 1. Builder create + first paint ────────────────────────────────────────
  {
    const t0 = Date.now()
    await page.goto('/builder')
    await page.waitForURL(/\/builder\/[0-9a-f-]+\/names/, { timeout: 45_000 })
    await expect(sheet(page).getByRole('heading')).toBeVisible({ timeout: 30_000 })
    const wall = Date.now() - t0
    await page.waitForTimeout(800)
    rec({ step: 'builder open (create+load)', wallMs: wall, ...(await since(page, 0)) })
  }
  const id = page.url().match(/builder\/([0-9a-f-]+)\//)![1]

  // ── 2. Typing the couple's names (live-preview re-render cost) ──────────────
  {
    const a = sheet(page).getByPlaceholder('e.g. Emma')
    await a.click()
    const p0 = await pnow(page)
    await a.pressSequentially('Alexandra', { delay: 110 })
    const b = sheet(page).getByPlaceholder('e.g. Luca')
    await b.click()
    await b.pressSequentially('Maximilian', { delay: 110 })
    await page.waitForTimeout(500)
    rec({ step: 'type names (19 chars)', ...(await since(page, p0)), note: 'live preview updates per keystroke' })
  }

  // pick a wedding date so "Continue" advances on the first press
  await page.getByLabel('Day').selectOption('14')
  await page.getByLabel('Month').selectOption({ label: 'June' })
  await page.getByLabel('Year').selectOption(String(new Date().getFullYear() + 1))

  // small "reading the form" pause
  await page.waitForTimeout(700)

  // ── 3. Step navigation latencies ───────────────────────────────────────────
  const nav = async (label: string, clickName: RegExp, urlRe: RegExp) => {
    const p0 = await pnow(page)
    const t0 = Date.now()
    await sheet(page).getByRole('button', { name: clickName }).first().click()
    await page.waitForURL(urlRe, { timeout: 20_000 })
    await expect(sheet(page).getByRole('heading').first()).toBeVisible({ timeout: 20_000 })
    const wall = Date.now() - t0
    await page.waitForTimeout(600)
    rec({ step: `nav → ${label}`, wallMs: wall, ...(await since(page, p0)) })
    await page.waitForTimeout(500) // human reads the new screen
  }

  await nav('opening-video', /Continue/, /\/opening-video/)

  // pick a preset film (item selection latency)
  {
    const btn = sheet(page).getByRole('button', { name: /The Vows/i }).first()
    await btn.scrollIntoViewIfNeeded()
    const p0 = await pnow(page); const t0 = Date.now()
    await btn.click({ force: true })
    await page.waitForTimeout(400)
    rec({ step: 'select film preset', wallMs: Date.now() - t0, ...(await since(page, p0)) })
  }

  await nav('style', /Continue/, /\/style/)

  // palette + font selection (item selection latency on a screen with the live preview)
  {
    const pal = sheet(page).getByRole('button', { name: /Onyx & Gold/i }).first()
    const p0 = await pnow(page); const t0 = Date.now()
    await pal.click()
    await page.waitForTimeout(400)
    rec({ step: 'select palette', wallMs: Date.now() - t0, ...(await since(page, p0)) })
  }

  await nav('music', /Continue/, /\/music/)
  await nav('save (email)', /Continue/, /\/save/)
  await nav('sections', /Skip for now/, /\/sections/)

  // ── 4. Toggling content sections (add-item latency) ────────────────────────
  for (const label of ['Your story', 'The day', 'Photos', 'Gifts', 'Questions']) {
    const btn = sheet(page).getByRole('button', { name: new RegExp(label, 'i') }).first()
    if (!(await btn.isVisible().catch(() => false))) continue
    await btn.scrollIntoViewIfNeeded()
    const p0 = await pnow(page); const t0 = Date.now()
    await btn.click()
    await page.waitForTimeout(350)
    rec({ step: `toggle section: ${label}`, wallMs: Date.now() - t0, ...(await since(page, p0)) })
  }

  await nav('details', /Continue/, /\/details/)

  // ── 5. Details: expand sections, type, add schedule items ──────────────────
  // Open "The day" accordion if collapsed, then add a few moments.
  {
    const theDay = sheet(page).getByRole('button', { name: /The day/i }).first()
    if (await theDay.isVisible().catch(() => false)) {
      await theDay.click().catch(() => {})
      await page.waitForTimeout(500)
    }
    for (const moment of ['Dinner', 'First Dance', 'Speeches']) {
      const add = sheet(page).getByRole('button', { name: new RegExp(`\\+ ?${moment}`, 'i') }).first()
      if (!(await add.isVisible().catch(() => false))) continue
      await add.scrollIntoViewIfNeeded()
      const p0 = await pnow(page); const t0 = Date.now()
      await add.click()
      await page.waitForTimeout(350)
      rec({ step: `add schedule item: ${moment}`, wallMs: Date.now() - t0, ...(await since(page, p0)) })
    }
  }

  // Type into a details text field (does it re-render the whole preview?)
  {
    const field = sheet(page).locator('input[type="text"], textarea').first()
    if (await field.isVisible().catch(() => false)) {
      await field.click()
      const p0 = await pnow(page)
      await field.pressSequentially('The Old Rectory, Cotswolds', { delay: 90 })
      await page.waitForTimeout(500)
      rec({ step: 'type in details field (26 chars)', ...(await since(page, p0)) })
    }
  }

  // ── 6. Invite preview page: load + human-paced scroll jank ─────────────────
  {
    const t0 = Date.now()
    await page.goto(`/invite/${id}/preview?skipOpener=1`)
    await expect(page.getByText(/Alexandra|Maximilian|Be Our Guest|The Day/i).first()).toBeVisible({ timeout: 30_000 })
    const wall = Date.now() - t0
    await page.waitForTimeout(1000)
    rec({ step: 'invite preview load', wallMs: wall, ...(await since(page, 0)) })

    const p0 = await pnow(page)
    for (let i = 0; i < 9; i++) {
      await page.mouse.wheel(0, 650)
      await page.waitForTimeout(650) // human skims each band
    }
    const cls = await page.evaluate(() => (window as unknown as { __perf: { shifts: number } }).__perf.shifts)
    rec({ step: 'invite scroll (9 bands)', ...(await since(page, p0)), clsX1000: Math.round(cls * 1000), note: 'main-thread during scroll' })
  }

  // persist
  const dir = path.join(process.cwd(), 'test-results', 'perf')
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, `${info.project.name}.json`), JSON.stringify({ project: info.project.name, cpuRate: rate, inviteId: id, metrics: results }, null, 2))
})

test('home page scroll jank (human-paced)', async ({ page }, info) => {
  const rate = CPU_RATE[info.project.name] ?? 1
  const client = await page.context().newCDPSession(page)
  await client.send('Emulation.setCPUThrottlingRate', { rate })
  await instrument(page)
  const home: Metric[] = []
  const t0 = Date.now()
  await page.goto('/')
  await expect(page.getByText(/Begin your|Forever/i).first()).toBeVisible({ timeout: 30_000 })
  await page.waitForTimeout(1200)
  home.push({ step: 'home load', wallMs: Date.now() - t0, ...(await since(page, 0)) })

  const p0 = await pnow(page)
  for (let i = 0; i < 10; i++) { await page.mouse.wheel(0, 700); await page.waitForTimeout(600) }
  const cls = await page.evaluate(() => (window as unknown as { __perf: { shifts: number } }).__perf.shifts)
  home.push({ step: 'home scroll (10 steps)', ...(await since(page, p0)), clsX1000: Math.round(cls * 1000) })

  for (const m of home) console.log(`   ▸ [home] ${m.step.padEnd(26)} wall=${(m.wallMs ?? 0)}ms TBT=${m.tbtMs}ms LT=${m.longtaskMs}ms/${m.longtaskCount} max=${m.maxLongtaskMs}ms${m.clsX1000 != null ? ` CLS=${(m.clsX1000/1000).toFixed(3)}` : ''}`)
  const dir = path.join(process.cwd(), 'test-results', 'perf')
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, `home-${info.project.name}.json`), JSON.stringify({ project: info.project.name, cpuRate: rate, metrics: home }, null, 2))
})
