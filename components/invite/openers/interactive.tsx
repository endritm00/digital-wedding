'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { OpenerProps, hexA, shade, initials } from './shared'
import { RealisticSeal } from './realistic-seal'

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

// ════════════════════════════════════════════════════════════════════════════════
// CINEMATIC REVEAL
// A shared 4-stage sequence the openers run once their object (flap / veil) has
// moved: the screen blooms to pure white "light", holds for a beat of
// anticipation, then the film emerges THROUGH the light (slow fade + settle),
// rather than a hard cut. Driven by MotionValues so the openers can interleave it
// with their own stage-1 motion.
// ════════════════════════════════════════════════════════════════════════════════
function useReveal() {
  const videoOpacity = useMotionValue(0)  // poster → live film
  const scrimOpacity = useMotionValue(1)  // closed-state legibility scrim
  const filmScale = useMotionValue(1)     // 1.08 → 1.00 settle in stage 4
  const whiteScale = useMotionValue(0)    // light blooming from centre
  const whiteOpacity = useMotionValue(0)

  // A soft light wash blooms over the opener and lingers for a single breath,
  // then the caller hands off so the whole overlay slowly MELTS into the
  // invitation — the playing film + name card emerging together through the
  // light. A gentle blend, not a blank-white hold and not a hard cut.
  const run = async () => {
    animate(scrimOpacity, 0, { duration: 0.5, ease: 'easeOut' })
    animate(whiteScale, 1, { duration: 0.8, ease: [0.22, 1, 0.36, 1] })
    await animate(whiteOpacity, 0.92, { duration: 0.6, ease: 'easeOut' })
    await wait(240)   // a brief breath of light
  }

  return { videoOpacity, scrimOpacity, filmScale, whiteScale, whiteOpacity, run }
}

type Reveal = ReturnType<typeof useReveal>

// The film, behind everything. Plays the moment the reveal begins so it's already
// in motion by the time the white light clears.
function FilmStage({
  videoSrc, poster, play, videoOpacity, scrimOpacity, filmScale, mode = 'auto', focal,
}: {
  videoSrc?: string | null; poster?: string | null; play: boolean
  videoOpacity: MotionValue<number>; scrimOpacity: MotionValue<number>; filmScale: MotionValue<number>
  mode?: 'auto' | 'blend' | 'crop'; focal?: { x: number; y: number } | null
}) {
  const ref = useRef<HTMLVideoElement | null>(null)
  // Match OpeningHero's framing so the film doesn't reframe at handoff: honour the
  // couple's chosen mode for custom films; auto (aspect-aware) for presets.
  const [autoFit, setAutoFit] = useState<'cover' | 'contain'>('cover')
  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (!play) { v.pause(); return }
    let cancelled = false
    const tryPlay = () => {
      const p = v.play()
      if (p && typeof p.catch === 'function') {
        p.catch(() => { if (!cancelled) requestAnimationFrame(() => { void v.play().catch(() => {}) }) })
      }
    }
    tryPlay()
    return () => { cancelled = true }
  }, [play])

  // 'crop' is always cover; 'auto'/'blend' adapt per viewport (fill on phones,
  // contain+blur only when a cover crop would be severe).
  useEffect(() => {
    if (mode === 'crop') return
    const decide = () => {
      const v = ref.current
      if (!v || !v.videoWidth || !v.videoHeight) return
      const videoRatio = v.videoWidth / v.videoHeight
      const boxRatio = (window.innerWidth / window.innerHeight) || 1
      const visible = Math.min(videoRatio, boxRatio) / Math.max(videoRatio, boxRatio)
      setAutoFit(visible >= 0.8 ? 'cover' : 'contain')
    }
    const v = ref.current
    decide()
    v?.addEventListener('loadedmetadata', decide)
    window.addEventListener('resize', decide)
    return () => {
      v?.removeEventListener('loadedmetadata', decide)
      window.removeEventListener('resize', decide)
    }
  }, [videoSrc, mode])

  const fit: 'cover' | 'contain' = mode === 'crop' ? 'cover' : autoFit
  const objectPosition =
    mode === 'crop' && focal
      ? `${Math.round(focal.x * 100)}% ${Math.round(focal.y * 100)}%`
      : 'center'

  return (
    <motion.div className="absolute inset-0 overflow-hidden" style={{ zIndex: 10, scale: filmScale, transformOrigin: '50% 45%' }}>
      <div className="absolute inset-0" style={{ background: poster ? `center/cover url(${poster})` : '#111', backgroundColor: '#111' }} />
      {videoSrc && poster && fit === 'contain' && (
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            backgroundImage: `url(${poster})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(34px) saturate(1.12) brightness(0.92)',
            transform: 'scale(1.18)',
          }}
        />
      )}
      {videoSrc && (
        <motion.video
          ref={ref}
          className="absolute inset-0 h-full w-full"
          src={videoSrc}
          poster={poster ?? undefined}
          preload="auto"
          muted
          loop
          playsInline
          style={{ opacity: videoOpacity, objectFit: fit, objectPosition }}
        />
      )}
      {/* closed-state scrim — lifts the instant the reveal starts */}
      <motion.div className="absolute inset-0" style={{ opacity: scrimOpacity, background: 'radial-gradient(ellipse at 50% 40%, rgba(10,8,6,0.28) 0%, rgba(10,8,6,0.6) 100%)' }} />
    </motion.div>
  )
}

// The blooming "light" curtain — a huge soft-edged white disc that scales up from
// the opener's centre, holds, then fades to reveal the film.
function WhiteCurtain({ scale, opacity, originY = '52%' }: { scale: MotionValue<number>; opacity: MotionValue<number>; originY?: string }) {
  return (
    <motion.div
      aria-hidden
      className="absolute pointer-events-none"
      style={{
        top: originY, left: '50%',
        width: '280vmax', height: '280vmax', marginLeft: '-140vmax', marginTop: '-140vmax',
        borderRadius: '50%',
        background: 'radial-gradient(circle, #ffffff 56%, #fdfaf4 100%)',
        boxShadow: '0 0 200px 80px rgba(255,255,255,0.6)',
        zIndex: 20, scale, opacity,
      }}
    />
  )
}

function Greeting({ theme, names, fade }: { theme: OpenerProps['theme']; names: string; fade: number | MotionValue<number> }) {
  return (
    <motion.div className="pointer-events-none absolute inset-x-0 top-[12%] z-40 flex flex-col items-center text-center px-6" style={{ opacity: fade }}>
      <p className="font-inter uppercase" style={{ fontSize: 9, letterSpacing: '0.34em', color: 'rgba(255,255,255,0.66)' }}>You are invited</p>
      <p className="mt-3" style={{ fontFamily: theme.font, fontStyle: theme.fontStyle, fontSize: 'clamp(2.1rem, 8vw, 3rem)', color: '#fff', lineHeight: 1.05, textShadow: '0 2px 26px rgba(0,0,0,0.55)' }}>{names}</p>
    </motion.div>
  )
}

function Hint({ label, show, dir }: { label: string; show: boolean; dir: 'down' | 'up' | 'apart' }) {
  const reduced = useReducedMotion()
  const icon = dir === 'up'
    ? <path d="M7.5 12V4M4 7.5l3.5-3.5L11 7.5" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    : dir === 'apart'
    ? <path d="M6 4L3 7.5L6 11M9 4l3 3.5L9 11" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    : <path d="M7.5 3v8M4 7.5l3.5 3.5L11 7.5" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  const bob = reduced ? {} : dir === 'up' ? { y: [0, -7, 0] } : dir === 'apart' ? { scale: [1, 1.08, 1] } : { y: [0, 7, 0] }
  return (
    <motion.div className="pointer-events-none absolute bottom-[8%] left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2"
      animate={{ opacity: show ? 1 : 0 }} transition={{ duration: 0.4 }}>
      <motion.span className="flex items-center justify-center rounded-full"
        style={{ width: 44, height: 44, border: '1px solid rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(4px)' }}
        animate={bob} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">{icon}</svg>
      </motion.span>
      <span className="font-inter uppercase" style={{ fontSize: 9, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.75)' }}>{label}</span>
    </motion.div>
  )
}

// ════════════════════════════════════════════════════════════════════════════════
// THE LETTER — a realistic ivory envelope sealed with a photoreal gold wax seal.
// Press the seal: the flap lifts, light blooms from within, and the film emerges.
// ════════════════════════════════════════════════════════════════════════════════
export function EnvelopeOpener({ theme, names, onOpen, videoSrc, poster, videoFit, videoFocal }: OpenerProps) {
  const reduced = useReducedMotion()
  const [opening, setOpening] = useState(false)
  const mono = initials(names)
  const ivory = theme.dark ? '#E9E2D2' : '#F4ECDD'

  const rv = useReveal()
  const flapRot = useMotionValue(0)
  const envScale = useMotionValue(1)
  const envOpacity = useMotionValue(1)
  const greet = useMotionValue(1)

  const finish = async () => {
    if (opening) return
    setOpening(true)
    animate(rv.videoOpacity, 1, { duration: 0.9 })  // film comes alive behind

    if (reduced) {
      animate(greet, 0, { duration: 0.3 })
      animate(rv.scrimOpacity, 0, { duration: 0.6 })
      animate(envOpacity, 0, { duration: 0.6 })
      await wait(700)
      onOpen()
      return
    }

    // Stage 1 — the flap lifts up slowly and the envelope breathes open
    animate(flapRot, 180, { duration: 0.95, ease: [0.33, 0, 0.2, 1] })
    animate(envScale, 1.05, { duration: 1.1, ease: [0.33, 0, 0.2, 1] })
    await wait(640)                                  // let the flap open well first
    animate(greet, 0, { duration: 0.4 })
    animate(envOpacity, 0, { duration: 0.6, ease: 'easeIn' })   // dissolves as the light washes in
    // soft light wash, then hand off → overlay melts into the invitation
    await rv.run()
    onOpen()
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <FilmStage videoSrc={videoSrc} poster={poster} play={opening} videoOpacity={rv.videoOpacity} scrimOpacity={rv.scrimOpacity} filmScale={rv.filmScale} mode={videoFit} focal={videoFocal} />
      <WhiteCurtain scale={rv.whiteScale} opacity={rv.whiteOpacity} originY="52%" />

      {/* the envelope — dissolves as the light expands from within */}
      <motion.div className="absolute inset-0" style={{ zIndex: 30, scale: envScale, opacity: envOpacity, transformOrigin: '50% 50%' }}>
        <BotanicalPaper ivory={ivory} accent={theme.accent} />
        {/* flap */}
        <div className="absolute inset-x-0 top-0" style={{ height: '54%', perspective: 1700, perspectiveOrigin: '50% 0%' }}>
          <motion.div
            className="absolute inset-0"
            style={{
              transformOrigin: '50% 0%', transformStyle: 'preserve-3d',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              background: `linear-gradient(176deg, ${shade(ivory, 0.07)} 0%, ${shade(ivory, 0.02)} 58%, ${shade(ivory, -0.06)} 100%)`,
              filter: `drop-shadow(0 3px 5px ${hexA('#000', 0.16)})`,
              rotateX: flapRot,
            }}
          >
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
              <path d="M0 0 L50 100 L100 0" fill="none" stroke={hexA('#fff', 0.45)} strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
            </svg>
            <div className="absolute left-1/2 top-0 h-full" style={{ width: 1, background: hexA('#000', 0.05) }} />
          </motion.div>
        </div>
      </motion.div>

      <Greeting theme={theme} names={names} fade={greet} />

      {/* the wax seal — click or drag down to open */}
      {!opening && <SealButton onOpen={finish} mono={mono} font={theme.font} reduced={!!reduced} />}

      <Hint dir="down" label={reduced ? 'Tap the seal to open' : 'Press the seal to open'} show={!opening} />
    </div>
  )
}

// the seal sits where the flap point meets the body; supports click + drag-down
function SealButton({ onOpen, mono, font, reduced }: { onOpen: () => void; mono: string[]; font: string; reduced: boolean }) {
  const y = useMotionValue(0)
  return (
    <motion.button
      type="button"
      drag={reduced ? false : 'y'}
      dragConstraints={{ top: 0, bottom: 150 }}
      dragElastic={0.16}
      style={{ y, position: 'absolute', left: '50%', top: '52%', x: '-50%', translateY: '-50%', zIndex: 50, touchAction: 'none', cursor: 'pointer' }}
      whileHover={reduced ? {} : { scale: 1.035 }}
      whileTap={{ scale: 0.97 }}
      onClick={onOpen}
      onDragEnd={(_e, info) => { if (info.offset.y > 80) onOpen(); else animate(y, 0, { type: 'spring', stiffness: 300, damping: 26 }) }}
      aria-label="Open the invitation"
    >
      <RealisticSeal mono={mono} size={186} font={font} />
    </motion.button>
  )
}

// Ivory stationery: warm paper, subtle botanical emboss, gold corner flourishes, vignette.
function BotanicalPaper({ ivory, accent }: { ivory: string; accent: string }) {
  return (
    <div className="absolute inset-0" style={{ background: `radial-gradient(120% 90% at 50% 0%, ${shade(ivory, -0.03)} 0%, ${ivory} 45%, ${shade(ivory, 0.05)} 100%)` }}>
      {/* fine paper grain */}
      <svg className="absolute inset-0 h-full w-full" aria-hidden style={{ opacity: 0.5, mixBlendMode: 'multiply' }}>
        <filter id="paperGrain"><feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="2" seed="4" /><feColorMatrix type="matrix" values="0 0 0 0 0.42  0 0 0 0 0.35  0 0 0 0 0.24  0 0 0 0.05 0" /></filter>
        <rect width="100%" height="100%" filter="url(#paperGrain)" />
      </svg>
      {/* embossed botanical pattern */}
      <svg className="absolute inset-0 h-full w-full" aria-hidden preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 400">
        <defs>
          <pattern id="bot" width="120" height="150" patternUnits="userSpaceOnUse" patternTransform="rotate(8)">
            <g fill="none" strokeWidth="1.4">
              <g stroke={hexA('#000', 0.05)} transform="translate(0 1)">
                <path d="M20 130 C40 110 40 70 22 40 M22 40 C8 56 6 80 20 96 M22 64 C36 60 46 70 46 86 M22 88 C8 86 0 98 0 112" />
                <path d="M90 20 C108 36 110 70 96 100 M96 64 C82 60 72 70 72 86 M96 88 C112 86 120 100 120 112" />
              </g>
              <g stroke={hexA('#fff', 0.5)}>
                <path d="M20 130 C40 110 40 70 22 40 M22 40 C8 56 6 80 20 96 M22 64 C36 60 46 70 46 86 M22 88 C8 86 0 98 0 112" />
                <path d="M90 20 C108 36 110 70 96 100 M96 64 C82 60 72 70 72 86 M96 88 C112 86 120 100 120 112" />
              </g>
            </g>
          </pattern>
        </defs>
        <rect width="400" height="400" fill="url(#bot)" opacity="0.6" />
      </svg>

      {/* envelope body seams — bottom V flaps so the closed envelope reads */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        <path d="M0 100 L50 56 L100 100" fill={hexA('#000', 0.025)} stroke={hexA('#000', 0.05)} strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
        <path d="M0 0 L50 56 L0 100" fill={hexA('#000', 0.018)} />
        <path d="M100 0 L50 56 L100 100" fill={hexA('#000', 0.018)} />
      </svg>

      {/* gold corner flourishes */}
      {([['l', 'translate(28 372) scale(1,1)'], ['r', 'translate(372 372) scale(-1,1)']] as const).map(([k, tr]) => (
        <svg key={k} className="absolute" style={{ left: 0, top: 0, width: '100%', height: '100%' }} viewBox="0 0 400 400" aria-hidden>
          <g transform={tr} stroke={accent} strokeOpacity="0.5" strokeWidth="1.3" fill="none" strokeLinecap="round">
            <path d="M0 0 C18 -4 30 -16 34 -36 M10 -8 C8 -22 16 -32 30 -34 M0 0 C-2 -16 6 -26 18 -28" />
            <path d="M30 -34 C40 -30 44 -20 40 -10" />
            <circle cx="33" cy="-37" r="2" fill={accent} fillOpacity="0.6" stroke="none" />
          </g>
        </svg>
      ))}

      {/* soft vignette */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 100% at 50% 42%, transparent 55%, rgba(40,28,10,0.16) 100%)' }} />
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════════
// THE VEIL — lift the sheer fabric UP; the light blooms and the film emerges.
// ════════════════════════════════════════════════════════════════════════════════
export function VeilOpener({ theme, names, onOpen, videoSrc, poster, videoFit, videoFocal }: OpenerProps) {
  const reduced = useReducedMotion()
  const [opening, setOpening] = useState(false)
  const y = useMotionValue(0)
  const veilY = useTransform(y, [-260, 0], ['-100%', '0%'])
  const veilOpacity = useTransform(y, [-260, -40, 0], [0, 0.85, 1])
  const greetFade = useTransform(y, [-140, 0], [0, 1])

  const rv = useReveal()
  const greet = useMotionValue(1)

  const finish = async () => {
    if (opening) return
    setOpening(true)
    animate(rv.videoOpacity, 1, { duration: 0.9 })

    if (reduced) {
      animate(rv.scrimOpacity, 0, { duration: 0.6 })
      animate(greet, 0, { duration: 0.3 })
      await wait(600)
      onOpen()
      return
    }

    // Stage 1 — the veil lifts away, unhurried
    animate(y, -640, { duration: 0.95, ease: [0.4, 0, 0.2, 1] })
    animate(greet, 0, { duration: 0.5 })
    await wait(520)
    // soft light wash, then hand off → overlay melts into the invitation
    await rv.run()
    onOpen()
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <FilmStage videoSrc={videoSrc} poster={poster} play={opening} videoOpacity={rv.videoOpacity} scrimOpacity={rv.scrimOpacity} filmScale={rv.filmScale} mode={videoFit} focal={videoFocal} />
      <WhiteCurtain scale={rv.whiteScale} opacity={rv.whiteOpacity} originY="50%" />

      <Greeting theme={theme} names={names} fade={opening ? greet : (reduced ? 1 : greetFade)} />

      {/* the sheer veil (z below the white light) */}
      <motion.button type="button"
        drag={opening || reduced ? false : 'y'} dragConstraints={{ top: -260, bottom: 0 }} dragElastic={0.12}
        style={{ y, position: 'absolute', inset: 0, zIndex: 30, touchAction: 'none', cursor: opening ? 'default' : 'grab', pointerEvents: opening ? 'none' : 'auto' }}
        whileTap={opening ? {} : { cursor: 'grabbing' }}
        onClick={() => { if (reduced) void finish() }}
        onDragEnd={(_e, info) => { if (info.offset.y < -90) void finish(); else animate(y, 0, { type: 'spring', stiffness: 240, damping: 28 }) }}
        aria-label="Lift the veil">
        <motion.div className="absolute inset-x-[-12%] top-[-8%]" style={{ height: '122%', y: veilY, opacity: veilOpacity,
          background: `linear-gradient(180deg, ${hexA('#ffffff', theme.dark ? 0.14 : 0.6)} 0%, ${hexA('#ffffff', theme.dark ? 0.05 : 0.28)} 62%, transparent 100%)`,
          backdropFilter: 'blur(7px)', WebkitBackdropFilter: 'blur(7px)' }}>
          {/* lace hem */}
          <svg className="absolute left-0 right-0" style={{ bottom: -1, width: '100%', height: 26 }} viewBox="0 0 400 26" preserveAspectRatio="none" aria-hidden>
            <path d="M0 0 H400 V8 Q390 26 380 8 Q370 26 360 8 Q350 26 340 8 Q330 26 320 8 Q310 26 300 8 Q290 26 280 8 Q270 26 260 8 Q250 26 240 8 Q230 26 220 8 Q210 26 200 8 Q190 26 180 8 Q170 26 160 8 Q150 26 140 8 Q130 26 120 8 Q110 26 100 8 Q90 26 80 8 Q70 26 60 8 Q50 26 40 8 Q30 26 20 8 Q10 26 0 8 Z" fill={hexA('#ffffff', theme.dark ? 0.16 : 0.6)} />
          </svg>
        </motion.div>
      </motion.button>

      <Hint dir="up" label={reduced ? 'Tap to lift the veil' : 'Lift the veil'} show={!opening} />
    </div>
  )
}
