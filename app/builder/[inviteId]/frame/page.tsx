'use client'

import { use, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Hairline } from '@/components/builder/hairline'
import { StepSheet } from '@/components/builder/step-sheet'
import { useBuilder } from '@/components/builder/builder-provider'
import { useTranslation } from '@/lib/i18n/context'

// "Frame your film" — only reached when the couple uploaded their own clip.
// They choose how it sits behind the invitation: show the whole film (blended,
// edges softly blurred) or fill the screen and pick the focal point. The live
// preview behind the sheet (InvitePreview) reflects every change instantly.

type FilmFit = 'blend' | 'crop'

export default function FramePage({ params }: { params: Promise<{ inviteId: string }> }) {
  const { inviteId } = use(params)
  const { opening, media, setOpening, loading } = useBuilder()
  const { t } = useTranslation()
  const router = useRouter()

  const cfg = (opening?.config ?? {}) as {
    video_asset_id?: string
    video_fit?: FilmFit | 'auto'
    video_focal?: { x: number; y: number }
  }

  const asset = media.find((m) => m.id === cfg.video_asset_id) ?? null
  const ready = asset?.status === 'ready'
  const poster = ready ? (asset!.variants as { poster?: string }).poster ?? null : null
  const mp4 = ready ? (asset!.variants as { mp4?: string }).mp4 ?? null : null

  // No custom film (or it was removed) → this step doesn't apply; skip ahead.
  useEffect(() => {
    if (!loading && !cfg.video_asset_id) router.replace(`/builder/${inviteId}/style`)
  }, [loading, cfg.video_asset_id, inviteId, router])

  const mode: FilmFit = cfg.video_fit === 'crop' ? 'crop' : 'blend'
  const focal = cfg.video_focal ?? { x: 0.5, y: 0.5 }

  const setMode = (m: FilmFit) => setOpening({ video_fit: m })
  const setFocal = (x: number, y: number) =>
    setOpening({ video_fit: 'crop', video_focal: { x: clamp(x), y: clamp(y) } })

  return (
    <>
      <Hairline step="opening-video" />
      <StepSheet
        title={t.frame.title}
        lede={t.frame.lede}
        primaryLabel={t.common.continue}
        onPrimary={() => router.push(`/builder/${inviteId}/style`)}
        backHref={`/builder/${inviteId}/opening-video`}
      >
        <div className="flex flex-col gap-3">
          <ModeCard
            active={mode === 'blend'}
            onClick={() => setMode('blend')}
            title={t.frame.blendTitle}
            blurb={t.frame.blendBlurb}
            icon="blend"
          />
          <ModeCard
            active={mode === 'crop'}
            onClick={() => setMode('crop')}
            title={t.frame.cropTitle}
            blurb={t.frame.cropBlurb}
            icon="crop"
          />

          {mode === 'crop' && mp4 && (
            <FocalPicker src={mp4} poster={poster} focal={focal} focalHint={t.frame.focalHint} onChange={setFocal} />
          )}
        </div>
      </StepSheet>
    </>
  )
}

const clamp = (n: number) => Math.max(0, Math.min(1, n))

function ModeCard({
  active, onClick, title, blurb, icon,
}: {
  active: boolean; onClick: () => void; title: string; blurb: string; icon: 'blend' | 'crop'
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-start gap-3 rounded-2xl p-4 text-left transition-all focus-visible:outline-none"
      style={{
        background: active ? 'rgba(168,133,75,0.10)' : 'rgba(255,255,255,0.55)',
        border: active ? '1.5px solid #A8854B' : '1.5px solid rgba(26,24,22,0.10)',
        boxShadow: active ? '0 4px 16px rgba(168,133,75,0.18)' : 'none',
      }}
      aria-pressed={active}
    >
      <span
        className="mt-0.5 flex shrink-0 items-center justify-center rounded-lg"
        style={{ width: 36, height: 36, background: active ? '#A8854B' : 'rgba(26,24,22,0.06)' }}
      >
        {icon === 'blend' ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <rect x="2" y="4.5" width="14" height="9" rx="1.4" stroke={active ? '#FDFCF9' : '#A8854B'} strokeWidth="1.3" />
            <rect x="6" y="2.5" width="6" height="13" rx="1" fill={active ? '#FDFCF9' : '#A8854B'} opacity="0.9" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <rect x="2" y="2.5" width="14" height="13" rx="1.4" fill={active ? '#FDFCF9' : '#A8854B'} opacity="0.9" />
            <circle cx="9" cy="9" r="2.2" stroke={active ? '#A8854B' : '#FDFCF9'} strokeWidth="1.3" />
          </svg>
        )}
      </span>
      <span className="flex flex-col gap-1">
        <span className="font-cormorant font-light" style={{ fontSize: 18, color: '#1A1816', lineHeight: 1.1 }}>
          {title}
        </span>
        <span className="font-inter" style={{ fontSize: 11.5, lineHeight: 1.5, color: 'rgba(26,24,22,0.55)' }}>
          {blurb}
        </span>
      </span>
    </button>
  )
}

// A whole-frame preview of the film with a draggable focal reticle. The point
// the couple picks is the part of the film that's guaranteed to stay in view
// when the screen crops it. The big live preview behind updates as they drag.
function FocalPicker({
  src, poster, focal, focalHint, onChange,
}: {
  src: string; poster: string | null; focal: { x: number; y: number }
  focalHint: string
  onChange: (x: number, y: number) => void
}) {
  const boxRef = useRef<HTMLDivElement | null>(null)
  const [aspect, setAspect] = useState(9 / 16)   // updated from the video metadata
  const draggingRef = useRef(false)

  const apply = (clientX: number, clientY: number) => {
    const box = boxRef.current
    if (!box) return
    const r = box.getBoundingClientRect()
    onChange((clientX - r.left) / r.width, (clientY - r.top) / r.height)
  }

  return (
    <div className="mt-1 flex flex-col gap-2">
      <div
        ref={boxRef}
        className="relative mx-auto overflow-hidden rounded-xl"
        style={{
          aspectRatio: String(aspect),
          maxHeight: 230,
          width: 'auto',
          height: 'min(230px, 38dvh)',
          background: '#000',
          cursor: 'crosshair',
          touchAction: 'none',
          border: '1px solid rgba(26,24,22,0.12)',
        }}
        onPointerDown={(e) => {
          draggingRef.current = true
          ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
          apply(e.clientX, e.clientY)
        }}
        onPointerMove={(e) => { if (draggingRef.current) apply(e.clientX, e.clientY) }}
        onPointerUp={() => { draggingRef.current = false }}
      >
        <video
          // Imperatively guarantee muted + inline playback the moment the element
          // mounts: React's `muted` JSX prop does NOT reliably set the DOM `muted`
          // property, so the browser can block this autoplaying preview and freeze
          // it on its poster (esp. iOS/Android).
          ref={(v) => {
            if (!v) return
            v.muted = true
            v.defaultMuted = true
            v.setAttribute('muted', '')
            v.playsInline = true
            v.setAttribute('playsinline', '')
            v.setAttribute('webkit-playsinline', '')
            v.setAttribute('disablepictureinpicture', '')
            v.setAttribute('disableremoteplayback', '')
          }}
          className="absolute inset-0 h-full w-full"
          style={{ objectFit: 'contain' }}
          src={src}
          poster={poster ?? undefined}
          autoPlay
          muted
          loop
          playsInline
          onLoadedMetadata={(e) => {
            const v = e.currentTarget
            v.muted = true
            if (v.videoWidth && v.videoHeight) setAspect(v.videoWidth / v.videoHeight)
          }}
        />
        {/* dim everything except the focal area to convey "this stays" */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'rgba(10,8,6,0.28)' }}
        />
        {/* focal reticle */}
        <div
          className="pointer-events-none absolute"
          style={{
            left: `${focal.x * 100}%`,
            top: `${focal.y * 100}%`,
            width: 40,
            height: 40,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            border: '2px solid #FDFCF9',
            boxShadow: '0 0 0 1px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.4)',
          }}
        >
          <span
            className="absolute left-1/2 top-1/2"
            style={{ width: 4, height: 4, marginLeft: -2, marginTop: -2, borderRadius: '50%', background: '#FDFCF9' }}
          />
        </div>
      </div>
      <p className="font-inter text-center" style={{ fontSize: 10.5, letterSpacing: '0.04em', color: 'rgba(26,24,22,0.42)' }}>
        {focalHint}
      </p>
    </div>
  )
}
