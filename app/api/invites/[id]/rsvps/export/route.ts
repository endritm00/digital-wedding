import { NextRequest } from 'next/server'
import * as XLSX from 'xlsx'
import { resolveInviteAccess } from '@/lib/invites/access'
import { createServiceClient } from '@/lib/supabase/service'
import { serverError } from '@/lib/api/response'

type Params = { params: Promise<{ id: string }> }

// GET /api/invites/:id/rsvps/export
// Downloads the full guest list as an .xlsx file.
// Columns: Name, Attending, Guest Count, Submitted At
// Email + Dietary Notes columns will be added in Phase 7 once KMS decryption is wired up.
export async function GET(request: NextRequest, { params }: Params) {
  const { id } = await params
  const result = await resolveInviteAccess(id, request.headers)
  if (!result.ok) return Response.json({ error: result.message }, { status: result.status })

  if (result.via === 'claim_token') {
    return Response.json({ error: 'forbidden' }, { status: 403 })
  }

  const service = createServiceClient()
  const { data: rsvps, error } = await service
    .from('rsvps')
    .select('name, attending, guest_count, created_at')
    .eq('invite_id', id)
    .order('created_at', { ascending: false })

  if (error) return serverError()

  const rows = (rsvps ?? []).map((r) => ({
    Name:          r.name,
    Attending:     r.attending ? 'Yes' : 'No',
    'Guest Count': r.guest_count,
    'Submitted At': new Date(r.created_at).toISOString().replace('T', ' ').slice(0, 19),
  }))

  // Build workbook
  const ws = XLSX.utils.json_to_sheet(rows)

  // Column widths
  ws['!cols'] = [
    { wch: 30 },  // Name
    { wch: 12 },  // Attending
    { wch: 14 },  // Guest Count
    { wch: 22 },  // Submitted At
  ]

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'RSVPs')

  const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' }) as Buffer

  const inviteTitle = (result.invite.display_title ?? id).replace(/[^a-z0-9]/gi, '-').toLowerCase()
  const filename    = `rsvps-${inviteTitle}.xlsx`

  return new Response(buffer, {
    headers: {
      'Content-Type':        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length':      String(buffer.byteLength),
    },
  })
}
