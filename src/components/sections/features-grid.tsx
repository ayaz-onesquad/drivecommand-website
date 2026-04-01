'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import {
  Truck,
  MapPin,
  Users,
  FileText,
  Shield,
  Sparkles,
} from 'lucide-react'

const FEATURES = [
  {
    icon: Truck,
    title: 'Dispatch Management',
    description:
      'Create and assign loads in seconds. Drag-and-drop scheduling, driver availability tracking, and automated notifications.',
    color: 'text-brand-blue',
    bgColor: 'bg-brand-blue/10',
  },
  {
    icon: MapPin,
    title: 'Live GPS Tracking',
    description:
      'Real-time location tracking for your entire fleet. Geofencing, ETA predictions, and route optimization built in.',
    color: 'text-brand-green',
    bgColor: 'bg-brand-green/10',
  },
  {
    icon: Users,
    title: 'Driver & Payroll',
    description:
      'Manage driver profiles, settlements, and payroll. Automatic mileage calculations and per-load pay tracking.',
    color: 'text-brand-amber',
    bgColor: 'bg-brand-amber/10',
  },
  {
    icon: FileText,
    title: 'Invoicing & Billing',
    description:
      'Generate professional invoices instantly. Track payments, manage aging, and sync with your accounting software.',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
  },
  {
    icon: Shield,
    title: 'Compliance & Docs',
    description:
      'Store and manage all documents in one place. License expiration alerts, insurance tracking, and audit-ready reports.',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Tools',
    description:
      'Smart load matching, predictive maintenance alerts, and automated rate suggestions based on market data.',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
]

export function FeaturesGrid() {
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
            Everything You Need to Run Your Fleet
          </h2>
          <p className="font-body text-lg text-slate-600 max-w-2xl mx-auto">
            Six powerful modules working together. Built by people who understand
            trucking, designed for how you actually work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${feature.bgColor} mb-4`}
              >
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="font-display text-xl font-semibold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="font-body text-slate-600 mb-4">
                {feature.description}
              </p>
              <button className="font-body text-sm font-medium text-brand-blue hover:text-blue-600 transition-colors">
                Learn more →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
