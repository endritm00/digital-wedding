import type { MetadataRoute } from 'next'
import { TEMPLATES } from '@/lib/templates/templates'

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://digitalinvite.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE}/themes`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...TEMPLATES.map((t) => ({
      url: `${BASE}/themes/${t.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
