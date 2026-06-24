'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, AnimatePresence, motion, useDragControls, useMotionValue, useReducedMotion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useTranslation } from '@/lib/i18n/context'

// The one question surface: bottom sheet on phones, right panel on desktop.
// Vellum paper over the live preview. One decision per screen.
//
// On phones the sheet is DRAGGABLE: pull it down (or tap the grip) to "peek" —
// it slides away leaving a slim handle, so the live film fills the screen. Drag
// it back up (or tap the handle) to keep editing. This is how you actually SEE
// your invitation while building on a small screen.

// How much of the sheet stays on-screen when peeked (the grip handle).
const PEEK_VISIBLE = 64

// The sheet's slide-up entrance should play ONCE per builder session (the first
// screen), not on every step — each step mounts a fresh StepSheet, so a per-
// instance flag made the whole panel visibly re-bounce on every navigation
// (the "moving between screens feels sloppy" complaint). Module scope persists
// across step routes but resets on a full reload (a genuinely fresh load).
let sheetHasEntered = false

function useIsMobile() {
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    const update = () => setMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return mobile
}

export interface StepSheetProps {
  title: string
  titleExtra?: React.ReactNode
  lede?: string
  stepIndex?: number
  children?: React.ReactNode
  primaryLabel?: string
  onPrimary?: () => void
  primaryDisabled?: boolean
  primaryBusy?: boolean
  laterLabel?: string
  onLater?: () => void
  backHref?: string
}

export function StepSheet({
  title,
  titleExtra,
  lede,
  stepIndex,
  children,
  primaryLabel,
  onPrimary,
  primaryDisabled,
  primaryBusy,
  laterLabel,
  onLater,
  backHref,
}: StepSheetProps) {
  const reduced = useReducedMotion()
  const { t } = useTranslation()
  const router = useRouter()
  const isMobile = useIsMobile()

  const sheetRef = useRef<HTMLDivElement | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const dragControls = useDragControls()
  const y = useMotionValue(0)

  const [peeked, setPeeked] = useState(false)
  const [peekOffset, setPeekOffset] = useState(0)
  const [moreBelow, setMoreBelow] = useState(false)
  const [showHint, setShowHint] = useState(false)
  // True only for the first sheet shown this session — drives the one-time entrance.
  const firstEntrance = useRef(!sheetHasEntered)
  useEffect(() => { sheetHasEntered = true }, [])

  // One-time "drag down to preview" nudge — shown once ever, on the first mobile
  // step, so people discover the peek gesture. Dismissed on the first peek.
  const HINT_KEY = 'di:peek-hint-seen'
  useEffect(() => {
    if (!isMobile) return
    let seen = true
    try { seen = localStorage.getItem(HINT_KEY) === '1' } catch { /* private mode */ }
    if (seen) return
    try { localStorage.setItem(HINT_KEY, '1') } catch { /* noop */ }
    setShowHint(true)
    const t = setTimeout(() => setShowHint(false), 6000)
    return () => clearTimeout(t)
  }, [isMobile])


  // Measure how far down "peeked" sits (sheet height minus the visible grip).
  useEffect(() => {
    if (!isMobile) { setPeekOffset(0); return }
    const measure = () => {
      const h = sheetRef.current?.offsetHeight ?? 0
      setPeekOffset(Math.max(0, h - PEEK_VISIBLE))
    }
    measure()
    window.addEventListener('resize', measure)
    const ro = new ResizeObserver(measure)
    if (sheetRef.current) ro.observe(sheetRef.current)
    return () => { window.removeEventListener('resize', measure); ro.disconnect() }
  }, [isMobile])

  // Keep the sheet pinned correctly when the layout changes (orientation, height
  // recompute) — but skip the first run so it never overrides the entrance, and
  // only re-pin while peeked (when open, y is owned by the entrance / drag).
  const didSync = useRef(false)
  useEffect(() => {
    if (!didSync.current) { didSync.current = true; return }
    if (!isMobile) { y.set(0); return }
    if (peeked) y.set(peekOffset)
  }, [isMobile, peekOffset, peeked, y]) // eslint-disable-line react-hooks/exhaustive-deps

  const applyPeek = (next: boolean) => {
    setPeeked(next)
    if (next) setShowHint(false)
    animate(y, next ? peekOffset : 0, { type: 'spring', stiffness: 360, damping: 38 })
  }

  // Scroll affordance — show a soft fade + cue when there's more content below.
  const updateScrollCue = () => {
    const el = scrollRef.current
    if (!el) { setMoreBelow(false); return }
    setMoreBelow(el.scrollHeight - el.scrollTop - el.clientHeight > 8)
  }
  useEffect(() => { updateScrollCue() }, [children, isMobile])

  return (
    <motion.div
      ref={sheetRef}
      initial={firstEntrance.current ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="
        fixed z-30 inset-x-0 bottom-0
        lg:inset-x-auto lg:right-6 lg:top-16 lg:bottom-6 lg:w-[420px]
        flex flex-col
        rounded-t-[26px] lg:rounded-[26px]
        max-h-[64dvh] lg:max-h-none
      "
      style={{
        y,
        background: '#F3EFE7',
        boxShadow: '0 -12px 48px rgba(26,24,22,0.14), 0 2px 8px rgba(26,24,22,0.05)',
        touchAction: isMobile ? 'none' : undefined,
      }}
      drag={isMobile ? 'y' : false}
      dragControls={dragControls}
      dragListener={false}
      dragConstraints={{ top: 0, bottom: peekOffset }}
      dragElastic={0.06}
      onDragEnd={(_e, info) => {
        const moved = Math.abs(info.offset.y)
        if (moved < 6) { applyPeek(!peeked); return }   // a tap on the arrow
        const pos = y.get()
        const next =
          info.velocity.y > 350 ? true
          : info.velocity.y < -350 ? false
          : pos > peekOffset * 0.42
        applyPeek(next)
      }}
      role="dialog"
      aria-label={title}
    >
      {/* one-time discovery nudge — floats just above the sheet, points at the grip */}
      <AnimatePresence>
        {showHint && !peeked && (
          <motion.div
            key="peek-hint"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute inset-x-0 -top-11 flex justify-center lg:hidden"
            aria-hidden
          >
            <span
              className="font-inter inline-flex items-center gap-1.5 rounded-full px-3.5 py-2"
              style={{
                fontSize: 11, letterSpacing: '0.04em', color: '#FDFCF9',
                background: 'rgba(26,24,22,0.82)', backdropFilter: 'blur(8px)',
                boxShadow: '0 6px 20px rgba(26,24,22,0.28)',
              }}
            >
              {t.common.dragDownToPreview}
              <motion.svg
                width="12" height="12" viewBox="0 0 12 12" fill="none"
                animate={reduced ? {} : { y: [0, 3, 0] }}
                transition={{ duration: 1.4, ease: 'easeInOut', repeat: Infinity }}
              >
                <path d="M3 4.5L6 7.5L9 4.5" stroke="#FDFCF9" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* arrow button (mobile, steps 1-2 only) — click or drag to toggle preview peek */}
      {(stepIndex === 1 || stepIndex === 2) && isMobile ? (
        <button
          type="button"
          onClick={() => applyPeek(!peeked)}
          onPointerDown={(e) => dragControls.start(e)}
          className="lg:hidden flex items-center justify-center pt-2 pb-1"
          style={{ background: 'none', border: 'none', cursor: 'grab', padding: 5, touchAction: 'none' }}
          aria-label={peeked ? t.common.pullUpToKeepEditing : t.common.pullDownToSeeInvitation}
          aria-expanded={!peeked}
        >
          <motion.svg
            width="32"
            height="26"
            viewBox="0 0 32 32"
            fill="none"
            animate={{ rotate: peeked ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <circle cx="16" cy="16" r="15" stroke="#A8854B" strokeWidth="2" />
            <path
              d="M10 13l6 6 6-6"
              stroke="#A8854B"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </button>
      ) : (
        // Default bar handle for other steps
        <div
          className="flex flex-col items-center pt-3 pb-1 lg:hidden"
          style={{ cursor: 'grab', touchAction: 'none' }}
          onPointerDown={(e) => dragControls.start(e)}
          role="button"
          tabIndex={0}
          aria-label={peeked ? t.common.pullUpToKeepEditing : t.common.pullDownToSeeInvitation}
          aria-expanded={!peeked}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); applyPeek(!peeked) } }}
        >
          <div
            className="h-1 rounded-full"
            style={{ width: 36, background: 'rgba(26,24,22,0.16)' }}
          />
        </div>
      )}

      <div className="relative flex-1 flex flex-col min-h-0">
      <div ref={scrollRef} onScroll={updateScrollCue} className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-6 pt-2 pb-3 lg:px-8 lg:pt-8">
        {backHref && (
          <button
            type="button"
            onClick={() => router.push(backHref)}
            className="font-inter mb-4 flex items-center gap-1.5"
            style={{ fontSize: 11, color: 'rgba(26,24,22,0.42)' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M7.5 2.5L4 6L7.5 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            {t.common.back}
          </button>
        )}

        <div className="flex items-start justify-between gap-2">
          <h2
            className="font-cormorant font-light leading-tight"
            style={{ fontSize: 'clamp(1.6rem, 6vw, 2.1rem)', color: '#1A1816', letterSpacing: '-0.01em' }}
          >
            {title}
          </h2>
          {titleExtra && <div className="shrink-0 mt-1">{titleExtra}</div>}
        </div>
        {lede && (
          <p className="font-inter mt-1.5 leading-relaxed" style={{ fontSize: 12.5, color: 'rgba(26,24,22,0.55)' }}>
            {lede}
          </p>
        )}

        <div className="mt-5">{children}</div>
      </div>

      {/* "more below" cue — pinned to the bottom of the SCROLL area (never over the
          footer/buttons, regardless of how many buttons the footer has). */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center"
        style={{ height: 32, background: 'linear-gradient(to top, #F3EFE7 0%, rgba(243,239,231,0) 100%)' }}
        animate={{ opacity: moreBelow ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.svg
          width="16" height="16" viewBox="0 0 16 16" fill="none" className="self-end mb-1"
          animate={reduced ? {} : { y: [0, 3, 0] }}
          transition={{ duration: 1.6, ease: 'easeInOut', repeat: Infinity }}
        >
          <path d="M4 6l4 4 4-4" stroke="rgba(168,133,75,0.7)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.div>
      </div>

      {(primaryLabel || laterLabel) && (
        <div
          className="px-6 pt-3 lg:px-8"
          style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 18px)' }}
        >
          {primaryLabel && (
            <motion.button
              type="button"
              onClick={onPrimary}
              disabled={primaryDisabled || primaryBusy}
              whileTap={reduced ? {} : { scale: 0.97 }}
              className="w-full rounded-full py-4 font-inter disabled:opacity-40"
              style={{
                background: '#A8854B',
                color: '#FDFCF9',
                fontSize: 13,
                letterSpacing: '0.04em',
                boxShadow: '0 6px 20px rgba(168,133,75,0.32)',
                transition: 'opacity 0.3s, box-shadow 0.2s',
              }}
            >
              {primaryBusy ? (
                <span className="flex items-center justify-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M7 1.5A5.5 5.5 0 0 1 12.5 7" stroke="rgba(253,252,249,0.7)" strokeWidth="1.5" strokeLinecap="round">
                      <animateTransform attributeName="transform" type="rotate" from="0 7 7" to="360 7 7" dur="0.85s" repeatCount="indefinite" />
                    </path>
                  </svg>
                  {t.common.oneMoment}
                </span>
              ) : primaryLabel}
            </motion.button>
          )}
          {laterLabel && (
            <button
              type="button"
              onClick={onLater}
              className="mt-3 w-full py-1.5 font-inter"
              style={{ fontSize: 12, color: 'rgba(26,24,22,0.45)' }}
            >
              {laterLabel}
            </button>
          )}
        </div>
      )}
    </motion.div>
  )
}
