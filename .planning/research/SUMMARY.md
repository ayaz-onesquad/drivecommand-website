# Project Research Summary

**Project:** DriveCommand Marketing Website
**Domain:** B2B SaaS Marketing Website — Fleet Management / Logistics
**Researched:** 2026-03-31
**Confidence:** MEDIUM (stack HIGH, features MEDIUM, pitfalls MEDIUM, architecture not researched)

## Executive Summary

DriveCommand is a fleet management SaaS targeting owner-operators and small carriers (1-25 trucks) — a segment that is underserved by enterprise competitors like Samsara and Motive who pitch to 50+ truck fleets. The marketing site lives inside the existing `apps/web` Next.js monorepo and must convert skeptical trucking operators who have been burned by enterprise software complexity and hidden pricing. The recommended approach is a high-performance Next.js 15 App Router site using React Server Components for all static sections (hero, features, testimonials) with minimal client-side islands for interactive elements (pricing calculator, interactive demo, lead capture form). This architecture keeps Core Web Vitals excellent for owner-operators browsing on rural LTE from mid-range Android phones.

The primary conversion differentiators are transparent live pricing (exact dollar amounts, not "contact sales") and an ungated interactive demo that lets prospects self-qualify without entering an email. These two features directly address the trust deficit trucking operators have with enterprise SaaS. Building these correctly — with exact numbers from a centralized pricing config, and with React component-based mockups rather than static screenshots — is the highest-leverage investment. The interactive demo in particular must feel like the real product, not a slide deck, or it reinforces distrust rather than building it.

The greatest risks are: (1) copy defaulting to enterprise SaaS voice ("streamline," "leverage") that alienates the trucker audience, (2) the interactive demo being built as static images instead of React components with live state changes, (3) Framer Motion animations causing jank on mobile devices, and (4) pricing constants getting out of sync across the landing page, /pricing page, and calculator. All four can be prevented with explicit acceptance criteria in each phase — they are discipline failures, not technical failures.

---

## Key Findings

### Recommended Stack

The marketing site reuses the existing `apps/web` Next.js 16 / React 19 / Tailwind CSS v3 / shadcn/ui stack. Three net-new dependencies are needed: `motion` (framer-motion v12, for scroll-triggered animations), `@vercel/analytics` + `@vercel/speed-insights` (required explicitly in Next.js 15+), and `@vercel/og` (for dynamic Open Graph images). Everything else — `react-hook-form`, `zod`, `recharts`, `resend`, `sonner`, `lucide-react` — is already installed.

Two critical version constraints must not be violated: do not upgrade to Tailwind CSS v4 (breaks existing `tailwind.config.ts` and shadcn/ui CSS variable integration) and do not upgrade to TypeScript 6 (breaking changes, not yet ecosystem-stable). Both upgrades should be deferred to dedicated migration sprints after the marketing site ships.

**Core technologies:**
- **Next.js 16 (App Router):** Framework and SSG/SSR — already installed; static generation is zero-server-cost for marketing pages
- **React Server Components:** Architecture pattern — keeps 95% of marketing sections as zero-JS with no bundle impact
- **motion (framer-motion v12):** Animations — `import { motion } from 'motion/react'` for RSC-compatible tree-shaking; install as `npm install motion`
- **Tailwind CSS v3 + shadcn/ui:** Styling — already configured at new-york style, slate base, CSS variables; do not upgrade to v4
- **recharts v3:** Pricing calculator chart — already installed; fully React 19 compatible; wrap in `next/dynamic({ ssr: false })`
- **resend:** Lead capture email — already installed; call only from Server Actions, never from client components
- **react-hook-form + zod v4 + @hookform/resolvers v5:** Forms — already installed; use shadcn/ui `<Form>` wrapper with `<FormField>` for correct error display

### Expected Features

The site requires a full landing page (8 sections), plus four supporting pages (/pricing, /demo, /about, /contact). The landing page sections in order: sticky navbar, hero, problem bar, features grid, demo video section, interactive demo, inline pricing calculator, social proof, final CTA, footer.

**Must have (table stakes — missing these kills trust):**
- Hero with clear headline naming the audience ("for trucking companies") and ungated primary CTA
- Problem bar targeting the spreadsheet-user persona ("done with Excel," disconnected tools)
- Features grid — 6 cards for DriveCommand modules (Dispatch, GPS, Driver/Payroll, Invoicing, Compliance, AI Tools)
- Demo video section with a styled fallback (not a gray placeholder) when env var is unset
- Social proof section with real or role-attributed testimonials (never fabricated)
- Sticky navbar with filled CTA button visible in both transparent and solid scroll states
- Footer with Privacy Policy, Terms of Service, Contact
- /contact page with a lead capture form of 4-5 fields maximum
- Mobile responsiveness — owner-ops browse on phones, often in poor connectivity
- /about page — ghost company = no trust for B2B buyers

**Should have (differentiators against Samsara/Motive):**
- Interactive day-in-the-life demo — ungated, built as React components with live state changes (status badges, data values), not static screenshots
- Pricing calculator on landing page and /pricing — shows exact dollar amounts for Basic and Advanced tiers, no hedging language; only Enterprise routes to /contact
- Transparent per-truck pricing model — explicitly framed to contrast with competitor opacity
- Vertical-specific language throughout — "loads," "dispatch," "drivers," "HOS," "DOT" — not generic SaaS vocabulary
- Single-platform positioning — "replace 5 tools with one" conversion argument
- Fast performance — LCP < 2.5s, CLS < 0.1 — measurable conversion impact for rural LTE users

**Defer (v2+):**
- Blog / content marketing — needs 10+ posts before linking from nav; editorial process required
- Live chat — operational burden; adds friction for skeptical truckers; defer until conversion data demands it
- Case studies — require customer collaboration and legal sign-off; use testimonial cards as interim
- Comparison pages ("DriveCommand vs Samsara") — high SEO value but needs legal review; defer to v2
- Integration marketplace / partner page — high mid-market credibility, out of MVP scope

### Architecture Approach

Architecture research was not completed (ARCHITECTURE.md was not written by the parallel research agent). The following is derived from STACK.md and PITFALLS.md. The recommended architecture is a **hybrid RSC + Client Island pattern** using Next.js App Router route groups. A `(marketing)` route group gets its own layout (`app/(marketing)/layout.tsx`) that applies the marketing-specific font stack (Space Grotesk + IBM Plex Sans via `next/font/google`), Vercel Analytics, and Speed Insights without affecting the app's existing layout.

**Major components:**
1. **Marketing layout (`app/(marketing)/layout.tsx`)** — scopes fonts, analytics, and Speed Insights to marketing routes only; root layout unchanged
2. **Static RSC sections (Hero, Problem Bar, Features Grid, Social Proof, Final CTA)** — zero client-side JS; animated with `motion` using `whileInView` props which are RSC-compatible in motion v12
3. **Interactive client islands** — `PricingCalculator` (fleet size slider + Recharts ROI chart), `InteractiveDemo` (step state machine with React component mockups), `LeadCaptureForm` (react-hook-form + zod + Server Action) — each wrapped in `next/dynamic` for code-splitting
4. **Pricing constants file (`lib/pricing.config.ts`)** — single source of truth for all tier names, rates, limits, and feature inclusion flags; all pricing surfaces (landing page calculator, /pricing comparison table) render from this file
5. **Server Actions** — lead capture form submission calls `resend.emails.send()` server-side; `RESEND_API_KEY` never exposed as `NEXT_PUBLIC_*`
6. **Static pages** (/pricing, /demo, /about, /contact) — fully statically generated at build time; no server runtime cost

### Critical Pitfalls

1. **Enterprise SaaS copy voice** — Defaulting to "streamline workflows" and "empower your team" alienates truckers. Every section must pass the test: "Would an owner-operator read this and think 'this is for me'?" Replace "workspace" → "dashboard," "team" → "fleet," "projects" → "loads." This is a copy discipline issue, not a technical issue — flag it as a mandatory review checkpoint before each section ships.

2. **Interactive demo built as static images** — Using `<img src="mockup-step-1.png">` looks like a slide deck. Each demo step must include at least one status change (e.g., load card transitioning "Pending" → "In Transit" → "Delivered" with badge color changes) and at least one value change (e.g., payroll row hours updating). Build demo mockups as React components with hardcoded data props, not image files. Recovery from the static-image approach requires a full rebuild.

3. **Framer Motion mobile jank** — Parallax effects that look polished on a MacBook cause paint storms on mid-range Android (the dominant device among owner-operators). Gate all `useScroll` + `useTransform` effects with `window.innerWidth >= 768`. Use `useReducedMotion()` unconditionally. Simple fade/slide-up reveal animations are fine on mobile if stagger delay ≤ 100ms and transform distance ≤ 20px. Test with Chrome DevTools throttled to "Mid-tier mobile" profile.

4. **Pricing constants out of sync** — Hardcoding tier names and rates as string literals in component JSX means three surfaces (landing page calculator, /pricing comparison table, /pricing FAQ) diverge when pricing changes. Centralize everything: tier names, rates, feature inclusion flags, and limits in `pricing.config.ts`. Components render `PRICING_CONFIG.tiers[0].name`, never the string `"Basic"`.

5. **Fake testimonials** — Fabricated testimonials are detectable by trucking operators who share screenshots in Facebook groups. The recovery cost is catastrophic. Use real beta user quotes with permission, or role-attributed placeholders ("Owner-operator, 3 trucks, Texas"), or explicitly no testimonials. Never use AI-generated quotes.

---

## Implications for Roadmap

Based on the combined research, the natural phase structure follows three dependency chains: (1) foundation and structure before any content, (2) static content sections before interactive islands, (3) supporting pages after the landing page is validated.

### Phase 1: Foundation and Routing Setup
**Rationale:** The marketing site needs a `(marketing)` route group with its own layout before any sections can be built. This is a zero-user-visible step but everything else depends on it. The pricing constants file must also be defined here — before any pricing UI exists — so it is never built around hardcoded values.
**Delivers:** `app/(marketing)/layout.tsx` with Space Grotesk + IBM Plex Sans fonts, Vercel Analytics, Speed Insights; `lib/pricing.config.ts` with all tier definitions, rates, feature flags; sticky navbar component with transparent-to-solid scroll behavior and filled CTA button.
**Addresses:** Pitfall 4 (pricing constants out of sync — solved by creating the config first), Pitfall 8 (navbar CTA invisible on dark background — solved by explicit acceptance criterion)
**Research flag:** Standard patterns — skip research-phase. Next.js route groups are well-documented; pricing config is a straightforward TypeScript file.

### Phase 2: Static Landing Page Sections
**Rationale:** All RSC sections (Hero, Problem Bar, Features Grid, Social Proof, Final CTA, Footer) are zero-JS and have no dependencies on each other. Build them as a batch. Copy tone must be validated against the "would a trucker read this?" test before any section ships.
**Delivers:** Fully static, lighthouse-passing landing page skeleton with all non-interactive sections and complete copy.
**Addresses:** Pitfall 1 (enterprise SaaS voice — mandatory copy review checkpoint), Pitfall 9 (fake testimonials — sign-off on testimonial source)
**Uses:** React Server Components (no `"use client"`), `motion` with `whileInView` for scroll-triggered reveals, Tailwind CSS + shadcn/ui tokens, `lucide-react` icons.
**Research flag:** Standard patterns for RSC sections. Motion v12 + RSC compatibility is documented in STACK.md. No research-phase needed.

### Phase 3: Interactive Client Islands
**Rationale:** The pricing calculator and interactive demo are the primary conversion differentiators. They are also the highest-complexity, highest-risk features. Building them after the static scaffold means they slot into a working page with correct layout context.
**Delivers:** `PricingCalculator` client component (fleet-size slider, Recharts ROI chart, hard dollar output, Enterprise routing to /contact); `InteractiveDemo` client component (step state machine, React component mockups with live state changes, touch-compatible navigation); demo video section with styled fallback.
**Addresses:** Pitfall 2 (pricing opacity — calculator must show exact rates, no hedging language), Pitfall 3 (Framer Motion mobile jank — all scroll animations gated by viewport width), Pitfall 4 (pricing constants — calculator renders from `pricing.config.ts`), Pitfall 6 (demo video fallback — must look intentional, not like a broken embed), Technical pitfall (Recharts SSR — wrapped in `next/dynamic({ ssr: false })`), Technical pitfall (motion bundle bloat — interactive demo wrapped in `next/dynamic`)
**Research flag:** Likely needs research-phase during planning. The interactive demo step state machine and mockup component architecture have implementation choices that benefit from deliberate design. Specifically: the data model for demo steps, the approach to touch/click navigation, and the shadcn/ui component reuse pattern for mockups.

### Phase 4: Lead Capture Backend
**Rationale:** The /contact page and lead capture form require a Server Action that calls Resend. This is a backend integration that should be built and tested in isolation before being wired into the full site.
**Delivers:** `/contact` page with 4-5 field lead capture form (react-hook-form + zod + shadcn/ui `<Form>`); Server Action calling `resend.emails.send()` with server-side Zod validation; success/error toast via `sonner`; rate-limiting or honeypot field to prevent form spam.
**Addresses:** Pitfall 7 (lead form with too many fields — 4 fields max, no phone required), Security (Resend API key never in `NEXT_PUBLIC_*`), Security (server-side Zod validation independent of client validation)
**Research flag:** Standard patterns. Resend + Server Action + react-hook-form is a well-documented pattern. No research-phase needed.

### Phase 5: Supporting Pages
**Rationale:** /pricing, /demo, and /about depend on the landing page components being complete (pricing calculator, interactive demo are expanded/reused). They also have lower conversion priority than the landing page itself.
**Delivers:** `/pricing` page with full tier comparison table (rendered from `pricing.config.ts`), full pricing calculator, and /pricing FAQ addressing trucking-specific objections (contract terms, seasonal pause, offline connectivity, IFTA, ELD distinction); `/demo` page with full interactive walkthrough; `/about` page with founding story and mission.
**Addresses:** Pitfall 13 (/pricing FAQ missing trucking-specific objections), Pitfall 4 (pricing constants — comparison table uses same config as calculator)
**Research flag:** Standard patterns for static Next.js pages. The /pricing FAQ content (not the code) may benefit from a light domain research pass to ensure the 5 objections listed in PITFALLS.md are current.

### Phase 6: SEO and Performance Validation
**Rationale:** OG images, canonical metadata, and Core Web Vitals verification should be a dedicated phase after content is stable. Running Lighthouse against placeholder content gives misleading scores.
**Delivers:** `generateMetadata` per-route metadata; `@vercel/og` dynamic OG images for homepage, /pricing, /demo; Core Web Vitals verification (LCP < 2.5s, CLS < 0.1); Lighthouse audit passing all categories.
**Addresses:** Performance pitfall (unoptimized hero image causing LCP > 2.5s), Performance pitfall (motion bundle in initial chunk), Technical pitfall (CLS from un-skeletonized lazy-loaded sections)
**Research flag:** Standard patterns. Next.js metadata API and Vercel OG are well-documented. No research-phase needed.

### Phase Ordering Rationale

- Phase 1 before all others because the pricing config must exist before any pricing UI, and the route group layout must exist before any section can use the correct fonts/analytics.
- Phases 2 and 3 are ordered static-before-interactive because RSC sections provide the layout scaffolding that client islands slot into.
- Phase 4 (lead capture backend) can overlap with Phase 3 since it has no dependency on the interactive islands.
- Phases 5 and 6 are last because they depend on the landing page being stable.

### Research Flags

Phases needing deeper research during planning:
- **Phase 3 (Interactive Demo):** The step state machine and mockup component architecture need deliberate design. The PITFALLS.md requirement ("each step must have at least one value-change and one status-change") implies a data model for steps that should be specified before implementation begins.

Phases with standard patterns (skip research-phase):
- **Phase 1 (Foundation):** Next.js route groups and TypeScript config files are well-documented.
- **Phase 2 (Static Sections):** RSC + motion v12 whileInView is documented. Copy tone is the risk, not the code pattern.
- **Phase 4 (Lead Capture):** Resend + Server Action + react-hook-form is a well-documented integration.
- **Phase 5 (Supporting Pages):** Standard Next.js static pages with shared components.
- **Phase 6 (SEO/Performance):** Next.js metadata API and Lighthouse auditing are well-documented.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Versions verified against npm registry and existing `package.json` on 2026-03-31. Tailwind v4 and TypeScript 6 upgrade warnings are well-grounded in published release notes. |
| Features | MEDIUM | Web research was unavailable; competitor analysis drawn from training data through mid-2025. Feature table stakes and differentiators are structurally stable B2B SaaS patterns unlikely to have changed materially. Specific competitor pricing/demo changes since mid-2025 are unverified. |
| Architecture | LOW | No ARCHITECTURE.md was produced. Architecture recommendations in this summary are synthesized from STACK.md patterns and PITFALLS.md implementation guidance. A dedicated architecture research pass is recommended before finalizing Phase 3 (interactive demo state model). |
| Pitfalls | MEDIUM | Drawn from training knowledge through mid-2025. Mobile performance, pricing transparency psychology, and testimonial trust dynamics are stable patterns. Device demographic specifics (Android vs iOS split among truckers) may have shifted. |

**Overall confidence:** MEDIUM

### Gaps to Address

- **ARCHITECTURE.md was not written:** The architecture researcher did not produce a file. The roadmap should treat Phase 3 (interactive demo) as requiring a light research-phase during planning to design the step state machine and mockup component model before implementation begins.
- **No live competitor research:** Features and competitor analysis is from training data through mid-2025. Before finalizing roadmap, a quick manual review of Samsara, Motive, and Fleetio's current marketing sites would confirm whether the "ungated interactive demo" differentiator remains unclaimed. If a competitor has shipped one since mid-2025, the differentiator framing should be adjusted.
- **Trucking operator device demographics:** PITFALLS.md recommends mid-range Android testing but the Android/iOS split among owner-operators may have shifted since the training data. The mobile performance requirement (LCP < 2.5s, no jank) stands regardless — but device-lab testing priority should reflect the actual split.
- **Testimonial sourcing:** FEATURES.md and PITFALLS.md both flag that real testimonials are needed. This is a content dependency, not a technical one. The roadmap should include a customer outreach task that runs in parallel with Phase 2 (static sections) to have real quotes ready when the social proof section ships.

---

## Sources

### Primary (HIGH confidence)
- `/Users/ayazmohammed/DriveCommand/apps/web/package.json` — existing installed versions verified directly
- `/Users/ayazmohammed/DriveCommand/apps/web/components.json` — shadcn/ui configuration
- npm registry (direct `npm info` queries, 2026-03-31) — all version numbers in STACK.md
- Next.js 15 release notes (nextjs.org/blog/next-15) — App Router metadata API, Speed Insights changes
- DriveCommand PROJECT.md — product requirements and target audience

### Secondary (MEDIUM confidence)
- Training knowledge of Samsara, Fleetio, Motive, Geotab marketing sites (through mid-2025) — competitor feature comparison
- B2B SaaS conversion patterns: HubSpot Research, CXL Institute, growth.design (through mid-2025) — feature prioritization and UX pitfalls
- Fleet management vertical buyer psychology — owner-operator and small carrier segment behavior
- Framer Motion v12 mobile performance characteristics — animation pitfall guidance

### Tertiary (LOW confidence)
- Architecture recommendations — synthesized from STACK.md and PITFALLS.md; no dedicated architecture research was conducted
- Trucking operator device demographics (Android vs iOS) — training data through mid-2025, may be outdated

---

*Research completed: 2026-03-31*
*Note: ARCHITECTURE.md was not produced by the research agent. Architecture guidance in this summary is synthesized from available research files.*
*Ready for roadmap: yes*
