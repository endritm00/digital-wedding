module.exports = {

"[project]/components/builder/hairline.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Hairline": (()=>Hairline),
    "STEPS": (()=>STEPS),
    "stepHref": (()=>stepHref),
    "stepIndex": (()=>stepIndex)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$builder$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/builder-provider.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const STEPS = [
    {
        slug: 'names',
        name: 'Your names'
    },
    {
        slug: 'style',
        name: 'Your style'
    },
    {
        slug: 'opening-video',
        name: 'Your film'
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
        slug: 'extras',
        name: 'Finishing touches'
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
    const { saveState, invite } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$builder$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuilder"])();
    const idx = stepIndex(step);
    const progress = (idx + 1) / STEPS.length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-x-0 top-0 z-40",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-px w-full",
                style: {
                    background: 'rgba(26,24,22,0.1)'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
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
                    lineNumber: 38,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/builder/hairline.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-5 pt-3 lg:px-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative h-4 overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                            mode: "wait",
                            initial: false,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
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
                                lineNumber: 51,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/builder/hairline.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/builder/hairline.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                mode: "wait",
                                children: [
                                    saveState === 'saved' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
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
                                        lineNumber: 69,
                                        columnNumber: 15
                                    }, this),
                                    saveState === 'error' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
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
                                        lineNumber: 82,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/builder/hairline.tsx",
                                lineNumber: 67,
                                columnNumber: 11
                            }, this),
                            invite?.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "13",
                                        height: "11",
                                        viewBox: "0 0 13 11",
                                        fill: "none",
                                        "aria-hidden": true,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M1 5.5C2.4 2.9 4.2 1.6 6.5 1.6S10.6 2.9 12 5.5C10.6 8.1 8.8 9.4 6.5 9.4S2.4 8.1 1 5.5Z",
                                                stroke: "#A8854B",
                                                strokeWidth: "1"
                                            }, void 0, false, {
                                                fileName: "[project]/components/builder/hairline.tsx",
                                                lineNumber: 103,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                cx: "6.5",
                                                cy: "5.5",
                                                r: "1.7",
                                                fill: "#A8854B"
                                            }, void 0, false, {
                                                fileName: "[project]/components/builder/hairline.tsx",
                                                lineNumber: 104,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/builder/hairline.tsx",
                                        lineNumber: 102,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-inter uppercase",
                                        style: {
                                            fontSize: 9,
                                            letterSpacing: '0.16em',
                                            color: '#A8854B'
                                        },
                                        children: "Preview"
                                    }, void 0, false, {
                                        fileName: "[project]/components/builder/hairline.tsx",
                                        lineNumber: 106,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/builder/hairline.tsx",
                                lineNumber: 96,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/builder/hairline.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/builder/hairline.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/builder/hairline.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
}}),
"[project]/components/builder/step-sheet.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "StepSheet": (()=>StepSheet)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function StepSheet({ title, lede, children, primaryLabel, onPrimary, primaryDisabled, primaryBusy, laterLabel, onLater, backHref }) {
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: reduced ? {
            opacity: 0
        } : {
            opacity: 0,
            y: 48
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.55,
            ease: [
                0.22,
                1,
                0.36,
                1
            ]
        },
        className: " fixed z-30 inset-x-0 bottom-0 lg:inset-x-auto lg:right-6 lg:top-16 lg:bottom-6 lg:w-[420px] flex flex-col rounded-t-[26px] lg:rounded-[26px] max-h-[66dvh] lg:max-h-none ",
        style: {
            background: '#F3EFE7',
            boxShadow: '0 -12px 48px rgba(26,24,22,0.14), 0 2px 8px rgba(26,24,22,0.05)'
        },
        role: "dialog",
        "aria-label": title,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center pt-3 lg:hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "h-1 rounded-full",
                    style: {
                        background: 'rgba(26,24,22,0.12)'
                    },
                    animate: reduced ? {} : {
                        width: [
                            36,
                            24,
                            36
                        ]
                    },
                    transition: {
                        duration: 3,
                        ease: 'easeInOut',
                        repeat: Infinity,
                        repeatDelay: 1
                    },
                    initial: {
                        width: 36
                    }
                }, void 0, false, {
                    fileName: "[project]/components/builder/step-sheet.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/builder/step-sheet.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto overscroll-contain px-6 pt-5 pb-3 lg:px-8 lg:pt-8",
                children: [
                    backHref && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>router.push(backHref),
                        className: "font-inter mb-4 flex items-center gap-1.5",
                        style: {
                            fontSize: 11,
                            color: 'rgba(26,24,22,0.42)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "12",
                                height: "12",
                                viewBox: "0 0 12 12",
                                fill: "none",
                                "aria-hidden": "true",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M7.5 2.5L4 6L7.5 9.5",
                                    stroke: "currentColor",
                                    strokeWidth: "1.2",
                                    strokeLinecap: "round"
                                }, void 0, false, {
                                    fileName: "[project]/components/builder/step-sheet.tsx",
                                    lineNumber: 76,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/builder/step-sheet.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this),
                            "Back"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/builder/step-sheet.tsx",
                        lineNumber: 69,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-cormorant font-light leading-tight",
                        style: {
                            fontSize: 'clamp(1.7rem, 6vw, 2.1rem)',
                            color: '#1A1816',
                            letterSpacing: '-0.01em'
                        },
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/builder/step-sheet.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    lede && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-inter mt-2 leading-relaxed",
                        style: {
                            fontSize: 13,
                            color: 'rgba(26,24,22,0.55)'
                        },
                        children: lede
                    }, void 0, false, {
                        fileName: "[project]/components/builder/step-sheet.tsx",
                        lineNumber: 89,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/components/builder/step-sheet.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/builder/step-sheet.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            (primaryLabel || laterLabel) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 pt-3 lg:px-8",
                style: {
                    paddingBottom: 'max(env(safe-area-inset-bottom), 18px)'
                },
                children: [
                    primaryLabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
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
                        children: primaryBusy ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "flex items-center justify-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "14",
                                    height: "14",
                                    viewBox: "0 0 14 14",
                                    fill: "none",
                                    "aria-hidden": "true",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M7 1.5A5.5 5.5 0 0 1 12.5 7",
                                        stroke: "rgba(253,252,249,0.7)",
                                        strokeWidth: "1.5",
                                        strokeLinecap: "round",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("animateTransform", {
                                            attributeName: "transform",
                                            type: "rotate",
                                            from: "0 7 7",
                                            to: "360 7 7",
                                            dur: "0.85s",
                                            repeatCount: "indefinite"
                                        }, void 0, false, {
                                            fileName: "[project]/components/builder/step-sheet.tsx",
                                            lineNumber: 122,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/builder/step-sheet.tsx",
                                        lineNumber: 121,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/builder/step-sheet.tsx",
                                    lineNumber: 120,
                                    columnNumber: 19
                                }, this),
                                "One moment…"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/builder/step-sheet.tsx",
                            lineNumber: 119,
                            columnNumber: 17
                        }, this) : primaryLabel
                    }, void 0, false, {
                        fileName: "[project]/components/builder/step-sheet.tsx",
                        lineNumber: 103,
                        columnNumber: 13
                    }, this),
                    laterLabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                        lineNumber: 131,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/builder/step-sheet.tsx",
                lineNumber: 98,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/builder/step-sheet.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
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
    const dim = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(0.52);
    const ivory = theme.dark ? '#E9E2D2' : '#F4ECDD';
    const finish = ()=>{
        if (opening) return;
        setOpening(true);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(dim, 0, {
            duration: 0.9,
            delay: 0.45,
            ease: [
                0.4,
                0,
                0.2,
                1
            ]
        });
        setTimeout(onOpen, 1250);
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
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute inset-0",
                animate: opening ? {
                    y: '16%',
                    scale: 1.05,
                    opacity: 0
                } : {
                    y: 0,
                    scale: 1,
                    opacity: 1
                },
                transition: {
                    duration: 0.85,
                    ease: [
                        0.4,
                        0,
                        0.2,
                        1
                    ],
                    delay: opening ? 0.4 : 0
                },
                style: {
                    transformOrigin: '50% 0%'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BotanicalPaper, {
                        ivory: ivory,
                        accent: theme.accent
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/interactive.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-x-0 top-0",
                        style: {
                            height: '54%',
                            perspective: 1700,
                            perspectiveOrigin: '50% 0%',
                            zIndex: opening ? 1 : 6
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "absolute inset-0",
                            style: {
                                transformOrigin: '50% 0%',
                                transformStyle: 'preserve-3d',
                                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                                background: `linear-gradient(178deg, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shade"])(ivory, 0.05)} 0%, ${ivory} 60%, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shade"])(ivory, -0.03)} 100%)`,
                                boxShadow: `0 8px 22px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])('#000', 0.16)}`
                            },
                            animate: opening ? {
                                rotateX: 176
                            } : {
                                rotateX: 0
                            },
                            transition: {
                                duration: 0.72,
                                ease: [
                                    0.4,
                                    0,
                                    0.2,
                                    1
                                ]
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute left-1/2 top-0 h-full",
                                style: {
                                    width: 1,
                                    background: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])('#000', 0.06)
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/invite/openers/interactive.tsx",
                                lineNumber: 79,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/invite/openers/interactive.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/interactive.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Greeting, {
                theme: theme,
                names: names,
                fade: opening ? 0 : 1
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            !opening && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SealButton, {
                onOpen: finish,
                mono: mono,
                font: theme.font,
                reduced: !!reduced
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 88,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Hint, {
                dir: "down",
                label: reduced ? 'Tap the seal to open' : 'Press the seal to open',
                show: !opening
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 58,
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
            zIndex: 20,
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
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RealisticSeal, {
            mono: mono,
            size: 186,
            font: font
        }, void 0, false, {
            fileName: "[project]/components/invite/openers/interactive.tsx",
            lineNumber: 112,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 100,
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
                                                lineNumber: 128,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M90 20 C108 36 110 70 96 100 M96 64 C82 60 72 70 72 86 M96 88 C112 86 120 100 120 112"
                                            }, void 0, false, {
                                                fileName: "[project]/components/invite/openers/interactive.tsx",
                                                lineNumber: 129,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/invite/openers/interactive.tsx",
                                        lineNumber: 127,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                        stroke: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])('#fff', 0.5),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M20 130 C40 110 40 70 22 40 M22 40 C8 56 6 80 20 96 M22 64 C36 60 46 70 46 86 M22 88 C8 86 0 98 0 112"
                                            }, void 0, false, {
                                                fileName: "[project]/components/invite/openers/interactive.tsx",
                                                lineNumber: 132,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M90 20 C108 36 110 70 96 100 M96 64 C82 60 72 70 72 86 M96 88 C112 86 120 100 120 112"
                                            }, void 0, false, {
                                                fileName: "[project]/components/invite/openers/interactive.tsx",
                                                lineNumber: 133,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/invite/openers/interactive.tsx",
                                        lineNumber: 131,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/invite/openers/interactive.tsx",
                                lineNumber: 125,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/invite/openers/interactive.tsx",
                            lineNumber: 124,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/interactive.tsx",
                        lineNumber: 123,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        width: "400",
                        height: "400",
                        fill: "url(#bot)",
                        opacity: "0.6"
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/interactive.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 122,
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
                                lineNumber: 145,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M30 -34 C40 -30 44 -20 40 -10"
                            }, void 0, false, {
                                fileName: "[project]/components/invite/openers/interactive.tsx",
                                lineNumber: 146,
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
                                lineNumber: 147,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/invite/openers/interactive.tsx",
                        lineNumber: 144,
                        columnNumber: 11
                    }, this)
                }, k, false, {
                    fileName: "[project]/components/invite/openers/interactive.tsx",
                    lineNumber: 143,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0",
                style: {
                    background: 'radial-gradient(120% 100% at 50% 42%, transparent 55%, rgba(40,28,10,0.16) 100%)'
                }
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 120,
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
                lineNumber: 183,
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
                lineNumber: 184,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Greeting, {
                theme: theme,
                names: names,
                fade: reduced ? 1 : greetFade
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 185,
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
                                    lineNumber: 191,
                                    columnNumber: 15
                                }, this)
                            }, s, false, {
                                fileName: "[project]/components/invite/openers/interactive.tsx",
                                lineNumber: 190,
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
                                lineNumber: 204,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/invite/openers/interactive.tsx",
                            lineNumber: 196,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/invite/openers/interactive.tsx",
                    lineNumber: 188,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 187,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Hint, {
                dir: "apart",
                label: reduced ? 'Tap to open the gates' : 'Pull the gates apart',
                show: !opening
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 210,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 182,
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
                            lineNumber: 222,
                            columnNumber: 66
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "45%",
                            stopColor: accent
                        }, void 0, false, {
                            fileName: "[project]/components/invite/openers/interactive.tsx",
                            lineNumber: 222,
                            columnNumber: 119
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "100%",
                            stopColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shade"])(accent, 0.35)
                        }, void 0, false, {
                            fileName: "[project]/components/invite/openers/interactive.tsx",
                            lineNumber: 222,
                            columnNumber: 159
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/invite/openers/interactive.tsx",
                    lineNumber: 222,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 222,
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
                lineNumber: 223,
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
                lineNumber: 224,
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
                            lineNumber: 227,
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
                            lineNumber: 228,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: `M${bx - 7} 40 L${bx} 18 L${bx + 7} 40 Z`,
                            fill: iron,
                            stroke: `url(#${gid})`,
                            strokeWidth: "1"
                        }, void 0, false, {
                            fileName: "[project]/components/invite/openers/interactive.tsx",
                            lineNumber: 229,
                            columnNumber: 11
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/components/invite/openers/interactive.tsx",
                    lineNumber: 226,
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
                            lineNumber: 232,
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
                            lineNumber: 232,
                            columnNumber: 120
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/components/invite/openers/interactive.tsx",
                    lineNumber: 232,
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
                            lineNumber: 233,
                            columnNumber: 181
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: `M${bx} 202 C${bx} 220 ${mx} 220 ${mx} 192 C${mx} 220 ${nx} 220 ${nx} 202`
                        }, void 0, false, {
                            fileName: "[project]/components/invite/openers/interactive.tsx",
                            lineNumber: 233,
                            columnNumber: 268
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/components/invite/openers/interactive.tsx",
                    lineNumber: 233,
                    columnNumber: 101
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 221,
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
                lineNumber: 259,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Greeting, {
                theme: theme,
                names: names,
                fade: reduced ? 1 : greetFade
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 260,
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
                            lineNumber: 276,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/interactive.tsx",
                        lineNumber: 275,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/invite/openers/interactive.tsx",
                    lineNumber: 271,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 264,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Hint, {
                dir: "up",
                label: reduced ? 'Tap to lift the veil' : 'Lift the veil',
                show: !opening
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 282,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 258,
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
                lineNumber: 291,
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
                lineNumber: 292,
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
                lineNumber: 293,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 290,
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
"[project]/app/builder/[inviteId]/style/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>StylePage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$hairline$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/hairline.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$step$2d$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/step-sheet.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$builder$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/builder-provider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/builder/presets.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/invite/openers/index.tsx [app-ssr] (ecmascript)");
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
// film shown behind the opener preview — matches the opener motif, falls back to the chosen film
const OPENER_FILM = {
    'wax-letter': 'the-letter',
    'iron-gates': 'the-gates',
    'lifting-veil': 'the-veil'
};
// Small motif thumbnails for the opener cards (closed-state idea).
function OpenerMotif({ motif, accent, ink }) {
    if (motif === 'gates') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "40",
        height: "40",
        viewBox: "0 0 40 40",
        fill: "none",
        "aria-hidden": true,
        children: [
            [
                11,
                20,
                29
            ].map((x, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                            x1: x,
                            y1: "12",
                            x2: x,
                            y2: "34",
                            stroke: accent,
                            strokeWidth: "1.6"
                        }, void 0, false, {
                            fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                            lineNumber: 21,
                            columnNumber: 47
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: `M${x - 3} 12 L${x} 7 L${x + 3} 12 Z`,
                            fill: accent
                        }, void 0, false, {
                            fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                            lineNumber: 21,
                            columnNumber: 119
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                    lineNumber: 21,
                    columnNumber: 36
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "7",
                y1: "20",
                x2: "33",
                y2: "20",
                stroke: accent,
                strokeWidth: "1.4"
            }, void 0, false, {
                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "20",
                cy: "20",
                r: "4.5",
                fill: "none",
                stroke: accent,
                strokeWidth: "1.4"
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
    if (motif === 'veil') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "40",
        height: "40",
        viewBox: "0 0 40 40",
        fill: "none",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8 9 Q20 4 32 9 L32 26 Q26 33 20 26 Q14 33 8 26 Z",
                fill: "none",
                stroke: accent,
                strokeWidth: "1.5",
                opacity: "0.85"
            }, void 0, false, {
                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8 26 q3 5 6 0 q3 5 6 0 q3 5 6 0 q3 5 6 0",
                fill: "none",
                stroke: accent,
                strokeWidth: "1.2",
                opacity: "0.6"
            }, void 0, false, {
                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "40",
        height: "40",
        viewBox: "0 0 40 40",
        fill: "none",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
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
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M7 12 L20 22 L33 12",
                fill: "none",
                stroke: accent,
                strokeWidth: "1.3"
            }, void 0, false, {
                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "20",
                cy: "22",
                r: "4",
                fill: accent
            }, void 0, false, {
                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
function StylePage({ params }) {
    const { inviteId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["use"])(params);
    const { opening, setOpening } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$builder$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuilder"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const [preview, setPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const config = opening?.config ?? {};
    const activePalette = config.palette ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_PALETTE"].id;
    const activeFont = config.heading_font ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_HEADING_FONT"].id;
    const activeOpener = config.opener ?? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_OPENER"].id;
    const palette = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PALETTE_MAP"][activePalette] ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_PALETTE"];
    const font = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HEADING_FONT_MAP"][activeFont] ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_HEADING_FONT"];
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
    const selectOpener = (id)=>{
        setOpening({
            opener: id
        });
        setPreview(id);
    };
    // film behind the opener preview
    const previewFilm = preview ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VIDEO_PRESETS"].find((p)=>p.id === OPENER_FILM[preview]) ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VIDEO_PRESETS"][0] : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$hairline$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Hairline"], {
                step: "style"
            }, void 0, false, {
                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$step$2d$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StepSheet"], {
                title: "Set the scene",
                lede: "Choose how your invitation opens, then dress it in a palette and lettering. Tap an opening to preview it.",
                primaryLabel: "Continue",
                onPrimary: ()=>router.push(`/builder/${inviteId}/opening-video`),
                backHref: `/builder/${inviteId}/names`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-inter uppercase",
                        style: {
                            fontSize: 9,
                            letterSpacing: '0.14em',
                            color: 'rgba(26,24,22,0.44)'
                        },
                        children: "How it opens"
                    }, void 0, false, {
                        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 flex flex-col gap-2.5",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OPENERS"].map((o, i)=>{
                            const on = activeOpener === o.id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                type: "button",
                                onClick: ()=>selectOpener(o.id),
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
                                className: "flex items-center gap-3.5 rounded-2xl p-3.5 text-left transition-all",
                                style: {
                                    background: on ? 'rgba(168,133,75,0.08)' : 'rgba(255,255,255,0.55)',
                                    border: on ? `1px solid ${palette.accent}` : '1px solid rgba(26,24,22,0.08)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex-none flex items-center justify-center rounded-xl",
                                        style: {
                                            width: 52,
                                            height: 52,
                                            background: on ? 'rgba(168,133,75,0.1)' : 'rgba(26,24,22,0.035)'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(OpenerMotif, {
                                            motif: o.motif,
                                            accent: on ? '#A8854B' : 'rgba(26,24,22,0.55)',
                                            ink: "#1A1816"
                                        }, void 0, false, {
                                            fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                            lineNumber: 105,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                        lineNumber: 104,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex min-w-0 flex-1 flex-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-cormorant font-light leading-tight",
                                                        style: {
                                                            fontSize: 16,
                                                            color: '#1A1816'
                                                        },
                                                        children: o.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                                        lineNumber: 109,
                                                        columnNumber: 21
                                                    }, this),
                                                    on && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                                        lineNumber: 110,
                                                        columnNumber: 28
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                                lineNumber: 108,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-inter leading-snug mt-0.5",
                                                style: {
                                                    fontSize: 10.5,
                                                    color: 'rgba(26,24,22,0.5)'
                                                },
                                                children: o.blurb
                                            }, void 0, false, {
                                                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                                lineNumber: 112,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                        lineNumber: 107,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-inter flex-none flex items-center gap-1",
                                        style: {
                                            fontSize: 9,
                                            letterSpacing: '0.1em',
                                            color: '#A8854B'
                                        },
                                        children: [
                                            "Preview",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                width: "9",
                                                height: "9",
                                                viewBox: "0 0 9 9",
                                                fill: "none",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M2 1.5L6.5 4.5L2 7.5V1.5Z",
                                                    fill: "#A8854B"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                                    lineNumber: 116,
                                                    columnNumber: 75
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                                lineNumber: 116,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                        lineNumber: 114,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, o.id, true, {
                                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                lineNumber: 89,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-inter uppercase",
                                style: {
                                    fontSize: 9,
                                    letterSpacing: '0.14em',
                                    color: 'rgba(26,24,22,0.4)'
                                },
                                children: "Palette"
                            }, void 0, false, {
                                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-px flex-1",
                                style: {
                                    background: 'rgba(26,24,22,0.08)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                lineNumber: 126,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 grid grid-cols-2 gap-2.5",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PALETTES"].map((p)=>{
                            const on = activePalette === p.id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex-none flex overflow-hidden rounded-full",
                                        style: {
                                            width: 30,
                                            height: 30,
                                            boxShadow: '0 2px 6px rgba(26,24,22,0.12)'
                                        },
                                        "aria-hidden": true,
                                        children: p.swatch.map((c, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    background: c,
                                                    width: 10,
                                                    height: 30
                                                }
                                            }, j, false, {
                                                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                                lineNumber: 136,
                                                columnNumber: 44
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                        lineNumber: 135,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex min-w-0 flex-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-cormorant font-light leading-tight truncate",
                                                style: {
                                                    fontSize: 13.5,
                                                    color: '#1A1816'
                                                },
                                                children: p.name
                                            }, void 0, false, {
                                                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                                lineNumber: 139,
                                                columnNumber: 19
                                            }, this),
                                            on && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-inter",
                                                style: {
                                                    fontSize: 8.5,
                                                    letterSpacing: '0.1em',
                                                    color: p.accent
                                                },
                                                children: "Selected"
                                            }, void 0, false, {
                                                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                                lineNumber: 140,
                                                columnNumber: 26
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                        lineNumber: 138,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, p.id, true, {
                                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                lineNumber: 132,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-inter uppercase",
                                style: {
                                    fontSize: 9,
                                    letterSpacing: '0.14em',
                                    color: 'rgba(26,24,22,0.4)'
                                },
                                children: "Lettering"
                            }, void 0, false, {
                                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                lineNumber: 149,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-px flex-1",
                                style: {
                                    background: 'rgba(26,24,22,0.08)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 flex flex-col gap-2.5",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HEADING_FONTS"].map((f)=>{
                            const on = activeFont === f.id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                type: "button",
                                onClick: ()=>setOpening({
                                        heading_font: f.id
                                    }),
                                "aria-pressed": on,
                                whileTap: reduced ? {} : {
                                    scale: 0.98
                                },
                                className: "flex items-center justify-between rounded-2xl px-4 py-3 text-left transition-all",
                                style: {
                                    background: on ? 'rgba(168,133,75,0.08)' : 'rgba(255,255,255,0.55)',
                                    border: on ? '1px solid rgba(168,133,75,0.45)' : '1px solid rgba(26,24,22,0.08)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: f.var,
                                            fontStyle: f.italic ? 'italic' : 'normal',
                                            fontSize: `calc(26px * ${f.scale})`,
                                            color: on ? '#A8854B' : '#1A1816',
                                            lineHeight: 1
                                        },
                                        children: f.sample
                                    }, void 0, false, {
                                        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                        lineNumber: 159,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-inter",
                                        style: {
                                            fontSize: 11,
                                            letterSpacing: '0.06em',
                                            color: on ? '#A8854B' : 'rgba(26,24,22,0.5)'
                                        },
                                        children: f.name
                                    }, void 0, false, {
                                        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                        lineNumber: 160,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, f.id, true, {
                                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                lineNumber: 156,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: preview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "fixed inset-0 z-[80]",
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
                        duration: 0.35
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InviteOpener"], {
                            id: preview,
                            theme: openerTheme,
                            names: names,
                            videoSrc: previewFilm?.src,
                            poster: previewFilm?.posterImg,
                            onOpen: ()=>setPreview(null)
                        }, void 0, false, {
                            fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                            lineNumber: 174,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setPreview(null),
                            "aria-label": "Close preview",
                            className: "absolute top-5 right-5 z-10 flex items-center justify-center rounded-full",
                            style: {
                                width: 34,
                                height: 34,
                                background: 'rgba(0,0,0,0.32)',
                                backdropFilter: 'blur(6px)'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "14",
                                height: "14",
                                viewBox: "0 0 14 14",
                                fill: "none",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M2 2l10 10M12 2L2 12",
                                    stroke: "#fff",
                                    strokeWidth: "1.4",
                                    strokeLinecap: "round"
                                }, void 0, false, {
                                    fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                    lineNumber: 180,
                                    columnNumber: 75
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                                lineNumber: 180,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                            lineNumber: 175,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "absolute top-7 left-5 z-10 font-inter uppercase",
                            style: {
                                fontSize: 9,
                                letterSpacing: '0.2em',
                                color: 'rgba(255,255,255,0.6)'
                            },
                            children: "Preview"
                        }, void 0, false, {
                            fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                            lineNumber: 182,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                    lineNumber: 170,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/builder/[inviteId]/style/page.tsx",
                lineNumber: 168,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}}),

};

//# sourceMappingURL=_fd5cd6ab._.js.map