import { NextRequest } from 'next/server'
import { z } from 'zod'
import { createServiceClient } from '@/lib/supabase/service'
import { limiters, rateLimitedResponse } from '@/lib/rate-limit'
import { ok, badRequest, serverError } from '@/lib/api/response'
import { logger } from '@/lib/logger'

const RsvpSchema = z.object({
  name:        z.string().min(1).max(200).trim(),
  attending:   z.boolean(),
  guest_count: z.number().int().min(0).max(20).default(1),
  // email and dietary_notes accepted but stored as null until Phase 7 (KMS encryption).
  // Including them now so the guest form contract is stable.
  email:          z.string().email().optional(),
  dietary_notes:  z.string().max(500).optional(),
})

type Params = { params: Promise<{ slug: string }> }

// POST /api/snapshots/:slug/rsvp
// Public — no auth. Rate-limited per (slug, IP).
// Delegates to the submit_rsvp SECURITY DEFINER RPC which validates
// that the invite exists and is published before inserting.
export async function POST(request: NextRequest, { params }: Params) {
  const { slug } = await params

  // Derive client IP — Cloudflare sets x-forwarded-for to the real IP
  const ip       = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const limitKey = `rsvp:${slug}:${ip}`
  const limit    = await limiters.rsvp(limitKey)

  if (!limit.allowed) return rateLimitedResponse(limit)

  let body: unknown
  try { body = await request.json() } catch { return badRequest('invalid_json') }

  const parsed = RsvpSchema.safeParse(body)
  if (!parsed.success) return badRequest(parsed.error.issues[0].message)

  const { name, attending, guest_count } = parsed.data
  // email + dietary_notes are silently dropped until Phase 7 adds KMS encryption.
  // The columns (email_enc, dietary_notes_enc) remain null.

  const service = createServiceClient()
  const { data, error } = await service.rpc('submit_rsvp', {
    p_slug:        slug,
    p_name:        name,
    p_attending:   attending,
    p_guest_count: guest_count,
    // PII columns: null until Phase 7
    p_email_enc:         null,
    p_dietary_notes_enc: null,
    p_key_id:            null,
  })

  if (error) {
    if (error.message.includes('invite_not_found_or_not_published')) {
      return badRequest('invite_not_found')
    }
    logger.error({ event: 'rsvp.submit.failed', slug, error: error.message })
    return serverError()
  }

  logger.info({ event: 'rsvp.submitted', slug, attending, guest_count })

  return ok({ rsvp_id: data }, 201)
}
