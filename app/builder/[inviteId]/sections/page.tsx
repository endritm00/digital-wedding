'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import { Hairline } from '@/components/builder/hairline'
import { StepSheet } from '@/components/builder/step-sheet'
import { useBuilder } from '@/components/builder/builder-provider'
import { CONTENT_SECTIONS } from '@/lib/builder/presets'
import { useTranslation } from '@/lib/i18n/context'

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
  const { sections, toggleContentSection } = useBuilder()
  const { t } = useTranslation()
  const router = useRouter()
  const reduced = useReducedMotion()

  const enabled = sections.filter(s => s.type !== 'opening').map(s => s.type)

  return (
    <>
      <Hairline step="sections" />
      <StepSheet
        title={t.sections.title}
        lede={t.sections.lede}
        primaryLabel={t.common.continue}
        onPrimary={() => router.push(`/builder/${inviteId}/details`)}
        backHref={`/builder/${inviteId}/save`}
      >
        <div className="grid grid-cols-2 gap-2.5">
          {CONTENT_SECTIONS.map((sec, i) => {
            const on = enabled.includes(sec.type)
            const item = t.sections.items[sec.type]

            return (
              <motion.button
                key={sec.type}
                type="button"
                onClick={() => toggleContentSection(sec.type)}
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
                <span
                  className="font-cormorant font-light leading-tight"
                  style={{ fontSize: 15, color: '#1A1816' }}
                >
                  {item?.label ?? sec.label}
                </span>
                <span
                  className="font-inter leading-snug"
                  style={{ fontSize: 10, color: 'rgba(26,24,22,0.46)', lineHeight: 1.4 }}
                >
                  {item?.blurb ?? sec.blurb}
                </span>
              </motion.button>
            )
          })}
        </div>
      </StepSheet>
    </>
  )
}
