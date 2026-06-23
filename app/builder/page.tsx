'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api, claimStore } from '@/lib/builder/api'
import { TEMPLATE_MAP } from '@/lib/templates/templates'

export default function BuilderEntryPage() {
  const router = useRouter()
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const result = await api.createInvite({})
        if (cancelled) return
        if (result.claim_token) {
          claimStore.set(result.id, result.claim_token)
        }

        // Came from a theme page (/builder?from=<slug>)? Pre-seed the opening
        // section with that design's palette, lettering and opening film so the
        // builder opens already dressed in it. This is a single call here, while
        // the "Creating…" spinner is up and BEFORE the builder mounts — so it
        // adds nothing to the builder's own runtime. The steps are unchanged;
        // the choices simply arrive pre-selected. Non-fatal: on any failure the
        // builder just opens with defaults.
        try {
          const slug = new URLSearchParams(window.location.search).get('from')
          const tpl = slug ? TEMPLATE_MAP[slug] : null
          if (tpl) {
            await api.addSection(result.id, 'opening', {
              palette: tpl.paletteId,
              heading_font: tpl.headingFontId,
              video_preset: tpl.filmId,
            })
          }
        } catch { /* ignore — open with defaults */ }
        if (cancelled) return

        router.replace(`/builder/${result.id}/names`)
      } catch {
        if (!cancelled) setError(true)
      }
    })()
    return () => { cancelled = true }
  }, [router])

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#F8F4EF]">
        <div className="flex flex-col items-center gap-5 px-8 text-center">
          <p className="font-cormorant font-light" style={{ fontSize: 22, color: '#1A1816' }}>
            Something went wrong
          </p>
          <p className="font-inter" style={{ fontSize: 13, color: 'rgba(26,24,22,0.5)' }}>
            We couldn&rsquo;t create your invitation. Please check your connection and try again.
          </p>
          <button
            type="button"
            onClick={() => { setError(false); window.location.reload() }}
            className="rounded-full px-6 py-3 font-inter"
            style={{ background: '#A8854B', color: '#FDFCF9', fontSize: 13, letterSpacing: '0.04em' }}
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#F8F4EF]">
      <div className="flex flex-col items-center gap-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" stroke="rgba(168,133,75,0.2)" strokeWidth="1.5" />
          <path d="M12 2A10 10 0 0 1 22 12" stroke="#A8854B" strokeWidth="1.5" strokeLinecap="round">
            <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite" />
          </path>
        </svg>
        <span className="font-inter uppercase" style={{ fontSize: 10, letterSpacing: '0.2em', color: 'rgba(26,24,22,0.4)' }}>
          Creating your invitation…
        </span>
      </div>
    </div>
  )
}
