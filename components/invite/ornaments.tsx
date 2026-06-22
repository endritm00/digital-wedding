// Themeable botanical ornaments for the invitation's content sections.
//
// All vector, single-colour, no network — they cost almost nothing to paint and
// give each section a piece of "stationery" beauty (sprigs, laurels, a corner
// spray) that the old flat blocks lacked. Colour comes from the theme accent;
// callers control size/opacity/placement. Nothing animates by itself.

import type { CSSProperties } from 'react'

interface Base {
  color?: string
  opacity?: number
  className?: string
  style?: CSSProperties
}

// A single almond leaf, base at the origin, tip up — oriented via transform.
function Leaf({ x, y, r, s = 1, color, o = 0.5 }: { x: number; y: number; r: number; s?: number; color: string; o?: number }) {
  return (
    <path
      d="M0 0 C -3.2 -4.5 -3.2 -10.5 0 -15 C 3.2 -10.5 3.2 -4.5 0 0 Z"
      fill={color}
      opacity={o}
      transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}
    />
  )
}

// A small five-petal bloom.
function Flower({ x, y, s = 1, color, o = 0.9 }: { x: number; y: number; s?: number; color: string; o?: number }) {
  const petals = [0, 72, 144, 216, 288]
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      {petals.map((a) => (
        <ellipse key={a} cx="0" cy="-4.2" rx="2.5" ry="4.2" fill={color} opacity="0.5" transform={`rotate(${a})`} />
      ))}
      <circle cx="0" cy="0" r="2.1" fill={color} />
    </g>
  )
}

// ── A laurel half-branch (curves up). Render two mirrored for a crest. ─────────
export function Laurel({ color = 'currentColor', opacity = 1, className, style }: Base) {
  return (
    <svg viewBox="0 0 60 90" width="100%" height="100%" fill="none" className={className} style={{ opacity, ...style }} aria-hidden>
      <path d="M48 86 C 30 70, 22 46, 26 8" stroke={color} strokeWidth="1.1" strokeLinecap="round" opacity="0.8" />
      <Leaf x={43} y={78} r={-150} s={0.95} color={color} />
      <Leaf x={37} y={66} r={-158} s={1.05} color={color} />
      <Leaf x={32} y={53} r={-166} s={1.1} color={color} />
      <Leaf x={29} y={40} r={-172} s={1.05} color={color} />
      <Leaf x={27} y={27} r={-178} s={0.95} color={color} />
      <Leaf x={42} y={72} r={-110} s={0.85} color={color} o={0.42} />
      <Leaf x={34} y={59} r={-118} s={0.95} color={color} o={0.42} />
      <Leaf x={30} y={46} r={-126} s={0.95} color={color} o={0.42} />
      <Leaf x={27} y={33} r={-134} s={0.85} color={color} o={0.42} />
    </svg>
  )
}

// A symmetric laurel crest (two mirrored branches meeting at the base).
export function LaurelCrest({ color = 'currentColor', opacity = 1, className, style }: Base) {
  return (
    <span className={className} style={{ display: 'inline-flex', alignItems: 'flex-end', justifyContent: 'center', opacity, ...style }} aria-hidden>
      <span style={{ width: '50%', height: '100%' }}><Laurel color={color} /></span>
      <span style={{ width: '50%', height: '100%', transform: 'scaleX(-1)' }}><Laurel color={color} /></span>
    </span>
  )
}

// ── A delicate sprig — a stem with paired leaves + a bud. Header accent. ───────
export function Sprig({ color = 'currentColor', opacity = 1, className, style }: Base) {
  return (
    <svg viewBox="0 0 96 24" width="96" height="24" fill="none" className={className} style={{ opacity, ...style }} aria-hidden>
      <path d="M2 12 C 26 12, 56 12, 84 12" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      <Leaf x={26} y={12} r={-50} s={0.7} color={color} />
      <Leaf x={26} y={12} r={-130} s={0.7} color={color} o={0.38} />
      <Leaf x={44} y={12} r={-50} s={0.8} color={color} />
      <Leaf x={44} y={12} r={-130} s={0.8} color={color} o={0.38} />
      <Leaf x={62} y={12} r={-50} s={0.7} color={color} />
      <Leaf x={62} y={12} r={-130} s={0.7} color={color} o={0.38} />
      <Flower x={88} y={12} s={0.9} color={color} />
    </svg>
  )
}

// ── A large asymmetric botanical spray — a faint section watermark. ───────────
// Three variants so neighbouring sections never repeat the same silhouette.
export function BotanicalSpray({ variant = 'a', color = 'currentColor', opacity = 1, className, style }: Base & { variant?: 'a' | 'b' | 'c' }) {
  return (
    <svg viewBox="0 0 220 300" width="100%" height="100%" fill="none" preserveAspectRatio="xMidYMid meet" className={className} style={{ opacity, ...style }} aria-hidden>
      {variant === 'a' && (
        <g>
          <path d="M40 296 C 60 230, 70 170, 60 70 C 56 40, 70 24, 96 14" stroke={color} strokeWidth="1.1" strokeLinecap="round" opacity="0.8" />
          {[260, 226, 192, 158, 124, 92].map((y, i) => (
            <g key={y}>
              <Leaf x={56 - i * 1.5} y={y} r={-58 - i * 2} s={1.5 - i * 0.05} color={color} />
              <Leaf x={64 - i * 0.5} y={y + 8} r={-122 + i * 2} s={1.4 - i * 0.05} color={color} o={0.4} />
            </g>
          ))}
          <Flower x={96} y={14} s={2} color={color} o={0.85} />
          <Flower x={74} y={48} s={1.3} color={color} o={0.6} />
        </g>
      )}
      {variant === 'b' && (
        <g>
          <path d="M16 24 C 70 50, 120 70, 150 130 C 168 168, 176 220, 168 290" stroke={color} strokeWidth="1.1" strokeLinecap="round" opacity="0.8" />
          {[
            [60, 52, -10], [96, 70, -4], [128, 96, 6], [150, 134, 26], [162, 184, 40], [166, 236, 54],
          ].map(([x, y, r], i) => (
            <g key={i}>
              <Leaf x={x} y={y} r={r as number} s={1.5} color={color} />
              <Leaf x={x - 6} y={y + 4} r={(r as number) + 70} s={1.3} color={color} o={0.4} />
            </g>
          ))}
          <Flower x={16} y={24} s={2.1} color={color} o={0.85} />
          <Flower x={168} y={288} s={1.5} color={color} o={0.7} />
        </g>
      )}
      {variant === 'c' && (
        <g>
          <path d="M110 296 C 110 220, 108 150, 110 40" stroke={color} strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
          <path d="M110 150 C 80 130, 62 96, 58 50" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          <path d="M110 170 C 142 150, 160 116, 166 70" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          {[250, 214, 178].map((y, i) => (<g key={y}><Leaf x={110} y={y} r={-58} s={1.5} color={color} /><Leaf x={110} y={y} r={-122} s={1.5} color={color} o={0.4} /></g>))}
          <Flower x={110} y={36} s={2.1} color={color} o={0.85} />
          <Flower x={58} y={46} s={1.5} color={color} o={0.7} />
          <Flower x={166} y={66} s={1.5} color={color} o={0.7} />
        </g>
      )}
    </svg>
  )
}

// A small diamond + hairlines flourish, for tight dividers.
export function MiniFlourish({ color = 'currentColor', opacity = 1, className, style }: Base) {
  return (
    <svg viewBox="0 0 64 8" width="64" height="8" fill="none" className={className} style={{ opacity, ...style }} aria-hidden>
      <line x1="0" y1="4" x2="26" y2="4" stroke={color} strokeWidth="0.75" opacity="0.5" />
      <rect x="29" y="1" width="6" height="6" transform="rotate(45 32 4)" stroke={color} strokeWidth="0.75" opacity="0.7" fill="none" />
      <line x1="38" y1="4" x2="64" y2="4" stroke={color} strokeWidth="0.75" opacity="0.5" />
    </svg>
  )
}
