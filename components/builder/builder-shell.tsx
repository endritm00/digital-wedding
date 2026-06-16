'use client'

import { useBuilder } from './builder-provider'
import { StepTransition } from './step-transition'

// Skeleton that renders while the BuilderProvider is loading initial data.
// Uses a pure-CSS shimmer animation so it works without JS animation deps.
function SkeletonShimmer() {
  return (
    <div
      className="
        fixed z-30 inset-x-0 bottom-0
        lg:inset-x-auto lg:right-6 lg:top-16 lg:bottom-6 lg:w-[420px]
        flex flex-col
        rounded-t-[26px] lg:rounded-[26px]
        max-h-[74dvh] lg:max-h-none
        overflow-hidden
      "
      style={{
        background: '#F3EFE7',
        boxShadow: '0 -12px 48px rgba(26,24,22,0.14), 0 2px 8px rgba(26,24,22,0.05)',
      }}
      aria-busy="true"
      aria-label="Loading your invitation builder…"
    >
      {/* grab notch */}
      <div className="flex justify-center pt-3 lg:hidden">
        <div className="h-1 w-9 rounded-full" style={{ background: 'rgba(26,24,22,0.12)' }} />
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { background-position: -600px 0; }
          100% { background-position:  600px 0; }
        }
        .shimmer-bar {
          border-radius: 6px;
          background: linear-gradient(
            90deg,
            rgba(26,24,22,0.06) 0%,
            rgba(26,24,22,0.11) 40%,
            rgba(26,24,22,0.06) 80%
          );
          background-size: 600px 100%;
          animation: shimmer 1.6s infinite linear;
        }
      `}</style>

      <div className="flex-1 px-6 pt-5 pb-3 lg:px-8 lg:pt-8 flex flex-col gap-5">
        {/* title bar */}
        <div className="shimmer-bar h-8 w-3/4" />
        {/* lede lines */}
        <div className="flex flex-col gap-2">
          <div className="shimmer-bar h-3 w-full" />
          <div className="shimmer-bar h-3 w-2/3" />
        </div>
        {/* field blocks */}
        <div className="flex flex-col gap-4 mt-2">
          <div className="shimmer-bar h-12 w-full rounded-xl" />
          <div className="shimmer-bar h-12 w-full rounded-xl" />
          <div className="shimmer-bar h-12 w-full rounded-xl" />
        </div>
      </div>

      {/* CTA area */}
      <div className="px-6 pb-6 lg:px-8">
        <div className="shimmer-bar h-12 w-full rounded-full" />
      </div>
    </div>
  )
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div
      className="
        fixed z-30 inset-x-0 bottom-0
        lg:inset-x-auto lg:right-6 lg:top-16 lg:bottom-6 lg:w-[420px]
        flex flex-col items-center justify-center gap-5
        rounded-t-[26px] lg:rounded-[26px]
        max-h-[74dvh] lg:max-h-none p-8
      "
      style={{
        background: '#F3EFE7',
        boxShadow: '0 -12px 48px rgba(26,24,22,0.14), 0 2px 8px rgba(26,24,22,0.05)',
      }}
    >
      <p
        className="font-cormorant font-light text-center leading-snug"
        style={{ fontSize: 22, color: '#1A1816' }}
      >
        We couldn&rsquo;t load your invitation
      </p>
      <p className="font-inter text-center" style={{ fontSize: 12, color: 'rgba(26,24,22,0.5)' }}>
        {message}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-full px-6 py-3 font-inter"
        style={{
          background: '#A8854B',
          color: '#FDFCF9',
          fontSize: 13,
          letterSpacing: '0.04em',
          boxShadow: '0 6px 20px rgba(168,133,75,0.32)',
        }}
      >
        Try again
      </button>
    </div>
  )
}

// The client shell that gates children behind loading/error states and
// wraps them in the step-to-step slide transition.
export function BuilderShell({ children }: { children: React.ReactNode }) {
  const { loading, loadError } = useBuilder()

  if (loading) return <SkeletonShimmer />

  if (loadError) {
    return (
      <ErrorState
        message={loadError}
        onRetry={() => window.location.reload()}
      />
    )
  }

  return <StepTransition>{children}</StepTransition>
}
