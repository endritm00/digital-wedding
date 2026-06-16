module.exports = {

"[project]/.next-internal/server/app/api/invites/[id]/media/[assetId]/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[externals]/stream [external] (stream, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}}),
"[externals]/http [external] (http, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}}),
"[externals]/url [external] (url, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}}),
"[externals]/punycode [external] (punycode, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("punycode", () => require("punycode"));

module.exports = mod;
}}),
"[externals]/https [external] (https, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}}),
"[externals]/zlib [external] (zlib, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}}),
"[externals]/util [external] (util, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}}),
"[externals]/node:fs [external] (node:fs, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:fs", () => require("node:fs"));

module.exports = mod;
}}),
"[externals]/node:stream [external] (node:stream, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}}),
"[externals]/node:stream/web [external] (node:stream/web, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:stream/web", () => require("node:stream/web"));

module.exports = mod;
}}),
"[externals]/crypto [external] (crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[externals]/buffer [external] (buffer, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}}),
"[externals]/fs [external] (fs, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}}),
"[project]/lib/mux/index.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getMux": (()=>getMux),
    "mux": (()=>mux),
    "muxUrls": (()=>muxUrls),
    "resolveMuxReadyState": (()=>resolveMuxReadyState)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mux$2f$mux$2d$node$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@mux/mux-node/index.mjs [app-route] (ecmascript) <locals>");
;
// Lazily-constructed Mux client. Server-only — never import in client code.
// Building it lazily means routes that merely import this module (e.g. the
// media LIST endpoint) don't crash when MUX_* env vars are absent in dev — the
// client is only instantiated when an upload/transcode path actually needs it.
let _mux = null;
function getMux() {
    if (_mux) return _mux;
    const tokenId = process.env.MUX_TOKEN_ID;
    const tokenSecret = process.env.MUX_TOKEN_SECRET;
    if (!tokenId || !tokenSecret) {
        throw new Error('Mux is not configured (MUX_TOKEN_ID / MUX_TOKEN_SECRET missing).');
    }
    _mux = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mux$2f$mux$2d$node$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]({
        tokenId,
        tokenSecret
    });
    return _mux;
}
const mux = new Proxy({}, {
    get (_target, prop) {
        const client = getMux();
        const value = client[prop];
        return typeof value === 'function' ? value.bind(client) : value;
    }
});
const muxUrls = {
    hls: (playbackId)=>`https://stream.mux.com/${playbackId}.m3u8`,
    poster: (playbackId, time = 0)=>`https://image.mux.com/${playbackId}/thumbnail.jpg?time=${time}`,
    mp4: (playbackId)=>`https://stream.mux.com/${playbackId}/high.mp4`
};
async function resolveMuxReadyState({ uploadId, muxAssetId }) {
    // Resolve the upload → asset id if we don't have it yet.
    let assetId = muxAssetId ?? null;
    if (!assetId && uploadId) {
        const upload = await mux.video.uploads.retrieve(uploadId);
        if (upload.status === 'errored' || upload.status === 'cancelled' || upload.status === 'timed_out') {
            return {
                status: 'failed'
            };
        }
        assetId = upload.asset_id ?? null;
        if (!assetId) return {
            status: 'pending'
        } // upload still in flight
        ;
    }
    if (!assetId) return {
        status: 'pending'
    };
    const asset = await mux.video.assets.retrieve(assetId);
    if (asset.status === 'errored') return {
        status: 'failed'
    };
    if (asset.status !== 'ready') return {
        status: 'pending'
    };
    const playbackId = asset.playback_ids?.find((p)=>p.policy === 'public')?.id;
    if (!playbackId) return {
        status: 'pending'
    } // ready but no public id yet
    ;
    return {
        status: 'ready',
        muxAssetId: assetId,
        playbackId,
        durationS: typeof asset.duration === 'number' ? asset.duration : null
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
"[project]/app/api/invites/[id]/media/[assetId]/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "DELETE": (()=>DELETE),
    "GET": (()=>GET)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$invites$2f$access$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/invites/access.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mux$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mux/index.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/response.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/logger.ts [app-route] (ecmascript)");
;
;
;
;
;
const MUX_KINDS = [
    'opening_video',
    'hero_video'
];
const ASSET_COLUMNS = 'id, kind, status, variants, bytes, duration_ms, mime, created_at, updated_at';
async function GET(request, { params }) {
    const { id, assetId } = await params;
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$invites$2f$access$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveInviteAccess"])(id, request.headers);
    if (!result.ok) return Response.json({
        error: result.message
    }, {
        status: result.status
    });
    const service = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServiceClient"])();
    const { data, error } = await service.from('media_assets').select(ASSET_COLUMNS).eq('id', assetId).eq('invite_id', id).single();
    if (error || !data) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["notFound"])('media_asset_not_found');
    // Mux finalizes via webhook, but that can't reach localhost (and may be missed
    // in prod). If a Mux video is still pending, ask Mux directly and self-finalize
    // so the poll resolves without a webhook.
    if (MUX_KINDS.includes(data.kind) && (data.status === 'uploading' || data.status === 'processing')) {
        const reconciled = await reconcileMuxAsset(data, id, assetId, service);
        if (reconciled) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ok"])(reconciled);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ok"])(data);
}
// Pulls live state from Mux and, if the video is ready/failed, writes the same
// row shape the webhook would. Returns the updated row, or null on no change.
async function reconcileMuxAsset(data, inviteId, assetId, service) {
    const variants = data.variants ?? {};
    try {
        const state = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mux$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveMuxReadyState"])({
            uploadId: variants.mux_upload_id,
            muxAssetId: variants.mux_asset_id
        });
        if (state.status === 'pending') return null;
        const update = state.status === 'ready' ? {
            status: 'ready',
            duration_ms: state.durationS ? Math.round(state.durationS * 1000) : null,
            variants: {
                ...variants,
                mux_asset_id: state.muxAssetId,
                playback_id: state.playbackId,
                hls: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mux$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["muxUrls"].hls(state.playbackId),
                poster: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mux$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["muxUrls"].poster(state.playbackId),
                mp4: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mux$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["muxUrls"].mp4(state.playbackId)
            }
        } : {
            status: 'failed'
        };
        const { data: updated, error } = await service.from('media_assets').update(update).eq('id', assetId).eq('invite_id', inviteId).in('status', [
            'uploading',
            'processing'
        ]) // idempotency: lost the race? no-op
        .select(ASSET_COLUMNS).maybeSingle();
        if (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].warn({
                event: 'media.reconcile.update_failed',
                asset_id: assetId,
                error: error.message
            });
            return null;
        }
        if (updated) __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info({
            event: `media.reconcile.${state.status}`,
            asset_id: assetId
        });
        return updated ? updated : null;
    } catch (err) {
        // Mux unreachable / not configured — fall back to the stored row.
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].warn({
            event: 'media.reconcile.failed',
            asset_id: assetId,
            error: String(err)
        });
        return null;
    }
}
async function DELETE(request, { params }) {
    const { id, assetId } = await params;
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$invites$2f$access$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveInviteAccess"])(id, request.headers);
    if (!result.ok) return Response.json({
        error: result.message
    }, {
        status: result.status
    });
    const service = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServiceClient"])();
    const { data: asset, error: fetchErr } = await service.from('media_assets').select('kind, storage_key').eq('id', assetId).eq('invite_id', id).single();
    if (fetchErr || !asset) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["notFound"])('media_asset_not_found');
    // Delete Storage file for non-Mux assets
    const MUX_KINDS = [
        'opening_video',
        'hero_video'
    ];
    if (!MUX_KINDS.includes(asset.kind) && asset.storage_key) {
        const { error: storageErr } = await service.storage.from('invite-media').remove([
            asset.storage_key
        ]);
        if (storageErr) {
            // Log but don't abort — delete the DB row regardless
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].warn({
                event: 'storage.delete.failed',
                asset_id: assetId,
                error: storageErr.message
            });
        }
    }
    const { error } = await service.from('media_assets').delete().eq('id', assetId).eq('invite_id', id);
    if (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error({
            event: 'media_asset.delete.failed',
            asset_id: assetId,
            error: error.message
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serverError"])();
    }
    return new Response(null, {
        status: 204
    });
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__10586b8e._.js.map