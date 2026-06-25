import { headers } from 'next/headers'
import { HeroSection }        from '@/components/home/hero-section'
import { HomeEnvelope }       from '@/components/home/home-envelope'
import { TemplatesShowcase }  from '@/components/home/templates-showcase'
import { MomentsSection }     from '@/components/home/moments-section'
import { FinalCta }           from '@/components/home/final-cta-section'
import { SiteNav }            from '@/components/marketing/site-nav'
import { SiteFooter }         from '@/components/marketing/site-footer'
import { detectCurrency } from '@/lib/currency'

export default async function HomePage() {
  const h = await headers()
  const currency = detectCurrency(h.get('x-vercel-ip-country'))

  return (
    <>
      <SiteNav />
      <main>
        <HeroSection />
        <TemplatesShowcase />
        <HomeEnvelope />
        <MomentsSection />
        <FinalCta currency={currency} />
      </main>
      <SiteFooter />
    </>
  )
}
