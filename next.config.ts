import type { NextConfig } from 'next'

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control',    value: 'on' },
  // 2-year HSTS; preload requires submission to browsers' preload lists
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options',           value: 'DENY' },
  { key: 'X-Content-Type-Options',    value: 'nosniff' },
  { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // unsafe-eval needed by Next.js dev server; unsafe-inline for RSC inline scripts
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://image.mux.com https://*.supabase.co https://*.supabase.in https://images.unsplash.com https://images.pexels.com",
      // Preset films are now served from Supabase Storage (preset-media bucket).
      // videos.pexels.com removed — no longer referenced by presets.ts.
      // *.mux.com covers stream.mux.com AND the region edge hosts (*.edgemv.mux.com)
      // the HLS manifest points segments at — needed for Safari native HLS playback.
      "media-src 'self' blob: https://stream.mux.com https://*.mux.com https://*.supabase.co https://*.supabase.in",
      // *.mux.com covers api.mux.com plus the region-varying direct-upload hosts (e.g. direct-uploads-oci-us-ashburn-1-vop1.mux.com)
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.supabase.in wss://*.supabase.in https://api.stripe.com https://*.mux.com https://*.upstash.io",
      "frame-src https://js.stripe.com https://hooks.stripe.com",
      "font-src 'self' data:",
      "worker-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://checkout.stripe.com",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'image.mux.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: '*.supabase.in' },
    ],
  },
  headers: async () => [
    {
      source:  '/:path*',
      headers: securityHeaders,
    },
  ],
}

export default nextConfig
