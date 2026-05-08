# DriveCommand Brand Foundation Installation Notes

> **Date:** 2026-04-22
> **Phase:** Foundation (Additive Pass)
> **Status:** Complete

---

## Summary

This document records the installation of the new DriveCommand brand foundation (v1.0 April 2026) into the codebase. This is an **additive pass** — all existing tokens and components remain functional. New components use the `dc2.*` Tailwind namespace and `--dc-*` CSS variables.

---

## Files Modified

### 1. `/src/app/layout.tsx`
- **Change:** Replaced font imports
- **Old:** `Space_Grotesk`, `IBM_Plex_Sans` from `next/font/google`
- **New:** `DM_Sans` (400,500,600,700), `Inter` (300,400,500,600,700), `JetBrains_Mono` (400,500,700)
- **Variables:** `--font-display`, `--font-body`, `--font-mono`

### 2. `/src/app/globals.css`
- **Change:** Removed Barlow Condensed Google Fonts CDN import (line 2)
- **Change:** Updated `.font-headline` class to use `var(--font-display)` instead of `'Barlow Condensed'`

### 3. `/src/styles/tokens.css`
- **Change:** Added new `:root` block with 80+ new CSS variables
- **New tokens added:**
  - Primary palette: `--dc-ink`, `--dc-slate`, `--dc-navy`, `--dc-signal`, `--dc-silver`
  - Ink ramp: `--dc-n0` through `--dc-n900` (10 stops)
  - Navy ramp: `--dc-s50` through `--dc-s500` (10 stops)
  - Electric ramp: `--dc-l50` through `--dc-l500` (10 stops)
  - Surfaces: `--dc-bone`, `--dc-bone2`, `--dc-paper`
  - State colors: `--dc-state-on-time`, `--dc-state-at-risk`, `--dc-state-delayed`, `--dc-state-detention`, `--dc-state-in-transit`, `--dc-state-delivered`, `--dc-state-scheduled`, `--dc-state-unassigned`
  - Semantic aliases: `--dc-color-bg-*`, `--dc-color-brand`, `--dc-color-accent-*`, `--dc-color-text-*`, `--dc-color-border-*`, `--dc-color-glow-*`
- **Preserved:** All existing `--p-*` and `--color-*` variables remain unchanged

### 4. `/tailwind.config.ts`
- **Change:** Added `dc2` color namespace with full new palette
- **Change:** Added `fontFamily.mono: ['var(--font-mono)', 'monospace']`
- **Preserved:** Existing `dc` namespace and `brand-green` color

### 5. `/src/components/layout/navbar.tsx`
- **Change:** Replaced Lucide `Truck` icon + text logo with `<Logo>` component
- **Change:** Removed unused `Truck` import from `lucide-react`
- **Lines:** 112-121 → 112-114

### 6. `/src/components/layout/footer.tsx`
- **Change:** Replaced text logo with `<Logo>` component
- **Lines:** 47-54 → 47-51

### 7. `/src/components/layout/mobile-menu.tsx`
- **Change:** Replaced text logo with `<Logo>` component
- **Lines:** 71-73 → 71

---

## Files Created

### 1. `/public/brand/logo/glyph.svg`
- 3D isometric D/C glyph mark
- Colors: Deep Navy (#050a44) and Platinum Silver (#b3b4bd)
- Source: `/brand/logo/logo 1.svg` (renamed to remove space)

### 2. `/src/components/brand/Logo.tsx`
- React component with TypeScript props
- Props: `variant`, `background`, `size`, `className`
- Variants: `horizontal`, `stacked`, `wordmark`, `glyph`
- Sizes: `sm` (24px), `md` (48px), `lg` (96px), `xl` (144px), or custom number
- Backgrounds: `ink`, `navy`, `signal`, `slate`, `bone`, `bone2`, `silver`, `paper`, `auto`
- Dev warning: Logs console warning if size < 24px

### 3. `/src/app/brand-preview/page.tsx`
- Development-only page (returns `notFound()` in production)
- Displays: All colors, ramps, states, typography scale, logo variants
- Route: `/brand-preview`

### 4. `/src/app/icon.svg`
- SVG favicon for modern browsers
- 512x512 viewBox with rounded corners (rx=96)
- Glyph on Ink background

### 5. `/src/app/apple-icon.svg`
- SVG source for Apple Touch Icon (180x180)
- Glyph on Ink background with rounded corners (rx=36)
- **Note:** Needs conversion to PNG for iOS compatibility

### 6. `/src/app/opengraph-image.svg`
- SVG source for OpenGraph image (1200x630)
- Horizontal lockup with "DriveCommand" wordmark and "Miles Ahead." tagline
- "Ahead." rendered in Signal Blue (#0a21c0)
- **Note:** Needs conversion to PNG for social sharing

---

## Directories Created

- `/public/brand/`
- `/public/brand/logo/`
- `/src/components/brand/`
- `/src/app/brand-preview/`

---

## New Token Reference

### Primary Palette (Use Balance)
| Token | Hex | Balance |
|-------|-----|---------|
| `--dc-ink` | #141619 | 40% |
| `--dc-slate` | #2c2e3a | 20% |
| `--dc-navy` | #050a44 | 15% |
| `--dc-signal` | #0a21c0 | 10% |
| `--dc-silver` | #b3b4bd | 15% |

### Tailwind Classes (dc2 namespace)
| Class | Purpose |
|-------|---------|
| `bg-dc2-ink` | Primary dark background |
| `bg-dc2-signal` | CTA accent |
| `text-dc2-text-primary` | White text on dark |
| `text-dc2-text-onAccent` | White text on Signal buttons |
| `border-dc2-border` | Default border (Slate) |

---

## Assumptions Made

1. **Logo variant fallback:** Since only `glyph.svg` is available, all logo variants render the glyph + wordmark using DM Sans 700. Full SVG assets for each lockup are pending from design.

2. **Font loading:** DM Sans, Inter, and JetBrains Mono are loaded via `next/font/google` with `display: 'swap'` for FOUT prevention.

3. **Background detection:** `Logo` component uses `auto` background by default, which assumes dark background context. Components explicitly pass `background` prop when context is known.

4. **OG image text rendering:** The `opengraph-image.svg` uses embedded `<text>` elements with font-family specifications. For proper rendering in social previews, this **must be converted to PNG** with fonts embedded or rasterized.

5. **favicon.ico:** Not generated — modern browsers support `icon.svg`. If `.ico` is required for legacy IE support, use an external tool like ImageMagick or realfavicongenerator.net.

6. **apple-icon.png:** The SVG source is provided at `/src/app/apple-icon.svg`. Convert to 180x180 PNG using:
   ```bash
   npx sharp-cli -i src/app/apple-icon.svg -o src/app/apple-icon.png -w 180 -h 180
   ```

---

## PNG Generation (Requires External Tools)

The following PNG assets were not generated because they require image processing libraries not installed in the project:

| Asset | Source SVG | Dimensions | Purpose |
|-------|------------|------------|---------|
| `favicon.ico` | `icon.svg` | 32x32, 16x16 | Legacy browsers |
| `apple-icon.png` | `apple-icon.svg` | 180x180 | iOS home screen |
| `opengraph-image.png` | `opengraph-image.svg` | 1200x630 | Social sharing |

**Recommended tool:** Install `sharp` and use `sharp-cli` for conversion, or use an online service like [realfavicongenerator.net](https://realfavicongenerator.net).

---

## Verification Checklist

After installation, verify:

- [ ] `npm run build` succeeds without errors
- [ ] No TypeScript errors in IDE
- [ ] `/brand-preview` renders all tokens (dev mode only)
- [ ] `/`, `/about`, `/pricing`, `/contact`, `/demo` render without visual regressions
- [ ] Fonts load without FOUT (check Network tab for font files)
- [ ] Favicon appears in browser tab (check for `icon.svg` load)
- [ ] All three logo touchpoints (navbar, footer, mobile-menu) render the new Logo component

---

## What's NOT Changed (Preserved for Prompt 5)

- Existing `--p-*` palette stops in tokens.css
- Existing `--color-*` semantic aliases in tokens.css
- Existing `dc.*` Tailwind namespace in tailwind.config.ts
- Existing component styles using old tokens
- Hardcoded `rgba()` brand colors in components
- Theme CSS custom properties in globals.css

---

*Generated during brand foundation installation — DriveCommand Brand v1.0*
