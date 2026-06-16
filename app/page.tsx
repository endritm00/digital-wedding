import { HeroSection }        from '@/components/home/hero-section'
import { HomeEnvelope }       from '@/components/home/home-envelope'
import { OpeningFilmSection } from '@/components/home/opening-film-section'
import { MomentsSection }     from '@/components/home/moments-section'
import { FinalCta }           from '@/components/home/final-cta-section'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <OpeningFilmSection />
      <HomeEnvelope />
      <MomentsSection />
      <FinalCta />
    </main>
  )
}
