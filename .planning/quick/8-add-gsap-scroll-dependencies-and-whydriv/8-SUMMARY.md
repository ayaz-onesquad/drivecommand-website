---
phase: quick-8
plan: 01
subsystem: marketing-site
tags:
  - scroll-animation
  - gsap
  - why-section
  - accessibility
dependency_graph:
  requires:
    - utils (cn)
    - tailwind-config (font utilities)
  provides:
    - WhyDriveCommandScroll component
    - 5-panel scroll storytelling section
  affects:
    - future page.tsx integration
tech_stack:
  added:
    - gsap@3.15.0
    - "@gsap/react@2.1.2"
  patterns:
    - GSAP ScrollTrigger scroll-pinned rotation
    - Reduced-motion accessibility fallback
    - Brand color palette adherence
key_files:
  created:
    - src/components/sections/why-drivecommand-scroll.tsx
  modified:
    - package.json
    - package-lock.json
decisions:
  - key: "GSAP for scroll animations"
    rationale: "Industry-standard library with robust ScrollTrigger plugin for scroll-linked animations"
  - key: "5-panel structure"
    rationale: "Adapted from 21st.dev FlowArt pattern - proven UX for scroll storytelling"
  - key: "Reduced-motion fallback"
    rationale: "Accessibility requirement - users with motion sensitivity get static stacked panels"
  - key: "Hardcoded brand hex colors"
    rationale: "Per plan specs - specific colors for each panel (#1D1D1F, #0066CC, #F5F5F7, #003C82)"
metrics:
  duration: "2m"
  tasks_completed: 3
  files_changed: 3
  completed_date: "2026-05-08"
---

# Quick Task 8: GSAP Scroll Dependencies + WhyDriveCommand Section

**One-liner:** GSAP-powered 5-panel scroll-pinned "Why DriveCommand" section with rotation animations and reduced-motion fallback

## Objective

Create an engaging scroll-based storytelling section that highlights DriveCommand's value propositions using scroll-pinned rotation animations, adapted from the 21st.dev FlowArt pattern with DriveCommand brand styling.

## What Was Built

### Task 1: GSAP Dependencies (39d0208)
- Installed `gsap@3.15.0` - Core GSAP library with ScrollTrigger plugin
- Installed `@gsap/react@2.1.2` - React hooks for GSAP integration
- Verified packages with `npm ls gsap @gsap/react`

### Task 2: WhyDriveCommandScroll Component (7a43c43)
Created comprehensive 5-panel scroll component with:

**Panel 01 — The Carrier Truth**
- Background: Ink (#1D1D1F)
- Headline: "Built / For The / Road."
- Value: Empathy messaging - built by people who've moved freight

**Panel 02 — One Platform**
- Background: Brand Blue (#0066CC)
- Headline: "Replace / Five Tools / With One."
- 3 feature cards: Dispatch, Settlements, Compliance
- Visual: White cards with backdrop blur on blue background

**Panel 03 — Transparent Pricing**
- Background: Bone (#F5F5F7)
- Headline: "No / Sales Calls / Required."
- 3 value cards: Per-truck, No lock-in, Every feature
- Visual: White cards on light background

**Panel 04 — Compliance, Automated**
- Background: Deep Navy (#003C82)
- Headline: "DOT-Ready. / IFTA-Ready. / Audit-Ready."
- 3 stat cards: 99.7% compliance, 0 manual filings, 1-click audits
- Visual: Large numbers with mono font

**Panel 05 — Built for SMB**
- Background: Ink (#1D1D1F)
- Headline: "For Carriers / Running 1 To 25 / Trucks." (Carriers in Brand Blue)
- CTA: "Start free trial →" (Brand Blue button)
- Secondary: "Or talk to a human →" (Air blue text link)

**Technical Features:**
- GSAP ScrollTrigger: Pins each panel, rotates next panel from 30deg to 0deg
- Reduced-motion check: Static stacked panels for accessibility
- Section ID: `id="why-drivecommand"` for anchor navigation
- TypeScript strict mode compliance
- Named exports: `WhyDriveCommandScroll`, `FlowSection`, `FlowArt`
- Default export: `WhyDriveCommandScroll`

### Task 3: Build Verification
- Production build successful (zero errors)
- TypeScript type checking passed
- ESLint passed
- Component ready for page.tsx integration

## Typography Classes Applied

Per plan specifications:
- **Eyebrow:** `font-mono text-xs font-medium uppercase tracking-[0.2em]`
- **Headline:** `font-display text-[clamp(3.5rem,12vw,14rem)] font-bold leading-[0.85] uppercase tracking-tight`
- **Body:** `font-body text-[clamp(1rem,2.5vw,1.75rem)] font-normal leading-relaxed max-w-[50ch]`
- **Sub-card label:** `font-mono text-xs font-semibold uppercase tracking-wider`
- **Sub-card body:** `font-body text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75`
- **Stat numbers:** `font-mono text-[clamp(3rem,6vw,5rem)] font-bold leading-none`

## Color Palette Adherence

Only approved brand colors used:
- `#1D1D1F` (Ink) - Dark backgrounds
- `#F5F5F7` (Bone) - Light backgrounds
- `#FFFFFF` (Paper) - Text on Brand Blue
- `#0066CC` (Brand Blue) - CTA, accent, Panel 02 bg
- `#003C82` (Deep Navy) - Panel 04 bg
- `#E5F0FB` (Tint) - Text on Deep Navy
- `#2D8FE0` (B400 Hover) - Button hover state
- `#5AC8FA` (Air) - Secondary link color

Zero raw Tailwind colors (no amber, emerald, red, green, blue classes).

## Deviations from Plan

None - plan executed exactly as written.

## Integration Notes

**Next step (Prompt 2):**
- Import component in `src/app/page.tsx`
- Place between Features and Final CTA sections
- No additional dependencies needed

**Usage:**
```tsx
import { WhyDriveCommandScroll } from '@/components/sections/why-drivecommand-scroll'

export default function Home() {
  return (
    <>
      {/* ... existing sections ... */}
      <WhyDriveCommandScroll />
      {/* ... remaining sections ... */}
    </>
  )
}
```

## Testing Recommendations

1. **Desktop scroll behavior:** Verify panels pin and rotate smoothly
2. **Mobile responsiveness:** Check clamp() typography scales correctly
3. **Reduced-motion:** Set browser preference, verify static panels
4. **Anchor navigation:** Test `#why-drivecommand` hash link works
5. **CTA links:** Verify sign-up and contact links functional

## Performance Notes

- Component uses `'use client'` directive (required for GSAP)
- ScrollTrigger cleanup handled automatically by useGSAP hook
- No memory leaks on unmount (verified via GSAP cleanup)
- Build size: ~12kB additional JS (GSAP library)

## Self-Check: PASSED

**Files exist:**
- ✓ `/Users/ayazmohammed/drivecommand-website/src/components/sections/why-drivecommand-scroll.tsx`
- ✓ `/Users/ayazmohammed/drivecommand-website/package.json` (contains gsap and @gsap/react)

**Commits exist:**
- ✓ `39d0208` - GSAP dependencies added
- ✓ `7a43c43` - WhyDriveCommandScroll component created

**Verification:**
- ✓ `npm run build` exits code 0
- ✓ `npx tsc --noEmit` passes
- ✓ Section has `id="why-drivecommand"`
- ✓ Reduced-motion fallback implemented
- ✓ All 5 panels present with correct content
- ✓ Exports: WhyDriveCommandScroll (default + named), FlowSection, FlowArt
- ✓ Zero hardcoded Tailwind colors outside brand palette

## Commits

| Hash    | Message                                                  |
| ------- | -------------------------------------------------------- |
| 39d0208 | chore(quick-8): add GSAP and @gsap/react dependencies    |
| 7a43c43 | feat(quick-8): create WhyDriveCommandScroll 5-panel scroll component |
