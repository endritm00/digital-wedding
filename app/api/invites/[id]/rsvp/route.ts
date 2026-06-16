import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await req.json() as { name?: string; email?: string; attendance?: string; message?: string }

  if (!body.name || !body.email || !body.attendance) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // TODO: persist to Supabase via submit_rsvp RPC once DB is configured
  console.log(`RSVP received for invite ${id}:`, { name: body.name, attendance: body.attendance })

  return NextResponse.json({ success: true })
}
