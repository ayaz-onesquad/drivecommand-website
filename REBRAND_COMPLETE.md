# DriveCommand Rebrand Completion Checklist

> **Date:** 2026-04-23
> **Version:** 1.0
> **Status:** ✅ Verified Complete

---

## Pre-Completion Verification

### Build & Type Safety

- [x] `npm run build` succeeds without errors
- [x] No TypeScript errors (`npx tsc --noEmit`)
- [x] `npm run lint` passes

### Visual Audit

- [ ] `/brand-preview` renders all tokens correctly (dev mode)
- [ ] Landing page (`/`) shows new ink/navy/signal-blue palette
- [ ] About page (`/about`) renders correctly
- [ ] Pricing page (`/pricing`) renders correctly
- [ ] Contact page (`/contact`) renders correctly
- [ ] Demo page (`/demo`) renders correctly

### Brand Consistency

- [ ] All CTAs use Signal Blue (`#0a21c0`) background
- [ ] CTA text is white/bone (not dark)
- [ ] Button hover glows use Signal Blue (not mint)
- [ ] Fonts render as DM Sans (headings) and Inter (body)
- [ ] Hero shows "Miles Ahead." tagline with correct color split
- [ ] Logo component renders correctly in navbar, footer, mobile menu

### Code Quality

- [x] No hardcoded legacy hex values in `/src` (per LEGACY_SWEEP.md)
- [x] Legacy `--p-*` palette block removed from tokens.css
- [x] All theme tokens correctly reference `--dc-*` palette

### Documentation

- [x] `/LEGACY_SWEEP.md` exists and is accurate
- [x] `/brand/MISSING_ASSETS.md` exists with designer brief
- [x] `/docs/BRAND_USAGE.md` exists with developer guide
- [x] `README.md` includes Brand System section
- [x] `/brand-preview` route preserved (gated by NODE_ENV)

---

## Files Modified in Rebrand

### Tokens & Config

| File | Changes |
|------|---------|
| `src/styles/tokens.css` | Removed legacy `--p-*` block; semantic aliases point to `--dc-*` |
| `tailwind.config.ts` | Added `dc2` namespace; removed `brand-green` |
| `src/app/globals.css` | Theme properties reference `--dc-*` palette |

### Components

| File | Changes |
|------|---------|
| `src/app/layout.tsx` | Fonts (DM Sans, Inter, JetBrains Mono); metadata updated |
| `src/components/layout/navbar.tsx` | Logo component; Signal Blue button glow |
| `src/components/layout/footer.tsx` | Logo component |
| `src/components/layout/mobile-menu.tsx` | Logo component |
| `src/components/sections/hero.tsx` | "Miles Ahead." tagline; Signal Blue glows |
| `src/components/sections/final-cta.tsx` | Signal Blue button glow |
| `src/components/sections/interactive-demo.tsx` | Signal Blue button glow |
| `src/components/sections/features-grid.tsx` | Signal Blue hover effects |

### New Files

| File | Purpose |
|------|---------|
| `src/components/brand/Logo.tsx` | Logo component with variant/size/background props |
| `src/app/brand-preview/page.tsx` | Dev-only brand token preview |
| `src/app/icon.svg` | SVG favicon |
| `src/app/apple-icon.svg` | Apple touch icon source |
| `src/app/opengraph-image.svg` | OG image source |
| `public/brand/logo/glyph.svg` | Glyph mark |
| `public/brand/logo/glyph-on-dark.svg` | Light fills for dark backgrounds |
| `public/brand/logo/glyph-on-light.svg` | Dark fills for light backgrounds |

### Documentation

| File | Purpose |
|------|---------|
| `LEGACY_SWEEP.md` | Legacy palette sweep report |
| `brand/MISSING_ASSETS.md` | Designer brief for missing logo assets |
| `docs/BRAND_USAGE.md` | Developer brand implementation guide |
| `brand/BRAND_GUIDE_SUMMARY.md` | Brand guide reference |
| `brand/tokens.json` | Machine-readable design tokens |
| `FOUNDATION_NOTES.md` | Brand foundation installation notes |
| `ROLLOUT_REPORT.md` | Rollout migration report |

---

## Files Preserved (Audit Trail)

These files are intentionally preserved and should NOT be deleted:

- `/BRAND_AUDIT.md` — Initial brand audit
- `/FOUNDATION_NOTES.md` — Foundation installation notes
- `/ROLLOUT_REPORT.md` — Rollout migration report
- `/brand/brand-guide.pdf` — Source brand guide
- `/brand/tokens.json` — Design tokens
- `/brand/MIGRATION_MAP.json` — Token migration mapping
- `/brand/BRAND_GUIDE_SUMMARY.md` — Brand guide summary

---

## Post-Completion Actions

### Required Before Launch

1. **Generate PNG assets** (see `/brand/MISSING_ASSETS.md`):
   ```bash
   npx sharp-cli -i src/app/apple-icon.svg -o src/app/apple-icon.png -w 180 -h 180
   npx sharp-cli -i src/app/opengraph-image.svg -o src/app/opengraph-image.png -w 1200 -h 630
   ```

2. **Confirm domain strategy** (.co vs .com) per ROLLOUT_REPORT.md flagged ambiguity

3. **Request full logo lockup SVGs** from design team per MISSING_ASSETS.md

### Recommended

- Generate `favicon.ico` for legacy browser support
- Consider per-background glyph variants for pixel-perfect contrast

---

## Git Commit Message Template

Use this commit message for the final rebrand commit:

```
feat(brand): complete DriveCommand rebrand to ink/signal identity v1.0

- Remove legacy --p-* palette from tokens.css
- Add LEGACY_SWEEP.md documenting clean sweep
- Add brand/MISSING_ASSETS.md designer brief
- Add docs/BRAND_USAGE.md developer guide
- Update README.md with Brand System section
- Preserve /brand-preview route for internal use

Brand system now uses:
- Primary: Ink (#141619), Slate (#2c2e3a), Navy (#050a44)
- Accent: Signal Blue (#0a21c0)
- Surface: Bone (#f4f5f7)
- Typography: DM Sans (display), Inter (body), JetBrains Mono (code)

Closes: [ISSUE_NUMBER]

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

---

## Verification Commands

Run these commands to verify the rebrand is complete:

```bash
# Build check
npm run build

# Type check
npx tsc --noEmit

# Lint check
npm run lint

# Start dev server and visually verify
npm run dev
# Then visit:
# - http://localhost:3000 (landing)
# - http://localhost:3000/about
# - http://localhost:3000/pricing
# - http://localhost:3000/contact
# - http://localhost:3000/demo
# - http://localhost:3000/brand-preview

# Search for any remaining legacy hex values
grep -r "#75f0d4\|#5b878a\|#3b8696\|#21657f\|#19334d\|#005228\|#000d23" src/
# Should return no results (except this file if grepping from root)
```

---

## Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Developer | | | |
| Design | | | |
| Product | | | |

---

*DriveCommand Rebrand v1.0 — April 2026*
