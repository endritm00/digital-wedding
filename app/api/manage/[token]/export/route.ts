import { NextRequest } from 'next/server'
import * as XLSX from 'xlsx'
import { createServiceClient } from '@/lib/supabase/service'
import { hashManageToken } from '@/lib/invites/manage-token'
import { forbidden, serverError } from '@/lib/api/response'

type Params = { params: Promise<{ token: string }> }

// GET /api/manage/:token/export
// Downloads the guest list as .xlsx. Capability-gated by the token.
// The page fetches this with the token in the PATH and triggers the download
// from a blob, so the token never lands in a query string.
export async function GET(_req: NextRequest, { params }: Params) {
  const { token } = await params

  const service = createServiceClient()

  const { data: invite, error } = await service
    .from('invites')
    .select('id, display_title')
    .eq('manage_token_hash', hashManageToken(token))
    .maybeSingle()

  if (error) return serverError()
  if (!invite) return forbidden()

  const { data: rsvps, error: rErr } = await service
    .from('rsvps')
    .select('name, attending, guest_count, created_at')
    .eq('invite_id', invite.id)
    .order('created_at', { ascending: false })

  if (rErr) return serverError()

  const rows = (rsvps ?? []).map((r) => ({
    Name: r.name,
    Attending: r.attending ? 'Yes' : 'No',
    'Guest Count': r.guest_count,
    'Submitted At': new Date(r.created_at).toISOString().replace('T', ' ').slice(0, 19),
  }))

  const ws = XLSX.utils.json_to_sheet(rows)
  ws['!cols'] = [{ wch: 30 }, { wch: 12 }, { wch: 14 }, { wch: 22 }]
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'RSVPs')
  const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' }) as Buffer

  const title = (invite.display_title ?? 'guests').replace(/[^a-z0-9]/gi, '-').toLowerCase()
  const filename = `rsvps-${title}.xlsx`

  return new Response(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': String(buffer.byteLength),
    },
  })
}
