'use client'

import { useEffect, useState, type RefObject } from 'react'

// One reliable way to play the wedding film on every device.
//
// Why this exists: a plain <video autoPlay muted playsInline> looks correct but
// silently fails for a meaningful slice of real phones —
//   • iOS Low-Power Mode blocks ALL autoplay, even muted, with no error;
//   • some in-app browsers / reduced-data modes refuse the first play();
//   • a single progressive 1080p MP4 stalls on a weak mobile connection ("lag").
// The creator never sees it because their device/network is the happy path.
//
// This hook fixes both halves:
//   1. SMOOTH + FULL-HD — prefers HLS (adaptive bitrate) when the asset has it:
//      native HLS on Safari/iOS, hls.js everywhere else. ABR starts at a low
//      rendition (instant first frame) and climbs to 1080p as bandwidth allows,
//      so it never buffers mid-film. Falls back to the MP4 when there's no HLS
//      (curated presets) or HLS can't run.
//   2. ALWAYS PLAYS — calls play() programmatically, and if the browser blocks
//      it, arms a one-time global gesture listener (the next tap/scroll/keypress
//      anywhere starts the film) and reports `needsTap` so the UI can offer an
//      explicit play affordance. Also retries when the tab becomes visible.

export interface FilmSources {
  /** Adaptive HLS playlist (Mux .m3u8). Preferred when present. */
  hls?: string | null
  /** Progressive MP4 (Mux capped-1080p or a preset file). Fallback. */
  mp4?: string | null
}

interface Options {
  /** Whether the film should be playing right now. Default true. */
  play?: boolean
  /** Honour prefers-reduced-motion: don't autoplay, but still allow a tap. */
  reduced?: boolean
}

// hls.js is loaded lazily (only when a device needs it) and cached across calls.
let hlsCtorPromise: Promise<typeof import('hls.js').default | null> | null = null
function loadHls() {
  if (!hlsCtorPromise) {
    hlsCtorPromise = import('hls.js')
      .then((m) => m.default)
      .catch(() => null)
  }
  return hlsCtorPromise
}

export function useFilmVideo(
  ref: RefObject<HTMLVideoElement | null>,
  sources: FilmSources,
  { play = true, reduced = false }: Options = {}
): { needsTap: boolean; playNow: () => void } {
  const [needsTap, setNeedsTap] = useState(false)
  const hls = sources.hls ?? null
  const mp4 = sources.mp4 ?? null
  const srcKey = `${hls ?? ''}|${mp4 ?? ''}`

  // ── attach the best source for this device ──────────────────────────────────
  useEffect(() => {
    const video = ref.current
    if (!video || (!hls && !mp4)) return

    let destroyed = false
    let hlsInstance: import('hls.js').default | null = null

    const setMp4 = () => {
      if (mp4 && video.src !== mp4) video.src = mp4
    }

    const nativeHls = hls && video.canPlayType('application/vnd.apple.mpegurl') !== ''
    if (hls && nativeHls) {
      // Safari / iOS — native adaptive HLS, no library needed.
      video.src = hls
    } else if (hls) {
      // Non-Safari (Android Chrome, desktop Chrome/Firefox) — use hls.js. Only
      // fall back to the MP4 if hls.js is unavailable or hits a fatal error, so
      // we don't double-download both renditions on the happy path. The poster
      // covers the brief moment while hls.js is imported.
      void loadHls().then((Hls) => {
        if (destroyed) return
        if (!Hls || !Hls.isSupported()) { setMp4(); return }
        try {
          hlsInstance = new Hls({ enableWorker: true, lowLatencyMode: false })
          hlsInstance.on(Hls.Events.ERROR, (_e, data) => {
            if (data.fatal) { try { hlsInstance?.destroy() } catch { /* noop */ } ; hlsInstance = null; setMp4() }
          })
          hlsInstance.loadSource(hls)
          hlsInstance.attachMedia(video)
        } catch { setMp4() }
      })
    } else {
      setMp4()
    }

    return () => {
      destroyed = true
      if (hlsInstance) { try { hlsInstance.destroy() } catch { /* noop */ } }
    }
  }, [ref, srcKey, hls, mp4])

  // ── guarantee playback ──────────────────────────────────────────────────────
  useEffect(() => {
    const video = ref.current
    if (!video) return

    if (!play || reduced) {
      try { video.pause() } catch { /* noop */ }
      if (reduced) setNeedsTap(true)
      return
    }

    let cleanedUp = false
    let removeGesture: (() => void) | null = null

    const armGesture = () => {
      if (removeGesture) return
      setNeedsTap(true)
      const onGesture = () => {
        video.play().then(() => {
          setNeedsTap(false)
          removeGesture?.()
        }).catch(() => { /* still blocked — keep the listener armed */ })
      }
      const events: (keyof DocumentEventMap)[] = ['pointerdown', 'touchstart', 'keydown', 'click']
      events.forEach((e) => document.addEventListener(e, onGesture, { passive: true }))
      removeGesture = () => {
        events.forEach((e) => document.removeEventListener(e, onGesture))
        removeGesture = null
      }
    }

    const tryPlay = () => {
      if (cleanedUp) return
      const p = video.play()
      if (p && typeof p.then === 'function') {
        p.then(() => setNeedsTap(false)).catch(() => armGesture())
      }
    }

    const onLoaded = () => tryPlay()
    const onVisible = () => { if (document.visibilityState === 'visible') tryPlay() }

    video.addEventListener('loadedmetadata', onLoaded)
    video.addEventListener('canplay', onLoaded)
    document.addEventListener('visibilitychange', onVisible)
    // Element may already be ready (cached) — try immediately.
    if (video.readyState >= 2) tryPlay()
    else tryPlay()

    return () => {
      cleanedUp = true
      video.removeEventListener('loadedmetadata', onLoaded)
      video.removeEventListener('canplay', onLoaded)
      document.removeEventListener('visibilitychange', onVisible)
      removeGesture?.()
    }
  }, [ref, srcKey, play, reduced])

  const playNow = () => {
    const video = ref.current
    if (!video) return
    video.play().then(() => setNeedsTap(false)).catch(() => { /* noop */ })
  }

  return { needsTap, playNow }
}
