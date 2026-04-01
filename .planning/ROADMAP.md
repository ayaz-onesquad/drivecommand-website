# Roadmap: DriveCommand Marketing Website

## Overview

Build a standalone Next.js 15 marketing website that converts trucking operators into DriveCommand trial sign-ups. The work moves from project foundation and design system through the full landing page (including interactive pricing calculator and demo), then supporting pages, and finishes with a performance and SEO validation pass before launch.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Project scaffold, design tokens, layout shell, navbar, footer
- [ ] **Phase 2: Landing Page** - All 8 sections: hero through final CTA, including interactive calculator and demo
- [ ] **Phase 3: Supporting Pages** - /pricing, /demo, /about, /contact pages
- [ ] **Phase 4: Polish and Launch** - CTA routing audit, TypeScript, Lighthouse, README

## Phase Details

### Phase 1: Foundation
**Goal**: The marketing site shell exists with correct typography, color system, and persistent layout so every subsequent section has the right visual context from the start.
**Depends on**: Nothing (first phase)
**Requirements**: DESIGN-01, DESIGN-02, DESIGN-03, DESIGN-04, DESIGN-05, TECH-01, LAYOUT-01, LAYOUT-02, LAYOUT-03, LAYOUT-04, LAYOUT-05, LAYOUT-06, PRICE-07
**Plans**: 3 plans
**Success Criteria** (what must be TRUE):
  1. Visiting any page shows Space Grotesk headlines and IBM Plex Sans body text — no Inter, Roboto, or Arial visible anywhere
  2. The navbar is transparent over dark backgrounds and transitions to solid dark on scroll; hamburger menu opens a full-screen drawer on mobile
  3. The dark footer renders a 4-column link grid with copyright bar on every page
  4. The `lib/pricing.config.ts` file exists as the single source of truth for all tier names, rates, and feature flags (no pricing strings in component JSX)
  5. All pages respond correctly from 320px to 1440px+
Plans:
- [x] 01-01-PLAN.md — App router scaffold, dual-font setup, Tailwind brand tokens, cn() utility
- [x] 01-02-PLAN.md — Navbar (transparent-to-solid scroll, mobile drawer, CTA buttons) + Footer (4-column grid)
- [x] 01-03-PLAN.md — Pricing config single source of truth, StatusBadge component, /pricing /contact /about page stubs with SEO metadata

### Phase 2: Landing Page
**Goal**: A fully functional landing page that demonstrates DriveCommand's value — visitors can scroll through all 8 sections, interact with the pricing calculator, step through the interactive demo, and click to sign up.
**Depends on**: Phase 1
**Requirements**: HERO-01, HERO-02, HERO-03, HERO-04, HERO-05, HERO-06, PROB-01, PROB-02, FEAT-01, FEAT-02, FEAT-03, FEAT-04, VIDEO-01, VIDEO-02, VIDEO-03, VIDEO-04, DEMO-01, DEMO-02, DEMO-03, DEMO-04, DEMO-05, PRICE-01, PRICE-02, PRICE-03, PRICE-04, PRICE-05, PRICE-06, PRICE-07, PRICE-08, PRICE-09, SOCIAL-01, SOCIAL-02, SOCIAL-03, CTA-01, CTA-02
**Success Criteria** (what must be TRUE):
  1. Visitor scrolls top-to-bottom and sees all 8 sections in order: hero → problem bar → features grid → demo video → interactive demo → pricing calculator → social proof → final CTA
  2. The interactive demo steps through a 5-step day-in-the-life flow with live React component state changes (status badges transition, values update) — not static images
  3. The pricing calculator shows exact dollar totals from `pricing.config.ts` with a line-item breakdown; adjusting sliders updates the output live
  4. Parallax and scroll animations play on desktop; parallax is disabled and animations remain smooth on screens under 768px
  5. The demo video section renders a styled animated HTML/CSS loads-table mockup when `NEXT_PUBLIC_DEMO_VIDEO_URL` is unset
**Plans**: TBD

Plans:
- [ ] 02-01: Hero section, Problem/Solution bar with animated counters, Features grid
- [ ] 02-02: Demo video section (env-var URL + animated HTML/CSS fallback), Social proof, Final CTA
- [ ] 02-03: Interactive demo component (5-step state machine, React component mockups, scroll/click navigation)
- [ ] 02-04: Pricing calculator component (sliders, package selector, live line-item output panel, Enterprise → /contact routing)

### Phase 3: Supporting Pages
**Goal**: Visitors who want more detail have dedicated pages for pricing exploration, a full demo walkthrough, company background, and lead capture — each page complete and independently navigable.
**Depends on**: Phase 2
**Requirements**: PAGE-01, PAGE-02, PAGE-03, PAGE-04
**Success Criteria** (what must be TRUE):
  1. `/pricing` renders the full calculator (reusing the Phase 2 component) plus a tier comparison table — all numbers from `pricing.config.ts`, Enterprise routes to /contact
  2. `/demo` renders the full interactive walkthrough (reusing the Phase 2 component) with the same step flow
  3. `/contact` renders a lead capture form (name, email, company, fleet size, message) that submits via a Server Action and shows a success/error toast
  4. `/about` renders team and mission content that establishes trust for B2B buyers
**Plans**: TBD

Plans:
- [ ] 03-01: /pricing page (comparison table + full calculator), /demo page (full walkthrough), /about page
- [ ] 03-02: /contact page (lead capture form, Server Action, Resend integration, zod validation, toast feedback)

### Phase 4: Polish and Launch
**Goal**: The site passes Lighthouse thresholds, all CTAs route to the correct destinations, TypeScript is clean, and a developer can onboard from the README — the site is ready to deploy.
**Depends on**: Phase 3
**Requirements**: TECH-02, TECH-03, TECH-04, TECH-05
**Success Criteria** (what must be TRUE):
  1. `npx tsc --noEmit` exits with zero errors
  2. "Start Free Trial" routes to `app.drivecommand.com/sign-up`, "Watch the Demo" scrolls to the video section, "Contact Sales" routes to /contact — verified across every page
  3. Lighthouse scores: Performance > 85 and Accessibility > 90 on the homepage
  4. README documents local dev setup clearly enough that a new developer can run the site without asking questions
**Plans**: TBD

Plans:
- [ ] 04-01: TypeScript audit, CTA routing verification, Lighthouse run, README

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 3/3 | Complete | 2026-03-31 |
| 2. Landing Page | 0/4 | Not started | - |
| 3. Supporting Pages | 0/2 | Not started | - |
| 4. Polish and Launch | 0/1 | Not started | - |
