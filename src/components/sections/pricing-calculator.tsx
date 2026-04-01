'use client'

import { useState, useMemo, useRef } from 'react'
import { motion, useInView } from 'motion/react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import {
  PRICING_TIERS,
  CALCULATOR_RATES,
  calculatePrice,
  type CalculatorPlan,
} from '@/lib/pricing.config'
import { cn } from '@/lib/utils'

interface SliderProps {
  id: string
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
  suffix?: string
}

function Slider({ id, label, value, min, max, step, onChange, suffix = '' }: SliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="font-body text-sm text-slate-400">{label}</label>
        <span className="font-display text-lg font-semibold text-white">
          {value}{suffix}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-blue"
      />
      <div className="flex justify-between font-body text-xs text-slate-500">
        <span>{min}{suffix}</span>
        <span>{max}{suffix}</span>
      </div>
    </div>
  )
}

export function PricingCalculator() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const [selectedPlan, setSelectedPlan] = useState<CalculatorPlan>('basic')
  const [users, setUsers] = useState(5)
  const [trucks, setTrucks] = useState(3)
  const [loads, setLoads] = useState(50)

  const pricing = useMemo(
    () => calculatePrice(selectedPlan, users, trucks, loads),
    [selectedPlan, users, trucks, loads]
  )

  const rates = CALCULATOR_RATES[selectedPlan]

  return (
    <section id="pricing" ref={ref} className="py-24 bg-brand-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Pricing That Grows With You
          </h2>
          <p className="font-body text-lg text-slate-400 max-w-2xl mx-auto">
            Simple, transparent pricing. Pay for what you use, scale when you need to.
          </p>
        </motion.div>

        {/* Tier cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={cn(
                'relative rounded-xl border p-6',
                tier.highlighted
                  ? 'border-brand-blue bg-brand-blue/5'
                  : 'border-slate-700 bg-slate-900/50'
              )}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-blue rounded-full">
                  <span className="font-body text-xs font-medium text-white">Most Popular</span>
                </div>
              )}
              <h3 className="font-display text-xl font-semibold text-white mb-1">
                {tier.name}
              </h3>
              <p className="font-body text-sm text-slate-400 mb-4">{tier.tagline}</p>
              <div className="mb-6">
                {tier.monthlyPrice !== null ? (
                  <>
                    <span className="font-display text-4xl font-bold text-white">
                      ${tier.monthlyPrice}
                    </span>
                    <span className="font-body text-slate-400">/{tier.perUnit.split('/')[1]?.trim() || 'month'}</span>
                  </>
                ) : (
                  <span className="font-display text-2xl font-bold text-white">Custom</span>
                )}
              </div>
              <ul className="space-y-3 mb-6">
                {tier.features.slice(0, 5).map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                    <span className="font-body text-sm text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={tier.ctaHref}
                className={cn(
                  'block w-full text-center py-3 rounded-lg font-body font-medium text-sm transition-colors',
                  tier.highlighted
                    ? 'bg-brand-blue text-white hover:bg-blue-500'
                    : tier.id === 'enterprise'
                    ? 'border border-slate-600 text-slate-200 hover:border-slate-400'
                    : 'bg-slate-800 text-white hover:bg-slate-700'
                )}
              >
                {tier.ctaLabel}
              </Link>
            </div>
          ))}
        </motion.div>

        {/* Calculator section */}
        <motion.div
          className="bg-slate-900 rounded-2xl border border-slate-700 p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="font-display text-2xl font-bold text-white text-center mb-8">
            Calculate Your Price
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Controls */}
            <div className="space-y-8">
              {/* Plan selector */}
              <div>
                <label className="block font-body text-sm text-slate-400 mb-3">Select Plan</label>
                <div className="grid grid-cols-2 gap-3">
                  {(['basic', 'advanced'] as const).map((plan) => (
                    <button
                      key={plan}
                      onClick={() => setSelectedPlan(plan)}
                      className={cn(
                        'py-3 px-4 rounded-lg font-body font-medium text-sm transition-all',
                        selectedPlan === plan
                          ? 'bg-brand-blue text-white'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      )}
                    >
                      {plan.charAt(0).toUpperCase() + plan.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders */}
              <Slider
                id="calc-users"
                label="Users"
                value={users}
                min={1}
                max={100}
                step={1}
                onChange={setUsers}
              />
              <Slider
                id="calc-trucks"
                label="Trucks"
                value={trucks}
                min={1}
                max={50}
                step={1}
                onChange={setTrucks}
              />
              <Slider
                id="calc-loads"
                label="Loads per month"
                value={loads}
                min={1}
                max={500}
                step={10}
                onChange={setLoads}
              />
            </div>

            {/* Right: Output panel */}
            <div className="bg-slate-800 rounded-xl p-6">
              <h4 className="font-display text-lg font-semibold text-white mb-6">
                Monthly Estimate
              </h4>

              {/* Line items */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-body text-sm text-slate-300">{users} users</span>
                    <span className="font-body text-xs text-slate-500 ml-2">
                      × ${rates.perUser}/user
                    </span>
                  </div>
                  <span className="font-body text-sm font-medium text-white">
                    ${pricing.userCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-body text-sm text-slate-300">{trucks} trucks</span>
                    <span className="font-body text-xs text-slate-500 ml-2">
                      × ${rates.perTruck}/truck
                    </span>
                  </div>
                  <span className="font-body text-sm font-medium text-white">
                    ${pricing.truckCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-body text-sm text-slate-300">{loads} loads</span>
                    <span className="font-body text-xs text-slate-500 ml-2">
                      × ${rates.perLoad}/load
                    </span>
                  </div>
                  <span className="font-body text-sm font-medium text-white">
                    ${pricing.loadCost.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-slate-700 pt-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg font-semibold text-white">
                    Total per month
                  </span>
                  <motion.span
                    key={pricing.total}
                    className="font-display text-3xl font-bold text-brand-green"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    ${pricing.total.toFixed(2)}
                  </motion.span>
                </div>
                <p className="font-body text-xs text-slate-500 mt-1">
                  Billed monthly. Cancel anytime.
                </p>
              </div>

              {/* CTA */}
              <Link
                href="https://app.drivecommand.com/sign-up"
                className="block w-full text-center py-3 bg-brand-blue text-white font-body font-medium rounded-lg hover:bg-blue-500 transition-colors"
              >
                Get Started at This Price
              </Link>

              {/* Enterprise note */}
              <p className="font-body text-xs text-slate-500 text-center mt-4">
                Need more than 50 trucks?{' '}
                <Link href="/contact" className="text-brand-blue hover:underline">
                  Contact us for Enterprise pricing
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
