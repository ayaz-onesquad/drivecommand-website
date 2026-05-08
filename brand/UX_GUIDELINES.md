# DriveCommand UX & Brand Guidelines

> **Single source of truth.** Every visual, verbal, and interaction decision in DriveCommand — marketing site and product app — flows from this file.
>
> **Source:** `brand/DriveCommand — Brand Guide 3.pdf` v1.0 · April 2026
> **Last synced:** 2026-05-06
> **Save this file at:** repo root, as `UX_GUIDELINES.md`

---

## Table of contents

1. [How to use this file](#1-how-to-use-this-file)
2. [Token architecture — the one rule](#2-token-architecture--the-one-rule)
3. [Color tokens](#3-color-tokens)
4. [Typography tokens](#4-typography-tokens)
5. [Spacing, radius, motion tokens](#5-spacing-radius-motion-tokens)
6. [Component rules](#6-component-rules)
7. [Voice & tone](#7-voice--tone)
8. [Page composition & conversion architecture](#8-page-composition--conversion-architecture)
9. [Imagery rules](#9-imagery-rules)
10. [How to change a brand color](#10-how-to-change-a-brand-color)
11. [What we never do](#11-what-we-never-do)

---

## 1. How to use this file

**For developers and Claude Code:** Read this file first. Every other decision derives from it. Reference it in any prompt with `@UX_GUIDELINES.md`.

**For designers and stakeholders:** This is the implementation mirror of the brand guide PDF. The PDF is the canonical visual reference; this file is what code reads.

**Authority order when files disagree:**
1. `brand/DriveCommand — Brand Guide 3.pdf` (canonical)
2. This file
3. `brand/tokens.json` (must mirror this file)
4. Any component code

If code disagrees with this file, the code is wrong.

---

## 2. Token architecture — the one rule

> **No hex value, font name, spacing number, or duration appears anywhere in component code. Ever. All values come from `brand/tokens.json` via Tailwind theme tokens.**

This is the most important rule in the entire system. It's what makes brand updates a one-file edit instead of a hundred-file scavenger hunt.

### The flow

```
brand/tokens.json   ← single source of truth for all values
       ↓
tailwind.config.ts  ← imports tokens.json, exposes as theme
       ↓
globals.css         ← exposes tokens as CSS variables for runtime
       ↓
Components          ← use ONLY Tailwind classes or var() references
```

### What this means in practice

```tsx
// ❌ FORBIDDEN — hardcoded value
<button style={{ background: '#0066CC' }}>Dispatch</button>
<button className="bg-[#0066CC]">Dispatch</button>

// ✅ REQUIRED — token reference
<button className="bg-brand">Dispatch</button>
```

```tsx
// ❌ FORBIDDEN — hardcoded font
<h1 style={{ fontFamily: 'DM Sans' }}>Command the fleet</h1>

// ✅ REQUIRED — token reference
<h1 className="font-display">Command the fleet</h1>
```

To change the brand blue across the entire product and website, you edit one value in `brand/tokens.json`. That's it. See §10.

---

## 3. Color tokens

Default ratio across every surface: **85% neutrals · 15% brand blue.** Never invert it.

### Neutrals (11 steps)

| Token | Tailwind class | Hex | Use |
|-------|----------------|-----|-----|
| `n000` | `bg-n000` / `text-n000` | `#FFFFFF` | Reserved. Print only. |
| `n050` | `bg-bone` | `#F5F5F7` | **Default page surface.** |
| `n100` | `bg-mist` | `#E8E8ED` | Subtle surface variation. |
| `n200` | `border-fog` | `#D2D2D7` | Dividers, hairlines, borders. |
| `n300` | `text-quiet` | `#AEAEB2` | Disabled state, tertiary text. |
| `n400` | `text-silver` | `#86868B` | Secondary metadata. |
| `n500` | `text-graphite` | `#6E6E73` | Body supporting role. |
| `n600` | `text-iron` | `#48484A` | Strong supporting text. |
| `n700` | `bg-coal` | `#363638` | Dark surfaces. |
| `n800` | `bg-slate` | `#2C2C2E` | Dark surface variant. |
| `n900` | `bg-ink` / `text-ink` | `#1D1D1F` | **Default text on light. Default surface on dark.** |

### Brand blue (9 steps)

| Token | Tailwind class | Hex | Use |
|-------|----------------|-----|-----|
| `b050` | `bg-tint` | `#E5F0FB` | Highlight backgrounds. |
| `b100` | `bg-wash` | `#C9E0F4` | Subtle accent surfaces. |
| `b200` | `bg-sky` | `#8FBEEA` | Decorative only. |
| `b300` | `text-air` | `#5AC8FA` | Active links on dark backgrounds. |
| `b400` | `bg-hover` | `#2D8FE0` | Interactive hover state. |
| `b500` | `bg-brand` / `text-brand` | `#0066CC` | **Core brand. Primary CTAs, links.** |
| `b600` | `bg-deep` | `#003C82` | Pressed state. Dark mode accents. |
| `b700` | `bg-trench` | `#002654` | Dark hero gradient endpoint. |
| `b800` | `bg-abyss` | `#001A3D` | Deepest expression. |

### Semantic states

Color = state. **Always paired with an icon, label, or shape — never color alone.**

| Token | Hex | Meaning | Pairs with |
|-------|-----|---------|------------|
| `success` | `#006B40` | On time. Delivered. | Check icon. |
| `warning` | `#9A4A00` | At risk. Trending late. | Caution icon. |
| `critical` | `#C8102E` | Past window. Escalation. | Alert icon. |
| `info` | `#0066CC` | In transit. Active lane. | Activity icon. |

### Verified contrast pairings (WCAG AA minimum)

| Foreground | Background | Ratio |
|------------|------------|-------|
| `ink` on `bone` | 15.46:1 | AAA |
| `graphite` on `bone` | 9.20:1 | AAA |
| `brand` on `bone` | 5.11:1 | AA |
| `n000` on `brand` | 5.57:1 | AA |
| `air` on `ink` | 8.88:1 | AAA |

If you create a pairing not on this list, verify before shipping.

---

## 4. Typography tokens

Three typefaces. All free on Google Fonts. All loaded via `next/font/google`. **No other fonts anywhere in the codebase.**

### Families

| Token | Tailwind class | Family | Use | Weights |
|-------|----------------|--------|-----|---------|
| `display` | `font-display` | DM Sans | Display + headlines | 400, 500, 600, 700 |
| `sans` | `font-sans` | Inter | Body, UI, reading | 300–700 |
| `mono` | `font-mono` | JetBrains Mono | Data, labels, code | 400, 500, 700 |

### Type scale

| Role | Tailwind class | Size / line | Family |
|------|----------------|-------------|--------|
| Display | `text-display` | 96 / 92 | DM Sans |
| Headline | `text-headline` | 64 / 64 | DM Sans |
| Quote | `text-quote` | 40 / 48 | DM Sans |
| Lead | `text-lead` | 22 / 34 | Inter |
| Body | `text-body` | 16 / 26 | Inter |
| Small | `text-small` | 13 / 20 | Inter |
| Label | `text-label` | 12 / 16 uppercase | JetBrains Mono |
| Data | `text-data` | 14 / 20 | JetBrains Mono |
| Code | `text-code` | 14 / 24 | JetBrains Mono |

### Typography rules

- One Display headline per page. More than one cheapens it.
- Body line length: 60–75 characters. Constrain with `max-w-prose`.
- Numbers in product data ALWAYS use mono. "1,082 mi" is mono. "miles" inside a paragraph is Inter.
- Labels are uppercase mono with `tracking-wide`.

---

## 5. Spacing, radius, motion tokens

### Spacing

Use Tailwind's default scale. Section rules:
- Marketing section vertical padding: `py-24` (96px) min, `py-32` for hero.
- Container max width: `max-w-[1280px]` with `px-6` mobile, `px-12` desktop.
- Card padding: `p-6` default, `p-8` for hero cards.
- Hairline divider: `border-t border-fog` — 1px Fog only.

### Corner radius

**Default: 0.** We move freight, not pillows.

| Token | Tailwind class | Value | Use |
|-------|----------------|-------|-----|
| `radius-none` | `rounded-none` | 0 | **Default — everything.** |
| `radius-input` | `rounded-input` | 4px | Form inputs only. |
| `radius-full` | `rounded-full` | 9999px | Avatar component only. |

No other radius tokens exist. If you need a different value, you're wrong.

### Motion

**Motion carries meaning.** We don't decorate with motion — we use it to tell the user what just happened.

| Token | Tailwind / CSS | Value | Use |
|-------|----------------|-------|-----|
| `ease-brand` | `ease-[var(--ease-brand)]` | `cubic-bezier(0.22, 1, 0.36, 1)` | All transitions. |
| `duration-fast` | `duration-fast` | 120ms | State changes. |
| `duration-medium` | `duration-medium` | 240ms | Navigation, modals. |
| `duration-slow` | `duration-slow` | 480ms | First reveals only. |
| `scale-hover-max` | — | 1.04 | Hover scale ceiling. |

Motion rules:
- Movement decelerates into rest. Nothing bounces. Nothing snaps.
- Hover states grow imperceptibly. Max scale 1.04.
- Numbers tick into place. Charts redraw, never wipe.
- Errors: red text + red rule. Never shake, flash, strobe (drivers may be moving).
- Always respect `prefers-reduced-motion`.

---

## 6. Component rules

Every component cites this file at the top:
```tsx
/**
 * Button — primary interactive element.
 * UX reference: UX_GUIDELINES.md §6 Components, §3 Color, §4 Typography
 */
```

### Universal rules

| Rule | Value |
|------|-------|
| Default radius | 0 |
| Default border | 1px Fog |
| Default surface | Bone |
| Default text | Ink |
| Touch target min (web) | 44pt |
| Touch target min (driver app) | 56pt — gloves baseline |
| Focus ring | 2px Brand, offset 2px |
| Disabled | 0.4 opacity on text, full color background |

### Buttons

| Variant | Background | Text | Use |
|---------|------------|------|-----|
| Primary | `bg-brand` | `text-n000` | Single highest-priority action per view. |
| Secondary | `bg-ink` | `text-n000` | Second-priority action. |
| Ghost | transparent | `text-ink` | Tertiary, cancels. 1px Fog border. |
| Destructive | `bg-critical` | `text-n000` | Irreversible only. |
| Link | transparent | `text-brand` | Inline nav. Underlined. |

Sizes: `sm` (32px), `md` (40px), `lg` (48px), `xl` (56px — driver app).

States: hover shifts ramp one step (`bg-brand` → `bg-hover`). Pressed shifts deeper (`bg-brand` → `bg-deep`). Loading replaces text with mono spinner, preserves width. No icon-only buttons in marketing.

**One Primary button per view. Always.**

### Cards

| Property | Value |
|----------|-------|
| Surface | `bg-bone` light · `bg-coal` dark |
| Border | `border border-fog` light · `border-slate` dark |
| Radius | 0 |
| Padding | `p-6` default, `p-8` hero |
| Shadow | None — hairline only |
| Hover (interactive) | Border shifts to `border-brand`. No lift. |

### Icons

| Property | Value |
|----------|-------|
| Grid | 48×48 |
| Stroke | 1.6px |
| Caps | square |
| Joins | miter |
| Corners | 0 radius |
| Color | `currentColor` |

Build a custom icon set or wrap third-party icons in `<IconStroke>` to enforce the rules. Do not use Lucide/Heroicons at default settings.

### Forms

| Property | Value |
|----------|-------|
| Height | 40px web, 48px driver app |
| Surface | `bg-n000` light, `bg-ink` dark |
| Border | `border-fog`, focus `border-brand` 2px, error `border-critical` 2px |
| Radius | **4px (the one approved exception)** |
| Label | Mono uppercase 12/16, above input, 4px gap |

Labels always visible. No placeholder-as-label. Validate on blur.

### Tables

| Property | Value |
|----------|-------|
| Header | Mono uppercase 12/16, Graphite, `border-b border-fog` |
| Row height | 48px dense, 56px default |
| Row divider | 1px Fog. No zebra stripes. |
| Numerical cells | `font-mono text-right` |
| Status cells | Pill component, never bare colored text |
| Hover row | `bg-mist` |

### Status pills

| Property | Value |
|----------|-------|
| Height | 24px |
| Padding | `px-2 py-0.5` |
| Radius | 0 |
| Border | 1px in semantic color |
| Background | 10% tint of semantic color |
| Text | Mono 12/16 uppercase in semantic color |
| Icon | **Required.** Color alone is forbidden. |

### Modals

Backdrop Ink at 60% opacity. Surface Bone. Radius 0. Max width 560px (default) / 800px (data-dense). Fade + 8px upward slide, 240ms cubic-out. Close affordance is "Close" link top-right (Mono uppercase) — not an X icon.

### Component file structure

```
src/components/ui/Button/
├── Button.tsx
├── Button.test.tsx
└── index.ts
```

Every component: typed props with sensible defaults, `data-testid` hook, header comment citing this file.

---

## 7. Voice & tone

### Four principles

- **Precise.** Numbers first. No adjectives where a metric will do.
- **Direct.** Short sentences. Active voice. No filler.
- **Informed.** We know detention from layover. We don't explain industry basics.
- **Assured.** Confident without swagger. Helpful without handholding.

### The forbidden word

**"Platform."** Never. Use "operations," "system," "software."

### Forbidden words and phrases

These appear in every generic SaaS site. None appear in DriveCommand:

platform · empower / empowering · next-gen · world-class · best-in-class · robust · seamless · cutting-edge · leverage (verb) · solutions (standalone) · transform · revolutionize · unlock (verb) · supercharge · game-changer · delight (verb) · value at scale

### Say this · Not that

| Yes | No |
|-----|----|
| Dispatch a load in 40 seconds. | Empower dispatchers with next-gen load optimization. |
| 1,082 miles, on-time. | Delivering value at scale across the nation. |
| The driver logged 8 hrs, 12 min. | Robust HOS visibility for the modern carrier. |
| Every load. Every driver. Every mile. | World-class end-to-end solutions you can trust. |

### Voice by surface

**Hero copy:** One assertion at Display scale. One supporting Lead sentence. One CTA.

**Feature description:** One sentence on what it does. One on why it matters. Numbers if available.

**Errors:** Plain language. What happened. What to do. No apology theater. "Driver out of HOS. Reassign or extend the load." — not "Oops! Something went wrong."

**Empty states:** Tell the user what they would see, and how to get there.

**Buttons:** Verb in the button. "Dispatch load," not "Click to dispatch."

### Punctuation

- Em dashes (—) for breaks.
- Middle dot ( · ) for data field separators: "ATL → HOU · 798 mi · ON-TIME"
- Arrows (→) for direction.
- Numerals for all quantities.
- No exclamation points in product copy.
- No emoji in product or marketing copy.
- Sentence case for headlines and buttons. Not Title Case.

### Test before shipping

1. Could a dispatcher say this on a phone call?
2. Did I use a number where I could?
3. Did I cut every adjective not carrying weight?
4. Is the verb in the first three words?
5. Does it still work if I delete the first sentence?

If two or more answers are no, rewrite.

### Brand promise

> **Miles ahead.**

Two words. Every line of copy is downstream of them.

---

## 8. Page composition & conversion architecture

### The customer journey we're designing for

1. Dispatcher or ops VP lands on the marketing site.
2. Within 4 seconds they understand what DriveCommand is and who it's for.
3. They scroll through proof — real numbers, product screenshots, customer language.
4. They convert: book a demo, start trial, contact sales.
5. They sign in. The product feels like the same brand. Same type, color, voice, restraint.

### Conversion rules

- **One Primary CTA per view. Always.**
- The Primary on every marketing page is **"Book a demo"** — never "Learn more," "Get started," "Sign up free."
- Secondary actions are Ghost buttons. Visible but visually subordinate.
- "Sign in" in the nav is a Ghost link, not a button.
- Every section earns its scroll real estate or gets cut.
- Demo form: name, work email, company, fleet size. No phone number until qualified.

### Marketing home page — the deliberate scroll

1. **Nav** — 64px Bone surface. Logo left. Three links center (Product, Pricing, Customers). Primary "Book a demo" right. "Sign in" ghost link.
2. **Hero** — Display headline ("Command the fleet."). Lead subhead naming audience and promise. Mono KPI row ("LOAD-48216 · CHI → DAL · 1,082 mi · ON-TIME"). Primary "Book a demo" + Ghost "See the product." No cartoon dashboard illustration.
3. **Logo strip** — "Trusted by carriers moving X loads per day across Y states." Six logos in Silver at 60% opacity. Mark `// BRAND-LOGO-NEEDED:`.
4. **The problem** — Headline-scale dispatcher pain. Lead paragraph names the cost. Mono data row shows friction in numbers.
5. **The product, in three moves** — Three sections, alternating image/text positions. Each: Eyebrow ("§ DISPATCH"), Headline claim, Lead paragraph, Body with one specific feature, inline link to product page. Each shows real product screenshot — `// BRAND-IMAGE-NEEDED:`.
6. **Metrics that matter** — Full-bleed Ink section with brand-blue accent. Four KPIs in JetBrains Mono Display scale, captions in Inter Lead. Numbers tick on scroll-into-view.
7. **Customer quote** — Quote-scale (40/48) testimonial in DM Sans. Attribution in Mono Small. One quote, not three.
8. **Comparison** — Us vs. "Spreadsheets + 7 tabs" table. Stroked check/X icons in semantic colors. End with one short reinforcing sentence.
9. **Pricing teaser** — Three tier names in Mono uppercase. One-line descriptions. Mono price. Primary "See full pricing" link.
10. **Closing CTA** — Display single sentence ("Dispatch your first load this week."). Lead subhead. Primary "Book a demo" + Ghost "Talk to sales." No newsletter signup.
11. **Footer** — Three columns Mono uppercase Small. Copyright in Mono. Single fine-print line.

### Subpages

Reuse home-page sections. The goal is a coherent system, not eleven bespoke layouts.

- **`/product`** — Deep-dives the three product moves. Same compositional language.
- **`/pricing`** — Three tier Cards with hairline borders, Mono prices, prose feature lists.
- **`/customers`** — Three case studies in long-form. Each: pull quote + paragraph + metric.
- **`/about`** — Short. Founders, the why, one photograph, "Miles ahead." at Display.
- **`/demo`** — Four-field form. Brand voice. Single Primary submit.

---

## 9. Imagery rules

**Documentary, not stock.** Real yards, real drivers, real shifts.

| Do | Don't |
|----|-------|
| Real drivers, real yards | Glossy corporate stock |
| Wide, documentary framing | Over-saturated sunsets |
| Desaturated, natural light | Isolated-on-white crops |
| Dust, weather, grit | Cliché "businessman" shots |

Specs: 35mm look, f/4, ASA 400 grain. Wide horizons. Subject in context. Natural overcast or golden hour.

**Never generate or invent imagery.** Mark every image with:

```tsx
// BRAND-IMAGE-NEEDED: 16:10, Class 8 tractor at dawn, North Platte yard
<Image src="..." alt="..." />
```

Every `BRAND-IMAGE-NEEDED:` becomes a shot list for real photography commissioned later.

---

## 10. How to change a brand color

This is the test of the whole system. Changing the brand blue across both apps and every component:

### Step 1
Open `brand/tokens.json`. Find:
```json
"brand": {
  "b500": "#0066CC"
}
```

### Step 2
Change `#0066CC` to your new value.

### Step 3
Save. Run `npm run dev` in either app.

### Done.

Every Primary button, every link, every hover state, every focus ring, every brand accent in dark hero sections — all updated. Across both apps. Across every component.

If a single component requires a code change to pick up the new color, that component is broken. Fix the component to read from the token instead.

### What this means architecturally

- `brand/tokens.json` is imported by both `apps/marketing/tailwind.config.ts` and `apps/web/tailwind.config.ts`.
- Tailwind exposes those values as utility classes (`bg-brand`, `text-brand`, `border-brand`).
- `globals.css` also exposes them as CSS variables (`var(--color-brand)`) for runtime use in inline styles and motion libraries.
- Components reference tokens only. Never hex. Never hardcoded font names. Never magic numbers for spacing.

### Same applies to fonts

To swap DM Sans for a different display font:
1. Edit `font.family.display` in `brand/tokens.json`.
2. Update the `next/font/google` import in both `layout.tsx` files (the only place a font name appears outside the token).
3. Done.

### Same applies to motion

To change the brand easing curve:
1. Edit `motion.easing` in `brand/tokens.json`.
2. Done. Every transition in both apps picks it up.

---

## 11. What we never do

- Rounded card corners (radius 0 default).
- Drop shadows on cards or buttons (hairline borders only).
- Gradients except the approved Ink → Trench in dark hero sections.
- The word "platform" in customer-facing copy.
- Forbidden words from §7.
- Emojis in any rendered UI.
- Stock photography of "happy business people."
- AI-generated hero images.
- Confetti, bounce animations, shake on error, flashing or strobing.
- Rounded icons or icons at default Lucide/Heroicons stroke weight.
- Multiple Primary buttons on one view.
- Hex values, font names, or magic spacing numbers in component code.
- Skeumorphic illustrations.
- Toast notifications that bounce in.
- Newsletter signup as a primary marketing CTA.
- Title Case Headlines.
- Exclamation points in product copy.
- Avatars with status dots.
- Fade-in-on-scroll for every section.

---

> **Miles ahead.**
