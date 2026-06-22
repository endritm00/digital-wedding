// Decorative chrome for the invitation's hero "names" card — the piece a guest
// sees the instant the envelope opens. It must feel like the fine stationery the
// envelope promised, yet sit legibly over ANY film frame and adapt to EVERY
// theme. So everything here is:
//   • drawn in a single colour (the theme accent), passed by the caller;
//   • built from open, feathered marks — a top crest + botanical CORNER sprigs
//     (no continuous box) — so the film still breathes between them and there's
//     never a hard rectangle fighting the image;
//   • paint-cheap vector, nothing animates by itself.
// Shared by the published hero (invitation-view) and the builder live preview so
// the two stay pixel-identical.

import type { CSSProperties } from 'react'
import { LaurelCrest } from './ornaments'

// A small symmetric laurel crest that anchors the top of the card.
export function HeroCrest({ color, opacity = 0.72, style }: { color: string; opacity?: number; style?: CSSProperties }) {
  return (
    <LaurelCrest
      color={color}
      style={{ width: 'clamp(46px, 13vw, 62px)', height: 'clamp(26px, 7.5vw, 34px)', opacity, ...style }}
    />
  )
}

// A delicate engraved rule, inset from the card edge — the single device that
// turns the legibility scrim into a piece of "stationery". Two whisper-thin
// accent hairlines (a classic double rule) with the inner one fainter, plus a
// soft lit top edge so the surface reads as vellum, not flat glass. Its corners
// are deliberately quiet because the corner sprigs sit on top of them.
export function HeroFrame({ color, inset = 13 }: { color: string; inset?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute" style={{ top: inset, left: inset, right: inset, bottom: inset }}>
      <div
        className="absolute inset-0"
        style={{
          border: `1px solid ${color}`,
          opacity: 0.4,
          borderRadius: 18,
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.14)`,
        }}
      />
      <div
        className="absolute"
        style={{ inset: 4, border: `1px solid ${color}`, opacity: 0.16, borderRadius: 14 }}
      />
    </div>
  )
}

// One botanical corner flourish, drawn for the TOP-LEFT corner (origin at the
// corner). The other three are the same art mirrored via transform.
function CornerArt({ color }: { color: string }) {
  // almond leaf, base at origin, tip up — matches the sections' leaf silhouette.
  const leaf = 'M0 0 C -2.6 -3.6 -2.6 -8.4 0 -12 C 2.6 -8.4 2.6 -3.6 0 0 Z'
  return (
    <svg viewBox="0 0 50 50" width="100%" height="100%" fill="none" aria-hidden>
      {/* the corner sweep — a quarter curve hugging the corner, plus a fainter echo */}
      <path d="M4 30 C 4 14, 14 4, 30 4" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.9" />
      <path d="M11 31 C 11 19, 19 11, 31 11" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
      {/* a few leaves riding the sweep */}
      <g fill={color}>
        <g transform="translate(11 12) rotate(45) scale(0.85)"><path d={leaf} opacity="0.7" /></g>
        <g transform="translate(20 7) rotate(62) scale(0.8)"><path d={leaf} opacity="0.6" /></g>
        <g transform="translate(7 20) rotate(28) scale(0.8)"><path d={leaf} opacity="0.6" /></g>
        <g transform="translate(30 4) rotate(78) scale(0.7)"><path d={leaf} opacity="0.5" /></g>
        <g transform="translate(4 30) rotate(12) scale(0.7)"><path d={leaf} opacity="0.5" /></g>
      </g>
      {/* the corner pin */}
      <circle cx="4" cy="4" r="1.5" fill={color} opacity="0.85" />
    </svg>
  )
}

// Four mirrored corner flourishes framing the card. Absolutely positioned inside
// a `relative` parent.
export function HeroCorners({ color, opacity = 0.66, inset = 7 }: { color: string; opacity?: number; inset?: number }) {
  const size = 'clamp(22px, 6.2vw, 34px)'
  const base: CSSProperties = { position: 'absolute', width: size, height: size }
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0" style={{ opacity }}>
      <div style={{ ...base, top: inset, left: inset }}><CornerArt color={color} /></div>
      <div style={{ ...base, top: inset, right: inset, transform: 'scaleX(-1)' }}><CornerArt color={color} /></div>
      <div style={{ ...base, bottom: inset, left: inset, transform: 'scaleY(-1)' }}><CornerArt color={color} /></div>
      <div style={{ ...base, bottom: inset, right: inset, transform: 'scale(-1, -1)' }}><CornerArt color={color} /></div>
    </div>
  )
}
