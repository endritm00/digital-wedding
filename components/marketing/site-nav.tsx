import Link from 'next/link'

/**
 * SiteNav — sticky marketing header.
 * Used on /  and /themes. NOT used in the builder (which has its own Hairline).
 * Server component — no interactivity needed.
 */
export function SiteNav() {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(26,24,22,0.82)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(168,133,75,0.18)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 'clamp(1.5rem, 4vw, 2.5rem)',
          paddingRight: 'clamp(1.5rem, 4vw, 2.5rem)',
          paddingTop: '0.875rem',
          paddingBottom: '0.875rem',
        }}
      >
        {/* Logo with a delicate gold ornament */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
          }}
        >
          {/* Small diamond ornament */}
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
            <path d="M4 0.5L7.5 4L4 7.5L0.5 4L4 0.5Z" stroke="#A8854B" strokeWidth="0.8" fill="rgba(168,133,75,0.15)" />
          </svg>
          <span
            className="font-cormorant"
            style={{
              fontSize: 19,
              fontWeight: 400,
              color: '#FDFCF9',
              letterSpacing: '0.06em',
            }}
          >
            Belle Nuit
          </span>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
            <path d="M4 0.5L7.5 4L4 7.5L0.5 4L4 0.5Z" stroke="#A8854B" strokeWidth="0.8" fill="rgba(168,133,75,0.15)" />
          </svg>
        </Link>

        {/* Right nav */}
        <nav aria-label="Main navigation" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link
            href="/themes"
            className="font-inter"
            style={{
              fontSize: 12,
              fontWeight: 400,
              color: 'rgba(253,252,249,0.6)',
              textDecoration: 'none',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              transition: 'color 0.2s',
            }}
          >
            Designs
          </Link>
          {/* Hairline separator */}
          <span style={{ width: 1, height: 14, background: 'rgba(168,133,75,0.3)', display: 'block' }} aria-hidden />
          <Link
            href="/builder"
            className="font-inter"
            style={{
              fontSize: 12,
              fontWeight: 500,
              padding: '7px 20px',
              borderRadius: 9999,
              background: '#A8854B',
              color: '#FDFCF9',
              textDecoration: 'none',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 12px rgba(168,133,75,0.35)',
            }}
          >
            Create yours
          </Link>
        </nav>
      </div>
    </header>
  )
}
