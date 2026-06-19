# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: journeys.spec.ts >> 09 Karen — edits names mid-flow, uses Preview
- Location: tests\e2e\journeys.spec.ts:382:1

# Error details

```
TimeoutError: locator.click: Timeout 20000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /Preview my invitation/i }).first()
    - locator resolved to <button tabindex="0" type="button" class="w-full rounded-full py-4 font-inter mb-3">Preview my invitation →</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not stable
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is not stable
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="rounded-2xl p-4 mb-4">…</div> from <div>…</div> subtree intercepts pointer events
  9 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="mt-5">…</div> from <div>…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="rounded-2xl p-4 mb-4">…</div> from <div>…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="rounded-2xl p-4 mb-4">…</div> from <div>…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="rounded-2xl p-4 mb-4">…</div> from <div>…</div> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="mt-5">…</div> from <div>…</div> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

```

# Page snapshot

```yaml
- generic [active]:
  - generic [ref=e7]:
    - text: Together with their families
    - heading [level=2] [ref=e10]: Karen
    - paragraph [ref=e12]: 27 March 2026
  - alert [ref=e13]
  - button "Open Next.js Dev Tools" [ref=e19] [cursor=pointer]:
    - img [ref=e20]
  - button "Your total is €49. Tap for the breakdown." [ref=e24] [cursor=pointer]:
    - generic [ref=e25]: €49
    - img [ref=e26]
  - generic:
    - generic [ref=e31]:
      - generic:
        - generic: Review
    - dialog "Ready to send it?" [ref=e32]:
      - button "Pull down to see your invitation" [expanded] [ref=e33]:
        - generic: Pull up to keep editing
      - generic [ref=e35]:
        - button "Back" [ref=e36] [cursor=pointer]:
          - img [ref=e37]
          - text: Back
        - heading "Ready to send it?" [level=2] [ref=e39]
        - paragraph [ref=e40]: Preview your invitation first, then publish when you're ready.
        - generic [ref=e41]:
          - img [ref=e42]
          - generic [ref=e45]:
            - generic [ref=e46]:
              - generic [ref=e47]: Names
              - generic [ref=e48]: Karen
            - generic [ref=e49]:
              - generic [ref=e50]: Date
              - generic [ref=e51]: 27 March 2026
            - generic [ref=e52]:
              - generic [ref=e53]: Plan
              - generic [ref=e54]: Save the Date
          - generic [ref=e55]:
            - generic [ref=e56]:
              - generic [ref=e57]: Save the Date
              - generic [ref=e58]: €49
            - generic [ref=e59]:
              - generic [ref=e60]: Total
              - generic [ref=e61]: €49
          - button "Preview my invitation →" [ref=e62] [cursor=pointer]
          - button "Pay & publish — €49" [ref=e63] [cursor=pointer]
          - paragraph [ref=e64]: Secure payment via Stripe. Your invitation goes live the moment payment clears.
      - generic:
        - img
  - generic:
    - generic [ref=e68]:
      - generic:
        - generic: Review
    - dialog "Ready to send it?" [ref=e69]:
      - button "Pull down to see your invitation" [expanded] [ref=e70]:
        - generic: Pull up to keep editing
      - generic [ref=e72]:
        - button "Back" [ref=e73] [cursor=pointer]:
          - img [ref=e74]
          - text: Back
        - heading "Ready to send it?" [level=2] [ref=e76]
        - paragraph [ref=e77]: Preview your invitation first, then publish when you're ready.
        - generic [ref=e78]:
          - img [ref=e79]
          - generic [ref=e82]:
            - generic [ref=e83]:
              - generic [ref=e84]: Names
              - generic [ref=e85]: Karen
            - generic [ref=e86]:
              - generic [ref=e87]: Date
              - generic [ref=e88]: 27 March 2026
            - generic [ref=e89]:
              - generic [ref=e90]: Plan
              - generic [ref=e91]: Save the Date
          - generic [ref=e92]:
            - generic [ref=e93]:
              - generic [ref=e94]: Save the Date
              - generic [ref=e95]: €49
            - generic [ref=e96]:
              - generic [ref=e97]: Total
              - generic [ref=e98]: €49
          - button "Preview my invitation →" [ref=e99] [cursor=pointer]
          - button "Pay & publish — €49" [ref=e100] [cursor=pointer]
          - paragraph [ref=e101]: Secure payment via Stripe. Your invitation goes live the moment payment clears.
      - generic:
        - img
  - generic:
    - generic [ref=e105]:
      - generic:
        - generic: Review
    - dialog "Ready to send it?" [ref=e106]:
      - button "Pull down to see your invitation" [expanded] [ref=e107]:
        - generic: Pull up to keep editing
      - generic [ref=e109]:
        - button "Back" [ref=e110] [cursor=pointer]:
          - img [ref=e111]
          - text: Back
        - heading "Ready to send it?" [level=2] [ref=e113]
        - paragraph [ref=e114]: Preview your invitation first, then publish when you're ready.
        - generic [ref=e115]:
          - img [ref=e116]
          - generic [ref=e119]:
            - generic [ref=e120]:
              - generic [ref=e121]: Names
              - generic [ref=e122]: Karen
            - generic [ref=e123]:
              - generic [ref=e124]: Date
              - generic [ref=e125]: 27 March 2026
            - generic [ref=e126]:
              - generic [ref=e127]: Plan
              - generic [ref=e128]: Save the Date
          - generic [ref=e129]:
            - generic [ref=e130]:
              - generic [ref=e131]: Save the Date
              - generic [ref=e132]: €49
            - generic [ref=e133]:
              - generic [ref=e134]: Total
              - generic [ref=e135]: €49
          - button "Preview my invitation →" [ref=e136] [cursor=pointer]
          - button "Pay & publish — €49" [ref=e137] [cursor=pointer]
          - paragraph [ref=e138]: Secure payment via Stripe. Your invitation goes live the moment payment clears.
      - generic:
        - img
  - generic:
    - generic [ref=e142]:
      - generic:
        - generic: Review
    - dialog "Ready to send it?" [ref=e143]:
      - button "Pull down to see your invitation" [expanded] [ref=e144]:
        - generic: Pull up to keep editing
      - generic [ref=e146]:
        - button "Back" [ref=e147] [cursor=pointer]:
          - img [ref=e148]
          - text: Back
        - heading "Ready to send it?" [level=2] [ref=e150]
        - paragraph [ref=e151]: Preview your invitation first, then publish when you're ready.
        - generic [ref=e152]:
          - img [ref=e153]
          - generic [ref=e156]:
            - generic [ref=e157]:
              - generic [ref=e158]: Names
              - generic [ref=e159]: Karen
            - generic [ref=e160]:
              - generic [ref=e161]: Date
              - generic [ref=e162]: 27 March 2026
            - generic [ref=e163]:
              - generic [ref=e164]: Plan
              - generic [ref=e165]: Save the Date
          - generic [ref=e166]:
            - generic [ref=e167]:
              - generic [ref=e168]: Save the Date
              - generic [ref=e169]: €49
            - generic [ref=e170]:
              - generic [ref=e171]: Total
              - generic [ref=e172]: €49
          - button "Preview my invitation →" [ref=e173] [cursor=pointer]
          - button "Pay & publish — €49" [ref=e174] [cursor=pointer]
          - paragraph [ref=e175]: Secure payment via Stripe. Your invitation goes live the moment payment clears.
      - generic:
        - img
  - generic:
    - generic [ref=e179]:
      - generic:
        - generic: Review
    - dialog "Ready to send it?" [ref=e180]:
      - button "Pull down to see your invitation" [expanded] [ref=e181]:
        - generic: Pull up to keep editing
      - generic [ref=e183]:
        - button "Back" [ref=e184] [cursor=pointer]:
          - img [ref=e185]
          - text: Back
        - heading "Ready to send it?" [level=2] [ref=e187]
        - paragraph [ref=e188]: Preview your invitation first, then publish when you're ready.
        - generic [ref=e189]:
          - img [ref=e190]
          - generic [ref=e193]:
            - generic [ref=e194]:
              - generic [ref=e195]: Names
              - generic [ref=e196]: Karen
            - generic [ref=e197]:
              - generic [ref=e198]: Date
              - generic [ref=e199]: 27 March 2026
            - generic [ref=e200]:
              - generic [ref=e201]: Plan
              - generic [ref=e202]: Save the Date
          - generic [ref=e203]:
            - generic [ref=e204]:
              - generic [ref=e205]: Save the Date
              - generic [ref=e206]: €49
            - generic [ref=e207]:
              - generic [ref=e208]: Total
              - generic [ref=e209]: €49
          - button "Preview my invitation →" [ref=e210] [cursor=pointer]
          - button "Pay & publish — €49" [ref=e211] [cursor=pointer]
          - paragraph [ref=e212]: Secure payment via Stripe. Your invitation goes live the moment payment clears.
      - generic:
        - img
  - generic:
    - generic [ref=e216]:
      - generic:
        - generic: Review
    - dialog "Ready to send it?" [ref=e217]:
      - button "Pull down to see your invitation" [expanded] [ref=e218]:
        - generic: Pull up to keep editing
      - generic [ref=e220]:
        - button "Back" [ref=e221] [cursor=pointer]:
          - img [ref=e222]
          - text: Back
        - heading "Ready to send it?" [level=2] [ref=e224]
        - paragraph [ref=e225]: Preview your invitation first, then publish when you're ready.
        - generic [ref=e226]:
          - img [ref=e227]
          - generic [ref=e230]:
            - generic [ref=e231]:
              - generic [ref=e232]: Names
              - generic [ref=e233]: Karen
            - generic [ref=e234]:
              - generic [ref=e235]: Date
              - generic [ref=e236]: 27 March 2026
            - generic [ref=e237]:
              - generic [ref=e238]: Plan
              - generic [ref=e239]: Save the Date
          - generic [ref=e240]:
            - generic [ref=e241]:
              - generic [ref=e242]: Save the Date
              - generic [ref=e243]: €49
            - generic [ref=e244]:
              - generic [ref=e245]: Total
              - generic [ref=e246]: €49
          - button "Preview my invitation →" [ref=e247] [cursor=pointer]
          - button "Pay & publish — €49" [ref=e248] [cursor=pointer]
          - paragraph [ref=e249]: Secure payment via Stripe. Your invitation goes live the moment payment clears.
      - generic:
        - img
  - generic:
    - generic [ref=e253]:
      - generic:
        - generic: Review
    - dialog "Ready to send it?" [ref=e254]:
      - button "Pull down to see your invitation" [expanded] [ref=e255]:
        - generic: Pull up to keep editing
      - generic [ref=e257]:
        - button "Back" [ref=e258] [cursor=pointer]:
          - img [ref=e259]
          - text: Back
        - heading "Ready to send it?" [level=2] [ref=e261]
        - paragraph [ref=e262]: Preview your invitation first, then publish when you're ready.
        - generic [ref=e263]:
          - img [ref=e264]
          - generic [ref=e267]:
            - generic [ref=e268]:
              - generic [ref=e269]: Names
              - generic [ref=e270]: Karen
            - generic [ref=e271]:
              - generic [ref=e272]: Date
              - generic [ref=e273]: 27 March 2026
            - generic [ref=e274]:
              - generic [ref=e275]: Plan
              - generic [ref=e276]: Save the Date
          - generic [ref=e277]:
            - generic [ref=e278]:
              - generic [ref=e279]: Save the Date
              - generic [ref=e280]: €49
            - generic [ref=e281]:
              - generic [ref=e282]: Total
              - generic [ref=e283]: €49
          - button "Preview my invitation →" [ref=e284] [cursor=pointer]
          - button "Pay & publish — €49" [ref=e285] [cursor=pointer]
          - paragraph [ref=e286]: Secure payment via Stripe. Your invitation goes live the moment payment clears.
      - generic:
        - img
  - generic:
    - generic [ref=e290]:
      - generic:
        - generic: Review
    - dialog "Ready to send it?" [ref=e291]:
      - button "Pull down to see your invitation" [expanded] [ref=e292]:
        - generic: Pull up to keep editing
      - generic [ref=e294]:
        - button "Back" [ref=e295] [cursor=pointer]:
          - img [ref=e296]
          - text: Back
        - heading "Ready to send it?" [level=2] [ref=e298]
        - paragraph [ref=e299]: Preview your invitation first, then publish when you're ready.
        - generic [ref=e300]:
          - img [ref=e301]
          - generic [ref=e304]:
            - generic [ref=e305]:
              - generic [ref=e306]: Names
              - generic [ref=e307]: Karen
            - generic [ref=e308]:
              - generic [ref=e309]: Date
              - generic [ref=e310]: 27 March 2026
            - generic [ref=e311]:
              - generic [ref=e312]: Plan
              - generic [ref=e313]: Save the Date
          - generic [ref=e314]:
            - generic [ref=e315]:
              - generic [ref=e316]: Save the Date
              - generic [ref=e317]: €49
            - generic [ref=e318]:
              - generic [ref=e319]: Total
              - generic [ref=e320]: €49
          - button "Preview my invitation →" [ref=e321] [cursor=pointer]
          - button "Pay & publish — €49" [ref=e322] [cursor=pointer]
          - paragraph [ref=e323]: Secure payment via Stripe. Your invitation goes live the moment payment clears.
      - generic:
        - img
```

# Test source

```ts
  313 |   if (ms === 'ok') rec.note('custom music upload succeeded (UI confirmed)')
  314 |   else if (ms === 'err') rec.friction('custom music upload failed in UI')
  315 |   else rec.friction('custom music upload: no confirmation within 25s')
  316 | 
  317 |   await primary(page, /Continue/)
  318 |   await later(page, /Skip for now/)
  319 |   await expectStep(page, 'sections', rec)
  320 |   await toggleSection(page, 'Photos')
  321 |   await primary(page, /Continue/)
  322 |   await expectStep(page, 'details', rec)
  323 |   // The Photos accordion — does it let her actually add photos?
  324 |   const placeholder = await page.getByText(/Photo uploads will be available after/i).isVisible().catch(() => false)
  325 |   if (placeholder) rec.friction('Photos page has no uploader in the builder — only a "available after saving" note + a text box; a user expecting to add photos now will be confused')
  326 |   else rec.note('Photos page exposed an uploader')
  327 |   await primary(page, /Continue/)
  328 |   await expectStep(page, 'review', rec)
  329 |   await readTotal(page, rec)
  330 | })
  331 | 
  332 | // ─────────────────────────────────────────────────────────────────────────────
  333 | // 8. Beth, 31 — mobile-native. On phones, tries the drag-to-preview gesture and
  334 | //    relies on the bottom sheet. (On desktop the gesture is a no-op.)
  335 | // ─────────────────────────────────────────────────────────────────────────────
  336 | test('08 Beth — mobile bottom-sheet & peek gesture', async ({ page, rec }, info) => {
  337 |   await startBuilder(page, rec)
  338 |   await fillNames(page, 'Beth', 'Chris')
  339 |   await pickDate(page, 9, 'October', '2026')
  340 | 
  341 |   if (isMobile(info)) {
  342 |     // Discover the live preview by dragging the sheet grip down
  343 |     const grip = page.getByRole('button', { name: /see your invitation|keep editing/i }).first()
  344 |     if (await grip.isVisible().catch(() => false)) {
  345 |       const box = await grip.boundingBox()
  346 |       if (box) {
  347 |         await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
  348 |         await page.mouse.down()
  349 |         await page.mouse.move(box.x + box.width / 2, box.y + 400, { steps: 12 })
  350 |         await page.mouse.up()
  351 |         await read(page, 1200)
  352 |         rec.note('performed drag-down peek gesture on mobile')
  353 |         // Pull back up
  354 |         await grip.click().catch(() => {})
  355 |         await read(page, 800)
  356 |       }
  357 |     } else {
  358 |       rec.friction('could not find the drag grip / peek affordance on mobile')
  359 |     }
  360 |   } else {
  361 |     rec.note('desktop — no bottom-sheet gesture (right-side panel)')
  362 |   }
  363 | 
  364 |   await primary(page, /Continue/)
  365 |   await expectStep(page, 'opening-video', rec)
  366 |   await pickFilmPreset(page, 'First Dance')
  367 |   await primary(page, /Continue/)
  368 |   await pickPalette(page, 'Onyx & Gold')
  369 |   await primary(page, /Continue/)
  370 |   await later(page, /No music/)
  371 |   await later(page, /Skip for now/)
  372 |   await primary(page, /Continue/)
  373 |   await primary(page, /Continue/)
  374 |   await expectStep(page, 'review', rec)
  375 |   await readTotal(page, rec)
  376 | })
  377 | 
  378 | // ─────────────────────────────────────────────────────────────────────────────
  379 | // 9. Karen, 50 — re-enters data. Goes back to change names, then uses the
  380 | //    persistent "Preview" affordance to see the whole thing before paying.
  381 | // ─────────────────────────────────────────────────────────────────────────────
  382 | test('09 Karen — edits names mid-flow, uses Preview', async ({ page, rec }) => {
  383 |   const id = await startBuilder(page, rec)
  384 |   await fillNames(page, 'Karne', 'Steven') // typo on purpose
  385 |   await pickDate(page, 27, 'March', '2026')
  386 |   await primary(page, /Continue/)
  387 |   await expectStep(page, 'opening-video', rec)
  388 |   await read(page, 600)
  389 | 
  390 |   // Realises she mistyped her name → goes back
  391 |   await page.goto(`/builder/${id}/names`)
  392 |   await page.waitForTimeout(1200)
  393 |   const cur = await page.getByPlaceholder('e.g. Emma').inputValue().catch(() => '')
  394 |   if (cur === 'Karne') rec.note('name retained on returning to edit')
  395 |   else rec.friction(`name not retained on return (got "${cur}")`)
  396 |   await page.getByPlaceholder('e.g. Emma').fill('Karen')
  397 |   rec.note('corrected the name typo')
  398 |   await primary(page, /Continue/)
  399 |   await expectStep(page, 'opening-video', rec)
  400 |   await pickFilmPreset(page, 'In Bloom')
  401 |   await primary(page, /Continue/)
  402 |   await pickPalette(page, 'Ivory & Rose')
  403 |   await primary(page, /Continue/)
  404 |   await later(page, /No music/)
  405 |   await later(page, /Skip for now/)
  406 |   await primary(page, /Continue/)
  407 |   await primary(page, /Continue/)
  408 |   await expectStep(page, 'review', rec)
  409 | 
  410 |   // Use the "Preview my invitation" button to see the whole thing
  411 |   const previewBtn = page.getByRole('button', { name: /Preview my invitation/i }).first()
  412 |   if (await previewBtn.isVisible().catch(() => false)) {
> 413 |     await previewBtn.click()
      |                      ^ TimeoutError: locator.click: Timeout 20000ms exceeded.
  414 |     await page.waitForURL(/\/invite\/[0-9a-f-]+\/preview/, { timeout: 20_000 }).catch(() => {})
  415 |     if (/\/preview/.test(page.url())) {
  416 |       rec.note('Preview opened the full invitation before paying (good for confidence)')
  417 |       await read(page, 2500)
  418 |     } else {
  419 |       rec.friction(`Preview did not open the full invitation (at ${page.url()})`)
  420 |     }
  421 |   } else {
  422 |     rec.friction('no obvious "Preview" affordance on the review step')
  423 |   }
  424 | })
  425 | 
  426 | // ─────────────────────────────────────────────────────────────────────────────
  427 | // 10. Amy, 27 — pays, then opens her published guest page to understand what
  428 | //     she'll actually share with guests, and looks for the manage link.
  429 | // ─────────────────────────────────────────────────────────────────────────────
  430 | test('10 Amy — pays, opens published guest page + manage link', async ({ page, rec }) => {
  431 |   const id = await startBuilder(page, rec)
  432 |   await fillNames(page, 'Amy', 'Daniel')
  433 |   await pickDate(page, 13, 'November', '2026')
  434 |   await primary(page, /Continue/)
  435 |   await pickFilmPreset(page, 'In Bloom')
  436 |   await primary(page, /Continue/)
  437 |   await pickPalette(page, 'Sage Garden')
  438 |   await primary(page, /Continue/)
  439 |   await pickMusic(page, 'Into the evening')
  440 |   await primary(page, /Continue/)
  441 |   await saveEmail(page, 'amy.test@example.com')
  442 |   await expectStep(page, 'sections', rec)
  443 |   await toggleSection(page, 'Your story')
  444 |   await primary(page, /Continue/)
  445 |   await primary(page, /Continue/)
  446 |   await expectStep(page, 'review', rec)
  447 |   await readTotal(page, rec)
  448 | 
  449 |   const result = await payAndPublish(page, rec, { name: 'Amy Daniel', email: 'amy.test@example.com' })
  450 |   expect.soft(result).toBe('live')
  451 | 
  452 |   if (result === 'live') {
  453 |     // Look for + copy the manage link
  454 |     const manageInput = page.locator('input[readonly]')
  455 |     if (await manageInput.first().isVisible().catch(() => false)) {
  456 |       const val = await manageInput.first().inputValue().catch(() => '')
  457 |       if (/\/manage\//.test(val)) rec.note(`manage link present & shaped correctly: ${val.slice(0, 48)}…`)
  458 |       else rec.friction(`a readonly link is shown but doesn't look like a manage link: ${val.slice(0, 48)}`)
  459 |     }
  460 |     // Open the guest page
  461 |     await page.getByRole('link', { name: /View your invitation/i }).click().catch(() => page.goto(`/invite/${id}`))
  462 |     await page.waitForURL(/\/invite\//, { timeout: 20_000 }).catch(() => {})
  463 |     await page.waitForTimeout(3500)
  464 |     const looksLive = await page.locator('video, [class*="invitation"], h1, h2').first().isVisible().catch(() => false)
  465 |     if (looksLive) rec.note('published guest invitation renders (the thing she shares)')
  466 |     else rec.breakage('published guest page did not render visible invitation content')
  467 |   }
  468 | })
  469 | 
```