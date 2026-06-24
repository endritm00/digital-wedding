'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { Section, MediaAsset } from '@/lib/builder/api'
import {
  VIDEO_PRESETS, /* MUSIC_TRACKS, */ SECTION_LABELS,
  PALETTE_MAP, DEFAULT_PALETTE, HEADING_FONT_MAP, DEFAULT_HEADING_FONT,
  DEFAULT_HERO_LAYOUT,
} from '@/lib/builder/presets'
import type { LayoutFamily, HeroLayout } from '@/lib/builder/presets'
import { InviteOpener } from '@/components/invite/openers'
import { useTranslation } from '@/lib/i18n/context'
import { FilmBackdrop, type FilmFit, type FilmFocal } from '@/components/invite/film-backdrop'
import { cardLegibility } from '@/lib/invite/legibility'
import { Sprig, BotanicalSpray, MiniFlourish } from '@/components/invite/ornaments'
import { HeroCrest, HeroCorners, HeroFrame } from '@/components/invite/hero-card'

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

// Gallery photos resolved from media (builder/preview = signed URLs; published =
// snapshot URLs). Provided here so GalleryBlock can render real images.
export interface GalleryImage { url: string; thumb?: string; medium?: string }
const GalleryCtx = createContext<GalleryImage[]>([])
const useGallery = () => useContext(GalleryCtx)

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
// True when a hex is light enough that white text on it would be illegible (e.g.
// the pearl-noir accent). Used to flip button text to dark on light-accent themes.
function isLightHex(hex: string): boolean {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16)
  return (0.299 * r + 0.587 * g + 0.114 * b) > 170
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
  const center = t.layout !== 'editorial'
  const units = [
    { value: timeLeft.days, label: 'Days' }, { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' }, { value: timeLeft.seconds, label: 'Seconds' },
  ]
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col py-16 px-8 w-full ${center ? 'items-center text-center' : 'items-start text-left'}`}
      style={{ maxWidth: layoutStyle(t).maxW, margin: '0 auto' }}
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
  const center = t.layout !== 'editorial'

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
      className={`flex flex-col py-16 px-8 w-full ${center ? 'items-center' : 'items-start'}`}
      style={{ maxWidth: layoutStyle(t).maxW, margin: '0 auto' }}
    >
      <h3 className={`mb-2 ${center ? 'text-center' : 'text-left'}`} style={{ fontFamily: t.font, fontStyle: t.fontStyle, fontSize: `calc(clamp(2.4rem, 7vw, 3.2rem) * ${t.fontScale})`, color: t.accent, letterSpacing: '0.01em', lineHeight: 1.1 }}>
        Be Our Guest
      </h3>
      <p className={`font-inter mb-8 ${center ? 'text-center' : 'text-left'}`} style={{ fontSize: 12, letterSpacing: '0.06em', color: t.ink, opacity: 0.55 }}>
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

          <motion.button type="submit" disabled={!isValid || status === 'submitting'} whileTap={reduced || !isValid ? {} : { scale: 0.97 }}
            className="w-full rounded-full py-4 font-inter transition-all"
            style={{
              background: isValid ? t.accent : (t.dark ? 'rgba(255,255,255,0.08)' : 'rgba(26,24,22,0.07)'),
              color: isValid ? (isLightHex(t.accent) ? t.paper : '#FDFCF9') : (t.dark ? 'rgba(236,234,227,0.45)' : 'rgba(26,24,22,0.38)'),
              fontSize: 13, letterSpacing: '0.06em',
              boxShadow: isValid ? `0 6px 20px ${hexA(t.accent, 0.3)}` : 'none',
              cursor: isValid ? 'pointer' : 'not-allowed',
            }}>
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
      return { align: 'left' as const, items: 'items-start', text: 'text-left' as const, maxW: 660, pad: 'px-7 py-16', headingScale: 1.22, eyebrow: true, frame: false, headFont: t.font, headItalic: t.fontStyle === 'italic', rule: 'bar' as const }
    case 'paper':
      return { align: 'center' as const, items: 'items-center', text: 'text-center' as const, maxW: 540, pad: 'px-7 py-14', headingScale: 0.8, eyebrow: false, frame: true, headFont: 'var(--font-cormorant)', headItalic: true, rule: 'diamond' as const }
    case 'ethereal':
      return { align: 'center' as const, items: 'items-center', text: 'text-center' as const, maxW: 480, pad: 'px-8 py-[4.5rem]', headingScale: 1.08, eyebrow: false, frame: false, headFont: t.font, headItalic: t.fontStyle === 'italic', rule: 'hair' as const }
    default:
      return { align: 'center' as const, items: 'items-center', text: 'text-center' as const, maxW: 580, pad: 'px-8 py-14', headingScale: 1.02, eyebrow: false, frame: false, headFont: t.font, headItalic: t.fontStyle === 'italic', rule: 'ornament' as const }
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
      // New model: an ordered `events` list. Legacy ceremony/reception fields are
      // read as a fallback so invites built before custom events still render.
      const events = (Array.isArray(cfg.events) ? cfg.events : []) as { label?: string; time?: string; venue?: string }[]
      const legacy = [
        (cfg.ceremony_time || cfg.ceremony_venue) && { label: 'Ceremony', time: cfg.ceremony_time as string, venue: cfg.ceremony_venue as string },
        (cfg.reception_time || cfg.reception_venue) && { label: 'Reception', time: cfg.reception_time as string, venue: cfg.reception_venue as string },
      ].filter(Boolean) as { label: string; time?: string; venue?: string }[]
      const items = (events.length ? events : legacy)
        .filter((e) => e && (e.label || e.time || e.venue))
        .map((e) => ({ label: e.label || 'Event', time: e.time, venue: e.venue }))
      content = items.length ? <ScheduleBlock t={t} ls={ls} index={index} items={items} notes={cfg.notes ? String(cfg.notes) : null} /> : null
      break
    }
    case 'venue':
      content = (cfg.name || cfg.address) ? <VenuePlaque t={t} ls={ls} index={index} cfg={cfg} /> : null
      break
    case 'gallery':
      content = <GalleryBlock t={t} ls={ls} index={index} note={cfg.note ? String(cfg.note) : null} />
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

  const isGallery = section.type === 'gallery'
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col ${ls.items} ${isGallery ? 'py-14' : ls.pad}`}
      style={{
        maxWidth: ls.frame ? 560 : isGallery ? 'min(90vw, 860px)' : ls.maxW,
        margin: '0 auto',
        width: isGallery ? '100%' : undefined,
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
      {/* a small themed sprig — the stationery signature above each title */}
      <span className={`mb-3.5 flex ${center ? 'justify-center' : 'justify-start'}`} aria-hidden>
        <Sprig color={t.accent} opacity={0.5} style={{ width: center ? 76 : 58, height: 'auto' }} />
      </span>
      {ls.eyebrow ? <Eyebrow t={t} index={index} number /> : null}
      <h3 className={ls.eyebrow ? 'mt-2' : ''} style={{ fontFamily: ls.headFont, fontStyle: ls.headItalic ? 'italic' : 'normal', fontSize: `calc(clamp(2.2rem, 7.2vw, 3.4rem) * ${t.fontScale * ls.headingScale})`, color: ls.frame ? t.ink : t.accent, letterSpacing: ls.headItalic ? '0.005em' : '0.01em', lineHeight: 1.1 }}>{title}</h3>
      <SectionRule t={t} kind={ls.rule} center={center} />
    </div>
  )
}

// Atmospheric band wrapper: an alternating background + a faint, corner-anchored
// botanical watermark (variant + side rotate by index, so neighbouring sections
// never share a silhouette) + the divider. All vector & static — paint-cheap.
function SectionBand({ index, children }: { index: number; children: React.ReactNode }) {
  const t = useTheme()
  const bands =
    t.layout === 'ethereal' ? [t.paper, t.wash]
    : t.layout === 'editorial' ? [t.wash, t.washAlt]
    : [t.wash, t.washAlt]
  const bg = bands[index % 2]
  const left = index % 2 === 0
  const variant = (['a', 'b', 'c'] as const)[index % 3]
  return (
    <div className="relative overflow-hidden" style={{ background: bg }}>
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          left: left ? '-5%' : 'auto', right: left ? 'auto' : '-5%', bottom: '-4%',
          width: 'clamp(160px, 30vw, 320px)', aspectRatio: '22 / 30', zIndex: 0,
          transform: left ? 'none' : 'scaleX(-1)',
        }}
      >
        <BotanicalSpray variant={variant} color={t.accent} opacity={t.dark ? 0.09 : 0.06} />
      </div>
      <div className="relative" style={{ zIndex: 1 }}>
        {index > 0 && <OrnamentDivider />}
        {children}
      </div>
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
              {/* Times always in a serif (not the theme's script face) so "3:00 PM" stays legible. */}
              {it.time && <p className="leading-none mt-1.5" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 30, color: t.ink, letterSpacing: '-0.01em' }}>{it.time}</p>}
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

// GALLERY — a swipeable "album" carousel: one large framed print at a time with
// the neighbours peeking, a display-face counter + arrows, and a fullscreen
// lightbox on tap. Every token (frame, radius, accent) flows from the theme so it
// stays elegant across classic / editorial / paper / ethereal. Falls back to
// placeholder tiles only when no photos were uploaded.
//
// The section's maxWidth is widened to min(94vw, 1000px) for gallery in SectionBlock
// so the carousel can breathe on wide desktop screens. The heading text is re-
// constrained here so it stays readable width regardless of screen size.
function GalleryBlock({ t, ls, index, note }: { t: Theme; ls: LS; index: number; note: string | null }) {
  const center = ls.align !== 'left'
  const images = useGallery()

  if (images.length > 0) {
    return (
      <div className="w-full">
        {/* heading stays readable-width centered */}
        <div style={{ maxWidth: 560, margin: center ? '0 auto' : '0', padding: '0 2rem' }}>
          <SectionHeader t={t} ls={ls} index={index} title="Moments" />
          {note ? <p className={`font-inter mt-3 ${center ? 'mx-auto text-center' : 'text-left'}`} style={{ fontSize: 13.5, color: t.ink, opacity: 0.72, maxWidth: '40ch' }}>{note}</p> : null}
        </div>
        <GalleryCarousel t={t} ls={ls} images={images} />
      </div>
    )
  }

  const radius = ls.rule === 'diamond' ? 2 : 6
  const tiles = ['col-span-2 row-span-2 aspect-[4/3]', 'aspect-square', 'aspect-square', 'aspect-square', 'col-span-2 aspect-[2/1]']
  return (
    <div className="w-full" style={{ maxWidth: 460, margin: center ? '0 auto' : '0' }}>
      <SectionHeader t={t} ls={ls} index={index} title="Moments" />
      {note ? <p className={`font-inter mt-3 ${center ? 'mx-auto text-center' : 'text-left'}`} style={{ fontSize: 13.5, color: t.ink, opacity: 0.72, maxWidth: '40ch' }}>{note}</p> : null}
      <div className="mt-6 grid grid-cols-3 gap-2.5">
        {tiles.map((cls, i) => (
          <div key={i} className={`relative overflow-hidden ${cls}`} style={{ borderRadius: radius, background: `linear-gradient(135deg, ${hexA(t.accent, 0.16)} 0%, ${hexA(t.accent, 0.05)} 100%)`, border: `1px solid ${hexA(t.accent, 0.18)}` }}>
            <div className="absolute inset-0 flex items-center justify-center" style={{ opacity: 0.3 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden><rect x="3" y="5" width="18" height="14" rx="2" stroke={t.accent} strokeWidth="1.2" /><circle cx="8.5" cy="10" r="1.6" fill={t.accent} /><path d="M5 17l4.5-4 3 2.5L17 11l2 2" stroke={t.accent} strokeWidth="1.2" /></svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// The album carousel — scroll-snap track (touch-swipe on mobile, arrows on desktop).
// Each print is a uniform 4:5 frame at clamp(260px, 55%, 520px) so on a 1920px
// desktop (940px track) slides are ~517px — large and elegant — while mobile gets
// 260-300px with the next peeking. IntersectionObserver tracks the active slide
// reliably without polling scrollLeft every frame. Active index is also updated
// immediately on button click so Prev/Next never uses a stale value.
function GalleryCarousel({ t, ls, images }: { t: Theme; ls: LS; images: GalleryImage[] }) {
  const reduced = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef(0)              // always current, avoids stale closures
  const [active, setActiveState] = useState(0)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const radius = ls.rule === 'diamond' ? 3 : 10
  const single = images.length === 1

  const setActive = (i: number) => { activeRef.current = i; setActiveState(i) }

  // programmaticRef: true while goTo's smooth-scroll is in flight so onScroll
  // doesn't override the already-correct active state with a stale scrollLeft read.
  // programmaticTimer is cleared+reset on each goTo so rapid clicks extend the guard.
  const programmaticRef = useRef(false)
  const programmaticTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rafRef = useRef(0)

  // onScroll: fires on user swipe. Finds the slide whose center is closest to the
  // track's visible center — no formula, no padding assumptions, always correct.
  const onScroll = () => {
    if (programmaticRef.current) return
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const el = trackRef.current
      if (!el) return
      const mid = el.scrollLeft + el.clientWidth / 2
      let best = 0, bestDist = Infinity
      Array.from(el.children).forEach((c, i) => {
        const node = c as HTMLElement
        const dist = Math.abs((node.offsetLeft + node.offsetWidth / 2) - mid)
        if (dist < bestDist) { bestDist = dist; best = i }
      })
      setActive(best)
    })
  }

  // goTo: update active immediately, then scroll. Guard onScroll for ~450ms
  // (smooth-scroll typically settles in 300-400ms).
  const goTo = (i: number) => {
    const el = trackRef.current
    if (!el) return
    const clamped = Math.max(0, Math.min(images.length - 1, i))
    setActive(clamped)
    const node = el.children[clamped] as HTMLElement | undefined
    if (!node) return
    programmaticRef.current = true
    if (programmaticTimer.current) clearTimeout(programmaticTimer.current)
    el.scrollTo({ left: node.offsetLeft - (el.clientWidth - node.offsetWidth) / 2, behavior: 'auto' })
    programmaticTimer.current = setTimeout(() => { programmaticRef.current = false }, 80)
  }

  const ArrowBtn = ({ dir }: { dir: -1 | 1 }) => (
    <button
      type="button"
      onClick={() => goTo(activeRef.current + dir)}
      disabled={dir === -1 ? active === 0 : active === images.length - 1}
      aria-label={dir === -1 ? 'Previous photo' : 'Next photo'}
      className="flex items-center justify-center rounded-full transition-opacity disabled:opacity-25"
      style={{ width: 42, height: 42, border: `1px solid ${hexA(t.accent, 0.32)}`, background: hexA(t.accent, 0.05) }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden
        style={{ transform: dir === 1 ? 'scaleX(-1)' : 'none' }}>
        <path d="M9 2L4 7l5 5" stroke={t.accent} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )

  return (
    <div className="mt-8 w-full">
      {/* scroll-snap track — full parent width so the wider SectionBlock gives
          slides room to breathe on large screens */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="no-scrollbar flex gap-5 overflow-x-auto"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          paddingTop: 12,
          paddingBottom: 16,
        }}
      >
        {images.map((img, i) => (
          <button
            type="button"
            key={i}
            onClick={() => setLightbox(i)}
            aria-label={`View photo ${i + 1} of ${images.length}`}
            className="group relative flex-none overflow-hidden"
            style={{
              scrollSnapAlign: 'center',
              width: single ? 'min(88%, 520px)' : 'clamp(240px, 62%, 520px)',
              margin: single ? '0 auto' : undefined,
              aspectRatio: '4 / 5',
              borderRadius: radius,
              border: `1px solid ${hexA(t.accent, 0.28)}`,
              outline: `1px solid ${hexA(t.accent, 0.10)}`,
              outlineOffset: 5,
              background: hexA(t.accent, 0.06),
              boxShadow: `0 8px 32px ${hexA(t.dark ? '#000000' : t.ink, t.dark ? 0.35 : 0.12)}`,
              flexShrink: 0,
            }}
          >
            <img
              src={img.medium ?? img.url}
              alt=""
              loading="lazy"
              draggable={false}
              className="absolute inset-0 h-full w-full"
              style={{ objectFit: 'cover' }}
            />
            <span aria-hidden className="absolute inset-0"
              style={{ background: `linear-gradient(180deg, transparent 60%, ${hexA('#000000', t.dark ? 0.28 : 0.16)} 100%)` }} />
            <span aria-hidden className="absolute bottom-3 right-3 flex items-center justify-center rounded-full opacity-0 transition-opacity duration-150 group-hover:opacity-100"
              style={{ width: 30, height: 30, background: hexA('#FDFCF9', 0.9) }}>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M5 1H1v4M9 1h4v4M13 9v4H9M1 9v4h4" stroke={t.accent} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        ))}
      </div>

      {!single && (
        <div className="mt-5 flex items-center justify-center gap-5">
          <ArrowBtn dir={-1} />
          <span style={{ fontFamily: t.font, fontStyle: t.fontStyle, fontSize: `calc(20px * ${t.fontScale})`, color: t.ink, letterSpacing: '0.04em', minWidth: 68, textAlign: 'center' }}>
            <span style={{ color: t.accent }}>{String(active + 1).padStart(2, '0')}</span>
            <span style={{ opacity: 0.35, margin: '0 6px', fontSize: '0.68em' }}>/</span>
            <span style={{ opacity: 0.5 }}>{String(images.length).padStart(2, '0')}</span>
          </span>
          <ArrowBtn dir={1} />
        </div>
      )}

      <GalleryLightbox images={images} index={lightbox} onClose={() => setLightbox(null)} onIndex={setLightbox} accent={t.accent} />
    </div>
  )
}

// Fullscreen lightbox. Performance choices:
// • No backdropFilter on the scrim — it repaints the full viewport every frame.
// • No framer-motion `drag` — it registers continuous PointerEvent listeners and
//   does per-frame hit-testing even when idle. Replaced with onPointerDown/Up.
// • Image crossfade uses AnimatePresence sync mode (not "wait") so both images
//   exist simultaneously; the outgoing fades while the incoming fades in → instant
//   feel. Images are absolutely positioned inside a sized container so they overlap.
function GalleryLightbox({ images, index, onClose, onIndex, accent }: {
  images: GalleryImage[]; index: number | null; onClose: () => void; onIndex: (i: number) => void; accent: string
}) {
  const open = index !== null
  const swipeStart = useRef<number | null>(null)

  const step = (dir: -1 | 1, cur: number) => {
    const next = cur + dir
    if (next >= 0 && next < images.length) onIndex(next)
  }

  useEffect(() => {
    if (!open || index === null) return
    const cur = index
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') step(-1, cur)
      else if (e.key === 'ArrowRight') step(1, cur)
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [open, index]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AnimatePresence>
      {open && index !== null && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center"
          style={{ background: 'rgba(10,9,8,0.94)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
        >
          {/* close */}
          <button type="button" onClick={onClose} aria-label="Close"
            className="absolute right-4 top-4 z-10 flex items-center justify-center rounded-full"
            style={{ width: 44, height: 44, background: 'rgba(253,252,249,0.12)', border: '1px solid rgba(253,252,249,0.28)' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M3 3l10 10M13 3L3 13" stroke="#FDFCF9" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          {/* prev */}
          {images.length > 1 && (
            <button type="button" onClick={e => { e.stopPropagation(); step(-1, index) }} disabled={index === 0}
              aria-label="Previous" className="absolute left-3 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full transition-opacity disabled:opacity-0"
              style={{ width: 48, height: 48, background: 'rgba(253,252,249,0.12)', border: '1px solid rgba(253,252,249,0.28)' }}>
              <svg width="18" height="18" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M9 2L4 7l5 5" stroke="#FDFCF9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          {/* next */}
          {images.length > 1 && (
            <button type="button" onClick={e => { e.stopPropagation(); step(1, index) }} disabled={index === images.length - 1}
              aria-label="Next" className="absolute right-3 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full transition-opacity disabled:opacity-0"
              style={{ width: 48, height: 48, background: 'rgba(253,252,249,0.12)', border: '1px solid rgba(253,252,249,0.28)' }}>
              <svg width="18" height="18" viewBox="0 0 14 14" fill="none" aria-hidden style={{ transform: 'scaleX(-1)' }}>
                <path d="M9 2L4 7l5 5" stroke="#FDFCF9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          {/* image — sync crossfade, pointer-based swipe, no framer drag */}
          <div
            className="relative flex items-center justify-center"
            style={{ maxHeight: '86vh', maxWidth: '92vw', width: '92vw', height: '86vh' }}
            onClick={e => e.stopPropagation()}
            onPointerDown={e => { swipeStart.current = e.clientX }}
            onPointerUp={e => {
              if (swipeStart.current === null) return
              const dx = e.clientX - swipeStart.current
              swipeStart.current = null
              if (Math.abs(dx) < 40) return
              if (dx < 0) step(1, index)
              else step(-1, index)
            }}
          >
            <AnimatePresence initial={false}>
              <motion.img
                key={index}
                src={images[index].url || images[index].medium}
                alt=""
                draggable={false}
                className="absolute select-none"
                style={{ maxHeight: '86vh', maxWidth: '92vw', objectFit: 'contain', borderRadius: 4, boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              />
            </AnimatePresence>
          </div>

          <span className="font-inter absolute bottom-6 left-1/2 -translate-x-1/2" style={{ fontSize: 12, letterSpacing: '0.16em', color: 'rgba(253,252,249,0.65)' }}>
            {String(index + 1).padStart(2, '0')} &nbsp;/&nbsp; {String(images.length).padStart(2, '0')}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// TRAVEL — a boarding-pass card with an accent stub and a plane mark.
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
const DRESS_CODE_SWATCHES: Record<string, { hex: string; name: string }[]> = {
  'black-tie':   [{ hex: '#1A1816', name: 'Black' }, { hex: '#191970', name: 'Midnight Blue' }, { hex: '#F8F6F2', name: 'White' }, { hex: '#B8B8B8', name: 'Silver' }, { hex: '#4A0E2A', name: 'Deep Burgundy' }],
  'formal':      [{ hex: '#1B2A4A', name: 'Navy' }, { hex: '#4A4A4A', name: 'Charcoal' }, { hex: '#722F37', name: 'Burgundy' }, { hex: '#2D5016', name: 'Forest Green' }, { hex: '#FFFFF0', name: 'Ivory' }],
  'cocktail':    [{ hex: '#2E8B57', name: 'Emerald' }, { hex: '#0047AB', name: 'Cobalt Blue' }, { hex: '#673147', name: 'Plum' }, { hex: '#722F37', name: 'Burgundy' }, { hex: '#1A1816', name: 'Black' }],
  'semi-formal': [{ hex: '#91A694', name: 'Sage Green' }, { hex: '#7BA7BC', name: 'Dusty Blue' }, { hex: '#C8A2A2', name: 'Mauve' }, { hex: '#D3D3D3', name: 'Light Gray' }, { hex: '#E8DCC8', name: 'Beige' }],
}

function DressCodeBlock({ t, ls, index, code, notes }: { t: Theme; ls: LS; index: number; code: string | null; notes: string | null }) {
  const center = ls.align !== 'left'
  const swatches = code ? (DRESS_CODE_SWATCHES[code] ?? null) : null
  return (
    <div className="w-full" style={{ maxWidth: 440, margin: center ? '0 auto' : '0' }}>
      <SectionHeader t={t} ls={ls} index={index} title="Dress Code" />
      {code && <p className={`mt-5 ${center ? 'text-center' : 'text-left'}`} style={{ fontFamily: t.font, fontStyle: t.fontStyle, fontSize: `calc(22px * ${t.fontScale})`, color: t.accent, textTransform: 'capitalize' }}>{code.replace('-', '‑')}</p>}
      {swatches && (
        <div className={`mt-4 flex gap-3 ${center ? 'justify-center' : ''}`} aria-hidden>
          {swatches.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <span style={{ width: 34, height: 34, borderRadius: '50%', background: s.hex, border: `1px solid rgba(26,24,22,0.14)`, boxShadow: '0 2px 8px rgba(26,24,22,0.10)', display: 'block' }} />
              <span className="font-inter" style={{ fontSize: 8.5, letterSpacing: '0.04em', color: hexA(t.ink, 0.5), textAlign: 'center', lineHeight: 1.2, maxWidth: 44 }}>{s.name}</span>
            </div>
          ))}
        </div>
      )}
      {notes && <p className={`font-inter mt-4 ${center ? 'mx-auto text-center' : 'text-left'}`} style={{ fontSize: 13.5, lineHeight: 1.7, color: t.ink, opacity: 0.74, maxWidth: '40ch' }}>{notes}</p>}
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
function OpeningHero({ invite, opening, media, inPreview }: { invite: InvitationViewInvite; opening: Section | null; media: MediaAsset[]; inPreview: boolean }) {
  const reduced = useReducedMotion()
  const { t } = useTranslation()
  const cfg = (opening?.config ?? {}) as Record<string, unknown>
  const nameA = (cfg.name_a as string | undefined)?.trim() ?? ''
  const nameB = (cfg.name_b as string | undefined)?.trim() ?? ''
  const names = nameA && nameB ? `${nameA} & ${nameB}` : nameA || nameB || invite.display_title || 'Your names'
  const date = formatDate(invite.event_date ?? null)
  const familiesNote = (cfg.families_note as string | undefined)?.trim() || t.invite.familiesNote
  const heroLayout = ((cfg.hero_layout as HeroLayout | undefined) ?? DEFAULT_HERO_LAYOUT)

  const preset = VIDEO_PRESETS.find(p => p.id === cfg.video_preset) ?? null
  const uploadedAsset = media.find(m => m.id === cfg.video_asset_id && m.status === 'ready') ?? null
  const videoSrc = uploadedAsset ? (uploadedAsset.variants as { mp4?: string }).mp4 ?? null : preset?.src ?? null
  const videoHls = uploadedAsset ? (uploadedAsset.variants as { hls?: string }).hls ?? null : null
  const posterImg = uploadedAsset ? (uploadedAsset.variants as { poster?: string }).poster ?? null : preset?.posterImg ?? null
  const posterStyle = preset ? { background: `linear-gradient(160deg, ${preset.poster.from} 0%, ${preset.poster.to} 100%)` } : { background: 'linear-gradient(160deg, #F3EFE7 0%, #C9B89A 100%)' }

  // const track = MUSIC_TRACKS.find(tk => tk.id === cfg.music_track)
  // const musicAsset = media.find(m => m.id === cfg.music_asset_id && m.status === 'ready')
  // const musicSrc = musicAsset ? (musicAsset.variants as { url?: string }).url ?? null : track?.src ?? null

  const th = useTheme()
  const leg = cardLegibility({ paper: th.paper, dark: th.dark })
  // const [musicPlaying, setMusicPlaying] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // useEffect(() => {
  //   if (musicSrc && musicRef.current) { musicRef.current.src = musicSrc; musicRef.current.loop = true }
  // }, [musicSrc, musicRef])
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // const toggleMusic = () => {
  //   if (!musicRef.current) return
  //   if (musicPlaying) { musicRef.current.pause(); setMusicPlaying(false) }
  //   else void musicRef.current.play().then(() => setMusicPlaying(true)).catch(() => {})
  // }

  return (
    <section className="relative flex h-[100dvh] flex-col items-center justify-center overflow-hidden" style={{ paddingTop: inPreview ? 56 : 0 }}>
      {/* The hero film plays from the start so the opener dissolves INTO an
          already-moving film — a seamless "opening into the video", never a
          stop-and-restart. (Do not gate this on `opened`.) */}
      <FilmBackdrop videoSrc={videoSrc} hlsSrc={videoHls} poster={posterImg} fallbackStyle={posterStyle}
        mode={uploadedAsset ? ((cfg.video_fit as FilmFit) ?? 'auto') : 'auto'} focal={(cfg.video_focal as FilmFocal) ?? null} autoPlay reduced={!!reduced} />

      {heroLayout === 'open' ? (
        <>
          {/* OPEN — names large, directly over the film. A cinematic top→bottom
              scrim keeps the type legible while leaving the film visible. Accent
              drives the eyebrow + flourish so every palette restyles it. */}
          <div className="absolute inset-0" aria-hidden style={{ background: 'linear-gradient(180deg, rgba(12,10,8,0.46) 0%, rgba(12,10,8,0.12) 40%, rgba(12,10,8,0.30) 70%, rgba(12,10,8,0.62) 100%)' }} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="relative z-10 mx-6 flex flex-col items-center text-center" style={{ maxWidth: 760, width: '100%' }}>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.7 }}
              className="font-inter uppercase block" style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.28em', color: 'rgba(253,252,249,0.96)', textShadow: '0 1px 3px rgba(0,0,0,0.6), 0 2px 16px rgba(0,0,0,0.5)' }}>{familiesNote}</motion.span>
            <motion.h1 className="leading-[0.95] mt-5 mb-6" style={{ fontFamily: th.font, fontStyle: th.fontStyle, fontSize: `calc(clamp(3rem, 12vw, 6rem) * ${th.fontScale})`, color: th.accent, letterSpacing: '0.005em', textShadow: '0 2px 12px rgba(0,0,0,0.45), 0 2px 44px rgba(0,0,0,0.5)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55, duration: 0.8 }}>{names}</motion.h1>
            <MiniFlourish color={hexA(th.accent, 0.92)} className="mx-auto mb-6" style={{ width: 96, height: 'auto' }} />
            {date && <p className="font-inter uppercase" style={{ fontSize: 12, letterSpacing: '0.22em', color: 'rgba(253,252,249,0.94)', textShadow: '0 1px 14px rgba(0,0,0,0.5)' }}>{date}</p>}
            {invite.venue_name && <p className="font-inter mt-2.5" style={{ fontSize: 11.5, letterSpacing: '0.08em', color: 'rgba(253,252,249,0.78)', textShadow: '0 1px 14px rgba(0,0,0,0.5)' }}>{invite.venue_name}</p>}
          </motion.div>
        </>
      ) : (
        <>
          {/* CARD — the glass "stationery" card: frame + corners + crest, names inside. */}
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(253,252,249,0.08) 0%, rgba(26,24,22,0.38) 100%)' }} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="relative isolate z-10 mx-6 px-10 py-14 text-center" style={{ maxWidth: 430, width: '100%' }}>
            <div aria-hidden className="absolute inset-0" style={{ ...leg.glass, zIndex: -1 }} />
            <HeroFrame color={th.accent} />
            <HeroCorners color={th.accent} />

            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.7 }} className="block">
              <HeroCrest color={th.accent} style={{ margin: '0 auto' }} />
            </motion.span>
            <span className="font-inter uppercase block mt-3.5" style={{ fontSize: 9, letterSpacing: '0.32em', color: th.ink, opacity: 0.6, textShadow: leg.textShadow }}>{familiesNote}</span>
            <motion.h1 className="leading-tight mt-3 mb-4" style={{ fontFamily: th.font, fontStyle: th.fontStyle, fontSize: `calc(clamp(3rem, 11vw, 4.6rem) * ${th.fontScale})`, color: th.accent, letterSpacing: '0.01em', textShadow: leg.textShadow }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55, duration: 0.8 }}>{names}</motion.h1>
            <MiniFlourish color={th.accent} className="mx-auto mb-4" style={{ width: 78, height: 'auto', opacity: 0.9 }} />
            {date && <p className="font-cormorant italic font-light" style={{ fontSize: 18, color: th.ink, opacity: 0.92, textShadow: leg.textShadow }}>{date}</p>}
            {invite.venue_name && <p className="font-inter mt-1.5" style={{ fontSize: 11, letterSpacing: '0.08em', color: th.ink, opacity: 0.7, textShadow: leg.textShadow }}>{invite.venue_name}</p>}
          </motion.div>
        </>
      )}

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
  // const musicRef = useRef<HTMLAudioElement | null>(null)
  // useEffect(() => {
  //   musicRef.current = new Audio()
  //   musicRef.current.volume = 0.55
  //   return () => { musicRef.current?.pause() }
  // }, [])

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

  // The film revealed behind the opener as it opens.
  const openPreset = VIDEO_PRESETS.find(p => p.id === (cfg.video_preset as string)) ?? null
  const openUploaded = media.find(m => m.id === cfg.video_asset_id && m.status === 'ready') ?? null
  const themeVideo = openUploaded ? (openUploaded.variants as { mp4?: string }).mp4 ?? null : openPreset?.src ?? null
  const themeHls = openUploaded ? (openUploaded.variants as { hls?: string }).hls ?? null : null
  const themePoster = openUploaded ? (openUploaded.variants as { poster?: string }).poster ?? null : openPreset?.posterImg ?? VIDEO_PRESETS[0].posterImg
  const names = meta.names

  // Gallery photos — resolved URLs live in each ready gallery_image's variants
  // (signed for builder/preview, snapshot URLs once published).
  const galleryImages: GalleryImage[] = media
    .filter(m => m.kind === 'gallery_image' && m.status === 'ready')
    .map(m => {
      const v = (m.variants ?? {}) as { url?: string; thumb?: string; medium?: string }
      return { url: v.url ?? v.medium ?? v.thumb ?? '', thumb: v.thumb, medium: v.medium }
    })
    .filter(g => g.url)

  // A section the couple enabled but left empty must NOT render — otherwise its
  // band + divider + watermark paint as a phantom block with huge empty space
  // (the "broken/sparse" look). Mirror SectionBlock's own content checks here so
  // only sections that will actually paint get a band, and band index parity
  // (alternating bg + the "index > 0" divider) is computed off the filtered list.
  const sectionHasContent = (sec: Section): boolean => {
    const c = (sec.config ?? {}) as Record<string, unknown>
    switch (sec.type) {
      case 'story': return !!c.text
      case 'schedule': {
        const ev = (Array.isArray(c.events) ? c.events : []) as Array<{ label?: string; time?: string; venue?: string }>
        return ev.some(e => e && (e.label || e.time || e.venue)) || !!(c.ceremony_time || c.ceremony_venue || c.reception_time || c.reception_venue)
      }
      case 'venue': return !!(c.name || c.address)
      case 'gallery': return galleryImages.length > 0
      case 'gifts': return !!c.content
      case 'dress_code': return !!(c.code || c.notes)
      case 'faq': return Array.isArray(c.questions) && c.questions.length > 0
      default: return true
    }
  }
  const visibleSections = contentSections.filter(sectionHasContent)

  return (
    <ThemeCtx.Provider value={theme}>
      <GalleryCtx.Provider value={galleryImages}>
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
                videoFit={openUploaded ? ((cfg.video_fit as 'auto' | 'blend' | 'crop') ?? 'auto') : 'auto'}
                videoFocal={(cfg.video_focal as { x: number; y: number }) ?? null}
                onOpen={() => { setOpenerLeaving(true); setTimeout(() => setOpened(true), 1100) }}
              />
            </motion.div>
          )}

          <main style={{ background: theme.wash }}>
            <OpeningHero invite={invite} opening={opening} media={media} inPreview={rsvp.kind === 'preview'} />

            {visibleSections.length > 0 && (
              <div>
                {visibleSections.map((sec, i) => (
                  <SectionBand key={sec.id} index={i}>
                    <SectionBlock section={sec} index={i} />
                  </SectionBand>
                ))}
              </div>
            )}

            {invite.event_date && (
              <SectionBand index={visibleSections.length}>
                <CountdownTimer eventDate={invite.event_date} />
              </SectionBand>
            )}

            <SectionBand index={visibleSections.length + 1}>
              <RsvpSection />
            </SectionBand>

            <footer className="py-20" style={{ background: theme.dark ? theme.washAlt : '#1A1816' }}>
              <div className={`flex flex-col gap-4 w-full px-8 ${theme.layout === 'editorial' ? 'items-start text-left' : 'items-center text-center'}`} style={{ maxWidth: layoutStyle(theme).maxW, margin: '0 auto' }}>
                <OrnamentDivider />
                {(nameA || nameB) && <p style={{ fontFamily: theme.font, fontStyle: theme.fontStyle, fontSize: `calc(clamp(2rem, 8vw, 3rem) * ${theme.fontScale})`, color: 'rgba(253,252,249,0.9)', letterSpacing: '0.01em', lineHeight: 1.1 }}>{nameA && nameB ? `${nameA} & ${nameB}` : nameA || nameB}</p>}
                {date && <p className="font-cormorant italic font-light" style={{ fontSize: 16, color: 'rgba(253,252,249,0.4)' }}>{date}</p>}
                <p className="font-cormorant italic font-light mt-2" style={{ fontSize: 18, color: 'rgba(253,252,249,0.55)' }}>We can&rsquo;t wait to celebrate with you.</p>
                <p className="font-inter mt-4" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(253,252,249,0.18)', textTransform: 'uppercase' }}>Made with Digital Invite</p>
              </div>
            </footer>
          </main>
        </RsvpCtx.Provider>
      </MetaCtx.Provider>
      </GalleryCtx.Provider>
    </ThemeCtx.Provider>
  )
}
