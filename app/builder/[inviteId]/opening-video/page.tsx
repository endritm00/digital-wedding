'use client'

import { use, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Hairline } from '@/components/builder/hairline'
import { StepSheet } from '@/components/builder/step-sheet'
import { useBuilder } from '@/components/builder/builder-provider'
import { VIDEO_PRESETS } from '@/lib/builder/presets'
import { uploadFile, pollAsset, ApiError } from '@/lib/builder/api'

export default function OpeningVideoPage({ params }: { params: Promise<{ inviteId: string }> }) {
  const { inviteId } = use(params)
  const { opening, setOpening, setMediaAsset, refreshQuote, media } = useBuilder()
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  // Video upload routes through Mux. When Mux isn't configured the server returns
  // `video_provider_error` — we surface a calm "coming soon" state rather than a
  // hard failure, and disable the upload card until it's available.
  const [videoUnavailable, setVideoUnavailable] = useState(false)

  const config = (opening?.config ?? {}) as {
    video_preset?: string
    video_asset_id?: string
  }
  const selectedPreset = config.video_preset ?? null
  const hasCustomVideo = Boolean(config.video_asset_id)

  // Block Continue until the uploaded video is processed and previewing.
  // Once status==='ready' the background preview loads it automatically.
  const uploadedAsset = config.video_asset_id
    ? media.find((m) => m.id === config.video_asset_id) ?? null
    : null
  const uploadedProcessing = uploadedAsset !== null && uploadedAsset.status !== 'ready'

  // The opening section persists ~800ms after setOpening; the quote derives the
  // custom-film fee from it server-side, so refresh shortly after a change for a
  // prompt total update.
  const refreshQuoteSoon = () => setTimeout(() => { void refreshQuote() }, 1100)

  const handlePresetSelect = (id: string) => {
    // Switching to a preset drops the custom film (and its fee + framing choice).
    setOpening({ video_preset: id, video_asset_id: null, video_fit: null, video_focal: null })
    refreshQuoteSoon()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setUploadError(null)
    try {
      const assetId = await uploadFile(inviteId, 'opening_video', file)
      // Default to the no-crop "blend" framing; the couple refine it on the
      // next (Frame) step. Setting the asset id triggers the €4.99 film fee.
      setOpening({ video_asset_id: assetId, video_preset: null, video_fit: 'blend' })
      refreshQuoteSoon()
      const stop = pollAsset(inviteId, assetId, (asset) => {
        setMediaAsset(asset)
        if (asset.status === 'ready' || asset.status === 'failed') stop()
      })
    } catch (err) {
      if (err instanceof ApiError && err.code === 'video_provider_unavailable') {
        // Mux is not configured on this environment — permanent disable
        setVideoUnavailable(true)
        setUploadError('Custom video upload is coming soon — pick a film above for now.')
      } else {
        // Transient error (plan limit, network, etc.) — card stays enabled so they can retry
        setUploadError('Upload failed — please try again.')
      }
    } finally {
      setUploading(false)
      // Reset input so the same file can be re-selected if needed
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  return (
    <>
      <Hairline step="opening-video" />
      <StepSheet
        title="Your opening film"
        lede="Guests see this first. Pick a mood or upload a clip from your day."
        primaryLabel="Continue"
        primaryBusy={uploading || uploadedProcessing}
        primaryDisabled={uploading || uploadedProcessing}
        onPrimary={() =>
          router.push(`/builder/${inviteId}/${hasCustomVideo ? 'frame' : 'style'}`)
        }
        laterLabel="No video"
        onLater={() => router.push(`/builder/${inviteId}/style`)}
        backHref={`/builder/${inviteId}/names`}
      >
        {/* Vertical grid of film moods — scrolls with the sheet */}
        <div className="grid grid-cols-2 gap-3">
          {VIDEO_PRESETS.map((preset) => {
            const active = selectedPreset === preset.id && !hasCustomVideo
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handlePresetSelect(preset.id)}
                className="rounded-2xl overflow-hidden transition-all focus-visible:outline-none"
                style={{
                  width: '100%',
                  aspectRatio: '3 / 4',
                  backgroundColor: preset.poster.from,
                  backgroundImage: `url(${preset.posterImg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  outline: active ? '2.5px solid #A8854B' : '2.5px solid transparent',
                  outlineOffset: 2,
                  boxShadow: active
                    ? '0 8px 28px rgba(168,133,75,0.38), 0 0 0 1px rgba(168,133,75,0.2)'
                    : '0 4px 14px rgba(26,24,22,0.1)',
                  filter: active ? 'drop-shadow(0 0 10px rgba(168,133,75,0.35))' : 'none',
                  transition: 'box-shadow 0.3s, filter 0.3s, outline-color 0.2s',
                }}
                aria-pressed={active}
                aria-label={`${preset.name} — ${preset.mood}`}
              >
                <div
                  className="flex h-full flex-col justify-end p-3"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 45%, transparent 70%)',
                  }}
                >
                  <span className="font-cormorant text-left font-light leading-tight" style={{ fontSize: 15, color: '#FDFCF9' }}>
                    {preset.name}
                  </span>
                  <span className="font-inter mt-0.5 text-left" style={{ fontSize: 9, letterSpacing: '0.04em', color: 'rgba(255,255,255,0.58)' }}>
                    {preset.mood}
                  </span>
                </div>
              </button>
            )
          })}

          {/* Upload-your-own card */}
          <button
            type="button"
            onClick={() => { if (!videoUnavailable) fileRef.current?.click() }}
            disabled={uploading || videoUnavailable}
            className="rounded-2xl flex flex-col items-center justify-center gap-2 transition-all disabled:cursor-not-allowed focus-visible:outline-none"
            style={{
              width: '100%',
              aspectRatio: '3 / 4',
              background: '#ECEAE4',
              opacity: videoUnavailable ? 0.7 : 1,
              border: hasCustomVideo ? '2px solid #A8854B' : '2px dashed rgba(26,24,22,0.16)',
            }}
            aria-label={videoUnavailable ? 'Custom video upload coming soon' : 'Upload your own video'}
          >
            <div className="flex items-center justify-center rounded-full" style={{ width: 34, height: 34, background: 'rgba(168,133,75,0.12)' }}>
              {uploading ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="6.5" stroke="rgba(168,133,75,0.4)" strokeWidth="1.5" />
                  <path d="M8 1.5A6.5 6.5 0 0 1 14.5 8" stroke="#A8854B" strokeWidth="1.5" strokeLinecap="round">
                    <animateTransform attributeName="transform" type="rotate" from="0 8 8" to="360 8 8" dur="0.9s" repeatCount="indefinite" />
                  </path>
                </svg>
              ) : videoUnavailable ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="6" stroke="#A8854B" strokeWidth="1.4" />
                  <path d="M8 5v3.2l2 1.3" stroke="#A8854B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 3v10M3 8h10" stroke="#A8854B" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </div>
            <span className="font-inter px-2 text-center leading-snug" style={{ fontSize: 13, letterSpacing: '0.01em', color: 'rgba(26,24,22,0.7)', fontWeight: 500 }}>
              {uploading ? 'Uploading…' : videoUnavailable ? 'Coming soon' : hasCustomVideo ? 'Uploaded ✓' : 'Your own clip'}
            </span>
            {!uploading && !videoUnavailable && !hasCustomVideo && (
              <>
                <span className="font-inter px-4 text-center leading-snug" style={{ fontSize: 11, color: 'rgba(26,24,22,0.5)', letterSpacing: '0.01em', lineHeight: 1.5 }}>
                  Only upload videos with a maximum duration of 10 seconds in MP4 or MOV format.
                </span>
                <span
                  className="font-inter rounded-full px-2.5 py-1"
                  style={{ fontSize: 10, letterSpacing: '0.04em', color: '#A8854B', background: 'rgba(168,133,75,0.12)' }}
                >
                  +€4.99
                </span>
              </>
            )}
          </button>
        </div>

        {/* Upload / processing banner — two phases, same design */}
        {(uploading || uploadedProcessing) && (
          <div
            className="mt-3 flex items-center gap-2.5 rounded-2xl px-4 py-3"
            style={{ background: 'rgba(168,133,75,0.08)', border: '1px solid rgba(168,133,75,0.22)' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="flex-none">
              <circle cx="7" cy="7" r="5.5" stroke="rgba(168,133,75,0.3)" strokeWidth="1.4" />
              <path d="M7 1.5A5.5 5.5 0 0 1 12.5 7" stroke="#A8854B" strokeWidth="1.4" strokeLinecap="round">
                <animateTransform attributeName="transform" type="rotate" from="0 7 7" to="360 7 7" dur="0.9s" repeatCount="indefinite" />
              </path>
            </svg>
            <div className="min-w-0">
              <p className="font-inter leading-tight" style={{ fontSize: 12, color: '#1A1816' }}>
                {uploading ? 'Uploading your video…' : 'Getting your film ready…'}
              </p>
              <p className="font-inter mt-0.5" style={{ fontSize: 10, color: 'rgba(26,24,22,0.5)' }}>
                {uploading
                  ? 'This takes 10–15 seconds. Please wait before continuing.'
                  : 'Your video will show in the preview. This may take a few seconds.'}
              </p>
            </div>
          </div>
        )}

        {/* gentle note on the custom-film fee */}
        {!uploading && !uploadedProcessing && (
          <p
            className="font-inter mt-3 text-center"
            style={{ fontSize: 10.5, letterSpacing: '0.03em', color: 'rgba(26,24,22,0.42)' }}
          >
            Curated films are included. Uploading your own adds €4.99.
          </p>
        )}

        <input
          ref={fileRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {uploadError && (
          <p
            className="font-inter mt-3 text-center"
            style={{ fontSize: 11, color: '#8A4030' }}
          >
            {uploadError}
          </p>
        )}

      </StepSheet>
    </>
  )
}
