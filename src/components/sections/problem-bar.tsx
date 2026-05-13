'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { FileSpreadsheet, PhoneOff, Clock } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useParallax, useContentParallax } from '@/hooks/use-parallax'
import { CountUp, CountUpPercentage, CountUpDollars } from '@/components/shared/count-up'

// TIER 2: Highway lines pattern that moves at 0.25x scroll speed
function ParallaxHighwayLines({ y }: { y: ReturnType<typeof useParallax>['y'] }) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none will-change-transform"
      style={{ y }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full opacity-100"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Faint horizontal dashed lines suggesting a highway - uses currentColor for theme awareness */}
        <g style={{ color: 'var(--border-divider)' }}>
          <line x1="0" y1="30%" x2="100%" y2="30%" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="24 16" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="24 16" />
          <line x1="0" y1="70%" x2="100%" y2="70%" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="24 16" />
        </g>
      </svg>
    </motion.div>
  )
}

interface PainCardProps {
  icon: LucideIcon
  statValue: number
  statType: 'percent' | 'multiplier' | 'dollars'
  statSuffix?: string
  label: string
  cost: string
  delay: number
}

const PAIN_CARDS: Omit<PainCardProps, 'delay'>[] = [
  {
    icon: FileSpreadsheet,
    statValue: 67,
    statType: 'percent',
    label: 'of small carriers still dispatch on spreadsheets',
    cost: 'Average 11 hours/week lost to manual data entry',
  },
  {
    icon: PhoneOff,
    statValue: 3.2,
    statType: 'multiplier',
    statSuffix: 'x',
    label: 'more driver turnover when comms are disorganized',
    cost: 'Replacing a driver costs $8,000–$12,000 in recruiting and downtime',
  },
  {
    icon: Clock,
    statValue: 4200,
    statType: 'dollars',
    label: 'average revenue lost per truck per year from unbilled loads',
    cost: 'One missed POD can kill an entire load\'s margin',
  },
]

/**
 * PainCard — Statistics card showing carrier pain points.
 * Contrast pairings used:
 *   --text-primary on --surface-elevated (15.46:1 AAA)
 *   --text-secondary on --surface-elevated (9.20:1 AAA)
 *   --text-tertiary on --surface-elevated (4.61:1 AA)
 *
 * Numbers carry weight through Display-scale typography — no decorative color.
 */
function PainCard({ icon: Icon, statValue, statType, statSuffix, label, cost, delay }: PainCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReducedMotion = useReducedMotion()

  const renderStat = () => {
    const className = "font-display text-4xl sm:text-5xl font-bold mb-2 tnum"
    const style = { color: 'var(--text-primary)' }

    switch (statType) {
      case 'percent':
        return (
          <CountUpPercentage
            end={statValue}
            duration={1500}
            delay={delay * 1000}
            className={className}
            style={style}
          />
        )
      case 'dollars':
        return (
          <CountUpDollars
            end={statValue}
            duration={1500}
            delay={delay * 1000}
            className={className}
            style={style}
          />
        )
      case 'multiplier':
        return (
          <CountUp
            end={statValue}
            decimals={1}
            suffix={statSuffix || 'x'}
            duration={1500}
            delay={delay * 1000}
            className={className}
            style={style}
          />
        )
    }
  }

  return (
    <motion.div
      ref={ref}
      className="relative rounded-lg p-8 border"
      style={{
        backgroundColor: 'var(--surface-elevated)',
        borderColor: 'var(--border-divider)',
      }}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 50, scale: prefersReducedMotion ? 1 : 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: prefersReducedMotion ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Icon in top-left */}
      <div className="absolute top-6 left-6">
        <Icon size={20} style={{ color: 'var(--text-tertiary)' }} />
      </div>

      <div className="pt-8">
        {/* Stat number — Display-scale carries weight, no decorative color */}
        <div style={{ color: 'var(--text-primary)' }}>
          {renderStat()}
        </div>

        {/* Label in primary text */}
        <p
          className="font-body text-base mb-3"
          style={{ color: 'var(--text-primary)' }}
        >
          {label}
        </p>

        {/* Cost in secondary text */}
        <p
          className="font-body text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          {cost}
        </p>
      </div>
    </motion.div>
  )
}

export function ProblemBar() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const prefersReducedMotion = useReducedMotion()

  // TIER 2: Decorative parallax - highway lines move y: 0 → -50px (0.25x speed)
  const { y: decorativeY, shouldAnimate } = useParallax({
    speed: 0.25,
    outputRange: [0, -50],
  })

  // TIER 3: Content micro-parallax for headline (0.5x speed)
  const { y: contentY, shouldAnimate: shouldAnimateContent } = useContentParallax()

  return (
    <section
      ref={sectionRef}
      className="relative z-[1] py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: 'var(--surface-sunken)' }}
    >
      {/* TIER 2: Parallax highway lines (desktop only, respects reduced motion) */}
      {shouldAnimate && <ParallaxHighwayLines y={decorativeY} />}

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        {/* TIER 3: Content with micro-parallax */}
        <motion.div
          className="mb-12 will-change-transform"
          style={shouldAnimateContent ? { y: contentY } : undefined}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            {/* Eyebrow — mono uppercase, brand accent */}
            <p
              className="uppercase tracking-widest text-xs font-mono mb-6"
              style={{ color: 'var(--accent-brand)' }}
            >
              The cost of running blind
            </p>
          </motion.div>
        </motion.div>

        {/* Pain cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PAIN_CARDS.map((card, index) => (
            <PainCard
              key={card.statValue}
              icon={card.icon}
              statValue={card.statValue}
              statType={card.statType}
              statSuffix={card.statSuffix}
              label={card.label}
              cost={card.cost}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
