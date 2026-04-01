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

export const metadata: Metadata = {
  title: 'Fleet Management Platform for Modern Carriers',
  description:
    'DriveCommand gives independent operators and growing fleets one place to dispatch, track, invoice, and stay compliant.',
  openGraph: {
    title: 'DriveCommand — Fleet Management Platform',
    description:
      'Dispatch, track, invoice, and stay compliant — all in one platform.',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <>
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
