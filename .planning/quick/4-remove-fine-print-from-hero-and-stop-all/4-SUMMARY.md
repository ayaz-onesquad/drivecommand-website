---
phase: quick-4
plan: 01
subsystem: marketing-ui
tags: [ui-refinement, hero, features, visual-cleanup]
dependency_graph:
  requires: [quick-3]
  provides: [simplified-hero-cta, static-feature-icons]
  affects: [hero-section, features-grid]
tech_stack:
  added: []
  patterns: [static-icons, simplified-messaging]
key_files:
  created: []
  modified:
    - src/components/sections/hero.tsx
    - src/components/sections/features-grid.tsx
decisions:
  - Remove fine print trust signals from Hero (redundant with trust badges)
  - Replace all AnimatedIcon usage with static Lucide icons (reduce visual noise)
metrics:
  duration: 2.5 minutes
  tasks_completed: 2
  files_modified: 2
  commits: 2
  completed_date: 2026-04-04
---

# Quick Task 4: Remove Fine Print and Static Icons

**One-liner:** Simplified Hero messaging by removing redundant fine print trust line and eliminated all icon animations in FeaturesGrid for reduced visual noise.

## Summary

Executed two UI refinement tasks to reduce visual clutter and simplify messaging:

1. **Hero cleanup:** Removed the fine print trust line ("No credit card · No setup fee..." and "Join 47+ carriers...") which was redundant with the existing trust badges (DOT Compliant, Live in 10 Minutes, No Contract).

2. **Static feature icons:** Replaced AnimatedIcon component with direct Lucide icon rendering across all 6 feature cards, eliminating animations on load and hover. Icons remain visually present but no longer distract from feature descriptions.

## Tasks Completed

| Task | Name | Commit | Files Modified |
|------|------|--------|----------------|
| 1 | Remove fine print from Hero | 91929c7 | hero.tsx |
| 2 | Replace AnimatedIcon with static Lucide icons | aca660b | features-grid.tsx |

## Technical Changes

### Task 1: Hero Fine Print Removal

**File:** `src/components/sections/hero.tsx`

**Changes:**
- Deleted entire trust line motion.div wrapper (lines 313-325)
- Removed two p elements: "No credit card · No setup fee..." and "Join 47+ carriers..."
- CTA buttons div now immediately followed by closing div of left column

**Result:** Hero section ends cleanly with CTA buttons as final content element.

### Task 2: Static Feature Icons

**File:** `src/components/sections/features-grid.tsx`

**Changes:**
- Removed AnimatedIcon import statement
- Removed `animation: AnimationType` property from Feature interface
- Removed `triggerOnHover: boolean` property from Feature interface
- Removed animation and triggerOnHover values from all 6 feature objects in FEATURES array
- Replaced AnimatedIcon component wrapper with direct Lucide icon render: `<feature.icon size={24} className={feature.color} />`

**Result:** All feature card icons render as static Lucide components with no animation behavior.

## Verification Results

All verification criteria met:

- [x] TypeScript compilation passes with zero errors
- [x] Fine print text absent from Hero section (no matches for "No credit card" or "47+ carriers")
- [x] No AnimatedIcon references in features-grid.tsx
- [x] No animation or triggerOnHover properties in code
- [x] Only hero.tsx and features-grid.tsx modified (no other file changes)

## Deviations from Plan

None - plan executed exactly as written.

## Design Impact

**Hero section:**
- Cleaner visual hierarchy - CTA buttons are now the clear final action point
- Trust signals remain present via badge row (DOT Compliant, Live in 10 Minutes, No Contract)
- Reduced redundancy between badges and fine print text

**Features section:**
- Reduced visual noise - icons no longer compete with feature descriptions for attention
- Icons maintain color coding for visual categorization (mint for DriveCommand-specific features, green for GPS, etc.)
- Card hover effects (lift, border glow, shadow) still provide interactive feedback

## Self-Check: PASSED

**Created files:** None required for this plan.

**Modified files verified:**
- FOUND: src/components/sections/hero.tsx
- FOUND: src/components/sections/features-grid.tsx

**Commits verified:**
- FOUND: 91929c7 (refactor(quick-4): remove fine print from Hero section)
- FOUND: aca660b (refactor(quick-4): replace AnimatedIcon with static Lucide icons)

All claimed files and commits exist on disk.
