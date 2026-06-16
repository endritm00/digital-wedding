module.exports = {

"[project]/.next-internal/server/app/api/invites/[id]/checkout/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/lib/supabase/server.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "createClient": (()=>createClient)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-route] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
async function createClient() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://gngoqwenvnhyfbkkszfl.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduZ29xd2Vudm5oeWZia2tzemZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMDU0NDIsImV4cCI6MjA5Njc4MTQ0Mn0.0ojWlaTKHBHO7DWSfQRN_U4q8ijFSs9_lMpWdb50uEQ"), {
        cookies: {
            getAll () {
                return cookieStore.getAll();
            },
            setAll (cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options })=>cookieStore.set(name, value, options));
                } catch  {
                // setAll is called from Server Components where cookies are read-only.
                // The middleware handles the actual cookie refresh; this is a no-op there.
                }
            }
        }
    });
}
}}),
"[project]/lib/supabase/service.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "createServiceClient": (()=>createServiceClient)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
;
function createServiceClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://gngoqwenvnhyfbkkszfl.supabase.co"), process.env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
}
}}),
"[project]/lib/pricing/index.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// Single source of truth for invite pricing.
// Imported by the live-quote API route AND the create-payment edge function.
// Never duplicate this logic in SQL.
__turbopack_context__.s({
    "SECTION_OVERAGE_CODE": (()=>SECTION_OVERAGE_CODE),
    "computeTotal": (()=>computeTotal)
});
const SECTION_OVERAGE_CODE = 'section_overage';
function computeTotal(input) {
    const { plan, extras, sections_count, overage_price_cents } = input;
    const line_items = [];
    // Base plan
    line_items.push({
        label: `plan:${plan.code}`,
        amount_cents: plan.base_price_cents
    });
    // Extras — use the snapshotted unit price, not the current catalog price
    for (const e of extras){
        if (e.unit_price_cents > 0) {
            line_items.push({
                label: `extra:${e.extra_code}`,
                amount_cents: e.unit_price_cents * e.quantity
            });
        }
    }
    // Section overage
    // Guard: plan.included_sections = null means unlimited; treat as Infinity
    // so null arithmetic doesn't silently produce NaN.
    const cap = plan.included_sections ?? Infinity;
    const overage_count = Math.max(0, sections_count - cap);
    if (overage_count > 0 && overage_price_cents != null && overage_price_cents > 0) {
        line_items.push({
            label: `extra:${SECTION_OVERAGE_CODE}`,
            amount_cents: overage_price_cents * overage_count
        });
    }
    const amount_cents = line_items.reduce((sum, li)=>sum + li.amount_cents, 0);
    return {
        amount_cents,
        line_items
    };
}
}}),
"[project]/lib/invites/quote.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "buildQuote": (()=>buildQuote)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/pricing/index.ts [app-route] (ecmascript)");
;
;
;
async function buildQuote(inviteId, { useServiceClient = false } = {}) {
    const db = useServiceClient ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServiceClient"])() : await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    // Fetch plan via the invite's plan_id
    const { data: invite } = await db.from('invites').select('plan_id').eq('id', inviteId).single();
    if (!invite?.plan_id) return {
        error: 'no_plan_selected'
    };
    const { data: plan } = await db.from('plans').select('code, base_price_cents, included_sections').eq('id', invite.plan_id).single();
    if (!plan) return {
        error: 'plan_not_found'
    };
    // Section count drives overage calculation
    const { count: sections_count } = await db.from('invite_sections').select('*', {
        count: 'exact',
        head: true
    }).eq('invite_id', inviteId);
    // Extras with snapshotted prices + their catalog code for labels
    const { data: rawExtras } = await db.from('invite_extras').select('id, quantity, unit_price_cents, extras(code)').eq('invite_id', inviteId);
    // Overage price from the live catalog (not snapshotted — it's a config value)
    const { data: overageExtra } = await db.from('extras').select('price_cents').eq('code', __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SECTION_OVERAGE_CODE"]).eq('active', true).single();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["computeTotal"])({
        plan: {
            code: plan.code,
            base_price_cents: plan.base_price_cents,
            included_sections: plan.included_sections
        },
        extras: (rawExtras ?? []).map((ie)=>({
                invite_extra_id: ie.id,
                extra_code: ie.extras?.code ?? '',
                quantity: ie.quantity,
                unit_price_cents: ie.unit_price_cents
            })),
        sections_count: sections_count ?? 0,
        overage_price_cents: overageExtra?.price_cents ?? null
    });
}
}}),
"[externals]/crypto [external] (crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[externals]/events [external] (events, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}}),
"[externals]/http [external] (http, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}}),
"[externals]/https [external] (https, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}}),
"[externals]/util [external] (util, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}}),
"[externals]/child_process [external] (child_process, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}}),
"[project]/lib/stripe/index.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "stripe": (()=>stripe)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/stripe/esm/stripe.esm.node.js [app-route] (ecmascript)");
;
const stripe = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](process.env.STRIPE_SECRET_KEY, {
    typescript: true
});
}}),
"[project]/lib/api/response.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "badRequest": (()=>badRequest),
    "forbidden": (()=>forbidden),
    "notFound": (()=>notFound),
    "ok": (()=>ok),
    "serverError": (()=>serverError),
    "unauthorized": (()=>unauthorized)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
const ok = (data, status = 200)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data, {
        status
    });
const err = (message, status)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: message
    }, {
        status
    });
const badRequest = (message)=>err(message, 400);
const unauthorized = (message = 'unauthorized')=>err(message, 401);
const forbidden = (message = 'forbidden')=>err(message, 403);
const notFound = (message = 'not_found')=>err(message, 404);
const serverError = (message = 'internal_server_error')=>err(message, 500);
}}),
"[externals]/node:crypto [external] (node:crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}}),
"[project]/lib/rate-limit.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "limiters": (()=>limiters),
    "rateLimitedResponse": (()=>rateLimitedResponse)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$upstash$2f$ratelimit$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@upstash/ratelimit/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$upstash$2f$redis$2f$nodejs$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@upstash/redis/nodejs.mjs [app-route] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$upstash$2f$redis$2f$nodejs$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@upstash/redis/nodejs.mjs [app-route] (ecmascript) <locals>");
;
;
// ─── in-memory fallback (single-process, resets on cold start) ────────────────
class InMemoryStore {
    buckets = new Map();
    check(key, max, windowMs) {
        const now = Date.now();
        let bucket = this.buckets.get(key);
        if (!bucket || bucket.resetAt <= now) {
            bucket = {
                count: 1,
                resetAt: now + windowMs
            };
            this.buckets.set(key, bucket);
            return {
                allowed: true,
                remaining: max - 1,
                resetAt: bucket.resetAt
            };
        }
        if (bucket.count >= max) {
            return {
                allowed: false,
                remaining: 0,
                resetAt: bucket.resetAt
            };
        }
        bucket.count++;
        return {
            allowed: true,
            remaining: max - bucket.count,
            resetAt: bucket.resetAt
        };
    }
}
const mem = new InMemoryStore();
// ─── Upstash factory ──────────────────────────────────────────────────────────
// Returns null when UPSTASH env vars are absent → caller falls back to mem.
function makeUpstash(name, max, window) {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (!url || !token) return null;
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$upstash$2f$ratelimit$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Ratelimit"]({
        redis: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$upstash$2f$redis$2f$nodejs$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Redis"]({
            url,
            token
        }),
        limiter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$upstash$2f$ratelimit$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Ratelimit"].slidingWindow(max, window),
        prefix: `di:rl:${name}`
    });
}
// Module-level singletons — recreated only on cold start.
// Each limiter gets its own Ratelimit instance so sliding-window counters
// are completely isolated and never share key space.
const _rsvpLimiter = makeUpstash('rsvp', 3, '1 h');
const _checkoutLimiter = makeUpstash('checkout', 5, '10 m');
const _draftLimiter = makeUpstash('draft', 10, '1 h');
const _mediaLimiter = makeUpstash('media', 20, '1 h');
async function check(rl, key, max, windowMs) {
    if (!rl) return mem.check(key, max, windowMs);
    const r = await rl.limit(key);
    return {
        allowed: r.success,
        remaining: r.remaining,
        resetAt: r.reset
    };
}
const limiters = {
    // 3 RSVPs per (slug × IP) per hour
    rsvp: (key)=>check(_rsvpLimiter, key, 3, 60 * 60 * 1000),
    // 5 checkout attempts per user per 10 min
    checkout: (key)=>check(_checkoutLimiter, key, 5, 10 * 60 * 1000),
    // 10 invite creates per IP per hour
    draft: (key)=>check(_draftLimiter, key, 10, 60 * 60 * 1000),
    // 20 media uploads per invite per hour
    media: (key)=>check(_mediaLimiter, key, 20, 60 * 60 * 1000)
};
function rateLimitedResponse(result) {
    const retryAfterSec = Math.ceil((result.resetAt - Date.now()) / 1000);
    return new Response(JSON.stringify({
        error: 'rate_limited'
    }), {
        status: 429,
        headers: {
            'Content-Type': 'application/json',
            'Retry-After': String(retryAfterSec),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.ceil(result.resetAt / 1000))
        }
    });
}
}}),
"[project]/lib/logger.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "logger": (()=>logger)
});
function emit(level, fields) {
    const entry = JSON.stringify({
        ts: new Date().toISOString(),
        level,
        ...fields
    });
    level === 'error' ? console.error(entry) : console.log(entry);
}
const logger = {
    info: (fields)=>emit('info', fields),
    warn: (fields)=>emit('warn', fields),
    error: (fields)=>emit('error', fields)
};
}}),
"[project]/app/api/invites/[id]/checkout/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$invites$2f$quote$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/invites/quote.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stripe$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/stripe/index.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/response.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rate$2d$limit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/rate-limit.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/logger.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
async function POST(_req, { params }) {
    const { id } = await params;
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["unauthorized"])();
    // 5 checkout attempts per user per 10 min
    const checkoutLimit = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rate$2d$limit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["limiters"].checkout(`checkout:${user.id}`);
    if (!checkoutLimit.allowed) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rate$2d$limit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["rateLimitedResponse"])(checkoutLimit);
    // Fetch invite through RLS — confirms ownership
    const { data: invite } = await supabase.from('invites').select('id, status, plan_id').eq('id', id).single();
    if (!invite) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["notFound"])('invite_not_found');
    if (invite.status === 'paid') return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["badRequest"])('invite_already_paid');
    if (invite.status !== 'draft') return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["badRequest"])('invite_not_checkoutable');
    if (!invite.plan_id) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["badRequest"])('no_plan_selected');
    // Server-side price — the client total is never trusted
    const quote = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$invites$2f$quote$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildQuote"])(id);
    if ('error' in quote) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["badRequest"])(quote.error);
    // Layer 1: existing pending order at the same price, created < 30 min ago
    const service = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServiceClient"])();
    const cutoff = new Date(Date.now() - 30 * 60 * 1000).toISOString();
    const { data: existing } = await service.from('orders').select('checkout_url').eq('invite_id', id).eq('status', 'pending').eq('amount_cents', quote.amount_cents).gte('created_at', cutoff).order('created_at', {
        ascending: false
    }).limit(1).maybeSingle();
    if (existing?.checkout_url) {
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info({
            event: 'checkout.reused_session',
            invite_id: id
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ok"])({
            url: existing.checkout_url
        });
    }
    // Fetch plan code snapshot and buyer email
    const [{ data: plan }, { data: { user: freshUser } }] = await Promise.all([
        service.from('plans').select('code').eq('id', invite.plan_id).single(),
        supabase.auth.getUser()
    ]);
    const buyerEmail = freshUser?.email ?? '';
    const appUrl = ("TURBOPACK compile-time value", "http://localhost:3000");
    const orderId = crypto.randomUUID();
    // Layer 2: Stripe idempotency key — same invite + same price → same session
    let session;
    try {
        session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stripe$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stripe"].checkout.sessions.create({
            mode: 'payment',
            currency: 'eur',
            customer_email: buyerEmail || undefined,
            // One line-item per pricing component for a clean Stripe receipt
            line_items: quote.line_items.map((li)=>({
                    price_data: {
                        currency: 'eur',
                        unit_amount: li.amount_cents,
                        product_data: {
                            name: li.label
                        }
                    },
                    quantity: 1
                })),
            client_reference_id: id,
            metadata: {
                order_id: orderId,
                invite_id: id
            },
            success_url: `${appUrl}/invite/${id}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${appUrl}/invite/${id}/build`
        }, {
            idempotencyKey: `checkout_${id}_${quote.amount_cents}`
        });
    } catch (err) {
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error({
            event: 'checkout.stripe_session.failed',
            invite_id: id,
            error: String(err)
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serverError"])('payment_provider_error');
    }
    if (!session.url) {
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error({
            event: 'checkout.session.no_url',
            invite_id: id,
            session_id: session.id
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serverError"])();
    }
    // Insert order — pre-generated ID was embedded in Stripe metadata
    const { error: insertError } = await service.from('orders').insert({
        id: orderId,
        invite_id: id,
        buyer_email: buyerEmail,
        amount_cents: quote.amount_cents,
        currency: 'eur',
        plan_code: plan?.code ?? 'unknown',
        line_items: quote.line_items,
        status: 'pending',
        stripe_session_id: session.id,
        checkout_url: session.url
    });
    if (insertError) {
        // Layer 3: unique conflict on stripe_session_id means a concurrent request
        // already inserted this session — return the existing order's URL
        if (insertError.code === '23505') {
            const { data: concurrent } = await service.from('orders').select('checkout_url').eq('stripe_session_id', session.id).single();
            if (concurrent?.checkout_url) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ok"])({
                url: concurrent.checkout_url
            });
        }
        // The Stripe session was created but the order row failed.
        // Log and still return the URL — the webhook will handle the missing order.
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error({
            event: 'checkout.order_insert.failed',
            invite_id: id,
            session_id: session.id,
            error: insertError.message
        });
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ok"])({
        url: session.url
    }, 201);
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__c98b932d._.js.map