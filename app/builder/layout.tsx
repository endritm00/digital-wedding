import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create your wedding invitation | Digital Invite',
  robots: { index: false, follow: false },
}

export default function BuilderRootLayout({ children }: { children: React.ReactNode }) {
  return children
}
