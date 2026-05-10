'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { cn } from '@/lib/utils'
import { CountUp, CountUpPercentage } from '@/components/shared/count-up'

gsap.registerPlugin(ScrollTrigger)

// Type definitions
interface FlowSectionProps {
  children: React.ReactNode
  className?: string
}

interface FlowArtProps {
  children?: React.ReactNode
  className?: string
}

interface PanelProps {
  bg: string
  text: string
  divider: string
  eyebrow: string
  headline: string | React.ReactNode
  body: string
  children?: React.ReactNode
  className?: string
}

// FlowSection wrapper
export function FlowSection({ children, className }: FlowSectionProps) {
  return <div className={cn(className)}>{children}</div>
}

// Panel component
function Panel({ bg, text, divider, eyebrow, headline, body, children, className }: PanelProps) {
  return (
    <div
      className={cn('panel relative flex min-h-screen items-start py-16 px-6 md:px-12 md:py-20 lg:py-24', className)}
      style={{ backgroundColor: bg, color: text }}
    >
      <div className="mx-auto w-full max-w-7xl overflow-hidden">
        <div className="space-y-6 md:space-y-8">
          {/* Eyebrow */}
          <p
            className="font-mono text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] opacity-60"
            style={{ borderBottom: `1px solid ${divider}`, paddingBottom: '0.5rem' }}
          >
            {eyebrow}
          </p>

          {/* Headline - reduced sizes for better content fit */}
          <h2 className="font-display text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[0.9] uppercase tracking-tight">
            {headline}
          </h2>

          {/* Body - reduced sizes */}
          <p className="font-body text-[clamp(0.875rem,1.8vw,1.25rem)] font-normal leading-relaxed max-w-[55ch]">
            {body}
          </p>

          {/* Optional children (sub-cards, CTA, etc.) */}
          {children}
        </div>
      </div>
    </div>
  )
}

// FlowArt component with GSAP scroll animation
export function FlowArt({ children, className }: FlowArtProps) {
  const containerRef = useRef<HTMLElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
  }, [])

  // GSAP scroll animation (only if motion is enabled)
  useGSAP(
    () => {
      if (reducedMotion || !containerRef.current) return

      const panels = gsap.utils.toArray<HTMLElement>('.panel')

      panels.forEach((panel, i) => {
        if (i === panels.length - 1) return // Skip last panel

        ScrollTrigger.create({
          trigger: panel,
          start: 'top top',
          pin: true,
          pinSpacing: false,
          scrub: true,
        })

        // Rotate next panel from 30deg to 0deg as it scrolls over
        if (i < panels.length - 1) {
          const nextPanel = panels[i + 1]
          gsap.fromTo(
            nextPanel,
            { rotationX: 30, transformOrigin: 'top center' },
            {
              rotationX: 0,
              scrollTrigger: {
                trigger: panel,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
              },
            }
          )
        }
      })
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  )

  return (
    <section id="why-drivecommand" ref={containerRef} className={cn('relative scroll-mt-16', className)}>
      {/* Panel 01 - The carrier truth */}
      <Panel
        bg="#1D1D1F"
        text="#F5F5F7"
        divider="rgba(245,245,247,0.2)"
        eyebrow="01 — THE CARRIER TRUTH"
        headline={
          <>
            Built <br />
            For The <br />
            Road.
          </>
        }
        body="Dispatchers juggle seventeen tabs. Drivers chase paperwork. Owner-operators reconcile spreadsheets at midnight. DriveCommand is the operating system that ends all of that — built by people who've actually moved freight."
      />

      {/* Panel 02 - One platform */}
      <Panel
        bg="#0066CC"
        text="#FFFFFF"
        divider="rgba(255,255,255,0.4)"
        eyebrow="02 — ONE PLATFORM"
        headline={
          <>
            Replace <br />
            Five Tools <br />
            With One.
          </>
        }
        body="Stop paying for separate dispatch, GPS, payroll, invoicing, and compliance tools. DriveCommand collapses them into one surface — loads, lanes, drivers, hours, settlements — so decisions happen in seconds, not minutes."
      >
        {/* Sub-cards */}
        <div className="mt-8 md:mt-10 grid gap-4 md:gap-5 md:grid-cols-3">
          <div className="rounded-lg border border-white/30 bg-white/15 p-4 md:p-5 backdrop-blur-sm">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider">DISPATCH</p>
            <p className="mt-2 font-body text-sm leading-relaxed opacity-90">
              Drag-and-drop loads onto drivers. See status, miles, and ETA update live. No refresh needed.
            </p>
          </div>
          <div className="rounded-lg border border-white/30 bg-white/15 p-4 md:p-5 backdrop-blur-sm">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider">SETTLEMENTS</p>
            <p className="mt-2 font-body text-sm leading-relaxed opacity-90">
              Pay drivers correctly the first time. Per-mile, percentage, or hybrid splits calculated automatically.
            </p>
          </div>
          <div className="rounded-lg border border-white/30 bg-white/15 p-4 md:p-5 backdrop-blur-sm">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider">COMPLIANCE</p>
            <p className="mt-2 font-body text-sm leading-relaxed opacity-90">
              HOS, DOT, IFTA logs generated from data you already have. No double entry.
            </p>
          </div>
        </div>
      </Panel>

      {/* Panel 03 - Transparent pricing */}
      <Panel
        bg="#F5F5F7"
        text="#1D1D1F"
        divider="rgba(29,29,31,0.2)"
        eyebrow="03 — TRANSPARENT PRICING"
        headline={
          <>
            No <br />
            Sales Calls <br />
            Required.
          </>
        }
        body="Per-truck pricing. Visible on the page. Calculator on the home page. Cancel any month. We don't hide pricing because we don't need to."
      >
        {/* Sub-cards */}
        <div className="mt-8 md:mt-10 grid gap-4 md:gap-5 md:grid-cols-3">
          <div className="rounded-lg border border-black/10 bg-white p-4 md:p-5 shadow-sm">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#6E6E73]">PER-TRUCK</p>
            <p className="mt-2 font-body text-sm leading-relaxed">
              Pay only for active trucks. Scale up in busy season, down in quiet months. No seat charges.
            </p>
          </div>
          <div className="rounded-lg border border-black/10 bg-white p-4 md:p-5 shadow-sm">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#6E6E73]">NO LOCK-IN</p>
            <p className="mt-2 font-body text-sm leading-relaxed">
              Month-to-month by default. Annual discount available, but never required.
            </p>
          </div>
          <div className="rounded-lg border border-black/10 bg-white p-4 md:p-5 shadow-sm">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#6E6E73]">ALL FEATURES</p>
            <p className="mt-2 font-body text-sm leading-relaxed">
              Same product on every tier. We don&apos;t gate compliance behind enterprise pricing.
            </p>
          </div>
        </div>
      </Panel>

      {/* Panel 04 - Compliance built in */}
      <Panel
        bg="#003C82"
        text="#E5F0FB"
        divider="rgba(229,240,251,0.3)"
        eyebrow="04 — COMPLIANCE, AUTOMATED"
        headline={
          <>
            DOT-Ready. <br />
            IFTA-Ready. <br />
            Audit-Ready.
          </>
        }
        body="Compliance isn't a feature we tacked on — it's how the platform was built. HOS violations flagged before they happen. IFTA filed from the data you're already capturing. Audit packages generated in one click."
      >
        {/* Stat cards */}
        <div className="mt-8 md:mt-10 grid gap-6 md:gap-8 md:grid-cols-3">
          <div className="space-y-2">
            <CountUpPercentage
              end={99.7}
              duration={1500}
              className="font-mono text-[clamp(2rem,5vw,3.5rem)] font-bold leading-none block"
            />
            <p className="font-body text-sm leading-relaxed opacity-90">
              HOS compliance rate across customer fleets in the last 12 months.
            </p>
          </div>
          <div className="space-y-2">
            <CountUp
              end={0}
              duration={800}
              delay={200}
              className="font-mono text-[clamp(2rem,5vw,3.5rem)] font-bold leading-none block"
            />
            <p className="font-body text-sm leading-relaxed opacity-90">
              Manual IFTA filings required. Filed automatically from GPS data.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-mono text-[clamp(2rem,5vw,3.5rem)] font-bold leading-none">1-CLICK</p>
            <p className="font-body text-sm leading-relaxed opacity-90">
              DOT audit packages. Six months of logs exported in seconds.
            </p>
          </div>
        </div>
      </Panel>

      {/* Panel 05 - Built for SMB */}
      <Panel
        bg="#1D1D1F"
        text="#FFFFFF"
        divider="rgba(255,255,255,0.2)"
        eyebrow="05 — BUILT FOR YOU"
        headline={
          <>
            For <span style={{ color: '#0066CC' }}>Carriers</span> <br />
            Running 1 To 25 <br />
            Trucks.
          </>
        }
        body="Samsara built for 500-truck fleets. Motive built for ELD compliance. We built DriveCommand for the operators they ignore — owner-ops, family carriers, growing fleets. Start a 14-day trial. No credit card. No demo gate."
        className="pb-32 md:pb-40"
      >
        {/* CTA section */}
        <div className="mt-8 md:mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <a
            href="https://app.drivecommand.com/sign-up"
            className="inline-flex items-center gap-2 rounded-lg bg-[#0066CC] px-6 py-3 font-body text-base font-semibold text-white transition-all duration-200 hover:bg-[#2D8FE0] hover:scale-[1.02]"
          >
            Start free trial →
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 font-body text-base font-medium transition-colors hover:opacity-80"
            style={{ color: '#5AC8FA' }}
          >
            Or talk to a human →
          </a>
        </div>
      </Panel>
    </section>
  )
}

// Default export
export default function WhyDriveCommandScroll() {
  return <FlowArt />
}
