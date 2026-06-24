# Digital Invite — Production OPS Runbook

Last updated: 2026-06-25

---

## BEFORE ANYTHING ELSE — Rotate Compromised Secrets

`.env.local` was committed to git history. Rotate these **immediately**, before deploying:

| Secret | Where to rotate |
|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase dashboard → Project Settings → API → Regenerate service role key |
| `MUX_TOKEN_ID` + `MUX_TOKEN_SECRET` | Mux dashboard → Settings → API Access Tokens → Delete + New |
| `RESEND_API_KEY` | Resend dashboard → API Keys → Revoke + New |

After rotating, clean git history:
```bash
git filter-repo --path .env.local --invert-paths
# Then force-push — coordinate with anyone who has cloned the repo
```

---

## 1. Environment Variables

Set all of these in **Vercel Project Settings → Environment Variables → Production**.

### Required (app will not work without these)

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project REST endpoint | `https://xxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public JWT for RLS-gated reads | `eyJ...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Service-role JWT — bypasses RLS. Server-only. Never NEXT_PUBLIC_ | `eyJ...` |
| `NEXT_PUBLIC_APP_URL` | Production base URL — Stripe redirects, email links, Mux CORS | `https://yourdomain.com` |
| `STRIPE_SECRET_KEY` | Stripe live secret key | `sk_live_...` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe live publishable key | `pk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | `whsec_...` |
| `MUX_TOKEN_ID` | Mux API token ID | `abc123` |
| `MUX_TOKEN_SECRET` | Mux API token secret | `xyz...` |
| `MUX_WEBHOOK_SECRET` | Mux webhook signing secret | `abc...` |
| `RESEND_API_KEY` | Resend API key | `re_...` |
| `RESEND_FROM` | Verified sender address | `Digital Invite <hello@yourdomain.com>` |

### Strongly recommended

| Variable | Default without it | Description |
|---|---|---|
| `UPSTASH_REDIS_REST_URL` | In-process rate limits (breaks on serverless) | Upstash Redis REST URL |
| `UPSTASH_REDIS_REST_TOKEN` | Same | Upstash Redis auth token |
| `CLOUDFLARE_ZONE_ID` | CDN purge silently skipped | Cloudflare zone for cache invalidation |
| `CLOUDFLARE_API_TOKEN` | CDN purge silently skipped | Cloudflare API token with Cache Purge permission |

---

## 2. Service Setup

### 2a. Supabase

1. Dashboard → **Settings → API** → copy URL, anon key, service role key
2. **Settings → Auth**:
   - Site URL: `https://yourdomain.com`
   - Redirect URLs: add `https://yourdomain.com/**`
   - Enable **Magic Link** (email OTP) sign-in
3. **Storage** — verify these buckets exist after migrations:
   - `invite-media` — private (user uploads)
   - `preset-media` — public (wedding film presets)

### 2b. Stripe

1. Use **Live mode** (not test)
2. Dashboard → **Developers → API keys** → copy live secret + publishable keys
3. **Webhook** — Developers → Webhooks → Add endpoint:
   - URL: `https://yourdomain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `checkout.session.expired`, `payment_intent.payment_failed`
   - Copy **Signing secret** → `STRIPE_WEBHOOK_SECRET`
4. App is hardcoded to **EUR** — ensure Stripe account has EUR enabled
5. No Stripe products/prices to create — line items come from the `plans` DB table

### 2c. Mux

1. Dashboard → **Settings → Access Tokens** → create token with Mux Video read+write
2. Copy Token ID/Secret → `MUX_TOKEN_ID` / `MUX_TOKEN_SECRET`
3. Verify plan supports **static MP4 renditions** (`mp4_support: 'capped-1080p'`)
4. **Webhook** — Settings → Webhooks → Create:
   - URL: `https://yourdomain.com/api/webhooks/mux`
   - Events: `video.upload.asset_created`, `video.asset.ready`, `video.asset.static_renditions.ready`, `video.asset.errored`
   - Copy **Signing secret** → `MUX_WEBHOOK_SECRET`
5. Envelope opener videos already on Mux (playback IDs in `lib/invite/envelope-video.ts`). Re-upload if needed: `node scripts/upload-envelope-videos.mjs`

### 2d. Resend

1. Dashboard → **API Keys → Create** → `RESEND_API_KEY`
2. **Domain verification** (critical — without this, emails only go to your own account):
   - Domains → Add Domain → `yourdomain.com`
   - Add DNS records (DKIM, SPF, DMARC), wait for verification (~1 hour)
   - Set `RESEND_FROM` to `Digital Invite <hello@yourdomain.com>`
3. Only one email is sent: the **RSVP manage link** to the couple on first publish

### 2e. Upstash Redis

1. [upstash.com](https://upstash.com) → Redis → Create Database → **Global** replication
2. Copy REST URL + Token → `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`

### 2f. Cloudflare (optional)

1. Dashboard → your domain → Overview → copy **Zone ID** → `CLOUDFLARE_ZONE_ID`
2. Profile → API Tokens → Create Token → **Cache Purge** template → restrict to your zone → `CLOUDFLARE_API_TOKEN`

---

## 3. Database Migrations

```bash
# Run against production (ensure .env.local points to prod Supabase):
npm run db:migrate
```

### Seed the catalog (required)

After migrations:

**Plans** (checkout fails without these):
```sql
INSERT INTO public.plans (code, name, base_price_cents, included_sections, sort_order, active)
VALUES
  ('save_the_date', 'Save the Date', 1900, 3, 1, true),
  ('experience',    'Experience',    3900, 6, 2, true),
  ('premium',       'Premium',       6900, NULL, 3, true);
```

**Preset media** — upload wedding films to Supabase Storage:
```bash
node scripts/mirror-presets.mjs
```

---

## 4. Deployment (Vercel)

1. Push code to GitHub
2. Vercel → New Project → Import repository
   - Framework: **Next.js** (auto-detected), Root: `/`, Build: `npm run build`
3. Set all env vars (section 1)
4. Set **Function region** to `fra1` (Frankfurt) — closest to Supabase
5. Add custom domain → Settings → Domains
6. Run `npm run db:migrate` before or immediately after first deploy
7. Register Stripe and Mux webhooks with the live domain URL

---

## 5. Post-Deploy Verification Checklist

- [ ] All 10 migrations applied (Supabase → Database → Migrations)
- [ ] `invite-media` and `preset-media` buckets exist with correct access settings
- [ ] Plans table has at least one active row
- [ ] Auth redirect URL matches production domain
- [ ] Stripe webhook registered + test event returns 200
- [ ] `STRIPE_WEBHOOK_SECRET` is the live signing secret (not test)
- [ ] Mux webhook registered + test video upload transitions to `ready`
- [ ] Resend domain verified + test publish sends manage-link email
- [ ] Upstash connected + 4th RSVP from same IP returns 429
- [ ] `/` home page loads with nav and footer
- [ ] `/themes` gallery loads
- [ ] Builder end-to-end: create invite → all 6 steps → checkout → publish → guest page loads → RSVP works
- [ ] 404 page shows for bad URLs (branded, not Next.js default)
- [ ] `NEXT_PUBLIC_APP_URL` is set to production domain (not localhost)

---

## 6. What Is NOT Wired Yet

- **AWS KMS encryption** — columns exist in DB (`email_enc`, etc.) but app code doesn't use them. Leave `AWS_*` vars unset.
- **Music step** — disabled; route redirects to save step
- **RSVP dietary notes / email field** — accepted by form but not persisted
- **Log aggregation** — logs go to Vercel console only

---

## 7. Key Files

| File | Purpose |
|---|---|
| `lib/supabase/service.ts` | Service-role Supabase client (server-only) |
| `lib/stripe/index.ts` | Stripe client |
| `lib/mux/index.ts` | Mux client + URL helpers |
| `lib/email.ts` | Resend + manage-link email template |
| `lib/rate-limit.ts` | Upstash/in-memory rate limiting |
| `lib/publish/cdn-purge.ts` | Cloudflare cache purge |
| `lib/invite/envelope-video.ts` | Mux playback IDs for envelope opener |
| `app/api/webhooks/stripe/route.ts` | Stripe webhook handler |
| `app/api/webhooks/mux/route.ts` | Mux webhook handler |
| `supabase/migrations/` | All 10 DB migrations (0001–0010) |
| `scripts/mirror-presets.mjs` | One-time preset media upload |
