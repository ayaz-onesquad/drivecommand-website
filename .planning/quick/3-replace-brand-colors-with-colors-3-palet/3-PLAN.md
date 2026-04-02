---
phase: quick-3
plan: 1
type: execute
wave: 1
depends_on: []
files_modified:
  - src/styles/tokens.css
  - tailwind.config.ts
  - src/components/layout/navbar.tsx
  - src/components/layout/footer.tsx
  - src/components/sections/hero.tsx
  - src/components/sections/problem-bar.tsx
  - src/components/sections/features-grid.tsx
  - src/components/sections/demo-video.tsx
  - src/components/sections/interactive-demo.tsx
  - src/components/sections/pricing-calculator.tsx
  - src/components/sections/social-proof.tsx
  - src/components/sections/final-cta.tsx
  - src/app/layout.tsx
  - CLAUDE.md
autonomous: true

must_haves:
  truths:
    - "All CTAs display mint (#75F0D4) background with midnight (#000D23) text"
    - "'We Run the Rest.' headline displays in mint (#75F0D4) color"
    - "No orange (#E05A3A) visible anywhere on the site"
    - "No hardcoded hex values in component files"
    - "All text meets WCAG AA contrast requirements"
  artifacts:
    - path: "src/styles/tokens.css"
      provides: "New Colors 3 palette tokens"
      contains: "--p-mint: #75F0D4"
    - path: "tailwind.config.ts"
      provides: "Updated dc-* color utilities"
      contains: "dc-accent"
    - path: "CLAUDE.md"
      provides: "Updated brand documentation"
      contains: "#75F0D4"
  key_links:
    - from: "src/styles/tokens.css"
      to: "tailwind.config.ts"
      via: "CSS variable references"
      pattern: "var\\(--color-"
    - from: "tailwind.config.ts"
      to: "*.tsx components"
      via: "dc-* utility classes"
      pattern: "dc-accent|dc-bg-dark"
---

<objective>
Replace the entire brand color system from coral/blue to the "Drive Command - Colors 3" palette featuring mint accent (#75F0D4) and navy/midnight dark backgrounds.

Purpose: Refresh brand identity with speed-signaling mint/cyan accent while ensuring all text meets WCAG AA contrast requirements.

Output: Complete color system replacement across tokens, Tailwind config, all components, and documentation.
</objective>

<execution_context>
@/Users/ayazmohammed/.claude/get-shit-done/workflows/execute-plan.md
@/Users/ayazmohammed/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/STATE.md
@src/styles/tokens.css
@tailwind.config.ts
</context>

<tasks>

<task type="auto">
  <name>Task 1: Replace token system and Tailwind config</name>
  <files>src/styles/tokens.css, tailwind.config.ts</files>
  <action>
**tokens.css - Complete rewrite:**

Replace all content with new palette structure:

```css
/* DriveCommand Brand Color Tokens - Colors 3 Palette
   =================================================
   Components NEVER reference --p-* directly.
   Always use semantic aliases below.
*/

:root {
  /* === PALETTE STOPS (internal only) === */
  --p-mint: #75F0D4;       /* Bright cyan-green - CTA accent */
  --p-slate-teal: #5B878A; /* Muted teal-grey - secondary */
  --p-ocean: #3B8696;      /* Mid ocean blue-teal */
  --p-deep-blue: #21657F;  /* Rich dark teal-blue */
  --p-navy: #19334D;       /* Dark blue-navy */
  --p-forest: #005228;     /* Very dark green - badge bg */
  --p-midnight: #000D23;   /* Near-black blue - primary bg */

  /* === SEMANTIC ALIASES (use these in components) === */

  /* Backgrounds */
  --color-bg-dark: var(--p-midnight);
  --color-bg-light: #D9F0F7;           /* Keep ice white for light sections */
  --color-bg-card: var(--p-navy);
  --color-bg-secondary: #0A1628;       /* Slightly lighter than midnight */

  /* Brand */
  --color-brand: var(--p-deep-blue);
  --color-brand-mid: var(--p-ocean);

  /* Accent (CTAs, links, highlights) - MINT */
  --color-accent: var(--p-mint);
  --color-accent-hover: #5CD9BE;       /* Slightly darker mint */
  --color-text-on-accent: var(--p-midnight); /* Text on mint buttons */

  /* Text */
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #A8C4D4;     /* Teal-tinted gray */
  --color-text-dark: var(--p-midnight);
  --color-text-dark-secondary: #4A6280;
  --color-text-muted: #6B8A9A;

  /* Borders */
  --color-border: var(--p-navy);
  --color-border-light: #C2D8E8;

  /* Status colors */
  --color-live-green: #10B981;
  --color-status-transit: #F59E0B;
  --color-status-dispatched: #7C6FCD;
  --color-status-invoiced: var(--p-ocean);

  /* Glows */
  --color-glow-primary: rgba(33, 101, 127, 0.4);
  --color-glow-accent: rgba(117, 240, 212, 0.15);
}
```

**tailwind.config.ts:**

Update the `dc` color map to reference new tokens. Keep existing structure but update values:

- Remove `brand`, `logistics` color objects (they use old hardcoded values)
- Update `dc` object to include new semantic tokens
- Add `dc-text-on-accent` for button text

```typescript
dc: {
  'bg-dark': 'var(--color-bg-dark)',
  'bg-light': 'var(--color-bg-light)',
  'bg-card': 'var(--color-bg-card)',
  'bg-secondary': 'var(--color-bg-secondary)',
  'brand': 'var(--color-brand)',
  'brand-mid': 'var(--color-brand-mid)',
  'accent': 'var(--color-accent)',
  'accent-hover': 'var(--color-accent-hover)',
  'text-on-accent': 'var(--color-text-on-accent)',
  'text-primary': 'var(--color-text-primary)',
  'text-secondary': 'var(--color-text-secondary)',
  'text-dark': 'var(--color-text-dark)',
  'text-dark-secondary': 'var(--color-text-dark-secondary)',
  'text-muted': 'var(--color-text-muted)',
  'border': 'var(--color-border)',
  'border-light': 'var(--color-border-light)',
  'live-green': 'var(--color-live-green)',
  'status-transit': 'var(--color-status-transit)',
  'status-dispatched': 'var(--color-status-dispatched)',
  'status-invoiced': 'var(--color-status-invoiced)',
},
```
  </action>
  <verify>
Run `npm run build` - no TypeScript errors. Grep for old hex values: `grep -r "#E05A3A\|#2D4E7A\|#C44D30" src/styles/` returns empty.
  </verify>
  <done>
tokens.css contains new Colors 3 palette. tailwind.config.ts references new tokens via dc-* utilities. No old coral/orange hex values remain.
  </done>
</task>

<task type="auto">
  <name>Task 2: Update all component color references</name>
  <files>
    src/components/sections/hero.tsx
    src/components/sections/final-cta.tsx
    src/components/sections/features-grid.tsx
    src/components/sections/demo-video.tsx
    src/components/sections/interactive-demo.tsx
    src/components/sections/pricing-calculator.tsx
    src/components/sections/social-proof.tsx
    src/components/sections/problem-bar.tsx
    src/components/layout/navbar.tsx
    src/components/layout/footer.tsx
  </files>
  <action>
**Global replacements across all files:**

1. **Button shadow colors** - Replace all `rgba(224, 90, 58, ...)` (coral) and `rgba(59, 130, 246, ...)` (blue) with:
   - `rgba(117, 240, 212, 0.25)` for mint glow shadows
   - Or use `var(--color-glow-accent)` where inline styles are used

2. **Button text color** - Any button with mint/accent background MUST have:
   - `text-dc-text-on-accent` class OR
   - `style={{ color: 'var(--color-text-on-accent)' }}`
   - Replace `text-white` on accent buttons with `text-dc-text-on-accent`

3. **Glow backgrounds** - Replace hardcoded coral/blue glows:
   - `rgba(224, 90, 58, 0.15)` -> `rgba(117, 240, 212, 0.15)`
   - `rgba(45, 78, 122, 0.08)` -> `rgba(33, 101, 127, 0.1)`

4. **Route path colors** in hero.tsx:
   - Update `routePaths` array colors to use mint/teal tokens
   - `color: 'var(--color-accent)'` for primary route
   - `color: 'var(--color-brand)'` for secondary routes

5. **Hero "We Run the Rest." line:**
   - Ensure it uses `style={{ color: 'var(--color-accent)' }}`

6. **Dashboard card hover states** in hero.tsx:
   - Replace `rgba(224, 90, 58, 0.3)` borderColor with `rgba(117, 240, 212, 0.3)`

7. **CSS class replacements:**
   - `bg-accent-blue` -> `bg-dc-accent`
   - `text-brand-blue` -> `text-dc-brand`
   - `text-sky-400` -> `text-dc-brand-mid`
   - `bg-brand-blue/10` -> `bg-dc-brand/10`
   - `text-blue-400` -> `text-dc-accent`

8. **Feature card colors** in features-grid.tsx:
   - Update `hoverBorderColor` and `hoverGlowShadow` to use mint/teal values
   - Replace blue RGB values with mint: `rgba(117, 240, 212, 0.6)` for border, `rgba(117, 240, 212, 0.3)` for glow

9. **Interactive demo** step indicators:
   - `bg-accent-blue` -> `bg-dc-accent text-dc-text-on-accent`
   - Ensure active step has readable text on mint background

10. **Pricing calculator** highlighted tier:
    - `border-[var(--accent-blue)]` -> `border-dc-accent`
    - `bg-accent-blue` badges -> `bg-dc-accent text-dc-text-on-accent`

**Contrast rules to enforce:**
- Mint (#75F0D4) ONLY as background, NEVER as small body text on dark
- Text ON mint must be midnight (#000D23)
- Ocean (#3B8696) OK for larger text/links, not body text
  </action>
  <verify>
1. `grep -r "#E05A3A\|#C44D30\|224, 90, 58" src/components/` returns empty
2. `grep -r "text-white" src/components/ | grep -i "accent\|cta"` - verify no white text on accent buttons
3. `npm run build` passes
4. Visual check: CTAs show mint bg + dark text
  </verify>
  <done>
All components use new Colors 3 palette. CTAs have mint background with midnight text. No hardcoded orange/coral values. "We Run the Rest." displays in mint.
  </done>
</task>

<task type="auto">
  <name>Task 3: Update documentation and verify</name>
  <files>CLAUDE.md</files>
  <action>
**Update CLAUDE.md Design Tokens section:**

Replace the entire Color System table with:

```markdown
### Color System

| Token | Value | Usage |
|-------|-------|-------|
| `--color-accent` | #75F0D4 (mint) | ALL CTA buttons, links, highlights |
| `--color-accent-hover` | #5CD9BE | Button hover state |
| `--color-text-on-accent` | #000D23 | Text on mint buttons (REQUIRED) |
| `--color-bg-dark` | #000D23 (midnight) | Hero, dark sections |
| `--color-bg-light` | #D9F0F7 | Light sections, feature cards |
| `--color-bg-card` | #19334D (navy) | Dashboard cards |
| `--color-brand` | #21657F (deep-blue) | Brand identity, nav |
| `--color-brand-mid` | #3B8696 (ocean) | Hover states, secondary UI |
| `--color-text-primary` | #FFFFFF | Text on dark backgrounds |
| `--color-text-secondary` | #A8C4D4 | Muted text on dark |
| `--color-text-dark` | #000D23 | Text on light backgrounds |
```

**Update Tailwind Utilities section:**

```markdown
### Tailwind Utilities

Use `dc-*` prefix for brand colors:
- `bg-dc-accent`, `text-dc-accent` (mint - use text only for large headings)
- `bg-dc-bg-dark`, `bg-dc-bg-light`
- `text-dc-text-primary`, `text-dc-text-secondary`
- `text-dc-text-on-accent` (REQUIRED for buttons with mint background)
```

**Update Rules section:**

```markdown
### Rules

1. **Never use raw hex values** in components
2. **CTAs are ALWAYS mint** (`--color-accent`) with **midnight text** (`--color-text-on-accent`)
3. **Mint is never body text** on dark backgrounds (contrast too low for small text)
4. **Status colors** use semantic tokens: `--color-live-green`, `--color-status-transit`, etc.
5. **Ocean (#3B8696)** OK for links/large text, not body copy
```
  </action>
  <verify>
1. `npm run build` passes
2. `npm run lint` passes (if configured)
3. CLAUDE.md contains #75F0D4 as accent color
4. CLAUDE.md documents text-on-accent rule
  </verify>
  <done>
CLAUDE.md accurately documents new Colors 3 palette with mint accent. Contrast rules documented. Build passes with zero TypeScript errors.
  </done>
</task>

</tasks>

<verification>
1. `npm run build` completes without errors
2. `grep -rE "#E05A3A|#C44D30|224,\\s*90,\\s*58" src/` returns empty (no coral)
3. `grep -rE "#[0-9A-Fa-f]{6}" src/components/` returns only status/utility colors, no brand colors
4. Visual inspection: Hero CTA buttons show mint background + dark text
5. Visual inspection: "We Run the Rest." headline is mint colored
</verification>

<success_criteria>
- Zero hardcoded hex color values for brand/accent in components
- All CTAs display mint (#75F0D4) background with midnight (#000D23) text
- "We Run the Rest." headline renders in mint
- No orange (#E05A3A) visible anywhere
- TypeScript build passes
- CLAUDE.md documents new color system
</success_criteria>

<output>
After completion, create `.planning/quick/3-replace-brand-colors-with-colors-3-palet/3-SUMMARY.md`
</output>
