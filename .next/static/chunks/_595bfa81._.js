(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/lib/builder/api.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ApiError": (()=>ApiError),
    "api": (()=>api),
    "claimStore": (()=>claimStore),
    "euros": (()=>euros),
    "lineItemLabel": (()=>lineItemLabel),
    "pollAsset": (()=>pollAsset),
    "uploadFile": (()=>uploadFile)
});
'use client';
class ApiError extends Error {
    status;
    code;
    constructor(status, code){
        super(code);
        this.status = status;
        this.code = code;
    }
}
// ── claim-token storage ──────────────────────────────────────────────────────
const TOKEN_PREFIX = 'di:claim:';
const LAST_INVITE_KEY = 'di:last-invite';
const claimStore = {
    get (inviteId) {
        try {
            return localStorage.getItem(TOKEN_PREFIX + inviteId);
        } catch  {
            return null;
        }
    },
    set (inviteId, token) {
        try {
            localStorage.setItem(TOKEN_PREFIX + inviteId, token);
            localStorage.setItem(LAST_INVITE_KEY, inviteId);
        } catch  {}
    },
    clear (inviteId) {
        try {
            localStorage.removeItem(TOKEN_PREFIX + inviteId);
        } catch  {}
    },
    lastInviteId () {
        try {
            return localStorage.getItem(LAST_INVITE_KEY);
        } catch  {
            return null;
        }
    }
};
// ── request core ─────────────────────────────────────────────────────────────
async function request(path, opts = {}) {
    const headers = {};
    if (opts.body !== undefined) headers['Content-Type'] = 'application/json';
    if (opts.inviteId) {
        const token = claimStore.get(opts.inviteId);
        if (token) headers['X-Claim-Token'] = token;
    }
    const res = await fetch(path, {
        method: opts.method ?? 'GET',
        headers,
        body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined
    });
    if (res.status === 204) return undefined;
    let payload = null;
    try {
        payload = await res.json();
    } catch  {}
    if (!res.ok) {
        const code = payload?.error ?? `http_${res.status}`;
        throw new ApiError(res.status, code);
    }
    return payload;
}
const api = {
    plans: ()=>request('/api/plans'),
    themes: ()=>request('/api/themes'),
    extrasCatalog: ()=>request('/api/extras'),
    createInvite: (input)=>request('/api/invites', {
            method: 'POST',
            body: input
        }),
    getInvite: (id)=>request(`/api/invites/${id}`, {
            inviteId: id
        }),
    patchInvite: (id, fields)=>request(`/api/invites/${id}`, {
            method: 'PATCH',
            body: fields,
            inviteId: id
        }),
    getQuote: (id)=>request(`/api/invites/${id}/quote`, {
            inviteId: id
        }),
    listSections: (id)=>request(`/api/invites/${id}/sections`, {
            inviteId: id
        }),
    addSection: (id, type, config = {})=>request(`/api/invites/${id}/sections`, {
            method: 'POST',
            body: {
                type,
                config
            },
            inviteId: id
        }),
    patchSection: (id, sectionId, config)=>request(`/api/invites/${id}/sections/${sectionId}`, {
            method: 'PATCH',
            body: {
                config
            },
            inviteId: id
        }),
    deleteSection: (id, sectionId)=>request(`/api/invites/${id}/sections/${sectionId}`, {
            method: 'DELETE',
            inviteId: id
        }),
    listExtras: (id)=>request(`/api/invites/${id}/extras`, {
            inviteId: id
        }),
    addExtra: (id, extraId)=>request(`/api/invites/${id}/extras`, {
            method: 'POST',
            body: {
                extra_id: extraId,
                quantity: 1
            },
            inviteId: id
        }),
    removeExtra: (id, inviteExtraId)=>request(`/api/invites/${id}/extras/${inviteExtraId}`, {
            method: 'DELETE',
            inviteId: id
        }),
    listMedia: (id)=>request(`/api/invites/${id}/media`, {
            inviteId: id
        }),
    initiateUpload: (id, input)=>request(`/api/invites/${id}/media`, {
            method: 'POST',
            body: input,
            inviteId: id
        }),
    completeUpload: (id, assetId)=>request(`/api/invites/${id}/media/${assetId}/complete`, {
            method: 'POST',
            body: {},
            inviteId: id
        }),
    getAsset: (id, assetId)=>request(`/api/invites/${id}/media/${assetId}`, {
            inviteId: id
        }),
    claim: (id, claimToken)=>request(`/api/invites/${id}/claim`, {
            method: 'POST',
            body: {
                claim_token: claimToken
            }
        }),
    checkout: (id)=>request(`/api/invites/${id}/checkout`, {
            method: 'POST',
            inviteId: id
        }),
    verifyPayment: (id, sessionId)=>request(`/api/invites/${id}/verify-payment?session_id=${encodeURIComponent(sessionId)}`, {
            inviteId: id
        })
};
// ── upload pipeline ──────────────────────────────────────────────────────────
const MUX_KINDS = [
    'opening_video',
    'hero_video'
];
async function uploadFile(inviteId, kind, file) {
    const ticket = await api.initiateUpload(inviteId, {
        kind,
        filename: file.name,
        mime: file.type || 'application/octet-stream',
        bytes: file.size
    });
    const putRes = await fetch(ticket.upload_url, {
        method: 'PUT',
        body: file,
        headers: MUX_KINDS.includes(kind) ? {} : {
            'Content-Type': file.type || 'application/octet-stream'
        }
    });
    if (!putRes.ok) throw new ApiError(putRes.status, 'upload_failed');
    // Mux finalizes via webhook; storage kinds are finalized by us
    if (!MUX_KINDS.includes(kind)) {
        await api.completeUpload(inviteId, ticket.asset_id);
    }
    return ticket.asset_id;
}
function pollAsset(inviteId, assetId, onUpdate, intervalMs = 3000) {
    let stopped = false;
    const tick = async ()=>{
        if (stopped) return;
        try {
            const asset = await api.getAsset(inviteId, assetId);
            onUpdate(asset);
            if (asset.status === 'ready' || asset.status === 'failed') return;
        } catch  {}
        if (!stopped) setTimeout(tick, intervalMs);
    };
    tick();
    return ()=>{
        stopped = true;
    };
}
function euros(cents) {
    const v = cents / 100;
    return Number.isInteger(v) ? `€${v}` : `€${v.toFixed(2)}`;
}
function lineItemLabel(label, planName) {
    if (label.startsWith('plan:')) return planName ?? 'Your invitation';
    const code = label.replace(/^extra:/, '');
    if (code === 'section_overage') return 'Additional sections';
    if (code === 'custom_video') return 'Custom film';
    return code.replace(/_/g, ' ').replace(/^./, (c)=>c.toUpperCase());
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/builder/builder-provider.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "BuilderProvider": (()=>BuilderProvider),
    "useBuilder": (()=>useBuilder)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/builder/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const BuilderContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function useBuilder() {
    _s();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(BuilderContext);
    if (!ctx) throw new Error('useBuilder must be used within BuilderProvider');
    return ctx;
}
_s(useBuilder, "/dMy7t63NXD4eYACoT93CePwGrg=");
const AUTOSAVE_MS = 800;
function BuilderProvider({ inviteId, children }) {
    _s1();
    const [invite, setInvite] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [sections, setSections] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [quote, setQuote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [plan, setPlan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [extrasCatalog, setExtrasCatalog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [inviteExtras, setInviteExtras] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [media, setMedia] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [loadError, setLoadError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [saveState, setSaveState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('idle');
    // ── initial load ───────────────────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BuilderProvider.useEffect": ()=>{
            let cancelled = false;
            ({
                "BuilderProvider.useEffect": async ()=>{
                    try {
                        const [inv, secs, plans, themes, catalog, ext, med] = await Promise.all([
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].getInvite(inviteId),
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].listSections(inviteId),
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].plans(),
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].themes(),
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].extrasCatalog().catch({
                                "BuilderProvider.useEffect": ()=>[]
                            }["BuilderProvider.useEffect"]),
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].listExtras(inviteId).catch({
                                "BuilderProvider.useEffect": ()=>[]
                            }["BuilderProvider.useEffect"]),
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].listMedia(inviteId).catch({
                                "BuilderProvider.useEffect": ()=>[]
                            }["BuilderProvider.useEffect"])
                        ]);
                        if (cancelled) return;
                        setInvite(inv);
                        setSections(secs);
                        setPlan(plans.find({
                            "BuilderProvider.useEffect": (p)=>p.id === inv.plan_id
                        }["BuilderProvider.useEffect"]) ?? plans[0] ?? null);
                        setTheme(themes.find({
                            "BuilderProvider.useEffect": (t)=>t.id === inv.theme_id
                        }["BuilderProvider.useEffect"]) ?? null);
                        setExtrasCatalog(catalog);
                        setInviteExtras(ext);
                        setMedia(med);
                        try {
                            setQuote(await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].getQuote(inviteId));
                        } catch  {}
                    } catch (err) {
                        if (!cancelled) {
                            setLoadError(err instanceof Error ? err.message : 'load_failed');
                        }
                    } finally{
                        if (!cancelled) setLoading(false);
                    }
                }
            })["BuilderProvider.useEffect"]();
            return ({
                "BuilderProvider.useEffect": ()=>{
                    cancelled = true;
                }
            })["BuilderProvider.useEffect"];
        }
    }["BuilderProvider.useEffect"], [
        inviteId
    ]);
    // ── debounced draft autosave ───────────────────────────────────────────────
    const pendingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({});
    const timerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const savedFadeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const flushDraft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BuilderProvider.useCallback[flushDraft]": async ()=>{
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
            const fields = pendingRef.current;
            if (Object.keys(fields).length === 0) return;
            pendingRef.current = {};
            setSaveState('saving');
            try {
                const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].patchInvite(inviteId, fields);
                setInvite(updated);
                setSaveState('saved');
                if (savedFadeRef.current) clearTimeout(savedFadeRef.current);
                savedFadeRef.current = setTimeout({
                    "BuilderProvider.useCallback[flushDraft]": ()=>setSaveState('idle')
                }["BuilderProvider.useCallback[flushDraft]"], 2000);
            } catch  {
                // Put the fields back so the next edit retries them
                pendingRef.current = {
                    ...fields,
                    ...pendingRef.current
                };
                setSaveState('error');
            }
        }
    }["BuilderProvider.useCallback[flushDraft]"], [
        inviteId
    ]);
    const patchDraft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BuilderProvider.useCallback[patchDraft]": (fields)=>{
            setInvite({
                "BuilderProvider.useCallback[patchDraft]": (prev)=>prev ? {
                        ...prev,
                        ...fields
                    } : prev
            }["BuilderProvider.useCallback[patchDraft]"]);
            pendingRef.current = {
                ...pendingRef.current,
                ...fields
            };
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout({
                "BuilderProvider.useCallback[patchDraft]": ()=>{
                    void flushDraft();
                }
            }["BuilderProvider.useCallback[patchDraft]"], AUTOSAVE_MS);
        }
    }["BuilderProvider.useCallback[patchDraft]"], [
        flushDraft
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BuilderProvider.useEffect": ()=>({
                "BuilderProvider.useEffect": ()=>{
                    if (timerRef.current) clearTimeout(timerRef.current);
                    if (savedFadeRef.current) clearTimeout(savedFadeRef.current);
                }
            })["BuilderProvider.useEffect"]
    }["BuilderProvider.useEffect"], []);
    // ── quote ──────────────────────────────────────────────────────────────────
    const refreshQuote = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BuilderProvider.useCallback[refreshQuote]": async ()=>{
            try {
                setQuote(await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].getQuote(inviteId));
            } catch  {}
        }
    }["BuilderProvider.useCallback[refreshQuote]"], [
        inviteId
    ]);
    // ── opening section (names/video/music presentation) ──────────────────────
    const opening = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BuilderProvider.useMemo[opening]": ()=>sections.find({
                "BuilderProvider.useMemo[opening]": (s)=>s.type === 'opening'
            }["BuilderProvider.useMemo[opening]"]) ?? null
    }["BuilderProvider.useMemo[opening]"], [
        sections
    ]);
    const openingPatchTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const openingCreating = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const setOpening = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BuilderProvider.useCallback[setOpening]": (partial)=>{
            const existing = sections.find({
                "BuilderProvider.useCallback[setOpening].existing": (s)=>s.type === 'opening'
            }["BuilderProvider.useCallback[setOpening].existing"]);
            if (existing) {
                const merged = {
                    ...existing.config,
                    ...partial
                };
                setSections({
                    "BuilderProvider.useCallback[setOpening]": (prev)=>prev.map({
                            "BuilderProvider.useCallback[setOpening]": (s)=>s.id === existing.id ? {
                                    ...s,
                                    config: merged
                                } : s
                        }["BuilderProvider.useCallback[setOpening]"])
                }["BuilderProvider.useCallback[setOpening]"]);
                // PATCH replaces config wholesale — always send the full merged object
                if (openingPatchTimer.current) clearTimeout(openingPatchTimer.current);
                openingPatchTimer.current = setTimeout({
                    "BuilderProvider.useCallback[setOpening]": ()=>{
                        setSaveState('saving');
                        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].patchSection(inviteId, existing.id, merged).then({
                            "BuilderProvider.useCallback[setOpening]": ()=>{
                                setSaveState('saved');
                                setTimeout({
                                    "BuilderProvider.useCallback[setOpening]": ()=>setSaveState('idle')
                                }["BuilderProvider.useCallback[setOpening]"], 2000);
                            }
                        }["BuilderProvider.useCallback[setOpening]"]).catch({
                            "BuilderProvider.useCallback[setOpening]": ()=>setSaveState('error')
                        }["BuilderProvider.useCallback[setOpening]"]);
                    }
                }["BuilderProvider.useCallback[setOpening]"], AUTOSAVE_MS);
                return;
            }
            if (openingCreating.current) return;
            openingCreating.current = true;
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].addSection(inviteId, 'opening', partial).then({
                "BuilderProvider.useCallback[setOpening]": (created)=>{
                    setSections({
                        "BuilderProvider.useCallback[setOpening]": (prev)=>[
                                ...prev,
                                created
                            ]
                    }["BuilderProvider.useCallback[setOpening]"]);
                    void refreshQuote();
                }
            }["BuilderProvider.useCallback[setOpening]"]).catch({
                "BuilderProvider.useCallback[setOpening]": ()=>{}
            }["BuilderProvider.useCallback[setOpening]"]).finally({
                "BuilderProvider.useCallback[setOpening]": ()=>{
                    openingCreating.current = false;
                }
            }["BuilderProvider.useCallback[setOpening]"]);
        }
    }["BuilderProvider.useCallback[setOpening]"], [
        inviteId,
        sections,
        refreshQuote
    ]);
    // ── content sections ───────────────────────────────────────────────────────
    const addContentSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BuilderProvider.useCallback[addContentSection]": async (type)=>{
            const created = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].addSection(inviteId, type);
            setSections({
                "BuilderProvider.useCallback[addContentSection]": (prev)=>[
                        ...prev,
                        created
                    ]
            }["BuilderProvider.useCallback[addContentSection]"]);
            void refreshQuote();
        }
    }["BuilderProvider.useCallback[addContentSection]"], [
        inviteId,
        refreshQuote
    ]);
    const removeContentSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BuilderProvider.useCallback[removeContentSection]": async (type)=>{
            const target = sections.find({
                "BuilderProvider.useCallback[removeContentSection].target": (s)=>s.type === type
            }["BuilderProvider.useCallback[removeContentSection].target"]);
            if (!target) return;
            setSections({
                "BuilderProvider.useCallback[removeContentSection]": (prev)=>prev.filter({
                        "BuilderProvider.useCallback[removeContentSection]": (s)=>s.id !== target.id
                    }["BuilderProvider.useCallback[removeContentSection]"])
            }["BuilderProvider.useCallback[removeContentSection]"]);
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].deleteSection(inviteId, target.id);
            } catch  {
                setSections({
                    "BuilderProvider.useCallback[removeContentSection]": (prev)=>[
                            ...prev,
                            target
                        ]
                }["BuilderProvider.useCallback[removeContentSection]"]) // restore on failure
                ;
            }
            void refreshQuote();
        }
    }["BuilderProvider.useCallback[removeContentSection]"], [
        inviteId,
        sections,
        refreshQuote
    ]);
    const sectionTimers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const updateSectionConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BuilderProvider.useCallback[updateSectionConfig]": (sectionId, config)=>{
            setSections({
                "BuilderProvider.useCallback[updateSectionConfig]": (prev)=>prev.map({
                        "BuilderProvider.useCallback[updateSectionConfig]": (s)=>s.id === sectionId ? {
                                ...s,
                                config
                            } : s
                    }["BuilderProvider.useCallback[updateSectionConfig]"])
            }["BuilderProvider.useCallback[updateSectionConfig]"]);
            const timers = sectionTimers.current;
            const existing = timers.get(sectionId);
            if (existing) clearTimeout(existing);
            timers.set(sectionId, setTimeout({
                "BuilderProvider.useCallback[updateSectionConfig]": ()=>{
                    timers.delete(sectionId);
                    setSaveState('saving');
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].patchSection(inviteId, sectionId, config).then({
                        "BuilderProvider.useCallback[updateSectionConfig]": ()=>{
                            setSaveState('saved');
                            setTimeout({
                                "BuilderProvider.useCallback[updateSectionConfig]": ()=>setSaveState('idle')
                            }["BuilderProvider.useCallback[updateSectionConfig]"], 2000);
                        }
                    }["BuilderProvider.useCallback[updateSectionConfig]"]).catch({
                        "BuilderProvider.useCallback[updateSectionConfig]": ()=>setSaveState('error')
                    }["BuilderProvider.useCallback[updateSectionConfig]"]);
                }
            }["BuilderProvider.useCallback[updateSectionConfig]"], AUTOSAVE_MS));
        }
    }["BuilderProvider.useCallback[updateSectionConfig]"], [
        inviteId
    ]);
    // ── extras ─────────────────────────────────────────────────────────────────
    const toggleExtra = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BuilderProvider.useCallback[toggleExtra]": async (item)=>{
            const existing = inviteExtras.find({
                "BuilderProvider.useCallback[toggleExtra].existing": (e)=>e.extra_id === item.id
            }["BuilderProvider.useCallback[toggleExtra].existing"]);
            if (existing) {
                setInviteExtras({
                    "BuilderProvider.useCallback[toggleExtra]": (prev)=>prev.filter({
                            "BuilderProvider.useCallback[toggleExtra]": (e)=>e.id !== existing.id
                        }["BuilderProvider.useCallback[toggleExtra]"])
                }["BuilderProvider.useCallback[toggleExtra]"]);
                try {
                    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].removeExtra(inviteId, existing.id);
                } catch  {
                    setInviteExtras({
                        "BuilderProvider.useCallback[toggleExtra]": (prev)=>[
                                ...prev,
                                existing
                            ]
                    }["BuilderProvider.useCallback[toggleExtra]"]);
                }
            } else {
                try {
                    const added = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].addExtra(inviteId, item.id);
                    setInviteExtras({
                        "BuilderProvider.useCallback[toggleExtra]": (prev)=>[
                                ...prev,
                                added
                            ]
                    }["BuilderProvider.useCallback[toggleExtra]"]);
                } catch  {}
            }
            void refreshQuote();
        }
    }["BuilderProvider.useCallback[toggleExtra]"], [
        inviteId,
        inviteExtras,
        refreshQuote
    ]);
    // ── media ──────────────────────────────────────────────────────────────────
    const refreshMedia = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BuilderProvider.useCallback[refreshMedia]": async ()=>{
            try {
                setMedia(await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].listMedia(inviteId));
            } catch  {}
        }
    }["BuilderProvider.useCallback[refreshMedia]"], [
        inviteId
    ]);
    const setMediaAsset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BuilderProvider.useCallback[setMediaAsset]": (asset)=>{
            setMedia({
                "BuilderProvider.useCallback[setMediaAsset]": (prev)=>{
                    const idx = prev.findIndex({
                        "BuilderProvider.useCallback[setMediaAsset].idx": (m)=>m.id === asset.id
                    }["BuilderProvider.useCallback[setMediaAsset].idx"]);
                    if (idx === -1) return [
                        ...prev,
                        asset
                    ];
                    const next = [
                        ...prev
                    ];
                    next[idx] = asset;
                    return next;
                }
            }["BuilderProvider.useCallback[setMediaAsset]"]);
        }
    }["BuilderProvider.useCallback[setMediaAsset]"], []);
    const value = {
        inviteId,
        invite,
        sections,
        quote,
        plan,
        theme,
        extrasCatalog,
        inviteExtras,
        media,
        loading,
        loadError,
        saveState,
        patchDraft,
        flushDraft,
        opening,
        setOpening,
        addContentSection,
        removeContentSection,
        updateSectionConfig,
        toggleExtra,
        refreshQuote,
        refreshMedia,
        setMediaAsset
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BuilderContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/builder/builder-provider.tsx",
        lineNumber: 304,
        columnNumber: 10
    }, this);
}
_s1(BuilderProvider, "Ymf9DPhkHW8LaSFW5VqzEVlBr64=");
_c = BuilderProvider;
var _c;
__turbopack_context__.k.register(_c, "BuilderProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/builder/step-transition.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "StepTransition": (()=>StepTransition)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function StepTransition({ children }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        mode: "wait",
        initial: false,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: reduced ? {
                opacity: 0
            } : {
                opacity: 0,
                x: 24
            },
            animate: {
                opacity: 1,
                x: 0
            },
            exit: reduced ? {
                opacity: 0
            } : {
                opacity: 0,
                x: -16
            },
            transition: {
                duration: 0.45,
                ease: [
                    0.22,
                    1,
                    0.36,
                    1
                ]
            },
            children: children
        }, pathname, false, {
            fileName: "[project]/components/builder/step-transition.tsx",
            lineNumber: 15,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/builder/step-transition.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_s(StepTransition, "usXn/21ljoPR0cxzeGD9bofT314=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"]
    ];
});
_c = StepTransition;
var _c;
__turbopack_context__.k.register(_c, "StepTransition");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/builder/builder-shell.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "BuilderShell": (()=>BuilderShell)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$builder$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/builder-provider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$step$2d$transition$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/step-transition.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
// Skeleton that renders while the BuilderProvider is loading initial data.
// Uses a pure-CSS shimmer animation so it works without JS animation deps.
function SkeletonShimmer() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: " fixed z-30 inset-x-0 bottom-0 lg:inset-x-auto lg:right-6 lg:top-16 lg:bottom-6 lg:w-[420px] flex flex-col rounded-t-[26px] lg:rounded-[26px] max-h-[74dvh] lg:max-h-none overflow-hidden ",
        style: {
            background: '#F3EFE7',
            boxShadow: '0 -12px 48px rgba(26,24,22,0.14), 0 2px 8px rgba(26,24,22,0.05)'
        },
        "aria-busy": "true",
        "aria-label": "Loading your invitation builder…",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center pt-3 lg:hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-1 w-9 rounded-full",
                    style: {
                        background: 'rgba(26,24,22,0.12)'
                    }
                }, void 0, false, {
                    fileName: "[project]/components/builder/builder-shell.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/builder/builder-shell.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes shimmer {
          0%   { background-position: -600px 0; }
          100% { background-position:  600px 0; }
        }
        .shimmer-bar {
          border-radius: 6px;
          background: linear-gradient(
            90deg,
            rgba(26,24,22,0.06) 0%,
            rgba(26,24,22,0.11) 40%,
            rgba(26,24,22,0.06) 80%
          );
          background-size: 600px 100%;
          animation: shimmer 1.6s infinite linear;
        }
      `
            }, void 0, false, {
                fileName: "[project]/components/builder/builder-shell.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 px-6 pt-5 pb-3 lg:px-8 lg:pt-8 flex flex-col gap-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "shimmer-bar h-8 w-3/4"
                    }, void 0, false, {
                        fileName: "[project]/components/builder/builder-shell.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "shimmer-bar h-3 w-full"
                            }, void 0, false, {
                                fileName: "[project]/components/builder/builder-shell.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "shimmer-bar h-3 w-2/3"
                            }, void 0, false, {
                                fileName: "[project]/components/builder/builder-shell.tsx",
                                lineNumber: 55,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/builder/builder-shell.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-4 mt-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "shimmer-bar h-12 w-full rounded-xl"
                            }, void 0, false, {
                                fileName: "[project]/components/builder/builder-shell.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "shimmer-bar h-12 w-full rounded-xl"
                            }, void 0, false, {
                                fileName: "[project]/components/builder/builder-shell.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "shimmer-bar h-12 w-full rounded-xl"
                            }, void 0, false, {
                                fileName: "[project]/components/builder/builder-shell.tsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/builder/builder-shell.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/builder/builder-shell.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 pb-6 lg:px-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "shimmer-bar h-12 w-full rounded-full"
                }, void 0, false, {
                    fileName: "[project]/components/builder/builder-shell.tsx",
                    lineNumber: 67,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/builder/builder-shell.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/builder/builder-shell.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_c = SkeletonShimmer;
function ErrorState({ message, onRetry }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: " fixed z-30 inset-x-0 bottom-0 lg:inset-x-auto lg:right-6 lg:top-16 lg:bottom-6 lg:w-[420px] flex flex-col items-center justify-center gap-5 rounded-t-[26px] lg:rounded-[26px] max-h-[74dvh] lg:max-h-none p-8 ",
        style: {
            background: '#F3EFE7',
            boxShadow: '0 -12px 48px rgba(26,24,22,0.14), 0 2px 8px rgba(26,24,22,0.05)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-cormorant font-light text-center leading-snug",
                style: {
                    fontSize: 22,
                    color: '#1A1816'
                },
                children: "We couldn’t load your invitation"
            }, void 0, false, {
                fileName: "[project]/components/builder/builder-shell.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-inter text-center",
                style: {
                    fontSize: 12,
                    color: 'rgba(26,24,22,0.5)'
                },
                children: message
            }, void 0, false, {
                fileName: "[project]/components/builder/builder-shell.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: onRetry,
                className: "rounded-full px-6 py-3 font-inter",
                style: {
                    background: '#A8854B',
                    color: '#FDFCF9',
                    fontSize: 13,
                    letterSpacing: '0.04em',
                    boxShadow: '0 6px 20px rgba(168,133,75,0.32)'
                },
                children: "Try again"
            }, void 0, false, {
                fileName: "[project]/components/builder/builder-shell.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/builder/builder-shell.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, this);
}
_c1 = ErrorState;
function BuilderShell({ children }) {
    _s();
    const { loading, loadError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$builder$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBuilder"])();
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonShimmer, {}, void 0, false, {
        fileName: "[project]/components/builder/builder-shell.tsx",
        lineNumber: 120,
        columnNumber: 23
    }, this);
    if (loadError) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ErrorState, {
            message: loadError,
            onRetry: ()=>window.location.reload()
        }, void 0, false, {
            fileName: "[project]/components/builder/builder-shell.tsx",
            lineNumber: 124,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$step$2d$transition$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StepTransition"], {
        children: children
    }, void 0, false, {
        fileName: "[project]/components/builder/builder-shell.tsx",
        lineNumber: 131,
        columnNumber: 10
    }, this);
}
_s(BuilderShell, "RGQaJKNeBLblhS3p1mqTmgi8nbw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$builder$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBuilder"]
    ];
});
_c2 = BuilderShell;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "SkeletonShimmer");
__turbopack_context__.k.register(_c1, "ErrorState");
__turbopack_context__.k.register(_c2, "BuilderShell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/builder/presets.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// Real FULL-HD wedding film presets. Sources are Pexels CDN (free license,
// CORS: access-control-allow-origin: *), served at 1080p to stay smooth.
// Every consumer degrades gracefully: posterImg paints instantly, then the
// gradient `poster` is the final fallback if both image and video fail.
__turbopack_context__.s({
    "CONTENT_SECTIONS": (()=>CONTENT_SECTIONS),
    "DEFAULT_HEADING_FONT": (()=>DEFAULT_HEADING_FONT),
    "DEFAULT_PALETTE": (()=>DEFAULT_PALETTE),
    "HEADING_FONTS": (()=>HEADING_FONTS),
    "HEADING_FONT_MAP": (()=>HEADING_FONT_MAP),
    "MUSIC_TRACKS": (()=>MUSIC_TRACKS),
    "PALETTES": (()=>PALETTES),
    "PALETTE_MAP": (()=>PALETTE_MAP),
    "SECTION_LABELS": (()=>SECTION_LABELS),
    "VIDEO_PRESETS": (()=>VIDEO_PRESETS)
});
const pexelsVideo = (id, file)=>`https://videos.pexels.com/video-files/${id}/${file}`;
// Older clips expose `pexels-photo-{id}.jpeg`; newer ones only expose the
// auto-generated `pictures/preview-0.jpg`. Use whichever a given clip serves.
const pexelsPoster = (id)=>`https://images.pexels.com/videos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1280`;
const pexelsPreview = (id)=>`https://images.pexels.com/videos/${id}/pictures/preview-0.jpg`;
// Some newer clips serve the preview still as `.jpeg` (not `.jpg`).
const pexelsPreviewJpeg = (id)=>`https://images.pexels.com/videos/${id}/pictures/preview-0.jpeg`;
const VIDEO_PRESETS = [
    {
        // id kept stable for existing drafts; content is now a lush floral ceremony
        // arch (no faces) — same elegant, bloom-forward style as The Vows.
        id: 'golden-hour',
        name: 'In Bloom',
        mood: 'An arch of flowers',
        src: pexelsVideo('33113979', '14114596_1920_1080_25fps.mp4'),
        posterImg: pexelsPreview('33113979'),
        poster: {
            from: '#E7D8DC',
            to: '#B9A7A0'
        },
        ink: '#FDFCF9'
    },
    {
        id: 'first-dance',
        name: 'First Dance',
        mood: 'Held close, swaying',
        src: pexelsVideo('8775886', '8775886-hd_1920_1080_25fps.mp4'),
        posterImg: pexelsPoster('8775886'),
        poster: {
            from: '#E2D2BE',
            to: '#A98C66'
        },
        ink: '#FDFCF9'
    },
    {
        // now an empty white-flower ceremony aisle (no faces)
        id: 'the-vows',
        name: 'The Vows',
        mood: 'An aisle in bloom',
        src: pexelsVideo('27979648', '12279941_1920_1080_25fps.mp4'),
        posterImg: pexelsPreview('27979648'),
        poster: {
            from: '#EAF0EE',
            to: '#C2D0CB'
        },
        ink: '#FDFCF9'
    },
    {
        id: 'the-rings',
        name: 'The Rings',
        mood: 'Vows and promises',
        src: pexelsVideo('8776123', '8776123-hd_1920_1080_25fps.mp4'),
        posterImg: pexelsPoster('8776123'),
        poster: {
            from: '#1E1A16',
            to: '#3A2E22'
        },
        ink: '#FDFCF9'
    },
    {
        // now an aerial of an outdoor wedding venue at golden dusk (no faces)
        id: 'open-air',
        name: 'Open Air',
        mood: 'The venue, from above',
        src: pexelsVideo('11038003', '11038003-hd_2560_1440_24fps.mp4'),
        posterImg: pexelsPreviewJpeg('11038003'),
        poster: {
            from: '#4A5142',
            to: '#23291F'
        },
        ink: '#FDFCF9'
    },
    {
        // now a grand, flower-dressed wedding stage / setting (no faces)
        id: 'eternal',
        name: 'Eternal',
        mood: 'A stage in bloom',
        src: pexelsVideo('13038199', '13038199-hd_1920_1080_25fps.mp4'),
        posterImg: pexelsPreviewJpeg('13038199'),
        poster: {
            from: '#E8D2B8',
            to: '#B98E6A'
        },
        ink: '#FDFCF9'
    },
    // ── Signature openers (paired with the three signature aesthetics) ──────────
    {
        id: 'the-letter',
        name: 'The Letter',
        mood: 'Candlelit, intimate, written',
        src: pexelsVideo('7343467', '7343467-hd_1920_1080_25fps.mp4'),
        posterImg: pexelsPoster('7343467'),
        poster: {
            from: '#F5EDD8',
            to: '#8B4A2A'
        },
        ink: '#2A1F12'
    },
    {
        // now an aerial of an elegant outdoor reception, tables set (no faces).
        // id kept stable; the lifting-veil opener still uses this as its backdrop film.
        id: 'the-veil',
        name: 'The Reception',
        mood: 'Tables set under the sky',
        src: pexelsVideo('8442722', '8442722-hd_1920_1080_30fps.mp4'),
        posterImg: pexelsPreviewJpeg('8442722'),
        poster: {
            from: '#46503C',
            to: '#22271C'
        },
        ink: '#FDFCF9'
    }
];
const MUSIC_TRACKS = [
    {
        id: 'aisle',
        title: 'Down the aisle',
        mood: 'Tender',
        duration: '2:41',
        src: 'https://cdn.pixabay.com/audio/2022/10/25/audio_946bc8f1a2.mp3'
    },
    {
        id: 'vows',
        title: 'The vows',
        mood: 'Intimate',
        duration: '3:05',
        src: 'https://cdn.pixabay.com/audio/2022/03/10/audio_5ad6e6fe69.mp3'
    },
    {
        id: 'first-look',
        title: 'First look',
        mood: 'Hopeful',
        duration: '2:18',
        src: 'https://cdn.pixabay.com/audio/2021/11/25/audio_91b32e02f9.mp3'
    },
    {
        id: 'evening',
        title: 'Into the evening',
        mood: 'Warm',
        duration: '3:24',
        src: 'https://cdn.pixabay.com/audio/2022/08/02/audio_884fe92c21.mp3'
    },
    {
        id: 'lanterns',
        title: 'Paper lanterns',
        mood: 'Quiet joy',
        duration: '2:52',
        src: 'https://cdn.pixabay.com/audio/2022/02/22/audio_d1718ab41b.mp3'
    }
];
const CONTENT_SECTIONS = [
    {
        type: 'story',
        label: 'Your story',
        blurb: 'How you met, in your own words.'
    },
    {
        type: 'schedule',
        label: 'The day',
        blurb: 'Ceremony, dinner, dancing — when things happen.'
    },
    {
        type: 'venue',
        label: 'The venue',
        blurb: 'Where to be, with the address.'
    },
    {
        type: 'gallery',
        label: 'Photos',
        blurb: 'A few favourite pictures of you two.'
    },
    {
        type: 'travel',
        label: 'Getting there',
        blurb: 'Travel and hotel tips for guests from afar.'
    },
    {
        type: 'gifts',
        label: 'Gifts',
        blurb: 'A gentle note about gifts or contributions.'
    },
    {
        type: 'dress_code',
        label: 'What to wear',
        blurb: 'Help guests dress for the occasion.'
    },
    {
        type: 'faq',
        label: 'Questions',
        blurb: 'Parking, children, dietary needs — the practical bits.'
    }
];
const SECTION_LABELS = Object.fromEntries(_c1 = CONTENT_SECTIONS.map(_c = (s)=>[
        s.type,
        s.label
    ]));
_c2 = SECTION_LABELS;
const PALETTES = [
    {
        id: 'ivory-gold',
        name: 'Ivory & Gold',
        accent: '#A8854B',
        accentSoft: 'rgba(168,133,75,0.14)',
        paper: '#FDFCF9',
        ink: '#1A1816',
        wash: '#FAF4EB',
        washAlt: '#F4EFE5',
        swatch: [
            '#FAF4EB',
            '#A8854B',
            '#1A1816'
        ],
        layout: 'classic'
    },
    {
        id: 'blush',
        name: 'Blush Romance',
        accent: '#B07A6E',
        accentSoft: 'rgba(176,122,110,0.14)',
        paper: '#FFFAF8',
        ink: '#3A2A28',
        wash: '#FBEFEA',
        washAlt: '#F6E4DD',
        swatch: [
            '#FBEFEA',
            '#B07A6E',
            '#3A2A28'
        ],
        layout: 'classic'
    },
    {
        id: 'sage',
        name: 'Sage Garden',
        accent: '#7C8B6B',
        accentSoft: 'rgba(124,139,107,0.16)',
        paper: '#FBFCF8',
        ink: '#2A2E24',
        wash: '#F1F4EA',
        washAlt: '#E7ECDC',
        swatch: [
            '#F1F4EA',
            '#7C8B6B',
            '#2A2E24'
        ],
        layout: 'ethereal'
    },
    {
        id: 'midnight',
        name: 'Midnight & Pearl',
        accent: '#C2A878',
        accentSoft: 'rgba(194,168,120,0.18)',
        paper: '#1E2530',
        ink: '#ECEAE3',
        wash: '#222B38',
        washAlt: '#1A222E',
        swatch: [
            '#222B38',
            '#C2A878',
            '#ECEAE3'
        ],
        dark: true,
        layout: 'editorial'
    },
    {
        id: 'terracotta',
        name: 'Tuscan Terracotta',
        accent: '#B5683C',
        accentSoft: 'rgba(181,104,60,0.15)',
        paper: '#FFF8F2',
        ink: '#3C281D',
        wash: '#FBEBDD',
        washAlt: '#F5DEC9',
        swatch: [
            '#FBEBDD',
            '#B5683C',
            '#3C281D'
        ],
        layout: 'paper'
    },
    // ── Additional palettes ─────────────────────────────────────────────────────
    {
        id: 'parchment',
        name: 'Parchment & Sienna',
        accent: '#8B4A2A',
        accentSoft: 'rgba(139,74,42,0.13)',
        paper: '#F5EDD8',
        ink: '#2A1F12',
        wash: '#F5EDD8',
        washAlt: '#EFE4CC',
        swatch: [
            '#F5EDD8',
            '#8B4A2A',
            '#2A1F12'
        ],
        layout: 'paper'
    },
    {
        id: 'onyx',
        name: 'Onyx & Gold',
        accent: '#C9A84C',
        accentSoft: 'rgba(201,168,76,0.16)',
        paper: '#2C2C2C',
        ink: '#F2EEE8',
        wash: '#2C2C2C',
        washAlt: '#242424',
        swatch: [
            '#2C2C2C',
            '#C9A84C',
            '#F2EEE8'
        ],
        dark: true,
        layout: 'editorial'
    },
    {
        id: 'rose-veil',
        name: 'Ivory & Rose',
        accent: '#C4927A',
        accentSoft: 'rgba(196,146,122,0.14)',
        paper: '#FAF7F2',
        ink: '#6B5B52',
        wash: '#FAF7F2',
        washAlt: '#F2EBE3',
        swatch: [
            '#FAF7F2',
            '#C4927A',
            '#6B5B52'
        ],
        layout: 'ethereal'
    }
];
const PALETTE_MAP = Object.fromEntries(_c4 = PALETTES.map(_c3 = (p)=>[
        p.id,
        p
    ]));
_c5 = PALETTE_MAP;
const DEFAULT_PALETTE = PALETTES[0];
const HEADING_FONTS = [
    {
        id: 'pinyon',
        name: 'Pinyon',
        var: 'var(--font-pinyon)',
        sample: 'Forever',
        scale: 1.15
    },
    {
        id: 'great-vibes',
        name: 'Great Vibes',
        var: 'var(--font-great-vibes)',
        sample: 'Forever',
        scale: 1.1
    },
    {
        id: 'cormorant',
        name: 'Cormorant',
        var: 'var(--font-cormorant)',
        sample: 'Forever',
        scale: 0.82
    },
    {
        id: 'cormorant-italic',
        name: 'Cormorant Italic',
        var: 'var(--font-cormorant)',
        sample: 'Forever',
        scale: 0.84,
        italic: true
    }
];
const HEADING_FONT_MAP = Object.fromEntries(_c7 = HEADING_FONTS.map(_c6 = (f)=>[
        f.id,
        f
    ]));
_c8 = HEADING_FONT_MAP;
const DEFAULT_HEADING_FONT = HEADING_FONTS[0];
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
__turbopack_context__.k.register(_c, "SECTION_LABELS$Object.fromEntries$CONTENT_SECTIONS.map");
__turbopack_context__.k.register(_c1, "SECTION_LABELS$Object.fromEntries");
__turbopack_context__.k.register(_c2, "SECTION_LABELS");
__turbopack_context__.k.register(_c3, "PALETTE_MAP$Object.fromEntries$PALETTES.map");
__turbopack_context__.k.register(_c4, "PALETTE_MAP$Object.fromEntries");
__turbopack_context__.k.register(_c5, "PALETTE_MAP");
__turbopack_context__.k.register(_c6, "HEADING_FONT_MAP$Object.fromEntries$HEADING_FONTS.map");
__turbopack_context__.k.register(_c7, "HEADING_FONT_MAP$Object.fromEntries");
__turbopack_context__.k.register(_c8, "HEADING_FONT_MAP");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/builder/invite-preview.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "InvitePreview": (()=>InvitePreview)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$builder$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/builder-provider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/builder/presets.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
// The live invitation. It fills the viewport; every step's sheet slides over
// it, and answers re-render it in place. ONE background system: real poster
// paints instantly, the 1080p film fades in once it can play. No second layer.
function formatDate(iso) {
    if (!iso) return null;
    const d = new Date(`${iso}T12:00:00`);
    if (Number.isNaN(d.getTime())) return null;
    return d.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}
function hexA(hex, a) {
    const h = hex.replace('#', '');
    const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}
function InvitePreview() {
    _s();
    const { invite, opening, sections, media } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$builder$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBuilder"])();
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const [videoReady, setVideoReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Aspect-aware fit: edge-to-edge cover when the film roughly matches the
    // viewport, whole-frame contain (+ blurred fill) when a crop would be severe.
    const videoElRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const wrapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [autoFit, setAutoFit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('cover');
    const config = opening?.config ?? {};
    const palette = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PALETTE_MAP"][config.palette ?? ''] ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_PALETTE"];
    const headingFont = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HEADING_FONT_MAP"][config.heading_font ?? ''] ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_HEADING_FONT"];
    const headingStyle = headingFont.italic ? 'italic' : 'normal';
    const darkPaper = !!palette.dark;
    const nameA = (config.name_a ?? '').trim();
    const nameB = (config.name_b ?? '').trim();
    const names = nameA && nameB ? `${nameA} & ${nameB}` : nameA || nameB ? nameA || nameB : invite?.display_title?.trim() || 'Your names';
    const isPlaceholder = !nameA && !nameB && !invite?.display_title?.trim();
    const date = formatDate(invite?.event_date ?? null);
    const preset = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VIDEO_PRESETS"].find((p)=>p.id === config.video_preset) ?? null;
    const uploadedVideo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "InvitePreview.useMemo[uploadedVideo]": ()=>{
            if (!config.video_asset_id) return null;
            return media.find({
                "InvitePreview.useMemo[uploadedVideo]": (m)=>m.id === config.video_asset_id
            }["InvitePreview.useMemo[uploadedVideo]"]) ?? null;
        }
    }["InvitePreview.useMemo[uploadedVideo]"], [
        media,
        config.video_asset_id
    ]);
    const uploadedReady = uploadedVideo?.status === 'ready';
    const uploadedBusy = uploadedVideo != null && (uploadedVideo.status === 'uploading' || uploadedVideo.status === 'processing');
    const uploadedMp4 = uploadedReady ? uploadedVideo.variants.mp4 ?? null : null;
    const uploadedPoster = uploadedReady ? uploadedVideo.variants.poster ?? null : null;
    // Resolve the active film + poster. Uploaded film wins, then chosen preset,
    // then the FIRST preset as the default background — so every step shows a real
    // HD film (not a stretched low-res still) until the couple pick their own.
    const videoSrc = uploadedMp4 ?? preset?.src ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VIDEO_PRESETS"][0].src;
    const posterImg = uploadedPoster ?? preset?.posterImg ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VIDEO_PRESETS"][0].posterImg;
    const gradient = preset ? `linear-gradient(160deg, ${preset.poster.from} 0%, ${preset.poster.to} 100%)` : `linear-gradient(160deg, ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VIDEO_PRESETS"][0].poster.from} 0%, ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VIDEO_PRESETS"][0].poster.to} 100%)`;
    // Custom films are framed by the couple (Frame step → video_fit/video_focal,
    // default 'blend'); presets auto-frame per viewport. This drives the live
    // preview so the Frame step updates in real time.
    const filmMode = uploadedReady ? config.video_fit ?? 'blend' : 'auto';
    // 'crop' is always cover; 'auto'/'blend' adapt per viewport so phones stay
    // edge-to-edge and only wide screens fall back to contain+blur.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "InvitePreview.useEffect": ()=>{
            if (filmMode === 'crop') return;
            const decide = {
                "InvitePreview.useEffect.decide": ()=>{
                    const v = videoElRef.current;
                    const box = wrapRef.current;
                    if (!v || !box || !v.videoWidth || !v.videoHeight) return;
                    const videoRatio = v.videoWidth / v.videoHeight;
                    const boxRatio = box.clientWidth / box.clientHeight || 1;
                    const visible = Math.min(videoRatio, boxRatio) / Math.max(videoRatio, boxRatio);
                    setAutoFit(visible >= 0.8 ? 'cover' : 'contain') // <0.8 visible ⇒ severe crop ⇒ letterbox
                    ;
                }
            }["InvitePreview.useEffect.decide"];
            const v = videoElRef.current;
            decide();
            v?.addEventListener('loadedmetadata', decide);
            window.addEventListener('resize', decide);
            return ({
                "InvitePreview.useEffect": ()=>{
                    v?.removeEventListener('loadedmetadata', decide);
                    window.removeEventListener('resize', decide);
                }
            })["InvitePreview.useEffect"];
        }
    }["InvitePreview.useEffect"], [
        videoSrc,
        filmMode
    ]);
    const fit = filmMode === 'crop' ? 'cover' : autoFit;
    const objectPosition = filmMode === 'crop' && config.video_focal ? `${Math.round(config.video_focal.x * 100)}% ${Math.round(config.video_focal.y * 100)}%` : 'center';
    const track = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MUSIC_TRACKS"].find((t)=>t.id === config.music_track);
    const hasMusic = Boolean(track || config.music_asset_id);
    const enabledSections = sections.filter((s)=>s.type !== 'opening');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: wrapRef,
        className: "fixed inset-0 overflow-hidden",
        "aria-hidden": "true",
        style: {
            background: palette.paper
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0",
                style: {
                    background: gradient
                }
            }, void 0, false, {
                fileName: "[project]/components/builder/invite-preview.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0",
                style: {
                    backgroundImage: `url(${posterImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: videoReady ? 0 : 1,
                    transition: 'opacity 0.8s ease'
                }
            }, void 0, false, {
                fileName: "[project]/components/builder/invite-preview.tsx",
                lineNumber: 137,
                columnNumber: 7
            }, this),
            videoSrc && !reduced && fit === 'contain' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0",
                style: {
                    backgroundImage: `url(${posterImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(34px) saturate(1.12) brightness(0.92)',
                    transform: 'scale(1.18)',
                    opacity: videoReady ? 1 : 0,
                    transition: 'opacity 0.8s ease'
                }
            }, void 0, false, {
                fileName: "[project]/components/builder/invite-preview.tsx",
                lineNumber: 150,
                columnNumber: 9
            }, this),
            videoSrc && !reduced && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].video, {
                ref: videoElRef,
                className: "absolute inset-0 h-full w-full",
                style: {
                    objectFit: fit,
                    objectPosition
                },
                src: videoSrc,
                poster: posterImg,
                preload: "auto",
                autoPlay: true,
                muted: true,
                loop: true,
                playsInline: true,
                onCanPlay: ()=>setVideoReady(true),
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: videoReady ? 1 : 0
                },
                transition: {
                    duration: 0.8,
                    ease: 'easeOut'
                }
            }, videoSrc, false, {
                fileName: "[project]/components/builder/invite-preview.tsx",
                lineNumber: 166,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0",
                style: {
                    background: darkPaper ? 'radial-gradient(ellipse at 50% 42%, rgba(20,14,10,0.18) 0%, rgba(20,14,10,0.58) 100%)' : 'radial-gradient(ellipse at 50% 42%, rgba(20,14,10,0.10) 0%, rgba(20,14,10,0.42) 100%)'
                }
            }, void 0, false, {
                fileName: "[project]/components/builder/invite-preview.tsx",
                lineNumber: 186,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: uploadedBusy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    transition: {
                        duration: 0.6
                    },
                    className: "absolute inset-x-0 top-[12dvh] flex justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-full px-5 py-2.5",
                        style: {
                            background: 'rgba(253,252,249,0.82)',
                            backdropFilter: 'blur(6px)'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-inter text-[11px] tracking-[0.08em]",
                            style: {
                                color: '#1A1816'
                            },
                            children: "We’re preparing your film — you can keep going."
                        }, void 0, false, {
                            fileName: "[project]/components/builder/invite-preview.tsx",
                            lineNumber: 209,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/builder/invite-preview.tsx",
                        lineNumber: 205,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/builder/invite-preview.tsx",
                    lineNumber: 198,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/builder/invite-preview.tsx",
                lineNumber: 196,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex flex-col items-center px-6 pt-[4dvh] lg:justify-center lg:pt-0 lg:px-7 lg:pb-[14dvh]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full max-w-[320px] px-7 py-8 lg:max-w-[400px] lg:px-8 lg:py-12 text-center",
                        style: {
                            background: hexA(palette.paper, darkPaper ? 0.9 : 0.93),
                            backdropFilter: 'blur(16px)',
                            borderRadius: 18,
                            boxShadow: '0 24px 80px rgba(26,24,22,0.22), 0 4px 16px rgba(26,24,22,0.08)',
                            border: `1px solid ${palette.accentSoft}`
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-inter uppercase",
                                style: {
                                    fontSize: 9,
                                    letterSpacing: '0.3em',
                                    color: darkPaper ? 'rgba(236,234,227,0.5)' : 'rgba(26,24,22,0.34)'
                                },
                                children: "Together with their families"
                            }, void 0, false, {
                                fileName: "[project]/components/builder/invite-preview.tsx",
                                lineNumber: 230,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "my-4 lg:my-6 flex min-h-[52px] lg:min-h-[80px] items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                    mode: "wait",
                                    initial: false,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h2, {
                                        initial: reduced ? {
                                            opacity: 0
                                        } : {
                                            opacity: 0,
                                            y: 6
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        exit: reduced ? {
                                            opacity: 0
                                        } : {
                                            opacity: 0,
                                            y: -6
                                        },
                                        transition: {
                                            duration: 0.45,
                                            ease: [
                                                0.22,
                                                1,
                                                0.36,
                                                1
                                            ]
                                        },
                                        style: {
                                            fontFamily: headingFont.var,
                                            fontStyle: headingStyle,
                                            fontSize: `calc(clamp(1.7rem, 7.2vw, 2.9rem) * ${headingFont.scale})`,
                                            lineHeight: 1.05,
                                            color: isPlaceholder ? darkPaper ? 'rgba(236,234,227,0.3)' : 'rgba(26,24,22,0.26)' : palette.accent,
                                            letterSpacing: '0.01em'
                                        },
                                        children: names
                                    }, names + headingFont.id, false, {
                                        fileName: "[project]/components/builder/invite-preview.tsx",
                                        lineNumber: 239,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/builder/invite-preview.tsx",
                                    lineNumber: 238,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/builder/invite-preview.tsx",
                                lineNumber: 237,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mx-auto mb-5",
                                style: {
                                    width: 60,
                                    height: 1,
                                    background: `linear-gradient(90deg, transparent, ${palette.accent}, transparent)`
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/builder/invite-preview.tsx",
                                lineNumber: 261,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                mode: "wait",
                                initial: false,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                                    initial: {
                                        opacity: 0
                                    },
                                    animate: {
                                        opacity: 1
                                    },
                                    exit: {
                                        opacity: 0
                                    },
                                    transition: {
                                        duration: 0.4
                                    },
                                    className: "font-cormorant italic font-light",
                                    style: {
                                        fontSize: 18,
                                        color: date ? darkPaper ? 'rgba(236,234,227,0.72)' : 'rgba(26,24,22,0.72)' : darkPaper ? 'rgba(236,234,227,0.3)' : 'rgba(26,24,22,0.24)'
                                    },
                                    children: date ?? 'Your wedding day'
                                }, date ?? 'no-date', false, {
                                    fileName: "[project]/components/builder/invite-preview.tsx",
                                    lineNumber: 264,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/builder/invite-preview.tsx",
                                lineNumber: 263,
                                columnNumber: 11
                            }, this),
                            invite?.venue_name ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-inter mt-2",
                                style: {
                                    fontSize: 11,
                                    letterSpacing: '0.08em',
                                    color: darkPaper ? 'rgba(236,234,227,0.45)' : 'rgba(26,24,22,0.45)'
                                },
                                children: invite.venue_name
                            }, void 0, false, {
                                fileName: "[project]/components/builder/invite-preview.tsx",
                                lineNumber: 283,
                                columnNumber: 13
                            }, this) : null,
                            hasMusic && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-5 lg:mt-7 flex items-center justify-center gap-1.5",
                                children: [
                                    [
                                        0,
                                        1,
                                        2
                                    ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                            animate: reduced ? {
                                                opacity: 0.6
                                            } : {
                                                scaleY: [
                                                    0.4,
                                                    1,
                                                    0.4
                                                ]
                                            },
                                            transition: {
                                                duration: 1.1,
                                                repeat: Infinity,
                                                delay: i * 0.18,
                                                ease: 'easeInOut'
                                            },
                                            style: {
                                                width: 2,
                                                height: 11,
                                                borderRadius: 2,
                                                background: palette.accent,
                                                opacity: 0.65,
                                                transformOrigin: 'bottom',
                                                display: 'inline-block'
                                            }
                                        }, i, false, {
                                            fileName: "[project]/components/builder/invite-preview.tsx",
                                            lineNumber: 294,
                                            columnNumber: 17
                                        }, this)),
                                    track && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-inter ml-2",
                                        style: {
                                            fontSize: 9,
                                            letterSpacing: '0.12em',
                                            color: darkPaper ? 'rgba(236,234,227,0.4)' : 'rgba(26,24,22,0.4)'
                                        },
                                        children: track.title
                                    }, void 0, false, {
                                        fileName: "[project]/components/builder/invite-preview.tsx",
                                        lineNumber: 306,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/builder/invite-preview.tsx",
                                lineNumber: 292,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/builder/invite-preview.tsx",
                        lineNumber: 220,
                        columnNumber: 9
                    }, this),
                    enabledSections.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 flex max-w-[92vw] flex-wrap justify-center gap-1.5",
                        children: enabledSections.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: reduced ? {
                                    opacity: 0
                                } : {
                                    opacity: 0,
                                    y: 10
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    duration: 0.45,
                                    ease: [
                                        0.22,
                                        1,
                                        0.36,
                                        1
                                    ],
                                    delay: i * 0.05
                                },
                                className: "rounded-full px-2.5 py-1",
                                style: {
                                    background: hexA(palette.washAlt, darkPaper ? 0.85 : 0.92),
                                    boxShadow: '0 2px 10px rgba(26,24,22,0.08)',
                                    border: `1px solid ${palette.accentSoft}`
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-inter uppercase whitespace-nowrap",
                                    style: {
                                        fontSize: 8,
                                        letterSpacing: '0.16em',
                                        color: darkPaper ? 'rgba(236,234,227,0.6)' : 'rgba(26,24,22,0.5)'
                                    },
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION_LABELS"][s.type] ?? s.type
                                }, void 0, false, {
                                    fileName: "[project]/components/builder/invite-preview.tsx",
                                    lineNumber: 330,
                                    columnNumber: 17
                                }, this)
                            }, s.id, false, {
                                fileName: "[project]/components/builder/invite-preview.tsx",
                                lineNumber: 318,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/builder/invite-preview.tsx",
                        lineNumber: 316,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/builder/invite-preview.tsx",
                lineNumber: 219,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/builder/invite-preview.tsx",
        lineNumber: 132,
        columnNumber: 5
    }, this);
}
_s(InvitePreview, "LqnnTQ667R0wOyM4scRW65qC93c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$builder$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBuilder"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"]
    ];
});
_c = InvitePreview;
var _c;
__turbopack_context__.k.register(_c, "InvitePreview");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/builder/total-pill.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "TotalPill": (()=>TotalPill)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$builder$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/builder-provider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/builder/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function TotalPill() {
    _s();
    const { quote, plan } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$builder$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBuilder"])();
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const cents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const spring = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"])(cents, {
        stiffness: 120,
        damping: 24
    });
    const display = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(spring, {
        "TotalPill.useTransform[display]": (v)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["euros"])(Math.round(v / 100) * 100)
    }["TotalPill.useTransform[display]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TotalPill.useEffect": ()=>{
            if (quote == null) return;
            if (reduced) {
                cents.jump(quote.amount_cents);
            } else {
                cents.set(quote.amount_cents);
            }
        }
    }["TotalPill.useEffect"], [
        quote,
        cents,
        reduced
    ]);
    if (!quote) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed z-50 left-4 top-12 lg:left-auto lg:right-8 lg:top-12",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setOpen((v)=>!v),
                "aria-expanded": open,
                "aria-label": `Your total is ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["euros"])(quote.amount_cents)}. Tap for the breakdown.`,
                className: "flex items-center gap-2 rounded-full px-4 py-2",
                style: {
                    background: 'rgba(253,252,249,0.92)',
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 4px 18px rgba(26,24,22,0.12)',
                    border: '1px solid rgba(168,133,75,0.25)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                        className: "font-cormorant",
                        style: {
                            fontSize: 20,
                            fontWeight: 500,
                            color: '#A8854B',
                            fontVariantNumeric: 'tabular-nums',
                            lineHeight: 1
                        },
                        children: display
                    }, void 0, false, {
                        fileName: "[project]/components/builder/total-pill.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        width: "10",
                        height: "10",
                        viewBox: "0 0 10 10",
                        fill: "none",
                        "aria-hidden": "true",
                        style: {
                            transform: open ? 'rotate(180deg)' : 'none',
                            transition: 'transform 0.3s'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M2 3.5L5 6.5L8 3.5",
                            stroke: "rgba(26,24,22,0.4)",
                            strokeWidth: "1.1",
                            strokeLinecap: "round"
                        }, void 0, false, {
                            fileName: "[project]/components/builder/total-pill.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/builder/total-pill.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/builder/total-pill.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: reduced ? {
                        opacity: 0
                    } : {
                        opacity: 0,
                        y: -6
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0
                    },
                    transition: {
                        duration: 0.3,
                        ease: [
                            0.22,
                            1,
                            0.36,
                            1
                        ]
                    },
                    className: "mt-2 w-[240px] rounded-2xl p-4",
                    style: {
                        background: '#FDFCF9',
                        boxShadow: '0 12px 40px rgba(26,24,22,0.16)',
                        border: '1px solid rgba(26,24,22,0.06)'
                    },
                    children: [
                        quote.line_items.map((li, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-baseline justify-between py-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-inter",
                                        style: {
                                            fontSize: 12,
                                            color: 'rgba(26,24,22,0.6)'
                                        },
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lineItemLabel"])(li.label, plan?.name)
                                    }, void 0, false, {
                                        fileName: "[project]/components/builder/total-pill.tsx",
                                        lineNumber: 90,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-inter",
                                        style: {
                                            fontSize: 12,
                                            color: '#1A1816',
                                            fontVariantNumeric: 'tabular-nums'
                                        },
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["euros"])(li.amount_cents)
                                    }, void 0, false, {
                                        fileName: "[project]/components/builder/total-pill.tsx",
                                        lineNumber: 93,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/components/builder/total-pill.tsx",
                                lineNumber: 89,
                                columnNumber: 15
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-2 flex items-baseline justify-between border-t pt-2.5",
                            style: {
                                borderColor: 'rgba(26,24,22,0.08)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-inter",
                                    style: {
                                        fontSize: 12,
                                        color: '#1A1816'
                                    },
                                    children: "Your total"
                                }, void 0, false, {
                                    fileName: "[project]/components/builder/total-pill.tsx",
                                    lineNumber: 102,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-cormorant",
                                    style: {
                                        fontSize: 19,
                                        fontWeight: 500,
                                        color: '#A8854B',
                                        fontVariantNumeric: 'tabular-nums'
                                    },
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["euros"])(quote.amount_cents)
                                }, void 0, false, {
                                    fileName: "[project]/components/builder/total-pill.tsx",
                                    lineNumber: 105,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/builder/total-pill.tsx",
                            lineNumber: 101,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/builder/total-pill.tsx",
                    lineNumber: 76,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/builder/total-pill.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/builder/total-pill.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_s(TotalPill, "WJuslrD8iZy6Zob5nNmOwXbnL98=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$builder$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBuilder"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"]
    ];
});
_c = TotalPill;
var _c;
__turbopack_context__.k.register(_c, "TotalPill");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_595bfa81._.js.map