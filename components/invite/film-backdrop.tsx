'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'

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
  poster,
  fallbackStyle,
  mode = 'auto',
  focal,
  autoPlay = true,
  className = '',
  videoRef: externalVideoRef,
}: {
  videoSrc: string | null
  poster: string | null
  /** Gradient (or colour) shown before/behind the video — the base layer. */
  fallbackStyle?: CSSProperties
  /** How to frame the film. Defaults to 'auto' (per-viewport). */
  mode?: FilmFit
  /** Focal point for 'crop' mode (0..1). Defaults to centre. */
  focal?: FilmFocal | null
  autoPlay?: boolean
  className?: string
  /** Optional ref forwarded to the <video> so a parent can control playback. */
  videoRef?: React.RefObject<HTMLVideoElement | null>
}) {
  const localRef = useRef<HTMLVideoElement | null>(null)
  const videoRef = externalVideoRef ?? localRef
  const wrapRef = useRef<HTMLDivElement | null>(null)
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

      {/* the film itself — whole-frame (contain) or edge-to-edge (cover) */}
      {videoSrc && (
        <video
          ref={videoRef}
          key={videoSrc}
          className="absolute inset-0 h-full w-full"
          style={{ objectFit: fit, objectPosition }}
          src={videoSrc}
          poster={poster ?? undefined}
          autoPlay={autoPlay}
          muted
          loop
          playsInline
        />
      )}
    </div>
  )
}
