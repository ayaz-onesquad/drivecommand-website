'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { InteractiveDemo } from '@/components/sections/interactive-demo'

// Sparse animated route lines for background (reused from final-cta)
function RouteLineBackground({ animate }: { animate: boolean }) {
  const routes = [
    { path: 'M0,150 Q300,80 600,150 T1200,150', delay: 0 },
    { path: 'M0,280 Q400,350 800,280 T1200,280', delay: 1 },
    { path: 'M0,400 Q350,330 700,400 T1200,400', delay: 2 },
  ]

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1200 500"
      preserveAspectRatio="xMidYMid slice"
    >
      {routes.map((route, i) => (
        <g key={i}>
          {/* Static base line */}
          <path
            d={route.path}
            stroke="var(--accent-blue)"
            strokeWidth="1"
            fill="none"
            opacity="0.08"
            strokeDasharray="8 6"
          />
          {/* Animated overlay */}
          {animate ? (
            <motion.path
              d={route.path}
              stroke={i % 2 === 0 ? 'var(--accent-blue)' : 'var(--accent-cyan)'}
              strokeWidth="2"
              fill="none"
              opacity="0.12"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 4,
                delay: route.delay,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'loop',
                repeatDelay: 2,
              }}
            />
          ) : (
            <path
              d={route.path}
              stroke={i % 2 === 0 ? 'var(--accent-blue)' : 'var(--accent-cyan)'}
              strokeWidth="2"
              fill="none"
              opacity="0.08"
            />
          )}
        </g>
      ))}
    </svg>
  )
}

// Route-line divider (reused from problem-bar)
function CyanRouteDivider({ animate }: { animate: boolean }) {
  return (
    <div className="relative h-1 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 1200 4" preserveAspectRatio="none">
        {/* Static dashed base line */}
        <line
          x1="0" y1="2" x2="1200" y2="2"
          stroke="var(--accent-cyan)"
          strokeWidth="2"
          strokeDasharray="12 8"
          opacity="0.3"
        />
        {/* Animated solid overlay */}
        {animate ? (
          <motion.line
            x1="0" y1="2" x2="1200" y2="2"
            stroke="var(--accent-cyan)"
            strokeWidth="3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        ) : (
          <line
            x1="0" y1="2" x2="1200" y2="2"
            stroke="var(--accent-cyan)"
            strokeWidth="3"
            opacity="0.6"
          />
        )}
      </svg>
    </div>
  )
}

export function DemoPageContent() {
  const prefersReducedMotion = useReducedMotion()
  const shouldAnimate = !prefersReducedMotion

  return (
    <main className="min-h-screen bg-theme-primary">
      {/* Hero section */}
      <section className="relative pt-32 pb-16 px-4 bg-theme-primary overflow-hidden">
        {/* Route line background */}
        <div className="absolute inset-0 hidden md:block">
          <RouteLineBackground animate={shouldAnimate} />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl">
          {/* Left-aligned on desktop, centered on mobile */}
          <div className="text-center md:text-left">
            <motion.h1
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-theme-primary mb-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              See DriveCommand In Action
            </motion.h1>

            {/* Accent line */}
            <motion.div
              className="w-12 h-0.5 mb-6 mx-auto md:mx-0"
              style={{ backgroundColor: 'var(--accent-cyan)' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />

            <motion.p
              className="font-body text-lg text-theme-secondary max-w-2xl mx-auto md:mx-0"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              Step through a real dispatch day — from load assignment to invoice — in under 5 minutes.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Route-line divider */}
      <CyanRouteDivider animate={shouldAnimate} />

      {/* Interactive Demo - wrapped in clean card background */}
      <section className="bg-theme-secondary">
        <InteractiveDemo />
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-theme-primary">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-theme-primary mb-4">
            Ready to Run Your Fleet Smarter?
          </h2>
          <p className="font-body text-lg text-theme-secondary max-w-2xl mx-auto mb-8">
            Request early access today. No credit card required.
            Get up and running in under 5 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex justify-center px-8 py-4 text-white font-body font-medium rounded-lg transition-colors shadow-lg bg-accent-blue hover:bg-accent-blue-hover"
              style={{ boxShadow: '0 10px 15px -3px var(--glow-blue)' }}
            >
              Request Access
            </Link>
            <Link
              href="/contact"
              className="inline-flex justify-center px-8 py-4 border text-theme-primary font-body font-medium rounded-lg transition-colors border-theme-medium hover:border-theme-primary hover:bg-theme-card"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
