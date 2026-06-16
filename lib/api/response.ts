import { NextResponse } from 'next/server'

export const ok = <T>(data: T, status = 200) =>
  NextResponse.json(data, { status })

const err = (message: string, status: number) =>
  NextResponse.json({ error: message }, { status })

export const badRequest    = (message: string)      => err(message, 400)
export const unauthorized  = (message = 'unauthorized') => err(message, 401)
export const forbidden     = (message = 'forbidden')    => err(message, 403)
export const notFound      = (message = 'not_found')    => err(message, 404)
export const serverError   = (message = 'internal_server_error') => err(message, 500)
