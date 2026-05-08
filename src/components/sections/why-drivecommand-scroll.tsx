'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { cn } from '@/lib/utils'

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
      className={cn('panel relative flex min-h-screen items-center justify-center p-8 md:p-16', className)}
      style={{ backgroundColor: bg, color: text }}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="space-y-8">
          {/* Eyebrow */}
          <p
            className="font-mono text-xs font-medium uppercase tracking-[0.2em] opacity-60"
            style={{ borderBottom: `1px solid ${divider}`, paddingBottom: '0.5rem' }}
          >
            {eyebrow}
          </p>

          {/* Headline */}
          <h2 className="font-display text-[clamp(3.5rem,12vw,14rem)] font-bold leading-[0.85] uppercase tracking-tight">
            {headline}
          </h2>

          {/* Body */}
          <p className="font-body text-[clamp(1rem,2.5vw,1.75rem)] font-normal leading-relaxed max-w-[50ch]">
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
    <section id="why-drivecommand" ref={containerRef} className={cn('relative', className)}>
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
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-none border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider opacity-75">DISPATCH</p>
            <p className="mt-3 font-body text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Drag-and-drop loads onto drivers in real time. Status, miles, ETA — all live.
            </p>
          </div>
          <div className="rounded-none border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider opacity-75">SETTLEMENTS</p>
            <p className="mt-3 font-body text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Pay drivers correctly the first time. Per-mile, percentage, or hybrid — all automated.
            </p>
          </div>
          <div className="rounded-none border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider opacity-75">COMPLIANCE</p>
            <p className="mt-3 font-body text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              HOS, DOT, IFTA, and FMCSA logs — generated from data you already have.
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
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-none border border-black/10 bg-white p-6">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider opacity-60">PER-TRUCK</p>
            <p className="mt-3 font-body text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Pay only for active trucks. Scale up in busy season, down in quiet months. No seat charges.
            </p>
          </div>
          <div className="rounded-none border border-black/10 bg-white p-6">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider opacity-60">NO LOCK-IN</p>
            <p className="mt-3 font-body text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Month-to-month by default. Annual discount available, never required.
            </p>
          </div>
          <div className="rounded-none border border-black/10 bg-white p-6">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider opacity-60">EVERY FEATURE</p>
            <p className="mt-3 font-body text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Same product across every tier. We don't gate compliance behind enterprise plans.
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
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <p className="font-mono text-[clamp(3rem,6vw,5rem)] font-bold leading-none">99.7%</p>
            <p className="font-body text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              HOS compliance rate across customer fleets in the last 12 months.
            </p>
          </div>
          <div className="space-y-3">
            <p className="font-mono text-[clamp(3rem,6vw,5rem)] font-bold leading-none">0</p>
            <p className="font-body text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Manual IFTA filings required. We file from the GPS data you're already capturing.
            </p>
          </div>
          <div className="space-y-3">
            <p className="font-mono text-[clamp(3rem,6vw,5rem)] font-bold leading-none">1-CLICK</p>
            <p className="font-body text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              DOT audit packages. Past 6 months of logs, in seconds.
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
      >
        {/* CTA section */}
        <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <a
            href="https://app.drivecommand.com/sign-up"
            className="inline-flex items-center gap-2 rounded-none bg-[#0066CC] px-8 py-4 font-body text-lg font-semibold text-white transition-colors hover:bg-[#2D8FE0]"
          >
            Start free trial →
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 font-body text-lg font-medium transition-colors"
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
