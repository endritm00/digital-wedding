// Build a fully-filled sample invitation (the exact shapes InvitationView wants)
// from a ResolvedTemplate, so the /themes detail page can render the REAL invite
// renderer instead of a parallel marketing mock. This is what guarantees the
// theme preview and the published product stay identical.
//
// Story / schedule / venue come from the template's own sample; gifts / dress /
// FAQ / gallery note read the same across themes, so they live here as shared
// defaults (a template may still override any of them via TemplateSample).

import type { Section, MediaAsset } from '@/lib/builder/api'
import type { InvitationViewInvite } from '@/components/invite/invitation-view'
import type { HeroLayout } from '@/lib/builder/presets'
import { SAMPLE_GALLERY, type ResolvedTemplate } from '@/lib/templates/templates'

const DEFAULT_GIFTS =
  'Your presence is the only gift we ask for. But for those who have asked, a contribution toward our first home and the long honeymoon that follows would mean the world.'

const DEFAULT_DRESS = {
  code: 'Formal — garden elegant',
  notes: 'Think summer suits and long dresses in soft tones. The ceremony is on grass, so heels may prefer a block.',
}

const DEFAULT_FAQ: { q: string; a: string }[] = [
  { q: 'Can I bring a plus-one?', a: 'We have kept the day intimate — if your invitation includes a guest, it will say so on your RSVP.' },
  { q: 'Are children welcome?', a: 'We adore your little ones, but this will be a grown-ups’ evening so you can relax and celebrate with us.' },
  { q: 'Is there parking at the venue?', a: 'Yes — there is free parking on site, and taxis can drop right at the entrance.' },
  { q: 'What time should I arrive?', a: 'Please aim to be seated 15 minutes before the ceremony so we can begin right on time.' },
]

const DEFAULT_GALLERY_NOTE = 'A few of our favourite places — the ones that made us, us.'

// "Eleanor & Thomas" → ["Eleanor", "Thomas"]
function splitNames(names: string): [string, string] {
  const parts = names.split(/\s*&\s*/)
  return [(parts[0] ?? '').trim(), (parts[1] ?? '').trim()]
}

export interface SampleInvite {
  invite: InvitationViewInvite
  sections: Section[]
  media: MediaAsset[]
}

export function buildSampleInvite(
  t: ResolvedTemplate,
  opts?: { heroLayout?: HeroLayout },
): SampleInvite {
  const s = t.sample
  const [nameA, nameB] = splitNames(s.names)

  const invite: InvitationViewInvite = {
    display_title: s.names,
    event_date: s.dateISO,
    venue_name: s.venueName,
    venue_address: s.venueAddress,
  }

  // Order here = the order guests scroll through (opening is pulled out by the
  // renderer; countdown + RSVP + footer are appended automatically).
  const sections: Section[] = [
    {
      id: 'sample-opening',
      type: 'opening',
      position: 0,
      config: {
        name_a: nameA,
        name_b: nameB,
        palette: t.paletteId,
        heading_font: t.headingFontId,
        video_preset: t.filmId,
        opener: 'wax-letter',
        hero_layout: opts?.heroLayout ?? 'open',
        families_note: 'You are invited to the wedding of',
      },
    },
    { id: 'sample-story', type: 'story', position: 1, config: { text: s.story } },
    {
      id: 'sample-schedule',
      type: 'schedule',
      position: 2,
      config: { events: s.schedule.map((row) => ({ label: row.title, time: row.time })) },
    },
    {
      id: 'sample-venue',
      type: 'venue',
      position: 3,
      config: { name: s.venueName, address: s.venueAddress },
    },
    { id: 'sample-gallery', type: 'gallery', position: 4, config: { note: s.galleryNote ?? DEFAULT_GALLERY_NOTE } },
    { id: 'sample-gifts', type: 'gifts', position: 5, config: { content: s.gifts ?? DEFAULT_GIFTS } },
    {
      id: 'sample-dress',
      type: 'dress_code',
      position: 6,
      config: s.dressCode ?? DEFAULT_DRESS,
    },
    { id: 'sample-faq', type: 'faq', position: 7, config: { questions: s.faq ?? DEFAULT_FAQ } },
  ]

  const media: MediaAsset[] = SAMPLE_GALLERY.map((url, i) => ({
    id: `sample-photo-${i}`,
    kind: 'gallery_image',
    status: 'ready',
    variants: { url, medium: url, thumb: url },
    bytes: null,
    duration_ms: null,
    mime: 'image/jpeg',
  }))

  return { invite, sections, media }
}
