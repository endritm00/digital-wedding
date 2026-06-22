'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Hairline } from '@/components/builder/hairline'
import { StepSheet } from '@/components/builder/step-sheet'
import { useBuilder } from '@/components/builder/builder-provider'
import { SECTION_LABELS } from '@/lib/builder/presets'
import { api, uploadFile, type Section, type MediaAsset } from '@/lib/builder/api'

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

// ── Elegant time picker (Hour : Minute : AM/PM styled selects) ────────────────
// Stores a display string like "3:00 PM" so the renderer just prints it. Internal
// state holds partial selections; mount it keyed by a stable id (one per event).
function TimePicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const init = value.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  const [h, setH] = useState(init ? init[1] : '')
  const [m, setM] = useState(init ? init[2] : '')
  const [p, setP] = useState(init ? init[3].toUpperCase() : '')

  const compose = (hh: string, mm: string, pp: string) => {
    setH(hh); setM(mm); setP(pp)
    onChange(hh && mm && pp ? `${Number(hh)}:${mm} ${pp}` : '')
  }

  const caret =
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6' fill='none'><path d='M1 1l4 4 4-4' stroke='rgba(26,24,22,0.4)' stroke-width='1.2' stroke-linecap='round'/></svg>\")"
  const sel: React.CSSProperties = {
    border: '1px solid rgba(26,24,22,0.12)', background: 'rgba(255,255,255,0.6)', borderRadius: 12,
    padding: '9px 22px 9px 11px', fontSize: 13, color: value ? '#1A1816' : 'rgba(26,24,22,0.4)',
    outline: 'none', appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer', fontFamily: 'var(--font-inter)',
    backgroundImage: caret, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center',
  }
  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1))
  const mins = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'))

  return (
    <div className="grid grid-cols-[1fr_1fr_1fr] gap-2">
      <select aria-label="Hour" value={h} onChange={e => compose(e.target.value, m, p)} style={sel}>
        <option value="">Hr</option>
        {hours.map(hh => <option key={hh} value={hh}>{hh}</option>)}
      </select>
      <select aria-label="Minute" value={m} onChange={e => compose(h, e.target.value, p)} style={sel}>
        <option value="">Min</option>
        {mins.map(mm => <option key={mm} value={mm}>{mm}</option>)}
      </select>
      <select aria-label="AM or PM" value={p} onChange={e => compose(h, m, e.target.value)} style={sel}>
        <option value="">—</option>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  )
}

// Common wedding moments offered as one-tap "add" chips in the schedule editor.
const SCHEDULE_PRESETS = ['Ceremony', 'Cocktails', 'Dinner', 'Speeches', 'First Dance', 'Dancing', 'Cake Cutting', 'Send-off']

interface SchedEvent { id: string; label: string; time: string; venue: string }
const newEventId = () => `ev-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

// Seed the events list from the old ceremony/reception fields for invites that
// predate custom events (only used until the couple makes their first edit).
function legacyToEvents(cfg: Record<string, unknown>): SchedEvent[] {
  const out: SchedEvent[] = []
  const s = (k: string) => (cfg[k] as string) ?? ''
  if (s('ceremony_time') || s('ceremony_venue')) out.push({ id: newEventId(), label: 'Ceremony', time: s('ceremony_time'), venue: s('ceremony_venue') })
  if (s('reception_time') || s('reception_venue')) out.push({ id: newEventId(), label: 'Reception', time: s('reception_time'), venue: s('reception_venue') })
  return out
}

// ── Gallery photo uploader ────────────────────────────────────────────────────
// Real in-builder photo upload: pick (multiple) images → upload to Storage as
// `gallery_image` assets → show thumbnails (signed URLs from the media GET) →
// remove. The gallery = the invite's ready gallery_image assets; they render in
// the live preview, the creator preview, and the published guest page.
function GalleryUploader({ note, onNote }: { note: string; onNote: (v: string) => void }) {
  const { inviteId, media, refreshMedia } = useBuilder()
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(0)
  const [removing, setRemoving] = useState<Set<string>>(new Set())
  const [error, setError] = useState<string | null>(null)

  const photos = media.filter((m) => m.kind === 'gallery_image' && m.status === 'ready' && !removing.has(m.id))

  const thumbOf = (m: MediaAsset): string | null => {
    const v = (m.variants ?? {}) as { thumb?: string; medium?: string; url?: string }
    return v.thumb ?? v.medium ?? v.url ?? null
  }

  const onFiles = async (files: FileList | null) => {
    if (!files?.length) return
    setError(null)
    const images = Array.from(files).filter((f) => f.type.startsWith('image/'))
    if (images.length < files.length) setError('Some files were skipped — only images can be added.')
    // Upload sequentially so the storage rows and thumbnails appear in order.
    for (const file of images) {
      setUploading((n) => n + 1)
      try {
        await uploadFile(inviteId, 'gallery_image', file)
        await refreshMedia()
      } catch {
        setError('A photo failed to upload — please try again.')
      } finally {
        setUploading((n) => n - 1)
      }
    }
    if (fileRef.current) fileRef.current.value = ''
  }

  const remove = async (assetId: string) => {
    setRemoving((prev) => new Set(prev).add(assetId))
    try {
      await api.deleteMedia(inviteId, assetId)
      await refreshMedia()
    } catch {
      setError('Could not remove that photo — please try again.')
    } finally {
      setRemoving((prev) => { const next = new Set(prev); next.delete(assetId); return next })
    }
  }

  const Spinner = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="7" stroke="rgba(168,133,75,0.3)" strokeWidth="1.5" />
      <path d="M9 2a7 7 0 0 1 7 7" stroke="#A8854B" strokeWidth="1.5" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" from="0 9 9" to="360 9 9" dur="0.9s" repeatCount="indefinite" />
      </path>
    </svg>
  )

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-2">
        {photos.map((m) => {
          const url = thumbOf(m)
          return (
            <div key={m.id} className="group relative aspect-square overflow-hidden rounded-lg" style={{ border: '1px solid rgba(26,24,22,0.1)', background: 'rgba(26,24,22,0.04)' }}>
              {url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={url} alt="" className="h-full w-full" style={{ objectFit: 'cover' }} />
              ) : (
                <div className="flex h-full w-full items-center justify-center"><Spinner /></div>
              )}
              <button
                type="button"
                onClick={() => void remove(m.id)}
                aria-label="Remove photo"
                className="absolute right-1 top-1 flex items-center justify-center rounded-full"
                style={{ width: 20, height: 20, background: 'rgba(26,24,22,0.62)', backdropFilter: 'blur(4px)' }}
              >
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 1.5l6 6M7.5 1.5l-6 6" stroke="#FDFCF9" strokeWidth="1.3" strokeLinecap="round" /></svg>
              </button>
            </div>
          )
        })}

        {Array.from({ length: uploading }).map((_, i) => (
          <div key={`up-${i}`} className="flex aspect-square items-center justify-center rounded-lg" style={{ border: '1px solid rgba(168,133,75,0.25)', background: 'rgba(168,133,75,0.06)' }}>
            <Spinner />
          </div>
        ))}

        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex aspect-square flex-col items-center justify-center gap-1 rounded-lg transition-colors"
          style={{ border: '1px dashed rgba(26,24,22,0.2)', background: 'rgba(255,255,255,0.4)' }}
          aria-label="Add photos"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden><path d="M9 3.5v11M3.5 9h11" stroke="#A8854B" strokeWidth="1.5" strokeLinecap="round" /></svg>
          <span className="font-inter" style={{ fontSize: 9.5, letterSpacing: '0.04em', color: 'rgba(26,24,22,0.5)' }}>Add photos</span>
        </button>
      </div>

      <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => void onFiles(e.target.files)} />

      {error && <p className="font-inter" style={{ fontSize: 11, color: '#8A4030' }}>{error}</p>}

      <p className="font-inter leading-relaxed" style={{ fontSize: 11, color: 'rgba(26,24,22,0.45)' }}>
        Upload your favourite photos — they appear in your invitation&rsquo;s gallery. The first one is featured larger.
      </p>

      <TextField
        label="Caption (optional)"
        value={note}
        placeholder="e.g. From our engagement shoot in June"
        multiline
        onChange={onNote}
      />
    </div>
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

    case 'schedule': {
      const events: SchedEvent[] = Array.isArray(cfg.events) && (cfg.events as SchedEvent[]).length
        ? (cfg.events as SchedEvent[]).map(e => ({ id: e.id || newEventId(), label: e.label || '', time: e.time || '', venue: e.venue || '' }))
        : legacyToEvents(cfg)
      const write = (next: SchedEvent[]) => patch({ events: next })
      const add = (label = '') => write([...events, { id: newEventId(), label, time: '', venue: '' }])
      const update = (id: string, k: 'label' | 'time' | 'venue', v: string) =>
        write(events.map(e => (e.id === id ? { ...e, [k]: v } : e)))
      const remove = (id: string) => write(events.filter(e => e.id !== id))
      const used = new Set(events.map(e => e.label.toLowerCase()))

      return (
        <div className="flex flex-col gap-3">
          <AnimatePresence initial={false}>
            {events.map(ev => (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-xl p-3 pt-2.5"
                style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(26,24,22,0.08)' }}
              >
                <button type="button" onClick={() => remove(ev.id)} className="absolute right-2.5 top-2.5" aria-label="Remove event">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 2l8 8M10 2l-8 8" stroke="rgba(26,24,22,0.28)" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </button>
                <input
                  value={ev.label}
                  onChange={e => update(ev.id, 'label', e.target.value)}
                  placeholder="Event name (e.g. Dinner)"
                  className="mb-2 w-full bg-transparent font-cormorant text-[15px] text-[#1A1816] placeholder:text-[#1A1816]/30 outline-none pr-5"
                />
                <TimePicker value={ev.time} onChange={v => update(ev.id, 'time', v)} />
                <div className="mt-2.5 flex items-center gap-1.5" style={{ borderBottom: '1px dashed rgba(26,24,22,0.15)' }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden className="flex-none mb-1">
                    <path d="M5 1a2.5 2.5 0 0 1 2.5 2.5C7.5 5.5 5 9 5 9S2.5 5.5 2.5 3.5A2.5 2.5 0 0 1 5 1Z" stroke="rgba(26,24,22,0.3)" strokeWidth="1" fill="none"/>
                    <circle cx="5" cy="3.5" r="0.9" fill="rgba(26,24,22,0.3)"/>
                  </svg>
                  <input
                    value={ev.venue}
                    onChange={e => update(ev.id, 'venue', e.target.value)}
                    placeholder="Add location"
                    className="w-full bg-transparent font-inter text-[#1A1816]/70 placeholder:text-[#1A1816]/30 outline-none pb-1"
                    style={{ fontSize: 11 }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* one-tap chips for the usual wedding moments */}
          <div className="flex flex-wrap gap-1.5">
            {SCHEDULE_PRESETS.filter(l => !used.has(l.toLowerCase())).map(l => (
              <button
                key={l} type="button" onClick={() => add(l)}
                className="rounded-full px-2.5 py-1 font-inter transition-all"
                style={{ fontSize: 11.5, background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(26,24,22,0.1)', color: '#1A1816' }}
              >
                + {l}
              </button>
            ))}
          </div>
          <button type="button" onClick={() => add('')} className="flex items-center gap-2 self-start font-inter" style={{ fontSize: 11, color: '#A8854B' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v10M1 6h10" stroke="#A8854B" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            Add a custom moment
          </button>

          <TextField label="Other notes" value={str('notes')} placeholder="Any other timings or details…" multiline onChange={v => patch({ notes: v })} />
        </div>
      )
    }

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
        <GalleryUploader note={str('note')} onNote={v => patch({ note: v })} />
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
      const codes = ['black-tie', 'formal', 'cocktail', 'semi-formal']
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
            ? 'Add what you know — you can always edit before publishing.'
            : 'Fill in what you know — you can always before publishing.'
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
