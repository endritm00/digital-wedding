'use client'

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import { Hairline } from '@/components/builder/hairline'
import { StepSheet } from '@/components/builder/step-sheet'
import { useBuilder } from '@/components/builder/builder-provider'
import {
  PALETTES, HEADING_FONTS, DEFAULT_PALETTE, DEFAULT_HEADING_FONT, PALETTE_MAP, HEADING_FONT_MAP, VIDEO_PRESETS,
} from '@/lib/builder/presets'
import { OPENERS, DEFAULT_OPENER, InviteOpener } from '@/components/invite/openers'

// film shown behind the opener preview
const OPENER_FILM: Record<string, string> = { 'wax-letter': 'the-letter' }

// Small motif thumbnail for the opener card.
function OpenerMotif({ accent }: { accent: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect x="7" y="11" width="26" height="19" rx="1.5" fill="none" stroke={accent} strokeWidth="1.5" />
      <path d="M7 12 L20 22 L33 12" fill="none" stroke={accent} strokeWidth="1.3" />
      <circle cx="20" cy="22" r="4" fill={accent} />
    </svg>
  )
}

export default function StylePage({ params }: { params: Promise<{ inviteId: string }> }) {
  const { inviteId } = use(params)
  const { opening, setOpening } = useBuilder()
  const router = useRouter()
  const reduced = useReducedMotion()
  const [preview, setPreview] = useState<string | null>(null)
  const [previewLeaving, setPreviewLeaving] = useState(false)

  // Open/close the full-screen opener preview. Closing fades the overlay out and
  // then unmounts it via a guaranteed timeout — we deliberately avoid
  // AnimatePresence here: its exit can hang on the opener's infinite-repeat child
  // animations, leaving an invisible pointer-events overlay that froze the page.
  const openPreview = (id: string) => { setPreviewLeaving(false); setPreview(id) }
  const closePreview = () => {
    setPreviewLeaving(true)
    setTimeout(() => { setPreview(null); setPreviewLeaving(false) }, 300)
  }

  const config = (opening?.config ?? {}) as {
    palette?: string; heading_font?: string; opener?: string; name_a?: string; name_b?: string
  }
  const activePalette = config.palette ?? DEFAULT_PALETTE.id
  const activeFont = config.heading_font ?? DEFAULT_HEADING_FONT.id
  const activeOpener = config.opener ?? DEFAULT_OPENER.id

  const palette = PALETTE_MAP[activePalette] ?? DEFAULT_PALETTE
  const font = HEADING_FONT_MAP[activeFont] ?? DEFAULT_HEADING_FONT
  const names = (config.name_a && config.name_b) ? `${config.name_a} & ${config.name_b}`
    : config.name_a || config.name_b || 'Aria & Luca'

  const openerTheme = {
    accent: palette.accent, paper: palette.paper, flap: palette.washAlt,
    ink: palette.ink, font: font.var, fontStyle: (font.italic ? 'italic' : 'normal') as 'normal' | 'italic',
    dark: !!palette.dark,
  }

  // Selecting (tapping the card) only chooses the opener. The preview overlay
  // opens solely from the explicit "Preview" button.
  const selectOpener = (id: string) => { setOpening({ opener: id }) }
  const previewOpener = (id: string) => { setOpening({ opener: id }); openPreview(id) }

  // film behind the opener preview
  const previewFilm = preview ? (VIDEO_PRESETS.find(p => p.id === OPENER_FILM[preview]) ?? VIDEO_PRESETS[0]) : null

  return (
    <>
      <Hairline step="style" />
      <StepSheet
        title="Set the scene"
        lede="Choose how your invitation opens, then dress it in a palette and lettering. Tap an opening to preview it."
        primaryLabel="Continue"
        onPrimary={() => router.push(`/builder/${inviteId}/save`)}
        backHref={`/builder/${inviteId}/opening-video`}
      >
        {/* ── Opener ────────────────────────────────────────────────────────── */}
        <span className="font-inter uppercase" style={{ fontSize: 9, letterSpacing: '0.14em', color: 'rgba(26,24,22,0.44)' }}>
          How it opens
        </span>
        <div className="mt-3 flex flex-col gap-2.5">
          {OPENERS.map((o, i) => {
            const on = activeOpener === o.id
            return (
              <motion.div
                key={o.id}
                role="button"
                tabIndex={0}
                onClick={() => selectOpener(o.id)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectOpener(o.id) } }}
                aria-pressed={on}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                whileTap={reduced ? {} : { scale: 0.985 }}
                className="flex cursor-pointer items-center gap-3.5 rounded-2xl p-3.5 text-left transition-all"
                style={{
                  background: on ? 'rgba(168,133,75,0.08)' : 'rgba(255,255,255,0.55)',
                  border: on ? `1px solid ${palette.accent}` : '1px solid rgba(26,24,22,0.08)',
                }}
              >
                <span className="flex-none flex items-center justify-center rounded-xl" style={{ width: 52, height: 52, background: on ? 'rgba(168,133,75,0.1)' : 'rgba(26,24,22,0.035)' }}>
                  <OpenerMotif accent={on ? '#A8854B' : 'rgba(26,24,22,0.55)'} />
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="flex items-center gap-2">
                    <span className="font-cormorant font-light leading-tight" style={{ fontSize: 16, color: '#1A1816' }}>{o.name}</span>
                    {on && <span className="font-inter rounded-full px-1.5 py-0.5" style={{ fontSize: 8, letterSpacing: '0.08em', background: 'rgba(168,133,75,0.14)', color: '#A8854B' }}>Selected</span>}
                  </span>
                  <span className="font-inter leading-snug mt-0.5" style={{ fontSize: 10.5, color: 'rgba(26,24,22,0.5)' }}>{o.blurb}</span>
                </span>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); previewOpener(o.id) }}
                  className="font-inter flex-none flex items-center gap-1 rounded-full px-3 py-1.5 transition-colors"
                  style={{ fontSize: 9, letterSpacing: '0.1em', color: '#A8854B', background: 'rgba(168,133,75,0.1)', border: '1px solid rgba(168,133,75,0.28)' }}
                  aria-label={`Preview ${o.name}`}
                >
                  Preview
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M2 1.5L6.5 4.5L2 7.5V1.5Z" fill="#A8854B" /></svg>
                </button>
              </motion.div>
            )
          })}
        </div>

        {/* ── Palette ───────────────────────────────────────────────────────── */}
        <div className="mt-6 flex items-center gap-3">
          <span className="font-inter uppercase" style={{ fontSize: 9, letterSpacing: '0.14em', color: 'rgba(26,24,22,0.4)' }}>Palette</span>
          <div className="h-px flex-1" style={{ background: 'rgba(26,24,22,0.08)' }} />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          {PALETTES.map((p) => {
            const on = activePalette === p.id
            return (
              <motion.button key={p.id} type="button" onClick={() => setOpening({ palette: p.id })} aria-pressed={on}
                whileTap={reduced ? {} : { scale: 0.97 }} className="flex items-center gap-3 rounded-2xl p-3 text-left transition-all"
                style={{ background: on ? 'rgba(168,133,75,0.08)' : 'rgba(255,255,255,0.55)', border: on ? `1px solid ${p.accent}` : '1px solid rgba(26,24,22,0.08)' }}>
                <span className="flex-none flex overflow-hidden rounded-full" style={{ width: 30, height: 30, boxShadow: '0 2px 6px rgba(26,24,22,0.12)' }} aria-hidden>
                  {p.swatch.map((c, j) => (<span key={j} style={{ background: c, width: 10, height: 30 }} />))}
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="font-cormorant font-light leading-tight truncate" style={{ fontSize: 13.5, color: '#1A1816' }}>{p.name}</span>
                  {on && <span className="font-inter" style={{ fontSize: 8.5, letterSpacing: '0.1em', color: p.accent }}>Selected</span>}
                </span>
              </motion.button>
            )
          })}
        </div>

        {/* ── Lettering ─────────────────────────────────────────────────────── */}
        <div className="mt-6 flex items-center gap-3">
          <span className="font-inter uppercase" style={{ fontSize: 9, letterSpacing: '0.14em', color: 'rgba(26,24,22,0.4)' }}>Lettering</span>
          <div className="h-px flex-1" style={{ background: 'rgba(26,24,22,0.08)' }} />
        </div>
        <div className="mt-3 flex flex-col gap-2.5">
          {HEADING_FONTS.map((f) => {
            const on = activeFont === f.id
            return (
              <motion.button key={f.id} type="button" onClick={() => setOpening({ heading_font: f.id })} aria-pressed={on}
                whileTap={reduced ? {} : { scale: 0.98 }} className="flex items-center gap-4 rounded-2xl px-4 py-3 text-left transition-all"
                style={{ background: on ? 'rgba(168,133,75,0.08)' : 'rgba(255,255,255,0.55)', border: on ? '1px solid rgba(168,133,75,0.45)' : '1px solid rgba(26,24,22,0.08)' }}>
                {/* heading font sample */}
                <span className="flex-none" style={{ fontFamily: f.var, fontStyle: f.italic ? 'italic' : 'normal', fontSize: `calc(28px * ${f.scale})`, color: on ? '#A8854B' : '#1A1816', lineHeight: 1, minWidth: 90 }}>{f.sample}</span>
                {/* pair label */}
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="font-inter leading-tight truncate" style={{ fontSize: 12, color: on ? '#A8854B' : '#1A1816' }}>{f.name}</span>
                  <span className="font-inter leading-tight truncate mt-0.5" style={{ fontSize: 9.5, letterSpacing: '0.04em', color: on ? 'rgba(168,133,75,0.7)' : 'rgba(26,24,22,0.4)' }}>{f.pair}</span>
                </span>
                {on && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="flex-none">
                    <circle cx="7" cy="7" r="6.5" stroke="#A8854B" />
                    <path d="M4.5 7.5l1.8 1.8L9.5 5" stroke="#A8854B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </motion.button>
            )
          })}
        </div>
      </StepSheet>

      {/* ── Full-screen interactive opener preview ─────────────────────────── */}
      {preview && (
        <motion.div
          className="fixed inset-0 z-[80]"
          initial={{ opacity: 0 }}
          animate={{ opacity: previewLeaving ? 0 : 1 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{ pointerEvents: previewLeaving ? 'none' : 'auto' }}
        >
          <InviteOpener id={preview} theme={openerTheme} names={names} videoSrc={previewFilm?.src} poster={previewFilm?.posterImg} onOpen={closePreview} />
          <button
            type="button" onClick={closePreview} aria-label="Close preview"
            className="absolute top-5 right-5 z-10 flex items-center justify-center rounded-full"
            style={{ width: 34, height: 34, background: 'rgba(0,0,0,0.32)', backdropFilter: 'blur(6px)' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" /></svg>
          </button>
          <span className="absolute top-7 left-5 z-10 font-inter uppercase" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.6)' }}>Preview</span>
        </motion.div>
      )}
    </>
  )
}
