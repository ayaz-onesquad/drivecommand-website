'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { useRef, useEffect, useState } from 'react'
import { ArrowRight, Shield, Zap, Lock } from 'lucide-react'
import { StatusBadge } from '@/components/shared/status-badge'
import { useIsDesktop } from '@/hooks/use-is-desktop'

// Variant A: Primary filled button with lift + glow + arrow animation
const primaryButtonVariants = {
  rest: { y: 0, boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.25)' },
  hover: { y: -2, boxShadow: '0 8px 25px rgba(59, 130, 246, 0.35)' },
  tap: { y: 0, boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)' },
}

const arrowVariants = {
  rest: { x: 0 },
  hover: { x: 4 },
}

// Variant B: Ghost button with border fill on hover
const ghostButtonVariants = {
  rest: { y: 0 },
  hover: { y: -1 },
}

// Load card data
const loadCards = [
  { id: 2847, route: 'CHI → ATL', status: 'dispatched' as const, rate: '$2,400' },
  { id: 2848, route: 'DAL → LAX', status: 'in-transit' as const, rate: '$3,150' },
  { id: 2849, route: 'NYC → MIA', status: 'delivered' as const, rate: '$1,890' },
]

// Ticker items for live status strip
const tickerItems = [
  'Load #2847 · CHI→ATL · In Transit',
  'Load #2851 · DAL→LAX · Delivered ✓',
  'Load #2855 · NYC→MIA · Dispatched',
  'Load #2860 · DEN→SEA · In Transit',
  'Load #2863 · HOU→PHX · Invoiced $2,400',
]

// Trust badges
const trustBadges = [
  { icon: Shield, label: 'DOT Compliant' },
  { icon: Zap, label: 'Live in 10 Minutes' },
  { icon: Lock, label: 'No Contract' },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isDesktop = useIsDesktop()
  const [mounted, setMounted] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    setMounted(true)
    const cursorTimer = setTimeout(() => setShowCursor(false), 1500)
    return () => clearTimeout(cursorTimer)
  }, [])

  const shouldAnimate = mounted && !prefersReducedMotion
  const shouldParallax = isDesktop && shouldAnimate

  const { scrollY } = useScroll()

  // Parallax transforms - only applied on desktop
  const layer1Y = useTransform(scrollY, [0, 600], [0, -80])
  const layer2Y = useTransform(scrollY, [0, 600], [0, -160])
  const layer3Y = useTransform(scrollY, [0, 600], [0, -240])
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section
      ref={ref}
      data-force-dark
      className="relative min-h-screen flex items-center overflow-hidden texture-asphalt"
    >
      {/* LAYER 1 — FAR BACKGROUND: Highway Interchange SVG (0.15x speed) */}
      <motion.div
        className="absolute inset-0 z-0 will-change-transform"
        style={{ y: shouldParallax ? layer1Y : 0 }}
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
      </motion.div>

      {/* LAYER 2 — Semi-truck silhouette (bottom-right) (0.3x speed) */}
      <motion.div
        className="absolute inset-0 z-10 will-change-transform"
        style={{ y: shouldParallax ? layer2Y : 0 }}
      >
        {/* Geometric semi-truck silhouette */}
        <svg
          className="absolute bottom-16 right-16 opacity-[0.03]"
          width="180"
          height="80"
          viewBox="0 0 180 80"
          fill="rgba(255,255,255,1)"
        >
          {/* Cab */}
          <rect x="0" y="20" width="50" height="50" rx="4" />
          {/* Trailer */}
          <rect x="55" y="10" width="120" height="60" rx="2" />
          {/* Wheels */}
          <circle cx="20" cy="75" r="8" />
          <circle cx="45" cy="75" r="8" />
          <circle cx="100" cy="75" r="8" />
          <circle cx="130" cy="75" r="8" />
        </svg>
      </motion.div>

      {/* LAYER 3 — FOREGROUND: Load Cards (Desktop only) (0.45x speed) */}
      <motion.div
        className="absolute inset-0 z-20 hidden md:block will-change-transform"
        style={{ y: shouldParallax ? layer3Y : 0 }}
      >
        <div className="absolute right-[8%] top-1/2 -translate-y-1/2 flex flex-col gap-4">
          {loadCards.map((card, i) => (
            <motion.div
              key={card.id}
              className="w-44 p-3 rounded-lg backdrop-blur-sm texture-steel border-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: shouldAnimate ? 0.8 + i * 0.2 : 0,
                ease: 'easeOut'
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>Load #{card.id}</span>
                <StatusBadge status={card.status} />
              </div>
              <div className="flex items-center justify-between">
                <span style={{ color: 'var(--text-primary)' }} className="text-sm font-semibold">{card.route}</span>
                <span style={{ color: 'var(--accent-cyan)' }} className="text-sm font-bold">{card.rate}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Gradient overlays for depth blending */}
      <div
        className="absolute inset-0 z-25 opacity-70 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, var(--bg-primary), transparent, var(--bg-primary))' }}
      />
      <div
        className="absolute inset-0 z-25 pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(26, 31, 46, 0.8), transparent, rgba(26, 31, 46, 0.4))' }}
      />

      {/* Content */}
      <motion.div
        className="relative z-30 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full"
        style={{ opacity: shouldParallax ? contentOpacity : 1 }}
      >
        <div className="max-w-xl md:max-w-lg lg:max-w-xl">
          {/* Category label with stripe accent */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: shouldAnimate ? 0.05 : 0 }}
          >
            <span className="stripe-accent" />
            <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--text-secondary)' }}>
              Fleet Management · Dispatch · Compliance
            </p>
          </motion.div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6" style={{ color: 'var(--text-primary)' }}>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: shouldAnimate ? 0.1 : 0 }}
            >
              You Run the Trucks.
            </motion.span>
            <motion.span
              className="block"
              style={{ color: 'var(--accent-load)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: shouldAnimate ? 0.2 : 0 }}
            >
              We Run the Rest.
              {/* Terminal cursor */}
              <motion.span
                className="inline-block w-[3px] h-[0.85em] ml-1 align-middle"
                style={{ backgroundColor: 'var(--accent-cyan)' }}
                initial={{ opacity: 1 }}
                animate={{
                  opacity: showCursor ? [1, 0, 1, 0, 1] : 0
                }}
                transition={{
                  duration: 1.2,
                  times: [0, 0.25, 0.5, 0.75, 1],
                }}
              />
            </motion.span>
          </h1>

          {/* Subheadline */}
          <motion.p
            className="font-body text-lg max-w-[480px] mb-6"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: shouldAnimate ? 0.3 : 0 }}
          >
            DriveCommand gives carrier owners one place for dispatch, GPS, drivers, payroll, and invoicing. No more Excel. No more chasing drivers for paperwork.
          </motion.p>

          {/* Trust badges */}
          <motion.div
            className="flex flex-wrap gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: shouldAnimate ? 0.4 : 0 }}
          >
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border-panel"
                style={{ backgroundColor: 'rgba(45, 55, 72, 0.6)', color: 'var(--text-secondary)' }}
              >
                <badge.icon size={14} />
                <span>{badge.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-start gap-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: shouldAnimate ? 0.5 : 0 }}
          >
            {/* Variant A: Primary CTA with lift + glow + arrow */}
            <motion.div
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              animate="rest"
            >
              <Link href="/contact" className="block">
                <motion.span
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-white font-body font-semibold rounded-lg text-center"
                  style={{ backgroundColor: 'var(--accent-blue)' }}
                  variants={prefersReducedMotion ? {} : primaryButtonVariants}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  Get Early Access
                  <motion.span
                    className="inline-flex"
                    variants={prefersReducedMotion ? {} : arrowVariants}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <ArrowRight size={16} />
                  </motion.span>
                </motion.span>
              </Link>
            </motion.div>

            {/* Variant B: Ghost button with border fill */}
            <motion.div
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={prefersReducedMotion ? {} : ghostButtonVariants}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <Link
                href="#demo"
                className="inline-flex items-center px-7 py-3.5 border-2 font-body font-medium rounded-lg transition-all duration-200 text-center hover:bg-sky-400/10 hover:border-sky-400"
                style={{
                  borderColor: 'var(--accent-cyan)',
                  color: 'var(--accent-cyan)'
                }}
              >
                Watch It Work
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: shouldAnimate ? 0.6 : 0 }}
          >
            <p className="font-body text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
              No credit card · No setup fee · Your fleet live in under 10 minutes
            </p>
            <p className="font-body text-[13px] font-medium" style={{ color: 'var(--accent-cyan)' }}>
              Join 47+ carriers already on early access
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Live Status Ticker */}
      <motion.div
        className="absolute bottom-24 left-0 right-0 z-30 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: shouldAnimate ? 0.7 : 0 }}
      >
        <div
          className="h-8 flex items-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
        >
          <div className="ticker-track">
            {/* Double the items for continuous loop */}
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span
                key={i}
                className="text-xs font-mono whitespace-nowrap px-8"
                style={{ color: 'rgba(148, 163, 184, 0.6)' }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: shouldAnimate ? 0.8 : 0 }}
      >
        <motion.div
          className="w-6 h-10 border-2 rounded-full flex justify-center"
          style={{ borderColor: 'var(--text-muted)' }}
          animate={shouldAnimate ? { y: [0, 8, 0] } : undefined}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full mt-2"
            style={{ backgroundColor: 'var(--text-secondary)' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
