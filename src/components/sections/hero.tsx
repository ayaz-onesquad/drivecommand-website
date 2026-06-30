'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { useRef, useEffect, useState, FormEvent } from 'react'
import { ArrowRight, Shield, Zap, Lock, Mail, Loader2, CheckCircle2 } from 'lucide-react'
import { StatusBadge } from '@/components/shared/status-badge'
import { useIsDesktop } from '@/hooks/use-is-desktop'
import { useWaitlist } from '@/hooks/use-waitlist'
import { WaitlistModal } from './waitlist-modal'
import { RouteMap } from './route-map'

// Brand guide (pg 16B): cubic-out 0.22, 1 - nothing bounces
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const easeOutBrand: [number, number, number, number] = [0.22, 1, 0.22, 1]
// Legacy easing kept for backward compat
const easeOutStrong: [number, number, number, number] = [0.23, 1, 0.32, 1]
const easeInOutStrong: [number, number, number, number] = [0.77, 0, 0.175, 1]

// Variant A: Primary filled button with lift + glow + arrow animation
const primaryButtonVariants = {
  rest: { y: 0, boxShadow: '0 10px 15px -3px rgba(0, 102, 204, 0.25)' },
  hover: { y: -2, boxShadow: '0 8px 25px rgba(0, 102, 204, 0.35)' },
  tap: { y: 0, scale: 0.97, boxShadow: '0 4px 12px rgba(0, 102, 204, 0.2)' },
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

// Status dot colors - using inline styles for semantic state colors
const getStatusDotStyle = (status: string): React.CSSProperties => {
  switch (status) {
    case 'in-transit':
      return { backgroundColor: 'var(--state-warning)' }
    case 'delivered':
      return { backgroundColor: 'var(--state-success)' }
    case 'dispatched':
      return { backgroundColor: 'var(--state-info)' }
    case 'invoiced':
      return { backgroundColor: 'var(--text-primary)' }
    default:
      return { backgroundColor: 'var(--state-info)' }
  }
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isDesktop = useIsDesktop()
  const [mounted, setMounted] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  // Waitlist hook for modal flow
  const waitlist = useWaitlist()

  // Local email state for initial form
  const [email, setEmail] = useState('')
  const [isValidating, setIsValidating] = useState(false)
  const [emailError, setEmailError] = useState('')

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setEmailError('')

    // Basic email validation
    if (!email || !email.includes('@') || !email.includes('.')) {
      setEmailError('Please enter a valid email')
      return
    }

    setIsValidating(true)

    // Small delay for feedback before opening modal
    await new Promise(resolve => setTimeout(resolve, 200))

    setIsValidating(false)
    waitlist.openModal(email)
  }

  useEffect(() => {
    setMounted(true)
    const cursorTimer = setTimeout(() => setShowCursor(false), 1500)
    return () => clearTimeout(cursorTimer)
  }, [])

  const shouldAnimate = mounted && !prefersReducedMotion
  const shouldParallax = isDesktop && shouldAnimate

  const { scrollY } = useScroll()

  // Parallax transforms - only applied on desktop
  const dotGridY = useTransform(scrollY, [0, 600], [0, -180]) // 0.3x
  const glowY = useTransform(scrollY, [0, 600], [0, -360]) // 0.6x
  const dashboardY = useTransform(scrollY, [0, 600], [0, -510]) // 0.85x
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0])

  // Track if user has successfully joined the waitlist
  const hasJoined = waitlist.state.step === 'success'

  return (
    <>
      <section
        ref={ref}
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ backgroundColor: 'var(--surface-base)' }}
      >
        {/* LAYER 1 — Base color */}
        <div className="absolute inset-0 z-0" style={{ backgroundColor: 'var(--surface-base)' }} />

        {/* LAYER 2 — Animated dot-grid (theme-aware) */}
        <motion.div
          className="absolute inset-0 z-10 will-change-transform animate-dot-grid-drift"
          style={{
            y: shouldParallax ? dotGridY : 0,
            backgroundImage: 'radial-gradient(circle, var(--pattern-dot-strong) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* LAYER 3 — Radial gradient glows (theme-aware) */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none will-change-transform"
          style={{ y: shouldParallax ? glowY : 0 }}
        >
          {/* Brand glow behind headline */}
          <div
            className="absolute"
            style={{
              left: '20%',
              top: '40%',
              width: '600px',
              height: '600px',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, var(--pattern-glow-strong) 0%, transparent 70%)',
            }}
          />
          {/* Brand glow behind dashboard */}
          <div
            className="absolute"
            style={{
              right: '20%',
              top: '50%',
              width: '600px',
              height: '600px',
              transform: 'translate(50%, -50%)',
              background: 'radial-gradient(circle, var(--pattern-glow) 0%, transparent 70%)',
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
          className="relative z-40 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full pt-12 pb-24"
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
              <h1 className="font-headline text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-4" style={{ color: 'var(--text-primary)' }}>
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
                  style={{ color: 'var(--accent-brand)' }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: easeOutStrong, delay: shouldAnimate ? 0.32 : 0 }}
                >
                  We Run the Rest.
                  {/* Terminal cursor */}
                  <motion.span
                    className="inline-block w-[3px] h-[0.85em] ml-1 align-middle"
                    style={{ backgroundColor: 'var(--accent-brand)' }}
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

              {/* Tagline: "Miles Ahead." - per brand guide page 4 */}
              <motion.p
                className="font-display text-2xl sm:text-3xl font-semibold mb-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: easeOutStrong, delay: shouldAnimate ? 0.38 : 0 }}
              >
                <span style={{ color: 'var(--text-primary)' }}>Miles </span>
                <span style={{ color: 'var(--accent-brand)' }}>Ahead.</span>
              </motion.p>

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
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
                    style={{
                      backgroundColor: 'var(--surface-elevated)',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border-subtle)'
                    }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: easeOutStrong, delay: shouldAnimate ? 0.52 + i * 0.06 : 0 }}
                  >
                    <badge.icon size={14} />
                    <span>{badge.label}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Waitlist Form - Step 1: Email capture */}
              <motion.div
                className="mb-4 w-full max-w-md relative"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: easeOutStrong, delay: shouldAnimate ? 0.64 : 0 }}
              >
                {/* Subtle glow behind form */}
                <div
                  className="absolute -inset-2 rounded-xl blur-xl opacity-30 pointer-events-none"
                  style={{ backgroundColor: hasJoined ? 'var(--state-success)' : 'var(--accent-brand)' }}
                />

                {hasJoined ? (
                  /* Success State */
                  <motion.div
                    className="relative p-4 rounded-xl flex items-center gap-3"
                    style={{
                      backgroundColor: 'var(--state-success-tint)',
                      border: '2px solid var(--state-success)',
                    }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: easeOutStrong }}
                  >
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'var(--state-success)' }}
                    >
                      <CheckCircle2 size={24} style={{ color: 'var(--text-on-brand)' }} />
                    </div>
                    <div>
                      <p className="font-body font-semibold" style={{ color: 'var(--text-primary)' }}>
                        You&apos;re on the list!
                      </p>
                      <p className="font-body text-sm" style={{ color: 'var(--text-secondary)' }}>
                        We&apos;ll be in touch soon
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleEmailSubmit} className="relative space-y-3">
                    {/* Form container with stronger visual treatment */}
                    <div
                      className="p-1 rounded-xl"
                      style={{
                        background: 'linear-gradient(135deg, var(--accent-brand) 0%, var(--surface-elevated) 50%, var(--accent-brand) 100%)',
                      }}
                    >
                      <div
                        className="flex flex-col sm:flex-row gap-2 p-2 rounded-lg"
                        style={{ backgroundColor: 'var(--surface-elevated)' }}
                      >
                        <div className="relative flex-1">
                          <Mail
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                            style={{ color: 'var(--accent-brand)' }}
                          />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value)
                              if (emailError) setEmailError('')
                            }}
                            placeholder="Enter your email to join waitlist"
                            disabled={isValidating}
                            className="w-full pl-11 pr-4 py-3.5 rounded-lg font-body text-base transition-all duration-200 outline-none focus:ring-2 focus:ring-[var(--accent-brand)]"
                            style={{
                              backgroundColor: 'var(--surface-base)',
                              color: 'var(--text-primary)',
                              border: emailError ? '2px solid var(--state-critical)' : '2px solid var(--border-subtle)',
                            }}
                          />
                        </div>
                        <motion.button
                          type="submit"
                          disabled={isValidating}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 font-body font-semibold rounded-lg text-center whitespace-nowrap disabled:opacity-70"
                          style={{
                            backgroundColor: 'var(--accent-brand)',
                            color: 'var(--text-on-brand)'
                          }}
                          initial="rest"
                          whileHover={isValidating ? {} : "hover"}
                          whileTap={isValidating ? {} : "tap"}
                          animate="rest"
                          variants={prefersReducedMotion ? {} : primaryButtonVariants}
                          transition={{ duration: 0.16, ease: easeOutStrong }}
                        >
                          {isValidating ? (
                            <>
                              <Loader2 size={16} className="animate-spin" />
                              ...
                            </>
                          ) : (
                            <>
                              Join Waitlist
                              <motion.span
                                className="inline-flex"
                                variants={prefersReducedMotion ? {} : arrowVariants}
                                transition={{ duration: 0.16, ease: easeOutStrong }}
                              >
                                <ArrowRight size={16} />
                              </motion.span>
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                    {emailError && (
                      <motion.p
                        className="text-sm font-body"
                        style={{ color: 'var(--state-critical)' }}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {emailError}
                      </motion.p>
                    )}
                    <p className="text-xs font-body text-center" style={{ color: 'var(--text-tertiary)' }}>
                      Join waitlist · No spam · Unsubscribe anytime
                    </p>
                  </form>
                )}
              </motion.div>

              {/* Secondary CTA */}
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: easeOutStrong, delay: shouldAnimate ? 0.72 : 0 }}
              >
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
                    className="inline-flex items-center px-5 py-2.5 border-2 font-body font-medium rounded-lg transition-colors duration-150 text-center text-sm"
                    style={{
                      borderColor: 'var(--accent-brand)',
                      color: 'var(--accent-brand)'
                    }}
                  >
                    Watch Demo
                  </Link>
                </motion.div>
                <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>or</span>
                <Link
                  href="/contact"
                  className="text-sm font-body font-medium hover:underline"
                  style={{ color: 'var(--accent-brand)' }}
                >
                  Talk to sales →
                </Link>
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
                className="rounded-lg overflow-hidden"
                style={{
                  border: '1px solid var(--surface-dashboard-border)',
                  background: 'var(--surface-dashboard)',
                  boxShadow: 'var(--shadow-elevated)',
                }}
              >
                {/* Title bar */}
                <div
                  className="flex items-center justify-between px-4 py-3 border-b"
                  style={{
                    borderColor: 'var(--border-divider)',
                    backgroundColor: 'var(--surface-dashboard-header)'
                  }}
                >
                  <div className="flex items-center gap-2">
                    {/* Mock window controls */}
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full opacity-60" style={{ backgroundColor: 'var(--state-critical)' }} />
                      <div className="w-3 h-3 rounded-full opacity-60" style={{ backgroundColor: 'var(--state-warning)' }} />
                      <div className="w-3 h-3 rounded-full opacity-60" style={{ backgroundColor: 'var(--state-success)' }} />
                    </div>
                    <span className="text-xs ml-2" style={{ color: 'var(--text-tertiary)' }}>DriveCommand — Active Loads</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full animate-live-pulse" style={{ backgroundColor: 'var(--state-success)' }} />
                    <span className="text-xs font-mono" style={{ color: 'var(--state-success)' }}>LIVE</span>
                  </div>
                </div>

                {/* Route map - Using the new RouteMap component */}
                <div
                  className="hidden md:block p-4 border-b"
                  style={{ borderColor: 'var(--border-subtle)' }}
                >
                  <RouteMap />
                </div>

                {/* Load cards - tighter stagger for cohesive feel */}
                <div className="p-4 space-y-3">
                  {loadCards.map((card, i) => (
                    <motion.div
                      key={card.id}
                      className="p-3 rounded-none cursor-pointer"
                      style={{
                        backgroundColor: 'var(--surface-elevated)',
                        border: '1px solid var(--border-subtle)',
                      }}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={prefersReducedMotion ? {} : {
                        y: -2,
                        borderColor: 'var(--accent-brand)'
                      }}
                      whileTap={prefersReducedMotion ? {} : { y: 0, scale: 0.98 }}
                      transition={{
                        duration: 0.16,
                        delay: shouldAnimate ? 0.55 + i * 0.1 : 0,
                        ease: easeOutStrong
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>Load #{card.id}</span>
                        <StatusBadge status={card.status} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{card.route}</span>
                        <span className="text-sm font-bold font-mono tnum" style={{ color: 'var(--accent-brand)' }}>{card.rate}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator - positioned above the ticker */}
        <motion.div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: easeOutStrong, delay: shouldAnimate ? 0.85 : 0 }}
        >
          <motion.div
            className="w-6 h-10 border-2 rounded-full flex justify-center"
            style={{ borderColor: 'var(--text-tertiary)' }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full mt-2"
              style={{ backgroundColor: 'var(--text-secondary)' }}
              animate={shouldAnimate ? { y: [0, 16, 0] } : undefined}
              transition={{ duration: 2, ease: easeInOutStrong, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>

        {/* Live Status Ticker - pinned to bottom of hero, not overlapping content */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-40 overflow-hidden"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: easeOutStrong, delay: shouldAnimate ? 0.6 : 0 }}
        >
          <div
            className="h-10 flex items-center border-t"
            style={{
              backgroundColor: 'var(--surface-elevated)',
              borderColor: 'var(--border-divider)'
            }}
          >
            {/* LIVE FEED label */}
            <div
              className="flex items-center gap-2 px-4 border-r h-full"
              style={{ borderColor: 'var(--border-divider)' }}
            >
              <span className="w-2 h-2 rounded-full animate-red-pulse" style={{ backgroundColor: 'var(--state-critical)' }} />
              <span className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--state-critical)' }}>Live Feed</span>
            </div>

            {/* Ticker track */}
            <div className="flex-1 overflow-hidden">
              <div className="ticker-track">
                {/* Double the items for continuous loop */}
                {[...tickerItems, ...tickerItems].map((item, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-2 text-xs font-mono whitespace-nowrap px-6"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <span className="w-2 h-2 rounded-full" style={getStatusDotStyle(item.status)} />
                    {item.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Waitlist Modal */}
      <WaitlistModal
        state={waitlist.state}
        onSubmit={waitlist.submit}
        onClose={waitlist.closeModal}
      />
    </>
  )
}
