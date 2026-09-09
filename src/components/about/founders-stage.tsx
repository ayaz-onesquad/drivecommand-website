'use client'

import { useRef } from 'react'
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap'

/**
 * FOUNDERS STAGE (pin + cues)
 * The frame holds for three viewports while the three founders cross over
 * inside it: the initials plate swaps, the name and bio rise, and a three
 * tick rail on the left shows where you are. The last founder holds.
 */

const FOUNDERS = [
  {
    initials: 'AM',
    name: 'Ayaz Mohammed',
    role: 'Co-founder',
    was: 'Carrier owner',
    bio: 'Built and ran a 20-truck fleet before writing the software that fleet needed. Lived the gaps in fleet management tools firsthand, then set out to close them.',
    brings: 'The owner’s view: cash flow, settlements, and what a missed load actually costs.',
  },
  {
    initials: 'SI',
    name: 'Sammy Issa',
    role: 'Co-founder',
    was: 'Owner-operator',
    bio: 'Ran his own truck before he ran a codebase. Brings real experience from behind the wheel and under the hood to every feature we ship.',
    brings: 'The driver’s view: what works on a phone, in a cab, with one bar of signal.',
  },
  {
    initials: 'NA',
    name: 'Nadeem Awawda',
    role: 'Co-founder',
    was: 'Dispatcher',
    bio: 'Dispatched loads before he designed dispatch software. Knows the daily chaos of coordinating drivers and brokers, and builds tools that survive it.',
    brings: 'The desk’s view: seventeen tabs collapsed into one board that stays calm at 5 AM.',
  },
]

export function FoundersStage() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const slides = gsap.utils.toArray<HTMLElement>('[data-founder]', section)
        const plates = gsap.utils.toArray<HTMLElement>('[data-plate]', section)
        const ticks = gsap.utils.toArray<HTMLElement>('[data-tick]', section)
        const n = slides.length

        gsap.set(slides.slice(1), { opacity: 0, y: 40 })
        gsap.set(plates.slice(1), { opacity: 0, rotationY: -40, transformPerspective: 1200 })
        gsap.set(ticks.slice(1), { scaleX: 0.35, opacity: 0.35, transformOrigin: 'left center' })

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${n * 110}%`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        // Each founder owns an equal share of the pin. Crossfades overlap ~15%.
        const share = 1 / n
        for (let i = 1; i < n; i++) {
          const at = i * share - 0.06
          tl.to(slides[i - 1], { opacity: 0, y: -40, duration: 0.07, ease: 'power2.in' }, at)
          tl.to(plates[i - 1], { opacity: 0, rotationY: 40, duration: 0.08, ease: 'power2.in' }, at)
          tl.to(ticks[i - 1], { scaleX: 0.35, opacity: 0.35, duration: 0.06 }, at)
          tl.to(slides[i], { opacity: 1, y: 0, duration: 0.09, ease: 'power2.out' }, at + 0.06)
          tl.to(plates[i], { opacity: 1, rotationY: 0, duration: 0.1, ease: 'power2.out' }, at + 0.05)
          tl.to(ticks[i], { scaleX: 1, opacity: 1, duration: 0.06 }, at + 0.06)
        }
        tl.to({}, { duration: 0.12 }, 1 - 0.12)
      })
      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--dc-b600)', color: 'var(--dc-b050)' }}
      aria-label="Founders"
    >
      <div className="absolute inset-0 hero-grain pointer-events-none" aria-hidden="true" />
      <div className="relative h-[100svh] min-h-[620px] mx-auto max-w-7xl px-6 md:px-12 flex items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-[minmax(0,42%)_minmax(0,58%)] gap-10 md:gap-16 items-center">
          {/* Left: eyebrow, tick rail, plate */}
          <div>
            <p className="font-mono text-[11px] md:text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--dc-b200)' }}>
              The founders
            </p>
            <div className="mt-4 flex gap-2" aria-hidden="true">
              {FOUNDERS.map((f) => (
                <span key={f.initials} data-tick className="h-[3px] w-12 rounded-full motion-reduce:!scale-x-100 motion-reduce:!opacity-100" style={{ backgroundColor: 'var(--dc-b300)' }} />
              ))}
            </div>

            <div className="relative mt-8 md:mt-12 h-40 md:h-64" style={{ perspective: '1200px' }}>
              {FOUNDERS.map((f) => (
                <div
                  key={f.initials}
                  data-plate
                  className="absolute inset-0 flex items-center justify-center rounded-2xl motion-reduce:hidden motion-reduce:last:flex"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--dc-n000) 10%, transparent)',
                    border: '1px solid color-mix(in srgb, var(--dc-n000) 22%, transparent)',
                    transformStyle: 'preserve-3d',
                  }}
                  aria-hidden="true"
                >
                  <span className="font-display font-bold tracking-[-0.04em] text-[clamp(4rem,10vw,9rem)] leading-none" style={{ color: 'var(--dc-n000)' }}>
                    {f.initials}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: the slides */}
          <div className="relative min-h-[18rem] md:min-h-[22rem]">
            {FOUNDERS.map((f, i) => (
              <article
                key={f.name}
                data-founder
                className={`absolute inset-x-0 top-0 motion-reduce:static motion-reduce:!opacity-100 motion-reduce:!translate-y-0 ${i > 0 ? 'motion-reduce:mt-12' : ''}`}
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--dc-b300)' }}>
                  {f.role} · was a {f.was.toLowerCase()}
                </p>
                <h2 className="mt-3 font-display font-bold tracking-[-0.03em] leading-[0.98] text-[clamp(2.2rem,5vw,4.4rem)]" style={{ color: 'var(--dc-n000)' }}>
                  {f.name}
                </h2>
                <p className="mt-5 font-body text-base md:text-lg leading-relaxed max-w-[52ch]" style={{ color: 'var(--dc-b050)', textWrap: 'pretty' }}>
                  {f.bio}
                </p>
                <p className="mt-4 font-body text-sm md:text-[15px] leading-relaxed max-w-[52ch] pl-4" style={{ color: 'var(--dc-b100)', borderLeft: '1px solid var(--dc-b300)' }}>
                  {f.brings}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
