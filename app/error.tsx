'use client'

import Link from 'next/link'

function BotanicalOrnament() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M24 38 C20 34, 12 30, 8 24"
        stroke="#A8854B"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M18 36 C16 31, 10 28, 8 24"
        stroke="#A8854B"
        strokeWidth="0.7"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
      <ellipse cx="12" cy="26" rx="4" ry="2.2" stroke="#A8854B" strokeWidth="0.7" fill="none" opacity="0.6" transform="rotate(-35 12 26)" />
      <ellipse cx="16" cy="32" rx="4" ry="2.2" stroke="#A8854B" strokeWidth="0.7" fill="none" opacity="0.6" transform="rotate(-20 16 32)" />
      <ellipse cx="21" cy="37" rx="4" ry="2.2" stroke="#A8854B" strokeWidth="0.7" fill="none" opacity="0.6" transform="rotate(-5 21 37)" />
      <path
        d="M24 38 C28 34, 36 30, 40 24"
        stroke="#A8854B"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M30 36 C32 31, 38 28, 40 24"
        stroke="#A8854B"
        strokeWidth="0.7"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
      <ellipse cx="36" cy="26" rx="4" ry="2.2" stroke="#A8854B" strokeWidth="0.7" fill="none" opacity="0.6" transform="rotate(35 36 26)" />
      <ellipse cx="32" cy="32" rx="4" ry="2.2" stroke="#A8854B" strokeWidth="0.7" fill="none" opacity="0.6" transform="rotate(20 32 32)" />
      <ellipse cx="27" cy="37" rx="4" ry="2.2" stroke="#A8854B" strokeWidth="0.7" fill="none" opacity="0.6" transform="rotate(5 27 37)" />
      <line x1="24" y1="42" x2="24" y2="34" stroke="#A8854B" strokeWidth="0.7" strokeLinecap="round" opacity="0.5" />
      <rect
        x="21.5"
        y="21.5"
        width="5"
        height="5"
        stroke="#A8854B"
        strokeWidth="0.7"
        fill="none"
        opacity="0.6"
        transform="rotate(45 24 24)"
      />
    </svg>
  )
}

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error: _error, reset }: ErrorPageProps) {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: '#FDFCF9' }}
    >
      <div className="flex flex-col items-center gap-6 max-w-sm">
        <BotanicalOrnament />

        <h1
          className="font-cormorant font-light text-[#1A1816]"
          style={{ fontSize: '3rem', lineHeight: 1.1, letterSpacing: '-0.01em' }}
        >
          Something went wrong
        </h1>

        <p
          className="font-inter text-[#1A1816]"
          style={{ fontSize: 13, lineHeight: 1.7, opacity: 0.6, maxWidth: '34ch' }}
        >
          We hit an unexpected error. Please try again, or come back in a moment.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
          <button
            onClick={reset}
            className="font-inter rounded-full transition-all duration-300 hover:opacity-80 hover:scale-[1.02]"
            style={{
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '12px 28px',
              background: 'transparent',
              color: '#A8854B',
              border: '1px solid #A8854B',
            }}
          >
            Try again
          </button>

          <Link
            href="/"
            className="font-inter rounded-full transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
            style={{
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '13px 28px',
              background: '#A8854B',
              color: '#FFFFFF',
            }}
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  )
}
