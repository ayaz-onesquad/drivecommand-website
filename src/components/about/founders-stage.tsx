'use client'

import { useRef } from 'react'
import { gsap, useGSAP, once, MOTION_OK, DESKTOP, MOBILE } from '@/lib/gsap'

/**
 * FOUNDERS STAGE
 * Desktop: the frame holds for three viewports while the three founders
 * cross over inside it. The scroll snaps to whole founders, so nobody can
 * rest on a half crossfade. A three-tick rail and a progress hairline say
 * "there are three, you are on this one".
 * Phone: no pin. Three blocks in flow, each landing on its own.
 */

const FOUNDERS = [
  {
    initials: 'AM',
    name: 'Ayaz Mohammed',
    role: 'Co-founder',
    was: 'carrier owner',
    bio: 'Built and ran a 20-truck fleet before writing the software that fleet needed. Lived the gaps in fleet management tools firsthand, then set out to close them.',
    brings: 'The owner’s view: cash flow, settlements, and what a missed load actually costs.',
  },
  {
    initials: 'SI',
    name: 'Sammy Issa',
    role: 'Co-founder',
    was: 'owner-operator',
    bio: 'Ran his own truck before he ran a codebase. Brings real experience from behind the wheel and under the hood to every feature we ship.',
    brings: 'The driver’s view: what works on a phone, in a cab, with one bar of signal.',
  },
  {
    initials: 'NA',
    name: 'Nadeem Awawda',
    role: 'Co-founder',
    was: 'dispatcher',
    bio: 'Dispatched loads before he designed dispatch software. Knows the daily chaos of coordinating drivers and brokers, and builds tools that survive it.',
    brings: 'The desk’s view: seventeen tabs collapsed into one board that stays calm at 5 AM.',
  },
]

export function FoundersStage() {
  const sectionRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return
      const mm = gsap.matchMedia()

      mm.add(`${MOTION_OK} and ${DESKTOP}`, () => {
        const blocks = gsap.utils.toArray<HTMLElement>('[data-founder]', section)
        const ticks = gsap.utils.toArray<HTMLElement>('[data-tick]', section)
        const n = blocks.length
        const plate = (b: HTMLElement) => b.querySelector('[data-plate]')
        const copy = (b: HTMLElement) => b.querySelector('[data-copy]')

        blocks.slice(1).forEach((b) => {
          gsap.set(copy(b), { opacity: 0, y: 40 })
          gsap.set(plate(b), { opacity: 0, rotationY: -40, transformPerspective: 1200 })
        })
        gsap.set(ticks.slice(1), { scaleX: 0.35, opacity: 0.35, transformOrigin: 'left center' })

        // Whole-founder stops: the scroll snaps to these. The last stop is the
        // end of the pin, so the third founder holds and the page releases.
        const stops = blocks.map((_, i) => i / (n - 1))

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${(n - 1) * 100}%`,
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            // CSS scroll-behavior: smooth fights programmatic snapping, so it is
            // switched off for the duration of each snap and restored after.
            snap: {
              snapTo: stops,
              duration: { min: 0.2, max: 0.5 },
              ease: 'power2.inOut',
              delay: 0.05,
              directional: true,
              inertia: false,
              onStart: () => {
                document.documentElement.style.scrollBehavior = 'auto'
              },
              onComplete: () => {
                document.documentElement.style.scrollBehavior = ''
              },
              onInterrupt: () => {
                document.documentElement.style.scrollBehavior = ''
              },
            },
            onUpdate: (self) => {
              if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`
            },
          },
        })

        for (let i = 1; i < n; i++) {
          const at = (i - 0.5) / (n - 1) - 0.04
          tl.to(copy(blocks[i - 1]), { opacity: 0, y: -40, duration: 0.05, ease: 'power2.in' }, at)
          tl.to(plate(blocks[i - 1]), { opacity: 0, rotationY: 40, duration: 0.06, ease: 'power2.in' }, at)
          tl.to(ticks[i - 1], { scaleX: 0.35, opacity: 0.35, duration: 0.04 }, at)
          tl.to(copy(blocks[i]), { opacity: 1, y: 0, duration: 0.06, ease: 'power2.out' }, at + 0.05)
          tl.to(plate(blocks[i]), { opacity: 1, rotationY: 0, duration: 0.07, ease: 'power2.out' }, at + 0.04)
          tl.to(ticks[i], { scaleX: 1, opacity: 1, duration: 0.04 }, at + 0.05)
        }
        tl.to({}, { duration: 0.01 }, 0.99)
      })

      mm.add(`${MOTION_OK} and ${MOBILE}`, () => {
        gsap.utils.toArray<HTMLElement>('[data-founder]', section).forEach((b) => {
          const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, scrollTrigger: once(b, 'top 78%') })
          tl.fromTo(b.querySelector('[data-plate]'), { opacity: 0, rotationY: -30, transformPerspective: 1000 }, { opacity: 1, rotationY: 0, duration: 0.8 }, 0)
          tl.fromTo(b.querySelector('[data-copy]'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, 0.15)
        })
      })

      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ backgroundColor: 'var(--dc-b600)', color: 'var(--dc-b050)' }} aria-label="Founders">
      <div className="absolute inset-0 hero-grain pointer-events-none" aria-hidden="true" />
      <div className="relative md:h-[100svh] md:min-h-[620px] mx-auto max-w-7xl px-6 md:px-12 py-20 md:py-0 flex flex-col md:justify-center">
        <div>
          <p className="font-mono text-[11px] md:text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--dc-b200)' }}>
            The founders
          </p>
          <div className="mt-4 hidden md:flex gap-2" aria-hidden="true">
            {FOUNDERS.map((f) => (
              <span key={f.initials} data-tick className="h-[3px] w-12 rounded-full" style={{ backgroundColor: 'var(--dc-b300)' }} />
            ))}
          </div>
        </div>

        {/* Desktop: all three blocks share one grid cell and crossfade. Phone: they stack. */}
        <div className="mt-10 md:mt-12 grid md:[&>*]:[grid-area:1/1] gap-16 md:gap-0">
          {FOUNDERS.map((f) => (
            <article key={f.name} data-founder className="grid grid-cols-1 md:grid-cols-[minmax(0,42%)_minmax(0,58%)] gap-8 md:gap-16 items-center">
              <div data-plate className="relative h-36 md:h-64 will-change-transform" style={{ perspective: '1200px' }} aria-hidden="true">
                <div
                  className="absolute inset-0 flex items-center justify-center rounded-2xl"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--dc-n000) 10%, transparent)',
                    border: '1px solid color-mix(in srgb, var(--dc-n000) 22%, transparent)',
                  }}
                >
                  <span className="font-display font-bold tracking-[-0.04em] text-[clamp(4rem,10vw,9rem)] leading-none" style={{ color: 'var(--dc-n000)' }}>
                    {f.initials}
                  </span>
                </div>
              </div>
              <div data-copy>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--dc-b300)' }}>
                  {f.role} · was a {f.was}
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
              </div>
            </article>
          ))}
        </div>

        {/* Progress hairline (desktop) */}
        <div className="hidden md:block absolute left-0 right-0 bottom-8 mx-auto max-w-7xl px-6 md:px-12" aria-hidden="true">
          <div className="h-px w-full" style={{ backgroundColor: 'color-mix(in srgb, var(--dc-n000) 18%, transparent)' }}>
            <div ref={progressRef} className="h-px w-full origin-left will-change-transform" style={{ backgroundColor: 'var(--dc-b300)', transform: 'scaleX(0)' }} />
          </div>
        </div>
      </div>
    </section>
  )
}
