import { SiteNav } from '@/components/marketing/site-nav'
import { SiteFooter } from '@/components/marketing/site-footer'

export const metadata = {
  title: 'Terms of Service | Belle Nuit',
  robots: { index: false, follow: false },
}

export default function TermsPage() {
  return (
    <>
      <SiteNav />
      <main style={{ background: '#FDFCF9', minHeight: '100vh' }}>
        <div
          style={{
            maxWidth: '42rem',
            margin: '0 auto',
            padding: 'clamp(2rem, 8vw, 4rem) clamp(1.5rem, 4vw, 2.5rem)',
          }}
        >
          <h1
            className="font-cormorant"
            style={{
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              fontWeight: 300,
              color: '#1A1816',
              marginBottom: '2rem',
              marginTop: 0,
            }}
          >
            Terms of Service
          </h1>

          <div style={{ color: '#1A1816', lineHeight: 1.8 }}>
            <section style={{ marginBottom: '2rem' }}>
              <h2 className="font-cormorant" style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '1rem' }}>
                License Grant
              </h2>
              <p className="font-inter" style={{ fontSize: '14px', color: 'rgba(26,24,22,0.8)' }}>
                Belle Nuit grants you a limited, non-exclusive license to create and publish one wedding invitation per account. You retain ownership of the content you upload (photos, videos, text). By publishing, you grant us the right to store, display, and transmit your invitation to guests.
              </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 className="font-cormorant" style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '1rem' }}>
                Acceptable Use
              </h2>
              <p className="font-inter" style={{ fontSize: '14px', color: 'rgba(26,24,22,0.8)' }}>
                You agree not to:
              </p>
              <ul className="font-inter" style={{ fontSize: '14px', color: 'rgba(26,24,22,0.8)', marginLeft: '1.5rem' }}>
                <li>Use Belle Nuit for spam, harassment, or illegal content</li>
                <li>Attempt to reverse-engineer or exploit our service</li>
                <li>Use automated tools to scrape data or bypass rate limits</li>
                <li>Impersonate others or create fraudulent invitations</li>
                <li>Violate intellectual property rights of others</li>
              </ul>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 className="font-cormorant" style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '1rem' }}>
                Payment & Billing
              </h2>
              <p className="font-inter" style={{ fontSize: '14px', color: 'rgba(26,24,22,0.8)' }}>
                Publishing an invitation requires a one-time payment in EUR via Stripe. Prices are displayed before checkout. Payments are non-refundable, but you may delete and recreate an invitation if needed. All prices are inclusive of applicable taxes in the EU.
              </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 className="font-cormorant" style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '1rem' }}>
                Limitation of Liability
              </h2>
              <p className="font-inter" style={{ fontSize: '14px', color: 'rgba(26,24,22,0.8)' }}>
                Belle Nuit is provided "as-is" without warranties. We are not liable for:
              </p>
              <ul className="font-inter" style={{ fontSize: '14px', color: 'rgba(26,24,22,0.8)', marginLeft: '1.5rem' }}>
                <li>Service interruptions or downtime</li>
                <li>Loss of data or uploaded content</li>
                <li>Guests not receiving invitations or RSVPs</li>
                <li>Third-party service failures (Stripe, Mux, etc.)</li>
              </ul>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 className="font-cormorant" style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '1rem' }}>
                Content Removal
              </h2>
              <p className="font-inter" style={{ fontSize: '14px', color: 'rgba(26,24,22,0.8)' }}>
                We reserve the right to remove invitations or suspend accounts that violate these terms. You may delete your invitation at any time, which removes it from public access.
              </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 className="font-cormorant" style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '1rem' }}>
                Changes to Terms
              </h2>
              <p className="font-inter" style={{ fontSize: '14px', color: 'rgba(26,24,22,0.8)' }}>
                We may update these terms at any time. Continued use of Belle Nuit after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 className="font-cormorant" style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '1rem' }}>
                Contact & Support
              </h2>
              <p className="font-inter" style={{ fontSize: '14px', color: 'rgba(26,24,22,0.8)' }}>
                For questions about these terms, contact us at <a href="mailto:info@belle-nuit.online" style={{ color: '#A8854B', textDecoration: 'none' }}>support@bellenuit.app</a>.
              </p>
            </section>

            <section style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(26,24,22,0.1)' }}>
              <p className="font-inter" style={{ fontSize: '12px', color: 'rgba(26,24,22,0.5)' }}>
                Last updated: June 2025
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
