'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { Section, MediaAsset } from '@/lib/builder/api'
import {
  VIDEO_PRESETS, MUSIC_TRACKS, SECTION_LABELS,
  PALETTE_MAP, DEFAULT_PALETTE, HEADING_FONT_MAP, DEFAULT_HEADING_FONT,
} from '@/lib/builder/presets'
import type { LayoutFamily } from '@/lib/builder/presets'
import { InviteOpener } from '@/components/invite/openers'
import { FilmBackdrop, type FilmFit, type FilmFocal } from '@/components/invite/film-backdrop'
import { cardLegibility } from '@/lib/invite/legibility'

// ════════════════════════════════════════════════════════════════════════════════
// InvitationView — the ONE renderer for a complete invitation.
//
// Used by BOTH the creator preview (draft data) and the public guest page
// (published snapshot, adapted to the same shapes). There is intentionally no
// "lite" version — guests see the full thing: opener, theme, hero film, all
// content sections, countdown, RSVP, footer.
//
// Inputs are already-resolved draft shapes (Section[] incl. the 'opening' section,
// MediaAsset[] for the film/music). The guest page adapts its snapshot into these.
// ════════════════════════════════════════════════════════════════════════════════

export interface InvitationViewInvite {
  display_title: string | null
  event_date: string | null
  venue_name: string | null
  venue_address: string | null
}

// Where an RSVP submission goes. 'snapshot' = real persistence via the public
// endpoint (guests). 'preview' = the couple testing their own invite — no real
// submission (the draft RSVP endpoint is a stub), so we simulate success.
export type RsvpTarget = { kind: 'snapshot'; slug: string } | { kind: 'preview' }

// ── theme ───────────────────────────────────────────────────────────────────
interface Theme {
  accent: string; accentSoft: string; paper: string; ink: string
  wash: string; washAlt: string
  font: string; fontScale: number; fontStyle: 'normal' | 'italic'
  dark: boolean; layout: LayoutFamily
}
const DEFAULT_THEME: Theme = {
  accent: DEFAULT_PALETTE.accent, accentSoft: DEFAULT_PALETTE.accentSoft,
  paper: DEFAULT_PALETTE.paper, ink: DEFAULT_PALETTE.ink,
  wash: DEFAULT_PALETTE.wash, washAlt: DEFAULT_PALETTE.washAlt,
  font: DEFAULT_HEADING_FONT.var, fontScale: DEFAULT_HEADING_FONT.scale,
  fontStyle: 'normal', dark: false, layout: DEFAULT_PALETTE.layout,
}
const ThemeCtx = createContext<Theme>(DEFAULT_THEME)
const useTheme = () => useContext(ThemeCtx)

interface InviteMeta { names: string; dateISO: string | null; dateLabel: string | null; venueName: string | null; venueAddress: string | null }
const MetaCtx = createContext<InviteMeta>({ names: '', dateISO: null, dateLabel: null, venueName: null, venueAddress: null })
const useMeta = () => useContext(MetaCtx)

const RsvpCtx = createContext<RsvpTarget>({ kind: 'preview' })

// ── helpers ───────────────────────────────────────────────────────────────────
function formatDate(iso: string | null): string | null {
  if (!iso) return null
  const d = new Date(`${iso}T12:00:00`)
  return Number.isNaN(d.getTime()) ? null : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}
function hexA(hex: string, a: number): string {
  const h = hex.replace('#', '')
  return `rgba(${parseInt(h.slice(0, 2), 16)}, ${parseInt(h.slice(2, 4), 16)}, ${parseInt(h.slice(4, 6), 16)}, ${a})`
}
function googleCalUrl(m: InviteMeta): string {
  if (!m.dateISO) return ''
  const d = m.dateISO.replace(/-/g, '')
  const next = (() => { const dt = new Date(`${m.dateISO}T00:00:00`); dt.setDate(dt.getDate() + 1); return dt.toISOString().slice(0, 10).replace(/-/g, '') })()
  const p = new URLSearchParams({
    action: 'TEMPLATE', text: `${m.names} — Wedding`, dates: `${d}/${next}`,
    details: 'We can’t wait to celebrate with you.', location: m.venueAddress || m.venueName || '',
  })
  return `https://calendar.google.com/calendar/render?${p.toString()}`
}
function PillLink({ href, accent, children }: { href: string; accent: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="font-inter inline-flex items-center gap-1.5 rounded-full px-4 py-2 transition-colors"
      style={{ fontSize: 11, letterSpacing: '0.06em', color: accent, border: `1px solid ${hexA(accent, 0.3)}`, background: hexA(accent, 0.06), textDecoration: 'none' }}>
      {children}
    </a>
  )
}

// ── ornament divider ────────────────────────────────────────────────────────
function OrnamentDivider() {
  const t = useTheme()
  const a = t.accent
  if (t.layout === 'editorial') return <div className="h-px w-full" style={{ background: hexA(a, 0.12) }} />
  if (t.layout === 'ethereal') return <div className="flex items-center justify-center py-4"><span style={{ width: 140, height: 1, background: hexA(a, 0.4) }} /></div>
  if (t.layout === 'paper') return <div className="flex items-center justify-center py-7"><span style={{ width: 9, height: 9, background: a, transform: 'rotate(45deg)', opacity: 0.55 }} /></div>
  return (
    <div className="flex items-center justify-center py-8 px-6">
      <svg width="280" height="20" viewBox="0 0 280 20" fill="none" aria-hidden="true">
        <line x1="0" y1="10" x2="108" y2="10" stroke={a} strokeOpacity="0.3" strokeWidth="0.75" />
        <rect x="104" y="7" width="5" height="5" transform="rotate(45 106.5 9.5)" fill={a} fillOpacity="0.35" />
        <circle cx="140" cy="10" r="7" stroke={a} strokeOpacity="0.5" strokeWidth="0.75" fill="none" />
        <circle cx="140" cy="10" r="2.5" fill={a} fillOpacity="0.45" />
        <rect x="136.5" y="6.5" width="7" height="7" transform="rotate(45 140 10)" stroke={a} strokeOpacity="0.35" strokeWidth="0.5" fill="none" />
        <rect x="170" y="7" width="5" height="5" transform="rotate(45 172.5 9.5)" fill={a} fillOpacity="0.35" />
        <line x1="172" y1="10" x2="280" y2="10" stroke={a} strokeOpacity="0.3" strokeWidth="0.75" />
      </svg>
    </div>
  )
}

// ── countdown ───────────────────────────────────────────────────────────────
function CountdownTimer({ eventDate }: { eventDate: string | null }) {
  const reduced = useReducedMotion()
  const t = useTheme()
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null)
  const [isPast, setIsPast] = useState(false)

  useEffect(() => {
    if (!eventDate) return
    const target = new Date(`${eventDate}T12:00:00`)
    const tick = () => {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) { setIsPast(true); return }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [eventDate])

  if (!eventDate || isPast || !timeLeft) return null
  const units = [
    { value: timeLeft.days, label: 'Days' }, { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' }, { value: timeLeft.seconds, label: 'Seconds' },
  ]
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center py-16 px-8 text-center w-full"
    >
      <h3 className="mb-8" style={{ fontFamily: t.font, fontStyle: t.fontStyle, fontSize: `calc(clamp(2.4rem, 7vw, 3.2rem) * ${t.fontScale})`, color: t.accent, letterSpacing: '0.01em', lineHeight: 1.1 }}>
        Counting Down
      </h3>
      <div className="flex items-start gap-5 sm:gap-10">
        {units.map(({ value, label }) => (
          <div key={label} className="flex flex-col items-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={value}
                initial={reduced ? {} : { opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                exit={reduced ? {} : { opacity: 0, y: 6 }} transition={{ duration: 0.2 }}
                className="font-cormorant font-light leading-none"
                style={{ fontSize: 'clamp(2.4rem, 9vw, 4rem)', color: t.ink, fontVariantNumeric: 'tabular-nums', display: 'block', minWidth: '2ch', textAlign: 'center' }}
              >
                {String(value).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
            <span className="font-inter uppercase mt-2" style={{ fontSize: 9, letterSpacing: '0.2em', color: t.ink, opacity: 0.55 }}>{label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// ── rsvp ────────────────────────────────────────────────────────────────────
type RsvpStatus = 'idle' | 'submitting' | 'success' | 'error'

function RsvpSection() {
  const reduced = useReducedMotion()
  const t = useTheme()
  const meta = useMeta()
  const target = useContext(RsvpCtx)
  const rsvpCalUrl = googleCalUrl(meta)
  const [name, setName] = useState('')
  const [attendance, setAttendance] = useState<'accept' | 'decline' | null>(null)
  const [guestCount, setGuestCount] = useState(1)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<RsvpStatus>('idle')

  const isValid = name.trim().length > 0 && attendance !== null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid || status === 'submitting') return
    setStatus('submitting')
    try {
      if (target.kind === 'snapshot') {
        const res = await fetch(`/api/snapshots/${target.slug}/rsvp`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim(),
            attending: attendance === 'accept',
            guest_count: attendance === 'accept' ? Math.max(1, guestCount) : 0,
          }),
        })
        if (!res.ok) throw new Error('failed')
      }
      // preview: no real submission (draft endpoint is a stub) — just confirm.
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const fieldStyle: React.CSSProperties = {
    border: `1px solid ${hexA(t.accent, 0.25)}`, background: t.dark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.7)',
    borderRadius: 12, padding: '12px 16px', fontSize: 14, color: t.ink, outline: 'none', width: '100%',
    fontFamily: 'var(--font-inter)', transition: 'border-color 0.2s',
  }
  const focusOn = (el: HTMLInputElement | HTMLTextAreaElement) => (el.style.borderColor = hexA(t.accent, 0.55))
  const focusOff = (el: HTMLInputElement | HTMLTextAreaElement) => (el.style.borderColor = hexA(t.accent, 0.25))

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center py-16 px-8 w-full"
    >
      <h3 className="text-center mb-2" style={{ fontFamily: t.font, fontStyle: t.fontStyle, fontSize: `calc(clamp(2.4rem, 7vw, 3.2rem) * ${t.fontScale})`, color: t.accent, letterSpacing: '0.01em', lineHeight: 1.1 }}>
        Be Our Guest
      </h3>
      <p className="font-inter text-center mb-8" style={{ fontSize: 12, letterSpacing: '0.06em', color: t.ink, opacity: 0.55 }}>
        Kindly let us know if you&rsquo;ll be joining us
      </p>

      {status === 'success' ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-4 py-8 text-center">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden>
            <circle cx="22" cy="22" r="21" stroke={t.accent} strokeWidth="0.75" fill={hexA(t.accent, 0.05)} />
            <path d="M13 22l6 6 12-13" stroke={t.accent} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="font-cormorant font-light" style={{ fontSize: 24, color: t.ink }}>Thank you, {name.split(' ')[0]}!</p>
          <p className="font-inter" style={{ fontSize: 13, color: t.ink, opacity: 0.7, maxWidth: '30ch', textAlign: 'center' }}>
            {attendance === 'accept' ? "We can't wait to celebrate with you." : "We'll miss you, but thank you for letting us know."}
          </p>
          {attendance === 'accept' && rsvpCalUrl && (
            <div className="mt-1"><PillLink href={rsvpCalUrl} accent={t.accent}>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden><rect x="1.5" y="2.5" width="9" height="8" rx="1" stroke={t.accent} strokeWidth="0.9" /><path d="M1.5 4.5h9M4 1.5v2M8 1.5v2" stroke={t.accent} strokeWidth="0.9" strokeLinecap="round" /></svg>
              Add to Calendar
            </PillLink></div>
          )}
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full" style={{ maxWidth: 400 }}>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" autoComplete="name"
            style={fieldStyle} onFocus={e => focusOn(e.currentTarget)} onBlur={e => focusOff(e.currentTarget)} required />

          <div className="flex gap-3">
            {([['accept', 'Joyfully Accept'], ['decline', 'Regretfully Decline']] as const).map(([val, label]) => (
              <button key={val} type="button" onClick={() => setAttendance(val)}
                className="flex-1 rounded-xl py-3.5 font-inter transition-all"
                style={{
                  fontSize: 12, letterSpacing: '0.03em',
                  background: attendance === val ? (val === 'accept' ? hexA(t.accent, 0.14) : hexA(t.ink, 0.08)) : (t.dark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.7)'),
                  border: attendance === val ? (val === 'accept' ? `1px solid ${hexA(t.accent, 0.45)}` : `1px solid ${hexA(t.ink, 0.25)}`) : `1px solid ${hexA(t.accent, 0.2)}`,
                  color: attendance === val ? (val === 'accept' ? t.accent : t.ink) : (t.dark ? 'rgba(236,234,227,0.6)' : 'rgba(26,24,22,0.5)'),
                }}>
                {label}
              </button>
            ))}
          </div>

          {attendance === 'accept' && (
            <div className="flex items-center justify-between px-1">
              <span className="font-inter" style={{ fontSize: 13, color: t.ink, opacity: 0.7 }}>How many of you?</span>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setGuestCount(c => Math.max(1, c - 1))} className="flex items-center justify-center rounded-full" style={{ width: 32, height: 32, border: `1px solid ${hexA(t.accent, 0.3)}`, color: t.ink, fontSize: 18, lineHeight: 1 }} aria-label="Remove a guest">−</button>
                <span className="font-cormorant" style={{ fontSize: 22, color: t.ink, minWidth: 20, textAlign: 'center' }}>{guestCount}</span>
                <button type="button" onClick={() => setGuestCount(c => Math.min(20, c + 1))} className="flex items-center justify-center rounded-full" style={{ width: 32, height: 32, border: `1px solid ${hexA(t.accent, 0.3)}`, color: t.ink, fontSize: 18, lineHeight: 1 }} aria-label="Add a guest">+</button>
              </div>
            </div>
          )}

          <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="A note for the couple (optional)" rows={3}
            style={{ ...fieldStyle, resize: 'none' }} onFocus={e => focusOn(e.currentTarget)} onBlur={e => focusOff(e.currentTarget)} />

          {status === 'error' && <p className="font-inter text-center" style={{ fontSize: 11, color: '#8A4030' }}>Something went wrong — please try again.</p>}

          <motion.button type="submit" disabled={!isValid || status === 'submitting'} whileTap={reduced ? {} : { scale: 0.97 }}
            className="w-full rounded-full py-4 font-inter disabled:opacity-40 transition-opacity"
            style={{ background: t.accent, color: '#FDFCF9', fontSize: 13, letterSpacing: '0.06em', boxShadow: `0 6px 20px ${hexA(t.accent, 0.3)}` }}>
            {status === 'submitting' ? 'Sending…' : 'Send RSVP'}
          </motion.button>
        </form>
      )}
    </motion.div>
  )
}

// ── section layout + renderers ────────────────────────────────────────────────
function layoutStyle(t: Theme) {
  switch (t.layout) {
    case 'editorial':
      return { align: 'left' as const, items: 'items-start', text: 'text-left' as const, maxW: 640, pad: 'px-7 py-16', headingScale: 1.18, eyebrow: true, frame: false, headFont: t.font, headItalic: t.fontStyle === 'italic', rule: 'bar' as const }
    case 'paper':
      return { align: 'center' as const, items: 'items-center', text: 'text-center' as const, maxW: 540, pad: 'px-7 py-12', headingScale: 0.78, eyebrow: false, frame: true, headFont: 'var(--font-cormorant)', headItalic: true, rule: 'diamond' as const }
    case 'ethereal':
      return { align: 'center' as const, items: 'items-center', text: 'text-center' as const, maxW: 460, pad: 'px-8 py-24', headingScale: 1.05, eyebrow: false, frame: false, headFont: t.font, headItalic: t.fontStyle === 'italic', rule: 'hair' as const }
    default:
      return { align: 'center' as const, items: 'items-center', text: 'text-center' as const, maxW: 560, pad: 'px-8 py-14', headingScale: 1, eyebrow: false, frame: false, headFont: t.font, headItalic: t.fontStyle === 'italic', rule: 'ornament' as const }
  }
}

function SectionBlock({ section, index }: { section: Section; index: number }) {
  const t = useTheme()
  const ls = layoutStyle(t)
  const cfg = section.config as Record<string, unknown>
  let content: React.ReactNode = null
  switch (section.type) {
    case 'story':
      content = cfg.text ? <StoryBlock t={t} ls={ls} index={index} text={String(cfg.text)} /> : null
      break
    case 'schedule': {
      const items = [
        (cfg.ceremony_time || cfg.ceremony_venue) && { label: 'Ceremony', time: cfg.ceremony_time as string, venue: cfg.ceremony_venue as string },
        (cfg.reception_time || cfg.reception_venue) && { label: 'Reception', time: cfg.reception_time as string, venue: cfg.reception_venue as string },
      ].filter(Boolean) as { label: string; time?: string; venue?: string }[]
      content = items.length ? <ScheduleBlock t={t} ls={ls} index={index} items={items} notes={cfg.notes ? String(cfg.notes) : null} /> : null
      break
    }
    case 'venue':
      content = (cfg.name || cfg.address) ? <VenuePlaque t={t} ls={ls} index={index} cfg={cfg} /> : null
      break
    case 'gallery':
      content = <GalleryBlock t={t} ls={ls} index={index} note={cfg.note ? String(cfg.note) : null} />
      break
    case 'travel':
      content = cfg.content ? <TravelBlock t={t} ls={ls} index={index} text={String(cfg.content)} /> : null
      break
    case 'gifts':
      content = cfg.content ? <GiftsBlock t={t} ls={ls} index={index} text={String(cfg.content)} /> : null
      break
    case 'dress_code':
      content = (cfg.code || cfg.notes) ? <DressCodeBlock t={t} ls={ls} index={index} code={cfg.code ? String(cfg.code) : null} notes={cfg.notes ? String(cfg.notes) : null} /> : null
      break
    case 'faq': {
      const qs = (cfg.questions as Array<{ q: string; a: string }>) ?? []
      content = qs.length > 0 ? <FaqBlock t={t} ls={ls} index={index} items={qs} /> : null
      break
    }
    default:
      content = <SectionHeader t={t} ls={ls} index={index} title={SECTION_LABELS[section.type] ?? section.type} />
  }
  if (!content) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col ${ls.items} ${ls.pad}`}
      style={{
        maxWidth: ls.frame ? 560 : ls.maxW, margin: '0 auto',
        ...(ls.frame ? { border: `1px solid ${hexA(t.accent, 0.35)}`, outline: `1px solid ${hexA(t.accent, 0.18)}`, outlineOffset: 5, borderRadius: 4, background: hexA(t.paper, t.dark ? 0.5 : 0.6), marginTop: 22, marginBottom: 22 } : {}),
      }}
    >
      {content}
    </motion.div>
  )
}

// ── per-section, per-theme renderers ─────────────────────────────────────────
// Each content section has its OWN compositional motif (so they never blur into
// "title + text"), while every token — accent, ink, display font, alignment,
// ornament shape, framing — flows from the active theme so the same section
// looks distinct across the classic / editorial / paper / ethereal layouts.

type LS = ReturnType<typeof layoutStyle>

// Small uppercase kicker; shows the editorial section number when the layout uses it.
function Eyebrow({ t, index, label, number }: { t: Theme; index: number; label?: string; number?: boolean }) {
  const text = number ? `${String(index + 1).padStart(2, '0')}${label ? `  ·  ${label}` : ''}` : label
  if (!text) return null
  return <span className="font-inter uppercase block" style={{ fontSize: 10, letterSpacing: '0.26em', color: t.accent, opacity: 0.85 }}>{text}</span>
}

// The divider under a heading — its shape is the theme's signature ornament.
function SectionRule({ t, kind, center }: { t: Theme; kind: LS['rule']; center: boolean }) {
  const a = t.accent
  const mx = center ? 'mx-auto' : ''
  if (kind === 'bar') return <span className="mt-4 block" style={{ width: 54, height: 3, background: a, borderRadius: 2 }} />
  if (kind === 'hair') return <span className={`mt-5 block ${mx}`} style={{ width: 72, height: 1, background: hexA(a, 0.5) }} />
  if (kind === 'diamond') return <span className={`mt-4 block ${mx}`} style={{ width: 8, height: 8, background: a, transform: 'rotate(45deg)', opacity: 0.6 }} />
  return (
    <span className={`mt-4 flex items-center gap-2 ${center ? 'justify-center' : ''}`}>
      <span style={{ width: 24, height: 1, background: hexA(a, 0.4) }} />
      <span style={{ width: 6, height: 6, border: `1px solid ${a}`, borderRadius: '50%', display: 'inline-block' }} />
      <span style={{ width: 24, height: 1, background: hexA(a, 0.4) }} />
    </span>
  )
}

// Standard themed section title (most sections; venue uses its own plaque header).
function SectionHeader({ t, ls, index, title }: { t: Theme; ls: LS; index: number; title: string }) {
  const center = ls.align !== 'left'
  return (
    <div className={center ? 'text-center' : 'text-left'}>
      {ls.eyebrow ? <Eyebrow t={t} index={index} number /> : null}
      <h3 className={ls.eyebrow ? 'mt-2' : ''} style={{ fontFamily: ls.headFont, fontStyle: ls.headItalic ? 'italic' : 'normal', fontSize: `calc(clamp(2rem, 6.5vw, 3rem) * ${t.fontScale * ls.headingScale})`, color: ls.frame ? t.ink : t.accent, letterSpacing: ls.headItalic ? '0.005em' : '0.01em', lineHeight: 1.12 }}>{title}</h3>
      <SectionRule t={t} kind={ls.rule} center={center} />
    </div>
  )
}

// STORY — an editorial drop-cap narrative ending in a small flourish.
function StoryBlock({ t, ls, index, text }: { t: Theme; ls: LS; index: number; text: string }) {
  const center = ls.align !== 'left'
  const clean = text.trim()
  return (
    <div className="w-full" style={{ maxWidth: 540, margin: center ? '0 auto' : '0' }}>
      <SectionHeader t={t} ls={ls} index={index} title="Our Story" />
      <p className="font-inter mt-6 text-left" style={{ fontSize: 15, lineHeight: 1.85, color: t.ink, opacity: 0.84 }}>
        <span aria-hidden style={{ float: 'left', fontFamily: t.font, fontStyle: t.fontStyle, color: t.accent, fontSize: '3.4em', lineHeight: 0.72, paddingRight: 12, marginTop: 4 }}>{clean.charAt(0)}</span>
        {clean.slice(1)}
      </p>
      <div className={`mt-7 ${center ? 'text-center' : 'text-left'}`} aria-hidden>
        <span style={{ fontFamily: t.font, color: hexA(t.accent, 0.55), fontSize: 24, letterSpacing: '0.3em' }}>&#10086;</span>
      </div>
    </div>
  )
}

// SCHEDULE — a vertical itinerary: ring-dotted line, times in the display face.
function ScheduleBlock({ t, ls, index, items, notes }: { t: Theme; ls: LS; index: number; items: { label: string; time?: string; venue?: string }[]; notes: string | null }) {
  const center = ls.align !== 'left'
  return (
    <div className="w-full" style={{ maxWidth: 480, margin: center ? '0 auto' : '0' }}>
      <SectionHeader t={t} ls={ls} index={index} title="The Day" />
      <div className="relative mt-7" style={{ paddingLeft: 30 }}>
        <span aria-hidden className="absolute" style={{ left: 9, top: 6, bottom: 6, width: 1, background: hexA(t.accent, 0.28) }} />
        <div className="flex flex-col gap-8">
          {items.map((it, i) => (
            <div key={i} className="relative text-left">
              <span aria-hidden className="absolute flex items-center justify-center rounded-full" style={{ left: -30, top: 3, width: 19, height: 19, background: t.dark ? hexA(t.accent, 0.2) : t.paper, border: `1.5px solid ${t.accent}` }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: t.accent }} />
              </span>
              <span className="font-inter uppercase" style={{ fontSize: 9.5, letterSpacing: '0.24em', color: t.accent }}>{it.label}</span>
              {it.time && <p className="leading-none mt-1.5" style={{ fontFamily: t.font, fontStyle: t.fontStyle, fontSize: `calc(34px * ${t.fontScale})`, color: t.ink, letterSpacing: '-0.01em' }}>{it.time}</p>}
              {it.venue && <p className="font-inter mt-1.5" style={{ fontSize: 12.5, color: t.ink, opacity: 0.6 }}>{it.venue}</p>}
            </div>
          ))}
        </div>
      </div>
      {notes && <p className={`font-inter mt-7 ${center ? 'text-center mx-auto' : 'text-left'}`} style={{ fontSize: 13.5, lineHeight: 1.7, color: t.ink, opacity: 0.7, maxWidth: '42ch' }}>{notes}</p>}
    </div>
  )
}

// VENUE — a place plaque: location pin, the venue NAME as the hero, directions.
function VenuePlaque({ t, ls, index, cfg }: { t: Theme; ls: LS; index: number; cfg: Record<string, unknown> }) {
  const meta = useMeta()
  const calUrl = googleCalUrl(meta)
  const center = ls.align !== 'left'
  const address = cfg.address ? String(cfg.address) : ''
  return (
    <div className={`w-full ${center ? 'text-center' : 'text-left'}`} style={{ maxWidth: 460, margin: center ? '0 auto' : '0' }}>
      {ls.eyebrow ? <Eyebrow t={t} index={index} number label="The Venue" /> : <Eyebrow t={t} index={index} label="Where we celebrate" />}
      <div className="mt-3 mb-1" style={{ width: 'fit-content', margin: center ? '0.75rem auto 0.25rem' : '0.75rem 0 0.25rem' }} aria-hidden>
        <svg width="24" height="30" viewBox="0 0 24 30" fill="none">
          <path d="M12 1C6.5 1 2 5.4 2 10.9 2 18 12 29 12 29s10-11 10-18.1C22 5.4 17.5 1 12 1Z" stroke={t.accent} strokeWidth="1.2" fill={hexA(t.accent, 0.08)} />
          <circle cx="12" cy="11" r="3.4" stroke={t.accent} strokeWidth="1.2" />
        </svg>
      </div>
      <h3 style={{ fontFamily: ls.headFont, fontStyle: ls.headItalic ? 'italic' : 'normal', fontSize: `calc(clamp(1.9rem, 6vw, 2.7rem) * ${t.fontScale * ls.headingScale})`, color: t.ink, lineHeight: 1.14 }}>{cfg.name ? String(cfg.name) : 'The Venue'}</h3>
      <SectionRule t={t} kind={ls.rule} center={center} />
      {address && <p className={`font-inter mt-4 ${center ? 'mx-auto' : ''}`} style={{ fontSize: 14, lineHeight: 1.7, color: t.ink, opacity: 0.8, maxWidth: '38ch' }}>{address}</p>}
      {cfg.details ? <p className={`font-inter mt-2 ${center ? 'mx-auto' : ''}`} style={{ fontSize: 12.5, lineHeight: 1.7, color: t.ink, opacity: 0.6, maxWidth: '38ch' }}>{String(cfg.details)}</p> : null}
      <div className={`mt-6 flex flex-wrap gap-2.5 ${center ? 'justify-center' : ''}`}>
        {address && <PillLink href={`https://maps.google.com/?q=${encodeURIComponent(address)}`} accent={t.accent}><svg width="11" height="11" viewBox="0 0 10 10" fill="none" aria-hidden><path d="M5 1C3.34 1 2 2.34 2 4c0 2.25 3 5 3 5s3-2.75 3-5c0-1.66-1.34-3-3-3z" stroke={t.accent} strokeWidth="0.8" fill={hexA(t.accent, 0.15)} /><circle cx="5" cy="4" r="1" fill={t.accent} /></svg>Open in Maps</PillLink>}
        {calUrl && <PillLink href={calUrl} accent={t.accent}><svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden><rect x="1.5" y="2.5" width="9" height="8" rx="1" stroke={t.accent} strokeWidth="0.9" /><path d="M1.5 4.5h9M4 1.5v2M8 1.5v2" stroke={t.accent} strokeWidth="0.9" strokeLinecap="round" /></svg>Add to Calendar</PillLink>}
      </div>
    </div>
  )
}

// GALLERY — an asymmetric framed collage (placeholder tiles until photos wire in).
function GalleryBlock({ t, ls, index, note }: { t: Theme; ls: LS; index: number; note: string | null }) {
  const center = ls.align !== 'left'
  const tiles = ['col-span-2 row-span-2 aspect-[4/3]', 'aspect-square', 'aspect-square', 'aspect-square', 'col-span-2 aspect-[2/1]']
  return (
    <div className="w-full" style={{ maxWidth: 460, margin: center ? '0 auto' : '0' }}>
      <SectionHeader t={t} ls={ls} index={index} title="Moments" />
      {note ? <p className={`font-inter mt-3 ${center ? 'mx-auto text-center' : 'text-left'}`} style={{ fontSize: 13.5, color: t.ink, opacity: 0.72, maxWidth: '40ch' }}>{note}</p> : null}
      <div className="mt-6 grid grid-cols-3 gap-2.5">
        {tiles.map((cls, i) => (
          <div key={i} className={`relative overflow-hidden ${cls}`} style={{ borderRadius: ls.rule === 'diamond' ? 2 : 6, background: `linear-gradient(135deg, ${hexA(t.accent, 0.16)} 0%, ${hexA(t.accent, 0.05)} 100%)`, border: `1px solid ${hexA(t.accent, 0.18)}` }}>
            <div className="absolute inset-0 flex items-center justify-center" style={{ opacity: 0.3 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden><rect x="3" y="5" width="18" height="14" rx="2" stroke={t.accent} strokeWidth="1.2" /><circle cx="8.5" cy="10" r="1.6" fill={t.accent} /><path d="M5 17l4.5-4 3 2.5L17 11l2 2" stroke={t.accent} strokeWidth="1.2" /></svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// TRAVEL — a boarding-pass card with an accent stub and a plane mark.
function TravelBlock({ t, ls, index, text }: { t: Theme; ls: LS; index: number; text: string }) {
  const center = ls.align !== 'left'
  return (
    <div className="w-full" style={{ maxWidth: 480, margin: center ? '0 auto' : '0' }}>
      <SectionHeader t={t} ls={ls} index={index} title="Getting There" />
      <div className="relative mt-6 overflow-hidden rounded-2xl" style={{ background: t.dark ? hexA('#ffffff', 0.05) : hexA(t.paper, 0.6), border: `1px solid ${hexA(t.accent, 0.22)}` }}>
        <div aria-hidden className="absolute left-0 top-0 bottom-0" style={{ width: 4, background: t.accent }} />
        <div className="flex items-start gap-3.5 p-5 pl-6">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="flex-none mt-0.5" aria-hidden><path d="M21 16l-7-4V5.5a1.5 1.5 0 0 0-3 0V12l-7 4v2l7-2v3l-2 1.5V22l3.5-1L16 22v-1.5L14 19v-3l7 2v-2z" fill={hexA(t.accent, 0.85)} /></svg>
          <p className="font-inter text-left" style={{ fontSize: 13.5, lineHeight: 1.72, color: t.ink, opacity: 0.82 }}>{text}</p>
        </div>
      </div>
    </div>
  )
}

// GIFTS — a soft gift card with a ribboned-box mark and an optional registry link.
function GiftsBlock({ t, ls, index, text }: { t: Theme; ls: LS; index: number; text: string }) {
  const center = ls.align !== 'left'
  const url = text.match(/https?:\/\/[^\s]+/)?.[0]
  const body = url ? (text.replace(url, '').trim() || 'Your presence is the greatest gift — but if you wish to give, our registry is here.') : text
  return (
    <div className="w-full" style={{ maxWidth: 440, margin: center ? '0 auto' : '0' }}>
      <SectionHeader t={t} ls={ls} index={index} title="With Love" />
      <div className="mt-6" style={{ maxWidth: 380, margin: center ? '0 auto' : '0' }}>
        <div className="relative rounded-2xl px-6 py-7 text-center" style={{ background: hexA(t.accent, 0.06), border: `1px solid ${hexA(t.accent, 0.2)}` }}>
          <div className="mx-auto mb-3" style={{ width: 'fit-content' }} aria-hidden>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="4" y="11" width="20" height="13" rx="1.5" stroke={t.accent} strokeWidth="1.2" /><path d="M4 16h20M14 11v13" stroke={t.accent} strokeWidth="1.2" /><path d="M14 11c-3-5-8-2-5 .5M14 11c3-5 8-2 5 .5" stroke={t.accent} strokeWidth="1.2" fill="none" /></svg>
          </div>
          <p className="font-inter" style={{ fontSize: 13.5, lineHeight: 1.7, color: t.ink, opacity: 0.82 }}>{body}</p>
          {url ? <div className="mt-5 flex justify-center"><PillLink href={url} accent={t.accent}>View Registry</PillLink></div> : null}
        </div>
      </div>
    </div>
  )
}

// DRESS CODE — a coordinated swatch palette (from the theme) above the attire note.
function DressCodeBlock({ t, ls, index, code, notes }: { t: Theme; ls: LS; index: number; code: string | null; notes: string | null }) {
  const center = ls.align !== 'left'
  const swatches = [t.accent, t.ink, t.washAlt, t.paper]
  return (
    <div className="w-full" style={{ maxWidth: 440, margin: center ? '0 auto' : '0' }}>
      <SectionHeader t={t} ls={ls} index={index} title="Dress Code" />
      <div className={`mt-6 flex gap-2.5 ${center ? 'justify-center' : ''}`} aria-hidden>
        {swatches.map((c, i) => (
          <span key={i} style={{ width: 38, height: 38, borderRadius: '50%', background: c, border: `1px solid ${hexA(t.ink, 0.18)}`, boxShadow: '0 2px 8px rgba(26,24,22,0.12)' }} />
        ))}
      </div>
      {code && <p className={`mt-5 ${center ? 'text-center' : 'text-left'}`} style={{ fontFamily: t.font, fontStyle: t.fontStyle, fontSize: `calc(22px * ${t.fontScale})`, color: t.accent, textTransform: 'capitalize' }}>{code}</p>}
      {notes && <p className={`font-inter mt-2 ${center ? 'mx-auto text-center' : 'text-left'}`} style={{ fontSize: 13.5, lineHeight: 1.7, color: t.ink, opacity: 0.74, maxWidth: '40ch' }}>{notes}</p>}
    </div>
  )
}

// FAQ — a numbered question list with display-face numerals.
function FaqBlock({ t, ls, index, items }: { t: Theme; ls: LS; index: number; items: { q: string; a: string }[] }) {
  const center = ls.align !== 'left'
  return (
    <div className="w-full" style={{ maxWidth: 480, margin: center ? '0 auto' : '0' }}>
      <SectionHeader t={t} ls={ls} index={index} title="Good to Know" />
      <div className="mt-6 flex flex-col">
        {items.map((item, i) => (
          <div key={i} className="flex gap-4 py-5 text-left" style={{ borderTop: i === 0 ? 'none' : `1px solid ${hexA(t.accent, 0.14)}` }}>
            <span className="flex-none" style={{ fontFamily: t.font, fontStyle: t.fontStyle, fontSize: 22, lineHeight: 1, color: hexA(t.accent, 0.7) }}>{String(i + 1).padStart(2, '0')}</span>
            <div>
              <p className="font-cormorant" style={{ fontSize: 17, color: t.ink, lineHeight: 1.3 }}>{item.q}</p>
              <p className="font-inter mt-1.5" style={{ fontSize: 13, lineHeight: 1.65, color: t.ink, opacity: 0.7 }}>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── opening hero ──────────────────────────────────────────────────────────────
function OpeningHero({ invite, opening, media, musicRef, inPreview }: { invite: InvitationViewInvite; opening: Section | null; media: MediaAsset[]; musicRef: React.RefObject<HTMLAudioElement | null>; inPreview: boolean }) {
  const reduced = useReducedMotion()
  const cfg = (opening?.config ?? {}) as Record<string, unknown>
  const nameA = (cfg.name_a as string | undefined)?.trim() ?? ''
  const nameB = (cfg.name_b as string | undefined)?.trim() ?? ''
  const names = nameA && nameB ? `${nameA} & ${nameB}` : nameA || nameB || invite.display_title || 'Your names'
  const date = formatDate(invite.event_date ?? null)
  const familiesNote = (cfg.families_note as string | undefined)?.trim() || 'Together with their families'

  const preset = VIDEO_PRESETS.find(p => p.id === cfg.video_preset) ?? null
  const uploadedAsset = media.find(m => m.id === cfg.video_asset_id && m.status === 'ready') ?? null
  const videoSrc = uploadedAsset ? (uploadedAsset.variants as { mp4?: string }).mp4 ?? null : preset?.src ?? null
  const videoHls = uploadedAsset ? (uploadedAsset.variants as { hls?: string }).hls ?? null : null
  const posterImg = uploadedAsset ? (uploadedAsset.variants as { poster?: string }).poster ?? null : preset?.posterImg ?? null
  const posterStyle = preset ? { background: `linear-gradient(160deg, ${preset.poster.from} 0%, ${preset.poster.to} 100%)` } : { background: 'linear-gradient(160deg, #F3EFE7 0%, #C9B89A 100%)' }

  const track = MUSIC_TRACKS.find(tk => tk.id === cfg.music_track)
  const musicAsset = media.find(m => m.id === cfg.music_asset_id && m.status === 'ready')
  const musicSrc = musicAsset ? (musicAsset.variants as { url?: string }).url ?? null : track?.src ?? null

  const th = useTheme()
  const leg = cardLegibility({ paper: th.paper, dark: th.dark })
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (musicSrc && musicRef.current) { musicRef.current.src = musicSrc; musicRef.current.loop = true }
  }, [musicSrc, musicRef])
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const toggleMusic = () => {
    if (!musicRef.current) return
    if (musicPlaying) { musicRef.current.pause(); setMusicPlaying(false) }
    else void musicRef.current.play().then(() => setMusicPlaying(true)).catch(() => {})
  }

  return (
    <section className="relative flex h-[100dvh] flex-col items-center justify-center overflow-hidden" style={{ paddingTop: inPreview ? 56 : 0 }}>
      {/* The hero film plays from the start so the opener dissolves INTO an
          already-moving film — a seamless "opening into the video", never a
          stop-and-restart. (Do not gate this on `opened`.) */}
      <FilmBackdrop videoSrc={videoSrc} hlsSrc={videoHls} poster={posterImg} fallbackStyle={posterStyle}
        mode={uploadedAsset ? ((cfg.video_fit as FilmFit) ?? 'blend') : 'auto'} focal={(cfg.video_focal as FilmFocal) ?? null} autoPlay reduced={!!reduced} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(253,252,249,0.08) 0%, rgba(26,24,22,0.38) 100%)' }} />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="relative z-10 mx-6 px-9 py-12 text-center" style={{ maxWidth: 420, width: '100%' }}>
        <div aria-hidden className="absolute inset-0" style={{ ...leg.glass, zIndex: -1 }} />
        <span className="font-inter uppercase" style={{ fontSize: 9, letterSpacing: '0.3em', color: th.ink, opacity: 0.62, textShadow: leg.textShadow }}>{familiesNote}</span>
        <motion.h1 className="leading-tight mt-4 mb-4" style={{ fontFamily: th.font, fontStyle: th.fontStyle, fontSize: `calc(clamp(2.8rem, 10vw, 4rem) * ${th.fontScale})`, color: th.accent, letterSpacing: '0.01em', textShadow: leg.textShadow }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55, duration: 0.8 }}>{names}</motion.h1>
        <div className="mx-auto mb-4" style={{ width: 60, height: 1, background: `linear-gradient(90deg, transparent, ${hexA(th.accent, 0.75)}, transparent)` }} />
        {date && <p className="font-cormorant italic font-light" style={{ fontSize: 18, color: th.ink, opacity: 0.92, textShadow: leg.textShadow }}>{date}</p>}
        {invite.venue_name && <p className="font-inter mt-1.5" style={{ fontSize: 11, letterSpacing: '0.08em', color: th.ink, opacity: 0.7, textShadow: leg.textShadow }}>{invite.venue_name}</p>}

        {musicSrc && (
          <button type="button" onClick={toggleMusic} className="mt-6 flex items-center gap-2 mx-auto rounded-full px-4 py-2 transition-all"
            style={{ background: musicPlaying ? hexA(th.accent, 0.14) : hexA(th.accent, 0.06), border: `1px solid ${hexA(th.accent, 0.22)}`, fontSize: 10, letterSpacing: '0.06em', color: th.accent }}
            aria-label={musicPlaying ? 'Pause music' : 'Play music'}>
            {musicPlaying ? (
              <><span className="flex items-end gap-[2px]" aria-hidden>{[0, 1, 2].map(i => (<motion.span key={i} style={{ width: 2, borderRadius: 2, background: th.accent, display: 'block' }} animate={{ height: [3, 9, 3] }} transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: i * 0.18 }} />))}</span><span className="font-inter">{track?.title ?? 'Music'}</span></>
            ) : (
              <><svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden><path d="M1 1.5L9 6L1 10.5V1.5Z" fill={th.accent} /></svg><span className="font-inter">Play music</span></>
            )}
          </button>
        )}
      </motion.div>

      <AnimatePresence>
        {!scrolled && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 1.8 }} className="absolute bottom-8 flex flex-col items-center gap-2">
            <span className="font-inter uppercase" style={{ fontSize: 8, letterSpacing: '0.2em', color: 'rgba(253,252,249,0.5)' }}>Scroll</span>
            <motion.div animate={reduced ? {} : { y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden><path d="M1 1.5L6 6.5L11 1.5" stroke="rgba(253,252,249,0.5)" strokeWidth="1.2" strokeLinecap="round" /></svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

// ── the view ──────────────────────────────────────────────────────────────────
export function InvitationView({
  invite, sections, media, rsvp, enableOpener = true,
}: {
  invite: InvitationViewInvite
  sections: Section[]
  media: MediaAsset[]
  rsvp: RsvpTarget
  enableOpener?: boolean
}) {
  const [opened, setOpened] = useState(!enableOpener)
  const [openerLeaving, setOpenerLeaving] = useState(false)
  const musicRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    musicRef.current = new Audio()
    musicRef.current.volume = 0.55
    return () => { musicRef.current?.pause() }
  }, [])

  const opening = sections.find(s => s.type === 'opening') ?? null
  const contentSections = sections.filter(s => s.type !== 'opening')
  const cfg = (opening?.config ?? {}) as Record<string, unknown>
  const nameA = (cfg.name_a as string | undefined)?.trim() ?? ''
  const nameB = (cfg.name_b as string | undefined)?.trim() ?? ''
  const date = formatDate(invite.event_date ?? null)

  const venueSection = contentSections.find(s => s.type === 'venue')
  const venueCfg = (venueSection?.config ?? {}) as Record<string, string>
  const meta: InviteMeta = {
    names: nameA && nameB ? `${nameA} & ${nameB}` : nameA || nameB || invite.display_title || 'Our Wedding',
    dateISO: invite.event_date ?? null, dateLabel: date,
    venueName: venueCfg.name ?? invite.venue_name ?? null, venueAddress: venueCfg.address ?? null,
  }

  const palette = PALETTE_MAP[(cfg.palette as string) ?? ''] ?? DEFAULT_PALETTE
  const headingFont = HEADING_FONT_MAP[(cfg.heading_font as string) ?? ''] ?? DEFAULT_HEADING_FONT
  const theme: Theme = {
    accent: palette.accent, accentSoft: palette.accentSoft, paper: palette.paper, ink: palette.ink,
    wash: palette.wash, washAlt: palette.washAlt, font: headingFont.var, fontScale: headingFont.scale,
    fontStyle: headingFont.italic ? 'italic' : 'normal', dark: !!palette.dark, layout: palette.layout,
  }
  const sectionBgs = [theme.wash, theme.washAlt]

  // The film revealed behind the opener as it opens.
  const openPreset = VIDEO_PRESETS.find(p => p.id === (cfg.video_preset as string)) ?? null
  const openUploaded = media.find(m => m.id === cfg.video_asset_id && m.status === 'ready') ?? null
  const themeVideo = openUploaded ? (openUploaded.variants as { mp4?: string }).mp4 ?? null : openPreset?.src ?? null
  const themeHls = openUploaded ? (openUploaded.variants as { hls?: string }).hls ?? null : null
  const themePoster = openUploaded ? (openUploaded.variants as { poster?: string }).poster ?? null : openPreset?.posterImg ?? VIDEO_PRESETS[0].posterImg
  const names = meta.names

  return (
    <ThemeCtx.Provider value={theme}>
      <MetaCtx.Provider value={meta}>
        <RsvpCtx.Provider value={rsvp}>
          {/* Opener gate */}
          {enableOpener && !opened && (
            <motion.div className="fixed inset-0 z-[60]" animate={{ opacity: openerLeaving ? 0 : 1 }} transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}>
              <InviteOpener
                id={(cfg.opener as string) ?? 'wax-letter'}
                theme={{ accent: theme.accent, paper: theme.paper, flap: theme.washAlt, ink: theme.ink, font: theme.font, fontStyle: theme.fontStyle, dark: theme.dark }}
                names={names}
                videoSrc={themeVideo}
                videoHls={themeHls}
                poster={themePoster}
                videoFit={openUploaded ? ((cfg.video_fit as 'auto' | 'blend' | 'crop') ?? 'blend') : 'auto'}
                videoFocal={(cfg.video_focal as { x: number; y: number }) ?? null}
                onOpen={() => { setOpenerLeaving(true); setTimeout(() => setOpened(true), 1100) }}
              />
            </motion.div>
          )}

          <main style={{ background: theme.wash }}>
            <OpeningHero invite={invite} opening={opening} media={media} musicRef={musicRef} inPreview={rsvp.kind === 'preview'} />

            {contentSections.length > 0 && (
              <div>
                {contentSections.map((sec, i) => {
                  const bg = theme.layout === 'editorial' ? theme.wash
                    : theme.layout === 'ethereal' ? (i % 2 === 0 ? theme.paper : theme.wash)
                    : sectionBgs[i % 2]
                  return (
                    <div key={sec.id} style={{ background: bg }}>
                      {i > 0 && <OrnamentDivider />}
                      <SectionBlock section={sec} index={i} />
                    </div>
                  )
                })}
              </div>
            )}

            {invite.event_date && (
              <div style={{ background: sectionBgs[contentSections.length % 2] }}>
                <OrnamentDivider />
                <CountdownTimer eventDate={invite.event_date} />
              </div>
            )}

            <div style={{ background: sectionBgs[(contentSections.length + 1) % 2] }}>
              <OrnamentDivider />
              <RsvpSection />
            </div>

            <footer className="flex flex-col items-center gap-4 py-20 px-8 text-center" style={{ background: '#1A1816' }}>
              <OrnamentDivider />
              {(nameA || nameB) && <p style={{ fontFamily: theme.font, fontStyle: theme.fontStyle, fontSize: `calc(clamp(2rem, 8vw, 3rem) * ${theme.fontScale})`, color: 'rgba(253,252,249,0.9)', letterSpacing: '0.01em', lineHeight: 1.1 }}>{nameA && nameB ? `${nameA} & ${nameB}` : nameA || nameB}</p>}
              {date && <p className="font-cormorant italic font-light" style={{ fontSize: 16, color: 'rgba(253,252,249,0.4)' }}>{date}</p>}
              <p className="font-cormorant italic font-light mt-2" style={{ fontSize: 18, color: 'rgba(253,252,249,0.55)' }}>We can&rsquo;t wait to celebrate with you.</p>
              <p className="font-inter mt-4" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(253,252,249,0.18)', textTransform: 'uppercase' }}>Made with Digital Invite</p>
            </footer>
          </main>
        </RsvpCtx.Provider>
      </MetaCtx.Provider>
    </ThemeCtx.Provider>
  )
}
