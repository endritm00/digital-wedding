import type { CSSProperties } from 'react'

// Universal, theme- and video-agnostic legibility for the "names" card.
//
// The old card was a near-opaque panel (paper at ~0.93 + a hard border + heavy
// blur). It read fine but HID the film — worst on small screens where the panel
// fills most of the frame. We want the opposite: the film stays visible and the
// card feels transparent, while the names stay crisp over ANY frame, bright or
// dark, on ANY theme.
//
// Two pieces do that, and both adapt to the theme automatically:
//
//   1. A FEATHERED GLASS layer (sits behind the text, never on top of it): a
//      radial wash that is densest right behind the text and dissolves to nothing
//      at the edges — plus a matching mask so the backdrop-blur itself feathers
//      out. No rectangle, no hard border: it melts into the video. The wash tone
//      follows the paper — LIGHT themes get a light wash (lifts dark text off a
//      dark frame; bright frames already suit dark text), DARK themes get a dark
//      wash (drops a bright frame behind light text; dark frames already suit it).
//
//   2. A TEXT HALO (text-shadow) the same luminance as the wash, so even at the
//      feathered edge where the glass is almost gone, the letters keep a soft
//      contrast ring against the film. This is what makes it survive any video.

export interface LegibilityInput {
  /** Theme paper colour (#RRGGBB) — only its tone matters here. */
  paper: string
  /** True for dark-paper themes (light-on-dark text). */
  dark: boolean
}

export interface CardLegibility {
  /** Style for an absolutely-positioned layer placed *behind* the card text. */
  glass: CSSProperties
  /** text-shadow value to apply to the headline + supporting lines. */
  textShadow: string
}

export function cardLegibility({ dark }: LegibilityInput): CardLegibility {
  // Wash tone: warm near-black for dark themes, warm near-white for light themes.
  const tone = dark ? '16, 12, 9' : '253, 251, 247'
  // Center opacity guarantees the read; edges fall to ~0 so the film shows through.
  // Light themes need a denser core — accent-coloured names + a white halo wash out
  // over a bright film otherwise (the caption lines were nearly invisible).
  const c0 = dark ? 0.52 : 0.62
  const c1 = dark ? 0.36 : 0.45
  const wash = `radial-gradient(125% 115% at 50% 42%, rgba(${tone}, ${c0}) 0%, rgba(${tone}, ${c1}) 46%, rgba(${tone}, 0.07) 78%, rgba(${tone}, 0) 100%)`
  // The mask feathers the glass *box* (incl. its backdrop-blur) to nothing, so
  // there is no visible rectangular edge — the solid core stays well inside the
  // padding so text is never clipped.
  const feather = 'radial-gradient(125% 115% at 50% 42%, #000 62%, transparent 100%)'

  return {
    glass: {
      background: wash,
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      maskImage: feather,
      WebkitMaskImage: feather,
      borderRadius: 28,
    },
    textShadow: dark
      ? '0 1px 2px rgba(0, 0, 0, 0.62), 0 2px 18px rgba(0, 0, 0, 0.5)'
      : '0 1px 2px rgba(253, 251, 247, 0.9), 0 2px 16px rgba(253, 251, 247, 0.62)',
  }
}
