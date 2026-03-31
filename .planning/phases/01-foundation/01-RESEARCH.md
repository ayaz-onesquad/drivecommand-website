# Phase 1: Foundation - Research

**Researched:** 2026-03-31
**Domain:** Next.js 15 App Router, Tailwind CSS v3, motion v12, Google Fonts, shadcn/ui, monorepo setup
**Confidence:** HIGH

---

## Summary

This phase scaffolds `apps/marketing/` as a new Next.js app inside the existing DriveCommand Turborepo. The existing monorepo uses npm workspaces, turbo v2, Next.js 16.2.1 (Next 15 lineage), React 19.2.4, Tailwind CSS 3.4.1, and TypeScript strict mode. The marketing app must match exact version parity with the web app to avoid dependency conflicts.

The typography system uses `next/font/google` with CSS variables — `Space_Grotesk` for headlines (`--font-display`) and `IBM_Plex_Sans` for body (`--font-body`). Color tokens are defined as raw hex values in Tailwind config (not HSL CSS variables like the web app) to keep the marketing config independent and simpler. motion v12 (`motion` package) is imported from `'motion/react'` and requires `'use client'` on any component that uses animation hooks or motion components directly.

The sticky navbar uses a `useEffect` scroll listener on the client — the pattern is: transparent at `scrollY === 0`, solid dark background after scrolling. The mobile hamburger uses local `useState` toggling a drawer overlay. Both the Navbar and Footer are Server Components at the layout level, with the scroll-detection logic isolated in a client sub-component.

**Primary recommendation:** Scaffold `apps/marketing/` via `create-next-app`, match the web app's TypeScript/Tailwind/shadcn config exactly, use CSS variable font strategy, and keep animation components as leaf-level Client Components wrapped inside Server Component shells.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | ^16.2.1 (Next 15 lineage) | App Router framework, font optimization, metadata | Must match existing monorepo web app |
| react | ^19.2.4 | UI runtime | Must match existing monorepo |
| react-dom | ^19.2.4 | DOM renderer | Peer dep with React |
| typescript | ^5 | Type safety with strict mode | Matches monorepo root |
| tailwindcss | ^3.4.1 | Utility CSS — do NOT upgrade to v4 | Matches web app exactly |
| motion | ^12.x | Animations via `import { motion } from 'motion/react'` | Replaces framer-motion; v12 has no breaking changes vs framer-motion API |
| lucide-react | ^0.564.0 | Icon set | Matches web app exactly |
| clsx | ^2.1.1 | Conditional class merging | Matches web app |
| tailwind-merge | ^3.4.1 | Tailwind class conflict resolution | Matches web app |
| class-variance-authority | ^0.7.1 | Variant-driven component styling | Matches shadcn/ui setup |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @radix-ui/react-dialog | ^1.1.x | Accessible modal primitive | Mobile hamburger drawer |
| @radix-ui/react-slot | ^1.2.x | Polymorphic component primitive | shadcn/ui Button asChild |
| postcss | ^8 | PostCSS for Tailwind processing | Required by Tailwind v3 |
| autoprefixer | ^10.4.x | CSS vendor prefixes | Required by Tailwind v3 |
| eslint-config-next | ^16.x | Next.js lint rules | Matches web app devDep |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| motion (motion/react) | framer-motion | framer-motion is the old package name; motion v12 is the same library renamed, no API changes |
| next/font/google | @fontsource/* npm packages | next/font self-hosts and eliminates external font requests; @fontsource works but loses built-in optimization |
| Tailwind v3 CSS variables (HSL) | Raw hex in tailwind.config | Web app uses HSL CSS vars for theming; marketing site is dark-only so raw hex is simpler and avoids a second CSS variable system |

**Installation:**
```bash
# From apps/marketing/ after create-next-app scaffold
npm install motion lucide-react clsx tailwind-merge class-variance-authority
npm install @radix-ui/react-dialog @radix-ui/react-slot
```

---

## Architecture Patterns

### Recommended Project Structure
```
apps/marketing/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout: fonts, metadata, Navbar, Footer
│   │   ├── page.tsx            # Marketing home page (server component)
│   │   └── globals.css         # Tailwind directives + CSS variables
│   ├── components/
│   │   ├── layout/
│   │   │   ├── navbar.tsx              # Server shell
│   │   │   ├── navbar-scroll-client.tsx # 'use client' scroll detection
│   │   │   ├── mobile-menu.tsx          # 'use client' drawer
│   │   │   └── footer.tsx              # Server component
│   │   ├── ui/                  # shadcn/ui primitives (Button, Badge, Sheet)
│   │   └── shared/
│   │       └── status-badge.tsx # DESIGN-03 status badge component
│   └── lib/
│       ├── pricing.config.ts    # PRICE-07: single source of truth
│       └── utils.ts             # cn() helper
├── public/
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── package.json
```

### Pattern 1: CSS Variable Font Strategy

**What:** Register both Google Fonts with the `variable` option in `next/font/google`. Apply both `.variable` class names to `<html>`. Reference in Tailwind via `fontFamily` theme extension. Components use `font-display` or `font-body` utility classes.

**When to use:** Any time two or more typefaces need to coexist in a single app.

**Example:**
```typescript
// Source: https://nextjs.org/docs/app/getting-started/fonts (version 16.2.1, 2026-03-31)
// apps/marketing/src/app/layout.tsx
import { Space_Grotesk, IBM_Plex_Sans } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${ibmPlexSans.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  )
}
```

```typescript
// tailwind.config.ts
theme: {
  extend: {
    fontFamily: {
      display: ['var(--font-display)', 'sans-serif'],
      body: ['var(--font-body)', 'sans-serif'],
    }
  }
}
```

### Pattern 2: Sticky Navbar — Server Shell + Client Scroll Detection

**What:** The `<Navbar>` is a Server Component that renders static logo/links. A nested `<NavbarScrollEffect>` Client Component applies CSS classes based on `window.scrollY`.

**When to use:** Transparent-to-solid scroll behavior requires a `window` listener — must be isolated in a Client Component to avoid SSR errors.

**Example:**
```typescript
// Source: Next.js App Router patterns; verified via official docs
// apps/marketing/src/components/layout/navbar-scroll-client.tsx
'use client'

import { useEffect, useState } from 'react'

export function NavbarScrollWrapper({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0f172a]/95 backdrop-blur-sm shadow-lg'
          : 'bg-transparent'
      }`}
    >
      {children}
    </header>
  )
}
```

### Pattern 3: motion v12 Scroll-Triggered Animations

**What:** Use `whileInView` prop with `viewport={{ once: true }}` for entrance animations. Use `initial` + `animate` for page-load animations. All motion components require `'use client'`.

**When to use:** Section entry animations, hero fade-ins, staggered card reveals.

**Example:**
```typescript
// Source: https://motion.dev/docs/react-motion-component (2026-03-31)
'use client'
import { motion } from 'motion/react'

// Fade up on scroll into view (once)
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.4, ease: 'easeOut' }}
>
  {children}
</motion.div>

// Staggered children
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

<motion.ul variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}>
  {cards.map((card) => (
    <motion.li key={card.id} variants={item}>{card.content}</motion.li>
  ))}
</motion.ul>
```

### Pattern 4: Metadata with Title Template

**What:** Root layout defines `title.template` and `title.default`. Individual pages override with a string title. `metadataBase` set to production URL for correct OG image resolution.

**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata (version 16.2.1, 2026-03-31)
// apps/marketing/src/app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://drivecommand.com'),
  title: {
    default: 'DriveCommand — Fleet Management Platform',
    template: '%s | DriveCommand',
  },
  description: 'Logistics fleet management for modern carriers.',
  openGraph: {
    siteName: 'DriveCommand',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}
```

### Pattern 5: Pricing Config as Single Source of Truth

**What:** `lib/pricing.config.ts` exports typed pricing tiers. No prices are hardcoded in components. All pricing sections import from this file.

**Example:**
```typescript
// apps/marketing/src/lib/pricing.config.ts
export interface PricingTier {
  id: string
  name: string
  monthlyPrice: number
  annualPrice: number
  description: string
  features: string[]
  highlighted?: boolean
  ctaLabel: string
}

export const PRICING_TIERS: PricingTier[] = [
  // ... tiers defined here
]
```

### Anti-Patterns to Avoid

- **Importing motion in a Server Component:** Any file that imports from `'motion/react'` must have `'use client'` at the top. Without it, the build fails because motion uses browser APIs.
- **Putting scroll detection in layout.tsx:** layout.tsx is a Server Component. `window.addEventListener` in a Server Component causes a runtime error. Always extract scroll-reactive logic into a `'use client'` sub-component.
- **Using `overflow: hidden` on a wrapper containing a sticky header:** This breaks `position: sticky`. Use `overflow-x: clip` instead if overflow clipping is needed.
- **Declaring `viewport` or `themeColor` in `metadata`:** These were deprecated in Next.js 14. Use the separate `generateViewport` export instead.
- **Using Inter, Roboto, or Arial:** DESIGN-05 explicitly forbids these fonts. Do not import them. The web app uses Inter — the marketing app must not inherit this.
- **Purple gradients:** DESIGN-05 forbids them. Use only the four brand colors: `#0f172a`, `#3b82f6`, `#f59e0b`, `#10b981`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Icon set | Custom SVG icon components | lucide-react (already in web app) | 1000+ icons, tree-shakeable, consistent stroke width |
| Accessible modal/drawer | Custom dialog with focus trap | @radix-ui/react-dialog | Focus management, keyboard nav, ARIA attributes are non-trivial |
| Button variants | Conditional className strings | shadcn/ui Button + CVA | Handles all variant/size/state combinations with TypeScript safety |
| Status badges | Custom span with inline styles | shadcn/ui Badge + custom variants | CVA variant system handles all DESIGN-03 badge types cleanly |
| Font loading | Manual link tags or @import | next/font/google | Self-hosted, zero layout shift, no external requests, automatic subset optimization |
| cn() utility | Repeated clsx/twMerge inline | `lib/utils.ts` cn() helper | One line, used everywhere, matches web app pattern |

**Key insight:** The monorepo web app already solved all of these — copy the patterns exactly rather than inventing new approaches.

---

## Common Pitfalls

### Pitfall 1: motion Component in Server Component
**What goes wrong:** Build error — "You're importing a component that needs `useState`. It only works in a Client Component but none of its parents are marked with `'use client'`."
**Why it happens:** motion components use React hooks internally. Next.js App Router assumes all components are Server Components unless marked.
**How to avoid:** Every file that imports `motion` from `'motion/react'` must start with `'use client'`. Create thin animated wrapper components that are client-only; keep data fetching and layout in Server Components above them.
**Warning signs:** Build error mentioning `useState` or `useEffect` in a non-client module.

### Pitfall 2: window Reference During SSR
**What goes wrong:** Runtime error — "ReferenceError: window is not defined" during `next build` or on first load.
**Why it happens:** Scroll detection with `window.scrollY` runs server-side if placed outside `useEffect`.
**How to avoid:** Always wrap `window` references in `useEffect`. Initialize state to `false`/`0` (the SSR-safe value). The `{ passive: true }` flag on the scroll listener is also important for performance.
**Warning signs:** Server-side render error mentioning `window` or `document`.

### Pitfall 3: Tailwind Content Paths Miss marketing App
**What goes wrong:** Tailwind classes used in `apps/marketing` produce no styles (blank/unstyled page).
**Why it happens:** Tailwind's `content` array in `tailwind.config.ts` must include all files where class names appear.
**How to avoid:** In `apps/marketing/tailwind.config.ts`, set content to `['./src/**/*.{js,ts,jsx,tsx,mdx}']`. Do NOT try to share the web app's Tailwind config.
**Warning signs:** Page loads with no visible styles.

### Pitfall 4: monorepo workspace resolution
**What goes wrong:** `npm install` fails or packages resolve incorrectly because `apps/marketing` isn't declared as a workspace.
**Why it happens:** The root `package.json` has `"workspaces": ["apps/*", "packages/*"]` — new apps in `apps/` are auto-included, but the `apps/marketing/package.json` must exist before running install.
**How to avoid:** Create `apps/marketing/package.json` with a unique `"name": "@drivecommand/marketing"` before running `npm install` from root. Then `turbo.json` tasks apply automatically.
**Warning signs:** Import resolution errors, missing node_modules in the marketing app.

### Pitfall 5: Fonts Not Loading (Missing `variable` Option)
**What goes wrong:** `var(--font-display)` and `var(--font-body)` are undefined at runtime; system font fallback appears instead.
**Why it happens:** next/font only injects CSS variables when the `variable` option is specified AND the `.variable` class is applied to `<html>`.
**How to avoid:** Both font declarations must have `variable: '--font-display'` and `variable: '--font-body'`, and the `<html>` tag must have `className={`${spaceGrotesk.variable} ${ibmPlexSans.variable}`}`.
**Warning signs:** Custom fonts specified in Tailwind config but page renders in system font.

### Pitfall 6: Metadata `metadataBase` Missing for OG Images
**What goes wrong:** Open Graph images resolve to relative URLs, which OG scrapers cannot fetch. Build warning appears.
**Why it happens:** Next.js requires `metadataBase` to be a fully qualified URL for all OG/Twitter image fields.
**How to avoid:** Set `metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://drivecommand.com')` in root layout.
**Warning signs:** Next.js build warning "metadataBase property ... is not set."

---

## Code Examples

### Tailwind Config for Marketing Site (v3, dark-first)
```typescript
// Source: Adapted from web app pattern; verified against Tailwind v3 docs
// apps/marketing/tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0f172a',     // DESIGN-02: background/navy
          blue: '#3b82f6',     // DESIGN-02: primary/CTA
          amber: '#f59e0b',    // DESIGN-02: accent/warning
          green: '#10b981',    // DESIGN-02: success/active
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

### Status Badge Component (DESIGN-03)
```typescript
// apps/marketing/src/components/shared/status-badge.tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: {
        active:    'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20',
        pending:   'bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20',
        inactive:  'bg-slate-500/10 text-slate-400 ring-1 ring-slate-500/20',
        new:       'bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20',
      },
    },
    defaultVariants: { variant: 'active' },
  }
)

interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  label: string
}

export function StatusBadge({ label, variant, className }: StatusBadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)}>
      {label}
    </span>
  )
}
```

### Mobile Hamburger Drawer
```typescript
// Source: Radix UI Dialog primitive pattern
// apps/marketing/src/components/layout/mobile-menu.tsx
'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import Link from 'next/link'

export function MobileMenu({ links }: { links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button aria-label="Open menu" className="md:hidden p-2">
          <Menu className="h-5 w-5" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 z-40" />
        <Dialog.Content className="fixed inset-y-0 right-0 w-72 bg-[#0f172a] z-50 p-6">
          <Dialog.Close asChild>
            <button aria-label="Close menu" className="absolute top-4 right-4 p-2">
              <X className="h-5 w-5" />
            </button>
          </Dialog.Close>
          <nav className="flex flex-col gap-4 mt-10">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-lg text-slate-200 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
```

### Footer — 4-Column Grid
```typescript
// Server Component — no 'use client' needed
// apps/marketing/src/components/layout/footer.tsx
export function Footer() {
  return (
    <footer className="bg-[#0f172a] border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Column 1: Brand */}
          {/* Column 2: Product */}
          {/* Column 3: Company */}
          {/* Column 4: Legal */}
        </div>
        <div className="mt-8 border-t border-slate-800 pt-8 text-sm text-slate-500">
          &copy; {new Date().getFullYear()} DriveCommand. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
```

### cn() Utility
```typescript
// Source: shadcn/ui standard pattern (confirmed in web app)
// apps/marketing/src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `import { motion } from 'framer-motion'` | `import { motion } from 'motion/react'` | motion v11+ (package renamed) | Same API, different package name. v12 adds OKLCH/OKLAB color animation. |
| `themeColor` in metadata object | `generateViewport` export | Next.js 14 | `themeColor` in metadata silently ignored; must use separate viewport export |
| `viewport` in metadata object | `generateViewport` export | Next.js 14 | Same — separate export required |
| Pages Router `_document.tsx` fonts | `next/font/google` in layout.tsx | Next.js 13 App Router | Self-hosted, CLS-free, no external requests |
| `overflow: hidden` on sticky header parent | `overflow-x: clip` | CSS spec clarification | `overflow: hidden` breaks `position: sticky`; `clip` does not |

**Deprecated/outdated:**
- `framer-motion` package: Use `motion` instead. The framer-motion package still receives maintenance but new features go to `motion` only.
- `metadata.themeColor`: Removed. Use `export const viewport: Viewport = { themeColor: '...' }`.
- `metadata.viewport`: Removed. Use `generateViewport` function export.

---

## Open Questions

1. **shadcn/ui initialization for marketing app**
   - What we know: The web app uses shadcn/ui `new-york` style with `components.json`. Running `npx shadcn@latest init` in `apps/marketing/` will create a separate `components.json` scoped to that app.
   - What's unclear: Whether to share the `packages/ui` package or keep marketing components fully isolated. Given the marketing site has distinct design (dark-only, brand colors) vs the app's light/dark HSL system, isolation is likely correct.
   - Recommendation: Initialize shadcn independently in `apps/marketing/` with `style: "default"` (or `"new-york"` — both work); do NOT share the `packages/` UI package.

2. **motion/react-client import**
   - What we know: The official docs show `import { motion } from 'motion/react'`. Some sources mention `motion/react-client` for RSC environments.
   - What's unclear: Whether `motion/react-client` is an official export or a community pattern. The upgrade guide confirms only `motion/react` as the canonical import.
   - Recommendation: Use `import { motion } from 'motion/react'` with `'use client'` directive. If `motion/react-client` is needed for specific RSC scenarios, test empirically during implementation.

3. **Canonical domain for metadataBase**
   - What we know: `metadataBase` should be the production URL. DriveCommand's marketing domain is not confirmed.
   - What's unclear: Whether the marketing site lives at `drivecommand.com`, `www.drivecommand.com`, or a subdomain.
   - Recommendation: Use `new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://drivecommand.com')` as a safe default. The env var can be set per-environment.

---

## Sources

### Primary (HIGH confidence)
- https://nextjs.org/docs/app/getting-started/fonts (version 16.2.1, fetched 2026-03-31) — font variable pattern, multiple fonts, CSS variable strategy
- https://nextjs.org/docs/app/api-reference/functions/generate-metadata (version 16.2.1, fetched 2026-03-31) — all metadata fields, title template, openGraph, twitter, robots, metadataBase
- https://motion.dev/docs/react-motion-component (fetched 2026-03-31) — motion component props: animate, initial, whileInView, viewport, transition
- https://motion.dev/docs/react-upgrade-guide (fetched 2026-03-31) — confirmed no breaking changes, import path change to motion/react
- `/Users/ayazmohammed/DriveCommand/apps/web/package.json` — exact version numbers for all dependencies
- `/Users/ayazmohammed/DriveCommand/apps/web/tailwind.config.ts` — established Tailwind CSS variable pattern
- `/Users/ayazmohammed/DriveCommand/apps/web/tsconfig.json` — strict TypeScript config, path aliases
- `/Users/ayazmohammed/DriveCommand/apps/web/components.json` — shadcn/ui new-york style, RSC enabled, CSS variables

### Secondary (MEDIUM confidence)
- https://motion.dev/docs/react-animation (fetched 2026-03-31) — animation examples: fade, slide, stagger patterns
- WebSearch: Next.js sticky navbar scroll pattern 2025 — confirmed useEffect + window.scrollY is standard pattern; confirmed `overflow-x: clip` for sticky fix
- WebSearch: motion v12 React usage 2025 — multiple sources confirm `import from 'motion/react'` as canonical

### Tertiary (LOW confidence)
- WebSearch: shadcn/ui monorepo 2025 — guidance on per-app `components.json` vs shared package; recommendation to keep isolated is based on design system divergence reasoning, not official docs

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — versions verified directly from web app package.json
- Font setup: HIGH — verified from official Next.js docs (v16.2.1, same date)
- motion v12 API: HIGH — verified from official motion.dev docs
- Architecture patterns: HIGH — navbar/footer patterns confirmed by official Next.js RSC docs + scroll detection pattern confirmed by multiple sources
- Pitfalls: HIGH for SSR/window/metadata issues (official docs); MEDIUM for Tailwind content path (known pattern, not explicitly documented)
- shadcn/ui isolation recommendation: MEDIUM — reasoned from design system differences, not official docs

**Research date:** 2026-03-31
**Valid until:** 2026-05-01 (stable libraries; motion/react and Next.js 15 lineage are stable)
