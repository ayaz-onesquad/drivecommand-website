'use client'

import { motion, useInView, useReducedMotion, AnimatePresence } from 'motion/react'
import { useRef, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Truck,
  MapPin,
  Users,
  FileText,
  Shield,
  Sparkles,
  X,
  CheckCircle,
} from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import { useParallax, useContentParallax } from '@/hooks/use-parallax'

// TIER 2: Dot-grid pattern that moves at 0.25x scroll speed
function ParallaxDotGrid({ y }: { y: ReturnType<typeof useParallax>['y'] }) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none will-change-transform"
      style={{ y }}
      aria-hidden="true"
    >
      {/* Dark mode: light dots on dark */}
      <div
        className="absolute inset-0 opacity-20 dark:block hidden"
        style={{
          backgroundImage: `radial-gradient(circle, rgb(71 85 105 / 0.4) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      {/* Light mode: subtle dark dots */}
      <div
        className="absolute inset-0 opacity-[0.15] dark:hidden block"
        style={{
          backgroundImage: `radial-gradient(circle, rgb(0 0 0 / 0.15) 1px, transparent 1px)`,
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
  details: {
    headline: string
    bullets: string[]
    cta?: string
  }
}

const FEATURES: Feature[] = [
  {
    icon: Truck,
    title: 'Dispatch & Loads',
    description:
      'Book loads, assign drivers, and track delivery status in one board. Your dispatcher sees everything. No phone tag.',
    color: 'text-dc-accent',
    bgColor: 'bg-dc-accent/10',
    hoverBorderColor: 'rgba(0, 102, 204, 0.6)',
    hoverGlowShadow: '0 10px 40px -10px rgba(0, 102, 204, 0.3)',
    details: {
      headline: 'Your dispatch center, simplified',
      bullets: [
        'Drag-and-drop load assignment to available drivers',
        'Real-time status updates: dispatched, in-transit, delivered',
        'Automatic ETA calculations based on live traffic',
        'Load history and performance analytics',
        'Broker integration for seamless rate confirmations',
      ],
      cta: 'See dispatch in action',
    },
  },
  {
    icon: MapPin,
    title: 'Live GPS',
    description:
      'See every truck on a live map. Get alerts when a driver is off-route, stopped too long, or approaching the delivery window.',
    color: 'text-[var(--state-success)]',
    bgColor: 'bg-[var(--state-success-tint)]',
    hoverBorderColor: 'var(--state-success)',
    hoverGlowShadow: '0 10px 40px -10px var(--state-success-tint)',
    details: {
      headline: 'Know where every truck is, always',
      bullets: [
        'Real-time GPS tracking with 30-second updates',
        'Geofencing alerts for pickup and delivery locations',
        'Route deviation and unauthorized stop notifications',
        'Historical route playback for dispute resolution',
        'Driver ETA sharing with customers via link',
      ],
      cta: 'Explore GPS tracking',
    },
  },
  {
    icon: Users,
    title: 'Driver & Payroll',
    description:
      'Log hours, calculate per-mile pay, and run payroll from the same place where you track loads. Drivers get pay stubs, you get compliance.',
    color: 'text-dc2-signal-150',
    bgColor: 'bg-dc2-signal-150/10',
    hoverBorderColor: 'rgba(142, 155, 255, 0.6)',
    hoverGlowShadow: '0 10px 40px -10px rgba(142, 155, 255, 0.3)',
    details: {
      headline: 'Pay drivers right, every time',
      bullets: [
        'Per-mile, percentage, or flat-rate pay calculations',
        'Automatic deductions for advances and fuel cards',
        'Driver settlements generated from completed loads',
        'Digital pay stubs accessible via driver app',
        'Support for 1099 and W-2 drivers',
      ],
      cta: 'Learn about payroll',
    },
  },
  {
    icon: FileText,
    title: 'Invoicing',
    description:
      'Generate invoices the moment a POD is uploaded. One click, done. Chase receivables with automated reminders — not phone calls.',
    color: 'text-[var(--state-info)]',
    bgColor: 'bg-[var(--state-info-tint)]',
    hoverBorderColor: 'var(--state-info)',
    hoverGlowShadow: '0 10px 40px -10px var(--state-info-tint)',
    details: {
      headline: 'Get paid faster, stress less',
      bullets: [
        'Auto-generate invoices from POD uploads',
        'Customizable invoice templates with your branding',
        'Automated payment reminders at 30/60/90 days',
        'QuickBooks and accounting software integrations',
        'Aging reports and receivables dashboard',
      ],
      cta: 'See invoicing flow',
    },
  },
  {
    icon: Shield,
    title: 'Compliance & Safety',
    description:
      'HOS logs, inspection reports, and license expiration alerts built in. Never get caught at a weigh station without paperwork again.',
    color: 'text-[var(--state-success)]',
    bgColor: 'bg-[var(--state-success-tint)]',
    hoverBorderColor: 'var(--state-success)',
    hoverGlowShadow: '0 10px 40px -10px var(--state-success-tint)',
    details: {
      headline: 'Stay DOT-ready, automatically',
      bullets: [
        'HOS violation alerts before they happen',
        'IFTA mileage reports generated from GPS data',
        'License, registration, and insurance expiration tracking',
        'Pre-trip inspection checklists with photo capture',
        'One-click audit packages for DOT reviews',
      ],
      cta: 'Explore compliance tools',
    },
  },
  {
    icon: Sparkles,
    title: 'AI Tools',
    description:
      'DriveCommand flags late loads, suggests optimal driver assignments, and drafts rate confirmations — so your dispatcher spends less time on admin.',
    color: 'text-dc-accent',
    bgColor: 'bg-dc-accent/10',
    hoverBorderColor: 'rgba(0, 102, 204, 0.6)',
    hoverGlowShadow: '0 10px 40px -10px rgba(0, 102, 204, 0.3)',
    details: {
      headline: 'Let AI handle the busy work',
      bullets: [
        'Smart driver matching based on location and deadhead',
        'Late load predictions with proactive alerts',
        'Auto-drafted rate confirmations and BOLs',
        'Natural language search across all your data',
        'Weekly performance insights and recommendations',
      ],
      cta: 'See AI features',
    },
  },
]

// Feature Detail Modal Component
function FeatureModal({
  feature,
  open,
  onOpenChange
}: {
  feature: Feature
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild aria-describedby={undefined}>
              <motion.div
                className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-lg max-h-[85vh] overflow-y-auto rounded-lg p-6 md:p-8 shadow-xl"
                style={{
                  backgroundColor: 'var(--surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                }}
                initial={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
                animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                exit={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.25,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                <Dialog.Close asChild>
                  <button
                    className="absolute top-4 right-4 p-2 rounded-lg transition-colors hover:bg-white/10"
                    style={{ color: 'var(--text-secondary)' }}
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </Dialog.Close>

                <div className="mb-6 pr-8">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-lg ${feature.bgColor} mb-4`}
                  >
                    <feature.icon className={`w-6 h-6 md:w-7 md:h-7 ${feature.color}`} />
                  </div>
                  <Dialog.Title className="font-display text-xl md:text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {feature.title}
                  </Dialog.Title>
                  <p className="font-body text-base md:text-lg" style={{ color: 'var(--text-secondary)' }}>
                    {feature.details.headline}
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {feature.details.bullets.map((bullet, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.3,
                        delay: prefersReducedMotion ? 0 : 0.1 + i * 0.05
                      }}
                    >
                      <CheckCircle
                        size={18}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: 'var(--state-success)' }}
                      />
                      <span className="font-body" style={{ color: 'var(--text-primary)' }}>
                        {bullet}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {feature.details.cta && (
                  <button
                    className="w-full py-3 px-6 rounded-lg font-body font-semibold transition-all duration-200 hover:scale-[1.02]"
                    style={{
                      backgroundColor: 'var(--accent-brand)',
                      color: 'var(--text-on-brand)',
                    }}
                    onClick={() => onOpenChange(false)}
                  >
                    {feature.details.cta}
                  </button>
                )}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}

export function FeaturesGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const prefersReducedMotion = useReducedMotion()
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null)

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
            <motion.button
              key={feature.title}
              onClick={() => setSelectedFeature(feature)}
              className="group relative rounded-lg p-6 shadow-sm overflow-hidden texture-steel border-panel transition-all duration-300 text-left cursor-pointer"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 50, scale: prefersReducedMotion ? 1 : 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.7,
                delay: prefersReducedMotion ? 0 : index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={
                prefersReducedMotion
                  ? {}
                  : {
                      y: -8,
                      scale: 1.02,
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
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-none ${feature.bgColor} mb-4`}
                >
                  <feature.icon size={24} className={feature.color} />
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
                <span
                  className="font-body text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                  style={{ color: 'var(--color-accent)' }}
                >
                  Learn more
                  <span className="inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Feature Detail Modal */}
      {selectedFeature && (
        <FeatureModal
          feature={selectedFeature}
          open={!!selectedFeature}
          onOpenChange={(open) => !open && setSelectedFeature(null)}
        />
      )}
    </section>
  )
}
