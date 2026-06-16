'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'

// A full-bleed film backdrop that never crops the subject.
//
// User uploads come in any aspect ratio (a portrait phone clip, a landscape
// reel…), and a single object-cover layer crops badly when the video's aspect
// is far from the viewport's — e.g. a portrait clip shows only a thin middle
// band on desktop. Instead we:
//   • show the whole video with object-contain, centered, and
//   • fill the leftover space with a blurred, scaled copy of the poster,
// so it stays edge-to-edge and reads as deliberate rather than letterboxed.
//
// Aspect-aware: when the video already roughly matches the viewport (a
// landscape clip on desktop, any portrait clip on a phone) we switch back to
// object-cover so well-framed videos go truly edge-to-edge with no blur. The
// decision re-runs on metadata load and on resize/orientation change.

// Fraction of the video that stays visible under object-cover, along the
// cropped axis (= min(ratio)/max(ratio)). At/above this we prefer cover; below
// it the crop is severe enough to letterbox instead. 0.8 ≈ "lose up to 20%".
const COVER_MIN = 0.8

export function FilmBackdrop({
  videoSrc,
  poster,
  fallbackStyle,
  autoPlay = true,
  className = '',
  videoRef: externalVideoRef,
}: {
  videoSrc: string | null
  poster: string | null
  /** Gradient (or colour) shown before/behind the video — the base layer. */
  fallbackStyle?: CSSProperties
  autoPlay?: boolean
  className?: string
  /** Optional ref forwarded to the <video> so a parent can control playback. */
  videoRef?: React.RefObject<HTMLVideoElement | null>
}) {
  const localRef = useRef<HTMLVideoElement | null>(null)
  const videoRef = externalVideoRef ?? localRef
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const [fit, setFit] = useState<'cover' | 'contain'>('cover')

  useEffect(() => {
    const decide = () => {
      const v = videoRef.current
      const box = wrapRef.current
      if (!v || !box || !v.videoWidth || !v.videoHeight) return
      const videoRatio = v.videoWidth / v.videoHeight
      const boxRatio = box.clientWidth / box.clientHeight || 1
      const visible = Math.min(videoRatio, boxRatio) / Math.max(videoRatio, boxRatio)
      setFit(visible >= COVER_MIN ? 'cover' : 'contain')
    }
    const v = videoRef.current
    decide()
    v?.addEventListener('loadedmetadata', decide)
    window.addEventListener('resize', decide)
    return () => {
      v?.removeEventListener('loadedmetadata', decide)
      window.removeEventListener('resize', decide)
    }
  }, [videoSrc, videoRef])

  return (
    <div ref={wrapRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* base layer — gradient/colour, also shows through any translucency */}
      {fallbackStyle && <div className="absolute inset-0" style={fallbackStyle} />}

      {/* blurred fill — only visible in the letterbox gaps when fit=contain */}
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
          style={{ objectFit: fit }}
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
