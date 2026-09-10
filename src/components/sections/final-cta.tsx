'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { gsap, useGSAP, once, MOTION_OK, FINE_POINTER } from '@/lib/gsap'

/**
 * CLOSE (draw + pointer)
 * A road drawn to its vanishing point by the reader's own scroll, and the
 * tagline landing on it. The final screen resolves and holds: nothing here
 * fades out. The CTA is magnetic so the page ends by responding to the
 * reader rather than by running out.
 */

const WORDS = ['Miles', 'Ahead.']

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return
      const mm = gsap.matchMedia()

      mm.add(MOTION_OK, () => {
        const lines = gsap.utils.toArray<SVGPathElement>('[data-road]', section)
        lines.forEach((p) => {
          const len = p.getTotalLength()
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
        })
        // The road draws with the scroll (lines, not text, so a mid state is fine)
        gsap.to(lines, {
          strokeDashoffset: 0,
          stagger: 0.06,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top 85%', end: 'top 10%', scrub: 0.6 },
        })
        // The words, copy, and CTA land on their own once the section is in view
        const land = gsap.timeline({ defaults: { ease: 'power3.out' }, scrollTrigger: once(section, 'top 60%') })
        land.fromTo('[data-word]', { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.14 }, 0)
        land.fromTo('[data-close-copy]', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6 }, 0.45)
        land.fromTo('[data-close-cta]', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6 }, 0.6)
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
          const reach = 140
          if (Math.abs(dx) < reach && Math.abs(dy) < reach) {
            x(dx * 0.28)
            y(dy * 0.28)
          } else {
            x(0)
            y(0)
          }
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
      className="close relative overflow-hidden min-h-[100svh] flex items-center"
      aria-label="Join the waitlist"
    >
      {/* Road to the vanishing point, drawn by scroll */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        <g stroke="var(--close-line)" strokeWidth="1.5" strokeLinecap="round">
          <path data-road d="M-120 900 L720 300" />
          <path data-road d="M1560 900 L720 300" />
          <path data-road d="M260 900 L720 300" />
          <path data-road d="M1180 900 L720 300" />
          <path data-road d="M560 900 L720 300" />
          <path data-road d="M880 900 L720 300" />
        </g>
        <g stroke="var(--close-accent)" strokeWidth="2" strokeDasharray="14 22" strokeLinecap="round" opacity="0.7">
          <path data-road d="M720 900 L720 300" />
        </g>
        <g stroke="var(--close-line)" strokeWidth="1" opacity="0.55">
          <path data-road d="M0 300 L1440 300" />
        </g>
      </svg>

      {/* Horizon glow behind the copy */}
      <div
        className="absolute left-1/2 top-[33%] -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[900px] h-[40vh] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, var(--close-glow) 0%, transparent 65%)' }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 hero-grain pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 w-full py-24 text-center">
        <h2
          className="font-display font-bold tracking-[-0.04em] leading-[0.92] text-[clamp(3.4rem,13vw,11rem)]"
          style={{ color: 'var(--close-ink)' }}
        >
          {WORDS.map((w, i) => (
            <span key={w} className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em] mr-[0.22em] last:mr-0">
              <span data-word className="inline-block motion-reduce:!translate-y-0" style={i === 1 ? { color: 'var(--close-accent)' } : undefined}>
                {w}
              </span>
            </span>
          ))}
        </h2>

        <p
          data-close-copy
          className="mt-8 font-body text-lg sm:text-xl max-w-[40ch] mx-auto motion-reduce:!opacity-100 motion-reduce:!translate-y-0"
          style={{ color: 'var(--close-ink-soft)', textWrap: 'pretty' }}
        >
          Join the carriers replacing five tools with one. The waitlist is open. No contract, no credit card.
        </p>

        <div data-close-cta className="mt-10 motion-reduce:!opacity-100 motion-reduce:!translate-y-0">
          <div ref={ctaRef} className="inline-block will-change-transform">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 font-body font-semibold text-lg rounded-lg transition-[transform,background-color] duration-150 active:scale-[0.97] hover:bg-dc-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--dc-b300)]"
              style={{ backgroundColor: 'var(--dc-b500)', color: 'var(--dc-bone)', boxShadow: 'var(--glow-brand-lg)' }}
            >
              Join Waitlist
              <ArrowRight size={18} />
            </Link>
          </div>
          <p className="mt-5 font-body text-sm" style={{ color: 'var(--close-ink-soft)' }}>
            Reviewed within one business day. Cancel any month.
          </p>
        </div>
      </div>
    </section>
  )
}
