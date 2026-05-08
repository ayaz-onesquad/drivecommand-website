# DriveCommand Color Consistency Audit

**Date:** 2026-05-07
**Auditor:** Claude Code
**Brand Guide Version:** v1.0 April 2026
**Source of Truth:** `brand/UX_GUIDELINES.md` §3, `brand/tokens.json`

---

## Executive Summary

| Category | Off-Brand Instances | Files Affected |
|----------|---------------------|----------------|
| Default Tailwind color classes | 89 | 12 |
| Raw hex values (in allowed locations) | 3 | 2 |
| Off-brand rgba/rgb values | 24 | 7 |
| SVG inline colors (icons) | 12 | 3 |
| Unauthorized gradients | 1 | 1 |
| **Total** | **129** | **14** |

**Critical Issues:**
1. `#8c6fff` purple used for "detention" state — not in brand palette
2. Light mode uses hardcoded off-brand colors (`#1a5570`, `#0284c7`, `#059669`)
3. `brand-preview/page.tsx` displays OLD brand hex values that contradict current brand guide
4. Widespread use of default Tailwind colors (`emerald-*`, `amber-*`, `indigo-*`, `sky-*`, `slate-*`, `red-*`, `green-*`, `blue-*`) instead of brand tokens

---

## Allowed Colors (Reference)

### Neutrals (11 steps)
| Token | Hex | Tailwind Alias |
|-------|-----|----------------|
| n000 | #FFFFFF | (print only) |
| n050 | #F5F5F7 | `bone` |
| n100 | #E8E8ED | `mist` |
| n200 | #D2D2D7 | `fog` |
| n300 | #AEAEB2 | `quiet` |
| n400 | #86868B | `silver` |
| n500 | #6E6E73 | `graphite` |
| n600 | #48484A | `iron` |
| n700 | #363638 | `coal` |
| n800 | #2C2C2E | `slate` |
| n900 | #1D1D1F | `ink` |

### Brand Blue (9 steps)
| Token | Hex | Tailwind Alias |
|-------|-----|----------------|
| b050 | #E5F0FB | `tint` |
| b100 | #C9E0F4 | `wash` |
| b200 | #8FBEEA | `sky` |
| b300 | #5AC8FA | `air` |
| b400 | #2D8FE0 | `hover` |
| b500 | #0066CC | `brand` |
| b600 | #003C82 | `deep` |
| b700 | #002654 | `trench` |
| b800 | #001A3D | `abyss` |

### Semantic States
| Token | Hex | Use |
|-------|-----|-----|
| success | #006B40 | On-time, delivered |
| warning | #9A4A00 | At-risk, trending late |
| critical | #C8102E | Past window, errors |
| info | #0066CC | In-transit, active |

---

## Detailed Findings

### 1. globals.css — Light Mode Off-Brand Colors

**File:** `src/app/globals.css`
**Lines:** 53-55

| Line | Current Value | Issue | Replacement |
|------|---------------|-------|-------------|
| 53 | `--accent-blue-hover: #1a5570;` | Not a brand color | `var(--dc-b600)` → #003C82 |
| 54 | `--accent-cyan: #0284c7;` | Not a brand color | `var(--dc-b300)` → #5AC8FA |
| 55 | `--accent-green: #059669;` | Not a brand color | `var(--dc-state-success)` → #006B40 |

### 2. tokens.css & tailwind.config.ts — Purple Detention Color

**Files:** `src/styles/tokens.css:78,115`, `tailwind.config.ts:118`

| Location | Current Value | Issue | Recommendation |
|----------|---------------|-------|----------------|
| tokens.css:78 | `--dc-state-detention: #8c6fff;` | Purple not in brand | **FLAGGED FOR HUMAN REVIEW** |
| tokens.css:115 | `--color-status-dispatched: #8c6fff;` | Same purple | **FLAGGED FOR HUMAN REVIEW** |
| tailwind.config.ts:118 | `detention: '#8c6fff'` | Same purple | **FLAGGED FOR HUMAN REVIEW** |

> **Note:** This purple is used for "detention" and "dispatched" status. The brand guide only defines 4 semantic colors (success, warning, critical, info). Need human decision: use `info` (#0066CC) or `warning` (#9A4A00) or add purple to brand guide.

### 3. brand-preview/page.tsx — OLD Brand Colors

**File:** `src/app/brand-preview/page.tsx`

This file displays a brand preview but uses **OLD hex values** that contradict the current brand guide:

| Line | Current Hex | Current Name | Brand Guide Hex | Correct Name |
|------|-------------|--------------|-----------------|--------------|
| 42 | #141619 | Ink | #1D1D1F | Ink (n900) |
| 43 | #2c2e3a | Slate | #2C2C2E | Slate (n800) |
| 44 | #050a44 | Navy | #002654 | Trench (b700) |
| 45 | #0a21c0 | Signal | #0066CC | Brand (b500) |
| 46 | #b3b4bd | Silver | #86868B | Silver (n400) |
| 54 | #f4f5f7 | Bone | #F5F5F7 | ✓ Close match |
| 115 | #22c07a | On-Time | #006B40 | Success |
| 116 | #f5b841 | At-Risk | #9A4A00 | Warning |
| 117 | #ff3b30 | Delayed | #C8102E | Critical |
| 120 | #2bb5a5 | Delivered | #006B40 | Success |
| 121 | #64748b | Scheduled | #86868B | Silver (n400) |

**Action:** This entire preview page needs to be updated to show current brand guide values, not legacy colors.

### 4. Default Tailwind Color Classes — Component Files

#### 4.1 theme-toggle.tsx
**File:** `src/components/shared/theme-toggle.tsx`

| Line | Current | Replacement |
|------|---------|-------------|
| 56 | `text-slate-300` | `text-quiet` |
| 66 | `text-slate-600` | `text-iron` |

#### 4.2 contact-form.tsx
**File:** `src/app/contact/contact-form.tsx`

| Line | Current | Replacement |
|------|---------|-------------|
| 41 | `text-red-400` | `text-critical` |
| 50 | `border-red-500` | `border-critical` |
| 55 | `text-red-400` | `text-critical` |
| 62 | `text-red-400` | `text-critical` |
| 71 | `border-red-500` | `border-critical` |
| 76 | `text-red-400` | `text-critical` |
| 83 | `text-red-400` | `text-critical` |
| 92 | `border-red-500` | `border-critical` |
| 97 | `text-red-400` | `text-critical` |
| 104 | `text-red-400` | `text-critical` |
| 112 | `border-red-500` | `border-critical` |
| 122 | `text-red-400` | `text-critical` |
| 129 | `text-red-400` | `text-critical` |
| 138 | `border-red-500` | `border-critical` |
| 143 | `text-red-400` | `text-critical` |

#### 4.3 toast.tsx
**File:** `src/components/shared/toast.tsx`

| Line | Current | Replacement |
|------|---------|-------------|
| 39 | `bg-red-500/10 border border-red-500/30` | `bg-critical/10 border border-critical/30` |
| 45 | `text-red-500` | `text-critical` |
| 49 | `text-red-400` | `text-critical` |
| 57 | `text-red-400` | `text-critical` |

#### 4.4 status-badge.tsx
**File:** `src/components/shared/status-badge.tsx`

| Line | Current | Replacement |
|------|---------|-------------|
| 12 | `bg-amber-500/10 text-amber-400 ring-amber-500/20` | `bg-warning/10 text-warning ring-warning/20` |
| 13 | `bg-emerald-500/10 text-emerald-400 ring-emerald-500/20` | `bg-success/10 text-success ring-success/20` |
| 14 | `bg-indigo-500/10 text-indigo-400 ring-indigo-500/20` | `bg-info/10 text-info ring-info/20` |
| 15 | `bg-blue-500/10 text-blue-400 ring-blue-500/20` | `bg-info/10 text-info ring-info/20` |
| 25 | `bg-amber-400` | `bg-warning` |
| 26 | `bg-emerald-400` | `bg-success` |
| 27 | `bg-indigo-400` | `bg-info` |
| 28 | `bg-blue-400` | `bg-info` |

#### 4.5 social-proof.tsx
**File:** `src/components/sections/social-proof.tsx`

| Line | Current | Replacement |
|------|---------|-------------|
| 44 | `bg-sky-500` | `bg-brand` |
| 46 | `bg-emerald-600` | `bg-success` |
| 49 | `bg-slate-500` | `bg-graphite` |

#### 4.6 features-grid.tsx
**File:** `src/components/sections/features-grid.tsx`

| Line | Current | Replacement |
|------|---------|-------------|
| 27 | `rgb(71 85 105 / 0.4)` | `rgba(110, 110, 115, 0.4)` (graphite) |
| 61 | `text-emerald-400` | `text-success` |
| 62 | `bg-emerald-500/10` | `bg-success/10` |
| 63 | `rgba(34, 192, 122, 0.6)` | `rgba(0, 107, 64, 0.6)` (success) |
| 64 | `rgba(34, 192, 122, 0.3)` | `rgba(0, 107, 64, 0.3)` |
| 73 | `rgba(142, 155, 255, 0.6)` | `rgba(0, 102, 204, 0.6)` (brand) |
| 74 | `rgba(142, 155, 255, 0.3)` | `rgba(0, 102, 204, 0.3)` |
| 81 | `text-indigo-400` | `text-brand` |
| 82 | `bg-indigo-500/10` | `bg-brand/10` |
| 83 | `rgba(129, 140, 248, 0.6)` | `rgba(0, 102, 204, 0.6)` (brand) |
| 84 | `rgba(129, 140, 248, 0.3)` | `rgba(0, 102, 204, 0.3)` |
| 91 | `text-emerald-400` | `text-success` |
| 92 | `bg-emerald-500/10` | `bg-success/10` |
| 93 | `rgba(52, 211, 153, 0.6)` | `rgba(0, 107, 64, 0.6)` (success) |
| 94 | `rgba(52, 211, 153, 0.3)` | `rgba(0, 107, 64, 0.3)` |

#### 4.7 hero.tsx
**File:** `src/components/sections/hero.tsx`

| Line | Current | Replacement |
|------|---------|-------------|
| 60 | `bg-amber-500` | `bg-warning` |
| 61 | `bg-green-500` | `bg-success` |
| 62 | `bg-indigo-500` | `bg-info` |
| 344 | `border-slate-700/50` | `border-coal/50` |
| 348-350 | `bg-red-500/60`, `bg-yellow-500/60`, `bg-green-500/60` | **KEEP** (macOS window controls - decorative) |
| 352 | `text-gray-400` | `text-silver` |
| 355-356 | `bg-green-500`, `text-green-400` | `bg-success`, `text-success` |
| 361 | `border-slate-700/30` | `border-coal/30` |
| 374-384 | `fill-slate-500` | `fill-graphite` |
| 471 | `text-slate-400` | `text-silver` |
| 475 | `text-slate-200` | `text-fog` |
| 476 | `text-blue-400` | `text-air` |
| 496 | `rgb(15, 23, 42)` | Use token `var(--dc-n900)` |
| 497 | `rgb(30, 41, 59)` | Use token `var(--dc-n700)` |
| 501-503 | `border-slate-800`, `bg-red-500`, `text-red-400` | `border-slate`, `bg-critical`, `text-critical` |

#### 4.8 demo-video.tsx
**File:** `src/components/sections/demo-video.tsx`

| Line | Current | Replacement |
|------|---------|-------------|
| 115-117 | `bg-red-500`, `bg-yellow-500`, `bg-green-500` | **KEEP** (macOS window controls - decorative) |

#### 4.9 mobile-menu.tsx
**File:** `src/components/layout/mobile-menu.tsx`

| Line | Current | Replacement |
|------|---------|-------------|
| 109 | `hover:border-sky-400/40 hover:bg-sky-400/10` | `hover:border-hover/40 hover:bg-hover/10` |

#### 4.10 navbar.tsx
**File:** `src/components/layout/navbar.tsx`

| Line | Current | Replacement |
|------|---------|-------------|
| 99 | `hover:border-sky-400/40 hover:bg-sky-400/10` | `hover:border-hover/40 hover:bg-hover/10` |

#### 4.11 interactive-demo.tsx
**File:** `src/components/sections/interactive-demo.tsx`

| Line | Current | Replacement |
|------|---------|-------------|
| 120 | `bg-emerald-500/10 border-emerald-500/30 text-emerald-400` | `bg-success/10 border-success/30 text-success` |
| 204 | `bg-emerald-500` | `bg-success` |
| 205 | `hover:border-sky-400/60` | `hover:border-hover/60` |
| 295 | `text-amber-400` | `text-warning` |
| 304 | `hover:border-sky-400/60` | `hover:border-hover/60` |
| 325 | `bg-amber-500/10 border-amber-500 text-amber-300` | `bg-warning/10 border-warning text-warning` |
| 339 | `hover:border-sky-400/60` | `hover:border-hover/60` |
| 404 | `bg-emerald-500`, `bg-amber-500` | `bg-success`, `bg-warning` |
| 421 | `text-amber-400` | `text-warning` |
| 470 | `hover:border-sky-400/60` | `hover:border-hover/60` |
| 517 | `bg-emerald-500/10 border-emerald-500/30 text-emerald-400` | `bg-success/10 border-success/30 text-success` |
| 559 | `bg-emerald-500/10 text-emerald-400` | `bg-success/10 text-success` |
| 563 | `bg-amber-500/10 text-amber-400` | `bg-warning/10 text-warning` |
| 586-587 | `bg-emerald-500`, `hover:border-sky-400/60` | `bg-success`, `hover:border-hover/60` |
| 636 | `bg-blue-500/10 text-blue-400` | `bg-info/10 text-info` |
| 638 | `bg-red-500/10 text-red-400` | `bg-critical/10 text-critical` |
| 640 | `bg-blue-500/10 text-blue-400` | `bg-info/10 text-info` |
| 642 | `bg-emerald-500/10 text-emerald-400` | `bg-success/10 text-success` |
| 656 | `text-emerald-400` | `text-success` |
| 660 | `text-sky-400` | `text-air` |
| 667 | `text-blue-400` | `text-brand` |
| 727 | `hover:border-sky-400/60` | `hover:border-hover/60` |
| 748 | `text-emerald-400` | `text-success` |
| 765 | `hover:border-sky-400/60` | `hover:border-hover/60` |
| 925 | `hover:bg-sky-400/10 hover:border-sky-400/40` | `hover:bg-hover/10 hover:border-hover/40` |
| 961 | `hover:bg-sky-400/10 hover:border-sky-400/40` | `hover:bg-hover/10 hover:border-hover/40` |

#### 4.12 pricing-calculator.tsx
**File:** `src/components/sections/pricing-calculator.tsx`

| Line | Current | Replacement |
|------|---------|-------------|
| 81-83 | `bg-slate-600` | `bg-iron` |

### 5. SVG Icon Files — Old Brand Colors

**Files:** `src/app/icon.svg`, `src/app/opengraph-image.svg`, `src/app/apple-icon.svg`

These are logo/icon files that use OLD brand colors:

| Current Hex | Current Use | Brand Guide Hex | Correct Token |
|-------------|-------------|-----------------|---------------|
| #141619 | Background rect | #1D1D1F | ink (n900) |
| #0a21c0 | Logo element | #0066CC | brand (b500) |
| #b3b4bd | Logo element | #86868B | silver (n400) |

**Action:** Update all three SVG files to use current brand colors.

### 6. Off-Brand rgba/rgb Values in Components

Several components use rgba/rgb values that don't correspond to brand colors:

| File | Line | Current Value | Issue | Replacement |
|------|------|---------------|-------|-------------|
| globals.css | 537-538 | `rgba(34, 197, 94, ...)` | Tailwind green-500 | `rgba(0, 107, 64, ...)` (success) |
| hero.tsx | 257 | `rgba(45, 55, 72, 0.6)` | Tailwind gray-700 | Use n700 token |
| hero.tsx | 339 | `rgba(22, 32, 46, 0.9)` | Off-brand dark | Use n800/n900 token |
| hero.tsx | 453-454, 460-461 | `rgba(30, 37, 51, ...)`, `rgba(42, 58, 80, ...)` | Off-brand | Use n-series tokens |
| features-grid.tsx | 63-64 | `rgba(34, 192, 122, ...)` | Wrong green | `rgba(0, 107, 64, ...)` (success) |
| features-grid.tsx | 73-74 | `rgba(142, 155, 255, ...)` | Off-brand purple | `rgba(0, 102, 204, ...)` (brand) |
| features-grid.tsx | 83-84 | `rgba(129, 140, 248, ...)` | Tailwind indigo | `rgba(0, 102, 204, ...)` (brand) |
| features-grid.tsx | 93-94 | `rgba(52, 211, 153, ...)` | Tailwind emerald | `rgba(0, 107, 64, ...)` (success) |

### 7. Gradients — Audit

| File | Line | Gradient | Status |
|------|------|----------|--------|
| globals.css | 352-358 | Linear gradient using `--accent-blue` | ✓ OK (uses token) |
| globals.css | 499 | `linear-gradient(180deg, rgba(255, 255, 255, 0.03)...)` | ✓ OK (white tint) |
| globals.css | 133-134 | Radial gradients with `rgba(0, 102, 204, ...)` | ✓ OK (brand blue) |
| parallax-world.tsx | 102, 111, 120 | Radial gradients with `rgba(0, 102, 204, ...)` | ✓ OK (brand blue) |
| hero.tsx | 125 | Dot grid `rgba(255,255,255,0.08)` | ✓ OK (white dots) |
| hero.tsx | 144, 156 | Radial gradients with `rgba(0, 102, 204, ...)` | ✓ OK (brand blue) |
| features-grid.tsx | 27 | `rgb(71 85 105 / 0.4)` | ❌ OFF-BRAND (Tailwind slate-600) |
| interactive-demo.tsx | 55-56 | Uses `var(--text-secondary)` | ✓ OK (uses token) |

---

## Items Flagged for Human Review

### 1. Purple "Detention" State Color (`#8c6fff`)

**Current usage:** detention status, dispatched status
**Issue:** Purple is not in the brand guide's 4 semantic colors
**Options:**
- A) Map to `info` (#0066CC) — blue for "waiting/pending" states
- B) Map to `warning` (#9A4A00) — if detention implies risk
- C) Add purple to brand guide as 5th semantic color
- D) Use a brand blue variant (b300 `#5AC8FA` or b400 `#2D8FE0`)

**Files affected:** `tokens.css`, `tailwind.config.ts`

### 2. MacOS Window Controls (Decorative)

**Files:** `hero.tsx:348-350`, `demo-video.tsx:115-117`
**Colors:** `bg-red-500`, `bg-yellow-500`, `bg-green-500`
**Recommendation:** KEEP as-is. These are universally recognized macOS traffic light colors. Changing them would break user expectation. They are decorative, not brand colors.

### 3. brand-preview/page.tsx Purpose

**Issue:** This page shows OLD brand colors that contradict the brand guide
**Options:**
- A) Update all hex values to match current brand guide
- B) Delete this page if it's obsolete
- C) Rename to "Legacy Brand Colors" if keeping for reference

---

## Estimated Remediation Scope

| Action | File Count | Replacement Count |
|--------|------------|-------------------|
| Replace default Tailwind classes | 12 | ~75 |
| Replace raw hex values | 2 | 3 |
| Replace off-brand rgba/rgb | 7 | ~24 |
| Update SVG icon colors | 3 | 9 |
| Remove unauthorized gradients | 1 | 1 |
| **Total** | **14** | **~112** |

---

## Verification Checklist (Post-Remediation)

- [ ] Audit report generated at `docs/audits/COLOR_AUDIT_2026-05-07.md`
- [ ] User confirmed before Phase 2 began
- [ ] All raw hex values outside allowed files replaced with tokens
- [ ] All Tailwind arbitrary color values replaced
- [ ] All default Tailwind color classes mapped to brand tokens
- [ ] All inline SVG colors converted to brand values
- [ ] Unauthorized gradient in features-grid.tsx fixed
- [ ] Semantic color decorative misuse flagged for human review
- [ ] `npm run build` passes
- [ ] `npm run lint` passes
- [ ] Architecture test: `b500` change propagates everywhere
- [ ] Final grep sweep returns zero off-brand colors
- [ ] No layout, spacing, typography, copy, or behavior changes
- [ ] `brand/tokens.json` untouched
- [ ] Logo files in `brand/logo/` and `public/brand/logo/` untouched

---

## Changes Made

*(To be updated after Phase 2 remediation)*

---

*Generated by Claude Code color consistency audit*
