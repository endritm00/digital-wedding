module.exports = {

"[project]/components/home/marquee-cards.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "MarqueeCards": (()=>MarqueeCards)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-ssr] (ecmascript)");
'use client';
;
;
function pexelsPhoto(id, w = 600) {
    return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
}
const CARDS = [
    {
        id: 'noir',
        bg: '#0D0D14',
        fg: '#F5F0E8',
        accent: '#C9A96E',
        name1: 'Sofia',
        name2: 'Alessandro',
        date: '14 June 2026',
        loc: 'Villa Rufolo, Italy',
        photo: pexelsPhoto(19950472)
    },
    {
        id: 'ivory',
        bg: '#F5F0E4',
        fg: '#2C3828',
        accent: '#7A9B6C',
        name1: 'Emma',
        name2: 'James',
        date: '22 May 2026',
        loc: 'The Cotswolds, UK',
        photo: pexelsPhoto(28824204)
    },
    {
        id: 'blush',
        bg: '#A85850',
        fg: '#FAF0EC',
        accent: '#F4C8B4',
        name1: 'Isabella',
        name2: 'Marco',
        date: '5 Sept 2026',
        loc: 'Amalfi Coast, Italy',
        photo: pexelsPhoto(6679832)
    },
    {
        id: 'navy',
        bg: '#192848',
        fg: '#F0E8D5',
        accent: '#C8AA7A',
        name1: 'Charlotte',
        name2: 'William',
        date: '12 Aug 2026',
        loc: 'London, England',
        photo: pexelsPhoto(37380420)
    },
    {
        id: 'champagne',
        bg: '#F4EBD3',
        fg: '#5A4830',
        accent: '#9A7C50',
        name1: 'Amelia',
        name2: 'Oliver',
        date: '3 July 2026',
        loc: 'Bordeaux, France',
        photo: pexelsPhoto(17657612)
    },
    {
        id: 'sage',
        bg: '#4E6B58',
        fg: '#EEF3EC',
        accent: '#B4D0AC',
        name1: 'Aria',
        name2: 'Luca',
        date: '28 June 2026',
        loc: 'Santorini, Greece',
        photo: pexelsPhoto(752805)
    },
    {
        id: 'dusty',
        bg: '#E4BCBA',
        fg: '#3C1E1C',
        accent: '#8A4040',
        name1: 'Valentina',
        name2: 'Rafael',
        date: '11 Oct 2026',
        loc: 'Seville, Spain',
        photo: pexelsPhoto(19609201)
    },
    {
        id: 'minimal',
        bg: '#F0EAE2',
        fg: '#1A1A1A',
        accent: '#9A8070',
        name1: 'Claire',
        name2: 'Antoine',
        date: '8 May 2026',
        loc: 'Paris, France',
        photo: pexelsPhoto(19365954)
    },
    {
        id: 'burgundy',
        bg: '#38101E',
        fg: '#F5E8D0',
        accent: '#C48858',
        name1: 'Elena',
        name2: 'Maxim',
        date: '7 Nov 2026',
        loc: 'Prague, Czechia',
        photo: pexelsPhoto(20518451)
    },
    {
        id: 'garden',
        bg: '#E2EDE0',
        fg: '#1C381C',
        accent: '#4A784A',
        name1: 'Sophia',
        name2: 'Ethan',
        date: '19 Apr 2026',
        loc: 'Florence, Italy',
        photo: pexelsPhoto(31629944)
    }
];
const W = 148;
const H = Math.round(W * 16 / 9);
function Corner({ color, deg }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 14 14",
        width: "11",
        height: "11",
        style: {
            transform: `rotate(${deg}deg)`
        },
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M0,0 L10,0 L10,1.8 L1.8,1.8 L1.8,10 L0,10 Z",
            fill: color,
            opacity: "0.55"
        }, void 0, false, {
            fileName: "[project]/components/home/marquee-cards.tsx",
            lineNumber: 47,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/home/marquee-cards.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
function Divider({ color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 52 10",
        width: "48",
        height: "9",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "0",
                y1: "4.5",
                x2: "19",
                y2: "4.5",
                stroke: color,
                strokeWidth: "0.5",
                opacity: "0.55"
            }, void 0, false, {
                fileName: "[project]/components/home/marquee-cards.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "23",
                y: "1.5",
                width: "5.5",
                height: "5.5",
                transform: "rotate(45 25.75 4.25)",
                fill: color,
                opacity: "0.55"
            }, void 0, false, {
                fileName: "[project]/components/home/marquee-cards.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "32",
                y1: "4.5",
                x2: "52",
                y2: "4.5",
                stroke: color,
                strokeWidth: "0.5",
                opacity: "0.55"
            }, void 0, false, {
                fileName: "[project]/components/home/marquee-cards.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/home/marquee-cards.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
function Card({ c }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: W,
            height: H,
            flexShrink: 0,
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.10)',
            position: 'relative',
            overflow: 'hidden',
            marginRight: 13
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${c.photo})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: 0
                }
            }, void 0, false, {
                fileName: "[project]/components/home/marquee-cards.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    inset: 0,
                    background: c.bg,
                    opacity: 0.72,
                    zIndex: 1
                }
            }, void 0, false, {
                fileName: "[project]/components/home/marquee-cards.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    inset: 0,
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px 14px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            top: 9,
                            left: 9
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Corner, {
                            color: c.accent,
                            deg: 0
                        }, void 0, false, {
                            fileName: "[project]/components/home/marquee-cards.tsx",
                            lineNumber: 112,
                            columnNumber: 66
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/home/marquee-cards.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            top: 9,
                            right: 9
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Corner, {
                            color: c.accent,
                            deg: 90
                        }, void 0, false, {
                            fileName: "[project]/components/home/marquee-cards.tsx",
                            lineNumber: 113,
                            columnNumber: 66
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/home/marquee-cards.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            bottom: 9,
                            left: 9
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Corner, {
                            color: c.accent,
                            deg: 270
                        }, void 0, false, {
                            fileName: "[project]/components/home/marquee-cards.tsx",
                            lineNumber: 114,
                            columnNumber: 68
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/home/marquee-cards.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            bottom: 9,
                            right: 9
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Corner, {
                            color: c.accent,
                            deg: 180
                        }, void 0, false, {
                            fileName: "[project]/components/home/marquee-cards.tsx",
                            lineNumber: 115,
                            columnNumber: 68
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/home/marquee-cards.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 7,
                            textAlign: 'center',
                            width: '100%'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: 'var(--font-inter)',
                                    fontSize: 6,
                                    letterSpacing: '0.28em',
                                    textTransform: 'uppercase',
                                    color: c.fg,
                                    opacity: 0.38
                                },
                                children: "You are invited"
                            }, void 0, false, {
                                fileName: "[project]/components/home/marquee-cards.tsx",
                                lineNumber: 118,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Divider, {
                                color: c.accent
                            }, void 0, false, {
                                fileName: "[project]/components/home/marquee-cards.tsx",
                                lineNumber: 122,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: 'var(--font-cormorant)',
                                            fontSize: 20,
                                            fontWeight: 300,
                                            color: c.fg,
                                            lineHeight: 1.15
                                        },
                                        children: c.name1
                                    }, void 0, false, {
                                        fileName: "[project]/components/home/marquee-cards.tsx",
                                        lineNumber: 125,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: 'var(--font-cormorant)',
                                            fontSize: 13,
                                            fontStyle: 'italic',
                                            color: c.accent,
                                            lineHeight: 1.4
                                        },
                                        children: "&"
                                    }, void 0, false, {
                                        fileName: "[project]/components/home/marquee-cards.tsx",
                                        lineNumber: 128,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: 'var(--font-cormorant)',
                                            fontSize: 20,
                                            fontWeight: 300,
                                            color: c.fg,
                                            lineHeight: 1.15
                                        },
                                        children: c.name2
                                    }, void 0, false, {
                                        fileName: "[project]/components/home/marquee-cards.tsx",
                                        lineNumber: 131,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/home/marquee-cards.tsx",
                                lineNumber: 124,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Divider, {
                                color: c.accent
                            }, void 0, false, {
                                fileName: "[project]/components/home/marquee-cards.tsx",
                                lineNumber: 136,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 3
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: 'var(--font-inter)',
                                            fontSize: 6.5,
                                            letterSpacing: '0.2em',
                                            color: c.fg,
                                            opacity: 0.48
                                        },
                                        children: c.date
                                    }, void 0, false, {
                                        fileName: "[project]/components/home/marquee-cards.tsx",
                                        lineNumber: 139,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: 'var(--font-inter)',
                                            fontSize: 6,
                                            letterSpacing: '0.1em',
                                            color: c.fg,
                                            opacity: 0.3
                                        },
                                        children: c.loc
                                    }, void 0, false, {
                                        fileName: "[project]/components/home/marquee-cards.tsx",
                                        lineNumber: 142,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/home/marquee-cards.tsx",
                                lineNumber: 138,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/home/marquee-cards.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/home/marquee-cards.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/home/marquee-cards.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
function Row({ cards, reverse, duration }) {
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const anim = reverse ? 'marquee-x-rev' : 'marquee-x';
    const innerStyle = {
        display: 'flex',
        willChange: 'transform',
        animation: reduced ? 'none' : `${anim} ${duration}s linear infinite`
    };
    const doubled = [
        ...cards,
        ...cards
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            overflow: 'hidden',
            display: 'flex'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: innerStyle,
            children: doubled.map((c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                    c: c
                }, `${c.id}-${i}`, false, {
                    fileName: "[project]/components/home/marquee-cards.tsx",
                    lineNumber: 176,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/components/home/marquee-cards.tsx",
            lineNumber: 174,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/home/marquee-cards.tsx",
        lineNumber: 173,
        columnNumber: 5
    }, this);
}
function MarqueeCards() {
    const reversed = [
        ...CARDS
    ].reverse();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            userSelect: 'none',
            pointerEvents: 'none'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                cards: CARDS,
                reverse: false,
                duration: 55
            }, void 0, false, {
                fileName: "[project]/components/home/marquee-cards.tsx",
                lineNumber: 196,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                cards: reversed,
                reverse: true,
                duration: 44
            }, void 0, false, {
                fileName: "[project]/components/home/marquee-cards.tsx",
                lineNumber: 197,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/home/marquee-cards.tsx",
        lineNumber: 187,
        columnNumber: 5
    }, this);
}
}}),
"[project]/components/home/hero-section.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "HeroSection": (()=>HeroSection)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$marquee$2d$cards$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/marquee-cards.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function HeroSection() {
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "relative h-[100dvh] overflow-hidden bg-[#F8F4EF]",
        "aria-label": "Hero",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        src: "https://images.pexels.com/videos/8775889/pexels-photo-8775889.jpeg?auto=compress&cs=tinysrgb&w=1920",
                        alt: "A couple embracing at their wedding ceremony",
                        fill: true,
                        priority: true,
                        className: "object-cover object-center",
                        sizes: "100vw"
                    }, void 0, false, {
                        fileName: "[project]/components/home/hero-section.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0",
                        style: {
                            background: 'rgba(248,244,239,0.76)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/home/hero-section.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/home/hero-section.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-x-0 bottom-0 z-10",
                style: {
                    top: '50%'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-x-0 top-0 z-10 pointer-events-none",
                        style: {
                            height: '30%',
                            background: 'linear-gradient(to bottom, #F8F4EF 0%, rgba(248,244,239,0) 100%)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/home/hero-section.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$marquee$2d$cards$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MarqueeCards"], {}, void 0, false, {
                        fileName: "[project]/components/home/hero-section.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/home/hero-section.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none z-20",
                style: {
                    background: 'radial-gradient(ellipse 110% 80% at 50% 0%, transparent 55%, rgba(240,233,224,0.28) 100%)'
                }
            }, void 0, false, {
                fileName: "[project]/components/home/hero-section.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-x-0 top-0 flex flex-col items-center justify-center text-center px-6 z-30",
                style: {
                    height: '58%'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: reduced ? false : {
                            opacity: 0,
                            y: 8
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            duration: 0.9,
                            ease: [
                                0.22,
                                1,
                                0.36,
                                1
                            ],
                            delay: 0.1
                        },
                        className: "font-inter tracking-[0.36em] uppercase",
                        style: {
                            fontSize: 9,
                            color: 'rgba(26,26,26,0.28)',
                            letterSpacing: '0.36em',
                            marginBottom: '1.5rem'
                        },
                        children: "Digital Wedding Invitations"
                    }, void 0, false, {
                        fileName: "[project]/components/home/hero-section.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].h1, {
                        initial: reduced ? false : {
                            opacity: 0,
                            y: 28
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            duration: 1.5,
                            ease: [
                                0.22,
                                1,
                                0.36,
                                1
                            ],
                            delay: 0.18
                        },
                        className: "font-cormorant font-light text-[#1A1A1A] leading-none",
                        style: {
                            fontSize: 'clamp(3.6rem, 12vw, 9rem)',
                            letterSpacing: '-0.025em',
                            maxWidth: '14ch'
                        },
                        children: "Begin Your Forever."
                    }, void 0, false, {
                        fileName: "[project]/components/home/hero-section.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].p, {
                        initial: reduced ? false : {
                            opacity: 0,
                            y: 16
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            duration: 1.1,
                            ease: [
                                0.22,
                                1,
                                0.36,
                                1
                            ],
                            delay: 0.46
                        },
                        className: "font-inter mt-6",
                        style: {
                            fontSize: 11,
                            letterSpacing: '0.14em',
                            lineHeight: 1.9,
                            color: 'rgba(26,26,26,0.38)',
                            maxWidth: 320
                        },
                        children: [
                            "Stunning digital invitations.",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/components/home/hero-section.tsx",
                                lineNumber: 100,
                                columnNumber: 40
                            }, this),
                            "Share with a single link. Live in minutes."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/home/hero-section.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
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
                            delay: 0.72
                        },
                        className: "flex items-center gap-6 mt-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/builder",
                                className: "font-inter tracking-[0.2em] uppercase rounded-full transition-all duration-500 hover:scale-105",
                                style: {
                                    fontSize: 10,
                                    padding: '14px 36px',
                                    background: '#1A1A1A',
                                    color: '#F8F4EF',
                                    letterSpacing: '0.2em',
                                    boxShadow: '0 4px 24px rgba(26,26,26,0.18)'
                                },
                                children: "Start creating"
                            }, void 0, false, {
                                fileName: "[project]/components/home/hero-section.tsx",
                                lineNumber: 111,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "#themes",
                                className: "font-inter tracking-[0.18em] uppercase transition-opacity duration-300 hover:opacity-70",
                                style: {
                                    fontSize: 10,
                                    color: 'rgba(26,26,26,0.38)',
                                    letterSpacing: '0.18em'
                                },
                                children: "Explore themes →"
                            }, void 0, false, {
                                fileName: "[project]/components/home/hero-section.tsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/home/hero-section.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/home/hero-section.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: reduced ? false : {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                },
                transition: {
                    delay: 1.5,
                    duration: 0.8
                },
                className: "absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    animate: reduced ? {} : {
                        scaleY: [
                            0,
                            1,
                            0
                        ],
                        opacity: [
                            0,
                            0.35,
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
                        height: 44,
                        background: '#1A1A1A',
                        transformOrigin: 'top'
                    }
                }, void 0, false, {
                    fileName: "[project]/components/home/hero-section.tsx",
                    lineNumber: 142,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/home/hero-section.tsx",
                lineNumber: 136,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/home/hero-section.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
}}),
"[project]/components/home/envelope-section.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "EnvelopeSection": (()=>EnvelopeSection)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const EW = 500 // envelope width  (desktop)
;
const EH = 330 // envelope height (desktop)
;
const MEW = 340 // envelope width  (mobile)
;
const MEH = 226 // envelope height (mobile)
;
// ─── wax seal ──────────────────────────────────────────────────────────────────
function WaxSeal({ size = 56, onClick, label = 'Open' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        className: `rounded-full flex items-center justify-center ${onClick ? 'cursor-pointer' : 'cursor-default pointer-events-none'}`,
        style: {
            width: size,
            height: size,
            background: '#8B4B35',
            boxShadow: '0 4px 20px rgba(139,75,53,0.38)'
        },
        "aria-label": label,
        type: "button",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: size * 0.44,
            height: size * 0.44,
            viewBox: "0 0 26 26",
            fill: "none",
            "aria-hidden": "true",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M13 2L15.6 9.2L23 9.7L17.5 14.4L19.4 21.6L13 17.8L6.6 21.6L8.5 14.4L3 9.7L10.4 9.2L13 2Z",
                fill: "#F5D4BC",
                fillOpacity: "0.75"
            }, void 0, false, {
                fileName: "[project]/components/home/envelope-section.tsx",
                lineNumber: 36,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/home/envelope-section.tsx",
            lineNumber: 35,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/home/envelope-section.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
// ─── card face ─────────────────────────────────────────────────────────────────
function CardFace({ names, small = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 flex flex-col items-center justify-center gap-0",
        style: {
            background: '#FAF6F0'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-inter uppercase",
                style: {
                    fontSize: small ? 7 : 9,
                    letterSpacing: '0.3em',
                    color: 'rgba(26,26,26,0.3)'
                },
                children: "You are invited"
            }, void 0, false, {
                fileName: "[project]/components/home/envelope-section.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "font-cormorant font-light text-center leading-none mt-3",
                style: {
                    fontSize: small ? 'clamp(1rem, 5vw, 1.4rem)' : 'clamp(1.5rem, 4vw, 2.1rem)',
                    color: '#1A1A1A'
                },
                children: names
            }, void 0, false, {
                fileName: "[project]/components/home/envelope-section.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 w-10 h-px",
                style: {
                    background: 'rgba(26,26,26,0.14)'
                }
            }, void 0, false, {
                fileName: "[project]/components/home/envelope-section.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-inter uppercase mt-3",
                style: {
                    fontSize: small ? 7 : 8,
                    letterSpacing: '0.28em',
                    color: 'rgba(26,26,26,0.25)'
                },
                children: "Wedding Celebration"
            }, void 0, false, {
                fileName: "[project]/components/home/envelope-section.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/home/envelope-section.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
// ─── fold lines ────────────────────────────────────────────────────────────────
function FoldLines({ w, h }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: "absolute inset-0 w-full h-full pointer-events-none",
        viewBox: `0 0 ${w} ${h}`,
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "0",
                y1: "0",
                x2: w / 2,
                y2: h / 2,
                stroke: "#C4B09A",
                strokeWidth: "0.8"
            }, void 0, false, {
                fileName: "[project]/components/home/envelope-section.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: w,
                y1: "0",
                x2: w / 2,
                y2: h / 2,
                stroke: "#C4B09A",
                strokeWidth: "0.8"
            }, void 0, false, {
                fileName: "[project]/components/home/envelope-section.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "0",
                y1: h,
                x2: w / 2,
                y2: h / 2,
                stroke: "#C4B09A",
                strokeWidth: "0.8"
            }, void 0, false, {
                fileName: "[project]/components/home/envelope-section.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: w,
                y1: h,
                x2: w / 2,
                y2: h / 2,
                stroke: "#C4B09A",
                strokeWidth: "0.8"
            }, void 0, false, {
                fileName: "[project]/components/home/envelope-section.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/home/envelope-section.tsx",
        lineNumber: 82,
        columnNumber: 5
    }, this);
}
// ─── names input + CTA ─────────────────────────────────────────────────────────
function NamesInput({ names, setNames, className = '' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex flex-col items-center gap-5 ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                value: names,
                onChange: (e)=>setNames(e.target.value),
                placeholder: "Type your names.",
                maxLength: 60,
                className: " w-64 pb-2 text-center font-cormorant text-2xl font-light bg-transparent border-0 border-b focus:outline-none transition-colors duration-300 ",
                style: {
                    color: '#1A1A1A',
                    borderBottomColor: 'rgba(26,26,26,0.2)',
                    caretColor: '#8B4B35'
                },
                "aria-label": "Enter your names"
            }, void 0, false, {
                fileName: "[project]/components/home/envelope-section.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                href: "/builder",
                className: " font-inter text-[11px] tracking-[0.22em] uppercase border hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] px-10 py-3.5 rounded-full transition-all duration-500 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1A1A1A]/25 ",
                style: {
                    color: 'rgba(26,26,26,0.45)',
                    borderColor: 'rgba(26,26,26,0.18)'
                },
                children: "Create yours"
            }, void 0, false, {
                fileName: "[project]/components/home/envelope-section.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/home/envelope-section.tsx",
        lineNumber: 106,
        columnNumber: 5
    }, this);
}
// ─── mobile envelope (tap-to-open) ─────────────────────────────────────────────
function MobileEnvelope({ names, rawNames, setNames }) {
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const open = ()=>{
        if (phase > 0) return;
        setPhase(1);
        setTimeout(()=>setPhase(2), 700);
        setTimeout(()=>setPhase(3), 1350);
    };
    const sealGone = phase >= 1;
    const flapOpen = phase >= 1;
    const cardRisen = phase >= 2;
    const ctaShown = phase >= 3;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "envelope",
        className: "py-20 flex flex-col items-center gap-10 px-6 min-h-[80dvh] justify-center",
        style: {
            background: '#F5EEE6'
        },
        "aria-label": "Interactive envelope",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].p, {
                animate: {
                    opacity: phase === 0 ? 1 : 0
                },
                transition: {
                    duration: 0.4
                },
                className: "font-inter text-[10px] tracking-[0.25em] uppercase pointer-events-none",
                style: {
                    color: 'rgba(26,26,26,0.3)'
                },
                "aria-live": "polite",
                children: "Tap the seal to open"
            }, void 0, false, {
                fileName: "[project]/components/home/envelope-section.tsx",
                lineNumber: 176,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                style: {
                    width: MEW,
                    height: MEH + 70
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute",
                        style: {
                            width: MEW,
                            height: MEH,
                            bottom: 0,
                            left: 0,
                            background: '#EDE0CC',
                            border: '1px solid #D4C0A4',
                            overflow: 'visible'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FoldLines, {
                                w: MEW,
                                h: MEH
                            }, void 0, false, {
                                fileName: "[project]/components/home/envelope-section.tsx",
                                lineNumber: 204,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    y: 0,
                                    opacity: 0
                                },
                                animate: cardRisen ? {
                                    y: -MEH * 0.42,
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
                                    ]
                                },
                                className: "absolute",
                                style: {
                                    inset: 10,
                                    zIndex: 10
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CardFace, {
                                    names: names,
                                    small: true
                                }, void 0, false, {
                                    fileName: "[project]/components/home/envelope-section.tsx",
                                    lineNumber: 214,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/home/envelope-section.tsx",
                                lineNumber: 207,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/home/envelope-section.tsx",
                        lineNumber: 192,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: MEW,
                            height: MEH,
                            perspective: 900,
                            perspectiveOrigin: '50% 0%',
                            zIndex: 20,
                            pointerEvents: 'none'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                rotateX: 0
                            },
                            animate: flapOpen ? {
                                rotateX: -185
                            } : {
                                rotateX: 0
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
                            style: {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: MEW,
                                height: MEH / 2,
                                transformOrigin: '50% 100%',
                                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                                background: 'linear-gradient(180deg, #E8DCC8 0%, #EDE0CC 100%)',
                                borderTop: '1px solid #D4C0A4'
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/home/envelope-section.tsx",
                            lineNumber: 232,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/home/envelope-section.tsx",
                        lineNumber: 219,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            scale: 1,
                            opacity: 1
                        },
                        animate: sealGone ? {
                            scale: 0.4,
                            opacity: 0
                        } : {},
                        transition: {
                            duration: 0.35
                        },
                        style: {
                            position: 'absolute',
                            left: MEW / 2,
                            bottom: MEH / 2,
                            transform: 'translate(-50%, 50%)',
                            zIndex: 30
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(WaxSeal, {
                            size: 52,
                            onClick: open,
                            label: "Tap to open invitation"
                        }, void 0, false, {
                            fileName: "[project]/components/home/envelope-section.tsx",
                            lineNumber: 263,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/home/envelope-section.tsx",
                        lineNumber: 251,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/home/envelope-section.tsx",
                lineNumber: 187,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0
                },
                animate: ctaShown ? {
                    opacity: 1
                } : {
                    opacity: 0
                },
                transition: {
                    duration: 0.7
                },
                "aria-hidden": !ctaShown,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NamesInput, {
                    names: rawNames,
                    setNames: setNames
                }, void 0, false, {
                    fileName: "[project]/components/home/envelope-section.tsx",
                    lineNumber: 274,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/home/envelope-section.tsx",
                lineNumber: 268,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/home/envelope-section.tsx",
        lineNumber: 169,
        columnNumber: 5
    }, this);
}
// ─── desktop sticky-scroll envelope ────────────────────────────────────────────
function DesktopEnvelope({ names, rawNames, setNames }) {
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { scrollYProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScroll"])({
        target: sectionRef,
        offset: [
            'start start',
            'end end'
        ]
    });
    // Phase 1: envelope enters
    const envOpacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0,
        0.14
    ], [
        0,
        1
    ]);
    const envY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0,
        0.18
    ], [
        70,
        0
    ]);
    // Phase 2: seal breaks
    const sealScale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0.22,
        0.33,
        0.44
    ], [
        1,
        1.18,
        0.2
    ]);
    const sealOpacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0.22,
        0.44
    ], [
        1,
        0
    ]);
    // Phase 3: flap opens
    const flapRotate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0.38,
        0.64
    ], [
        0,
        -185
    ]);
    // Phase 4: card rises
    const cardY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0.60,
        0.84
    ], [
        0,
        -(EH * 0.72)
    ]);
    const cardOpacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0.60,
        0.70
    ], [
        0,
        1
    ]);
    // Phase 5: CTA
    const ctaOpacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0.84,
        0.97
    ], [
        0,
        1
    ]);
    const scrollHint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0,
        0.04
    ], [
        1,
        0
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: sectionRef,
        id: "envelope",
        className: "relative h-[200vh]",
        style: {
            background: '#F5EEE6'
        },
        "aria-label": "Interactive envelope",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "sticky top-0 h-[100dvh] flex items-center justify-center overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    style: {
                        opacity: scrollHint
                    },
                    className: "absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-inter text-[10px] tracking-[0.25em] uppercase",
                        style: {
                            color: 'rgba(26,26,26,0.25)'
                        },
                        children: "Scroll to open"
                    }, void 0, false, {
                        fileName: "[project]/components/home/envelope-section.tsx",
                        lineNumber: 332,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/home/envelope-section.tsx",
                    lineNumber: 328,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    style: {
                        opacity: envOpacity,
                        y: envY
                    },
                    className: "relative",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: EW,
                            height: EH,
                            position: 'relative',
                            overflow: 'visible'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute",
                                style: {
                                    inset: 0,
                                    background: '#EDE0CC',
                                    border: '1px solid #D4C0A4',
                                    overflow: 'visible'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FoldLines, {
                                    w: EW,
                                    h: EH
                                }, void 0, false, {
                                    fileName: "[project]/components/home/envelope-section.tsx",
                                    lineNumber: 353,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/home/envelope-section.tsx",
                                lineNumber: 349,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                style: {
                                    position: 'absolute',
                                    left: 24,
                                    right: 24,
                                    top: 18,
                                    bottom: 18,
                                    y: cardY,
                                    opacity: cardOpacity,
                                    zIndex: 10
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CardFace, {
                                    names: names
                                }, void 0, false, {
                                    fileName: "[project]/components/home/envelope-section.tsx",
                                    lineNumber: 369,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/home/envelope-section.tsx",
                                lineNumber: 357,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: 'absolute',
                                    inset: 0,
                                    perspective: 1400,
                                    perspectiveOrigin: '50% 0%',
                                    zIndex: 20,
                                    pointerEvents: 'none',
                                    overflow: 'visible'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    style: {
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: EW,
                                        height: EH / 2,
                                        clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                                        background: 'linear-gradient(180deg, #E2D4BC 0%, #EDE0CC 100%)',
                                        border: '1px solid #D4C0A4',
                                        transformOrigin: '50% 100%',
                                        rotateX: flapRotate,
                                        transformStyle: 'preserve-3d'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/home/envelope-section.tsx",
                                    lineNumber: 384,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/home/envelope-section.tsx",
                                lineNumber: 373,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                style: {
                                    position: 'absolute',
                                    left: EW / 2,
                                    top: EH / 2,
                                    x: '-50%',
                                    y: '-50%',
                                    zIndex: 30,
                                    scale: sealScale,
                                    opacity: sealOpacity
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(WaxSeal, {
                                    size: 62,
                                    label: "Wax seal"
                                }, void 0, false, {
                                    fileName: "[project]/components/home/envelope-section.tsx",
                                    lineNumber: 414,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/home/envelope-section.tsx",
                                lineNumber: 402,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/home/envelope-section.tsx",
                        lineNumber: 346,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/home/envelope-section.tsx",
                    lineNumber: 341,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    style: {
                        opacity: ctaOpacity
                    },
                    className: "absolute bottom-14 left-1/2 -translate-x-1/2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NamesInput, {
                        names: rawNames,
                        setNames: setNames
                    }, void 0, false, {
                        fileName: "[project]/components/home/envelope-section.tsx",
                        lineNumber: 424,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/home/envelope-section.tsx",
                    lineNumber: 420,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/home/envelope-section.tsx",
            lineNumber: 325,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/home/envelope-section.tsx",
        lineNumber: 318,
        columnNumber: 5
    }, this);
}
// ─── reduced-motion fallback ───────────────────────────────────────────────────
function StaticEnvelope({ names, rawNames, setNames }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "envelope",
        className: "py-32 flex flex-col items-center gap-14 px-6",
        style: {
            background: '#F5EEE6'
        },
        "aria-label": "Invitation preview",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                style: {
                    width: 320,
                    height: 212,
                    background: '#EDE0CC',
                    border: '1px solid #D4C0A4'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FoldLines, {
                        w: 320,
                        h: 212
                    }, void 0, false, {
                        fileName: "[project]/components/home/envelope-section.tsx",
                        lineNumber: 452,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0",
                        style: {
                            background: '#FAF6F0',
                            margin: 16
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CardFace, {
                            names: names
                        }, void 0, false, {
                            fileName: "[project]/components/home/envelope-section.tsx",
                            lineNumber: 454,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/home/envelope-section.tsx",
                        lineNumber: 453,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/home/envelope-section.tsx",
                lineNumber: 448,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NamesInput, {
                names: rawNames,
                setNames: setNames
            }, void 0, false, {
                fileName: "[project]/components/home/envelope-section.tsx",
                lineNumber: 457,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/home/envelope-section.tsx",
        lineNumber: 442,
        columnNumber: 5
    }, this);
}
function EnvelopeSection() {
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [rawNames, setRawNames] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const check = ()=>setIsMobile(window.matchMedia('(max-width: 767px)').matches);
        check();
        const mq = window.matchMedia('(max-width: 767px)');
        mq.addEventListener('change', check);
        return ()=>mq.removeEventListener('change', check);
    }, []);
    const displayNames = rawNames.trim() || 'Emma & James';
    if (reduced) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StaticEnvelope, {
            names: displayNames,
            rawNames: rawNames,
            setNames: setRawNames
        }, void 0, false, {
            fileName: "[project]/components/home/envelope-section.tsx",
            lineNumber: 479,
            columnNumber: 12
        }, this);
    }
    if (isMobile) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileEnvelope, {
            names: displayNames,
            rawNames: rawNames,
            setNames: setRawNames
        }, void 0, false, {
            fileName: "[project]/components/home/envelope-section.tsx",
            lineNumber: 483,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DesktopEnvelope, {
        names: displayNames,
        rawNames: rawNames,
        setNames: setRawNames
    }, void 0, false, {
        fileName: "[project]/components/home/envelope-section.tsx",
        lineNumber: 486,
        columnNumber: 10
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
// A photorealistic gold wax seal: metallic radial face, raised rounded rim,
// embossed calligraphic monogram, fine wax grain (feTurbulence), a specular
// highlight and a slow sheen sweep. Any monogram, fully vector → crisp at any size.
const GOLD = {
    hi: '#FCF3D4',
    light: '#E6C871',
    mid: '#C79E3E',
    deep: '#9A7322',
    shadow: '#5E440F'
};
// lumpy, hand-authored wax-drip outline (viewBox 0 0 220 220)
const BLOB = 'M110 12 C141 13 158 24 171 43 C183 60 208 65 205 96 C203 123 212 140 197 162 ' + 'C183 183 181 207 150 208 C123 209 117 216 102 211 C79 204 57 209 45 188 ' + 'C32 167 13 157 18 127 C22 102 9 86 24 62 C37 40 39 16 71 15 C91 14 92 9 110 12 Z';
function RealisticSeal({ mono, size = 200, font = 'var(--font-pinyon)', rose = true }) {
    const uid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])().replace(/:/g, '');
    const face = `face-${uid}`, rim = `rim-${uid}`, spec = `spec-${uid}`, grain = `grain-${uid}`, warp = `warp-${uid}`, sheen = `sheen-${uid}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        style: {
            width: size,
            height: size,
            filter: `drop-shadow(0 ${size * 0.05}px ${size * 0.07}px rgba(40,28,6,0.55))`
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
                                cy: "34%",
                                r: "72%",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "0%",
                                        stopColor: GOLD.hi
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 42,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "26%",
                                        stopColor: GOLD.light
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 43,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "60%",
                                        stopColor: GOLD.mid
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 44,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "100%",
                                        stopColor: GOLD.deep
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 45,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                lineNumber: 41,
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
                                        stopColor: GOLD.hi
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 48,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "42%",
                                        stopColor: GOLD.light
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 49,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "70%",
                                        stopColor: GOLD.mid
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 50,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "100%",
                                        stopColor: GOLD.shadow
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 51,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                lineNumber: 47,
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
                                        stopColor: "rgba(255,255,255,0.85)"
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 54,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                        offset: "100%",
                                        stopColor: "rgba(255,255,255,0)"
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 55,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                lineNumber: 53,
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
                                        baseFrequency: "0.016 0.02",
                                        numOctaves: "2",
                                        seed: "7",
                                        result: "n"
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 59,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feDisplacementMap", {
                                        in: "SourceGraphic",
                                        in2: "n",
                                        scale: "9",
                                        xChannelSelector: "R",
                                        yChannelSelector: "G"
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 60,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                lineNumber: 58,
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
                                        seed: "11",
                                        result: "n"
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 64,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feColorMatrix", {
                                        in: "n",
                                        type: "matrix",
                                        values: "0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.7 0",
                                        result: "a"
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 65,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feComposite", {
                                        in: "a",
                                        in2: "SourceAlpha",
                                        operator: "in"
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 66,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 40,
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
                                lineNumber: 72,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: BLOB,
                                fill: "none",
                                stroke: GOLD.shadow,
                                strokeOpacity: "0.5",
                                strokeWidth: "2"
                            }, void 0, false, {
                                fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "110",
                        cy: "110",
                        r: "88",
                        fill: "none",
                        stroke: `url(#${rim})`,
                        strokeWidth: "13"
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "110",
                        cy: "110",
                        r: "95",
                        fill: "none",
                        stroke: GOLD.shadow,
                        strokeOpacity: "0.35",
                        strokeWidth: "1.4"
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "110",
                        cy: "110",
                        r: "81.5",
                        fill: "none",
                        stroke: GOLD.hi,
                        strokeOpacity: "0.6",
                        strokeWidth: "1"
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "110",
                        cy: "110",
                        r: "80",
                        fill: GOLD.mid,
                        fillOpacity: "0.0"
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "110",
                        cy: "110",
                        r: "80",
                        fill: "none",
                        stroke: "rgba(60,42,10,0.22)",
                        strokeWidth: "6",
                        strokeDasharray: "0",
                        style: {
                            filter: 'blur(3px)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "110",
                        cy: "110",
                        r: "72",
                        fill: "none",
                        stroke: GOLD.shadow,
                        strokeOpacity: "0.4",
                        strokeWidth: "1"
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "110",
                        cy: "110",
                        r: "69.5",
                        fill: "none",
                        stroke: GOLD.hi,
                        strokeOpacity: "0.45",
                        strokeWidth: "0.8"
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this),
                    rose && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        transform: "translate(110 70) scale(0.62)",
                        strokeLinecap: "round",
                        fill: "none",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                stroke: GOLD.shadow,
                                strokeOpacity: "0.55",
                                strokeWidth: "1.7",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M0 8 C-7 3 -7 -6 0 -9 C7 -6 8 3 2 7 C-2 9 -5 6 -4 2 C-3 -2 3 -2 2 3"
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 93,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M0 8 C-1 -2 1 -6 0 -9"
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 94,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M-2 22 C-12 20 -16 24 -16 30 M2 22 C12 20 16 24 16 30 M0 9 L0 30"
                                    }, void 0, false, {
                                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                        lineNumber: 95,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                lineNumber: 92,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M-1 -2 C-3 -5 -1 -7 1 -6",
                                stroke: GOLD.hi,
                                strokeOpacity: "0.6",
                                strokeWidth: "1.1"
                            }, void 0, false, {
                                fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                                lineNumber: 97,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 91,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MonogramEmboss, {
                        mono: mono,
                        font: font
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        filter: `url(#${grain})`,
                        opacity: "0.5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: BLOB,
                            fill: "#fff"
                        }, void 0, false, {
                            fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                            lineNumber: 105,
                            columnNumber: 52
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                        cx: "78",
                        cy: "66",
                        rx: "56",
                        ry: "34",
                        fill: `url(#${spec})`,
                        opacity: "0.55"
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-0 overflow-hidden",
                style: {
                    borderRadius: '50%',
                    maskImage: 'radial-gradient(circle at 50% 50%, #000 60%, transparent 72%)',
                    WebkitMaskImage: 'radial-gradient(circle at 50% 50%, #000 60%, transparent 72%)'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute",
                    style: {
                        inset: '-40%',
                        background: 'linear-gradient(115deg, transparent 42%, rgba(255,255,255,0.55) 50%, transparent 58%)',
                        animation: `${sheen} 5.5s ease-in-out infinite`
                    }
                }, void 0, false, {
                    fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                    lineNumber: 111,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `@keyframes ${sheen}{0%,100%{transform:translateX(-38%)}50%{transform:translateX(38%)}}`
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
function MonogramEmboss({ mono, font }) {
    const isPair = mono.length === 2;
    const label = isPair ? `${mono[0]} & ${mono[1]}` : mono[0] ?? '✦';
    const fs = isPair ? 70 : 104;
    // constrain width so the monogram always sits inside the rim
    const tl = isPair ? 116 : undefined;
    const common = {
        x: 110,
        y: 126,
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
                fill: GOLD.shadow,
                transform: "translate(1.7 2.1)",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                ...common,
                fill: "#3E2C08",
                opacity: "0.5",
                transform: "translate(0.8 1)",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                ...common,
                fill: GOLD.hi,
                transform: "translate(-1.2 -1.5)",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                lineNumber: 133,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                ...common,
                fill: "#A8801F",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/realistic-seal.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/invite/openers/realistic-seal.tsx",
        lineNumber: 130,
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$realistic$2d$seal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/invite/openers/realistic-seal.tsx [app-ssr] (ecmascript)");
'use client';
;
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
                lineNumber: 12,
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
                lineNumber: 13,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 11,
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
        lineNumber: 21,
        columnNumber: 7
    }, this) : dir === 'apart' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "M6 4L3 7.5L6 11M9 4l3 3.5L9 11",
        stroke: "#fff",
        strokeWidth: "1.3",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }, void 0, false, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 23,
        columnNumber: 7
    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        d: "M7.5 3v8M4 7.5l3.5 3.5L11 7.5",
        stroke: "#fff",
        strokeWidth: "1.3",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }, void 0, false, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 24,
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
                    lineNumber: 32,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 29,
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
                lineNumber: 34,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 27,
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
                lineNumber: 60,
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
                        lineNumber: 69,
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
                                background: `linear-gradient(176deg, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shade"])(ivory, 0.07)} 0%, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shade"])(ivory, 0.02)} 58%, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shade"])(ivory, -0.06)} 100%)`,
                                filter: `drop-shadow(0 3px 5px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])('#000', 0.16)})`
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
                                        lineNumber: 86,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/invite/openers/interactive.tsx",
                                    lineNumber: 85,
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
                                    lineNumber: 88,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/invite/openers/interactive.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/interactive.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Greeting, {
                theme: theme,
                names: names,
                fade: opening ? 0 : 1
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            !opening && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SealButton, {
                onOpen: finish,
                mono: mono,
                font: theme.font,
                reduced: !!reduced
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 97,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Hint, {
                dir: "down",
                label: reduced ? 'Tap the seal to open' : 'Press the seal to open',
                show: !opening
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 59,
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
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$realistic$2d$seal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RealisticSeal"], {
            mono: mono,
            size: 186,
            font: font
        }, void 0, false, {
            fileName: "[project]/components/invite/openers/interactive.tsx",
            lineNumber: 121,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 109,
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
                                lineNumber: 132,
                                columnNumber: 33
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feColorMatrix", {
                                type: "matrix",
                                values: "0 0 0 0 0.42  0 0 0 0 0.35  0 0 0 0 0.24  0 0 0 0.05 0"
                            }, void 0, false, {
                                fileName: "[project]/components/invite/openers/interactive.tsx",
                                lineNumber: 132,
                                columnNumber: 114
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/invite/openers/interactive.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        width: "100%",
                        height: "100%",
                        filter: "url(#paperGrain)"
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/interactive.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 131,
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
                                                lineNumber: 142,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M90 20 C108 36 110 70 96 100 M96 64 C82 60 72 70 72 86 M96 88 C112 86 120 100 120 112"
                                            }, void 0, false, {
                                                fileName: "[project]/components/invite/openers/interactive.tsx",
                                                lineNumber: 143,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/invite/openers/interactive.tsx",
                                        lineNumber: 141,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                        stroke: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])('#fff', 0.5),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M20 130 C40 110 40 70 22 40 M22 40 C8 56 6 80 20 96 M22 64 C36 60 46 70 46 86 M22 88 C8 86 0 98 0 112"
                                            }, void 0, false, {
                                                fileName: "[project]/components/invite/openers/interactive.tsx",
                                                lineNumber: 146,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M90 20 C108 36 110 70 96 100 M96 64 C82 60 72 70 72 86 M96 88 C112 86 120 100 120 112"
                                            }, void 0, false, {
                                                fileName: "[project]/components/invite/openers/interactive.tsx",
                                                lineNumber: 147,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/invite/openers/interactive.tsx",
                                        lineNumber: 145,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/invite/openers/interactive.tsx",
                                lineNumber: 139,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/invite/openers/interactive.tsx",
                            lineNumber: 138,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/interactive.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        width: "400",
                        height: "400",
                        fill: "url(#bot)",
                        opacity: "0.6"
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/interactive.tsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 136,
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
                        lineNumber: 157,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M0 0 L50 56 L0 100",
                        fill: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])('#000', 0.018)
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/interactive.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M100 0 L50 56 L100 100",
                        fill: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexA"])('#000', 0.018)
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/interactive.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 156,
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
                                lineNumber: 166,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M30 -34 C40 -30 44 -20 40 -10"
                            }, void 0, false, {
                                fileName: "[project]/components/invite/openers/interactive.tsx",
                                lineNumber: 167,
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
                                lineNumber: 168,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/invite/openers/interactive.tsx",
                        lineNumber: 165,
                        columnNumber: 11
                    }, this)
                }, k, false, {
                    fileName: "[project]/components/invite/openers/interactive.tsx",
                    lineNumber: 164,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0",
                style: {
                    background: 'radial-gradient(120% 100% at 50% 42%, transparent 55%, rgba(40,28,10,0.16) 100%)'
                }
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 174,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 129,
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
        if (opening) return;
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
                lineNumber: 205,
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
                lineNumber: 206,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Greeting, {
                theme: theme,
                names: names,
                fade: reduced ? 1 : greetFade
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 207,
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
                                    lineNumber: 213,
                                    columnNumber: 15
                                }, this)
                            }, s, false, {
                                fileName: "[project]/components/invite/openers/interactive.tsx",
                                lineNumber: 212,
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
                                cursor: 'pointer'
                            },
                            whileHover: reduced ? {} : {
                                scale: 1.04
                            },
                            whileTap: {
                                scale: 0.97
                            },
                            onClick: finish,
                            onDragEnd: (_e, info)=>{
                                if (info.offset.x > 90) finish();
                                else (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(x, 0, {
                                    type: 'spring',
                                    stiffness: 280,
                                    damping: 26
                                });
                            },
                            "aria-label": "Open the gates",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$realistic$2d$seal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RealisticSeal"], {
                                mono: mono,
                                size: 108,
                                font: theme.font,
                                rose: false
                            }, void 0, false, {
                                fileName: "[project]/components/invite/openers/interactive.tsx",
                                lineNumber: 226,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/invite/openers/interactive.tsx",
                            lineNumber: 218,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/invite/openers/interactive.tsx",
                    lineNumber: 210,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 209,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Hint, {
                dir: "apart",
                label: reduced ? 'Tap to open the gates' : 'Pull the gates apart',
                show: !opening
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 232,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 204,
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
                            lineNumber: 244,
                            columnNumber: 66
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "45%",
                            stopColor: accent
                        }, void 0, false, {
                            fileName: "[project]/components/invite/openers/interactive.tsx",
                            lineNumber: 244,
                            columnNumber: 119
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "100%",
                            stopColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shade"])(accent, 0.35)
                        }, void 0, false, {
                            fileName: "[project]/components/invite/openers/interactive.tsx",
                            lineNumber: 244,
                            columnNumber: 159
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/invite/openers/interactive.tsx",
                    lineNumber: 244,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 244,
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
                lineNumber: 245,
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
                lineNumber: 246,
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
                            lineNumber: 249,
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
                            lineNumber: 250,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: `M${bx - 7} 40 L${bx} 18 L${bx + 7} 40 Z`,
                            fill: iron,
                            stroke: `url(#${gid})`,
                            strokeWidth: "1"
                        }, void 0, false, {
                            fileName: "[project]/components/invite/openers/interactive.tsx",
                            lineNumber: 251,
                            columnNumber: 11
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/components/invite/openers/interactive.tsx",
                    lineNumber: 248,
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
                            lineNumber: 254,
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
                            lineNumber: 254,
                            columnNumber: 120
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/components/invite/openers/interactive.tsx",
                    lineNumber: 254,
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
                            lineNumber: 255,
                            columnNumber: 181
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: `M${bx} 202 C${bx} 220 ${mx} 220 ${mx} 192 C${mx} 220 ${nx} 220 ${nx} 202`
                        }, void 0, false, {
                            fileName: "[project]/components/invite/openers/interactive.tsx",
                            lineNumber: 255,
                            columnNumber: 268
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/components/invite/openers/interactive.tsx",
                    lineNumber: 255,
                    columnNumber: 101
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 243,
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
                lineNumber: 281,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Greeting, {
                theme: theme,
                names: names,
                fade: reduced ? 1 : greetFade
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 282,
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
                            lineNumber: 298,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/invite/openers/interactive.tsx",
                        lineNumber: 297,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/invite/openers/interactive.tsx",
                    lineNumber: 293,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 286,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Hint, {
                dir: "up",
                label: reduced ? 'Tap to lift the veil' : 'Lift the veil',
                show: !opening
            }, void 0, false, {
                fileName: "[project]/components/invite/openers/interactive.tsx",
                lineNumber: 304,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 280,
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
                lineNumber: 313,
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
                lineNumber: 314,
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
                lineNumber: 315,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/invite/openers/interactive.tsx",
        lineNumber: 312,
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
"[project]/components/home/opener-showcase.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "OpenerShowcase": (()=>OpenerShowcase)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/invite/openers/index.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/builder/presets.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
const OPENER_FILM = {
    'wax-letter': 'the-letter',
    'iron-gates': 'the-gates',
    'lifting-veil': 'the-veil'
};
// Homepage showcase: visitors type their names and try each opening for real.
function Motif({ motif, accent }) {
    if (motif === 'gates') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "64",
        height: "64",
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
                            strokeWidth: "1.4"
                        }, void 0, false, {
                            fileName: "[project]/components/home/opener-showcase.tsx",
                            lineNumber: 16,
                            columnNumber: 47
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: `M${x - 3} 12 L${x} 7 L${x + 3} 12 Z`,
                            fill: accent
                        }, void 0, false, {
                            fileName: "[project]/components/home/opener-showcase.tsx",
                            lineNumber: 16,
                            columnNumber: 119
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/components/home/opener-showcase.tsx",
                    lineNumber: 16,
                    columnNumber: 36
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "7",
                y1: "20",
                x2: "33",
                y2: "20",
                stroke: accent,
                strokeWidth: "1.2"
            }, void 0, false, {
                fileName: "[project]/components/home/opener-showcase.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "20",
                cy: "20",
                r: "4.5",
                fill: "none",
                stroke: accent,
                strokeWidth: "1.2"
            }, void 0, false, {
                fileName: "[project]/components/home/opener-showcase.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/home/opener-showcase.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
    if (motif === 'veil') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "64",
        height: "64",
        viewBox: "0 0 40 40",
        fill: "none",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8 9 Q20 4 32 9 L32 26 Q26 33 20 26 Q14 33 8 26 Z",
                fill: "none",
                stroke: accent,
                strokeWidth: "1.3",
                opacity: "0.85"
            }, void 0, false, {
                fileName: "[project]/components/home/opener-showcase.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8 26 q3 5 6 0 q3 5 6 0 q3 5 6 0 q3 5 6 0",
                fill: "none",
                stroke: accent,
                strokeWidth: "1",
                opacity: "0.6"
            }, void 0, false, {
                fileName: "[project]/components/home/opener-showcase.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/home/opener-showcase.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "64",
        height: "64",
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
                strokeWidth: "1.3"
            }, void 0, false, {
                fileName: "[project]/components/home/opener-showcase.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M7 12 L20 22 L33 12",
                fill: "none",
                stroke: accent,
                strokeWidth: "1.1"
            }, void 0, false, {
                fileName: "[project]/components/home/opener-showcase.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "20",
                cy: "22",
                r: "4",
                fill: accent
            }, void 0, false, {
                fileName: "[project]/components/home/opener-showcase.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/home/opener-showcase.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
function OpenerShowcase() {
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const [names, setNames] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [preview, setPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const display = names.trim() || 'Aria & Luca';
    const theme = {
        accent: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_PALETTE"].accent,
        paper: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_PALETTE"].paper,
        flap: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_PALETTE"].washAlt,
        ink: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_PALETTE"].ink,
        font: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_HEADING_FONT"].var,
        fontStyle: 'normal',
        dark: false
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "openers",
        className: "py-28 px-6 flex flex-col items-center",
        style: {
            background: '#F5EEE6'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-inter uppercase",
                style: {
                    fontSize: 10,
                    letterSpacing: '0.28em',
                    color: 'rgba(26,24,22,0.4)'
                },
                children: "The opening"
            }, void 0, false, {
                fileName: "[project]/components/home/opener-showcase.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "font-cormorant font-light text-center mt-4",
                style: {
                    fontSize: 'clamp(2rem, 6vw, 3rem)',
                    color: '#1A1816',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.1
                },
                children: "Every celebration deserves an entrance"
            }, void 0, false, {
                fileName: "[project]/components/home/opener-showcase.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-inter text-center mt-4 max-w-[44ch]",
                style: {
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: 'rgba(26,24,22,0.55)'
                },
                children: "Break a wax seal, swing open iron gates, or lift a veil — choose the moment your guests meet your day."
            }, void 0, false, {
                fileName: "[project]/components/home/opener-showcase.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                value: names,
                onChange: (e)=>setNames(e.target.value),
                maxLength: 60,
                placeholder: "Type your names",
                className: "mt-9 w-64 pb-2 text-center font-cormorant text-2xl font-light bg-transparent border-0 border-b outline-none transition-colors",
                style: {
                    color: '#1A1816',
                    borderBottomColor: 'rgba(26,24,22,0.2)',
                    caretColor: '#A8854B'
                },
                "aria-label": "Type your names to personalize the preview"
            }, void 0, false, {
                fileName: "[project]/components/home/opener-showcase.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-12 grid gap-5 w-full max-w-4xl",
                style: {
                    gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))'
                },
                children: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$invite$2f$openers$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OPENERS"].map((o, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                        type: "button",
                        onClick: ()=>setPreview(o.id),
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
                            margin: '-40px'
                        },
                        transition: {
                            duration: 0.5,
                            delay: i * 0.08,
                            ease: [
                                0.22,
                                1,
                                0.36,
                                1
                            ]
                        },
                        whileHover: reduced ? {} : {
                            y: -6
                        },
                        className: "group flex flex-col items-center rounded-2xl px-7 py-9 text-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A8854B]/40",
                        style: {
                            background: '#FBF7F1',
                            border: '1px solid rgba(26,24,22,0.07)',
                            boxShadow: '0 10px 30px rgba(43,30,12,0.07)',
                            transition: 'box-shadow 0.3s'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center justify-center rounded-full",
                                style: {
                                    width: 92,
                                    height: 92,
                                    background: 'rgba(168,133,75,0.07)',
                                    border: '1px solid rgba(168,133,75,0.18)'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Motif, {
                                    motif: o.motif,
                                    accent: "#A8854B"
                                }, void 0, false, {
                                    fileName: "[project]/components/home/opener-showcase.tsx",
                                    lineNumber: 84,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/home/opener-showcase.tsx",
                                lineNumber: 83,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-cormorant font-light mt-5",
                                style: {
                                    fontSize: 22,
                                    color: '#1A1816'
                                },
                                children: o.name
                            }, void 0, false, {
                                fileName: "[project]/components/home/opener-showcase.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-inter mt-2",
                                style: {
                                    fontSize: 12,
                                    lineHeight: 1.5,
                                    color: 'rgba(26,24,22,0.5)'
                                },
                                children: o.blurb
                            }, void 0, false, {
                                fileName: "[project]/components/home/opener-showcase.tsx",
                                lineNumber: 87,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-inter uppercase mt-5 inline-flex items-center gap-1.5",
                                style: {
                                    fontSize: 9,
                                    letterSpacing: '0.18em',
                                    color: '#A8854B'
                                },
                                children: [
                                    "Try it",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "9",
                                        height: "9",
                                        viewBox: "0 0 9 9",
                                        fill: "none",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M2 1.5L6.5 4.5L2 7.5V1.5Z",
                                            fill: "#A8854B"
                                        }, void 0, false, {
                                            fileName: "[project]/components/home/opener-showcase.tsx",
                                            lineNumber: 90,
                                            columnNumber: 71
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/home/opener-showcase.tsx",
                                        lineNumber: 90,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/home/opener-showcase.tsx",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this)
                        ]
                    }, o.id, true, {
                        fileName: "[project]/components/home/opener-showcase.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/home/opener-showcase.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                href: "/builder",
                className: "mt-14 font-inter uppercase rounded-full px-10 py-4 transition-all",
                style: {
                    fontSize: 11,
                    letterSpacing: '0.22em',
                    background: '#1A1816',
                    color: '#FDFCF9'
                },
                children: "Create yours"
            }, void 0, false, {
                fileName: "[project]/components/home/opener-showcase.tsx",
                lineNumber: 96,
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
                            theme: theme,
                            names: display,
                            videoSrc: (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VIDEO_PRESETS"].find((p)=>p.id === OPENER_FILM[preview]) ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VIDEO_PRESETS"][0]).src,
                            poster: (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VIDEO_PRESETS"].find((p)=>p.id === OPENER_FILM[preview]) ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$presets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VIDEO_PRESETS"][0]).posterImg,
                            onOpen: ()=>setPreview(null)
                        }, void 0, false, {
                            fileName: "[project]/components/home/opener-showcase.tsx",
                            lineNumber: 105,
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
                                    fileName: "[project]/components/home/opener-showcase.tsx",
                                    lineNumber: 111,
                                    columnNumber: 75
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/home/opener-showcase.tsx",
                                lineNumber: 111,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/home/opener-showcase.tsx",
                            lineNumber: 109,
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
                            fileName: "[project]/components/home/opener-showcase.tsx",
                            lineNumber: 113,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/home/opener-showcase.tsx",
                    lineNumber: 104,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/home/opener-showcase.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/home/opener-showcase.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
}}),
"[project]/components/home/gallery-section.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GallerySection": (()=>GallerySection)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
function pexelsPhoto(id, w = 600) {
    return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
}
const THEMES = [
    {
        id: 'noir-royal',
        label: 'Noir Royal',
        bg: '#0D0D14',
        fg: '#F5F0E8',
        accent: '#C9A96E',
        name1: 'Sofia',
        name2: 'Alessandro',
        date: '14 June 2026',
        loc: 'Villa Tuscany',
        href: '/demo/noir-royal',
        photo: pexelsPhoto(30153930)
    },
    {
        id: 'ivory-botanica',
        label: 'Ivory Botanica',
        bg: '#F5F0E4',
        fg: '#2C3828',
        accent: '#7A9B6C',
        name1: 'Emma',
        name2: 'James',
        date: '22 May 2026',
        loc: 'The Cotswolds',
        href: '/demo/ivory-botanica',
        photo: pexelsPhoto(6291011)
    },
    {
        id: 'blush-garden',
        label: 'Blush Garden',
        bg: '#A85850',
        fg: '#FAF0EC',
        accent: '#F4C8B4',
        name1: 'Isabella',
        name2: 'Marco',
        date: '5 Sept 2026',
        loc: 'Amalfi Coast',
        href: '/demo/blush-garden',
        photo: pexelsPhoto(14474291)
    },
    {
        id: 'sage-coast',
        label: 'Sage Coast',
        bg: '#4E6B58',
        fg: '#EEF3EC',
        accent: '#B4D0AC',
        name1: 'Aria',
        name2: 'Luca',
        date: '28 June 2026',
        loc: 'Santorini',
        href: '/demo/sage-coast',
        photo: pexelsPhoto(7777910)
    },
    {
        id: 'champagne',
        label: 'Champagne',
        bg: '#F4EBD3',
        fg: '#5A4830',
        accent: '#9A7C50',
        name1: 'Amelia',
        name2: 'Oliver',
        date: '3 July 2026',
        loc: 'Bordeaux',
        href: '/demo/champagne',
        photo: pexelsPhoto(9517406)
    }
];
function Corner({ color, deg }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 14 14",
        width: "13",
        height: "13",
        style: {
            transform: `rotate(${deg}deg)`
        },
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M0,0 L10,0 L10,1.8 L1.8,1.8 L1.8,10 L0,10 Z",
            fill: color,
            opacity: "0.5"
        }, void 0, false, {
            fileName: "[project]/components/home/gallery-section.tsx",
            lineNumber: 83,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/home/gallery-section.tsx",
        lineNumber: 82,
        columnNumber: 5
    }, this);
}
function Divider({ color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 56 10",
        width: "52",
        height: "9",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "0",
                y1: "4.5",
                x2: "19",
                y2: "4.5",
                stroke: color,
                strokeWidth: "0.5",
                opacity: "0.5"
            }, void 0, false, {
                fileName: "[project]/components/home/gallery-section.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "23",
                y: "1.5",
                width: "6",
                height: "6",
                transform: "rotate(45 26 4.5)",
                fill: color,
                opacity: "0.5"
            }, void 0, false, {
                fileName: "[project]/components/home/gallery-section.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "33",
                y1: "4.5",
                x2: "56",
                y2: "4.5",
                stroke: color,
                strokeWidth: "0.5",
                opacity: "0.5"
            }, void 0, false, {
                fileName: "[project]/components/home/gallery-section.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/home/gallery-section.tsx",
        lineNumber: 90,
        columnNumber: 5
    }, this);
}
function ThemeCard({ theme, index }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].a, {
        href: theme.href,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "relative flex-none snap-center group focus:outline-none",
        style: {
            width: 'clamp(148px, 52vw, 216px)'
        },
        initial: {
            opacity: 0,
            y: 28
        },
        whileInView: {
            opacity: 1,
            y: 0
        },
        viewport: {
            once: true,
            margin: '-40px'
        },
        transition: {
            duration: 0.8,
            ease: [
                0.22,
                1,
                0.36,
                1
            ],
            delay: index * 0.08
        },
        "aria-label": `Preview ${theme.label} theme`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative overflow-hidden",
                style: {
                    aspectRatio: '9 / 16',
                    borderRadius: 6,
                    boxShadow: '0 12px 48px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.08)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: `url(${theme.photo})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            zIndex: 0
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/home/gallery-section.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            inset: 0,
                            background: theme.bg,
                            opacity: 0.65,
                            zIndex: 1
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/home/gallery-section.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0",
                        style: {
                            zIndex: 2
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: 'absolute',
                                    top: 12,
                                    left: 12
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Corner, {
                                    color: theme.accent,
                                    deg: 0
                                }, void 0, false, {
                                    fileName: "[project]/components/home/gallery-section.tsx",
                                    lineNumber: 147,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/home/gallery-section.tsx",
                                lineNumber: 146,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: 'absolute',
                                    top: 12,
                                    right: 12
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Corner, {
                                    color: theme.accent,
                                    deg: 90
                                }, void 0, false, {
                                    fileName: "[project]/components/home/gallery-section.tsx",
                                    lineNumber: 150,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/home/gallery-section.tsx",
                                lineNumber: 149,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: 'absolute',
                                    bottom: 12,
                                    left: 12
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Corner, {
                                    color: theme.accent,
                                    deg: 270
                                }, void 0, false, {
                                    fileName: "[project]/components/home/gallery-section.tsx",
                                    lineNumber: 153,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/home/gallery-section.tsx",
                                lineNumber: 152,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: 'absolute',
                                    bottom: 12,
                                    right: 12
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Corner, {
                                    color: theme.accent,
                                    deg: 180
                                }, void 0, false, {
                                    fileName: "[project]/components/home/gallery-section.tsx",
                                    lineNumber: 156,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/home/gallery-section.tsx",
                                lineNumber: 155,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 flex flex-col items-center justify-center gap-3 px-5 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: 'var(--font-inter)',
                                            fontSize: 7,
                                            letterSpacing: '0.28em',
                                            textTransform: 'uppercase',
                                            color: theme.fg,
                                            opacity: 0.38
                                        },
                                        children: "You are invited"
                                    }, void 0, false, {
                                        fileName: "[project]/components/home/gallery-section.tsx",
                                        lineNumber: 161,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Divider, {
                                        color: theme.accent
                                    }, void 0, false, {
                                        fileName: "[project]/components/home/gallery-section.tsx",
                                        lineNumber: 164,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: 1
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: 'var(--font-cormorant)',
                                                    fontSize: 'clamp(1.1rem, 3.5vw, 1.6rem)',
                                                    fontWeight: 300,
                                                    color: theme.fg,
                                                    lineHeight: 1.15
                                                },
                                                children: theme.name1
                                            }, void 0, false, {
                                                fileName: "[project]/components/home/gallery-section.tsx",
                                                lineNumber: 166,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: 'var(--font-cormorant)',
                                                    fontSize: 'clamp(0.7rem, 2vw, 1rem)',
                                                    fontStyle: 'italic',
                                                    color: theme.accent,
                                                    lineHeight: 1.4
                                                },
                                                children: "&"
                                            }, void 0, false, {
                                                fileName: "[project]/components/home/gallery-section.tsx",
                                                lineNumber: 169,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: 'var(--font-cormorant)',
                                                    fontSize: 'clamp(1.1rem, 3.5vw, 1.6rem)',
                                                    fontWeight: 300,
                                                    color: theme.fg,
                                                    lineHeight: 1.15
                                                },
                                                children: theme.name2
                                            }, void 0, false, {
                                                fileName: "[project]/components/home/gallery-section.tsx",
                                                lineNumber: 172,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/home/gallery-section.tsx",
                                        lineNumber: 165,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Divider, {
                                        color: theme.accent
                                    }, void 0, false, {
                                        fileName: "[project]/components/home/gallery-section.tsx",
                                        lineNumber: 176,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: 4
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: 'var(--font-inter)',
                                                    fontSize: 7,
                                                    letterSpacing: '0.2em',
                                                    color: theme.fg,
                                                    opacity: 0.5
                                                },
                                                children: theme.date
                                            }, void 0, false, {
                                                fileName: "[project]/components/home/gallery-section.tsx",
                                                lineNumber: 178,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: 'var(--font-inter)',
                                                    fontSize: 6.5,
                                                    letterSpacing: '0.12em',
                                                    color: theme.fg,
                                                    opacity: 0.32
                                                },
                                                children: theme.loc
                                            }, void 0, false, {
                                                fileName: "[project]/components/home/gallery-section.tsx",
                                                lineNumber: 181,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/home/gallery-section.tsx",
                                        lineNumber: 177,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/home/gallery-section.tsx",
                                lineNumber: 160,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 hidden md:flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100",
                                style: {
                                    background: 'rgba(0,0,0,0.38)'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontFamily: 'var(--font-inter)',
                                        fontSize: 9,
                                        letterSpacing: '0.24em',
                                        textTransform: 'uppercase',
                                        color: '#fff'
                                    },
                                    children: "Preview"
                                }, void 0, false, {
                                    fileName: "[project]/components/home/gallery-section.tsx",
                                    lineNumber: 192,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/home/gallery-section.tsx",
                                lineNumber: 188,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/home/gallery-section.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/home/gallery-section.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex items-center justify-between px-0.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-inter tracking-[0.18em] uppercase group-hover:opacity-50 transition-opacity duration-300",
                        style: {
                            fontSize: 9,
                            color: 'rgba(26,26,26,0.38)'
                        },
                        children: theme.label
                    }, void 0, false, {
                        fileName: "[project]/components/home/gallery-section.tsx",
                        lineNumber: 201,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontFamily: 'var(--font-inter)',
                            fontSize: 10,
                            color: 'rgba(26,26,26,0.18)'
                        },
                        children: "→"
                    }, void 0, false, {
                        fileName: "[project]/components/home/gallery-section.tsx",
                        lineNumber: 207,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/home/gallery-section.tsx",
                lineNumber: 200,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/home/gallery-section.tsx",
        lineNumber: 100,
        columnNumber: 5
    }, this);
}
function GallerySection() {
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const trackRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "themes",
        className: "overflow-hidden",
        style: {
            background: '#F3EDE5',
            paddingTop: '6rem',
            paddingBottom: '3rem'
        },
        "aria-label": "Design themes",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 md:px-14 mb-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 16
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
                        ]
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-inter tracking-[0.32em] uppercase",
                            style: {
                                fontSize: 9,
                                color: 'rgba(26,26,26,0.28)'
                            },
                            children: "Themes"
                        }, void 0, false, {
                            fileName: "[project]/components/home/gallery-section.tsx",
                            lineNumber: 228,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-cormorant font-light text-[#1A1A1A] mt-2 leading-none",
                            style: {
                                fontSize: 'clamp(2.2rem, 7vw, 4rem)',
                                letterSpacing: '-0.015em'
                            },
                            children: "Find your aesthetic."
                        }, void 0, false, {
                            fileName: "[project]/components/home/gallery-section.tsx",
                            lineNumber: 231,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/home/gallery-section.tsx",
                    lineNumber: 222,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/home/gallery-section.tsx",
                lineNumber: 221,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                ref: trackRef,
                className: "flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 px-6 md:px-14 pb-8 no-scrollbar touch-pan-x",
                drag: reduced ? false : 'x',
                dragConstraints: trackRef,
                style: {
                    WebkitOverflowScrolling: 'touch',
                    cursor: 'grab'
                },
                whileTap: {
                    cursor: 'grabbing'
                },
                children: THEMES.map((theme, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeCard, {
                        theme: theme,
                        index: i
                    }, theme.id, false, {
                        fileName: "[project]/components/home/gallery-section.tsx",
                        lineNumber: 250,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/home/gallery-section.tsx",
                lineNumber: 241,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "md:hidden font-inter tracking-[0.26em] uppercase text-center mt-1",
                style: {
                    fontSize: 8,
                    color: 'rgba(26,26,26,0.2)'
                },
                children: "Swipe to explore"
            }, void 0, false, {
                fileName: "[project]/components/home/gallery-section.tsx",
                lineNumber: 254,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/home/gallery-section.tsx",
        lineNumber: 218,
        columnNumber: 5
    }, this);
}
}}),
"[project]/components/home/final-cta-section.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "FinalCta": (()=>FinalCta)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function OrnamentLine({ color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 140 10",
        width: "120",
        height: "9",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
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
function FinalCta() {
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "relative min-h-[65dvh] flex flex-col items-center justify-center py-28 px-6 text-center overflow-hidden",
        style: {
            background: '#EDE5DA'
        },
        "aria-label": "Final call to action",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(OrnamentLine, {
                        color: "#1A1A1A"
                    }, void 0, false, {
                        fileName: "[project]/components/home/final-cta-section.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(OrnamentLine, {
                        color: "#1A1A1A"
                    }, void 0, false, {
                        fileName: "[project]/components/home/final-cta-section.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-inter",
                                style: {
                                    fontSize: 10,
                                    color: 'rgba(26,26,26,0.3)',
                                    letterSpacing: '0.1em'
                                },
                                children: "From €99 · Live in minutes"
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
}}),

};

//# sourceMappingURL=_7e6cfaf0._.js.map