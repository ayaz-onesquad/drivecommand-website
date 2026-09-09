import type { Metadata } from 'next'
import { Hero, InteractiveDemo, PricingCalculator, FinalCTA } from '@/components/sections'
import { CollapseAct } from '@/components/sections/collapse-act'
import { FeaturesRail } from '@/components/sections/features-rail'
import { RoadChapters } from '@/components/sections/road-chapters'
import { ProofStack } from '@/components/sections/proof-stack'
import { RevealPanel } from '@/components/scroll/reveal-panel'
import { ScrollProvider } from '@/components/scroll/scroll-provider'

export const metadata: Metadata = {
  title: 'Fleet Management for Carriers',
  description:
    'DriveCommand gives independent operators and growing fleets one place to dispatch, track, invoice, and stay compliant.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'DriveCommand | Fleet Management for Carriers',
    description:
      'Dispatch, track, invoice, and stay compliant, all in one place.',
    type: 'website',
  },
}

/**
 * Home page score (one device family per beat, none repeated back to back):
 *
 *   Recognition   Hero          parallax planes + pointer depth
 *   Tension/Turn  Collapse      pin + scrubbed choreography   (the peak)
 *   Substance     Features      pan (horizontal rail)
 *   Who we are    Chapters      full-screen stacked panels, dealt in on scroll
 *   Proof         Demo          reveal (clip-path wipe) into a working surface
 *   Range         Pricing       flow + in
 *   Voices        Proof stack   stack (sticky deck)
 *   Commitment    Close         draw + magnet, resolves and holds
 */
export default function HomePage() {
  return (
    <>
      <ScrollProvider />
      <Hero />
      <CollapseAct />
      <FeaturesRail />
      <RoadChapters />
      <RevealPanel direction="up">
        <InteractiveDemo />
      </RevealPanel>
      <PricingCalculator />
      <ProofStack />
      <FinalCTA />
    </>
  )
}
