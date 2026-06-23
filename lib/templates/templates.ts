// ════════════════════════════════════════════════════════════════════════════
// Marketable invitation TEMPLATES — the public, SEO-facing catalogue.
//
// A "template" is a curated pairing of an existing palette + heading font +
// opening film (all defined in lib/builder/presets) dressed up with a marketable
// name, copy, and realistic sample content. They power:
//   • the home page "templates" showcase (poster-only, no autoplay video), and
//   • the /themes index + /themes/[slug] detail pages (the "final product" view).
//
// Everything references EXISTING ids in lib/builder/presets so a template maps
// 1:1 onto what the builder can actually produce. Slugs are stable URLs — do not
// rename without a redirect.
// ════════════════════════════════════════════════════════════════════════════

import {
  PALETTE_MAP, HEADING_FONT_MAP, VIDEO_PRESETS,
  type Palette, type HeadingFont, type VideoPreset,
} from '@/lib/builder/presets'

export interface TemplateSample {
  names: string
  dateISO: string          // YYYY-MM-DD
  dateLabel: string        // human label, e.g. "14 June 2026"
  venueName: string
  venueAddress: string
  story: string            // "your story" paragraph
  schedule: { time: string; title: string }[]
}

export interface Template {
  slug: string             // stable URL segment, e.g. "classic-elegance"
  name: string             // marketable display name
  tagline: string          // one short line for hero/cards
  description: string       // SEO meta description (~150 chars, plain text)
  intro: string             // longer paragraph — detail page + AI/LLM context
  keywords: string[]        // SEO keywords for this template
  paletteId: string         // → PALETTE_MAP
  headingFontId: string     // → HEADING_FONT_MAP
  filmId: string            // → VIDEO_PRESETS (opening film)
  sample: TemplateSample
}

// Resolved bundle — convenience for renderers so they don't re-look-up ids.
export interface ResolvedTemplate extends Template {
  palette: Palette
  font: HeadingFont
  film: VideoPreset
}

export const TEMPLATES: Template[] = [
  {
    slug: 'classic-elegance',
    name: 'Classic Elegance',
    tagline: 'Ivory, gold, and timeless calligraphy.',
    description:
      'A timeless ivory-and-gold digital wedding invitation with romantic calligraphy and a film that opens as guests arrive. Design yours in minutes.',
    intro:
      'Classic Elegance is our most-loved design — warm ivory paper, soft gold detailing, and flowing Pinyon calligraphy. An opening film of an aisle in bloom sets the scene before your names appear, hand-lettered, at the centre of it all.',
    keywords: ['classic wedding invitation', 'ivory and gold invitation', 'calligraphy wedding invite', 'elegant digital invitation'],
    paletteId: 'ivory-gold',
    headingFontId: 'pinyon-baskerville',
    filmId: 'the-vows',
    sample: {
      names: 'Eleanor & Thomas',
      dateISO: '2026-09-12',
      dateLabel: '12 September 2026',
      venueName: 'Villa Cortine',
      venueAddress: 'Sirmione, Lake Garda, Italy',
      story:
        'We met on a slow Tuesday in a bookshop that no longer exists, reaching for the same worn copy of the same poems. Seven years later, we are still finishing each other’s sentences.',
      schedule: [
        { time: '15:00', title: 'Ceremony in the garden' },
        { time: '16:30', title: 'Aperitivo by the lake' },
        { time: '19:00', title: 'Dinner under the loggia' },
        { time: '22:00', title: 'Dancing until late' },
      ],
    },
  },
  {
    slug: 'blush-romance',
    name: 'Blush Romance',
    tagline: 'Soft rose, candlelight, and ornate script.',
    description:
      'A blush-and-rose digital wedding invitation with ornate script and a soft floral film. Warm, romantic, and effortless to personalise.',
    intro:
      'Blush Romance leans tender — petal-soft rose tones, a flourishing Corinthia script, and an opening of flowers unfolding in bloom. It suits garden ceremonies and golden-hour celebrations.',
    keywords: ['blush wedding invitation', 'rose gold wedding invite', 'romantic digital invitation', 'floral wedding invitation'],
    paletteId: 'blush',
    headingFontId: 'corinthia-cormorant',
    filmId: 'golden-hour',
    sample: {
      names: 'Amara & Daniel',
      dateISO: '2026-06-20',
      dateLabel: '20 June 2026',
      venueName: 'The Orangery',
      venueAddress: 'Kensington Gardens, London',
      story:
        'It began with a wrong number and a conversation that lasted four hours. We have not stopped talking since — and we would love for you to be there when we make it official.',
      schedule: [
        { time: '14:00', title: 'Guests arrive' },
        { time: '14:30', title: 'Ceremony' },
        { time: '16:00', title: 'Garden reception' },
        { time: '20:00', title: 'First dance' },
      ],
    },
  },
  {
    slug: 'sage-garden',
    name: 'Sage Garden',
    tagline: 'Botanical green, open air, and calm.',
    description:
      'A sage-green botanical digital wedding invitation with an airy, ethereal layout and an open-air film. Perfect for garden and outdoor weddings.',
    intro:
      'Sage Garden is fresh and unhurried — muted botanical greens, generous white space, and an aerial film of the venue at dusk. An ethereal layout lets each detail breathe.',
    keywords: ['sage green wedding invitation', 'botanical wedding invite', 'garden wedding invitation', 'outdoor wedding invitation'],
    paletteId: 'sage',
    headingFontId: 'cormorant-garamond',
    filmId: 'open-air',
    sample: {
      names: 'Maya & Oliver',
      dateISO: '2026-07-04',
      dateLabel: '4 July 2026',
      venueName: 'Hawthorn Estate',
      venueAddress: 'Cotswolds, England',
      story:
        'Two city people who fell for the same quiet hillside. We are getting married where we first said “let’s stay a while” — and we hope you will, too.',
      schedule: [
        { time: '16:00', title: 'Ceremony in the meadow' },
        { time: '17:30', title: 'Drinks on the terrace' },
        { time: '19:30', title: 'Long-table dinner' },
        { time: '21:30', title: 'Bonfire & music' },
      ],
    },
  },
  {
    slug: 'midnight-pearl',
    name: 'Midnight & Pearl',
    tagline: 'Deep navy, warm gold, editorial calm.',
    description:
      'A midnight-navy digital wedding invitation with pearl text and an editorial layout. Dramatic, modern, and quietly luxurious.',
    intro:
      'Midnight & Pearl is for evening weddings — a deep navy ground, warm gold accents, and a refined editorial layout. The opening film drifts over a reception set beneath an open sky.',
    keywords: ['navy wedding invitation', 'modern wedding invite', 'editorial wedding invitation', 'evening wedding invitation'],
    paletteId: 'midnight',
    headingFontId: 'fraunces-inter',
    filmId: 'the-veil',
    sample: {
      names: 'Sofia & Marcus',
      dateISO: '2026-10-17',
      dateLabel: '17 October 2026',
      venueName: 'The Conservatory',
      venueAddress: 'Edinburgh, Scotland',
      story:
        'A first date that ran from dinner straight through to breakfast. We have been chasing that feeling — and finding it — ever since.',
      schedule: [
        { time: '17:00', title: 'Ceremony' },
        { time: '18:00', title: 'Champagne reception' },
        { time: '19:30', title: 'Dinner' },
        { time: '21:00', title: 'Dancing' },
      ],
    },
  },
  {
    slug: 'tuscan-terracotta',
    name: 'Tuscan Terracotta',
    tagline: 'Sun-warmed clay, sea, and paper.',
    description:
      'A terracotta digital wedding invitation with a sun-warmed Mediterranean palette and a barefoot-by-the-sea film. Made for destination weddings.',
    intro:
      'Tuscan Terracotta is warm and earthy — clay and ochre tones on a textured paper layout, with a film that walks barefoot at the water’s edge. It suits coastal and destination celebrations.',
    keywords: ['terracotta wedding invitation', 'destination wedding invite', 'mediterranean wedding invitation', 'tuscan wedding invitation'],
    paletteId: 'terracotta',
    headingFontId: 'cormorant-garamond',
    filmId: 'eternal',
    sample: {
      names: 'Giulia & Leo',
      dateISO: '2026-08-29',
      dateLabel: '29 August 2026',
      venueName: 'Borgo del Mare',
      venueAddress: 'Puglia, Italy',
      story:
        'We learned to cook together before we learned to live together. Come hungry — there will be far too much food, and that is the point.',
      schedule: [
        { time: '18:00', title: 'Ceremony by the sea' },
        { time: '19:00', title: 'Aperitivo' },
        { time: '20:30', title: 'Feast' },
        { time: '23:00', title: 'Music & stars' },
      ],
    },
  },
  {
    slug: 'parchment-sienna',
    name: 'Parchment & Sienna',
    tagline: 'Old-letter warmth, candlelit and written.',
    description:
      'A parchment-and-sienna digital wedding invitation with a candlelit, hand-written feel. Vintage warmth for intimate weddings.',
    intro:
      'Parchment & Sienna reads like a letter found in a drawer — aged paper tones, deep sienna ink, and a candlelit opening film. Intimate, nostalgic, and personal.',
    keywords: ['vintage wedding invitation', 'rustic wedding invite', 'parchment wedding invitation', 'intimate wedding invitation'],
    paletteId: 'parchment',
    headingFontId: 'cormorant-garamond',
    filmId: 'the-letter',
    sample: {
      names: 'Hannah & Jonah',
      dateISO: '2026-05-23',
      dateLabel: '23 May 2026',
      venueName: 'The Old Mill',
      venueAddress: 'Bruges, Belgium',
      story:
        'We wrote each other letters for a year before we ever lived in the same city. This invitation is, fittingly, just one more.',
      schedule: [
        { time: '15:30', title: 'Ceremony' },
        { time: '16:30', title: 'Tea & cake' },
        { time: '18:30', title: 'Supper by candlelight' },
        { time: '20:30', title: 'Toasts' },
      ],
    },
  },
  {
    slug: 'onyx-gold',
    name: 'Onyx & Gold',
    tagline: 'Black, gilt, and pure drama.',
    description:
      'A black-and-gold digital wedding invitation with a bold editorial layout and a vows-and-rings film. Striking, formal, unforgettable.',
    intro:
      'Onyx & Gold is the boldest of the collection — near-black paper, gilded gold type, and a close, intimate film of vows and rings. Made for black-tie evenings.',
    keywords: ['black and gold wedding invitation', 'black tie wedding invite', 'luxury wedding invitation', 'formal wedding invitation'],
    paletteId: 'onyx',
    headingFontId: 'fraunces-inter',
    filmId: 'the-rings',
    sample: {
      names: 'Naomi & Elias',
      dateISO: '2026-11-21',
      dateLabel: '21 November 2026',
      venueName: 'The Grand Hall',
      venueAddress: 'Vienna, Austria',
      story:
        'We do nothing by halves — and our wedding will be no exception. Black tie, big band, and a guest list of the people we love most.',
      schedule: [
        { time: '18:30', title: 'Ceremony' },
        { time: '19:30', title: 'Cocktails' },
        { time: '21:00', title: 'Dinner & dancing' },
        { time: '00:00', title: 'Midnight toast' },
      ],
    },
  },
  {
    slug: 'ivory-rose',
    name: 'Ivory & Rose',
    tagline: 'Pale ivory, dusty rose, weightless.',
    description:
      'A soft ivory-and-rose digital wedding invitation with an ethereal layout and a tender garden film. Delicate, airy, and modern.',
    intro:
      'Ivory & Rose is the lightest touch in the collection — pale ivory, dusty rose, and an airy ethereal layout with a gentle garden film. Understated and modern.',
    keywords: ['ivory wedding invitation', 'dusty rose wedding invite', 'minimal wedding invitation', 'soft wedding invitation'],
    paletteId: 'rose-veil',
    headingFontId: 'corinthia-cormorant',
    filmId: 'first-dance',
    sample: {
      names: 'Clara & Sam',
      dateISO: '2026-06-06',
      dateLabel: '6 June 2026',
      venueName: 'Rosewood Barn',
      venueAddress: 'Provence, France',
      story:
        'A long friendship that quietly became something more. We are still a little surprised, and entirely sure.',
      schedule: [
        { time: '15:00', title: 'Ceremony in the orchard' },
        { time: '16:00', title: 'Rosé & canapés' },
        { time: '18:00', title: 'Dinner' },
        { time: '20:00', title: 'Dancing' },
      ],
    },
  },
]

export const TEMPLATE_MAP: Record<string, Template> = Object.fromEntries(
  TEMPLATES.map((t) => [t.slug, t])
)

// Resolve a template's design ids into the full palette/font/film objects.
// Returns null if the slug is unknown OR any referenced id is missing (keeps
// renderers honest if a palette/font/film is ever removed).
export function resolveTemplate(slug: string): ResolvedTemplate | null {
  const t = TEMPLATE_MAP[slug]
  if (!t) return null
  const palette = PALETTE_MAP[t.paletteId]
  const font = HEADING_FONT_MAP[t.headingFontId]
  const film = VIDEO_PRESETS.find((p) => p.id === t.filmId)
  if (!palette || !font || !film) return null
  return { ...t, palette, font, film }
}

export const ALL_TEMPLATES_RESOLVED: ResolvedTemplate[] = TEMPLATES
  .map((t) => resolveTemplate(t.slug))
  .filter((t): t is ResolvedTemplate => t !== null)
