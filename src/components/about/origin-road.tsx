'use client'

import { useRef } from 'react'
import { gsap, useGSAP, MOTION_OK, DESKTOP } from '@/lib/gsap'

/**
 * ORIGIN ROAD (draw device)
 * The story runs down a highway centerline that draws itself as the reader
 * scrolls, with a marker riding the line. Beats alternate sides on desktop
 * and stack on phones. Nothing here is pinned; the road is the motion.
 */

const BEATS = [
  {
    label: 'The fleet',
    title: 'Twenty trucks and one spreadsheet.',
    body:
      'Ayaz built and ran a 20-truck carrier. Dispatch lived in a workbook, settlements in a PDF, and drivers in a group text. It worked, right up until the night it did not.',
  },
  {
    label: "The driver's seat",
    title: 'Every tool looks different from the cab.',
    body:
      'Sammy ran as an owner-operator. He saw the app that needed a signal, the BOL that needed a scanner, and the settlement that needed a phone call to understand.',
  },
  {
    label: 'The dispatch desk',
    title: 'Seventeen tabs. Three phones. One Sunday.',
    body:
      'Nadeem dispatched loads. Coordinating drivers, brokers, and paperwork across tools that never talked to each other, and a Sunday night that never quite ended.',
  },
  {
    label: 'The decision',
    title: 'Nobody was building it for carriers.',
    body:
      'The three of us had become software engineers by then. Every fleet tool we tried was built by people who had never waited at a dock. So we built the one we wished we had.',
  },
  {
    label: 'Today',
    title: 'One surface. Built by carriers.',
    body:
      'DriveCommand puts dispatch, GPS, drivers, payroll, and invoicing in one login, priced per truck, with no contract and no demo gate. The waitlist is open.',
  },
]

function TruckMarker() {
  return (
    <svg width="44" height="24" viewBox="0 0 44 24" fill="none" aria-hidden="true">
      <rect x="1" y="4" width="26" height="14" rx="2" fill="var(--dc-b500)" />
      <path d="M27 8h9l6 6v4H27V8z" fill="var(--dc-b300)" />
      <rect x="29" y="10" width="6" height="4" rx="1" fill="var(--dc-n900)" opacity="0.7" />
      <circle cx="9" cy="19" r="3.5" fill="var(--dc-n900)" stroke="var(--dc-bone)" strokeWidth="1.5" />
      <circle cx="20" cy="19" r="3.5" fill="var(--dc-n900)" stroke="var(--dc-bone)" strokeWidth="1.5" />
      <circle cx="36" cy="19" r="3.5" fill="var(--dc-n900)" stroke="var(--dc-bone)" strokeWidth="1.5" />
    </svg>
  )
}

export function OriginRoad() {
  const sectionRef = useRef<HTMLElement>(null)
  const roadRef = useRef<HTMLDivElement>(null)
  const markerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      const road = roadRef.current
      const marker = markerRef.current
      if (!section || !road || !marker) return
      const mm = gsap.matchMedia()

      mm.add(MOTION_OK, () => {
        // The line draws from the top as the section travels through the viewport centre
        gsap.fromTo(
          road,
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: road, start: 'top 60%', end: 'bottom 60%', scrub: true, invalidateOnRefresh: true },
          }
        )
        // The marker rides the drawn tip of the line
        gsap.fromTo(
          marker,
          { y: 0 },
          {
            y: () => road.offsetHeight - marker.offsetHeight,
            ease: 'none',
            scrollTrigger: { trigger: road, start: 'top 60%', end: 'bottom 60%', scrub: 0.4, invalidateOnRefresh: true },
          }
        )
        // Beats settle in as the line reaches them
        gsap.utils.toArray<HTMLElement>('[data-beat]', section).forEach((beat) => {
          const side = beat.dataset.side === 'right' ? 36 : -36
          gsap.fromTo(
            beat,
            { opacity: 0, x: side, y: 20 },
            {
              opacity: 1,
              x: 0,
              y: 0,
              ease: 'power2.out',
              scrollTrigger: { trigger: beat, start: 'top 85%', end: 'top 58%', scrub: true },
            }
          )
          const dot = beat.querySelector('[data-dot]')
          if (dot) {
            gsap.fromTo(
              dot,
              { scale: 0.4, opacity: 0 },
              { scale: 1, opacity: 1, ease: 'back.out(2)', scrollTrigger: { trigger: beat, start: 'top 62%', end: 'top 50%', scrub: true } }
            )
          }
        })
      })

      // Phones: beats come from the same side; the x offset is smaller
      mm.add(`${MOTION_OK} and not ${DESKTOP}`, () => {
        gsap.set('[data-beat]', { x: 0 })
      })

      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: 'var(--surface-base)' }}
      aria-label="How DriveCommand started"
    >
      <div className="absolute inset-0 pattern-dots opacity-60 pointer-events-none" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-6 md:px-12">
        <div className="mb-16 md:mb-24 max-w-[40ch]">
          <p className="font-mono text-[11px] md:text-xs uppercase tracking-[0.22em] mb-4" style={{ color: 'var(--text-tertiary)' }}>
            How it started
          </p>
          <h2
            className="font-display font-bold tracking-[-0.03em] leading-[0.98] text-[clamp(2.2rem,4.6vw,3.8rem)]"
            style={{ color: 'var(--text-primary)', textWrap: 'balance' }}
          >
            The road to one surface.
          </h2>
        </div>

        <div className="relative">
          {/* Road bed: a static faint line, then the drawn centerline over it */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2" style={{ backgroundColor: 'var(--border-divider)' }} aria-hidden="true" />
          <div
            ref={roadRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[3px] md:-translate-x-1/2 will-change-transform"
            style={{
              backgroundImage: 'repeating-linear-gradient(to bottom, var(--accent-brand) 0 18px, transparent 18px 30px)',
            }}
            aria-hidden="true"
          />
          <div
            ref={markerRef}
            className="absolute left-4 md:left-1/2 top-0 -translate-x-1/2 will-change-transform z-10"
            style={{ filter: 'drop-shadow(0 6px 10px rgba(0, 0, 0, 0.25))' }}
            aria-hidden="true"
          >
            <TruckMarker />
          </div>

          <ol className="relative space-y-16 md:space-y-28 pt-10 pb-16">
            {BEATS.map((b, i) => {
              const right = i % 2 === 1
              const copy = (
                <div className={right ? '' : 'md:text-right'}>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--accent-brand)' }}>
                    {b.label}
                  </p>
                  <h3
                    className="font-display font-semibold tracking-[-0.02em] text-[clamp(1.35rem,2.2vw,1.9rem)] leading-tight"
                    style={{ color: 'var(--text-primary)', textWrap: 'balance' }}
                  >
                    {b.title}
                  </h3>
                  <p className="mt-3 font-body text-[15px] md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)', textWrap: 'pretty' }}>
                    {b.body}
                  </p>
                </div>
              )
              return (
                <li
                  key={b.label}
                  data-beat
                  data-side={right ? 'right' : 'left'}
                  className="relative pl-14 md:pl-0 md:grid md:grid-cols-[minmax(0,1fr)_0px_minmax(0,1fr)] md:gap-x-14"
                >
                  {/* Milestone dot: on phones at the left rail, on desktop in the zero-width centre column, so it always sits on the road */}
                  <span className="absolute left-4 top-2 md:relative md:left-0 md:top-2 md:col-start-2 md:row-start-1" aria-hidden="true">
                    <span
                      data-dot
                      className="block absolute left-0 top-0 w-3.5 h-3.5 rounded-full -translate-x-1/2"
                      style={{ backgroundColor: 'var(--accent-brand)', boxShadow: '0 0 0 5px var(--surface-base)' }}
                    />
                  </span>
                  <div className={right ? 'md:col-start-3 md:row-start-1' : 'md:col-start-1 md:row-start-1'}>{copy}</div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
