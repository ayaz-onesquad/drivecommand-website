'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { Shield, Server, Clock } from 'lucide-react'

const TESTIMONIALS = [
  {
    initials: 'JM',
    name: 'Jake Martinez',
    role: 'Owner Operator',
    company: 'Martinez Trucking',
    quote:
      "Before DriveCommand, I was losing track of invoices and spending hours on paperwork. Now I dispatch, track, and invoice all from my phone. It's saved me at least 10 hours a week.",
    color: 'bg-brand-blue',
  },
  {
    initials: 'SR',
    name: 'Sarah Richardson',
    role: 'Fleet Manager',
    company: 'Richardson Freight (12 trucks)',
    quote:
      "We tried three other TMS platforms before finding DriveCommand. The difference? It actually works the way we do. Our drivers adopted it in a day, not a month.",
    color: 'bg-brand-amber',
  },
  {
    initials: 'DW',
    name: 'David Wilson',
    role: 'Operations Director',
    company: 'Midwest Dispatch Services',
    quote:
      "As a dispatch company managing 40+ owner-ops, we needed something that could scale without breaking the bank. DriveCommand's pricing model finally made sense for us.",
    color: 'bg-brand-green',
  },
]

const TRUST_BADGES = [
  { icon: Shield, label: 'AES-256 Encryption' },
  { icon: Server, label: 'SOC 2 in Progress' },
  { icon: Clock, label: '99.9% Uptime SLA' },
]

export function SocialProof() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Trusted by Carriers Who Get It Done
          </h2>
          <p className="font-body text-lg text-slate-600 max-w-2xl mx-auto">
            From owner-operators to growing fleets, see why teams are switching to DriveCommand.
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`w-12 h-12 rounded-full ${testimonial.color} flex items-center justify-center`}
                >
                  <span className="font-display font-bold text-white">
                    {testimonial.initials}
                  </span>
                </div>
                <div>
                  <div className="font-display font-semibold text-slate-900">
                    {testimonial.name}
                  </div>
                  <div className="font-body text-sm text-slate-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
              <p className="font-body text-slate-600 mb-4 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="font-body text-sm text-slate-400">
                {testimonial.company}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-slate-200"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {TRUST_BADGES.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 text-slate-500"
            >
              <badge.icon className="w-5 h-5" />
              <span className="font-body text-sm">{badge.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
