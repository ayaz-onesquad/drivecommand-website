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
| `--color-accent` | #75F0D4 (mint) | ALL CTA buttons, links, highlights |
| `--color-accent-hover` | #5CD9BE | Button hover state |
| `--color-text-on-accent` | #000D23 | Text on mint buttons (REQUIRED) |
| `--color-bg-dark` | #000D23 (midnight) | Hero, dark sections |
| `--color-bg-light` | #D9F0F7 | Light sections, feature cards |
| `--color-bg-card` | #19334D (navy) | Dashboard cards |
| `--color-brand` | #21657F (deep-blue) | Brand identity, nav |
| `--color-brand-mid` | #3B8696 (ocean) | Hover states, secondary UI |
| `--color-text-primary` | #FFFFFF | Text on dark backgrounds |
| `--color-text-secondary` | #A8C4D4 | Muted text on dark |
| `--color-text-dark` | #000D23 | Text on light backgrounds |

### Tailwind Utilities

Use `dc-*` prefix for brand colors:
- `bg-dc-accent`, `text-dc-accent` (mint - use text only for large headings)
- `bg-dc-bg-dark`, `bg-dc-bg-light`
- `text-dc-text-primary`, `text-dc-text-secondary`
- `text-dc-text-on-accent` (REQUIRED for buttons with mint background)

### Rules

1. **Never use raw hex values** in components
2. **CTAs are ALWAYS mint** (`--color-accent`) with **midnight text** (`--color-text-on-accent`)
3. **Mint is never body text** on dark backgrounds (contrast too low for small text)
4. **Status colors** use semantic tokens: `--color-live-green`, `--color-status-transit`, etc.
5. **Ocean (#3B8696)** OK for links/large text, not body copy

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
