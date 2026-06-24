'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Hairline } from '@/components/builder/hairline'
import { StepSheet } from '@/components/builder/step-sheet'
import { useBuilder } from '@/components/builder/builder-provider'
import { useTranslation } from '@/lib/i18n/context'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function SavePage({ params }: { params: Promise<{ inviteId: string }> }) {
  const { inviteId } = use(params)
  const { invite, patchDraft, flushDraft } = useBuilder()
  const { t } = useTranslation()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState(false)
  const [sent, setSent] = useState(false)
  const [touched, setTouched] = useState(false)

  // Pre-fill if already saved
  useEffect(() => {
    if (invite?.draft_email) setEmail(invite.draft_email)
  }, [invite])

  const valid = EMAIL_RE.test(email)

  const handleContinue = async () => {
    if (!valid) return
    setBusy(true)
    patchDraft({ draft_email: email })
    await flushDraft()
    setBusy(false)
    setSent(true)
    setTimeout(() => {
      router.push(`/builder/${inviteId}/sections`)
    }, 1500)
  }

  return (
    <>
      <Hairline step="save" />
      <StepSheet
        title={t.save.title}
        lede={t.save.lede}
        primaryLabel={t.save.primaryLabel}
        onPrimary={handleContinue}
        primaryDisabled={!valid}
        primaryBusy={busy}
        laterLabel={t.save.skipLabel}
        onLater={() => router.push(`/builder/${inviteId}/sections`)}
        backHref={`/builder/${inviteId}/style`}
      >
        <label className="flex flex-col gap-1.5">
          <span
            className="font-inter uppercase"
            style={{ fontSize: 10, letterSpacing: '0.12em', color: 'rgba(26,24,22,0.48)' }}
          >
            {t.save.emailLabel}
          </span>
          <input
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setTouched(true) }}
            placeholder={t.save.emailPlaceholder}
            autoComplete="email"
            inputMode="email"
            onKeyDown={e => { if (e.key === 'Enter' && valid) void handleContinue() }}
            className="w-full rounded-xl bg-white/60 px-4 py-3.5 font-inter text-sm text-[#1A1816] placeholder:text-[#1A1816]/28 outline-none transition-colors"
            style={{ border: `1px solid ${touched && !valid && email.length > 0 ? 'rgba(138,64,48,0.4)' : 'rgba(26,24,22,0.12)'}` }}
            onFocus={e => (e.currentTarget.style.borderColor = 'rgba(168,133,75,0.5)')}
            onBlur={e => (e.currentTarget.style.borderColor = touched && !valid && email.length > 0 ? 'rgba(138,64,48,0.4)' : 'rgba(26,24,22,0.12)')}
          />
          {touched && !valid && email.length > 0 && (
            <span className="font-inter" style={{ fontSize: 11, color: 'rgba(138,64,48,0.9)' }}>
              {t.save.emailInvalid}
            </span>
          )}
          {sent && (
            <span className="font-inter flex items-center gap-1.5" style={{ fontSize: 11, color: '#A8854B' }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <circle cx="6" cy="6" r="5.5" stroke="#A8854B" strokeWidth="0.8"/>
                <path d="M3.5 6l1.5 1.5 3.5-3" stroke="#A8854B" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {t.save.savedNotice}
            </span>
          )}
        </label>

        <p
          className="font-inter mt-4 leading-relaxed"
          style={{ fontSize: 11, color: 'rgba(26,24,22,0.38)' }}
        >
          {t.save.secureNote}
        </p>
      </StepSheet>
    </>
  )
}
