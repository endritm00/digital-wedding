import { HeroSection }        from '@/components/home/hero-section'
import { HomeEnvelope }       from '@/components/home/home-envelope'
import { TemplatesShowcase }  from '@/components/home/templates-showcase'
import { MomentsSection }     from '@/components/home/moments-section'
import { FinalCta }           from '@/components/home/final-cta-section'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TemplatesShowcase />
      <HomeEnvelope />
      <MomentsSection />
      <FinalCta />
    </main>
  )
}
