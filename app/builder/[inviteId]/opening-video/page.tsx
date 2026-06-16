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
  const { opening, setOpening, setMediaAsset } = useBuilder()
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

  const handlePresetSelect = (id: string) => {
    setOpening({ video_preset: id, video_asset_id: null })
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setUploadError(null)
    try {
      const assetId = await uploadFile(inviteId, 'opening_video', file)
      setOpening({ video_asset_id: assetId, video_preset: null })
      const stop = pollAsset(inviteId, assetId, (asset) => {
        setMediaAsset(asset)
        if (asset.status === 'ready' || asset.status === 'failed') stop()
      })
    } catch (err) {
      if (err instanceof ApiError && err.code === 'video_provider_error') {
        setVideoUnavailable(true)
        setUploadError('Custom video upload is coming soon — pick a film above for now.')
      } else {
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
        onPrimary={() => router.push(`/builder/${inviteId}/music`)}
        laterLabel="No video"
        onLater={() => router.push(`/builder/${inviteId}/music`)}
        backHref={`/builder/${inviteId}/style`}
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
            <span className="font-inter px-2 text-center leading-snug" style={{ fontSize: 10, letterSpacing: '0.03em', color: 'rgba(26,24,22,0.52)' }}>
              {uploading ? 'Uploading…' : videoUnavailable ? 'Coming soon' : hasCustomVideo ? 'Uploaded ✓' : 'Your own clip'}
            </span>
          </button>
        </div>

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

        {hasCustomVideo && !uploading && (
          <p
            className="font-inter mt-3 text-center"
            style={{ fontSize: 10, letterSpacing: '0.04em', color: 'rgba(26,24,22,0.4)' }}
          >
            Your film is processing — it will appear in the preview once ready.
          </p>
        )}
      </StepSheet>
    </>
  )
}
