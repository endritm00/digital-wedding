import { HeroSection }        from '@/components/home/hero-section'
import { HomeEnvelope }       from '@/components/home/home-envelope'
import { TemplatesShowcase }  from '@/components/home/templates-showcase'
import { MomentsSection }     from '@/components/home/moments-section'
import { FinalCta }           from '@/components/home/final-cta-section'
import { SiteNav }            from '@/components/marketing/site-nav'
import { SiteFooter }         from '@/components/marketing/site-footer'

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main>
        <HeroSection />
        <TemplatesShowcase />
        <HomeEnvelope />
        <MomentsSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  )
}
