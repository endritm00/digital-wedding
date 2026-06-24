'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useBuilder } from './builder-provider'
import { useFilmVideo } from '@/lib/video/use-film-video'
import { cardLegibility } from '@/lib/invite/legibility'
import {
  VIDEO_PRESETS, MUSIC_TRACKS, SECTION_LABELS,
  PALETTE_MAP, DEFAULT_PALETTE, HEADING_FONT_MAP, DEFAULT_HEADING_FONT,
  DEFAULT_HERO_LAYOUT,
} from '@/lib/builder/presets'
import type { HeroLayout } from '@/lib/builder/presets'
import { MiniFlourish } from '@/components/invite/ornaments'
import { HeroCrest, HeroCorners, HeroFrame } from '@/components/invite/hero-card'

// The live invitation. It fills the viewport; every step's sheet slides over
// it, and answers re-render it in place. ONE background system: real poster
// paints instantly, the 1080p film fades in once it can play. No second layer.

// Stable style identity so the memoized <MiniFlourish> isn't re-rendered on
// every keystroke (a fresh inline object would defeat React.memo's shallow compare).
const FLOURISH_STYLE = { width: 76, height: 'auto' as const, opacity: 0.9 }

function formatDate(iso: string | null): string | null {
  if (!iso) return null
  const d = new Date(`${iso}T12:00:00`)
  if (Number.isNaN(d.getTime())) return null
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function hexA(hex: string, a: number): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

export function InvitePreview() {
  const { invite, opening, sections, media } = useBuilder()
  const reduced = useReducedMotion()
  const [videoReady, setVideoReady] = useState(false)
  // Defer the background film until the step has painted and is interactive. The
  // poster (painted instantly below) holds the frame; with preload="none" no
  // video bytes are fetched until playback is armed here — so opening the builder
  // no longer blocks on a multi-MB film download before you can type.
  const [filmArmed, setFilmArmed] = useState(false)
  useEffect(() => {
    const w = window as typeof window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setFilmArmed(true), { timeout: 900 })
      return () => w.cancelIdleCallback?.(id)
    }
    const t = setTimeout(() => setFilmArmed(true), 400)
    return () => clearTimeout(t)
  }, [])
  // Aspect-aware fit: edge-to-edge cover when the film roughly matches the
  // viewport, whole-frame contain (+ blurred fill) when a crop would be severe.
  const videoElRef = useRef<HTMLVideoElement | null>(null)
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const [autoFit, setAutoFit] = useState<'cover' | 'contain'>('cover')

  const config = (opening?.config ?? {}) as {
    name_a?: string
    name_b?: string
    video_preset?: string
    video_asset_id?: string
    video_fit?: 'auto' | 'blend' | 'crop'
    video_focal?: { x: number; y: number }
    music_track?: string
    music_asset_id?: string
    palette?: string
    heading_font?: string
    hero_layout?: string
  }

  const palette = PALETTE_MAP[config.palette ?? ''] ?? DEFAULT_PALETTE
  const headingFont = HEADING_FONT_MAP[config.heading_font ?? ''] ?? DEFAULT_HEADING_FONT
  const headingStyle = headingFont.italic ? 'italic' : 'normal'
  const darkPaper = !!palette.dark
  // 'open' = names large directly over the film (no card); 'card' = glass card.
  const heroLayout = (config.hero_layout as HeroLayout) ?? DEFAULT_HERO_LAYOUT
  const onFilm = heroLayout === 'open'
  // Universal feathered-glass legibility (matches the public preview hero).
  const leg = cardLegibility({ paper: palette.paper, dark: darkPaper })

  const nameA = (config.name_a ?? '').trim()
  const nameB = (config.name_b ?? '').trim()
  const names =
    nameA && nameB ? `${nameA} & ${nameB}`
    : nameA || nameB ? (nameA || nameB)
    : invite?.display_title?.trim() || 'Your names'
  const isPlaceholder = !nameA && !nameB && !invite?.display_title?.trim()

  const date = formatDate(invite?.event_date ?? null)
  const preset = VIDEO_PRESETS.find((p) => p.id === config.video_preset) ?? null

  const uploadedVideo = useMemo(() => {
    if (!config.video_asset_id) return null
    return media.find((m) => m.id === config.video_asset_id) ?? null
  }, [media, config.video_asset_id])

  const uploadedReady = uploadedVideo?.status === 'ready'
  const uploadedMp4 = uploadedReady
    ? (uploadedVideo!.variants as { mp4?: string }).mp4 ?? null
    : null
  const uploadedHls = uploadedReady
    ? (uploadedVideo!.variants as { hls?: string }).hls ?? null
    : null
  const uploadedPoster = uploadedReady
    ? (uploadedVideo!.variants as { poster?: string }).poster ?? null
    : null

  // Resolve the active film + poster. Uploaded film wins, then chosen preset,
  // then the FIRST preset as the default background — so every step shows a real
  // HD film (not a stretched low-res still) until the couple pick their own.
  // The active film is the chosen preset, or VIDEO_PRESETS[0] as the default
  // background. Resolve src/hls from that SAME preset so a preset without its own
  // HLS uses its own MP4 — never another preset's ladder.
  const activePreset = preset ?? VIDEO_PRESETS[0]
  const videoSrc = uploadedMp4 ?? activePreset.src
  // Prefer adaptive HLS: the couple's own Mux upload while ready, otherwise the
  // active preset's Mux ladder when it has one. Falls back to the MP4 `src`.
  const videoHls = uploadedReady ? uploadedHls : (activePreset.hls ?? null)
  const posterImg = uploadedPoster ?? preset?.posterImg ?? VIDEO_PRESETS[0].posterImg
  const gradient = preset
    ? `linear-gradient(160deg, ${preset.poster.from} 0%, ${preset.poster.to} 100%)`
    : `linear-gradient(160deg, ${VIDEO_PRESETS[0].poster.from} 0%, ${VIDEO_PRESETS[0].poster.to} 100%)`

  // Custom films are framed by the couple (Frame step → video_fit/video_focal,
  // default 'blend'); presets auto-frame per viewport. This drives the live
  // preview so the Frame step updates in real time.
  const filmMode: 'auto' | 'blend' | 'crop' =
    uploadedReady ? (config.video_fit ?? 'auto') : 'auto'

  // Only custom 'blend' adapts per viewport; presets/default ('auto') and 'crop'
  // always fill (cover) — the original behaviour, so landscape presets aren't
  // letterboxed on phones.
  useEffect(() => {
    if (filmMode !== 'blend') return
    const decide = () => {
      const v = videoElRef.current
      const box = wrapRef.current
      if (!v || !box || !v.videoWidth || !v.videoHeight) return
      const videoRatio = v.videoWidth / v.videoHeight
      const boxRatio = box.clientWidth / box.clientHeight || 1
      const visible = Math.min(videoRatio, boxRatio) / Math.max(videoRatio, boxRatio)
      setAutoFit(visible >= 0.8 ? 'cover' : 'contain')   // <0.8 visible ⇒ severe crop ⇒ letterbox
    }
    const v = videoElRef.current
    decide()
    v?.addEventListener('loadedmetadata', decide)
    window.addEventListener('resize', decide)
    return () => {
      v?.removeEventListener('loadedmetadata', decide)
      window.removeEventListener('resize', decide)
    }
  }, [videoSrc, filmMode])

  const fit: 'cover' | 'contain' = filmMode === 'blend' ? autoFit : 'cover'
  const objectPosition =
    filmMode === 'crop' && config.video_focal
      ? `${Math.round(config.video_focal.x * 100)}% ${Math.round(config.video_focal.y * 100)}%`
      : 'center'

  // Adaptive HLS / MP4 source + robust autoplay (gesture retry) for the live
  // background film. Decorative + behind the sheet, so no tap-to-play overlay.
  useFilmVideo(videoElRef, { hls: videoHls, mp4: videoSrc }, { play: filmArmed && !reduced, reduced: !!reduced })

  const track = MUSIC_TRACKS.find((t) => t.id === config.music_track)
  const hasMusic = Boolean(track || config.music_asset_id)
  const enabledSections = sections.filter((s) => s.type !== 'opening')

  return (
    <div ref={wrapRef} className="fixed inset-0 overflow-hidden" aria-hidden="true" style={{ background: palette.paper }}>
      {/* gradient base (no network — always there) */}
      <div className="absolute inset-0" style={{ background: gradient }} />

      {/* real poster — paints immediately, before any video byte loads */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${posterImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: videoReady ? 0 : 1,
          transition: 'opacity 0.8s ease',
        }}
      />

      {/* blurred fill — covers the letterbox gaps when the film is contained */}
      {videoSrc && !reduced && fit === 'contain' && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${posterImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(34px) saturate(1.12) brightness(0.92)',
            transform: 'scale(1.18)',
            opacity: videoReady ? 1 : 0,
            transition: 'opacity 0.8s ease',
          }}
        />
      )}

      {/* the film — lazy, fades in only once it can actually play */}
      {videoSrc && !reduced && (
        <motion.video
          ref={videoElRef}
          key={videoHls ?? videoSrc}
          className="absolute inset-0 h-full w-full"
          style={{ objectFit: fit, objectPosition }}
          poster={posterImg}
          preload="none"
          muted
          loop
          playsInline
          onCanPlay={() => setVideoReady(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: videoReady ? 1 : 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      )}

      {/* legibility wash — IDENTICAL to the published/preview hero (OpeningHero in
          invitation-view.tsx) so the live build preview looks exactly like the final
          invitation. 'open' uses a top→bottom cinematic scrim (names sit over the
          film); 'card' uses the soft radial (a bright centre behind the glass card). */}
      <div
        className="absolute inset-0"
        style={{ background: onFilm
          ? 'linear-gradient(180deg, rgba(12,10,8,0.46) 0%, rgba(12,10,8,0.12) 40%, rgba(12,10,8,0.30) 70%, rgba(12,10,8,0.62) 100%)'
          : 'radial-gradient(ellipse at 50% 40%, rgba(253,252,249,0.08) 0%, rgba(26,24,22,0.38) 100%)' }}
      />


      {/* the invitation card (+ section chips) — top-anchored & compact on mobile
          so it's never hidden behind the sheet; centered on desktop */}
      <div className="absolute inset-0 flex flex-col items-center px-6 pt-[4dvh] lg:justify-center lg:pt-0 lg:px-7 lg:pb-[14dvh]">
        {/* `isolate` creates a stacking context so the glass's zIndex:-1 stays
            behind the text but ABOVE the film — without it the glass escapes and
            paints behind the opaque video (card invisible). Mirrors OpeningHero's
            z-10 card in invitation-view.tsx so the builder matches the preview. */}
        <div className={`relative isolate w-full text-center ${onFilm ? 'max-w-[420px] px-6 py-8 lg:max-w-[560px]' : 'max-w-[330px] px-9 py-9 lg:max-w-[410px] lg:px-10 lg:py-12'}`}>
          {/* CARD-only chrome — feathered glass + engraved frame + corner flourishes
              + crest. 'open' shows the names directly on the film with none of it. */}
          {!onFilm && (
            <>
              <div aria-hidden className="absolute inset-0" style={{ ...leg.glass, zIndex: -1 }} />
              <HeroFrame color={palette.accent} />
              <HeroCorners color={palette.accent} />
              <HeroCrest color={palette.accent} />
            </>
          )}
          <span
            className={`font-inter uppercase block ${onFilm ? '' : 'mt-3'}`}
            style={{ fontSize: onFilm ? 11 : 9, fontWeight: onFilm ? 500 : 400, letterSpacing: onFilm ? '0.28em' : '0.32em',
              color: onFilm ? 'rgba(253,252,249,0.96)' : (darkPaper ? 'rgba(236,234,227,0.7)' : 'rgba(26,24,22,0.5)'),
              textShadow: onFilm ? '0 1px 3px rgba(0,0,0,0.6), 0 2px 16px rgba(0,0,0,0.5)' : leg.textShadow }}
          >
            You are invited to the wedding of
          </span>

          <div className="my-4 lg:my-6 flex min-h-[52px] lg:min-h-[80px] items-center justify-center">
            {/* Key on the FONT only — not the names. Keying on `names` re-fired
                this exit/enter animation on every keystroke (a measured per-char
                main-thread hitch); the heading still updates its text live, it
                just animates only when the lettering actually changes. */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.h2
                key={headingFont.id}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: headingFont.var,
                  fontStyle: headingStyle,
                  fontSize: `calc(clamp(${onFilm ? '2rem' : '1.7rem'}, ${onFilm ? '9vw' : '7.2vw'}, ${onFilm ? '3.6rem' : '2.9rem'}) * ${headingFont.scale})`,
                  lineHeight: onFilm ? 0.98 : 1.05,
                  color: onFilm
                    ? (isPlaceholder ? 'rgba(253,252,249,0.55)' : palette.accent)
                    : (isPlaceholder ? (darkPaper ? 'rgba(236,234,227,0.45)' : 'rgba(26,24,22,0.4)') : palette.accent),
                  letterSpacing: onFilm ? '0.005em' : '0.01em',
                  textShadow: onFilm ? '0 2px 10px rgba(0,0,0,0.45), 0 2px 30px rgba(0,0,0,0.5)' : leg.textShadow,
                }}
              >
                {names}
              </motion.h2>
            </AnimatePresence>
          </div>

          <MiniFlourish color={palette.accent} className="mx-auto mb-5" style={FLOURISH_STYLE} />

          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={date ?? 'no-date'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="font-cormorant italic font-light"
              style={{
                fontSize: 18,
                color: onFilm
                  ? (date ? 'rgba(253,252,249,0.92)' : 'rgba(253,252,249,0.55)')
                  : (date ? (darkPaper ? 'rgba(236,234,227,0.9)' : 'rgba(26,24,22,0.82)') : (darkPaper ? 'rgba(236,234,227,0.42)' : 'rgba(26,24,22,0.36)')),
                textShadow: onFilm ? '0 1px 14px rgba(0,0,0,0.5)' : leg.textShadow,
              }}
            >
              {date ?? 'Your wedding day'}
            </motion.p>
          </AnimatePresence>

          {invite?.venue_name ? (
            <p
              className="font-inter mt-2"
              style={{ fontSize: 11, letterSpacing: '0.08em',
                color: onFilm ? 'rgba(253,252,249,0.78)' : (darkPaper ? 'rgba(236,234,227,0.66)' : 'rgba(26,24,22,0.6)'),
                textShadow: onFilm ? '0 1px 14px rgba(0,0,0,0.5)' : leg.textShadow }}
            >
              {invite.venue_name}
            </p>
          ) : null}

          {hasMusic && (
            <div className="mt-5 lg:mt-7 flex items-center justify-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={reduced ? { opacity: 0.6 } : { scaleY: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
                  style={{
                    width: 2, height: 11, borderRadius: 2,
                    background: palette.accent, opacity: 0.65,
                    transformOrigin: 'bottom', display: 'inline-block',
                  }}
                />
              ))}
              {track && (
                <span className="font-inter ml-2" style={{ fontSize: 9, letterSpacing: '0.12em', color: darkPaper ? 'rgba(236,234,227,0.4)' : 'rgba(26,24,22,0.4)' }}>
                  {track.title}
                </span>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
