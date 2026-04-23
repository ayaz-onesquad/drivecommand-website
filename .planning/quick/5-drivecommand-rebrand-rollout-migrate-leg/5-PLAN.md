# Quick Task 5: DriveCommand Rebrand Rollout

## Summary
Migrate legacy `--color-*` tokens to reference the new `--dc-*` palette, replace hardcoded mint rgba values with Signal Blue, update brand-voice copy ("platform" → "operations"), update metadata/URLs to drivecommand.co, and add the "Miles Ahead." tagline to the hero.

## Tasks

### Task 1: Update tokens.css semantic aliases
**Files:** `src/styles/tokens.css`
**Changes:**
- Update `--color-bg-dark` → `var(--dc-ink)`
- Update `--color-bg-light` → `var(--dc-bone)`
- Update `--color-bg-card` → `var(--dc-slate)`
- Update `--color-bg-secondary` → `var(--dc-s450)`
- Update `--color-brand` → `var(--dc-signal)`
- Update `--color-brand-mid` → `var(--dc-l250)`
- Update `--color-accent` → `var(--dc-signal)`
- Update `--color-accent-hover` → `var(--dc-l250)`
- Update `--color-text-on-accent` → `var(--dc-bone)` (now white text on Signal Blue)
- Update `--color-text-secondary` → `var(--dc-n300)`
- Update `--color-text-dark` → `var(--dc-ink)`
- Update `--color-text-dark-secondary` → `var(--dc-n500)`
- Update `--color-text-muted` → `var(--dc-n400)`
- Update `--color-border` → `var(--dc-slate)`
- Update `--color-border-light` → `var(--dc-n100)`
- Update `--color-live-green` → `#22c07a` (onTime)
- Update `--color-status-transit` → `#f5b841` (at-risk, keep amber for warning semantics)
- Update `--color-status-dispatched` → `#8c6fff` (detention)
- Update `--color-status-invoiced` → `#2bb5a5` (delivered)
- Update glows to Signal Blue based rgba values

### Task 2: Update tailwind.config.ts
**Files:** `tailwind.config.ts`
**Changes:**
- Remove `'brand-green': '#10B981'` (dead token per audit 6.4)
- Keep the `dc` namespace (it's the DriveCommand namespace, not legacy)

### Task 3: Update globals.css theme properties and hardcoded rgba
**Files:** `src/app/globals.css`
**Changes:**
- Update `--accent-cyan` → `var(--dc-l150)` (#8e9bff)
- Update `--accent-signal` → `var(--dc-state-on-time)` (#22c07a)
- Update `--accent-stripe` → `var(--dc-state-at-risk)` (#f5b841)
- Update `--bg-card-hover` → `var(--dc-n600)` (#4a4d56)
- Replace `rgba(117, 240, 212, *)` with `rgba(10, 33, 192, *)` (Signal Blue)
- Replace `rgba(56, 189, 248, *)` with `rgba(142, 155, 255, *)` (Electric L150)
- Update headline-glow keyframe to use Signal Blue

### Task 4: Update hero.tsx hardcoded rgba and add tagline
**Files:** `src/components/sections/hero.tsx`
**Changes:**
- Replace `rgba(117, 240, 212, *)` in boxShadow variants with `rgba(10, 33, 192, *)`
- Replace `rgba(33, 101, 127, *)` (deep-blue glow) with `rgba(10, 33, 192, *)` (Signal)
- Add "Miles Ahead." tagline below headline: "Miles" in bone (#f4f5f7), "Ahead." in Signal Blue (#0a21c0)

### Task 5: Update navbar.tsx hardcoded rgba
**Files:** `src/components/layout/navbar.tsx`
**Changes:**
- Replace `rgba(117, 240, 212, *)` in primaryButtonVariants boxShadow with `rgba(10, 33, 192, *)`

### Task 6: Update mobile-menu.tsx hardcoded rgba
**Files:** `src/components/layout/mobile-menu.tsx`
**Changes:**
- Replace `rgba(117, 240, 212, *)` in primaryButtonVariants boxShadow with `rgba(10, 33, 192, *)`

### Task 7: Update final-cta.tsx hardcoded rgba
**Files:** `src/components/sections/final-cta.tsx`
**Changes:**
- Replace `rgba(117, 240, 212, *)` in primaryButtonVariants boxShadow with `rgba(10, 33, 192, *)`

### Task 8: Update interactive-demo.tsx hardcoded rgba
**Files:** `src/components/sections/interactive-demo.tsx`
**Changes:**
- Replace `rgba(117, 240, 212, *)` in primaryButtonVariants boxShadow with `rgba(10, 33, 192, *)`

### Task 9: Update features-grid.tsx hardcoded rgba
**Files:** `src/components/sections/features-grid.tsx`
**Changes:**
- Replace `rgba(117, 240, 212, *)` in FEATURES hoverBorderColor/hoverGlowShadow with `rgba(10, 33, 192, *)`
- Replace `rgba(56, 189, 248, *)` (sky/cyan) with `rgba(142, 155, 255, *)` (Electric L150)

### Task 10: Update layout.tsx metadata
**Files:** `src/app/layout.tsx`
**Changes:**
- Update metadataBase URL to `https://drivecommand.co` (FLAG: brand guide uses .co, audit says .com)
- Update description to reflect brand voice

### Task 11: Update contact and pricing URLs
**Files:** `src/app/contact/page.tsx`, `src/app/contact/actions.ts`, `src/lib/pricing.config.ts`
**Changes:**
- Update email from `sales@drivecommand.com` to `sales@drivecommand.co`
- Update app URLs in pricing.config.ts from `.com` to `.co`

### Task 12: Update brand-voice copy ("platform" → "operations")
**Files:** Multiple files per BRAND_AUDIT.md section 5.3
**Changes:**
- Search for "platform" in product-context sentences
- Replace with "operations" per brand guide page 16 voice rules
- FLAG each replacement in ROLLOUT_REPORT.md for human review

### Task 13: Create ROLLOUT_REPORT.md
**Files:** `ROLLOUT_REPORT.md`
**Changes:**
- Document all files modified
- Document all color remappings
- Document all copy changes
- Flag ambiguities (domain .co vs .com, transit color semantics, platform→operations replacements)

## Verification
- [ ] `npm run build` succeeds
- [ ] No TypeScript errors
- [ ] `/brand-preview` renders correctly
- [ ] Home, about, pricing, contact, demo pages render with new palette
- [ ] Fonts render as DM Sans (headings) and Inter (body)
- [ ] Hero shows "Miles Ahead." tagline with correct color split
- [ ] All flagged ambiguities documented in ROLLOUT_REPORT.md

## PLANNING COMPLETE
Plan path: .planning/quick/5-drivecommand-rebrand-rollout-migrate-leg/5-PLAN.md
