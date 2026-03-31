# Requirements: DriveCommand Marketing Website

**Defined:** 2026-03-31
**Core Value:** Convert visitors into trial sign-ups by demonstrating DriveCommand's value through a professional, logistics-native marketing experience.

## v1 Requirements

### Layout & Navigation

- [ ] **LAYOUT-01**: Sticky navbar that transitions from transparent to solid dark on scroll
- [ ] **LAYOUT-02**: Navbar shows logo (DC mark + DriveCommand wordmark), nav links (Features, Pricing, Demo, About), Sign In (ghost) + Start Free Trial (filled blue)
- [ ] **LAYOUT-03**: Mobile navbar with hamburger menu and full-screen slide-down drawer
- [ ] **LAYOUT-04**: Dark footer with 4-column grid (Product, Company, Resources, Legal) and bottom copyright bar
- [ ] **LAYOUT-05**: All pages responsive from mobile (320px) to desktop (1440px+)
- [ ] **LAYOUT-06**: SEO metadata on all pages (title, description, OG tags) using Next.js metadata API

### Hero Section

- [ ] **HERO-01**: Full-viewport dark section (#0f172a) with parallax background (animated SVG route lines or dot-grid)
- [ ] **HERO-02**: Bold display headline and subheadline with the specified copy
- [ ] **HERO-03**: Two CTA buttons: "Start Free Trial" (primary blue) + "Watch the Demo" (ghost, scrolls to video section)
- [ ] **HERO-04**: Trust line below CTAs: "No credit card required · Setup in under 10 minutes · Cancel anytime"
- [ ] **HERO-05**: Fade+slide-up entrance animation on scroll, parallax at 0.5x speed
- [ ] **HERO-06**: Parallax disabled on screens < 768px

### Problem/Solution Bar

- [ ] **PROB-01**: Dark bar with 3 horizontal stat-style cards displaying the specified statistics
- [ ] **PROB-02**: Animated number counters that trigger on scroll-enter

### Features Grid

- [ ] **FEAT-01**: Light background section with 6-card grid (2 columns desktop, 1 mobile)
- [ ] **FEAT-02**: Each card has icon, title, description matching the 6 app modules (Dispatch, GPS, Driver/Payroll, Invoicing, Compliance, AI Tools)
- [ ] **FEAT-03**: Subtle hover lift animation on each card
- [ ] **FEAT-04**: Each card has a "Learn more" link (anchor or tooltip)

### Demo Video Section

- [ ] **VIDEO-01**: Dark background section with centered video embed placeholder
- [ ] **VIDEO-02**: Video URL driven by `NEXT_PUBLIC_DEMO_VIDEO_URL` env var
- [ ] **VIDEO-03**: When no video URL set, display animated HTML/CSS mockup of the loads table (matching app screenshot: Load #, Customer, Route, Pickup Date, Rate, Driver, Status with colored badges)
- [ ] **VIDEO-04**: CTA below: "Ready to try it yourself?" → "Start Free Trial"

### Interactive Demo

- [ ] **DEMO-01**: Light section with sticky sidebar showing progress steps
- [ ] **DEMO-02**: 5-step day-in-the-life flow (new load → assign driver → track → deliver/invoice → profit check)
- [ ] **DEMO-03**: Each step rendered as hardcoded React components mimicking real app UI with state transitions
- [ ] **DEMO-04**: Steps transition on scroll or button click with slide/fade animation
- [ ] **DEMO-05**: CTA at end: "Run your operation like this — Start Free"

### Pricing Calculator

- [ ] **PRICE-01**: Dark section with three-column package cards (Basic, Advanced, Enterprise)
- [ ] **PRICE-02**: Package cards show feature breakdowns for each tier
- [ ] **PRICE-03**: Enterprise card shows "Contact Sales" linking to /contact instead of calculator
- [ ] **PRICE-04**: Interactive calculator with sliders/steppers for trucks (1-50), users (1-100), loads/month (1-500)
- [ ] **PRICE-05**: Package selector (Basic/Advanced radio) with live price output panel
- [ ] **PRICE-06**: Pricing formulas: Basic ($5×users + $5×trucks + $0.50×loads), Advanced ($10×users + $7×trucks + $0.50×loads)
- [ ] **PRICE-07**: All pricing numbers stored in a config/constants file (lib/pricing.ts), not hardcoded in components
- [ ] **PRICE-08**: Line-item breakdown in the output panel
- [ ] **PRICE-09**: CTA: "Get Started at This Price" → sign-up link

### Social Proof

- [ ] **SOCIAL-01**: Light section with 3 placeholder testimonial cards (avatar initials, name, company type, quote)
- [ ] **SOCIAL-02**: Realistic placeholder content: owner operator, small carrier (10 trucks), dispatch company
- [ ] **SOCIAL-03**: Trust logos row: "Secured with AES-256 encryption · SOC 2 in progress · 99.9% uptime SLA"

### Final CTA

- [ ] **CTA-01**: Full-width dark section with parallax background (same as hero)
- [ ] **CTA-02**: Headline, subheadline, and single "Start Your Free Trial" CTA button

### Additional Pages

- [ ] **PAGE-01**: /pricing page with full pricing calculator (reuses PricingCalculator component)
- [ ] **PAGE-02**: /contact page with lead capture form (name, email, company, fleet size, message)
- [ ] **PAGE-03**: /demo page with full interactive walkthrough (reuses InteractiveDemo component)
- [ ] **PAGE-04**: /about page with team/mission content

### Design System

- [ ] **DESIGN-01**: Space Grotesk (display/headlines) + IBM Plex Sans (body) configured in globals.css and layout.tsx
- [ ] **DESIGN-02**: Color system: primary dark #0f172a, primary blue #3b82f6, accent amber #f59e0b, accent green #10b981
- [ ] **DESIGN-03**: Status badges matching app: In Transit (amber), Delivered (green), Dispatched (purple/indigo), Invoiced (blue)
- [ ] **DESIGN-04**: All animations use Framer Motion (motion package)
- [ ] **DESIGN-05**: No Inter, Roboto, Arial, or purple gradients anywhere

### Technical

- [ ] **TECH-01**: Next.js 15 App Router with TypeScript strict mode
- [ ] **TECH-02**: Zero TypeScript errors (npx tsc --noEmit passes)
- [ ] **TECH-03**: All CTA buttons route correctly (Start Free Trial → app.drivecommand.com/sign-up, Watch Demo → scroll, Contact Sales → /contact)
- [ ] **TECH-04**: Lighthouse Performance > 85, Accessibility > 90
- [ ] **TECH-05**: README with local dev instructions

## v2 Requirements

### Lead Capture & Analytics

- **LEAD-01**: Email automation / drip campaigns on sign-up
- **LEAD-02**: Analytics and conversion tracking (PostHog or similar)
- **LEAD-03**: A/B testing infrastructure for hero copy and CTA variants

### Content

- **CONT-01**: Blog / content marketing section
- **CONT-02**: Case studies page with real customer stories
- **CONT-03**: Real demo video production and hosting

### Advanced Features

- **ADV-01**: Live chat widget
- **ADV-02**: ROI calculator (input current costs, show savings with DriveCommand)
- **ADV-03**: Comparison page (DriveCommand vs Samsara vs KeepTruckin)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Main app modifications | Marketing site is separate from apps/web/ |
| Backend/API integration | All data static/hardcoded for MVP |
| CMS or blog | No content management needed for v1 |
| Real video production | Use HTML/CSS fallback until video exists |
| Live chat | Operationally burdensome for a small team |
| Email drip campaigns | Defer to post-launch |
| Tailwind v4 migration | Breaking changes; separate milestone |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| LAYOUT-01 | Phase 1 | Pending |
| LAYOUT-02 | Phase 1 | Pending |
| LAYOUT-03 | Phase 1 | Pending |
| LAYOUT-04 | Phase 1 | Pending |
| LAYOUT-05 | Phase 1 | Pending |
| LAYOUT-06 | Phase 1 | Pending |
| HERO-01 | Phase 2 | Pending |
| HERO-02 | Phase 2 | Pending |
| HERO-03 | Phase 2 | Pending |
| HERO-04 | Phase 2 | Pending |
| HERO-05 | Phase 2 | Pending |
| HERO-06 | Phase 2 | Pending |
| PROB-01 | Phase 2 | Pending |
| PROB-02 | Phase 2 | Pending |
| FEAT-01 | Phase 2 | Pending |
| FEAT-02 | Phase 2 | Pending |
| FEAT-03 | Phase 2 | Pending |
| FEAT-04 | Phase 2 | Pending |
| VIDEO-01 | Phase 2 | Pending |
| VIDEO-02 | Phase 2 | Pending |
| VIDEO-03 | Phase 2 | Pending |
| VIDEO-04 | Phase 2 | Pending |
| DEMO-01 | Phase 2 | Pending |
| DEMO-02 | Phase 2 | Pending |
| DEMO-03 | Phase 2 | Pending |
| DEMO-04 | Phase 2 | Pending |
| DEMO-05 | Phase 2 | Pending |
| PRICE-01 | Phase 2 | Pending |
| PRICE-02 | Phase 2 | Pending |
| PRICE-03 | Phase 2 | Pending |
| PRICE-04 | Phase 2 | Pending |
| PRICE-05 | Phase 2 | Pending |
| PRICE-06 | Phase 2 | Pending |
| PRICE-07 | Phase 1 | Pending |
| PRICE-08 | Phase 2 | Pending |
| PRICE-09 | Phase 2 | Pending |
| SOCIAL-01 | Phase 2 | Pending |
| SOCIAL-02 | Phase 2 | Pending |
| SOCIAL-03 | Phase 2 | Pending |
| CTA-01 | Phase 2 | Pending |
| CTA-02 | Phase 2 | Pending |
| PAGE-01 | Phase 3 | Pending |
| PAGE-02 | Phase 3 | Pending |
| PAGE-03 | Phase 3 | Pending |
| PAGE-04 | Phase 3 | Pending |
| DESIGN-01 | Phase 1 | Pending |
| DESIGN-02 | Phase 1 | Pending |
| DESIGN-03 | Phase 1 | Pending |
| DESIGN-04 | Phase 1 | Pending |
| DESIGN-05 | Phase 1 | Pending |
| TECH-01 | Phase 1 | Pending |
| TECH-02 | Phase 4 | Pending |
| TECH-03 | Phase 4 | Pending |
| TECH-04 | Phase 4 | Pending |
| TECH-05 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 55 total
- Mapped to phases: 55
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-31*
*Last updated: 2026-03-31 after roadmap creation*
