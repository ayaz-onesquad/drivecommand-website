'use client'

import { useRef } from 'react'
import { gsap, useGSAP, once, MOTION_OK } from '@/lib/gsap'

/**
 * STATEMENT (kinetic read)
 * One paragraph, set huge. The words light up in reading order on their own
 * as soon as the page loads, about two and a half seconds end to end, and
 * then hold. No pin: there is nothing to "make happen" by scrolling here.
 */

const SENTENCES = [
  'We ran trucks before we wrote code.',
  'We dispatched loads before we drew a dashboard.',
  'We built DriveCommand because nobody was going to build it for us.',
]

export function AboutStatement() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const words = gsap.utils.toArray<HTMLElement>('[data-word]', section)
        const meta = section.querySelector('[data-meta]')
        const tl = gsap.timeline({ scrollTrigger: once(section, 'top 70%') })
        tl.fromTo(words, { opacity: 0.16 }, { opacity: 1, duration: 0.45, ease: 'power2.out', stagger: 2.2 / words.length }, 0.2)
        tl.fromTo(meta, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2')
      })
      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="relative md:min-h-[calc(100svh-4rem)] flex items-center overflow-hidden"
      style={{ backgroundColor: 'var(--dc-n900)', color: 'var(--dc-bone)' }}
      aria-label="Who we are"
    >
      <div className="absolute inset-0 hero-grain pointer-events-none" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-12 py-20 md:py-24 w-full">
        <p className="font-mono text-[11px] md:text-xs uppercase tracking-[0.22em] mb-8" style={{ color: 'var(--dc-n400)' }}>
          About DriveCommand
        </p>
        <h1 className="font-display font-bold tracking-[-0.03em] leading-[1.04] text-[clamp(1.75rem,5.2vw,4.6rem)] max-w-[22ch]" style={{ textWrap: 'balance' }}>
          {SENTENCES.map((sentence, si) => (
            <span key={si} className="block mb-[0.35em] last:mb-0">
              {sentence.split(' ').map((w, wi) => (
                <span key={`${si}-${wi}`} data-word className="inline-block mr-[0.28em]">
                  {w}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <p data-meta className="mt-10 font-body text-base md:text-lg max-w-[48ch]" style={{ color: 'var(--dc-n300)', textWrap: 'pretty' }}>
          Three co-founders. A carrier owner, an owner-operator, and a dispatcher, who all became engineers.
        </p>
      </div>
    </section>
  )
}
