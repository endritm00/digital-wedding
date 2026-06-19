import type { Metadata } from 'next'

// Private capability page: keep it out of search indexes and strip the referrer
// so the token never leaks to third parties via the Referer header.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
}

export default function ManageLayout({ children }: { children: React.ReactNode }) {
  return children
}
