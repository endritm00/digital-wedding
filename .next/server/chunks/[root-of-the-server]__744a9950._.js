module.exports = {

"[project]/.next-internal/server/app/api/invites/[id]/quote/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[project]/lib/invites/access.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "resolveInviteAccess": (()=>resolveInviteAccess),
    "resolveInviteWriteAccess": (()=>resolveInviteWriteAccess)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/service.ts [app-route] (ecmascript)");
;
;
async function resolveInviteAccess(inviteId, headers) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        const { data, error } = await supabase.from('invites').select('*').eq('id', inviteId).single();
        if (error || !data) return {
            ok: false,
            status: 404,
            message: 'invite_not_found'
        };
        const via = data.owner_id === user.id ? 'owner' : 'staff';
        return {
            ok: true,
            invite: data,
            via
        };
    }
    // Unauthenticated path — validate claim token
    const claimToken = headers.get('x-claim-token');
    if (!claimToken) return {
        ok: false,
        status: 401,
        message: 'unauthorized'
    };
    const service = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServiceClient"])();
    const { data, error } = await service.from('invites').select('*').eq('id', inviteId).eq('claim_token', claimToken).eq('status', 'draft').single();
    if (error || !data) return {
        ok: false,
        status: 403,
        message: 'forbidden'
    };
    return {
        ok: true,
        invite: data,
        via: 'claim_token'
    };
}
async function resolveInviteWriteAccess(inviteId, headers) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        const { data, error } = await supabase.from('invites').select('*').eq('id', inviteId).single();
        if (error || !data) return {
            ok: false,
            status: 404,
            message: 'invite_not_found'
        };
        const via = data.owner_id === user.id ? 'owner' : 'staff';
        return {
            ok: true,
            invite: data,
            via,
            userId: user.id
        };
    }
    const claimToken = headers.get('x-claim-token');
    if (!claimToken) return {
        ok: false,
        status: 401,
        message: 'unauthorized'
    };
    const service = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServiceClient"])();
    const { data, error } = await service.from('invites').select('*').eq('id', inviteId).eq('claim_token', claimToken).single();
    if (error || !data) return {
        ok: false,
        status: 403,
        message: 'forbidden'
    };
    return {
        ok: true,
        invite: data,
        via: 'claim_token',
        userId: null
    };
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
    "CUSTOM_VIDEO_CODE": (()=>CUSTOM_VIDEO_CODE),
    "SECTION_OVERAGE_CODE": (()=>SECTION_OVERAGE_CODE),
    "computeTotal": (()=>computeTotal)
});
const SECTION_OVERAGE_CODE = 'section_overage';
const CUSTOM_VIDEO_CODE = 'custom_video';
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
    const extras = (rawExtras ?? []).map((ie)=>({
            invite_extra_id: ie.id,
            extra_code: ie.extras?.code ?? '',
            quantity: ie.quantity,
            unit_price_cents: ie.unit_price_cents
        }));
    // Custom film upload — a flat per-invite fee whenever the couple supply their
    // own opening video (vs. a curated preset). Derived server-side from the
    // opening section so it can't be skipped and stays consistent across the live
    // quote and checkout (both call buildQuote). Preset films are free.
    const { data: openingSection } = await db.from('invite_sections').select('config').eq('invite_id', inviteId).eq('type', 'opening').maybeSingle();
    const hasCustomVideo = !!openingSection?.config?.video_asset_id;
    if (hasCustomVideo) {
        const { data: cv } = await db.from('extras').select('price_cents').eq('code', __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CUSTOM_VIDEO_CODE"]).eq('active', true).single();
        if (cv?.price_cents) {
            extras.push({
                invite_extra_id: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CUSTOM_VIDEO_CODE"],
                extra_code: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CUSTOM_VIDEO_CODE"],
                quantity: 1,
                unit_price_cents: cv.price_cents
            });
        }
    }
    // Pages are all included — we do NOT charge per page. The only paid add-on is a
    // couple's own uploaded opening film (CUSTOM_VIDEO_CODE, added above). Passing a
    // null overage price disables the section-overage line entirely.
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["computeTotal"])({
        plan: {
            code: plan.code,
            base_price_cents: plan.base_price_cents,
            included_sections: plan.included_sections
        },
        extras,
        sections_count: sections_count ?? 0,
        overage_price_cents: null
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
"[project]/app/api/invites/[id]/quote/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$invites$2f$access$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/invites/access.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$invites$2f$quote$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/invites/quote.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/response.ts [app-route] (ecmascript)");
;
;
;
async function GET(request, { params }) {
    const { id } = await params;
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$invites$2f$access$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveInviteAccess"])(id, request.headers);
    if (!result.ok) return Response.json({
        error: result.message
    }, {
        status: result.status
    });
    const quote = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$invites$2f$quote$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildQuote"])(id, {
        useServiceClient: result.via === 'claim_token'
    });
    if ('error' in quote) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["badRequest"])(quote.error);
    if (!quote) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serverError"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ok"])({
        ...quote,
        currency: 'eur'
    });
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__744a9950._.js.map