import Link from 'next/link'

/**
 * SiteFooter — marketing footer.
 * Used on /  and /themes. Server component.
 */
export function SiteFooter() {
  return (
    <footer
      style={{
        background: '#1A1816',
        paddingLeft: 'clamp(1.5rem, 4vw, 2.5rem)',
        paddingRight: 'clamp(1.5rem, 4vw, 2.5rem)',
        paddingTop: '2rem',
        paddingBottom: '2rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}
        className="sm:flex-row sm:justify-between sm:items-center"
      >
        {/* Copyright */}
        <p
          className="font-inter"
          style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.5)',
            margin: 0,
          }}
        >
          &copy; 2025 Belle Nuit. All rights reserved.
        </p>

        {/* Links */}
        <nav
          aria-label="Footer navigation"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Link
            href="/privacy"
            className="font-inter footer-link"
            style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.6)',
              textDecoration: 'none',
            }}
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="font-inter footer-link"
            style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.6)',
              textDecoration: 'none',
            }}
          >
            Terms of Service
          </Link>
          <a
            href="mailto:info@belle-nuit.online"
            className="font-inter footer-link"
            style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.6)',
              textDecoration: 'none',
            }}
          >
            support@bellenuit.app
          </a>
        </nav>
      </div>
    </footer>
  )
}
