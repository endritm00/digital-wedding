# Digital Invite — Claude Context

## What This Is

A self-serve **digital wedding invitation builder**. Couples create, customize, and publish HD video-backed invitations. Guests view them at `/invite/[id]` and RSVP. Couples manage RSVPs at `/manage/[token]`.

**Stack:** Next.js 15 App Router · Supabase (Postgres + Storage + Auth) · Stripe (EUR, dynamic line items) · Mux (video) · Resend (email) · Upstash Redis (rate limiting) · Vercel (deploy)

---

## Architecture

### Two planes
- **Builder** (`/builder/[inviteId]/*`) — authenticated creator flow, 6 steps: Names → Film → Style → Save → Sections → Details → Review. Server-persisted, debounce-saved.
- **Guest** (`/invite/[id]`) — public read-only snapshot served from `published_snapshots` table. Separate from the live draft.

### Key concepts
- **Draft** — `invites` row + `invite_sections` rows. Only owner can edit.
- **Snapshot** — immutable copy written on publish (`published_snapshots`). Guest page reads this, not the live draft.
- **Opening config** — stored in the `opening` section's config JSONB. `video_preset`, `video_asset_id`, `hero_layout`, `opener`, `palette`, `heading_font`. The server merges patches (never wholesale-replaces) to prevent data loss.
- **Quote** — server-computed price. Lives in `BuilderStatusContext`, not `BuilderContext`. Refreshed after media/section changes.

### State management
- `BuilderContext` (`components/builder/builder-provider.tsx`) — invite data, sections, media assets, setters
- `BuilderStatusContext` — save state, quote. Separated to avoid re-renders.
- `I18nContext` (`lib/i18n/context.tsx`) — locale + translations, localStorage-persisted, builder-scoped only

---

## Directory Map

```
app/
  page.tsx                     — Home page (has SiteNav + SiteFooter)
  not-found.tsx                — Branded 404
  error.tsx                    — Branded error boundary
  global-error.tsx             — Root-level error boundary
  layout.tsx                   — Root layout, metadata, fonts
  globals.css                  — Tailwind base + custom CSS
  builder/
    page.tsx                   — Creates draft, redirects to /names
    layout.tsx                 — Builder layout with I18nProvider + BuilderProvider
    [inviteId]/
      names/page.tsx           — Step 0: names + date + language picker
      opening-video/page.tsx   — Step 1: film preset or custom upload
      style/page.tsx           — Step 2: palette + hero layout + lettering
      save/page.tsx            — Step 3: email save
      sections/page.tsx        — Step 4: section toggle
      details/page.tsx         — Step 5: per-section content
      review/page.tsx          — Step 6: preview + pay + publish
  invite/
    [id]/
      page.tsx                 — Guest invite view (has generateMetadata)
      loading.tsx              — Loading spinner
      preview/page.tsx         — Creator-only preview (skipOpener=1)
      success/page.tsx         — Post-payment confirmation
  manage/[token]/              — Couple's RSVP management (noindex)
  themes/
    page.tsx                   — Gallery (has SiteNav + SiteFooter)
    [slug]/page.tsx            — Template detail page
  api/
    invites/[id]/              — CRUD, checkout, media, sections, publish
    webhooks/stripe/route.ts   — Stripe checkout.session.completed handler
    webhooks/mux/route.ts      — Mux asset.ready handler

components/
  builder/
    builder-provider.tsx       — BuilderContext + BuilderStatusContext
    step-sheet.tsx             — Mobile bottom sheet / desktop side panel
    hairline.tsx               — Progress bar + step nav
    invite-preview.tsx         — Live preview behind the sheet
    total-pill.tsx             — Price pill (desktop-only, hidden mobile)
  invite/
    invitation-view.tsx        — The actual invitation UI (guest + preview)
    openers/video-envelope.tsx — Envelope opener animation
    hero-card.tsx              — Glass card hero variant
  marketing/
    site-nav.tsx               — Sticky nav for home + themes pages
    site-footer.tsx            — Footer for home + themes pages
  home/                        — Home page sections

lib/
  i18n/
    en.ts                      — Source of truth translations (Translations type derived here)
    de.ts, fr.ts, it.ts, tr.ts, sq.ts, ar.ts — Other locales
    context.tsx                — I18nProvider + useTranslation()
  builder/api.ts               — Client API helpers
  builder/presets.ts           — VIDEO_PRESETS, PALETTES, HEADING_FONTS, HERO_LAYOUTS
  invite/envelope-video.ts     — Mux playback IDs for envelope opener
  mux/index.ts                 — Mux client + capped-1080p URL helper
  email.ts                     — Resend + manage-link email
  rate-limit.ts                — Upstash/in-memory rate limiting
  publish/cdn-purge.ts         — Cloudflare cache invalidation
  supabase/
    client.ts                  — Browser Supabase client
    server.ts                  — Server Supabase client (uses cookies)
    service.ts                 — Service-role client (bypasses RLS, server-only)
```

---

## i18n System

Builder-only. No URL routing — locale stored in `localStorage` at key `di:locale`.

- **Add a language**: create `lib/i18n/xx.ts` implementing `Translations`, import it in `lib/i18n/context.tsx`, add to `LOCALES` map and `Locale` type, add to the options array in `app/builder/[inviteId]/names/page.tsx`.
- All translation keys are typed — TypeScript will error if a new key in `en.ts` is missing from another locale.
- Language picker: flag dropdown next to "Who's getting married?" title. Uses `flag-icons` npm package (CSS classes `fi fi-xx`).

---

## Video Pipeline

### Preset films
- Stored in Supabase `preset-media` bucket at `presets/<id>/film.mp4`
- 1080p CRF23 re-encoded for quality. Single MP4 (not adaptive streaming).
- Displayed via `<video>` tag with imperative `muted` + `playsinline` setting before every `play()` call (fixes iOS autoplay).
- On Apple devices: native HLS if `.m3u8` exists, otherwise falls back to MP4.

### Custom videos (Mux)
- Upload → Mux Direct Upload → poll reconcile OR Mux webhook (`video.asset.ready`)
- Served at `https://stream.mux.com/{playbackId}/capped-1080p.mp4` (NOT `/high.mp4`)
- `MUX_WEBHOOK_SECRET` must be set for webhooks to work in production

### Envelope opener
- Two Mux videos per theme: desktop + mobile cuts
- Plays on first visit to `/invite/[id]`, then tap reveals the invite
- Playback IDs hardcoded in `lib/invite/envelope-video.ts`

---

## Builder Step Sheet (mobile)

`components/builder/step-sheet.tsx` — critical component.

- Mobile: bottom sheet, max 64dvh, draggable via `dragControls`
- Arrow button (steps 1+2 only): click toggles peek; drag drags the sheet down/up
- No separate drag handle — arrow IS the drag handle on steps 1+2; bar handle on other steps
- `peekOffset` = sheet height - 64px (PEEK_VISIBLE). Measured on mount + resize.
- Entrance animation fires ONCE per session (module-level `sheetHasEntered` flag)

---

## Known Disabled Features

- **Music step** — `app/builder/[inviteId]/music/page.tsx` redirects to `/save`. Background audio removed. Reason: CSP blocked Pixabay URLs + `Audio()` preload tax.
- **RSVP email/dietary fields** — accepted by form but stored as null (KMS phase not implemented)
- **AWS KMS** — columns exist in DB but app code doesn't use them

---

## Design Tokens

| Token | Value | Use |
|---|---|---|
| Paper | `#FDFCF9` / `#F3EFE7` | Backgrounds |
| Ink | `#1A1816` | Primary text |
| Gold | `#A8854B` | Accents, CTAs, borders |
| Font serif | `font-cormorant` (Cormorant Garamond) | Headings, names |
| Font sans | `font-inter` (Inter) | Body, labels |

Button primary: `rounded-full bg-[#A8854B] text-white px-6 py-3`
Button secondary: `rounded-full border border-[#A8854B] text-[#A8854B] px-6 py-3`

---

## Common Gotchas

1. **Opening config data loss** — Always use server-side merge for opening section. Never wholesale-replace. See `lib/invites/merge-opening-config.ts`.
2. **Mux MP4 URL** — Use `/capped-1080p.mp4` NOT `/high.mp4`. Helper in `lib/mux/index.ts`.
3. **Video autoplay on iOS** — Must set `video.muted = true` and `video.setAttribute('playsinline', '')` imperatively before every `play()` call. React's `muted` prop doesn't set the DOM property.
4. **Stripe webhook in App Router** — The old `export const config = { api: { bodyParser: false } }` pattern does nothing. The route correctly reads raw body via `await request.text()`.
5. **Quote refresh** — Quote is server-computed. After changing sections/media, call `refreshQuote()` with a ~1s delay (server needs time to persist).
6. **`supabase.auth.getUser()` vs `getSession()`** — Always use `getUser()` on the server for auth checks (validates JWT against Supabase). `getSession()` returns cached data and is not secure for server-side auth.
7. **CSP** — `unsafe-eval` is dev-only (Turbopack). Production CSP in `next.config.ts` is conditional on `NODE_ENV`.

---

## OPS

See [OPS-RUNBOOK.md](./OPS-RUNBOOK.md) for full go-live instructions: secret rotation, service setup, migrations, deployment, verification checklist.
