'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { FEATURES, FeatureModal, type Feature } from './features-grid'
import { gsap, ScrollTrigger, useGSAP, MOTION_OK, DESKTOP } from '@/lib/gsap'

/**
 * FEATURES RAIL (pan device)
 *
 * Vertical scroll, lateral travel. Sideways reads as breadth, which is what
 * a feature set is. The heading is the first item on the rail and a closing
 * note is the last, so the rail has a resolution rather than an end and the
 * overflow is wide enough to travel on any desktop width.
 *
 * On phones and under reduced motion the rail relays out as a vertical stack.
 */
export function FeaturesRail() {
  const sectionRef = useRef<HTMLElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<Feature | null>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      const rail = railRef.current
      if (!section || !rail) return
      const mm = gsap.matchMedia()

      mm.add(`${MOTION_OK} and ${DESKTOP}`, () => {
        const travel = () => Math.max(0, rail.scrollWidth - window.innerWidth)
        const items = gsap.utils.toArray<HTMLElement>('[data-rail-item]', rail)

        const pan = gsap.to(rail, {
          x: () => -travel(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${travel()}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`
            },
          },
        })

        // Staggered settle: items arrive as the drawer is pulled. First item exempt.
        items.slice(1).forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0.55, y: 28 },
            {
              opacity: 1,
              y: 0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                containerAnimation: pan,
                start: 'left 92%',
                end: 'left 55%',
                scrub: true,
              },
            }
          )
        })

        return () => {
          pan.scrollTrigger?.kill()
          pan.kill()
          ScrollTrigger.getAll().forEach((t) => {
            if (t.vars.containerAnimation === pan) t.kill()
          })
        }
      })

      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative scroll-mt-16 overflow-x-clip"
      style={{ backgroundColor: 'var(--surface-base)' }}
      aria-label="Features"
    >
      <div className="relative md:h-[100svh] md:min-h-[600px] flex flex-col justify-center py-20 md:py-0">
        <div ref={railRef} className="features-rail">
          {/* Item 0: the heading rides the rail */}
          <div data-rail-item className="features-rail__lead">
            <h2
              className="font-display font-bold tracking-[-0.03em] leading-[0.98] text-[clamp(2.2rem,4.4vw,3.8rem)]"
              style={{ color: 'var(--text-primary)', textWrap: 'balance' }}
            >
              Everything your fleet needs. Nothing it doesn&apos;t.
            </h2>
            <p className="mt-5 font-body text-base sm:text-lg max-w-[40ch]" style={{ color: 'var(--text-secondary)', textWrap: 'pretty' }}>
              Six modules, one login. Built for carriers of any size, and every one of them is on every plan.
            </p>
          </div>

          {FEATURES.map((feature) => (
            <article key={feature.title} data-rail-item className="features-rail__card">
              <div className="flex items-start justify-between gap-4">
                <span className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${feature.bgColor}`}>
                  <feature.icon size={22} className={feature.color} />
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                {feature.title}
              </h3>
              <p className="mt-3 font-body text-[15px] leading-relaxed" style={{ color: 'var(--text-secondary)', textWrap: 'pretty' }}>
                {feature.description}
              </p>
              <ul className="mt-5 space-y-2">
                {feature.details.bullets.slice(0, 3).map((b) => (
                  <li key={b} className="flex items-start gap-2 font-body text-sm" style={{ color: 'var(--text-primary)' }}>
                    <CheckCircle size={15} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--state-success)' }} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setSelected(feature)}
                className="mt-auto pt-6 inline-flex items-center gap-1.5 font-body text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-brand)] rounded"
                style={{ color: 'var(--accent-brand)' }}
              >
                {feature.details.cta ?? 'Learn more'}
                <ArrowRight size={14} />
              </button>
            </article>
          ))}

          {/* Closing note: the rail resolves instead of ending */}
          <div data-rail-item className="features-rail__close">
            <p className="font-display font-semibold tracking-tight text-[clamp(1.6rem,2.8vw,2.4rem)] leading-tight" style={{ color: 'var(--text-primary)', textWrap: 'balance' }}>
              All of it, on every plan.
            </p>
            <p className="mt-3 font-body text-base" style={{ color: 'var(--text-secondary)' }}>
              Per-truck pricing. No per-seat games. No gated features.
            </p>
            <Link
              href="#pricing"
              className="mt-6 inline-flex items-center gap-1.5 font-body text-sm font-medium underline-offset-4 hover:underline"
              style={{ color: 'var(--accent-brand)' }}
            >
              See pricing
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Progress hairline (desktop): where you are on the rail */}
        <div className="hidden md:block absolute left-0 right-0 bottom-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-hidden="true">
          <div className="h-px w-full" style={{ backgroundColor: 'var(--border-divider)' }}>
            <div
              ref={progressRef}
              className="h-px w-full origin-left will-change-transform"
              style={{ backgroundColor: 'var(--accent-brand)', transform: 'scaleX(0)' }}
            />
          </div>
        </div>
      </div>

      {selected ? (
        <FeatureModal feature={selected} open={!!selected} onOpenChange={(open) => !open && setSelected(null)} />
      ) : null}
    </section>
  )
}
