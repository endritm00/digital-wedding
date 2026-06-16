'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Hairline } from '@/components/builder/hairline'
import { StepSheet } from '@/components/builder/step-sheet'
import { useBuilder } from '@/components/builder/builder-provider'
import { SECTION_LABELS } from '@/lib/builder/presets'
import type { Section } from '@/lib/builder/api'

// ── Per-section form ──────────────────────────────────────────────────────────

function fieldStyle(focused: boolean) {
  return {
    border: `1px solid ${focused ? 'rgba(168,133,75,0.5)' : 'rgba(26,24,22,0.12)'}`,
  }
}

function TextField({
  label,
  value,
  placeholder,
  multiline = false,
  onChange,
}: {
  label: string
  value: string
  placeholder: string
  multiline?: boolean
  onChange: (v: string) => void
}) {
  const [focused, setFocused] = useState(false)
  const baseClass =
    'w-full rounded-xl bg-white/60 px-3.5 font-inter text-sm text-[#1A1816] placeholder:text-[#1A1816]/28 outline-none transition-colors'

  return (
    <label className="flex flex-col gap-1">
      <span
        className="font-inter uppercase"
        style={{ fontSize: 9, letterSpacing: '0.1em', color: 'rgba(26,24,22,0.44)' }}
      >
        {label}
      </span>
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className={`${baseClass} resize-none py-3`}
          style={fieldStyle(focused)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${baseClass} py-2.5`}
          style={fieldStyle(focused)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )}
    </label>
  )
}

function SectionForm({
  section,
  updateSectionConfig,
}: {
  section: Section
  updateSectionConfig: (id: string, config: Record<string, unknown>) => void
}) {
  const cfg = section.config

  const patch = (fields: Record<string, unknown>) =>
    updateSectionConfig(section.id, { ...cfg, ...fields })

  const str = (key: string) => (cfg[key] as string) ?? ''

  switch (section.type) {
    case 'story':
      return (
        <TextField
          label="Your story"
          value={str('text')}
          placeholder="How you met, in your own words…"
          multiline
          onChange={v => patch({ text: v })}
        />
      )

    case 'schedule':
      return (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-2">
            <TextField
              label="Ceremony time"
              value={str('ceremony_time')}
              placeholder="3:00 PM"
              onChange={v => patch({ ceremony_time: v })}
            />
            <TextField
              label="Ceremony venue"
              value={str('ceremony_venue')}
              placeholder="St Mary's Church"
              onChange={v => patch({ ceremony_venue: v })}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <TextField
              label="Reception time"
              value={str('reception_time')}
              placeholder="6:30 PM"
              onChange={v => patch({ reception_time: v })}
            />
            <TextField
              label="Reception venue"
              value={str('reception_venue')}
              placeholder="The Grand Ballroom"
              onChange={v => patch({ reception_venue: v })}
            />
          </div>
          <TextField
            label="Other notes"
            value={str('notes')}
            placeholder="Any other timings or details…"
            multiline
            onChange={v => patch({ notes: v })}
          />
        </div>
      )

    case 'venue':
      return (
        <div className="flex flex-col gap-3">
          <TextField
            label="Venue name"
            value={str('name')}
            placeholder="Villa Botanica"
            onChange={v => patch({ name: v })}
          />
          <TextField
            label="Address"
            value={str('address')}
            placeholder="Full address including postcode"
            onChange={v => patch({ address: v })}
          />
          <TextField
            label="Getting there"
            value={str('details')}
            placeholder="Parking, public transport, access notes…"
            multiline
            onChange={v => patch({ details: v })}
          />
        </div>
      )

    case 'gallery':
      return (
        <div className="flex flex-col gap-3">
          <div
            className="rounded-xl p-4 text-center"
            style={{
              background: 'rgba(168,133,75,0.05)',
              border: '1px dashed rgba(168,133,75,0.28)',
            }}
          >
            <p className="font-inter leading-relaxed" style={{ fontSize: 11, color: 'rgba(26,24,22,0.48)' }}>
              Photo uploads will be available after your invitation is saved. Leave a note for us below.
            </p>
          </div>
          <TextField
            label="Photo notes"
            value={str('note')}
            placeholder="e.g. Engagement shoot from June — 6 photos"
            multiline
            onChange={v => patch({ note: v })}
          />
        </div>
      )

    case 'travel':
      return (
        <TextField
          label="Travel notes"
          value={str('content')}
          placeholder="Hotels nearby, airports, transport options…"
          multiline
          onChange={v => patch({ content: v })}
        />
      )

    case 'gifts':
      return (
        <TextField
          label="Gift message"
          value={str('content')}
          placeholder="A note about gifts, a registry link, or 'your presence is enough'…"
          multiline
          onChange={v => patch({ content: v })}
        />
      )

    case 'dress_code': {
      const codes = ['formal', 'semi-formal', 'cocktail', 'black-tie', 'casual', 'themed']
      const current = str('code')
      return (
        <div className="flex flex-col gap-3">
          <div>
            <span
              className="font-inter uppercase"
              style={{ fontSize: 9, letterSpacing: '0.1em', color: 'rgba(26,24,22,0.44)' }}
            >
              Dress code
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {codes.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => patch({ code: c })}
                  className="rounded-full px-3 py-1.5 font-inter capitalize transition-all"
                  style={{
                    fontSize: 12,
                    background: current === c ? 'rgba(168,133,75,0.12)' : 'rgba(255,255,255,0.6)',
                    border:
                      current === c
                        ? '1px solid rgba(168,133,75,0.45)'
                        : '1px solid rgba(26,24,22,0.1)',
                    color: current === c ? '#A8854B' : '#1A1816',
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <TextField
            label="Extra notes"
            value={str('notes')}
            placeholder="e.g. Comfortable shoes recommended for the outdoor ceremony"
            multiline
            onChange={v => patch({ notes: v })}
          />
        </div>
      )
    }

    case 'faq': {
      const questions = (cfg.questions as Array<{ q: string; a: string }>) ?? []

      const addQ = () =>
        patch({ questions: [...questions, { q: '', a: '' }] })

      const updateQ = (i: number, k: 'q' | 'a', v: string) => {
        const next = questions.map((item, idx) =>
          idx === i ? { ...item, [k]: v } : item
        )
        patch({ questions: next })
      }

      const removeQ = (i: number) =>
        patch({ questions: questions.filter((_, idx) => idx !== i) })

      return (
        <div className="flex flex-col gap-3">
          <AnimatePresence initial={false}>
            {questions.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-xl p-3"
                style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(26,24,22,0.08)' }}
              >
                <button
                  type="button"
                  onClick={() => removeQ(i)}
                  className="absolute right-2.5 top-2.5"
                  aria-label="Remove question"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 2l8 8M10 2l-8 8" stroke="rgba(26,24,22,0.28)" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </button>
                <input
                  value={q.q}
                  onChange={e => updateQ(i, 'q', e.target.value)}
                  placeholder="Question"
                  className="mb-2 w-full bg-transparent font-inter text-sm text-[#1A1816] placeholder:text-[#1A1816]/28 outline-none pr-5"
                />
                <textarea
                  value={q.a}
                  onChange={e => updateQ(i, 'a', e.target.value)}
                  placeholder="Answer"
                  rows={2}
                  className="w-full resize-none bg-transparent font-inter text-xs text-[#1A1816]/68 placeholder:text-[#1A1816]/24 outline-none"
                />
              </motion.div>
            ))}
          </AnimatePresence>
          <button
            type="button"
            onClick={addQ}
            className="flex items-center gap-2 font-inter"
            style={{ fontSize: 11, color: '#A8854B' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v10M1 6h10" stroke="#A8854B" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            Add a question
          </button>
        </div>
      )
    }

    default:
      return (
        <p className="font-inter text-xs" style={{ color: 'rgba(26,24,22,0.44)' }}>
          This section is enabled and will appear in your invitation.
        </p>
      )
  }
}

// ── Accordion tab ─────────────────────────────────────────────────────────────

function AccordionItem({
  section,
  open,
  onToggle,
  updateSectionConfig,
}: {
  section: Section
  open: boolean
  onToggle: () => void
  updateSectionConfig: (id: string, config: Record<string, unknown>) => void
}) {
  const label = SECTION_LABELS[section.type] ?? section.type

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: '1px solid rgba(26,24,22,0.08)' }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-3.5"
        style={{ background: open ? 'rgba(168,133,75,0.06)' : 'rgba(255,255,255,0.5)' }}
      >
        <span className="font-cormorant font-light" style={{ fontSize: 16, color: '#1A1816' }}>
          {label}
        </span>
        <motion.svg
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          aria-hidden="true"
        >
          <path d="M3 5.5L7 9.5L11 5.5" stroke="rgba(26,24,22,0.4)" strokeWidth="1.2" strokeLinecap="round" />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div
              className="px-4 pb-4 pt-3"
              style={{ background: 'rgba(243,239,231,0.5)' }}
            >
              <SectionForm
                section={section}
                updateSectionConfig={updateSectionConfig}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function DetailsPage() {
  const params = useParams()
  const inviteId = params?.inviteId ?? ''
  const { invite, sections, updateSectionConfig, patchDraft, flushDraft } = useBuilder()
  const router = useRouter()
  // Track which section is open. `undefined` means "not yet interacted —
  // open the first one by default". Once the user explicitly closes a section
  // (sets it to null), we respect that and don't re-open the first.
  const [openId, setOpenId] = useState<string | null | undefined>(undefined)
  const [notes, setNotes] = useState('')

  // Seed the notes field from the saved draft once it loads.
  useEffect(() => {
    if (invite?.additional_notes) setNotes(invite.additional_notes)
  }, [invite])

  const contentSections = sections.filter(s => s.type !== 'opening')

  // Resolve which id is actually open: undefined → first section; null → none.
  const resolvedOpen =
    openId === undefined ? (contentSections[0]?.id ?? null) : openId

  const handleNotes = (v: string) => {
    setNotes(v)
    patchDraft({ additional_notes: v })
  }

  const handleContinue = async () => {
    await flushDraft()
    router.push(`/builder/${inviteId}/review`)
  }

  return (
    <>
      <Hairline step="details" />
      <StepSheet
        title="The details"
        lede={
          contentSections.length === 0
            ? 'Add what you know — you can always edit later.'
            : 'Fill in what you know — you can always edit later.'
        }
        primaryLabel="Continue"
        onPrimary={handleContinue}
        backHref={`/builder/${inviteId}/sections`}
      >
        {contentSections.length === 0 ? (
          <p className="font-inter text-sm" style={{ color: 'rgba(26,24,22,0.44)' }}>
            No pages selected yet — go back to choose which pages to include.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {contentSections.map(sec => (
              <AccordionItem
                key={sec.id}
                section={sec}
                open={resolvedOpen === sec.id}
                onToggle={() =>
                  // Toggling the open section closes it (null = explicit none);
                  // toggling another section opens it.
                  setOpenId(prev => {
                    const current = prev === undefined ? (contentSections[0]?.id ?? null) : prev
                    return current === sec.id ? null : sec.id
                  })
                }
                updateSectionConfig={updateSectionConfig}
              />
            ))}
          </div>
        )}

        {/* Any notes for us? (moved here from the old Finishing touches step) */}
        <div className="mt-5 flex flex-col gap-1.5">
          <span className="font-inter uppercase" style={{ fontSize: 9, letterSpacing: '0.1em', color: 'rgba(26,24,22,0.44)' }}>
            Any notes for us?
          </span>
          <textarea
            value={notes}
            onChange={e => handleNotes(e.target.value)}
            placeholder="Special requests, accessibility needs, a note to our team…"
            rows={3}
            className="w-full resize-none rounded-xl bg-white/60 px-3.5 py-3 font-inter text-sm text-[#1A1816] placeholder:text-[#1A1816]/28 outline-none transition-colors"
            style={{ border: '1px solid rgba(26,24,22,0.12)' }}
            onFocus={e => (e.currentTarget.style.borderColor = 'rgba(168,133,75,0.5)')}
            onBlur={e => (e.currentTarget.style.borderColor = 'rgba(26,24,22,0.12)')}
          />
        </div>
      </StepSheet>
    </>
  )
}
