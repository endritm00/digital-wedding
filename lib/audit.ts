import { createServiceClient } from './supabase/service'
import { logger }              from './logger'

type AuditAction =
  | 'invite.created'
  | 'invite.updated'
  | 'invite.published'
  | 'invite.claimed'
  | 'order.created'
  | 'order.paid'
  | 'rsvp.submitted'
  | 'media.uploaded'
  | 'section.reordered'
  | 'user.role_changed'

// Fire-and-forget audit write — never await in a request handler.
// Failure is logged but never surfaced to the caller.
export function audit(params: {
  action:     AuditAction
  actor_id?:  string | null
  entity:     string
  entity_id?: string | null
  metadata?:  Record<string, unknown>
}): void {
  createServiceClient()
    .from('audit_log')
    .insert({
      action:    params.action,
      actor_id:  params.actor_id  ?? null,
      entity:    params.entity,
      entity_id: params.entity_id ?? null,
      metadata:  params.metadata  ?? {},
    })
    .then(({ error }) => {
      if (error) {
        logger.error({ event: 'audit.write.failed', action: params.action, error: error.message })
      }
    })
}
