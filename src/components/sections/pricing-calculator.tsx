'use client'

import { useState, useMemo, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
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
  const midpoint = Math.round((min + max) / 2)
  const fillPercent = ((value - min) / (max - min)) * 100

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)
    if (!isNaN(val)) {
      onChange(Math.min(max, Math.max(min, val)))
    }
  }

  const handleNumberBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)
    onChange(Math.min(max, Math.max(min, isNaN(val) ? min : val)))
  }

  const handleNumberFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select()
  }

  return (
    <div className="space-y-2">
      {/* Label row with numeric input */}
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="font-body text-sm text-theme-secondary">{label}</label>
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleNumberChange}
          onBlur={handleNumberBlur}
          onFocus={handleNumberFocus}
          className="w-16 h-8 px-2 py-1 text-sm text-right font-body text-theme-primary bg-theme-card border border-[var(--border-medium)] rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          aria-label={`${label} value`}
        />
      </div>

      {/* Range slider with fill */}
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="pricing-slider w-full h-2 rounded-lg cursor-pointer"
        style={{ '--slider-fill': `${fillPercent}%` } as React.CSSProperties}
      />

      {/* Tick marks and labels: min, midpoint, max */}
      <div className="relative h-4">
        {/* Tick marks */}
        <div className="absolute top-0 left-0 w-px h-1 bg-slate-600" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-1 bg-slate-600" />
        <div className="absolute top-0 right-0 w-px h-1 bg-slate-600" />

        {/* Labels */}
        <div className="absolute top-1.5 left-0 font-body text-[11px] text-theme-muted">
          {min}{suffix}
        </div>
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 font-body text-[11px] text-theme-muted">
          {midpoint}{suffix}
        </div>
        <div className="absolute top-1.5 right-0 font-body text-[11px] text-theme-muted">
          {max}{suffix}
        </div>
      </div>
    </div>
  )
}

export function PricingCalculator() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const prefersReducedMotion = useReducedMotion()

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
    <section id="pricing" ref={ref} className="py-24 bg-theme-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-theme-primary mb-4">
            Pricing That Grows With You
          </h2>
          <p className="font-body text-lg text-theme-secondary max-w-2xl mx-auto">
            Simple, transparent pricing. Pay for what you use, scale when you need to.
          </p>
        </motion.div>

        {/* Tier cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {PRICING_TIERS.map((tier, index) => (
            <motion.div
              key={tier.id}
              className={cn(
                'relative rounded-xl border p-6',
                tier.highlighted
                  ? 'border-[var(--color-accent)]'
                  : 'border-theme-medium'
              )}
              style={{
                backgroundColor: tier.highlighted ? 'var(--color-glow-accent)' : 'var(--bg-secondary)'
              }}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.4,
                delay: prefersReducedMotion ? 0 : 0.3 + index * 0.1,
              }}
              whileHover={
                prefersReducedMotion
                  ? {}
                  : {
                      y: -4,
                      boxShadow: tier.highlighted
                        ? '0 20px 40px -15px rgba(117, 240, 212, 0.3)'
                        : '0 20px 40px -15px rgba(0, 0, 0, 0.3)',
                    }
              }
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-dc-accent text-dc-text-on-accent">
                  <span className="font-body text-xs font-medium text-white">Most Popular</span>
                </div>
              )}
              <h3 className="font-display text-xl font-semibold text-theme-primary mb-1">
                {tier.name}
              </h3>
              <p className="font-body text-sm text-theme-secondary mb-4">{tier.tagline}</p>
              <div className="mb-6">
                {tier.monthlyPrice !== null ? (
                  <>
                    <span className="font-display text-4xl font-bold text-theme-primary">
                      ${tier.monthlyPrice}
                    </span>
                    <span className="font-body text-theme-secondary">/{tier.perUnit.split('/')[1]?.trim() || 'month'}</span>
                  </>
                ) : (
                  <span className="font-display text-2xl font-bold text-theme-primary">Custom</span>
                )}
              </div>
              <ul className="space-y-3 mb-6">
                {tier.features.slice(0, 5).map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent-green flex-shrink-0 mt-0.5" />
                    <span className="font-body text-sm text-theme-secondary">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={tier.id === 'enterprise' ? tier.ctaHref : '/contact'}
                className={cn(
                  'block w-full text-center py-3 rounded-lg font-body font-medium text-sm transition-colors',
                  tier.highlighted
                    ? 'bg-dc-accent text-dc-text-on-accent text-white hover:bg-dc-accent text-dc-text-on-accent-hover'
                    : tier.id === 'enterprise'
                    ? 'border border-theme-medium text-theme-secondary hover:border-theme-primary'
                    : 'text-white bg-theme-secondary hover:bg-theme-card'
                )}
              >
                {tier.id === 'enterprise' ? tier.ctaLabel : 'Get Early Access'}
              </Link>
              {tier.id !== 'enterprise' && (
                <p className="font-body text-xs text-theme-muted text-center mt-2">
                  Available in early access
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Calculator section */}
        <motion.div
          className="rounded-2xl border p-8 bg-theme-secondary border-theme-medium"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="font-display text-2xl font-bold text-theme-primary text-center mb-8">
            Calculate Your Price
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Controls */}
            <div className="space-y-8">
              {/* Plan selector */}
              <div>
                <label className="block font-body text-sm text-theme-secondary mb-3">Select Plan</label>
                <div className="grid grid-cols-2 gap-3">
                  {(['basic', 'advanced'] as const).map((plan) => (
                    <motion.button
                      key={plan}
                      onClick={() => setSelectedPlan(plan)}
                      className={cn(
                        'py-3 px-4 rounded-lg font-body font-medium text-sm transition-colors',
                        selectedPlan === plan
                          ? 'bg-dc-accent text-dc-text-on-accent text-white'
                          : 'text-theme-secondary hover:bg-theme-card'
                      )}
                      style={selectedPlan !== plan ? { backgroundColor: 'var(--bg-card)' } : undefined}
                      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      {plan.charAt(0).toUpperCase() + plan.slice(1)}
                    </motion.button>
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
            <div className="rounded-xl p-6 bg-theme-card">
              <h4 className="font-display text-lg font-semibold text-theme-primary mb-6">
                Monthly Estimate
              </h4>

              {/* Line items */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-body text-sm text-theme-secondary">{users} users</span>
                    <span className="font-body text-xs text-theme-muted ml-2">
                      × ${rates.perUser}/user
                    </span>
                  </div>
                  <span className="font-body text-sm font-medium text-theme-primary">
                    ${pricing.userCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-body text-sm text-theme-secondary">{trucks} trucks</span>
                    <span className="font-body text-xs text-theme-muted ml-2">
                      × ${rates.perTruck}/truck
                    </span>
                  </div>
                  <span className="font-body text-sm font-medium text-theme-primary">
                    ${pricing.truckCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-body text-sm text-theme-secondary">{loads} loads</span>
                    <span className="font-body text-xs text-theme-muted ml-2">
                      × ${rates.perLoad}/load
                    </span>
                  </div>
                  <span className="font-body text-sm font-medium text-theme-primary">
                    ${pricing.loadCost.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-theme-subtle pt-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg font-semibold text-theme-primary">
                    Total per month
                  </span>
                  <motion.span
                    key={pricing.total}
                    className="font-display text-3xl font-bold text-accent-green"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    ${pricing.total.toFixed(2)}
                  </motion.span>
                </div>
                <p className="font-body text-xs text-theme-muted mt-1">
                  Billed monthly. Cancel anytime.
                </p>
              </div>

              {/* CTA */}
              <Link
                href="/contact"
                className="block w-full text-center py-3 text-white font-body font-medium rounded-lg transition-colors bg-dc-accent text-dc-text-on-accent hover:bg-dc-accent text-dc-text-on-accent-hover"
              >
                Get Early Access at This Price
              </Link>
              <p className="font-body text-xs text-theme-muted text-center mt-2">
                Available in early access
              </p>

              {/* Enterprise note */}
              <p className="font-body text-xs text-theme-muted text-center mt-4">
                Need more than 50 trucks?{' '}
                <Link href="/contact" className="text-accent-blue hover:underline">
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
