---
phase: quick-7
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - brand/tokens.json
  - tailwind.config.ts
  - src/styles/tokens.css
  - src/app/globals.css
  - src/components/sections/hero.tsx
  - src/components/sections/features-grid.tsx
  - src/components/sections/final-cta.tsx
  - src/components/sections/interactive-demo.tsx
  - src/components/sections/pricing-calculator.tsx
  - src/components/sections/demo-video.tsx
  - src/components/sections/social-proof.tsx
  - src/components/layout/navbar.tsx
  - src/components/layout/mobile-menu.tsx
  - src/components/layout/navbar-scroll-client.tsx
  - src/components/shared/parallax-world.tsx
autonomous: true

must_haves:
  truths:
    - "Changing b500 in tokens.json updates Brand Blue everywhere automatically"
    - "No hex values exist in component files - all use token references"
    - "Motion, radius, and color tokens all flow from tokens.json"
    - "Tailwind config imports tokens.json directly"
  artifacts:
    - path: "brand/tokens.json"
      provides: "Complete token definitions per UX_GUIDELINES.md"
      contains: "n000, n050, n100, n200, n300, n400, n500, n600, n700, n800, n900, b050, b100, b200, b300, b400, b500, b600, b700, b800, ease-brand, duration-fast, duration-medium, duration-slow, radius-none, radius-input, radius-full"
    - path: "tailwind.config.ts"
      provides: "Theme configuration importing from tokens.json"
      contains: "import tokens from"
  key_links:
    - from: "brand/tokens.json"
      to: "tailwind.config.ts"
      via: "ES module import"
      pattern: "import.*tokens.*from.*brand/tokens"
    - from: "tailwind.config.ts"
      to: "components"
      via: "Tailwind theme utilities"
      pattern: "bg-brand|text-brand|bg-n"
---

<objective>
Token-driven UX refactor for DriveCommand marketing site per UX_GUIDELINES.md

Purpose: Establish brand/tokens.json as the single source of truth per UX_GUIDELINES.md section 2. Any brand color, motion, or radius change should require editing ONE file only.

Output: Complete token architecture where tokens.json flows to tailwind.config.ts, CSS variables, and all components use token references exclusively.
</objective>

<execution_context>
@/Users/ayazmohammed/.claude/get-shit-done/workflows/execute-plan.md
@/Users/ayazmohammed/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@brand/UX_GUIDELINES.md — Single source of truth for all token values
@brand/tokens.json — Current state (outdated structure, needs rebuild)
@tailwind.config.ts — Current state (uses CSS vars, not JSON import)
@src/styles/tokens.css — Current state (correct values but manually maintained)
@src/app/globals.css — Theme variables and utilities
</context>

<tasks>

<task type="auto">
  <name>Task 1: Rebuild tokens.json to match UX_GUIDELINES.md exactly</name>
  <files>brand/tokens.json</files>
  <action>
Completely rebuild brand/tokens.json to match UX_GUIDELINES.md sections 3, 4, and 5 exactly.

Structure must be:
```json
{
  "meta": { "brand": "DriveCommand", "version": "2.0", "synced": "2026-05-07" },
  "color": {
    "neutral": {
      "n000": "#FFFFFF",
      "n050": "#F5F5F7",
      "n100": "#E8E8ED",
      "n200": "#D2D2D7",
      "n300": "#AEAEB2",
      "n400": "#86868B",
      "n500": "#6E6E73",
      "n600": "#48484A",
      "n700": "#363638",
      "n800": "#2C2C2E",
      "n900": "#1D1D1F"
    },
    "brand": {
      "b050": "#E5F0FB",
      "b100": "#C9E0F4",
      "b200": "#8FBEEA",
      "b300": "#5AC8FA",
      "b400": "#2D8FE0",
      "b500": "#0066CC",
      "b600": "#003C82",
      "b700": "#002654",
      "b800": "#001A3D"
    },
    "semantic": {
      "success": "#006B40",
      "warning": "#9A4A00",
      "critical": "#C8102E",
      "info": "#0066CC"
    }
  },
  "typography": {
    "family": {
      "display": "DM Sans",
      "sans": "Inter",
      "mono": "JetBrains Mono"
    },
    "scale": {
      "display": { "size": 96, "lineHeight": 92, "weight": 700 },
      "headline": { "size": 64, "lineHeight": 64, "weight": 700 },
      "quote": { "size": 40, "lineHeight": 48, "weight": 400 },
      "lead": { "size": 22, "lineHeight": 34, "weight": 400 },
      "body": { "size": 16, "lineHeight": 26, "weight": 400 },
      "small": { "size": 13, "lineHeight": 20, "weight": 400 },
      "label": { "size": 12, "lineHeight": 16, "weight": 500 },
      "data": { "size": 14, "lineHeight": 20, "weight": 400 },
      "code": { "size": 14, "lineHeight": 24, "weight": 400 }
    }
  },
  "radius": {
    "none": "0px",
    "input": "4px",
    "full": "9999px"
  },
  "motion": {
    "easing": {
      "brand": "cubic-bezier(0.22, 1, 0.36, 1)"
    },
    "duration": {
      "fast": "120ms",
      "medium": "240ms",
      "slow": "480ms"
    },
    "scale": {
      "hoverMax": 1.04
    }
  },
  "alias": {
    "ink": "n900",
    "bone": "n050",
    "mist": "n100",
    "fog": "n200",
    "quiet": "n300",
    "silver": "n400",
    "graphite": "n500",
    "iron": "n600",
    "coal": "n700",
    "slate": "n800",
    "tint": "b050",
    "wash": "b100",
    "sky": "b200",
    "air": "b300",
    "hover": "b400",
    "brand": "b500",
    "deep": "b600",
    "trench": "b700",
    "abyss": "b800"
  }
}
```

Keep existing meta fields (tagline, promise, etc.) but restructure colors to match guideline spec exactly. Remove the legacy "colors.primary", "ramps.ink", "ramps.navy", "ramps.electric" structures.
  </action>
  <verify>
Validate JSON syntax: `node -e "require('./brand/tokens.json')"`
Check all required tokens exist: `grep -E '"n000"|"b500"|"ease"|"radius"' brand/tokens.json`
  </verify>
  <done>
tokens.json contains all color tokens (n000-n900, b050-b800, semantic), motion tokens (ease-brand, duration-fast/medium/slow), radius tokens (none, input, full), and typography definitions per UX_GUIDELINES.md sections 3-5.
  </done>
</task>

<task type="auto">
  <name>Task 2: Update tailwind.config.ts to import from tokens.json and generate theme</name>
  <files>tailwind.config.ts, src/styles/tokens.css</files>
  <action>
Update tailwind.config.ts to:
1. Import tokens.json at top: `import tokens from './brand/tokens.json'`
2. Build colors from tokens.json programmatically
3. Build motion (transitionTimingFunction, transitionDuration) from tokens.json
4. Build borderRadius from tokens.json
5. Keep typography as-is (already correct)

Generate theme colors like:
```typescript
colors: {
  // Direct neutral ramp access: bg-n050, text-n900
  n: Object.fromEntries(
    Object.entries(tokens.color.neutral).map(([k, v]) => [k.replace('n', ''), v])
  ),
  // Direct brand ramp access: bg-b500, text-b400
  b: Object.fromEntries(
    Object.entries(tokens.color.brand).map(([k, v]) => [k.replace('b', ''), v])
  ),
  // Semantic aliases: bg-ink, text-bone, bg-brand
  ink: tokens.color.neutral.n900,
  bone: tokens.color.neutral.n050,
  // ... all aliases from tokens.alias
  // Semantic states
  success: tokens.color.semantic.success,
  warning: tokens.color.semantic.warning,
  critical: tokens.color.semantic.critical,
  info: tokens.color.semantic.info,
}
```

Also add:
```typescript
transitionTimingFunction: {
  brand: tokens.motion.easing.brand,
},
transitionDuration: {
  fast: tokens.motion.duration.fast,
  medium: tokens.motion.duration.medium,
  slow: tokens.motion.duration.slow,
},
borderRadius: {
  none: tokens.radius.none,
  input: tokens.radius.input,
  full: tokens.radius.full,
}
```

Then update src/styles/tokens.css to add a comment noting it's auto-generated from tokens.json (keep values as backup but mark as derived).

IMPORTANT: Keep backward compatibility with existing dc.* and dc2.* classes by mapping them to the new token values. Components currently use these and we need them to keep working during transition.
  </action>
  <verify>
Build the project: `npm run build`
Check Tailwind generates classes: `grep -r "bg-ink\|bg-bone\|bg-brand" .next/static/css/*.css 2>/dev/null || echo "Check in dev mode"`
  </verify>
  <done>
tailwind.config.ts imports from brand/tokens.json, theme colors/motion/radius are derived from JSON, existing dc/dc2 classes still work.
  </done>
</task>

<task type="auto">
  <name>Task 3: Audit and fix component hardcoded values</name>
  <files>
    src/components/sections/hero.tsx
    src/components/sections/features-grid.tsx
    src/components/sections/final-cta.tsx
    src/components/sections/interactive-demo.tsx
    src/components/sections/pricing-calculator.tsx
    src/components/sections/demo-video.tsx
    src/components/sections/social-proof.tsx
    src/components/layout/navbar.tsx
    src/components/layout/mobile-menu.tsx
    src/components/layout/navbar-scroll-client.tsx
    src/components/shared/parallax-world.tsx
    src/app/globals.css
  </files>
  <action>
Replace ALL hardcoded rgba() values with CSS variable references.

Common patterns to fix:

1. **Button shadows using rgba(10, 33, 192, x)** — These are old Signal Blue. Replace with:
   - Create CSS variable: `--glow-brand: rgba(0, 102, 204, 0.25)` in globals.css (using Brand Blue #0066CC)
   - Use: `boxShadow: 'var(--glow-brand-sm)'` etc.

2. **Background gradients** — Replace hardcoded rgba with CSS variable references:
   - `rgba(10, 33, 192, 0.15)` → `var(--glow-brand-light)`
   - Add variables to globals.css :root

3. **Border/panel colors** — Already use CSS vars mostly, verify all do

4. **features-grid.tsx hover colors** — Replace hardcoded rgba with token-based values:
   - `rgba(10, 33, 192, 0.6)` → use `var(--dc-b500)` with opacity modifier or define --hover-brand in CSS
   - `rgba(34, 192, 122, 0.6)` → use `var(--dc-state-success)` with opacity

5. **parallax-world.tsx gradients** — Replace mint (117, 240, 212) and cyan (56, 189, 248) with brand colors:
   - Use Brand Blue variants instead of legacy mint/cyan

6. **globals.css light mode** — Replace hardcoded hex in [data-theme="light"] with token references:
   - `#f8fafc` → `var(--dc-n050)` or similar mapping
   - `#0f172a` → `var(--dc-n900)`

Add to globals.css new variables for glow/shadow effects:
```css
:root {
  /* Glow tokens (derived from brand) */
  --glow-brand-xs: 0 2px 8px rgba(0, 102, 204, 0.20);
  --glow-brand-sm: 0 4px 15px rgba(0, 102, 204, 0.25);
  --glow-brand-md: 0 8px 25px rgba(0, 102, 204, 0.35);
  --glow-brand-lg: 0 10px 40px rgba(0, 102, 204, 0.30);
}
```

Then update components to use these variables instead of inline rgba.

NOTE: Some rgba values for pure transparency effects (white overlays, black shadows) can stay as-is since they're not brand colors.
  </action>
  <verify>
Search for remaining hardcoded brand colors:
`grep -r "rgba(10, 33, 192" src/components/` should return 0 results
`grep -r "rgba(117, 240, 212" src/components/` should return 0 results
`grep -r "#0a21c0\|#0066CC" src/components/` should return 0 results (case insensitive)
Build passes: `npm run build`
  </verify>
  <done>
All component files use CSS variable references for brand colors. No hardcoded hex values for brand blue, no hardcoded rgba() values that contain brand colors. Only neutral rgba (white/black opacity overlays) remain.
  </done>
</task>

</tasks>

<verification>
After all tasks complete:

1. **Token flow test:** Change b500 in tokens.json from #0066CC to #FF0000 temporarily, run `npm run dev`, verify all Primary buttons appear red. Revert.

2. **Build test:** `npm run build` completes without errors

3. **Lint test:** `npm run lint` passes

4. **Visual regression:** Open http://localhost:3000, verify:
   - Hero CTA button is Brand Blue (#0066CC)
   - Hover states work (buttons shift to b400 hover color)
   - All text is readable (proper contrast)
   - No visual regressions from current state
</verification>

<success_criteria>
- brand/tokens.json is the single source of truth matching UX_GUIDELINES.md exactly
- tailwind.config.ts imports from tokens.json (not manually duplicated)
- Zero hardcoded brand hex values in component files
- Zero hardcoded brand rgba() values in component files
- Changing b500 in tokens.json updates Brand Blue site-wide automatically
- Build passes, lint passes, site renders correctly
</success_criteria>

<output>
After completion, create `.planning/quick/7-token-driven-ux-refactor-for-drivecomman/7-SUMMARY.md`
</output>
