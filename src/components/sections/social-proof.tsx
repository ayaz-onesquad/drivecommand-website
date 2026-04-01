'use client'

import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import { CheckCircle } from 'lucide-react'
import { useParallax, useContentParallax } from '@/hooks/use-parallax'
import { AnimatedQuoteMark } from '@/components/shared/animated-icon'

// TIER 2: Giant quotation marks that move with parallax
function ParallaxQuoteMarks({ y }: { y: ReturnType<typeof useParallax>['y'] }) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden will-change-transform"
      style={{ y }}
      aria-hidden="true"
    >
      {/* Large quote mark - left side */}
      <svg
        className="absolute top-20 left-[10%] w-48 h-48 opacity-[0.08]"
        style={{ color: 'var(--text-muted)' }}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>

      {/* Large quote mark - right side (closing) */}
      <svg
        className="absolute bottom-32 right-[10%] w-40 h-40 opacity-[0.06] rotate-180"
        style={{ color: 'var(--text-muted)' }}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
    </motion.div>
  )
}

// Role badge with initials
function RoleBadge({ initials, role }: { initials: string; role: string }) {
  const roleColors: Record<string, string> = {
    'Owner-Operator': 'bg-sky-400',
    'Fleet Manager': 'bg-brand-blue',
    'Safety Director': 'bg-brand-green',
  }

  const bgColor = roleColors[role] || 'bg-slate-500'

  return (
    <div
      className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center shadow-lg`}
    >
      <span className="font-display font-bold text-white text-sm">
        {initials}
      </span>
    </div>
  )
}

const TESTIMONIALS = [
  {
    initials: 'MT',
    name: 'Marcus T.',
    role: 'Owner-Operator',
    fleetInfo: '7 trucks, Tennessee',
    quote:
      "I used to spend Sunday nights updating spreadsheets for Monday dispatch. Now I open DriveCommand on my phone and everything's already there. We haven't missed a pickup in 4 months.",
  },
  {
    initials: 'DR',
    name: 'Diane R.',
    role: 'Fleet Manager',
    fleetInfo: '18 trucks, Texas',
    quote:
      "Our invoicing used to take 3 days after delivery. Now it's same-day because the POD uploads automatically. We collected $22k faster in the first month alone.",
  },
  {
    initials: 'RK',
    name: 'Ray K.',
    role: 'Safety Director',
    fleetInfo: '34 trucks, Ohio',
    quote:
      "We had a driver HOS violation that cost us $11,000 in fines. After DriveCommand, our compliance rate is 100%. The alerts catch everything before it becomes a problem.",
  },
]

export function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const prefersReducedMotion = useReducedMotion()

  // TIER 2: Decorative parallax - quote marks move y: 0 → -30px (0.25x speed)
  const { y: decorativeY, shouldAnimate } = useParallax({
    speed: 0.15,
    outputRange: [0, -30],
  })

  // TIER 3: Content micro-parallax for headline (0.5x speed)
  const { y: contentY, shouldAnimate: shouldAnimateContent } = useContentParallax()

  return (
    <section
      ref={sectionRef}
      className="relative z-[1] py-24 overflow-hidden"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      {/* TIER 2: Parallax quote marks (desktop only, respects reduced motion) */}
      {shouldAnimate && <ParallaxQuoteMarks y={decorativeY} />}

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
            <h2
              className="font-display text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Carriers Running on DriveCommand
            </h2>
          </motion.div>
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="relative rounded-xl p-6 shadow-sm texture-steel border-panel"
              initial={{
                opacity: 0,
                x: prefersReducedMotion ? 0 : index % 2 === 0 ? -30 : 30,
              }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: prefersReducedMotion ? 0 : index * 0.1,
              }}
              whileHover={
                prefersReducedMotion
                  ? {}
                  : {
                      scale: 1.02,
                      boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.15)',
                    }
              }
            >
              {/* Animated quote mark with draw-path effect */}
              <AnimatedQuoteMark
                className="absolute -top-2 -left-2 w-10 h-10"
                staggerDelay={index * 0.15}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <RoleBadge initials={testimonial.initials} role={testimonial.role} />
                  <div>
                    <div
                      className="font-display font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {testimonial.name}
                    </div>
                    <div
                      className="font-body text-sm font-medium"
                      style={{ color: 'var(--accent-cyan)' }}
                    >
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <p
                  className="font-body mb-4 leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className="font-body text-sm"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {testimonial.fleetInfo}
                  </span>
                  {/* Verified Carrier badge */}
                  <span
                    className="flex items-center gap-1 text-xs font-medium"
                    style={{ color: 'var(--accent-signal)' }}
                  >
                    <CheckCircle size={14} />
                    Verified Carrier
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
