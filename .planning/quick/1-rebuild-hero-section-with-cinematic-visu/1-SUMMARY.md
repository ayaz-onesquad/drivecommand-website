---
phase: quick
plan: 1
subsystem: ui
tags: [hero, animation, framer-motion, svg, parallax, css-animations]

# Dependency graph
requires: []
provides:
  - Cinematic hero section with mission-control aesthetic
  - Dashboard panel component with route map and load cards
  - Animated background system (dot-grid, glows, parallax)
  - Enhanced ticker bar with LIVE FEED indicator
affects: []

# Tech tracking
tech-stack:
  added:
    - Barlow Condensed Google Font
  patterns:
    - 4-layer parallax background system
    - SVG animateMotion for path following
    - CSS keyframe animations for performance-critical loops

key-files:
  created: []
  modified:
    - src/components/sections/hero.tsx
    - src/app/globals.css

key-decisions:
  - "Used CSS animations for dot-grid drift (performance over Framer Motion)"
  - "SVG animateMotion for truck path following (native, GPU-accelerated)"
  - "Dashboard panel hidden map on mobile, shows only load cards"
  - "Parallax disabled below 768px to prevent mobile jank"

patterns-established:
  - "4-layer background: base color, animated texture, gradient glows, noise overlay"
  - "font-headline class for Barlow Condensed display typography"

# Metrics
duration: 3min
completed: 2026-04-02
---

# Quick Task 1: Rebuild Hero Section Summary

**Cinematic hero with split layout, animated dashboard panel featuring route map with traveling trucks, 4-layer parallax background, and enhanced LIVE FEED ticker bar**

## Performance

- **Duration:** 3 min
- **Started:** 2026-04-02T04:54:35Z
- **Completed:** 2026-04-02T04:57:56Z
- **Tasks:** 3
- **Files modified:** 2

## Accomplishments

- Rebuilt Hero with 55%/45% split grid layout (copy left, dashboard right)
- Implemented 4-layer background: base color, animated dot-grid, radial glows, noise texture
- Created dashboard panel with floating app window aesthetic, route map SVG, and load cards
- Added 3 animated route paths (CHI-ATL, DAL-LAX, NYC-MIA) with glowing truck dots traveling along them
- Enhanced ticker bar with LIVE FEED label, red pulsing indicator, and colored status dots
- Applied Barlow Condensed font to headline via font-headline class
- Implemented parallax at varying speeds (0.3x, 0.6x, 0.85x) with desktop-only gating

## Task Commits

Each task was committed atomically:

1. **Task 1: Add Barlow Condensed font and CSS animations** - `6f85f1d` (feat)
2. **Task 2: Rebuild Hero.tsx with split layout and dashboard panel** - `ea97cc8` (feat)
3. **Task 3: Polish animations and verify responsive behavior** - `9182f4e` (chore)

## Files Created/Modified

- `src/app/globals.css` - Added Barlow Condensed import, 6 new keyframe animations, font-headline utility, ticker speed update
- `src/components/sections/hero.tsx` - Complete rebuild with split layout, dashboard panel, route map, parallax background system

## Decisions Made

- Used CSS animations for dot-grid drift (20s loop) for compositor-thread performance
- Used SVG animateMotion for truck path following instead of Framer Motion offset-path (better browser support)
- Added SVG glow filter for truck dots visibility
- Dashboard map hidden on mobile (<768px) showing only load cards for cleaner mobile UX
- All parallax effects disabled on mobile via useIsDesktop hook

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Replaced Framer Motion offset-path with SVG animateMotion**
- **Found during:** Task 3 (Polish pass)
- **Issue:** Framer Motion's offsetDistance animation doesn't work reliably with SVG paths in all browsers
- **Fix:** Switched to native SVG animateMotion with mpath reference for truck path following
- **Files modified:** src/components/sections/hero.tsx
- **Verification:** Build passes, animation works in browser
- **Committed in:** 9182f4e (Task 3 commit)

---

**Total deviations:** 1 auto-fixed (1 bug fix)
**Impact on plan:** Fix was necessary for cross-browser animation support. No scope creep.

## Issues Encountered

None - plan executed smoothly after the animateMotion adjustment.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Hero section complete with cinematic visual system
- Ready for any follow-up polish or feature additions
- All CSS animations have reduced-motion support

## Self-Check: PASSED

All files exist, all commits verified, all key content found.

---
*Phase: quick*
*Completed: 2026-04-02*
