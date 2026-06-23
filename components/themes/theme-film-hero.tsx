'use client'

import { useEffect, useRef, useState } from 'react'
import { useFilmVideo } from '@/lib/video/use-film-video'

// The opening film, played behind the theme detail hero so the design is shown
// SHARP (the poster stills look soft at full-bleed). This lives ONLY on the
// /themes/[slug] page, so no video is fetched anywhere else — the film loads
// once the theme is actually open.
//
// Reuses useFilmVideo: adaptive HLS (light on slow links, climbs to 1080p on
// capable ones) with an MP4 fallback for the curated presets that have no HLS,
// plus the background-resume handling. The poster paints instantly underneath
// and the film cross-fades in once it can play; reduced-motion keeps the still.
export function ThemeFilmHero({
  hls,
  mp4,
  posterImg,
  posterFrom,
  posterTo,
  alt,
}: {
  hls: string | null
  mp4: string
  posterImg: string
  posterFrom: string
  posterTo: string
  alt: string
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [ready, setReady] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduced(mq.matches)
    apply()
    mq.addEventListener?.('change', apply)
    return () => mq.removeEventListener?.('change', apply)
  }, [])

  // The hook owns the <video> src (hls vs mp4) and playback.
  useFilmVideo(videoRef, { hls, mp4 }, { play: !reduced, reduced })

  return (
    <>
      {/* gradient base — paints with zero network */}
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(160deg, ${posterFrom}, ${posterTo})` }}
        aria-hidden="true"
      />
      {/* poster still — instant, fades out as the film takes over */}
      <img
        src={posterImg}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        decoding="async"
        style={{ opacity: ready ? 0 : 1, transition: 'opacity 1s ease' }}
      />
      {!reduced && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          poster={posterImg}
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setReady(true)}
          style={{
            opacity: ready ? 1 : 0,
            transition: 'opacity 1.2s ease',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
        />
      )}
    </>
  )
}
