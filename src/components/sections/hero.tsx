'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { useRef, useState, FormEvent } from 'react'
import { ArrowRight, Mail, Loader2, CheckCircle2, MessageSquare, FileCheck2, Receipt } from 'lucide-react'
import { StatusBadge } from '@/components/shared/status-badge'
import { useWaitlist } from '@/hooks/use-waitlist'
import { WaitlistModal } from './waitlist-modal'
import { RouteMap } from './route-map'
import { gsap, useGSAP, MOTION_OK, DESKTOP, MOBILE, FINE_POINTER } from '@/lib/gsap'

const easeOutStrong: [number, number, number, number] = [0.23, 1, 0.32, 1]

const loadCards = [
  { id: 2847, route: 'CHI to ATL', status: 'dispatched' as const, rate: '$2,400' },
  { id: 2848, route: 'DAL to LAX', status: 'in-transit' as const, rate: '$3,150' },
  { id: 2849, route: 'NYC to MIA', status: 'delivered' as const, rate: '$1,890' },
]

const HEADLINE_LINES = ['You run the trucks.', 'We run the rest.']

/**
 * HERO: five planes, five rates.
 *
 *   far    route map          lags 30%   (y: +0.30 * H)
 *   glow   atmosphere         lags 20%
 *   mid    dashboard          lags 12%, scales 1 -> 1.04
 *   copy   headline + form    1x (never moves relative to the page)
 *   front  floating chips     leads 10%  (y: -0.10 * H), overtakes the dashboard
 *
 * Copy rides at 1x, so text never moves relative to what it is read against.
 * Pointer depth is a second transform on an inner wrapper so scroll and
 * pointer never fight over the same element.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const waitlist = useWaitlist()
  const [email, setEmail] = useState('')
  const [isValidating, setIsValidating] = useState(false)
  const [emailError, setEmailError] = useState('')
  const hasJoined = waitlist.state.step === 'success'

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setEmailError('')
    if (!email || !email.includes('@') || !email.includes('.')) {
      setEmailError('Please enter a valid email')
      return
    }
    setIsValidating(true)
    await new Promise((resolve) => setTimeout(resolve, 200))
    setIsValidating(false)
    waitlist.openModal(email)
  }

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return
      const mm = gsap.matchMedia()

      // Scroll planes: desktop rates
      mm.add(`${MOTION_OK} and ${DESKTOP}`, () => {
        const H = () => section.offsetHeight
        const st = {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        }
        gsap.to('[data-plane="far"]', { y: () => H() * 0.3, ease: 'none', scrollTrigger: st })
        gsap.to('[data-plane="glow"]', { y: () => H() * 0.2, ease: 'none', scrollTrigger: st })
        gsap.to('[data-plane="mid"]', { y: () => H() * 0.12, scale: 1.04, ease: 'none', scrollTrigger: st })
        gsap.to('[data-plane="front"]', { y: () => H() * -0.1, ease: 'none', scrollTrigger: st })
        gsap.to('[data-plane="copy"]', {
          opacity: 0,
          y: () => H() * -0.06,
          ease: 'none',
          scrollTrigger: { ...st, end: '60% top' },
        })
      })

      // Mobile: gentler rates, dashboard sits below copy
      mm.add(`${MOTION_OK} and ${MOBILE}`, () => {
        const H = () => section.offsetHeight
        const st = {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        }
        gsap.to('[data-plane="far"]', { y: () => H() * 0.18, ease: 'none', scrollTrigger: st })
        gsap.to('[data-plane="glow"]', { y: () => H() * 0.1, ease: 'none', scrollTrigger: st })
        gsap.to('[data-plane="front"]', { y: () => H() * -0.06, ease: 'none', scrollTrigger: st })
      })

      // Pointer depth: planes drift toward the pointer at different rates
      mm.add(`${MOTION_OK} and ${FINE_POINTER}`, () => {
        const setters = [
          { el: section.querySelector<HTMLElement>('[data-pointer="far"]'), amt: 8 },
          { el: section.querySelector<HTMLElement>('[data-pointer="mid"]'), amt: 14 },
          { el: section.querySelector<HTMLElement>('[data-pointer="front"]'), amt: 24 },
        ]
          .filter((s): s is { el: HTMLElement; amt: number } => !!s.el)
          .map(({ el, amt }) => ({
            amt,
            x: gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3.out' }),
            y: gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3.out' }),
          }))
        const tiltX = gsap.quickTo('[data-pointer="mid"]', 'rotateX', { duration: 1, ease: 'power3.out' })
        const tiltY = gsap.quickTo('[data-pointer="mid"]', 'rotateY', { duration: 1, ease: 'power3.out' })

        const onMove = (e: PointerEvent) => {
          const r = section.getBoundingClientRect()
          const nx = (e.clientX - r.left) / r.width - 0.5
          const ny = (e.clientY - r.top) / r.height - 0.5
          setters.forEach((s) => {
            s.x(nx * s.amt * 2)
            s.y(ny * s.amt * 2)
          })
          tiltX(-ny * 4)
          tiltY(nx * 5)
        }
        const onLeave = () => {
          setters.forEach((s) => {
            s.x(0)
            s.y(0)
          })
          tiltX(0)
          tiltY(0)
        }
        section.addEventListener('pointermove', onMove, { passive: true })
        section.addEventListener('pointerleave', onLeave)
        return () => {
          section.removeEventListener('pointermove', onMove)
          section.removeEventListener('pointerleave', onLeave)
        }
      })

      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: easeOutStrong, delay: prefersReducedMotion ? 0 : delay },
  })

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-[calc(100svh-4rem)] overflow-hidden"
        style={{ backgroundColor: 'var(--surface-base)', perspective: '1400px' }}
        aria-label="DriveCommand introduction"
      >
        {/* PLANE: far. Continental route map, oversized so it never shows an edge. */}
        <div data-plane="far" className="absolute inset-0 z-0 pointer-events-none will-change-transform" aria-hidden="true">
          <div data-pointer="far" className="absolute -inset-[8%] opacity-[0.55]">
            <svg
              className="w-full h-full"
              viewBox="0 0 1600 1000"
              preserveAspectRatio="xMidYMid slice"
              fill="none"
              style={{ color: 'var(--text-tertiary)' }}
            >
              <g stroke="currentColor" strokeWidth="1" opacity="0.28">
                <path d="M120 720 C 400 640, 620 700, 900 560 S 1400 380, 1560 300" />
                <path d="M60 520 C 300 560, 520 480, 760 420 S 1200 360, 1520 420" />
                <path d="M200 900 C 460 820, 700 880, 980 760 S 1380 640, 1580 700" />
                <path d="M300 120 C 520 200, 680 160, 900 260 S 1300 300, 1500 200" />
                <path d="M420 60 C 480 300, 560 520, 700 780" />
                <path d="M1120 80 C 1080 300, 1140 520, 1240 900" />
              </g>
              <g stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 9" opacity="0.35">
                <path d="M120 720 C 400 640, 620 700, 900 560 S 1400 380, 1560 300" />
                <path d="M300 120 C 520 200, 680 160, 900 260 S 1300 300, 1500 200" />
              </g>
              <g fill="currentColor" opacity="0.5">
                {[
                  [120, 720], [900, 560], [1560, 300], [60, 520], [760, 420], [1520, 420],
                  [980, 760], [300, 120], [900, 260], [1500, 200], [700, 780], [1240, 900],
                ].map(([x, y]) => (
                  <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" />
                ))}
              </g>
            </svg>
          </div>
        </div>

        {/* PLANE: atmosphere */}
        <div data-plane="glow" className="absolute inset-0 z-[1] pointer-events-none will-change-transform" aria-hidden="true">
          <div
            className="absolute left-[8%] top-[30%] w-[52vw] h-[52vw] max-w-[720px] max-h-[720px] rounded-full"
            style={{ background: 'radial-gradient(circle, var(--pattern-glow-strong) 0%, transparent 68%)' }}
          />
          <div
            className="absolute right-[-6%] top-[18%] w-[46vw] h-[46vw] max-w-[640px] max-h-[640px] rounded-full"
            style={{ background: 'radial-gradient(circle, var(--pattern-glow) 0%, transparent 68%)' }}
          />
        </div>

        {/* Grain so a flat ground reads as a lit room */}
        <div className="absolute inset-0 z-[2] pointer-events-none hero-grain" aria-hidden="true" />

        {/* CONTENT */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full pt-10 pb-24 lg:pt-16 lg:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-[52%_48%] gap-10 lg:gap-8 items-center min-h-[calc(100svh-4rem-6rem)]">
            {/* PLANE: copy (1x) */}
            <div data-plane="copy" className="max-w-xl will-change-transform">
              <h1
                className="font-display font-bold tracking-[-0.03em] leading-[0.98] text-[clamp(2.6rem,7vw,5.4rem)] mb-5"
                style={{ color: 'var(--text-primary)', textWrap: 'balance' }}
              >
                {HEADLINE_LINES.map((line, i) => (
                  <span key={line} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
                    <motion.span
                      className="block"
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.7, ease: easeOutStrong, delay: prefersReducedMotion ? 0 : 0.08 + i * 0.1 }}
                      style={i === 1 ? { color: 'var(--accent-brand)' } : undefined}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                className="font-body text-lg sm:text-xl max-w-[46ch] mb-8"
                style={{ color: 'var(--text-secondary)', textWrap: 'pretty' }}
                {...enter(0.34)}
              >
                One place for dispatch, GPS, drivers, payroll, and invoicing. No spreadsheets. No chasing paperwork.
              </motion.p>

              {/* Waitlist form */}
              <motion.div className="w-full max-w-md" {...enter(0.46)}>
                {hasJoined ? (
                  <div
                    className="p-4 rounded-lg flex items-center gap-3"
                    style={{ backgroundColor: 'var(--state-success-tint)', border: '1px solid var(--state-success)' }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--state-success)' }}>
                      <CheckCircle2 size={22} style={{ color: 'var(--text-on-brand)' }} />
                    </div>
                    <div>
                      <p className="font-body font-semibold" style={{ color: 'var(--text-primary)' }}>You&apos;re on the list.</p>
                      <p className="font-body text-sm" style={{ color: 'var(--text-secondary)' }}>We&apos;ll be in touch soon.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleEmailSubmit} className="space-y-3">
                    <div
                      className="flex flex-col sm:flex-row gap-2 p-1.5 rounded-xl"
                      style={{
                        backgroundColor: 'var(--surface-elevated)',
                        border: '1px solid var(--border-card, var(--border-subtle))',
                        boxShadow: 'var(--shadow-elevated)',
                      }}
                    >
                      <label className="relative flex-1">
                        <span className="sr-only">Email address</span>
                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--accent-brand)' }} />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value)
                            if (emailError) setEmailError('')
                          }}
                          placeholder="Your work email"
                          disabled={isValidating}
                          autoComplete="email"
                          className="w-full pl-11 pr-4 py-3.5 rounded-lg font-body text-base outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-brand)]"
                          style={{
                            backgroundColor: 'var(--surface-base)',
                            color: 'var(--text-primary)',
                            border: emailError ? '1px solid var(--state-critical)' : '1px solid transparent',
                          }}
                        />
                      </label>
                      <button
                        type="submit"
                        disabled={isValidating}
                        className="cta-magnet inline-flex items-center justify-center gap-2 px-6 py-3.5 font-body font-semibold rounded-lg whitespace-nowrap disabled:opacity-70 transition-[transform,background-color] duration-150 active:scale-[0.97] hover:bg-dc-accent-hover"
                        style={{ backgroundColor: 'var(--accent-brand)', color: 'var(--text-on-brand)' }}
                      >
                        {isValidating ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <>
                            Join Waitlist
                            <ArrowRight size={16} />
                          </>
                        )}
                      </button>
                    </div>
                    {emailError ? (
                      <p className="text-sm font-body" style={{ color: 'var(--state-critical)' }}>{emailError}</p>
                    ) : null}
                    <p className="text-xs font-body" style={{ color: 'var(--text-tertiary)' }}>
                      No contract. No credit card. DOT-compliant from day one.
                    </p>
                  </form>
                )}
              </motion.div>

              <motion.div className="mt-6" {...enter(0.56)}>
                <Link
                  href="#demo"
                  className="inline-flex items-center gap-1.5 text-sm font-body font-medium underline-offset-4 hover:underline"
                  style={{ color: 'var(--accent-brand)' }}
                >
                  See it work first
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            </div>

            {/* PLANE: mid (dashboard) + PLANE: front (chips) */}
            <div className="relative lg:pl-6">
              <motion.div
                data-plane="mid"
                className="relative will-change-transform"
                style={{ transformStyle: 'preserve-3d' }}
                initial={{ opacity: 0, y: 28, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: easeOutStrong, delay: prefersReducedMotion ? 0 : 0.3 }}
              >
                <div data-pointer="mid" className="will-change-transform" style={{ transformStyle: 'preserve-3d' }}>
                  <div
                    className="rounded-xl overflow-hidden"
                    style={{
                      border: '1px solid var(--surface-dashboard-border)',
                      background: 'var(--surface-dashboard)',
                      boxShadow: 'var(--shadow-panel)',
                    }}
                  >
                    <div
                      className="flex items-center justify-between px-4 py-3 border-b"
                      style={{ borderColor: 'var(--border-divider)', backgroundColor: 'var(--surface-dashboard-header)' }}
                    >
                      <span className="text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>DriveCommand · Active Loads</span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full animate-live-pulse" style={{ backgroundColor: 'var(--state-success)' }} />
                        <span className="text-xs font-mono" style={{ color: 'var(--state-success)' }}>LIVE</span>
                      </span>
                    </div>
                    <div className="hidden md:block p-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                      <RouteMap />
                    </div>
                    <div className="p-4 space-y-2.5">
                      {loadCards.map((card, i) => (
                        <motion.div
                          key={card.id}
                          className="p-3 rounded-lg"
                          style={{ backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border-subtle)' }}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, ease: easeOutStrong, delay: prefersReducedMotion ? 0 : 0.55 + i * 0.08 }}
                        >
                          <div className="flex items-center justify-between mb-1.5">
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
                </div>
              </motion.div>

              {/* Front plane: chips that overlap the dashboard edge (occlusion = depth) */}
              <div data-plane="front" className="absolute inset-0 z-20 pointer-events-none will-change-transform" aria-hidden="true">
                <div data-pointer="front" className="absolute inset-0 will-change-transform">
                  <motion.div
                    className="hero-chip flex absolute -left-3 sm:-left-12 -bottom-5 w-[15.5rem]"
                    initial={{ opacity: 0, y: 24, rotate: -3 }}
                    animate={{ opacity: 1, y: 0, rotate: -2 }}
                    transition={{ duration: 0.7, ease: easeOutStrong, delay: prefersReducedMotion ? 0 : 0.8 }}
                  >
                    <span className="hero-chip__icon" style={{ backgroundColor: 'var(--state-success-tint)', color: 'var(--state-success)' }}>
                      <FileCheck2 size={16} />
                    </span>
                    <span>
                      <span className="hero-chip__title">POD uploaded</span>
                      <span className="hero-chip__meta">Load #2849 · invoice ready</span>
                    </span>
                  </motion.div>

                  <motion.div
                    className="hero-chip flex absolute -right-2 sm:-right-8 top-[8%] w-[16.5rem]"
                    initial={{ opacity: 0, y: 24, rotate: 3 }}
                    animate={{ opacity: 1, y: 0, rotate: 2 }}
                    transition={{ duration: 0.7, ease: easeOutStrong, delay: prefersReducedMotion ? 0 : 0.92 }}
                  >
                    <span className="hero-chip__icon" style={{ backgroundColor: 'var(--state-info-tint)', color: 'var(--state-info)' }}>
                      <MessageSquare size={16} />
                    </span>
                    <span>
                      <span className="hero-chip__title">Mike R.</span>
                      <span className="hero-chip__meta">Delivered. Heading to fuel stop.</span>
                    </span>
                  </motion.div>

                  <motion.div
                    className="hero-chip absolute -right-6 lg:-right-10 bottom-[26%] w-[14.5rem] hidden sm:flex"
                    initial={{ opacity: 0, y: 24, rotate: 1 }}
                    animate={{ opacity: 1, y: 0, rotate: 1 }}
                    transition={{ duration: 0.7, ease: easeOutStrong, delay: prefersReducedMotion ? 0 : 1.04 }}
                  >
                    <span className="hero-chip__icon" style={{ backgroundColor: 'var(--state-warning-tint)', color: 'var(--state-warning)' }}>
                      <Receipt size={16} />
                    </span>
                    <span>
                      <span className="hero-chip__title">Invoice #1848 sent</span>
                      <span className="hero-chip__meta tnum">$3,150 · net 15</span>
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floor fade: planes travel past the section edge and this hides the clip line */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 z-[5] pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--surface-base))' }}
          aria-hidden="true"
        />
      </section>

      <WaitlistModal state={waitlist.state} onSubmit={waitlist.submit} onClose={waitlist.closeModal} />
    </>
  )
}
