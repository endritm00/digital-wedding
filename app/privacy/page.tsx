import { SiteNav } from '@/components/marketing/site-nav'
import { SiteFooter } from '@/components/marketing/site-footer'

export const metadata = {
  title: 'Privacy Policy | Belle Nuit',
  robots: { index: false, follow: false },
}

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>

          <div style={{ color: '#1A1816', lineHeight: 1.8 }}>
            <section style={{ marginBottom: '2rem' }}>
              <h2 className="font-cormorant" style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '1rem' }}>
                Data We Collect
              </h2>
              <p className="font-inter" style={{ fontSize: '14px', color: 'rgba(26,24,22,0.8)' }}>
                When you create an invitation with Belle Nuit, we collect:
              </p>
              <ul className="font-inter" style={{ fontSize: '14px', color: 'rgba(26,24,22,0.8)', marginLeft: '1.5rem' }}>
                <li>Your email address (for account creation and RSVP management)</li>
                <li>Names of the couple and wedding details (date, venue, location)</li>
                <li>Guest names and RSVP responses</li>
                <li>Photos and videos you upload for your invitation</li>
                <li>Payment information (processed by Stripe, never stored by us)</li>
                <li>IP address and usage analytics (for rate limiting and service improvement)</li>
              </ul>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 className="font-cormorant" style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '1rem' }}>
                How We Use Your Data
              </h2>
              <p className="font-inter" style={{ fontSize: '14px', color: 'rgba(26,24,22,0.8)' }}>
                We use your data to:
              </p>
              <ul className="font-inter" style={{ fontSize: '14px', color: 'rgba(26,24,22,0.8)', marginLeft: '1.5rem' }}>
                <li>Create, store, and publish your wedding invitation</li>
                <li>Send you the RSVP management link via email</li>
                <li>Process your payment for publishing</li>
                <li>Prevent spam and abuse through rate limiting</li>
                <li>Improve our service and user experience</li>
              </ul>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 className="font-cormorant" style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '1rem' }}>
                Third-Party Services
              </h2>
              <p className="font-inter" style={{ fontSize: '14px', color: 'rgba(26,24,22,0.8)' }}>
                We use the following trusted services:
              </p>
              <ul className="font-inter" style={{ fontSize: '14px', color: 'rgba(26,24,22,0.8)', marginLeft: '1.5rem' }}>
                <li><strong>Supabase</strong> — database and storage (GDPR-compliant)</li>
                <li><strong>Stripe</strong> — payment processing (PCI-DSS compliant)</li>
                <li><strong>Mux</strong> — video hosting and playback</li>
                <li><strong>Resend</strong> — email delivery</li>
                <li><strong>Upstash</strong> — rate limiting and caching</li>
              </ul>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 className="font-cormorant" style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '1rem' }}>
                Data Retention
              </h2>
              <p className="font-inter" style={{ fontSize: '14px', color: 'rgba(26,24,22,0.8)' }}>
                Your draft invitations are stored while your account is active. Published invitations (snapshots) are retained indefinitely unless you delete them. You can delete your invitation at any time, which removes it from public access. RSVP data is retained as long as the invitation exists.
              </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 className="font-cormorant" style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '1rem' }}>
                Public vs. Private Data
              </h2>
              <p className="font-inter" style={{ fontSize: '14px', color: 'rgba(26,24,22,0.8)' }}>
                <strong>Public:</strong> Your published invitation is accessible to anyone with the link. It includes names, wedding date, venue, photos, and video.
              </p>
              <p className="font-inter" style={{ fontSize: '14px', color: 'rgba(26,24,22,0.8)' }}>
                <strong>Private:</strong> Your RSVP management link is sent only to your email and is a capability token — only someone with the exact link can manage RSVPs.
              </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 className="font-cormorant" style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '1rem' }}>
                GDPR & Data Rights
              </h2>
              <p className="font-inter" style={{ fontSize: '14px', color: 'rgba(26,24,22,0.8)' }}>
                If you are in the EU, you have the right to access, correct, or delete your personal data. You also have the right to data portability. To exercise these rights, contact us at <a href="mailto:privacy@bellenuit.app" style={{ color: '#A8854B', textDecoration: 'none' }}>privacy@bellenuit.app</a>.
              </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 className="font-cormorant" style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '1rem' }}>
                Contact Us
              </h2>
              <p className="font-inter" style={{ fontSize: '14px', color: 'rgba(26,24,22,0.8)' }}>
                If you have questions about this privacy policy or how we handle your data, please contact us at <a href="mailto:privacy@bellenuit.app" style={{ color: '#A8854B', textDecoration: 'none' }}>privacy@bellenuit.app</a>.
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
