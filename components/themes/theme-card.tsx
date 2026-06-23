import Link from 'next/link'
import type { ResolvedTemplate } from '@/lib/templates/templates'

// A single template card for the /themes index grid. Server-rendered, CSS-only
// hover. Poster painted via background-image (next/image domain config is locked).
export function ThemeCard({ t, index }: { t: ResolvedTemplate; index: number }) {
  const dark = t.palette.dark
  return (
    <Link
      href={`/themes/${t.slug}`}
      className="group relative block overflow-hidden rounded-[3px] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{
        background: t.palette.paper,
        border: '1px solid rgba(26,24,22,0.08)',
        boxShadow: '0 1px 2px rgba(26,24,22,0.04)',
        // @ts-expect-error CSS custom property for focus ring
        '--tw-ring-color': t.palette.accent,
      }}
      aria-label={`View the ${t.name} wedding invitation template — ${t.tagline}`}
    >
      {/* Poster still — mimics the opening film frame of the real invitation */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          style={{
            backgroundImage: `linear-gradient(160deg, ${t.film.poster.from}, ${t.film.poster.to})`,
          }}
        />
        <img
          src={t.film.posterImg}
          alt={`A still from the ${t.film.name} opening film used by the ${t.name} wedding invitation design`}
          loading={index < 4 ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        {/* Scrim so the couple name reads over any frame */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(12,10,8,0.05) 0%, transparent 38%, rgba(12,10,8,0.58) 100%)',
          }}
        />
        {/* Film name chip */}
        <span
          className="font-inter absolute left-4 top-4 rounded-full px-3 py-1 uppercase backdrop-blur-sm"
          style={{
            fontSize: 8.5,
            letterSpacing: '0.22em',
            color: 'rgba(253,252,249,0.92)',
            background: 'rgba(20,16,12,0.32)',
            border: '1px solid rgba(255,255,255,0.16)',
          }}
        >
          {t.film.name}
        </span>
        {/* Couple names set in the template's own heading font, over the poster */}
        <div className="absolute inset-x-0 bottom-0 p-5 text-center">
          <span
            className="block"
            style={{
              fontFamily: t.font.var,
              fontStyle: t.font.italic ? 'italic' : 'normal',
              fontSize: 'clamp(1.6rem, 4.6vw, 2.1rem)',
              lineHeight: 1.05,
              color: '#FDFCF9',
              textShadow: '0 2px 24px rgba(0,0,0,0.55)',
            }}
          >
            {t.sample.names}
          </span>
        </div>
      </div>

      {/* Caption block in the palette */}
      <div className="px-5 pb-5 pt-4" style={{ color: t.palette.ink }}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3
              className="font-inter uppercase"
              style={{ fontSize: 10.5, letterSpacing: '0.2em', color: t.palette.accent }}
            >
              {t.name}
            </h3>
            <p
              className="font-inter mt-1.5"
              style={{ fontSize: 12, lineHeight: 1.55, color: dark ? 'rgba(255,255,255,0.62)' : 'rgba(26,24,22,0.56)' }}
            >
              {t.tagline}
            </p>
          </div>
          {/* Palette swatch */}
          <span className="mt-0.5 flex shrink-0 gap-1" aria-hidden="true">
            {t.palette.swatch.map((c, i) => (
              <span
                key={i}
                className="h-3.5 w-3.5 rounded-full"
                style={{ background: c, border: '1px solid rgba(0,0,0,0.08)' }}
              />
            ))}
          </span>
        </div>
        <span
          className="font-inter mt-4 inline-flex items-center gap-1.5 uppercase transition-all duration-500 group-hover:gap-2.5"
          style={{ fontSize: 9.5, letterSpacing: '0.2em', color: t.palette.accent }}
        >
          View design
          <span aria-hidden="true">&rarr;</span>
        </span>
      </div>
    </Link>
  )
}
