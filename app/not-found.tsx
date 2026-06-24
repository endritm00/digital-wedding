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
      {/* Left laurel branch */}
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

      {/* Right laurel branch (mirrored) */}
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

      {/* Center stem */}
      <line x1="24" y1="42" x2="24" y2="34" stroke="#A8854B" strokeWidth="0.7" strokeLinecap="round" opacity="0.5" />

      {/* Crown — small diamond */}
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

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: '#FDFCF9' }}
    >
      <div className="flex flex-col items-center gap-6 max-w-sm">
        <BotanicalOrnament />

        <p
          className="font-cormorant font-light text-[#1A1816]"
          style={{ fontSize: '5rem', lineHeight: 1, letterSpacing: '-0.02em' }}
        >
          404
        </p>

        <h1
          className="font-cormorant italic text-[#1A1816]"
          style={{ fontSize: '1.5rem', fontWeight: 400, lineHeight: 1.3 }}
        >
          This invitation is not available
        </h1>

        <p
          className="font-inter text-[#1A1816]"
          style={{ fontSize: 13, lineHeight: 1.7, opacity: 0.6, maxWidth: '30ch' }}
        >
          The link may have expired, or this invitation has been removed.
        </p>

        <Link
          href="/"
          className="font-inter rounded-full transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
          style={{
            fontSize: 11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            padding: '13px 32px',
            background: '#A8854B',
            color: '#FFFFFF',
            marginTop: '0.5rem',
          }}
        >
          Back to Digital Invite
        </Link>
      </div>
    </main>
  )
}
