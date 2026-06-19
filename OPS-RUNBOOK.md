# Ops Runbook — required external configuration

The review/checkout/publish code is in place, but three things live in **dashboards / secrets** and must be configured by a maintainer. Without them the related feature silently degrades (the code fails gracefully, but the feature won't fully work).

All secrets go in `.env.local` (dev) and your host's env (prod). `.env.local` is gitignored — never commit it.

> **No login / accounts.** The purchase flow is fully login-free: anonymous draft → enter email → pay → publish, all authorized by the draft's `claim_token` (held in the creator's browser). There is intentionally **no** magic-link / Supabase Auth step. Nothing to configure for auth.

---

## 1. Resend — manage-link email (item B1)

On first publish we email the couple their private RSVP-management link. The success screen also shows it on-screen (so it's not lost even if email fails), but email is the durable copy.

- `RESEND_API_KEY` — already set.
- `RESEND_FROM` — **must be a verified-domain sender** for real delivery, e.g. `Hitched <hello@yourdomain.com>`.
  - **Resend Dashboard → Domains → Add Domain**, add the DNS records, verify.
  - Until then `RESEND_FROM` defaults to `onboarding@resend.dev`, which **only delivers to the Resend account owner's email** — couples will not receive it.

---

## 2. Upstash Redis — rate limiting

Without it, `lib/rate-limit.ts` falls back to an in-process store that **resets on every cold start and is per-instance** — so on serverless/multi-instance the limits (RSVP, checkout, draft) are effectively multiplied by the instance count.

- Create a database at **upstash.com → Redis**.
- Set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in all deployed environments (and staging).

---

## 3. Cloudflare — CDN purge on re-publish

`lib/publish/cdn-purge.ts` purges the cached `/api/snapshots/:slug` after a (re)publish. If the creds are absent the purge is **skipped silently**, so guests can see the **stale snapshot for up to 24h** (`s-maxage=86400`) after a re-publish.

- Set `CLOUDFLARE_ZONE_ID` and `CLOUDFLARE_API_TOKEN` (token needs the *Cache Purge* permission for the zone) in production.
- (The Next.js ISR guest page is already revalidated on publish via `revalidatePath`; this is specifically about the CDN-cached snapshot JSON.)

---

## 4. Stripe — Webhook for payment reconciliation

The payment success page redirects immediately from Stripe's hosted checkout, and the code asks Stripe directly whether the session was paid (`checkout.sessions.retrieve`). This local-first reconciliation means **the webhook is not required for basic payment confirmation** — but it's the reliable async backstop for:
- Handling `checkout.session.expired` (clean up stale orders)
- Handling `payment_intent.payment_failed` (mark order as failed)
- Redundant verification if the success page fails to reconcile before publishing

**Setup (production only; optional but recommended):**

1. **Stripe Dashboard → Webhooks → Add Endpoint**
   - Endpoint URL: `https://yourdomain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `checkout.session.expired`, `payment_intent.payment_failed`
   - Copy the **Signing Secret** (`whsec_…`)

2. **Set the environment variable:**
   - Prod: `STRIPE_WEBHOOK_SECRET=whsec_…` in your platform's env vars (Vercel, etc.)
   - Dev (local testing): Run `stripe listen --forward-to localhost:3000/api/webhooks/stripe`, copy the printed secret into `.env.local`

3. **That's it.** The webhook handler at `app/api/webhooks/stripe/route.ts` is already in place.

**Local testing without the webhook:**
- You don't need `stripe listen` just to test the happy path (payment → publish).
- The success page confirms payment locally against Stripe, so the flow works end-to-end.
- Webhook is optional for dev; only required in prod for reliability + expired/failed events.

**Important notes:**
- Never commit `STRIPE_WEBHOOK_SECRET` to git (it's in `.env.local` or your prod env, never in code).
- If the webhook is missing in prod, stale orders (`expired`/`failed`) won't be cleaned up, but payment confirmation + publishing still work via the redirect-path reconciliation.

---

## Quick checklist before go-live
- [ ] Resend: domain verified + `RESEND_FROM` set to it
- [ ] Upstash: `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` set
- [ ] Cloudflare: `CLOUDFLARE_ZONE_ID` + `CLOUDFLARE_API_TOKEN` set
- [ ] Stripe: live keys set (`STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`)
- [ ] Stripe webhook: endpoint created + `STRIPE_WEBHOOK_SECRET` configured in prod env
