'use client'

import { use, useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import 'flag-icons/css/flag-icons.min.css'
import { Hairline } from '@/components/builder/hairline'
import { StepSheet } from '@/components/builder/step-sheet'
import { useBuilder } from '@/components/builder/builder-provider'
import { useTranslation, type Locale } from '@/lib/i18n/context'

export default function NamesPage({ params }: { params: Promise<{ inviteId: string }> }) {
  const { inviteId } = use(params)
  const { opening, invite, setOpening, patchDraft, flushDraft } = useBuilder()
  const { t } = useTranslation()
  const router = useRouter()
  const reduced = useReducedMotion()

  const [nameA, setNameA] = useState('')
  const [nameB, setNameB] = useState('')
  const [date, setDate] = useState(invite?.event_date ?? '')
  // Gentle one-time prompt if they try to continue without a date.
  const [dateNudge, setDateNudge] = useState(false)

  // Prefill from the homepage envelope ("Type your names" → "Create yours").
  // One-shot: only applies to a fresh invite with no names yet, then clears the
  // handoff so it never overrides later edits or a different invite.
  const prefillApplied = useRef(false)
  useEffect(() => {
    if (prefillApplied.current) return
    let raw: string | null = null
    try { raw = sessionStorage.getItem('di:prefill-names') } catch { /* private mode */ }
    if (!raw) return
    prefillApplied.current = true
    try { sessionStorage.removeItem('di:prefill-names') } catch { /* noop */ }
    const c = (opening?.config ?? {}) as { name_a?: string; name_b?: string }
    if (c.name_a || c.name_b) return // invite already has names — don't overwrite
    try {
      const { name_a, name_b } = JSON.parse(raw) as { name_a?: string; name_b?: string }
      if (!name_a && !name_b) return
      setNameA(name_a ?? '')
      setNameB(name_b ?? '')
      setOpening({ name_a: name_a ?? '', name_b: name_b ?? '' })
    } catch { /* malformed handoff — ignore */ }
  }, [])

  useEffect(() => {
    if (invite?.event_date) setDate(invite.event_date)
  }, [invite])

  const handleContinue = async () => {
    // First press without a date → gently prompt, don't leave the step yet.
    if (!date && !dateNudge) { setDateNudge(true); return }
    setOpening({ name_a: nameA, name_b: nameB })
    if (date) patchDraft({ event_date: date })
    await flushDraft()
    router.push(`/builder/${inviteId}/opening-video`)
  }

  const showAnd = nameA.trim().length > 0 && nameB.trim().length > 0

  const inputBase =
    'w-full rounded-xl bg-white/60 px-4 py-2.5 font-cormorant font-light text-[#1A1816] placeholder:text-[#1A1816]/28 outline-none transition-all'
  const inputFont = 'clamp(20px, 5.6vw, 25px)'

  return (
    <>
      <Hairline step="names" />
      <StepSheet
        title={t.names.title}
        titleExtra={<LanguageDropdown />}
        stepIndex={0}
        lede={t.names.lede}
        primaryLabel={!date && dateNudge ? t.names.continueWithoutDate : t.common.continue}
        onPrimary={handleContinue}
        primaryDisabled={!nameA.trim() && !nameB.trim()}
        laterLabel={t.common.decideLater}
        onLater={() => router.push(`/builder/${inviteId}/opening-video`)}
      >
        <div className="flex flex-col gap-3">
          {/* First name */}
          <label className="flex flex-col gap-1.5">
            <span
              className="font-inter uppercase"
              style={{ fontSize: 10, letterSpacing: '0.12em', color: 'rgba(26,24,22,0.48)' }}
            >
              {t.names.firstPerson}
            </span>
            <input
              type="text"
              value={nameA}
              onChange={e => {
                setNameA(e.target.value)
                setOpening({ name_a: e.target.value, name_b: nameB })
              }}
              placeholder={t.names.placeholderA}
              autoComplete="given-name"
              className={inputBase}
              style={{ fontSize: inputFont, border: '1px solid rgba(26,24,22,0.12)' }}
              onFocus={e => {
                e.currentTarget.style.borderColor = 'rgba(168,133,75,0.5)'
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(168,133,75,0.1)'
              }}
              onBlur={e => {
                e.currentTarget.style.borderColor = 'rgba(26,24,22,0.12)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
          </label>

          {/* Animated & ornament between names */}
          <AnimatePresence initial={false}>
            {showAnd && (
              <motion.div
                initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3"
                aria-hidden
              >
                <div className="flex-1 h-px" style={{ background: 'rgba(168,133,75,0.25)' }} />
                <span
                  className="font-cormorant italic"
                  style={{ fontSize: 22, color: 'rgba(168,133,75,0.7)', lineHeight: 1 }}
                >
                  &amp;
                </span>
                <div className="flex-1 h-px" style={{ background: 'rgba(168,133,75,0.25)' }} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Second name */}
          <label className="flex flex-col gap-1.5">
            <span
              className="font-inter uppercase"
              style={{ fontSize: 10, letterSpacing: '0.12em', color: 'rgba(26,24,22,0.48)' }}
            >
              {t.names.secondPerson}
            </span>
            <input
              type="text"
              value={nameB}
              onChange={e => {
                setNameB(e.target.value)
                setOpening({ name_a: nameA, name_b: e.target.value })
              }}
              placeholder={t.names.placeholderB}
              autoComplete="given-name"
              className={inputBase}
              style={{ fontSize: inputFont, border: '1px solid rgba(26,24,22,0.12)' }}
              onFocus={e => {
                e.currentTarget.style.borderColor = 'rgba(168,133,75,0.5)'
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(168,133,75,0.1)'
              }}
              onBlur={e => {
                e.currentTarget.style.borderColor = 'rgba(26,24,22,0.12)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
          </label>

          {/* Date — appears with a gentle fade once names are set */}
          <motion.label
            className="flex flex-col gap-1.5 rounded-2xl"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            style={{
              margin: -8, padding: 8,
              boxShadow: !date && dateNudge ? '0 0 0 2px rgba(168,133,75,0.55)' : '0 0 0 0 rgba(168,133,75,0)',
              transition: 'box-shadow 0.4s ease',
            }}
          >
            <span
              className="font-inter uppercase"
              style={{ fontSize: 10, letterSpacing: '0.12em', color: 'rgba(26,24,22,0.48)' }}
            >
              {t.names.weddingDate}
            </span>
            <DatePicker
              value={date}
              months={t.names.months}
              dayLabel={t.names.day}
              monthLabel={t.names.month}
              yearLabel={t.names.year}
              onChange={(iso) => {
                setDate(iso)
                setDateNudge(false)
                patchDraft({ event_date: iso })
              }}
            />
          </motion.label>

          {/* Gentle nudge if they tried to continue without a date */}
          <AnimatePresence initial={false}>
            {!date && dateNudge && (
              <motion.p
                initial={{ opacity: 0, y: -4, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -4, height: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="font-inter -mt-1"
                style={{ fontSize: 11.5, lineHeight: 1.5, color: 'rgba(168,133,75,0.95)' }}
              >
                {t.names.dateNudge}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </StepSheet>
    </>
  )
}

// ── Language dropdown — flag button → small popover, placed next to the title ─

function LanguageDropdown() {
  const { locale, setLocale } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const close = useCallback(() => setOpen(false), [])
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open, close])

  const options: { l: Locale; countryCode: string; label: string }[] = [
    { l: 'en', countryCode: 'gb', label: 'English' },
    { l: 'de', countryCode: 'de', label: 'Deutsch' },
  ]
  const active = options.find(o => o.l === locale)!

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
        className="flex items-center gap-2 rounded-lg font-inter transition-all"
        style={{
          fontSize: 13,
          lineHeight: 1,
          padding: '6px 10px',
          background: open ? 'rgba(168,133,75,0.1)' : 'transparent',
          border: '1px solid rgba(168,133,75,0.2)',
          cursor: 'pointer',
          color: '#A8854B',
          fontWeight: 500,
          letterSpacing: '0.04em',
        }}
      >
        <span className={`fi fi-${active.countryCode}`} style={{ width: 18, height: 14, lineHeight: 1 }} />
        <span>{active.l.toUpperCase()}</span>
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" aria-hidden style={{ marginLeft: 2, opacity: 0.5 }}>
          <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-1.5 z-50 flex flex-col overflow-hidden rounded-2xl"
          style={{
            background: '#F3EFE7',
            boxShadow: '0 8px 32px rgba(26,24,22,0.18), 0 2px 8px rgba(26,24,22,0.08)',
            border: '1px solid rgba(26,24,22,0.08)',
            minWidth: 140,
          }}
          role="listbox"
        >
          {options.map(({ l, countryCode, label }) => (
            <button
              key={l}
              type="button"
              role="option"
              aria-selected={locale === l}
              onClick={() => { setLocale(l); setOpen(false) }}
              className="flex items-center gap-2.5 px-4 py-3 font-inter text-left transition-colors"
              style={{
                fontSize: 13,
                color: locale === l ? '#A8854B' : 'rgba(26,24,22,0.75)',
                background: locale === l ? 'rgba(168,133,75,0.08)' : 'transparent',
                fontWeight: locale === l ? 500 : 400,
                cursor: 'pointer',
                borderBottom: l !== options[options.length - 1].l ? '1px solid rgba(26,24,22,0.06)' : 'none',
              }}
            >
              <span className={`fi fi-${countryCode}`} style={{ width: 20, height: 16 }} />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Elegant Day / Month / Year picker (no native chrome) ──────────────────────

function DatePicker({ value, months, dayLabel, monthLabel, yearLabel, onChange }: {
  value: string
  months: string[]
  dayLabel: string
  monthLabel: string
  yearLabel: string
  onChange: (iso: string) => void
}) {
  // Hold the three parts internally so partial selections persist — the parent
  // only ever sees a fully-composed ISO date (or '' until all three are chosen).
  const [iy, im, id] = value ? value.split('-') : ['', '', '']
  const [y, setY] = useState(iy)
  const [m, setM] = useState(im)
  const [d, setD] = useState(id)
  const thisYear = new Date().getFullYear()
  const years = Array.from({ length: 6 }, (_, i) => String(thisYear + i))

  const compose = (yy: string, mm: string, dd: string) => {
    setY(yy); setM(mm); setD(dd)
    onChange(yy && mm && dd ? `${yy}-${mm}-${dd}` : '')
  }

  const selStyle: React.CSSProperties = {
    border: '1px solid rgba(26,24,22,0.12)',
    background: 'rgba(255,255,255,0.6)',
    borderRadius: 12,
    padding: '11px 12px',
    fontSize: 14,
    color: value ? '#1A1816' : 'rgba(26,24,22,0.4)',
    outline: 'none',
    appearance: 'none',
    WebkitAppearance: 'none',
    cursor: 'pointer',
    fontFamily: 'var(--font-inter)',
  }
  const focus = (e: React.FocusEvent<HTMLSelectElement>) => { e.currentTarget.style.borderColor = 'rgba(168,133,75,0.5)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(168,133,75,0.1)' }
  const blur = (e: React.FocusEvent<HTMLSelectElement>) => { e.currentTarget.style.borderColor = 'rgba(26,24,22,0.12)'; e.currentTarget.style.boxShadow = 'none' }
  const caret = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6' fill='none'><path d='M1 1l4 4 4-4' stroke='rgba(26,24,22,0.4)' stroke-width='1.2' stroke-linecap='round'/></svg>\")"
  const withCaret: React.CSSProperties = { ...selStyle, backgroundImage: caret, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', paddingRight: 28 }

  return (
    <div className="grid grid-cols-[1fr_1.4fr_1fr] gap-2">
      <select aria-label={dayLabel} value={d} onChange={e => compose(y, m, e.target.value)} onFocus={focus} onBlur={blur} style={withCaret}>
        <option value="">{dayLabel}</option>
        {Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')).map(dd => (
          <option key={dd} value={dd}>{Number(dd)}</option>
        ))}
      </select>
      <select aria-label={monthLabel} value={m} onChange={e => compose(y, e.target.value, d)} onFocus={focus} onBlur={blur} style={withCaret}>
        <option value="">{monthLabel}</option>
        {months.map((name, i) => (
          <option key={name} value={String(i + 1).padStart(2, '0')}>{name}</option>
        ))}
      </select>
      <select aria-label={yearLabel} value={y} onChange={e => compose(e.target.value, m, d)} onFocus={focus} onBlur={blur} style={withCaret}>
        <option value="">{yearLabel}</option>
        {years.map(yy => (
          <option key={yy} value={yy}>{yy}</option>
        ))}
      </select>
    </div>
  )
}
