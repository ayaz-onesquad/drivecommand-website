---
phase: quick
plan: 1
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/sections/Hero.tsx
  - src/app/globals.css
autonomous: true

must_haves:
  truths:
    - "Hero displays split layout with left copy (55%) and right dashboard panel (45%)"
    - "Dashboard panel shows animated route map with 3 truck icons traveling along SVG paths"
    - "Load cards appear with staggered entrance animation inside dashboard panel"
    - "Background has animated dot-grid drifting upward with radial gradient glows"
    - "Ticker bar shows colored status dots and LIVE FEED label with pulsing red dot"
    - "Parallax effects work on desktop, disabled on mobile"
  artifacts:
    - path: "src/components/sections/Hero.tsx"
      provides: "Cinematic hero section with dashboard panel and animations"
      min_lines: 400
    - path: "src/app/globals.css"
      provides: "Barlow Condensed font, dot-grid animation, route path animations"
      contains: "@import url.*Barlow"
  key_links:
    - from: "src/components/sections/Hero.tsx"
      to: "globals.css"
      via: "dot-grid-drift animation class"
      pattern: "dot-grid-drift"
---

<objective>
Rebuild the Hero section with cinematic visuals: split layout composition, animated dashboard panel with route map and traveling trucks, layered parallax background with animated dot-grid and radial glows, enhanced ticker bar with status indicators.

Purpose: Transform the flat, static hero into a mission-control aesthetic that demonstrates DriveCommand as a live operations platform.
Output: Fully rebuilt Hero.tsx with new visual system and supporting CSS in globals.css
</objective>

<execution_context>
@/Users/ayazmohammed/.claude/get-shit-done/workflows/execute-plan.md
@/Users/ayazmohammed/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@src/components/sections/Hero.tsx (existing — full rebuild)
@src/app/globals.css (add font import and new keyframes)
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add Barlow Condensed font and CSS animations to globals.css</name>
  <files>src/app/globals.css</files>
  <action>
Add at the very top of globals.css (before @tailwind directives):
```css
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&display=swap');
```

Add new keyframes and utility classes after the existing keyframes section:

1. Dot-grid drift animation (20s loop, translateY 0 to -24px):
```css
@keyframes dot-grid-drift {
  0% { transform: translateY(0); }
  100% { transform: translateY(-24px); }
}

.animate-dot-grid-drift {
  animation: dot-grid-drift 20s linear infinite;
}
```

2. Route line draw animation (for SVG strokeDashoffset):
```css
@keyframes draw-route {
  to { stroke-dashoffset: 0; }
}

.animate-draw-route {
  animation: draw-route 1.5s ease-out forwards;
}
```

3. Truck travel animation (for offset-distance along path):
```css
@keyframes truck-travel {
  0% { offset-distance: 0%; }
  100% { offset-distance: 100%; }
}

.animate-truck-travel {
  animation: truck-travel 8s linear infinite;
}
```

4. Live pulse animation (green dot pulse for dashboard):
```css
@keyframes live-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}

.animate-live-pulse {
  animation: live-pulse 2s ease-in-out infinite;
}
```

5. Red pulse for ticker LIVE FEED indicator:
```css
@keyframes red-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.animate-red-pulse {
  animation: red-pulse 1.5s ease-in-out infinite;
}
```

6. Headline glow pulse (one-time effect for blue text):
```css
@keyframes headline-glow {
  0%, 100% { text-shadow: 0 0 0 transparent; }
  50% { text-shadow: 0 0 20px rgba(59, 130, 246, 0.6); }
}

.animate-headline-glow {
  animation: headline-glow 0.8s ease-out;
}
```

Add these to the reduced motion media query to disable them.

Also add font utility:
```css
.font-headline {
  font-family: 'Barlow Condensed', var(--font-display), sans-serif;
}
```
  </action>
  <verify>Check globals.css contains Barlow Condensed import and all 6 new keyframe animations</verify>
  <done>globals.css has font import, dot-grid-drift, draw-route, truck-travel, live-pulse, red-pulse, headline-glow keyframes with reduced motion support</done>
</task>

<task type="auto">
  <name>Task 2: Rebuild Hero.tsx with split layout and animated dashboard panel</name>
  <files>src/components/sections/Hero.tsx</files>
  <action>
Complete rebuild of Hero.tsx. Keep existing imports pattern but restructure entirely.

**Layout Structure:**
- Main container: `min-h-screen flex items-center` with deep dark base `#080d14`
- Content wrapper: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full`
- Grid: `grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-12 items-center`

**Background Layer System (4 layers, z-indexed):**

Layer 1 (z-0): Base color `#080d14`

Layer 2 (z-10): Animated dot-grid
- Create with CSS background-image using radial-gradient dots at 24px intervals
- Pattern: `radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)`
- Background-size: 24px 24px
- Apply `animate-dot-grid-drift` class
- Parallax: 0.3x scroll speed via useTransform

Layer 3 (z-20): Two radial gradient glows
- Electric blue glow (#3b82f6, 15% opacity) positioned behind headline area (left 20%, top 40%)
- Purple glow (#6366f1, 8% opacity) positioned behind dashboard (right 20%, top 50%)
- Both: large radial gradients (600px radius), parallax 0.6x scroll speed

Layer 4 (z-30): Noise texture overlay (keep existing SVG filter approach at 3% opacity)

**Left Column Content (copy unchanged, new animations):**

Entrance sequence using Framer Motion with staggered delays:
- t=100ms: Eyebrow slides up (y: 20 -> 0) + fades in
- t=250ms: Headline line 1 slides up + fades
- t=400ms: Headline line 2 slides up + fades, add `animate-headline-glow` class
- t=550ms: Subtext fades in
- t=650ms: Trust badges slide up with 100ms stagger between each
- t=800ms: CTA buttons slide up + scale from 0.95 -> 1

Apply `font-headline` class to the h1 element (Barlow Condensed).

**Right Column: Dashboard Panel**

Create dashboard panel component structure:
```
<div className="dashboard-panel"> <!-- floating app window look -->
  <!-- Title bar: dark, subtle border, mock window controls -->
  <div className="title-bar">
    <span className="text-xs text-gray-400">DriveCommand — Active Loads</span>
    <div className="live-indicator">
      <span className="w-2 h-2 bg-green-500 rounded-full animate-live-pulse" />
      <span className="text-xs text-green-400 font-mono">LIVE</span>
    </div>
  </div>

  <!-- Route map SVG -->
  <div className="route-map">
    <svg viewBox="0 0 400 200"> <!-- Continental US simplified shape -->
      <!-- 3 route lines that draw themselves -->
      <!-- 3 truck icons that travel along paths -->
    </svg>
  </div>

  <!-- Load cards grid -->
  <div className="load-cards">
    <!-- 3 cards with staggered entrance -->
  </div>
</div>
```

**Route Map SVG Details:**
- Simplified continental US outline as backdrop (very subtle, opacity 0.1)
- 3 curved SVG paths representing routes:
  - Chicago -> Atlanta (curved line)
  - Dallas -> LA (curved line)
  - NYC -> Miami (curved line)
- Each path: stroke-dasharray = path length, stroke-dashoffset starts at path length
- Animate strokeDashoffset to 0 via Framer Motion (start at t=500ms, 300ms stagger)
- Small truck icons (8x8 SVG) positioned with offset-path CSS, animate with truck-travel keyframe
- Truck animations start after lines finish drawing

**Load Cards (inside dashboard panel):**
- Dark card style: `bg-slate-800/80 border border-slate-700 rounded-lg p-3`
- Layout: Load # top-left (mono font), status badge top-right, route bold center, rate in blue bottom
- Staggered entrance: y: 20 -> 0, opacity 0 -> 1, 300ms stagger starting at t=700ms
- Use existing StatusBadge component

**Dashboard Panel Styling:**
```css
border: 1px solid #1e293b
background: rgba(15, 23, 42, 0.9)
box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.05)
border-radius: 12px
```

**Parallax for Dashboard:**
- Apply 0.85x scroll speed to entire panel via useTransform

**Dashboard Entrance Animation:**
- t=300ms: slides in from right (x: 40 -> 0) + fades in

**Responsive Behavior:**
- Below 768px (md breakpoint): Dashboard moves below headline, full width, map hidden (only cards show)
- Parallax disabled below 768px (use existing useIsDesktop hook)

**Ticker Bar Improvements:**
- Background: `bg-slate-900` with `border-t border-slate-800`
- Add left section with LIVE FEED label:
  - Red pulsing dot (w-2 h-2 bg-red-500 rounded-full animate-red-pulse)
  - "LIVE FEED" text in red-400, mono font, uppercase
- Status dots before each ticker item:
  - Amber dot for "In Transit"
  - Green dot for "Delivered"
  - Indigo dot for "Dispatched"
  - White dot for "Invoiced"
- White text (not gray) for better contrast
- Speed up animation: change ticker duration from 28s to 20s in globals.css
  </action>
  <verify>
1. `npm run build` completes with zero TypeScript errors
2. `npm run dev` and visually confirm:
   - Split layout with dashboard panel on right
   - Route map shows animated lines drawing and trucks traveling
   - Load cards stagger in
   - Background dot-grid drifts upward
   - Radial glows visible behind content
   - Ticker shows colored status dots and LIVE FEED label
   - Resize to mobile: dashboard below headline, map hidden, parallax off
  </verify>
  <done>Hero.tsx fully rebuilt with split layout, animated dashboard panel containing route map with traveling trucks, layered parallax background system, enhanced ticker bar</done>
</task>

<task type="auto">
  <name>Task 3: Polish animations and verify responsive behavior</name>
  <files>src/components/sections/Hero.tsx, src/app/globals.css</files>
  <action>
Final polish pass:

1. **Timing refinement**: Review all animation delays and adjust if entrance feels too slow or too choppy. Target: entire entrance sequence completes within 1.5 seconds.

2. **Performance check**: Ensure all parallax transforms use `will-change-transform` class. Verify dot-grid uses CSS animation (not Framer Motion).

3. **Reduced motion**: Verify that when `prefers-reduced-motion` is set:
   - All Framer Motion animations respect `shouldAnimate` flag
   - CSS animations are disabled via media query
   - Content still renders correctly (just without motion)

4. **Mobile verification**:
   - Test at 375px width (iPhone SE)
   - Dashboard panel should be full width, below headline
   - Route map SVG should be hidden (md:block pattern)
   - Only load cards show in dashboard on mobile
   - No horizontal scroll

5. **Ticker speed**: Update ticker animation duration from 28s to 20s in globals.css for faster scroll.

6. **Clean up**: Remove any unused imports, dead code from old Hero implementation.
  </action>
  <verify>
1. Build passes: `npm run build`
2. Lighthouse performance score > 90 on desktop
3. Test with browser reduced motion setting enabled — no animations but content renders
4. Mobile responsive at 375px, 768px breakpoints work correctly
  </verify>
  <done>All animations polished, responsive behavior verified, performance optimized, reduced motion respected</done>
</task>

</tasks>

<verification>
1. `npm run build` — zero errors
2. Visual inspection at desktop (1440px): split layout, dashboard with animated route map, parallax working
3. Visual inspection at mobile (375px): stacked layout, dashboard below headline, map hidden
4. Browser reduced motion toggle: animations disabled but content intact
5. Ticker shows LIVE FEED label with red pulse, colored status dots, faster scroll
</verification>

<success_criteria>
- Hero displays mission-control aesthetic with animated dashboard panel
- Route map shows 3 animated truck paths (Chicago-Atlanta, Dallas-LA, NYC-Miami)
- Background has drifting dot-grid and radial glows with parallax
- Entrance animations complete in ~1.5 seconds with proper stagger
- Ticker bar has LIVE FEED indicator and colored status dots
- Fully responsive: dashboard moves below headline on mobile, map hidden
- Zero TypeScript errors, respects reduced motion preference
</success_criteria>

<output>
After completion, create `.planning/quick/1-rebuild-hero-section-with-cinematic-visu/1-SUMMARY.md`
</output>
