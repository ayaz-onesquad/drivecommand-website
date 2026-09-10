'use client'

import Link from 'next/link'
import { useRef, type ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { gsap, ScrollTrigger, useGSAP, once, MOTION_OK, DESKTOP, MOBILE } from '@/lib/gsap'

/**
 * ROAD CHAPTERS (full-screen stacked panels)
 *
 * Five full-viewport chapters. Each one pins, and the next tilts up over it
 * like a card being dealt onto the deck. Inside every chapter the eyebrow
 * rule draws, the headline rises line by line, then the body and any cards
 * settle, all under the reader's hand. The chapter underneath recedes as it
 * is covered so the stack reads as depth, not as a slideshow.
 *
 * This is the "who we are" section. The voice is plain and carrier-first.
 */

type Chapter = {
  number: string
  eyebrow: string
  lines: ReactNode[]
  body: string
  ground: string
  ink: string
  inkSoft: string
  rule: string
  accent: string
  cardBg: string
  cardBorder: string
  children?: ReactNode
}

function MiniCard({
  label,
  text,
  bg,
  border,
  labelColor,
}: {
  label: string
  text: string
  bg: string
  border: string
  labelColor: string
}) {
  return (
    <div data-ch-card className="rounded-lg p-4 md:p-5" style={{ backgroundColor: bg, border: `1px solid ${border}` }}>
      <p className="font-mono text-[11px] md:text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: labelColor }}>
        {label}
      </p>
      <p className="mt-2 font-body text-sm md:text-[15px] leading-relaxed" style={{ textWrap: 'pretty' }}>
        {text}
      </p>
    </div>
  )
}

export function RoadChapters() {
  const sectionRef = useRef<HTMLElement>(null)

  const CHAPTERS: Chapter[] = [
    {
      number: '01',
      eyebrow: 'The Carrier Truth',
      lines: ['Built', 'For The', 'Road.'],
      body:
        'Dispatchers juggle seventeen tabs. Drivers chase paperwork. Owner-operators reconcile spreadsheets at midnight. DriveCommand is the operating system that ends all of that, built by people who have actually moved freight.',
      ground: 'var(--dc-n900)',
      ink: 'var(--dc-bone)',
      inkSoft: 'var(--dc-n300)',
      rule: 'var(--dc-n600)',
      accent: 'var(--dc-b300)',
      cardBg: 'color-mix(in srgb, var(--dc-bone) 8%, transparent)',
      cardBorder: 'color-mix(in srgb, var(--dc-bone) 18%, transparent)',
    },
    {
      number: '02',
      eyebrow: 'Who We Are',
      lines: ['We Ran', 'Trucks Before', 'We Wrote Code.'],
      body:
        'DriveCommand was not dreamed up in a pitch deck. It was built out of a dispatch office by three people who lived the problem before they tried to solve it.',
      ground: 'var(--dc-b500)',
      ink: 'var(--dc-n000)',
      inkSoft: 'var(--dc-b050)',
      rule: 'var(--dc-b300)',
      accent: 'var(--dc-b050)',
      cardBg: 'color-mix(in srgb, var(--dc-n000) 14%, transparent)',
      cardBorder: 'color-mix(in srgb, var(--dc-n000) 30%, transparent)',
      children: (
        <div className="mt-8 md:mt-10 grid gap-3 md:gap-4 md:grid-cols-3">
          <MiniCard
            label="Ayaz Mohammed · Co-founder"
            text="Built and ran a 20-truck fleet. Then became the engineer who fixes what that fleet suffered through."
            bg="color-mix(in srgb, var(--dc-n000) 14%, transparent)"
            border="color-mix(in srgb, var(--dc-n000) 30%, transparent)"
            labelColor="var(--dc-b050)"
          />
          <MiniCard
            label="Sammy Issa · Co-founder"
            text="Owner-operator turned software engineer. Brings the driver's seat, and what breaks under the hood, to every feature."
            bg="color-mix(in srgb, var(--dc-n000) 14%, transparent)"
            border="color-mix(in srgb, var(--dc-n000) 30%, transparent)"
            labelColor="var(--dc-b050)"
          />
          <MiniCard
            label="Nadeem Awawda · Co-founder"
            text="Former dispatcher. Knows the daily chaos of coordinating loads and drivers, and builds tools that survive it."
            bg="color-mix(in srgb, var(--dc-n000) 14%, transparent)"
            border="color-mix(in srgb, var(--dc-n000) 30%, transparent)"
            labelColor="var(--dc-b050)"
          />
        </div>
      ),
    },
    {
      number: '03',
      eyebrow: 'How We Build',
      lines: ['Operator', 'First.', 'Always.'],
      body:
        'We build for the dispatcher at 5 AM, the owner-operator on the road, and the fleet manager juggling a dozen things at once. Not for a demo. Not for a slide.',
      ground: 'var(--dc-bone)',
      ink: 'var(--dc-n900)',
      inkSoft: 'var(--dc-n600)',
      rule: 'var(--dc-n200)',
      accent: 'var(--dc-b500)',
      cardBg: 'var(--dc-n000)',
      cardBorder: 'var(--dc-n200)',
      children: (
        <div className="mt-8 md:mt-10 grid gap-3 md:gap-4 md:grid-cols-3">
          <MiniCard
            label="Built for trucking"
            text="Not generic software bent to fit freight. Every screen is designed around how carriers actually work."
            bg="var(--dc-n000)"
            border="var(--dc-n200)"
            labelColor="var(--dc-b500)"
          />
          <MiniCard
            label="Focused simplicity"
            text="Most fleet software is bloated. We build what you need, skip what you don't, and make it all work together."
            bg="var(--dc-n000)"
            border="var(--dc-n200)"
            labelColor="var(--dc-b500)"
          />
          <MiniCard
            label="Reliability matters"
            text="Your business runs around the clock. So does DriveCommand, on the road and in the office."
            bg="var(--dc-n000)"
            border="var(--dc-n200)"
            labelColor="var(--dc-b500)"
          />
        </div>
      ),
    },
    {
      number: '04',
      eyebrow: 'Transparent Pricing',
      lines: ['No', 'Sales Calls', 'Required.'],
      body:
        "Per-truck pricing. Visible on the page. Calculator on the home page. Cancel any month. We don't hide pricing because we don't need to.",
      ground: 'var(--dc-b600)',
      ink: 'var(--dc-b050)',
      inkSoft: 'var(--dc-b100)',
      rule: 'var(--dc-b400)',
      accent: 'var(--dc-b300)',
      cardBg: 'color-mix(in srgb, var(--dc-n000) 8%, transparent)',
      cardBorder: 'color-mix(in srgb, var(--dc-n000) 22%, transparent)',
      children: (
        <div className="mt-8 md:mt-10 grid gap-3 md:gap-4 md:grid-cols-3">
          <MiniCard
            label="Per-truck"
            text="Pay only for active trucks. Scale up in busy season, down in quiet months. No seat charges."
            bg="color-mix(in srgb, var(--dc-n000) 8%, transparent)"
            border="color-mix(in srgb, var(--dc-n000) 22%, transparent)"
            labelColor="var(--dc-b300)"
          />
          <MiniCard
            label="No lock-in"
            text="Month to month by default. Annual discount available, never required."
            bg="color-mix(in srgb, var(--dc-n000) 8%, transparent)"
            border="color-mix(in srgb, var(--dc-n000) 22%, transparent)"
            labelColor="var(--dc-b300)"
          />
          <MiniCard
            label="All features"
            text="Same product on every plan. We don't gate critical features behind premium tiers."
            bg="color-mix(in srgb, var(--dc-n000) 8%, transparent)"
            border="color-mix(in srgb, var(--dc-n000) 22%, transparent)"
            labelColor="var(--dc-b300)"
          />
        </div>
      ),
    },
    {
      number: '05',
      eyebrow: 'Built For You',
      lines: [
        <>
          For <span style={{ color: 'var(--dc-b300)' }}>Carriers</span>
        </>,
        'Of Every',
        'Size.',
      ],
      body:
        "Whether you're an owner-operator with one truck or a growing fleet with hundreds, DriveCommand scales with you. Start lean, grow big. The waitlist is open. No credit card. No demo gate.",
      ground: 'var(--dc-n900)',
      ink: 'var(--dc-n000)',
      inkSoft: 'var(--dc-n300)',
      rule: 'var(--dc-n600)',
      accent: 'var(--dc-b300)',
      cardBg: 'transparent',
      cardBorder: 'transparent',
      children: (
        <div data-ch-card className="mt-8 md:mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-body text-base font-semibold transition-[transform,background-color] duration-150 hover:bg-dc-accent-hover active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--dc-b300)]"
            style={{ backgroundColor: 'var(--dc-b500)', color: 'var(--dc-bone)', boxShadow: 'var(--glow-brand-lg)' }}
          >
            Join Waitlist
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 font-body text-base font-medium underline-offset-4 hover:underline"
            style={{ color: 'var(--dc-b300)' }}
          >
            Or talk to a human
            <ArrowRight size={14} />
          </Link>
        </div>
      ),
    },
  ]

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return
      const mm = gsap.matchMedia()
      const panels = () => gsap.utils.toArray<HTMLElement>('[data-chapter]', section)

      // Content lands on its own once a chapter is in view. Never scrubbed,
      // so a reader who stops mid-scroll always sees finished type.
      const landContent = (panel: HTMLElement, start: string) => {
        const rule = panel.querySelector<HTMLElement>('[data-ch-rule]')
        const lines = gsap.utils.toArray<HTMLElement>('[data-ch-line]', panel)
        const body = panel.querySelector<HTMLElement>('[data-ch-body]')
        const cards = gsap.utils.toArray<HTMLElement>('[data-ch-card]', panel)
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, scrollTrigger: once(panel, start) })
        if (rule) tl.fromTo(rule, { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 0.8 }, 0)
        tl.fromTo(lines, { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.1 }, 0.05)
        if (body) tl.fromTo(body, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.5)
        if (cards.length) tl.fromTo(cards, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, 0.65)
      }

      // ---------------- Desktop: the stacked deck ----------------
      mm.add(`${MOTION_OK} and ${DESKTOP}`, () => {
        const list = panels()
        const triggers: ScrollTrigger[] = []
        list.forEach((panel, i) => {
          const isLast = i === list.length - 1
          const inner = panel.querySelector<HTMLElement>('[data-ch-inner]')

          if (!isLast) {
            triggers.push(
              ScrollTrigger.create({
                trigger: panel,
                start: 'top top',
                end: () => `+=${panel.offsetHeight}`,
                pin: true,
                pinSpacing: false,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              })
            )
          }

          // Deal-in: the whole chapter tilts up into place as it arrives (whole panel, never text alone)
          if (i > 0) {
            gsap.fromTo(
              panel,
              { rotationX: 12, transformPerspective: 1400, transformOrigin: 'top center', y: 30 },
              { rotationX: 0, y: 0, ease: 'none', scrollTrigger: { trigger: panel, start: 'top bottom', end: 'top top', scrub: true, invalidateOnRefresh: true } }
            )
          }

          // Recede: as the next chapter covers this one, its content sinks back
          const next = list[i + 1]
          if (next && inner) {
            gsap.to(inner, {
              scale: 0.92,
              y: -40,
              opacity: 0.3,
              ease: 'none',
              scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top', scrub: true, invalidateOnRefresh: true },
            })
          }

          landContent(panel, 'top 55%')
        })
        return () => triggers.forEach((t) => t.kill())
      })

      // ---------------- Phone: chapters in flow ----------------
      mm.add(`${MOTION_OK} and ${MOBILE}`, () => {
        panels().forEach((panel) => landContent(panel, 'top 75%'))
      })

      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section id="why-drivecommand" ref={sectionRef} className="relative scroll-mt-16" aria-label="Who we are">
      {CHAPTERS.map((ch) => (
        <article
          key={ch.number}
          data-chapter
          className="relative md:min-h-[100svh] flex items-center overflow-hidden will-change-transform"
          style={{ backgroundColor: ch.ground, color: ch.ink }}
        >
          <div className="absolute inset-0 hero-grain pointer-events-none" aria-hidden="true" />
          <div data-ch-inner className="relative w-full mx-auto max-w-7xl px-6 md:px-12 py-16 md:py-24 will-change-transform">
            <div className="space-y-6 md:space-y-8">
              {/* Eyebrow with number, the rule draws in */}
              <div>
                <p className="font-mono text-[11px] md:text-xs font-medium uppercase tracking-[0.22em]" style={{ color: ch.inkSoft }}>
                  <span style={{ color: ch.accent }}>{ch.number}</span>
                  <span className="inline-block align-middle mx-2.5 h-px w-5" style={{ backgroundColor: "currentColor", opacity: 0.6 }} aria-hidden="true" />
                  {ch.eyebrow}
                </p>
                <div data-ch-rule className="mt-3 h-px w-full" style={{ backgroundColor: ch.rule }} />
              </div>

              {/* Headline, one masked line per row */}
              <h2 className="font-display text-[clamp(2.6rem,8.4vw,6.4rem)] font-bold leading-[0.9] uppercase tracking-[-0.02em]">
                {ch.lines.map((line, i) => (
                  <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                    <span data-ch-line className="block">
                      {line}
                    </span>
                  </span>
                ))}
              </h2>

              <p
                data-ch-body
                className="font-body text-[clamp(0.95rem,1.7vw,1.25rem)] leading-relaxed max-w-[55ch]"
                style={{ color: ch.inkSoft, textWrap: 'pretty' }}
              >
                {ch.body}
              </p>

              {ch.children}
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}
