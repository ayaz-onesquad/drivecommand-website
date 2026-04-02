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
    return <span className="font-body text-sm text-theme-secondary">{value}</span>
  }
  return value ? (
    <Check className="w-5 h-5 text-accent-green mx-auto" />
  ) : (
    <X className="w-5 h-5 text-theme-muted mx-auto" />
  )
}

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero section */}
      <section className="pt-32 pb-16 px-4 bg-theme-primary">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-theme-primary mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="font-body text-lg text-theme-secondary max-w-2xl mx-auto">
            Choose the plan that fits your fleet. No hidden fees, no long-term contracts.
            Request early access and scale as you grow.
          </p>
        </div>
      </section>

      {/* Tier cards */}
      <section className="py-16 px-4 bg-theme-secondary">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={cn(
                  'relative rounded-2xl border p-8',
                  tier.highlighted
                    ? 'border-[var(--accent-blue)] shadow-lg'
                    : 'border-theme-medium'
                )}
                style={{
                  backgroundColor: tier.highlighted ? 'var(--glow-blue)' : 'var(--bg-card)'
                }}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-dc-accent">
                    <span className="font-body text-sm font-medium text-dc-text-on-accent">Most Popular</span>
                  </div>
                )}
                <h2 className="font-display text-2xl font-semibold text-theme-primary mb-1">
                  {tier.name}
                </h2>
                <p className="font-body text-sm text-theme-secondary mb-6">{tier.tagline}</p>
                <div className="mb-6">
                  {tier.monthlyPrice !== null ? (
                    <>
                      <span className="font-display text-5xl font-bold text-theme-primary">
                        ${tier.monthlyPrice}
                      </span>
                      <span className="font-body text-theme-secondary">/truck/mo</span>
                      {tier.annualSavingsPct && (
                        <p className="font-body text-sm text-accent-green mt-2">
                          Save {tier.annualSavingsPct}% with annual billing (${tier.annualPrice}/mo)
                        </p>
                      )}
                    </>
                  ) : (
                    <span className="font-display text-4xl font-bold text-theme-primary">Custom</span>
                  )}
                </div>
                <p className="font-body text-sm text-theme-secondary mb-6">{tier.description}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent-green flex-shrink-0 mt-0.5" />
                      <span className="font-body text-sm text-theme-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={tier.id === 'enterprise' ? tier.ctaHref : '/contact'}
                  className={cn(
                    'block w-full text-center py-3 rounded-lg font-body font-medium transition-colors',
                    tier.highlighted
                      ? 'bg-dc-accent text-dc-text-on-accent hover:opacity-90'
                      : tier.id === 'enterprise'
                      ? 'border border-theme-medium text-theme-primary hover:border-theme-primary hover:bg-theme-card-hover'
                      : 'text-theme-primary hover:bg-theme-card-hover'
                  )}
                  style={!tier.highlighted && tier.id !== 'enterprise' ? { backgroundColor: 'var(--bg-card-hover)' } : undefined}
                >
                  {tier.id === 'enterprise' ? tier.ctaLabel : 'Get Early Access'}
                </a>
                {tier.id !== 'enterprise' && (
                  <p className="font-body text-xs text-theme-muted text-center mt-3">
                    Available in early access
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature comparison table */}
      <section className="py-16 px-4 bg-theme-primary">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl font-bold text-theme-primary text-center mb-12">
            Compare Plans
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-theme-medium">
                  <th className="py-4 px-4 text-left font-display text-sm font-semibold text-theme-secondary">
                    Feature
                  </th>
                  {PRICING_TIERS.map((tier) => (
                    <th
                      key={tier.id}
                      className={cn(
                        'py-4 px-4 text-center font-display text-sm font-semibold',
                        tier.highlighted ? 'text-accent-blue' : 'text-theme-secondary'
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
                    className="border-b border-theme-subtle"
                    style={index % 2 === 0 ? { backgroundColor: 'var(--bg-secondary)' } : undefined}
                  >
                    <td className="py-4 px-4 font-body text-sm text-theme-secondary">
                      {feature.name}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <FeatureCell value={feature.basic} />
                    </td>
                    <td className="py-4 px-4 text-center" style={{ backgroundColor: 'var(--glow-blue)' }}>
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
      <section className="py-16 px-4 bg-theme-secondary">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold text-theme-primary mb-4">
            Have Questions?
          </h2>
          <p className="font-body text-theme-secondary mb-8">
            Not sure which plan is right for your fleet? Our team is here to help you
            find the perfect fit.
          </p>
          <a
            href="/contact"
            className="inline-flex px-8 py-3 font-body font-medium rounded-lg transition-colors bg-dc-accent text-dc-text-on-accent hover:opacity-90"
          >
            Talk to Sales
          </a>
        </div>
      </section>
    </main>
  )
}
