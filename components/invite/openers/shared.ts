// Shared types + helpers for the invitation "openers" — the reveal mechanism a
// guest interacts with before the invitation itself appears. Each opener is a
// full-screen, themable animation (wax letter, iron gates, lifting veil…).

export interface OpenerTheme {
  accent: string                  // wax / gold / rose-gold — the metal of the moment
  paper: string                   // surface colour (envelope body, gate backdrop, veil tint)
  flap: string                    // a slightly deeper paper (flap, pillar, fold)
  ink: string                     // text colour
  font: string                    // heading font-family (var)
  fontStyle: 'normal' | 'italic'
  dark: boolean                   // dark surface → light-on-dark text
}

export interface OpenerProps {
  theme: OpenerTheme
  names: string
  onOpen: () => void
  /** The invitation's film — revealed behind the opener as it's dragged open. */
  videoSrc?: string | null
  poster?: string | null
  /** How the film is framed — matches OpeningHero so it doesn't reframe at handoff. */
  videoFit?: 'auto' | 'blend' | 'crop'
  videoFocal?: { x: number; y: number } | null
  /** When true, the opener auto-plays its reveal on mount (used for in-card previews). */
  autoPlay?: boolean
}

function expand(hex: string): string {
  const h = hex.replace('#', '')
  return h.length === 3 ? h.split('').map((c) => c + c).join('') : h
}

export function hexA(hex: string, a: number): string {
  const h = expand(hex)
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

export function shade(hex: string, amt: number): string {
  // amt > 0 darkens, amt < 0 lightens
  const h = expand(hex)
  const f = (i: number) => {
    const v = parseInt(h.slice(i, i + 2), 16)
    const out = amt >= 0 ? v * (1 - amt) : v + (255 - v) * -amt
    return Math.max(0, Math.min(255, Math.round(out)))
  }
  return `rgb(${f(0)}, ${f(2)}, ${f(4)})`
}

// "Aria & Luca" → ["A","L"]; "Aria" → ["A"]
export function initials(names: string): string[] {
  return names
    .split(/&|\band\b|\+/i)
    .map(s => s.trim()[0])
    .filter(Boolean)
    .map(c => c.toUpperCase())
    .slice(0, 2)
}

// "abc & def" / "abc + def" / "abc and def" → { name_a: "Abc", name_b: "Def" }
// Splits on the same separators as initials() and capitalises each name's first
// letter (the rest is left as typed, so "McKay" / "DeLuca" survive). A single
// name with no separator becomes name_a with an empty name_b.
export function parseCoupleNames(input: string): { name_a: string; name_b: string } {
  const cap = (s: string) => {
    const t = s.trim()
    return t ? t.charAt(0).toUpperCase() + t.slice(1) : ''
  }
  const parts = input.split(/&|\band\b|\+/i).map(cap).filter(Boolean)
  return { name_a: parts[0] ?? '', name_b: parts[1] ?? '' }
}
