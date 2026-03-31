# Stack Research

**Domain:** B2B SaaS Marketing Website — Fleet Management / Logistics
**Project:** DriveCommand Marketing Site
**Researched:** 2026-03-31
**Confidence:** HIGH (core stack verified via npm registry; existing codebase inspected directly)

---

## Context

This is a **standalone marketing website** living inside the existing DriveCommand monorepo
(`apps/web`). The app already runs Next.js + Tailwind + shadcn/ui for the SaaS product itself.
The marketing site is **not** a separate repo — it uses the same `app/` router, with the root
`page.tsx` rendering `<LandingPage />`. The stack below is prescriptive for the marketing
pages specifically, and is fully compatible with (and extends) the existing codebase.

**Key constraint:** The existing app is on Next.js `^16.2.1`, React `^19.2.4`, Tailwind CSS
`^3.4.1`, and shadcn/ui (new-york style, slate base color, CSS variables). Any library added
for the marketing site must be compatible with this baseline.

---

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js (App Router) | `^16.2.1` | Framework, SSG/SSR, routing | Already installed. App Router gives per-route static generation — marketing pages are fully static, zero server cost. File-based metadata API handles SEO without extra libraries. |
| React | `^19.2.4` | UI runtime | Already installed. React 19 RSC support is critical for keeping marketing sections as zero-JS Server Components. |
| TypeScript | `^5.x` (stay on v5) | Type safety | Already installed. Do NOT upgrade to TypeScript 6 (major — breaking changes, not yet ecosystem-stable). Stay on v5. |
| Tailwind CSS | `^3.4.1` | Utility-first styling | Already installed at v3. Do NOT upgrade to Tailwind v4 mid-project — v4 drops `tailwind.config.ts`, moves to CSS-first config, and breaks the existing `tailwind.config.ts` + shadcn/ui setup. Stay on v3 until a dedicated migration sprint. |
| shadcn/ui | CLI `4.1.2`, schema `new-york` | Unstyled component primitives | Already configured (new-york style, slate base, CSS variables). Marketing sections reuse the same design tokens as the app — brand consistency with zero extra effort. |

### Animation

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| `motion` (formerly `framer-motion`) | `^12.38.0` | Scroll-triggered reveals, hero animations, interactive demo | `framer-motion` and `motion` are now the same package at the same version. Use `import { motion } from 'motion/react'` for RSC-compatible tree-shaking. Essential for the "Bloomberg Terminal meets modern SaaS" aesthetic — scroll-synced counters, section fade-ins, staggered feature cards. |

> **Note on framer-motion vs motion:** Both package names resolve to identical code at v12.38.0.
> Use `motion` as the import (it is the canonical name going forward). Install as:
> `npm install motion`

### Typography / Fonts

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| `next/font/google` (built-in) | bundled with Next.js | Font loading — Space Grotesk + IBM Plex Sans | Zero-dependency. Loads fonts with `font-display: swap`, eliminates CLS, self-hosts from Vercel edge, no external DNS lookup. The current layout uses Inter + Poppins; the marketing site overrides these for the `/` route only via a dedicated marketing layout. |

### Forms & Lead Capture

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| `react-hook-form` | `^7.72.0` | Demo request / lead capture forms | Already in ecosystem (used in app). Zero controlled-input re-renders. Better UX than uncontrolled forms for multi-step lead capture. |
| `@hookform/resolvers` | `^5.2.2` | Zod schema binding for forms | Pairs with react-hook-form + zod for server-action-compatible form validation. |
| `zod` | `^4.3.6` | Schema validation | Already installed at v4. Validates lead capture payloads before Server Action submission. |

### Email (Lead Capture Backend)

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| `resend` | `^6.10.0` | Transactional email for lead notifications | Already installed. Send lead-capture notifications to sales team via a single Server Action. No additional service needed. |

### Analytics & Observability

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| `@vercel/analytics` | `^2.0.1` | Page view + custom event tracking | Zero-config on Vercel. Tracks CTA clicks, pricing calculator interactions, demo section engagement without GDPR complexity of GA4 setup. |
| `@vercel/speed-insights` | `^2.0.0` | Core Web Vitals monitoring | Required separately from analytics (breaking change in Next.js 15 removed auto-instrumentation). Add `<SpeedInsights />` to the marketing layout. |

### Interactive Pricing Calculator

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| `recharts` | `^3.8.1` | ROI / savings chart in pricing calculator | Already installed at v3 (major bump from v2). Recharts v3 is fully React 19 compatible with native SVG animations. Renders client-side within a `"use client"` island — keeps surrounding sections as Server Components. |

### SEO

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| `next/metadata` (built-in) | bundled with Next.js | OG images, Twitter cards, canonical URLs, structured data | Next.js 15 App Router metadata API is authoritative — handles all standard SEO needs without `next-seo`. Do NOT install `next-seo`; it adds no value over the built-in API for App Router projects. |
| `@vercel/og` | `^0.11.1` | Programmatic OG image generation | Generates dynamic OG images (truck graphic + page title) at the edge. Vercel hosts this — zero cold start. |

### UI Utilities (already installed, reuse)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `lucide-react` | `^1.7.0` (latest; project pins `^0.564.0`) | Icon system | All marketing icons. Upgrade to `^1.7.0` in a dedicated PR — major version bump has icon renames. |
| `clsx` | `^2.1.1` | Conditional className merging | Pair with `tailwind-merge` for variant-safe class composition. |
| `tailwind-merge` | `^3.5.0` (latest; project pins `^3.4.1`) | Tailwind class conflict resolution | Used in `cn()` utility already. Patch upgrade safe. |
| `class-variance-authority` | `^0.7.1` | Component variant system | Use for any custom marketing-section components with variant props. |
| `sonner` | `^2.0.7` | Toast notifications | Already wired up in root layout. Reuse for lead capture success/error toasts. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| `eslint-config-next` `^16.2.1` | Next.js-aware linting | Already configured. Keep in sync with Next.js version. |
| `vitest` `^4.1.2` | Unit testing | Already configured. Write tests for pricing calculator logic. |
| `@playwright/test` `^1.58.2` | E2E testing | Already configured. Add smoke tests for lead capture form submission. |
| `@sentry/nextjs` `^10.47.0` | Error tracking | Already configured with `onRequestError` hook. Catches Server Action errors from lead capture. |

---

## Installation

The marketing site reuses the existing `apps/web` app. Only new dependencies need installing:

```bash
# Animation (framer-motion is now aliased to motion — same package)
npm install motion

# Vercel observability (required explicitly in Next.js 15+)
npm install @vercel/analytics @vercel/speed-insights @vercel/og

# These are already in package.json — verify they're current:
# react-hook-form, @hookform/resolvers, zod, resend, recharts, sonner
# lucide-react, clsx, tailwind-merge, class-variance-authority
```

```bash
# Dev dependencies — nothing new needed for marketing site
# (vitest, playwright, eslint-config-next already present)
```

---

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| `motion` (`framer-motion`) | CSS animations via Tailwind `animate-*` | Only for simple fade/slide — insufficient for scroll-synced counters, staggered reveals, and interactive demo. Tailwind animation is appropriate for hover states and micro-interactions. |
| `next/font/google` | `@fontsource/space-grotesk` + `@fontsource/ibm-plex-sans` | Only if moving off Vercel edge hosting. `@fontsource` is a valid self-hosted alternative but requires manual CLS handling. `next/font` is simpler and already in the project. |
| `@vercel/analytics` | PostHog (`posthog-js` v1.364.4) | PostHog if you need session replay, funnels, A/B testing, or feature flags alongside analytics. For a marketing site launch, Vercel Analytics is faster to ship. Migrate to PostHog if conversion optimization becomes a priority. |
| `resend` for lead capture | Supabase Edge Function + `nodemailer` | Already using Supabase and nodemailer in the project. For simplicity, centralizing on Resend (already installed) is better — single transactional email service. |
| Next.js built-in metadata API | `next-seo` | `next-seo` is App Router compatible but redundant. It wraps the same metadata API Next.js exposes natively. Do not add it. |
| Recharts for pricing calculator chart | Chart.js / Victory | Recharts v3 is already installed and React 19 compatible. No reason to add a second charting library. |
| Tailwind CSS v3 (stay) | Tailwind CSS v4 | Tailwind v4 is stable but breaks `tailwind.config.ts`, drops `darkMode: ["class"]` syntax, and requires shadcn/ui migration. Wait for official shadcn/ui v4 support guide before upgrading. |
| TypeScript v5 (stay) | TypeScript v6 | TypeScript 6.0 has breaking changes that affect build tooling. The existing monorepo is on `^5` — upgrade only after explicit validation sprint. |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `next-seo` | Redundant with Next.js App Router's built-in metadata API — adds a dependency with zero benefit for App Router projects | `export const metadata` in `layout.tsx` / `page.tsx` |
| `gatsby` or standalone static site generator | Splits codebase — marketing site belongs in the same monorepo app to share auth check, design system, and lead-capture Server Actions | Next.js App Router static generation (`generateStaticParams`, `force-static`) |
| `styled-components` / `emotion` / CSS Modules | Conflicts with Tailwind's utility-first approach and shadcn/ui's CSS variable system; adds runtime overhead | Tailwind CSS + `cn()` + CVA |
| `react-spring` / `GSAP` | GSAP requires commercial license for SaaS. `react-spring` has less DX for scroll-linked animations than `motion`. | `motion` (`framer-motion`) |
| `@tailwindcss/forms` | Interferes with shadcn/ui's form styling which applies its own Radix UI + CSS variable approach | shadcn/ui Form components (`form.tsx`) |
| `react-query` / `@tanstack/react-query` | Marketing pages are static — no async data fetching at runtime. Adds unnecessary bundle weight. | Next.js Server Components with static data (hardcoded demo, static pricing) |
| Tailwind CSS v4 (premature upgrade) | Breaks existing `tailwind.config.ts` configuration, `darkMode: ["class"]` syntax, and shadcn/ui CSS variable integration. Not worth mid-project risk. | Stay on Tailwind CSS v3 for this milestone |
| `lucide-react` major upgrade (v0.x → v1.x) mid-feature | v1.0 renamed many icons — `ChevronRight` → `ChevronRightIcon` etc. — breaking all icon usages site-wide | Upgrade in a dedicated PR with icon-rename codemod |

---

## Stack Patterns by Variant

**For sections that are purely presentational (Hero, Features, Testimonials, Integrations grid):**
- Use React Server Components (no `"use client"`)
- Animate with `motion` using `initial`/`whileInView` props (works in RSC with `motion` v12)
- Zero client-side JS for the section content itself

**For interactive sections (Pricing Calculator, Hardcoded Demo, Lead Capture Form):**
- Wrap in a `"use client"` boundary
- Keep the island as small as possible — pass static data from the RSC parent as props
- Use `react-hook-form` + `zod` for form state; submit via Next.js Server Action

**For the Pricing Calculator specifically:**
- Client component with local `useState` for fleet-size slider
- Recharts `AreaChart` for ROI visualization — render client-side only (`ssr: false` pattern via `next/dynamic`)
- Calculation logic in a pure utility function (testable with Vitest)

**For marketing-specific font override (Space Grotesk + IBM Plex Sans):**
- Create `apps/web/src/app/(marketing)/layout.tsx` as a nested layout
- Declare fonts with `next/font/google`, apply via `className` on `<html>` or `<body>` override
- This scopes brand fonts to marketing routes only, without touching the app's Inter/Poppins setup

---

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| `next@^16.2.1` | `react@^19.2.4`, `react-dom@^19.2.4` | React 19 is the default peer for Next.js 15/16 App Router |
| `motion@^12.38.0` | `react@^18.0.0 \|\| ^19.0.0` | Fully compatible with React 19 |
| `tailwindcss@^3.4.1` | `shadcn/ui` CLI `4.x`, Radix UI `1.x` | shadcn/ui v4 CLI generates components compatible with Tailwind v3. The CSS variable approach works on v3. Do NOT use Tailwind v4 postcss plugin (`@tailwindcss/postcss`) with v3 config. |
| `recharts@^3.8.1` | `react@^19.x` | Recharts v3 dropped React 17 support; v3 is React 18/19 compatible |
| `zod@^4.3.6` | `react-hook-form@^7.72.0`, `@hookform/resolvers@^5.2.2` | Zod v4 requires `@hookform/resolvers` v5+ for correct binding |
| `@vercel/analytics@^2.0.1` | Next.js App Router, React 19 | v2 added React 19 support |
| `lucide-react@^0.564.0` (current) | `shadcn/ui` (uses it internally) | Do NOT upgrade to `^1.7.0` without auditing all icon names in the codebase |
| TypeScript `^5.x` | All above packages | TypeScript 6 is NOT yet safe for this monorepo |

---

## Sources

- npm registry (direct `npm info` queries) — versions verified 2026-03-31 — HIGH confidence
- `/Users/ayazmohammed/DriveCommand/apps/web/package.json` — existing installed versions — HIGH confidence
- `/Users/ayazmohammed/DriveCommand/apps/web/components.json` — shadcn/ui configuration (new-york style, slate, CSS variables) — HIGH confidence
- `/Users/ayazmohammed/DriveCommand/apps/web/tailwind.config.ts` — Tailwind v3 config with CSS variable tokens — HIGH confidence
- Next.js 15 release notes (https://nextjs.org/blog/next-15) — App Router metadata API, no auto Speed Insights instrumentation, Server Actions security — HIGH confidence (direct fetch)
- `framer-motion` npm metadata — confirmed same codebase as `motion` at v12.38.0 — HIGH confidence
- Tailwind CSS v4 incompatibility with existing config: MEDIUM confidence (based on v4 CSS-first config model; recommend validation before upgrading)

---

*Stack research for: DriveCommand marketing website (B2B SaaS, fleet management)*
*Researched: 2026-03-31*
