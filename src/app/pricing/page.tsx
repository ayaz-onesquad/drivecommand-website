import type { Metadata } from 'next'
import { PRICING_TIERS } from '@/lib/pricing.config'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent pricing for fleets of every size. Start free, upgrade as you grow.',
  openGraph: {
    title: 'DriveCommand Pricing',
    description: 'Simple, transparent pricing for fleets of every size.',
    type: 'website',
  },
}

export default function PricingPage() {
  return (
    <section className="min-h-screen py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-display text-4xl font-bold text-white text-center mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="font-body text-slate-400 text-center mb-16 max-w-xl mx-auto">
          Choose the plan that fits your fleet. No hidden fees, no long-term contracts.
        </p>
        {/* Pricing tier cards — full implementation in Phase 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.id}
              className="rounded-xl border border-slate-800 bg-slate-900/50 p-8"
            >
              <h2 className="font-display text-xl font-semibold text-white mb-1">
                {tier.name}
              </h2>
              <p className="font-body text-sm text-slate-400 mb-4">{tier.tagline}</p>
              <p className="font-display text-3xl font-bold text-white">
                {tier.monthlyPrice !== null ? `$${tier.monthlyPrice}` : 'Custom'}
              </p>
              <p className="font-body text-xs text-slate-500 mb-6">{tier.perUnit}</p>
              <a
                href={tier.ctaHref}
                className="block w-full text-center py-2.5 rounded-lg font-body font-medium text-sm bg-brand-blue text-white hover:bg-blue-500 transition-colors"
              >
                {tier.ctaLabel}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
