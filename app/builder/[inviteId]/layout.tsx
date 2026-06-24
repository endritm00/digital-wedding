import { BuilderProvider } from '@/components/builder/builder-provider'
import { BuilderShell } from '@/components/builder/builder-shell'
import { InvitePreview } from '@/components/builder/invite-preview'
import { TotalPill } from '@/components/builder/total-pill'
import { I18nProvider } from '@/lib/i18n/context'

export default async function BuilderLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ inviteId: string }>
}) {
  const { inviteId } = await params
  return (
    <BuilderProvider inviteId={inviteId}>
      <I18nProvider>
        {/* Fixed full-viewport live preview — the product itself */}
        <InvitePreview />
        {/* Fixed running total — always visible, never occluded by the sheet */}
        <TotalPill />
        {/* BuilderShell handles loading skeleton, error state, and step transitions */}
        <BuilderShell>{children}</BuilderShell>
      </I18nProvider>
    </BuilderProvider>
  )
}
