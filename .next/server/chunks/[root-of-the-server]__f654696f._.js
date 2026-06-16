module.exports = {

"[project]/.next-internal/server/app/api/invites/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[project]/app/api/invites/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/response.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rate$2d$limit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/rate-limit.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/logger.ts [app-route] (ecmascript)");
;
;
;
;
;
;
const CreateSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    theme_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid().optional(),
    plan_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid().optional(),
    draft_email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email().optional()
});
async function POST(request) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    const draftLimit = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rate$2d$limit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["limiters"].draft(`draft:${ip}`);
    if (!draftLimit.allowed) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rate$2d$limit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["rateLimitedResponse"])(draftLimit);
    let body;
    try {
        body = await request.json();
    } catch  {
        body = {};
    }
    const parsed = CreateSchema.safeParse(body);
    if (!parsed.success) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["badRequest"])(parsed.error.issues[0].message);
    const { theme_id, plan_id, draft_email } = parsed.data;
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        const { data, error } = await supabase.from('invites').insert({
            owner_id: user.id,
            theme_id,
            plan_id,
            draft_email
        }).select('id, slug').single();
        if (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error({
                event: 'invite.create.failed',
                user_id: user.id,
                error: error.message
            });
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serverError"])();
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ok"])(data, 201);
    }
    // Anonymous draft — service client (RLS blocks anon inserts)
    const claim_token = crypto.randomUUID();
    const { data, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServiceClient"])().from('invites').insert({
        claim_token,
        theme_id,
        plan_id,
        draft_email
    }).select('id, slug').single();
    if (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error({
            event: 'invite.create_anon.failed',
            error: error.message
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serverError"])();
    }
    // claim_token is returned once — client must store it (localStorage / httpOnly cookie)
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ok"])({
        ...data,
        claim_token
    }, 201);
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__f654696f._.js.map