# DriveCommand Brand Guide Summary

> **Source:** Brand Guide v1.0 (April 2026)
> **Extracted:** 2026-04-22
> **Purpose:** Developer-readable reference for brand implementation

---

## 1. Brand Foundation

| Attribute | Value |
|-----------|-------|
| **Brand** | DriveCommand |
| **Tagline** | Miles Ahead. |
| **Category** | Carrier Ops SaaS |
| **Promise** | Miles Ahead |
| **Audience** | Dispatchers, Ops VPs, Owner-operators |
| **Personality** | Precise, Assertive, Built for the road |

---

## 2. Color System

### 2.1 Primary Palette (5 Colors)

| Name | Hex | Balance | Usage |
|------|-----|---------|-------|
| **Midnight Ink** | `#141619` | 40% | Primary dark background, text on light |
| **Graphite Slate** | `#2c2e3a` | 20% | Secondary dark surfaces |
| **Deep Navy** | `#050a44` | 15% | Depth, ground |
| **Signal Blue** | `#0a21c0` | 10% | CTA accent, links, highlights |
| **Platinum Silver** | `#b3b4bd` | 15% | Connecting element |

### 2.2 Surface Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Bone** | `#f4f5f7` | Light backgrounds |
| **Bone 2** | `#e6e7eb` | Secondary light surfaces |
| **Paper** | `#ffffff` | Pure white surfaces |

### 2.3 Ink Ramp (Surfaces & Text)

| Stop | Hex |
|------|-----|
| N0 | `#f4f5f7` |
| N100 | `#e6e7eb` |
| N200 | `#d0d1d7` |
| N300 | `#b3b4bd` |
| N400 | `#8e909a` |
| N500 | `#6b6e78` |
| N600 | `#4a4d56` |
| N700 | `#2c2e3a` |
| N800 | `#1c1e26` |
| N900 | `#141619` |

### 2.4 Navy Ramp (Depth & Ground)

| Stop | Hex |
|------|-----|
| S50 | `#e8eaf5` |
| S100 | `#bfc4e0` |
| S150 | `#8f97c0` |
| S200 | `#5e69a0` |
| S250 | `#363f7d` |
| S300 | `#1a225b` |
| S350 | `#0f153f` |
| S400 | `#0a0f32` |
| S450 | `#070a28` |
| S500 | `#050a44` |

### 2.5 Electric Ramp (Signal & Accent)

| Stop | Hex |
|------|-----|
| L50 | `#e7eaff` |
| L100 | `#bfc7ff` |
| L150 | `#8e9bff` |
| L200 | `#5e70ff` |
| L250 | `#3449f0` |
| L300 | `#0a21c0` |
| L350 | `#081a99` |
| L400 | `#061473` |
| L450 | `#040d4d` |
| L500 | `#020726` |

### 2.6 Semantic / Status Colors

| State | Hex | Usage |
|-------|-----|-------|
| **On-Time** | `#22c07a` | Delivery on schedule |
| **At-Risk** | `#f5b841` | Trending late |
| **Delayed** | `#ff3b30` | Past window |
| **Detention** | `#8c6fff` | Dwell > threshold |
| **In-Transit** | `#0a21c0` | Primary lane |
| **Delivered** | `#2bb5a5` | Completed POD |
| **Scheduled** | `#64748b` | Pending pickup |
| **Unassigned** | `#050a44` | No driver yet |

---

## 3. Typography

### 3.1 Font Families

| Role | Font | Weights | Source |
|------|------|---------|--------|
| **Display** | DM Sans | 400, 500, 600, 700 | Google Fonts |
| **Body** | Inter | 300, 400, 500, 600, 700 | Google Fonts |
| **Mono** | JetBrains Mono | 400, 500, 700 | Google Fonts |

### 3.2 Type Scale

| Name | Size | Line Height |
|------|------|-------------|
| Display | 96px | 92px |
| Headline | 64px | 64px |
| Quote | 40px | 48px |
| Lead | 22px | 34px |
| Body | 16px | 26px |
| Small | 13px | 20px |
| Label | 12px | 16px |
| Data | 14px | 20px |
| Code | 14px | 24px |

### 3.3 Typography Rules

- **Base unit:** 8px grid
- **Line rhythm:** 4px baseline
- **Measure:** 66ch max
- **Numerals:** `font-variant-numeric: tabular-nums`
- **Smoothing:** `-webkit-font-smoothing: antialiased`
- **Fallback:** Times, serif

---

## 4. Logo System

### 4.1 Lockups

1. **Horizontal** — Primary, full-color with tagline
2. **Stacked** — Compact, glyph above wordmark
3. **Wordmark** — Text only, editorial use
4. **Glyph** — App icon, stamp, favicon

### 4.2 Minimum Sizes

| Context | Size |
|---------|------|
| Digital | 96px |
| UI | 48px |
| Minimum | 24px |

### 4.3 Clear Space

Maintain 1x notch height on all sides.

### 4.4 Approved Backgrounds

| Name | Hex |
|------|-----|
| Ink | `#141619` |
| Deep Navy | `#050a44` |
| Signal Blue | `#0a21c0` |
| Slate | `#2c2e3a` |
| Bone | `#f4f5f7` |
| Bone 2 | `#e6e7eb` |
| Silver | `#b3b4bd` |
| Paper | `#ffffff` |

### 4.5 Misuse

Do NOT:
- Stretch or squash
- Recolor outside palette
- Rotate off-axis
- Add drop shadows or effects
- Outline or stroke
- Use low contrast placement
- Add taglines inside lockup
- Reflow the mark

---

## 5. Iconography

| Property | Value |
|----------|-------|
| **Grid** | 48 x 48px |
| **Stroke** | 1.6px |
| **Caps** | Square |
| **Corner Radius** | 0px |
| **Style** | Geometric, stroked, no rounded corners |

---

## 6. Voice & Tone

### Principles
1. **Precise** — Numbers first. No adjectives where a metric will do.
2. **Direct** — Short sentences. Active voice. No filler.
3. **Informed** — We know the difference between a detention hour and a layover.
4. **Assured** — Confident without swagger. Helpful without handholding.

### Word Choice
- **Avoid:** "platform"
- **Prefer:** "operations"

### Examples

| Do | Don't |
|----|-------|
| Dispatch a load in 40 seconds. | Empower dispatchers with next-gen load optimization. |
| 1,082 miles, on-time. | Delivering value at scale across the nation. |
| The driver logged 8 hrs, 12 min. | Robust HOS visibility for the modern carrier. |
| Every load. Every driver. Every mile. | World-class end-to-end solutions you can trust. |

---

## 7. Migration Map

### 7.1 Palette Tokens (tokens.css:7-15)

| OLD Token | OLD Value | NEW Token | NEW Value | Role |
|-----------|-----------|-----------|-----------|------|
| `--p-mint` | `#75f0d4` | `--color-signal` | `#0a21c0` | CTA accent |
| `--p-slate-teal` | `#5b878a` | `--color-silver` | `#b3b4bd` | Secondary elements |
| `--p-ocean` | `#3b8696` | `--color-electric-l250` | `#3449f0` | Mid-range accent |
| `--p-deep-blue` | `#21657f` | `--color-navy-s300` | `#1a225b` | Brand identity |
| `--p-navy` | `#19334d` | `--color-slate` | `#2c2e3a` | Card backgrounds |
| `--p-forest` | `#005228` | (removed) | — | No equivalent; use semantic colors |
| `--p-midnight` | `#000d23` | `--color-ink` | `#141619` | Primary dark background |

### 7.2 Semantic Tokens (tokens.css:17-53)

| OLD Token | OLD Value | NEW Token | NEW Value | Notes |
|-----------|-----------|-----------|-----------|-------|
| `--color-bg-dark` | `#000d23` | `--color-bg-ink` | `#141619` | Primary dark bg |
| `--color-bg-light` | `#d9f0f7` | `--color-bg-bone` | `#f4f5f7` | Light sections |
| `--color-bg-card` | `#19334d` | `--color-bg-slate` | `#2c2e3a` | Dashboard cards |
| `--color-bg-secondary` | `#0a1628` | `--color-bg-navy-s450` | `#070a28` | Slightly lighter dark |
| `--color-brand` | `#21657f` | `--color-brand-navy` | `#050a44` | Brand identity |
| `--color-brand-mid` | `#3b8696` | `--color-brand-signal` | `#0a21c0` | Hover states |
| `--color-accent` | `#75f0d4` | `--color-accent-signal` | `#0a21c0` | CTAs, links |
| `--color-accent-hover` | `#5cd9be` | `--color-accent-hover` | `#3449f0` | Button hover (L250) |
| `--color-text-on-accent` | `#000d23` | `--color-text-on-signal` | `#ffffff` | Text on Signal buttons |
| `--color-text-primary` | `#ffffff` | `--color-text-primary` | `#ffffff` | No change |
| `--color-text-secondary` | `#a8c4d4` | `--color-text-secondary` | `#b3b4bd` | Use Silver |
| `--color-text-dark` | `#000d23` | `--color-text-ink` | `#141619` | Text on light |
| `--color-text-dark-secondary` | `#4a6280` | `--color-text-ink-n500` | `#6b6e78` | Secondary on light |
| `--color-text-muted` | `#6b8a9a` | `--color-text-muted` | `#8e909a` | Use N400 |
| `--color-border` | `#19334d` | `--color-border-slate` | `#2c2e3a` | Borders |
| `--color-border-light` | `#c2d8e8` | `--color-border-bone` | `#e6e7eb` | Light borders |

### 7.3 Status Tokens (tokens.css:46-49)

| OLD Token | OLD Value | NEW Token | NEW Value |
|-----------|-----------|-----------|-----------|
| `--color-live-green` | `#10b981` | `--color-status-on-time` | `#22c07a` |
| `--color-status-transit` | `#f59e0b` | `--color-status-at-risk` | `#f5b841` |
| `--color-status-dispatched` | `#7c6fcd` | `--color-status-detention` | `#8c6fff` |
| `--color-status-invoiced` | `#3b8696` | `--color-status-delivered` | `#2bb5a5` |

### 7.4 Additional Theme Colors (globals.css)

| OLD Token | OLD Value | NEW Token | NEW Value | Notes |
|-----------|-----------|-----------|-----------|-------|
| `--accent-cyan` | `#38bdf8` | `--color-electric-l150` | `#8e9bff` | Accent blue |
| `--accent-signal` | `#22c55e` | `--color-status-on-time` | `#22c07a` | Success green |
| `--accent-stripe` | `#f7c948` | `--color-status-at-risk` | `#f5b841` | Data highlight |
| `--bg-card-hover` | `#374151` | `--color-ink-n600` | `#4a4d56` | Card hover |
| `--text-muted` | `#64748b` | `--color-scheduled` | `#64748b` | Muted text |

### 7.5 Typography Migration

| OLD | NEW |
|-----|-----|
| Space Grotesk (display) | DM Sans |
| IBM Plex Sans (body) | Inter |
| Barlow Condensed (headline) | DM Sans |
| (none) | JetBrains Mono (data/code) |

---

## 8. Missing Assets

### 8.1 Logo Variants Required

The brand guide specifies 4 lockups across 8 approved backgrounds. Current inventory:

| Lockup | Available | Missing |
|--------|-----------|---------|
| **Horizontal** | No | on-ink, on-navy, on-signal, on-slate, on-bone, on-bone2, on-silver, on-paper |
| **Stacked** | No | on-ink, on-navy, on-signal, on-slate, on-bone, on-bone2, on-silver, on-paper |
| **Wordmark** | No | on-ink, on-navy, on-signal, on-slate, on-bone, on-bone2, on-silver, on-paper |
| **Glyph** | Partial | `logo 1.svg` (glyph on transparent, navy+silver) |

### 8.2 Full Missing Asset List

1. `logo-horizontal-on-ink.svg`
2. `logo-horizontal-on-navy.svg`
3. `logo-horizontal-on-signal.svg`
4. `logo-horizontal-on-slate.svg`
5. `logo-horizontal-on-bone.svg`
6. `logo-horizontal-on-bone2.svg`
7. `logo-horizontal-on-silver.svg`
8. `logo-horizontal-on-paper.svg`
9. `logo-stacked-on-ink.svg`
10. `logo-stacked-on-navy.svg`
11. `logo-stacked-on-signal.svg`
12. `logo-stacked-on-slate.svg`
13. `logo-stacked-on-bone.svg`
14. `logo-stacked-on-bone2.svg`
15. `logo-stacked-on-silver.svg`
16. `logo-stacked-on-paper.svg`
17. `logo-wordmark-on-ink.svg`
18. `logo-wordmark-on-navy.svg`
19. `logo-wordmark-on-signal.svg`
20. `logo-wordmark-on-slate.svg`
21. `logo-wordmark-on-bone.svg`
22. `logo-wordmark-on-bone2.svg`
23. `logo-wordmark-on-silver.svg`
24. `logo-wordmark-on-paper.svg`
25. `logo-glyph-on-ink.svg` (light version for dark bg)
26. `logo-glyph-on-navy.svg` (light version for dark bg)
27. `logo-glyph-on-signal.svg` (light version for dark bg)
28. `logo-glyph-on-slate.svg` (light version for dark bg)
29. `logo-glyph-on-bone.svg` (dark version for light bg)
30. `logo-glyph-on-bone2.svg` (dark version for light bg)
31. `logo-glyph-on-silver.svg` (dark version for light bg)
32. `logo-glyph-on-paper.svg` (dark version for light bg)

### 8.3 Additional Required Assets

| Asset | Status | Notes |
|-------|--------|-------|
| `favicon.ico` | Missing | Use glyph at 24px |
| `icon.svg` | Missing | Use glyph for modern browsers |
| `apple-icon.png` | Missing | 180x180 glyph on ink background |
| `opengraph-image.png` | Missing | 1200x630 with horizontal lockup |
| `manifest.json` | Missing | PWA manifest with icon array |

---

## 9. Validation Checklist

- [x] tokens.json is valid JSON
- [x] Every color from brand guide has lowercase hex
- [x] Migration map covers all tokens from BRAND_AUDIT.md sections 3.1 and 3.2
- [x] Missing logo variants explicitly enumerated (32 SVGs + 5 meta assets)

---

*Generated from DriveCommand Brand Guide v1.0 (April 2026)*
