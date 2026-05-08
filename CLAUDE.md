# DriveCommand Website

## Quick Start

```bash
npm run dev    # Start development server
npm run build  # Production build
npm run lint   # ESLint
```

## Design Tokens

All colors are defined in `src/styles/tokens.css`. Components use semantic tokens exclusively.

### Color System (v1.0 April 2026)

| Token | Value | Usage |
|-------|-------|-------|
| `--dc-ink` | #141619 | Primary dark background (40% balance) |
| `--dc-slate` | #2c2e3a | Card backgrounds, secondary dark (20%) |
| `--dc-navy` | #050a44 | Depth, ground (15%) |
| `--dc-signal` | #0a21c0 | CTA accent, links, highlights (10%) |
| `--dc-silver` | #b3b4bd | Connecting element (15%) |
| `--dc-bone` | #f4f5f7 | Light backgrounds |
| `--color-accent` | var(--dc-signal) | ALL CTA buttons, links |
| `--color-text-on-accent` | var(--dc-bone) | Text on Signal Blue buttons |
| `--color-text-primary` | #FFFFFF | Text on dark backgrounds |
| `--color-text-secondary` | var(--dc-n300) | Muted text on dark |

### Tailwind Utilities

Use `dc-*` prefix for semantic colors and `dc2-*` for direct palette access:

```tsx
// Semantic (recommended)
<button className="bg-dc-accent text-dc-text-on-accent hover:bg-dc-accent-hover" />
<div className="bg-dc-bg-dark text-dc-text-primary" />

// Direct palette (dc2)
<div className="bg-dc2-ink text-dc2-signal" />
<span className="text-dc2-state-onTime" />  // Status green
```

### Rules

1. **Never use raw hex values** in components
2. **CTAs are ALWAYS Signal Blue** (`--dc-signal` / `#0a21c0`) with **light text** (`--dc-bone`)
3. **Status colors** use semantic tokens: `--dc-state-on-time`, `--dc-state-at-risk`, etc.
4. **Tagline** is "Miles Ahead." — always with the period

### Logo Usage

The Logo component (`src/components/brand/Logo.tsx`) automatically selects the correct glyph variant:
- **Dark backgrounds** (ink, navy, signal, slate) → `glyph-on-dark.svg` (light fills)
- **Light backgrounds** (bone, bone2, silver, paper) → `glyph-on-light.svg` (dark fills)

Use the `background` prop to specify context:
```tsx
<Logo variant="horizontal" background="ink" />   // Dark bg → light glyph
<Logo variant="horizontal" background="paper" /> // Light bg → dark glyph
```

### Brand Documentation

- **Developer Guide:** `/docs/BRAND_USAGE.md`
- **Design Tokens (JSON):** `/brand/tokens.json`
- **Brand Preview (dev):** `http://localhost:3000/brand-preview`

## Project Structure

```
src/
  app/           # Next.js app router pages
  components/
    brand/       # Logo component
    layout/      # Navbar, Footer
    sections/    # Hero, Features, etc.
    shared/      # Reusable components
  styles/
    tokens.css   # Design token definitions
  hooks/         # Custom React hooks
  lib/           # Utilities, config
```

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Motion (Framer Motion)
