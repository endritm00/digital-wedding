'use client'

import { use, useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import { Hairline } from '@/components/builder/hairline'
import { StepSheet } from '@/components/builder/step-sheet'
import { useBuilder } from '@/components/builder/builder-provider'
import { MUSIC_TRACKS } from '@/lib/builder/presets'
import { uploadFile, pollAsset } from '@/lib/builder/api'

// Animated visualizer — 3 bars that bounce when a track is playing
function Visualizer({ active }: { active: boolean }) {
  const reduced = useReducedMotion()
  return (
    <span className="flex items-end gap-[2px]" aria-hidden="true">
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          style={{
            width: 2,
            borderRadius: 2,
            background: '#FDFCF9',
            display: 'block',
          }}
          animate={active && !reduced
            ? { height: [4, 10, 4], opacity: [0.7, 1, 0.7] }
            : { height: 4, opacity: 0.5 }
          }
          transition={{
            duration: 0.9,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.18,
          }}
        />
      ))}
    </span>
  )
}

export default function MusicPage({ params }: { params: Promise<{ inviteId: string }> }) {
  const { inviteId } = use(params)
  const { opening, setOpening, setMediaAsset } = useBuilder()
  const router = useRouter()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const previewTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const [playing, setPlaying] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const config = (opening?.config ?? {}) as {
    music_track?: string | null
    music_asset_id?: string | null
  }
  const selectedTrack = config.music_track ?? null
  const hasCustomAudio = Boolean(config.music_asset_id)

  // Stop playback on unmount
  useEffect(() => {
    return () => {
      audioRef.current?.pause()
      if (previewTimerRef.current) clearTimeout(previewTimerRef.current)
    }
  }, [])

  const togglePreview = (track: (typeof MUSIC_TRACKS)[number]) => {
    if (playing === track.id) {
      audioRef.current?.pause()
      if (previewTimerRef.current) clearTimeout(previewTimerRef.current)
      setPlaying(null)
      return
    }

    audioRef.current?.pause()
    if (previewTimerRef.current) clearTimeout(previewTimerRef.current)

    const audio = audioRef.current ?? new Audio()
    audioRef.current = audio
    audio.src = track.src
    audio.currentTime = 0
    setPlaying(track.id)

    void audio.play().catch(() => setPlaying(null))

    // 15-second preview cap
    previewTimerRef.current = setTimeout(() => {
      audio.pause()
      setPlaying(null)
    }, 15_000)

    audio.onended = () => {
      if (previewTimerRef.current) clearTimeout(previewTimerRef.current)
      setPlaying(null)
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setUploadError(null)
    try {
      const assetId = await uploadFile(inviteId, 'background_music', file)
      setOpening({ music_asset_id: assetId, music_track: null })
      const stop = pollAsset(inviteId, assetId, (asset) => {
        setMediaAsset(asset)
        if (asset.status === 'ready' || asset.status === 'failed') stop()
      })
    } catch {
      setUploadError('Upload failed — please try again.')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  return (
    <>
      <Hairline step="music" />
      <StepSheet
        title="What plays when they open it?"
        lede="A short piece sets the tone before guests read a word."
        primaryLabel="Continue"
        onPrimary={() => {
          audioRef.current?.pause()
          router.push(`/builder/${inviteId}/save`)
        }}
        laterLabel="No music"
        onLater={() => {
          audioRef.current?.pause()
          setOpening({ music_track: null, music_asset_id: null })
          router.push(`/builder/${inviteId}/save`)
        }}
        backHref={`/builder/${inviteId}/style`}
      >
        <div className="flex flex-col gap-2">
          {MUSIC_TRACKS.map((track) => {
            const active = selectedTrack === track.id && !hasCustomAudio
            const isPlaying = playing === track.id

            return (
              <div
                key={track.id}
                role="button"
                tabIndex={0}
                onClick={() => setOpening({ music_track: track.id, music_asset_id: null })}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ')
                    setOpening({ music_track: track.id, music_asset_id: null })
                }}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 cursor-pointer transition-all"
                style={{
                  background: active ? 'rgba(168,133,75,0.09)' : 'rgba(255,255,255,0.5)',
                  border: active
                    ? '1px solid rgba(168,133,75,0.38)'
                    : '1px solid rgba(26,24,22,0.08)',
                }}
              >
                {/* 15-second preview button */}
                <motion.button
                  type="button"
                  onClick={e => { e.stopPropagation(); togglePreview(track) }}
                  whileTap={{ scale: 0.9 }}
                  className="flex-none flex items-center justify-center rounded-full transition-colors"
                  style={{
                    width: 32,
                    height: 32,
                    background: active ? '#A8854B' : 'rgba(26,24,22,0.06)',
                  }}
                  aria-label={isPlaying ? `Pause ${track.title}` : `Preview ${track.title}`}
                >
                  {isPlaying && active ? (
                    /* Show animated bars when the active+selected track is playing */
                    <Visualizer active />
                  ) : isPlaying ? (
                    <svg width="10" height="11" viewBox="0 0 10 11" fill="none" aria-hidden="true">
                      <rect x="1" y="1" width="3" height="9" rx="0.5" fill="#1A1816" />
                      <rect x="6" y="1" width="3" height="9" rx="0.5" fill="#1A1816" />
                    </svg>
                  ) : (
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
                      <path d="M1.5 1.5L8.5 6L1.5 10.5V1.5Z" fill={active ? '#FDFCF9' : '#1A1816'} />
                    </svg>
                  )}
                </motion.button>

                <div className="flex min-w-0 flex-1 flex-col">
                  <span
                    className="font-cormorant font-light leading-tight truncate"
                    style={{ fontSize: 16, color: '#1A1816' }}
                  >
                    {track.title}
                  </span>
                  <span className="font-inter" style={{ fontSize: 10, color: 'rgba(26,24,22,0.44)' }}>
                    {track.mood} · {track.duration}
                  </span>
                </div>

                {active && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="flex-none">
                    <circle cx="8" cy="8" r="7.5" stroke="#A8854B" />
                    <path d="M5 8.5l2 2L11 5.5" stroke="#A8854B" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            )
          })}

          {/* Upload own audio */}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-3 rounded-2xl px-4 py-3 transition-all disabled:opacity-55"
            style={{
              background: hasCustomAudio ? 'rgba(168,133,75,0.09)' : 'rgba(255,255,255,0.5)',
              border: hasCustomAudio
                ? '1px solid rgba(168,133,75,0.38)'
                : '1px dashed rgba(26,24,22,0.14)',
            }}
          >
            <div
              className="flex-none flex items-center justify-center rounded-full"
              style={{ width: 32, height: 32, background: 'rgba(168,133,75,0.1)' }}
            >
              {uploading ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M7 1.5A5.5 5.5 0 0 1 12.5 7" stroke="#A8854B" strokeWidth="1.4" strokeLinecap="round">
                    <animateTransform attributeName="transform" type="rotate" from="0 7 7" to="360 7 7" dur="0.9s" repeatCount="indefinite" />
                  </path>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M7 2v10M2 7h10" stroke="#A8854B" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              )}
            </div>
            <span className="font-cormorant font-light" style={{ fontSize: 16, color: '#1A1816' }}>
              {uploading ? 'Uploading…' : hasCustomAudio ? 'Custom track uploaded ✓' : 'Upload your own music'}
            </span>
          </button>
          <input ref={fileRef} type="file" accept="audio/*" className="hidden" onChange={handleFileChange} />
          {uploadError && (
            <p className="font-inter text-center" style={{ fontSize: 11, color: '#8A4030' }}>
              {uploadError}
            </p>
          )}
        </div>
      </StepSheet>
    </>
  )
}
