'use client'

import { motion, useInView } from 'motion/react'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { Play } from 'lucide-react'
import { StatusBadge } from '@/components/shared/status-badge'

// Animated loads table mockup when no video URL is set
function LoadsTableMockup() {
  const [activeRow, setActiveRow] = useState(0)

  const loads = [
    { id: 'LD-1847', customer: 'ABC Logistics', route: 'Dallas → Houston', date: 'Mar 28', rate: '$1,850', driver: 'Mike R.', status: 'delivered' as const },
    { id: 'LD-1848', customer: 'FastFreight Co', route: 'Austin → Phoenix', date: 'Mar 29', rate: '$2,340', driver: 'Sarah K.', status: 'in-transit' as const },
    { id: 'LD-1849', customer: 'Metro Supply', route: 'Denver → SLC', date: 'Mar 30', rate: '$1,650', driver: 'James T.', status: 'dispatched' as const },
    { id: 'LD-1850', customer: 'Pacific Goods', route: 'LA → Vegas', date: 'Mar 30', rate: '$980', driver: 'Anna M.', status: 'invoiced' as const },
    { id: 'LD-1851', customer: 'Central Dist', route: 'Chicago → Detroit', date: 'Mar 31', rate: '$1,420', driver: 'Tom B.', status: 'dispatched' as const },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRow((prev) => (prev + 1) % loads.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [loads.length])

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden shadow-2xl">
      {/* Header bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-4 font-body text-sm text-slate-400">DriveCommand — Loads</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="px-4 py-3 text-left font-body text-xs font-medium text-slate-400 uppercase tracking-wider">Load #</th>
              <th className="px-4 py-3 text-left font-body text-xs font-medium text-slate-400 uppercase tracking-wider">Customer</th>
              <th className="px-4 py-3 text-left font-body text-xs font-medium text-slate-400 uppercase tracking-wider">Route</th>
              <th className="px-4 py-3 text-left font-body text-xs font-medium text-slate-400 uppercase tracking-wider">Pickup</th>
              <th className="px-4 py-3 text-left font-body text-xs font-medium text-slate-400 uppercase tracking-wider">Rate</th>
              <th className="px-4 py-3 text-left font-body text-xs font-medium text-slate-400 uppercase tracking-wider">Driver</th>
              <th className="px-4 py-3 text-left font-body text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {loads.map((load, index) => (
              <motion.tr
                key={load.id}
                className={`transition-colors ${index === activeRow ? 'bg-brand-blue/10' : ''}`}
                animate={index === activeRow ? { backgroundColor: 'rgba(59, 130, 246, 0.1)' } : { backgroundColor: 'transparent' }}
              >
                <td className="px-4 py-3 font-body text-sm font-medium text-white">{load.id}</td>
                <td className="px-4 py-3 font-body text-sm text-slate-300">{load.customer}</td>
                <td className="px-4 py-3 font-body text-sm text-slate-300">{load.route}</td>
                <td className="px-4 py-3 font-body text-sm text-slate-400">{load.date}</td>
                <td className="px-4 py-3 font-body text-sm font-medium text-brand-green">{load.rate}</td>
                <td className="px-4 py-3 font-body text-sm text-slate-300">{load.driver}</td>
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
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const videoUrl = process.env.NEXT_PUBLIC_DEMO_VIDEO_URL

  return (
    <section id="demo-video" ref={ref} className="py-24 bg-brand-dark">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            See DriveCommand in Action
          </h2>
          <p className="font-body text-lg text-slate-400 max-w-2xl mx-auto">
            Watch how easy it is to manage your fleet from dispatch to delivery.
          </p>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {videoUrl ? (
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-800">
              <iframe
                src={videoUrl}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="relative">
              <LoadsTableMockup />
              {/* Play overlay hint */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  className="w-20 h-20 bg-brand-blue/80 rounded-full flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ scale: [1, 1.1, 1] }}
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
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="font-body text-lg text-slate-300 mb-6">
            Ready to try it yourself?
          </p>
          <Link
            href="https://app.drivecommand.com/sign-up"
            className="inline-flex px-8 py-4 bg-brand-blue text-white font-body font-medium rounded-lg hover:bg-blue-500 transition-colors"
          >
            Start Free Trial
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
