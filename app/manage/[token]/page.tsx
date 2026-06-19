'use client'

import { use, useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// The couple's RSVP page. Deliberately NOT an admin dashboard — one calm screen:
// a headcount banner, the guest list, export, share, and regenerate-link.
// Reached via a private, login-free capability URL (/manage/<token>).

interface Rsvp {
  id: string
  name: string
  attending: boolean
  guest_count: number
  created_at: string
}
interface Stats {
  response_count: number
  attending_count: number
  declined_count: number
  total_guests: number
}
interface InviteSummary {
  slug: string
  display_title: string | null
  event_date: string | null
  status: string
}
interface ManageData {
  invite: InviteSummary
  stats: Stats
  rsvps: Rsvp[]
}

export default function ManagePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params)
  const [data, setData] = useState<ManageData | null>(null)
  const [state, setState] = useState<'loading' | 'ready' | 'forbidden' | 'error'>('loading')
  const [copied, setCopied] = useState(false)
  const [rotating, setRotating] = useState(false)
  const [exporting, setExporting] = useState(false)

  const load = useCallback(async (t: string) => {
    setState('loading')
    try {
      const res = await fetch(`/api/manage/${t}`, { cache: 'no-store' })
      if (res.status === 403) { setState('forbidden'); return }
      if (!res.ok) { setState('error'); return }
      setData(await res.json())
      setState('ready')
    } catch {
      setState('error')
    }
  }, [])

  useEffect(() => {
    // Remember the link on this device so the couple can return without the email.
    try { localStorage.setItem('di:last-manage-token', token) } catch { /* private mode */ }
    void load(token)
  }, [token, load])

  const guestUrl =
    data && typeof window !== 'undefined'
      ? `${window.location.origin}/invite/${data.invite.slug}`
      : ''

  const copyGuestLink = async () => {
    try {
      await navigator.clipboard.writeText(guestUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* clipboard blocked */ }
  }

  const exportXlsx = async () => {
    setExporting(true)
    try {
      const res = await fetch(`/api/manage/${token}/export`)
      if (!res.ok) return
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'rsvps.xlsx'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } finally {
      setExporting(false)
    }
  }

  const regenerate = async () => {
    if (!confirm('Regenerate your private link? The current link will stop working.')) return
    setRotating(true)
    try {
      const res = await fetch(`/api/manage/${token}/rotate`, { method: 'POST' })
      if (!res.ok) return
      const { token: next } = await res.json()
      try { localStorage.setItem('di:last-manage-token', next) } catch { /* noop */ }
      // Swap the URL to the new token without a full reload, then reload data.
      window.history.replaceState(null, '', `/manage/${next}`)
      await load(next)
    } finally {
      setRotating(false)
    }
  }

  if (state === 'loading') return <Centered>Loading your guest list…</Centered>
  if (state === 'forbidden') return <Centered>This link is no longer valid. If you regenerated it, use the newest link from your email.</Centered>
  if (state === 'error') return <Centered>Something went wrong. Please refresh.</Centered>
  if (!data) return null

  const { invite, stats, rsvps } = data
  const title = invite.display_title || 'Your wedding'

  return (
    <div className="min-h-dvh px-5 py-10 lg:py-16" style={{ background: '#F8F4EF' }}>
      <div className="mx-auto w-full max-w-[640px]">
        {/* Header */}
        <p className="font-inter uppercase" style={{ fontSize: 10, letterSpacing: '0.2em', color: '#A8854B' }}>
          Who&rsquo;s coming
        </p>
        <h1 className="font-cormorant font-light leading-tight mt-1" style={{ fontSize: 'clamp(2rem, 7vw, 2.8rem)', color: '#1A1816' }}>
          {title}
        </h1>

        {/* Headcount banner */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <Stat label="Coming" value={stats.attending_count} accent />
          <Stat label="Can't make it" value={stats.declined_count} />
          <Stat label="Total guests" value={stats.total_guests} accent />
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-wrap gap-2.5">
          <button type="button" onClick={copyGuestLink} className="font-inter rounded-full px-4 py-2.5"
            style={{ fontSize: 12.5, background: '#1A1816', color: '#FDFCF9' }}>
            {copied ? 'Copied ✓' : 'Copy guest link'}
          </button>
          <button type="button" onClick={exportXlsx} disabled={exporting || rsvps.length === 0}
            className="font-inter rounded-full px-4 py-2.5 disabled:opacity-40"
            style={{ fontSize: 12.5, background: 'rgba(168,133,75,0.12)', color: '#A8854B', border: '1px solid rgba(168,133,75,0.3)' }}>
            {exporting ? 'Preparing…' : 'Export (Excel)'}
          </button>
          <button type="button" onClick={regenerate} disabled={rotating}
            className="font-inter rounded-full px-4 py-2.5 disabled:opacity-40"
            style={{ fontSize: 12.5, color: 'rgba(26,24,22,0.5)', border: '1px solid rgba(26,24,22,0.12)' }}>
            {rotating ? 'Regenerating…' : 'Regenerate link'}
          </button>
        </div>

        {/* Guest list */}
        <div className="mt-8">
          {rsvps.length === 0 ? (
            <div className="rounded-2xl px-5 py-10 text-center" style={{ background: '#FDFCF9', border: '1px solid #ECE6DA' }}>
              <p className="font-inter" style={{ fontSize: 13.5, color: 'rgba(26,24,22,0.55)' }}>
                No replies yet. Share your guest link and they&rsquo;ll appear here.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-2">
              {rsvps.map((r, i) => (
                <motion.li
                  key={r.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.02, 0.3) }}
                  className="flex items-center justify-between rounded-xl px-4 py-3"
                  style={{ background: '#FDFCF9', border: '1px solid #ECE6DA' }}
                >
                  <div className="flex flex-col">
                    <span className="font-cormorant" style={{ fontSize: 17, color: '#1A1816' }}>{r.name}</span>
                    <span className="font-inter" style={{ fontSize: 11, color: 'rgba(26,24,22,0.45)' }}>
                      {new Date(r.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      {r.attending && r.guest_count > 1 ? ` · party of ${r.guest_count}` : ''}
                    </span>
                  </div>
                  <span
                    className="font-inter rounded-full px-3 py-1"
                    style={{
                      fontSize: 10.5, letterSpacing: '0.04em',
                      background: r.attending ? 'rgba(124,139,107,0.16)' : 'rgba(176,122,110,0.14)',
                      color: r.attending ? '#5E6B4F' : '#9A5A4E',
                    }}
                  >
                    {r.attending ? 'Coming' : 'Can’t make it'}
                  </span>
                </motion.li>
              ))}
            </ul>
          )}
        </div>

        <p className="font-inter mt-8 text-center" style={{ fontSize: 11, lineHeight: 1.6, color: 'rgba(26,24,22,0.38)' }}>
          This is your private link — anyone with it can see this page. Keep it to yourself; regenerate it if it ever leaks.
        </p>
      </div>
    </div>
  )
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="rounded-2xl px-3 py-4 text-center" style={{ background: '#FDFCF9', border: '1px solid #ECE6DA' }}>
      <div className="font-cormorant font-light" style={{ fontSize: 30, lineHeight: 1, color: accent ? '#A8854B' : '#1A1816' }}>
        {value}
      </div>
      <div className="font-inter mt-1.5 uppercase" style={{ fontSize: 9, letterSpacing: '0.1em', color: 'rgba(26,24,22,0.45)' }}>
        {label}
      </div>
    </div>
  )
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh items-center justify-center px-8 text-center" style={{ background: '#F8F4EF' }}>
      <p className="font-inter" style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(26,24,22,0.55)', maxWidth: 320 }}>
        {children}
      </p>
    </div>
  )
}
