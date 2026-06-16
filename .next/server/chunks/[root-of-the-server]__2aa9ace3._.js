module.exports = {

"[project]/.next-internal/server/app/api/invites/[id]/media/[assetId]/complete/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
    "resolveInviteAccess": (()=>resolveInviteAccess)
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
"[project]/app/api/invites/[id]/media/[assetId]/complete/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$invites$2f$access$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/invites/access.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/response.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/logger.ts [app-route] (ecmascript)");
;
;
;
;
async function POST(request, { params }) {
    const { id, assetId } = await params;
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$invites$2f$access$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveInviteAccess"])(id, request.headers);
    if (!result.ok) return Response.json({
        error: result.message
    }, {
        status: result.status
    });
    const service = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServiceClient"])();
    const { data: asset, error: fetchErr } = await service.from('media_assets').select('id, kind, status, storage_key, mime, bytes').eq('id', assetId).eq('invite_id', id).single();
    if (fetchErr || !asset) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["notFound"])('media_asset_not_found');
    // Mux assets must not call this endpoint — they're finalized by webhook
    const MUX_KINDS = [
        'opening_video',
        'hero_video'
    ];
    if (MUX_KINDS.includes(asset.kind)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["badRequest"])('use_mux_webhook_for_video');
    }
    if (asset.status === 'ready') return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ok"])({
        status: 'ready'
    });
    if (asset.status === 'failed') return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["badRequest"])('asset_in_failed_state');
    let variants = {};
    if (asset.kind === 'gallery_image' || asset.kind === 'illustration') {
        // Store the transform spec for each variant.
        // The signed-url endpoint and the publish snapshot renderer
        // use these specs to generate the correct Supabase transform URL.
        variants = {
            thumb: {
                width: 200,
                height: 200,
                resize: 'cover',
                format: 'webp',
                quality: 80
            },
            medium: {
                width: 800,
                resize: 'contain',
                format: 'webp',
                quality: 85
            },
            full: {
                format: 'webp',
                quality: 90
            }
        };
    }
    // For audio: variants stays empty — the original file is served directly
    const { error } = await service.from('media_assets').update({
        status: 'ready',
        variants
    }).eq('id', assetId);
    if (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error({
            event: 'media_asset.complete.failed',
            asset_id: assetId,
            error: error.message
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serverError"])();
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info({
        event: 'media.upload_complete',
        kind: asset.kind,
        asset_id: assetId
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ok"])({
        status: 'ready',
        variants
    });
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__2aa9ace3._.js.map