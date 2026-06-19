// Real FULL-HD wedding film presets.
//
// Assets are mirrored into our own Supabase Storage bucket "preset-media"
// via scripts/mirror-presets.mjs so we are NOT dependent on Pexels CDN.
// Pexels source URLs are preserved below as provenance comments only.
//
// Public URL pattern (after running the mirror script):
//   Film  : {SUPABASE_URL}/storage/v1/object/public/preset-media/presets/<id>/film.mp4
//   Poster: {SUPABASE_URL}/storage/v1/object/public/preset-media/presets/<id>/poster.jpg
//
// Every consumer degrades gracefully: posterImg paints instantly, then the
// gradient `poster` is the final fallback if both image and video fail.

export interface VideoPreset {
  id: string
  name: string
  mood: string
  src: string          // 1080p H.264 mp4 (full HD, lightweight)
  posterImg: string    // real still frame — paints before the video loads
  poster: { from: string; to: string } // gradient fallback (no network)
  ink: string
}

// ── Supabase Storage public base URL ────────────────────────────────────────
// This is the stable, self-owned CDN. Run scripts/mirror-presets.mjs once to
// populate the bucket. Preset ids must stay stable (existing drafts reference them).
const SUPABASE_URL = 'https://gngoqwenvnhyfbkkszfl.supabase.co'
const presetFilm   = (id: string) =>
  `${SUPABASE_URL}/storage/v1/object/public/preset-media/presets/${id}/film.mp4`
const presetPoster = (id: string) =>
  `${SUPABASE_URL}/storage/v1/object/public/preset-media/presets/${id}/poster.jpg`

// ── Pexels provenance (original sources — kept for attribution + re-download) ─
// const pexelsVideo = (id: string, file: string) =>
//   `https://videos.pexels.com/video-files/${id}/${file}`
// const pexelsPoster = (id: string) =>
//   `https://images.pexels.com/videos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1280`
// const pexelsPreview = (id: string) =>
//   `https://images.pexels.com/videos/${id}/pictures/preview-0.jpg`
// const pexelsPreviewJpeg = (id: string) =>
//   `https://images.pexels.com/videos/${id}/pictures/preview-0.jpeg`
//
// golden-hour  film: pexelsVideo('33113979', '14114596_1920_1080_25fps.mp4')
//              poster: pexelsPreview('33113979')
// first-dance  film: pexelsVideo('8775886', '8775886-hd_1920_1080_25fps.mp4')
//              poster: pexelsPoster('8775886')
// the-vows     film: pexelsVideo('27979648', '12279941_1920_1080_25fps.mp4')
//              poster: pexelsPreview('27979648')
// the-rings    film: pexelsVideo('8776123', '8776123-hd_1920_1080_25fps.mp4')
//              poster: pexelsPoster('8776123')
// open-air     film: pexelsVideo('11038003', '11038003-hd_2560_1440_24fps.mp4')
//              poster: pexelsPreviewJpeg('11038003')
// eternal      film: pexelsVideo('13038199', '13038199-hd_1920_1080_25fps.mp4')
//              poster: pexelsPreviewJpeg('13038199')
// the-letter   film: pexelsVideo('7343467', '7343467-hd_1920_1080_25fps.mp4')
//              poster: pexelsPoster('7343467')
// the-veil     film: pexelsVideo('8442722', '8442722-hd_1920_1080_30fps.mp4')
//              poster: pexelsPreviewJpeg('8442722')

export const VIDEO_PRESETS: VideoPreset[] = [
  {
    // id kept stable for existing drafts; content is now a lush floral ceremony
    // arch (no faces) — same elegant, bloom-forward style as The Vows.
    id: 'golden-hour',
    name: 'In Bloom',
    mood: 'An arch of flowers',
    src: presetFilm('golden-hour'),
    posterImg: presetPoster('golden-hour'),
    poster: { from: '#E7D8DC', to: '#B9A7A0' },
    ink: '#FDFCF9',
  },
  {
    id: 'first-dance',
    name: 'First Dance',
    mood: 'Held close, swaying',
    src: presetFilm('first-dance'),
    posterImg: presetPoster('first-dance'),
    poster: { from: '#E2D2BE', to: '#A98C66' },
    ink: '#FDFCF9',
  },
  {
    // now an empty white-flower ceremony aisle (no faces)
    id: 'the-vows',
    name: 'The Vows',
    mood: 'An aisle in bloom',
    src: presetFilm('the-vows'),
    posterImg: presetPoster('the-vows'),
    poster: { from: '#EAF0EE', to: '#C2D0CB' },
    ink: '#FDFCF9',
  },
  {
    id: 'the-rings',
    name: 'The Rings',
    mood: 'Vows and promises',
    src: presetFilm('the-rings'),
    posterImg: presetPoster('the-rings'),
    poster: { from: '#1E1A16', to: '#3A2E22' },
    ink: '#FDFCF9',
  },
  {
    // now an aerial of an outdoor wedding venue at golden dusk (no faces)
    id: 'open-air',
    name: 'Open Air',
    mood: 'The venue, from above',
    src: presetFilm('open-air'),
    posterImg: presetPoster('open-air'),
    poster: { from: '#4A5142', to: '#23291F' },
    ink: '#FDFCF9',
  },
  {
    // now a grand, flower-dressed wedding stage / setting (no faces)
    id: 'eternal',
    name: 'Eternal',
    mood: 'A stage in bloom',
    src: presetFilm('eternal'),
    posterImg: presetPoster('eternal'),
    poster: { from: '#E8D2B8', to: '#B98E6A' },
    ink: '#FDFCF9',
  },
  // ── Signature openers (paired with the three signature aesthetics) ──────────
  {
    id: 'the-letter',
    name: 'The Letter',
    mood: 'Candlelit, intimate, written',
    src: presetFilm('the-letter'),
    posterImg: presetPoster('the-letter'),
    poster: { from: '#F5EDD8', to: '#8B4A2A' },
    ink: '#2A1F12',
  },
  {
    // now an aerial of an elegant outdoor reception, tables set (no faces).
    // id kept stable; the lifting-veil opener still uses this as its backdrop film.
    id: 'the-veil',
    name: 'The Reception',
    mood: 'Tables set under the sky',
    src: presetFilm('the-veil'),
    posterImg: presetPoster('the-veil'),
    poster: { from: '#46503C', to: '#22271C' },
    ink: '#FDFCF9',
  },
]

export interface MusicTrack {
  id: string
  title: string
  mood: string
  duration: string
  src: string
}

export const MUSIC_TRACKS: MusicTrack[] = [
  { id: 'aisle',      title: 'Down the aisle',   mood: 'Tender',   duration: '2:41', src: 'https://cdn.pixabay.com/audio/2022/10/25/audio_946bc8f1a2.mp3' },
  { id: 'vows',       title: 'The vows',         mood: 'Intimate', duration: '3:05', src: 'https://cdn.pixabay.com/audio/2022/03/10/audio_5ad6e6fe69.mp3' },
  { id: 'first-look', title: 'First look',       mood: 'Hopeful',  duration: '2:18', src: 'https://cdn.pixabay.com/audio/2021/11/25/audio_91b32e02f9.mp3' },
  { id: 'evening',    title: 'Into the evening', mood: 'Warm',     duration: '3:24', src: 'https://cdn.pixabay.com/audio/2022/08/02/audio_884fe92c21.mp3' },
  { id: 'lanterns',   title: 'Paper lanterns',   mood: 'Quiet joy', duration: '2:52', src: 'https://cdn.pixabay.com/audio/2022/02/22/audio_d1718ab41b.mp3' },
]

// Content blocks the buyer can enable. 'opening' is managed implicitly by the
// video/music steps and never appears in this list.
export interface SectionDef {
  type: string
  label: string
  blurb: string
}

export const CONTENT_SECTIONS: SectionDef[] = [
  { type: 'story',      label: 'Your story',   blurb: 'How you met, in your own words.' },
  { type: 'schedule',   label: 'The day',      blurb: 'Ceremony, dinner, dancing — when things happen.' },
  { type: 'venue',      label: 'The venue',    blurb: 'Where to be, with the address.' },
  { type: 'gallery',    label: 'Photos',       blurb: 'A few favourite pictures of you two.' },
  { type: 'travel',     label: 'Getting there', blurb: 'Travel and hotel tips for guests from afar.' },
  { type: 'gifts',      label: 'Gifts',        blurb: 'A gentle note about gifts or contributions.' },
  { type: 'dress_code', label: 'What to wear', blurb: 'Help guests dress for the occasion.' },
  { type: 'faq',        label: 'Questions',    blurb: 'Parking, children, dietary needs — the practical bits.' },
]

export const SECTION_LABELS: Record<string, string> = Object.fromEntries(
  CONTENT_SECTIONS.map((s) => [s.type, s.label])
)

// ── Customization: palettes ─────────────────────────────────────────────────
// Each palette drives the invitation's colour system. `accent` is the gold/ink
// used for headings and ornaments; `paper` is the card/background base; `ink`
// is body text; `wash`/`washAlt` alternate section backgrounds on the public page.

// Each palette belongs to a LAYOUT FAMILY that gives its public invitation a
// distinct structure (alignment, framing, dividers, rhythm) so themes feel unique.
export type LayoutFamily = 'classic' | 'editorial' | 'paper' | 'ethereal'

export interface Palette {
  id: string
  name: string
  accent: string
  accentSoft: string   // translucent accent for chips/borders
  paper: string        // card background
  ink: string          // primary text
  wash: string         // section bg A
  washAlt: string      // section bg B
  swatch: [string, string, string] // for the picker chip
  dark?: boolean       // dark paper → light-on-dark treatment
  layout: LayoutFamily // how the public invitation sections are arranged
}

export const PALETTES: Palette[] = [
  {
    id: 'ivory-gold', name: 'Ivory & Gold',
    accent: '#A8854B', accentSoft: 'rgba(168,133,75,0.14)',
    paper: '#FDFCF9', ink: '#1A1816', wash: '#FAF4EB', washAlt: '#F4EFE5',
    swatch: ['#FAF4EB', '#A8854B', '#1A1816'],
    layout: 'classic',
  },
  {
    id: 'blush', name: 'Blush Romance',
    accent: '#B07A6E', accentSoft: 'rgba(176,122,110,0.14)',
    paper: '#FFFAF8', ink: '#3A2A28', wash: '#FBEFEA', washAlt: '#F6E4DD',
    swatch: ['#FBEFEA', '#B07A6E', '#3A2A28'],
    layout: 'classic',
  },
  {
    id: 'sage', name: 'Sage Garden',
    accent: '#7C8B6B', accentSoft: 'rgba(124,139,107,0.16)',
    paper: '#FBFCF8', ink: '#2A2E24', wash: '#F1F4EA', washAlt: '#E7ECDC',
    swatch: ['#F1F4EA', '#7C8B6B', '#2A2E24'],
    layout: 'ethereal',
  },
  {
    id: 'midnight', name: 'Midnight & Pearl',
    accent: '#C2A878', accentSoft: 'rgba(194,168,120,0.18)',
    paper: '#1E2530', ink: '#ECEAE3', wash: '#222B38', washAlt: '#1A222E',
    swatch: ['#222B38', '#C2A878', '#ECEAE3'], dark: true,
    layout: 'editorial',
  },
  {
    id: 'terracotta', name: 'Tuscan Terracotta',
    accent: '#B5683C', accentSoft: 'rgba(181,104,60,0.15)',
    paper: '#FFF8F2', ink: '#3C281D', wash: '#FBEBDD', washAlt: '#F5DEC9',
    swatch: ['#FBEBDD', '#B5683C', '#3C281D'],
    layout: 'paper',
  },
  // ── Additional palettes ─────────────────────────────────────────────────────
  {
    id: 'parchment', name: 'Parchment & Sienna',
    accent: '#8B4A2A', accentSoft: 'rgba(139,74,42,0.13)',
    paper: '#F5EDD8', ink: '#2A1F12', wash: '#F5EDD8', washAlt: '#EFE4CC',
    swatch: ['#F5EDD8', '#8B4A2A', '#2A1F12'],
    layout: 'paper',
  },
  {
    id: 'onyx', name: 'Onyx & Gold',
    accent: '#C9A84C', accentSoft: 'rgba(201,168,76,0.16)',
    paper: '#2C2C2C', ink: '#F2EEE8', wash: '#2C2C2C', washAlt: '#242424',
    swatch: ['#2C2C2C', '#C9A84C', '#F2EEE8'], dark: true,
    layout: 'editorial',
  },
  {
    id: 'rose-veil', name: 'Ivory & Rose',
    accent: '#C4927A', accentSoft: 'rgba(196,146,122,0.14)',
    paper: '#FAF7F2', ink: '#6B5B52', wash: '#FAF7F2', washAlt: '#F2EBE3',
    swatch: ['#FAF7F2', '#C4927A', '#6B5B52'],
    layout: 'ethereal',
  },
]

export const PALETTE_MAP: Record<string, Palette> = Object.fromEntries(
  PALETTES.map((p) => [p.id, p])
)
export const DEFAULT_PALETTE = PALETTES[0]

// ── Customization: heading fonts ────────────────────────────────────────────
// `var` is the CSS variable (loaded in app/layout.tsx). Body copy stays Inter.

export interface HeadingFont {
  id: string
  name: string
  var: string      // CSS font-family value
  sample: string   // shown in the picker
  scale: number    // size multiplier (scripts read large; serifs read smaller)
  italic?: boolean // render headings in italic (e.g. Cormorant for The Letter)
}

export const HEADING_FONTS: HeadingFont[] = [
  { id: 'pinyon',           name: 'Pinyon',      var: 'var(--font-pinyon)',      sample: 'Forever', scale: 1.15 },
  { id: 'great-vibes',      name: 'Great Vibes', var: 'var(--font-great-vibes)', sample: 'Forever', scale: 1.1 },
  { id: 'cormorant',        name: 'Cormorant',   var: 'var(--font-cormorant)',   sample: 'Forever', scale: 0.82 },
  { id: 'cormorant-italic', name: 'Cormorant Italic', var: 'var(--font-cormorant)', sample: 'Forever', scale: 0.84, italic: true },
]

export const HEADING_FONT_MAP: Record<string, HeadingFont> = Object.fromEntries(
  HEADING_FONTS.map((f) => [f.id, f])
)
export const DEFAULT_HEADING_FONT = HEADING_FONTS[0]
