'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { gsap, useGSAP, MOTION_OK, FINE_POINTER } from '@/lib/gsap'

/**
 * CLOSE: resolves and holds. Two lines settle, the CTA is magnetic.
 */
export function AboutClose() {
  const sectionRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          '[data-line]',
          { yPercent: 110 },
          {
            yPercent: 0,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 80%', end: 'top 30%', scrub: 0.5 },
          }
        )
        gsap.fromTo(
          '[data-after]',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: section, start: 'top 55%', end: 'top 20%', scrub: 0.5 } }
        )
      })
      mm.add(`${MOTION_OK} and ${FINE_POINTER}`, () => {
        const wrap = ctaRef.current
        if (!wrap) return
        const x = gsap.quickTo(wrap, 'x', { duration: 0.6, ease: 'power3.out' })
        const y = gsap.quickTo(wrap, 'y', { duration: 0.6, ease: 'power3.out' })
        const onMove = (e: PointerEvent) => {
          const r = wrap.getBoundingClientRect()
          const dx = e.clientX - (r.left + r.width / 2)
          const dy = e.clientY - (r.top + r.height / 2)
          const near = Math.abs(dx) < 140 && Math.abs(dy) < 120
          x(near ? dx * 0.28 : 0)
          y(near ? dy * 0.28 : 0)
        }
        const onLeave = () => {
          x(0)
          y(0)
        }
        section.addEventListener('pointermove', onMove, { passive: true })
        section.addEventListener('pointerleave', onLeave)
        return () => {
          section.removeEventListener('pointermove', onMove)
          section.removeEventListener('pointerleave', onLeave)
        }
      })
      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-28 md:py-40"
      style={{ backgroundColor: 'var(--dc-n900)', color: 'var(--dc-bone)' }}
      aria-label="Get in touch"
    >
      <div className="absolute inset-0 hero-grain pointer-events-none" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <h2 className="font-display font-bold tracking-[-0.04em] leading-[0.92] text-[clamp(2.8rem,9vw,7.5rem)]">
          {['Built by carriers.', 'For every road out there.'].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
              <span data-line className="block motion-reduce:!translate-y-0" style={i === 1 ? { color: 'var(--dc-b300)' } : undefined}>
                {line}
              </span>
            </span>
          ))}
        </h2>
        <p data-after className="mt-8 font-body text-lg md:text-xl max-w-[44ch] motion-reduce:!opacity-100" style={{ color: 'var(--dc-n300)', textWrap: 'pretty' }}>
          If you run trucks, we would like to hear how you run them. Join the waitlist, or just write to us. A person answers.
        </p>
        <div data-after className="mt-10 flex flex-col sm:flex-row sm:items-center gap-5 motion-reduce:!opacity-100">
          <div ref={ctaRef} className="inline-block will-change-transform">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 font-body font-semibold text-base rounded-lg transition-[transform,background-color] duration-150 active:scale-[0.97] hover:bg-dc-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--dc-b300)]"
              style={{ backgroundColor: 'var(--dc-b500)', color: 'var(--dc-bone)', boxShadow: 'var(--glow-brand-lg)' }}
            >
              Join Waitlist
              <ArrowRight size={18} />
            </Link>
          </div>
          <a href="mailto:team@drivecommand.io" className="inline-flex items-center gap-1.5 font-body text-base font-medium underline-offset-4 hover:underline" style={{ color: 'var(--dc-b300)' }}>
            team@drivecommand.io
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
