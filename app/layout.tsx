import type { Metadata } from 'next'
import {
  Cormorant_Garamond, Inter, Pinyon_Script, Great_Vibes,
  Baskervville, Fraunces, EB_Garamond, Corinthia,
} from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets:  ['latin'],
  weight:   ['300', '400', '500', '600'],
  style:    ['normal', 'italic'],
  variable: '--font-cormorant',
  display:  'swap',
})

const inter = Inter({
  subsets:  ['latin'],
  weight:   ['300', '400', '500'],
  variable: '--font-inter',
  display:  'swap',
})

const pinyonScript = Pinyon_Script({
  weight:   '400',
  subsets:  ['latin'],
  variable: '--font-pinyon',
  display:  'swap',
})

const greatVibes = Great_Vibes({
  weight:   '400',
  subsets:  ['latin'],
  variable: '--font-great-vibes',
  display:  'swap',
})

const baskervville = Baskervville({
  weight:   '400',
  subsets:  ['latin'],
  variable: '--font-baskervville',
  display:  'swap',
})

const fraunces = Fraunces({
  subsets:  ['latin'],
  weight:   ['300', '400', '500', '600'],
  style:    ['normal', 'italic'],
  variable: '--font-fraunces',
  display:  'swap',
})

const corinthia = Corinthia({
  weight:   '400',
  subsets:  ['latin'],
  variable: '--font-corinthia',
  display:  'swap',
})

const ebGaramond = EB_Garamond({
  subsets:  ['latin'],
  weight:   ['400', '500', '600'],
  style:    ['normal', 'italic'],
  variable: '--font-eb-garamond',
  display:  'swap',
})

export const metadata: Metadata = {
  title:       'Digital Invite — Premium Digital Wedding Invitations',
  description: 'Design your wedding invitation yourself in minutes. Share on WhatsApp. From €99.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://digitalinvite.app'),
  openGraph: {
    title:       'Digital Invite — Begin Your Forever.',
    description: 'Design your wedding invitation yourself in minutes. Share on WhatsApp. From €99.',
    images:      [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Digital Invite' }],
    type:        'website',
    siteName:    'Digital Invite',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Digital Invite — Begin Your Forever.',
    description: 'Design your wedding invitation yourself in minutes. From €99.',
    images:      ['/og-image.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${pinyonScript.variable} ${greatVibes.variable} ${baskervville.variable} ${fraunces.variable} ${ebGaramond.variable} ${corinthia.variable}`}>
      <body className="bg-[#F8F4EF] text-[#1A1A1A] antialiased">
        {children}
      </body>
    </html>
  )
}
