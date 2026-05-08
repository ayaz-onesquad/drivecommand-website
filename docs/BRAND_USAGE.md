# DriveCommand Brand Usage Guide

> **Version:** 1.0 (April 2026)
> **Purpose:** Developer reference for implementing the DriveCommand brand system

---

## Table of Contents

1. [Color System](#1-color-system)
2. [Logo Component](#2-logo-component)
3. [Typography](#3-typography)
4. [Voice & Tone](#4-voice--tone)
5. [Minimum Sizes](#5-minimum-sizes)

---

## 1. Color System

### Tailwind Classes

All brand colors are available via the `dc` and `dc2` Tailwind namespaces.

#### Primary Palette (`dc2.*`)

```tsx
// Backgrounds
<div className="bg-dc2-ink" />      // #141619 - Primary dark (40%)
<div className="bg-dc2-slate" />    // #2c2e3a - Secondary dark (20%)
<div className="bg-dc2-navy" />     // #050a44 - Depth/ground (15%)
<div className="bg-dc2-signal" />   // #0a21c0 - CTA accent (10%)
<div className="bg-dc2-silver" />   // #b3b4bd - Connecting element (15%)

// Surfaces
<div className="bg-dc2-bone" />     // #f4f5f7 - Light background
<div className="bg-dc2-bone2" />    // #e6e7eb - Secondary light
<div className="bg-dc2-paper" />    // #ffffff - Pure white
```

#### Semantic Colors (`dc.*`)

```tsx
// Backgrounds
<div className="bg-dc-bg-dark" />       // Primary dark background
<div className="bg-dc-bg-light" />      // Light sections
<div className="bg-dc-bg-card" />       // Card backgrounds

// Text
<span className="text-dc-text-primary" />     // White on dark
<span className="text-dc-text-secondary" />   // Muted on dark
<span className="text-dc-text-dark" />        // Dark on light

// Accent (Signal Blue)
<button className="bg-dc-accent text-dc-text-on-accent" />
<button className="hover:bg-dc-accent-hover" />

// Status
<span className="text-dc-live-green" />       // On-Time
<span className="text-dc-status-transit" />   // At-Risk (amber)
<span className="text-dc-status-dispatched" /> // Detention (purple)
<span className="text-dc-status-invoiced" />  // Delivered (teal)
```

#### Color Ramps (`dc2.n.*`, `dc2.s.*`, `dc2.signal.*`)

```tsx
// Ink Ramp (neutrals) - n0 to n900
<div className="bg-dc2-n-100" />    // Light gray
<div className="bg-dc2-n-500" />    // Mid gray
<div className="bg-dc2-n-900" />    // Near black

// Navy Ramp (depth) - s50 to s500
<div className="bg-dc2-s-300" />    // Deep navy

// Electric Ramp (accent) - signal.50 to signal.500
<div className="bg-dc2-signal-150" />  // Light electric
<div className="bg-dc2-signal-250" />  // Hover state
```

#### State Colors (`dc2.state.*`)

```tsx
<span className="text-dc2-state-onTime" />     // #22c07a - Green
<span className="text-dc2-state-atRisk" />     // #f5b841 - Amber
<span className="text-dc2-state-delayed" />    // #ff3b30 - Red
<span className="text-dc2-state-detention" />  // #8c6fff - Purple
<span className="text-dc2-state-inTransit" />  // #0a21c0 - Signal Blue
<span className="text-dc2-state-delivered" />  // #2bb5a5 - Teal
<span className="text-dc2-state-scheduled" />  // #64748b - Slate
<span className="text-dc2-state-unassigned" /> // #050a44 - Navy
```

### CSS Variables

For direct CSS usage, reference `--dc-*` variables:

```css
.my-component {
  background-color: var(--dc-ink);
  color: var(--dc-color-text-primary);
  border-color: var(--dc-slate);
}

.my-button {
  background-color: var(--dc-signal);
  color: var(--dc-color-text-on-accent);
}

.my-button:hover {
  background-color: var(--dc-l250);
}
```

---

## 2. Logo Component

Import the Logo component from `@/components/brand/Logo`:

```tsx
import { Logo } from '@/components/brand/Logo'
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'horizontal' \| 'stacked' \| 'wordmark' \| 'glyph'` | `'horizontal'` | Visual arrangement |
| `background` | `'ink' \| 'navy' \| 'signal' \| 'slate' \| 'bone' \| 'bone2' \| 'silver' \| 'paper' \| 'auto'` | `'auto'` | Background context for contrast |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| number` | `'md'` | Height in pixels |
| `className` | `string` | `''` | Additional CSS classes |

### Size Presets

| Preset | Pixels | Usage |
|--------|--------|-------|
| `sm` | 24px | Minimum allowed |
| `md` | 48px | UI standard (nav, footer) |
| `lg` | 96px | Digital standard |
| `xl` | 144px | Hero/display |

### Examples

#### Navbar (Dark Background)

```tsx
<Logo variant="horizontal" size="md" background="ink" />
```

#### Footer (Dark Background)

```tsx
<Logo variant="horizontal" size="md" background="ink" />
```

#### Hero Section (Large)

```tsx
<Logo variant="horizontal" size="xl" background="ink" />
```

#### Mobile Menu (Stacked)

```tsx
<Logo variant="stacked" size="lg" background="slate" />
```

#### Favicon/App Icon (Glyph Only)

```tsx
<Logo variant="glyph" size="sm" />
```

#### Light Background

```tsx
<Logo variant="horizontal" size="md" background="paper" />
```

#### Custom Size

```tsx
<Logo variant="horizontal" size={72} background="navy" />
```

### Background Behavior

| Background | Text Color | Glyph Variant |
|------------|------------|---------------|
| `ink`, `navy`, `signal`, `slate` | Light (white) | `glyph-on-dark.svg` |
| `bone`, `bone2`, `silver`, `paper` | Dark (ink) | `glyph-on-light.svg` |
| `auto` | Light (default) | `glyph-on-dark.svg` |

---

## 3. Typography

### Font Families

```tsx
// Display (DM Sans) - Headings
<h1 className="font-display font-bold">Headline</h1>

// Body (Inter) - Paragraphs
<p className="font-body">Body text</p>

// Mono (JetBrains Mono) - Code, data
<code className="font-mono">code</code>
```

### CSS Variables

```css
font-family: var(--font-display);  /* DM Sans */
font-family: var(--font-body);     /* Inter */
font-family: var(--font-mono);     /* JetBrains Mono */
```

### Type Scale Reference

| Name | Size | Line Height | Usage |
|------|------|-------------|-------|
| Display | 96px | 92px | Hero headlines |
| Headline | 64px | 64px | Section headers |
| Quote | 40px | 48px | Pull quotes |
| Lead | 22px | 34px | Intro paragraphs |
| Body | 16px | 26px | Default text |
| Small | 13px | 20px | Captions |
| Label | 12px | 16px | Form labels |
| Data | 14px | 20px | Tables, metrics |
| Code | 14px | 24px | Code blocks |

---

## 4. Voice & Tone

### The "platform" → "operations" Rule

**Never use "platform"** when describing the product. Use **"operations"** instead.

| Don't Say | Do Say |
|-----------|--------|
| "Our platform helps carriers..." | "DriveCommand helps carriers manage operations..." |
| "A modern platform for logistics" | "Modern operations management for logistics" |
| "Platform features include..." | "Key capabilities include..." |

### Tagline Usage

The tagline is **"Miles Ahead."** — always with the period.

**Rules:**
- Always include the period: "Miles Ahead."
- Never shorten or modify: ~~"Miles Ahead of the Competition"~~
- In headlines, split colors: "Miles" in bone, "Ahead." in Signal Blue
- May appear standalone or after the wordmark

```tsx
// Correct tagline rendering
<span className="text-dc2-bone">Miles </span>
<span className="text-dc2-signal">Ahead.</span>
```

### Writing Style

1. **Precise** — Numbers first. No adjectives where a metric will do.
2. **Direct** — Short sentences. Active voice. No filler.
3. **Informed** — We know the difference between a detention hour and a layover.
4. **Assured** — Confident without swagger. Helpful without handholding.

| Don't Say | Do Say |
|-----------|--------|
| "Empower dispatchers with next-gen load optimization" | "Dispatch a load in 40 seconds" |
| "Delivering value at scale across the nation" | "1,082 miles, on-time" |
| "Robust HOS visibility for the modern carrier" | "The driver logged 8 hrs, 12 min" |

---

## 5. Minimum Sizes

### Logo Minimum Sizes

| Context | Minimum Size |
|---------|--------------|
| Glyph only | 24px |
| UI (nav, buttons) | 48px |
| Digital (hero, OG) | 96px |

The Logo component will warn in development if you use a size below 24px.

### Clear Space

Maintain **1× notch height** clear space on all sides of the logo. This is handled automatically by the Logo component's container.

---

## Quick Reference

### Import Pattern

```tsx
// Logo
import { Logo } from '@/components/brand/Logo'

// Colors via Tailwind
className="bg-dc2-signal text-dc2-text-onAccent"

// Colors via CSS
style={{ backgroundColor: 'var(--dc-signal)' }}
```

### Common Patterns

```tsx
// CTA Button
<button className="bg-dc-accent text-dc-text-on-accent hover:bg-dc-accent-hover">
  Start Free Trial
</button>

// Card on dark background
<div className="bg-dc-bg-card border border-dc-border rounded-lg p-6">
  <h3 className="text-dc-text-primary font-display font-bold">Card Title</h3>
  <p className="text-dc-text-secondary font-body">Card content</p>
</div>

// Status indicator
<span className="text-dc2-state-onTime">On Time</span>
<span className="text-dc2-state-atRisk">At Risk</span>
```

---

## Resources

- **Brand Guide Summary:** `/brand/BRAND_GUIDE_SUMMARY.md`
- **Design Tokens (JSON):** `/brand/tokens.json`
- **Migration Map:** `/brand/MIGRATION_MAP.json`
- **Brand Preview (dev only):** `http://localhost:3000/brand-preview`
- **Logo Component:** `/src/components/brand/Logo.tsx`

---

*DriveCommand Brand System v1.0 — April 2026*
