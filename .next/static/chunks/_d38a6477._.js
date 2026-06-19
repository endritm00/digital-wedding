(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/lib/builder/presets.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// Real FULL-HD wedding film presets.
//
// Assets are mirrored into our own Supabase Storage bucket "preset-media"
// via scripts/mirror-presets.mjs so we are NOT dependent on Pexels CDN.
// Pexels source URLs are preserved below as provenance comments only.
//
// Public URL pattern (after running the mirror script):
//   Film  : {SUPABASE_URL}/storage/v1/object/public/preset-media/presets/<id>/film.mp4
//   Poster: {SUPABASE_URL}/storage/v1/object/public/preset-media/presets/<id>/poster.jpg
//
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
// ── Supabase Storage public base URL ────────────────────────────────────────
// This is the stable, self-owned CDN. Run scripts/mirror-presets.mjs once to
// populate the bucket. Preset ids must stay stable (existing drafts reference them).
const SUPABASE_URL = 'https://gngoqwenvnhyfbkkszfl.supabase.co';
const presetFilm = (id)=>`${SUPABASE_URL}/storage/v1/object/public/preset-media/presets/${id}/film.mp4`;
const presetPoster = (id)=>`${SUPABASE_URL}/storage/v1/object/public/preset-media/presets/${id}/poster.jpg`;
const VIDEO_PRESETS = [
    {
        // id kept stable for existing drafts; content is now a lush floral ceremony
        // arch (no faces) — same elegant, bloom-forward style as The Vows.
        id: 'golden-hour',
        name: 'In Bloom',
        mood: 'An arch of flowers',
        src: presetFilm('golden-hour'),
        posterImg: presetPoster('golden-hour'),
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
        src: presetFilm('first-dance'),
        posterImg: presetPoster('first-dance'),
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
        src: presetFilm('the-vows'),
        posterImg: presetPoster('the-vows'),
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
        src: presetFilm('the-rings'),
        posterImg: presetPoster('the-rings'),
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
        src: presetFilm('open-air'),
        posterImg: presetPoster('open-air'),
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
        src: presetFilm('eternal'),
        posterImg: presetPoster('eternal'),
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
        src: presetFilm('the-letter'),
        posterImg: presetPoster('the-letter'),
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
        src: presetFilm('the-veil'),
        posterImg: presetPoster('the-veil'),
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
"[project]/components/home/hero-section.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "HeroSection": (()=>HeroSection)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/builder/presets.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
// A cinematic, full-bleed wedding film hero — the lush "In Bloom" floral arch
// behind an editorial gold-framed title. No floating cards; just the film, soft
// scrims for legibility, and refined type that settles in on load.
const HERO = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VIDEO_PRESETS"].find((p)=>p.id === 'the-vows') ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VIDEO_PRESETS"][0];
function HeroSection() {
    _s();
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Only run the film while the hero is on screen — frees the decoder once the
    // user scrolls past, so the rest of the page stays smooth.
    const inView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(sectionRef, {
        amount: 0.25
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeroSection.useEffect": ()=>{
            const v = videoRef.current;
            if (!v || reduced) return;
            if (inView) {
                void v.play().catch({
                    "HeroSection.useEffect": ()=>{}
                }["HeroSection.useEffect"]);
            } else v.pause();
        }
    }["HeroSection.useEffect"], [
        inView,
        reduced
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: sectionRef,
        className: "relative h-[100dvh] overflow-hidden",
        style: {
            background: '#14100C'
        },
        "aria-label": "Hero",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0",
                        style: {
                            background: `linear-gradient(160deg, ${HERO.poster.from} 0%, ${HERO.poster.to} 100%)`
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/home/hero-section.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0",
                        style: {
                            backgroundImage: `url(${HERO.posterImg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: ready ? 0 : 1,
                            transition: 'opacity 1s ease'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/home/hero-section.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this),
                    !reduced && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].video, {
                        ref: videoRef,
                        className: "absolute inset-0 h-full w-full object-cover",
                        src: HERO.src,
                        poster: HERO.posterImg,
                        autoPlay: true,
                        muted: true,
                        loop: true,
                        playsInline: true,
                        preload: "auto",
                        onCanPlay: ()=>setReady(true),
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: ready ? 1 : 0
                        },
                        transition: {
                            duration: 1.2,
                            ease: 'easeOut'
                        },
                        // No perpetual scale — a constantly-rescaling video shimmers/vibrates.
                        // Promote to its own GPU layer so it composites cleanly.
                        style: {
                            transform: 'translateZ(0)',
                            backfaceVisibility: 'hidden',
                            willChange: 'opacity'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/home/hero-section.tsx",
                        lineNumber: 45,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/home/hero-section.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-10 pointer-events-none",
                style: {
                    background: 'linear-gradient(180deg, rgba(18,13,9,0.46) 0%, rgba(18,13,9,0.12) 32%, rgba(18,13,9,0.22) 62%, rgba(18,13,9,0.72) 100%)'
                }
            }, void 0, false, {
                fileName: "[project]/components/home/hero-section.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-10 pointer-events-none",
                style: {
                    background: 'radial-gradient(ellipse 70% 55% at 50% 46%, rgba(0,0,0,0.34) 0%, transparent 70%)'
                }
            }, void 0, false, {
                fileName: "[project]/components/home/hero-section.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute z-20 pointer-events-none hidden sm:block",
                style: {
                    inset: 'clamp(14px, 2.4vw, 30px)',
                    border: '1px solid rgba(233,212,165,0.34)'
                }
            }, void 0, false, {
                fileName: "[project]/components/home/hero-section.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: reduced ? false : {
                            opacity: 0,
                            y: 10
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
                            delay: 0.15
                        },
                        className: "font-inter uppercase",
                        style: {
                            fontSize: 10,
                            letterSpacing: '0.4em',
                            color: 'rgba(244,222,179,0.82)',
                            textShadow: '0 1px 12px rgba(0,0,0,0.4)'
                        },
                        children: "Digital Wedding Invitations"
                    }, void 0, false, {
                        fileName: "[project]/components/home/hero-section.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h1, {
                        initial: reduced ? false : {
                            opacity: 0,
                            y: 22
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            duration: 1.4,
                            ease: [
                                0.22,
                                1,
                                0.36,
                                1
                            ],
                            delay: 0.28
                        },
                        className: "mt-6 flex flex-col items-center",
                        style: {
                            color: '#FDFCF9',
                            lineHeight: 0.92,
                            textShadow: '0 2px 40px rgba(0,0,0,0.45)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-cormorant font-light",
                                style: {
                                    fontSize: 'clamp(2.6rem, 8.4vw, 6rem)',
                                    letterSpacing: '0.01em'
                                },
                                children: "Begin your"
                            }, void 0, false, {
                                fileName: "[project]/components/home/hero-section.tsx",
                                lineNumber: 95,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-pinyon",
                                style: {
                                    fontSize: 'clamp(4.2rem, 16vw, 11rem)',
                                    lineHeight: 0.86,
                                    color: '#F0DBA0',
                                    marginTop: '0.06em'
                                },
                                children: "Forever"
                            }, void 0, false, {
                                fileName: "[project]/components/home/hero-section.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/home/hero-section.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: reduced ? false : {
                            opacity: 0,
                            scaleX: 0.4
                        },
                        animate: {
                            opacity: 1,
                            scaleX: 1
                        },
                        transition: {
                            duration: 1,
                            ease: [
                                0.22,
                                1,
                                0.36,
                                1
                            ],
                            delay: 0.7
                        },
                        className: "mt-7 flex items-center gap-3",
                        "aria-hidden": true,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    width: 'clamp(40px, 9vw, 80px)',
                                    height: 1,
                                    background: 'linear-gradient(90deg, transparent, rgba(240,219,160,0.7))'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/home/hero-section.tsx",
                                lineNumber: 114,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    width: 5,
                                    height: 5,
                                    background: '#F0DBA0',
                                    transform: 'rotate(45deg)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/home/hero-section.tsx",
                                lineNumber: 115,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    width: 'clamp(40px, 9vw, 80px)',
                                    height: 1,
                                    background: 'linear-gradient(90deg, rgba(240,219,160,0.7), transparent)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/home/hero-section.tsx",
                                lineNumber: 116,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/home/hero-section.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                        initial: reduced ? false : {
                            opacity: 0,
                            y: 14
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
                            delay: 0.82
                        },
                        className: "font-inter mt-6",
                        style: {
                            fontSize: 12.5,
                            letterSpacing: '0.12em',
                            lineHeight: 2,
                            color: 'rgba(253,252,249,0.82)',
                            maxWidth: 340,
                            textShadow: '0 1px 16px rgba(0,0,0,0.5)'
                        },
                        children: [
                            "A film that opens your invitation.",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/components/home/hero-section.tsx",
                                lineNumber: 126,
                                columnNumber: 45
                            }, this),
                            "Shared with a single link. Live in minutes."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/home/hero-section.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: reduced ? false : {
                            opacity: 0,
                            y: 12
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
                            delay: 1
                        },
                        className: "mt-10 flex items-center gap-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/builder",
                                className: "font-inter uppercase rounded-full transition-transform duration-500 hover:scale-[1.04]",
                                style: {
                                    fontSize: 11,
                                    padding: '15px 38px',
                                    background: '#FDFCF9',
                                    color: '#1A1816',
                                    letterSpacing: '0.2em',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.28)'
                                },
                                children: "Start creating"
                            }, void 0, false, {
                                fileName: "[project]/components/home/hero-section.tsx",
                                lineNumber: 135,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "#films",
                                className: "font-inter uppercase transition-opacity duration-300 hover:opacity-70",
                                style: {
                                    fontSize: 11,
                                    color: 'rgba(253,252,249,0.78)',
                                    letterSpacing: '0.18em'
                                },
                                children: "See the films →"
                            }, void 0, false, {
                                fileName: "[project]/components/home/hero-section.tsx",
                                lineNumber: 142,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/home/hero-section.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/home/hero-section.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: reduced ? false : {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                },
                transition: {
                    delay: 1.4,
                    duration: 0.8
                },
                className: "absolute bottom-7 left-1/2 z-30 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-inter uppercase",
                        style: {
                            fontSize: 8,
                            letterSpacing: '0.3em',
                            color: 'rgba(253,252,249,0.55)'
                        },
                        children: "Scroll"
                    }, void 0, false, {
                        fileName: "[project]/components/home/hero-section.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                        animate: reduced ? {} : {
                            scaleY: [
                                0,
                                1,
                                0
                            ],
                            opacity: [
                                0,
                                0.6,
                                0
                            ]
                        },
                        transition: {
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        },
                        style: {
                            width: 1,
                            height: 38,
                            background: 'rgba(240,219,160,0.8)',
                            transformOrigin: 'top'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/home/hero-section.tsx",
                        lineNumber: 160,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/home/hero-section.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/home/hero-section.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(HeroSection, "KUVpFBMujKgW4c66irM0/1qsiNg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c = HeroSection;
var _c;
__turbopack_context__.k.register(_c, "HeroSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/invite/openers/realistic-seal.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "RealisticSeal": (()=>RealisticSeal)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
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
    _s();
    const uid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])().replace(/:/g, '');
    const face = `f-${uid}`, faceIn = `fi-${uid}`, rim = `r-${uid}`, spec = `s-${uid}`;
    const grain = `g-${uid}`, warp = `w-${uid}`, sheen = `sh-${uid}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        style: {
            width: size,
            height: size,
            filter: `drop-shadow(0 ${size * 0.045}px ${size * 0.06}px rgba(40,28,6,0.42)) drop-shadow(0 ${size * 0.11}px ${size * 0.13}px rgba(40,28,6,0.3))`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: "0 0 220 220",
                width: "100%",
                height: "100%",
                "aria-hidden": true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("radialGradient", {
                                id: face,
                                cx: "40%",
                                cy: "30%",
                                r: "78%",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "0%",
                                        stopColor: G.bright
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 46,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "18%",
                                        stopColor: G.hi
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 47,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "48%",
                                        stopColor: G.mid
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 48,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "82%",
                                        stopColor: G.deep
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 49,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("radialGradient", {
                                id: faceIn,
                                cx: "50%",
                                cy: "62%",
                                r: "62%",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "0%",
                                        stopColor: G.light
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 54,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "55%",
                                        stopColor: G.mid
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 55,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                id: rim,
                                x1: "0",
                                y1: "0",
                                x2: "0",
                                y2: "1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "0%",
                                        stopColor: G.bright
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 60,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "34%",
                                        stopColor: G.hi
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 61,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "64%",
                                        stopColor: G.mid
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 62,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("radialGradient", {
                                id: spec,
                                cx: "50%",
                                cy: "50%",
                                r: "50%",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "0%",
                                        stopColor: "rgba(255,255,255,0.9)"
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 66,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                id: warp,
                                x: "-12%",
                                y: "-12%",
                                width: "124%",
                                height: "124%",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feTurbulence", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feDisplacementMap", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                id: grain,
                                x: "0%",
                                y: "0%",
                                width: "100%",
                                height: "100%",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feTurbulence", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feColorMatrix", {
                                        in: "n",
                                        type: "matrix",
                                        values: "0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0",
                                        result: "a"
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 75,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feComposite", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        filter: `url(#${warp})`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: BLOB,
                                fill: `url(#${face})`
                            }, void 0, false, {
                                fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                lineNumber: 82,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "110",
                        cy: "110",
                        r: "80",
                        fill: `url(#${faceIn})`
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
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
                    rose && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Fleuron, {}, void 0, false, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 106,
                        columnNumber: 18
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MonogramEmboss, {
                        mono: mono,
                        font: font
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        filter: `url(#${grain})`,
                        opacity: "0.42",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-0 overflow-hidden",
                style: {
                    borderRadius: '50%',
                    maskImage: 'radial-gradient(circle at 50% 50%, #000 58%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(circle at 50% 50%, #000 58%, transparent 70%)'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
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
_s(RealisticSeal, "xfMyHNFebGjSN1/YPqrD8z5EdLc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"]
    ];
});
_c = RealisticSeal;
function Fleuron() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
        transform: "translate(110 64)",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                stroke: G.shadow,
                strokeOpacity: "0.55",
                strokeWidth: "1.6",
                fill: "none",
                strokeLinecap: "round",
                transform: "translate(0.6 0.8)",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M0 6 C-5 1 -5 -6 0 -8 C5 -6 5 1 0 6 Z"
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M-8 2 C-12 -2 -11 -7 -6 -7 M8 2 C12 -2 11 -7 6 -7"
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 130,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                stroke: G.bright,
                strokeOpacity: "0.5",
                strokeWidth: "1.1",
                fill: "none",
                strokeLinecap: "round",
                transform: "translate(-0.7 -0.9)",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M0 6 C-5 1 -5 -6 0 -8 C5 -6 5 1 0 6 Z"
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
_c1 = Fleuron;
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
        style: {
            fontWeight: 500
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
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
_c2 = MonogramEmboss;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "RealisticSeal");
__turbopack_context__.k.register(_c1, "Fleuron");
__turbopack_context__.k.register(_c2, "MonogramEmboss");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/invite/openers/shared.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/home/home-envelope.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "HomeEnvelope": (()=>HomeEnvelope)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$realistic$2d$seal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/invite/openers/realistic-seal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/invite/openers/shared.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
// A real, contained wax-sealed envelope on the homepage. Click the seal: the flap
// opens and the invitation slides out. Personalise it with your own names.
const IVORY = '#F4ECDD';
const ACCENT = '#A8854B';
// Names typed here are handed to the builder (via sessionStorage) so the couple
// don't have to enter them twice. The builder's names step consumes + clears it.
const PREFILL_NAMES_KEY = 'di:prefill-names';
function HomeEnvelope() {
    _s();
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [names, setNames] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const display = names.trim() || 'Aria & Luca';
    const mono = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initials"])(display);
    // Stash the typed names for the builder right before navigating to it.
    const stashNames = ()=>{
        const { name_a, name_b } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseCoupleNames"])(names);
        try {
            if (name_a || name_b) sessionStorage.setItem(PREFILL_NAMES_KEY, JSON.stringify({
                name_a,
                name_b
            }));
            else sessionStorage.removeItem(PREFILL_NAMES_KEY);
        } catch  {}
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "opener",
        className: "relative py-28 px-6 flex flex-col items-center overflow-hidden",
        style: {
            background: '#F5EEE6'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-inter uppercase",
                style: {
                    fontSize: 10,
                    letterSpacing: '0.3em',
                    color: 'rgba(26,24,22,0.4)'
                },
                children: "The opening"
            }, void 0, false, {
                fileName: "[project]/components/home/home-envelope.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "font-cormorant font-light text-center mt-4",
                style: {
                    fontSize: 'clamp(2rem, 6vw, 3rem)',
                    color: '#1A1816',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.1
                },
                children: "Sealed by hand, opened with a touch"
            }, void 0, false, {
                fileName: "[project]/components/home/home-envelope.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-inter text-center mt-4 max-w-[42ch]",
                style: {
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: 'rgba(26,24,22,0.55)'
                },
                children: "Every invitation arrives sealed in wax. Your guests press the seal and your day unfolds."
            }, void 0, false, {
                fileName: "[project]/components/home/home-envelope.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                value: names,
                onChange: (e)=>setNames(e.target.value),
                maxLength: 48,
                placeholder: "Type your names",
                className: "mt-8 w-60 pb-2 text-center font-cormorant text-2xl font-light bg-transparent border-0 border-b outline-none",
                style: {
                    color: '#1A1816',
                    borderBottomColor: 'rgba(26,24,22,0.2)',
                    caretColor: ACCENT
                },
                "aria-label": "Type your names to personalise the envelope"
            }, void 0, false, {
                fileName: "[project]/components/home/home-envelope.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative mt-14",
                style: {
                    width: 'min(92vw, 500px)',
                    height: 'clamp(250px, 64vw, 330px)',
                    perspective: 1500
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 rounded-[6px]",
                        style: {
                            background: `linear-gradient(160deg, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shade"])(IVORY, -0.04)} 0%, ${IVORY} 50%, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shade"])(IVORY, 0.05)} 100%)`,
                            boxShadow: `0 26px 60px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexA"])('#2a1c08', 0.22)}`
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "absolute inset-0 h-full w-full",
                            "aria-hidden": true,
                            style: {
                                opacity: 0.5,
                                mixBlendMode: 'multiply'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                    id: "heGrain",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feTurbulence", {
                                            type: "fractalNoise",
                                            baseFrequency: "0.8",
                                            numOctaves: "2",
                                            seed: "5"
                                        }, void 0, false, {
                                            fileName: "[project]/components/home/home-envelope.tsx",
                                            lineNumber: 58,
                                            columnNumber: 34
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feColorMatrix", {
                                            type: "matrix",
                                            values: "0 0 0 0 0.42 0 0 0 0 0.35 0 0 0 0 0.24 0 0 0 0.05 0"
                                        }, void 0, false, {
                                            fileName: "[project]/components/home/home-envelope.tsx",
                                            lineNumber: 58,
                                            columnNumber: 114
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/home/home-envelope.tsx",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    width: "100%",
                                    height: "100%",
                                    filter: "url(#heGrain)"
                                }, void 0, false, {
                                    fileName: "[project]/components/home/home-envelope.tsx",
                                    lineNumber: 59,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/home/home-envelope.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/home/home-envelope.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute flex flex-col items-center justify-center rounded-[4px] text-center",
                        style: {
                            left: '7%',
                            right: '7%',
                            top: '8%',
                            height: '78%',
                            zIndex: 2,
                            background: '#FFFEFB',
                            boxShadow: `0 8px 24px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexA"])('#2a1c08', 0.16)}`,
                            border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexA"])(ACCENT, 0.18)}`
                        },
                        initial: false,
                        animate: open ? {
                            y: reduced ? 0 : '-40%',
                            opacity: 1
                        } : {
                            y: 0,
                            opacity: 0
                        },
                        transition: {
                            duration: 0.85,
                            ease: [
                                0.22,
                                1,
                                0.36,
                                1
                            ],
                            delay: open ? 0.25 : 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-inter uppercase",
                                style: {
                                    fontSize: 8,
                                    letterSpacing: '0.32em',
                                    color: 'rgba(26,24,22,0.4)'
                                },
                                children: "You are invited"
                            }, void 0, false, {
                                fileName: "[project]/components/home/home-envelope.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-pinyon mt-2",
                                style: {
                                    fontSize: 'clamp(1.8rem, 7vw, 2.6rem)',
                                    color: ACCENT,
                                    lineHeight: 1
                                },
                                children: display
                            }, void 0, false, {
                                fileName: "[project]/components/home/home-envelope.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mt-3 h-px w-10",
                                style: {
                                    background: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexA"])(ACCENT, 0.5)
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/home/home-envelope.tsx",
                                lineNumber: 73,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-cormorant italic mt-3",
                                style: {
                                    fontSize: 14,
                                    color: 'rgba(26,24,22,0.6)'
                                },
                                children: "are getting married"
                            }, void 0, false, {
                                fileName: "[project]/components/home/home-envelope.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/home/home-envelope.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-x-0 bottom-0",
                        style: {
                            height: '62%',
                            zIndex: 3,
                            clipPath: 'polygon(0 38%, 50% 0, 100% 38%, 100% 100%, 0 100%)',
                            background: `linear-gradient(180deg, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shade"])(IVORY, 0.02)} 0%, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shade"])(IVORY, -0.05)} 100%)`,
                            boxShadow: `inset 0 2px 6px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexA"])('#fff', 0.4)}`
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute left-1/2 top-0 h-full",
                            style: {
                                width: 1,
                                background: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexA"])('#000', 0.04)
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/home/home-envelope.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/home/home-envelope.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-x-0 top-0",
                        style: {
                            height: '56%',
                            zIndex: open ? 1 : 5,
                            perspective: 1600,
                            perspectiveOrigin: '50% 0%'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "absolute inset-0",
                            style: {
                                transformOrigin: '50% 0%',
                                transformStyle: 'preserve-3d',
                                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                                background: `linear-gradient(176deg, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shade"])(IVORY, 0.06)} 0%, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shade"])(IVORY, -0.05)} 100%)`,
                                filter: `drop-shadow(0 3px 5px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexA"])('#000', 0.14)})`
                            },
                            initial: false,
                            animate: open ? {
                                rotateX: 178
                            } : {
                                rotateX: 0
                            },
                            transition: {
                                duration: 0.7,
                                ease: [
                                    0.4,
                                    0,
                                    0.2,
                                    1
                                ]
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "absolute inset-0 h-full w-full",
                                viewBox: "0 0 100 100",
                                preserveAspectRatio: "none",
                                "aria-hidden": true,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M0 0 L50 100 L100 0",
                                    fill: "none",
                                    stroke: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexA"])('#fff', 0.4),
                                    strokeWidth: "0.4",
                                    vectorEffect: "non-scaling-stroke"
                                }, void 0, false, {
                                    fileName: "[project]/components/home/home-envelope.tsx",
                                    lineNumber: 92,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/home/home-envelope.tsx",
                                lineNumber: 91,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/home/home-envelope.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/home/home-envelope.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: !open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                            type: "button",
                            onClick: ()=>setOpen(true),
                            className: "absolute left-1/2 z-10 focus-visible:outline-none",
                            style: {
                                top: '50%',
                                x: '-50%',
                                y: '-50%',
                                zIndex: 8,
                                cursor: 'pointer'
                            },
                            initial: false,
                            whileHover: reduced ? {} : {
                                scale: 1.04
                            },
                            whileTap: {
                                scale: 0.96
                            },
                            exit: {
                                opacity: 0,
                                scale: 0.6,
                                y: '-30%'
                            },
                            transition: {
                                duration: 0.3
                            },
                            "aria-label": "Open the envelope",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$realistic$2d$seal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RealisticSeal"], {
                                mono: mono,
                                size: 132,
                                font: "var(--font-pinyon)"
                            }, void 0, false, {
                                fileName: "[project]/components/home/home-envelope.tsx",
                                lineNumber: 111,
                                columnNumber: 15
                            }, this)
                        }, "seal", false, {
                            fileName: "[project]/components/home/home-envelope.tsx",
                            lineNumber: 100,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/home/home-envelope.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/home/home-envelope.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative mt-10 h-12 flex items-center justify-center",
                children: [
                    !open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                        animate: reduced ? {
                            opacity: 0.7
                        } : {
                            opacity: [
                                0.4,
                                0.9,
                                0.4
                            ]
                        },
                        transition: {
                            duration: 2.4,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        },
                        className: "font-inter uppercase",
                        style: {
                            fontSize: 10,
                            letterSpacing: '0.25em',
                            color: 'rgba(26,24,22,0.45)'
                        },
                        children: "Press the seal"
                    }, void 0, false, {
                        fileName: "[project]/components/home/home-envelope.tsx",
                        lineNumber: 120,
                        columnNumber: 11
                    }, this),
                    open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 8
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: 0.55,
                            duration: 0.5
                        },
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/builder",
                                onClick: stashNames,
                                className: "font-inter uppercase rounded-full px-9 py-4",
                                style: {
                                    fontSize: 11,
                                    letterSpacing: '0.2em',
                                    background: '#1A1816',
                                    color: '#FDFCF9'
                                },
                                children: "Create yours"
                            }, void 0, false, {
                                fileName: "[project]/components/home/home-envelope.tsx",
                                lineNumber: 131,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setOpen(false),
                                className: "font-inter uppercase",
                                style: {
                                    fontSize: 10,
                                    letterSpacing: '0.18em',
                                    color: 'rgba(26,24,22,0.4)'
                                },
                                children: "↻ Reseal"
                            }, void 0, false, {
                                fileName: "[project]/components/home/home-envelope.tsx",
                                lineNumber: 134,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/home/home-envelope.tsx",
                        lineNumber: 130,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/home/home-envelope.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/home/home-envelope.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
_s(HomeEnvelope, "jN6dQzl/kd6FX1HxFwNatXlJkVc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"]
    ];
});
_c = HomeEnvelope;
var _c;
__turbopack_context__.k.register(_c, "HomeEnvelope");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/home/opening-film-section.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "OpeningFilmSection": (()=>OpeningFilmSection)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/builder/presets.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
// "Your opening film" — the signature of the product. A large cinematic player
// shows the selected film; elegant poster chips below switch it with a soft
// crossfade. Face-free, venue-and-bloom scenery only — and text-free footage
// (the floral-arch clip carries a baked-in watermark, so it's excluded here).
// Default is The Reception so it doesn't echo the hero's "The Vows".
const FILM_IDS = [
    'the-veil',
    'eternal',
    'open-air',
    'the-vows',
    'the-letter'
];
const FILMS = FILM_IDS.map((id)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VIDEO_PRESETS"].find((p)=>p.id === id)).filter(_c = (p)=>Boolean(p));
_c1 = FILMS;
function OpeningFilmSection() {
    _s();
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const film = FILMS[active];
    // Don't download/play this HD film until the section is actually on screen —
    // otherwise it competes with the hero film for bandwidth and the decoder.
    const playerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(playerRef, {
        amount: 0.4
    });
    const [armed, setArmed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OpeningFilmSection.useEffect": ()=>{
            if (inView) setArmed(true);
        }
    }["OpeningFilmSection.useEffect"], [
        inView
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OpeningFilmSection.useEffect": ()=>{
            const v = videoRef.current;
            if (!v || reduced) return;
            if (inView) {
                void v.play().catch({
                    "OpeningFilmSection.useEffect": ()=>{}
                }["OpeningFilmSection.useEffect"]);
            } else v.pause();
        }
    }["OpeningFilmSection.useEffect"], [
        inView,
        active,
        armed,
        reduced
    ]);
    const select = (i)=>{
        if (i === active) return;
        setReady(false);
        setActive(i);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "films",
        className: "overflow-hidden px-6 md:px-12 py-24 md:py-32",
        style: {
            background: '#F3EDE5'
        },
        "aria-label": "Your opening film",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: reduced ? false : {
                    opacity: 0,
                    y: 18
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
                    duration: 0.9,
                    ease: [
                        0.22,
                        1,
                        0.36,
                        1
                    ]
                },
                className: "mx-auto max-w-2xl text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-inter uppercase",
                        style: {
                            fontSize: 9,
                            letterSpacing: '0.34em',
                            color: 'rgba(26,24,22,0.34)'
                        },
                        children: "The films"
                    }, void 0, false, {
                        fileName: "[project]/components/home/opening-film-section.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-cormorant font-light mt-3 leading-none",
                        style: {
                            fontSize: 'clamp(2.2rem, 7vw, 4.2rem)',
                            color: '#1A1816',
                            letterSpacing: '-0.015em'
                        },
                        children: "Your opening film."
                    }, void 0, false, {
                        fileName: "[project]/components/home/opening-film-section.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-inter mx-auto mt-5 max-w-[44ch]",
                        style: {
                            fontSize: 14,
                            lineHeight: 1.75,
                            color: 'rgba(26,24,22,0.55)'
                        },
                        children: [
                            "Every invitation opens with a film.",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/components/home/opening-film-section.tsx",
                                lineNumber: 60,
                                columnNumber: 46
                            }, this),
                            "Set the scene with one of the videos, or upload your own!"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/home/opening-film-section.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/home/opening-film-section.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: reduced ? false : {
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
                    duration: 1,
                    ease: [
                        0.22,
                        1,
                        0.36,
                        1
                    ],
                    delay: 0.1
                },
                ref: playerRef,
                className: "relative mx-auto mt-12 w-full max-w-[1000px] overflow-hidden",
                style: {
                    aspectRatio: '16 / 9',
                    borderRadius: 10,
                    boxShadow: '0 30px 80px rgba(26,24,22,0.26), 0 4px 16px rgba(26,24,22,0.10)',
                    border: '1px solid rgba(168,133,75,0.22)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0",
                        style: {
                            background: `linear-gradient(160deg, ${film.poster.from} 0%, ${film.poster.to} 100%)`
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/home/opening-film-section.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0",
                        style: {
                            backgroundImage: `url(${film.posterImg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: ready ? 0 : 1,
                            transition: 'opacity 0.6s ease'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/home/opening-film-section.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this),
                    !reduced && armed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].video, {
                        ref: videoRef,
                        className: "absolute inset-0 h-full w-full object-cover",
                        src: film.src,
                        poster: film.posterImg,
                        muted: true,
                        loop: true,
                        playsInline: true,
                        preload: "auto",
                        onCanPlay: ()=>setReady(true),
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: ready ? 1 : 0
                        },
                        transition: {
                            duration: 0.8,
                            ease: 'easeOut'
                        },
                        style: {
                            transform: 'translateZ(0)',
                            backfaceVisibility: 'hidden'
                        }
                    }, film.id, false, {
                        fileName: "[project]/components/home/opening-film-section.tsx",
                        lineNumber: 82,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-x-0 bottom-0 h-2/5 pointer-events-none",
                        style: {
                            background: 'linear-gradient(to top, rgba(18,13,9,0.7) 0%, transparent 100%)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/home/opening-film-section.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 md:p-7",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AnimatedName, {
                                        name: film.name
                                    }, void 0, false, {
                                        fileName: "[project]/components/home/opening-film-section.tsx",
                                        lineNumber: 104,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-inter mt-1.5",
                                        style: {
                                            fontSize: 11,
                                            letterSpacing: '0.08em',
                                            color: 'rgba(253,252,249,0.72)'
                                        },
                                        children: film.mood
                                    }, void 0, false, {
                                        fileName: "[project]/components/home/opening-film-section.tsx",
                                        lineNumber: 105,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/home/opening-film-section.tsx",
                                lineNumber: 103,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-inter hidden sm:inline uppercase",
                                style: {
                                    fontSize: 9,
                                    letterSpacing: '0.22em',
                                    color: 'rgba(253,252,249,0.6)'
                                },
                                children: [
                                    String(active + 1).padStart(2, '0'),
                                    " / ",
                                    String(FILMS.length).padStart(2, '0')
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/home/opening-film-section.tsx",
                                lineNumber: 107,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/home/opening-film-section.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/home/opening-film-section.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto mt-6 max-w-[1000px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-3 overflow-x-auto pb-2 no-scrollbar md:justify-center",
                    style: {
                        WebkitOverflowScrolling: 'touch'
                    },
                    children: FILMS.map((f, i)=>{
                        const on = i === active;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>select(i),
                            className: "group flex-none text-left transition-transform duration-300",
                            style: {
                                width: 'clamp(112px, 22vw, 150px)',
                                transform: on ? 'translateY(-2px)' : 'none'
                            },
                            "aria-pressed": on,
                            "aria-label": `Show ${f.name}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative overflow-hidden",
                                    style: {
                                        aspectRatio: '16 / 10',
                                        borderRadius: 7,
                                        backgroundImage: `url(${f.posterImg})`,
                                        backgroundColor: f.poster.from,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        boxShadow: on ? '0 10px 28px rgba(168,133,75,0.36)' : '0 4px 14px rgba(26,24,22,0.12)',
                                        outline: on ? '2px solid #A8854B' : '2px solid transparent',
                                        outlineOffset: 2
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0",
                                        style: {
                                            background: on ? 'rgba(0,0,0,0)' : 'rgba(243,237,229,0.32)',
                                            transition: 'background 0.3s'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/home/opening-film-section.tsx",
                                        lineNumber: 142,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/home/opening-film-section.tsx",
                                    lineNumber: 128,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-cormorant block mt-2 leading-tight",
                                    style: {
                                        fontSize: 14,
                                        color: on ? '#A8854B' : 'rgba(26,24,22,0.6)'
                                    },
                                    children: f.name
                                }, void 0, false, {
                                    fileName: "[project]/components/home/opening-film-section.tsx",
                                    lineNumber: 144,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, f.id, true, {
                            fileName: "[project]/components/home/opening-film-section.tsx",
                            lineNumber: 119,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/components/home/opening-film-section.tsx",
                    lineNumber: 115,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/home/opening-film-section.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: reduced ? false : {
                    opacity: 0
                },
                whileInView: {
                    opacity: 1
                },
                viewport: {
                    once: true
                },
                transition: {
                    duration: 0.8,
                    delay: 0.1
                },
                className: "mt-12 flex justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/builder",
                    className: "font-inter uppercase rounded-full transition-transform duration-500 hover:scale-[1.04]",
                    style: {
                        fontSize: 11,
                        padding: '15px 40px',
                        background: '#1A1816',
                        color: '#FDFCF9',
                        letterSpacing: '0.2em',
                        boxShadow: '0 8px 28px rgba(26,24,22,0.22)'
                    },
                    children: "Create yours"
                }, void 0, false, {
                    fileName: "[project]/components/home/opening-film-section.tsx",
                    lineNumber: 164,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/home/opening-film-section.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/home/opening-film-section.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_s(OpeningFilmSection, "obbRkwbYOomQ1EPgNekWMKuudgg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c2 = OpeningFilmSection;
// The film name, re-animating each time it changes.
function AnimatedName({ name }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h3, {
        initial: {
            opacity: 0,
            y: 8
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.5,
            ease: [
                0.22,
                1,
                0.36,
                1
            ]
        },
        className: "font-cormorant font-light",
        style: {
            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
            color: '#FDFCF9',
            lineHeight: 1,
            textShadow: '0 2px 20px rgba(0,0,0,0.4)'
        },
        children: name
    }, name, false, {
        fileName: "[project]/components/home/opening-film-section.tsx",
        lineNumber: 179,
        columnNumber: 5
    }, this);
}
_c3 = AnimatedName;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "FILMS$FILM_IDS\n  .map((id) => VIDEO_PRESETS.find((p) => p.id === id))\n  .filter");
__turbopack_context__.k.register(_c1, "FILMS");
__turbopack_context__.k.register(_c2, "OpeningFilmSection");
__turbopack_context__.k.register(_c3, "AnimatedName");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/home/final-cta-section.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "FinalCta": (()=>FinalCta)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function OrnamentLine({ color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 140 10",
        width: "120",
        height: "9",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "0",
                y1: "4.5",
                x2: "55",
                y2: "4.5",
                stroke: color,
                strokeWidth: "0.5",
                opacity: "0.45"
            }, void 0, false, {
                fileName: "[project]/components/home/final-cta-section.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "64",
                y: "1.5",
                width: "6",
                height: "6",
                transform: "rotate(45 67 4.5)",
                fill: color,
                opacity: "0.45"
            }, void 0, false, {
                fileName: "[project]/components/home/final-cta-section.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "73",
                y: "1.5",
                width: "6",
                height: "6",
                transform: "rotate(45 76 4.5)",
                fill: color,
                opacity: "0.22"
            }, void 0, false, {
                fileName: "[project]/components/home/final-cta-section.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "85",
                y1: "4.5",
                x2: "140",
                y2: "4.5",
                stroke: color,
                strokeWidth: "0.5",
                opacity: "0.45"
            }, void 0, false, {
                fileName: "[project]/components/home/final-cta-section.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/home/final-cta-section.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = OrnamentLine;
function FinalCta() {
    _s();
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "relative min-h-[65dvh] flex flex-col items-center justify-center py-28 px-6 text-center overflow-hidden",
        style: {
            background: '#EDE5DA'
        },
        "aria-label": "Final call to action",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: "https://images.pexels.com/videos/8776108/pexels-photo-8776108.jpeg?auto=compress&cs=tinysrgb&w=1600",
                        alt: "Bride and groom sharing a loving gaze",
                        fill: true,
                        className: "object-cover object-center",
                        sizes: "100vw"
                    }, void 0, false, {
                        fileName: "[project]/components/home/final-cta-section.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0",
                        style: {
                            background: 'rgba(237,229,218,0.84)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/home/final-cta-section.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/home/final-cta-section.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: reduced ? false : {
                    opacity: 0,
                    y: 28
                },
                whileInView: {
                    opacity: 1,
                    y: 0
                },
                viewport: {
                    once: true,
                    margin: '-80px'
                },
                transition: {
                    duration: 1.2,
                    ease: [
                        0.22,
                        1,
                        0.36,
                        1
                    ]
                },
                className: "relative z-10 flex flex-col items-center gap-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OrnamentLine, {
                        color: "#1A1A1A"
                    }, void 0, false, {
                        fileName: "[project]/components/home/final-cta-section.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: reduced ? false : {
                            opacity: 0,
                            y: 12
                        },
                        whileInView: {
                            opacity: 1,
                            y: 0
                        },
                        viewport: {
                            once: true
                        },
                        transition: {
                            duration: 1.1,
                            ease: [
                                0.22,
                                1,
                                0.36,
                                1
                            ],
                            delay: 0.12
                        },
                        className: "flex flex-col items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-inter tracking-[0.28em] uppercase",
                                style: {
                                    fontSize: 9,
                                    color: 'rgba(26,26,26,0.28)'
                                },
                                children: "Your story"
                            }, void 0, false, {
                                fileName: "[project]/components/home/final-cta-section.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-cormorant font-light italic text-[#1A1A1A] leading-none",
                                style: {
                                    fontSize: 'clamp(2.8rem, 9vw, 5.8rem)',
                                    letterSpacing: '-0.01em',
                                    maxWidth: '18ch'
                                },
                                children: "Deserves a beautiful beginning."
                            }, void 0, false, {
                                fileName: "[project]/components/home/final-cta-section.tsx",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/home/final-cta-section.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OrnamentLine, {
                        color: "#1A1A1A"
                    }, void 0, false, {
                        fileName: "[project]/components/home/final-cta-section.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: reduced ? false : {
                            opacity: 0,
                            y: 10
                        },
                        whileInView: {
                            opacity: 1,
                            y: 0
                        },
                        viewport: {
                            once: true
                        },
                        transition: {
                            duration: 0.9,
                            ease: [
                                0.22,
                                1,
                                0.36,
                                1
                            ],
                            delay: 0.28
                        },
                        className: "flex flex-col sm:flex-row items-center gap-5 mt-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/builder",
                                className: "font-inter tracking-[0.22em] uppercase rounded-full transition-all duration-500 hover:scale-105",
                                style: {
                                    fontSize: 10,
                                    padding: '15px 40px',
                                    background: '#1A1A1A',
                                    color: '#F8F4EF',
                                    boxShadow: '0 4px 24px rgba(26,26,26,0.18)'
                                },
                                children: "Reserve your design"
                            }, void 0, false, {
                                fileName: "[project]/components/home/final-cta-section.tsx",
                                lineNumber: 82,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-inter",
                                style: {
                                    fontSize: 10,
                                    color: 'rgba(26,26,26,0.3)',
                                    letterSpacing: '0.1em'
                                },
                                children: "From €19.99 · Live in minutes"
                            }, void 0, false, {
                                fileName: "[project]/components/home/final-cta-section.tsx",
                                lineNumber: 95,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/home/final-cta-section.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/home/final-cta-section.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/home/final-cta-section.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_s(FinalCta, "/JSVQSdN2dVjcj5yyuX/KnOybKE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"]
    ];
});
_c1 = FinalCta;
var _c, _c1;
__turbopack_context__.k.register(_c, "OrnamentLine");
__turbopack_context__.k.register(_c1, "FinalCta");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_d38a6477._.js.map