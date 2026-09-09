'use client'

import { useRef } from 'react'
import { CheckCircle } from 'lucide-react'
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap'

/**
 * PROOF STACK (stack device)
 * Each quote sticks near the top of the viewport; the one before it recedes
 * (scales down, dims) as the next slides over. Reads as a deck being dealt.
 * Under reduced motion they simply stack in flow.
 */

const TESTIMONIALS = [
  {
    initials: 'MT',
    name: 'Marcus T.',
    role: 'Owner-Operator',
    fleetInfo: '7 trucks, Tennessee',
    quote:
      "I used to spend Sunday nights updating spreadsheets for Monday dispatch. Now I open DriveCommand on my phone and everything's already there. We haven't missed a pickup in 4 months.",
    tone: 'var(--state-info)',
  },
  {
    initials: 'DR',
    name: 'Diane R.',
    role: 'Fleet Manager',
    fleetInfo: '18 trucks, Texas',
    quote:
      "Our invoicing used to take 3 days after delivery. Now it's same-day because the POD uploads automatically. We collected $22k faster in the first month alone.",
    tone: 'var(--accent-brand)',
  },
  {
    initials: 'RK',
    name: 'Ray K.',
    role: 'Safety Director',
    fleetInfo: '34 trucks, Ohio',
    quote:
      'We had a driver HOS violation that cost us $11,000 in fines. After DriveCommand, our compliance rate is 100%. The alerts catch everything before it becomes a problem.',
    tone: 'var(--state-success)',
  },
]

export function ProofStack() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const slots = gsap.utils.toArray<HTMLElement>('[data-slot]', section)
        slots.forEach((slot, i) => {
          const next = slots[i + 1]
          const card = slot.querySelector<HTMLElement>('[data-card]')
          if (!next || !card) return
          gsap.to(card, {
            scale: 0.92,
            y: -16,
            opacity: 0.45,
            ease: 'none',
            scrollTrigger: {
              trigger: next,
              start: 'top 85%',
              end: 'top 22%',
              scrub: true,
            },
          })
        })
      })
      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32"
      style={{ backgroundColor: 'var(--surface-sunken)' }}
      aria-label="Carriers on DriveCommand"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[minmax(0,38%)_minmax(0,62%)] lg:gap-16">
          {/* Heading holds on the left while the deck deals on the right */}
          <div className="lg:sticky lg:top-28 lg:self-start mb-12 lg:mb-0">
            <h2
              className="font-display font-bold tracking-[-0.03em] leading-[0.98] text-[clamp(2.2rem,4.4vw,3.8rem)]"
              style={{ color: 'var(--text-primary)', textWrap: 'balance' }}
            >
              Carriers running on DriveCommand.
            </h2>
            <p className="mt-5 font-body text-base sm:text-lg max-w-[36ch]" style={{ color: 'var(--text-secondary)', textWrap: 'pretty' }}>
              Owner-operators, fleet managers, and safety directors. Different jobs, same Sunday night.
            </p>
          </div>

          <div>
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} data-slot className="sticky top-24 lg:top-28" style={{ marginBottom: i === TESTIMONIALS.length - 1 ? 0 : '18vh' }}>
                <figure
                  data-card
                  className="relative rounded-2xl p-7 sm:p-9 will-change-transform"
                  style={{
                    backgroundColor: 'var(--surface-elevated)',
                    border: '1px solid var(--border-card, var(--border-subtle))',
                    boxShadow: 'var(--shadow-elevated)',
                    transformOrigin: '50% 0%',
                  }}
                >
                  <div className="absolute left-0 top-8 bottom-8 w-px" style={{ backgroundColor: t.tone }} aria-hidden="true" />
                  <blockquote className="font-display text-[clamp(1.25rem,2vw,1.7rem)] leading-snug tracking-tight" style={{ color: 'var(--text-primary)', textWrap: 'pretty' }}>
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-7 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-11 h-11 rounded-full inline-flex items-center justify-center font-display font-bold text-sm"
                        style={{ backgroundColor: t.tone, color: 'var(--text-on-brand)' }}
                      >
                        {t.initials}
                      </span>
                      <div>
                        <div className="font-display font-semibold" style={{ color: 'var(--text-primary)' }}>{t.name}</div>
                        <div className="font-body text-sm" style={{ color: 'var(--text-secondary)' }}>
                          {t.role} · {t.fleetInfo}
                        </div>
                      </div>
                    </div>
                    <span className="hidden sm:inline-flex items-center gap-1 text-xs font-medium" style={{ color: 'var(--state-success)' }}>
                      <CheckCircle size={14} />
                      Verified carrier
                    </span>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
