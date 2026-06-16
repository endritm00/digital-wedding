'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { VIDEO_PRESETS } from '@/lib/builder/presets'

// "Your opening film" — the signature of the product. A large cinematic player
// shows the selected film; elegant poster chips below switch it with a soft
// crossfade. Face-free, venue-and-bloom scenery only — and text-free footage
// (the floral-arch clip carries a baked-in watermark, so it's excluded here).
// Default is The Reception so it doesn't echo the hero's "The Vows".
const FILM_IDS = ['the-veil', 'eternal', 'open-air', 'the-vows', 'the-letter']
const FILMS = FILM_IDS
  .map((id) => VIDEO_PRESETS.find((p) => p.id === id))
  .filter((p): p is (typeof VIDEO_PRESETS)[number] => Boolean(p))

export function OpeningFilmSection() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const [ready, setReady] = useState(false)
  const film = FILMS[active]

  // Don't download/play this HD film until the section is actually on screen —
  // otherwise it competes with the hero film for bandwidth and the decoder.
  const playerRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const inView = useInView(playerRef, { amount: 0.4 })
  const [armed, setArmed] = useState(false)
  useEffect(() => { if (inView) setArmed(true) }, [inView])
  useEffect(() => {
    const v = videoRef.current
    if (!v || reduced) return
    if (inView) { void v.play().catch(() => {}) } else v.pause()
  }, [inView, active, armed, reduced])

  const select = (i: number) => {
    if (i === active) return
    setReady(false)
    setActive(i)
  }

  return (
    <section id="films" className="overflow-hidden px-6 md:px-12 py-24 md:py-32" style={{ background: '#F3EDE5' }} aria-label="Your opening film">
      {/* Header */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-2xl text-center"
      >
        <span className="font-inter uppercase" style={{ fontSize: 9, letterSpacing: '0.34em', color: 'rgba(26,24,22,0.34)' }}>
          The films
        </span>
        <h2 className="font-cormorant font-light mt-3 leading-none" style={{ fontSize: 'clamp(2.2rem, 7vw, 4.2rem)', color: '#1A1816', letterSpacing: '-0.015em' }}>
          Your opening film.
        </h2>
        <p className="font-inter mx-auto mt-5 max-w-[44ch]" style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(26,24,22,0.55)' }}>
          Every invitation opens with a film. Guests press the seal, and your day begins to unfold — set the scene with one of these.
        </p>
      </motion.div>

      {/* Featured player */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        ref={playerRef}
        className="relative mx-auto mt-12 w-full max-w-[1000px] overflow-hidden"
        style={{ aspectRatio: '16 / 9', borderRadius: 10, boxShadow: '0 30px 80px rgba(26,24,22,0.26), 0 4px 16px rgba(26,24,22,0.10)', border: '1px solid rgba(168,133,75,0.22)' }}
      >
        {/* gradient + poster placeholder (no flash on switch) */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${film.poster.from} 0%, ${film.poster.to} 100%)` }} />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: `url(${film.posterImg})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: ready ? 0 : 1, transition: 'opacity 0.6s ease' }}
        />
        {!reduced && armed && (
          <motion.video
            key={film.id}
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={film.src}
            poster={film.posterImg}
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={() => setReady(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
          />
        )}

        {/* caption scrim + film name */}
        <div className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(18,13,9,0.7) 0%, transparent 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 md:p-7">
          <div>
            <AnimatedName name={film.name} />
            <p className="font-inter mt-1.5" style={{ fontSize: 11, letterSpacing: '0.08em', color: 'rgba(253,252,249,0.72)' }}>{film.mood}</p>
          </div>
          <span className="font-inter hidden sm:inline uppercase" style={{ fontSize: 9, letterSpacing: '0.22em', color: 'rgba(253,252,249,0.6)' }}>
            {String(active + 1).padStart(2, '0')} / {String(FILMS.length).padStart(2, '0')}
          </span>
        </div>
      </motion.div>

      {/* Selector chips */}
      <div className="mx-auto mt-6 max-w-[1000px]">
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar md:justify-center" style={{ WebkitOverflowScrolling: 'touch' }}>
          {FILMS.map((f, i) => {
            const on = i === active
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => select(i)}
                className="group flex-none text-left transition-transform duration-300"
                style={{ width: 'clamp(112px, 22vw, 150px)', transform: on ? 'translateY(-2px)' : 'none' }}
                aria-pressed={on}
                aria-label={`Show ${f.name}`}
              >
                <div
                  className="relative overflow-hidden"
                  style={{
                    aspectRatio: '16 / 10',
                    borderRadius: 7,
                    backgroundImage: `url(${f.posterImg})`,
                    backgroundColor: f.poster.from,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    boxShadow: on ? '0 10px 28px rgba(168,133,75,0.36)' : '0 4px 14px rgba(26,24,22,0.12)',
                    outline: on ? '2px solid #A8854B' : '2px solid transparent',
                    outlineOffset: 2,
                  }}
                >
                  <div className="absolute inset-0" style={{ background: on ? 'rgba(0,0,0,0)' : 'rgba(243,237,229,0.32)', transition: 'background 0.3s' }} />
                </div>
                <span
                  className="font-cormorant block mt-2 leading-tight"
                  style={{ fontSize: 14, color: on ? '#A8854B' : 'rgba(26,24,22,0.6)' }}
                >
                  {f.name}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mt-12 flex justify-center"
      >
        <Link
          href="/builder"
          className="font-inter uppercase rounded-full transition-transform duration-500 hover:scale-[1.04]"
          style={{ fontSize: 11, padding: '15px 40px', background: '#1A1816', color: '#FDFCF9', letterSpacing: '0.2em', boxShadow: '0 8px 28px rgba(26,24,22,0.22)' }}
        >
          Create yours
        </Link>
      </motion.div>
    </section>
  )
}

// The film name, re-animating each time it changes.
function AnimatedName({ name }: { name: string }) {
  return (
    <motion.h3
      key={name}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="font-cormorant font-light"
      style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', color: '#FDFCF9', lineHeight: 1, textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}
    >
      {name}
    </motion.h3>
  )
}
