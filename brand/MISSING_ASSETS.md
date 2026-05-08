# DriveCommand Missing Logo Assets — Designer Brief

> **Date:** 2026-04-23
> **Purpose:** Asset request for design team to complete brand implementation
> **Delivery Path:** `/brand/logo/`

---

## Current Inventory

| Asset | Location | Status |
|-------|----------|--------|
| Glyph (original) | `/brand/logo/logo 1.svg` | ✅ Available |
| Glyph (light variant) | `/brand/logo/logo 2.svg` | ✅ Available |
| Glyph (on dark) | `/public/brand/logo/glyph-on-dark.svg` | ✅ Deployed |
| Glyph (on light) | `/public/brand/logo/glyph-on-light.svg` | ✅ Deployed |
| Glyph (generic) | `/public/brand/logo/glyph.svg` | ✅ Deployed |
| Favicon SVG | `/src/app/icon.svg` | ✅ Available |
| Apple Icon SVG | `/src/app/apple-icon.svg` | ⚠️ Needs PNG conversion |
| OG Image SVG | `/src/app/opengraph-image.svg` | ⚠️ Needs PNG conversion |

---

## Required Assets

### A. Horizontal Lockup SVG (Primary)

The primary logo lockup with glyph + "DriveCommand" wordmark + optional tagline.

| Variant | Filename | Background | Dimensions | Notes |
|---------|----------|------------|------------|-------|
| Full-color | `logo-horizontal-full.svg` | Transparent | Height: 96px (scalable) | Primary usage |
| Mono-light | `logo-horizontal-mono-light.svg` | Ink/Navy/Signal/Slate | Height: 96px | White/light fills for dark backgrounds |
| Mono-dark | `logo-horizontal-mono-dark.svg` | Bone/Bone2/Silver/Paper | Height: 96px | Dark fills for light backgrounds |

**Specifications:**
- Glyph height matches wordmark cap-height
- Gap between glyph and wordmark: 10% of glyph height
- Wordmark font: DM Sans Bold (700)
- Clear space: 1× notch height on all sides
- Export with `viewBox` for responsive scaling

---

### B. Stacked Lockup SVG

Compact vertical arrangement with glyph above wordmark.

| Variant | Filename | Background | Dimensions |
|---------|----------|------------|------------|
| Full-color | `logo-stacked-full.svg` | Transparent | 96×120px (scalable) |
| Mono-light | `logo-stacked-mono-light.svg` | Dark backgrounds | 96×120px |
| Mono-dark | `logo-stacked-mono-dark.svg` | Light backgrounds | 96×120px |

**Specifications:**
- Glyph centered above wordmark
- Vertical gap: 8px at 96px height
- Wordmark font: DM Sans Bold (700)

---

### C. Wordmark-Only SVG

Text-only version for editorial/inline usage.

| Variant | Filename | Background | Dimensions |
|---------|----------|------------|------------|
| Light | `logo-wordmark-light.svg` | Dark backgrounds | Height: 24px (scalable) |
| Dark | `logo-wordmark-dark.svg` | Light backgrounds | Height: 24px |

**Specifications:**
- Font: DM Sans Bold (700)
- Convert to outlines for universal rendering
- Include "DriveCommand" only (no tagline)

---

### D. Glyph Variants (Background-Optimized)

Per brand guide, the glyph should be optimized for each of the 8 approved backgrounds:

| Background | Hex | Filename | Fill Strategy |
|------------|-----|----------|---------------|
| Ink | `#141619` | `glyph-on-ink.svg` | Light fills (navy + silver) |
| Navy | `#050a44` | `glyph-on-navy.svg` | Light fills |
| Signal | `#0a21c0` | `glyph-on-signal.svg` | Light fills |
| Slate | `#2c2e3a` | `glyph-on-slate.svg` | Light fills |
| Bone | `#f4f5f7` | `glyph-on-bone.svg` | Dark fills |
| Bone 2 | `#e6e7eb` | `glyph-on-bone2.svg` | Dark fills |
| Silver | `#b3b4bd` | `glyph-on-silver.svg` | Dark fills (high contrast) |
| Paper | `#ffffff` | `glyph-on-paper.svg` | Dark fills |

**Note:** Currently we have `glyph-on-dark.svg` and `glyph-on-light.svg` which serve as fallbacks. Individual background variants are optional but recommended for pixel-perfect contrast.

---

### E. Raster Assets (PNG Conversion Required)

These SVG sources exist but need conversion to PNG for platform compatibility:

| Asset | Source SVG | Output PNG | Dimensions | Purpose |
|-------|------------|------------|------------|---------|
| Apple Touch Icon | `/src/app/apple-icon.svg` | `/src/app/apple-icon.png` | 180×180px | iOS home screen |
| OpenGraph Image | `/src/app/opengraph-image.svg` | `/src/app/opengraph-image.png` | 1200×630px | Social sharing |

**Conversion Command (requires sharp-cli):**
```bash
npx sharp-cli -i src/app/apple-icon.svg -o src/app/apple-icon.png -w 180 -h 180
npx sharp-cli -i src/app/opengraph-image.svg -o src/app/opengraph-image.png -w 1200 -h 630
```

**Alternative:** Use [realfavicongenerator.net](https://realfavicongenerator.net) or Figma export.

---

### F. Favicon Set (ICO Format)

For legacy browser support, a multi-resolution ICO file is recommended:

| Asset | Filename | Sizes | Purpose |
|-------|----------|-------|---------|
| Favicon ICO | `/public/favicon.ico` | 16×16, 32×32, 48×48 | Legacy browsers (IE, older Safari) |

**Note:** Modern browsers use `/src/app/icon.svg` (already available). ICO is optional for legacy support only.

---

## Delivery Checklist

### Priority 1 (Required for Production)

- [ ] `apple-icon.png` — 180×180px (convert from SVG)
- [ ] `opengraph-image.png` — 1200×630px (convert from SVG)

### Priority 2 (Recommended for Brand Consistency)

- [ ] `logo-horizontal-full.svg`
- [ ] `logo-horizontal-mono-light.svg`
- [ ] `logo-horizontal-mono-dark.svg`

### Priority 3 (Nice to Have)

- [ ] `logo-stacked-full.svg`
- [ ] `logo-stacked-mono-light.svg`
- [ ] `logo-stacked-mono-dark.svg`
- [ ] `logo-wordmark-light.svg`
- [ ] `logo-wordmark-dark.svg`
- [ ] `favicon.ico` (multi-resolution)
- [ ] Individual `glyph-on-{background}.svg` variants (8 files)

---

## Naming Conventions

```
/brand/logo/
├── glyph.svg                    # Generic glyph (current)
├── glyph-on-dark.svg            # Light fills for dark backgrounds
├── glyph-on-light.svg           # Dark fills for light backgrounds
├── glyph-on-{background}.svg    # Per-background optimized (optional)
├── logo-horizontal-full.svg     # Full-color horizontal lockup
├── logo-horizontal-mono-light.svg
├── logo-horizontal-mono-dark.svg
├── logo-stacked-full.svg
├── logo-stacked-mono-light.svg
├── logo-stacked-mono-dark.svg
├── logo-wordmark-light.svg
├── logo-wordmark-dark.svg
└── logo 1.svg                   # Original source (preserve)
└── logo 2.svg                   # Original source (preserve)

/public/brand/logo/
├── glyph.svg                    # Deployed glyph
├── glyph-on-dark.svg            # Deployed light variant
└── glyph-on-light.svg           # Deployed dark variant

/src/app/
├── icon.svg                     # SVG favicon
├── apple-icon.svg               # Apple icon source
├── apple-icon.png               # 180×180 (needs generation)
├── opengraph-image.svg          # OG image source
└── opengraph-image.png          # 1200×630 (needs generation)

/public/
└── favicon.ico                  # Multi-resolution ICO (optional)
```

---

## Design Specifications Reference

| Property | Value |
|----------|-------|
| Glyph Colors | Deep Navy `#050a44`, Platinum Silver `#b3b4bd` |
| Wordmark Font | DM Sans Bold (700) |
| Minimum Size | 24px (glyph-only), 48px (UI), 96px (digital) |
| Clear Space | 1× notch height on all sides |
| File Format | SVG with `viewBox`, no embedded raster images |

---

*Generated during DriveCommand Rebrand Finalization*
