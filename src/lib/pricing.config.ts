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
  highlighted: boolean          // true = visually emphasized (Advanced)
  ctaLabel: string
  ctaHref: string               // Enterprise → /contact; others → sign-up
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'basic',
    name: 'Basic',
    tagline: 'For independent operators',
    monthlyPrice: 49,
    annualPrice: 39,
    annualSavingsPct: 20,
    perUnit: 'per truck / month',
    description: 'Everything you need to dispatch, track, and invoice your fleet.',
    features: [
      'Up to 5 trucks',
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
    name: 'Advanced',
    tagline: 'For growing fleets',
    monthlyPrice: 99,
    annualPrice: 79,
    annualSavingsPct: 20,
    perUnit: 'per truck / month',
    description: 'Advanced analytics, compliance tools, and priority support.',
    features: [
      'Up to 25 trucks',
      'Everything in Basic',
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
      'Everything in Advanced',
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

/** Calculator pricing rates - single source of truth */
export const CALCULATOR_RATES = {
  basic: {
    perUser: 5,
    perTruck: 5,
    perLoad: 0.5,
  },
  advanced: {
    perUser: 10,
    perTruck: 7,
    perLoad: 0.5,
  },
} as const

export type CalculatorPlan = keyof typeof CALCULATOR_RATES

/** Calculate monthly price based on plan and usage */
export function calculatePrice(
  plan: CalculatorPlan,
  users: number,
  trucks: number,
  loads: number
): { userCost: number; truckCost: number; loadCost: number; total: number } {
  const rates = CALCULATOR_RATES[plan]
  const userCost = rates.perUser * users
  const truckCost = rates.perTruck * trucks
  const loadCost = rates.perLoad * loads
  return {
    userCost,
    truckCost,
    loadCost,
    total: userCost + truckCost + loadCost,
  }
}
