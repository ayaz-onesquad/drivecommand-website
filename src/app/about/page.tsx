import type { Metadata } from 'next'
import { ScrollProvider } from '@/components/scroll/scroll-provider'
import { AboutStatement } from '@/components/about/about-statement'
import { OriginRoad } from '@/components/about/origin-road'
import { FoundersStage } from '@/components/about/founders-stage'
import { ValuesLedger } from '@/components/about/values-ledger'
import { AboutClose } from '@/components/about/about-close'

export const metadata: Metadata = {
  title: 'About',
  description:
    'DriveCommand is built by a carrier owner, an owner-operator, and a dispatcher who became engineers. Fleet software for the people who keep freight moving.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About DriveCommand',
    description: 'We ran trucks before we wrote code.',
    type: 'website',
  },
}

/**
 * About page score. A different grammar from the home page: editorial,
 * read top to bottom, no world flight.
 *
 *   Statement   pinned kinetic read    the words light up as you scroll
 *   Origin      draw                   the road draws itself, a marker rides it
 *   Founders    pin + cues             three people cross over in one frame
 *   Values      reveal                 rows wipe in, numeral first
 *   Close       holds                  magnetic CTA, a person answers
 */
export default function AboutPage() {
  return (
    <>
      <ScrollProvider />
      <AboutStatement />
      <OriginRoad />
      <FoundersStage />
      <ValuesLedger />
      <AboutClose />
    </>
  )
}
