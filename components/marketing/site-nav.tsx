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
        background: 'rgba(253,252,249,0.92)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(26,24,22,0.06)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 'clamp(1.5rem, 4vw, 2.5rem)',
          paddingRight: 'clamp(1.5rem, 4vw, 2.5rem)',
          paddingTop: '1rem',
          paddingBottom: '1rem',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-cormorant"
          style={{
            fontSize: 18,
            fontWeight: 500,
            color: '#1A1816',
            textDecoration: 'none',
            letterSpacing: '0.01em',
          }}
        >
          Digital Invite
        </Link>

        {/* Right nav */}
        <nav aria-label="Main navigation" style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
          <Link
            href="/themes"
            className="font-inter site-nav-link"
            style={{
              fontSize: 13,
              color: 'rgba(26,24,22,0.72)',
              textDecoration: 'none',
              letterSpacing: '0.02em',
            }}
          >
            Designs
          </Link>
          <Link
            href="/builder"
            className="font-inter"
            style={{
              fontSize: 13,
              fontWeight: 500,
              padding: '8px 20px',
              borderRadius: 9999,
              background: '#A8854B',
              color: '#FFFFFF',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              whiteSpace: 'nowrap',
            }}
          >
            Create yours
          </Link>
        </nav>
      </div>
    </header>
  )
}
