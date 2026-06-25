'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useBuilder, useBuilderStatus } from './builder-provider'
import { useTranslation } from '@/lib/i18n/context'

export const STEPS = [
  { slug: 'names',         key: 'names'   as const },
  { slug: 'opening-video', key: 'film'    as const },
  { slug: 'style',         key: 'style'   as const },
  // { slug: 'music',      key: 'music'   as const },  // MUSIC DISABLED — CSP + preload issues
  { slug: 'save',          key: 'save'    as const },
  { slug: 'sections',      key: 'pages'   as const },
  { slug: 'details',       key: 'details' as const },
  { slug: 'review',        key: 'review'  as const },
] as const

export type StepSlug = (typeof STEPS)[number]['slug']
type StepKey = (typeof STEPS)[number]['key']

export function stepIndex(slug: string): number {
  return Math.max(0, STEPS.findIndex((s) => s.slug === slug))
}

export function stepHref(inviteId: string, slug: StepSlug): string {
  return `/builder/${inviteId}/${slug}`
}

export function Hairline({ step }: { step: StepSlug }) {
  const { invite } = useBuilder()
  const { saveState } = useBuilderStatus()
  const { t } = useTranslation()
  const router = useRouter()
  const idx = stepIndex(step)
  const progress = (idx + 1) / STEPS.length

  // Warm the NEXT step while this one is open, so "Continue" is near-instant.
  // The step buttons navigate with router.push(), which — unlike <Link> — does
  // NOT prefetch, so without this the next step's code is fetched (and in dev,
  // compiled) only on click = the ~1s wait. Also prefetch the conditional 'frame'
  // branch that can follow opening-video.
  const inviteId = invite?.id
  useEffect(() => {
    if (!inviteId) return
    const next = STEPS[idx + 1]
    if (next) router.prefetch(stepHref(inviteId, next.slug))
    if (step === 'opening-video') router.prefetch(`/builder/${inviteId}/frame`)
  }, [inviteId, idx, step, router])

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
        {/* Left: home button + step name */}
        <div className="flex items-center gap-3">
          {/* Home button — subtle, doesn't compete with the builder */}
          <Link
            href="/"
            aria-label="Back to home"
            className="flex items-center justify-center rounded-full transition-opacity hover:opacity-70"
            style={{
              width: 28,
              height: 28,
              background: '#A8854B',
              flexShrink: 0,
            }}
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
              <path d="M1 5.5L5.5 1L10 5.5" stroke="#FDFCF9" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2.5 4.5V9.5C2.5 9.78 2.72 10 3 10H4.5V7.5H6.5V10H8C8.28 10 8.5 9.78 8.5 9.5V4.5" stroke="#FDFCF9" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

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
                {t.nav.steps[STEPS[idx].key as StepKey]}
              </motion.span>
            </AnimatePresence>
          </div>
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
                {t.common.saved}
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
                {t.common.couldntSave}
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
                {t.nav.preview}
              </span>
            </Link>
          )}

        </div>
      </div>
    </div>
  )
}
