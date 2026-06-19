# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: journeys.spec.ts >> 08 Beth — mobile bottom-sheet & peek gesture
- Location: tests\e2e\journeys.spec.ts:336:1

# Error details

```
TimeoutError: locator.click: Timeout 20000ms exceeded.
Call log:
  - waiting for getByRole('dialog').last().getByRole('button', { name: /Continue/ })
    - locator resolved to <button tabindex="0" type="button" class="w-full rounded-full py-4 font-inter disabled:opacity-40">Continue</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - element is outside of the viewport
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - element is outside of the viewport
    - retrying click action
      - waiting 100ms
    39 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - element is outside of the viewport
     - retrying click action
       - waiting 500ms

```

# Page snapshot

```yaml
- generic:
  - alert [ref=e1]
  - button "Open Next.js Dev Tools" [ref=e7] [cursor=pointer]:
    - img [ref=e8]
  - generic [ref=e17]:
    - text: Together with their families
    - heading [level=2] [ref=e20]: Beth
    - paragraph [ref=e22]: 9 October 2026
  - button "Your total is €49. Tap for the breakdown." [ref=e24] [cursor=pointer]:
    - generic [ref=e25]: €49
    - img [ref=e26]
  - generic:
    - generic [ref=e31]:
      - generic:
        - generic: Your names
    - dialog "Who's getting married?" [ref=e32]:
      - button "Pull up to keep editing" [active] [ref=e33]:
        - generic [ref=e35]: Pull up to keep editing
      - generic [ref=e36]:
        - heading "Who's getting married?" [level=2] [ref=e37]
        - paragraph [ref=e38]: These names appear at the heart of your invitation.
        - generic [ref=e40]:
          - generic [ref=e41]:
            - generic [ref=e42]: First person
            - textbox "First person" [ref=e43]:
              - /placeholder: e.g. Emma
              - text: Beth
          - generic [ref=e44]:
            - generic [ref=e45]: Second person
            - textbox "Second person" [ref=e46]:
              - /placeholder: e.g. Luca
          - generic [ref=e47]:
            - generic [ref=e48]: Wedding date
            - generic [ref=e49]:
              - combobox "Day" [ref=e50] [cursor=pointer]:
                - option "Day"
                - option "1"
                - option "2"
                - option "3"
                - option "4"
                - option "5"
                - option "6"
                - option "7"
                - option "8"
                - option "9" [selected]
                - option "10"
                - option "11"
                - option "12"
                - option "13"
                - option "14"
                - option "15"
                - option "16"
                - option "17"
                - option "18"
                - option "19"
                - option "20"
                - option "21"
                - option "22"
                - option "23"
                - option "24"
                - option "25"
                - option "26"
                - option "27"
                - option "28"
                - option "29"
                - option "30"
                - option "31"
              - combobox "Month" [ref=e51] [cursor=pointer]:
                - option "Month"
                - option "January"
                - option "February"
                - option "March"
                - option "April"
                - option "May"
                - option "June"
                - option "July"
                - option "August"
                - option "September"
                - option "October" [selected]
                - option "November"
                - option "December"
              - combobox "Year" [ref=e52] [cursor=pointer]:
                - option "Year"
                - option "2026" [selected]
                - option "2027"
                - option "2028"
                - option "2029"
                - option "2030"
                - option "2031"
      - generic:
        - img
      - generic [ref=e53]:
        - button "Continue" [ref=e54] [cursor=pointer]
        - button "Decide later" [ref=e55] [cursor=pointer]
```

# Test source

```ts
  4   | 
  5   | const FIX = path.join(process.cwd(), 'tests', 'fixtures')
  6   | const FINDINGS_DIR = path.join(process.cwd(), 'test-results', 'findings')
  7   | 
  8   | // ───────────────────────────────────────────────────────────────────────────
  9   | // Recorder — captures everything that signals a breakage or rough edge, plus
  10  | // manual UX observations. One JSON file per scenario; aggregated afterwards.
  11  | // ───────────────────────────────────────────────────────────────────────────
  12  | export class Recorder {
  13  |   consoleErrors: string[] = []
  14  |   consoleWarnings: string[] = []
  15  |   pageErrors: string[] = []
  16  |   failedRequests: string[] = []
  17  |   serverErrors: string[] = []
  18  |   notes: string[] = []        // neutral observations / steps reached
  19  |   frictions: string[] = []    // UX friction / confusion points
  20  |   breakages: string[] = []    // hard breakages (stuck, needed refresh, crash)
  21  | 
  22  |   constructor(public page: Page, public info: TestInfo) {
  23  |     page.on('console', (m) => {
  24  |       const t = m.type()
  25  |       const txt = `${m.text()}`.slice(0, 300)
  26  |       const loc = m.location()?.url || ''
  27  |       // Only OUR app's console — ignore third-party (Stripe/hCaptcha/Google Pay) noise
  28  |       if (loc && !loc.includes('localhost:3000')) return
  29  |       if (/\[Fast Refresh\]|Download the React DevTools|Turbopack/i.test(txt)) return
  30  |       if (t === 'error') this.consoleErrors.push(txt)
  31  |       else if (t === 'warning') this.consoleWarnings.push(txt)
  32  |     })
  33  |     page.on('pageerror', (e) => this.pageErrors.push(`${e.message}`.slice(0, 300)))
  34  |     page.on('requestfailed', (r) => {
  35  |       const u = r.url()
  36  |       const err = r.failure()?.errorText || ''
  37  |       // _rsc=… are Next.js route-prefetch aborts on fast navigation — not real failures
  38  |       if (!u.includes('localhost:3000')) return
  39  |       if (u.includes('_rsc=') || err.includes('ERR_ABORTED')) return
  40  |       this.failedRequests.push(`${r.method()} ${u} — ${err}`)
  41  |     })
  42  |     page.on('response', (r) => {
  43  |       if (r.status() >= 500 && r.url().includes('localhost:3000')) {
  44  |         this.serverErrors.push(`${r.status()} ${r.request().method()} ${r.url()}`)
  45  |       }
  46  |     })
  47  |   }
  48  | 
  49  |   note(m: string) { this.notes.push(m); console.log(`   · ${m}`) }
  50  |   friction(m: string) { this.frictions.push(m); console.log(`   ⚠ FRICTION: ${m}`) }
  51  |   breakage(m: string) { this.breakages.push(m); console.log(`   ✗ BREAKAGE: ${m}`) }
  52  | 
  53  |   async flush() {
  54  |     fs.mkdirSync(FINDINGS_DIR, { recursive: true })
  55  |     const safe = `${this.info.project.name}__${this.info.title}`.replace(/[^a-z0-9_-]+/gi, '_')
  56  |     const out = {
  57  |       scenario: this.info.title,
  58  |       project: this.info.project.name,
  59  |       status: this.info.status,
  60  |       durationMs: this.info.duration,
  61  |       breakages: this.breakages,
  62  |       frictions: this.frictions,
  63  |       pageErrors: this.pageErrors,
  64  |       consoleErrors: this.consoleErrors,
  65  |       serverErrors: this.serverErrors,
  66  |       failedRequests: this.failedRequests,
  67  |       consoleWarnings: dedupe(this.consoleWarnings).slice(0, 20),
  68  |       notes: this.notes,
  69  |     }
  70  |     fs.writeFileSync(path.join(FINDINGS_DIR, `${safe}.json`), JSON.stringify(out, null, 2))
  71  |   }
  72  | }
  73  | 
  74  | function dedupe(a: string[]) { return [...new Set(a)] }
  75  | 
  76  | // Human-ish pause — a 25-50yo first-timer reads, hesitates, looks around.
  77  | export async function read(page: Page, ms = 700) { await page.waitForTimeout(ms) }
  78  | 
  79  | // ───────────────────────────────────────────────────────────────────────────
  80  | // Flow helpers — scoped to the StepSheet (role="dialog") so the persistent
  81  | // header "Preview" and per-card "Preview" buttons never collide with primaries.
  82  | // ───────────────────────────────────────────────────────────────────────────
  83  | // The StepTransition (sync-mode AnimatePresence) leaves the OUTGOING sheet in
  84  | // the DOM while the incoming one mounts on top. The active sheet is painted last,
  85  | // so target the last dialog. (The lingering sheet is itself a finding — tracked.)
  86  | function sheet(page: Page) { return page.getByRole('dialog').last() }
  87  | 
  88  | // Give the cross-fade a beat to bring the new sheet on top before acting.
  89  | export async function settle(page: Page) {
  90  |   await page.waitForTimeout(450)
  91  | }
  92  | 
  93  | export async function startBuilder(page: Page, rec: Recorder): Promise<string> {
  94  |   await page.goto('/builder')
  95  |   await page.waitForURL(/\/builder\/[0-9a-f-]+\/names/, { timeout: 45_000 })
  96  |   const id = page.url().match(/builder\/([0-9a-f-]+)\//)![1]
  97  |   await expect(sheet(page).getByRole('heading')).toBeVisible()
  98  |   rec.note(`builder started, invite ${id.slice(0, 8)}`)
  99  |   return id
  100 | }
  101 | 
  102 | export async function primary(page: Page, name: string | RegExp) {
  103 |   await settle(page)
> 104 |   await sheet(page).getByRole('button', { name }).click()
      |                                                   ^ TimeoutError: locator.click: Timeout 20000ms exceeded.
  105 | }
  106 | export async function later(page: Page, name: string | RegExp) {
  107 |   await settle(page)
  108 |   await sheet(page).getByRole('button', { name }).click()
  109 | }
  110 | 
  111 | // Assert we actually advanced to the expected step; otherwise it's a breakage.
  112 | export async function expectStep(page: Page, slug: string, rec: Recorder) {
  113 |   try {
  114 |     await page.waitForURL(new RegExp(`/builder/[0-9a-f-]+/${slug}(\\?|$|#)`), { timeout: 15_000 })
  115 |   } catch {
  116 |     rec.breakage(`did not reach step "${slug}" — stuck at ${page.url()}`)
  117 |     throw new Error(`stuck before ${slug}`)
  118 |   }
  119 | }
  120 | 
  121 | export async function fillNames(page: Page, a: string, b: string) {
  122 |   await settle(page)
  123 |   await sheet(page).getByPlaceholder('e.g. Emma').fill(a)
  124 |   await sheet(page).getByPlaceholder('e.g. Luca').fill(b)
  125 | }
  126 | 
  127 | export async function pickDate(page: Page, day: number, monthName: string, year: string) {
  128 |   await page.getByLabel('Day').selectOption(String(day).padStart(2, '0'))
  129 |   await page.getByLabel('Month').selectOption({ label: monthName })
  130 |   await page.getByLabel('Year').selectOption(year)
  131 | }
  132 | 
  133 | export async function pickFilmPreset(page: Page, name: string) {
  134 |   await settle(page)
  135 |   // The preset card has a gradient overlay <div> that intercepts pointer events,
  136 |   // so force the click — but scroll it into view first (force skips auto-scroll;
  137 |   // on the small mobile sheet the card is otherwise outside the viewport).
  138 |   const btn = sheet(page).getByRole('button', { name: new RegExp(name, 'i') }).first()
  139 |   await btn.scrollIntoViewIfNeeded()
  140 |   await btn.click({ force: true })
  141 | }
  142 | 
  143 | export async function uploadVideo(page: Page) {
  144 |   await settle(page)
  145 |   await sheet(page).locator('input[type="file"][accept^="video"]').setInputFiles(path.join(FIX, 'clip.mp4'))
  146 | }
  147 | 
  148 | export async function pickOpener(page: Page, name: 'The Letter' | 'The Veil') {
  149 |   await settle(page)
  150 |   await sheet(page).getByText(name, { exact: true }).click()
  151 | }
  152 | export async function previewOpener(page: Page, name: 'The Letter' | 'The Veil') {
  153 |   const card = sheet(page).getByText(name, { exact: true }).locator('xpath=ancestor::*[@role="button"][1]')
  154 |   await card.getByRole('button', { name: new RegExp(`Preview ${name}`) }).click()
  155 | }
  156 | export async function pickPalette(page: Page, name: string) {
  157 |   await settle(page)
  158 |   await sheet(page).getByRole('button', { name: new RegExp(name, 'i') }).click()
  159 | }
  160 | 
  161 | export async function pickMusic(page: Page, title: string) {
  162 |   await settle(page)
  163 |   await sheet(page).getByText(title, { exact: true }).click()
  164 | }
  165 | export async function previewMusic(page: Page, title: string) {
  166 |   await settle(page)
  167 |   const row = sheet(page).getByText(title, { exact: true }).locator('xpath=ancestor::*[@role="button"][1]')
  168 |   await row.getByRole('button', { name: new RegExp(`Preview ${title}`) }).click()
  169 | }
  170 | export async function uploadMusic(page: Page) {
  171 |   await settle(page)
  172 |   await sheet(page).locator('input[type="file"][accept^="audio"]').setInputFiles(path.join(FIX, 'music.mp3'))
  173 | }
  174 | 
  175 | export async function saveEmail(page: Page, email: string) {
  176 |   await settle(page)
  177 |   await sheet(page).getByPlaceholder('you@example.com').fill(email)
  178 |   await sheet(page).getByRole('button', { name: /Send me a link/i }).click()
  179 | }
  180 | 
  181 | export async function toggleSection(page: Page, label: string) {
  182 |   await settle(page)
  183 |   await sheet(page).getByRole('button', { name: new RegExp(label, 'i') }).first().click()
  184 | }
  185 | 
  186 | // ── Review + payment ────────────────────────────────────────────────────────
  187 | export async function gotoReviewFromDetails(page: Page) {
  188 |   await primary(page, /Continue/)
  189 | }
  190 | 
  191 | // Returns the on-screen total text if the price resolved, else null (stuck).
  192 | export async function readTotal(page: Page, rec: Recorder): Promise<string | null> {
  193 |   await settle(page)
  194 |   const payBtn = sheet(page).getByRole('button', { name: /Pay & publish/i })
  195 |   try {
  196 |     await expect(payBtn).toBeVisible({ timeout: 20_000 })
  197 |     const t = (await payBtn.textContent())?.trim() ?? ''
  198 |     rec.note(`price resolved: "${t}"`)
  199 |     return t
  200 |   } catch {
  201 |     const calc = await sheet(page).getByText(/Calculating price/i).isVisible().catch(() => false)
  202 |     if (calc) rec.breakage('review stuck on "Calculating price…" — price never resolved')
  203 |     else rec.breakage('Pay & publish button never appeared on review')
  204 |     return null
```