import { NextRequest } from 'next/server'
import { resolveInviteAccess } from '@/lib/invites/access'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import { badRequest, notFound, serverError } from '@/lib/api/response'
import { logger } from '@/lib/logger'

type Params = { params: Promise<{ id: string; inviteExtraId: string }> }

// DELETE /api/invites/:id/extras/:inviteExtraId
// inviteExtraId is the invite_extras.id (PK), not the extra catalog id.
export async function DELETE(request: NextRequest, { params }: Params) {
  const { id, inviteExtraId } = await params
  const result = await resolveInviteAccess(id, request.headers)
  if (!result.ok) return Response.json({ error: result.message }, { status: result.status })

  if (['published', 'archived'].includes(result.invite.status)) {
    return badRequest('invite_not_editable')
  }

  const db = result.via === 'claim_token' ? createServiceClient() : await createClient()

  const { error, count } = await db
    .from('invite_extras')
    .delete({ count: 'exact' })
    .eq('id', inviteExtraId)
    .eq('invite_id', id)

  if (error) {
    logger.error({ event: 'extra.delete.failed', invite_extra_id: inviteExtraId, error: error.message })
    return serverError()
  }
  if (count === 0) return notFound('invite_extra_not_found')

  return new Response(null, { status: 204 })
}
