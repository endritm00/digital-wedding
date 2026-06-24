'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useFilmVideo } from '@/lib/video/use-film-video'

// A full-bleed film backdrop with three framing modes.
//
// User uploads come in any aspect ratio, and a single object-cover layer crops
// badly when the video's aspect is far from the viewport's — e.g. a portrait
// clip shows only a thin middle band on desktop. The couple choose how to frame
// their own film in the builder's "Frame your film" step:
//
//   • 'blend' — "show it all": adapt per viewport. Fill (cover) when the film
//     roughly matches the screen (so phones stay edge-to-edge), and only fall
//     back to whole-frame contain + blurred fill when a cover crop would be
//     severe (e.g. a portrait clip on a wide desktop). Nothing important is cut.
//   • 'crop'  — fill the screen (object-cover) with a chosen focal point
//     (object-position) deciding what stays in frame.
//   • 'auto'  — always fill (cover), like the original behaviour. Used for the
//     curated (landscape) presets and the default background, which the couple
//     don't frame themselves and which are chosen to look good filled/cropped.

export type FilmFit = 'auto' | 'blend' | 'crop'
export interface FilmFocal { x: number; y: number }   // 0..1, object-position

// Fraction of the video that stays visible under object-cover, along the cropped
// axis (= min(ratio)/max(ratio)). At/above this, 'auto' prefers cover; below it
// the crop is severe enough to letterbox instead. 0.8 ≈ "lose up to 20%".
const COVER_MIN = 0.8

export function FilmBackdrop({
  videoSrc,
  hlsSrc = null,
  poster,
  fallbackStyle,
  mode = 'auto',
  focal,
  autoPlay = true,
  reduced = false,
  className = '',
  videoRef: externalVideoRef,
}: {
  videoSrc: string | null
  /** Adaptive HLS playlist (Mux .m3u8) — preferred when present for smooth full HD. */
  hlsSrc?: string | null
  poster: string | null
  /** Gradient (or colour) shown before/behind the video — the base layer. */
  fallbackStyle?: CSSProperties
  /** How to frame the film. Defaults to 'auto' (per-viewport). */
  mode?: FilmFit
  /** Focal point for 'crop' mode (0..1). Defaults to centre. */
  focal?: FilmFocal | null
  autoPlay?: boolean
  /** prefers-reduced-motion — don't autoplay, but still offer a tap-to-play. */
  reduced?: boolean
  className?: string
  /** Optional ref forwarded to the <video> so a parent can control playback. */
  videoRef?: React.RefObject<HTMLVideoElement | null>
}) {
  const localRef = useRef<HTMLVideoElement | null>(null)
  const videoRef = externalVideoRef ?? localRef
  const wrapRef = useRef<HTMLDivElement | null>(null)

  // Bulletproof, adaptive playback (HLS when available, MP4 fallback, gesture
  // retry on autoplay-blocked devices).
  const { needsTap, playNow } = useFilmVideo(
    videoRef,
    { hls: hlsSrc, mp4: videoSrc },
    { play: autoPlay, reduced }
  )
  // Hidden field diagnostics — append ?vdebug=1 to the URL to overlay the exact
  // source path + the precise reason iOS rejected play() (so we can tell a real
  // code bug apart from an OS-level block like Low Power Mode).
  const [showDebug, setShowDebug] = useState(false)
  useEffect(() => {
    try { setShowDebug(new URLSearchParams(window.location.search).has('vdebug')) } catch { /* noop */ }
  }, [])
  // Resolved fit for 'auto' mode; ignored when mode is explicit.
  const [autoFit, setAutoFit] = useState<'cover' | 'contain'>('cover')

  // Only 'blend' adapts per viewport (fill when the film roughly matches the
  // screen, else contain+blur when a cover crop would be severe). 'auto' (curated
  // presets / default background) and 'crop' always fill (cover) — exactly the
  // original behaviour — so landscape presets aren't letterboxed on phones.
  useEffect(() => {
    if (mode !== 'blend') return
    const decide = () => {
      const v = videoRef.current
      const box = wrapRef.current
      if (!v || !box || !v.videoWidth || !v.videoHeight) return
      const videoRatio = v.videoWidth / v.videoHeight
      const boxRatio = box.clientWidth / box.clientHeight || 1
      const visible = Math.min(videoRatio, boxRatio) / Math.max(videoRatio, boxRatio)
      setAutoFit(visible >= COVER_MIN ? 'cover' : 'contain')
    }
    const v = videoRef.current
    decide()
    v?.addEventListener('loadedmetadata', decide)
    window.addEventListener('resize', decide)
    return () => {
      v?.removeEventListener('loadedmetadata', decide)
      window.removeEventListener('resize', decide)
    }
  }, [videoSrc, videoRef, mode])

  const fit: 'cover' | 'contain' = mode === 'blend' ? autoFit : 'cover'
  const objectPosition =
    mode === 'crop' && focal
      ? `${Math.round(focal.x * 100)}% ${Math.round(focal.y * 100)}%`
      : 'center'

  return (
    <div ref={wrapRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* base layer — gradient/colour, also shows through any translucency */}
      {fallbackStyle && <div className="absolute inset-0" style={fallbackStyle} />}

      {/* blurred fill — only visible in the letterbox gaps when contained */}
      {videoSrc && poster && fit === 'contain' && (
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            backgroundImage: `url(${poster})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(34px) saturate(1.12) brightness(0.92)',
            transform: 'scale(1.18)',          // hide the blur's soft edge bleed
          }}
        />
      )}

      {/* the film itself — whole-frame (contain) or edge-to-edge (cover).
          Source is attached by useFilmVideo (HLS/MP4), so no `src` here. */}
      {videoSrc && (
        <video
          ref={videoRef}
          key={hlsSrc ?? videoSrc}
          className="absolute inset-0 h-full w-full"
          style={{ objectFit: fit, objectPosition }}
          poster={poster ?? undefined}
          preload="metadata"
          muted
          loop
          playsInline
        />
      )}

      {/* tap-to-play — only when the browser blocked autoplay (Low-Power Mode,
          reduced-motion). A single tap anywhere also starts it. */}
      {videoSrc && needsTap && (
        <button
          type="button"
          onClick={playNow}
          aria-label="Play film"
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <span className="flex flex-col items-center gap-3">
            <span
              className="flex items-center justify-center rounded-full"
              style={{
                width: 64, height: 64,
                background: 'rgba(20,16,12,0.42)',
                backdropFilter: 'blur(6px)',
                border: '1px solid rgba(255,255,255,0.55)',
              }}
            >
              <svg width="22" height="24" viewBox="0 0 22 24" fill="none" aria-hidden>
                <path d="M3 2.5L19 12L3 21.5V2.5Z" fill="rgba(255,255,255,0.92)" />
              </svg>
            </span>
            <span className="font-inter uppercase" style={{ fontSize: 9, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.8)', textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}>
              Tap to play
            </span>
          </span>
        </button>
      )}

      {showDebug && <VideoDebug videoRef={videoRef} />}
    </div>
  )
}

// Diagnostics overlay (only when ?vdebug=1). Shows which source path the device
// took, the live <video> state, and the exact play() rejection — enough to tell
// an OS-level block (e.g. Low Power Mode → NotAllowedError on a muted video) from
// an actual code bug. Calls play() itself to capture iOS's precise error string.
function VideoDebug({ videoRef }: { videoRef: React.RefObject<HTMLVideoElement | null> }) {
  const [info, setInfo] = useState<Record<string, unknown>>({})
  useEffect(() => {
    let playResult = '(pending)'
    const v = videoRef.current
    const read = () => {
      const el = videoRef.current
      if (!el) return
      const src = el.currentSrc || el.src || ''
      const mode = src.startsWith('blob:') ? 'hls.js (MSE)'
        : src.endsWith('.m3u8') ? 'native HLS'
        : src.includes('.mp4') ? 'MP4'
        : src ? 'other' : 'none'
      setInfo({
        path: mode,
        'play()': playResult,
        muted: el.muted,
        playsInline: el.playsInline,
        paused: el.paused,
        readyState: el.readyState,
        networkState: el.networkState,
        t: +el.currentTime.toFixed(2),
        src: src.slice(0, 64),
      })
    }
    if (v) {
      v.muted = true
      v.play().then(() => { playResult = 'OK (playing)'; read() }).catch((e) => { playResult = `${e?.name}: ${e?.message}`.slice(0, 90); read() })
    }
    const id = window.setInterval(read, 700)
    read()
    return () => window.clearInterval(id)
  }, [videoRef])
  return (
    <div
      className="absolute left-0 top-0 z-[60] m-2 rounded"
      style={{ maxWidth: '94vw', background: 'rgba(0,0,0,0.82)', color: '#3ff07a', font: '11px/1.5 ui-monospace, monospace', padding: '8px 10px', whiteSpace: 'pre-wrap', pointerEvents: 'none' }}
    >
      {Object.entries(info).map(([k, val]) => `${k}: ${String(val)}`).join('\n')}
      {`\nUA: ${typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 90) : ''}`}
    </div>
  )
}
