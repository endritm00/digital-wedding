import type { Metadata } from 'next'
import Link from 'next/link'
import { ALL_TEMPLATES_RESOLVED } from '@/lib/templates/templates'
import { ThemeCard } from '@/components/themes/theme-card'
import { OrnamentDiamond, OrnamentLine } from '@/components/themes/ornament'

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://digitalinvite.app'

export const metadata: Metadata = {
  title: 'Wedding Invitation Templates & Themes | Digital Invite',
  description:
    'Browse our collection of premium digital wedding invitation templates — ivory and gold, blush, sage, navy, terracotta and more. Each opens with a film. Personalise yours in minutes from €19.99.',
  keywords: [
    'wedding invitation templates',
    'digital wedding invitations',
    'wedding invitation themes',
    'online wedding invitation designs',
    'video wedding invitation',
    'animated wedding invitation',
    'wedding invite templates',
  ],
  alternates: { canonical: '/themes' },
  openGraph: {
    title: 'Wedding Invitation Templates & Themes | Digital Invite',
    description:
      'A curated collection of premium digital wedding invitation designs — each one opens with a cinematic film and is personalised in minutes.',
    url: `${BASE}/themes`,
    type: 'website',
    siteName: 'Digital Invite',
    images: ALL_TEMPLATES_RESOLVED.slice(0, 4).map((t) => ({
      url: t.film.posterImg,
      alt: `${t.name} wedding invitation design`,
    })),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wedding Invitation Templates & Themes | Digital Invite',
    description:
      'A curated collection of premium digital wedding invitation designs — each one opens with a cinematic film.',
    images: [ALL_TEMPLATES_RESOLVED[0]?.film.posterImg].filter(Boolean) as string[],
  },
}

// JSON-LD: an ItemList of every template, each modelled as a Product so search
// engines and AI crawlers can enumerate the collection with prices & links.
function CollectionJsonLd() {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Digital Invite Wedding Invitation Templates',
    description:
      'A curated collection of premium digital wedding invitation templates, each pairing a colour palette, calligraphy and an opening film.',
    url: `${BASE}/themes`,
    numberOfItems: ALL_TEMPLATES_RESOLVED.length,
    itemListElement: ALL_TEMPLATES_RESOLVED.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: `${t.name} — Digital Wedding Invitation`,
        description: t.description,
        url: `${BASE}/themes/${t.slug}`,
        image: t.film.posterImg,
        category: 'Wedding Invitation Template',
        brand: { '@type': 'Brand', name: 'Digital Invite' },
        offers: {
          '@type': 'Offer',
          price: '19.99',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          url: `${BASE}/themes/${t.slug}`,
        },
      },
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
    />
  )
}

export default function ThemesPage() {
  return (
    <main className="relative min-h-screen" style={{ background: '#F8F4EF', color: '#1A1816' }}>
      <CollectionJsonLd />

      {/* ── Editorial header ──────────────────────────────────────────────── */}
      <header className="relative px-6 pt-24 pb-16 text-center sm:pt-28">
        <div className="mx-auto max-w-3xl">
          <p
            className="font-inter uppercase"
            style={{ fontSize: 10, letterSpacing: '0.36em', color: 'rgba(168,133,75,0.9)' }}
          >
            The Collection
          </p>
          <h1
            className="font-cormorant mt-6 font-light"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 5.4rem)', lineHeight: 0.98, letterSpacing: '-0.01em' }}
          >
            Wedding invitation
            <br />
            <span className="font-pinyon" style={{ color: '#A8854B', fontSize: '1.18em', lineHeight: 0.9 }}>
              designs
            </span>
          </h1>

          <div className="mt-8 flex justify-center">
            <OrnamentLine color="#A8854B" width={130} />
          </div>

          <p
            className="font-inter mx-auto mt-8 max-w-xl"
            style={{ fontSize: 14.5, lineHeight: 2, color: 'rgba(26,24,22,0.62)' }}
          >
            Eight hand-composed designs, each a complete invitation — a colour palette, a
            calligraphic hand, and a short film that opens the moment a guest taps the link.
            Choose the one that feels like you, then make it yours in a few minutes. Every
            design is fully personalised with your names, your story, your day and your venue,
            and shared with a single link.
          </p>

          <div className="mt-10 flex items-center justify-center gap-5">
            <Link
              href="/builder"
              className="font-inter rounded-full uppercase transition-transform duration-500 hover:scale-[1.04]"
              style={{
                fontSize: 11,
                padding: '14px 36px',
                background: '#1A1816',
                color: '#F8F4EF',
                letterSpacing: '0.2em',
                boxShadow: '0 6px 28px rgba(26,24,22,0.2)',
              }}
            >
              Start creating
            </Link>
            <span className="font-inter" style={{ fontSize: 10.5, letterSpacing: '0.12em', color: 'rgba(26,24,22,0.4)' }}>
              From €19.99 · Live in minutes
            </span>
          </div>
        </div>
      </header>

      {/* ── Gallery grid ──────────────────────────────────────────────────── */}
      <section aria-label="Wedding invitation templates" className="px-5 pb-28 sm:px-8">
        <ul className="mx-auto grid max-w-6xl list-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ALL_TEMPLATES_RESOLVED.map((t, i) => (
            <li key={t.slug}>
              <ThemeCard t={t} index={i} />
            </li>
          ))}
        </ul>
      </section>

      {/* ── Closing note ──────────────────────────────────────────────────── */}
      <section className="px-6 pb-32 text-center">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-7">
          <OrnamentDiamond color="#A8854B" />
          <h2
            className="font-cormorant font-light italic"
            style={{ fontSize: 'clamp(1.9rem, 5.4vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.01em' }}
          >
            Not sure which one? Start with any design — you can change the look at any time.
          </h2>
          <Link
            href="/builder"
            className="font-inter uppercase transition-opacity duration-300 hover:opacity-60"
            style={{ fontSize: 11, letterSpacing: '0.22em', color: '#A8854B' }}
          >
            Begin your invitation &rarr;
          </Link>
        </div>
      </section>
    </main>
  )
}
