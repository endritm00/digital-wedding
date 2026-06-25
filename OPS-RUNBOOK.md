# Belle Nuit — Go-Live Runbook

Last updated: 2026-06-25

---

## ⚠️ First: Rotate Compromised Secrets

`.env.local` was committed to git history. Do this **before** deploying:

| Secret | Where |
|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → Regenerate service role key |
| `MUX_TOKEN_ID` + `MUX_TOKEN_SECRET` | Mux → Settings → API Access Tokens → Delete + New |
| `RESEND_API_KEY` | Resend → API Keys → Revoke + New |

Then clean history:
```bash
git filter-repo --path .env.local --invert-paths
# force-push after
```

---

## 1. Vercel Environment Variables

**Required** (app breaks without these):

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `NEXT_PUBLIC_APP_URL` | `https://yourdomain.com` |
| `STRIPE_SECRET_KEY` | `sk_live_...` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` (from Stripe webhook setup) |
| `MUX_TOKEN_ID` | Mux API token ID |
| `MUX_TOKEN_SECRET` | Mux API token secret |
| `MUX_WEBHOOK_SECRET` | Mux webhook signing secret |
| `RESEND_API_KEY` | `re_...` |
| `RESEND_FROM` | `Belle Nuit <hello@yourdomain.com>` |
| `CRON_SECRET` | ✅ Already set |

**Recommended** (fallback to in-memory without these — breaks on serverless scale):

| Variable | Get from |
|---|---|
| `UPSTASH_REDIS_REST_URL` | upstash.com → Redis → your DB |
| `UPSTASH_REDIS_REST_TOKEN` | Same |
| `CLOUDFLARE_ZONE_ID` | Cloudflare → your domain → Overview |
| `CLOUDFLARE_API_TOKEN` | Cloudflare → API Tokens → Cache Purge template |

---

## 2. Service Setup (one-time)

**Supabase**
- Settings → Auth: set Site URL + Redirect URL to your domain, enable Magic Link
- Verify buckets exist after migrations: `invite-media` (private), `preset-media` (public)

**Stripe**
- Use Live mode, not test
- Webhooks → Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
  - Events: `checkout.session.completed`, `checkout.session.expired`, `payment_intent.payment_failed`
  - Copy Signing Secret → `STRIPE_WEBHOOK_SECRET`
- Currency: EUR (must be enabled on your Stripe account)

**Mux**
- Settings → Access Tokens → create with Video read+write → `MUX_TOKEN_ID` / `MUX_TOKEN_SECRET`
- Verify plan supports `mp4_support: capped-1080p`
- Webhooks → Create: `https://yourdomain.com/api/webhooks/mux`
  - Events: `video.upload.asset_created`, `video.asset.ready`, `video.asset.static_renditions.ready`, `video.asset.errored`

**Resend**
- Domains → Add Domain → add DKIM/SPF/DMARC records → wait for verification (~1h)
- Set `RESEND_FROM` to a verified address on that domain

**Upstash**
- Redis → Create Database → Global replication → copy REST URL + Token

---

## 3. Database

```bash
# Run all migrations against production Supabase
npm run db:migrate
```

Then seed the plans table (checkout won't work without this):
```sql
INSERT INTO public.plans (code, name, base_price_cents, included_sections, sort_order, active) VALUES
  ('save_the_date', 'Save the Date', 1900, 3, 1, true),
  ('experience',    'Experience',    3900, 6, 2, true),
  ('premium',       'Premium',       6900, NULL, 3, true);
```

Upload preset wedding films to Supabase Storage:
```bash
node scripts/mirror-presets.mjs
```

---

## 4. Deploy

1. Push to GitHub → Vercel auto-deploys
2. Vercel → Project Settings → Functions → Region: `fra1` (Frankfurt, closest to Supabase)
3. Add custom domain → Settings → Domains
4. Register Stripe + Mux webhooks with the live domain

---

## 5. Go-Live Checklist

- [ ] All 11 migrations applied (Supabase → Database → Migrations tab)
- [ ] `invite-media` and `preset-media` buckets exist
- [ ] Plans table seeded (at least one active row)
- [ ] Supabase Auth redirect URL = production domain
- [ ] `NEXT_PUBLIC_APP_URL` = production domain (not localhost)
- [ ] Stripe webhook registered → send test event → 200 response
- [ ] `STRIPE_WEBHOOK_SECRET` is live signing secret (not test)
- [ ] Mux webhook registered → test upload transitions to `ready`
- [ ] Resend domain verified → publish an invite → manage-link email arrives
- [ ] Upstash connected → 4th RSVP from same IP returns 429
- [ ] Abandon-reminder cron: trigger `GET /api/cron/abandon-reminder` manually → `{ sent: 0, failed: 0, total: 0 }`
- [ ] Home, /themes, builder end-to-end (all 6 steps), checkout, publish, guest page, RSVP all work
- [ ] 404 page shows branded page (not Next.js default)
- [ ] Set Vercel Spend Management hard cap + budget alert (Dashboard → Billing)

---

## 6. Post-Launch Maintenance

**Draft cleanup** — drafts currently live forever. Once you have real traffic, add a monthly cleanup for old unconverted drafts:
```sql
-- Suggested: delete drafts older than 90 days with no email saved
DELETE FROM invites
WHERE status = 'draft'
  AND draft_email IS NULL
  AND created_at < NOW() - INTERVAL '90 days';

-- And drafts older than 180 days regardless (they won't convert)
DELETE FROM invites
WHERE status = 'draft'
  AND created_at < NOW() - INTERVAL '180 days';
```
Run as a manual Supabase SQL query or add a second Vercel cron.

**Cron** — the abandon-reminder cron (`*/15 * * * *`) is live on deploy. Check Vercel → Cron Jobs tab to confirm it's running. Logs go to Vercel function logs.

**Log monitoring** — all events use structured `logger.*` calls. Connect Vercel Log Drains to Datadog/Logtail/etc. when volume justifies it.

**Not wired (leave as-is for now)**
- AWS KMS encryption — columns exist, code doesn't use them
- Music step — disabled, redirects to save
- RSVP dietary/email fields — accepted, not persisted
