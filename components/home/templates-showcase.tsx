'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ALL_TEMPLATES_RESOLVED } from '@/lib/templates/templates'

// "The collection" — a static, image-only showcase of finished invitation
// designs. No <video> anywhere: each card is a lazy poster still dressed with the
// template's own heading font, accent colour, and palette swatch, so the page
// stays light while still selling how a finished invite *looks*. Replaces the
// old multi-video OpeningFilmSection.

const EASE = [0.22, 1, 0.36, 1] as const

// Show a curated handful — enough to feel like a real collection, not so many
// the section runs long. The full set lives at /themes.
const TEMPLATES = ALL_TEMPLATES_RESOLVED.slice(0, 8)

export function TemplatesShowcase() {
  const reduced = useReducedMotion()

  return (
    <section
      id="collection"
      className="overflow-hidden px-6 md:px-12 py-24 md:py-32"
      style={{ background: '#F3EDE5' }}
      aria-label="The collection"
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: EASE }}
        className="mx-auto max-w-2xl text-center"
      >
        <span
          className="font-inter uppercase"
          style={{ fontSize: 9, letterSpacing: '0.34em', color: 'rgba(26,24,22,0.34)' }}
        >
          The collection
        </span>
        <h2
          className="font-cormorant font-light mt-3 leading-none"
          style={{ fontSize: 'clamp(2.2rem, 7vw, 4.2rem)', color: '#1A1816', letterSpacing: '-0.015em' }}
        >
          Find your design.
        </h2>
        <p
          className="font-inter mx-auto mt-5 max-w-[46ch]"
          style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(26,24,22,0.55)' }}
        >
          Every design is a complete look — palette, type, and an opening film,
          ready to carry your names. Choose one and make it yours.
        </p>
      </motion.div>

      {/* ── Gallery ────────────────────────────────────────────────────────── */}
      <div className="mx-auto mt-14 grid w-full max-w-[1180px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-7">
        {TEMPLATES.map((t, i) => (
          <TemplateCard key={t.slug} t={t} index={i} reduced={!!reduced} />
        ))}
      </div>

      {/* ── View all ───────────────────────────────────────────────────────── */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mt-14 flex flex-col items-center gap-7"
      >
        <Link
          href="/themes"
          className="font-inter uppercase transition-opacity duration-300 hover:opacity-60"
          style={{ fontSize: 11, letterSpacing: '0.22em', color: '#A8854B' }}
        >
          View all templates&nbsp;→
        </Link>
        <Link
          href="/builder"
          className="font-inter uppercase rounded-full transition-transform duration-500 hover:scale-[1.04]"
          style={{
            fontSize: 11,
            padding: '15px 40px',
            background: '#1A1816',
            color: '#FDFCF9',
            letterSpacing: '0.2em',
            boxShadow: '0 8px 28px rgba(26,24,22,0.22)',
          }}
        >
          Create yours
        </Link>
      </motion.div>
    </section>
  )
}

function TemplateCard({
  t,
  index,
  reduced,
}: {
  t: (typeof TEMPLATES)[number]
  index: number
  reduced: boolean
}) {
  const { palette, font, film, sample } = t
  // Dark palettes (onyx, midnight) read better with light ink on the swatch row.
  const metaInk = 'rgba(26,24,22,0.5)'

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.85, ease: EASE, delay: reduced ? 0 : (index % 3) * 0.08 }}
    >
      <Link
        href={`/themes/${t.slug}`}
        className="group block overflow-hidden bg-white transition-transform duration-500 hover:-translate-y-1"
        style={{
          borderRadius: 12,
          border: '1px solid rgba(168,133,75,0.18)',
          boxShadow: '0 4px 18px rgba(26,24,22,0.07)',
        }}
        aria-label={`${t.name} — view this design`}
      >
        {/* Poster still + overlaid sample names */}
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio: '4 / 5',
            background: `linear-gradient(160deg, ${film.poster.from} 0%, ${film.poster.to} 100%)`,
          }}
        >
          <img
            src={film.posterImg}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
            style={{ transform: 'translateZ(0)' }}
          />
          {/* legibility scrim */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(18,13,9,0.66) 0%, rgba(18,13,9,0.12) 46%, transparent 72%)',
            }}
          />

          {/* template badge */}
          <span
            className="font-inter absolute left-4 top-4 uppercase"
            style={{
              fontSize: 8.5,
              letterSpacing: '0.2em',
              color: 'rgba(253,252,249,0.92)',
              padding: '5px 11px',
              borderRadius: 999,
              background: 'rgba(18,13,9,0.34)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(253,252,249,0.18)',
            }}
          >
            {t.name}
          </span>

          {/* sample couple — in the template's heading font + accent */}
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
            <p
              className="font-inter uppercase"
              style={{ fontSize: 8.5, letterSpacing: '0.26em', color: 'rgba(253,252,249,0.66)', marginBottom: 8 }}
            >
              {sample.dateLabel}
            </p>
            <h3
              style={{
                fontFamily: font.var,
                fontStyle: font.italic ? 'italic' : 'normal',
                fontSize: `clamp(1.7rem, ${3 * font.scale}vw, ${2.6 * font.scale}rem)`,
                lineHeight: 1.02,
                color: palette.accent === '#1A1816' ? '#F0DBA0' : palette.accent,
                textShadow: '0 2px 22px rgba(0,0,0,0.5)',
              }}
            >
              {sample.names}
            </h3>
          </div>
        </div>

        {/* Caption block */}
        <div className="px-5 py-5 md:px-6">
          <p
            className="font-inter"
            style={{ fontSize: 13.5, lineHeight: 1.6, color: 'rgba(26,24,22,0.66)' }}
          >
            {t.tagline}
          </p>

          {/* palette swatch + view cue */}
          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-1.5" aria-hidden>
              {palette.swatch.map((c, k) => (
                <span
                  key={k}
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 999,
                    background: c,
                    boxShadow: 'inset 0 0 0 1px rgba(26,24,22,0.10)',
                  }}
                />
              ))}
            </div>
            <span
              className="font-inter uppercase transition-colors duration-300"
              style={{ fontSize: 9, letterSpacing: '0.2em', color: metaInk }}
            >
              View&nbsp;→
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
