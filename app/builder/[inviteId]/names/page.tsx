'use client'

import { use, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Hairline } from '@/components/builder/hairline'
import { StepSheet } from '@/components/builder/step-sheet'
import { useBuilder } from '@/components/builder/builder-provider'

export default function NamesPage({ params }: { params: Promise<{ inviteId: string }> }) {
  const { inviteId } = use(params)
  const { opening, invite, setOpening, patchDraft, flushDraft } = useBuilder()
  const router = useRouter()
  const reduced = useReducedMotion()

  const config = (opening?.config ?? {}) as { name_a?: string; name_b?: string }
  const [nameA, setNameA] = useState(config.name_a ?? '')
  const [nameB, setNameB] = useState(config.name_b ?? '')
  const [date, setDate] = useState(invite?.event_date ?? '')
  // Gentle one-time prompt if they try to continue without a date.
  const [dateNudge, setDateNudge] = useState(false)

  // Sync once the context loads from the server
  useEffect(() => {
    const c = (opening?.config ?? {}) as { name_a?: string; name_b?: string }
    if (c.name_a !== undefined) setNameA(c.name_a)
    if (c.name_b !== undefined) setNameB(c.name_b)
  }, [opening])

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
  }, [opening, setOpening])

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
        title="Who's getting married?"
        lede="These names appear at the heart of your invitation."
        primaryLabel={!date && dateNudge ? 'Continue without a date' : 'Continue'}
        onPrimary={handleContinue}
        primaryDisabled={!nameA.trim() && !nameB.trim()}
        laterLabel="Decide later"
        onLater={() => router.push(`/builder/${inviteId}/opening-video`)}
      >
        <div className="flex flex-col gap-3">
          {/* First name */}
          <label className="flex flex-col gap-1.5">
            <span
              className="font-inter uppercase"
              style={{ fontSize: 10, letterSpacing: '0.12em', color: 'rgba(26,24,22,0.48)' }}
            >
              First person
            </span>
            <input
              type="text"
              value={nameA}
              onChange={e => {
                setNameA(e.target.value)
                setOpening({ name_a: e.target.value, name_b: nameB })
              }}
              placeholder="e.g. Emma"
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
              Second person
            </span>
            <input
              type="text"
              value={nameB}
              onChange={e => {
                setNameB(e.target.value)
                setOpening({ name_a: nameA, name_b: e.target.value })
              }}
              placeholder="e.g. Luca"
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
              Wedding date
            </span>
            <DatePicker
              value={date}
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
                Adding your date lets guests save it and powers the countdown — or continue and add it later.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </StepSheet>
    </>
  )
}

// ── Elegant Day / Month / Year picker (no native chrome) ──────────────────────

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function DatePicker({ value, onChange }: { value: string; onChange: (iso: string) => void }) {
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
      <select aria-label="Day" value={d} onChange={e => compose(y, m, e.target.value)} onFocus={focus} onBlur={blur} style={withCaret}>
        <option value="">Day</option>
        {Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')).map(dd => (
          <option key={dd} value={dd}>{Number(dd)}</option>
        ))}
      </select>
      <select aria-label="Month" value={m} onChange={e => compose(y, e.target.value, d)} onFocus={focus} onBlur={blur} style={withCaret}>
        <option value="">Month</option>
        {MONTHS.map((name, i) => (
          <option key={name} value={String(i + 1).padStart(2, '0')}>{name}</option>
        ))}
      </select>
      <select aria-label="Year" value={y} onChange={e => compose(e.target.value, m, d)} onFocus={focus} onBlur={blur} style={withCaret}>
        <option value="">Year</option>
        {years.map(yy => (
          <option key={yy} value={yy}>{yy}</option>
        ))}
      </select>
    </div>
  )
}
