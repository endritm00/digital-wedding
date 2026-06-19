'use client'

import { use, useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Hairline } from '@/components/builder/hairline'
import { StepSheet } from '@/components/builder/step-sheet'
import { useBuilder } from '@/components/builder/builder-provider'
import { api, euros, lineItemLabel, ApiError } from '@/lib/builder/api'
import { SECTION_LABELS } from '@/lib/builder/presets'

function OrnamentLine() {
  return (
    <svg width="120" height="12" viewBox="0 0 120 12" fill="none" aria-hidden="true" className="mb-4">
      <line x1="0" y1="6" x2="46" y2="6" stroke="rgba(168,133,75,0.35)" strokeWidth="0.75" />
      <rect x="52" y="3" width="6" height="6" transform="rotate(45 55 6)" fill="rgba(168,133,75,0.55)" />
      <rect x="60" y="3" width="5" height="5" transform="rotate(45 62.5 5.5)" fill="rgba(168,133,75,0.3)" />
      <line x1="74" y1="6" x2="120" y2="6" stroke="rgba(168,133,75,0.35)" strokeWidth="0.75" />
    </svg>
  )
}

export default function ReviewPage({ params }: { params: Promise<{ inviteId: string }> }) {
  const { inviteId } = use(params)
  const { invite, quote, plan, sections, flushDraft, patchDraft } = useBuilder()
  const router = useRouter()
  const reduced = useReducedMotion()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const pulsed = useRef(false)
  const [pulseTotal, setPulseTotal] = useState(false)

  // Email gate — we must have the buyer's email before payment so we can send the
  // RSVP-management link afterward. Shown only if they skipped the save step.
  const [needEmail, setNeedEmail] = useState(false)
  const [email, setEmail] = useState('')
  const [savingEmail, setSavingEmail] = useState(false)

  useEffect(() => { void flushDraft() }, [flushDraft])

  useEffect(() => {
    if (quote && !pulsed.current) {
      pulsed.current = true
      setPulseTotal(true)
      const t = setTimeout(() => setPulseTotal(false), 800)
      return () => clearTimeout(t)
    }
  }, [quote])

  // Login-free purchase: redirect straight to Stripe (the checkout API accepts
  // the anonymous draft's claim token). The manage link is emailed AFTER payment.
  const proceedToCheckout = useCallback(async () => {
    setBusy(true)
    setError(null)
    try {
      await flushDraft()
      const { url } = await api.checkout(inviteId)
      window.location.href = url
    } catch (e) {
      // The API guards that we have the buyer's email — surface the email field.
      if (e instanceof ApiError && e.code === 'email_required') {
        setBusy(false)
        setEmail(invite?.draft_email ?? '')
        setNeedEmail(true)
        return
      }
      setError('Something went wrong — please try again.')
      setBusy(false)
    }
  }, [inviteId, flushDraft, invite?.draft_email])

  // "Pay & publish": go straight to payment if we already have an email; otherwise
  // ask for it first (it's the one thing we must have to email the RSVP link later).
  const handleCheckout = () => {
    setError(null)
    if (invite?.draft_email) { void proceedToCheckout(); return }
    setEmail(invite?.draft_email ?? '')
    setNeedEmail(true)
  }

  const saveEmailAndPay = async () => {
    const value = email.trim()
    if (!value.includes('@')) { setError('Please enter a valid email.'); return }
    setSavingEmail(true)
    setError(null)
    try {
      patchDraft({ draft_email: value })
      await flushDraft()
      await proceedToCheckout()
    } finally {
      setSavingEmail(false)
    }
  }

  const handlePreview = async () => {
    await flushDraft()
    router.push(`/invite/${inviteId}/preview`)
  }

  const openingSection = sections.find(s => s.type === 'opening')
  const oConfig = (openingSection?.config ?? {}) as Record<string, string>
  const names =
    oConfig.name_a && oConfig.name_b
      ? `${oConfig.name_a} & ${oConfig.name_b}`
      : oConfig.name_a || oConfig.name_b || invite?.display_title || '—'

  const date = invite?.event_date
    ? new Date(`${invite.event_date}T12:00:00`).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : null

  const contentSections = sections.filter(s => s.type !== 'opening')

  // Venue name comes from the venue section config — invite.venue_name is never set in the builder
  const venueSection = sections.find(s => s.type === 'venue')
  const venueName = (venueSection?.config as Record<string, string> | undefined)?.name ?? invite?.venue_name ?? null

  return (
    <>
      <Hairline step="review" />
      <StepSheet
        title="Ready to send it?"
        lede="Preview your invitation first, then publish when you're ready."
        backHref={`/builder/${inviteId}/details`}
      >
        <OrnamentLine />

        {/* Summary */}
        <div
          className="rounded-2xl p-4 mb-4"
          style={{ background: 'rgba(255,255,255,0.55)', border: '1px solid rgba(26,24,22,0.07)' }}
        >
          <SummaryRow label="Names" value={names} large />
          {date && <SummaryRow label="Date" value={date} />}
          {venueName && <SummaryRow label="Venue" value={venueName} />}
          {plan && <SummaryRow label="Plan" value={plan.name} />}
          {contentSections.length > 0 && (
            <SummaryRow
              label="Pages"
              value={contentSections.map(s => SECTION_LABELS[s.type] ?? s.type).join(', ')}
              wrap
            />
          )}
        </div>

        {/* Line items — only shown when quote is available */}
        {quote && (
          <div className="mb-5">
            {quote.line_items.map((li, i) => (
              <div key={i} className="flex items-baseline justify-between py-1.5">
                <span className="font-inter" style={{ fontSize: 12, color: 'rgba(26,24,22,0.54)' }}>
                  {lineItemLabel(li.label, plan?.name)}
                </span>
                <span className="font-inter" style={{ fontSize: 12, color: '#1A1816', fontVariantNumeric: 'tabular-nums' }}>
                  {euros(li.amount_cents)}
                </span>
              </div>
            ))}
            <div className="flex items-baseline justify-between pt-3 mt-1" style={{ borderTop: '1px solid rgba(26,24,22,0.08)' }}>
              <span className="font-inter text-[12px]" style={{ color: '#1A1816' }}>Total</span>
              <motion.span
                className="font-cormorant font-medium"
                animate={reduced ? {} : pulseTotal ? { scale: [1, 1.06, 1] } : { scale: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                style={{ fontSize: 22, color: '#A8854B', fontVariantNumeric: 'tabular-nums', display: 'inline-block' }}
              >
                {euros(quote.amount_cents)}
              </motion.span>
            </div>
          </div>
        )}

        {/* Primary action: Preview (always available) */}
        <motion.button
          type="button"
          onClick={handlePreview}
          whileTap={reduced ? {} : { scale: 0.97 }}
          className="w-full rounded-full py-4 font-inter mb-3"
          style={{
            background: '#1A1816',
            color: '#FDFCF9',
            fontSize: 13,
            letterSpacing: '0.04em',
            boxShadow: '0 6px 20px rgba(26,24,22,0.2)',
          }}
        >
          Preview my invitation →
        </motion.button>

        {/* Secondary: Pay & publish — requires quote */}
        <motion.button
          type="button"
          onClick={handleCheckout}
          disabled={busy}
          whileTap={reduced ? {} : { scale: 0.97 }}
          className="w-full rounded-full py-4 font-inter disabled:opacity-40"
          style={{
            background: quote ? '#A8854B' : 'rgba(26,24,22,0.08)',
            color: quote ? '#FDFCF9' : 'rgba(26,24,22,0.4)',
            fontSize: 13,
            letterSpacing: '0.04em',
            boxShadow: quote ? '0 6px 20px rgba(168,133,75,0.32)' : 'none',
            transition: 'background 0.3s, color 0.3s, box-shadow 0.3s',
          }}
        >
          {busy ? (
            <span className="flex items-center justify-center gap-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 1.5A5.5 5.5 0 0 1 12.5 7" stroke="rgba(253,252,249,0.7)" strokeWidth="1.5" strokeLinecap="round">
                  <animateTransform attributeName="transform" type="rotate" from="0 7 7" to="360 7 7" dur="0.85s" repeatCount="indefinite" />
                </path>
              </svg>
              Redirecting…
            </span>
          ) : quote ? (
            `Pay & publish — ${euros(quote.amount_cents)}`
          ) : (
            <span className="flex items-center justify-center gap-2">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M6 1.5A4.5 4.5 0 0 1 10.5 6" stroke="rgba(26,24,22,0.35)" strokeWidth="1.2" strokeLinecap="round">
                  <animateTransform attributeName="transform" type="rotate" from="0 6 6" to="360 6 6" dur="1s" repeatCount="indefinite" />
                </path>
              </svg>
              Calculating price…
            </span>
          )}
        </motion.button>

        {/* Email gate — collected before payment so the RSVP link can be emailed after */}
        <AnimatePresence>
          {needEmail && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="mt-3 rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(168,133,75,0.25)' }}>
                <p className="font-inter leading-relaxed" style={{ fontSize: 11.5, color: 'rgba(26,24,22,0.6)' }}>
                  What&rsquo;s your email? After payment we&rsquo;ll send you a private link to see who&rsquo;s coming.
                </p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  autoComplete="email"
                  inputMode="email"
                  autoFocus
                  className="mt-3 w-full rounded-xl px-4 py-3 font-inter outline-none"
                  style={{ fontSize: 14, color: '#1A1816', background: 'rgba(26,24,22,0.03)', border: '1px solid rgba(26,24,22,0.12)' }}
                  onKeyDown={(e) => { if (e.key === 'Enter') void saveEmailAndPay() }}
                />
                <button
                  type="button"
                  onClick={() => void saveEmailAndPay()}
                  disabled={savingEmail || busy}
                  className="mt-2.5 w-full rounded-full py-3 font-inter disabled:opacity-50"
                  style={{ background: '#A8854B', color: '#FDFCF9', fontSize: 12.5, letterSpacing: '0.04em' }}
                >
                  {savingEmail || busy ? 'One moment…' : quote ? `Continue to payment — ${euros(quote.amount_cents)}` : 'Continue to payment'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-inter mt-2 text-center"
              style={{ fontSize: 11, color: '#8A4030' }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <p className="font-inter mt-3 text-center leading-relaxed" style={{ fontSize: 10, color: 'rgba(26,24,22,0.33)' }}>
          Secure payment via Stripe. Your invitation goes live the moment payment clears.
        </p>
      </StepSheet>
    </>
  )
}

function SummaryRow({ label, value, large, wrap }: { label: string; value: string; large?: boolean; wrap?: boolean }) {
  return (
    <div className={`flex ${wrap ? 'flex-col gap-0.5' : 'items-baseline justify-between'} py-1.5`}>
      <span className="font-inter uppercase flex-none" style={{ fontSize: 9, letterSpacing: '0.1em', color: 'rgba(26,24,22,0.44)' }}>
        {label}
      </span>
      <span
        className={wrap ? 'font-inter' : large ? 'font-cormorant font-light' : 'font-inter'}
        style={{
          fontSize: large ? 17 : wrap ? 11 : 13,
          color: large ? '#1A1816' : 'rgba(26,24,22,0.8)',
          textAlign: wrap ? 'left' : 'right',
        }}
      >
        {value}
      </span>
    </div>
  )
}
