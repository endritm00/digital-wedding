'use client'

import { useEffect, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useBuilder, useBuilderStatus } from './builder-provider'
import { euros, lineItemLabel } from '@/lib/builder/api'

// The running total. Server-priced, gently counted up, expandable into the
// line-item breakdown. Sits under the hairline so it is never hidden by the
// sheet or the keyboard.

export function TotalPill() {
  const { plan } = useBuilder()
  const { quote } = useBuilderStatus()
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(false)

  const cents = useMotionValue(0)
  const spring = useSpring(cents, { stiffness: 120, damping: 24 })
  const display = useTransform(spring, (v) => euros(Math.round(v / 100) * 100))

  useEffect(() => {
    if (quote == null) return
    if (reduced) {
      cents.jump(quote.amount_cents)
    } else {
      cents.set(quote.amount_cents)
    }
  }, [quote, cents, reduced])

  if (!quote) return null

  return (
    <div className="fixed z-50 left-4 top-12 lg:left-auto lg:right-8 lg:top-12">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`Your total is ${euros(quote.amount_cents)}. Tap for the breakdown.`}
        className="flex items-center gap-2 rounded-full px-4 py-2"
        style={{
          background: 'rgba(253,252,249,0.92)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 18px rgba(26,24,22,0.12)',
          border: '1px solid rgba(168,133,75,0.25)',
        }}
      >
        <motion.span
          className="font-cormorant"
          style={{
            fontSize: 20,
            fontWeight: 500,
            color: '#A8854B',
            fontVariantNumeric: 'tabular-nums',
            lineHeight: 1,
          }}
        >
          {display}
        </motion.span>
        <svg
          width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}
        >
          <path d="M2 3.5L5 6.5L8 3.5" stroke="rgba(26,24,22,0.4)" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 w-[240px] rounded-2xl p-4"
            style={{
              background: '#FDFCF9',
              boxShadow: '0 12px 40px rgba(26,24,22,0.16)',
              border: '1px solid rgba(26,24,22,0.06)',
            }}
          >
            {quote.line_items.map((li, i) => (
              <div key={i} className="flex items-baseline justify-between py-1.5">
                <span className="font-inter" style={{ fontSize: 12, color: 'rgba(26,24,22,0.6)' }}>
                  {lineItemLabel(li.label, plan?.name)}
                </span>
                <span
                  className="font-inter"
                  style={{ fontSize: 12, color: '#1A1816', fontVariantNumeric: 'tabular-nums' }}
                >
                  {euros(li.amount_cents)}
                </span>
              </div>
            ))}
            <div className="mt-2 flex items-baseline justify-between border-t pt-2.5" style={{ borderColor: 'rgba(26,24,22,0.08)' }}>
              <span className="font-inter" style={{ fontSize: 12, color: '#1A1816' }}>
                Your total
              </span>
              <span
                className="font-cormorant"
                style={{ fontSize: 19, fontWeight: 500, color: '#A8854B', fontVariantNumeric: 'tabular-nums' }}
              >
                {euros(quote.amount_cents)}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
