/**
 * Markdown content for AI crawler mirror routes.
 *
 * Each key corresponds to a slug (e.g., "pricing" → /pricing.md).
 * Content is static markdown optimized for LLM ingestion.
 *
 * TODO: Replace this static map with CMS fetch (e.g., Sanity, Contentful)
 * when dynamic content management is needed. The route handler is already
 * async and ready for that change.
 */

export type PageSlug = 'pricing' | 'about' | 'contact' | 'home';

export const PAGE_CONTENT: Record<PageSlug, string> = {
  home: `# DriveCommand — Fleet Management for Carriers

> Miles Ahead.

DriveCommand gives independent operators and growing fleets one place to dispatch, track, invoice, and stay compliant.

## What We Solve

- Juggling spreadsheets, texts, and paper logs
- Missed loads and communication gaps
- Hours lost to manual invoicing
- Compliance headaches and audit stress

## Core Features

### Live GPS Tracking
Real-time visibility into every truck in your fleet. Know where your assets are, always.

### Route & Dispatch
Assign loads, optimize routes, and keep drivers informed — all from one dashboard.

### Invoicing & Billing
Generate professional invoices automatically. Get paid faster with integrated payment tracking.

### Driver Portal
Give drivers a mobile-first experience for load details, document uploads, and communication.

### Maintenance Scheduling
Track service intervals, schedule preventive maintenance, and reduce downtime.

### Compliance & Documents
Store and organize CDL records, insurance docs, and inspection reports in one secure place.

## Why DriveCommand?

- **Built for Trucking**: Not generic SaaS — every feature designed for fleet operations
- **Scales with You**: From 1 truck to 100+, same powerful tools
- **No Long-Term Contracts**: Month-to-month flexibility
- **Real Support**: Help from people who understand trucking

## Get Started

Visit [drivecommand.io/contact](/contact) to join the waitlist or talk to our team.
`,

  pricing: `# DriveCommand Pricing

Simple, transparent pricing for fleets of every size. No hidden fees, no long-term contracts.

## Plans

### Basic — $29/truck/month
Best for owner-operators and small fleets getting started.

**Includes:**
- Unlimited trucks
- Live GPS tracking
- Route & dispatch
- Driver portal
- Invoicing
- Basic reports
- Email support

*Save 17% with annual billing ($24/mo)*

### Advanced — $49/truck/month
Best for growing fleets that need deeper insights and automation.

**Everything in Basic, plus:**
- Maintenance scheduling
- Document storage
- Fuel analytics
- Safety analytics
- Driver payroll
- Priority email + chat support

*Save 18% with annual billing ($40/mo)*

### Enterprise — Custom Pricing
For large fleets requiring custom solutions and dedicated support.

**Everything in Advanced, plus:**
- Custom integrations
- API access
- Dedicated account manager
- SLA guarantee
- SSO & advanced security
- Custom onboarding
- 24/7 phone + dedicated support

## Feature Comparison

| Feature | Basic | Advanced | Enterprise |
|---------|-------|----------|------------|
| Trucks | Unlimited | Unlimited | Unlimited |
| Live GPS Tracking | ✓ | ✓ | ✓ |
| Route & Dispatch | ✓ | ✓ | ✓ |
| Driver Portal | ✓ | ✓ | ✓ |
| Invoicing | ✓ | ✓ | ✓ |
| Basic Reports | ✓ | ✓ | ✓ |
| Maintenance Scheduling | — | ✓ | ✓ |
| Document Storage | — | ✓ | ✓ |
| Fuel Analytics | — | ✓ | ✓ |
| Safety Analytics | — | ✓ | ✓ |
| Driver Payroll | — | ✓ | ✓ |
| Custom Integrations | — | — | ✓ |
| API Access | — | — | ✓ |

## Questions?

Contact our sales team at [drivecommand.io/contact](/contact) to find the right plan for your fleet.
`,

  about: `# About DriveCommand

Fleet management built by people who get it.

## Our Story

DriveCommand was founded by trucking operators frustrated with clunky, overpriced software. We build the tools we wished we had.

## Mission

We believe every carrier — from owner-operators to growing fleets — deserves powerful, professional tools without the complexity or inflated price tags.

DriveCommand exists to level the playing field. We build software that helps smaller operations compete, grow, and thrive in an industry that often overlooks them.

## By the Numbers

- **2,500+** Fleets Served
- **45,000+** Trucks Managed
- **99.9%** Uptime
- **4.8** Customer Rating

## Our Values

### Built for Trucking
We're not a generic SaaS trying to fit trucking into our box. Every feature is designed for how fleet operators actually work.

### Operator-First
We build for the dispatcher at 5 AM, the owner-operator on the road, and the fleet manager juggling a dozen things at once.

### Focused Simplicity
Most fleet software is bloated. We build what you need, skip what you don't, and make it all work together.

### Reliability Matters
Your business runs 24/7. DriveCommand is built for uptime and performance you can count on, every single day.

## Leadership Team

### Ayaz Mohammed — Co-Founder
Former logistics carrier owner who built and ran a 20-truck fleet. Software engineer who experienced firsthand the gaps in fleet management tools and set out to fix them.

### Sammy Issa — Co-Founder
Owner-operator turned software engineer. Brings real-world experience from behind the wheel and under the hood to every feature we build.

### Nadeem Awawda — Co-Founder
Former dispatcher and software engineer. Knows the daily chaos of coordinating loads and drivers, and builds tools that actually solve those problems.

## Get Started

Ready to see DriveCommand in action? [Join the waitlist](/contact) or [contact our team](/contact).
`,

  contact: `# Contact DriveCommand

Have questions about DriveCommand? Ready to get started? We'll get back to you within one business day.

## Contact Information

- **Email:** team@drivecommand.io
- **Phone:** (219) 487-0146
- **Office:** Munster, IN

## Why DriveCommand?

- Scales with you — 1 truck or 100+
- All features included, no upsells
- Real support from trucking experts
- No long-term contracts required
- Built by carriers, for carriers

## Join the Waitlist

Visit [drivecommand.io/contact](/contact) to fill out our contact form and get started.
`,
};

/**
 * Valid slugs for the markdown route.
 * Used for type checking and validation.
 */
export const VALID_SLUGS = Object.keys(PAGE_CONTENT) as PageSlug[];

/**
 * Check if a string is a valid page slug.
 */
export function isValidSlug(slug: string): slug is PageSlug {
  return VALID_SLUGS.includes(slug as PageSlug);
}
