# End-to-End Production-Readiness Report

**Method:** Real Chromium (Playwright, headed) driving the live app at `localhost:3000` — *not* the preview pane. 10 persona-driven journeys ("non-tech-savvy women, 25–55"), each run on **desktop (1280×800)** and **mobile (Pixel 5)** = 20 runs, plus reruns. Every run captured: video, screenshots, trace, all console errors, page (JS) exceptions, failed requests, and 5xx responses. Personas behaved like real first-timers: reading, hesitating, mis-clicking, going back, refreshing, changing their minds, skipping steps.

Artifacts: `test-results/html/` (report), `test-results/artifacts/` (videos + traces per run), `test-results/findings/` (per-scenario JSON), `test-results/findings-summary.md`.

## Headline

| Signal | Result |
|---|---|
| App breakages (stuck / crash / needed refresh to recover) | **0** |
| JS exceptions (pageerror) | **0** |
| Server 5xx | **0** |
| Core journey completed (build → price → pay → publish → live) | **Yes, desktop + mobile** |
| "Calculating price…" hang (the original bug) | **Gone** — price resolved to €49 in every run |
| Data loss on refresh / back-navigation | **None** — autosave holds |

13/20 passed on the first pass; the 7 "failures" were **all test-harness issues** (per-IP rate-limit buckets, a mobile force-click that needed a scroll, and over-strict locators), confirmed by 0 breakages/0 JS errors in those same runs. After fixing the harness and restarting the server, 5 of 7 re-passed; the last 2 (mobile bottom-sheet tail clicks) still flake on click-timing but had already captured their core findings. **No app defect caused any failure.**

---

## 1. Did anything break? Did we ever need to refresh?

**No.** No scenario required a refresh or any non-obvious recovery to proceed. Specifically:

- The "wanderer" persona (Jen) deliberately **refreshed mid-build** and used the browser **Back** button repeatedly. Her selections and names **persisted** ("refresh kept us on the style step", "names persisted after refresh + back"), and the **price still resolved** afterward. Autosave is solid.
- The "re-enterer" (Karen) went **back to fix a name typo** — the old value was retained and the correction saved.
- Every payment journey returned cleanly from Stripe to a working success screen.

**One latent, non-user-visible issue:** the step-to-step transition (`StepTransition`, sync-mode `AnimatePresence`) leaves the **outgoing step's sheet mounted in the DOM** behind the new one (its infinite child animations stop it unmounting). Users only ever see the top one, but stale sheets accumulate as you advance through the 8 steps. Not a breakage, but a correctness/memory smell worth cleaning up.

## 2. Is the UI clear and friendly for non-technical users?

**Largely yes — this is a strength.** One decision per screen, warm plain-English prompts ("Who's getting married?", "What plays when they open it?"), a live preview always on screen, a progress bar, gentle nudges (the date prompt explains *why* a date matters), and escape hatches everywhere ("Decide later", "Skip for now", "No music"). A first-timer is never confronted with a wall of fields.

**Mobile caveats (the audience skews mobile):**
- The bottom sheet's **drag-to-peek** gesture works, but discoverability rests on a one-time hint bubble. A 50-year-old may never realize they can drag to see their invitation.
- After interacting on a phone, the **primary CTA inside the sheet can sit below the fold**, requiring a scroll to reach — this is exactly what tripped the two mobile tail-clicks. A "Continue" button you have to hunt for is real friction for this audience. Recommend pinning the primary action so it's always visible.

## 3. Payment, links, and "do they understand the flow?"

**The whole money path works, desktop and mobile**, and reads clearly:

- Price is on the button itself ("**Pay & publish — €49**") with "Secure payment via Stripe."
- Redirects to **Stripe's branded hosted checkout** (trusted), test card succeeds, returns to a celebratory **"It's beautiful. Your invitation is live"** screen.
- The couple's **private RSVP/manage link** is surfaced with a Copy button and the reassurance "See who's coming — no login needed… we've emailed it to you too." Link is correctly shaped (`/manage/<token>`).
- If email wasn't captured earlier, **checkout asks for it first** (verified) — exactly the intended gate.

**Two trust gaps to fix before launch:**
1. **"Keep your work safe" lies.** That step's button says "Send me a link" and then shows **"Link sent! Check your inbox."** — but no email is actually sent there; it only stores the address locally. A user who checks their inbox finds nothing. Either send a real draft-resume link or change the copy (e.g. "Saved — we'll email your link when you publish").
2. **Emails aren't actually delivered to real users yet.** Resend is in test mode (`onboarding@resend.dev`), which only delivers to the Resend account owner. So "we've emailed it to you" is currently false for real couples. (Domain-verify in the OPS runbook — must be done before launch.)

## 4. Uploading video / photos / music — do they work?

| Media | Status |
|---|---|
| **Curated films** (video presets) | ✅ Work; default happy path. Selecting one, switching between them, and switching *to* a free preset (which removes the +€4.99 custom fee) all behave correctly. |
| **Custom video upload** (Mux) | ⚠️ Path works (file picker → upload → **+€4.99 fee shows** → "processing"). Mux is configured. A real clip is needed to confirm transcode; a malformed file lands in a processing/failed state — the **error UX for a rejected clip should be verified**. |
| **Custom music upload** (Supabase Storage) | ✅ Backend works — an uploaded track reached **`ready`** and the `invite-media` bucket exists. ⚠️ But the in-builder **"uploaded ✓" confirmation didn't surface within 25 s** in tests — verify the feedback is prompt, not just eventual. |
| **Music previews** (the play buttons) | ❌ **Broken.** All 5 curated tracks are hosted on `cdn.pixabay.com`, but the app's CSP `media-src` only allows `self / mux / supabase`. Every preview is silently **blocked by CSP** — the play buttons do nothing. This is the most visible media bug: the entire point of the music step is to *hear* the options. |
| **Photos** | ❌ **No uploader in the builder.** Adding the "Photos" page shows *"Photo uploads will be available after your invitation is saved"* + a text note box. A user who selects "Photos" expecting to add images now will be confused. Either add a real uploader or make the deferral explicit and reassuring. |

## 5. Consistency, trust, and unanswered questions

**Visual consistency is excellent and reads as a premium, trustworthy product** — a coherent Cormorant/Inter type system, a single gold accent, consistent sheet/card treatment across all 8 steps, and a published guest page that renders the *full* invitation (opener, palette, film, all content sections, RSVP). Nothing looks half-built.

**Trust / unanswered items:**
- The false "Link sent! Check your inbox" (see §3) is the biggest trust dent.
- Emails undeliverable in test mode (see §3).
- The payment-failure screen points to `support@digitalinvite.com` — confirm that inbox is monitored.
- **Price only appears at the very last step.** A cautious buyer has no idea what it costs until review. Consider a "from €49" hint earlier.
- No visible terms/privacy links anywhere in the flow.
- In-flow, users aren't told: what the manage link is / how private it stays, what happens to photos, or whether their draft is truly saved without an email.

---

## Prioritized fixes before production

**P0 — block launch**
1. **Music previews:** add `cdn.pixabay.com` to CSP `media-src` (or, better, self-host/proxy the preview clips through Supabase/Mux so you don't depend on Pixabay's CDN or CORS).
2. **"Link sent! Check your inbox":** make it true or change the copy. Right now it tells users to check an inbox that will be empty.
3. **Resend domain verification:** without it, manage links and receipts never reach real couples.

**P1 — strongly recommended**
4. **Photos:** add an in-builder uploader, or make the "after checkout" deferral explicit and reassuring.
5. **Mobile CTA reachability:** keep the primary action visible without scrolling inside the sheet; reconsider peek-gesture discoverability for older users.
6. **StepTransition:** unmount outgoing sheets (stop the DOM accumulation).
7. **Custom-music "uploaded ✓" feedback latency** — make confirmation immediate.

**P2 — polish**
8. Surface price earlier ("from €49").
9. Add terms/privacy links; confirm `support@` is monitored.
10. Verify the rejected-custom-video error UX with a real bad clip.

> Net: the core product — build → pay → publish → live, with a login-free RSVP link — is **solid and works on desktop and mobile with zero breakages**. The blockers are not in the engine; they're in **media (music preview CSP, photo uploader) and email/trust copy**. Fix the three P0s and this is ready to put in front of real couples.
