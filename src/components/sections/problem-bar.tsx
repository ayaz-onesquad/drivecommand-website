'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { FileSpreadsheet, PhoneOff, Clock } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useParallax, useContentParallax } from '@/hooks/use-parallax'

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
        {/* Faint horizontal dashed lines suggesting a highway */}
        <line x1="0" y1="30%" x2="100%" y2="30%" stroke="white" strokeOpacity="0.04" strokeWidth="1" strokeDasharray="24 16" />
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="white" strokeOpacity="0.03" strokeWidth="1" strokeDasharray="24 16" />
        <line x1="0" y1="70%" x2="100%" y2="70%" stroke="white" strokeOpacity="0.04" strokeWidth="1" strokeDasharray="24 16" />
      </svg>
    </motion.div>
  )
}

interface PainCardProps {
  icon: LucideIcon
  stat: string
  label: string
  cost: string
  delay: number
}

const PAIN_CARDS: Omit<PainCardProps, 'delay'>[] = [
  {
    icon: FileSpreadsheet,
    stat: '67%',
    label: 'of small carriers still dispatch on spreadsheets',
    cost: 'Average 11 hours/week lost to manual data entry',
  },
  {
    icon: PhoneOff,
    stat: '3.2x',
    label: 'more driver turnover when comms are disorganized',
    cost: 'Replacing a driver costs $8,000–$12,000 in recruiting and downtime',
  },
  {
    icon: Clock,
    stat: '$4,200',
    label: 'average revenue lost per truck per year from unbilled loads',
    cost: 'One missed POD can kill an entire load\'s margin',
  },
]

function PainCard({ icon: Icon, stat, label, cost, delay }: PainCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className="relative texture-steel border-panel rounded-xl p-6"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : delay }}
    >
      {/* Icon in top-left */}
      <div className="absolute top-4 left-4">
        <Icon size={20} style={{ color: 'var(--text-muted)' }} />
      </div>

      <div className="pt-6">
        {/* Stat number in stripe yellow */}
        <div
          className="font-display text-4xl sm:text-5xl font-bold mb-2"
          style={{ color: 'var(--accent-stripe)' }}
        >
          {stat}
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
      className="relative z-[1] py-20 overflow-hidden"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      {/* TIER 2: Parallax highway lines (desktop only, respects reduced motion) */}
      {shouldAnimate && <ParallaxHighwayLines y={decorativeY} />}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            {/* Section header with stripe accent */}
            <span className="stripe-accent" />
            <p
              className="uppercase tracking-widest text-xs font-mono"
              style={{ color: 'var(--text-secondary)' }}
            >
              The Cost of Running Blind
            </p>
          </motion.div>
        </motion.div>

        {/* Pain cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PAIN_CARDS.map((card, index) => (
            <PainCard
              key={card.stat}
              icon={card.icon}
              stat={card.stat}
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
