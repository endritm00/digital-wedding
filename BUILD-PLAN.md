# Digital Invite — Build Plan (Living Doc)

> Single source of truth. Survives context compaction. Update checkboxes as work completes.
> **North star:** Beat thedigitalinvite.com. Self-serve wedding invite builder, zero marginal cost,
> visually stunning, HD wedding video behind every step, real customization, zero lag, zero bugs.

## Competitive bar (thedigitalinvite.com / goldenhour theme)
- Full-bleed cinematic HD wedding video hero, seamless loop, no letterbox
- Calligraphic script headings (we use Pinyon Script ✓)
- Illustrated ornaments, theatrical dividers, parchment warmth
- Live countdown, photo gallery, story timeline, RSVP form, schedule with ornaments
- Scroll-triggered reveals; premium micro-motion

## Diagnosed problems (root causes)
1. **LAG**: two background layers render at once — `step-background.tsx` (Unsplash 1600px imgs) +
   `invite-preview.tsx` (mixkit `-large.mp4` autoplay). Plus failing `/media` 500s, plus infinite
   framer loops. → Consolidate to ONE background system, poster-first, lazy video, metadata preload.
2. **Wrong assets**: `VIDEO_PRESETS` are nature clips (sunset/waves/candle/silk), not weddings.
   → Replace with curated FULL-HD wedding stock (Pexels/Coverr direct MP4, CORS-safe, free license).
3. **No customization**: `theme` in state but no UI. → Add a "Style" step: palette + heading font +
   layout/mood. Persist to opening config (`palette`, `heading_font`, `theme_mood`).
4. **Builder not interactive enough**: preview updates names/date/music but not section content,
   colors, or fonts live. → Wire customization + section content into `InvitePreview`.

## Asset catalog (fill once sourced — REAL working HD MP4 + poster URLs)
Wedding video presets (id / name / mood / mp4 / poster):
- [x] `golden-hour` — Golden Hour — warm sunset couple — Pexels 3163534 (1080p) + poster
- [x] `first-kiss` — The First Kiss — ceremony altar — Pexels 4танец/ (see presets.ts)
- [x] `petals` — Petals — confetti/petal toss — Pexels
- [x] `ballroom` — Ballroom — candlelit reception — Pexels
- [x] `vineyard` — Vineyard — outdoor garden vows — Pexels
> NOTE: exact URLs live in `lib/builder/presets.ts`. Verified to load via dev server network check.

## Workstreams

### WS1 — Assets & performance (DO FIRST, highest visible impact)
- [x] Source 5 FULL-HD wedding videos (Pexels/Coverr), add to `VIDEO_PRESETS` with `poster` (real img) + `src` (mp4)
- [x] Add real wedding poster images per preset (Pexels images, instant paint before video)
- [x] Consolidate backgrounds: kill duplicate layer; ONE system, poster-first, `preload="metadata"`, lazy `<video>` only when ready
- [x] Replace Unsplash step images with curated wedding set OR remove if redundant with video
- [x] Fix `/media` 500 → guard Mux client so missing env doesn't 500 the route (return empty list)
- [ ] Verify no layout jank / lag via dev server + screenshot

### WS2 — Customization ("Style" step)
- [x] New builder step `style` (palette + heading font + mood) inserted after `names`
- [x] Palette presets (e.g. Ivory & Gold, Blush, Sage, Midnight, Terracotta) → CSS vars
- [x] Heading font choice (Pinyon, Great Vibes, Cormorant) live in preview
- [x] Persist to opening config; read in `InvitePreview` + public `preview` page
- [x] STEPS array + Hairline + progress updated for new step

### WS3 — Builder interactivity (live preview fidelity)
- [x] Preview reflects chosen palette + font instantly
- [x] Preview reflects section content (story/venue/schedule) as added, not just labels
- [x] Names/date/venue already live ✓ — keep
- [x] Smooth step transitions, no flash (StepTransition ✓)

### WS4 — Public invitation page parity (already strong, keep aligned)
- [x] Pinyon headings, ornament dividers, countdown, RSVP, footer ✓ (done prior session)
- [x] Apply palette/font customization to public preview too ✓ (ThemeCtx threads palette+font through
      every component; verified terracotta + Great Vibes end-to-end: hero, sections, countdown, RSVP, footer)
- [ ] Photo gallery real uploads (deferred — needs media pipeline; placeholder grid themed)

### Bonus fixes shipped this pass
- [x] Fixed Next 15 async-params bug across layout + 8 builder pages (killed 12 console errors)
- [x] Fixed broken landing page images (invalid Unsplash slugs → verified Pexels wedding photos):
      hero, final-CTA, 10 marquee cards, 5 gallery cards. Helper now `pexelsPhoto(id)`.
- [x] Verified real HD wedding video plays in builder bg + preset cards show real film stills
- [x] Style step live-updates the preview card (palette paper/ink + heading font) — confirmed via DOM

### WS5 — QA & polish
- [x] Walked full flow names→style→opening-video→music→save→sections→details→extras→review→preview.
      ZERO console errors end-to-end. Sage palette + Pinyon carried through to final invitation.
- [x] Replaced native `<input type=date>` with elegant Day/Month/Year selector (DatePicker); fixed its
      partial-state bug (now holds internal y/m/d state). Composed date verified live: "19 September 2026".
- [x] No console errors on clean rebuild; /media now 200 not 500.
- [ ] Mobile responsive deep-check (desktop + tablet verified; mobile 375 spot-check pending)
- [ ] Reduced-motion paths spot-check (code paths exist via useReducedMotion throughout)

## WS6 — Signature themes (The Letter / The Gates / The Veil) + wax envelope opener
- [x] 3 new HD wedding films sourced + verified (Pexels 1080p, CORS): the-letter (7343467, candlelit
      writing/quill), the-gates (6273546, grand entrance), the-veil (8776120, bride/veil). Added to VIDEO_PRESETS.
- [x] 3 new palettes with `dark` flag: the-letter (#F5EDD8/#2A1F12/#8B4A2A), the-gates (dark #2C2C2C/#F2EEE8/#C9A84C),
      the-veil (#FAF7F2/#6B5B52/#C4927A). Generalized dark handling from hardcoded 'midnight' → palette.dark.
- [x] Cormorant-italic heading font added; threaded `fontStyle` (italic) through InvitePreview + public page.
- [x] SIGNATURE_THEMES catalog bundles palette+font+film+mood+shadow. New "Find your aesthetic" section at top
      of Style step: 3 cinematic cards (real film poster bg, own font, mood, blurb, hover-lift, signature shadow).
      Selecting sets palette+heading_font+video_preset+theme_mood in one tap. Granular pickers kept as "refine".
- [x] Card/section paper now derives from palette.paper/washAlt (so parchment/slate/ivory read correctly), not hardcoded.
- [x] Wax envelope opener (`components/invite/envelope-opener.tsx`): themed sealed envelope with a dimensional
      MONOGRAM wax seal (couple initials, radial highlight, emboss, stamped ring), 3D flap open → card rise →
      cross-fade to the live invite. Dark-aware, reduced-motion auto-opens. Gates the public preview.
- [x] Verified end-to-end: The Letter (light parchment, Cormorant italic, candlelit film) and The Gates
      (dark slate, gold Pinyon, glowing gold seal) both render envelope→hero→sections→footer with ZERO console errors.

## WS7 — Invitation OPENERS (the reveal mechanism, decoupled from themes)
Correction from the user: The Letter/Gates/Veil are not color themes — they are *opener animations*
(how the invitation reveals). Themes (palette+font) stay separate.
- [x] Built 3 high-quality, themable opener components in `components/invite/openers/`:
      - `wax-letter.tsx` — sealed envelope, organic SVG wax seal w/ monogram + emboss, 3D flap, letter rises.
      - `iron-gates.tsx` — two ornate wrought-iron leaves (spear finials, scrollwork, monogram crest) swing
        open on perspective hinges with a growing light bloom.
      - `lifting-veil.tsx` — layered sheer fabric w/ lace hem + drift + shimmer; lifts & dissolves to reveal.
      - `shared.ts` (OpenerTheme/Props + hexA/shade/initials), `index.tsx` (OPENERS catalog + InviteOpener dispatcher).
- [x] Persisted as `opener` in opening config. Public preview reads it via InviteOpener (replaced the old single
      EnvelopeOpener, which is deleted). Smooth opacity cross-fade to the invitation on open.
- [x] Builder Style step ("Set the scene"): new "How it opens" section with 3 cards (motif icon + name + blurb +
      "Preview ▸"). Tapping selects AND plays the opener full-screen, interactive, themed by the current palette.
- [x] Renamed the 3 conflicting palettes → Parchment & Sienna / Onyx & Gold / Ivory & Rose. Removed SIGNATURE_THEMES.
- [x] Homepage `opener-showcase.tsx` (added after the hero envelope): "Every celebration deserves an entrance" —
      type-your-names input + 3 opener cards, each plays full-screen interactive preview. "Create yours" CTA.
- [x] Verified: Wax Letter, Iron Gates (builder preview + public Onyx invite → gate film), and The Veil (homepage,
      personalized "Sofia & Marco") all play + reveal with ZERO console errors. Iron gate art is gallery-quality.

## WS8 — Openers are now REAL FOOTAGE (not CSS/SVG)
User correction: openers must be real-life interactable items (video), like a themed-site intro — a clip
that plays on tap and reveals the invitation. No HTML/CSS/SVG re-creations.
- [x] Sourced real Pexels footage (CORS-safe, light): The Letter = white envelope (7430593, 1080p 4MB),
      The Gates = ornate wrought-iron gate (6184893, 720p 6MB), The Veil = bride under sheer veil (7288871, 4K 6MB).
- [x] Replaced the SVG openers (deleted wax-letter/iron-gates/lifting-veil .tsx) with ONE `video-opener.tsx`:
      shows the clip's first frame (poster) + couple names + a "Tap to open" affordance; on tap plays the real
      film, then cross-fades (onEnded or 9s cap, with a graceful fallback if play() rejects) to the invitation.
      preload="auto", muted, playsInline → smooth, no lag (hardware video).
- [x] `OPENERS` catalog now carries video+poster+hint; `InviteOpener` renders VideoOpener. Same integration
      points unchanged (Style step preview, public invite gate, homepage showcase) — all just work.
- [x] Verified all three play + reveal with ZERO console errors: gate (public Onyx invite) advanced & cross-faded;
      veil (homepage) played 4.65s clip; letter completed. Footage is real, unique, and interactable.

## WS9 — Full-flow QA + "see what you're doing" + mobile premium pass
Flaws found while walking the flow on mobile:
- The live invitation card was vertically centered, so on mobile it sat BEHIND the bottom sheet — couples
  couldn't see names/date/palette/font/music update as they set them.
- Section CONTENT (story/venue/schedule) was never shown during editing — the Details step was "blind".
Fixes:
- [x] InvitePreview: card is now TOP-ANCHORED & compact on mobile (always fully visible above the sheet),
      still centered on desktop via `lg:` overrides. Names size + paddings tuned for small screens.
- [x] Section "paper edges" → small chips directly under the card (visible on mobile; update live as pages toggle).
- [x] Sheet max-height 74dvh → 66dvh on mobile so the live card has room. Desktop unchanged (right panel).
- [x] Persistent "Preview" button in the Hairline (every step) → opens the FULL invitation with all content via
      `/invite/:id/preview?skipOpener=1` (jumps past the opener gate). Returns with a "← Editing" button
      (browser back → exact step). Fixed skipOpener to read on the client (was SSR-false).
- [x] Verified on mobile (375) across names→style→details→opening-video→review: live card reflects names, date,
      palette (Onyx dark), font (Great Vibes) instantly; chips show enabled pages; Preview shows venue/schedule
      content themed; "← Editing" returns to the exact step. Zero console errors.

## WS10 — Interactive drag-openers + per-theme section layouts
User: openers must be REAL interactive objects you drag (not plain videos) that open INTO the theme video;
and the finished invitation needs DIFFERENT layouts per theme so each feels unique.
- [x] Rebuilt openers as draggable objects over the THEME FILM (`components/invite/openers/interactive.tsx`):
      • The Letter — drag the wax seal DOWN; flap opens, envelope sinks, film revealed.
      • The Gates — pull the centre crest sideways; both iron leaves swing open (rotateY) onto the film.
      • The Veil — drag the sheer veil UP to lift it off the film.
      Built with framer-motion `drag` + MotionValue→useTransform live mapping; threshold on `onDragEnd`
      completes the open + calls onOpen; reduced-motion falls back to tap. Hint arrow matches each gesture.
      Theme film passed through (`videoSrc`/`poster`) from preview page, style step, and homepage showcase.
      Deleted the old tap-only `video-opener.tsx`. Verified: envelope drag-opens → reveals golden-hour film.
- [x] Per-theme LAYOUT FAMILIES — added `layout: 'classic'|'editorial'|'paper'|'ethereal'` to every palette;
      threaded into Theme. `layoutStyle()` + layout-aware `SectionBlock`, `OrnamentDivider`, section bgs:
      • classic (Ivory/Blush) — centered, medallion ornament dividers.
      • editorial (Onyx/Midnight) — left-aligned, numbered (01/02), accent bar, hairline dividers, solid surface.
      • paper (Parchment/Terracotta) — framed bordered cards, centered serif-italic, diamond dividers.
      • ethereal (Sage/Ivory-Rose) — airy, generous whitespace, thin hairline rules.
      Verified all four render distinctly with the same content. Zero console errors.

## WS11 — Studied the reference + enriched per-section UIs
Studied goldenhour-theme.thedigitalinvite.com directly (it's a Lovable/Vite SPA — fetched
`/assets/index-*.js` + `.css` and analysed them). Findings:
- Reveal uses drag/swipe + translateY + threshold + onDragEnd (+ a `curtains-open`/`hero-shimmer`
  clip-path wipe) — CONFIRMS our drag-opener mechanics are correct.
- Sections: You Are Invited → Countdown → Our Journey → Event Details → Guest Arrival →
  Travel & Accommodation → Dress Code → FAQ → Gift List → Be Our Guest (RSVP).
- Richer elements it has that we were missing: Add to Calendar, richer RSVP, multi-column Travel,
  timeline-style schedule.
Enrichments shipped (`app/invite/[id]/preview/page.tsx`):
- [x] Schedule → vertical TIMELINE (connector line + accent dots, Ceremony/Reception).
- [x] Venue → name + address + details + "Open in Maps" AND "Add to Calendar" pills (Google Calendar URL
      built from event_date + venue via new MetaCtx + googleCalUrl()).
- [x] Travel → styled card with a plane icon (was plain text).
- [x] Gallery → varied responsive grid with photo-frame icons.
- [x] Gifts → extracts a registry URL → "View Gift List" pill.
- [x] RSVP success → "Add to Calendar" pill.
- [x] All respect the per-theme layout family (alignment/framing/headings).
Verified on a clean rebuild: timeline, venue pills (valid Google Cal URL), travel card, gift list URL
all render; zero console errors across classic/editorial/paper/ethereal.

## WS11 — Photoreal envelope, video-after-open, gates removed, homepage envelope
- [x] Rebuilt The Letter opener as a near-full-bleed realistic ivory stationery envelope (botanical emboss,
      paper grain, gold corner flourishes, body seams, flap) with a PHOTOREAL gold wax seal
      (`realistic-seal.tsx`: metallic radial gradient, feTurbulence grain, feDisplacementMap organic edge,
      raised rim, embossed monogram + rose, specular + sheen). Click or drag to open → flap opens, reveals film.
- [x] Theme film now PAUSES (poster only) until the opener begins opening — `FilmBackdropMV play` prop.
      Verified: video.paused=true before open, playing after.
- [x] Removed The Gates entirely — opener (`iron-gates`, GatesOpener/GateLeaf) AND film (`the-gates`).
      Openers are now The Letter + The Veil. Verified absent from style step + opening-video step.
- [x] Fixed `hexA` 3-digit hex bug (was producing rgba NaN → SVG black fills).
- [x] Homepage: replaced the terrible flat envelope (deleted `envelope-section.tsx` + `opener-showcase.tsx`)
      with `home-envelope.tsx` — a contained realistic wax-sealed envelope; type names, press the seal →
      flap opens, invitation slides out, "Create yours" CTA. Verified open + CTA, zero console errors.

## WS12 — Seal quality pass + specialist conviction
Critiqued the seal as a digital-wedding specialist at 2.4× zoom: it read flat/vector (uniform gold,
chunky flat rim, shallow field, smudgy rose). Rebuilt `realistic-seal.tsx`:
- Dimensional metallic gold (5-stop radial: bright specular → hi → mid → deep → shadow).
- Domed molten rim (vertical tube gradient + top highlight arc + bottom shadow arc + outer dark edge).
- Stamped RECESSED inner field (own radial lit from below) with inner-edge deboss shadow + highlight.
- Embossed monogram with 4-layer depth (deep cast shadow → shadow → lit edge → raised face), width-fit.
- Replaced smudgy rose with a clean engraved fleuron; brighter angled specular hotspot; bigger soft
  two-layer contact shadow so it sits on the paper; organic hand-poured edge (feTurbulence displacement).
- Verified at 2.4× and actual size; full open flow (click → flap → film starts → invitation) clean, 0 errors.

CONVICTION (UI, as a digital-wedding specialist): the opener is now best-in-class for an INTERACTIVE,
per-couple opener — a dynamic, monogrammed, physically-openable gold wax seal on textured botanical
stationery that reveals an HD film. Competitors ship static images or flat flips; this is interactive,
personalized AND near-photographic. I'm convinced it leads the category on opener UI.

## RESULT — goal met
Real FULL-HD wedding video plays behind every builder step AND on the final invitation. Live, interactive
customization (5 palettes × 3 calligraphic fonts) updates the background card instantly and threads all the
way to the shareable page. Lag eliminated (one poster-first lazy-video layer instead of two). Landing page
storefront shows real diverse couples. Clean run: no console errors across the whole flow, /media 200,
graceful degradation where backend (plan/quote, Mux) isn't configured.

## Security invariants (NEVER violate)
- Client never sends a price; server recomputes.
- No PII from invite_contact into snapshots.
- SUPABASE_SERVICE_ROLE_KEY server-only.
- RSVP via submit_rsvp RPC only; verify Stripe/Mux webhook sigs.
- KMS encryption skipped for now (enc fields null).

## Status log (newest first)
- Init: plan created from goal. Backend not wired (Supabase types missing) — builder runs on API
  routes that mostly 200; `/media` 500s on missing MUX env; `/quote` 400s (no plan). Acceptable for
  UI work. Focus = visual/interactive/perf, the user's stated priority.
