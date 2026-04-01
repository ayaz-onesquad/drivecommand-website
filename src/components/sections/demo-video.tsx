'use client'

import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { Play } from 'lucide-react'
import { StatusBadge } from '@/components/shared/status-badge'
import { useParallaxRotation, useContentParallax } from '@/hooks/use-parallax'

// Animated truck that moves across the table header
function AnimatedTableTruck({ animate }: { animate: boolean }) {
  const prefersReducedMotion = useReducedMotion()
  const shouldAnimate = animate && !prefersReducedMotion

  if (!shouldAnimate) return null

  return (
    <motion.div
      className="absolute top-0 left-0 h-1 flex items-center"
      initial={{ x: '-20px' }}
      animate={{ x: 'calc(100% + 20px)' }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'linear',
        repeatDelay: 2,
      }}
    >
      {/* Simple truck silhouette */}
      <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
        <rect x="0" y="2" width="14" height="8" rx="1" fill="var(--accent-cyan)" />
        <rect x="14" y="4" width="8" height="6" rx="1" fill="var(--accent-cyan)" />
        <circle cx="5" cy="10" r="2" fill="var(--accent-cyan)" opacity="0.7" />
        <circle cx="19" cy="10" r="2" fill="var(--accent-cyan)" opacity="0.7" />
      </svg>
    </motion.div>
  )
}

// TIER 2: Compass rose / crosshair SVG that rotates with scroll
function ParallaxCompassRose({
  rotation,
  y,
}: {
  rotation: ReturnType<typeof useParallaxRotation>['rotation']
  y: ReturnType<typeof useParallaxRotation>['y']
}) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
      style={{ y, rotate: rotation }}
      aria-hidden="true"
    >
      <svg
        className="w-[400px] h-[400px] opacity-[0.06]"
        viewBox="0 0 200 200"
        fill="none"
      >
        {/* Outer circle */}
        <circle cx="100" cy="100" r="90" stroke="var(--accent-cyan)" strokeWidth="1" />
        <circle cx="100" cy="100" r="70" stroke="var(--accent-cyan)" strokeWidth="0.5" strokeDasharray="4 4" />

        {/* Crosshair lines */}
        <line x1="100" y1="10" x2="100" y2="190" stroke="var(--accent-cyan)" strokeWidth="1" />
        <line x1="10" y1="100" x2="190" y2="100" stroke="var(--accent-cyan)" strokeWidth="1" />

        {/* Diagonal lines */}
        <line x1="30" y1="30" x2="170" y2="170" stroke="var(--accent-cyan)" strokeWidth="0.5" />
        <line x1="170" y1="30" x2="30" y2="170" stroke="var(--accent-cyan)" strokeWidth="0.5" />

        {/* Center dot */}
        <circle cx="100" cy="100" r="4" fill="var(--accent-cyan)" />

        {/* Cardinal direction markers */}
        <circle cx="100" cy="20" r="3" fill="var(--accent-cyan)" opacity="0.6" />
        <circle cx="180" cy="100" r="3" fill="var(--accent-cyan)" opacity="0.6" />
        <circle cx="100" cy="180" r="3" fill="var(--accent-cyan)" opacity="0.6" />
        <circle cx="20" cy="100" r="3" fill="var(--accent-cyan)" opacity="0.6" />
      </svg>
    </motion.div>
  )
}

// Animated loads table mockup when no video URL is set
function LoadsTableMockup() {
  const [activeRow, setActiveRow] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReducedMotion = useReducedMotion()

  const loads = [
    { id: 'LD-1847', customer: 'ABC Logistics', route: 'Dallas → Houston', date: 'Mar 28', rate: '$1,850', driver: 'Mike R.', status: 'delivered' as const },
    { id: 'LD-1848', customer: 'FastFreight Co', route: 'Austin → Phoenix', date: 'Mar 29', rate: '$2,340', driver: 'Sarah K.', status: 'in-transit' as const },
    { id: 'LD-1849', customer: 'Metro Supply', route: 'Denver → SLC', date: 'Mar 30', rate: '$1,650', driver: 'James T.', status: 'dispatched' as const },
    { id: 'LD-1850', customer: 'Pacific Goods', route: 'LA → Vegas', date: 'Mar 30', rate: '$980', driver: 'Anna M.', status: 'invoiced' as const },
    { id: 'LD-1851', customer: 'Central Dist', route: 'Chicago → Detroit', date: 'Mar 31', rate: '$1,420', driver: 'Tom B.', status: 'dispatched' as const },
  ]

  useEffect(() => {
    if (prefersReducedMotion) return

    const interval = setInterval(() => {
      setActiveRow((prev) => (prev + 1) % loads.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [loads.length, prefersReducedMotion])

  return (
    <div ref={ref} className="relative rounded-xl border overflow-hidden shadow-2xl bg-theme-secondary border-theme-medium">
      {/* Animated truck traveling across top */}
      <AnimatedTableTruck animate={isInView} />

      {/* Header bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b bg-theme-card border-theme-medium">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-4 font-body text-sm text-theme-secondary">DriveCommand — Loads</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-theme-medium">
              <th className="px-4 py-3 text-left font-body text-xs font-medium text-theme-secondary uppercase tracking-wider">Load #</th>
              <th className="px-4 py-3 text-left font-body text-xs font-medium text-theme-secondary uppercase tracking-wider">Customer</th>
              <th className="px-4 py-3 text-left font-body text-xs font-medium text-theme-secondary uppercase tracking-wider">Route</th>
              <th className="px-4 py-3 text-left font-body text-xs font-medium text-theme-secondary uppercase tracking-wider">Pickup</th>
              <th className="px-4 py-3 text-left font-body text-xs font-medium text-theme-secondary uppercase tracking-wider">Rate</th>
              <th className="px-4 py-3 text-left font-body text-xs font-medium text-theme-secondary uppercase tracking-wider">Driver</th>
              <th className="px-4 py-3 text-left font-body text-xs font-medium text-theme-secondary uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-theme-subtle">
            {loads.map((load, index) => (
              <motion.tr
                key={load.id}
                className="transition-colors"
                animate={!prefersReducedMotion && index === activeRow ? { backgroundColor: 'var(--glow-blue)' } : { backgroundColor: 'transparent' }}
              >
                <td className="px-4 py-3 font-body text-sm font-medium text-theme-primary">{load.id}</td>
                <td className="px-4 py-3 font-body text-sm text-theme-secondary">{load.customer}</td>
                <td className="px-4 py-3 font-body text-sm text-theme-secondary">{load.route}</td>
                <td className="px-4 py-3 font-body text-sm text-theme-muted">{load.date}</td>
                <td className="px-4 py-3 font-body text-sm font-medium text-accent-green">{load.rate}</td>
                <td className="px-4 py-3 font-body text-sm text-theme-secondary">{load.driver}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={load.status} />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function DemoVideo() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const prefersReducedMotion = useReducedMotion()
  const videoUrl = process.env.NEXT_PUBLIC_DEMO_VIDEO_URL

  // TIER 2: Compass rose rotation parallax
  const { rotation, y: decorativeY, isDesktop } = useParallaxRotation(8)

  // TIER 3: Content micro-parallax
  const { y: contentY } = useContentParallax()

  return (
    <section
      id="demo-video"
      ref={sectionRef}
      className="relative z-[1] py-24 bg-theme-primary overflow-hidden"
    >
      {/* TIER 2: Parallax compass rose (desktop only) */}
      {isDesktop && <ParallaxCompassRose rotation={rotation} y={decorativeY} />}

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* TIER 3: Content with micro-parallax */}
        <motion.div
          className="text-center mb-12 will-change-transform"
          style={isDesktop ? { y: contentY } : undefined}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            {/* Section label with route line decoration */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <svg className="w-16 h-2" viewBox="0 0 64 8">
                <line x1="0" y1="4" x2="64" y2="4" stroke="var(--accent-cyan)" strokeWidth="2" strokeDasharray="4 2" />
              </svg>
              <span className="font-body text-sm font-medium uppercase tracking-wider" style={{ color: 'var(--accent-cyan)' }}>
                See It In Action
              </span>
              <svg className="w-16 h-2" viewBox="0 0 64 8">
                <line x1="0" y1="4" x2="64" y2="4" stroke="var(--accent-cyan)" strokeWidth="2" strokeDasharray="4 2" />
              </svg>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-theme-primary mb-4">
              See DriveCommand in Action
            </h2>
            <p className="font-body text-lg text-theme-secondary max-w-2xl mx-auto">
              Watch how easy it is to manage your fleet from dispatch to delivery.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.2 }}
        >
          {videoUrl ? (
            <div className="relative aspect-video rounded-xl overflow-hidden bg-theme-secondary">
              <iframe
                src={videoUrl}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="relative group">
              <LoadsTableMockup />
              {/* Play overlay hint */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  className="w-20 h-20 rounded-full flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: 'rgba(59, 130, 246, 0.8)' }}
                  animate={prefersReducedMotion ? {} : { scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Play className="w-8 h-8 text-white ml-1" />
                </motion.div>
              </div>
            </div>
          )}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.4 }}
        >
          <p className="font-body text-lg text-theme-secondary mb-6">
            Ready to see how it works for your operation?
          </p>
          <Link
            href="/contact"
            className="inline-flex px-8 py-4 text-white font-body font-medium rounded-lg transition-colors shadow-lg bg-accent-blue hover:bg-accent-blue-hover"
            style={{ boxShadow: '0 10px 15px -3px var(--glow-blue)' }}
          >
            Get Early Access
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
