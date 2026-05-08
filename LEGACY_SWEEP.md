# Legacy Palette Sweep Report

> **Date:** 2026-04-23
> **Purpose:** Identify all remaining legacy palette references before final cleanup

---

## Summary

Swept `/src` and `/public` for legacy hex values, old font names, and deprecated CSS variable references. The codebase is **clean** — legacy values only exist in their definition sites (tokens.css), not in active component code.

---

## 1. Legacy Hex Values Searched

| Hex Code | Description | Found In |
|----------|-------------|----------|
| `#75f0d4` | Mint (old accent) | `tokens.css:9` — definition only |
| `#5b878a` | Slate Teal | `tokens.css:10` — definition only |
| `#3b8696` | Ocean | `tokens.css:11` — definition only |
| `#21657f` | Deep Blue | `tokens.css:12` — definition only |
| `#19334d` | Navy (old) | `tokens.css:13` — definition only |
| `#005228` | Forest | `tokens.css:14` — definition only |
| `#000d23` | Midnight (old) | `tokens.css:15` — definition only |
| `#d9f0f7` | Light bg (old) | Not found |
| `#5cd9be` | Accent hover (old) | Not found |
| `#a8c4d4` | Text secondary (old) | Not found |
| `#4a6280` | Text dark secondary (old) | Not found |
| `#6b8a9a` | Text muted (old) | Not found |
| `#c2d8e8` | Border light (old) | Not found |
| `#38bdf8` | Cyan accent (old) | Not found |
| `#22c55e` | Green accent (old) | Not found |
| `#f7c948` | Stripe accent (old) | Not found |
| `#374151` | Card hover (old) | Not found |
| `#64748b` | Scheduled state | `tokens.css:121`, `brand-preview/page.tsx:121` — **current token** |

### Result: ✅ No legacy hex values in active component code

---

## 2. Old Font Names Searched

| Font Name | Status |
|-----------|--------|
| Space Grotesk | Not found |
| IBM Plex Sans | Not found |
| Barlow Condensed | Not found |

### Result: ✅ All fonts migrated to DM Sans / Inter / JetBrains Mono

---

## 3. Legacy CSS Variable References

### `var(--p-*)` Variables

| Variable | Status |
|----------|--------|
| `var(--p-mint)` | Not found in components |
| `var(--p-slate-teal)` | Not found in components |
| `var(--p-ocean)` | Not found in components |
| `var(--p-deep-blue)` | Not found in components |
| `var(--p-navy)` | Not found in components |
| `var(--p-forest)` | Not found in components |
| `var(--p-midnight)` | Not found in components |

### Result: ✅ Safe to delete `--p-*` block from tokens.css (lines 7-15)

---

## 4. Theme Tokens Still In Use

The following tokens are still actively used but now correctly reference the new `--dc-*` palette:

| Token | Used In | Points To |
|-------|---------|-----------|
| `--accent-cyan` | theme-toggle, animated-icon, demo-content, demo-video, social-proof, navbar | `var(--dc-l150)` (Electric L150) |
| `--text-muted` | footer, interactive-demo, problem-bar, social-proof | `var(--dc-state-scheduled)` |
| `--bg-card-hover` | pricing/page.tsx | `var(--dc-n600)` |
| `--accent-stripe` | problem-bar | `var(--dc-state-at-risk)` |
| `--accent-signal` | social-proof | `var(--dc-state-on-time)` |
| `--color-bg-secondary` | tokens.css semantic | `var(--dc-s450)` |

### Result: ⚠️ These tokens are NOT legacy — they are bridge aliases that correctly point to new palette. **DO NOT DELETE.**

---

## 5. Inline Style Hex Codes

Searched for `style=.*#[0-9a-fA-F]{6}` pattern in `/src`:

### Result: ✅ No hardcoded hex values in inline styles

---

## 6. Actions Taken

- [x] Deleted `--p-*` palette block from `tokens.css` lines 7-15 (7 variables)
- [x] Preserved all theme tokens that bridge to new `--dc-*` palette
- [x] Preserved `--color-bg-secondary` (still referenced via theme system)

---

## 7. Files Modified

| File | Change |
|------|--------|
| `src/styles/tokens.css` | Removed lines 7-15 (legacy `--p-*` palette definitions) |

---

## 8. Files NOT Modified (Still Clean)

All component files in `/src/components/` and `/src/app/` use only:
- Semantic CSS variables (`--color-*`, `--dc-*`, `--accent-*`, `--text-*`, `--bg-*`)
- Tailwind utility classes (`dc-*`, `dc2-*`)
- No hardcoded legacy hex values

---

*Generated during DriveCommand Rebrand Finalization*
