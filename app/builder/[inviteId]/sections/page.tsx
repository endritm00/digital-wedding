'use client'

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import { Hairline } from '@/components/builder/hairline'
import { StepSheet } from '@/components/builder/step-sheet'
import { useBuilder } from '@/components/builder/builder-provider'
import { CONTENT_SECTIONS } from '@/lib/builder/presets'

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 },
  }),
}

export default function SectionsPage({ params }: { params: Promise<{ inviteId: string }> }) {
  const { inviteId } = use(params)
  const { sections, plan, addContentSection, removeContentSection } = useBuilder()
  const router = useRouter()
  const [busy, setBusy] = useState<string | null>(null)
  const reduced = useReducedMotion()

  const enabled = sections.filter(s => s.type !== 'opening').map(s => s.type)
  const included = plan?.included_sections ?? null
  const overageCount = included != null ? Math.max(0, enabled.length - included) : 0

  const handleToggle = async (type: string) => {
    if (busy) return
    setBusy(type)
    try {
      if (enabled.includes(type)) {
        await removeContentSection(type)
      } else {
        await addContentSection(type)
      }
    } finally {
      setBusy(null)
    }
  }

  const lede =
    included != null
      ? `${included} page${included !== 1 ? 's' : ''} included with your plan. Extra pages are priced individually.`
      : 'Choose as many pages as you need.'

  return (
    <>
      <Hairline step="sections" />
      <StepSheet
        title="What pages do you want?"
        lede={lede}
        primaryLabel="Continue"
        onPrimary={() => router.push(`/builder/${inviteId}/details`)}
        backHref={`/builder/${inviteId}/save`}
      >
        <div className="grid grid-cols-2 gap-2.5">
          {CONTENT_SECTIONS.map((sec, i) => {
            const on = enabled.includes(sec.type)
            const isOverage =
              on && included != null && enabled.indexOf(sec.type) >= included
            const isBusy = busy === sec.type

            return (
              <motion.button
                key={sec.type}
                type="button"
                onClick={() => void handleToggle(sec.type)}
                disabled={isBusy}
                aria-pressed={on}
                custom={i}
                variants={cardVariants}
                initial={reduced ? false : 'hidden'}
                animate="visible"
                whileTap={reduced ? {} : { scale: 0.96 }}
                className="relative flex flex-col gap-1 rounded-2xl p-3.5 text-left"
                style={{
                  background: on ? 'rgba(168,133,75,0.09)' : 'rgba(255,255,255,0.5)',
                  border: on ? '1px solid rgba(168,133,75,0.38)' : '1px solid rgba(26,24,22,0.08)',
                  minHeight: 82,
                  transition: 'background 0.2s, border-color 0.2s',
                }}
              >
                {on && (
                  <motion.span
                    initial={reduced ? { opacity: 0 } : { scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute right-2.5 top-2.5 flex items-center justify-center rounded-full"
                    style={{ width: 16, height: 16, background: '#A8854B' }}
                    aria-hidden="true"
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path
                        d="M1.5 4L3 5.5L6.5 2"
                        stroke="#FDFCF9"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.span>
                )}
                {isOverage && (
                  <span
                    className="font-inter rounded-full px-2 py-0.5 self-start"
                    title="This section is outside your plan — an additional charge applies"
                    style={{
                      fontSize: 11,
                      letterSpacing: '0.03em',
                      background: 'rgba(168,133,75,0.12)',
                      color: '#A8854B',
                      border: '1px solid rgba(168,133,75,0.25)',
                    }}
                  >
                    + Extra charge
                  </span>
                )}
                <span
                  className="font-cormorant font-light leading-tight"
                  style={{ fontSize: 15, color: '#1A1816', marginTop: isOverage ? 2 : 0 }}
                >
                  {sec.label}
                </span>
                <span
                  className="font-inter leading-snug"
                  style={{ fontSize: 10, color: 'rgba(26,24,22,0.46)', lineHeight: 1.4 }}
                >
                  {sec.blurb}
                </span>
              </motion.button>
            )
          })}
        </div>

        {overageCount > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-inter mt-4"
            style={{ fontSize: 11, color: 'rgba(26,24,22,0.48)' }}
          >
            {overageCount} extra {overageCount === 1 ? 'page' : 'pages'} — cost reflected in the total above.
          </motion.p>
        )}
      </StepSheet>
    </>
  )
}
