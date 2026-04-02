# DriveCommand Website

## Quick Start

```bash
npm run dev    # Start development server
npm run build  # Production build
npm run lint   # ESLint
```

## Design Tokens

All colors are defined in `src/styles/tokens.css`. Components use semantic tokens exclusively.

### Color System

| Token | Value | Usage |
|-------|-------|-------|
| `--color-accent` | #E05A3A | ALL CTA buttons, links, highlights |
| `--color-accent-hover` | #C44D30 | Button hover state |
| `--color-bg-dark` | #1E2533 | Hero, dark sections |
| `--color-bg-light` | #D9F0F7 | Light sections, feature cards |
| `--color-bg-card` | #16202E | Dashboard cards |
| `--color-brand` | #2D4E7A | Brand identity, nav |
| `--color-brand-mid` | #7AAAC8 | Hover states, secondary UI |
| `--color-text-primary` | #FFFFFF | Text on dark backgrounds |
| `--color-text-secondary` | #A8B8CC | Muted text on dark |
| `--color-text-dark` | #1E2533 | Text on light backgrounds |

### Tailwind Utilities

Use `dc-*` prefix for brand colors:
- `bg-dc-accent`, `text-dc-accent`
- `bg-dc-bg-dark`, `bg-dc-bg-light`
- `text-dc-text-primary`, `text-dc-text-secondary`

### Rules

1. **Never use raw hex values** in components
2. **CTAs are ALWAYS coral** (`--color-accent`)
3. **Status colors** use semantic tokens: `--color-live-green`, `--color-status-transit`, etc.

## Project Structure

```
src/
  app/           # Next.js app router pages
  components/
    layout/      # Navbar, Footer
    sections/    # Hero, Features, etc.
    shared/      # Reusable components
  styles/
    tokens.css   # Design token definitions
  hooks/         # Custom React hooks
  lib/           # Utilities, config
```

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Motion (Framer Motion)
