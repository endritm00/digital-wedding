'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { api } from '@/lib/builder/api'
import type { Invite, Section, MediaAsset } from '@/lib/builder/api'
import { InvitationView } from '@/components/invite/invitation-view'
import { I18nProvider, type Locale } from '@/lib/i18n/context'

// Creator preview — the couple checking their own invite. Renders the SAME
// InvitationView guests see (full opener + theme + sections + countdown + RSVP),
// wrapped in a draft top-bar. `?skipOpener=1` (builder Preview button) jumps
// straight past the opener.

type PreviewState = 'loading' | 'ready' | 'error'

export default function PreviewPage() {
  const params = useParams()
  const id = params.id as string
  const [state, setState] = useState<PreviewState>('loading')
  const [invite, setInvite] = useState<Invite | null>(null)
  const [sections, setSections] = useState<Section[]>([])
  const [media, setMedia] = useState<MediaAsset[]>([])
  const [copied, setCopied] = useState(false)
  const [skipOpener, setSkipOpener] = useState(false)

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('skipOpener') === '1') setSkipOpener(true)
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
        setInvite(inv); setSections(secs); setMedia(med); setState('ready')
      } catch {
        if (!cancelled) setState('error')
      }
    })()
    return () => { cancelled = true }
  }, [id])

  const handleCopy = () => {
    void navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-[100dvh]" style={{ background: '#FAF4EB' }}>
      {/* Draft top bar */}
      <div className="fixed inset-x-0 top-0 z-[70] flex items-center justify-between px-5 py-3"
        style={{ background: 'rgba(250,244,235,0.92)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(26,24,22,0.06)' }}>
        <span className="font-inter uppercase" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(26,24,22,0.38)' }}>Draft preview</span>
        <div className="flex items-center gap-3">
          <button type="button" onClick={handleCopy} className="flex items-center gap-1.5 rounded-full px-3 py-1.5 font-inter transition-all"
            style={{ fontSize: 11, background: copied ? 'rgba(168,133,75,0.12)' : 'rgba(26,24,22,0.06)', color: copied ? '#A8854B' : 'rgba(26,24,22,0.55)', border: copied ? '1px solid rgba(168,133,75,0.3)' : '1px solid transparent' }}
            aria-label="Copy preview link">
            {copied ? (
              <><svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden><path d="M1.5 5L3.5 7L8.5 2" stroke="#A8854B" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>Copied!</>
            ) : (
              <><svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden><rect x="3" y="1" width="6" height="7" rx="1" stroke="currentColor" strokeWidth="1" /><path d="M1 3v6a1 1 0 0 0 1 1h5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" /></svg>Copy link</>
            )}
          </button>
          {skipOpener ? (
            <button type="button" onClick={() => { if (window.history.length > 1) window.history.back(); else window.location.href = `/builder/${id}/review` }}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 font-inter" style={{ fontSize: 11, background: '#1A1816', color: '#FDFCF9' }}>← Editing</button>
          ) : (
            <Link href={`/builder/${id}/review`} className="flex items-center gap-1.5 rounded-full px-3 py-1.5 font-inter" style={{ fontSize: 11, background: '#1A1816', color: '#FDFCF9' }}>Edit →</Link>
          )}
        </div>
      </div>

      {state === 'loading' && (
        <div className="flex h-[100dvh] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
              <circle cx="16" cy="16" r="13" stroke="rgba(168,133,75,0.2)" strokeWidth="2" />
              <path d="M16 3A13 13 0 0 1 29 16" stroke="#A8854B" strokeWidth="2" strokeLinecap="round"><animateTransform attributeName="transform" type="rotate" from="0 16 16" to="360 16 16" dur="1s" repeatCount="indefinite" /></path>
            </svg>
            <span className="font-inter uppercase" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(26,24,22,0.4)' }}>Preparing your invitation…</span>
          </div>
        </div>
      )}

      {state === 'error' && (
        <div className="flex h-[100dvh] flex-col items-center justify-center gap-4 px-8 text-center">
          <p className="font-cormorant font-light" style={{ fontSize: 24, color: '#1A1816' }}>Couldn&rsquo;t load the invitation</p>
          <p className="font-inter" style={{ fontSize: 13, color: 'rgba(26,24,22,0.5)' }}>Make sure you&rsquo;re on the same device you used to create it, or go back and try again.</p>
          <Link href={`/builder/${id}/review`} className="font-inter rounded-full px-6 py-3 mt-2" style={{ background: '#1A1816', color: '#FDFCF9', fontSize: 13 }}>Back to editing</Link>
        </div>
      )}

      {state === 'ready' && invite && (
        <I18nProvider initialLocale={(sections.find(s => s.type === 'opening')?.config as Record<string, unknown>)?.locale as Locale | undefined}>
          <InvitationView
            invite={invite}
            sections={sections}
            media={media}
            rsvp={{ kind: 'preview' }}
            enableOpener={!skipOpener}
          />
        </I18nProvider>
      )}
    </div>
  )
}
