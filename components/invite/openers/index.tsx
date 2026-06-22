'use client'

import { OpenerProps } from './shared'
import { VideoEnvelopeOpener } from './video-envelope'

export type { OpenerTheme, OpenerProps } from './shared'

// The selectable reveal mechanism. The wax-sealed envelope is a filmed clip
// (hosted on Mux) the guest taps to open. `id` persists to the invite's opening
// config under `opener`.
export interface OpenerDef {
  id: string
  name: string
  blurb: string
  motif: 'letter'   // small icon for the picker card
}

export const OPENERS: OpenerDef[] = [
  { id: 'wax-letter', name: 'The Letter', blurb: 'A wax-sealed envelope — tap to open it.', motif: 'letter' },
]

export const OPENER_MAP: Record<string, OpenerDef> = Object.fromEntries(OPENERS.map(o => [o.id, o]))
export const DEFAULT_OPENER = OPENERS[0]

export function InviteOpener(props: OpenerProps & { id: string }) {
  // Single opener today; `id` is retained in config for forward-compatibility
  // and simply ignored by the component.
  return <VideoEnvelopeOpener {...props} />
}
