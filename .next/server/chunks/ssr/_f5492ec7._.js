module.exports = {

"[project]/lib/builder/api.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
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
    return code.replace(/_/g, ' ').replace(/^./, (c)=>c.toUpperCase());
}
}}),
"[project]/lib/builder/presets.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
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
const pexelsPoster = (id)=>`https://images.pexels.com/videos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1280`;
const VIDEO_PRESETS = [
    {
        id: 'golden-hour',
        name: 'Golden Hour',
        mood: 'Warm light, slow embrace',
        src: pexelsVideo('8775889', '8775889-hd_1920_1080_25fps.mp4'),
        posterImg: pexelsPoster('8775889'),
        poster: {
            from: '#E8D5B5',
            to: '#B98E54'
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
        id: 'the-vows',
        name: 'The Vows',
        mood: 'A quiet, sacred moment',
        src: pexelsVideo('8776108', '8776108-hd_1920_1080_25fps.mp4'),
        posterImg: pexelsPoster('8776108'),
        poster: {
            from: '#EADBC6',
            to: '#C2A57C'
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
        id: 'open-air',
        name: 'Open Air',
        mood: 'Vows under open sky',
        src: pexelsVideo('8503121', '8503121-hd_1920_1080_24fps.mp4'),
        posterImg: pexelsPoster('8503121'),
        poster: {
            from: '#C8CFC4',
            to: '#8C9A86'
        },
        ink: '#FDFCF9'
    },
    {
        id: 'eternal',
        name: 'Eternal',
        mood: 'Timeless and editorial',
        src: pexelsVideo('8247018', '8247018-hd_1920_1080_25fps.mp4'),
        posterImg: pexelsPoster('8247018'),
        poster: {
            from: '#EDE6DA',
            to: '#C9B89A'
        },
        ink: '#1A1816'
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
        id: 'the-gates',
        name: 'The Gates',
        mood: 'Grand, formal, arriving',
        src: pexelsVideo('6273546', '6273546-hd_1920_1080_24fps.mp4'),
        posterImg: pexelsPoster('6273546'),
        poster: {
            from: '#2C2C2C',
            to: '#1A1A1A'
        },
        ink: '#F2EEE8'
    },
    {
        id: 'the-veil',
        name: 'The Veil',
        mood: 'Ethereal, soft, drifting',
        src: pexelsVideo('8776120', '8776120-hd_1920_1080_25fps.mp4'),
        posterImg: pexelsPoster('8776120'),
        poster: {
            from: '#FAF7F2',
            to: '#C4927A'
        },
        ink: '#6B5B52'
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
const SECTION_LABELS = Object.fromEntries(CONTENT_SECTIONS.map((s)=>[
        s.type,
        s.label
    ]));
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
const PALETTE_MAP = Object.fromEntries(PALETTES.map((p)=>[
        p.id,
        p
    ]));
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
const HEADING_FONT_MAP = Object.fromEntries(HEADING_FONTS.map((f)=>[
        f.id,
        f
    ]));
const DEFAULT_HEADING_FONT = HEADING_FONTS[0];
}}),
"[project]/components/invite/openers/shared.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// Shared types + helpers for the invitation "openers" — the reveal mechanism a
// guest interacts with before the invitation itself appears. Each opener is a
// full-screen, themable animation (wax letter, iron gates, lifting veil…).
__turbopack_context__.s({
    "hexA": (()=>hexA),
    "initials": (()=>initials),
    "shade": (()=>shade)
});
function hexA(hex, a) {
    const h = hex.replace('#', '');
    const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}
function shade(hex, amt) {
    // amt > 0 darkens, amt < 0 lightens
    const h = hex.replace('#', '');
    const f = (i)=>{
        const v = parseInt(h.slice(i, i + 2), 16);
        const out = amt >= 0 ? v * (1 - amt) : v + (255 - v) * -amt;
        return Math.max(0, Math.min(255, Math.round(out)));
    };
    return `rgb(${f(0)}, ${f(2)}, ${f(4)})`;
}
function initials(names) {
    return names.split(/&|\band\b|\+/i).map((s)=>s.trim()[0]).filter(Boolean).map((c)=>c.toUpperCase()).slice(0, 2);
}
}}),
"[project]/components/invite/openers/interactive.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "EnvelopeOpener": (()=>EnvelopeOpener),
    "GatesOpener": (()=>GatesOpener),
    "VeilOpener": (()=>VeilOpener)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/animation/animate/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/invite/openers/shared.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function Greeting({ theme, names, fade }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "pointer-events-none absolute inset-x-0 top-[12%] z-30 flex flex-col items-center text-center px-6",
        style: {
            opacity: fade
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-inter uppercase",
                style: {
                    fontSize: 9,
                    letterSpacing: '0.34em',
                    color: 'rgba(255,255,255,0.66)'
                },
                children: "You are invited"
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-3",
                style: {
                    fontFamily: theme.font,
                    fontStyle: theme.fontStyle,
                    fontSize: 'clamp(2.1rem, 8vw, 3rem)',
                    color: '#fff',
                    lineHeight: 1.05,
                    textShadow: '0 2px 26px rgba(0,0,0,0.55)'
                },
                children: names
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
function Hint({ label, show, dir }) {
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const icon = dir === 'up' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "M7.5 12V4M4 7.5l3.5-3.5L11 7.5",
        stroke: "#fff",
        strokeWidth: "1.3",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }, void 0, false, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 20,
        columnNumber: 7
    }, this) : dir === 'apart' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "M6 4L3 7.5L6 11M9 4l3 3.5L9 11",
        stroke: "#fff",
        strokeWidth: "1.3",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }, void 0, false, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 22,
        columnNumber: 7
    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "M7.5 3v8M4 7.5l3.5 3.5L11 7.5",
        stroke: "#fff",
        strokeWidth: "1.3",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }, void 0, false, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 23,
        columnNumber: 7
    }, this);
    const bob = reduced ? {} : dir === 'up' ? {
        y: [
            0,
            -7,
            0
        ]
    } : dir === 'apart' ? {
        scale: [
            1,
            1.08,
            1
        ]
    } : {
        y: [
            0,
            7,
            0
        ]
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "pointer-events-none absolute bottom-[8%] left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2",
        animate: {
            opacity: show ? 1 : 0
        },
        transition: {
            duration: 0.4
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                className: "flex items-center justify-center rounded-full",
                style: {
                    width: 44,
                    height: 44,
                    border: '1px solid rgba(255,255,255,0.5)',
                    background: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(4px)'
                },
                animate: bob,
                transition: {
                    duration: 1.8,
                    repeat: Infinity,
                    ease: 'easeInOut'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    width: "15",
                    height: "15",
                    viewBox: "0 0 15 15",
                    fill: "none",
                    children: icon
                }, void 0, false, {
                    fileName: "[project]/components/invite/openers/interactive.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-inter uppercase",
                style: {
                    fontSize: 9,
                    letterSpacing: '0.22em',
                    color: 'rgba(255,255,255,0.75)'
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
function EnvelopeOpener({ theme, names, onOpen, videoSrc, poster }) {
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const [opening, setOpening] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const mono = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initials"])(names);
    const y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const flapRotate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(y, [
        0,
        150
    ], [
        0,
        168
    ]);
    const envY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(y, [
        0,
        150
    ], [
        0,
        40
    ]);
    const dim = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(y, [
        0,
        150
    ], [
        0.46,
        0.12
    ]);
    const greetFade = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(y, [
        0,
        90
    ], [
        1,
        0
    ]);
    const EW = 340, EH = 220;
    const paper = theme.dark ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shade"])(theme.paper, -0.4) : theme.paper;
    const finish = ()=>{
        setOpening(true);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(flapRotate, 180, {
            duration: 0.3
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(y, 700, {
            duration: 0.7,
            ease: [
                0.4,
                0,
                0.2,
                1
            ]
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(dim, 0, {
            duration: 0.7
        });
        setTimeout(onOpen, 720);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FilmBackdropMV, {
                videoSrc: videoSrc,
                poster: poster,
                dim: dim
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Greeting, {
                theme: theme,
                names: names,
                fade: reduced ? 1 : greetFade
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex items-center justify-center px-6",
                style: {
                    paddingBottom: '6dvh'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    style: {
                        y: envY,
                        width: EW,
                        height: EH
                    },
                    className: "relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 rounded-[5px]",
                            style: {
                                background: `linear-gradient(165deg, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shade"])(paper, -0.05)} 0%, ${paper} 48%, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shade"])(paper, 0.06)} 100%)`,
                                boxShadow: `0 30px 70px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])('#000', 0.5)}, inset 0 1px 0 ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])('#fff', theme.dark ? 0.06 : 0.5)}`
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "absolute inset-0 h-full w-full",
                                    viewBox: `0 0 ${EW} ${EH}`,
                                    "aria-hidden": true,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: `M0 ${EH} L${EW / 2} ${EH * 0.5} L${EW} ${EH} Z`,
                                            fill: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])(theme.ink, 0.05)
                                        }, void 0, false, {
                                            fileName: "[project]/components/invite/openers/interactive.tsx",
                                            lineNumber: 75,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: `M0 0 L${EW / 2} ${EH * 0.5} L0 ${EH} Z`,
                                            fill: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])(theme.ink, 0.03)
                                        }, void 0, false, {
                                            fileName: "[project]/components/invite/openers/interactive.tsx",
                                            lineNumber: 76,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: `M${EW} 0 L${EW / 2} ${EH * 0.5} L${EW} ${EH} Z`,
                                            fill: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])(theme.ink, 0.03)
                                        }, void 0, false, {
                                            fileName: "[project]/components/invite/openers/interactive.tsx",
                                            lineNumber: 77,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/invite/openers/interactive.tsx",
                                    lineNumber: 74,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute rounded-[3px]",
                                    style: {
                                        left: 14,
                                        right: 14,
                                        top: 14,
                                        height: EH * 0.62,
                                        background: theme.dark ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shade"])(theme.paper, -0.55) : '#fff',
                                        boxShadow: `0 4px 12px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])('#000', 0.12)}`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/invite/openers/interactive.tsx",
                                    lineNumber: 80,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/invite/openers/interactive.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-x-0 top-0",
                            style: {
                                height: EH * 0.52,
                                perspective: 1100,
                                transformStyle: 'preserve-3d',
                                zIndex: 5
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                style: {
                                    position: 'absolute',
                                    inset: 0,
                                    transformOrigin: '50% 0%',
                                    rotateX: flapRotate,
                                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                                    background: `linear-gradient(180deg, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shade"])(paper, 0.04)} 0%, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shade"])(paper, -0.04)} 100%)`,
                                    boxShadow: `0 6px 14px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])('#000', 0.18)}`
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/invite/openers/interactive.tsx",
                                lineNumber: 85,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/invite/openers/interactive.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this),
                        !opening && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                            type: "button",
                            drag: reduced ? false : 'y',
                            dragConstraints: {
                                top: 0,
                                bottom: 170
                            },
                            dragElastic: 0.18,
                            style: {
                                y,
                                left: '50%',
                                top: EH * 0.5,
                                x: '-50%',
                                translateY: '-50%',
                                zIndex: 20,
                                position: 'absolute',
                                touchAction: 'none',
                                cursor: 'grab'
                            },
                            whileTap: {
                                cursor: 'grabbing',
                                scale: 1.04
                            },
                            onClick: ()=>{
                                if (reduced) finish();
                            },
                            onDragEnd: (_e, info)=>{
                                if (info.offset.y > 95) finish();
                                else (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(y, 0, {
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 26
                                });
                            },
                            "aria-label": "Drag the seal down to open",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(WaxSeal, {
                                accent: theme.accent,
                                mono: mono
                            }, void 0, false, {
                                fileName: "[project]/components/invite/openers/interactive.tsx",
                                lineNumber: 101,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/invite/openers/interactive.tsx",
                            lineNumber: 90,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/invite/openers/interactive.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Hint, {
                dir: "down",
                label: reduced ? 'Tap the seal to open' : 'Drag the seal down',
                show: !opening
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 65,
        columnNumber: 5
    }, this);
}
function WaxSeal({ accent, mono, size = 78 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        style: {
            width: size,
            height: size,
            filter: `drop-shadow(0 6px 14px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])(accent, 0.5)})`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: "0 0 100 100",
                className: "absolute inset-0",
                "aria-hidden": true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("radialGradient", {
                            id: "ws",
                            cx: "38%",
                            cy: "32%",
                            r: "72%",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                    offset: "0%",
                                    stopColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])('#fff', 0.5)
                                }, void 0, false, {
                                    fileName: "[project]/components/invite/openers/interactive.tsx",
                                    lineNumber: 116,
                                    columnNumber: 65
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                    offset: "40%",
                                    stopColor: accent
                                }, void 0, false, {
                                    fileName: "[project]/components/invite/openers/interactive.tsx",
                                    lineNumber: 116,
                                    columnNumber: 115
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                    offset: "100%",
                                    stopColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shade"])(accent, 0.34)
                                }, void 0, false, {
                                    fileName: "[project]/components/invite/openers/interactive.tsx",
                                    lineNumber: 116,
                                    columnNumber: 155
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/invite/openers/interactive.tsx",
                            lineNumber: 116,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/interactive.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M50 4 C62 5 70 10 76 19 C83 28 97 31 95 44 C93 56 96 64 88 73 C81 82 80 95 67 95 C56 95 54 99 46 97 C36 95 27 97 20 88 C13 80 3 74 5 62 C7 51 2 43 9 33 C15 24 16 11 29 8 C39 5 41 3 50 4 Z",
                        fill: "url(#ws)"
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/interactive.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "50",
                        cy: "50",
                        r: "34",
                        fill: "none",
                        stroke: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])('#000', 0.16),
                        strokeWidth: "1.4"
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/interactive.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-cormorant absolute inset-0 flex items-center justify-center",
                style: {
                    fontSize: size * 0.34,
                    fontWeight: 500,
                    color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])('#fff', 0.95),
                    textShadow: `0 1px 2px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])('#000', 0.35)}`
                },
                children: mono.length === 2 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        mono[0],
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontSize: size * 0.2,
                                opacity: 0.7
                            },
                            children: "&"
                        }, void 0, false, {
                            fileName: "[project]/components/invite/openers/interactive.tsx",
                            lineNumber: 121,
                            columnNumber: 41
                        }, this),
                        mono[1]
                    ]
                }, void 0, true) : mono[0] ?? '✦'
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 114,
        columnNumber: 5
    }, this);
}
function GatesOpener({ theme, names, onOpen, videoSrc, poster }) {
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const [opening, setOpening] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const mono = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initials"])(names);
    const x = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const leftRot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(x, [
        0,
        140
    ], [
        0,
        -100
    ]);
    const rightRot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(x, [
        0,
        140
    ], [
        0,
        100
    ]);
    const dim = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(x, [
        0,
        140
    ], [
        0.4,
        0.08
    ]);
    const greetFade = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(x, [
        0,
        80
    ], [
        1,
        0
    ]);
    const bloom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(x, [
        0,
        140
    ], [
        0.2,
        0.95
    ]);
    const finish = ()=>{
        setOpening(true);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(leftRot, -108, {
            duration: 0.8,
            ease: [
                0.5,
                0,
                0.2,
                1
            ]
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(rightRot, 108, {
            duration: 0.8,
            ease: [
                0.5,
                0,
                0.2,
                1
            ]
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(dim, 0, {
            duration: 0.8
        });
        setTimeout(onOpen, 820);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FilmBackdropMV, {
                videoSrc: videoSrc,
                poster: poster,
                dim: dim
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2",
                style: {
                    width: 460,
                    height: 460,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])(theme.accent, 0.5)} 0%, transparent 66%)`,
                    filter: 'blur(28px)',
                    opacity: bloom
                }
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Greeting, {
                theme: theme,
                names: names,
                fade: reduced ? 1 : greetFade
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 154,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex items-center justify-center",
                style: {
                    perspective: 1500
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative",
                    style: {
                        width: 'min(88vw, 440px)',
                        height: 'min(74vh, 500px)'
                    },
                    children: [
                        [
                            'l',
                            'r'
                        ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: "absolute top-0 bottom-0",
                                style: {
                                    width: '50%',
                                    [s === 'l' ? 'left' : 'right']: 0,
                                    transformOrigin: s === 'l' ? 'left center' : 'right center',
                                    transformStyle: 'preserve-3d',
                                    backfaceVisibility: 'hidden',
                                    rotateY: s === 'l' ? leftRot : rightRot,
                                    filter: `drop-shadow(0 14px 26px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])('#000', 0.5)})`
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GateLeaf, {
                                    side: s,
                                    accent: theme.accent,
                                    ink: theme.ink
                                }, void 0, false, {
                                    fileName: "[project]/components/invite/openers/interactive.tsx",
                                    lineNumber: 160,
                                    columnNumber: 15
                                }, this)
                            }, s, false, {
                                fileName: "[project]/components/invite/openers/interactive.tsx",
                                lineNumber: 159,
                                columnNumber: 13
                            }, this)),
                        !opening && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                            type: "button",
                            drag: reduced ? false : 'x',
                            dragConstraints: {
                                left: 0,
                                right: 150
                            },
                            dragElastic: 0.16,
                            style: {
                                x,
                                left: '50%',
                                top: '50%',
                                translateX: '-50%',
                                translateY: '-50%',
                                position: 'absolute',
                                zIndex: 20,
                                touchAction: 'none',
                                cursor: 'grab',
                                width: 70,
                                height: 70,
                                borderRadius: '50%',
                                background: `radial-gradient(circle at 38% 32%, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])('#fff', 0.4)} 0%, ${theme.accent} 45%, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shade"])(theme.accent, 0.32)} 100%)`,
                                boxShadow: `inset 0 -4px 10px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])('#000', 0.35)}, 0 6px 22px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])(theme.accent, 0.5)}`
                            },
                            whileTap: {
                                cursor: 'grabbing',
                                scale: 1.05
                            },
                            onClick: ()=>{
                                if (reduced) finish();
                            },
                            onDragEnd: (_e, info)=>{
                                if (info.offset.x > 90) finish();
                                else (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(x, 0, {
                                    type: 'spring',
                                    stiffness: 280,
                                    damping: 26
                                });
                            },
                            "aria-label": "Pull the gates open",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-cormorant",
                                style: {
                                    fontSize: 24,
                                    fontWeight: 500,
                                    color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])('#fff', 0.95),
                                    textShadow: `0 1px 2px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])('#000', 0.4)}`
                                },
                                children: mono.length === 2 ? `${mono[0]}${mono[1]}` : mono[0] ?? '✦'
                            }, void 0, false, {
                                fileName: "[project]/components/invite/openers/interactive.tsx",
                                lineNumber: 173,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/invite/openers/interactive.tsx",
                            lineNumber: 165,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/invite/openers/interactive.tsx",
                    lineNumber: 157,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 156,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Hint, {
                dir: "apart",
                label: reduced ? 'Tap to open the gates' : 'Pull the gates apart',
                show: !opening
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 179,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 151,
        columnNumber: 5
    }, this);
}
function GateLeaf({ side, accent, ink }) {
    const W = 180, H = 380;
    const bars = [
        30,
        64,
        98,
        132,
        166
    ].map((bx)=>side === 'l' ? bx : W - bx);
    const iron = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shade"])(ink, -0.12);
    const gid = `g-${side}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: `0 0 ${W} ${H}`,
        width: "100%",
        height: "100%",
        preserveAspectRatio: "none",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                    id: gid,
                    x1: "0",
                    y1: "0",
                    x2: "1",
                    y2: "1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "0%",
                            stopColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shade"])(accent, -0.25)
                        }, void 0, false, {
                            fileName: "[project]/components/invite/openers/interactive.tsx",
                            lineNumber: 191,
                            columnNumber: 66
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "45%",
                            stopColor: accent
                        }, void 0, false, {
                            fileName: "[project]/components/invite/openers/interactive.tsx",
                            lineNumber: 191,
                            columnNumber: 119
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "100%",
                            stopColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shade"])(accent, 0.35)
                        }, void 0, false, {
                            fileName: "[project]/components/invite/openers/interactive.tsx",
                            lineNumber: 191,
                            columnNumber: 159
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/invite/openers/interactive.tsx",
                    lineNumber: 191,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 191,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "6",
                y: "6",
                width: W - 12,
                height: H - 12,
                fill: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])('#0d0d0f', 0.34),
                stroke: iron,
                strokeWidth: "7"
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 192,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "6",
                y: "6",
                width: W - 12,
                height: H - 12,
                fill: "none",
                stroke: `url(#${gid})`,
                strokeWidth: "2"
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 193,
                columnNumber: 7
            }, this),
            bars.map((bx, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                            x1: bx,
                            y1: "40",
                            x2: bx,
                            y2: H - 16,
                            stroke: iron,
                            strokeWidth: "4.5"
                        }, void 0, false, {
                            fileName: "[project]/components/invite/openers/interactive.tsx",
                            lineNumber: 196,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                            x1: bx,
                            y1: "40",
                            x2: bx,
                            y2: H - 16,
                            stroke: `url(#${gid})`,
                            strokeWidth: "1.4"
                        }, void 0, false, {
                            fileName: "[project]/components/invite/openers/interactive.tsx",
                            lineNumber: 197,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: `M${bx - 7} 40 L${bx} 18 L${bx + 7} 40 Z`,
                            fill: iron,
                            stroke: `url(#${gid})`,
                            strokeWidth: "1"
                        }, void 0, false, {
                            fileName: "[project]/components/invite/openers/interactive.tsx",
                            lineNumber: 198,
                            columnNumber: 11
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/components/invite/openers/interactive.tsx",
                    lineNumber: 195,
                    columnNumber: 9
                }, this)),
            [
                120,
                250
            ].map((yy, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                            x1: "14",
                            y1: yy,
                            x2: W - 14,
                            y2: yy,
                            stroke: iron,
                            strokeWidth: "6"
                        }, void 0, false, {
                            fileName: "[project]/components/invite/openers/interactive.tsx",
                            lineNumber: 201,
                            columnNumber: 46
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                            x1: "14",
                            y1: yy,
                            x2: W - 14,
                            y2: yy,
                            stroke: `url(#${gid})`,
                            strokeWidth: "1.6"
                        }, void 0, false, {
                            fileName: "[project]/components/invite/openers/interactive.tsx",
                            lineNumber: 201,
                            columnNumber: 120
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/components/invite/openers/interactive.tsx",
                    lineNumber: 201,
                    columnNumber: 35
                }, this)),
            bars.slice(0, -1).map((bx, i)=>{
                const nx = bars[i + 1];
                const mx = (bx + nx) / 2;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                    stroke: `url(#${gid})`,
                    strokeWidth: "2.2",
                    fill: "none",
                    opacity: "0.85",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: `M${bx} 168 C${bx} 150 ${mx} 150 ${mx} 178 C${mx} 150 ${nx} 150 ${nx} 168`
                        }, void 0, false, {
                            fileName: "[project]/components/invite/openers/interactive.tsx",
                            lineNumber: 202,
                            columnNumber: 181
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: `M${bx} 202 C${bx} 220 ${mx} 220 ${mx} 192 C${mx} 220 ${nx} 220 ${nx} 202`
                        }, void 0, false, {
                            fileName: "[project]/components/invite/openers/interactive.tsx",
                            lineNumber: 202,
                            columnNumber: 268
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/components/invite/openers/interactive.tsx",
                    lineNumber: 202,
                    columnNumber: 101
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 190,
        columnNumber: 5
    }, this);
}
function VeilOpener({ theme, names, onOpen, videoSrc, poster }) {
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const [opening, setOpening] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const veilY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(y, [
        -260,
        0
    ], [
        '-100%',
        '0%'
    ]);
    const veilOpacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(y, [
        -260,
        -40,
        0
    ], [
        0,
        0.85,
        1
    ]);
    const dim = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(y, [
        -260,
        0
    ], [
        0.06,
        0.4
    ]);
    const greetFade = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(y, [
        -140,
        0
    ], [
        0,
        1
    ]);
    const finish = ()=>{
        setOpening(true);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(y, -560, {
            duration: 1,
            ease: [
                0.4,
                0,
                0.2,
                1
            ]
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(dim, 0, {
            duration: 0.8
        });
        setTimeout(onOpen, 980);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FilmBackdropMV, {
                videoSrc: videoSrc,
                poster: poster,
                dim: dim
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 228,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Greeting, {
                theme: theme,
                names: names,
                fade: reduced ? 1 : greetFade
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 229,
                columnNumber: 7
            }, this),
            !opening && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                type: "button",
                drag: reduced ? false : 'y',
                dragConstraints: {
                    top: -260,
                    bottom: 0
                },
                dragElastic: 0.12,
                style: {
                    y,
                    position: 'absolute',
                    inset: 0,
                    zIndex: 20,
                    touchAction: 'none',
                    cursor: 'grab'
                },
                whileTap: {
                    cursor: 'grabbing'
                },
                onClick: ()=>{
                    if (reduced) finish();
                },
                onDragEnd: (_e, info)=>{
                    if (info.offset.y < -90) finish();
                    else (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(y, 0, {
                        type: 'spring',
                        stiffness: 240,
                        damping: 28
                    });
                },
                "aria-label": "Lift the veil",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "absolute inset-x-[-12%] top-[-8%]",
                    style: {
                        height: '122%',
                        y: veilY,
                        opacity: veilOpacity,
                        background: `linear-gradient(180deg, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])('#ffffff', theme.dark ? 0.14 : 0.6)} 0%, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])('#ffffff', theme.dark ? 0.05 : 0.28)} 62%, transparent 100%)`,
                        backdropFilter: 'blur(7px)',
                        WebkitBackdropFilter: 'blur(7px)'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "absolute left-0 right-0",
                        style: {
                            bottom: -1,
                            width: '100%',
                            height: 26
                        },
                        viewBox: "0 0 400 26",
                        preserveAspectRatio: "none",
                        "aria-hidden": true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M0 0 H400 V8 Q390 26 380 8 Q370 26 360 8 Q350 26 340 8 Q330 26 320 8 Q310 26 300 8 Q290 26 280 8 Q270 26 260 8 Q250 26 240 8 Q230 26 220 8 Q210 26 200 8 Q190 26 180 8 Q170 26 160 8 Q150 26 140 8 Q130 26 120 8 Q110 26 100 8 Q90 26 80 8 Q70 26 60 8 Q50 26 40 8 Q30 26 20 8 Q10 26 0 8 Z",
                            fill: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])('#ffffff', theme.dark ? 0.16 : 0.6)
                        }, void 0, false, {
                            fileName: "[project]/components/invite/openers/interactive.tsx",
                            lineNumber: 245,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/interactive.tsx",
                        lineNumber: 244,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/invite/openers/interactive.tsx",
                    lineNumber: 240,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 233,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Hint, {
                dir: "up",
                label: reduced ? 'Tap to lift the veil' : 'Lift the veil',
                show: !opening
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 251,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 227,
        columnNumber: 5
    }, this);
}
// motion-value-driven backdrop (dim is a MotionValue)
function FilmBackdropMV({ videoSrc, poster, dim }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0",
                style: {
                    background: poster ? `center/cover url(${poster})` : '#111',
                    backgroundColor: '#111'
                }
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 260,
                columnNumber: 7
            }, this),
            videoSrc && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                className: "absolute inset-0 h-full w-full object-cover",
                src: videoSrc,
                poster: poster ?? undefined,
                autoPlay: true,
                muted: true,
                loop: true,
                playsInline: true
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 261,
                columnNumber: 20
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute inset-0",
                style: {
                    background: '#0b0b0d',
                    opacity: dim
                }
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 262,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 259,
        columnNumber: 5
    }, this);
}
}}),
"[project]/components/invite/openers/index.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "DEFAULT_OPENER": (()=>DEFAULT_OPENER),
    "InviteOpener": (()=>InviteOpener),
    "OPENERS": (()=>OPENERS),
    "OPENER_MAP": (()=>OPENER_MAP)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$interactive$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/invite/openers/interactive.tsx [app-ssr] (ecmascript)");
'use client';
;
;
const OPENERS = [
    {
        id: 'wax-letter',
        name: 'The Letter',
        blurb: 'A sealed envelope — drag the wax seal down to open it.',
        motif: 'letter'
    },
    {
        id: 'iron-gates',
        name: 'The Gates',
        blurb: 'Wrought-iron gates — pull them apart to step inside.',
        motif: 'gates'
    },
    {
        id: 'lifting-veil',
        name: 'The Veil',
        blurb: 'A soft veil — lift it away to reveal the day.',
        motif: 'veil'
    }
];
const OPENER_MAP = Object.fromEntries(OPENERS.map((o)=>[
        o.id,
        o
    ]));
const DEFAULT_OPENER = OPENERS[0];
function InviteOpener({ id, ...props }) {
    switch(id){
        case 'iron-gates':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$interactive$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GatesOpener"], {
                ...props
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/index.tsx",
                lineNumber: 29,
                columnNumber: 32
            }, this);
        case 'lifting-veil':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$interactive$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VeilOpener"], {
                ...props
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/index.tsx",
                lineNumber: 30,
                columnNumber: 33
            }, this);
        case 'wax-letter':
        default:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$interactive$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EnvelopeOpener"], {
                ...props
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/index.tsx",
                lineNumber: 32,
                columnNumber: 32
            }, this);
    }
}
}}),
"[project]/app/invite/[id]/preview/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>PreviewPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/builder/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/builder/presets.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/invite/openers/index.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
const DEFAULT_THEME = {
    accent: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_PALETTE"].accent,
    accentSoft: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_PALETTE"].accentSoft,
    paper: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_PALETTE"].paper,
    ink: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_PALETTE"].ink,
    wash: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_PALETTE"].wash,
    washAlt: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_PALETTE"].washAlt,
    font: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_HEADING_FONT"].var,
    fontScale: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_HEADING_FONT"].scale,
    fontStyle: 'normal',
    dark: false,
    layout: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_PALETTE"].layout
};
const ThemeCtx = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(DEFAULT_THEME);
const useTheme = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ThemeCtx);
const MetaCtx = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])({
    names: '',
    dateISO: null,
    dateLabel: null,
    venueName: null,
    venueAddress: null
});
const useMeta = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(MetaCtx);
// Build a Google Calendar event URL from the invite meta.
function googleCalUrl(m) {
    if (!m.dateISO) return '';
    const d = m.dateISO.replace(/-/g, '');
    const next = (()=>{
        const dt = new Date(`${m.dateISO}T00:00:00`);
        dt.setDate(dt.getDate() + 1);
        return dt.toISOString().slice(0, 10).replace(/-/g, '');
    })();
    const p = new URLSearchParams({
        action: 'TEMPLATE',
        text: `${m.names} — Wedding`,
        dates: `${d}/${next}`,
        details: 'We can’t wait to celebrate with you.',
        location: m.venueAddress || m.venueName || ''
    });
    return `https://calendar.google.com/calendar/render?${p.toString()}`;
}
// A themed pill button (link).
function PillLink({ href, accent, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
        href: href,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "font-inter inline-flex items-center gap-1.5 rounded-full px-4 py-2 transition-colors",
        style: {
            fontSize: 11,
            letterSpacing: '0.06em',
            color: accent,
            border: `1px solid ${hexA(accent, 0.3)}`,
            background: hexA(accent, 0.06),
            textDecoration: 'none'
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/app/invite/[id]/preview/page.tsx",
        lineNumber: 77,
        columnNumber: 5
    }, this);
}
// ── helpers ───────────────────────────────────────────────────────────────────
function formatDate(iso) {
    if (!iso) return null;
    const d = new Date(`${iso}T12:00:00`);
    return Number.isNaN(d.getTime()) ? null : d.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}
function copyLink() {
    void navigator.clipboard.writeText(window.location.href);
}
// hex (#RRGGBB) → rgba(r,g,b,a). Lets palette accents drive translucent fills.
function hexA(hex, a) {
    const h = hex.replace('#', '');
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}
// ── ornament components ───────────────────────────────────────────────────────
function OrnamentDivider() {
    const t = useTheme();
    const a = t.accent;
    // editorial → no divider (sections butt together); ethereal → a long hairline;
    // paper → a small diamond; classic → the full medallion ornament.
    if (t.layout === 'editorial') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-px w-full",
        style: {
            background: hexA(a, 0.12)
        }
    }, void 0, false, {
        fileName: "[project]/app/invite/[id]/preview/page.tsx",
        lineNumber: 113,
        columnNumber: 40
    }, this);
    if (t.layout === 'ethereal') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-center py-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            style: {
                width: 140,
                height: 1,
                background: hexA(a, 0.4)
            }
        }, void 0, false, {
            fileName: "[project]/app/invite/[id]/preview/page.tsx",
            lineNumber: 115,
            columnNumber: 60
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/invite/[id]/preview/page.tsx",
        lineNumber: 115,
        columnNumber: 5
    }, this);
    if (t.layout === 'paper') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-center py-7",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            style: {
                width: 9,
                height: 9,
                background: a,
                transform: 'rotate(45deg)',
                opacity: 0.55
            }
        }, void 0, false, {
            fileName: "[project]/app/invite/[id]/preview/page.tsx",
            lineNumber: 118,
            columnNumber: 60
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/invite/[id]/preview/page.tsx",
        lineNumber: 118,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-center py-8 px-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: "280",
            height: "20",
            viewBox: "0 0 280 20",
            fill: "none",
            "aria-hidden": "true",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: "0",
                    y1: "10",
                    x2: "108",
                    y2: "10",
                    stroke: a,
                    strokeOpacity: "0.3",
                    strokeWidth: "0.75"
                }, void 0, false, {
                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                    lineNumber: 123,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "104",
                    y: "7",
                    width: "5",
                    height: "5",
                    transform: "rotate(45 106.5 9.5)",
                    fill: a,
                    fillOpacity: "0.35"
                }, void 0, false, {
                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                    lineNumber: 124,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "140",
                    cy: "10",
                    r: "7",
                    stroke: a,
                    strokeOpacity: "0.5",
                    strokeWidth: "0.75",
                    fill: "none"
                }, void 0, false, {
                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                    lineNumber: 125,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "140",
                    cy: "10",
                    r: "2.5",
                    fill: a,
                    fillOpacity: "0.45"
                }, void 0, false, {
                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                    lineNumber: 126,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "136.5",
                    y: "6.5",
                    width: "7",
                    height: "7",
                    transform: "rotate(45 140 10)",
                    stroke: a,
                    strokeOpacity: "0.35",
                    strokeWidth: "0.5",
                    fill: "none"
                }, void 0, false, {
                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                    lineNumber: 127,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "170",
                    y: "7",
                    width: "5",
                    height: "5",
                    transform: "rotate(45 172.5 9.5)",
                    fill: a,
                    fillOpacity: "0.35"
                }, void 0, false, {
                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                    lineNumber: 128,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: "172",
                    y1: "10",
                    x2: "280",
                    y2: "10",
                    stroke: a,
                    strokeOpacity: "0.3",
                    strokeWidth: "0.75"
                }, void 0, false, {
                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                    lineNumber: 129,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/invite/[id]/preview/page.tsx",
            lineNumber: 122,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/invite/[id]/preview/page.tsx",
        lineNumber: 121,
        columnNumber: 5
    }, this);
}
// ── countdown timer ───────────────────────────────────────────────────────────
function CountdownTimer({ eventDate }) {
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const t = useTheme();
    const [timeLeft, setTimeLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isPast, setIsPast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!eventDate) return;
        const target = new Date(`${eventDate}T12:00:00`);
        const tick = ()=>{
            const now = new Date();
            const diff = target.getTime() - now.getTime();
            if (diff <= 0) {
                setIsPast(true);
                return;
            }
            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
                minutes: Math.floor(diff % (1000 * 60 * 60) / (1000 * 60)),
                seconds: Math.floor(diff % (1000 * 60) / 1000)
            });
        };
        tick();
        const interval = setInterval(tick, 1000);
        return ()=>clearInterval(interval);
    }, [
        eventDate
    ]);
    if (!eventDate || isPast || !timeLeft) return null;
    const units = [
        {
            value: timeLeft.days,
            label: 'Days'
        },
        {
            value: timeLeft.hours,
            label: 'Hours'
        },
        {
            value: timeLeft.minutes,
            label: 'Minutes'
        },
        {
            value: timeLeft.seconds,
            label: 'Seconds'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 24
        },
        whileInView: {
            opacity: 1,
            y: 0
        },
        viewport: {
            once: true,
            margin: '-60px'
        },
        transition: {
            duration: 0.6,
            ease: [
                0.22,
                1,
                0.36,
                1
            ]
        },
        className: "flex flex-col items-center py-16 px-8 text-center w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "mb-8",
                style: {
                    fontFamily: t.font,
                    fontStyle: t.fontStyle,
                    fontSize: `calc(clamp(2.4rem, 7vw, 3.2rem) * ${t.fontScale})`,
                    color: t.accent,
                    letterSpacing: '0.01em',
                    lineHeight: 1.1
                },
                children: "Counting Down"
            }, void 0, false, {
                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                lineNumber: 183,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-5 sm:gap-10",
                children: units.map(({ value, label })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                mode: "wait",
                                initial: false,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                                    initial: reduced ? {} : {
                                        opacity: 0,
                                        y: -6
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    exit: reduced ? {} : {
                                        opacity: 0,
                                        y: 6
                                    },
                                    transition: {
                                        duration: 0.2
                                    },
                                    className: "font-cormorant font-light leading-none",
                                    style: {
                                        fontSize: 'clamp(2.4rem, 9vw, 4rem)',
                                        color: t.ink,
                                        fontVariantNumeric: 'tabular-nums',
                                        display: 'block',
                                        minWidth: '2ch',
                                        textAlign: 'center'
                                    },
                                    children: String(value).padStart(2, '0')
                                }, value, false, {
                                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                    lineNumber: 190,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 189,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-inter uppercase mt-2",
                                style: {
                                    fontSize: 9,
                                    letterSpacing: '0.2em',
                                    color: t.ink,
                                    opacity: 0.55
                                },
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 202,
                                columnNumber: 13
                            }, this)
                        ]
                    }, label, true, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 188,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                lineNumber: 186,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/invite/[id]/preview/page.tsx",
        lineNumber: 176,
        columnNumber: 5
    }, this);
}
// ── rsvp section ──────────────────────────────────────────────────────────────
function RsvpSection({ inviteId }) {
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const t = useTheme();
    const rsvpCalUrl = googleCalUrl(useMeta());
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [attendance, setAttendance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('idle');
    const isValid = name.trim().length > 0 && email.includes('@') && attendance !== null;
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!isValid || status === 'submitting') return;
        setStatus('submitting');
        try {
            const res = await fetch(`/api/invites/${inviteId}/rsvp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim(),
                    attendance,
                    message: message.trim()
                })
            });
            if (!res.ok) throw new Error('Failed');
            setStatus('success');
        } catch  {
            setStatus('error');
        }
    };
    const fieldStyle = {
        border: `1px solid ${hexA(t.accent, 0.25)}`,
        background: t.dark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.7)',
        borderRadius: 12,
        padding: '12px 16px',
        fontSize: 14,
        color: t.ink,
        outline: 'none',
        width: '100%',
        fontFamily: 'var(--font-inter)',
        transition: 'border-color 0.2s'
    };
    const focusOn = (el)=>el.style.borderColor = hexA(t.accent, 0.55);
    const focusOff = (el)=>el.style.borderColor = hexA(t.accent, 0.25);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 24
        },
        whileInView: {
            opacity: 1,
            y: 0
        },
        viewport: {
            once: true,
            margin: '-60px'
        },
        transition: {
            duration: 0.6,
            ease: [
                0.22,
                1,
                0.36,
                1
            ]
        },
        className: "flex flex-col items-center py-16 px-8 w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-center mb-2",
                style: {
                    fontFamily: t.font,
                    fontStyle: t.fontStyle,
                    fontSize: `calc(clamp(2.4rem, 7vw, 3.2rem) * ${t.fontScale})`,
                    color: t.accent,
                    letterSpacing: '0.01em',
                    lineHeight: 1.1
                },
                children: "Be Our Guest"
            }, void 0, false, {
                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                lineNumber: 266,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-inter text-center mb-8",
                style: {
                    fontSize: 12,
                    letterSpacing: '0.06em',
                    color: t.ink,
                    opacity: 0.55
                },
                children: "Kindly let us know if you’ll be joining us"
            }, void 0, false, {
                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                lineNumber: 269,
                columnNumber: 7
            }, this),
            status === 'success' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    scale: 0.95
                },
                animate: {
                    opacity: 1,
                    scale: 1
                },
                className: "flex flex-col items-center gap-4 py-8 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        width: "44",
                        height: "44",
                        viewBox: "0 0 44 44",
                        fill: "none",
                        "aria-hidden": true,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: "22",
                                cy: "22",
                                r: "21",
                                stroke: t.accent,
                                strokeWidth: "0.75",
                                fill: hexA(t.accent, 0.05)
                            }, void 0, false, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 280,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M13 22l6 6 12-13",
                                stroke: t.accent,
                                strokeWidth: "1.3",
                                strokeLinecap: "round",
                                strokeLinejoin: "round"
                            }, void 0, false, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 281,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 279,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-cormorant font-light",
                        style: {
                            fontSize: 24,
                            color: t.ink
                        },
                        children: [
                            "Thank you, ",
                            name.split(' ')[0],
                            "!"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 283,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-inter",
                        style: {
                            fontSize: 13,
                            color: t.ink,
                            opacity: 0.7,
                            maxWidth: '30ch',
                            textAlign: 'center'
                        },
                        children: attendance === 'accept' ? "We can't wait to celebrate with you." : "We'll miss you, but thank you for letting us know."
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 286,
                        columnNumber: 11
                    }, this),
                    attendance === 'accept' && rsvpCalUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PillLink, {
                            href: rsvpCalUrl,
                            accent: t.accent,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "11",
                                    height: "11",
                                    viewBox: "0 0 12 12",
                                    fill: "none",
                                    "aria-hidden": true,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            x: "1.5",
                                            y: "2.5",
                                            width: "9",
                                            height: "8",
                                            rx: "1",
                                            stroke: t.accent,
                                            strokeWidth: "0.9"
                                        }, void 0, false, {
                                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                            lineNumber: 293,
                                            columnNumber: 87
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M1.5 4.5h9M4 1.5v2M8 1.5v2",
                                            stroke: t.accent,
                                            strokeWidth: "0.9",
                                            strokeLinecap: "round"
                                        }, void 0, false, {
                                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                            lineNumber: 293,
                                            columnNumber: 174
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                    lineNumber: 293,
                                    columnNumber: 15
                                }, this),
                                "Add to Calendar"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                            lineNumber: 292,
                            columnNumber: 35
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 292,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                lineNumber: 274,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "flex flex-col gap-4 w-full",
                style: {
                    maxWidth: 400
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: name,
                        onChange: (e)=>setName(e.target.value),
                        placeholder: "Your full name",
                        style: fieldStyle,
                        onFocus: (e)=>focusOn(e.currentTarget),
                        onBlur: (e)=>focusOff(e.currentTarget),
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 300,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "email",
                        value: email,
                        onChange: (e)=>setEmail(e.target.value),
                        placeholder: "Your email address",
                        style: fieldStyle,
                        onFocus: (e)=>focusOn(e.currentTarget),
                        onBlur: (e)=>focusOff(e.currentTarget),
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 310,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3",
                        children: [
                            [
                                'accept',
                                'Joyfully Accept'
                            ],
                            [
                                'decline',
                                'Regretfully Decline'
                            ]
                        ].map(([val, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setAttendance(val),
                                className: "flex-1 rounded-xl py-3.5 font-inter transition-all",
                                style: {
                                    fontSize: 12,
                                    letterSpacing: '0.03em',
                                    background: attendance === val ? val === 'accept' ? hexA(t.accent, 0.14) : hexA(t.ink, 0.08) : t.dark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.7)',
                                    border: attendance === val ? val === 'accept' ? `1px solid ${hexA(t.accent, 0.45)}` : `1px solid ${hexA(t.ink, 0.25)}` : `1px solid ${hexA(t.accent, 0.2)}`,
                                    color: attendance === val ? val === 'accept' ? t.accent : t.ink : t.dark ? 'rgba(236,234,227,0.6)' : 'rgba(26,24,22,0.5)'
                                },
                                children: label
                            }, val, false, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 323,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 321,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        value: message,
                        onChange: (e)=>setMessage(e.target.value),
                        placeholder: "A note for the couple (optional)",
                        rows: 3,
                        style: {
                            ...fieldStyle,
                            resize: 'none'
                        },
                        onFocus: (e)=>focusOn(e.currentTarget),
                        onBlur: (e)=>focusOff(e.currentTarget)
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 347,
                        columnNumber: 11
                    }, this),
                    status === 'error' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-inter text-center",
                        style: {
                            fontSize: 11,
                            color: '#8A4030'
                        },
                        children: "Something went wrong — please try again."
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 358,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                        type: "submit",
                        disabled: !isValid || status === 'submitting',
                        whileTap: reduced ? {} : {
                            scale: 0.97
                        },
                        className: "w-full rounded-full py-4 font-inter disabled:opacity-40 transition-opacity",
                        style: {
                            background: t.accent,
                            color: '#FDFCF9',
                            fontSize: 13,
                            letterSpacing: '0.06em',
                            boxShadow: `0 6px 20px ${hexA(t.accent, 0.3)}`
                        },
                        children: status === 'submitting' ? 'Sending…' : 'Send RSVP'
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 363,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                lineNumber: 299,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/invite/[id]/preview/page.tsx",
        lineNumber: 259,
        columnNumber: 5
    }, this);
}
// ── section renderers ──────────────────────────────────────────────────────────
// Per-layout-family structure. Each theme's layout gives the sections a distinct
// alignment, type treatment, framing and rhythm so themes feel genuinely unique.
function layoutStyle(t) {
    switch(t.layout){
        case 'editorial':
            return {
                align: 'left',
                items: 'items-start',
                text: 'text-left',
                maxW: 640,
                pad: 'px-7 py-16',
                headingScale: 1.18,
                eyebrow: true,
                frame: false,
                headFont: t.font,
                headItalic: t.fontStyle === 'italic',
                rule: 'bar'
            };
        case 'paper':
            return {
                align: 'center',
                items: 'items-center',
                text: 'text-center',
                maxW: 540,
                pad: 'px-7 py-12',
                headingScale: 0.78,
                eyebrow: false,
                frame: true,
                headFont: 'var(--font-cormorant)',
                headItalic: true,
                rule: 'diamond'
            };
        case 'ethereal':
            return {
                align: 'center',
                items: 'items-center',
                text: 'text-center',
                maxW: 460,
                pad: 'px-8 py-24',
                headingScale: 1.05,
                eyebrow: false,
                frame: false,
                headFont: t.font,
                headItalic: t.fontStyle === 'italic',
                rule: 'hair'
            };
        default:
            return {
                align: 'center',
                items: 'items-center',
                text: 'text-center',
                maxW: 560,
                pad: 'px-8 py-14',
                headingScale: 1,
                eyebrow: false,
                frame: false,
                headFont: t.font,
                headItalic: t.fontStyle === 'italic',
                rule: 'ornament'
            };
    }
}
function SectionBlock({ section, index }) {
    const t = useTheme();
    const ls = layoutStyle(t);
    const cfg = section.config;
    const label = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SECTION_LABELS"][section.type] ?? section.type;
    const Heading = ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `${ls.text} mb-5 w-full`,
            children: [
                ls.eyebrow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-inter block mb-2",
                    style: {
                        fontSize: 11,
                        letterSpacing: '0.3em',
                        color: t.accent,
                        opacity: 0.8
                    },
                    children: String(index + 1).padStart(2, '0')
                }, void 0, false, {
                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                    lineNumber: 418,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    style: {
                        fontFamily: ls.headFont,
                        fontStyle: ls.headItalic ? 'italic' : 'normal',
                        fontSize: `calc(clamp(2.2rem, 7vw, 3.2rem) * ${t.fontScale * ls.headingScale})`,
                        color: ls.frame ? t.ink : t.accent,
                        letterSpacing: ls.headItalic ? '0.005em' : '0.01em',
                        lineHeight: 1.1
                    },
                    children: children
                }, void 0, false, {
                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                    lineNumber: 422,
                    columnNumber: 7
                }, this),
                ls.rule === 'bar' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "mt-4 block",
                    style: {
                        width: 54,
                        height: 3,
                        background: t.accent,
                        borderRadius: 2
                    }
                }, void 0, false, {
                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                    lineNumber: 425,
                    columnNumber: 29
                }, this),
                ls.rule === 'hair' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "mt-5 mx-auto block",
                    style: {
                        width: 70,
                        height: 1,
                        background: hexA(t.accent, 0.5)
                    }
                }, void 0, false, {
                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                    lineNumber: 426,
                    columnNumber: 30
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/invite/[id]/preview/page.tsx",
            lineNumber: 416,
            columnNumber: 5
        }, this);
    const Body = ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: `font-inter leading-relaxed ${ls.align === 'left' ? '' : 'mx-auto'} ${ls.text} max-w-[42ch]`,
            style: {
                fontSize: 14.5,
                color: t.ink,
                opacity: 0.78,
                lineHeight: 1.75
            },
            children: children
        }, void 0, false, {
            fileName: "[project]/app/invite/[id]/preview/page.tsx",
            lineNumber: 431,
            columnNumber: 5
        }, this);
    let content = null;
    switch(section.type){
        case 'story':
            content = cfg.text ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Heading, {
                        children: "Our Story"
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 442,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3 leading-none select-none text-center",
                        style: {
                            fontFamily: t.font,
                            fontStyle: t.fontStyle,
                            fontSize: 72,
                            color: hexA(t.accent, 0.18),
                            lineHeight: 0.8
                        },
                        "aria-hidden": true,
                        children: "“"
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 443,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Body, {
                        children: cfg.text
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 444,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true) : null;
            break;
        case 'schedule':
            {
                const items = [
                    (cfg.ceremony_time || cfg.ceremony_venue) && {
                        label: 'Ceremony',
                        time: cfg.ceremony_time,
                        venue: cfg.ceremony_venue
                    },
                    (cfg.reception_time || cfg.reception_venue) && {
                        label: 'Reception',
                        time: cfg.reception_time,
                        venue: cfg.reception_venue
                    }
                ].filter(Boolean);
                content = items.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Heading, {
                            children: "The Day"
                        }, void 0, false, {
                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                            lineNumber: 456,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Timeline, {
                            items: items,
                            t: t
                        }, void 0, false, {
                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                            lineNumber: 457,
                            columnNumber: 11
                        }, this),
                        !!cfg.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Body, {
                                children: String(cfg.notes)
                            }, void 0, false, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 458,
                                columnNumber: 49
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                            lineNumber: 458,
                            columnNumber: 27
                        }, this)
                    ]
                }, void 0, true) : null;
                break;
            }
        case 'venue':
            {
                const hasContent = !!(cfg.name || cfg.address);
                content = hasContent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(VenueBlock, {
                    cfg: cfg,
                    t: t
                }, void 0, false, {
                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                    lineNumber: 466,
                    columnNumber: 30
                }, this) : null;
                break;
            }
        case 'gallery':
            content = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Heading, {
                        children: "Photos"
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 473,
                        columnNumber: 11
                    }, this),
                    cfg.note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Body, {
                        children: cfg.note
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 474,
                        columnNumber: 24
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full mt-5",
                        style: {
                            maxWidth: 440
                        },
                        children: [
                            0,
                            1,
                            2,
                            3,
                            4,
                            5
                        ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `rounded-xl ${i % 5 === 0 ? 'row-span-2 aspect-[3/4] sm:col-span-1' : 'aspect-square'}`,
                                style: {
                                    background: `linear-gradient(135deg, ${hexA(t.accent, 0.18 + i % 3 * 0.04)} 0%, ${hexA(t.accent, 0.07)} 100%)`,
                                    border: `1px solid ${hexA(t.accent, 0.16)}`
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex h-full items-center justify-center",
                                    style: {
                                        opacity: 0.35
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "22",
                                        height: "22",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        "aria-hidden": true,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                x: "3",
                                                y: "5",
                                                width: "18",
                                                height: "14",
                                                rx: "2",
                                                stroke: t.accent,
                                                strokeWidth: "1.2"
                                            }, void 0, false, {
                                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                                lineNumber: 480,
                                                columnNumber: 91
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                cx: "8.5",
                                                cy: "10",
                                                r: "1.6",
                                                fill: t.accent
                                            }, void 0, false, {
                                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                                lineNumber: 480,
                                                columnNumber: 176
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M5 17l4.5-4 3 2.5L17 11l2 2",
                                                stroke: t.accent,
                                                strokeWidth: "1.2",
                                                fill: "none"
                                            }, void 0, false, {
                                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                                lineNumber: 480,
                                                columnNumber: 226
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                        lineNumber: 480,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                    lineNumber: 479,
                                    columnNumber: 17
                                }, this)
                            }, i, false, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 477,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 475,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true);
            break;
        case 'travel':
            content = cfg.content ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Heading, {
                        children: "Travel & Stay"
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 492,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `mt-1 flex w-full flex-col gap-3 ${ls.align === 'left' ? '' : 'items-center'}`,
                        style: {
                            maxWidth: 460
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-3 rounded-2xl px-4 py-3.5 w-full",
                            style: {
                                background: hexA(t.accent, 0.05),
                                border: `1px solid ${hexA(t.accent, 0.16)}`
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "20",
                                    height: "20",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    className: "flex-none mt-0.5",
                                    "aria-hidden": true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M21 16l-7-4V5.5a1.5 1.5 0 0 0-3 0V12l-7 4v2l7-2v3l-2 1.5V22l3.5-1L16 22v-1.5L14 19v-3l7 2v-2z",
                                        fill: hexA(t.accent, 0.85)
                                    }, void 0, false, {
                                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                        lineNumber: 495,
                                        columnNumber: 116
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                    lineNumber: 495,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-inter text-left",
                                    style: {
                                        fontSize: 13.5,
                                        color: t.ink,
                                        opacity: 0.8,
                                        lineHeight: 1.7
                                    },
                                    children: cfg.content
                                }, void 0, false, {
                                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                    lineNumber: 496,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                            lineNumber: 494,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 493,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true) : null;
            break;
        case 'gifts':
            {
                const giftText = cfg.content;
                const url = giftText?.match(/https?:\/\/[^\s]+/)?.[0];
                content = giftText ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Heading, {
                            children: "Gifts"
                        }, void 0, false, {
                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                            lineNumber: 508,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Body, {
                            children: url ? giftText.replace(url, '').trim() || 'Your presence is the greatest gift — but if you wish to give, our registry is here.' : giftText
                        }, void 0, false, {
                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                            lineNumber: 509,
                            columnNumber: 11
                        }, this),
                        url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `mt-6 flex ${ls.align === 'left' ? '' : 'justify-center'}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PillLink, {
                                href: url,
                                accent: t.accent,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "11",
                                        height: "11",
                                        viewBox: "0 0 12 12",
                                        fill: "none",
                                        "aria-hidden": true,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                x: "1.5",
                                                y: "4.5",
                                                width: "9",
                                                height: "6.5",
                                                rx: "1",
                                                stroke: t.accent,
                                                strokeWidth: "0.9"
                                            }, void 0, false, {
                                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                                lineNumber: 513,
                                                columnNumber: 89
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M1.5 6.5h9M6 4.5V11M6 4.5c-1.4-2.6-4-1.6-3 .4M6 4.5c1.4-2.6 4-1.6 3 .4",
                                                stroke: t.accent,
                                                strokeWidth: "0.9",
                                                strokeLinecap: "round",
                                                fill: "none"
                                            }, void 0, false, {
                                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                                lineNumber: 513,
                                                columnNumber: 178
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                        lineNumber: 513,
                                        columnNumber: 17
                                    }, this),
                                    "View Gift List"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 512,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                            lineNumber: 511,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true) : null;
                break;
            }
        case 'dress_code':
            content = cfg.code || cfg.notes ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Heading, {
                        children: "What to Wear"
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 526,
                        columnNumber: 11
                    }, this),
                    cfg.code && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-inter inline-block rounded-full px-5 py-2 mb-4 capitalize",
                        style: {
                            fontSize: 12,
                            background: hexA(t.accent, 0.1),
                            color: t.accent,
                            letterSpacing: '0.05em',
                            border: `1px solid ${hexA(t.accent, 0.25)}`
                        },
                        children: cfg.code
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 528,
                        columnNumber: 13
                    }, this),
                    cfg.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Body, {
                        children: cfg.notes
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 535,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true) : null;
            break;
        case 'faq':
            {
                const qs = cfg.questions ?? [];
                content = qs.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Heading, {
                            children: "Questions"
                        }, void 0, false, {
                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                            lineNumber: 544,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-5 text-left w-full",
                            style: {
                                maxWidth: 440
                            },
                            children: qs.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pb-5",
                                    style: {
                                        borderBottom: `1px solid ${hexA(t.accent, 0.12)}`
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-cormorant font-light",
                                            style: {
                                                fontSize: 17,
                                                color: t.ink
                                            },
                                            children: item.q
                                        }, void 0, false, {
                                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                            lineNumber: 548,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-inter mt-1.5",
                                            style: {
                                                fontSize: 13,
                                                color: t.ink,
                                                opacity: 0.7,
                                                lineHeight: 1.6
                                            },
                                            children: item.a
                                        }, void 0, false, {
                                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                            lineNumber: 549,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                    lineNumber: 547,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                            lineNumber: 545,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true) : null;
                break;
            }
        default:
            content = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Heading, {
                children: label
            }, void 0, false, {
                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                lineNumber: 559,
                columnNumber: 17
            }, this);
    }
    if (!content) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 24
        },
        whileInView: {
            opacity: 1,
            y: 0
        },
        viewport: {
            once: true,
            margin: '-60px'
        },
        transition: {
            duration: 0.6,
            ease: [
                0.22,
                1,
                0.36,
                1
            ]
        },
        className: `flex flex-col ${ls.items} ${ls.pad}`,
        style: {
            maxWidth: ls.frame ? 560 : ls.maxW,
            margin: '0 auto',
            ...ls.frame ? {
                border: `1px solid ${hexA(t.accent, 0.35)}`,
                outline: `1px solid ${hexA(t.accent, 0.18)}`,
                outlineOffset: 5,
                borderRadius: 4,
                background: hexA(t.paper, t.dark ? 0.5 : 0.6),
                marginTop: 22,
                marginBottom: 22
            } : {}
        },
        children: content
    }, void 0, false, {
        fileName: "[project]/app/invite/[id]/preview/page.tsx",
        lineNumber: 565,
        columnNumber: 5
    }, this);
}
// A vertical timeline of the day's events — connector line + accent dots.
function Timeline({ items, t }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative mt-2 w-full",
        style: {
            maxWidth: 360
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute top-2 bottom-2",
                style: {
                    left: 7,
                    width: 1,
                    background: hexA(t.accent, 0.3)
                },
                "aria-hidden": true
            }, void 0, false, {
                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                lineNumber: 593,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-7",
                children: items.map((it, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative pl-8 text-left",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute left-0 top-1 flex items-center justify-center rounded-full",
                                style: {
                                    width: 15,
                                    height: 15,
                                    background: hexA(t.accent, 0.16),
                                    border: `1px solid ${t.accent}`
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        width: 5,
                                        height: 5,
                                        borderRadius: '50%',
                                        background: t.accent
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                    lineNumber: 598,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 597,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-inter uppercase",
                                style: {
                                    fontSize: 9,
                                    letterSpacing: '0.22em',
                                    color: t.accent,
                                    opacity: 0.9
                                },
                                children: it.label
                            }, void 0, false, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 600,
                                columnNumber: 13
                            }, this),
                            it.time && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-cormorant font-light leading-none mt-1",
                                style: {
                                    fontSize: 30,
                                    color: t.ink,
                                    letterSpacing: '-0.01em'
                                },
                                children: it.time
                            }, void 0, false, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 601,
                                columnNumber: 25
                            }, this),
                            it.venue && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-inter mt-1",
                                style: {
                                    fontSize: 12.5,
                                    color: t.ink,
                                    opacity: 0.62,
                                    letterSpacing: '0.03em'
                                },
                                children: it.venue
                            }, void 0, false, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 602,
                                columnNumber: 26
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 596,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                lineNumber: 594,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/invite/[id]/preview/page.tsx",
        lineNumber: 592,
        columnNumber: 5
    }, this);
}
// Venue block — name heading, address/details, Open in Maps + Add to Calendar.
function VenueBlock({ cfg, t }) {
    const meta = useMeta();
    const calUrl = googleCalUrl(meta);
    const ls = layoutStyle(t);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: `${ls.text} mb-4`,
                style: {
                    fontFamily: ls.headFont,
                    fontStyle: ls.headItalic ? 'italic' : 'normal',
                    fontSize: `calc(clamp(2.2rem, 7vw, 3.2rem) * ${t.fontScale * ls.headingScale})`,
                    color: ls.frame ? t.ink : t.accent,
                    lineHeight: 1.1
                },
                children: cfg.name || 'The Venue'
            }, void 0, false, {
                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                lineNumber: 617,
                columnNumber: 7
            }, this),
            !!cfg.address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: `font-inter ${ls.text} ${ls.align === 'left' ? '' : 'mx-auto'} max-w-[40ch]`,
                style: {
                    fontSize: 14,
                    color: t.ink,
                    opacity: 0.8,
                    lineHeight: 1.7
                },
                children: cfg.address
            }, void 0, false, {
                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                lineNumber: 620,
                columnNumber: 25
            }, this),
            !!cfg.details && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: `font-inter mt-2 ${ls.text} ${ls.align === 'left' ? '' : 'mx-auto'} max-w-[40ch]`,
                style: {
                    fontSize: 13,
                    color: t.ink,
                    opacity: 0.62,
                    lineHeight: 1.7
                },
                children: cfg.details
            }, void 0, false, {
                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                lineNumber: 621,
                columnNumber: 25
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mt-6 flex flex-wrap gap-2.5 ${ls.align === 'left' ? '' : 'justify-center'}`,
                children: [
                    !!cfg.address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PillLink, {
                        href: `https://maps.google.com/?q=${encodeURIComponent(cfg.address)}`,
                        accent: t.accent,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "11",
                                height: "11",
                                viewBox: "0 0 10 10",
                                fill: "none",
                                "aria-hidden": true,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M5 1C3.34 1 2 2.34 2 4c0 2.25 3 5 3 5s3-2.75 3-5c0-1.66-1.34-3-3-3z",
                                        stroke: t.accent,
                                        strokeWidth: "0.8",
                                        fill: hexA(t.accent, 0.15)
                                    }, void 0, false, {
                                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                        lineNumber: 625,
                                        columnNumber: 85
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "5",
                                        cy: "4",
                                        r: "1",
                                        fill: t.accent
                                    }, void 0, false, {
                                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                        lineNumber: 625,
                                        columnNumber: 228
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 625,
                                columnNumber: 13
                            }, this),
                            "Open in Maps"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 624,
                        columnNumber: 11
                    }, this),
                    calUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PillLink, {
                        href: calUrl,
                        accent: t.accent,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "11",
                                height: "11",
                                viewBox: "0 0 12 12",
                                fill: "none",
                                "aria-hidden": true,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                        x: "1.5",
                                        y: "2.5",
                                        width: "9",
                                        height: "8",
                                        rx: "1",
                                        stroke: t.accent,
                                        strokeWidth: "0.9"
                                    }, void 0, false, {
                                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                        lineNumber: 631,
                                        columnNumber: 85
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M1.5 4.5h9M4 1.5v2M8 1.5v2M6 6v2.5M4.75 7.25h2.5",
                                        stroke: t.accent,
                                        strokeWidth: "0.9",
                                        strokeLinecap: "round"
                                    }, void 0, false, {
                                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                        lineNumber: 631,
                                        columnNumber: 172
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 631,
                                columnNumber: 13
                            }, this),
                            "Add to Calendar"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 630,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                lineNumber: 622,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
// ── opening hero ───────────────────────────────────────────────────────────────
function OpeningHero({ invite, opening, media, musicRef }) {
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const cfg = opening?.config ?? {};
    const nameA = cfg.name_a?.trim() ?? '';
    const nameB = cfg.name_b?.trim() ?? '';
    const names = nameA && nameB ? `${nameA} & ${nameB}` : nameA || nameB || invite.display_title || 'Your names';
    const date = formatDate(invite.event_date ?? null);
    const familiesNote = cfg.families_note?.trim() || 'Together with their families';
    const preset = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VIDEO_PRESETS"].find((p)=>p.id === cfg.video_preset) ?? null;
    const uploadedAsset = media.find((m)=>m.id === cfg.video_asset_id && m.status === 'ready') ?? null;
    const videoSrc = uploadedAsset ? uploadedAsset.variants.mp4 ?? null : preset?.src ?? null;
    const posterStyle = preset ? {
        background: `linear-gradient(160deg, ${preset.poster.from} 0%, ${preset.poster.to} 100%)`
    } : {
        background: 'linear-gradient(160deg, #F3EFE7 0%, #C9B89A 100%)'
    };
    const track = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MUSIC_TRACKS"].find((t)=>t.id === cfg.music_track);
    const musicAsset = media.find((m)=>m.id === cfg.music_asset_id && m.status === 'ready');
    const musicSrc = musicAsset ? musicAsset.variants.url ?? null : track?.src ?? null;
    const th = useTheme();
    const [musicPlaying, setMusicPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (musicSrc && musicRef.current) {
            musicRef.current.src = musicSrc;
            musicRef.current.loop = true;
        }
    }, [
        musicSrc,
        musicRef
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handler = ()=>setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handler, {
            passive: true
        });
        return ()=>window.removeEventListener('scroll', handler);
    }, []);
    const toggleMusic = ()=>{
        if (!musicRef.current) return;
        if (musicPlaying) {
            musicRef.current.pause();
            setMusicPlaying(false);
        } else {
            void musicRef.current.play().then(()=>setMusicPlaying(true)).catch(()=>{});
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "relative flex h-[100dvh] flex-col items-center justify-center overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0",
                style: posterStyle
            }, void 0, false, {
                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                lineNumber: 705,
                columnNumber: 7
            }, this),
            videoSrc && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                className: "absolute inset-0 h-full w-full object-cover",
                src: videoSrc,
                autoPlay: !reduced,
                muted: true,
                loop: true,
                playsInline: true
            }, videoSrc, false, {
                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                lineNumber: 707,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0",
                style: {
                    background: 'radial-gradient(ellipse at 50% 40%, rgba(253,252,249,0.08) 0%, rgba(26,24,22,0.38) 100%)'
                }
            }, void 0, false, {
                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                lineNumber: 717,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: 20
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                transition: {
                    duration: 1,
                    ease: [
                        0.22,
                        1,
                        0.36,
                        1
                    ],
                    delay: 0.3
                },
                className: "relative z-10 mx-6 px-8 py-12 text-center",
                style: {
                    background: hexA(th.paper, th.dark ? 0.9 : 0.93),
                    backdropFilter: 'blur(20px)',
                    borderRadius: 20,
                    boxShadow: '0 32px 80px rgba(26,24,22,0.3), 0 4px 16px rgba(26,24,22,0.1)',
                    border: `1px solid ${hexA(th.accent, 0.18)}`,
                    maxWidth: 420,
                    width: '100%'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-inter uppercase",
                        style: {
                            fontSize: 9,
                            letterSpacing: '0.3em',
                            color: th.ink,
                            opacity: 0.42
                        },
                        children: familiesNote
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 737,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].h1, {
                        className: "leading-tight mt-4 mb-4",
                        style: {
                            fontFamily: th.font,
                            fontStyle: th.fontStyle,
                            fontSize: `calc(clamp(2.8rem, 10vw, 4rem) * ${th.fontScale})`,
                            color: th.accent,
                            letterSpacing: '0.01em'
                        },
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        transition: {
                            delay: 0.55,
                            duration: 0.8
                        },
                        children: names
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 741,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-auto mb-4",
                        style: {
                            width: 60,
                            height: 1,
                            background: `linear-gradient(90deg, transparent, ${hexA(th.accent, 0.6)}, transparent)`
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 751,
                        columnNumber: 9
                    }, this),
                    date && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-cormorant italic font-light",
                        style: {
                            fontSize: 18,
                            color: th.ink,
                            opacity: 0.78
                        },
                        children: date
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 754,
                        columnNumber: 11
                    }, this),
                    invite.venue_name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-inter mt-1.5",
                        style: {
                            fontSize: 11,
                            letterSpacing: '0.08em',
                            color: th.ink,
                            opacity: 0.5
                        },
                        children: invite.venue_name
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 759,
                        columnNumber: 11
                    }, this),
                    musicSrc && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: toggleMusic,
                        className: "mt-6 flex items-center gap-2 mx-auto rounded-full px-4 py-2 transition-all",
                        style: {
                            background: musicPlaying ? hexA(th.accent, 0.14) : hexA(th.accent, 0.06),
                            border: `1px solid ${hexA(th.accent, 0.22)}`,
                            fontSize: 10,
                            letterSpacing: '0.06em',
                            color: th.accent
                        },
                        "aria-label": musicPlaying ? 'Pause music' : 'Play music',
                        children: musicPlaying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex items-end gap-[2px]",
                                    "aria-hidden": true,
                                    children: [
                                        0,
                                        1,
                                        2
                                    ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                                            style: {
                                                width: 2,
                                                borderRadius: 2,
                                                background: th.accent,
                                                display: 'block'
                                            },
                                            animate: {
                                                height: [
                                                    3,
                                                    9,
                                                    3
                                                ]
                                            },
                                            transition: {
                                                duration: 0.9,
                                                repeat: Infinity,
                                                ease: 'easeInOut',
                                                delay: i * 0.18
                                            }
                                        }, i, false, {
                                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                            lineNumber: 782,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                    lineNumber: 780,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-inter",
                                    children: track?.title ?? 'Music'
                                }, void 0, false, {
                                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                    lineNumber: 790,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "10",
                                    height: "12",
                                    viewBox: "0 0 10 12",
                                    fill: "none",
                                    "aria-hidden": true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M1 1.5L9 6L1 10.5V1.5Z",
                                        fill: th.accent
                                    }, void 0, false, {
                                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                        lineNumber: 795,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                    lineNumber: 794,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-inter",
                                    children: "Play music"
                                }, void 0, false, {
                                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                    lineNumber: 797,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 765,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                lineNumber: 722,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: !scrolled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
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
                        delay: 1.8
                    },
                    className: "absolute bottom-8 flex flex-col items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-inter uppercase",
                            style: {
                                fontSize: 8,
                                letterSpacing: '0.2em',
                                color: 'rgba(253,252,249,0.5)'
                            },
                            children: "Scroll"
                        }, void 0, false, {
                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                            lineNumber: 813,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            animate: reduced ? {} : {
                                y: [
                                    0,
                                    6,
                                    0
                                ]
                            },
                            transition: {
                                duration: 1.8,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "12",
                                height: "8",
                                viewBox: "0 0 12 8",
                                fill: "none",
                                "aria-hidden": true,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M1 1.5L6 6.5L11 1.5",
                                    stroke: "rgba(253,252,249,0.5)",
                                    strokeWidth: "1.2",
                                    strokeLinecap: "round"
                                }, void 0, false, {
                                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                    lineNumber: 821,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 820,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                            lineNumber: 816,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                    lineNumber: 806,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                lineNumber: 804,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/invite/[id]/preview/page.tsx",
        lineNumber: 704,
        columnNumber: 5
    }, this);
}
function PreviewPage() {
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const id = params.id;
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('loading');
    const [invite, setInvite] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [sections, setSections] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [media, setMedia] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [opened, setOpened] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [skipOpener, setSkipOpener] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [openerLeaving, setOpenerLeaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const musicRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Read ?skipOpener=1 on the client (set by the builder's Preview button) so a
    // couple checking their work jumps straight to the invitation, no opener gate.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (new URLSearchParams(window.location.search).get('skipOpener') === '1') {
            setSkipOpener(true);
            setOpened(true);
        }
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        musicRef.current = new Audio();
        musicRef.current.volume = 0.55;
        return ()=>{
            musicRef.current?.pause();
        };
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        (async ()=>{
            try {
                const [inv, secs, med] = await Promise.all([
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].getInvite(id),
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].listSections(id),
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].listMedia(id).catch(()=>[])
                ]);
                if (cancelled) return;
                setInvite(inv);
                setSections(secs);
                setMedia(med);
                setState('ready');
            } catch  {
                if (!cancelled) setState('error');
            }
        })();
        return ()=>{
            cancelled = true;
        };
    }, [
        id
    ]);
    const handleCopy = ()=>{
        copyLink();
        setCopied(true);
        setTimeout(()=>setCopied(false), 2000);
    };
    const opening = sections.find((s)=>s.type === 'opening') ?? null;
    const contentSections = sections.filter((s)=>s.type !== 'opening');
    const cfg = opening?.config ?? {};
    const nameA = cfg.name_a?.trim() ?? '';
    const nameB = cfg.name_b?.trim() ?? '';
    const date = formatDate(invite?.event_date ?? null);
    // Invite meta shared with sections (Add-to-Calendar, RSVP).
    const venueSection = contentSections.find((s)=>s.type === 'venue');
    const venueCfg = venueSection?.config ?? {};
    const meta = {
        names: nameA && nameB ? `${nameA} & ${nameB}` : nameA || nameB || invite?.display_title || 'Our Wedding',
        dateISO: invite?.event_date ?? null,
        dateLabel: date,
        venueName: venueCfg.name ?? invite?.venue_name ?? null,
        venueAddress: venueCfg.address ?? null
    };
    // Resolve the chosen palette + heading font (from the Style step) into a theme.
    const palette = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PALETTE_MAP"][cfg.palette ?? ''] ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_PALETTE"];
    const headingFont = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HEADING_FONT_MAP"][cfg.heading_font ?? ''] ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_HEADING_FONT"];
    const theme = {
        accent: palette.accent,
        accentSoft: palette.accentSoft,
        paper: palette.paper,
        ink: palette.ink,
        wash: palette.wash,
        washAlt: palette.washAlt,
        font: headingFont.var,
        fontScale: headingFont.scale,
        fontStyle: headingFont.italic ? 'italic' : 'normal',
        dark: !!palette.dark,
        layout: palette.layout
    };
    const sectionBgs = [
        theme.wash,
        theme.washAlt
    ];
    // The invitation's film — revealed behind the opener as it's dragged open.
    const openPreset = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VIDEO_PRESETS"].find((p)=>p.id === cfg.video_preset) ?? null;
    const openUploaded = media.find((m)=>m.id === cfg.video_asset_id && m.status === 'ready') ?? null;
    const themeVideo = openUploaded ? openUploaded.variants.mp4 ?? null : openPreset?.src ?? null;
    const themePoster = openUploaded ? openUploaded.variants.poster ?? null : openPreset?.posterImg ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VIDEO_PRESETS"][0].posterImg;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeCtx.Provider, {
        value: theme,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MetaCtx.Provider, {
            value: meta,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-[100dvh]",
                style: {
                    background: theme.wash
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-3",
                        style: {
                            background: 'rgba(250,244,235,0.92)',
                            backdropFilter: 'blur(10px)',
                            borderBottom: '1px solid rgba(26,24,22,0.06)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-inter uppercase",
                                style: {
                                    fontSize: 9,
                                    letterSpacing: '0.2em',
                                    color: 'rgba(26,24,22,0.38)'
                                },
                                children: "Draft preview"
                            }, void 0, false, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 939,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: handleCopy,
                                        className: "flex items-center gap-1.5 rounded-full px-3 py-1.5 font-inter transition-all",
                                        style: {
                                            fontSize: 11,
                                            background: copied ? 'rgba(168,133,75,0.12)' : 'rgba(26,24,22,0.06)',
                                            color: copied ? '#A8854B' : 'rgba(26,24,22,0.55)',
                                            border: copied ? '1px solid rgba(168,133,75,0.3)' : '1px solid transparent'
                                        },
                                        "aria-label": "Copy preview link",
                                        children: copied ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    width: "10",
                                                    height: "10",
                                                    viewBox: "0 0 10 10",
                                                    fill: "none",
                                                    "aria-hidden": true,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M1.5 5L3.5 7L8.5 2",
                                                        stroke: "#A8854B",
                                                        strokeWidth: "1.3",
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                                        lineNumber: 959,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                                    lineNumber: 958,
                                                    columnNumber: 17
                                                }, this),
                                                "Copied!"
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    width: "10",
                                                    height: "10",
                                                    viewBox: "0 0 10 10",
                                                    fill: "none",
                                                    "aria-hidden": true,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                            x: "3",
                                                            y: "1",
                                                            width: "6",
                                                            height: "7",
                                                            rx: "1",
                                                            stroke: "currentColor",
                                                            strokeWidth: "1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                                            lineNumber: 966,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            d: "M1 3v6a1 1 0 0 0 1 1h5",
                                                            stroke: "currentColor",
                                                            strokeWidth: "1",
                                                            strokeLinecap: "round"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                                            lineNumber: 967,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                                    lineNumber: 965,
                                                    columnNumber: 17
                                                }, this),
                                                "Copy link"
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                        lineNumber: 944,
                                        columnNumber: 11
                                    }, this),
                                    skipOpener ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>{
                                            if (window.history.length > 1) window.history.back();
                                            else window.location.href = `/builder/${id}/review`;
                                        },
                                        className: "flex items-center gap-1.5 rounded-full px-3 py-1.5 font-inter",
                                        style: {
                                            fontSize: 11,
                                            background: '#1A1816',
                                            color: '#FDFCF9'
                                        },
                                        children: "← Editing"
                                    }, void 0, false, {
                                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                        lineNumber: 975,
                                        columnNumber: 13
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/builder/${id}/review`,
                                        className: "flex items-center gap-1.5 rounded-full px-3 py-1.5 font-inter",
                                        style: {
                                            fontSize: 11,
                                            background: '#1A1816',
                                            color: '#FDFCF9'
                                        },
                                        children: "Edit →"
                                    }, void 0, false, {
                                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                        lineNumber: 984,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 943,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 935,
                        columnNumber: 7
                    }, this),
                    state === 'loading' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-[100dvh] items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "32",
                                    height: "32",
                                    viewBox: "0 0 32 32",
                                    fill: "none",
                                    "aria-hidden": true,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "16",
                                            cy: "16",
                                            r: "13",
                                            stroke: "rgba(168,133,75,0.2)",
                                            strokeWidth: "2"
                                        }, void 0, false, {
                                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                            lineNumber: 1000,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M16 3A13 13 0 0 1 29 16",
                                            stroke: "#A8854B",
                                            strokeWidth: "2",
                                            strokeLinecap: "round",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("animateTransform", {
                                                attributeName: "transform",
                                                type: "rotate",
                                                from: "0 16 16",
                                                to: "360 16 16",
                                                dur: "1s",
                                                repeatCount: "indefinite"
                                            }, void 0, false, {
                                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                                lineNumber: 1002,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                            lineNumber: 1001,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                    lineNumber: 999,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-inter uppercase",
                                    style: {
                                        fontSize: 9,
                                        letterSpacing: '0.2em',
                                        color: 'rgba(26,24,22,0.4)'
                                    },
                                    children: "Preparing your invitation…"
                                }, void 0, false, {
                                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                    lineNumber: 1005,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                            lineNumber: 998,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 997,
                        columnNumber: 9
                    }, this),
                    state === 'error' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-[100dvh] flex-col items-center justify-center gap-4 px-8 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-cormorant font-light",
                                style: {
                                    fontSize: 24,
                                    color: '#1A1816'
                                },
                                children: "Couldn’t load the invitation"
                            }, void 0, false, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 1015,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-inter",
                                style: {
                                    fontSize: 13,
                                    color: 'rgba(26,24,22,0.5)'
                                },
                                children: "Make sure you’re on the same device you used to create it, or go back and try again."
                            }, void 0, false, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 1018,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: `/builder/${id}/review`,
                                className: "font-inter rounded-full px-6 py-3 mt-2",
                                style: {
                                    background: '#1A1816',
                                    color: '#FDFCF9',
                                    fontSize: 13
                                },
                                children: "Back to builder"
                            }, void 0, false, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 1021,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 1014,
                        columnNumber: 9
                    }, this),
                    state === 'ready' && invite && !opened && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "fixed inset-0 z-[60]",
                        animate: {
                            opacity: openerLeaving ? 0 : 1
                        },
                        transition: {
                            duration: 0.5,
                            ease: 'easeInOut'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InviteOpener"], {
                            id: cfg.opener ?? 'wax-letter',
                            theme: {
                                accent: theme.accent,
                                paper: theme.paper,
                                flap: theme.washAlt,
                                ink: theme.ink,
                                font: theme.font,
                                fontStyle: theme.fontStyle,
                                dark: theme.dark
                            },
                            names: nameA && nameB ? `${nameA} & ${nameB}` : nameA || nameB || invite.display_title || 'You’re Invited',
                            videoSrc: themeVideo,
                            poster: themePoster,
                            onOpen: ()=>{
                                setOpenerLeaving(true);
                                setTimeout(()=>setOpened(true), 500);
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                            lineNumber: 1038,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 1033,
                        columnNumber: 9
                    }, this),
                    state === 'ready' && invite && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "pt-[44px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(OpeningHero, {
                                invite: invite,
                                opening: opening,
                                media: media,
                                musicRef: musicRef
                            }, void 0, false, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 1055,
                                columnNumber: 11
                            }, this),
                            contentSections.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: contentSections.map((sec, i)=>{
                                    // editorial: solid surface (no stripes); ethereal: mostly paper;
                                    // classic/paper: alternating washes.
                                    const bg = theme.layout === 'editorial' ? theme.wash : theme.layout === 'ethereal' ? i % 2 === 0 ? theme.paper : theme.wash : sectionBgs[i % 2];
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            background: bg
                                        },
                                        children: [
                                            i > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(OrnamentDivider, {}, void 0, false, {
                                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                                lineNumber: 1068,
                                                columnNumber: 31
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionBlock, {
                                                section: sec,
                                                index: i
                                            }, void 0, false, {
                                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                                lineNumber: 1069,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, sec.id, true, {
                                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                        lineNumber: 1067,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 1059,
                                columnNumber: 13
                            }, this),
                            invite.event_date && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: sectionBgs[contentSections.length % 2]
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(OrnamentDivider, {}, void 0, false, {
                                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                        lineNumber: 1079,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CountdownTimer, {
                                        eventDate: invite.event_date
                                    }, void 0, false, {
                                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                        lineNumber: 1080,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 1078,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: sectionBgs[(contentSections.length + 1) % 2]
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(OrnamentDivider, {}, void 0, false, {
                                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                        lineNumber: 1086,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RsvpSection, {
                                        inviteId: id
                                    }, void 0, false, {
                                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                        lineNumber: 1087,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 1085,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                                className: "flex flex-col items-center gap-4 py-20 px-8 text-center",
                                style: {
                                    background: '#1A1816'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(OrnamentDivider, {}, void 0, false, {
                                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                        lineNumber: 1092,
                                        columnNumber: 13
                                    }, this),
                                    (nameA || nameB) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontFamily: theme.font,
                                            fontStyle: theme.fontStyle,
                                            fontSize: `calc(clamp(2rem, 8vw, 3rem) * ${theme.fontScale})`,
                                            color: 'rgba(253,252,249,0.9)',
                                            letterSpacing: '0.01em',
                                            lineHeight: 1.1
                                        },
                                        children: nameA && nameB ? `${nameA} & ${nameB}` : nameA || nameB
                                    }, void 0, false, {
                                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                        lineNumber: 1094,
                                        columnNumber: 15
                                    }, this),
                                    date && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-cormorant italic font-light",
                                        style: {
                                            fontSize: 16,
                                            color: 'rgba(253,252,249,0.4)'
                                        },
                                        children: date
                                    }, void 0, false, {
                                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                        lineNumber: 1099,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-cormorant italic font-light mt-2",
                                        style: {
                                            fontSize: 18,
                                            color: 'rgba(253,252,249,0.55)'
                                        },
                                        children: "We can’t wait to celebrate with you."
                                    }, void 0, false, {
                                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                        lineNumber: 1103,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-inter mt-4",
                                        style: {
                                            fontSize: 9,
                                            letterSpacing: '0.2em',
                                            color: 'rgba(253,252,249,0.18)',
                                            textTransform: 'uppercase'
                                        },
                                        children: "Made with Digital Invite"
                                    }, void 0, false, {
                                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                        lineNumber: 1106,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 1091,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 1054,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                lineNumber: 933,
                columnNumber: 5
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/invite/[id]/preview/page.tsx",
            lineNumber: 932,
            columnNumber: 5
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/invite/[id]/preview/page.tsx",
        lineNumber: 931,
        columnNumber: 4
    }, this);
}
}}),

};

//# sourceMappingURL=_f5492ec7._.js.map