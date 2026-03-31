# DriveCommand Marketing Website

## What This Is

Public marketing website for DriveCommand, a multi-tenant SaaS fleet management platform built for small-to-mid-size trucking companies and individual owner operators. The site sells the product, captures leads, and converts visitors into trial users. It is a standalone Next.js 15 app separate from the main application codebase.

## Core Value

Convert visitors into trial sign-ups by demonstrating DriveCommand's value through a professional, logistics-native marketing experience that feels as sharp as the product itself.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] 8-section landing page (hero, problem bar, features grid, demo video, interactive demo, pricing calculator, social proof, final CTA)
- [ ] Sticky navbar with transparent-to-solid scroll transition
- [ ] Dark-themed footer with multi-column links
- [ ] Interactive pricing calculator with configurable rates stored in constants
- [ ] Hardcoded interactive demo mimicking real app UI with scroll/click-triggered steps
- [ ] Demo video section with env-var-driven URL and styled HTML/CSS fallback
- [ ] Responsive design (mobile-first, parallax disabled < 768px)
- [ ] All CTA buttons routing correctly (sign-up, demo scroll, contact)
- [ ] Space Grotesk + IBM Plex Sans typography throughout
- [ ] Framer Motion animations (parallax, scroll-enter, hover lifts, step transitions)
- [ ] /pricing page with full calculator
- [ ] /demo page with interactive walkthrough
- [ ] /about page (team and mission)
- [ ] /contact page with lead capture form

### Out of Scope

- Main app (apps/web/) modifications — this is a separate marketing site
- Backend/API integration — all data is static/hardcoded for MVP
- CMS or blog — no content management system for v1
- Analytics/tracking integration — defer to post-launch
- A/B testing infrastructure — not needed for MVP
- Real video production — use placeholder/fallback until video exists
- Email automation — CTAs link to app sign-up, no drip campaigns

## Context

- DriveCommand app is already built (Next.js 15, Supabase, Prisma, Tailwind, shadcn/ui)
- Brand identity derives from the app: dark navy sidebar (#0f172a), white content area, electric blue CTAs (#3b82f6), status badges in amber/green/purple
- Target market is underserved by enterprise solutions (Samsara, KeepTruckin) — DriveCommand is approachable and affordable
- App modules to feature: Dispatch & Load Management, Live GPS Tracking, Driver & Payroll, Invoicing & Finance, Compliance & Safety, AI-Powered Tools
- Pricing model has three tiers (Basic, Advanced, Enterprise) with per-user/per-truck/per-load pricing that is likely to change
- Enterprise tier routes to /contact page, not external booking tool

## Constraints

- **Tech Stack**: Next.js 15 (App Router), TypeScript (strict), Tailwind CSS, shadcn/ui, Framer Motion, Lucide React — must match app ecosystem
- **Typography**: Space Grotesk (display/headlines) + IBM Plex Sans (body) — NO Inter, Roboto, or Arial
- **Aesthetic**: Logistics-native, data-forward, professional. Bloomberg Terminal meets modern SaaS. NO purple gradients, NO generic SaaS patterns
- **Colors**: Primary dark #0f172a, primary blue #3b82f6, accent amber #f59e0b, accent green #10b981
- **Deployment**: Vercel
- **Pricing Config**: Rates stored in constants/config file, not hardcoded in components
- **Video**: Use `NEXT_PUBLIC_DEMO_VIDEO_URL` env var with HTML/CSS fallback
- **Accessibility**: Target Lighthouse Accessibility > 90

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Space Grotesk + IBM Plex Sans | Technical precision, data-forward feel, distinctive without being cold | — Pending |
| Hardcoded mockups for interactive demo | Realistic app-like feel without API dependency, appropriate for MVP | — Pending |
| Pricing in config file | Numbers likely to change before/after launch, easy to update | — Pending |
| Enterprise CTA → /contact page | Lead capture form on-site rather than external tool | — Pending |
| Standalone site at DriveCommand/ dir | Separate from main app to avoid coupling | — Pending |

---
*Last updated: 2026-03-31 after initialization*
