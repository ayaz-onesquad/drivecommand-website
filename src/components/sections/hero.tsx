'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { useRef, useEffect, useState } from 'react'
import { ArrowRight, Shield, Zap, Lock } from 'lucide-react'
import { StatusBadge } from '@/components/shared/status-badge'
import { useIsDesktop } from '@/hooks/use-is-desktop'

// Emil Kowalski's custom easing curves for punchy animations
const easeOutStrong: [number, number, number, number] = [0.23, 1, 0.32, 1]
const easeInOutStrong: [number, number, number, number] = [0.77, 0, 0.175, 1]

// Variant A: Primary filled button with lift + glow + arrow animation
const primaryButtonVariants = {
  rest: { y: 0, boxShadow: '0 10px 15px -3px rgba(117, 240, 212, 0.25)' },
  hover: { y: -2, boxShadow: '0 8px 25px rgba(117, 240, 212, 0.35)' },
  tap: { y: 0, scale: 0.97, boxShadow: '0 4px 12px rgba(117, 240, 212, 0.2)' },
}

const arrowVariants = {
  rest: { x: 0 },
  hover: { x: 4 },
}

// Variant B: Ghost button with border fill on hover
const ghostButtonVariants = {
  rest: { y: 0, scale: 1 },
  hover: { y: -1, scale: 1 },
  tap: { y: 0, scale: 0.97 },
}

// Load card data
const loadCards = [
  { id: 2847, route: 'CHI → ATL', status: 'dispatched' as const, rate: '$2,400' },
  { id: 2848, route: 'DAL → LAX', status: 'in-transit' as const, rate: '$3,150' },
  { id: 2849, route: 'NYC → MIA', status: 'delivered' as const, rate: '$1,890' },
]

// Ticker items for live status strip
const tickerItems = [
  { text: 'Load #2847 · CHI→ATL · In Transit', status: 'in-transit' },
  { text: 'Load #2851 · DAL→LAX · Delivered', status: 'delivered' },
  { text: 'Load #2855 · NYC→MIA · Dispatched', status: 'dispatched' },
  { text: 'Load #2860 · DEN→SEA · In Transit', status: 'in-transit' },
  { text: 'Load #2863 · HOU→PHX · Invoiced $2,400', status: 'invoiced' },
]

// Trust badges
const trustBadges = [
  { icon: Shield, label: 'DOT Compliant' },
  { icon: Zap, label: 'Live in 10 Minutes' },
  { icon: Lock, label: 'No Contract' },
]

// Status dot colors
const statusDotColors: Record<string, string> = {
  'in-transit': 'bg-amber-500',
  'delivered': 'bg-green-500',
  'dispatched': 'bg-indigo-500',
  'invoiced': 'bg-white',
}

// Route paths for animated map (simplified curved paths)
const routePaths = [
  { id: 'chi-atl', d: 'M160,80 Q200,100 220,140', color: 'var(--color-brand)' },
  { id: 'dal-lax', d: 'M140,120 Q100,130 60,110', color: 'var(--color-status-dispatched)' },
  { id: 'nyc-mia', d: 'M280,60 Q290,100 260,160', color: 'var(--color-live-green)' },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isDesktop = useIsDesktop()
  const [mounted, setMounted] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const [pathLengths, setPathLengths] = useState<Record<string, number>>({})

  useEffect(() => {
    setMounted(true)
    const cursorTimer = setTimeout(() => setShowCursor(false), 1500)
    return () => clearTimeout(cursorTimer)
  }, [])

  // Calculate path lengths for animation
  useEffect(() => {
    const lengths: Record<string, number> = {}
    routePaths.forEach(route => {
      const path = document.getElementById(`route-path-${route.id}`)
      if (path instanceof SVGPathElement) {
        lengths[route.id] = path.getTotalLength()
      }
    })
    setPathLengths(lengths)
  }, [mounted])

  const shouldAnimate = mounted && !prefersReducedMotion
  const shouldParallax = isDesktop && shouldAnimate

  const { scrollY } = useScroll()

  // Parallax transforms - only applied on desktop
  const dotGridY = useTransform(scrollY, [0, 600], [0, -180]) // 0.3x
  const glowY = useTransform(scrollY, [0, 600], [0, -360]) // 0.6x
  const dashboardY = useTransform(scrollY, [0, 600], [0, -510]) // 0.85x
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section
      ref={ref}
      data-force-dark
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg-dark)' }}
    >
      {/* LAYER 1 — Base color */}
      <div className="absolute inset-0 z-0" style={{ backgroundColor: 'var(--color-bg-dark)' }} />

      {/* LAYER 2 — Animated dot-grid */}
      <motion.div
        className="absolute inset-0 z-10 will-change-transform animate-dot-grid-drift"
        style={{
          y: shouldParallax ? dotGridY : 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* LAYER 3 — Radial gradient glows */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none will-change-transform"
        style={{ y: shouldParallax ? glowY : 0 }}
      >
        {/* Mint glow behind headline */}
        <div
          className="absolute"
          style={{
            left: '20%',
            top: '40%',
            width: '600px',
            height: '600px',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(117, 240, 212, 0.15) 0%, transparent 70%)',
          }}
        />
        {/* Brand deep-blue glow behind dashboard */}
        <div
          className="absolute"
          style={{
            right: '20%',
            top: '50%',
            width: '600px',
            height: '600px',
            transform: 'translate(50%, -50%)',
            background: 'radial-gradient(circle, rgba(33, 101, 127, 0.1) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* LAYER 4 — Noise texture overlay */}
      <div
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* Content Grid */}
      <motion.div
        className="relative z-40 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-12"
        style={{ opacity: shouldParallax ? contentOpacity : 1 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-12 items-center">
          {/* Left Column — Copy */}
          <div className="max-w-xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: easeOutStrong, delay: shouldAnimate ? 0.1 : 0 }}
            >
              <span className="stripe-accent" />
              <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--text-secondary)' }}>
                Fleet Management · Dispatch · Compliance
              </p>
            </motion.div>

            {/* Headline */}
            <h1 className="font-headline text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6" style={{ color: 'var(--text-primary)' }}>
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: easeOutStrong, delay: shouldAnimate ? 0.2 : 0 }}
              >
                You Run the Trucks.
              </motion.span>
              <motion.span
                className="block animate-headline-glow"
                style={{ color: 'var(--color-accent)' }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: easeOutStrong, delay: shouldAnimate ? 0.32 : 0 }}
              >
                We Run the Rest.
                {/* Terminal cursor */}
                <motion.span
                  className="inline-block w-[3px] h-[0.85em] ml-1 align-middle"
                  style={{ backgroundColor: 'var(--color-accent)' }}
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
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: easeOutStrong, delay: shouldAnimate ? 0.44 : 0 }}
            >
              DriveCommand gives carrier owners one place for dispatch, GPS, drivers, payroll, and invoicing. No more Excel. No more chasing drivers for paperwork.
            </motion.p>

            {/* Trust badges - staggered entry */}
            <motion.div
              className="flex flex-wrap gap-3 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: shouldAnimate ? 0.5 : 0 }}
            >
              {trustBadges.map((badge, i) => (
                <motion.div
                  key={badge.label}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border-panel"
                  style={{ backgroundColor: 'rgba(45, 55, 72, 0.6)', color: 'var(--text-secondary)' }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: easeOutStrong, delay: shouldAnimate ? 0.52 + i * 0.06 : 0 }}
                >
                  <badge.icon size={14} />
                  <span>{badge.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-start gap-4 mb-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: easeOutStrong, delay: shouldAnimate ? 0.64 : 0 }}
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
                    className="inline-flex items-center gap-2 px-7 py-3.5 font-body font-semibold rounded-lg text-center"
                    style={{
                      backgroundColor: 'var(--color-accent)',
                      color: 'var(--color-text-on-accent)'
                    }}
                    variants={prefersReducedMotion ? {} : primaryButtonVariants}
                    transition={{ duration: 0.16, ease: easeOutStrong }}
                  >
                    Get Early Access
                    <motion.span
                      className="inline-flex"
                      variants={prefersReducedMotion ? {} : arrowVariants}
                      transition={{ duration: 0.16, ease: easeOutStrong }}
                    >
                      <ArrowRight size={16} />
                    </motion.span>
                  </motion.span>
                </Link>
              </motion.div>

              {/* Variant B: Ghost button with border fill + press feedback */}
              <motion.div
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                animate="rest"
                variants={prefersReducedMotion ? {} : ghostButtonVariants}
                transition={{ duration: 0.16, ease: easeOutStrong }}
              >
                <Link
                  href="#demo"
                  className="inline-flex items-center px-7 py-3.5 border-2 font-body font-medium rounded-lg transition-colors duration-150 text-center"
                  style={{
                    borderColor: 'var(--color-accent)',
                    color: 'var(--color-accent)'
                  }}
                >
                  Watch It Work
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column — Dashboard Panel */}
          <motion.div
            className="relative will-change-transform"
            style={{ y: shouldParallax ? dashboardY : 0 }}
            initial={{ opacity: 0, x: 24, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: easeOutStrong, delay: shouldAnimate ? 0.25 : 0 }}
          >
            <div
              className="rounded-xl overflow-hidden"
              style={{
                border: '1px solid var(--color-border)',
                background: 'rgba(22, 32, 46, 0.9)',
                boxShadow: '0 25px 50px -12px rgba(117, 240, 212, 0.15), 0 0 0 1px rgba(117, 240, 212, 0.05)',
              }}
            >
              {/* Title bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/50">
                <div className="flex items-center gap-2">
                  {/* Mock window controls */}
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-xs text-gray-400 ml-2">DriveCommand — Active Loads</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-live-pulse" />
                  <span className="text-xs text-green-400 font-mono">LIVE</span>
                </div>
              </div>

              {/* Route map SVG - hidden on mobile */}
              <div className="hidden md:block p-4 border-b border-slate-700/30">
                <svg viewBox="0 0 340 180" className="w-full h-auto">
                  {/* Simplified continental US outline (very subtle) */}
                  <path
                    d="M20,100 Q60,40 160,50 Q260,60 300,80 Q320,100 300,140 Q240,160 160,150 Q80,140 40,120 Q20,110 20,100"
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                  />

                  {/* City markers */}
                  <g fill="rgba(255,255,255,0.3)" fontSize="8">
                    <circle cx="160" cy="80" r="3" /> {/* CHI */}
                    <text x="165" y="75" className="fill-slate-500">CHI</text>
                    <circle cx="220" cy="140" r="3" /> {/* ATL */}
                    <text x="225" y="135" className="fill-slate-500">ATL</text>
                    <circle cx="140" cy="120" r="3" /> {/* DAL */}
                    <text x="125" y="130" className="fill-slate-500">DAL</text>
                    <circle cx="60" cy="110" r="3" /> {/* LAX */}
                    <text x="45" y="105" className="fill-slate-500">LAX</text>
                    <circle cx="280" cy="60" r="3" /> {/* NYC */}
                    <text x="285" y="55" className="fill-slate-500">NYC</text>
                    <circle cx="260" cy="160" r="3" /> {/* MIA */}
                    <text x="265" y="155" className="fill-slate-500">MIA</text>
                  </g>

                  {/* Route paths with draw animation */}
                  {routePaths.map((route, i) => (
                    <motion.path
                      key={route.id}
                      id={`route-path-${route.id}`}
                      d={route.d}
                      fill="none"
                      stroke={route.color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{
                        strokeDasharray: pathLengths[route.id] || 200,
                        strokeDashoffset: pathLengths[route.id] || 200
                      }}
                      animate={{
                        strokeDashoffset: 0
                      }}
                      transition={{
                        duration: 1.2,
                        delay: shouldAnimate ? 0.4 + i * 0.2 : 0,
                        ease: easeInOutStrong
                      }}
                    />
                  ))}

                  {/* Truck dots traveling along paths */}
                  {routePaths.map((route, i) => (
                    <motion.circle
                      key={`truck-${route.id}`}
                      r="5"
                      fill={route.color}
                      filter="url(#glow)"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25, ease: easeOutStrong, delay: shouldAnimate ? 1.2 + i * 0.2 : 0 }}
                    >
                      <animateMotion
                        dur="8s"
                        repeatCount="indefinite"
                        begin={shouldAnimate ? `${1.5 + i * 0.3}s` : '0s'}
                      >
                        <mpath xlinkHref={`#route-path-${route.id}`} />
                      </animateMotion>
                    </motion.circle>
                  ))}

                  {/* Glow filter for truck dots */}
                  <defs>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                </svg>
              </div>

              {/* Load cards - tighter stagger for cohesive feel */}
              <div className="p-4 space-y-3">
                {loadCards.map((card, i) => (
                  <motion.div
                    key={card.id}
                    className="p-3 rounded-lg cursor-pointer"
                    style={{
                      backgroundColor: 'rgba(30, 37, 51, 0.8)',
                      border: '1px solid rgba(42, 58, 80, 0.5)',
                    }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={prefersReducedMotion ? {} : {
                      y: -2,
                      backgroundColor: 'rgba(30, 37, 51, 0.95)',
                      borderColor: 'rgba(117, 240, 212, 0.3)'
                    }}
                    whileTap={prefersReducedMotion ? {} : { y: 0, scale: 0.98 }}
                    transition={{
                      duration: 0.16,
                      delay: shouldAnimate ? 0.55 + i * 0.1 : 0,
                      ease: easeOutStrong
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-slate-400">Load #{card.id}</span>
                      <StatusBadge status={card.status} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-200">{card.route}</span>
                      <span className="text-sm font-bold text-blue-400">{card.rate}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Live Status Ticker */}
      <motion.div
        className="absolute bottom-24 left-0 right-0 z-40 overflow-hidden"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: easeOutStrong, delay: shouldAnimate ? 0.6 : 0 }}
      >
        <div
          className="h-10 flex items-center border-t"
          style={{
            backgroundColor: 'rgb(15, 23, 42)',
            borderColor: 'rgb(30, 41, 59)'
          }}
        >
          {/* LIVE FEED label */}
          <div className="flex items-center gap-2 px-4 border-r border-slate-800 h-full">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-red-pulse" />
            <span className="text-xs font-mono uppercase text-red-400 tracking-wider">Live Feed</span>
          </div>

          {/* Ticker track */}
          <div className="flex-1 overflow-hidden">
            <div className="ticker-track">
              {/* Double the items for continuous loop */}
              {[...tickerItems, ...tickerItems].map((item, i) => (
                <span
                  key={i}
                  className="flex items-center gap-2 text-xs font-mono whitespace-nowrap px-6 text-white"
                >
                  <span className={`w-2 h-2 rounded-full ${statusDotColors[item.status]}`} />
                  {item.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: easeOutStrong, delay: shouldAnimate ? 0.85 : 0 }}
      >
        <motion.div
          className="w-6 h-10 border-2 rounded-full flex justify-center"
          style={{ borderColor: 'var(--color-text-muted)' }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full mt-2"
            style={{ backgroundColor: 'var(--color-text-secondary)' }}
            animate={shouldAnimate ? { y: [0, 16, 0] } : undefined}
            transition={{ duration: 2, ease: easeInOutStrong, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
