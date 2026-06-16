'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { api } from '@/lib/builder/api'

type PaymentStatus = 'pending' | 'paid' | 'failed'

// Confetti particle — gold squares drifting down
function Particle({ delay, x }: { delay: number; x: number }) {
  return (
    <motion.div
      className="pointer-events-none absolute top-0"
      style={{ left: `${x}%`, width: 5, height: 5, background: '#A8854B', borderRadius: 1, opacity: 0 }}
      animate={{
        y: ['0vh', '110vh'],
        opacity: [0, 0.85, 0.85, 0],
        rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
      }}
      transition={{ duration: 2.8 + Math.random() * 1.4, delay, ease: 'linear' }}
    />
  )
}

function Confetti({ show }: { show: boolean }) {
  const particles = useRef(
    Array.from({ length: 28 }, (_, i) => ({
      x: 5 + Math.random() * 90,
      delay: i * 0.06 + Math.random() * 0.15,
    }))
  )
  if (!show) return null
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.current.map((p, i) => (
        <Particle key={i} x={p.x} delay={p.delay} />
      ))}
    </div>
  )
}

// Inner component — isolated so Suspense boundary wraps only the search-param read
function SuccessInner({ id }: { id: string }) {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  const [status, setStatus] = useState<PaymentStatus>('pending')
  const pollCount = useRef(0)

  useEffect(() => {
    if (!sessionId) { setStatus('failed'); return }

    let stopped = false
    const poll = async () => {
      if (stopped) return
      try {
        const result = await api.verifyPayment(id, sessionId)
        if (result.status === 'paid') { setStatus('paid'); return }
        if (result.status === 'failed' || result.status === 'cancelled') {
          setStatus('failed'); return
        }
      } catch { /* transient — keep polling */ }

      pollCount.current++
      if (pollCount.current >= 10) { setStatus('failed'); return }
      if (!stopped) setTimeout(poll, 3000)
    }

    void poll()
    return () => { stopped = true }
  }, [id, sessionId])

  return (
    <>
      <Confetti show={status === 'paid'} />

      <AnimatePresence mode="wait">
        {status === 'pending' && (
          <motion.div
            key="pending"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <circle cx="16" cy="16" r="13" stroke="rgba(168,133,75,0.2)" strokeWidth="2" />
              <path d="M16 3A13 13 0 0 1 29 16" stroke="#A8854B" strokeWidth="2" strokeLinecap="round">
                <animateTransform
                  attributeName="transform" type="rotate"
                  from="0 16 16" to="360 16 16"
                  dur="1s" repeatCount="indefinite"
                />
              </path>
            </svg>
            <span
              className="font-inter uppercase"
              style={{ fontSize: 10, letterSpacing: '0.2em', color: 'rgba(26,24,22,0.4)' }}
            >
              Confirming payment…
            </span>
          </motion.div>
        )}

        {status === 'paid' && (
          <motion.div
            key="paid"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-6 text-center max-w-[320px]"
          >
            <div
              className="flex items-center justify-center rounded-full"
              style={{ width: 64, height: 64, border: '1.5px solid rgba(168,133,75,0.4)' }}
            >
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
                <path
                  d="M5 13.5l5 5 11-11"
                  stroke="#A8854B"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="flex flex-col gap-2">
              <h1
                className="font-cormorant font-light leading-tight"
                style={{ fontSize: 'clamp(2rem, 8vw, 2.8rem)', color: '#1A1816', letterSpacing: '-0.01em' }}
              >
                It&rsquo;s beautiful.
              </h1>
              <p
                className="font-inter leading-relaxed"
                style={{ fontSize: 13, color: 'rgba(26,24,22,0.55)' }}
              >
                Your invitation is live. Share the link and let the celebrations begin.
              </p>
            </div>

            <Link
              href={`/invite/${id}`}
              className="rounded-full px-7 py-3.5 font-inter"
              style={{
                background: '#1A1816',
                color: '#FDFCF9',
                fontSize: 13,
                letterSpacing: '0.04em',
              }}
            >
              View your invitation
            </Link>

            <p
              className="font-inter"
              style={{ fontSize: 10, color: 'rgba(26,24,22,0.32)', letterSpacing: '0.03em' }}
            >
              A receipt has been sent to your email.
            </p>
          </motion.div>
        )}

        {status === 'failed' && (
          <motion.div
            key="failed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-6 text-center max-w-[300px]"
          >
            <p
              className="font-inter leading-relaxed"
              style={{ fontSize: 13, color: 'rgba(26,24,22,0.58)' }}
            >
              We couldn&rsquo;t confirm your payment. If you were charged, please contact support.
            </p>
            <Link
              href={`/builder/${id}/review`}
              className="font-inter"
              style={{ fontSize: 12, color: '#A8854B' }}
            >
              Back to your invitation
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function SuccessPage() {
  const params = useParams()
  const id = typeof params?.id === 'string' ? params.id : ''

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center px-8"
      style={{ background: '#F8F4EF' }}
    >
      <Suspense
        fallback={
          <span
            className="font-inter uppercase"
            style={{ fontSize: 10, letterSpacing: '0.2em', color: 'rgba(26,24,22,0.4)' }}
          >
            Loading…
          </span>
        }
      >
        <SuccessInner id={id} />
      </Suspense>
    </div>
  )
}
