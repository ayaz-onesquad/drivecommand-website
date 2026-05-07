---
phase: quick-6
plan: 1
type: execute
wave: 1
depends_on: []
files_modified:
  - src/styles/tokens.css
  - tailwind.config.ts
  - src/app/globals.css
  - src/components/sections/hero.tsx
  - src/components/sections/features-grid.tsx
  - src/components/sections/pricing-calculator.tsx
  - src/components/sections/social-proof.tsx
  - src/components/sections/demo-video.tsx
  - src/components/shared/status-badge.tsx
  - src/components/shared/theme-toggle.tsx
  - src/components/layout/navbar.tsx
  - src/components/layout/footer.tsx
autonomous: true

must_haves:
  truths:
    - "All color tokens match brand guide hex values exactly"
    - "Typography scale utilities exist and match brand guide specifications"
    - "Corner radius is 0px on UI elements per iconography spec"
    - "Motion easing uses cubic-out (0.22, 1) per brand guide"
  artifacts:
    - path: "src/styles/tokens.css"
      provides: "Brand-accurate color palette with N000-N900 and B050-B800 ramps"
      contains: "#1D1D1F"
    - path: "tailwind.config.ts"
      provides: "Typography scale utilities (text-display, text-headline, etc.)"
      contains: "fontSize"
    - path: "src/app/globals.css"
      provides: "Motion timing using cubic-out 0.22,1 easing"
      contains: "0.22, 1"
  key_links:
    - from: "src/styles/tokens.css"
      to: "tailwind.config.ts"
      via: "CSS custom properties referenced by Tailwind"
      pattern: "var\\(--dc-"
---

<objective>
Align DriveCommand marketing site with brand guide specifications.

Purpose: Current implementation diverges from brand guide on colors, typography, corner radius, and motion. This plan corrects the token system to match the authoritative PDF specs.

Output: Brand-accurate token system, type scale utilities, and component style corrections.
</objective>

<execution_context>
@/Users/ayazmohammed/.claude/get-shit-done/workflows/execute-plan.md
@/Users/ayazmohammed/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
Key brand guide specs (from planning context):

## Colors (pg 10-11)
- Ink: #1D1D1F (NOT #141619)
- Bone: #F5F5F7
- Graphite: #6E6E73
- Brand Blue: #0066CC (NOT #0a21c0)
- Fog: #D2D2D7

Neutral Ramp N000-N900:
- N000 #FFFFFF, N050 #F5F5F7, N100 #E8E8ED, N200 #D2D2D7
- N300 #AEAEB2, N400 #86868B, N500 #6E6E73, N600 #48484A
- N700 #363638, N800 #2C2C2E, N900 #1D1D1F

Brand Blue Ramp B050-B800:
- B050 #E5F0FB, B100 #C9E0F4, B200 #8FBEEA, B300 #5AC8FA
- B400 #2D8FE0, B500 #0066CC, B600 #003C82, B700 #002654, B800 #001A3D

Semantic States:
- Success: #006B40, Warning: #9A4A00, Critical: #C8102E, Info: #0066CC

## Typography (pg 12-13)
- DM Sans: Display 96/92, Headline 64/64, Quote 40/48
- Inter: Lead 22/34, Body 16/26, Small 13/20
- JetBrains Mono: Label 12/16, Data 14/20, Code 14/24
- Base: 8px grid, tnum for numerals

## Iconography (pg 14)
- Corners: 0px radius

## Motion (pg 16B)
- Easing: cubic-out 0.22, 1 (nothing bounces)
- Duration: 120/240/480ms
- Scale: max 1.04 on hover

@src/styles/tokens.css
@tailwind.config.ts
@src/app/globals.css
</context>

<tasks>

<task type="auto">
  <name>Task 1: Correct color tokens to match brand guide</name>
  <files>src/styles/tokens.css</files>
  <action>
Replace all color token values to match brand guide specifications:

1. Primary palette corrections:
   - --dc-ink: #1D1D1F (was #141619)
   - --dc-bone: #F5F5F7 (was #f4f5f7)
   - Remove --dc-slate, --dc-navy, --dc-silver, --dc-signal (old palette)

2. Add brand guide neutral ramp (N000-N900):
   - --dc-n000: #FFFFFF
   - --dc-n050: #F5F5F7 (Bone)
   - --dc-n100: #E8E8ED (Mist)
   - --dc-n200: #D2D2D7 (Fog)
   - --dc-n300: #AEAEB2 (Quiet)
   - --dc-n400: #86868B (Silver)
   - --dc-n500: #6E6E73 (Graphite)
   - --dc-n600: #48484A (Iron)
   - --dc-n700: #363638 (Coal)
   - --dc-n800: #2C2C2E (Slate)
   - --dc-n900: #1D1D1F (Ink)

3. Add brand blue ramp (B050-B800):
   - --dc-b050: #E5F0FB (Tint)
   - --dc-b100: #C9E0F4 (Wash)
   - --dc-b200: #8FBEEA (Sky)
   - --dc-b300: #5AC8FA (Air)
   - --dc-b400: #2D8FE0 (Hover)
   - --dc-b500: #0066CC (Brand)
   - --dc-b600: #003C82 (Deep)
   - --dc-b700: #002654 (Trench)
   - --dc-b800: #001A3D (Abyss)

4. Add semantic states:
   - --dc-state-success: #006B40
   - --dc-state-warning: #9A4A00
   - --dc-state-critical: #C8102E
   - --dc-state-info: #0066CC

5. Update semantic aliases:
   - --color-accent: var(--dc-b500)
   - --color-accent-hover: var(--dc-b400)
   - --color-bg-dark: var(--dc-n900)
   - --color-bg-light: var(--dc-n050)
   - --color-text-primary: var(--dc-n900) for light, #FFFFFF for dark
   - --color-text-secondary: var(--dc-n500)

Keep backward compatibility: old --dc-* tokens can alias to new values where sensible.
  </action>
  <verify>grep "#1D1D1F" src/styles/tokens.css && grep "#0066CC" src/styles/tokens.css</verify>
  <done>tokens.css contains brand-accurate hex values for Ink (#1D1D1F) and Brand Blue (#0066CC)</done>
</task>

<task type="auto">
  <name>Task 2: Add typography scale and update Tailwind config</name>
  <files>tailwind.config.ts, src/app/globals.css</files>
  <action>
1. In tailwind.config.ts, add fontSize scale per brand guide:
   ```typescript
   fontSize: {
     // DM Sans scales
     'display': ['96px', { lineHeight: '92px', fontWeight: '700' }],
     'headline': ['64px', { lineHeight: '64px', fontWeight: '700' }],
     'quote': ['40px', { lineHeight: '48px', fontWeight: '400' }],
     // Inter scales
     'lead': ['22px', { lineHeight: '34px', fontWeight: '400' }],
     'body': ['16px', { lineHeight: '26px', fontWeight: '400' }],
     'small': ['13px', { lineHeight: '20px', fontWeight: '400' }],
     // JetBrains Mono scales
     'label': ['12px', { lineHeight: '16px', fontWeight: '500' }],
     'data': ['14px', { lineHeight: '20px', fontWeight: '400' }],
     'code': ['14px', { lineHeight: '24px', fontWeight: '400' }],
   }
   ```

2. Update neutral and blue ramps in Tailwind colors to match new tokens:
   - dc2.n should reference --dc-n000 through --dc-n900
   - Add dc2.b for --dc-b050 through --dc-b800
   - Remove old --dc-l* and --dc-s* references

3. In globals.css, update motion easing to brand spec:
   - --ease-out: cubic-bezier(0.22, 1, 0.22, 1)  (brand spec: 0.22, 1)
   - Keep existing --ease-out-strong for backward compat

4. Add utility classes for type scale:
   ```css
   .text-display { font-family: var(--font-display); font-size: 96px; line-height: 92px; }
   .text-headline { font-family: var(--font-display); font-size: 64px; line-height: 64px; }
   .text-quote { font-family: var(--font-display); font-size: 40px; line-height: 48px; }
   .text-lead { font-family: var(--font-body); font-size: 22px; line-height: 34px; }
   .text-body { font-family: var(--font-body); font-size: 16px; line-height: 26px; }
   .text-small { font-family: var(--font-body); font-size: 13px; line-height: 20px; }
   .text-label { font-family: var(--font-mono); font-size: 12px; line-height: 16px; }
   .text-data { font-family: var(--font-mono); font-size: 14px; line-height: 20px; }
   .text-code { font-family: var(--font-mono); font-size: 14px; line-height: 24px; }
   ```

5. Add tabular-nums utility for data display:
   ```css
   .tnum { font-variant-numeric: tabular-nums; }
   ```
  </action>
  <verify>grep "text-display" tailwind.config.ts && grep "0.22, 1" src/app/globals.css</verify>
  <done>Typography scale utilities exist in Tailwind config and brand-spec easing is in globals.css</done>
</task>

<task type="auto">
  <name>Task 3: Remove rounded corners from UI elements</name>
  <files>src/components/sections/hero.tsx, src/components/sections/features-grid.tsx, src/components/sections/pricing-calculator.tsx, src/components/sections/social-proof.tsx, src/components/sections/demo-video.tsx, src/components/shared/status-badge.tsx, src/components/shared/theme-toggle.tsx</files>
  <action>
Per brand guide pg 14 "Corners: 0px radius":

1. Replace rounded-xl with rounded-none (or remove entirely) on:
   - Card containers
   - Panel elements
   - Dashboard mockup containers

2. Replace rounded-lg with rounded-none on:
   - Buttons (primary and ghost)
   - Feature card icon containers
   - Input fields

3. KEEP rounded-full ONLY for:
   - Status indicator dots (semantic - they represent status)
   - Avatar placeholders
   - Decorative pulse rings

4. Specific file changes:
   - hero.tsx: Dashboard panel rounded-xl -> rounded-none, CTA buttons rounded-lg -> rounded-none
   - features-grid.tsx: Card rounded-xl -> rounded-none, icon container rounded-lg -> rounded-none
   - pricing-calculator.tsx: Card rounded-xl/rounded-2xl -> rounded-none, buttons rounded-lg -> rounded-none
   - social-proof.tsx: Card rounded-xl -> rounded-none
   - demo-video.tsx: Container rounded-xl -> rounded-none, button rounded-lg -> rounded-none
   - status-badge.tsx: Keep rounded-full for the badge pill (semantic status indicator)
   - theme-toggle.tsx: Button rounded-full -> rounded-none

5. Update motion values to brand spec where found:
   - Hover scale should max at 1.04 (not 1.1)
   - Replace any bounce easing with cubic-out
  </action>
  <verify>grep -c "rounded-xl" src/components/sections/*.tsx | grep ":0" && grep -c "rounded-lg" src/components/sections/*.tsx | grep ":0"</verify>
  <done>UI elements use 0px corner radius per brand guide, with rounded-full preserved only for semantic status dots</done>
</task>

</tasks>

<verification>
1. Color accuracy: grep "#1D1D1F" and "#0066CC" in tokens.css confirms brand values
2. Type scale: text-display, text-headline utilities exist and render correctly
3. Corner radius: No rounded-xl or rounded-lg on cards/buttons (only rounded-full on status dots)
4. Motion: Easing uses 0.22, 1 curve; hover scale max 1.04
5. Visual: npm run build succeeds; site renders without breaking changes
</verification>

<success_criteria>
- All color tokens use brand guide hex values exactly
- Typography scale (Display 96/92 through Code 14/24) available as Tailwind utilities
- Cards, buttons, and panels have 0px corner radius
- Motion uses cubic-out (0.22, 1) easing
- Site builds and deploys without errors
</success_criteria>

<output>
After completion, create `.planning/quick/6-full-drivecommand-marketing-site-redesig/6-SUMMARY.md`
</output>
