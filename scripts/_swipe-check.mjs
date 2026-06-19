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
await page.waitForTimeout(300)
await page.evaluate(() => window.scrollBy(0, 120))
await page.waitForTimeout(200)

const getCounter = () => page.evaluate(() =>
  [...document.querySelectorAll('span')].find(s => /\d\d\s*\/\s*\d\d/.test(s.textContent||''))?.textContent?.replace(/\s+/g,' ').trim()
)

// simulate swipe to slide 2 with no prior button click (guard is clear)
await page.evaluate(() => {
  const el = document.querySelector('.no-scrollbar')
  const slide1 = el?.children[1]
  if (el && slide1) el.scrollLeft = slide1.offsetLeft - (el.clientWidth - slide1.offsetWidth) / 2
})
await page.waitForTimeout(200)
console.log('Swipe to slide 2 (no prior click):', await getCounter())

// swipe to slide 3
await page.evaluate(() => {
  const el = document.querySelector('.no-scrollbar')
  const slide2 = el?.children[2]
  if (el && slide2) el.scrollLeft = slide2.offsetLeft - (el.clientWidth - slide2.offsetWidth) / 2
})
await page.waitForTimeout(200)
console.log('Swipe to slide 3:', await getCounter())

// swipe back to slide 1
await page.evaluate(() => {
  const el = document.querySelector('.no-scrollbar')
  if (el) el.scrollLeft = 0
})
await page.waitForTimeout(200)
console.log('Swipe back to slide 1:', await getCounter())

await page.screenshot({ path: 'scripts/_swipe.png', fullPage: false })
await br.close()
console.log('done')
