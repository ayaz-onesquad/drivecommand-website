'use client'

import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Truck,
  MapPin,
  Users,
  FileText,
  Shield,
  Sparkles,
} from 'lucide-react'
import { useParallax, useContentParallax } from '@/hooks/use-parallax'
import { AnimatedIcon, type AnimationType } from '@/components/shared/animated-icon'

// TIER 2: Dot-grid pattern that moves at 0.25x scroll speed
function ParallaxDotGrid({ y }: { y: ReturnType<typeof useParallax>['y'] }) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none will-change-transform"
      style={{ y }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, rgb(71 85 105 / 0.4) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
    </motion.div>
  )
}

interface Feature {
  icon: LucideIcon
  title: string
  description: string
  color: string
  bgColor: string
  hoverBorderColor: string
  hoverGlowShadow: string
  animation: AnimationType
  triggerOnHover: boolean
}

const FEATURES: Feature[] = [
  {
    icon: Truck,
    title: 'Dispatch & Loads',
    description:
      'Book loads, assign drivers, and track delivery status in one board. Your dispatcher sees everything. No phone tag.',
    color: 'text-dc-accent',
    bgColor: 'bg-dc-accent/10',
    hoverBorderColor: 'rgba(117, 240, 212, 0.6)',
    hoverGlowShadow: '0 10px 40px -10px rgba(117, 240, 212, 0.3)',
    animation: 'truck-drive',
    triggerOnHover: true,
  },
  {
    icon: MapPin,
    title: 'Live GPS',
    description:
      'See every truck on a live map. Get alerts when a driver is off-route, stopped too long, or approaching the delivery window.',
    color: 'text-brand-green',
    bgColor: 'bg-brand-green/10',
    hoverBorderColor: 'rgba(16, 185, 129, 0.6)',
    hoverGlowShadow: '0 10px 40px -10px rgba(16, 185, 129, 0.3)',
    animation: 'pulse-ring',
    triggerOnHover: true,
  },
  {
    icon: Users,
    title: 'Driver & Payroll',
    description:
      'Log hours, calculate per-mile pay, and run payroll from the same place where you track loads. Drivers get pay stubs, you get compliance.',
    color: 'text-sky-400',
    bgColor: 'bg-sky-400/10',
    hoverBorderColor: 'rgba(56, 189, 248, 0.6)',
    hoverGlowShadow: '0 10px 40px -10px rgba(56, 189, 248, 0.3)',
    animation: 'bounce-up',
    triggerOnHover: false,
  },
  {
    icon: FileText,
    title: 'Invoicing',
    description:
      'Generate invoices the moment a POD is uploaded. One click, done. Chase receivables with automated reminders — not phone calls.',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    hoverBorderColor: 'rgba(129, 140, 248, 0.6)',
    hoverGlowShadow: '0 10px 40px -10px rgba(129, 140, 248, 0.3)',
    animation: 'bounce-up',
    triggerOnHover: true,
  },
  {
    icon: Shield,
    title: 'Compliance & Safety',
    description:
      'HOS logs, inspection reports, and license expiration alerts built in. Never get caught at a weigh station without paperwork again.',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    hoverBorderColor: 'rgba(52, 211, 153, 0.6)',
    hoverGlowShadow: '0 10px 40px -10px rgba(52, 211, 153, 0.3)',
    animation: 'rotate-once',
    triggerOnHover: true,
  },
  {
    icon: Sparkles,
    title: 'AI Tools',
    description:
      'DriveCommand flags late loads, suggests optimal driver assignments, and drafts rate confirmations — so your dispatcher spends less time on admin.',
    color: 'text-dc-accent',
    bgColor: 'bg-dc-accent/10',
    hoverBorderColor: 'rgba(117, 240, 212, 0.6)',
    hoverGlowShadow: '0 10px 40px -10px rgba(117, 240, 212, 0.3)',
    animation: 'pulse-ring',
    triggerOnHover: true,
  },
]

export function FeaturesGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const prefersReducedMotion = useReducedMotion()

  // TIER 2: Decorative parallax - dot grid moves y: 0 → -60px (0.25x speed)
  const { y: decorativeY, shouldAnimate } = useParallax({
    speed: 0.3,
    outputRange: [0, -60],
  })

  // TIER 3: Content micro-parallax for headline (0.5x speed)
  const { y: contentY, shouldAnimate: shouldAnimateContent } = useContentParallax()

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative z-[1] py-24 overflow-hidden"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      {/* TIER 2: Parallax dot grid (desktop only, respects reduced motion) */}
      {shouldAnimate && <ParallaxDotGrid y={decorativeY} />}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* TIER 3: Content with micro-parallax */}
        <motion.div
          className="mb-16 will-change-transform"
          style={shouldAnimateContent ? { y: contentY } : undefined}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            {/* Section header with stripe accent */}
            <span className="stripe-accent" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Everything Your Fleet Needs. Nothing It Doesn&apos;t.
            </h2>
            <p className="font-body text-lg max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
              Built for carriers running 2 to 200 trucks. No enterprise bloat. No per-seat games.
            </p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative rounded-xl p-6 shadow-sm overflow-hidden texture-steel border-panel transition-all duration-200"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: prefersReducedMotion ? 0 : index * 0.06,
              }}
              whileHover={
                prefersReducedMotion
                  ? {}
                  : {
                      y: -6,
                      borderColor: feature.hoverBorderColor,
                      boxShadow: feature.hoverGlowShadow,
                    }
              }
              style={{
                ['--hover-border' as string]: feature.hoverBorderColor,
              }}
            >
              <div className="relative z-10">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${feature.bgColor} mb-4`}
                >
                  <AnimatedIcon
                    icon={feature.icon}
                    animation={feature.animation}
                    size={24}
                    className={feature.color}
                    triggerOnHover={feature.triggerOnHover}
                  />
                </div>
                <h3
                  className="font-display text-xl font-semibold mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {feature.title}
                </h3>
                <p
                  className="font-body mb-4"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {feature.description}
                </p>
                <motion.button
                  className="group font-body text-sm font-medium transition-colors inline-flex items-center gap-1"
                  style={{ color: 'var(--color-accent)' }}
                  whileHover={prefersReducedMotion ? {} : { x: 2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  Learn more
                  <motion.span
                    className="inline-block"
                    initial={{ x: 0 }}
                    whileHover={prefersReducedMotion ? {} : { x: 3 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
