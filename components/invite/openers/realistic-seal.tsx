'use client'

import { useId } from 'react'

// A photoreal gold wax seal. Dimensional metallic face, a domed molten rim, a
// stamped (recessed) inner field, an embossed calligraphic monogram, fine wax
// grain (feTurbulence), a specular hotspot and a slow sheen. Vector → crisp at
// any size, any monogram.

const G = {
  bright: '#FFF8E2',  // specular hotspot
  hi: '#F4DD93',      // lit gold
  light: '#E3C062',
  mid: '#C99B38',     // body gold
  deep: '#9A7322',
  shadow: '#5C400D',  // recess shadow
  dark: '#412D08',
}

// lumpy, hand-poured wax outline (viewBox 0 0 220 220)
const BLOB =
  'M110 11 C140 12 157 22 170 41 C182 57 204 60 206 90 C207 116 216 134 201 158 ' +
  'C189 180 184 206 153 209 C127 211 118 217 101 212 C77 205 56 211 43 190 ' +
  'C31 170 11 159 16 128 C20 101 7 84 23 60 C36 40 38 14 70 14 C92 14 91 9 110 11 Z'

export function RealisticSeal({
  mono,
  size = 200,
  font = 'var(--font-pinyon)',
  rose = true,
}: {
  mono: string[]
  size?: number
  font?: string
  rose?: boolean
}) {
  const uid = useId().replace(/:/g, '')
  const face = `f-${uid}`, faceIn = `fi-${uid}`, rim = `r-${uid}`, spec = `s-${uid}`
  const grain = `g-${uid}`, warp = `w-${uid}`, sheen = `sh-${uid}`

  return (
    <div className="relative" style={{ width: size, height: size, filter: `drop-shadow(0 ${size * 0.045}px ${size * 0.06}px rgba(40,28,6,0.42)) drop-shadow(0 ${size * 0.11}px ${size * 0.13}px rgba(40,28,6,0.3))` }}>
      <svg viewBox="0 0 220 220" width="100%" height="100%" aria-hidden>
        <defs>
          <radialGradient id={face} cx="40%" cy="30%" r="78%">
            <stop offset="0%" stopColor={G.bright} />
            <stop offset="18%" stopColor={G.hi} />
            <stop offset="48%" stopColor={G.mid} />
            <stop offset="82%" stopColor={G.deep} />
            <stop offset="100%" stopColor={G.shadow} />
          </radialGradient>
          {/* recessed inner field — darker, lit from below-right (stamped well) */}
          <radialGradient id={faceIn} cx="50%" cy="62%" r="62%">
            <stop offset="0%" stopColor={G.light} />
            <stop offset="55%" stopColor={G.mid} />
            <stop offset="100%" stopColor={G.deep} />
          </radialGradient>
          {/* rim tube — bright at top, dark at bottom */}
          <linearGradient id={rim} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={G.bright} />
            <stop offset="34%" stopColor={G.hi} />
            <stop offset="64%" stopColor={G.mid} />
            <stop offset="100%" stopColor={G.shadow} />
          </linearGradient>
          <radialGradient id={spec} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <filter id={warp} x="-12%" y="-12%" width="124%" height="124%">
            <feTurbulence type="fractalNoise" baseFrequency="0.014 0.018" numOctaves="2" seed="9" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id={grain} x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" result="n" />
            <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0" result="a" />
            <feComposite in="a" in2="SourceAlpha" operator="in" />
          </filter>
        </defs>

        {/* molten wax body */}
        <g filter={`url(#${warp})`}>
          <path d={BLOB} fill={`url(#${face})`} />
          <path d={BLOB} fill="none" stroke={G.dark} strokeOpacity="0.45" strokeWidth="2.5" />
          <path d={BLOB} fill="none" stroke={G.bright} strokeOpacity="0.3" strokeWidth="0.8" transform="translate(-0.6 -0.8)" />
        </g>

        {/* stamped recess (inner field, sunk below the rim) */}
        <circle cx="110" cy="110" r="80" fill={`url(#${faceIn})`} />
        {/* inner-edge shadow (deboss where rim meets field) */}
        <circle cx="110" cy="110" r="79" fill="none" stroke={G.shadow} strokeOpacity="0.5" strokeWidth="5" style={{ filter: 'blur(2.5px)' }} />
        <circle cx="110" cy="108" r="76" fill="none" stroke={G.bright} strokeOpacity="0.35" strokeWidth="1.4" style={{ filter: 'blur(0.6px)' }} />

        {/* domed molten rim */}
        <circle cx="110" cy="110" r="88" fill="none" stroke={`url(#${rim})`} strokeWidth="17" />
        <circle cx="110" cy="110" r="96.5" fill="none" stroke={G.dark} strokeOpacity="0.4" strokeWidth="1.6" />
        {/* top highlight arc on the rim */}
        <path d="M44 96 A66 66 0 0 1 176 96" fill="none" stroke={G.bright} strokeOpacity="0.7" strokeWidth="2.4" strokeLinecap="round" />
        {/* bottom rim shadow */}
        <path d="M52 150 A66 66 0 0 0 168 150" fill="none" stroke={G.dark} strokeOpacity="0.35" strokeWidth="3" strokeLinecap="round" style={{ filter: 'blur(1px)' }} />

        {/* fine engraved double ring */}
        <circle cx="110" cy="110" r="71" fill="none" stroke={G.shadow} strokeOpacity="0.4" strokeWidth="1" />
        <circle cx="110" cy="110" r="68.5" fill="none" stroke={G.bright} strokeOpacity="0.4" strokeWidth="0.8" />

        {/* small fleuron above the monogram */}
        {rose && <Fleuron />}

        {/* embossed monogram */}
        <MonogramEmboss mono={mono} font={font} />

        {/* grain + specular hotspot */}
        <g filter={`url(#${grain})`} opacity="0.42"><path d={BLOB} fill="#fff" /></g>
        <ellipse cx="80" cy="60" rx="50" ry="30" fill={`url(#${spec})`} opacity="0.6" transform="rotate(-18 80 60)" />
      </svg>

      {/* slow sheen sweep */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ borderRadius: '50%', maskImage: 'radial-gradient(circle at 50% 50%, #000 58%, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle at 50% 50%, #000 58%, transparent 70%)' }}>
        <div className="absolute" style={{ inset: '-40%', background: 'linear-gradient(118deg, transparent 43%, rgba(255,255,255,0.6) 50%, transparent 57%)', animation: `${sheen} 6s ease-in-out infinite` }} />
      </div>
      <style>{`@keyframes ${sheen}{0%,100%{transform:translateX(-40%)}50%{transform:translateX(40%)}}`}</style>
    </div>
  )
}

function Fleuron() {
  return (
    <g transform="translate(110 64)">
      <g stroke={G.shadow} strokeOpacity="0.55" strokeWidth="1.6" fill="none" strokeLinecap="round" transform="translate(0.6 0.8)">
        <path d="M0 6 C-5 1 -5 -6 0 -8 C5 -6 5 1 0 6 Z" />
        <path d="M-8 2 C-12 -2 -11 -7 -6 -7 M8 2 C12 -2 11 -7 6 -7" />
        <path d="M0 6 L0 12" />
      </g>
      <g stroke={G.bright} strokeOpacity="0.5" strokeWidth="1.1" fill="none" strokeLinecap="round" transform="translate(-0.7 -0.9)">
        <path d="M0 6 C-5 1 -5 -6 0 -8 C5 -6 5 1 0 6 Z" />
        <path d="M-8 2 C-12 -2 -11 -7 -6 -7 M8 2 C12 -2 11 -7 6 -7" />
      </g>
    </g>
  )
}

function MonogramEmboss({ mono, font }: { mono: string[]; font: string }) {
  const isPair = mono.length === 2
  const label = isPair ? `${mono[0]} & ${mono[1]}` : (mono[0] ?? '✦')
  const fs = isPair ? 78 : 110
  const tl = isPair ? 122 : undefined
  const common = {
    x: 110, y: 128, textAnchor: 'middle' as const, fontFamily: font, fontSize: fs,
    dominantBaseline: 'middle' as const,
    ...(tl ? { textLength: tl, lengthAdjust: 'spacingAndGlyphs' as const } : {}),
  }
  return (
    <g style={{ fontWeight: 500 }}>
      {/* deep cast shadow (down-right) */}
      <text {...common} fill={G.dark} opacity="0.55" transform="translate(2 2.6)">{label}</text>
      <text {...common} fill={G.shadow} opacity="0.85" transform="translate(1 1.3)">{label}</text>
      {/* lit top edge (up-left) */}
      <text {...common} fill={G.bright} opacity="0.95" transform="translate(-1.2 -1.6)">{label}</text>
      {/* raised face */}
      <text {...common} fill={G.light}>{label}</text>
    </g>
  )
}
