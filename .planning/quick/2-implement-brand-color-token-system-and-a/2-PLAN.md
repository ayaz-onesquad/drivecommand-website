---
phase: quick-2
plan: 1
type: execute
wave: 1
depends_on: []
files_modified:
  - src/styles/tokens.css
  - src/app/globals.css
  - tailwind.config.ts
  - src/components/sections/hero.tsx
  - src/components/sections/features-grid.tsx
  - src/components/sections/final-cta.tsx
  - src/components/sections/problem-bar.tsx
  - src/components/sections/demo-video.tsx
  - src/components/sections/interactive-demo.tsx
  - src/components/sections/pricing-calculator.tsx
  - src/components/sections/social-proof.tsx
  - src/components/layout/navbar.tsx
  - src/components/layout/footer.tsx
  - src/components/layout/mobile-menu.tsx
  - src/components/shared/parallax-world.tsx
  - src/components/shared/status-badge.tsx
autonomous: true

must_haves:
  truths:
    - "All colors reference semantic tokens, never raw hex values"
    - "CTA buttons render in coral (#E05A3A)"
    - "Hero 'We Run the Rest.' headline renders in coral"
    - "Dark sections use #1E2533 background"
    - "Light sections use ice blue (#D9F0F7)"
  artifacts:
    - path: "src/styles/tokens.css"
      provides: "Brand color token definitions"
      contains: "--color-primary-1"
    - path: "tailwind.config.ts"
      provides: "dc-* Tailwind utilities"
      contains: "dc-accent"
  key_links:
    - from: "src/app/globals.css"
      to: "src/styles/tokens.css"
      via: "@import"
      pattern: "@import.*tokens"
---

<objective>
Implement brand color token system and apply consistently across all website components.

Purpose: Establish design system foundation with semantic color tokens that enable consistent branding (coral CTAs, steel blue brand, ice white light sections) while eliminating hardcoded hex values from components.

Output: tokens.css with full palette, updated tailwind.config.ts with dc-* utilities, all components using semantic tokens only.
</objective>

<execution_context>
@/Users/ayazmohammed/.claude/get-shit-done/workflows/execute-plan.md
@/Users/ayazmohammed/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/STATE.md
@src/app/globals.css
@tailwind.config.ts
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create tokens.css and configure Tailwind</name>
  <files>
    src/styles/tokens.css
    src/app/globals.css
    tailwind.config.ts
  </files>
  <action>
1. Create `src/styles/tokens.css` with the complete brand palette:

```css
/* DriveCommand Brand Color Tokens
   ================================
   Components NEVER reference --color-primary-N directly.
   Always use semantic aliases below.
*/

:root {
  /* === PRIMARY PALETTE === */
  --color-primary-1: #2D4E7A;   /* Deep steel blue - primary brand, nav background */
  --color-primary-2: #7AAAC8;   /* Sky blue - secondary brand, hover states */
  --color-primary-3: #D9F0F7;   /* Ice white - light section backgrounds, cards */
  --color-primary-4: #E05A3A;   /* Burnt orange/coral - ALL primary CTAs, accents */
  --color-primary-5: #1E2533;   /* Near-black navy - hero background, dark sections */
  --color-primary-6: #FFFFFF;   /* Pure white - body text on dark, light backgrounds */

  /* === SEMANTIC ALIASES (use these in components) === */

  /* Backgrounds */
  --color-bg-dark: var(--color-primary-5);
  --color-bg-light: var(--color-primary-3);
  --color-bg-card: #16202E;

  /* Brand */
  --color-brand: var(--color-primary-1);
  --color-brand-mid: var(--color-primary-2);

  /* Accent (CTAs, links, highlights) */
  --color-accent: var(--color-primary-4);
  --color-accent-hover: #C44D30;

  /* Text */
  --color-text-primary: var(--color-primary-6);
  --color-text-secondary: #A8B8CC;
  --color-text-dark: var(--color-primary-5);
  --color-text-dark-secondary: #4A6280;

  /* Borders */
  --color-border: #2A3A50;
  --color-border-light: #C2D8E8;

  /* Status colors */
  --color-live-green: #10B981;
  --color-status-transit: #F59E0B;
  --color-status-dispatched: #7C6FCD;
  --color-status-invoiced: var(--color-primary-2);

  /* Glows */
  --color-glow-primary: rgba(45, 78, 122, 0.4);
  --color-glow-accent: rgba(224, 90, 58, 0.15);
}
```

2. Update `src/app/globals.css`:
   - Add `@import './styles/tokens.css';` at the very TOP (before @tailwind directives)
   - Wait, tokens.css is in src/styles, so relative path from src/app is `../styles/tokens.css`
   - Actually, check: globals.css is at src/app/globals.css, tokens at src/styles/tokens.css
   - Correct import: `@import '../styles/tokens.css';` - place BEFORE @import url for Google Fonts
   - Keep existing CSS custom properties for backwards compatibility during migration, but migrate key ones to new semantic tokens

3. Update `tailwind.config.ts` to expose dc-* utilities:

```ts
colors: {
  // Keep existing logistics colors for backwards compat
  logistics: { ... },
  // Add new dc- namespace for brand tokens
  dc: {
    'bg-dark': 'var(--color-bg-dark)',
    'bg-light': 'var(--color-bg-light)',
    'bg-card': 'var(--color-bg-card)',
    'brand': 'var(--color-brand)',
    'brand-mid': 'var(--color-brand-mid)',
    'accent': 'var(--color-accent)',
    'accent-hover': 'var(--color-accent-hover)',
    'text-primary': 'var(--color-text-primary)',
    'text-secondary': 'var(--color-text-secondary)',
    'text-dark': 'var(--color-text-dark)',
    'text-dark-secondary': 'var(--color-text-dark-secondary)',
    'border': 'var(--color-border)',
    'border-light': 'var(--color-border-light)',
    'live-green': 'var(--color-live-green)',
    'status-transit': 'var(--color-status-transit)',
    'status-dispatched': 'var(--color-status-dispatched)',
    'status-invoiced': 'var(--color-status-invoiced)',
  },
},
```
  </action>
  <verify>
- File exists: `ls src/styles/tokens.css`
- Import present: `grep -q "tokens.css" src/app/globals.css && echo "OK"`
- Tailwind dc colors: `grep -q "dc-accent" tailwind.config.ts && echo "OK"`
- TypeScript check: `npx tsc --noEmit`
  </verify>
  <done>
- tokens.css contains all 6 primary colors and all semantic aliases
- globals.css imports tokens.css before other CSS
- tailwind.config.ts exposes dc-* color utilities
- No TypeScript errors
  </done>
</task>

<task type="auto">
  <name>Task 2: Sweep components and replace hardcoded colors with semantic tokens</name>
  <files>
    src/components/sections/hero.tsx
    src/components/sections/features-grid.tsx
    src/components/sections/final-cta.tsx
    src/components/sections/problem-bar.tsx
    src/components/sections/demo-video.tsx
    src/components/sections/interactive-demo.tsx
    src/components/sections/pricing-calculator.tsx
    src/components/sections/social-proof.tsx
    src/components/layout/navbar.tsx
    src/components/layout/footer.tsx
    src/components/layout/mobile-menu.tsx
    src/components/shared/parallax-world.tsx
    src/components/shared/status-badge.tsx
  </files>
  <action>
Systematically replace ALL hardcoded hex colors with semantic tokens. Key replacements:

**Hero section (hero.tsx):**
- `#080d14` background -> `var(--color-bg-dark)` (note: #1E2533 per spec)
- `#1e293b` border -> `var(--color-border)`
- `#3b82f6` (blue CTA/accents) -> `var(--color-accent)` (now coral)
- `var(--accent-load)` (blue headline) -> `var(--color-accent)` (coral for "We Run the Rest.")
- `var(--accent-blue)` buttons -> `var(--color-accent)`
- Box shadows with blue (`rgba(59, 130, 246, ...)`) -> use `var(--color-glow-accent)` or `rgba(224, 90, 58, ...)` for coral glow
- Route path colors `#3b82f6`, `#8b5cf6`, `#10b981` -> use CSS variables: `var(--color-brand)`, `var(--color-status-dispatched)`, `var(--color-live-green)`

**Features grid (features-grid.tsx):**
- Keep feature-specific icon colors (blue, green, etc.) BUT ensure CTA/accent uses coral
- `var(--accent-blue)` on "Learn more" -> `var(--color-accent)`

**Final CTA (final-cta.tsx):**
- `bg-accent-blue` -> `bg-dc-accent`
- Blue glow shadows -> coral glow

**Navbar (navbar.tsx):**
- `var(--accent-blue)` -> `var(--color-accent)` for CTA button
- Keep nav link underline cyan for visual hierarchy

**Status badge (status-badge.tsx):**
- Ensure status colors use the new semantic tokens:
  - delivered: `var(--color-live-green)`
  - in-transit: `var(--color-status-transit)`
  - dispatched: `var(--color-status-dispatched)`
  - invoiced: `var(--color-status-invoiced)`

**Parallax world (parallax-world.tsx):**
- `#38bdf8` -> `var(--color-brand-mid)`

**All components:**
- Replace inline `style={{ backgroundColor: '#...' }}` with semantic tokens
- Replace Tailwind classes like `bg-blue-500` with `bg-dc-accent`
- Replace `text-blue-400` with `text-dc-accent` where appropriate

Important: Do NOT change non-brand colors like status indicator colors that are intentionally different (amber for transit, green for delivered, purple for dispatched).
  </action>
  <verify>
- Zero hardcoded hex in components: `grep -r "#[0-9a-fA-F]\{3,6\}" src/components/ | grep -v "/#features" | grep -v "Load #" | wc -l` should be 0 (excluding anchor links and load IDs)
- TypeScript: `npx tsc --noEmit`
- Dev server runs: `npm run dev` (check manually or via curl)
  </verify>
  <done>
- All component files use semantic tokens
- No hardcoded hex colors remain (except non-color uses like #features anchors)
- CTAs render in coral (#E05A3A)
- Hero headline "We Run the Rest." renders in coral
- Light sections use ice blue (#D9F0F7)
- Dark sections use #1E2533
  </done>
</task>

<task type="auto">
  <name>Task 3: Update globals.css theme variables and create CLAUDE.md documentation</name>
  <files>
    src/app/globals.css
    CLAUDE.md
  </files>
  <action>
1. **globals.css cleanup:**
   - Update existing CSS custom properties to reference the new semantic tokens where possible
   - Map old variables to new:
     - `--bg-primary: var(--color-bg-dark);`
     - `--bg-secondary: var(--color-bg-dark);` (or keep separate if needed)
     - `--accent-blue: var(--color-accent);` (redirect blue to coral)
     - `--accent-load: var(--color-accent);`
   - Keep `--accent-cyan` and `--accent-green` for secondary UI elements (they're not CTAs)
   - Remove duplicate definitions that are now in tokens.css

2. **Create CLAUDE.md** with Design Tokens documentation:

```markdown
# DriveCommand Website

## Quick Start

\`\`\`bash
npm run dev    # Start development server
npm run build  # Production build
npm run lint   # ESLint
\`\`\`

## Design Tokens

All colors are defined in `src/styles/tokens.css`. Components use semantic tokens exclusively.

### Color System

| Token | Value | Usage |
|-------|-------|-------|
| `--color-accent` | #E05A3A | ALL CTA buttons, links, highlights |
| `--color-accent-hover` | #C44D30 | Button hover state |
| `--color-bg-dark` | #1E2533 | Hero, dark sections |
| `--color-bg-light` | #D9F0F7 | Light sections, feature cards |
| `--color-bg-card` | #16202E | Dashboard cards |
| `--color-brand` | #2D4E7A | Brand identity, nav |
| `--color-brand-mid` | #7AAAC8 | Hover states, secondary UI |
| `--color-text-primary` | #FFFFFF | Text on dark backgrounds |
| `--color-text-secondary` | #A8B8CC | Muted text on dark |
| `--color-text-dark` | #1E2533 | Text on light backgrounds |

### Tailwind Utilities

Use `dc-*` prefix for brand colors:
- `bg-dc-accent`, `text-dc-accent`
- `bg-dc-bg-dark`, `bg-dc-bg-light`
- `text-dc-text-primary`, `text-dc-text-secondary`

### Rules

1. **Never use raw hex values** in components
2. **CTAs are ALWAYS coral** (`--color-accent`)
3. **Status colors** use semantic tokens: `--color-live-green`, `--color-status-transit`, etc.

## Project Structure

\`\`\`
src/
  app/           # Next.js app router pages
  components/
    layout/      # Navbar, Footer
    sections/    # Hero, Features, etc.
    shared/      # Reusable components
  styles/
    tokens.css   # Design token definitions
  hooks/         # Custom React hooks
  lib/           # Utilities, config
\`\`\`

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Motion (Framer Motion)
\`\`\`
  </action>
  <verify>
- CLAUDE.md exists: `ls CLAUDE.md`
- Contains design tokens section: `grep -q "Design Tokens" CLAUDE.md && echo "OK"`
- Dev server still works: `npx tsc --noEmit`
  </verify>
  <done>
- globals.css updated to use semantic tokens
- CLAUDE.md created with design tokens documentation
- All legacy color variables redirect to semantic tokens
  </done>
</task>

</tasks>

<verification>
After all tasks complete:

1. **Zero hardcoded hex colors:**
   ```bash
   grep -r "#[0-9a-fA-F]\{3,6\}" src/components/ | grep -v "/#" | grep -v "Load #" | wc -l
   # Expected: 0
   ```

2. **TypeScript compiles:**
   ```bash
   npx tsc --noEmit
   # Expected: no errors
   ```

3. **Visual verification (manual):**
   - CTA buttons render in coral (#E05A3A), not blue
   - Hero "We Run the Rest." headline in coral
   - Light sections use ice blue (#D9F0F7)
   - Dark sections use #1E2533
</verification>

<success_criteria>
- tokens.css contains complete brand palette with all semantic aliases
- globals.css imports tokens.css and references semantic tokens
- tailwind.config.ts exposes dc-* color utilities
- All components use semantic tokens, zero hardcoded hex
- CLAUDE.md documents the design token system
- Visual appearance matches brand spec (coral CTAs, steel blue brand, ice blue light sections)
</success_criteria>

<output>
After completion, create `.planning/quick/2-implement-brand-color-token-system-and-a/2-SUMMARY.md`
</output>
