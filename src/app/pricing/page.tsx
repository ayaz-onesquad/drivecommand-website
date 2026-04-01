import type { Metadata } from 'next'
import { Check, X } from 'lucide-react'
import { PRICING_TIERS } from '@/lib/pricing.config'
import { PricingCalculator } from '@/components/sections/pricing-calculator'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent pricing for fleets of every size. Start free, upgrade as you grow.',
  openGraph: {
    title: 'DriveCommand Pricing',
    description: 'Simple, transparent pricing for fleets of every size.',
    type: 'website',
  },
}

// Feature comparison data - pulling from pricing.config features + extras
const COMPARISON_FEATURES = [
  { name: 'Trucks', basic: 'Up to 5', advanced: 'Up to 25', enterprise: 'Unlimited' },
  { name: 'Live GPS Tracking', basic: true, advanced: true, enterprise: true },
  { name: 'Route & Dispatch', basic: true, advanced: true, enterprise: true },
  { name: 'Driver Portal', basic: true, advanced: true, enterprise: true },
  { name: 'Invoicing', basic: true, advanced: true, enterprise: true },
  { name: 'Basic Reports', basic: true, advanced: true, enterprise: true },
  { name: 'Maintenance Scheduling', basic: false, advanced: true, enterprise: true },
  { name: 'Document Storage', basic: false, advanced: true, enterprise: true },
  { name: 'Fuel Analytics', basic: false, advanced: true, enterprise: true },
  { name: 'Safety Analytics', basic: false, advanced: true, enterprise: true },
  { name: 'Driver Payroll', basic: false, advanced: true, enterprise: true },
  { name: 'Custom Integrations', basic: false, advanced: false, enterprise: true },
  { name: 'API Access', basic: false, advanced: false, enterprise: true },
  { name: 'Dedicated Account Manager', basic: false, advanced: false, enterprise: true },
  { name: 'SLA Guarantee', basic: false, advanced: false, enterprise: true },
  { name: 'SSO & Advanced Security', basic: false, advanced: false, enterprise: true },
  { name: 'Custom Onboarding', basic: false, advanced: false, enterprise: true },
  { name: 'Support', basic: 'Email', advanced: 'Priority Email + Chat', enterprise: '24/7 Phone + Dedicated' },
]

function FeatureCell({ value }: { value: boolean | string }) {
  if (typeof value === 'string') {
    return <span className="font-body text-sm text-slate-300">{value}</span>
  }
  return value ? (
    <Check className="w-5 h-5 text-brand-green mx-auto" />
  ) : (
    <X className="w-5 h-5 text-slate-600 mx-auto" />
  )
}

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-brand-dark to-slate-900">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="font-body text-lg text-slate-400 max-w-2xl mx-auto">
            Choose the plan that fits your fleet. No hidden fees, no long-term contracts.
            Start free and upgrade as you grow.
          </p>
        </div>
      </section>

      {/* Tier cards */}
      <section className="py-16 px-4 bg-slate-900">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={cn(
                  'relative rounded-2xl border p-8',
                  tier.highlighted
                    ? 'border-brand-blue bg-brand-blue/5 shadow-lg shadow-brand-blue/10'
                    : 'border-slate-700 bg-slate-800/50'
                )}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-brand-blue rounded-full">
                    <span className="font-body text-sm font-medium text-white">Most Popular</span>
                  </div>
                )}
                <h2 className="font-display text-2xl font-semibold text-white mb-1">
                  {tier.name}
                </h2>
                <p className="font-body text-sm text-slate-400 mb-6">{tier.tagline}</p>
                <div className="mb-6">
                  {tier.monthlyPrice !== null ? (
                    <>
                      <span className="font-display text-5xl font-bold text-white">
                        ${tier.monthlyPrice}
                      </span>
                      <span className="font-body text-slate-400">/truck/mo</span>
                      {tier.annualSavingsPct && (
                        <p className="font-body text-sm text-brand-green mt-2">
                          Save {tier.annualSavingsPct}% with annual billing (${tier.annualPrice}/mo)
                        </p>
                      )}
                    </>
                  ) : (
                    <span className="font-display text-4xl font-bold text-white">Custom</span>
                  )}
                </div>
                <p className="font-body text-sm text-slate-300 mb-6">{tier.description}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                      <span className="font-body text-sm text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={tier.ctaHref}
                  className={cn(
                    'block w-full text-center py-3 rounded-lg font-body font-medium transition-colors',
                    tier.highlighted
                      ? 'bg-brand-blue text-white hover:bg-blue-500'
                      : tier.id === 'enterprise'
                      ? 'border border-slate-500 text-white hover:border-slate-300 hover:bg-slate-700'
                      : 'bg-slate-700 text-white hover:bg-slate-600'
                  )}
                >
                  {tier.ctaLabel}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature comparison table */}
      <section className="py-16 px-4 bg-brand-dark">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl font-bold text-white text-center mb-12">
            Compare Plans
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="py-4 px-4 text-left font-display text-sm font-semibold text-slate-400">
                    Feature
                  </th>
                  {PRICING_TIERS.map((tier) => (
                    <th
                      key={tier.id}
                      className={cn(
                        'py-4 px-4 text-center font-display text-sm font-semibold',
                        tier.highlighted ? 'text-brand-blue' : 'text-slate-300'
                      )}
                    >
                      {tier.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_FEATURES.map((feature, index) => (
                  <tr
                    key={feature.name}
                    className={cn(
                      'border-b border-slate-800',
                      index % 2 === 0 ? 'bg-slate-900/30' : ''
                    )}
                  >
                    <td className="py-4 px-4 font-body text-sm text-slate-300">
                      {feature.name}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <FeatureCell value={feature.basic} />
                    </td>
                    <td className={cn(
                      'py-4 px-4 text-center',
                      'bg-brand-blue/5'
                    )}>
                      <FeatureCell value={feature.advanced} />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <FeatureCell value={feature.enterprise} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing Calculator */}
      <PricingCalculator />

      {/* FAQ / Questions CTA */}
      <section className="py-16 px-4 bg-slate-900">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold text-white mb-4">
            Have Questions?
          </h2>
          <p className="font-body text-slate-400 mb-8">
            Not sure which plan is right for your fleet? Our team is here to help you
            find the perfect fit.
          </p>
          <a
            href="/contact"
            className="inline-flex px-8 py-3 bg-brand-blue text-white font-body font-medium rounded-lg hover:bg-blue-500 transition-colors"
          >
            Talk to Sales
          </a>
        </div>
      </section>
    </main>
  )
}
