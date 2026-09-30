import { MoodProvider } from '@/hooks/use-mood'
import { ParticleLayer } from '@/components/particle-layer'
import { SiteHeader } from '@/components/site-header'
import { HeroMist } from '@/components/hero-mist'
import { Highlights } from '@/components/highlights'
import { About } from '@/components/about'
import { HillDivider } from '@/components/hill-divider'
import { Amenities } from '@/components/amenities'
import { Rooms } from '@/components/rooms'
import { StayTimeline } from '@/components/stay-timeline'
import { Gallery } from '@/components/gallery'
import { Reviews } from '@/components/reviews'
import { Location } from '@/components/location'
import { InquiryForm } from '@/components/inquiry-form'
import { SiteFooter } from '@/components/site-footer'
import { MobileActionBar } from '@/components/mobile-action-bar'
import { AltitudeGauge } from '@/components/altitude-gauge'

export default function Page() {
  return (
    <MoodProvider>
      <ParticleLayer />
      <SiteHeader />
      <main className="relative">
        <HeroMist />
        <Highlights />
        <About />
        <HillDivider />
        <Amenities />
        <HillDivider flip />
        <Rooms />
        <StayTimeline />
        <Gallery />
        <HillDivider />
        <Reviews />
        <HillDivider flip />
        <Location />
        <InquiryForm />
      </main>
      <SiteFooter />
      <AltitudeGauge />
      <MobileActionBar />
    </MoodProvider>
  )
}
