import type { Metadata } from 'next'
import {
  Hero,
  ProblemBar,
  FeaturesGrid,
  DemoVideo,
  InteractiveDemo,
  PricingCalculator,
  SocialProof,
  FinalCTA,
} from '@/components/sections'
import { ParallaxWorld } from '@/components/shared/parallax-world'

export const metadata: Metadata = {
  title: 'Fleet Management for Carriers',
  description:
    'DriveCommand gives independent operators and growing fleets one place to dispatch, track, invoice, and stay compliant.',
  openGraph: {
    title: 'DriveCommand — Fleet Management for Carriers',
    description:
      'Dispatch, track, invoice, and stay compliant — all in one place.',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <>
      {/* Global parallax background layer (z-index: 0) */}
      <ParallaxWorld />

      {/* All sections sit above the parallax world (z-index: 1+) */}
      <Hero />
      <ProblemBar />
      <FeaturesGrid />
      <DemoVideo />
      <InteractiveDemo />
      <PricingCalculator />
      <SocialProof />
      <FinalCTA />
    </>
  )
}
