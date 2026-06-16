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
    "parseCoupleNames": (()=>parseCoupleNames),
    "shade": (()=>shade)
});
function expand(hex) {
    const h = hex.replace('#', '');
    return h.length === 3 ? h.split('').map((c)=>c + c).join('') : h;
}
function hexA(hex, a) {
    const h = expand(hex);
    const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}
function shade(hex, amt) {
    // amt > 0 darkens, amt < 0 lightens
    const h = expand(hex);
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
function parseCoupleNames(input) {
    const cap = (s)=>{
        const t = s.trim();
        return t ? t.charAt(0).toUpperCase() + t.slice(1) : '';
    };
    const parts = input.split(/&|\band\b|\+/i).map(cap).filter(Boolean);
    return {
        name_a: parts[0] ?? '',
        name_b: parts[1] ?? ''
    };
}
}}),
"[project]/components/invite/openers/realistic-seal.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "RealisticSeal": (()=>RealisticSeal)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
// A photoreal gold wax seal. Dimensional metallic face, a domed molten rim, a
// stamped (recessed) inner field, an embossed calligraphic monogram, fine wax
// grain (feTurbulence), a specular hotspot and a slow sheen. Vector → crisp at
// any size, any monogram.
const G = {
    bright: '#FFF8E2',
    hi: '#F4DD93',
    light: '#E3C062',
    mid: '#C99B38',
    deep: '#9A7322',
    shadow: '#5C400D',
    dark: '#412D08'
};
// lumpy, hand-poured wax outline (viewBox 0 0 220 220)
const BLOB = 'M110 11 C140 12 157 22 170 41 C182 57 204 60 206 90 C207 116 216 134 201 158 ' + 'C189 180 184 206 153 209 C127 211 118 217 101 212 C77 205 56 211 43 190 ' + 'C31 170 11 159 16 128 C20 101 7 84 23 60 C36 40 38 14 70 14 C92 14 91 9 110 11 Z';
function RealisticSeal({ mono, size = 200, font = 'var(--font-pinyon)', rose = true }) {
    const uid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])().replace(/:/g, '');
    const face = `f-${uid}`, faceIn = `fi-${uid}`, rim = `r-${uid}`, spec = `s-${uid}`;
    const grain = `g-${uid}`, warp = `w-${uid}`, sheen = `sh-${uid}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        style: {
            width: size,
            height: size,
            filter: `drop-shadow(0 ${size * 0.045}px ${size * 0.06}px rgba(40,28,6,0.42)) drop-shadow(0 ${size * 0.11}px ${size * 0.13}px rgba(40,28,6,0.3))`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: "0 0 220 220",
                width: "100%",
                height: "100%",
                "aria-hidden": true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("radialGradient", {
                                id: face,
                                cx: "40%",
                                cy: "30%",
                                r: "78%",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "0%",
                                        stopColor: G.bright
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 46,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "18%",
                                        stopColor: G.hi
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 47,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "48%",
                                        stopColor: G.mid
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 48,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "82%",
                                        stopColor: G.deep
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 49,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "100%",
                                        stopColor: G.shadow
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 50,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("radialGradient", {
                                id: faceIn,
                                cx: "50%",
                                cy: "62%",
                                r: "62%",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "0%",
                                        stopColor: G.light
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 54,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "55%",
                                        stopColor: G.mid
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 55,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "100%",
                                        stopColor: G.deep
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 56,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                id: rim,
                                x1: "0",
                                y1: "0",
                                x2: "0",
                                y2: "1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "0%",
                                        stopColor: G.bright
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 60,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "34%",
                                        stopColor: G.hi
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 61,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "64%",
                                        stopColor: G.mid
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 62,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "100%",
                                        stopColor: G.shadow
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 63,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("radialGradient", {
                                id: spec,
                                cx: "50%",
                                cy: "50%",
                                r: "50%",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "0%",
                                        stopColor: "rgba(255,255,255,0.9)"
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 66,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "100%",
                                        stopColor: "rgba(255,255,255,0)"
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 67,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                id: warp,
                                x: "-12%",
                                y: "-12%",
                                width: "124%",
                                height: "124%",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feTurbulence", {
                                        type: "fractalNoise",
                                        baseFrequency: "0.014 0.018",
                                        numOctaves: "2",
                                        seed: "9",
                                        result: "n"
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 70,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feDisplacementMap", {
                                        in: "SourceGraphic",
                                        in2: "n",
                                        scale: "7",
                                        xChannelSelector: "R",
                                        yChannelSelector: "G"
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 71,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                id: grain,
                                x: "0%",
                                y: "0%",
                                width: "100%",
                                height: "100%",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feTurbulence", {
                                        type: "fractalNoise",
                                        baseFrequency: "0.9",
                                        numOctaves: "2",
                                        seed: "3",
                                        result: "n"
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 74,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feColorMatrix", {
                                        in: "n",
                                        type: "matrix",
                                        values: "0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0",
                                        result: "a"
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 75,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feComposite", {
                                        in: "a",
                                        in2: "SourceAlpha",
                                        operator: "in"
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 76,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                lineNumber: 73,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        filter: `url(#${warp})`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: BLOB,
                                fill: `url(#${face})`
                            }, void 0, false, {
                                fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                lineNumber: 82,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: BLOB,
                                fill: "none",
                                stroke: G.dark,
                                strokeOpacity: "0.45",
                                strokeWidth: "2.5"
                            }, void 0, false, {
                                fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: BLOB,
                                fill: "none",
                                stroke: G.bright,
                                strokeOpacity: "0.3",
                                strokeWidth: "0.8",
                                transform: "translate(-0.6 -0.8)"
                            }, void 0, false, {
                                fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "110",
                        cy: "110",
                        r: "80",
                        fill: `url(#${faceIn})`
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "110",
                        cy: "110",
                        r: "79",
                        fill: "none",
                        stroke: G.shadow,
                        strokeOpacity: "0.5",
                        strokeWidth: "5",
                        style: {
                            filter: 'blur(2.5px)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "110",
                        cy: "108",
                        r: "76",
                        fill: "none",
                        stroke: G.bright,
                        strokeOpacity: "0.35",
                        strokeWidth: "1.4",
                        style: {
                            filter: 'blur(0.6px)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "110",
                        cy: "110",
                        r: "88",
                        fill: "none",
                        stroke: `url(#${rim})`,
                        strokeWidth: "17"
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "110",
                        cy: "110",
                        r: "96.5",
                        fill: "none",
                        stroke: G.dark,
                        strokeOpacity: "0.4",
                        strokeWidth: "1.6"
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M44 96 A66 66 0 0 1 176 96",
                        fill: "none",
                        stroke: G.bright,
                        strokeOpacity: "0.7",
                        strokeWidth: "2.4",
                        strokeLinecap: "round"
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M52 150 A66 66 0 0 0 168 150",
                        fill: "none",
                        stroke: G.dark,
                        strokeOpacity: "0.35",
                        strokeWidth: "3",
                        strokeLinecap: "round",
                        style: {
                            filter: 'blur(1px)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "110",
                        cy: "110",
                        r: "71",
                        fill: "none",
                        stroke: G.shadow,
                        strokeOpacity: "0.4",
                        strokeWidth: "1"
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "110",
                        cy: "110",
                        r: "68.5",
                        fill: "none",
                        stroke: G.bright,
                        strokeOpacity: "0.4",
                        strokeWidth: "0.8"
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this),
                    rose && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Fleuron, {}, void 0, false, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 106,
                        columnNumber: 18
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MonogramEmboss, {
                        mono: mono,
                        font: font
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        filter: `url(#${grain})`,
                        opacity: "0.42",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: BLOB,
                            fill: "#fff"
                        }, void 0, false, {
                            fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                            lineNumber: 112,
                            columnNumber: 53
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                        cx: "80",
                        cy: "60",
                        rx: "50",
                        ry: "30",
                        fill: `url(#${spec})`,
                        opacity: "0.6",
                        transform: "rotate(-18 80 60)"
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-0 overflow-hidden",
                style: {
                    borderRadius: '50%',
                    maskImage: 'radial-gradient(circle at 50% 50%, #000 58%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(circle at 50% 50%, #000 58%, transparent 70%)'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute",
                    style: {
                        inset: '-40%',
                        background: 'linear-gradient(118deg, transparent 43%, rgba(255,255,255,0.6) 50%, transparent 57%)',
                        animation: `${sheen} 6s ease-in-out infinite`
                    }
                }, void 0, false, {
                    fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `@keyframes ${sheen}{0%,100%{transform:translateX(-40%)}50%{transform:translateX(40%)}}`
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
function Fleuron() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
        transform: "translate(110 64)",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                stroke: G.shadow,
                strokeOpacity: "0.55",
                strokeWidth: "1.6",
                fill: "none",
                strokeLinecap: "round",
                transform: "translate(0.6 0.8)",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M0 6 C-5 1 -5 -6 0 -8 C5 -6 5 1 0 6 Z"
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M-8 2 C-12 -2 -11 -7 -6 -7 M8 2 C12 -2 11 -7 6 -7"
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 130,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M0 6 L0 12"
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                stroke: G.bright,
                strokeOpacity: "0.5",
                strokeWidth: "1.1",
                fill: "none",
                strokeLinecap: "round",
                transform: "translate(-0.7 -0.9)",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M0 6 C-5 1 -5 -6 0 -8 C5 -6 5 1 0 6 Z"
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M-8 2 C-12 -2 -11 -7 -6 -7 M8 2 C12 -2 11 -7 6 -7"
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                lineNumber: 133,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
        lineNumber: 127,
        columnNumber: 5
    }, this);
}
function MonogramEmboss({ mono, font }) {
    const isPair = mono.length === 2;
    const label = isPair ? `${mono[0]} & ${mono[1]}` : mono[0] ?? '✦';
    const fs = isPair ? 78 : 110;
    const tl = isPair ? 122 : undefined;
    const common = {
        x: 110,
        y: 128,
        textAnchor: 'middle',
        fontFamily: font,
        fontSize: fs,
        dominantBaseline: 'middle',
        ...tl ? {
            textLength: tl,
            lengthAdjust: 'spacingAndGlyphs'
        } : {}
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
        style: {
            fontWeight: 500
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                ...common,
                fill: G.dark,
                opacity: "0.55",
                transform: "translate(2 2.6)",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                lineNumber: 154,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                ...common,
                fill: G.shadow,
                opacity: "0.85",
                transform: "translate(1 1.3)",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                lineNumber: 155,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                ...common,
                fill: G.bright,
                opacity: "0.95",
                transform: "translate(-1.2 -1.6)",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                ...common,
                fill: G.light,
                children: label
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                lineNumber: 159,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
        lineNumber: 152,
        columnNumber: 5
    }, this);
}
}}),
"[project]/components/invite/openers/interactive.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "EnvelopeOpener": (()=>EnvelopeOpener),
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$realistic$2d$seal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/invite/openers/realistic-seal.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const wait = (ms)=>new Promise((r)=>setTimeout(r, ms));
// ════════════════════════════════════════════════════════════════════════════════
// CINEMATIC REVEAL
// A shared 4-stage sequence the openers run once their object (flap / veil) has
// moved: the screen blooms to pure white "light", holds for a beat of
// anticipation, then the film emerges THROUGH the light (slow fade + settle),
// rather than a hard cut. Driven by MotionValues so the openers can interleave it
// with their own stage-1 motion.
// ════════════════════════════════════════════════════════════════════════════════
function useReveal() {
    const videoOpacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(0) // poster → live film
    ;
    const scrimOpacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(1) // closed-state legibility scrim
    ;
    const filmScale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(1) // 1.08 → 1.00 settle in stage 4
    ;
    const whiteScale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(0) // light blooming from centre
    ;
    const whiteOpacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    // A soft light wash blooms over the opener and lingers for a single breath,
    // then the caller hands off so the whole overlay slowly MELTS into the
    // invitation — the playing film + name card emerging together through the
    // light. A gentle blend, not a blank-white hold and not a hard cut.
    const run = async ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(scrimOpacity, 0, {
            duration: 0.5,
            ease: 'easeOut'
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(whiteScale, 1, {
            duration: 0.8,
            ease: [
                0.22,
                1,
                0.36,
                1
            ]
        });
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(whiteOpacity, 0.92, {
            duration: 0.6,
            ease: 'easeOut'
        });
        await wait(240) // a brief breath of light
        ;
    };
    return {
        videoOpacity,
        scrimOpacity,
        filmScale,
        whiteScale,
        whiteOpacity,
        run
    };
}
// The film, behind everything. Plays the moment the reveal begins so it's already
// in motion by the time the white light clears.
function FilmStage({ videoSrc, poster, play, videoOpacity, scrimOpacity, filmScale }) {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Match OpeningHero's no-crop behaviour so the film doesn't reframe at handoff:
    // contain (+ blurred fill) when a cover crop would be severe, else cover.
    const [fit, setFit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('cover');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const v = ref.current;
        if (!v) return;
        if (!play) {
            v.pause();
            return;
        }
        let cancelled = false;
        const tryPlay = ()=>{
            const p = v.play();
            if (p && typeof p.catch === 'function') {
                p.catch(()=>{
                    if (!cancelled) requestAnimationFrame(()=>{
                        void v.play().catch(()=>{});
                    });
                });
            }
        };
        tryPlay();
        return ()=>{
            cancelled = true;
        };
    }, [
        play
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const decide = ()=>{
            const v = ref.current;
            if (!v || !v.videoWidth || !v.videoHeight) return;
            const videoRatio = v.videoWidth / v.videoHeight;
            const boxRatio = window.innerWidth / window.innerHeight || 1;
            const visible = Math.min(videoRatio, boxRatio) / Math.max(videoRatio, boxRatio);
            setFit(visible >= 0.8 ? 'cover' : 'contain');
        };
        const v = ref.current;
        decide();
        v?.addEventListener('loadedmetadata', decide);
        window.addEventListener('resize', decide);
        return ()=>{
            v?.removeEventListener('loadedmetadata', decide);
            window.removeEventListener('resize', decide);
        };
    }, [
        videoSrc
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "absolute inset-0 overflow-hidden",
        style: {
            zIndex: 10,
            scale: filmScale,
            transformOrigin: '50% 45%'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0",
                style: {
                    background: poster ? `center/cover url(${poster})` : '#111',
                    backgroundColor: '#111'
                }
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            videoSrc && poster && fit === 'contain' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0",
                "aria-hidden": true,
                style: {
                    backgroundImage: `url(${poster})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(34px) saturate(1.12) brightness(0.92)',
                    transform: 'scale(1.18)'
                }
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 92,
                columnNumber: 9
            }, this),
            videoSrc && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].video, {
                ref: ref,
                className: "absolute inset-0 h-full w-full",
                src: videoSrc,
                poster: poster ?? undefined,
                preload: "auto",
                muted: true,
                loop: true,
                playsInline: true,
                style: {
                    opacity: videoOpacity,
                    objectFit: fit
                }
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 105,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute inset-0",
                style: {
                    opacity: scrimOpacity,
                    background: 'radial-gradient(ellipse at 50% 40%, rgba(10,8,6,0.28) 0%, rgba(10,8,6,0.6) 100%)'
                }
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 89,
        columnNumber: 5
    }, this);
}
// The blooming "light" curtain — a huge soft-edged white disc that scales up from
// the opener's centre, holds, then fades to reveal the film.
function WhiteCurtain({ scale, opacity, originY = '52%' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        "aria-hidden": true,
        className: "absolute pointer-events-none",
        style: {
            top: originY,
            left: '50%',
            width: '280vmax',
            height: '280vmax',
            marginLeft: '-140vmax',
            marginTop: '-140vmax',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #ffffff 56%, #fdfaf4 100%)',
            boxShadow: '0 0 200px 80px rgba(255,255,255,0.6)',
            zIndex: 20,
            scale,
            opacity
        }
    }, void 0, false, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 127,
        columnNumber: 5
    }, this);
}
function Greeting({ theme, names, fade }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "pointer-events-none absolute inset-x-0 top-[12%] z-40 flex flex-col items-center text-center px-6",
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
                lineNumber: 145,
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
                lineNumber: 146,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 144,
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
        lineNumber: 154,
        columnNumber: 7
    }, this) : dir === 'apart' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "M6 4L3 7.5L6 11M9 4l3 3.5L9 11",
        stroke: "#fff",
        strokeWidth: "1.3",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }, void 0, false, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 156,
        columnNumber: 7
    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "M7.5 3v8M4 7.5l3.5 3.5L11 7.5",
        stroke: "#fff",
        strokeWidth: "1.3",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }, void 0, false, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 157,
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
        className: "pointer-events-none absolute bottom-[8%] left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2",
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
                    lineNumber: 165,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 162,
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
                lineNumber: 167,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 160,
        columnNumber: 5
    }, this);
}
function EnvelopeOpener({ theme, names, onOpen, videoSrc, poster }) {
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const [opening, setOpening] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const mono = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initials"])(names);
    const ivory = theme.dark ? '#E9E2D2' : '#F4ECDD';
    const rv = useReveal();
    const flapRot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const envScale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(1);
    const envOpacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(1);
    const greet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(1);
    const finish = async ()=>{
        if (opening) return;
        setOpening(true);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(rv.videoOpacity, 1, {
            duration: 0.9
        }) // film comes alive behind
        ;
        if (reduced) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(greet, 0, {
                duration: 0.3
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(rv.scrimOpacity, 0, {
                duration: 0.6
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(envOpacity, 0, {
                duration: 0.6
            });
            await wait(700);
            onOpen();
            return;
        }
        // Stage 1 — the flap lifts up slowly and the envelope breathes open
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(flapRot, 180, {
            duration: 0.95,
            ease: [
                0.33,
                0,
                0.2,
                1
            ]
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(envScale, 1.05, {
            duration: 1.1,
            ease: [
                0.33,
                0,
                0.2,
                1
            ]
        });
        await wait(640) // let the flap open well first
        ;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(greet, 0, {
            duration: 0.4
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(envOpacity, 0, {
            duration: 0.6,
            ease: 'easeIn'
        }) // dissolves as the light washes in
        ;
        // soft light wash, then hand off → overlay melts into the invitation
        await rv.run();
        onOpen();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FilmStage, {
                videoSrc: videoSrc,
                poster: poster,
                play: opening,
                videoOpacity: rv.videoOpacity,
                scrimOpacity: rv.scrimOpacity,
                filmScale: rv.filmScale
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 215,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(WhiteCurtain, {
                scale: rv.whiteScale,
                opacity: rv.whiteOpacity,
                originY: "52%"
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 216,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute inset-0",
                style: {
                    zIndex: 30,
                    scale: envScale,
                    opacity: envOpacity,
                    transformOrigin: '50% 50%'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BotanicalPaper, {
                        ivory: ivory,
                        accent: theme.accent
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/interactive.tsx",
                        lineNumber: 220,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-x-0 top-0",
                        style: {
                            height: '54%',
                            perspective: 1700,
                            perspectiveOrigin: '50% 0%'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "absolute inset-0",
                            style: {
                                transformOrigin: '50% 0%',
                                transformStyle: 'preserve-3d',
                                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                                background: `linear-gradient(176deg, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shade"])(ivory, 0.07)} 0%, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shade"])(ivory, 0.02)} 58%, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shade"])(ivory, -0.06)} 100%)`,
                                filter: `drop-shadow(0 3px 5px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])('#000', 0.16)})`,
                                rotateX: flapRot
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "absolute inset-0 h-full w-full",
                                    viewBox: "0 0 100 100",
                                    preserveAspectRatio: "none",
                                    "aria-hidden": true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M0 0 L50 100 L100 0",
                                        fill: "none",
                                        stroke: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])('#fff', 0.45),
                                        strokeWidth: "0.4",
                                        vectorEffect: "non-scaling-stroke"
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/interactive.tsx",
                                        lineNumber: 234,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/invite/openers/interactive.tsx",
                                    lineNumber: 233,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute left-1/2 top-0 h-full",
                                    style: {
                                        width: 1,
                                        background: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])('#000', 0.05)
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/invite/openers/interactive.tsx",
                                    lineNumber: 236,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/invite/openers/interactive.tsx",
                            lineNumber: 223,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/interactive.tsx",
                        lineNumber: 222,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 219,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Greeting, {
                theme: theme,
                names: names,
                fade: greet
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 241,
                columnNumber: 7
            }, this),
            !opening && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SealButton, {
                onOpen: finish,
                mono: mono,
                font: theme.font,
                reduced: !!reduced
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 244,
                columnNumber: 20
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Hint, {
                dir: "down",
                label: reduced ? 'Tap the seal to open' : 'Press the seal to open',
                show: !opening
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 246,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 214,
        columnNumber: 5
    }, this);
}
// the seal sits where the flap point meets the body; supports click + drag-down
function SealButton({ onOpen, mono, font, reduced }) {
    const y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
        type: "button",
        drag: reduced ? false : 'y',
        dragConstraints: {
            top: 0,
            bottom: 150
        },
        dragElastic: 0.16,
        style: {
            y,
            position: 'absolute',
            left: '50%',
            top: '52%',
            x: '-50%',
            translateY: '-50%',
            zIndex: 50,
            touchAction: 'none',
            cursor: 'pointer'
        },
        whileHover: reduced ? {} : {
            scale: 1.035
        },
        whileTap: {
            scale: 0.97
        },
        onClick: onOpen,
        onDragEnd: (_e, info)=>{
            if (info.offset.y > 80) onOpen();
            else (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(y, 0, {
                type: 'spring',
                stiffness: 300,
                damping: 26
            });
        },
        "aria-label": "Open the invitation",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$realistic$2d$seal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RealisticSeal"], {
            mono: mono,
            size: 186,
            font: font
        }, void 0, false, {
            fileName: "[project]/components/invite/openers/interactive.tsx",
            lineNumber: 267,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 255,
        columnNumber: 5
    }, this);
}
// Ivory stationery: warm paper, subtle botanical emboss, gold corner flourishes, vignette.
function BotanicalPaper({ ivory, accent }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0",
        style: {
            background: `radial-gradient(120% 90% at 50% 0%, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shade"])(ivory, -0.03)} 0%, ${ivory} 45%, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shade"])(ivory, 0.05)} 100%)`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "absolute inset-0 h-full w-full",
                "aria-hidden": true,
                style: {
                    opacity: 0.5,
                    mixBlendMode: 'multiply'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                        id: "paperGrain",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feTurbulence", {
                                type: "fractalNoise",
                                baseFrequency: "0.82",
                                numOctaves: "2",
                                seed: "4"
                            }, void 0, false, {
                                fileName: "[project]/components/invite/openers/interactive.tsx",
                                lineNumber: 278,
                                columnNumber: 33
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feColorMatrix", {
                                type: "matrix",
                                values: "0 0 0 0 0.42  0 0 0 0 0.35  0 0 0 0 0.24  0 0 0 0.05 0"
                            }, void 0, false, {
                                fileName: "[project]/components/invite/openers/interactive.tsx",
                                lineNumber: 278,
                                columnNumber: 114
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/invite/openers/interactive.tsx",
                        lineNumber: 278,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        width: "100%",
                        height: "100%",
                        filter: "url(#paperGrain)"
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/interactive.tsx",
                        lineNumber: 279,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 277,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "absolute inset-0 h-full w-full",
                "aria-hidden": true,
                preserveAspectRatio: "xMidYMid slice",
                viewBox: "0 0 400 400",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pattern", {
                            id: "bot",
                            width: "120",
                            height: "150",
                            patternUnits: "userSpaceOnUse",
                            patternTransform: "rotate(8)",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                fill: "none",
                                strokeWidth: "1.4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                        stroke: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])('#000', 0.05),
                                        transform: "translate(0 1)",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M20 130 C40 110 40 70 22 40 M22 40 C8 56 6 80 20 96 M22 64 C36 60 46 70 46 86 M22 88 C8 86 0 98 0 112"
                                            }, void 0, false, {
                                                fileName: "[project]/components/invite/openers/interactive.tsx",
                                                lineNumber: 287,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M90 20 C108 36 110 70 96 100 M96 64 C82 60 72 70 72 86 M96 88 C112 86 120 100 120 112"
                                            }, void 0, false, {
                                                fileName: "[project]/components/invite/openers/interactive.tsx",
                                                lineNumber: 288,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/invite/openers/interactive.tsx",
                                        lineNumber: 286,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                        stroke: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])('#fff', 0.5),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M20 130 C40 110 40 70 22 40 M22 40 C8 56 6 80 20 96 M22 64 C36 60 46 70 46 86 M22 88 C8 86 0 98 0 112"
                                            }, void 0, false, {
                                                fileName: "[project]/components/invite/openers/interactive.tsx",
                                                lineNumber: 291,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M90 20 C108 36 110 70 96 100 M96 64 C82 60 72 70 72 86 M96 88 C112 86 120 100 120 112"
                                            }, void 0, false, {
                                                fileName: "[project]/components/invite/openers/interactive.tsx",
                                                lineNumber: 292,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/invite/openers/interactive.tsx",
                                        lineNumber: 290,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/invite/openers/interactive.tsx",
                                lineNumber: 285,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/invite/openers/interactive.tsx",
                            lineNumber: 284,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/interactive.tsx",
                        lineNumber: 283,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        width: "400",
                        height: "400",
                        fill: "url(#bot)",
                        opacity: "0.6"
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/interactive.tsx",
                        lineNumber: 297,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 282,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "absolute inset-0 h-full w-full",
                viewBox: "0 0 100 100",
                preserveAspectRatio: "none",
                "aria-hidden": true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M0 100 L50 56 L100 100",
                        fill: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])('#000', 0.025),
                        stroke: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])('#000', 0.05),
                        strokeWidth: "0.3",
                        vectorEffect: "non-scaling-stroke"
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/interactive.tsx",
                        lineNumber: 302,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M0 0 L50 56 L0 100",
                        fill: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])('#000', 0.018)
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/interactive.tsx",
                        lineNumber: 303,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M100 0 L50 56 L100 100",
                        fill: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])('#000', 0.018)
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/interactive.tsx",
                        lineNumber: 304,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 301,
                columnNumber: 7
            }, this),
            [
                [
                    'l',
                    'translate(28 372) scale(1,1)'
                ],
                [
                    'r',
                    'translate(372 372) scale(-1,1)'
                ]
            ].map(([k, tr])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "absolute",
                    style: {
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: '100%'
                    },
                    viewBox: "0 0 400 400",
                    "aria-hidden": true,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        transform: tr,
                        stroke: accent,
                        strokeOpacity: "0.5",
                        strokeWidth: "1.3",
                        fill: "none",
                        strokeLinecap: "round",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M0 0 C18 -4 30 -16 34 -36 M10 -8 C8 -22 16 -32 30 -34 M0 0 C-2 -16 6 -26 18 -28"
                            }, void 0, false, {
                                fileName: "[project]/components/invite/openers/interactive.tsx",
                                lineNumber: 311,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M30 -34 C40 -30 44 -20 40 -10"
                            }, void 0, false, {
                                fileName: "[project]/components/invite/openers/interactive.tsx",
                                lineNumber: 312,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: "33",
                                cy: "-37",
                                r: "2",
                                fill: accent,
                                fillOpacity: "0.6",
                                stroke: "none"
                            }, void 0, false, {
                                fileName: "[project]/components/invite/openers/interactive.tsx",
                                lineNumber: 313,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/invite/openers/interactive.tsx",
                        lineNumber: 310,
                        columnNumber: 11
                    }, this)
                }, k, false, {
                    fileName: "[project]/components/invite/openers/interactive.tsx",
                    lineNumber: 309,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0",
                style: {
                    background: 'radial-gradient(120% 100% at 50% 42%, transparent 55%, rgba(40,28,10,0.16) 100%)'
                }
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 319,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 275,
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
    const greetFade = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(y, [
        -140,
        0
    ], [
        0,
        1
    ]);
    const rv = useReveal();
    const greet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(1);
    const finish = async ()=>{
        if (opening) return;
        setOpening(true);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(rv.videoOpacity, 1, {
            duration: 0.9
        });
        if (reduced) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(rv.scrimOpacity, 0, {
                duration: 0.6
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(greet, 0, {
                duration: 0.3
            });
            await wait(600);
            onOpen();
            return;
        }
        // Stage 1 — the veil lifts away, unhurried
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(y, -640, {
            duration: 0.95,
            ease: [
                0.4,
                0,
                0.2,
                1
            ]
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(greet, 0, {
            duration: 0.5
        });
        await wait(520);
        // soft light wash, then hand off → overlay melts into the invitation
        await rv.run();
        onOpen();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FilmStage, {
                videoSrc: videoSrc,
                poster: poster,
                play: opening,
                videoOpacity: rv.videoOpacity,
                scrimOpacity: rv.scrimOpacity,
                filmScale: rv.filmScale
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 362,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(WhiteCurtain, {
                scale: rv.whiteScale,
                opacity: rv.whiteOpacity,
                originY: "50%"
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 363,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Greeting, {
                theme: theme,
                names: names,
                fade: opening ? greet : reduced ? 1 : greetFade
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 365,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                type: "button",
                drag: opening || reduced ? false : 'y',
                dragConstraints: {
                    top: -260,
                    bottom: 0
                },
                dragElastic: 0.12,
                style: {
                    y,
                    position: 'absolute',
                    inset: 0,
                    zIndex: 30,
                    touchAction: 'none',
                    cursor: opening ? 'default' : 'grab',
                    pointerEvents: opening ? 'none' : 'auto'
                },
                whileTap: opening ? {} : {
                    cursor: 'grabbing'
                },
                onClick: ()=>{
                    if (reduced) void finish();
                },
                onDragEnd: (_e, info)=>{
                    if (info.offset.y < -90) void finish();
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
                            lineNumber: 380,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/interactive.tsx",
                        lineNumber: 379,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/invite/openers/interactive.tsx",
                    lineNumber: 375,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 368,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Hint, {
                dir: "up",
                label: reduced ? 'Tap to lift the veil' : 'Lift the veil',
                show: !opening
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 385,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 361,
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
        blurb: 'A wax-sealed envelope — press the seal to open it.',
        motif: 'letter'
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
        case 'lifting-veil':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$interactive$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VeilOpener"], {
                ...props
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/index.tsx",
                lineNumber: 28,
                columnNumber: 33
            }, this);
        case 'wax-letter':
        default:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$interactive$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EnvelopeOpener"], {
                ...props
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/index.tsx",
                lineNumber: 30,
                columnNumber: 32
            }, this);
    }
}
}}),
"[project]/components/invite/film-backdrop.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "FilmBackdrop": (()=>FilmBackdrop)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
// A full-bleed film backdrop that never crops the subject.
//
// User uploads come in any aspect ratio (a portrait phone clip, a landscape
// reel…), and a single object-cover layer crops badly when the video's aspect
// is far from the viewport's — e.g. a portrait clip shows only a thin middle
// band on desktop. Instead we:
//   • show the whole video with object-contain, centered, and
//   • fill the leftover space with a blurred, scaled copy of the poster,
// so it stays edge-to-edge and reads as deliberate rather than letterboxed.
//
// Aspect-aware: when the video already roughly matches the viewport (a
// landscape clip on desktop, any portrait clip on a phone) we switch back to
// object-cover so well-framed videos go truly edge-to-edge with no blur. The
// decision re-runs on metadata load and on resize/orientation change.
// Fraction of the video that stays visible under object-cover, along the
// cropped axis (= min(ratio)/max(ratio)). At/above this we prefer cover; below
// it the crop is severe enough to letterbox instead. 0.8 ≈ "lose up to 20%".
const COVER_MIN = 0.8;
function FilmBackdrop({ videoSrc, poster, fallbackStyle, autoPlay = true, className = '', videoRef: externalVideoRef }) {
    const localRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const videoRef = externalVideoRef ?? localRef;
    const wrapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [fit, setFit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('cover');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const decide = ()=>{
            const v = videoRef.current;
            const box = wrapRef.current;
            if (!v || !box || !v.videoWidth || !v.videoHeight) return;
            const videoRatio = v.videoWidth / v.videoHeight;
            const boxRatio = box.clientWidth / box.clientHeight || 1;
            const visible = Math.min(videoRatio, boxRatio) / Math.max(videoRatio, boxRatio);
            setFit(visible >= COVER_MIN ? 'cover' : 'contain');
        };
        const v = videoRef.current;
        decide();
        v?.addEventListener('loadedmetadata', decide);
        window.addEventListener('resize', decide);
        return ()=>{
            v?.removeEventListener('loadedmetadata', decide);
            window.removeEventListener('resize', decide);
        };
    }, [
        videoSrc,
        videoRef
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: wrapRef,
        className: `absolute inset-0 overflow-hidden ${className}`,
        children: [
            fallbackStyle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0",
                style: fallbackStyle
            }, void 0, false, {
                fileName: "[project]/components/invite/film-backdrop.tsx",
                lineNumber: 70,
                columnNumber: 25
            }, this),
            videoSrc && poster && fit === 'contain' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0",
                "aria-hidden": true,
                style: {
                    backgroundImage: `url(${poster})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(34px) saturate(1.12) brightness(0.92)',
                    transform: 'scale(1.18)'
                }
            }, void 0, false, {
                fileName: "[project]/components/invite/film-backdrop.tsx",
                lineNumber: 74,
                columnNumber: 9
            }, this),
            videoSrc && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                ref: videoRef,
                className: "absolute inset-0 h-full w-full",
                style: {
                    objectFit: fit
                },
                src: videoSrc,
                poster: poster ?? undefined,
                autoPlay: autoPlay,
                muted: true,
                loop: true,
                playsInline: true
            }, videoSrc, false, {
                fileName: "[project]/components/invite/film-backdrop.tsx",
                lineNumber: 89,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/invite/film-backdrop.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, this);
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$film$2d$backdrop$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/invite/film-backdrop.tsx [app-ssr] (ecmascript)");
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
        lineNumber: 78,
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
        lineNumber: 114,
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
            lineNumber: 116,
            columnNumber: 60
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/invite/[id]/preview/page.tsx",
        lineNumber: 116,
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
            lineNumber: 119,
            columnNumber: 60
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/invite/[id]/preview/page.tsx",
        lineNumber: 119,
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
                    lineNumber: 124,
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
                    lineNumber: 125,
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
                    lineNumber: 126,
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
                    lineNumber: 127,
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
                    lineNumber: 128,
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
                    lineNumber: 129,
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
                    lineNumber: 130,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/invite/[id]/preview/page.tsx",
            lineNumber: 123,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/invite/[id]/preview/page.tsx",
        lineNumber: 122,
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
                lineNumber: 184,
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
                                    lineNumber: 191,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 190,
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
                                lineNumber: 203,
                                columnNumber: 13
                            }, this)
                        ]
                    }, label, true, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 189,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                lineNumber: 187,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/invite/[id]/preview/page.tsx",
        lineNumber: 177,
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
                lineNumber: 267,
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
                lineNumber: 270,
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
                                lineNumber: 281,
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
                                lineNumber: 282,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 280,
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
                        lineNumber: 284,
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
                        lineNumber: 287,
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
                                            lineNumber: 294,
                                            columnNumber: 87
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M1.5 4.5h9M4 1.5v2M8 1.5v2",
                                            stroke: t.accent,
                                            strokeWidth: "0.9",
                                            strokeLinecap: "round"
                                        }, void 0, false, {
                                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                            lineNumber: 294,
                                            columnNumber: 174
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                    lineNumber: 294,
                                    columnNumber: 15
                                }, this),
                                "Add to Calendar"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                            lineNumber: 293,
                            columnNumber: 35
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 293,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                lineNumber: 275,
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
                        lineNumber: 301,
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
                                lineNumber: 315,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 313,
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
                        lineNumber: 339,
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
                        lineNumber: 350,
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
                        lineNumber: 355,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                lineNumber: 300,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/invite/[id]/preview/page.tsx",
        lineNumber: 260,
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
                    lineNumber: 410,
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
                    lineNumber: 414,
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
                    lineNumber: 417,
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
                    lineNumber: 418,
                    columnNumber: 30
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/invite/[id]/preview/page.tsx",
            lineNumber: 408,
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
            lineNumber: 423,
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
                        lineNumber: 434,
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
                        lineNumber: 435,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Body, {
                        children: cfg.text
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 436,
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
                            lineNumber: 448,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Timeline, {
                            items: items,
                            t: t
                        }, void 0, false, {
                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                            lineNumber: 449,
                            columnNumber: 11
                        }, this),
                        !!cfg.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Body, {
                                children: String(cfg.notes)
                            }, void 0, false, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 450,
                                columnNumber: 49
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                            lineNumber: 450,
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
                    lineNumber: 458,
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
                        lineNumber: 465,
                        columnNumber: 11
                    }, this),
                    cfg.note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Body, {
                        children: cfg.note
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 466,
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
                                                lineNumber: 472,
                                                columnNumber: 91
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                cx: "8.5",
                                                cy: "10",
                                                r: "1.6",
                                                fill: t.accent
                                            }, void 0, false, {
                                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                                lineNumber: 472,
                                                columnNumber: 176
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M5 17l4.5-4 3 2.5L17 11l2 2",
                                                stroke: t.accent,
                                                strokeWidth: "1.2",
                                                fill: "none"
                                            }, void 0, false, {
                                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                                lineNumber: 472,
                                                columnNumber: 226
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                        lineNumber: 472,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                    lineNumber: 471,
                                    columnNumber: 17
                                }, this)
                            }, i, false, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 469,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 467,
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
                        lineNumber: 484,
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
                                        lineNumber: 487,
                                        columnNumber: 116
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                    lineNumber: 487,
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
                                    lineNumber: 488,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                            lineNumber: 486,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 485,
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
                            lineNumber: 500,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Body, {
                            children: url ? giftText.replace(url, '').trim() || 'Your presence is the greatest gift — but if you wish to give, our registry is here.' : giftText
                        }, void 0, false, {
                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                            lineNumber: 501,
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
                                                lineNumber: 505,
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
                                                lineNumber: 505,
                                                columnNumber: 178
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                        lineNumber: 505,
                                        columnNumber: 17
                                    }, this),
                                    "View Gift List"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 504,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                            lineNumber: 503,
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
                        lineNumber: 518,
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
                        lineNumber: 520,
                        columnNumber: 13
                    }, this),
                    cfg.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Body, {
                        children: cfg.notes
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 527,
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
                            lineNumber: 536,
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
                                            lineNumber: 540,
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
                                            lineNumber: 541,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                    lineNumber: 539,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                            lineNumber: 537,
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
                lineNumber: 551,
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
        lineNumber: 557,
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
                lineNumber: 585,
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
                                    lineNumber: 590,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 589,
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
                                lineNumber: 592,
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
                                lineNumber: 593,
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
                                lineNumber: 594,
                                columnNumber: 26
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 588,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                lineNumber: 586,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/invite/[id]/preview/page.tsx",
        lineNumber: 584,
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
                lineNumber: 609,
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
                lineNumber: 612,
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
                lineNumber: 613,
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
                                        lineNumber: 617,
                                        columnNumber: 85
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "5",
                                        cy: "4",
                                        r: "1",
                                        fill: t.accent
                                    }, void 0, false, {
                                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                        lineNumber: 617,
                                        columnNumber: 228
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 617,
                                columnNumber: 13
                            }, this),
                            "Open in Maps"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 616,
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
                                        lineNumber: 623,
                                        columnNumber: 85
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M1.5 4.5h9M4 1.5v2M8 1.5v2M6 6v2.5M4.75 7.25h2.5",
                                        stroke: t.accent,
                                        strokeWidth: "0.9",
                                        strokeLinecap: "round"
                                    }, void 0, false, {
                                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                        lineNumber: 623,
                                        columnNumber: 172
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 623,
                                columnNumber: 13
                            }, this),
                            "Add to Calendar"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 622,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                lineNumber: 614,
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
    const posterImg = uploadedAsset ? uploadedAsset.variants.poster ?? null : preset?.posterImg ?? null;
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$film$2d$backdrop$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FilmBackdrop"], {
                videoSrc: videoSrc,
                poster: posterImg,
                fallbackStyle: posterStyle,
                autoPlay: !reduced
            }, void 0, false, {
                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                lineNumber: 700,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0",
                style: {
                    background: 'radial-gradient(ellipse at 50% 40%, rgba(253,252,249,0.08) 0%, rgba(26,24,22,0.38) 100%)'
                }
            }, void 0, false, {
                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                lineNumber: 706,
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
                        lineNumber: 726,
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
                        lineNumber: 730,
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
                        lineNumber: 740,
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
                        lineNumber: 743,
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
                        lineNumber: 748,
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
                                            lineNumber: 771,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                    lineNumber: 769,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-inter",
                                    children: track?.title ?? 'Music'
                                }, void 0, false, {
                                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                    lineNumber: 779,
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
                                        lineNumber: 784,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                    lineNumber: 783,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-inter",
                                    children: "Play music"
                                }, void 0, false, {
                                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                    lineNumber: 786,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 754,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                lineNumber: 711,
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
                            lineNumber: 802,
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
                                    lineNumber: 810,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 809,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                            lineNumber: 805,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                    lineNumber: 795,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                lineNumber: 793,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/invite/[id]/preview/page.tsx",
        lineNumber: 699,
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
                                lineNumber: 928,
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
                                                        lineNumber: 948,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                                    lineNumber: 947,
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
                                                            lineNumber: 955,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            d: "M1 3v6a1 1 0 0 0 1 1h5",
                                                            stroke: "currentColor",
                                                            strokeWidth: "1",
                                                            strokeLinecap: "round"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                                            lineNumber: 956,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                                    lineNumber: 954,
                                                    columnNumber: 17
                                                }, this),
                                                "Copy link"
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                        lineNumber: 933,
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
                                        lineNumber: 964,
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
                                        lineNumber: 973,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 932,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 924,
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
                                            lineNumber: 989,
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
                                                lineNumber: 991,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                            lineNumber: 990,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                    lineNumber: 988,
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
                                    lineNumber: 994,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                            lineNumber: 987,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 986,
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
                                lineNumber: 1004,
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
                                lineNumber: 1007,
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
                                lineNumber: 1010,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 1003,
                        columnNumber: 9
                    }, this),
                    state === 'ready' && invite && !opened && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "fixed inset-0 z-[60]",
                        animate: {
                            opacity: openerLeaving ? 0 : 1
                        },
                        transition: {
                            duration: 1.1,
                            ease: [
                                0.4,
                                0,
                                0.2,
                                1
                            ]
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
                                setTimeout(()=>setOpened(true), 1100);
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/invite/[id]/preview/page.tsx",
                            lineNumber: 1027,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 1022,
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
                                lineNumber: 1044,
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
                                                lineNumber: 1057,
                                                columnNumber: 31
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionBlock, {
                                                section: sec,
                                                index: i
                                            }, void 0, false, {
                                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                                lineNumber: 1058,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, sec.id, true, {
                                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                        lineNumber: 1056,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 1048,
                                columnNumber: 13
                            }, this),
                            invite.event_date && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: sectionBgs[contentSections.length % 2]
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(OrnamentDivider, {}, void 0, false, {
                                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                        lineNumber: 1068,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CountdownTimer, {
                                        eventDate: invite.event_date
                                    }, void 0, false, {
                                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                        lineNumber: 1069,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 1067,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: sectionBgs[(contentSections.length + 1) % 2]
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(OrnamentDivider, {}, void 0, false, {
                                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                        lineNumber: 1075,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RsvpSection, {
                                        inviteId: id
                                    }, void 0, false, {
                                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                        lineNumber: 1076,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 1074,
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
                                        lineNumber: 1081,
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
                                        lineNumber: 1083,
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
                                        lineNumber: 1088,
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
                                        lineNumber: 1092,
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
                                        lineNumber: 1095,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                                lineNumber: 1080,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/invite/[id]/preview/page.tsx",
                        lineNumber: 1043,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/invite/[id]/preview/page.tsx",
                lineNumber: 922,
                columnNumber: 5
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/invite/[id]/preview/page.tsx",
            lineNumber: 921,
            columnNumber: 5
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/invite/[id]/preview/page.tsx",
        lineNumber: 920,
        columnNumber: 4
    }, this);
}
}}),

};

//# sourceMappingURL=_83a9579d._.js.map