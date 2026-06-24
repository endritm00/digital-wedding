'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { VIDEO_PRESETS } from '@/lib/builder/presets'

// A cinematic, full-bleed wedding film hero — the lush "In Bloom" floral arch
// behind an editorial gold-framed title. No floating cards; just the film, soft
// scrims for legibility, and refined type that settles in on load.
const HERO = VIDEO_PRESETS.find((p) => p.id === 'the-vows') ?? VIDEO_PRESETS[0]

export function HeroSection() {
  const reduced = useReducedMotion()
  const [ready, setReady] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  // Only mount/run the film once the hero is on screen — and only ONCE (armed),
  // so we never re-create the <video> (which would re-download the whole file).
  // Playback is driven explicitly here, not via autoPlay, so the browser issues
  // exactly one controlled fetch instead of autoPlay + play()-after-pause racing
  // into a double download.
  const [armed, setArmed] = useState(false)
  const inView = useInView(sectionRef, { amount: 0.25 })
  useEffect(() => { if (inView) setArmed(true) }, [inView])
  // As soon as the <video> exists, imperatively guarantee muted + inline playback
  // on the actual DOM element. React's `muted` JSX prop does NOT reliably set the
  // DOM `muted` property, so without this the browser blocks muted autoplay and
  // the film stays frozen on its poster (esp. iOS/Android).
  useEffect(() => {
    if (!armed) return
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.defaultMuted = true
    v.setAttribute('muted', '')
    v.playsInline = true
    v.setAttribute('playsinline', '')
    v.setAttribute('webkit-playsinline', '')
    v.setAttribute('disablepictureinpicture', '')
    v.setAttribute('disableremoteplayback', '')
  }, [armed])
  useEffect(() => {
    const v = videoRef.current
    if (!v || reduced) return
    if (inView) { v.muted = true; void v.play().catch(() => {}) } else v.pause()
  }, [inView, armed, reduced])

  return (
    <section ref={sectionRef} className="relative h-[100dvh] overflow-hidden" style={{ background: '#14100C' }} aria-label="Hero">
      {/* ── Full-bleed film ─────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        {/* gradient base — paints instantly, no network */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${HERO.poster.from} 0%, ${HERO.poster.to} 100%)` }} />
        {/* poster still until the film can play (and for reduced-motion) */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${HERO.posterImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: ready ? 0 : 1,
            transition: 'opacity 1s ease',
          }}
        />
        {!reduced && armed && (
          <motion.video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={HERO.src}
            poster={HERO.posterImg}
            muted
            loop
            playsInline
            preload="metadata"
            onCanPlay={() => setReady(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            // No perpetual scale — a constantly-rescaling video shimmers/vibrates.
            // Promote to its own GPU layer so it composites cleanly.
            style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden', willChange: 'opacity' }}
          />
        )}
      </div>

      {/* ── Scrims (cinematic legibility) ───────────────────────────────────── */}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(18,13,9,0.46) 0%, rgba(18,13,9,0.12) 32%, rgba(18,13,9,0.22) 62%, rgba(18,13,9,0.72) 100%)' }} />
      <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 46%, rgba(0,0,0,0.34) 0%, transparent 70%)' }} />

      {/* ── Inset gold frame (editorial) ────────────────────────────────────── */}
      <div
        className="absolute z-20 pointer-events-none hidden sm:block"
        style={{ inset: 'clamp(14px, 2.4vw, 30px)', border: '1px solid rgba(233,212,165,0.34)' }}
      />

      {/* ── Title ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="font-inter uppercase"
          style={{ fontSize: 10, letterSpacing: '0.4em', color: 'rgba(244,222,179,0.82)', textShadow: '0 1px 12px rgba(0,0,0,0.4)' }}
        >
          Digital Wedding Invitations
        </motion.div>

        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
          className="mt-6 flex flex-col items-center"
          style={{ color: '#FDFCF9', lineHeight: 0.92, textShadow: '0 2px 40px rgba(0,0,0,0.45)' }}
        >
          <span className="font-cormorant font-light" style={{ fontSize: 'clamp(2.6rem, 8.4vw, 6rem)', letterSpacing: '0.01em' }}>
            Begin your
          </span>
          <span
            className="font-pinyon"
            style={{ fontSize: 'clamp(4.2rem, 16vw, 11rem)', lineHeight: 0.86, color: '#F0DBA0', marginTop: '0.06em' }}
          >
            Forever
          </span>
        </motion.h1>

        {/* divider */}
        <motion.div
          initial={reduced ? false : { opacity: 0, scaleX: 0.4 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
          className="mt-7 flex items-center gap-3"
          aria-hidden
        >
          <span style={{ width: 'clamp(40px, 9vw, 80px)', height: 1, background: 'linear-gradient(90deg, transparent, rgba(240,219,160,0.7))' }} />
          <span style={{ width: 5, height: 5, background: '#F0DBA0', transform: 'rotate(45deg)' }} />
          <span style={{ width: 'clamp(40px, 9vw, 80px)', height: 1, background: 'linear-gradient(90deg, rgba(240,219,160,0.7), transparent)' }} />
        </motion.div>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.82 }}
          className="font-inter mt-6"
          style={{ fontSize: 12.5, letterSpacing: '0.12em', lineHeight: 2, color: 'rgba(253,252,249,0.82)', maxWidth: 340, textShadow: '0 1px 16px rgba(0,0,0,0.5)' }}
        >
          A film that opens your invitation.<br />Shared with a single link. Live in minutes.
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1 }}
          className="mt-10 flex items-center gap-5"
        >
          <Link
            href="/builder"
            className="font-inter uppercase rounded-full transition-transform duration-500 hover:scale-[1.04]"
            style={{ fontSize: 11, padding: '15px 38px', background: '#FDFCF9', color: '#1A1816', letterSpacing: '0.2em', boxShadow: '0 8px 32px rgba(0,0,0,0.28)' }}
          >
            Start creating
          </Link>
          <Link
            href="#collection"
            className="font-inter uppercase transition-opacity duration-300 hover:opacity-70"
            style={{ fontSize: 11, color: 'rgba(253,252,249,0.78)', letterSpacing: '0.18em' }}
          >
            See the designs&nbsp;→
          </Link>
        </motion.div>
      </div>

      {/* ── Scroll cue ──────────────────────────────────────────────────────── */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 z-30 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="font-inter uppercase" style={{ fontSize: 8, letterSpacing: '0.3em', color: 'rgba(253,252,249,0.55)' }}>Scroll</span>
        <motion.span
          animate={reduced ? {} : { scaleY: [0, 1, 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 38, background: 'rgba(240,219,160,0.8)', transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  )
}
