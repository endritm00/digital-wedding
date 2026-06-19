import { defineConfig, devices } from '@playwright/test'

// E2E production-readiness suite. Runs against the already-running dev server
// (next dev on :3000) — we do NOT spawn our own server. Headed + sequential so
// the runs are watchable and don't overwhelm the single dev instance or Stripe.
export default defineConfig({
  testDir: './tests/e2e',
  outputDir: './test-results/artifacts',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 240_000,          // payment journeys hit Stripe's hosted page — be generous
  expect: { timeout: 15_000 },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'test-results/html', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  use: {
    baseURL: 'http://localhost:3000',
    headless: false,         // open a real, visible browser session (as requested)
    actionTimeout: 20_000,
    navigationTimeout: 45_000,
    video: 'on',
    screenshot: 'on',
    trace: 'on',
    launchOptions: { slowMo: 120 }, // human-paced so animations settle & it's watchable
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } },
    },
    {
      name: 'mobile',
      // Pixel 5 = chromium engine + real mobile viewport/touch/UA (the bottom-sheet path)
      use: { ...devices['Pixel 5'] },
    },
  ],
})
