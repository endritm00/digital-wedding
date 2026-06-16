import { Fragment } from 'react'

const MOMENTS = [
  {
    number: '01',
    heading: 'Choose your design.',
    body: 'Browse our curated themes — each one crafted by designers who understand weddings, not generic templates.',
  },
  {
    number: '02',
    heading: 'Make it yours.',
    body: 'Enter your names, date, venue, and RSVP details. Live preview. No design software, no learning curve.',
  },
  {
    number: '03',
    heading: 'Share with one link.',
    body: 'Your guests tap a link on their phone and your invitation opens instantly. No app. No account. Pure magic.',
  },
]

export function MomentsSection() {
  return (
    <section
      className="py-24 md:py-40 px-6 md:px-16"
      style={{ background: '#FAF6F0' }}
      aria-label="How it works"
    >
      <div className="max-w-3xl mx-auto">

        {/* Section label */}
        <span
          className="font-inter tracking-[0.32em] uppercase block mb-16 md:mb-20"
          style={{ fontSize: 9, color: 'rgba(26,26,26,0.28)' }}
        >
          How it works
        </span>

        {/* Editorial numbered steps */}
        {MOMENTS.map((m, i) => (
          <Fragment key={m.number}>
            {i > 0 && (
              <div
                className="my-14 md:my-20 w-full h-px"
                style={{ background: 'rgba(26,26,26,0.08)' }}
              />
            )}
            <div className="grid grid-cols-[auto_1fr] gap-8 md:gap-16 items-start">
              <span
                className="font-inter select-none pt-1"
                style={{ fontSize: 10, letterSpacing: '0.3em', color: 'rgba(26,26,26,0.22)' }}
              >
                {m.number}
              </span>
              <div>
                <h3
                  className="font-cormorant font-light text-[#1A1A1A] leading-none"
                  style={{ fontSize: 'clamp(2.4rem, 8vw, 5.4rem)', letterSpacing: '-0.01em' }}
                >
                  {m.heading}
                </h3>
                <p
                  className="font-inter mt-4 leading-relaxed max-w-sm"
                  style={{ fontSize: 13, color: 'rgba(26,26,26,0.5)' }}
                >
                  {m.body}
                </p>
              </div>
            </div>
          </Fragment>
        ))}

        {/* Trust line */}
        <div
          className="mt-20 md:mt-28 pt-10 flex flex-wrap items-center gap-3"
          style={{ borderTop: '1px solid rgba(26,26,26,0.1)' }}
        >
          <div className="flex gap-0.5" aria-label="5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="12" height="12" viewBox="0 0 13 13" aria-hidden="true">
                <path d="M6.5 0.5L8.1 4.5L12.5 4.9L9.2 7.8L10.2 12.1L6.5 9.9L2.8 12.1L3.8 7.8L0.5 4.9L4.9 4.5L6.5 0.5Z" fill="rgba(26,26,26,0.65)" />
              </svg>
            ))}
          </div>
          <span
            className="font-inter leading-none"
            style={{ fontSize: 11, color: 'rgba(26,26,26,0.4)' }}
          >
            4.9 &nbsp;·&nbsp; Loved by 2,400+ couples across 14 countries
          </span>
        </div>
      </div>
    </section>
  )
}
