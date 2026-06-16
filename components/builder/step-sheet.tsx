'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useRouter } from 'next/navigation'

// The one question surface: bottom sheet on phones, right panel on desktop.
// Vellum paper over the live preview. One decision per screen.

export interface StepSheetProps {
  title: string
  lede?: string
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
  lede,
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
  const router = useRouter()

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 48 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="
        fixed z-30 inset-x-0 bottom-0
        lg:inset-x-auto lg:right-6 lg:top-16 lg:bottom-6 lg:w-[420px]
        flex flex-col
        rounded-t-[26px] lg:rounded-[26px]
        max-h-[66dvh] lg:max-h-none
      "
      style={{
        background: '#F3EFE7',
        boxShadow: '0 -12px 48px rgba(26,24,22,0.14), 0 2px 8px rgba(26,24,22,0.05)',
      }}
      role="dialog"
      aria-label={title}
    >
      {/* grab notch (mobile only) — pulses width on mount to signal draggability */}
      <div className="flex justify-center pt-3 lg:hidden">
        <motion.div
          className="h-1 rounded-full"
          style={{ background: 'rgba(26,24,22,0.12)' }}
          animate={reduced ? {} : { width: [36, 24, 36] }}
          transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1 }}
          initial={{ width: 36 }}
        />
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain px-6 pt-5 pb-3 lg:px-8 lg:pt-8">
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
            Back
          </button>
        )}

        <h2
          className="font-cormorant font-light leading-tight"
          style={{ fontSize: 'clamp(1.7rem, 6vw, 2.1rem)', color: '#1A1816', letterSpacing: '-0.01em' }}
        >
          {title}
        </h2>
        {lede && (
          <p className="font-inter mt-2 leading-relaxed" style={{ fontSize: 13, color: 'rgba(26,24,22,0.55)' }}>
            {lede}
          </p>
        )}

        <div className="mt-6">{children}</div>
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
                  One moment…
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
