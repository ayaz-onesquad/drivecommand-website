export interface PricingTier {
  id: 'basic' | 'advanced' | 'enterprise'
  name: string
  tagline: string
  monthlyPrice: number | null   // null = contact for pricing (Enterprise)
  annualPrice: number | null    // null = contact for pricing (Enterprise)
  annualSavingsPct: number | null
  perUnit: string               // e.g. "per truck / month"
  description: string
  features: string[]
  highlighted: boolean          // true = visually emphasized (Growth)
  ctaLabel: string
  ctaHref: string               // Enterprise → /contact; others → sign-up
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'basic',
    name: 'Starter',
    tagline: 'For independent operators',
    monthlyPrice: 29,
    annualPrice: 23,
    annualSavingsPct: 20,
    perUnit: 'per truck / month',
    description: 'Everything you need to dispatch, track, and invoice your fleet.',
    features: [
      'Unlimited trucks',
      'Live GPS tracking',
      'Route & dispatch management',
      'Driver portal access',
      'Invoicing & basic reports',
      'Email support',
    ],
    highlighted: false,
    ctaLabel: 'Start Free Trial',
    ctaHref: 'https://app.drivecommand.co/sign-up',
  },
  {
    id: 'advanced',
    name: 'Growth',
    tagline: 'For growing fleets',
    monthlyPrice: 49,
    annualPrice: 39,
    annualSavingsPct: 20,
    perUnit: 'per truck / month',
    description: 'Advanced analytics, compliance tools, and priority support.',
    features: [
      'Unlimited trucks',
      'Everything in Starter',
      'Maintenance scheduling & alerts',
      'Document storage & compliance',
      'Fuel & safety analytics',
      'Driver payroll tracking',
      'Priority email + chat support',
    ],
    highlighted: true,
    ctaLabel: 'Start Free Trial',
    ctaHref: 'https://app.drivecommand.co/sign-up',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'For large operations',
    monthlyPrice: null,
    annualPrice: null,
    annualSavingsPct: null,
    perUnit: 'custom pricing',
    description: 'Custom contracts, dedicated support, and enterprise integrations.',
    features: [
      'Unlimited trucks',
      'Everything in Growth',
      'Custom integrations & API access',
      'Dedicated account manager',
      'SLA-backed uptime guarantee',
      'Custom onboarding & training',
      'SSO & advanced security',
    ],
    highlighted: false,
    ctaLabel: 'Contact Sales',
    ctaHref: '/contact',
  },
]

/** Helper: get a single tier by id */
export function getPricingTier(id: PricingTier['id']): PricingTier {
  const tier = PRICING_TIERS.find((t) => t.id === id)
  if (!tier) throw new Error(`Pricing tier "${id}" not found`)
  return tier
}

/** Calculator pricing rates - single source of truth (per truck only) */
export const CALCULATOR_RATES = {
  basic: {
    perTruck: 29,
  },
  advanced: {
    perTruck: 49,
  },
} as const

export type CalculatorPlan = keyof typeof CALCULATOR_RATES

/** Calculate monthly price based on plan and truck count */
export function calculatePrice(
  plan: CalculatorPlan,
  trucks: number
): { truckCost: number; total: number } {
  const rates = CALCULATOR_RATES[plan]
  const truckCost = rates.perTruck * trucks
  return {
    truckCost,
    total: truckCost,
  }
}
