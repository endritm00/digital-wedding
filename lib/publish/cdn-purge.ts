import { logger } from '@/lib/logger'

// Purges Cloudflare cache for the given URLs.
// Fire-and-forget safe — callers should .catch() so a purge failure
// never blocks a publish from completing.
// No-ops gracefully when env vars are absent (local dev).
export async function purgeCloudflareCache(urls: string[]): Promise<void> {
  const zoneId = process.env.CLOUDFLARE_ZONE_ID
  const token  = process.env.CLOUDFLARE_API_TOKEN

  if (!zoneId || !token) {
    logger.info({ event: 'cdn_purge.skipped_not_configured', urls })
    return
  }

  const res = await fetch(
    `https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`,
    {
      method:  'POST',
      headers: {
        Authorization:  `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ files: urls }),
    }
  )

  if (!res.ok) {
    const body = await res.text()
    logger.error({ event: 'cdn_purge.failed', urls, status: res.status, body })
    return
  }

  logger.info({ event: 'cdn_purge.success', urls })
}
