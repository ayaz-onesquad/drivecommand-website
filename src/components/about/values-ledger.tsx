'use client'

import { useRef } from 'react'
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap'

/**
 * VALUES LEDGER (reveal device)
 * Four rows, each wiped in from the left edge with clip-path as it enters,
 * numeral first. A wipe is a change of state, and each of these is a rule
 * we changed our minds into. Plain type on space, no cards.
 */

const VALUES = [
  {
    n: '01',
    title: 'Built for trucking, not bent to fit it.',
    body:
      'We are not generic software with a truck icon on the login page. Loads, lanes, drivers, hours, settlements: the objects on screen are the objects in your yard, named the way you name them.',
  },
  {
    n: '02',
    title: 'Operator first. Always.',
    body:
      'We build for the dispatcher at 5 AM, the owner-operator on the road, and the fleet manager juggling a dozen things at once. If a screen makes sense in a demo but not in a cab, it is wrong.',
  },
  {
    n: '03',
    title: 'Focused simplicity.',
    body:
      'Most fleet software is bloated. We build what you need, skip what you do not, and make it all work together. Every feature earns its place or it does not ship.',
  },
  {
    n: '04',
    title: 'Reliability matters more than novelty.',
    body:
      'Your business runs around the clock. A tool that is clever on Tuesday and down on Sunday night is worse than a spreadsheet. We build for the boring days as carefully as the busy ones.',
  },
]

export function ValuesLedger() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>('[data-row]', section).forEach((row) => {
          const numeral = row.querySelector('[data-numeral]')
          const copy = row.querySelector('[data-copy]')
          const rule = row.querySelector('[data-rule]')
          const tl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: { trigger: row, start: 'top 88%', end: 'top 45%', scrub: true },
          })
          if (rule) tl.fromTo(rule, { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 0.5 }, 0)
          if (numeral) tl.fromTo(numeral, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.45 }, 0.05)
          if (copy) tl.fromTo(copy, { clipPath: 'inset(0 100% 0 0)', x: -12 }, { clipPath: 'inset(0 0% 0 0)', x: 0, duration: 0.6 }, 0.25)
        })
      })
      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32"
      style={{ backgroundColor: 'var(--surface-sunken)' }}
      aria-label="What we believe"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="mb-14 md:mb-20 md:grid md:grid-cols-[minmax(0,40%)_minmax(0,60%)] md:gap-16 items-end">
          <h2
            className="font-display font-bold tracking-[-0.03em] leading-[0.98] text-[clamp(2.2rem,4.6vw,3.8rem)]"
            style={{ color: 'var(--text-primary)', textWrap: 'balance' }}
          >
            What we hold ourselves to.
          </h2>
          <p className="mt-5 md:mt-0 font-body text-base md:text-lg max-w-[46ch]" style={{ color: 'var(--text-secondary)', textWrap: 'pretty' }}>
            Four rules. They decide what we build, what we say no to, and what we charge for. We would rather lose a deal than break one.
          </p>
        </div>

        <ol>
          {VALUES.map((v) => (
            <li key={v.n} data-row className="relative grid grid-cols-[4.5rem_minmax(0,1fr)] md:grid-cols-[9rem_minmax(0,1fr)] gap-6 md:gap-12 py-8 md:py-12">
              <div data-rule className="absolute top-0 left-0 right-0 h-px will-change-transform" style={{ backgroundColor: 'var(--border-divider)' }} aria-hidden="true" />
              <span
                data-numeral
                className="font-display font-bold tracking-[-0.04em] leading-none text-[clamp(2.8rem,7vw,6rem)] tnum"
                style={{ color: 'var(--accent-brand)' }}
                aria-hidden="true"
              >
                {v.n}
              </span>
              <div data-copy className="pt-1 md:pt-3">
                <h3 className="font-display font-semibold tracking-[-0.02em] text-[clamp(1.35rem,2.4vw,2rem)] leading-tight" style={{ color: 'var(--text-primary)', textWrap: 'balance' }}>
                  {v.title}
                </h3>
                <p className="mt-3 font-body text-[15px] md:text-base leading-relaxed max-w-[62ch]" style={{ color: 'var(--text-secondary)', textWrap: 'pretty' }}>
                  {v.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <div className="h-px" style={{ backgroundColor: 'var(--border-divider)' }} aria-hidden="true" />
      </div>
    </section>
  )
}
