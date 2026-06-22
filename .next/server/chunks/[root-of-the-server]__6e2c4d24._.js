module.exports = {

"[project]/.next-internal/server/app/api/invites/[id]/media/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
    // Static MP4 rendition. We request mp4_support 'capped-1080p' at upload time
    // (the deprecated 'standard' / 'high.mp4' isn't allowed on basic assets), which
    // Mux serves at this fixed path once the rendition finishes preparing.
    mp4: (playbackId)=>`https://stream.mux.com/${playbackId}/capped-1080p.mp4`
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
    // We serve a static MP4 (plain <video> can't play HLS). The asset reports
    // 'ready' for streaming before the MP4 rendition finishes preparing, so hold
    // 'pending' until it's done — otherwise muxUrls.mp4() would 404 for a beat.
    const renditions = asset.static_renditions;
    if (renditions && renditions.status && renditions.status !== 'ready') {
        return {
            status: 'pending'
        };
    }
    return {
        status: 'ready',
        muxAssetId: assetId,
        playbackId,
        durationS: typeof asset.duration === 'number' ? asset.duration : null
    };
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
"[project]/lib/mux/reconcile.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ASSET_COLUMNS": (()=>ASSET_COLUMNS),
    "MUX_KINDS": (()=>MUX_KINDS),
    "reconcileMuxAsset": (()=>reconcileMuxAsset),
    "reconcileMuxAssets": (()=>reconcileMuxAssets)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mux$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mux/index.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/logger.ts [app-route] (ecmascript)");
;
;
const MUX_KINDS = [
    'opening_video',
    'hero_video'
];
const ASSET_COLUMNS = 'id, kind, status, variants, bytes, duration_ms, mime, created_at, updated_at';
function isPendingMux(row) {
    return MUX_KINDS.includes(row.kind) && (row.status === 'uploading' || row.status === 'processing');
}
async function reconcileMuxAsset(row, inviteId, service) {
    if (!isPendingMux(row)) return null;
    const variants = row.variants ?? {};
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
        const { data: updated, error } = await service.from('media_assets').update(update).eq('id', row.id).eq('invite_id', inviteId).in('status', [
            'uploading',
            'processing'
        ]) // idempotency: lost the race? no-op
        .select(ASSET_COLUMNS).maybeSingle();
        if (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].warn({
                event: 'media.reconcile.update_failed',
                asset_id: row.id,
                error: error.message
            });
            return null;
        }
        if (updated) __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info({
            event: `media.reconcile.${state.status}`,
            asset_id: row.id
        });
        return updated ? updated : null;
    } catch (err) {
        // Mux unreachable / not configured — fall back to the stored row.
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].warn({
            event: 'media.reconcile.failed',
            asset_id: row.id,
            error: String(err)
        });
        return null;
    }
}
async function reconcileMuxAssets(rows, inviteId, service) {
    const pending = rows.filter(isPendingMux);
    if (pending.length === 0) return rows;
    const updates = new Map();
    await Promise.all(pending.map(async (row)=>{
        const updated = await reconcileMuxAsset(row, inviteId, service);
        if (updated) updates.set(row.id, updated);
    }));
    if (updates.size === 0) return rows;
    return rows.map((r)=>updates.get(r.id) ?? r);
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
"[externals]/node:path [external] (node:path, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}}),
"[project]/app/api/invites/[id]/media/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET),
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$invites$2f$access$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/invites/access.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mux$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mux/index.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mux$2f$reconcile$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mux/reconcile.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/response.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/logger.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
;
;
;
;
;
;
;
;
// Kinds that go through Mux Direct Upload (video)
const MUX_KINDS = [
    'opening_video',
    'hero_video'
];
// Kinds that go through Supabase Storage presigned PUT
const STORAGE_KINDS = [
    'background_music',
    'gallery_image',
    'illustration'
];
const ALL_KINDS = [
    ...MUX_KINDS,
    ...STORAGE_KINDS
];
const STORAGE_BUCKET = 'invite-media';
const InitiateSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum(ALL_KINDS),
    filename: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).max(255),
    mime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).max(100),
    bytes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive().optional()
});
async function GET(request, { params }) {
    const { id } = await params;
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$invites$2f$access$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveInviteAccess"])(id, request.headers);
    if (!result.ok) return Response.json({
        error: result.message
    }, {
        status: result.status
    });
    const service = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServiceClient"])();
    const { data, error } = await service.from('media_assets').select(`${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mux$2f$reconcile$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ASSET_COLUMNS"]}, storage_key`).eq('invite_id', id).order('created_at');
    if (error) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serverError"])();
    // Self-finalize any Mux videos still pending (webhook can't reach localhost,
    // and may be missed in prod) so the preview/builder sees them as ready.
    const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mux$2f$reconcile$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["reconcileMuxAssets"])(data ?? [], id, service);
    // Attach short-lived signed URLs to image assets so the builder uploader AND
    // the live/creator preview can display them (the published snapshot embeds its
    // own long-lived URLs). storage_key is stripped from the response.
    const enriched = await Promise.all(rows.map((r)=>withImageUrls(r, service)));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ok"])(enriched);
}
const PREVIEW_IMAGE_KINDS = new Set([
    'gallery_image',
    'illustration'
]);
const PREVIEW_TTL = 3600 // 1h — builder/preview only
;
async function withImageUrls(row, service) {
    const { storage_key, ...rest } = row;
    if (!PREVIEW_IMAGE_KINDS.has(row.kind) || row.status !== 'ready' || !storage_key) {
        return rest;
    }
    const bucket = service.storage.from('invite-media');
    const sign = async (transform)=>{
        const { data } = await bucket.createSignedUrl(storage_key, PREVIEW_TTL, transform ? {
            transform
        } : undefined);
        return data?.signedUrl;
    };
    const [url, thumb, medium] = await Promise.all([
        sign(),
        sign({
            width: 400,
            height: 400,
            resize: 'cover',
            quality: 80
        }),
        sign({
            width: 1000,
            resize: 'contain',
            quality: 85
        })
    ]);
    return {
        ...rest,
        variants: {
            ...row.variants ?? {},
            url,
            thumb,
            medium
        }
    };
}
async function POST(request, { params }) {
    const { id } = await params;
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$invites$2f$access$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveInviteAccess"])(id, request.headers);
    if (!result.ok) return Response.json({
        error: result.message
    }, {
        status: result.status
    });
    if ([
        'published',
        'archived'
    ].includes(result.invite.status)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["badRequest"])('invite_not_editable');
    }
    let body;
    try {
        body = await request.json();
    } catch  {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["badRequest"])('invalid_json');
    }
    const parsed = InitiateSchema.safeParse(body);
    if (!parsed.success) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["badRequest"])(parsed.error.issues[0].message);
    const { kind, filename, mime, bytes } = parsed.data;
    const service = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServiceClient"])();
    if (MUX_KINDS.includes(kind)) {
        return initiateMuxUpload({
            inviteId: id,
            kind,
            mime,
            bytes,
            service
        });
    }
    return initiateStorageUpload({
        inviteId: id,
        kind,
        filename,
        mime,
        bytes,
        service
    });
}
// ── Mux (video) ─────────────────────────────────────────────────────────────
async function initiateMuxUpload({ inviteId, kind, mime, bytes, service }) {
    // Pre-generate our asset ID so we can embed it as Mux passthrough.
    // The webhook uses passthrough to find this row instantly.
    const assetId = crypto.randomUUID();
    let muxUpload;
    try {
        muxUpload = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mux$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mux"].video.uploads.create({
            cors_origin: ("TURBOPACK compile-time value", "http://localhost:3000"),
            new_asset_settings: {
                playback_policy: [
                    'public'
                ],
                passthrough: assetId,
                // Static MP4 rendition so a plain <video> can play it (no HLS player).
                mp4_support: 'capped-1080p'
            }
        });
    } catch (err) {
        const msg = String(err);
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error({
            event: 'mux.upload.create.failed',
            invite_id: inviteId,
            error: msg
        });
        // Distinguish "Mux not configured" (permanent → coming soon) from transient
        // API failures like plan limits (retryable → show error + keep card enabled).
        if (msg.includes('not configured') || msg.includes('MUX_TOKEN')) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serverError"])('video_provider_unavailable');
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serverError"])('video_provider_error');
    }
    const { error } = await service.from('media_assets').insert({
        id: assetId,
        invite_id: inviteId,
        kind,
        status: 'uploading',
        storage_key: muxUpload.id,
        variants: {
            mux_upload_id: muxUpload.id
        },
        mime,
        bytes: bytes ?? null
    });
    if (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error({
            event: 'media_asset.insert.failed',
            invite_id: inviteId,
            error: error.message
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serverError"])();
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info({
        event: 'media.upload_initiated',
        kind,
        via: 'mux',
        invite_id: inviteId
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ok"])({
        asset_id: assetId,
        upload_url: muxUpload.url,
        upload_method: 'PUT'
    }, 201);
}
// ── Supabase Storage (images + audio) ───────────────────────────────────────
async function initiateStorageUpload({ inviteId, kind, filename, mime, bytes, service }) {
    const ext = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].extname(filename).toLowerCase() || '';
    const storagePath = `invites/${inviteId}/${kind}/${crypto.randomUUID()}${ext}`;
    const { data: signed, error: signErr } = await service.storage.from(STORAGE_BUCKET).createSignedUploadUrl(storagePath);
    if (signErr || !signed) {
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error({
            event: 'storage.presign.failed',
            invite_id: inviteId,
            error: signErr?.message
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serverError"])('storage_error');
    }
    const assetId = crypto.randomUUID();
    const { error } = await service.from('media_assets').insert({
        id: assetId,
        invite_id: inviteId,
        kind,
        status: 'uploading',
        storage_key: storagePath,
        variants: {},
        mime,
        bytes: bytes ?? null
    });
    if (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error({
            event: 'media_asset.insert.failed',
            invite_id: inviteId,
            error: error.message
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serverError"])();
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info({
        event: 'media.upload_initiated',
        kind,
        via: 'storage',
        invite_id: inviteId
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ok"])({
        asset_id: assetId,
        upload_url: signed.signedUrl,
        upload_token: signed.token,
        storage_path: storagePath,
        upload_method: 'PUT'
    }, 201);
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__6e2c4d24._.js.map