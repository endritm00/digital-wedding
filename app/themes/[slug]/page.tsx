import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ALL_TEMPLATES_RESOLVED,
  TEMPLATES,
  resolveTemplate,
  type ResolvedTemplate,
} from '@/lib/templates/templates'
import { buildSampleInvite } from '@/lib/templates/sample-invite'
import { OrnamentDiamond, OrnamentLine } from '@/components/themes/ornament'
import { InvitationView } from '@/components/invite/invitation-view'
import { HeroCrest, HeroFrame, HeroCorners } from '@/components/invite/hero-card'
import { cardLegibility } from '@/lib/invite/legibility'

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://digitalinvite.app'

export function generateStaticParams() {
  return TEMPLATES.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const t = resolveTemplate(slug)
  if (!t) return { title: 'Template not found | Digital Invite' }
  return {
    title: `${t.name} — Wedding Invitation Template | Digital Invite`,
    description: t.description,
    keywords: t.keywords,
    alternates: { canonical: `/themes/${t.slug}` },
    openGraph: {
      title: `${t.name} — Wedding Invitation Template | Digital Invite`,
      description: t.description,
      url: `${BASE}/themes/${t.slug}`,
      type: 'article',
      siteName: 'Digital Invite',
      images: [{ url: t.film.posterImg, alt: `${t.name} wedding invitation design` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t.name} — Wedding Invitation Template | Digital Invite`,
      description: t.description,
      images: [t.film.posterImg],
    },
  }
}

// Per-template structured data: a Product (the design) + a BreadcrumbList.
function DetailJsonLd({ t }: { t: ResolvedTemplate }) {
  const product = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${t.name} — Digital Wedding Invitation Template`,
    description: t.intro,
    image: t.film.posterImg,
    url: `${BASE}/themes/${t.slug}`,
    category: 'Wedding Invitation Template',
    brand: { '@type': 'Brand', name: 'Digital Invite' },
    keywords: t.keywords.join(', '),
    offers: {
      '@type': 'Offer',
      price: '19.99',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `${BASE}/themes/${t.slug}`,
    },
  }
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Templates', item: `${BASE}/themes` },
      { '@type': 'ListItem', position: 3, name: t.name, item: `${BASE}/themes/${t.slug}` },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  )
}

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const t = resolveTemplate(slug)
  if (!t) notFound()

  const p = t.palette
  const dark = !!p.dark
  // Derived, palette-aware tones for body text & faint lines.
  const soft = dark ? 'rgba(255,255,255,0.66)' : 'rgba(26,24,22,0.6)'
  const faint = dark ? 'rgba(255,255,255,0.4)' : 'rgba(26,24,22,0.4)'
  const hair = dark ? 'rgba(255,255,255,0.12)' : 'rgba(26,24,22,0.1)'
  const headingStyle = {
    fontFamily: t.font.var,
    fontStyle: t.font.italic ? ('italic' as const) : ('normal' as const),
  }

  // The REAL invite renderer, fed fully-filled sample data → the theme preview is
  // pixel-identical to what a buyer actually builds & publishes.
  const sample = buildSampleInvite(t, { heroLayout: 'open' })
  const others = ALL_TEMPLATES_RESOLVED.filter((o) => o.slug !== t.slug).slice(0, 4)

  // NB: root is a <div> (not <main>) because the embedded InvitationView renders
  // its own <main> — keeps a single <main> per page.
  return (
    <div style={{ background: p.paper, color: p.ink }}>
      <DetailJsonLd t={t} />

      {/* ── Top utility bar (back link + start CTA) ───────────────────────── */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-5 py-3.5 backdrop-blur-md sm:px-8"
        style={{
          background: dark ? 'rgba(20,16,14,0.55)' : 'rgba(248,244,239,0.7)',
          borderBottom: `1px solid ${hair}`,
        }}
      >
        <Link
          href="/themes"
          className="font-inter uppercase transition-opacity duration-300 hover:opacity-60"
          style={{ fontSize: 10, letterSpacing: '0.2em', color: p.accent }}
        >
          &larr; All designs
        </Link>
        <Link
          href={`/builder?from=${t.slug}`}
          className="font-inter rounded-full uppercase transition-transform duration-500 hover:scale-[1.04]"
          style={{
            fontSize: 9.5,
            padding: '9px 22px',
            background: p.accent,
            color: dark ? p.paper : '#FDFCF9',
            letterSpacing: '0.18em',
          }}
        >
          Start with {t.name}
        </Link>
      </div>

      {/* ── 1. The full live sample — the REAL invitation, fully filled ───── */}
      <section className="relative">
        <span
          className="font-inter pointer-events-none absolute left-1/2 top-[64px] z-30 -translate-x-1/2 rounded-full px-3.5 py-1.5 uppercase"
          style={{
            fontSize: 8.5,
            letterSpacing: '0.22em',
            color: 'rgba(253,252,249,0.92)',
            background: 'rgba(12,10,8,0.42)',
            border: '1px solid rgba(253,252,249,0.22)',
            backdropFilter: 'blur(6px)',
          }}
        >
          A live sample · scroll to explore
        </span>
        <InvitationView
          invite={sample.invite}
          sections={sample.sections}
          media={sample.media}
          rsvp={{ kind: 'preview' }}
          enableOpener={false}
        />
      </section>

      {/* ── 2. Two ways to open — both "Welcome" treatments, stills only ──── */}
      <section className="px-6 py-24" style={{ background: p.wash }}>
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <p className="font-inter uppercase" style={{ fontSize: 10, letterSpacing: '0.3em', color: p.accent }}>
              Choose how it opens
            </p>
            <h2 className="mt-6" style={{ ...headingStyle, fontSize: 'clamp(1.7rem,5vw,2.8rem)', lineHeight: 1.1, color: p.ink }}>
              Two ways to greet your guests
            </h2>
            <p className="font-inter mx-auto mt-5 max-w-md" style={{ fontSize: 14, lineHeight: 1.8, color: soft }}>
              Open the names large over the film, or set them inside a framed
              stationery card — switch between the two in a tap while you build.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <OpenStill t={t} />
            <CardStill t={t} />
          </div>
        </div>
      </section>

      {/* ── 3. The design + Make this design yours (merged, at the end) ───── */}
      <section className="relative overflow-hidden px-6 py-28 text-center" style={{ background: dark ? p.washAlt : p.paper }}>
        <div className="mx-auto flex max-w-2xl flex-col items-center">
          <p className="font-inter uppercase" style={{ fontSize: 10, letterSpacing: '0.3em', color: p.accent }}>
            The design
          </p>
          <h2 className="mt-6" style={{ ...headingStyle, fontSize: 'clamp(2.1rem,6.2vw,3.6rem)', lineHeight: 1.05, color: p.ink }}>
            {t.tagline}
          </h2>
          <div className="mt-7 flex justify-center">
            <OrnamentLine color={p.accent} width={120} />
          </div>
          <p className="font-inter mx-auto mt-7 max-w-xl" style={{ fontSize: 15, lineHeight: 2, color: soft }}>
            {t.intro}
          </p>

          {/* design facts */}
          <dl className="mx-auto mt-10 flex max-w-md flex-wrap justify-center gap-x-10 gap-y-5">
            <DesignFact label="Palette" value={p.name} accent={p.accent} faint={faint} ink={p.ink} />
            <DesignFact label="Lettering" value={t.font.pair} accent={p.accent} faint={faint} ink={p.ink} />
            <DesignFact label="Opening film" value={t.film.name} accent={p.accent} faint={faint} ink={p.ink} />
          </dl>
          {/* palette swatch row */}
          <div className="mt-9 flex justify-center gap-2.5" aria-hidden="true">
            {p.swatch.map((c, i) => (
              <span
                key={i}
                className="h-7 w-7 rounded-full"
                style={{ background: c, border: `1px solid ${hair}`, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
              />
            ))}
          </div>

          <div className="mt-14">
            <OrnamentDiamond color={p.accent} />
          </div>
          <h3 className="mt-7" style={{ ...headingStyle, fontSize: 'clamp(2rem,5.8vw,3.2rem)', lineHeight: 1.05, color: p.ink }}>
            Make this design yours
          </h3>
          <p className="font-inter mt-5 max-w-md" style={{ fontSize: 14.5, lineHeight: 1.9, color: soft }}>
            Start from {t.name}, then swap in your own names, story, day and venue.
            Your invitation goes live on its own link in minutes — ready to share by
            WhatsApp, email or message.
          </p>
          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href={`/builder?from=${t.slug}`}
              className="font-inter rounded-full uppercase transition-transform duration-500 hover:scale-[1.04]"
              style={{
                fontSize: 11,
                padding: '15px 40px',
                background: p.accent,
                color: dark ? p.paper : '#FDFCF9',
                letterSpacing: '0.2em',
                boxShadow: '0 8px 30px rgba(0,0,0,0.18)',
              }}
            >
              Create yours in this design
            </Link>
            <span className="font-inter" style={{ fontSize: 10.5, letterSpacing: '0.12em', color: faint }}>
              From €19.99 · Live in minutes
            </span>
          </div>
        </div>
      </section>

      {/* ── 4. Explore other designs ──────────────────────────────────────── */}
      <section className="px-5 py-24 sm:px-8" style={{ background: p.wash, borderTop: `1px solid ${hair}` }}>
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className="font-inter uppercase" style={{ fontSize: 10, letterSpacing: '0.3em', color: faint }}>
              Keep looking
            </p>
            <h2 className="mt-5" style={{ ...headingStyle, fontSize: 'clamp(1.7rem,4.6vw,2.6rem)', color: p.ink }}>
              Explore other designs
            </h2>
          </div>
          <ul className="grid list-none grid-cols-2 gap-4 sm:grid-cols-4">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/themes/${o.slug}`}
                  className="group block overflow-hidden rounded-[3px] transition-transform duration-500 hover:-translate-y-1"
                  style={{ border: `1px solid ${hair}` }}
                  aria-label={`View the ${o.name} wedding invitation design`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <div
                      className="absolute inset-0"
                      style={{ background: `linear-gradient(160deg, ${o.film.poster.from}, ${o.film.poster.to})` }}
                      aria-hidden="true"
                    />
                    <img
                      src={o.film.posterImg}
                      alt={`${o.name} wedding invitation design`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(12,10,8,0.6) 100%)' }}
                      aria-hidden="true"
                    />
                    <span
                      className="font-inter absolute inset-x-0 bottom-0 p-3 text-center uppercase"
                      style={{ fontSize: 9, letterSpacing: '0.16em', color: '#FDFCF9' }}
                    >
                      {o.name}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-12 text-center">
            <Link
              href="/themes"
              className="font-inter uppercase transition-opacity duration-300 hover:opacity-60"
              style={{ fontSize: 11, letterSpacing: '0.22em', color: p.accent }}
            >
              See all designs &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

// ── "Two ways to open" stills — film poster + the two name treatments ────────
// Poster-only (no video) so this band stays paint-cheap; the names treatments
// reuse the SAME chrome as the real hero so the preview is faithful.

function StillBase({ t, children, label }: { t: ResolvedTemplate; children: React.ReactNode; label: string }) {
  const p = t.palette
  return (
    <figure className="m-0">
      <div
        className="relative flex items-center justify-center overflow-hidden rounded-[4px]"
        style={{ aspectRatio: '4 / 5', border: `1px solid ${p.dark ? 'rgba(255,255,255,0.14)' : 'rgba(26,24,22,0.12)'}` }}
      >
        {/* gradient base + poster still */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${t.film.poster.from}, ${t.film.poster.to})` }} aria-hidden />
        <img
          src={t.film.posterImg}
          alt={`${t.name} opening film still`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" aria-hidden style={{ background: 'linear-gradient(180deg, rgba(12,10,8,0.42) 0%, rgba(12,10,8,0.12) 42%, rgba(12,10,8,0.55) 100%)' }} />
        {children}
      </div>
      <figcaption
        className="font-inter mt-3 text-center uppercase"
        style={{ fontSize: 9.5, letterSpacing: '0.2em', color: p.dark ? 'rgba(255,255,255,0.55)' : 'rgba(26,24,22,0.5)' }}
      >
        {label}
      </figcaption>
    </figure>
  )
}

// OPEN — big names directly over the film (mirrors the 'open' hero).
function OpenStill({ t }: { t: ResolvedTemplate }) {
  const p = t.palette
  const hs = { fontFamily: t.font.var, fontStyle: t.font.italic ? ('italic' as const) : ('normal' as const) }
  return (
    <StillBase t={t} label="Open over the film">
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <span className="font-inter uppercase" style={{ fontSize: 8.5, fontWeight: 500, letterSpacing: '0.26em', color: 'rgba(253,252,249,0.96)', textShadow: '0 1px 3px rgba(0,0,0,0.6), 0 1px 12px rgba(0,0,0,0.5)' }}>
          You are invited
        </span>
        <span className="mt-3" style={{ ...hs, fontSize: 'clamp(2rem,6vw,3rem)', lineHeight: 0.98, color: p.accent, textShadow: '0 2px 10px rgba(0,0,0,0.45), 0 2px 30px rgba(0,0,0,0.5)' }}>
          {t.sample.names}
        </span>
        <span className="mt-4" style={{ width: 40, height: 1, background: p.accent }} aria-hidden />
        <span className="font-inter mt-4 uppercase" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(253,252,249,0.88)', textShadow: '0 1px 10px rgba(0,0,0,0.5)' }}>
          {t.sample.dateLabel}
        </span>
      </div>
    </StillBase>
  )
}

// CARD — names inside the glass "stationery" card, reusing the real chrome.
function CardStill({ t }: { t: ResolvedTemplate }) {
  const p = t.palette
  const hs = { fontFamily: t.font.var, fontStyle: t.font.italic ? ('italic' as const) : ('normal' as const) }
  const leg = cardLegibility({ paper: p.paper, dark: !!p.dark })
  return (
    <StillBase t={t} label="Framed card">
      <div className="relative isolate z-10 mx-6 px-8 py-10 text-center" style={{ maxWidth: 300 }}>
        <div aria-hidden className="absolute inset-0" style={{ ...leg.glass, zIndex: -1 }} />
        <HeroFrame color={p.accent} />
        <HeroCorners color={p.accent} />
        <HeroCrest color={p.accent} style={{ margin: '0 auto' }} />
        <span className="font-inter uppercase mt-3 block" style={{ fontSize: 7.5, letterSpacing: '0.3em', color: p.ink, opacity: 0.6, textShadow: leg.textShadow }}>
          You are invited
        </span>
        <span className="mt-2 block" style={{ ...hs, fontSize: 'clamp(1.6rem,4.6vw,2.4rem)', lineHeight: 1, color: p.accent, textShadow: leg.textShadow }}>
          {t.sample.names}
        </span>
        <span className="font-cormorant italic font-light mt-2 block" style={{ fontSize: 13, color: p.ink, opacity: 0.9, textShadow: leg.textShadow }}>
          {t.sample.dateLabel}
        </span>
      </div>
    </StillBase>
  )
}

function DesignFact({
  label,
  value,
  accent,
  faint,
  ink,
}: {
  label: string
  value: string
  accent: string
  faint: string
  ink: string
}) {
  return (
    <div className="text-center">
      <dt className="font-inter uppercase" style={{ fontSize: 8.5, letterSpacing: '0.24em', color: faint }}>
        {label}
      </dt>
      <dd className="font-inter mt-2" style={{ fontSize: 12.5, letterSpacing: '0.04em', color: ink }}>
        <span style={{ color: accent }}>&middot;</span> {value}
      </dd>
    </div>
  )
}
