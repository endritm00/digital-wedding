'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { RealisticSeal } from '@/components/invite/openers/realistic-seal'
import { hexA, shade, initials, parseCoupleNames } from '@/components/invite/openers/shared'

// A real, contained wax-sealed envelope on the homepage. Click the seal: the flap
// opens and the invitation slides out. Personalise it with your own names.

const IVORY = '#F4ECDD'
const ACCENT = '#A8854B'
// Names typed here are handed to the builder (via sessionStorage) so the couple
// don't have to enter them twice. The builder's names step consumes + clears it.
const PREFILL_NAMES_KEY = 'di:prefill-names'

export function HomeEnvelope() {
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [names, setNames] = useState('')
  const display = names.trim() || 'Aria & Luca'
  const mono = initials(display)

  // Stash the typed names for the builder right before navigating to it.
  const stashNames = () => {
    const { name_a, name_b } = parseCoupleNames(names)
    try {
      if (name_a || name_b) sessionStorage.setItem(PREFILL_NAMES_KEY, JSON.stringify({ name_a, name_b }))
      else sessionStorage.removeItem(PREFILL_NAMES_KEY)
    } catch { /* private mode — builder simply starts blank */ }
  }

  return (
    <section id="opener" className="relative py-28 px-6 flex flex-col items-center overflow-hidden" style={{ background: '#F5EEE6' }}>
      <span className="font-inter uppercase" style={{ fontSize: 10, letterSpacing: '0.3em', color: 'rgba(26,24,22,0.4)' }}>The opening</span>
      <h2 className="font-cormorant font-light text-center mt-4" style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', color: '#1A1816', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
        Sealed by hand, opened with a touch
      </h2>
      <p className="font-inter text-center mt-4 max-w-[42ch]" style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(26,24,22,0.55)' }}>
        Every invitation arrives sealed in wax. Your guests press the seal and your day unfolds.
      </p>

      {/* personalise */}
      <input
        type="text" value={names} onChange={(e) => setNames(e.target.value)} maxLength={48}
        placeholder="Type your names"
        className="mt-8 w-60 pb-2 text-center font-cormorant text-2xl font-light bg-transparent border-0 border-b outline-none"
        style={{ color: '#1A1816', borderBottomColor: 'rgba(26,24,22,0.2)', caretColor: ACCENT }}
        aria-label="Type your names to personalise the envelope"
      />

      {/* the envelope */}
      <div className="relative mt-14" style={{ width: 'min(92vw, 500px)', height: 'clamp(250px, 64vw, 330px)', perspective: 1500 }}>
        {/* back panel */}
        <div className="absolute inset-0 rounded-[6px]" style={{ background: `linear-gradient(160deg, ${shade(IVORY, -0.04)} 0%, ${IVORY} 50%, ${shade(IVORY, 0.05)} 100%)`, boxShadow: `0 26px 60px ${hexA('#2a1c08', 0.22)}` }}>
          <svg className="absolute inset-0 h-full w-full" aria-hidden style={{ opacity: 0.5, mixBlendMode: 'multiply' }}>
            <filter id="heGrain"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="5" /><feColorMatrix type="matrix" values="0 0 0 0 0.42 0 0 0 0 0.35 0 0 0 0 0.24 0 0 0 0.05 0" /></filter>
            <rect width="100%" height="100%" filter="url(#heGrain)" />
          </svg>
        </div>

        {/* the invitation card — rises out on open */}
        <motion.div
          className="absolute flex flex-col items-center justify-center rounded-[4px] text-center"
          style={{ left: '7%', right: '7%', top: '8%', height: '78%', zIndex: 2, background: '#FFFEFB', boxShadow: `0 8px 24px ${hexA('#2a1c08', 0.16)}`, border: `1px solid ${hexA(ACCENT, 0.18)}` }}
          initial={false}
          animate={open ? { y: reduced ? 0 : '-40%', opacity: 1 } : { y: 0, opacity: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: open ? 0.25 : 0 }}
        >
          <span className="font-inter uppercase" style={{ fontSize: 8, letterSpacing: '0.32em', color: 'rgba(26,24,22,0.4)' }}>You are invited</span>
          <span className="font-pinyon mt-2" style={{ fontSize: 'clamp(1.8rem, 7vw, 2.6rem)', color: ACCENT, lineHeight: 1 }}>{display}</span>
          <span className="mt-3 h-px w-10" style={{ background: hexA(ACCENT, 0.5) }} />
          <span className="font-cormorant italic mt-3" style={{ fontSize: 14, color: 'rgba(26,24,22,0.6)' }}>are getting married</span>
        </motion.div>

        {/* front pocket (covers the lower half of the card) */}
        <div className="absolute inset-x-0 bottom-0" style={{ height: '62%', zIndex: 3, clipPath: 'polygon(0 38%, 50% 0, 100% 38%, 100% 100%, 0 100%)', background: `linear-gradient(180deg, ${shade(IVORY, 0.02)} 0%, ${shade(IVORY, -0.05)} 100%)`, boxShadow: `inset 0 2px 6px ${hexA('#fff', 0.4)}` }}>
          <div className="absolute left-1/2 top-0 h-full" style={{ width: 1, background: hexA('#000', 0.04) }} />
        </div>

        {/* top flap */}
        <div className="absolute inset-x-0 top-0" style={{ height: '56%', zIndex: open ? 1 : 5, perspective: 1600, perspectiveOrigin: '50% 0%' }}>
          <motion.div
            className="absolute inset-0"
            style={{ transformOrigin: '50% 0%', transformStyle: 'preserve-3d', clipPath: 'polygon(0 0, 100% 0, 50% 100%)', background: `linear-gradient(176deg, ${shade(IVORY, 0.06)} 0%, ${shade(IVORY, -0.05)} 100%)`, filter: `drop-shadow(0 3px 5px ${hexA('#000', 0.14)})` }}
            initial={false}
            animate={open ? { rotateX: 178 } : { rotateX: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
              <path d="M0 0 L50 100 L100 0" fill="none" stroke={hexA('#fff', 0.4)} strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
            </svg>
          </motion.div>
        </div>

        {/* wax seal */}
        <AnimatePresence>
          {!open && (
            <motion.button
              key="seal" type="button" onClick={() => setOpen(true)}
              className="absolute left-1/2 z-10 focus-visible:outline-none"
              style={{ top: '50%', x: '-50%', y: '-50%', zIndex: 8, cursor: 'pointer' }}
              initial={false}
              whileHover={reduced ? {} : { scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              exit={{ opacity: 0, scale: 0.6, y: '-30%' }}
              transition={{ duration: 0.3 }}
              aria-label="Open the envelope"
            >
              <RealisticSeal mono={mono} size={132} font="var(--font-pinyon)" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* hint / CTA */}
      <div className="relative mt-10 h-12 flex items-center justify-center">
        {!open && (
          <motion.span
            animate={reduced ? { opacity: 0.7 } : { opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="font-inter uppercase"
            style={{ fontSize: 10, letterSpacing: '0.25em', color: 'rgba(26,24,22,0.45)' }}
          >
            Press the seal
          </motion.span>
        )}
        {open && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.5 }} className="flex items-center gap-4">
            <Link href="/builder" onClick={stashNames} className="font-inter uppercase rounded-full px-9 py-4" style={{ fontSize: 11, letterSpacing: '0.2em', background: '#1A1816', color: '#FDFCF9' }}>
              Create yours
            </Link>
            <button type="button" onClick={() => setOpen(false)} className="font-inter uppercase" style={{ fontSize: 10, letterSpacing: '0.18em', color: 'rgba(26,24,22,0.4)' }}>
              ↻ Reseal
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
