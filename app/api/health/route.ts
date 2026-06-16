import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { logger } from '@/lib/logger'

export async function GET() {
  const start = Date.now()

  try {
    const supabase = await createClient()
    // Lightweight DB probe — reads one row from a public catalog table.
    const { error } = await supabase.from('plans').select('id').limit(1)
    if (error) throw error

    const db_ms = Date.now() - start
    logger.info({ event: 'health_check', db_ms })

    return NextResponse.json({ status: 'ok', db_ms })
  } catch (err) {
    logger.error({ event: 'health_check_failed', error: String(err) })
    return NextResponse.json({ status: 'error' }, { status: 503 })
  }
}
