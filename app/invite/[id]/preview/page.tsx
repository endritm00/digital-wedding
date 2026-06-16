'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { api } from '@/lib/builder/api'
import type { Invite, Section, MediaAsset } from '@/lib/builder/api'
import {
  VIDEO_PRESETS, MUSIC_TRACKS, SECTION_LABELS,
  PALETTE_MAP, DEFAULT_PALETTE, HEADING_FONT_MAP, DEFAULT_HEADING_FONT,
} from '@/lib/builder/presets'
import type { LayoutFamily } from '@/lib/builder/presets'
import { InviteOpener } from '@/components/invite/openers'
import { FilmBackdrop } from '@/components/invite/film-backdrop'
import Link from 'next/link'

// ── types ─────────────────────────────────────────────────────────────────────

type PreviewState = 'loading' | 'ready' | 'error'
type RsvpStatus = 'idle' | 'submitting' | 'success' | 'error'

// ── theme context (palette + heading font, chosen in the Style step) ───────────

interface Theme {
  accent: string
  accentSoft: string
  paper: string
  ink: string
  wash: string
  washAlt: string
  font: string       // heading font-family
  fontScale: number
  fontStyle: 'normal' | 'italic'
  dark: boolean
  layout: LayoutFamily
}

const DEFAULT_THEME: Theme = {
  accent: DEFAULT_PALETTE.accent,
  accentSoft: DEFAULT_PALETTE.accentSoft,
  paper: DEFAULT_PALETTE.paper,
  ink: DEFAULT_PALETTE.ink,
  wash: DEFAULT_PALETTE.wash,
  washAlt: DEFAULT_PALETTE.washAlt,
  font: DEFAULT_HEADING_FONT.var,
  fontScale: DEFAULT_HEADING_FONT.scale,
  fontStyle: 'normal',
  dark: false,
  layout: DEFAULT_PALETTE.layout,
}

const ThemeCtx = createContext<Theme>(DEFAULT_THEME)
const useTheme = () => useContext(ThemeCtx)

// Invite meta available to any section (e.g. Add-to-Calendar, RSVP).
interface InviteMeta { names: string; dateISO: string | null; dateLabel: string | null; venueName: string | null; venueAddress: string | null }
const MetaCtx = createContext<InviteMeta>({ names: '', dateISO: null, dateLabel: null, venueName: null, venueAddress: null })
const useMeta = () => useContext(MetaCtx)

// Build a Google Calendar event URL from the invite meta.
function googleCalUrl(m: InviteMeta): string {
  if (!m.dateISO) return ''
  const d = m.dateISO.replace(/-/g, '')
  const next = (() => { const dt = new Date(`${m.dateISO}T00:00:00`); dt.setDate(dt.getDate() + 1); return dt.toISOString().slice(0, 10).replace(/-/g, '') })()
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${m.names} — Wedding`,
    dates: `${d}/${next}`,
    details: 'We can’t wait to celebrate with you.',
    location: m.venueAddress || m.venueName || '',
  })
  return `https://calendar.google.com/calendar/render?${p.toString()}`
}

// A themed pill button (link).
function PillLink({ href, accent, children }: { href: string; accent: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="font-inter inline-flex items-center gap-1.5 rounded-full px-4 py-2 transition-colors"
      style={{ fontSize: 11, letterSpacing: '0.06em', color: accent, border: `1px solid ${hexA(accent, 0.3)}`, background: hexA(accent, 0.06), textDecoration: 'none' }}>
      {children}
    </a>
  )
}

// ── helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string | null): string | null {
  if (!iso) return null
  const d = new Date(`${iso}T12:00:00`)
  return Number.isNaN(d.getTime()) ? null : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function copyLink() {
  void navigator.clipboard.writeText(window.location.href)
}

// hex (#RRGGBB) → rgba(r,g,b,a). Lets palette accents drive translucent fills.
function hexA(hex: string, a: number): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

// ── ornament components ───────────────────────────────────────────────────────

function OrnamentDivider() {
  const t = useTheme()
  const a = t.accent
  // editorial → no divider (sections butt together); ethereal → a long hairline;
  // paper → a small diamond; classic → the full medallion ornament.
  if (t.layout === 'editorial') return <div className="h-px w-full" style={{ background: hexA(a, 0.12) }} />
  if (t.layout === 'ethereal') return (
    <div className="flex items-center justify-center py-4"><span style={{ width: 140, height: 1, background: hexA(a, 0.4) }} /></div>
  )
  if (t.layout === 'paper') return (
    <div className="flex items-center justify-center py-7"><span style={{ width: 9, height: 9, background: a, transform: 'rotate(45deg)', opacity: 0.55 }} /></div>
  )
  return (
    <div className="flex items-center justify-center py-8 px-6">
      <svg width="280" height="20" viewBox="0 0 280 20" fill="none" aria-hidden="true">
        <line x1="0" y1="10" x2="108" y2="10" stroke={a} strokeOpacity="0.3" strokeWidth="0.75"/>
        <rect x="104" y="7" width="5" height="5" transform="rotate(45 106.5 9.5)" fill={a} fillOpacity="0.35"/>
        <circle cx="140" cy="10" r="7" stroke={a} strokeOpacity="0.5" strokeWidth="0.75" fill="none"/>
        <circle cx="140" cy="10" r="2.5" fill={a} fillOpacity="0.45"/>
        <rect x="136.5" y="6.5" width="7" height="7" transform="rotate(45 140 10)" stroke={a} strokeOpacity="0.35" strokeWidth="0.5" fill="none"/>
        <rect x="170" y="7" width="5" height="5" transform="rotate(45 172.5 9.5)" fill={a} fillOpacity="0.35"/>
        <line x1="172" y1="10" x2="280" y2="10" stroke={a} strokeOpacity="0.3" strokeWidth="0.75"/>
      </svg>
    </div>
  )
}

// ── countdown timer ───────────────────────────────────────────────────────────

function CountdownTimer({ eventDate }: { eventDate: string | null }) {
  const reduced = useReducedMotion()
  const t = useTheme()
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null)
  const [isPast, setIsPast] = useState(false)

  useEffect(() => {
    if (!eventDate) return
    const target = new Date(`${eventDate}T12:00:00`)

    const tick = () => {
      const now = new Date()
      const diff = target.getTime() - now.getTime()
      if (diff <= 0) {
        setIsPast(true)
        return
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      })
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [eventDate])

  if (!eventDate || isPast || !timeLeft) return null

  const units = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center py-16 px-8 text-center w-full"
    >
      <h3 className="mb-8" style={{ fontFamily: t.font, fontStyle: t.fontStyle, fontSize: `calc(clamp(2.4rem, 7vw, 3.2rem) * ${t.fontScale})`, color: t.accent, letterSpacing: '0.01em', lineHeight: 1.1 }}>
        Counting Down
      </h3>
      <div className="flex items-start gap-5 sm:gap-10">
        {units.map(({ value, label }) => (
          <div key={label} className="flex flex-col items-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={value}
                initial={reduced ? {} : { opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? {} : { opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
                className="font-cormorant font-light leading-none"
                style={{ fontSize: 'clamp(2.4rem, 9vw, 4rem)', color: t.ink, fontVariantNumeric: 'tabular-nums', display: 'block', minWidth: '2ch', textAlign: 'center' }}
              >
                {String(value).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
            <span className="font-inter uppercase mt-2" style={{ fontSize: 9, letterSpacing: '0.2em', color: t.ink, opacity: 0.55 }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// ── rsvp section ──────────────────────────────────────────────────────────────

function RsvpSection({ inviteId }: { inviteId: string }) {
  const reduced = useReducedMotion()
  const t = useTheme()
  const rsvpCalUrl = googleCalUrl(useMeta())
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [attendance, setAttendance] = useState<'accept' | 'decline' | null>(null)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<RsvpStatus>('idle')

  const isValid = name.trim().length > 0 && email.includes('@') && attendance !== null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid || status === 'submitting') return
    setStatus('submitting')
    try {
      const res = await fetch(`/api/invites/${inviteId}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), attendance, message: message.trim() }),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const fieldStyle: React.CSSProperties = {
    border: `1px solid ${hexA(t.accent, 0.25)}`,
    background: t.dark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.7)',
    borderRadius: 12,
    padding: '12px 16px',
    fontSize: 14,
    color: t.ink,
    outline: 'none',
    width: '100%',
    fontFamily: 'var(--font-inter)',
    transition: 'border-color 0.2s',
  }
  const focusOn = (el: HTMLInputElement | HTMLTextAreaElement) => (el.style.borderColor = hexA(t.accent, 0.55))
  const focusOff = (el: HTMLInputElement | HTMLTextAreaElement) => (el.style.borderColor = hexA(t.accent, 0.25))

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center py-16 px-8 w-full"
    >
      <h3 className="text-center mb-2" style={{ fontFamily: t.font, fontStyle: t.fontStyle, fontSize: `calc(clamp(2.4rem, 7vw, 3.2rem) * ${t.fontScale})`, color: t.accent, letterSpacing: '0.01em', lineHeight: 1.1 }}>
        Be Our Guest
      </h3>
      <p className="font-inter text-center mb-8" style={{ fontSize: 12, letterSpacing: '0.06em', color: t.ink, opacity: 0.55 }}>
        Kindly let us know if you&rsquo;ll be joining us
      </p>

      {status === 'success' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4 py-8 text-center"
        >
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden>
            <circle cx="22" cy="22" r="21" stroke={t.accent} strokeWidth="0.75" fill={hexA(t.accent, 0.05)}/>
            <path d="M13 22l6 6 12-13" stroke={t.accent} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p className="font-cormorant font-light" style={{ fontSize: 24, color: t.ink }}>
            Thank you, {name.split(' ')[0]}!
          </p>
          <p className="font-inter" style={{ fontSize: 13, color: t.ink, opacity: 0.7, maxWidth: '30ch', textAlign: 'center' }}>
            {attendance === 'accept'
              ? "We can't wait to celebrate with you."
              : "We'll miss you, but thank you for letting us know."}
          </p>
          {attendance === 'accept' && rsvpCalUrl && (
            <div className="mt-1"><PillLink href={rsvpCalUrl} accent={t.accent}>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden><rect x="1.5" y="2.5" width="9" height="8" rx="1" stroke={t.accent} strokeWidth="0.9"/><path d="M1.5 4.5h9M4 1.5v2M8 1.5v2" stroke={t.accent} strokeWidth="0.9" strokeLinecap="round"/></svg>
              Add to Calendar
            </PillLink></div>
          )}
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full" style={{ maxWidth: 400 }}>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your full name"
            style={fieldStyle}
            onFocus={e => focusOn(e.currentTarget)}
            onBlur={e => focusOff(e.currentTarget)}
            required
          />
        

          <div className="flex gap-3">
            {([['accept', 'Joyfully Accept'], ['decline', 'Regretfully Decline']] as const).map(([val, label]) => (
              <button
                key={val}
                type="button"
                onClick={() => setAttendance(val)}
                className="flex-1 rounded-xl py-3.5 font-inter transition-all"
                style={{
                  fontSize: 12,
                  letterSpacing: '0.03em',
                  background: attendance === val
                    ? (val === 'accept' ? hexA(t.accent, 0.14) : hexA(t.ink, 0.08))
                    : (t.dark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.7)'),
                  border: attendance === val
                    ? (val === 'accept' ? `1px solid ${hexA(t.accent, 0.45)}` : `1px solid ${hexA(t.ink, 0.25)}`)
                    : `1px solid ${hexA(t.accent, 0.2)}`,
                  color: attendance === val
                    ? (val === 'accept' ? t.accent : t.ink)
                    : (t.dark ? 'rgba(236,234,227,0.6)' : 'rgba(26,24,22,0.5)'),
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="A note for the couple (optional)"
            rows={3}
            style={{ ...fieldStyle, resize: 'none' }}
            onFocus={e => focusOn(e.currentTarget)}
            onBlur={e => focusOff(e.currentTarget)}
          />

          {status === 'error' && (
            <p className="font-inter text-center" style={{ fontSize: 11, color: '#8A4030' }}>
              Something went wrong — please try again.
            </p>
          )}

          <motion.button
            type="submit"
            disabled={!isValid || status === 'submitting'}
            whileTap={reduced ? {} : { scale: 0.97 }}
            className="w-full rounded-full py-4 font-inter disabled:opacity-40 transition-opacity"
            style={{
              background: t.accent,
              color: '#FDFCF9',
              fontSize: 13,
              letterSpacing: '0.06em',
              boxShadow: `0 6px 20px ${hexA(t.accent, 0.3)}`,
            }}
          >
            {status === 'submitting' ? 'Sending…' : 'Send RSVP'}
          </motion.button>
        </form>
      )}
    </motion.div>
  )
}

// ── section renderers ──────────────────────────────────────────────────────────

// Per-layout-family structure. Each theme's layout gives the sections a distinct
// alignment, type treatment, framing and rhythm so themes feel genuinely unique.
function layoutStyle(t: Theme) {
  switch (t.layout) {
    case 'editorial': // bold, left-aligned, numbered, gallery-grid heavy (dark themes)
      return { align: 'left' as const, items: 'items-start', text: 'text-left' as const,
        maxW: 640, pad: 'px-7 py-16', headingScale: 1.18, eyebrow: true, frame: false,
        headFont: t.font, headItalic: t.fontStyle === 'italic', rule: 'bar' as const }
    case 'paper': // printed-letter feel — framed card, serif italic headings, centered
      return { align: 'center' as const, items: 'items-center', text: 'text-center' as const,
        maxW: 540, pad: 'px-7 py-12', headingScale: 0.78, eyebrow: false, frame: true,
        headFont: 'var(--font-cormorant)', headItalic: true, rule: 'diamond' as const }
    case 'ethereal': // airy, minimal, generous whitespace, hairline rules
      return { align: 'center' as const, items: 'items-center', text: 'text-center' as const,
        maxW: 460, pad: 'px-8 py-24', headingScale: 1.05, eyebrow: false, frame: false,
        headFont: t.font, headItalic: t.fontStyle === 'italic', rule: 'hair' as const }
    default: // classic — centered, ornamental
      return { align: 'center' as const, items: 'items-center', text: 'text-center' as const,
        maxW: 560, pad: 'px-8 py-14', headingScale: 1, eyebrow: false, frame: false,
        headFont: t.font, headItalic: t.fontStyle === 'italic', rule: 'ornament' as const }
  }
}

function SectionBlock({ section, index }: { section: Section; index: number }) {
  const t = useTheme()
  const ls = layoutStyle(t)
  const cfg = section.config as Record<string, unknown>
  const label = SECTION_LABELS[section.type] ?? section.type

  const Heading = ({ children }: { children: React.ReactNode }) => (
    <div className={`${ls.text} mb-5 w-full`}>
      {ls.eyebrow && (
        <span className="font-inter block mb-2" style={{ fontSize: 11, letterSpacing: '0.3em', color: t.accent, opacity: 0.8 }}>
          {String(index + 1).padStart(2, '0')}
        </span>
      )}
      <h3 style={{ fontFamily: ls.headFont, fontStyle: ls.headItalic ? 'italic' : 'normal', fontSize: `calc(clamp(2.2rem, 7vw, 3.2rem) * ${t.fontScale * ls.headingScale})`, color: ls.frame ? t.ink : t.accent, letterSpacing: ls.headItalic ? '0.005em' : '0.01em', lineHeight: 1.1 }}>
        {children}
      </h3>
      {ls.rule === 'bar' && <span className="mt-4 block" style={{ width: 54, height: 3, background: t.accent, borderRadius: 2 }} />}
      {ls.rule === 'hair' && <span className="mt-5 mx-auto block" style={{ width: 70, height: 1, background: hexA(t.accent, 0.5) }} />}
    </div>
  )

  const Body = ({ children }: { children: React.ReactNode }) => (
    <p className={`font-inter leading-relaxed ${ls.align === 'left' ? '' : 'mx-auto'} ${ls.text} max-w-[42ch]`} style={{ fontSize: 14.5, color: t.ink, opacity: 0.78, lineHeight: 1.75 }}>
      {children}
    </p>
  )

  let content: React.ReactNode = null

  switch (section.type) {
    case 'story':
      content = (cfg.text as string) ? (
        <>
          <Heading>Our Story</Heading>
          <div className="mb-3 leading-none select-none text-center" style={{ fontFamily: t.font, fontStyle: t.fontStyle, fontSize: 72, color: hexA(t.accent, 0.18), lineHeight: 0.8 }} aria-hidden>&ldquo;</div>
          <Body>{cfg.text as string}</Body>
        </>
      ) : null
      break

    case 'schedule': {
      const items = [
        (cfg.ceremony_time || cfg.ceremony_venue) && { label: 'Ceremony', time: cfg.ceremony_time as string, venue: cfg.ceremony_venue as string },
        (cfg.reception_time || cfg.reception_venue) && { label: 'Reception', time: cfg.reception_time as string, venue: cfg.reception_venue as string },
      ].filter(Boolean) as { label: string; time?: string; venue?: string }[]
      content = items.length ? (
        <>
          <Heading>The Day</Heading>
          <Timeline items={items} t={t} />
          {!!cfg.notes && <div className="mt-6"><Body>{String(cfg.notes)}</Body></div>}
        </>
      ) : null
      break
    }

    case 'venue': {
      const hasContent = !!(cfg.name || cfg.address)
      content = hasContent ? <VenueBlock cfg={cfg} t={t} /> : null
      break
    }

    case 'gallery':
      content = (
        <>
          <Heading>Photos</Heading>
          {cfg.note && <Body>{cfg.note as string}</Body>}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full mt-5" style={{ maxWidth: 440 }}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`rounded-xl ${i % 5 === 0 ? 'row-span-2 aspect-[3/4] sm:col-span-1' : 'aspect-square'}`}
                style={{ background: `linear-gradient(135deg, ${hexA(t.accent, 0.18 + (i % 3) * 0.04)} 0%, ${hexA(t.accent, 0.07)} 100%)`, border: `1px solid ${hexA(t.accent, 0.16)}` }}>
                <div className="flex h-full items-center justify-center" style={{ opacity: 0.35 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden><rect x="3" y="5" width="18" height="14" rx="2" stroke={t.accent} strokeWidth="1.2"/><circle cx="8.5" cy="10" r="1.6" fill={t.accent}/><path d="M5 17l4.5-4 3 2.5L17 11l2 2" stroke={t.accent} strokeWidth="1.2" fill="none"/></svg>
                </div>
              </div>
            ))}
          </div>
        </>
      )
      break

    case 'travel':
      content = cfg.content ? (
        <>
          <Heading>Travel &amp; Stay</Heading>
          <div className={`mt-1 flex w-full flex-col gap-3 ${ls.align === 'left' ? '' : 'items-center'}`} style={{ maxWidth: 460 }}>
            <div className="flex items-start gap-3 rounded-2xl px-4 py-3.5 w-full" style={{ background: hexA(t.accent, 0.05), border: `1px solid ${hexA(t.accent, 0.16)}` }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-none mt-0.5" aria-hidden><path d="M21 16l-7-4V5.5a1.5 1.5 0 0 0-3 0V12l-7 4v2l7-2v3l-2 1.5V22l3.5-1L16 22v-1.5L14 19v-3l7 2v-2z" fill={hexA(t.accent, 0.85)}/></svg>
              <p className="font-inter text-left" style={{ fontSize: 13.5, color: t.ink, opacity: 0.8, lineHeight: 1.7 }}>{cfg.content as string}</p>
            </div>
          </div>
        </>
      ) : null
      break

    case 'gifts': {
      const giftText = cfg.content as string
      const url = giftText?.match(/https?:\/\/[^\s]+/)?.[0]
      content = giftText ? (
        <>
          <Heading>Gifts</Heading>
          <Body>{url ? giftText.replace(url, '').trim() || 'Your presence is the greatest gift — but if you wish to give, our registry is here.' : giftText}</Body>
          {url && (
            <div className={`mt-6 flex ${ls.align === 'left' ? '' : 'justify-center'}`}>
              <PillLink href={url} accent={t.accent}>
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden><rect x="1.5" y="4.5" width="9" height="6.5" rx="1" stroke={t.accent} strokeWidth="0.9"/><path d="M1.5 6.5h9M6 4.5V11M6 4.5c-1.4-2.6-4-1.6-3 .4M6 4.5c1.4-2.6 4-1.6 3 .4" stroke={t.accent} strokeWidth="0.9" strokeLinecap="round" fill="none"/></svg>
                View Gift List
              </PillLink>
            </div>
          )}
        </>
      ) : null
      break
    }

    case 'dress_code':
      content = (cfg.code || cfg.notes) ? (
        <>
          <Heading>What to Wear</Heading>
          {cfg.code && (
            <span
              className="font-inter inline-block rounded-full px-5 py-2 mb-4 capitalize"
              style={{ fontSize: 12, background: hexA(t.accent, 0.1), color: t.accent, letterSpacing: '0.05em', border: `1px solid ${hexA(t.accent, 0.25)}` }}
            >
              {cfg.code as string}
            </span>
          )}
          {cfg.notes && <Body>{cfg.notes as string}</Body>}
        </>
      ) : null
      break

    case 'faq': {
      const qs = (cfg.questions as Array<{ q: string; a: string }>) ?? []
      content = qs.length > 0 ? (
        <>
          <Heading>Questions</Heading>
          <div className="flex flex-col gap-5 text-left w-full" style={{ maxWidth: 440 }}>
            {qs.map((item, i) => (
              <div key={i} className="pb-5" style={{ borderBottom: `1px solid ${hexA(t.accent, 0.12)}` }}>
                <p className="font-cormorant font-light" style={{ fontSize: 17, color: t.ink }}>{item.q}</p>
                <p className="font-inter mt-1.5" style={{ fontSize: 13, color: t.ink, opacity: 0.7, lineHeight: 1.6 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </>
      ) : null
      break
    }

    default:
      content = <Heading>{label}</Heading>
  }

  if (!content) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col ${ls.items} ${ls.pad}`}
      style={{
        maxWidth: ls.frame ? 560 : ls.maxW,
        margin: '0 auto',
        ...(ls.frame ? {
          border: `1px solid ${hexA(t.accent, 0.35)}`,
          outline: `1px solid ${hexA(t.accent, 0.18)}`,
          outlineOffset: 5,
          borderRadius: 4,
          background: hexA(t.paper, t.dark ? 0.5 : 0.6),
          marginTop: 22, marginBottom: 22,
        } : {}),
      }}
    >
      {content}
    </motion.div>
  )
}

// A vertical timeline of the day's events — connector line + accent dots.
function Timeline({ items, t }: { items: { label: string; time?: string; venue?: string }[]; t: Theme }) {
  return (
    <div className="relative mt-2 w-full" style={{ maxWidth: 360 }}>
      <span className="absolute top-2 bottom-2" style={{ left: 7, width: 1, background: hexA(t.accent, 0.3) }} aria-hidden />
      <div className="flex flex-col gap-7">
        {items.map((it, i) => (
          <div key={i} className="relative pl-8 text-left">
            <span className="absolute left-0 top-1 flex items-center justify-center rounded-full" style={{ width: 15, height: 15, background: hexA(t.accent, 0.16), border: `1px solid ${t.accent}` }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: t.accent }} />
            </span>
            <span className="font-inter uppercase" style={{ fontSize: 9, letterSpacing: '0.22em', color: t.accent, opacity: 0.9 }}>{it.label}</span>
            {it.time && <p className="font-cormorant font-light leading-none mt-1" style={{ fontSize: 30, color: t.ink, letterSpacing: '-0.01em' }}>{it.time}</p>}
            {it.venue && <p className="font-inter mt-1" style={{ fontSize: 12.5, color: t.ink, opacity: 0.62, letterSpacing: '0.03em' }}>{it.venue}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

// Venue block — name heading, address/details, Open in Maps + Add to Calendar.
function VenueBlock({ cfg, t }: { cfg: Record<string, unknown>; t: Theme }) {
  const meta = useMeta()
  const calUrl = googleCalUrl(meta)
  const ls = layoutStyle(t)
  return (
    <>
      <h3 className={`${ls.text} mb-4`} style={{ fontFamily: ls.headFont, fontStyle: ls.headItalic ? 'italic' : 'normal', fontSize: `calc(clamp(2.2rem, 7vw, 3.2rem) * ${t.fontScale * ls.headingScale})`, color: ls.frame ? t.ink : t.accent, lineHeight: 1.1 }}>
        {(cfg.name as string) || 'The Venue'}
      </h3>
      {!!cfg.address && <p className={`font-inter ${ls.text} ${ls.align === 'left' ? '' : 'mx-auto'} max-w-[40ch]`} style={{ fontSize: 14, color: t.ink, opacity: 0.8, lineHeight: 1.7 }}>{cfg.address as string}</p>}
      {!!cfg.details && <p className={`font-inter mt-2 ${ls.text} ${ls.align === 'left' ? '' : 'mx-auto'} max-w-[40ch]`} style={{ fontSize: 13, color: t.ink, opacity: 0.62, lineHeight: 1.7 }}>{cfg.details as string}</p>}
      <div className={`mt-6 flex flex-wrap gap-2.5 ${ls.align === 'left' ? '' : 'justify-center'}`}>
        {!!cfg.address && (
          <PillLink href={`https://maps.google.com/?q=${encodeURIComponent(cfg.address as string)}`} accent={t.accent}>
            <svg width="11" height="11" viewBox="0 0 10 10" fill="none" aria-hidden><path d="M5 1C3.34 1 2 2.34 2 4c0 2.25 3 5 3 5s3-2.75 3-5c0-1.66-1.34-3-3-3z" stroke={t.accent} strokeWidth="0.8" fill={hexA(t.accent, 0.15)}/><circle cx="5" cy="4" r="1" fill={t.accent}/></svg>
            Open in Maps
          </PillLink>
        )}
        {calUrl && (
          <PillLink href={calUrl} accent={t.accent}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden><rect x="1.5" y="2.5" width="9" height="8" rx="1" stroke={t.accent} strokeWidth="0.9"/><path d="M1.5 4.5h9M4 1.5v2M8 1.5v2M6 6v2.5M4.75 7.25h2.5" stroke={t.accent} strokeWidth="0.9" strokeLinecap="round"/></svg>
            Add to Calendar
          </PillLink>
        )}
      </div>
    </>
  )
}

// ── opening hero ───────────────────────────────────────────────────────────────

function OpeningHero({
  invite,
  opening,
  media,
  musicRef,
}: {
  invite: Invite
  opening: Section | null
  media: MediaAsset[]
  musicRef: React.RefObject<HTMLAudioElement | null>
}) {
  const reduced = useReducedMotion()
  const cfg = (opening?.config ?? {}) as Record<string, unknown>
  const nameA = (cfg.name_a as string | undefined)?.trim() ?? ''
  const nameB = (cfg.name_b as string | undefined)?.trim() ?? ''
  const names = nameA && nameB ? `${nameA} & ${nameB}` : nameA || nameB || invite.display_title || 'Your names'
  const date = formatDate(invite.event_date ?? null)
  const familiesNote = (cfg.families_note as string | undefined)?.trim() || 'Together with their families'

  const preset = VIDEO_PRESETS.find(p => p.id === cfg.video_preset) ?? null
  const uploadedAsset = media.find(m => m.id === cfg.video_asset_id && m.status === 'ready') ?? null
  const videoSrc = uploadedAsset
    ? (uploadedAsset.variants as { mp4?: string }).mp4 ?? null
    : preset?.src ?? null
  const posterImg = uploadedAsset
    ? (uploadedAsset.variants as { poster?: string }).poster ?? null
    : preset?.posterImg ?? null
  const posterStyle = preset
    ? { background: `linear-gradient(160deg, ${preset.poster.from} 0%, ${preset.poster.to} 100%)` }
    : { background: 'linear-gradient(160deg, #F3EFE7 0%, #C9B89A 100%)' }

  const track = MUSIC_TRACKS.find(t => t.id === cfg.music_track)
  const musicAsset = media.find(m => m.id === cfg.music_asset_id && m.status === 'ready')
  const musicSrc = musicAsset
    ? (musicAsset.variants as { url?: string }).url ?? null
    : track?.src ?? null

  const th = useTheme()
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (musicSrc && musicRef.current) {
      musicRef.current.src = musicSrc
      musicRef.current.loop = true
    }
  }, [musicSrc, musicRef])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const toggleMusic = () => {
    if (!musicRef.current) return
    if (musicPlaying) {
      musicRef.current.pause()
      setMusicPlaying(false)
    } else {
      void musicRef.current.play().then(() => setMusicPlaying(true)).catch(() => {})
    }
  }

  return (
    <section className="relative flex h-[100dvh] flex-col items-center justify-center overflow-hidden">
      <FilmBackdrop
        videoSrc={videoSrc}
        poster={posterImg}
        fallbackStyle={posterStyle}
        autoPlay={!reduced}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(253,252,249,0.08) 0%, rgba(26,24,22,0.38) 100%)' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="relative z-10 mx-6 px-8 py-12 text-center"
        style={{
          background: hexA(th.paper, th.dark ? 0.9 : 0.93),
          backdropFilter: 'blur(20px)',
          borderRadius: 20,
          boxShadow: '0 32px 80px rgba(26,24,22,0.3), 0 4px 16px rgba(26,24,22,0.1)',
          border: `1px solid ${hexA(th.accent, 0.18)}`,
          maxWidth: 420,
          width: '100%',
        }}
      >
        <span className="font-inter uppercase" style={{ fontSize: 9, letterSpacing: '0.3em', color: th.ink, opacity: 0.42 }}>
          {familiesNote}
        </span>

        <motion.h1
          className="leading-tight mt-4 mb-4"
          style={{ fontFamily: th.font, fontStyle: th.fontStyle, fontSize: `calc(clamp(2.8rem, 10vw, 4rem) * ${th.fontScale})`, color: th.accent, letterSpacing: '0.01em' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.8 }}
        >
          {names}
        </motion.h1>

        <div className="mx-auto mb-4" style={{ width: 60, height: 1, background: `linear-gradient(90deg, transparent, ${hexA(th.accent, 0.6)}, transparent)` }} />

        {date && (
          <p className="font-cormorant italic font-light" style={{ fontSize: 18, color: th.ink, opacity: 0.78 }}>
            {date}
          </p>
        )}
        {invite.venue_name && (
          <p className="font-inter mt-1.5" style={{ fontSize: 11, letterSpacing: '0.08em', color: th.ink, opacity: 0.5 }}>
            {invite.venue_name}
          </p>
        )}

        {musicSrc && (
          <button
            type="button"
            onClick={toggleMusic}
            className="mt-6 flex items-center gap-2 mx-auto rounded-full px-4 py-2 transition-all"
            style={{
              background: musicPlaying ? hexA(th.accent, 0.14) : hexA(th.accent, 0.06),
              border: `1px solid ${hexA(th.accent, 0.22)}`,
              fontSize: 10,
              letterSpacing: '0.06em',
              color: th.accent,
            }}
            aria-label={musicPlaying ? 'Pause music' : 'Play music'}
          >
            {musicPlaying ? (
              <>
                <span className="flex items-end gap-[2px]" aria-hidden>
                  {[0, 1, 2].map(i => (
                    <motion.span
                      key={i}
                      style={{ width: 2, borderRadius: 2, background: th.accent, display: 'block' }}
                      animate={{ height: [3, 9, 3] }}
                      transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: i * 0.18 }}
                    />
                  ))}
                </span>
                <span className="font-inter">{track?.title ?? 'Music'}</span>
              </>
            ) : (
              <>
                <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden>
                  <path d="M1 1.5L9 6L1 10.5V1.5Z" fill={th.accent} />
                </svg>
                <span className="font-inter">Play music</span>
              </>
            )}
          </button>
        )}
      </motion.div>

      <AnimatePresence>
        {!scrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.8 }}
            className="absolute bottom-8 flex flex-col items-center gap-2"
          >
            <span className="font-inter uppercase" style={{ fontSize: 8, letterSpacing: '0.2em', color: 'rgba(253,252,249,0.5)' }}>
              Scroll
            </span>
            <motion.div
              animate={reduced ? {} : { y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden>
                <path d="M1 1.5L6 6.5L11 1.5" stroke="rgba(253,252,249,0.5)" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

// ── main page ──────────────────────────────────────────────────────────────────

export default function PreviewPage() {
  const params = useParams()
  const id = params.id as string
  const [state, setState] = useState<PreviewState>('loading')
  const [invite, setInvite] = useState<Invite | null>(null)
  const [sections, setSections] = useState<Section[]>([])
  const [media, setMedia] = useState<MediaAsset[]>([])
  const [copied, setCopied] = useState(false)
  const [opened, setOpened] = useState(false)
  const [skipOpener, setSkipOpener] = useState(false)
  const [openerLeaving, setOpenerLeaving] = useState(false)
  const musicRef = useRef<HTMLAudioElement | null>(null)

  // Read ?skipOpener=1 on the client (set by the builder's Preview button) so a
  // couple checking their work jumps straight to the invitation, no opener gate.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('skipOpener') === '1') {
      setSkipOpener(true)
      setOpened(true)
    }
  }, [])

  useEffect(() => {
    musicRef.current = new Audio()
    musicRef.current.volume = 0.55
    return () => { musicRef.current?.pause() }
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const [inv, secs, med] = await Promise.all([
          api.getInvite(id),
          api.listSections(id),
          api.listMedia(id).catch(() => [] as MediaAsset[]),
        ])
        if (cancelled) return
        setInvite(inv)
        setSections(secs)
        setMedia(med)
        setState('ready')
      } catch {
        if (!cancelled) setState('error')
      }
    })()
    return () => { cancelled = true }
  }, [id])

  const handleCopy = () => {
    copyLink()
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const opening = sections.find(s => s.type === 'opening') ?? null
  const contentSections = sections.filter(s => s.type !== 'opening')
  const cfg = (opening?.config ?? {}) as Record<string, unknown>
  const nameA = (cfg.name_a as string | undefined)?.trim() ?? ''
  const nameB = (cfg.name_b as string | undefined)?.trim() ?? ''
  const date = formatDate(invite?.event_date ?? null)

  // Invite meta shared with sections (Add-to-Calendar, RSVP).
  const venueSection = contentSections.find(s => s.type === 'venue')
  const venueCfg = (venueSection?.config ?? {}) as Record<string, string>
  const meta: InviteMeta = {
    names: nameA && nameB ? `${nameA} & ${nameB}` : nameA || nameB || invite?.display_title || 'Our Wedding',
    dateISO: invite?.event_date ?? null,
    dateLabel: date,
    venueName: venueCfg.name ?? invite?.venue_name ?? null,
    venueAddress: venueCfg.address ?? null,
  }

  // Resolve the chosen palette + heading font (from the Style step) into a theme.
  const palette = PALETTE_MAP[(cfg.palette as string) ?? ''] ?? DEFAULT_PALETTE
  const headingFont = HEADING_FONT_MAP[(cfg.heading_font as string) ?? ''] ?? DEFAULT_HEADING_FONT
  const theme: Theme = {
    accent: palette.accent,
    accentSoft: palette.accentSoft,
    paper: palette.paper,
    ink: palette.ink,
    wash: palette.wash,
    washAlt: palette.washAlt,
    font: headingFont.var,
    fontScale: headingFont.scale,
    fontStyle: headingFont.italic ? 'italic' : 'normal',
    dark: !!palette.dark,
    layout: palette.layout,
  }
  const sectionBgs = [theme.wash, theme.washAlt]

  // The invitation's film — revealed behind the opener as it's dragged open.
  const openPreset = VIDEO_PRESETS.find(p => p.id === (cfg.video_preset as string)) ?? null
  const openUploaded = media.find(m => m.id === cfg.video_asset_id && m.status === 'ready') ?? null
  const themeVideo = openUploaded ? (openUploaded.variants as { mp4?: string }).mp4 ?? null : openPreset?.src ?? null
  const themePoster = openUploaded ? (openUploaded.variants as { poster?: string }).poster ?? null : openPreset?.posterImg ?? VIDEO_PRESETS[0].posterImg

  return (
   <ThemeCtx.Provider value={theme}>
    <MetaCtx.Provider value={meta}>
    <div className="min-h-[100dvh]" style={{ background: theme.wash }}>
      {/* Top bar */}
      <div
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-3"
        style={{ background: 'rgba(250,244,235,0.92)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(26,24,22,0.06)' }}
      >
        <span className="font-inter uppercase" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(26,24,22,0.38)' }}>
          Draft preview
        </span>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 font-inter transition-all"
            style={{
              fontSize: 11,
              background: copied ? 'rgba(168,133,75,0.12)' : 'rgba(26,24,22,0.06)',
              color: copied ? '#A8854B' : 'rgba(26,24,22,0.55)',
              border: copied ? '1px solid rgba(168,133,75,0.3)' : '1px solid transparent',
            }}
            aria-label="Copy preview link"
          >
            {copied ? (
              <>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                  <path d="M1.5 5L3.5 7L8.5 2" stroke="#A8854B" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                  <rect x="3" y="1" width="6" height="7" rx="1" stroke="currentColor" strokeWidth="1" />
                  <path d="M1 3v6a1 1 0 0 0 1 1h5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
                Copy link
              </>
            )}
          </button>

          {skipOpener ? (
            <button
              type="button"
              onClick={() => { if (window.history.length > 1) window.history.back(); else window.location.href = `/builder/${id}/review` }}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 font-inter"
              style={{ fontSize: 11, background: '#1A1816', color: '#FDFCF9' }}
            >
              ← Editing
            </button>
          ) : (
            <Link
              href={`/builder/${id}/review`}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 font-inter"
              style={{ fontSize: 11, background: '#1A1816', color: '#FDFCF9' }}
            >
              Edit →
            </Link>
          )}
        </div>
      </div>

      {/* Loading */}
      {state === 'loading' && (
        <div className="flex h-[100dvh] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
              <circle cx="16" cy="16" r="13" stroke="rgba(168,133,75,0.2)" strokeWidth="2" />
              <path d="M16 3A13 13 0 0 1 29 16" stroke="#A8854B" strokeWidth="2" strokeLinecap="round">
                <animateTransform attributeName="transform" type="rotate" from="0 16 16" to="360 16 16" dur="1s" repeatCount="indefinite" />
              </path>
            </svg>
            <span className="font-inter uppercase" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(26,24,22,0.4)' }}>
              Preparing your invitation…
            </span>
          </div>
        </div>
      )}

      {/* Error */}
      {state === 'error' && (
        <div className="flex h-[100dvh] flex-col items-center justify-center gap-4 px-8 text-center">
          <p className="font-cormorant font-light" style={{ fontSize: 24, color: '#1A1816' }}>
            Couldn&rsquo;t load the invitation
          </p>
          <p className="font-inter" style={{ fontSize: 13, color: 'rgba(26,24,22,0.5)' }}>
            Make sure you&rsquo;re on the same device you used to create it, or go back and try again.
          </p>
          <Link
            href={`/builder/${id}/review`}
            className="font-inter rounded-full px-6 py-3 mt-2"
            style={{ background: '#1A1816', color: '#FDFCF9', fontSize: 13 }}
          >
            Back to builder
          </Link>
        </div>
      )}

      {/* Opener — the reveal mechanism (wax letter / iron gates / lifting veil) */}
      {state === 'ready' && invite && !opened && (
        <motion.div
          className="fixed inset-0 z-[60]"
          animate={{ opacity: openerLeaving ? 0 : 1 }}
          transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
        >
          <InviteOpener
            id={(cfg.opener as string) ?? 'wax-letter'}
            theme={{
              accent: theme.accent, paper: theme.paper, flap: theme.washAlt,
              ink: theme.ink, font: theme.font, fontStyle: theme.fontStyle, dark: theme.dark,
            }}
            names={nameA && nameB ? `${nameA} & ${nameB}` : nameA || nameB || invite.display_title || 'You’re Invited'}
            videoSrc={themeVideo}
            poster={themePoster}
            onOpen={() => { setOpenerLeaving(true); setTimeout(() => setOpened(true), 1100) }}
          />
        </motion.div>
      )}

      {/* Ready */}
      {state === 'ready' && invite && (
        <main className="pt-[44px]">
          <OpeningHero invite={invite} opening={opening} media={media} musicRef={musicRef} />

          {/* Content sections — per-layout backgrounds + dividers */}
          {contentSections.length > 0 && (
            <div>
              {contentSections.map((sec, i) => {
                // editorial: solid surface (no stripes); ethereal: mostly paper;
                // classic/paper: alternating washes.
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

          {/* Countdown */}
          {invite.event_date && (
            <div style={{ background: sectionBgs[contentSections.length % 2] }}>
              <OrnamentDivider />
              <CountdownTimer eventDate={invite.event_date} />
            </div>
          )}

          {/* RSVP */}
          <div style={{ background: sectionBgs[(contentSections.length + 1) % 2] }}>
            <OrnamentDivider />
            <RsvpSection inviteId={id} />
          </div>

          {/* Footer */}
          <footer className="flex flex-col items-center gap-4 py-20 px-8 text-center" style={{ background: '#1A1816' }}>
            <OrnamentDivider />
            {(nameA || nameB) && (
              <p style={{ fontFamily: theme.font, fontStyle: theme.fontStyle, fontSize: `calc(clamp(2rem, 8vw, 3rem) * ${theme.fontScale})`, color: 'rgba(253,252,249,0.9)', letterSpacing: '0.01em', lineHeight: 1.1 }}>
                {nameA && nameB ? `${nameA} & ${nameB}` : nameA || nameB}
              </p>
            )}
            {date && (
              <p className="font-cormorant italic font-light" style={{ fontSize: 16, color: 'rgba(253,252,249,0.4)' }}>
                {date}
              </p>
            )}
            <p className="font-cormorant italic font-light mt-2" style={{ fontSize: 18, color: 'rgba(253,252,249,0.55)' }}>
              We can&rsquo;t wait to celebrate with you.
            </p>
            <p className="font-inter mt-4" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(253,252,249,0.18)', textTransform: 'uppercase' }}>
              Made with Digital Invite
            </p>
          </footer>
        </main>
      )}
    </div>
    </MetaCtx.Provider>
   </ThemeCtx.Provider>
  )
}
