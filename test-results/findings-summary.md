# E2E findings — aggregated

## ✓ [desktop] 01 Linda — cautious minimalist, skips all optionals  (19s, passed)

## ✓ [mobile] 01 Linda — cautious minimalist, skips all optionals  (17s, passed)

## ⚠ [desktop] 02 Sarah — adds pages, back-navigates to change palette  (24s, passed)
- **Frictions:**
  - back navigation landed unexpectedly at http://localhost:3000/builder/266df115-5209-45d9-abf4-db2810e9239f/save

## ⚠ [mobile] 02 Sarah — adds pages, back-navigates to change palette  (21s, passed)
- **Frictions:**
  - back navigation landed unexpectedly at http://localhost:3000/builder/2ec20c15-e83f-4ceb-a568-b705269ce533/save

## ✓ [desktop] 03 Maria — uploads video then switches to a free preset  (19s, passed)

## ✓ [mobile] 03 Maria — uploads video then switches to a free preset  (18s, passed)

## ✓ [desktop] 04 Jen — wanders, browser-back, refreshes mid-flow  (39s, failed)

## ✓ [mobile] 04 Jen — wanders, browser-back, refreshes mid-flow  (38s, failed)

## ✓ [desktop] 05 Emma — complete flow + real test-card payment  (32s, passed)

## ✓ [mobile] 05 Emma — complete flow + real test-card payment  (7s, failed)

## ✓ [desktop] 06 Rachel — skips date, hits email gate at checkout, pays  (36s, passed)
- **App console errors:**
  - Unable to download payment manifest "https://pay.google.com/gp/p/payment_method_manifest.json".
  - Unable to download payment manifest "https://pay.google.com/gp/p/payment_method_manifest.json".
  - Unable to download payment manifest "https://pay.google.com/gp/p/payment_method_manifest.json".
  - Unable to download payment manifest "https://pay.google.com/gp/p/payment_method_manifest.json".

## ✓ [mobile] 06 Rachel — skips date, hits email gate at checkout, pays  (27s, passed)

## ⚠ [desktop] 07 Nicole — previews + uploads music, explores Photos page  (47s, passed)
- **Frictions:**
  - custom music upload: no confirmation within 25s
- **App console errors:**
  - Loading media from  'https://cdn.pixabay.com/audio/2021/11/25/audio_91b32e02f9.mp3' violates the following Content Security Policy directive: "media-src 'self' blob: https://stream.mux.com https://*.supabase.co https://*.supabase.in". The action has been blocked.

## ✓ [mobile] 07 Nicole — previews + uploads music, explores Photos page  (6s, failed)

## ✓ [desktop] 08 Beth — mobile bottom-sheet & peek gesture  (15s, passed)

## ✓ [mobile] 08 Beth — mobile bottom-sheet & peek gesture  (46s, failed)
- **App console errors:**
  - Failed to load resource: the server responded with a status of 429 (Too Many Requests)

## ⚠ [desktop] 09 Karen — edits names mid-flow, uses Preview  (20s, passed)
- **Frictions:**
  - no obvious "Preview" affordance on the review step

## ✓ [mobile] 09 Karen — edits names mid-flow, uses Preview  (46s, failed)
- **App console errors:**
  - Failed to load resource: the server responded with a status of 429 (Too Many Requests)

## ✓ [desktop] 10 Amy — pays, opens published guest page + manage link  (34s, passed)
- **App console errors:**
  - Loading media from  'https://cdn.pixabay.com/audio/2022/08/02/audio_884fe92c21.mp3' violates the following Content Security Policy directive: "media-src 'self' blob: https://stream.mux.com https://*.supabase.co https://*.supabase.in". The action has been blocked.

## ✓ [mobile] 10 Amy — pays, opens published guest page + manage link  (46s, failed)
- **App console errors:**
  - Failed to load resource: the server responded with a status of 429 (Too Many Requests)


# Totals across all runs
- breakages: 0
- frictions: 4
- pageErrors: 0
- consoleErrors: 9
- serverErrors: 0
- failedRequests: 0
