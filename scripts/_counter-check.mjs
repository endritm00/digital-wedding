import { chromium } from '@playwright/test'

const br = await chromium.launch({ headless: false, args: ['--start-maximized'] })
const ctx = await br.newContext({ viewport: null })
const page = await ctx.newPage()

await page.goto('http://localhost:3000/invite/e7c79916bd')
await page.waitForTimeout(3000)
await page.locator('.fixed button').first().click({ force: true })
await page.waitForTimeout(1800)

await page.evaluate(() => {
  const h = [...document.querySelectorAll('h3')].find(x => /moments/i.test(x.textContent || ''))
  if (h) h.scrollIntoView({ block: 'center' })
})
await page.waitForTimeout(400)
await page.evaluate(() => { const t = document.querySelector('.no-scrollbar'); if(t) t.scrollTo({left:0,behavior:'auto'}) })
await page.waitForTimeout(200)
await page.evaluate(() => window.scrollBy(0, 120))
await page.waitForTimeout(200)

const getCounter = () => page.evaluate(() =>
  [...document.querySelectorAll('span')].find(s => /\d\d\s*\/\s*\d\d/.test(s.textContent||''))?.textContent?.replace(/\s+/g,' ').trim()
)

const next = page.locator('button[aria-label="Next photo"]')
const prev = page.locator('button[aria-label="Previous photo"]')

console.log('Start:', await getCounter())
await next.click(); await page.waitForTimeout(60)
console.log('After Next (→2):', await getCounter())
await next.click(); await page.waitForTimeout(60)
console.log('After Next (→3):', await getCounter())
await prev.click(); await page.waitForTimeout(60)
console.log('After Prev (→2):', await getCounter())
await prev.click(); await page.waitForTimeout(60)
console.log('After Prev (→1):', await getCounter())

// also simulate a manual swipe to slide 2 via scrollLeft and check counter
await page.evaluate(() => {
  const el = document.querySelector('.no-scrollbar')
  const slide1 = el?.children[1]
  if (el && slide1) el.scrollLeft = slide1.offsetLeft - (el.clientWidth - slide1.offsetWidth) / 2
})
await page.waitForTimeout(200)
console.log('After manual scroll to slide 2:', await getCounter())

await page.screenshot({ path: 'scripts/_counter.png', fullPage: false })
await br.close()
console.log('done')
