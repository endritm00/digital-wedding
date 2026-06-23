import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ALL_TEMPLATES_RESOLVED,
  TEMPLATES,
  resolveTemplate,
  type ResolvedTemplate,
} from '@/lib/templates/templates'
import { OrnamentDiamond, OrnamentLine } from '@/components/themes/ornament'
import { ThemeFilmHero } from '@/components/themes/theme-film-hero'

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

  const others = ALL_TEMPLATES_RESOLVED.filter((o) => o.slug !== t.slug).slice(0, 4)

  return (
    <main style={{ background: p.paper, color: p.ink }}>
      <DetailJsonLd t={t} />

      {/* ── Top utility bar (back link) ───────────────────────────────────── */}
      <div
        className="sticky top-0 z-40 flex items-center justify-between px-5 py-3.5 backdrop-blur-md sm:px-8"
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

      <article>
        {/* ── 1. Cinematic hero — the opening film still ──────────────────── */}
        <header className="relative flex min-h-[88dvh] flex-col items-center justify-center overflow-hidden px-6 text-center">
          {/* gradient base + poster still, with the opening film fading in over it */}
          <ThemeFilmHero
            hls={t.film.hls ?? null}
            mp4={t.film.src}
            posterImg={t.film.posterImg}
            posterFrom={t.film.poster.from}
            posterTo={t.film.poster.to}
            alt={`The ${t.name} wedding invitation opening on the ${t.film.name} film — ${t.film.mood.toLowerCase()}`}
          />
          {/* themed cinematic scrim */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(12,10,8,0.5) 0%, rgba(12,10,8,0.14) 34%, rgba(12,10,8,0.3) 64%, rgba(12,10,8,0.74) 100%)',
            }}
            aria-hidden="true"
          />
          {/* inset frame, in the accent */}
          <div
            className="pointer-events-none absolute hidden sm:block"
            style={{ inset: 'clamp(14px,2.4vw,30px)', border: `1px solid ${hexToRgba(p.accent, 0.4)}` }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-center">
            <p
              className="font-inter uppercase"
              style={{ fontSize: 10, letterSpacing: '0.32em', color: hexToRgba(p.accent, 0.95), textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}
            >
              {t.name}
            </p>
            <h1
              className="mt-6"
              style={{
                ...headingStyle,
                fontSize: 'clamp(3.2rem, 12vw, 8rem)',
                lineHeight: 0.92,
                color: '#FDFCF9',
                textShadow: '0 2px 44px rgba(0,0,0,0.5)',
              }}
            >
              {t.sample.names}
            </h1>
            <div className="mt-7">
              <OrnamentDiamond color="rgba(253,252,249,0.82)" />
            </div>
            <p
              className="font-inter mt-7 uppercase"
              style={{ fontSize: 12, letterSpacing: '0.22em', color: 'rgba(253,252,249,0.92)', textShadow: '0 1px 14px rgba(0,0,0,0.5)' }}
            >
              {t.sample.dateLabel}
            </p>
            <p
              className="font-inter mt-2"
              style={{ fontSize: 11.5, letterSpacing: '0.08em', color: 'rgba(253,252,249,0.74)', textShadow: '0 1px 14px rgba(0,0,0,0.5)' }}
            >
              {t.sample.venueName} · {t.sample.venueAddress}
            </p>
          </div>

          {/* tiny caption: this is a live preview of the design */}
          <p
            className="font-inter absolute bottom-6 left-1/2 z-10 -translate-x-1/2 uppercase"
            style={{ fontSize: 8.5, letterSpacing: '0.26em', color: 'rgba(253,252,249,0.6)' }}
          >
            A preview of the {t.name} invitation
          </p>
        </header>

        {/* ── 2. Intro / positioning copy (crawlable) ────────────────────── */}
        <section className="px-6 py-24 text-center" style={{ background: p.wash }}>
          <div className="mx-auto max-w-2xl">
            <p className="font-inter uppercase" style={{ fontSize: 10, letterSpacing: '0.3em', color: p.accent }}>
              The design
            </p>
            <h2
              className="mt-6"
              style={{
                ...headingStyle,
                fontSize: 'clamp(1.9rem, 5.6vw, 3.2rem)',
                lineHeight: 1.08,
                color: p.ink,
              }}
            >
              {t.tagline}
            </h2>
            <div className="mt-7 flex justify-center">
              <OrnamentLine color={p.accent} width={120} />
            </div>
            <p className="font-inter mx-auto mt-7 max-w-xl" style={{ fontSize: 15, lineHeight: 2, color: soft }}>
              {t.intro}
            </p>
            {/* design facts — readable spec for buyers and crawlers */}
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
          </div>
        </section>

        {/* ── 3. "Your story" block ──────────────────────────────────────── */}
        <section className="px-6 py-24" style={{ background: p.paper }}>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-inter uppercase" style={{ fontSize: 10, letterSpacing: '0.3em', color: faint }}>
              Our story
            </p>
            <h2 className="mt-6" style={{ ...headingStyle, fontSize: 'clamp(1.8rem,5vw,2.8rem)', lineHeight: 1.1, color: p.accent }}>
              How it began
            </h2>
            <p
              className="font-inter mx-auto mt-8 max-w-xl"
              style={{ fontSize: 17, lineHeight: 1.95, color: p.ink, fontStyle: 'italic', opacity: 0.92 }}
            >
              {t.sample.story}
            </p>
          </div>
        </section>

        {/* ── 4. "The day" schedule block ────────────────────────────────── */}
        <section className="px-6 py-24" style={{ background: p.washAlt }}>
          <div className="mx-auto max-w-xl">
            <div className="text-center">
              <p className="font-inter uppercase" style={{ fontSize: 10, letterSpacing: '0.3em', color: faint }}>
                The day
              </p>
              <h2 className="mt-6" style={{ ...headingStyle, fontSize: 'clamp(1.8rem,5vw,2.8rem)', lineHeight: 1.1, color: p.accent }}>
                The order of the day
              </h2>
              <div className="mt-7 flex justify-center">
                <OrnamentDiamond color={p.accent} />
              </div>
            </div>
            <ol className="mt-12 list-none space-y-0">
              {t.sample.schedule.map((row, i) => (
                <li
                  key={i}
                  className="flex items-baseline gap-6 py-5"
                  style={{ borderTop: i === 0 ? 'none' : `1px solid ${hair}` }}
                >
                  <span
                    className="font-inter shrink-0 tabular-nums"
                    style={{ fontSize: 13, letterSpacing: '0.12em', color: p.accent, minWidth: 56 }}
                  >
                    {row.time}
                  </span>
                  <span style={{ ...headingStyle, fontSize: 'clamp(1.3rem,3.6vw,1.7rem)', lineHeight: 1.2, color: p.ink }}>
                    {row.title}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── 5. Venue block ─────────────────────────────────────────────── */}
        <section className="px-6 py-24 text-center" style={{ background: p.paper }}>
          <div className="mx-auto max-w-xl">
            <p className="font-inter uppercase" style={{ fontSize: 10, letterSpacing: '0.3em', color: faint }}>
              The venue
            </p>
            <h2 className="mt-6" style={{ ...headingStyle, fontSize: 'clamp(2rem,6vw,3.4rem)', lineHeight: 1.04, color: p.accent }}>
              {t.sample.venueName}
            </h2>
            <p className="font-inter mt-5" style={{ fontSize: 14, letterSpacing: '0.06em', lineHeight: 1.8, color: soft }}>
              {t.sample.venueAddress}
            </p>
            <div className="mt-8 flex justify-center">
              <OrnamentLine color={p.accent} width={110} />
            </div>
          </div>
        </section>

        {/* ── 6. CTA block ───────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden px-6 py-28 text-center"
          style={{ background: dark ? p.washAlt : p.wash }}
        >
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-7">
            <OrnamentDiamond color={p.accent} />
            <h2 style={{ ...headingStyle, fontSize: 'clamp(2.2rem,6.4vw,3.8rem)', lineHeight: 1.04, color: p.ink }}>
              Make this design yours
            </h2>
            <p className="font-inter max-w-md" style={{ fontSize: 14.5, lineHeight: 1.9, color: soft }}>
              Start from {t.name}, then swap in your own names, story, day and venue. Your
              invitation goes live on its own link in minutes — ready to share by WhatsApp,
              email or message.
            </p>
            <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row">
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

        {/* ── 7. Explore other designs ───────────────────────────────────── */}
        <section className="px-5 py-24 sm:px-8" style={{ background: p.paper, borderTop: `1px solid ${hair}` }}>
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
      </article>
    </main>
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

// Lightweight hex → rgba (handles #RGB and #RRGGBB). Used for accent scrims.
function hexToRgba(hex: string, alpha: number): string {
  let h = hex.replace('#', '')
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  const n = parseInt(h, 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return `rgba(${r},${g},${b},${alpha})`
}
