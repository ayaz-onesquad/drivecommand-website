'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { useIsDesktop } from '@/hooks/use-is-desktop'
import { useContentParallax, useParallax } from '@/hooks/use-parallax'

// Variant A: Primary filled button with lift + glow + arrow animation
const primaryButtonVariants = {
  rest: { y: 0, boxShadow: '0 10px 15px -3px rgba(10, 33, 192, 0.25)' },
  hover: { y: -2, boxShadow: '0 8px 25px rgba(10, 33, 192, 0.35)' },
  tap: { y: 0, boxShadow: '0 4px 12px rgba(10, 33, 192, 0.2)' },
}

const arrowVariants = {
  rest: { opacity: 0, x: -4 },
  hover: { opacity: 1, x: 0 },
}

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isDesktop = useIsDesktop()
  const shouldAnimate = !prefersReducedMotion

  // TIER 2: Route lines drift upward at 0.2x scroll speed
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const routeY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const shouldParallax = isDesktop && shouldAnimate

  // TIER 3: Content micro-parallax (0.5x speed)
  const { y: contentY, shouldAnimate: shouldAnimateContent } = useContentParallax()

  return (
    <>
      {/* Road divider above section */}
      <hr className="divider-road" />

      <section
        ref={ref}
        className="relative z-[1] py-32 overflow-hidden texture-asphalt"
      >
        {/* TIER 2: Highway interchange background SVG - same as hero (0.2x speed) */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ y: shouldParallax ? routeY : undefined }}
        >
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Highway interchange pattern - top-down stylized view */}
            <g stroke="rgba(255,255,255,0.04)" strokeWidth="4" fill="none">
              {/* Main horizontal road */}
              <line x1="0" y1="450" x2="1440" y2="450" />
              {/* Main vertical road */}
              <line x1="720" y1="0" x2="720" y2="900" />
              {/* Curved interchange ramps */}
              <path d="M720,450 Q900,450 900,270" />
              <path d="M720,450 Q540,450 540,630" />
              <path d="M720,450 Q720,270 900,270" />
              <path d="M720,450 Q720,630 540,630" />
            </g>
            {/* Center dashed lines */}
            <g stroke="rgba(255,255,255,0.06)" strokeWidth="2" strokeDasharray="12 8" fill="none">
              <line x1="0" y1="450" x2="1440" y2="450" />
              <line x1="720" y1="0" x2="720" y2="900" />
            </g>
          </svg>

          {/* Subtle center glow */}
          {shouldParallax && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]">
              <div
                className="absolute inset-0 rounded-full blur-[100px] animate-glow-pulse"
                style={{ backgroundColor: 'var(--color-glow-accent)' }}
              />
            </div>
          )}
        </motion.div>

        {/* Mobile static background */}
        {!isDesktop && (
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64">
              <div className="absolute inset-0 rounded-full blur-3xl" style={{ backgroundColor: 'var(--color-glow-accent)' }} />
            </div>
          </div>
        )}

        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          {/* TIER 3: Content with micro-parallax (0.5x speed) */}
          <motion.div
            className="will-change-transform"
            style={shouldAnimateContent ? { y: contentY } : undefined}
          >
            <motion.h2
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
              style={{ color: 'var(--text-primary)' }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
            >
              Your Fleet. Fully In Command.
            </motion.h2>

            <motion.p
              className="font-body text-lg sm:text-xl mb-10 max-w-xl mx-auto"
              style={{ color: 'var(--text-secondary)' }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: shouldAnimate ? 0.15 : 0 }}
            >
              Join the carriers replacing 5 tools with one. Early access is open — no contract, no credit card.
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: shouldAnimate ? 0.3 : 0 }}
          >
            {/* Variant A: Primary CTA with lift + glow + arrow */}
            <motion.div
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              animate="rest"
              className="w-full sm:w-auto"
            >
              <Link href="/contact" className="block">
                <motion.span
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 font-body font-medium text-lg rounded-lg bg-dc-accent text-dc-text-on-accent"
                  variants={prefersReducedMotion ? {} : primaryButtonVariants}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  Get Early Access
                  <motion.span
                    className="inline-flex"
                    variants={prefersReducedMotion ? {} : arrowVariants}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <ArrowRight size={18} />
                  </motion.span>
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.p
            className="mt-4 font-body text-sm"
            style={{ color: 'var(--color-text-muted)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: shouldAnimate ? 0.35 : 0 }}
          >
            Reviewed within 1 business day · Cancel anytime · DOT-compliant from day one
          </motion.p>
        </div>
      </section>
    </>
  )
}
