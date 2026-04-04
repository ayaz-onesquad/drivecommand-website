---
phase: quick-4
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/sections/hero.tsx
  - src/components/sections/features-grid.tsx
autonomous: true

must_haves:
  truths:
    - "Fine print line ('No credit card...') does not appear on Hero"
    - "Feature card icons are completely static on load and hover"
    - "No regression to Hero or FeaturesGrid visual structure"
  artifacts:
    - path: "src/components/sections/hero.tsx"
      provides: "Hero without fine print line"
    - path: "src/components/sections/features-grid.tsx"
      provides: "Static icons in feature cards"
  key_links: []
---

<objective>
Remove fine print line from Hero section and eliminate all icon animations in FeaturesGrid.

Purpose: Simplify Hero messaging (remove redundant trust signals) and reduce visual noise in features section (icons distract from copy).
Output: Updated Hero.tsx without fine print, updated features-grid.tsx with static icons.
</objective>

<execution_context>
@/Users/ayazmohammed/.claude/get-shit-done/workflows/execute-plan.md
@/Users/ayazmohammed/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@src/components/sections/hero.tsx
@src/components/sections/features-grid.tsx
@src/components/shared/animated-icon.tsx
</context>

<tasks>

<task type="auto">
  <name>Task 1: Remove fine print from Hero</name>
  <files>src/components/sections/hero.tsx</files>
  <action>
In Hero.tsx, locate the trust line motion.div block at lines 313-325 that contains:
- "No credit card · No setup fee · Your fleet live in under 10 minutes"
- "Join 47+ carriers already on early access"

Delete the ENTIRE motion.div wrapper (lines 313-325) including both p elements inside it. The CTA buttons div (ending at line 311) should now be the last element before the closing `</div>` of the left column (line 326).

Do NOT touch the trustBadges section (lines 234-253) which contains DOT Compliant, Live in 10 Minutes, No Contract badges. Those remain.
  </action>
  <verify>
1. Run `npx tsc --noEmit` - zero errors
2. Search file for "No credit card" - no matches
3. Search file for "47+ carriers" - no matches
4. Dev server shows Hero with CTA buttons as last content element in left column
  </verify>
  <done>Fine print line completely removed from Hero.tsx; file compiles without errors</done>
</task>

<task type="auto">
  <name>Task 2: Replace AnimatedIcon with static Lucide icons in FeaturesGrid</name>
  <files>src/components/sections/features-grid.tsx</files>
  <action>
In features-grid.tsx, replace the AnimatedIcon component with static Lucide icons:

1. Remove the AnimatedIcon import (line 15)
2. Remove the `animation` and `triggerOnHover` properties from the Feature interface (lines 44-45)
3. Remove `animation` and `triggerOnHover` values from each feature object in FEATURES array (6 features total)
4. Replace the AnimatedIcon usage in the render (lines 197-203) with a simple static icon render:

Replace:
```tsx
<AnimatedIcon
  icon={feature.icon}
  animation={feature.animation}
  size={24}
  className={feature.color}
  triggerOnHover={feature.triggerOnHover}
/>
```

With:
```tsx
<feature.icon size={24} className={feature.color} />
```

This renders the Lucide icon directly with no animation wrapper.
  </action>
  <verify>
1. Run `npx tsc --noEmit` - zero errors
2. Search file for "AnimatedIcon" - no matches
3. Search file for "animation:" - no matches
4. Search file for "triggerOnHover" - no matches
5. Dev server shows feature cards with static icons (no movement on load or hover)
  </verify>
  <done>All AnimatedIcon usage removed from FeaturesGrid; icons render statically; file compiles without errors</done>
</task>

</tasks>

<verification>
1. `npx tsc --noEmit` passes with zero errors
2. Fine print text absent from Hero section
3. Feature card icons are completely static (no CSS or Framer Motion animations)
4. Card hover effects (lift, border, shadow) still work
5. No other visual regressions in Hero or FeaturesGrid
</verification>

<success_criteria>
- Hero section displays CTA buttons as the final content element (no fine print below)
- All six feature cards display static Lucide icons with no animation
- TypeScript compilation succeeds
- No changes to any file other than hero.tsx and features-grid.tsx
</success_criteria>

<output>
After completion, create `.planning/quick/4-remove-fine-print-from-hero-and-stop-all/4-SUMMARY.md`
</output>
