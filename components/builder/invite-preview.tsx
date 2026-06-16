'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useBuilder } from './builder-provider'
import {
  VIDEO_PRESETS, MUSIC_TRACKS, SECTION_LABELS,
  PALETTE_MAP, DEFAULT_PALETTE, HEADING_FONT_MAP, DEFAULT_HEADING_FONT,
} from '@/lib/builder/presets'

// The live invitation. It fills the viewport; every step's sheet slides over
// it, and answers re-render it in place. ONE background system: real poster
// paints instantly, the 1080p film fades in once it can play. No second layer.

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
  }

  const palette = PALETTE_MAP[config.palette ?? ''] ?? DEFAULT_PALETTE
  const headingFont = HEADING_FONT_MAP[config.heading_font ?? ''] ?? DEFAULT_HEADING_FONT
  const headingStyle = headingFont.italic ? 'italic' : 'normal'
  const darkPaper = !!palette.dark

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
  const uploadedBusy =
    uploadedVideo != null &&
    (uploadedVideo.status === 'uploading' || uploadedVideo.status === 'processing')
  const uploadedMp4 = uploadedReady
    ? (uploadedVideo!.variants as { mp4?: string }).mp4 ?? null
    : null
  const uploadedPoster = uploadedReady
    ? (uploadedVideo!.variants as { poster?: string }).poster ?? null
    : null

  // Resolve the active film + poster. Uploaded film wins, then chosen preset,
  // then the FIRST preset as the default background — so every step shows a real
  // HD film (not a stretched low-res still) until the couple pick their own.
  const videoSrc = uploadedMp4 ?? preset?.src ?? VIDEO_PRESETS[0].src
  const posterImg = uploadedPoster ?? preset?.posterImg ?? VIDEO_PRESETS[0].posterImg
  const gradient = preset
    ? `linear-gradient(160deg, ${preset.poster.from} 0%, ${preset.poster.to} 100%)`
    : `linear-gradient(160deg, ${VIDEO_PRESETS[0].poster.from} 0%, ${VIDEO_PRESETS[0].poster.to} 100%)`

  // Custom films are framed by the couple (Frame step → video_fit/video_focal,
  // default 'blend'); presets auto-frame per viewport. This drives the live
  // preview so the Frame step updates in real time.
  const filmMode: 'auto' | 'blend' | 'crop' =
    uploadedReady ? (config.video_fit ?? 'blend') : 'auto'

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
          key={videoSrc}
          className="absolute inset-0 h-full w-full"
          style={{ objectFit: fit, objectPosition }}
          src={videoSrc}
          poster={posterImg}
          preload="auto"
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoReady(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: videoReady ? 1 : 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      )}

      {/* legibility wash, tuned per paper tone */}
      <div
        className="absolute inset-0"
        style={{
          background: darkPaper
            ? 'radial-gradient(ellipse at 50% 42%, rgba(20,14,10,0.18) 0%, rgba(20,14,10,0.58) 100%)'
            : 'radial-gradient(ellipse at 50% 42%, rgba(20,14,10,0.10) 0%, rgba(20,14,10,0.42) 100%)',
        }}
      />

      {/* processing veil for an uploading film */}
      <AnimatePresence>
        {uploadedBusy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-x-0 top-[12dvh] flex justify-center"
          >
            <div
              className="rounded-full px-5 py-2.5"
              style={{ background: 'rgba(253,252,249,0.82)', backdropFilter: 'blur(6px)' }}
            >
              <span className="font-inter text-[11px] tracking-[0.08em]" style={{ color: '#1A1816' }}>
                We&rsquo;re preparing your film — you can keep going.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* the invitation card (+ section chips) — top-anchored & compact on mobile
          so it's never hidden behind the sheet; centered on desktop */}
      <div className="absolute inset-0 flex flex-col items-center px-6 pt-[4dvh] lg:justify-center lg:pt-0 lg:px-7 lg:pb-[14dvh]">
        <div
          className="w-full max-w-[320px] px-7 py-8 lg:max-w-[400px] lg:px-8 lg:py-12 text-center"
          style={{
            background: hexA(palette.paper, darkPaper ? 0.9 : 0.93),
            backdropFilter: 'blur(16px)',
            borderRadius: 18,
            boxShadow: '0 24px 80px rgba(26,24,22,0.22), 0 4px 16px rgba(26,24,22,0.08)',
            border: `1px solid ${palette.accentSoft}`,
          }}
        >
          <span
            className="font-inter uppercase"
            style={{ fontSize: 9, letterSpacing: '0.3em', color: darkPaper ? 'rgba(236,234,227,0.5)' : 'rgba(26,24,22,0.34)' }}
          >
            Together with their families
          </span>

          <div className="my-4 lg:my-6 flex min-h-[52px] lg:min-h-[80px] items-center justify-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.h2
                key={names + headingFont.id}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: headingFont.var,
                  fontStyle: headingStyle,
                  fontSize: `calc(clamp(1.7rem, 7.2vw, 2.9rem) * ${headingFont.scale})`,
                  lineHeight: 1.05,
                  color: isPlaceholder
                    ? (darkPaper ? 'rgba(236,234,227,0.3)' : 'rgba(26,24,22,0.26)')
                    : palette.accent,
                  letterSpacing: '0.01em',
                }}
              >
                {names}
              </motion.h2>
            </AnimatePresence>
          </div>

          <div className="mx-auto mb-5" style={{ width: 60, height: 1, background: `linear-gradient(90deg, transparent, ${palette.accent}, transparent)` }} />

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
                color: date
                  ? (darkPaper ? 'rgba(236,234,227,0.72)' : 'rgba(26,24,22,0.72)')
                  : (darkPaper ? 'rgba(236,234,227,0.3)' : 'rgba(26,24,22,0.24)'),
              }}
            >
              {date ?? 'Your wedding day'}
            </motion.p>
          </AnimatePresence>

          {invite?.venue_name ? (
            <p
              className="font-inter mt-2"
              style={{ fontSize: 11, letterSpacing: '0.08em', color: darkPaper ? 'rgba(236,234,227,0.45)' : 'rgba(26,24,22,0.45)' }}
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

        {/* enabled sections as small chips, directly under the card */}
        {enabledSections.length > 0 && (
          <div className="mt-3 flex max-w-[92vw] flex-wrap justify-center gap-1.5">
            {enabledSections.map((s, i) => (
              <motion.div
                key={s.id}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
                className="rounded-full px-2.5 py-1"
                style={{
                  background: hexA(palette.washAlt, darkPaper ? 0.85 : 0.92),
                  boxShadow: '0 2px 10px rgba(26,24,22,0.08)',
                  border: `1px solid ${palette.accentSoft}`,
                }}
              >
                <span
                  className="font-inter uppercase whitespace-nowrap"
                  style={{ fontSize: 8, letterSpacing: '0.16em', color: darkPaper ? 'rgba(236,234,227,0.6)' : 'rgba(26,24,22,0.5)' }}
                >
                  {SECTION_LABELS[s.type] ?? s.type}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
