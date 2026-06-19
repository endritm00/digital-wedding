# Digital Invite — Consolidated Review Backlog
**Date:** 2026-06-18
**Sources:** UI/UX Reviewer (38 findings) · Functionality/QA Reviewer (12 findings)

---

## Cross-Cutting Themes

1. **Post-payment / publish / auth gap is the single biggest launch risk.** The entire flow from "Pay & publish" through to a live, shareable guest page is broken: no publish call is made, anonymous users are locked out mid-funnel, and the manage URL is never surfaced. Nothing works end-to-end.
2. **Ops/env dependencies that silently degrade in production.** Three infrastructure dependencies fail silently when unconfigured: Resend domain (manage link lost), Upstash (rate-limit resets per cold start), Cloudflare (guests see stale CDN content for 24h). Must be configured before launch.
3. **Accessibility is not an afterthought — it's a legal risk.** Skip-nav, missing labels, and missing ARIA attributes are WCAG failures on the guest-facing page, which is a public invitation to all attendees.
4. **Several dead/stub endpoints exist in production code** that either silently drop data (RSVP stub) or return misleading success responses.

---

## MUST-HAVE (Blocks launch, breaks core flow, security, a11y blocker, or data loss)

### Cluster A — Pay → Publish → Live flow (broken end-to-end)
> Raised by: Func #1, Func #2, UI #15, UI #16

**A1 — No publish call after payment; guest page 404s**
- **Severity:** BLOCKER
- **Surface/Files:** `app/invite/[id]/success/page.tsx`, `app/api/invites/[id]/checkout/route.ts`, `POST /api/invites/:id/publish`
- **Why it matters:** `POST /api/invites/:id/publish` exists but is never called. Stripe webhook leaves invite at `status='paid'`; guest page only serves `status='published'`. "View your invitation" 404s for every couple immediately after purchase.
- **Fix:** After `verify-payment` confirms `paid`, call `POST /api/invites/:id/publish`. Alternatively add an explicit publish step on the success page.

**A2 — No auth/login UI; anonymous users locked out at checkout and after payment**
- **Severity:** BLOCKER
- **Surface/Files:** `app/builder/[inviteId]/review/page.tsx`, `lib/invites/access.ts`, `resolveInviteAccess`
- **Why it matters:** Checkout requires a Supabase auth session. There is no magic-link or login UI anywhere. Anonymous draft (claim_token) users hit `{"error":"unauthorized"}` at Pay & publish. After webhook flips status to `paid`, `resolveInviteAccess` limits claim_token to `draft` only, so the anon user is 403'd on all builder APIs and cannot claim post-payment.
- **Fix:** Gate checkout behind a magic-link auth step. Claim the draft to the authenticated user before initiating Stripe checkout.

**A3 — Stripe cancel_url 404s**
- **Severity:** BLOCKER
- **Surface/Files:** `app/api/invites/[id]/checkout/route.ts` ~line 109
- **Why it matters:** `cancel_url` points to `/invite/${id}/build` which doesn't exist. Every cancelled payment drops the user onto a 404.
- **Fix:** Change to `/builder/${id}/review`.

**A4 — "Pay & publish" shows broken loading state; no edit links from review**
- **Severity:** Major
- **Surface/Files:** `app/builder/[inviteId]/review/page.tsx`
- **Why it matters:** Ghost-disabled button while quote loads looks broken with no loading indicator (UI #15). Review summary has no edit links back to steps (UI #16), so users who spot a mistake at review have no recovery path.
- **Fix:** Show a spinner/skeleton while quote loads. Add edit-step links alongside each summary row.

---

### Cluster B — Manage link & guest URL never surfaced
> Raised by: Func #10, UI #25, UI #29

**B1 — manage_url never shown in UI; couple can't reach their RSVP dashboard**
- **Severity:** BLOCKER (if Resend domain unverified) / Major (even when email works)
- **Surface/Files:** `app/invite/[id]/success/page.tsx`, publish API response (contains `manage_url`), Resend sender domain config
- **Why it matters:** `manage_url` is returned in the publish JSON but never displayed. If Resend domain is unverified, the manage link email goes only to the Resend account owner. The couple has no path to their RSVP data.
- **Fix:** Display `manage_url` prominently on the success page. Add a visible "View your invitation" guest link. Verify Resend sender domain before launch.

**B2 — Manage page shows no guest invitation link and no event status/date**
- **Severity:** Major
- **Surface/Files:** Manage page component
- **Why it matters:** "Copy guest link" is blind (no URL shown). No event date or "Live at [url]" status — couple can't confirm their invitation is actually live (UI #25, #29).
- **Fix:** Show the full guest URL as a clickable link with a "View invite" button. Show event date and live status badge.

---

### Cluster C — RSVP stub silently drops data
> Raised by: Func #3

**C1 — `POST /api/invites/:id/rsvp` is a non-persisting stub**
- **Severity:** BLOCKER (data loss)
- **Surface/Files:** `app/api/invites/[id]/rsvp/route.ts`
- **Why it matters:** Endpoint does `console.log`, returns `{success:true}`, uses a different schema than the real endpoint. Any guest hitting this path loses their RSVP silently. Real endpoint is `/api/snapshots/:slug/rsvp`.
- **Fix:** Delete the stub route or return `501 Not Implemented` immediately.

---

### Cluster D — Save step sends no recovery email
> Raised by: Func #4

**D1 — Save step promises a recovery email that is never sent**
- **Severity:** Major
- **Surface/Files:** Save/draft step UI copy, draft recovery endpoint (missing)
- **Why it matters:** UI copy says "we'll send you a private link" but only `PATCH draft_email` is called. No email is sent. Couples who close the tab lose their draft.
- **Fix:** Either implement the recovery email endpoint (send via Resend) or change copy to "we'll save your progress — return to this link to continue."

---

### Cluster E — Accessibility blockers (WCAG, guest-facing)
> Raised by: UI #21, UI #22, UI #37

**E1 — No skip-navigation link anywhere**
- **Severity:** Major (WCAG 2.4.1)
- **Surface/Files:** `app/layout.tsx`
- **Fix:** Add `<a href="#main-content" class="sr-only focus:not-sr-only">Skip to content</a>` as first element in layout.

**E2 — RSVP name input has no `<label>` (placeholder only)**
- **Severity:** Major (WCAG 1.3.1)
- **Surface/Files:** `components/invitation-view.tsx` ~line 254
- **Fix:** Add a visually hidden `<label htmlFor="rsvp-name">Your name</label>`.

**E3 — Attendance buttons lack `aria-pressed`**
- **Severity:** Major (WCAG 4.1.2)
- **Surface/Files:** RSVP attendance toggle buttons in `invitation-view.tsx`
- **Fix:** Add `aria-pressed={selected}` to each toggle button.

---

### Cluster F — Security / data integrity risks
> Raised by: Func #8, Func #2

**F1 — verify-payment IDOR: any authenticated user can read another invite's order status/amount**
- **Severity:** Major (security)
- **Surface/Files:** `app/api/invites/[id]/verify-payment/route.ts` (uses service client, no ownership check)
- **Why it matters:** Authenticated-but-not-owner can poll another invite's payment status and order amount.
- **Fix:** Add `owner_id = auth.uid()` check, or switch to an RLS client so Row Level Security enforces ownership automatically.

---

### Cluster G — Builder preview unreachable mid-flow
> Raised by: UI #6, UI #17

**G1 — Preview button only visible on style step; later steps can't preview**
- **Severity:** Major
- **Surface/Files:** `app/builder/[inviteId]/_components/hairline.tsx` ~line 96
- **Fix:** Show the preview button on all steps from style through review.

**G2 — Draft bar (56px) overlaps hero content in creator preview**
- **Severity:** Major
- **Surface/Files:** `app/builder/[inviteId]/preview/page.tsx`, `OpeningHero` component
- **Fix:** Add `pt-14` (or equivalent) to `OpeningHero` top padding when rendered inside the preview with the draft bar active.

---

### Cluster H — Sections step performance (seeded complaint)
> Raised by: UI (MAJOR, seeded)

**H1 — Section toggle 300–800ms lag; no optimistic UI**
- **Severity:** Major (UX, seeded critical path)
- **Surface/Files:** `app/builder/[inviteId]/sections/page.tsx` (`handleToggle`), `components/builder-provider.tsx` ~lines 208–224
- **Why it matters:** `handleToggle` awaits the full API round-trip before updating local state. Perceived as broken on any connection above ~50ms.
- **Fix:** Apply optimistic `setSections` before `await addContentSection/removeContentSection`; rollback on failure. Remove per-item busy lock; gate Framer stagger animation after first mount only.

---

## NICE-TO-HAVE (Polish, copy, minor UX, micro-perf)

Listed highest-impact first within this category.

| # | Title | Severity | Surface / Files | Why it matters | Fix |
|---|-------|----------|-----------------|----------------|-----|
| N1 | In-memory rate-limit resets per cold start (Upstash not configured) | Risk/Minor | Rate-limit middleware | Multiplies allowed requests per instance restart in prod | Configure Upstash before launch |
| N2 | CDN stale content up to 24h if Cloudflare creds not set | Risk/Minor | `/api/snapshots` CDN headers, Cloudflare env vars | Guests see old snapshot after re-publish | Configure Cloudflare creds in prod |
| N3 | `/api/manage/:token/export` has no rate limiting | Minor | `app/api/manage/[token]/export/route.ts` | Unlike parent GET, export is unprotected from scraping | Add `limiters.draft` |
| N4 | `sections/reorder` RPC fails for anonymous drafts | Minor (latent) | Supabase RPC, `auth.uid()` | Breaks when reorder UI ships; service-role call gets NULL uid | Fix RPC to handle service-role / claim_token ownership |
| N5 | Dead Pages-Router `export const config` in App-Router Stripe webhook | Minor | `app/api/stripe-webhook/route.ts` | Ignored but misleading; will confuse future devs | Remove the export |
| N6 | "Receipt sent to your email" shown even if email was skipped | Minor | `app/invite/[id]/success/page.tsx` | False information damages trust | Conditionally render on `draft_email` presence |
| N7 | Failed-payment "contact support" has no email or link | Minor | Success/failure page | Dead end for users with payment problems | Add support email or link |
| N8 | Guest page `<title>` not personalized | Minor | Guest page — add `generateMetadata()` | Generic title hurts sharing previews and SEO | Add `generateMetadata()` with `display_title` |
| N9 | RSVP message textarea has no `maxLength` | Minor | `invitation-view.tsx` | Unbound input; also no counter UX | Add `maxLength={500}` + character counter |
| N10 | Preview button copies private draft URL with no qualifier | Minor | `app/builder/[inviteId]/preview/page.tsx` ~line 49 | Couple might share a broken preview link to guests | Label it "draft preview link" or show warning |
| N11 | "Regenerate link" uses `window.confirm()` | Minor | Manage page | Inconsistent with premium aesthetic | Inline confirmation pattern |
| N12 | Manage page action buttons 41px touch target (<44px) | Minor | Manage page buttons | Below WCAG 2.5.5 minimum | Set `py-3` / min-height 44px |
| N13 | "Coming" vs "Total guests" RSVP count labels confusing | Minor | Manage page RSVP stats | Ambiguous for couples managing attendance | Relabel: "Attending" / "Total guests invited" |
| N14 | `AccordionItem` animates height `0→auto` (layout thrash) | Minor | `app/builder/[inviteId]/details/page.tsx` ~lines 374–381 | Not GPU-accelerated; ~300ms jank | Use `grid-template-rows: 0fr → 1fr` |
| N15 | `StepTransition` always slides forward even when navigating back | Minor | Step transition component | Disorienting on back navigation | Detect direction and reverse the animation |
| N16 | `StepSheet` re-mounts per step (key=pathname) causing double entrance animation | Minor | `app/builder/[inviteId]/_components/builder-shell.tsx` | Redundant animation on every step change | Lift to persistent wrapper; animate only content |
| N17 | `Skeleton` max-h `74dvh` vs real sheet `64dvh` → height jump | Minor | `builder-shell.tsx` line 11 vs `step-sheet.tsx` line 147 | Layout shift on load | Unify to same value |
| N18 | Film preset cards show portrait 3:4 crop on landscape videos | Minor | Opening video step, film preset card components | Misrepresents the film content | Use 16:10 or 4:3 aspect ratio |
| N19 | Opener preview overlay has no Escape-to-close | Minor | `app/builder/[inviteId]/style/page.tsx` ~line 191 | Keyboard trap for keyboard-only users | Add `onKeyDown` Escape handler |
| N20 | Palette swatches are 10px bars, hard to distinguish similar palettes | Minor | Style step palette selector | Poor differentiation on mobile | Increase swatch size; show palette name on selection |
| N21 | `TotalPill` overlaps step name on mobile | Minor | `hairline.tsx` | Covers content; confusing | Align `TotalPill` to right on mobile |
| N22 | Hero section 9px horizontal overflow despite `overflow-hidden` (perspective bleed) | Minor | `hero-section.tsx` (homepage) | Horizontal scrollbar on mobile | Use `overflow-x: clip` or shrink envelope |
| N23 | "See the films →" CTA 33px touch target on mobile | Minor | `hero-section.tsx` ~line 146 | Below minimum touch target | Add horizontal padding |
| N24 | Film selector chips no scroll affordance on mobile | Minor | `opening-film-section.tsx` | Hidden content with no swipe hint | Add edge fade / scroll indicator |
| N25 | Confetti gold-on-cream low contrast on success page | Polish | Success page confetti component | Barely visible | Vary confetti colors |
| N26 | Past-date countdown disappears silently on guest page | Polish | Guest page countdown component | Feels broken after event date | Show "Thank you for celebrating with us" |
| N27 | Date picker caret data-URI with unescaped angle brackets | Minor | Names step date picker | Fragile under strict CSP | Escape or replace with SVG mask |
| N28 | "Second person" label on names step is cold in tone | Polish | Names step UI copy | Minor copy tone issue | Soften label wording |
| N29 | `OpeningHero` `px-9` on 375px leaves ~255px text width; long names wrap hard | Minor | `invitation-view.tsx` or `OpeningHero` component | Names can wrap to 3+ lines on mobile | Use `px-6` on mobile |
| N30 | Scroll cue ignores `safe-area-inset-bottom` | Minor | Scroll cue component | Clipped on notched iPhones | Use `env(safe-area-inset-bottom)` |
| N31 | Hero gold frame hidden on mobile | Polish | Hero section (homepage) | Minor visual gap | Show on mobile or remove intentionally |
| N32 | Trust bar copy ("2,400+ couples / 14 countries") is placeholder | Minor | `hero-section.tsx` | Unverified social proof looks inauthentic | Replace with real data or remove |
| N33 | Confirm `viewport-fit=cover` in viewport meta | Minor | `app/layout.tsx` viewport meta | Required for safe-area insets to work | Verify tag is present |

---

## Summary Counts

| Category | Count |
|----------|-------|
| MUST-HAVE (blockers / major) | 16 items across 8 clusters |
| NICE-TO-HAVE | 33 items |
| **Total** | **49 items** |

**Immediate launch gates (do these first):**
1. A1 — call publish after payment
2. A2 — add magic-link auth before checkout
3. A3 — fix Stripe cancel_url
4. B1 — surface manage_url + verify Resend domain
5. C1 — delete or 501 the RSVP stub
6. Configure Upstash + Cloudflare in production
