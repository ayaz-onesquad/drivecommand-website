# DriveCommand Brand Audit

> **Audit Date:** 2026-04-22
> **Purpose:** Pre-rebrand discovery — identify all brand assets, colors, fonts, and touchpoints
> **Status:** Read-only analysis (no modifications made)

---

## 1. Stack Summary

| Aspect | Technology | Evidence |
|--------|------------|----------|
| **Framework** | Next.js 15.3.3 (App Router) | `package.json:18` — `"next": "^15.3.3"` |
| **Language** | TypeScript | `tsconfig.json` present, `.tsx` files throughout |
| **Styling** | Tailwind CSS 3.4.1 | `package.json:33`, `tailwind.config.ts` |
| **UI Components** | Radix UI, Lucide React | `package.json:12-16` |
| **Animation** | Motion (Framer Motion) 12.0.0 | `package.json:16` |
| **React Version** | React 19.1.0 | `package.json:20` |
| **Build Config** | `next.config.ts` | Empty config (defaults) |
| **Deployment Target** | Vercel (implied) | Next.js App Router, `metadataBase` URL pattern |

---

## 2. Brand Asset Inventory

### 2.1 Logo Files

| Type | Path | Status |
|------|------|--------|
| **SVG Logo** | — | **NOT FOUND** |
| **PNG Logo** | — | **NOT FOUND** |
| **Favicon** | `src/app/favicon.ico` | **NOT FOUND** |
| **Apple Touch Icon** | `src/app/apple-icon.png` | **NOT FOUND** |
| **OG Image** | `src/app/opengraph-image.png` | **NOT FOUND** |
| **Manifest** | `public/manifest.json` | **NOT FOUND** |

**Finding:** The brand uses a **text-based logo** with no image assets. The logo is rendered as:
- Brand name: `DriveCommand` (Space Grotesk display font)
- Icon: Lucide `<Truck>` component (not a custom SVG)

### 2.2 Public Directory

```
public/
└── (empty)
```

**Finding:** The `/public` directory is empty. No static brand assets are deployed.

---

## 3. Color Palette

### 3.1 Design Token Definitions

All colors are defined in `src/styles/tokens.css`. The system uses a two-tier architecture:
- **Palette stops** (`--p-*`) — Internal only, never used directly in components
- **Semantic aliases** (`--color-*`) — Used throughout the codebase

#### Primary Palette (tokens.css:7-15)

| Token | Hex | Name | Usage |
|-------|-----|------|-------|
| `--p-mint` | `#75F0D4` | Mint | CTA accent, primary action |
| `--p-slate-teal` | `#5B878A` | Slate Teal | Secondary elements |
| `--p-ocean` | `#3B8696` | Ocean | Mid-range brand color |
| `--p-deep-blue` | `#21657F` | Deep Blue | Brand identity |
| `--p-navy` | `#19334D` | Navy | Card backgrounds |
| `--p-forest` | `#005228` | Forest | Badge backgrounds |
| `--p-midnight` | `#000D23` | Midnight | Primary dark background |

#### Semantic Aliases (tokens.css:17-53)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-dark` | `var(--p-midnight)` | Hero, dark sections |
| `--color-bg-light` | `#D9F0F7` | Light sections |
| `--color-bg-card` | `var(--p-navy)` | Dashboard cards |
| `--color-bg-secondary` | `#0A1628` | Slightly lighter than midnight |
| `--color-brand` | `var(--p-deep-blue)` | Brand identity |
| `--color-brand-mid` | `var(--p-ocean)` | Hover states |
| `--color-accent` | `var(--p-mint)` | CTAs, links, highlights |
| `--color-accent-hover` | `#5CD9BE` | Button hover |
| `--color-text-on-accent` | `var(--p-midnight)` | Text on mint buttons |
| `--color-text-primary` | `#FFFFFF` | Text on dark |
| `--color-text-secondary` | `#A8C4D4` | Muted text on dark |
| `--color-text-dark` | `var(--p-midnight)` | Text on light |
| `--color-text-dark-secondary` | `#4A6280` | Secondary text on light |
| `--color-text-muted` | `#6B8A9A` | Muted text |
| `--color-border` | `var(--p-navy)` | Borders |
| `--color-border-light` | `#C2D8E8` | Light borders |

#### Status Colors (tokens.css:46-49)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-live-green` | `#10B981` | Live/active indicators |
| `--color-status-transit` | `#F59E0B` | In-transit status |
| `--color-status-dispatched` | `#7C6FCD` | Dispatched status |
| `--color-status-invoiced` | `var(--p-ocean)` | Invoiced status |

### 3.2 Additional Theme Colors (globals.css)

These colors appear in light/dark theme definitions:

| Token | Hex | Context |
|-------|-----|---------|
| `--accent-cyan` | `#38bdf8` | Accent blue in themes |
| `--accent-signal` | `#22c55e` | Success green |
| `--accent-stripe` | `#f7c948` | Data highlight yellow |
| `--bg-card-hover` | `#374151` | Card hover state |
| `--text-muted` | `#64748b` | Muted text |

### 3.3 Hardcoded Colors (Risk Area)

**Top 20 rgba() values used in inline styles:**

| Color | Count | Files |
|-------|-------|-------|
| `rgba(117, 240, 212, 0.25)` | 9 | navbar, mobile-menu, hero, final-cta, interactive-demo |
| `rgba(117, 240, 212, 0.35)` | 6 | navbar, mobile-menu, hero, final-cta, interactive-demo |
| `rgba(117, 240, 212, 0.3)` | 6 | features-grid, pricing-calculator |
| `rgba(0, 0, 0, 0.3)` | 5 | globals.css (sliders) |
| `rgba(148, 163, 184, 0.3)` | 3 | globals.css (sliders) |
| `rgba(56, 189, 248, *)` | 8 | parallax-world, features-grid |
| `rgba(42, 58, 80, 0.5)` | 2 | hero, mobile-menu |
| `rgba(30, 37, 51, 0.95)` | 2 | globals.css (navbar) |

**Total inline style declarations:** 111 occurrences across 17 files

---

## 4. Font Inventory

### 4.1 Font Loading Methods

| Font | Method | Config Location |
|------|--------|-----------------|
| **Space Grotesk** | `next/font/google` | `src/app/layout.tsx:8-12` |
| **IBM Plex Sans** | `next/font/google` | `src/app/layout.tsx:14-19` |
| **Barlow Condensed** | Google Fonts CDN | `src/app/globals.css:2` |

### 4.2 Font Variables

| Variable | Font | Usage |
|----------|------|-------|
| `--font-display` | Space Grotesk | Headings, logo |
| `--font-body` | IBM Plex Sans | Body text, UI |
| `.font-headline` | Barlow Condensed | Hero headlines |

### 4.3 Tailwind Font Config (tailwind.config.ts:34-37)

```typescript
fontFamily: {
  display: ['var(--font-display)', 'sans-serif'],
  body: ['var(--font-body)', 'sans-serif'],
}
```

---

## 5. Logo Touchpoints

### 5.1 Text Logo Locations

| File | Line | Implementation |
|------|------|----------------|
| `src/components/layout/navbar.tsx` | 112-121 | `<Truck>` icon + "DriveCommand" text |
| `src/components/layout/footer.tsx` | 47-54 | "DriveCommand" text only |
| `src/components/layout/mobile-menu.tsx` | 71-73 | "DriveCommand" text only |

### 5.2 Detailed Implementation

**Navbar (navbar.tsx:112-121):**
```tsx
<Link href="/" className="flex items-center gap-2 font-display font-bold text-lg">
  <Truck size={20} style={{ color: 'var(--accent-load)' }} />
  <span className="font-display font-bold">DriveCommand</span>
</Link>
```

**Footer (footer.tsx:47-54):**
```tsx
<Link href="/" className="font-display font-bold text-xl">
  DriveCommand
</Link>
```

**Mobile Menu (mobile-menu.tsx:71-73):**
```tsx
<span className="font-display font-bold text-xl text-theme-primary">
  DriveCommand
</span>
```

### 5.3 Brand Name Text Occurrences

| File | Count | Context |
|------|-------|---------|
| `src/app/layout.tsx` | 3 | Metadata title/siteName |
| `src/app/page.tsx` | 2 | Page metadata |
| `src/app/about/page.tsx` | 8 | About page content |
| `src/app/pricing/page.tsx` | 1 | Page metadata |
| `src/app/contact/page.tsx` | 4 | Page metadata, email |
| `src/app/demo/page.tsx` | 3 | Page metadata |
| `src/components/layout/navbar.tsx` | 2 | Logo, aria-label |
| `src/components/layout/footer.tsx` | 4 | Logo, copyright, tagline |
| `src/components/layout/mobile-menu.tsx` | 1 | Logo |
| `src/components/sections/hero.tsx` | 2 | Hero content |
| `src/components/sections/demo-video.tsx` | 2 | Demo UI |
| `src/components/sections/social-proof.tsx` | 2 | Testimonials |
| `src/components/sections/features-grid.tsx` | 1 | Feature description |
| `src/lib/pricing.config.ts` | 2 | App URLs |

**Total "DriveCommand" text occurrences:** 37+

---

## 6. Risk Areas for Rebrand

### 6.1 Critical (Must Address)

| Issue | Location | Impact |
|-------|----------|--------|
| **No favicon** | `src/app/favicon.ico` missing | Browser tab shows default icon |
| **No OG image** | `src/app/opengraph-image.*` missing | Social shares have no preview |
| **No apple-icon** | `src/app/apple-icon.png` missing | iOS home screen has no icon |
| **No manifest.json** | `public/manifest.json` missing | PWA support broken |

### 6.2 High (Hardcoded Brand Colors)

| File | Issue | Lines |
|------|-------|-------|
| `navbar.tsx` | Hardcoded mint rgba in boxShadow | 47-49 |
| `mobile-menu.tsx` | Hardcoded mint rgba in boxShadow | 12-14 |
| `hero.tsx` | Hardcoded mint rgba in boxShadow | 16-18 |
| `final-cta.tsx` | Hardcoded mint rgba in boxShadow | 12-14 |
| `interactive-demo.tsx` | Hardcoded mint rgba in boxShadow | 26-28 |
| `features-grid.tsx` | Hardcoded rgba for 6 different accent colors | 53-104 |
| `globals.css` | Hardcoded rgba in slider/button styles | 215, 260-324, 380-386, 430 |

### 6.3 Medium (Text-Based Brand References)

| Category | Count | Files Affected |
|----------|-------|----------------|
| Brand name in copy | 37+ | 14 files |
| Brand URL hardcoded | 2 | `pricing.config.ts` |
| Email address | 2 | `contact/page.tsx`, `actions.ts` |
| Domain in metadata | 1 | `layout.tsx` |

### 6.4 Low (Structural)

| Issue | Location |
|-------|----------|
| Tailwind `dc-*` prefix assumes "DriveCommand" | `tailwind.config.ts:11-32` |
| Legacy `brand-green` color | `tailwind.config.ts:10` |
| Comment references "DriveCommand" | `tokens.css:1` |

---

## 7. File Coverage Confirmation

### 7.1 Directories Scanned

- [x] `public/` — Empty (no assets)
- [x] `src/app/` — All pages and layouts
- [x] `src/components/` — All components (18 files)
- [x] `src/styles/` — tokens.css
- [x] `src/lib/` — Config files
- [x] `src/hooks/` — Custom hooks

### 7.2 Email Templates

**Status:** No email templates found. Searched patterns:
- `**/email*/**/*`
- No React Email or similar packages in dependencies

### 7.3 Meta Tags Coverage

| Meta Type | File | Status |
|-----------|------|--------|
| `<title>` | `layout.tsx:25-28` | ✓ Uses "DriveCommand" |
| `openGraph.siteName` | `layout.tsx:32` | ✓ Uses "DriveCommand" |
| `openGraph.title` | Multiple pages | ✓ Uses "DriveCommand" |
| `openGraph.image` | — | **MISSING** |
| `twitter:card` | `layout.tsx:36-38` | ✓ Set to summary_large_image |
| `twitter:image` | — | **MISSING** |
| `metadataBase` | `layout.tsx:22-24` | ✓ drivecommand.com |

---

## 8. Summary

### Assets to Create for Rebrand

1. **Logo files:** SVG (primary), PNG (fallback)
2. **Favicon:** `src/app/favicon.ico` or `icon.svg`
3. **Apple icon:** `src/app/apple-icon.png` (180x180)
4. **OG image:** `src/app/opengraph-image.png` (1200x630)
5. **Manifest:** `public/manifest.json` with icons array

### Files Requiring Brand Text Updates

| Priority | File Count | Estimated Occurrences |
|----------|------------|----------------------|
| Critical | 3 | Logo components (navbar, footer, mobile-menu) |
| High | 6 | Page metadata files |
| Medium | 8 | Content/copy files |

### Files Requiring Color Token Updates

| Priority | File Count | Issue |
|----------|------------|-------|
| High | 6 | Hardcoded rgba() brand colors in boxShadow |
| Medium | 1 | globals.css hardcoded slider/glow colors |
| Low | 1 | tailwind.config.ts `dc-*` prefix |

---

*Generated by brand audit script — no files were modified during this analysis.*
