'use client'

import { useRef } from 'react'
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap'

/**
 * STATEMENT (pinned kinetic read)
 * One paragraph, set huge, pinned for two viewports. The words light up in
 * reading order under the reader's hand, so the page opens by making them
 * read the one thing the company is. Ends lit and holds.
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
        gsap.set(words, { opacity: 0.18 })
        gsap.set(meta, { opacity: 0, y: 12 })
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=180%',
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        tl.to(words, { opacity: 1, duration: 0.7, stagger: { each: 0.7 / words.length } }, 0)
        tl.to(meta, { opacity: 1, y: 0, duration: 0.12, ease: 'power2.out' }, 0.78)
        tl.to({}, { duration: 0.1 }, 0.9)
      })
      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[calc(100svh-4rem)] flex items-center overflow-hidden"
      style={{ backgroundColor: 'var(--dc-n900)', color: 'var(--dc-bone)' }}
      aria-label="Who we are"
    >
      <div className="absolute inset-0 hero-grain pointer-events-none" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-12 py-20 w-full">
        <p className="font-mono text-[11px] md:text-xs uppercase tracking-[0.22em] mb-8" style={{ color: 'var(--dc-n400)' }}>
          About DriveCommand
        </p>
        <h1
          className="font-display font-bold tracking-[-0.03em] leading-[1.02] text-[clamp(1.9rem,5.2vw,4.6rem)] max-w-[22ch]"
          style={{ textWrap: 'balance' }}
        >
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
