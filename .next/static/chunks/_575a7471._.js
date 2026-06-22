(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/components/builder/hairline.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Hairline": (()=>Hairline),
    "STEPS": (()=>STEPS),
    "stepHref": (()=>stepHref),
    "stepIndex": (()=>stepIndex)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$builder$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/builder-provider.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const STEPS = [
    {
        slug: 'names',
        name: 'Your names'
    },
    {
        slug: 'opening-video',
        name: 'Your film'
    },
    {
        slug: 'style',
        name: 'Your style'
    },
    {
        slug: 'music',
        name: 'Your music'
    },
    {
        slug: 'save',
        name: 'Keep it safe'
    },
    {
        slug: 'sections',
        name: 'Your pages'
    },
    {
        slug: 'details',
        name: 'The details'
    },
    {
        slug: 'review',
        name: 'Review'
    }
];
function stepIndex(slug) {
    return Math.max(0, STEPS.findIndex((s)=>s.slug === slug));
}
function stepHref(inviteId, slug) {
    return `/builder/${inviteId}/${slug}`;
}
function Hairline({ step }) {
    _s();
    const { saveState, invite } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$builder$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBuilder"])();
    const idx = stepIndex(step);
    const progress = (idx + 1) / STEPS.length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-x-0 top-0 z-40",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-px w-full",
                style: {
                    background: 'rgba(26,24,22,0.1)'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "h-full",
                    style: {
                        background: '#1A1816',
                        transformOrigin: 'left'
                    },
                    animate: {
                        scaleX: progress
                    },
                    initial: false,
                    transition: {
                        duration: 0.6,
                        ease: [
                            0.22,
                            1,
                            0.36,
                            1
                        ]
                    }
                }, void 0, false, {
                    fileName: "[project]/components/builder/hairline.tsx",
                    lineNumber: 37,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/builder/hairline.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-5 pt-3 lg:px-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative h-4 overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                            mode: "wait",
                            initial: false,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                initial: {
                                    opacity: 0,
                                    y: 6
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                exit: {
                                    opacity: 0,
                                    y: -6
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
                                className: "font-inter uppercase absolute inset-0",
                                style: {
                                    fontSize: 9,
                                    letterSpacing: '0.2em',
                                    color: 'rgba(26,24,22,0.45)'
                                },
                                children: STEPS[idx].name
                            }, STEPS[idx].slug, false, {
                                fileName: "[project]/components/builder/hairline.tsx",
                                lineNumber: 50,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/builder/hairline.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/builder/hairline.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                mode: "wait",
                                children: [
                                    saveState === 'saved' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
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
                                        className: "font-inter",
                                        style: {
                                            fontSize: 10,
                                            color: 'rgba(26,24,22,0.38)'
                                        },
                                        children: "Saved"
                                    }, "saved", false, {
                                        fileName: "[project]/components/builder/hairline.tsx",
                                        lineNumber: 68,
                                        columnNumber: 15
                                    }, this),
                                    saveState === 'error' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                        initial: {
                                            opacity: 0
                                        },
                                        animate: {
                                            opacity: 1
                                        },
                                        exit: {
                                            opacity: 0
                                        },
                                        className: "font-inter",
                                        style: {
                                            fontSize: 10,
                                            color: '#8A4030'
                                        },
                                        children: "Couldn’t save — check your connection"
                                    }, "error", false, {
                                        fileName: "[project]/components/builder/hairline.tsx",
                                        lineNumber: 81,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/builder/hairline.tsx",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this),
                            invite?.id && step === 'style' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: `/invite/${invite.id}/preview?skipOpener=1`,
                                className: "flex items-center gap-1.5 rounded-full px-3 py-1.5",
                                style: {
                                    background: 'rgba(253,252,249,0.92)',
                                    backdropFilter: 'blur(8px)',
                                    boxShadow: '0 2px 12px rgba(26,24,22,0.1)',
                                    border: '1px solid rgba(168,133,75,0.28)'
                                },
                                "aria-label": "Preview the full invitation",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "13",
                                        height: "11",
                                        viewBox: "0 0 13 11",
                                        fill: "none",
                                        "aria-hidden": true,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M1 5.5C2.4 2.9 4.2 1.6 6.5 1.6S10.6 2.9 12 5.5C10.6 8.1 8.8 9.4 6.5 9.4S2.4 8.1 1 5.5Z",
                                                stroke: "#A8854B",
                                                strokeWidth: "1"
                                            }, void 0, false, {
                                                fileName: "[project]/components/builder/hairline.tsx",
                                                lineNumber: 104,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                cx: "6.5",
                                                cy: "5.5",
                                                r: "1.7",
                                                fill: "#A8854B"
                                            }, void 0, false, {
                                                fileName: "[project]/components/builder/hairline.tsx",
                                                lineNumber: 105,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/builder/hairline.tsx",
                                        lineNumber: 103,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-inter uppercase",
                                        style: {
                                            fontSize: 9,
                                            letterSpacing: '0.16em',
                                            color: '#A8854B'
                                        },
                                        children: "Preview"
                                    }, void 0, false, {
                                        fileName: "[project]/components/builder/hairline.tsx",
                                        lineNumber: 107,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/builder/hairline.tsx",
                                lineNumber: 97,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/builder/hairline.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/builder/hairline.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/builder/hairline.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_s(Hairline, "7gb0DfeOZmZxB0Q31wUaKkpQ0xM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$builder$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBuilder"]
    ];
});
_c = Hairline;
var _c;
__turbopack_context__.k.register(_c, "Hairline");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/builder/step-sheet.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "StepSheet": (()=>StepSheet)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/animation/animate/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$drag$2f$use$2d$drag$2d$controls$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/gestures/drag/use-drag-controls.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
// The one question surface: bottom sheet on phones, right panel on desktop.
// Vellum paper over the live preview. One decision per screen.
//
// On phones the sheet is DRAGGABLE: pull it down (or tap the grip) to "peek" —
// it slides away leaving a slim handle, so the live film fills the screen. Drag
// it back up (or tap the handle) to keep editing. This is how you actually SEE
// your invitation while building on a small screen.
// How much of the sheet stays on-screen when peeked (the grip handle).
const PEEK_VISIBLE = 64;
function useIsMobile() {
    _s();
    const [mobile, setMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useIsMobile.useEffect": ()=>{
            const mq = window.matchMedia('(max-width: 1023px)');
            const update = {
                "useIsMobile.useEffect.update": ()=>setMobile(mq.matches)
            }["useIsMobile.useEffect.update"];
            update();
            mq.addEventListener('change', update);
            return ({
                "useIsMobile.useEffect": ()=>mq.removeEventListener('change', update)
            })["useIsMobile.useEffect"];
        }
    }["useIsMobile.useEffect"], []);
    return mobile;
}
_s(useIsMobile, "Imck9ssPFizja+rDgrpiv+6NqBg=");
function StepSheet({ title, lede, children, primaryLabel, onPrimary, primaryDisabled, primaryBusy, laterLabel, onLater, backHref }) {
    _s1();
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const isMobile = useIsMobile();
    const sheetRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const scrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dragControls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$drag$2f$use$2d$drag$2d$controls$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDragControls"])();
    const y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const [peeked, setPeeked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [peekOffset, setPeekOffset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [moreBelow, setMoreBelow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showHint, setShowHint] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const entered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // One-time "drag down to preview" nudge — shown once ever, on the first mobile
    // step, so people discover the peek gesture. Dismissed on the first peek.
    const HINT_KEY = 'di:peek-hint-seen';
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StepSheet.useEffect": ()=>{
            if (!isMobile) return;
            let seen = true;
            try {
                seen = localStorage.getItem(HINT_KEY) === '1';
            } catch  {}
            if (seen) return;
            try {
                localStorage.setItem(HINT_KEY, '1');
            } catch  {}
            setShowHint(true);
            const t = setTimeout({
                "StepSheet.useEffect.t": ()=>setShowHint(false)
            }["StepSheet.useEffect.t"], 6000);
            return ({
                "StepSheet.useEffect": ()=>clearTimeout(t)
            })["StepSheet.useEffect"];
        }
    }["StepSheet.useEffect"], [
        isMobile
    ]);
    // Entrance — slide up once on mount (skip for reduced motion).
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StepSheet.useEffect": ()=>{
            if (entered.current) return;
            entered.current = true;
            if (reduced) {
                y.set(0);
                return;
            }
            y.set(40);
            const controls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["animate"])(y, 0, {
                duration: 0.4,
                ease: [
                    0.22,
                    1,
                    0.36,
                    1
                ]
            });
            return ({
                "StepSheet.useEffect": ()=>controls.stop()
            })["StepSheet.useEffect"];
        }
    }["StepSheet.useEffect"], [
        reduced,
        y
    ]);
    // Measure how far down "peeked" sits (sheet height minus the visible grip).
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StepSheet.useEffect": ()=>{
            if (!isMobile) {
                setPeekOffset(0);
                return;
            }
            const measure = {
                "StepSheet.useEffect.measure": ()=>{
                    const h = sheetRef.current?.offsetHeight ?? 0;
                    setPeekOffset(Math.max(0, h - PEEK_VISIBLE));
                }
            }["StepSheet.useEffect.measure"];
            measure();
            window.addEventListener('resize', measure);
            const ro = new ResizeObserver(measure);
            if (sheetRef.current) ro.observe(sheetRef.current);
            return ({
                "StepSheet.useEffect": ()=>{
                    window.removeEventListener('resize', measure);
                    ro.disconnect();
                }
            })["StepSheet.useEffect"];
        }
    }["StepSheet.useEffect"], [
        isMobile
    ]);
    // Keep the sheet pinned correctly when the layout changes (orientation, height
    // recompute) — but skip the first run so it never overrides the entrance, and
    // only re-pin while peeked (when open, y is owned by the entrance / drag).
    const didSync = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StepSheet.useEffect": ()=>{
            if (!didSync.current) {
                didSync.current = true;
                return;
            }
            if (!isMobile) {
                y.set(0);
                return;
            }
            if (peeked) y.set(peekOffset);
        }
    }["StepSheet.useEffect"], [
        isMobile,
        peekOffset
    ]) // eslint-disable-line react-hooks/exhaustive-deps
    ;
    const applyPeek = (next)=>{
        setPeeked(next);
        if (next) setShowHint(false);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["animate"])(y, next ? peekOffset : 0, {
            type: 'spring',
            stiffness: 360,
            damping: 38
        });
    };
    // Scroll affordance — show a soft fade + cue when there's more content below.
    const updateScrollCue = ()=>{
        const el = scrollRef.current;
        if (!el) {
            setMoreBelow(false);
            return;
        }
        setMoreBelow(el.scrollHeight - el.scrollTop - el.clientHeight > 8);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StepSheet.useEffect": ()=>{
            updateScrollCue();
        }
    }["StepSheet.useEffect"], [
        children,
        isMobile
    ]);
    const startDrag = (e)=>{
        if (isMobile) dragControls.start(e);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        ref: sheetRef,
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1
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
        className: " fixed z-30 inset-x-0 bottom-0 lg:inset-x-auto lg:right-6 lg:top-16 lg:bottom-6 lg:w-[420px] flex flex-col rounded-t-[26px] lg:rounded-[26px] max-h-[64dvh] lg:max-h-none ",
        style: {
            y,
            background: '#F3EFE7',
            boxShadow: '0 -12px 48px rgba(26,24,22,0.14), 0 2px 8px rgba(26,24,22,0.05)',
            touchAction: isMobile ? 'none' : undefined
        },
        drag: isMobile ? 'y' : false,
        dragControls: dragControls,
        dragListener: false,
        dragConstraints: {
            top: 0,
            bottom: peekOffset
        },
        dragElastic: 0.06,
        onDragEnd: (_e, info)=>{
            const moved = Math.abs(info.offset.y);
            if (moved < 6) {
                applyPeek(!peeked);
                return;
            } // a tap on the grip
            const pos = y.get();
            const next = info.velocity.y > 350 ? true : info.velocity.y < -350 ? false : pos > peekOffset * 0.42;
            applyPeek(next);
        },
        role: "dialog",
        "aria-label": title,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: showHint && !peeked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 8
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        y: 8
                    },
                    transition: {
                        duration: 0.4,
                        ease: [
                            0.22,
                            1,
                            0.36,
                            1
                        ]
                    },
                    className: "pointer-events-none absolute inset-x-0 -top-11 flex justify-center lg:hidden",
                    "aria-hidden": true,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-inter inline-flex items-center gap-1.5 rounded-full px-3.5 py-2",
                        style: {
                            fontSize: 11,
                            letterSpacing: '0.04em',
                            color: '#FDFCF9',
                            background: 'rgba(26,24,22,0.82)',
                            backdropFilter: 'blur(8px)',
                            boxShadow: '0 6px 20px rgba(26,24,22,0.28)'
                        },
                        children: [
                            "Drag down to preview",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].svg, {
                                width: "12",
                                height: "12",
                                viewBox: "0 0 12 12",
                                fill: "none",
                                animate: reduced ? {} : {
                                    y: [
                                        0,
                                        3,
                                        0
                                    ]
                                },
                                transition: {
                                    duration: 1.4,
                                    ease: 'easeInOut',
                                    repeat: Infinity
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M3 4.5L6 7.5L9 4.5",
                                    stroke: "#FDFCF9",
                                    strokeWidth: "1.3",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round"
                                }, void 0, false, {
                                    fileName: "[project]/components/builder/step-sheet.tsx",
                                    lineNumber: 199,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/builder/step-sheet.tsx",
                                lineNumber: 194,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/builder/step-sheet.tsx",
                        lineNumber: 185,
                        columnNumber: 13
                    }, this)
                }, "peek-hint", false, {
                    fileName: "[project]/components/builder/step-sheet.tsx",
                    lineNumber: 176,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/builder/step-sheet.tsx",
                lineNumber: 174,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center pt-3 pb-1 lg:hidden",
                style: {
                    cursor: 'grab',
                    touchAction: 'none'
                },
                onPointerDown: startDrag,
                role: "button",
                tabIndex: 0,
                "aria-label": peeked ? 'Pull up to keep editing' : 'Pull down to see your invitation',
                "aria-expanded": !peeked,
                onKeyDown: (e)=>{
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        applyPeek(!peeked);
                    }
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-1 rounded-full",
                        style: {
                            width: 36,
                            background: 'rgba(26,24,22,0.16)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/builder/step-sheet.tsx",
                        lineNumber: 220,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                        className: "font-inter uppercase mt-2",
                        style: {
                            fontSize: 8.5,
                            letterSpacing: '0.16em',
                            color: 'rgba(26,24,22,0.4)'
                        },
                        animate: {
                            opacity: peeked ? 1 : 0,
                            height: peeked ? 'auto' : 0
                        },
                        transition: {
                            duration: 0.25
                        },
                        children: "Pull up to keep editing"
                    }, void 0, false, {
                        fileName: "[project]/components/builder/step-sheet.tsx",
                        lineNumber: 224,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/builder/step-sheet.tsx",
                lineNumber: 207,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative flex-1 flex flex-col min-h-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: scrollRef,
                        onScroll: updateScrollCue,
                        className: "flex-1 min-h-0 overflow-y-auto overscroll-contain px-6 pt-2 pb-3 lg:px-8 lg:pt-8",
                        children: [
                            backHref && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>router.push(backHref),
                                className: "font-inter mb-4 flex items-center gap-1.5",
                                style: {
                                    fontSize: 11,
                                    color: 'rgba(26,24,22,0.42)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "12",
                                        height: "12",
                                        viewBox: "0 0 12 12",
                                        fill: "none",
                                        "aria-hidden": "true",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M7.5 2.5L4 6L7.5 9.5",
                                            stroke: "currentColor",
                                            strokeWidth: "1.2",
                                            strokeLinecap: "round"
                                        }, void 0, false, {
                                            fileName: "[project]/components/builder/step-sheet.tsx",
                                            lineNumber: 244,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/builder/step-sheet.tsx",
                                        lineNumber: 243,
                                        columnNumber: 13
                                    }, this),
                                    "Back"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/builder/step-sheet.tsx",
                                lineNumber: 237,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-cormorant font-light leading-tight",
                                style: {
                                    fontSize: 'clamp(1.6rem, 6vw, 2.1rem)',
                                    color: '#1A1816',
                                    letterSpacing: '-0.01em'
                                },
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/components/builder/step-sheet.tsx",
                                lineNumber: 250,
                                columnNumber: 9
                            }, this),
                            lede && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-inter mt-1.5 leading-relaxed",
                                style: {
                                    fontSize: 12.5,
                                    color: 'rgba(26,24,22,0.55)'
                                },
                                children: lede
                            }, void 0, false, {
                                fileName: "[project]/components/builder/step-sheet.tsx",
                                lineNumber: 257,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-5",
                                children: children
                            }, void 0, false, {
                                fileName: "[project]/components/builder/step-sheet.tsx",
                                lineNumber: 262,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/builder/step-sheet.tsx",
                        lineNumber: 235,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        "aria-hidden": true,
                        className: "pointer-events-none absolute inset-x-0 bottom-0 flex justify-center",
                        style: {
                            height: 32,
                            background: 'linear-gradient(to top, #F3EFE7 0%, rgba(243,239,231,0) 100%)'
                        },
                        animate: {
                            opacity: moreBelow ? 1 : 0
                        },
                        transition: {
                            duration: 0.3
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].svg, {
                            width: "16",
                            height: "16",
                            viewBox: "0 0 16 16",
                            fill: "none",
                            className: "self-end mb-1",
                            animate: reduced ? {} : {
                                y: [
                                    0,
                                    3,
                                    0
                                ]
                            },
                            transition: {
                                duration: 1.6,
                                ease: 'easeInOut',
                                repeat: Infinity
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M4 6l4 4 4-4",
                                stroke: "rgba(168,133,75,0.7)",
                                strokeWidth: "1.4",
                                strokeLinecap: "round",
                                strokeLinejoin: "round"
                            }, void 0, false, {
                                fileName: "[project]/components/builder/step-sheet.tsx",
                                lineNumber: 279,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/builder/step-sheet.tsx",
                            lineNumber: 274,
                            columnNumber: 9
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/builder/step-sheet.tsx",
                        lineNumber: 267,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/builder/step-sheet.tsx",
                lineNumber: 234,
                columnNumber: 7
            }, this),
            (primaryLabel || laterLabel) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 pt-3 lg:px-8",
                style: {
                    paddingBottom: 'max(env(safe-area-inset-bottom), 18px)'
                },
                children: [
                    primaryLabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                        type: "button",
                        onClick: onPrimary,
                        disabled: primaryDisabled || primaryBusy,
                        whileTap: reduced ? {} : {
                            scale: 0.97
                        },
                        className: "w-full rounded-full py-4 font-inter disabled:opacity-40",
                        style: {
                            background: '#A8854B',
                            color: '#FDFCF9',
                            fontSize: 13,
                            letterSpacing: '0.04em',
                            boxShadow: '0 6px 20px rgba(168,133,75,0.32)',
                            transition: 'opacity 0.3s, box-shadow 0.2s'
                        },
                        children: primaryBusy ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "flex items-center justify-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "14",
                                    height: "14",
                                    viewBox: "0 0 14 14",
                                    fill: "none",
                                    "aria-hidden": "true",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M7 1.5A5.5 5.5 0 0 1 12.5 7",
                                        stroke: "rgba(253,252,249,0.7)",
                                        strokeWidth: "1.5",
                                        strokeLinecap: "round",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animateTransform", {
                                            attributeName: "transform",
                                            type: "rotate",
                                            from: "0 7 7",
                                            to: "360 7 7",
                                            dur: "0.85s",
                                            repeatCount: "indefinite"
                                        }, void 0, false, {
                                            fileName: "[project]/components/builder/step-sheet.tsx",
                                            lineNumber: 309,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/builder/step-sheet.tsx",
                                        lineNumber: 308,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/builder/step-sheet.tsx",
                                    lineNumber: 307,
                                    columnNumber: 19
                                }, this),
                                "One moment…"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/builder/step-sheet.tsx",
                            lineNumber: 306,
                            columnNumber: 17
                        }, this) : primaryLabel
                    }, void 0, false, {
                        fileName: "[project]/components/builder/step-sheet.tsx",
                        lineNumber: 290,
                        columnNumber: 13
                    }, this),
                    laterLabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onLater,
                        className: "mt-3 w-full py-1.5 font-inter",
                        style: {
                            fontSize: 12,
                            color: 'rgba(26,24,22,0.45)'
                        },
                        children: laterLabel
                    }, void 0, false, {
                        fileName: "[project]/components/builder/step-sheet.tsx",
                        lineNumber: 318,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/builder/step-sheet.tsx",
                lineNumber: 285,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/builder/step-sheet.tsx",
        lineNumber: 137,
        columnNumber: 5
    }, this);
}
_s1(StepSheet, "Gs8f80y7mmwdAMCiAFRQdAA4Qek=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        useIsMobile,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$drag$2f$use$2d$drag$2d$controls$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDragControls"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"]
    ];
});
_c = StepSheet;
var _c;
__turbopack_context__.k.register(_c, "StepSheet");
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
"[project]/components/invite/openers/interactive.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "EnvelopeOpener": (()=>EnvelopeOpener),
    "VeilOpener": (()=>VeilOpener)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/animation/animate/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/invite/openers/shared.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$realistic$2d$seal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/invite/openers/realistic-seal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$video$2f$use$2d$film$2d$video$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/video/use-film-video.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature();
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
    _s();
    const videoOpacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0) // poster → live film
    ;
    const scrimOpacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(1) // closed-state legibility scrim
    ;
    const filmScale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(1) // 1.08 → 1.00 settle in stage 4
    ;
    const whiteScale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0) // light blooming from centre
    ;
    const whiteOpacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    // A soft light wash blooms over the opener and lingers for a single breath,
    // then the caller hands off so the whole overlay slowly MELTS into the
    // invitation — the playing film + name card emerging together through the
    // light. A gentle blend, not a blank-white hold and not a hard cut.
    const run = async ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["animate"])(scrimOpacity, 0, {
            duration: 0.5,
            ease: 'easeOut'
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["animate"])(whiteScale, 1, {
            duration: 0.8,
            ease: [
                0.22,
                1,
                0.36,
                1
            ]
        });
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["animate"])(whiteOpacity, 0.92, {
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
_s(useReveal, "FnSAXwRldGjO6TGcUhy4fvnZJmw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"]
    ];
});
// The film, behind everything. Plays the moment the reveal begins so it's already
// in motion by the time the white light clears.
function FilmStage({ videoSrc, videoHls, poster, play, videoOpacity, scrimOpacity, filmScale, mode = 'auto', focal }) {
    _s1();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Match OpeningHero's framing so the film doesn't reframe at handoff: honour the
    // couple's chosen mode for custom films; auto (aspect-aware) for presets.
    const [autoFit, setAutoFit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('cover');
    // Adaptive HLS / MP4 source + robust play. The reveal is triggered by a user
    // gesture (tap/drag to open), so play() is already unlocked here.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$video$2f$use$2d$film$2d$video$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFilmVideo"])(ref, {
        hls: videoHls,
        mp4: videoSrc
    }, {
        play
    });
    // Only custom 'blend' adapts per viewport; presets/default ('auto') and 'crop'
    // always fill (cover) — the original behaviour.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FilmStage.useEffect": ()=>{
            if (mode !== 'blend') return;
            const decide = {
                "FilmStage.useEffect.decide": ()=>{
                    const v = ref.current;
                    if (!v || !v.videoWidth || !v.videoHeight) return;
                    const videoRatio = v.videoWidth / v.videoHeight;
                    const boxRatio = window.innerWidth / window.innerHeight || 1;
                    const visible = Math.min(videoRatio, boxRatio) / Math.max(videoRatio, boxRatio);
                    setAutoFit(visible >= 0.8 ? 'cover' : 'contain');
                }
            }["FilmStage.useEffect.decide"];
            const v = ref.current;
            decide();
            v?.addEventListener('loadedmetadata', decide);
            window.addEventListener('resize', decide);
            return ({
                "FilmStage.useEffect": ()=>{
                    v?.removeEventListener('loadedmetadata', decide);
                    window.removeEventListener('resize', decide);
                }
            })["FilmStage.useEffect"];
        }
    }["FilmStage.useEffect"], [
        videoSrc,
        mode
    ]);
    const fit = mode === 'blend' ? autoFit : 'cover';
    const objectPosition = mode === 'crop' && focal ? `${Math.round(focal.x * 100)}% ${Math.round(focal.y * 100)}%` : 'center';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "absolute inset-0 overflow-hidden",
        style: {
            zIndex: 10,
            scale: filmScale,
            transformOrigin: '50% 45%'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            videoSrc && poster && fit === 'contain' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            videoSrc && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].video, {
                ref: ref,
                className: "absolute inset-0 h-full w-full",
                poster: poster ?? undefined,
                preload: "auto",
                muted: true,
                loop: true,
                playsInline: true,
                style: {
                    opacity: videoOpacity,
                    objectFit: fit,
                    objectPosition
                }
            }, videoHls ?? videoSrc, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 105,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
_s1(FilmStage, "v1Wvh3YPhTm9EL1lPQSomMYKkoQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$video$2f$use$2d$film$2d$video$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFilmVideo"]
    ];
});
_c = FilmStage;
// The blooming "light" curtain — a huge soft-edged white disc that scales up from
// the opener's centre, holds, then fades to reveal the film.
function WhiteCurtain({ scale, opacity, originY = '52%' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
_c1 = WhiteCurtain;
function Greeting({ theme, names, fade }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "pointer-events-none absolute inset-x-0 top-[12%] z-40 flex flex-col items-center text-center px-6",
        style: {
            opacity: fade
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
_c2 = Greeting;
function Hint({ label, show, dir }) {
    _s2();
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const icon = dir === 'up' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "M7.5 12V4M4 7.5l3.5-3.5L11 7.5",
        stroke: "#fff",
        strokeWidth: "1.3",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }, void 0, false, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 154,
        columnNumber: 7
    }, this) : dir === 'apart' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "M6 4L3 7.5L6 11M9 4l3 3.5L9 11",
        stroke: "#fff",
        strokeWidth: "1.3",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }, void 0, false, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 156,
        columnNumber: 7
    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "pointer-events-none absolute bottom-[8%] left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2",
        animate: {
            opacity: show ? 1 : 0
        },
        transition: {
            duration: 0.4
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
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
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
_s2(Hint, "/JSVQSdN2dVjcj5yyuX/KnOybKE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"]
    ];
});
_c3 = Hint;
function EnvelopeOpener({ theme, names, onOpen, videoSrc, videoHls, poster, videoFit, videoFocal }) {
    _s3();
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const [opening, setOpening] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const mono = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initials"])(names);
    const ivory = theme.dark ? '#E9E2D2' : '#F4ECDD';
    const rv = useReveal();
    const flapRot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const envScale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(1);
    const envOpacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(1);
    const greet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(1);
    const finish = async ()=>{
        if (opening) return;
        setOpening(true);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["animate"])(rv.videoOpacity, 1, {
            duration: 0.9
        }) // film comes alive behind
        ;
        if (reduced) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["animate"])(greet, 0, {
                duration: 0.3
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["animate"])(rv.scrimOpacity, 0, {
                duration: 0.6
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["animate"])(envOpacity, 0, {
                duration: 0.6
            });
            await wait(700);
            onOpen();
            return;
        }
        // Stage 1 — the flap lifts up slowly and the envelope breathes open
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["animate"])(flapRot, 180, {
            duration: 0.95,
            ease: [
                0.33,
                0,
                0.2,
                1
            ]
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["animate"])(envScale, 1.05, {
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
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["animate"])(greet, 0, {
            duration: 0.4
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["animate"])(envOpacity, 0, {
            duration: 0.6,
            ease: 'easeIn'
        }) // dissolves as the light washes in
        ;
        // soft light wash, then hand off → overlay melts into the invitation
        await rv.run();
        onOpen();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilmStage, {
                videoSrc: videoSrc,
                videoHls: videoHls,
                poster: poster,
                play: opening,
                videoOpacity: rv.videoOpacity,
                scrimOpacity: rv.scrimOpacity,
                filmScale: rv.filmScale,
                mode: videoFit,
                focal: videoFocal
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 215,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WhiteCurtain, {
                scale: rv.whiteScale,
                opacity: rv.whiteOpacity,
                originY: "52%"
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 216,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute inset-0",
                style: {
                    zIndex: 30,
                    scale: envScale,
                    opacity: envOpacity,
                    transformOrigin: '50% 50%'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BotanicalPaper, {
                        ivory: ivory,
                        accent: theme.accent
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/interactive.tsx",
                        lineNumber: 220,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-x-0 top-0",
                        style: {
                            height: '54%',
                            perspective: 1700,
                            perspectiveOrigin: '50% 0%'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "absolute inset-0",
                            style: {
                                transformOrigin: '50% 0%',
                                transformStyle: 'preserve-3d',
                                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                                background: `linear-gradient(176deg, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shade"])(ivory, 0.07)} 0%, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shade"])(ivory, 0.02)} 58%, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shade"])(ivory, -0.06)} 100%)`,
                                filter: `drop-shadow(0 3px 5px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexA"])('#000', 0.16)})`,
                                rotateX: flapRot
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "absolute inset-0 h-full w-full",
                                    viewBox: "0 0 100 100",
                                    preserveAspectRatio: "none",
                                    "aria-hidden": true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M0 0 L50 100 L100 0",
                                        fill: "none",
                                        stroke: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexA"])('#fff', 0.45),
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute left-1/2 top-0 h-full",
                                    style: {
                                        width: 1,
                                        background: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexA"])('#000', 0.05)
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Greeting, {
                theme: theme,
                names: names,
                fade: greet
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 241,
                columnNumber: 7
            }, this),
            !opening && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SealButton, {
                onOpen: finish,
                mono: mono,
                font: theme.font,
                reduced: !!reduced
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 244,
                columnNumber: 20
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Hint, {
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
_s3(EnvelopeOpener, "pJp0mXthRTrEz5rruJn/37skP8o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"],
        useReveal,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"]
    ];
});
_c4 = EnvelopeOpener;
// the seal sits where the flap point meets the body; supports click + drag-down
function SealButton({ onOpen, mono, font, reduced }) {
    _s4();
    const y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
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
            else (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["animate"])(y, 0, {
                type: 'spring',
                stiffness: 300,
                damping: 26
            });
        },
        "aria-label": "Open the invitation",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$realistic$2d$seal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RealisticSeal"], {
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
_s4(SealButton, "767kVZ58CuuyC/DJlU9EmP8z1u0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"]
    ];
});
_c5 = SealButton;
// Ivory stationery: warm paper, subtle botanical emboss, gold corner flourishes, vignette.
function BotanicalPaper({ ivory, accent }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0",
        style: {
            background: `radial-gradient(120% 90% at 50% 0%, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shade"])(ivory, -0.03)} 0%, ${ivory} 45%, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shade"])(ivory, 0.05)} 100%)`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "absolute inset-0 h-full w-full",
                "aria-hidden": true,
                style: {
                    opacity: 0.5,
                    mixBlendMode: 'multiply'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                        id: "paperGrain",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feTurbulence", {
                                type: "fractalNoise",
                                baseFrequency: "0.82",
                                numOctaves: "2",
                                seed: "4"
                            }, void 0, false, {
                                fileName: "[project]/components/invite/openers/interactive.tsx",
                                lineNumber: 278,
                                columnNumber: 33
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feColorMatrix", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "absolute inset-0 h-full w-full",
                "aria-hidden": true,
                preserveAspectRatio: "xMidYMid slice",
                viewBox: "0 0 400 400",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pattern", {
                            id: "bot",
                            width: "120",
                            height: "150",
                            patternUnits: "userSpaceOnUse",
                            patternTransform: "rotate(8)",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                fill: "none",
                                strokeWidth: "1.4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                        stroke: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexA"])('#000', 0.05),
                                        transform: "translate(0 1)",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M20 130 C40 110 40 70 22 40 M22 40 C8 56 6 80 20 96 M22 64 C36 60 46 70 46 86 M22 88 C8 86 0 98 0 112"
                                            }, void 0, false, {
                                                fileName: "[project]/components/invite/openers/interactive.tsx",
                                                lineNumber: 287,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                        stroke: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexA"])('#fff', 0.5),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M20 130 C40 110 40 70 22 40 M22 40 C8 56 6 80 20 96 M22 64 C36 60 46 70 46 86 M22 88 C8 86 0 98 0 112"
                                            }, void 0, false, {
                                                fileName: "[project]/components/invite/openers/interactive.tsx",
                                                lineNumber: 291,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "absolute inset-0 h-full w-full",
                viewBox: "0 0 100 100",
                preserveAspectRatio: "none",
                "aria-hidden": true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M0 100 L50 56 L100 100",
                        fill: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexA"])('#000', 0.025),
                        stroke: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexA"])('#000', 0.05),
                        strokeWidth: "0.3",
                        vectorEffect: "non-scaling-stroke"
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/interactive.tsx",
                        lineNumber: 302,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M0 0 L50 56 L0 100",
                        fill: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexA"])('#000', 0.018)
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/interactive.tsx",
                        lineNumber: 303,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M100 0 L50 56 L100 100",
                        fill: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexA"])('#000', 0.018)
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
            ].map(([k, tr])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "absolute",
                    style: {
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: '100%'
                    },
                    viewBox: "0 0 400 400",
                    "aria-hidden": true,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        transform: tr,
                        stroke: accent,
                        strokeOpacity: "0.5",
                        strokeWidth: "1.3",
                        fill: "none",
                        strokeLinecap: "round",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M0 0 C18 -4 30 -16 34 -36 M10 -8 C8 -22 16 -32 30 -34 M0 0 C-2 -16 6 -26 18 -28"
                            }, void 0, false, {
                                fileName: "[project]/components/invite/openers/interactive.tsx",
                                lineNumber: 311,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M30 -34 C40 -30 44 -20 40 -10"
                            }, void 0, false, {
                                fileName: "[project]/components/invite/openers/interactive.tsx",
                                lineNumber: 312,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_c6 = BotanicalPaper;
function VeilOpener({ theme, names, onOpen, videoSrc, videoHls, poster, videoFit, videoFocal }) {
    _s5();
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const [opening, setOpening] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const veilY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(y, [
        -260,
        0
    ], [
        '-100%',
        '0%'
    ]);
    const veilOpacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(y, [
        -260,
        -40,
        0
    ], [
        0,
        0.85,
        1
    ]);
    const greetFade = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(y, [
        -140,
        0
    ], [
        0,
        1
    ]);
    const rv = useReveal();
    const greet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(1);
    const finish = async ()=>{
        if (opening) return;
        setOpening(true);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["animate"])(rv.videoOpacity, 1, {
            duration: 0.9
        });
        if (reduced) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["animate"])(rv.scrimOpacity, 0, {
                duration: 0.6
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["animate"])(greet, 0, {
                duration: 0.3
            });
            await wait(600);
            onOpen();
            return;
        }
        // Stage 1 — the veil lifts away, unhurried
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["animate"])(y, -640, {
            duration: 0.95,
            ease: [
                0.4,
                0,
                0.2,
                1
            ]
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["animate"])(greet, 0, {
            duration: 0.5
        });
        await wait(520);
        // soft light wash, then hand off → overlay melts into the invitation
        await rv.run();
        onOpen();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilmStage, {
                videoSrc: videoSrc,
                videoHls: videoHls,
                poster: poster,
                play: opening,
                videoOpacity: rv.videoOpacity,
                scrimOpacity: rv.scrimOpacity,
                filmScale: rv.filmScale,
                mode: videoFit,
                focal: videoFocal
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 362,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WhiteCurtain, {
                scale: rv.whiteScale,
                opacity: rv.whiteOpacity,
                originY: "50%"
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 363,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Greeting, {
                theme: theme,
                names: names,
                fade: opening ? greet : reduced ? 1 : greetFade
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 365,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
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
                    else (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["animate"])(y, 0, {
                        type: 'spring',
                        stiffness: 240,
                        damping: 28
                    });
                },
                "aria-label": "Lift the veil",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "absolute inset-x-[-12%] top-[-8%]",
                    style: {
                        height: '122%',
                        y: veilY,
                        opacity: veilOpacity,
                        background: `linear-gradient(180deg, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexA"])('#ffffff', theme.dark ? 0.14 : 0.6)} 0%, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexA"])('#ffffff', theme.dark ? 0.05 : 0.28)} 62%, transparent 100%)`,
                        backdropFilter: 'blur(7px)',
                        WebkitBackdropFilter: 'blur(7px)'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "absolute left-0 right-0",
                        style: {
                            bottom: -1,
                            width: '100%',
                            height: 26
                        },
                        viewBox: "0 0 400 26",
                        preserveAspectRatio: "none",
                        "aria-hidden": true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M0 0 H400 V8 Q390 26 380 8 Q370 26 360 8 Q350 26 340 8 Q330 26 320 8 Q310 26 300 8 Q290 26 280 8 Q270 26 260 8 Q250 26 240 8 Q230 26 220 8 Q210 26 200 8 Q190 26 180 8 Q170 26 160 8 Q150 26 140 8 Q130 26 120 8 Q110 26 100 8 Q90 26 80 8 Q70 26 60 8 Q50 26 40 8 Q30 26 20 8 Q10 26 0 8 Z",
                            fill: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexA"])('#ffffff', theme.dark ? 0.16 : 0.6)
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Hint, {
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
_s5(VeilOpener, "nUCsud6evig7K92E4id2Gh08bK8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        useReveal,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"]
    ];
});
_c7 = VeilOpener;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7;
__turbopack_context__.k.register(_c, "FilmStage");
__turbopack_context__.k.register(_c1, "WhiteCurtain");
__turbopack_context__.k.register(_c2, "Greeting");
__turbopack_context__.k.register(_c3, "Hint");
__turbopack_context__.k.register(_c4, "EnvelopeOpener");
__turbopack_context__.k.register(_c5, "SealButton");
__turbopack_context__.k.register(_c6, "BotanicalPaper");
__turbopack_context__.k.register(_c7, "VeilOpener");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/invite/openers/index.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "DEFAULT_OPENER": (()=>DEFAULT_OPENER),
    "InviteOpener": (()=>InviteOpener),
    "OPENERS": (()=>OPENERS),
    "OPENER_MAP": (()=>OPENER_MAP)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$interactive$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/invite/openers/interactive.tsx [app-client] (ecmascript)");
'use client';
;
;
const OPENERS = [
    {
        id: 'wax-letter',
        name: 'The Letter',
        blurb: 'A wax-sealed envelope — press the seal to open it.',
        motif: 'letter'
    }
];
const OPENER_MAP = Object.fromEntries(_c1 = OPENERS.map(_c = (o)=>[
        o.id,
        o
    ]));
_c2 = OPENER_MAP;
const DEFAULT_OPENER = OPENERS[0];
function InviteOpener({ id, ...props }) {
    switch(id){
        case 'lifting-veil':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$interactive$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VeilOpener"], {
                ...props
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/index.tsx",
                lineNumber: 27,
                columnNumber: 33
            }, this);
        case 'wax-letter':
        default:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$interactive$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EnvelopeOpener"], {
                ...props
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/index.tsx",
                lineNumber: 29,
                columnNumber: 32
            }, this);
    }
}
_c3 = InviteOpener;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "OPENER_MAP$Object.fromEntries$OPENERS.map");
__turbopack_context__.k.register(_c1, "OPENER_MAP$Object.fromEntries");
__turbopack_context__.k.register(_c2, "OPENER_MAP");
__turbopack_context__.k.register(_c3, "InviteOpener");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/builder/[inviteId]/style/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>StylePage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$hairline$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/hairline.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$step$2d$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/step-sheet.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$builder$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/builder-provider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/builder/presets.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/invite/openers/index.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
// film shown behind the opener preview
const OPENER_FILM = {
    'wax-letter': 'the-letter'
};
// Small motif thumbnail for the opener card.
function OpenerMotif({ accent }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "40",
        height: "40",
        viewBox: "0 0 40 40",
        fill: "none",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "7",
                y: "11",
                width: "26",
                height: "19",
                rx: "1.5",
                fill: "none",
                stroke: accent,
                strokeWidth: "1.5"
            }, void 0, false, {
                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M7 12 L20 22 L33 12",
                fill: "none",
                stroke: accent,
                strokeWidth: "1.3"
            }, void 0, false, {
                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "20",
                cy: "22",
                r: "4",
                fill: accent
            }, void 0, false, {
                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c = OpenerMotif;
function StylePage({ params }) {
    _s();
    const { inviteId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(params);
    const { opening, setOpening } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$builder$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBuilder"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const [preview, setPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [previewLeaving, setPreviewLeaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Open/close the full-screen opener preview. Closing fades the overlay out and
    // then unmounts it via a guaranteed timeout — we deliberately avoid
    // AnimatePresence here: its exit can hang on the opener's infinite-repeat child
    // animations, leaving an invisible pointer-events overlay that froze the page.
    const openPreview = (id)=>{
        setPreviewLeaving(false);
        setPreview(id);
    };
    const closePreview = ()=>{
        setPreviewLeaving(true);
        setTimeout(()=>{
            setPreview(null);
            setPreviewLeaving(false);
        }, 300);
    };
    const config = opening?.config ?? {};
    const activePalette = config.palette ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_PALETTE"].id;
    const activeFont = config.heading_font ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_HEADING_FONT"].id;
    const activeOpener = config.opener ?? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_OPENER"].id;
    const palette = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PALETTE_MAP"][activePalette] ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_PALETTE"];
    const font = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HEADING_FONT_MAP"][activeFont] ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_HEADING_FONT"];
    const names = config.name_a && config.name_b ? `${config.name_a} & ${config.name_b}` : config.name_a || config.name_b || 'Aria & Luca';
    const openerTheme = {
        accent: palette.accent,
        paper: palette.paper,
        flap: palette.washAlt,
        ink: palette.ink,
        font: font.var,
        fontStyle: font.italic ? 'italic' : 'normal',
        dark: !!palette.dark
    };
    // Selecting (tapping the card) only chooses the opener. The preview overlay
    // opens solely from the explicit "Preview" button.
    const selectOpener = (id)=>{
        setOpening({
            opener: id
        });
    };
    const previewOpener = (id)=>{
        setOpening({
            opener: id
        });
        openPreview(id);
    };
    // film behind the opener preview
    const previewFilm = preview ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VIDEO_PRESETS"].find((p)=>p.id === OPENER_FILM[preview]) ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VIDEO_PRESETS"][0] : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$hairline$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Hairline"], {
                step: "style"
            }, void 0, false, {
                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$step$2d$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StepSheet"], {
                title: "Set the scene",
                lede: "Choose how your invitation opens, then dress it in a palette and lettering. Tap an opening to preview it.",
                primaryLabel: "Continue",
                onPrimary: ()=>router.push(`/builder/${inviteId}/music`),
                backHref: `/builder/${inviteId}/opening-video`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-inter uppercase",
                        style: {
                            fontSize: 9,
                            letterSpacing: '0.14em',
                            color: 'rgba(26,24,22,0.44)'
                        },
                        children: "How it opens"
                    }, void 0, false, {
                        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 flex flex-col gap-2.5",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OPENERS"].map((o, i)=>{
                            const on = activeOpener === o.id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                role: "button",
                                tabIndex: 0,
                                onClick: ()=>selectOpener(o.id),
                                onKeyDown: (e)=>{
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        selectOpener(o.id);
                                    }
                                },
                                "aria-pressed": on,
                                initial: reduced ? false : {
                                    opacity: 0,
                                    y: 10
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    duration: 0.4,
                                    delay: i * 0.05,
                                    ease: [
                                        0.22,
                                        1,
                                        0.36,
                                        1
                                    ]
                                },
                                whileTap: reduced ? {} : {
                                    scale: 0.985
                                },
                                className: "flex cursor-pointer items-center gap-3.5 rounded-2xl p-3.5 text-left transition-all",
                                style: {
                                    background: on ? 'rgba(168,133,75,0.08)' : 'rgba(255,255,255,0.55)',
                                    border: on ? `1px solid ${palette.accent}` : '1px solid rgba(26,24,22,0.08)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex-none flex items-center justify-center rounded-xl",
                                        style: {
                                            width: 52,
                                            height: 52,
                                            background: on ? 'rgba(168,133,75,0.1)' : 'rgba(26,24,22,0.035)'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OpenerMotif, {
                                            accent: on ? '#A8854B' : 'rgba(26,24,22,0.55)'
                                        }, void 0, false, {
                                            fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                            lineNumber: 108,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                        lineNumber: 107,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex min-w-0 flex-1 flex-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-cormorant font-light leading-tight",
                                                        style: {
                                                            fontSize: 16,
                                                            color: '#1A1816'
                                                        },
                                                        children: o.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                                        lineNumber: 112,
                                                        columnNumber: 21
                                                    }, this),
                                                    on && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-inter rounded-full px-1.5 py-0.5",
                                                        style: {
                                                            fontSize: 8,
                                                            letterSpacing: '0.08em',
                                                            background: 'rgba(168,133,75,0.14)',
                                                            color: '#A8854B'
                                                        },
                                                        children: "Selected"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                                        lineNumber: 113,
                                                        columnNumber: 28
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                                lineNumber: 111,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-inter leading-snug mt-0.5",
                                                style: {
                                                    fontSize: 10.5,
                                                    color: 'rgba(26,24,22,0.5)'
                                                },
                                                children: o.blurb
                                            }, void 0, false, {
                                                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                                lineNumber: 115,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                        lineNumber: 110,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: (e)=>{
                                            e.stopPropagation();
                                            previewOpener(o.id);
                                        },
                                        className: "font-inter flex-none flex items-center gap-1 rounded-full px-3 py-1.5 transition-colors",
                                        style: {
                                            fontSize: 9,
                                            letterSpacing: '0.1em',
                                            color: '#A8854B',
                                            background: 'rgba(168,133,75,0.1)',
                                            border: '1px solid rgba(168,133,75,0.28)'
                                        },
                                        "aria-label": `Preview ${o.name}`,
                                        children: [
                                            "Preview",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                width: "9",
                                                height: "9",
                                                viewBox: "0 0 9 9",
                                                fill: "none",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M2 1.5L6.5 4.5L2 7.5V1.5Z",
                                                    fill: "#A8854B"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                                    lineNumber: 125,
                                                    columnNumber: 75
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                                lineNumber: 125,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                        lineNumber: 117,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, o.id, true, {
                                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                lineNumber: 90,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-inter uppercase",
                                style: {
                                    fontSize: 9,
                                    letterSpacing: '0.14em',
                                    color: 'rgba(26,24,22,0.4)'
                                },
                                children: "Palette"
                            }, void 0, false, {
                                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                lineNumber: 134,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-px flex-1",
                                style: {
                                    background: 'rgba(26,24,22,0.08)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                lineNumber: 135,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 grid grid-cols-2 gap-2.5",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PALETTES"].map((p)=>{
                            const on = activePalette === p.id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                type: "button",
                                onClick: ()=>setOpening({
                                        palette: p.id
                                    }),
                                "aria-pressed": on,
                                whileTap: reduced ? {} : {
                                    scale: 0.97
                                },
                                className: "flex items-center gap-3 rounded-2xl p-3 text-left transition-all",
                                style: {
                                    background: on ? 'rgba(168,133,75,0.08)' : 'rgba(255,255,255,0.55)',
                                    border: on ? `1px solid ${p.accent}` : '1px solid rgba(26,24,22,0.08)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex-none flex overflow-hidden rounded-full",
                                        style: {
                                            width: 30,
                                            height: 30,
                                            boxShadow: '0 2px 6px rgba(26,24,22,0.12)'
                                        },
                                        "aria-hidden": true,
                                        children: p.swatch.map((c, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    background: c,
                                                    width: 10,
                                                    height: 30
                                                }
                                            }, j, false, {
                                                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                                lineNumber: 145,
                                                columnNumber: 44
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                        lineNumber: 144,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex min-w-0 flex-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-cormorant font-light leading-tight truncate",
                                                style: {
                                                    fontSize: 13.5,
                                                    color: '#1A1816'
                                                },
                                                children: p.name
                                            }, void 0, false, {
                                                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                                lineNumber: 148,
                                                columnNumber: 19
                                            }, this),
                                            on && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-inter",
                                                style: {
                                                    fontSize: 8.5,
                                                    letterSpacing: '0.1em',
                                                    color: p.accent
                                                },
                                                children: "Selected"
                                            }, void 0, false, {
                                                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                                lineNumber: 149,
                                                columnNumber: 26
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                        lineNumber: 147,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, p.id, true, {
                                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                lineNumber: 141,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-inter uppercase",
                                style: {
                                    fontSize: 9,
                                    letterSpacing: '0.14em',
                                    color: 'rgba(26,24,22,0.4)'
                                },
                                children: "Lettering"
                            }, void 0, false, {
                                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                lineNumber: 158,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-px flex-1",
                                style: {
                                    background: 'rgba(26,24,22,0.08)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                lineNumber: 159,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 flex flex-col gap-2.5",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HEADING_FONTS"].map((f)=>{
                            const on = activeFont === f.id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                type: "button",
                                onClick: ()=>setOpening({
                                        heading_font: f.id
                                    }),
                                "aria-pressed": on,
                                whileTap: reduced ? {} : {
                                    scale: 0.98
                                },
                                className: "flex items-center gap-4 rounded-2xl px-4 py-3 text-left transition-all",
                                style: {
                                    background: on ? 'rgba(168,133,75,0.08)' : 'rgba(255,255,255,0.55)',
                                    border: on ? '1px solid rgba(168,133,75,0.45)' : '1px solid rgba(26,24,22,0.08)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex-none",
                                        style: {
                                            fontFamily: f.var,
                                            fontStyle: f.italic ? 'italic' : 'normal',
                                            fontSize: `calc(28px * ${f.scale})`,
                                            color: on ? '#A8854B' : '#1A1816',
                                            lineHeight: 1,
                                            minWidth: 90
                                        },
                                        children: f.sample
                                    }, void 0, false, {
                                        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                        lineNumber: 169,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex min-w-0 flex-1 flex-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-inter leading-tight truncate",
                                                style: {
                                                    fontSize: 12,
                                                    color: on ? '#A8854B' : '#1A1816'
                                                },
                                                children: f.name
                                            }, void 0, false, {
                                                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                                lineNumber: 172,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-inter leading-tight truncate mt-0.5",
                                                style: {
                                                    fontSize: 9.5,
                                                    letterSpacing: '0.04em',
                                                    color: on ? 'rgba(168,133,75,0.7)' : 'rgba(26,24,22,0.4)'
                                                },
                                                children: f.pair
                                            }, void 0, false, {
                                                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                                lineNumber: 173,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                        lineNumber: 171,
                                        columnNumber: 17
                                    }, this),
                                    on && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "14",
                                        height: "14",
                                        viewBox: "0 0 14 14",
                                        fill: "none",
                                        "aria-hidden": true,
                                        className: "flex-none",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                cx: "7",
                                                cy: "7",
                                                r: "6.5",
                                                stroke: "#A8854B"
                                            }, void 0, false, {
                                                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                                lineNumber: 177,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M4.5 7.5l1.8 1.8L9.5 5",
                                                stroke: "#A8854B",
                                                strokeWidth: "1.2",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round"
                                            }, void 0, false, {
                                                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                                lineNumber: 178,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                        lineNumber: 176,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, f.id, true, {
                                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                lineNumber: 165,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            preview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "fixed inset-0 z-[80]",
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: previewLeaving ? 0 : 1
                },
                transition: {
                    duration: 0.3,
                    ease: 'easeInOut'
                },
                style: {
                    pointerEvents: previewLeaving ? 'none' : 'auto'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InviteOpener"], {
                        id: preview,
                        theme: openerTheme,
                        names: names,
                        videoSrc: previewFilm?.src,
                        poster: previewFilm?.posterImg,
                        onOpen: closePreview
                    }, void 0, false, {
                        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                        lineNumber: 196,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: closePreview,
                        "aria-label": "Close preview",
                        className: "absolute top-5 right-5 z-10 flex items-center justify-center rounded-full",
                        style: {
                            width: 34,
                            height: 34,
                            background: 'rgba(0,0,0,0.32)',
                            backdropFilter: 'blur(6px)'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "14",
                            height: "14",
                            viewBox: "0 0 14 14",
                            fill: "none",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M2 2l10 10M12 2L2 12",
                                stroke: "#fff",
                                strokeWidth: "1.4",
                                strokeLinecap: "round"
                            }, void 0, false, {
                                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                lineNumber: 202,
                                columnNumber: 73
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                            lineNumber: 202,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                        lineNumber: 197,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute top-7 left-5 z-10 font-inter uppercase",
                        style: {
                            fontSize: 9,
                            letterSpacing: '0.2em',
                            color: 'rgba(255,255,255,0.6)'
                        },
                        children: "Preview"
                    }, void 0, false, {
                        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                        lineNumber: 204,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                lineNumber: 189,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(StylePage, "TzZ/g0upPwJ3Xi0DCqpJNfiNbhE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$builder$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBuilder"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"]
    ];
});
_c1 = StylePage;
var _c, _c1;
__turbopack_context__.k.register(_c, "OpenerMotif");
__turbopack_context__.k.register(_c1, "StylePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_575a7471._.js.map