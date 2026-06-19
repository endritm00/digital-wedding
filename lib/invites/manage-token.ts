import { createHash, randomUUID } from 'crypto'

// The couple's private RSVP-management capability token.
//
// The raw token is a v4 uuid (122 bits of entropy — not enumerable). We persist
// only its SHA-256 hash on `invites.manage_token_hash`; the raw value is shown
// once (email + creator's browser) and never stored. Lookups hash the incoming
// token and compare, so a database leak can't reconstruct a live link.

export function hashManageToken(token: string): string {
  return createHash('sha256').update(token.trim()).digest('hex')
}

/** Mint a fresh token + its hash. Store the hash; deliver the raw token. */
export function newManageToken(): { token: string; hash: string } {
  const token = randomUUID()
  return { token, hash: hashManageToken(token) }
}

/** Build the couple's private management URL from a raw token. */
export function manageUrl(token: string): string {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? ''
  return `${base}/manage/${token}`
}
