'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { OpenerProps } from './shared'
import { ENVELOPE_DESKTOP, ENVELOPE_MOBILE, type EnvelopeFilm } from '@/lib/invite/envelope-video'
import { useFilmVideo } from '@/lib/video/use-film-video'

// ════════════════════════════════════════════════════════════════════════════════
// THE LETTER — a filmed wax-sealed envelope (hosted on Mux). Tap to play: the
// envelope opens and blooms to white light over ~5s. We start handing off to the
// invitation while that light is near its peak, so the parent's slow opacity fade
// reads as the light dissolving INTO the (already-playing) invitation film behind
// it — one continuous gesture, never a cut.
//
// Why a video, not the wedding film inside the opener: in the real invite the
// OpeningHero sits directly behind this overlay with the couple's film already
// rolling. So we render ONLY the envelope here — no duplicate film decode — and
// let the cross-dissolve reveal what's behind. HLS-first playback keeps it light
// on older phones and slow links (ABR drops to a low rendition; poster covers the
// first instant; a safety timer guarantees the guest is never stranded).
// ════════════════════════════════════════════════════════════════════════════════

// Begin the dissolve this many seconds before the clip ends — by then it's near
// pure white, so the seam is invisible.
const HANDOFF_LEAD = 0.7

export function VideoEnvelopeOpener({ theme, names, onOpen }: OpenerProps) {
  const reduced = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [opening, setOpening] = useState(false)
  const handedOff = useRef(false)

  // Pick the cut that matches this viewport's orientation (portrait → the phone
  // cut, landscape → the wide cut). Re-evaluated only when orientation actually
  // flips, so an incidental resize never reloads the film mid-play.
  const [film, setFilm] = useState<EnvelopeFilm>(ENVELOPE_DESKTOP)
  useEffect(() => {
    const portrait = window.matchMedia('(orientation: portrait)')
    const apply = () => setFilm(portrait.matches ? ENVELOPE_MOBILE : ENVELOPE_DESKTOP)
    apply()
    portrait.addEventListener('change', apply)
    return () => portrait.removeEventListener('change', apply)
  }, [])

  // HLS-first source + reliable play. Source attaches on mount (preloads while the
  // poster shows); playback only starts once `opening` flips on the guest's tap —
  // a real user gesture, so play() is unlocked.
  useFilmVideo(videoRef, { hls: film.hls, mp4: film.mp4 }, { play: opening })

  const handoff = useCallback(() => {
    if (handedOff.current) return
    handedOff.current = true
    onOpen()
  }, [onOpen])

  const open = () => {
    if (opening || handedOff.current) return
    setOpening(true)
    // Reduced motion: skip the 5s reveal and dissolve straight to the invitation.
    if (reduced) { handoff(); return }
    // Kick playback synchronously, inside the tap's activation window — the most
    // reliable trigger across autoplay policies (incl. iOS Low-Power Mode, which
    // blocks even muted autoplay but always honours a play() called from a tap).
    const v = videoRef.current
    if (v) { v.muted = true; void v.play().catch(() => {}) }
  }

  // While the film plays, watch for the white climax (or the end / an error) and
  // hand off. A safety timer covers a stalled or un-decodable clip.
  useEffect(() => {
    if (!opening || reduced) return
    const v = videoRef.current
    if (!v) return
    const guard = window.setTimeout(handoff, (film.duration + 2) * 1000)
    const onTime = () => {
      const dur = Number.isFinite(v.duration) && v.duration > 0 ? v.duration : film.duration
      if (v.currentTime >= dur - HANDOFF_LEAD) handoff()
    }
    const onEnd = () => handoff()
    v.addEventListener('timeupdate', onTime)
    v.addEventListener('ended', onEnd)
    v.addEventListener('error', onEnd)
    return () => {
      window.clearTimeout(guard)
      v.removeEventListener('timeupdate', onTime)
      v.removeEventListener('ended', onEnd)
      v.removeEventListener('error', onEnd)
    }
  }, [opening, reduced, film.duration, handoff])

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: '#000' }}>
      <video
        ref={videoRef}
        key={film.hls}
        className="absolute inset-0 h-full w-full"
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        poster={film.poster}
        preload="auto"
        muted
        playsInline
      />

      {/* personalised greeting — fades the instant they tap */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-[9%] z-20 flex flex-col items-center px-6 text-center"
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <p className="font-inter uppercase" style={{ fontSize: 9, letterSpacing: '0.34em', color: 'rgba(255,255,255,0.72)', textShadow: '0 1px 14px rgba(0,0,0,0.55)' }}>
          You are invited
        </p>
        <p className="mt-3" style={{ fontFamily: theme.font, fontStyle: theme.fontStyle, fontSize: 'clamp(1.8rem, 7vw, 2.8rem)', color: '#fff', lineHeight: 1.05, textShadow: '0 2px 28px rgba(0,0,0,0.6)' }}>
          {names}
        </p>
      </motion.div>

      {/* full-screen tap target + a gentle pulsing hint */}
      {!opening && (
        <button
          type="button"
          onClick={open}
          className="absolute inset-0 z-30 flex flex-col items-center justify-end pb-[9%] focus-visible:outline-none"
          aria-label="Open the invitation"
        >
          <motion.span
            className="flex items-center justify-center rounded-full"
            style={{ width: 46, height: 46, border: '1px solid rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)' }}
            animate={reduced ? {} : { scale: [1, 1.1, 1], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden>
              <circle cx="8.5" cy="8.5" r="2.4" fill="#fff" />
              <circle cx="8.5" cy="8.5" r="6" stroke="#fff" strokeOpacity="0.6" strokeWidth="1" />
            </svg>
          </motion.span>
          <span className="font-inter uppercase mt-2.5" style={{ fontSize: 9, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.82)', textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}>
            Tap to open
          </span>
        </button>
      )}
    </div>
  )
}
