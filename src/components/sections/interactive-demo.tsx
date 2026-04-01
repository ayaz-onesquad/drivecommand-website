'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useInView } from 'motion/react'
import { useRef } from 'react'
import Link from 'next/link'
import {
  Package,
  UserCheck,
  MapPin,
  CheckCircle,
  DollarSign,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react'
import { StatusBadge } from '@/components/shared/status-badge'
import { cn } from '@/lib/utils'

const DEMO_STEPS = [
  {
    id: 1,
    title: 'New Load Comes In',
    description: 'A customer calls with a load from Dallas to Houston. Enter the details in seconds.',
    icon: Package,
  },
  {
    id: 2,
    title: 'Assign a Driver',
    description: 'See who\'s available, check their location, and assign with one click.',
    icon: UserCheck,
  },
  {
    id: 3,
    title: 'Track in Real-Time',
    description: 'Watch the load progress with live GPS updates and automatic ETA calculations.',
    icon: MapPin,
  },
  {
    id: 4,
    title: 'Mark Delivered & Invoice',
    description: 'Driver confirms delivery, you generate and send the invoice instantly.',
    icon: CheckCircle,
  },
  {
    id: 5,
    title: 'Track Your Profit',
    description: 'See exactly how much you made after expenses. Real-time P&L for every load.',
    icon: DollarSign,
  },
]

// Mock UI components for each step
function Step1UI() {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">
      <h4 className="font-display text-lg font-semibold text-white mb-4">New Load</h4>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-body text-xs text-slate-400 mb-1">Customer</label>
            <div className="bg-slate-800 rounded-lg px-3 py-2 font-body text-sm text-white">
              ABC Logistics
            </div>
          </div>
          <div>
            <label className="block font-body text-xs text-slate-400 mb-1">Rate</label>
            <div className="bg-slate-800 rounded-lg px-3 py-2 font-body text-sm text-brand-green">
              $1,850
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-body text-xs text-slate-400 mb-1">Pickup</label>
            <div className="bg-slate-800 rounded-lg px-3 py-2 font-body text-sm text-white">
              Dallas, TX
            </div>
          </div>
          <div>
            <label className="block font-body text-xs text-slate-400 mb-1">Delivery</label>
            <div className="bg-slate-800 rounded-lg px-3 py-2 font-body text-sm text-white">
              Houston, TX
            </div>
          </div>
        </div>
        <motion.button
          className="w-full py-2 bg-brand-blue text-white font-body font-medium rounded-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Create Load
        </motion.button>
      </div>
    </div>
  )
}

function Step2UI() {
  const [selected, setSelected] = useState<string | null>(null)
  const drivers = [
    { name: 'Mike R.', location: 'Fort Worth, TX', available: true },
    { name: 'Sarah K.', location: 'Austin, TX', available: false },
    { name: 'James T.', location: 'Dallas, TX', available: true },
  ]

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">
      <h4 className="font-display text-lg font-semibold text-white mb-4">Assign Driver</h4>
      <div className="space-y-3">
        {drivers.map((driver) => (
          <motion.button
            key={driver.name}
            className={cn(
              'w-full flex items-center justify-between p-3 rounded-lg border transition-colors',
              selected === driver.name
                ? 'border-brand-blue bg-brand-blue/10'
                : 'border-slate-700 bg-slate-800',
              !driver.available && 'opacity-50 cursor-not-allowed'
            )}
            onClick={() => driver.available && setSelected(driver.name)}
            disabled={!driver.available}
            whileHover={driver.available ? { scale: 1.01 } : {}}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                <span className="font-body text-xs text-white">{driver.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <div className="text-left">
                <div className="font-body text-sm font-medium text-white">{driver.name}</div>
                <div className="font-body text-xs text-slate-400">{driver.location}</div>
              </div>
            </div>
            <span className={cn(
              'font-body text-xs px-2 py-1 rounded',
              driver.available ? 'bg-brand-green/10 text-brand-green' : 'bg-slate-700 text-slate-400'
            )}>
              {driver.available ? 'Available' : 'On Load'}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

function Step3UI() {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-display text-lg font-semibold text-white">Live Tracking</h4>
        <StatusBadge status="in-transit" />
      </div>
      {/* Simplified map representation */}
      <div className="relative h-48 bg-slate-800 rounded-lg mb-4 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          {/* Route line */}
          <motion.path
            d="M 50 150 Q 200 50 350 100"
            stroke="#3b82f6"
            strokeWidth="3"
            fill="none"
            strokeDasharray="8 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {/* Origin marker */}
          <circle cx="50" cy="150" r="8" fill="#f59e0b" />
          <text x="50" y="175" className="fill-slate-400 text-xs" textAnchor="middle">Dallas</text>
          {/* Destination marker */}
          <circle cx="350" cy="100" r="8" fill="#10b981" />
          <text x="350" y="125" className="fill-slate-400 text-xs" textAnchor="middle">Houston</text>
          {/* Truck icon (moving dot) */}
          <motion.circle
            cx="50"
            cy="150"
            r="6"
            fill="#3b82f6"
            animate={{
              cx: [50, 200, 350],
              cy: [150, 75, 100],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
        </svg>
      </div>
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <div className="font-body text-xs text-slate-400">Distance</div>
          <div className="font-display text-lg font-semibold text-white">239 mi</div>
        </div>
        <div>
          <div className="font-body text-xs text-slate-400">ETA</div>
          <div className="font-display text-lg font-semibold text-brand-green">2h 45m</div>
        </div>
      </div>
    </div>
  )
}

function Step4UI() {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-display text-lg font-semibold text-white">Load LD-1847</h4>
        <StatusBadge status="delivered" />
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-brand-green">
          <CheckCircle className="w-5 h-5" />
          <span className="font-body text-sm">Delivered at 3:42 PM</span>
        </div>
        <div className="border-t border-slate-700 pt-4">
          <h5 className="font-body text-xs text-slate-400 mb-3">Invoice Preview</h5>
          <div className="bg-slate-800 rounded-lg p-4 space-y-2">
            <div className="flex justify-between font-body text-sm">
              <span className="text-slate-400">Line Haul</span>
              <span className="text-white">$1,850.00</span>
            </div>
            <div className="flex justify-between font-body text-sm">
              <span className="text-slate-400">Fuel Surcharge</span>
              <span className="text-white">$185.00</span>
            </div>
            <div className="border-t border-slate-700 pt-2 flex justify-between font-body text-sm font-medium">
              <span className="text-white">Total</span>
              <span className="text-brand-green">$2,035.00</span>
            </div>
          </div>
        </div>
        <motion.button
          className="w-full py-2 bg-brand-blue text-white font-body font-medium rounded-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Send Invoice
        </motion.button>
      </div>
    </div>
  )
}

function Step5UI() {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-display text-lg font-semibold text-white">Profit Summary</h4>
        <StatusBadge status="invoiced" />
      </div>
      <div className="space-y-4">
        <div className="bg-slate-800 rounded-lg p-4 space-y-3">
          <div className="flex justify-between font-body text-sm">
            <span className="text-slate-400">Revenue</span>
            <span className="text-brand-green">$2,035.00</span>
          </div>
          <div className="flex justify-between font-body text-sm">
            <span className="text-slate-400">Driver Pay (28%)</span>
            <span className="text-red-400">-$569.80</span>
          </div>
          <div className="flex justify-between font-body text-sm">
            <span className="text-slate-400">Fuel Est.</span>
            <span className="text-red-400">-$285.00</span>
          </div>
          <div className="flex justify-between font-body text-sm">
            <span className="text-slate-400">Other Costs</span>
            <span className="text-red-400">-$50.00</span>
          </div>
          <div className="border-t border-slate-700 pt-3">
            <div className="flex justify-between font-body text-lg font-semibold">
              <span className="text-white">Net Profit</span>
              <span className="text-brand-green">$1,130.20</span>
            </div>
            <div className="font-body text-xs text-slate-400 text-right">55.5% margin</div>
          </div>
        </div>
        <div className="text-center">
          <div className="font-body text-xs text-slate-400 mb-1">Cost per mile</div>
          <div className="font-display text-2xl font-bold text-white">$3.79</div>
        </div>
      </div>
    </div>
  )
}

const STEP_COMPONENTS = [Step1UI, Step2UI, Step3UI, Step4UI, Step5UI]

export function InteractiveDemo() {
  const [currentStep, setCurrentStep] = useState(0)
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const goToStep = (step: number) => {
    if (step >= 0 && step < DEMO_STEPS.length) {
      setCurrentStep(step)
    }
  }

  const StepComponent = STEP_COMPONENTS[currentStep]

  return (
    <section id="demo" ref={ref} className="py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            A Day in the Life with DriveCommand
          </h2>
          <p className="font-body text-lg text-slate-600 max-w-2xl mx-auto">
            Follow a load from booking to profit. See how DriveCommand streamlines every step.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Steps sidebar */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {DEMO_STEPS.map((step, index) => (
              <motion.button
                key={step.id}
                className={cn(
                  'w-full flex items-start gap-4 p-4 rounded-xl text-left transition-all',
                  currentStep === index
                    ? 'bg-white shadow-lg border-2 border-brand-blue'
                    : 'bg-white/50 border border-slate-200 hover:bg-white hover:shadow'
                )}
                onClick={() => goToStep(index)}
                whileHover={{ scale: 1.01 }}
              >
                <div
                  className={cn(
                    'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center',
                    currentStep === index
                      ? 'bg-brand-blue text-white'
                      : currentStep > index
                      ? 'bg-brand-green text-white'
                      : 'bg-slate-200 text-slate-500'
                  )}
                >
                  {currentStep > index ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <div
                    className={cn(
                      'font-display font-semibold mb-1',
                      currentStep === index ? 'text-brand-blue' : 'text-slate-900'
                    )}
                  >
                    Step {step.id}: {step.title}
                  </div>
                  <div className="font-body text-sm text-slate-600">
                    {step.description}
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Interactive panel */}
          <motion.div
            className="sticky top-24"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <StepComponent />
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => goToStep(currentStep - 1)}
                disabled={currentStep === 0}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg font-body text-sm transition-colors',
                  currentStep === 0
                    ? 'text-slate-400 cursor-not-allowed'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                )}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <div className="flex gap-2">
                {DEMO_STEPS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToStep(index)}
                    className={cn(
                      'w-2 h-2 rounded-full transition-colors',
                      currentStep === index ? 'bg-brand-blue' : 'bg-slate-300'
                    )}
                  />
                ))}
              </div>

              <button
                onClick={() => goToStep(currentStep + 1)}
                disabled={currentStep === DEMO_STEPS.length - 1}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg font-body text-sm transition-colors',
                  currentStep === DEMO_STEPS.length - 1
                    ? 'text-slate-400 cursor-not-allowed'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                )}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="font-body text-lg text-slate-600 mb-6">
            Run your operation like this —
          </p>
          <Link
            href="https://app.drivecommand.com/sign-up"
            className="inline-flex px-8 py-4 bg-brand-blue text-white font-body font-medium rounded-lg hover:bg-blue-500 transition-colors"
          >
            Start Free
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
