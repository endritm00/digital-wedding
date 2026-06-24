'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'

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
// We use the LIGHT build — it drops EME/DRM, subtitles, and alternate-audio
// controllers the muted background films never use, cutting the chunk that the
// guest invite parses (the Mux envelope opener is HLS) by ~30%. Same core ABR +
// error-recovery API (startLoad / recoverMediaError) we rely on.
let hlsCtorPromise: Promise<typeof import('hls.js').default | null> | null = null
function loadHls() {
  if (!hlsCtorPromise) {
    hlsCtorPromise = import('hls.js/light')
      .then((m) => m.default)
      .catch(() => null)
  }
  return hlsCtorPromise
}

// React's `muted` JSX prop does NOT reliably set the DOM `muted` PROPERTY, and a
// video the browser considers un-muted is blocked from autoplay on every mobile
// browser (it freezes on the poster with a dead play button). Forcing the element
// into a guaranteed muted + inline state imperatively is the single most important
// fix — every play() path below calls this first.
function hardenForAutoplay(video: HTMLVideoElement) {
  video.muted = true
  video.defaultMuted = true
  video.setAttribute('muted', '')
  video.playsInline = true
  video.setAttribute('playsinline', '')
  video.setAttribute('webkit-playsinline', '')        // legacy iOS
  video.setAttribute('disablepictureinpicture', '')
  video.setAttribute('disableremoteplayback', '')     // steadies iOS ManagedMediaSource
}

// Apple devices (iPhone/iPad/desktop Safari) where NATIVE HLS is both high-quality
// (real ABR) AND autoplay-reliable, while hls.js over MSE/ManagedMediaSource is
// autoplay-fragile. On these we attach the .m3u8 straight to video.src instead of
// running hls.js — this is the iOS half of the "videos won't play" fix.
function prefersNativeHls(video: HTMLVideoElement): boolean {
  if (video.canPlayType('application/vnd.apple.mpegurl') === '') return false
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent || ''
  const iOS = /iP(hone|od|ad)/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)
  const appleVendor = (navigator.vendor || '').includes('Apple')
  const safari = appleVendor && !/CriOS|FxiOS|EdgiOS|Chrome|Chromium|Android/.test(ua)
  // ManagedMediaSource is an Apple-only API — a strong signal we're on Apple.
  const managed = typeof window !== 'undefined' && 'ManagedMediaSource' in window
  return iOS || safari || managed
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
  // The live hls.js instance, shared with the resume path. When the tab is
  // backgrounded the OS can flush MSE buffers / drop the decoder, so on return we
  // need to re-prime hls (startLoad / recoverMediaError) — a bare play() leaves a
  // frozen ("stale") frame. Native HLS / MP4 keep this null and just re-play().
  const hlsRef = useRef<import('hls.js').default | null>(null)

  // ── attach the best source for this device ──────────────────────────────────
  useEffect(() => {
    const video = ref.current
    if (!video || (!hls && !mp4)) return

    // Force muted + inline BEFORE any source attach / play — the autoplay gate.
    hardenForAutoplay(video)

    let destroyed = false
    let hlsInstance: import('hls.js').default | null = null

    const setMp4 = () => {
      if (mp4 && video.src !== mp4) video.src = mp4
    }

    // Native HLS exists (canPlayType !== '') on Safari/iOS — AND, misleadingly,
    // some Chromium builds report 'maybe' too, where native HLS is actually stuck
    // on the lowest rendition with no real ABR. So we do NOT prefer native just
    // because it's reported; we prefer hls.js wherever MSE exists (real ABR
    // control), and only use native where hls.js genuinely can't run (older iOS).
    const nativeHls = !!hls && video.canPlayType('application/vnd.apple.mpegurl') !== ''
    const canUseMse =
      typeof window !== 'undefined' &&
      ('MediaSource' in window || 'ManagedMediaSource' in window)
    // On Apple, native HLS is adaptive AND autoplay-reliable; hls.js there is not.
    const appleNative = !!hls && prefersNativeHls(video)

    const useNativeOrMp4 = () => {
      if (nativeHls && hls) video.src = hls
      else setMp4()
    }

    if (appleNative && hls) {
      // Apple (iPhone/iPad/Safari): attach the .m3u8 natively — reliable autoplay.
      video.src = hls
    } else if (hls && canUseMse) {
      // hls.js path (Chrome/Firefox/Edge/Chromium + desktop Safari + iOS 17+).
      void loadHls().then((Hls) => {
        if (destroyed) return
        if (!Hls || !Hls.isSupported()) { useNativeOrMp4(); return }
        try {
          // ABR for SHORT LOOPING background films. A 5–20s clip buffers fully at
          // whatever rung it starts on and then loops from memory, so hls.js never
          // re-measures to "climb" — the start rung is effectively the final one.
          // We therefore target the TOP rung from the start (assume broadband via a
          // high default estimate) so capable links get 1080p immediately and buffer
          // it once; if a segment can't be fetched in time, ABR steps DOWN to a
          // sustainable rung (poster covers the first instant) — degrade, never freeze.
          hlsInstance = new Hls({
            enableWorker: true,
            lowLatencyMode: false,
            capLevelToPlayerSize: false,          // a full-bleed film should reach 1080p
            startLevel: -1,                       // auto, seeded by the estimate below
            abrEwmaDefaultEstimate: 8_000_000,    // assume ~8Mbps → start at the 1080p rung
            abrBandWidthFactor: 0.95,             // use most of measured bandwidth
            abrBandWidthUpFactor: 0.9,
            startFragPrefetch: true,
          })
          let mediaRecoveries = 0
          hlsInstance.on(Hls.Events.ERROR, (_e, data) => {
            if (!data.fatal) return
            // A media (decode/buffer) error is what a backgrounded tab usually
            // throws when the decoder was dropped — recover in place a couple of
            // times before giving up, so we don't needlessly fall back to MP4.
            if (data.type === Hls.ErrorTypes.MEDIA_ERROR && mediaRecoveries < 3) {
              mediaRecoveries++
              try { hlsInstance?.recoverMediaError(); return } catch { /* fall through */ }
            }
            try { hlsInstance?.destroy() } catch { /* noop */ }
            hlsInstance = null; hlsRef.current = null; useNativeOrMp4()
          })
          hlsInstance.loadSource(hls)
          hlsInstance.attachMedia(video)
          hlsRef.current = hlsInstance
        } catch { useNativeOrMp4() }
      })
    } else if (hls && nativeHls) {
      // Older iOS Safari — no MSE, native HLS is the correct (and only) choice.
      video.src = hls
    } else {
      setMp4()
    }

    return () => {
      destroyed = true
      if (hlsInstance) { try { hlsInstance.destroy() } catch { /* noop */ } }
      hlsRef.current = null
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
        video.muted = true
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

    let watchdog: number | null = null
    const clearWatchdog = () => { if (watchdog !== null) { clearTimeout(watchdog); watchdog = null } }

    const tryPlay = () => {
      if (cleanedUp) return
      // Never restart a finished one-shot (e.g. the envelope opener after it has
      // played through) — only looping films get (re)started here.
      if (video.ended && !video.loop) return
      video.muted = true                 // autoplay is only permitted while muted
      const p = video.play()
      if (p && typeof p.then === 'function') {
        p.then(() => setNeedsTap(false)).catch(() => armGesture())
      }
    }

    // Returning from the background (home screen / app switch) routinely leaves a
    // frozen frame: video-only media is paused to save power, and with hls.js the
    // MSE buffer/decoder may have been dropped — a bare play() resolves but stays
    // stale. So re-prime hls loading, replay, then watchdog a stronger recovery if
    // it's still not advancing a beat later.
    const resume = () => {
      if (cleanedUp || document.visibilityState !== 'visible') return
      if (video.ended && !video.loop) return
      const h = hlsRef.current
      if (h) { try { h.startLoad() } catch { /* noop */ } }
      tryPlay()
      clearWatchdog()
      const mark = video.currentTime
      watchdog = window.setTimeout(() => {
        watchdog = null
        if (cleanedUp || document.visibilityState !== 'visible') return
        if (video.ended && !video.loop) return
        const stalled = video.paused || video.currentTime === mark
        if (!stalled) return
        const hh = hlsRef.current
        if (hh) { try { hh.recoverMediaError() } catch { /* noop */ } }
        else { try { video.load() } catch { /* noop */ } }   // native/mp4: reload, then replay
        tryPlay()
      }, 1200)
    }

    const onLoaded = () => tryPlay()
    const onVisible = () => { if (document.visibilityState === 'visible') resume() }
    const onPageShow = (e: PageTransitionEvent) => { if (e.persisted) resume() }   // bfcache restore (mobile Safari)

    video.addEventListener('loadedmetadata', onLoaded)
    video.addEventListener('canplay', onLoaded)
    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('pageshow', onPageShow)
    tryPlay()

    return () => {
      cleanedUp = true
      clearWatchdog()
      video.removeEventListener('loadedmetadata', onLoaded)
      video.removeEventListener('canplay', onLoaded)
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('pageshow', onPageShow)
      removeGesture?.()
    }
  }, [ref, srcKey, play, reduced])

  const playNow = () => {
    const video = ref.current
    if (!video) return
    video.muted = true
    video.play().then(() => setNeedsTap(false)).catch(() => { /* noop */ })
  }

  return { needsTap, playNow }
}
