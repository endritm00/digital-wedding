'use client'

import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { useBuilder } from './builder-provider'

export const STEPS = [
  { slug: 'names',         name: 'Your names' },
  { slug: 'opening-video', name: 'Your film' },
  { slug: 'style',         name: 'Your style' },
  { slug: 'music',         name: 'Your music' },
  { slug: 'save',          name: 'Keep it safe' },
  { slug: 'sections',      name: 'Your pages' },
  { slug: 'details',       name: 'The details' },
  { slug: 'review',        name: 'Review' },
] as const

export type StepSlug = (typeof STEPS)[number]['slug']

export function stepIndex(slug: string): number {
  return Math.max(0, STEPS.findIndex((s) => s.slug === slug))
}

export function stepHref(inviteId: string, slug: StepSlug): string {
  return `/builder/${inviteId}/${slug}`
}

export function Hairline({ step }: { step: StepSlug }) {
  const { saveState, invite } = useBuilder()
  const idx = stepIndex(step)
  const progress = (idx + 1) / STEPS.length

  return (
    <div className="fixed inset-x-0 top-0 z-40">
      {/* Progress bar */}
      <div className="h-px w-full" style={{ background: 'rgba(26,24,22,0.1)' }}>
        <motion.div
          className="h-full"
          style={{ background: '#1A1816', transformOrigin: 'left' }}
          animate={{ scaleX: progress }}
          initial={false}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="flex items-center justify-between px-5 pt-3 lg:px-8">
        {/* Step name — cross-fades between steps */}
        <div className="relative h-4 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={STEPS[idx].slug}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-inter uppercase absolute inset-0"
              style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(26,24,22,0.45)' }}
            >
              {STEPS[idx].name}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Save whisper + persistent Preview button */}
        <div className="flex items-center gap-3">
          <AnimatePresence mode="wait">
            {saveState === 'saved' && (
              <motion.span
                key="saved"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="font-inter"
                style={{ fontSize: 10, color: 'rgba(26,24,22,0.38)' }}
              >
                Saved
              </motion.span>
            )}
            {saveState === 'error' && (
              <motion.span
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-inter"
                style={{ fontSize: 10, color: '#8A4030' }}
              >
                Couldn&rsquo;t save — check your connection
              </motion.span>
            )}
          </AnimatePresence>

          {/* Preview lives on the style step: the film is already chosen, so this
              is where you check the lettering/palette against it. Hidden elsewhere. */}
          {invite?.id && step === 'style' && (
            <Link
              href={`/invite/${invite.id}/preview?skipOpener=1`}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
              style={{ background: 'rgba(253,252,249,0.92)', backdropFilter: 'blur(8px)', boxShadow: '0 2px 12px rgba(26,24,22,0.1)', border: '1px solid rgba(168,133,75,0.28)' }}
              aria-label="Preview the full invitation"
            >
              <svg width="13" height="11" viewBox="0 0 13 11" fill="none" aria-hidden>
                <path d="M1 5.5C2.4 2.9 4.2 1.6 6.5 1.6S10.6 2.9 12 5.5C10.6 8.1 8.8 9.4 6.5 9.4S2.4 8.1 1 5.5Z" stroke="#A8854B" strokeWidth="1" />
                <circle cx="6.5" cy="5.5" r="1.7" fill="#A8854B" />
              </svg>
              <span className="font-inter uppercase" style={{ fontSize: 9, letterSpacing: '0.16em', color: '#A8854B' }}>
                Preview
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
