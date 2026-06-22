'use client'

import { OpenerProps } from './shared'
import { EnvelopeOpener, VeilOpener } from './interactive'

export type { OpenerTheme, OpenerProps } from './shared'

// The selectable reveal mechanisms — realistic, INTERACTIVE objects you open to
// reveal the invitation's theme film behind them. `id` persists to the invite's
// opening config under `opener`.
export interface OpenerDef {
  id: string
  name: string
  blurb: string
  motif: 'letter'   // small icon for the picker card
}

export const OPENERS: OpenerDef[] = [
  { id: 'wax-letter', name: 'The Letter', blurb: 'A wax-sealed envelope — press the seal to open it.', motif: 'letter' },
]

export const OPENER_MAP: Record<string, OpenerDef> = Object.fromEntries(OPENERS.map(o => [o.id, o]))
export const DEFAULT_OPENER = OPENERS[0]

export function InviteOpener({ id, ...props }: OpenerProps & { id: string }) {
  switch (id) {
    case 'lifting-veil': return <VeilOpener {...props} />
    case 'wax-letter':
    default:            return <EnvelopeOpener {...props} />
  }
}
