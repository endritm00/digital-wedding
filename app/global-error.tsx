'use client'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error: _error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FFFFFF',
          fontFamily: 'system-ui, sans-serif',
          textAlign: 'center',
          padding: '24px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', maxWidth: '400px' }}>
          <p
            style={{
              fontSize: '2.5rem',
              fontWeight: 300,
              color: '#1A1816',
              margin: 0,
              lineHeight: 1.2,
              fontFamily: 'Georgia, serif',
            }}
          >
            Something went wrong
          </p>

          <p
            style={{
              fontSize: 13,
              color: 'rgba(26,24,22,0.55)',
              lineHeight: 1.7,
              margin: 0,
              maxWidth: '30ch',
            }}
          >
            An unexpected error occurred. Please reload the page.
          </p>

          <button
            onClick={reset}
            style={{
              marginTop: '8px',
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '13px 32px',
              background: '#A8854B',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '9999px',
              cursor: 'pointer',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  )
}
