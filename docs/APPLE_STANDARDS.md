# Apple Design Standards Reference

This document codifies design principles derived from Apple's Human Interface Guidelines (HIG) and Apple.com website patterns. All DriveCommand components should follow these standards for consistency, accessibility, and polish.

---

## Typography Hierarchy

Based on Apple's SF Pro system and website patterns.

| Level | Size (Desktop) | Size (Mobile) | Weight | Line Height | Use Case |
|-------|---------------|---------------|--------|-------------|----------|
| Display | 96px | 56px | Bold (700) | 0.96 | Hero headlines only |
| H1 | 56px | 40px | Semibold (600) | 1.07 | Page titles |
| H2 | 48px | 32px | Semibold (600) | 1.08 | Section headers |
| H3 | 32px | 24px | Semibold (600) | 1.125 | Card titles, subsections |
| Body Large | 21px | 19px | Regular (400) | 1.48 | Lead paragraphs |
| Body | 17px | 17px | Regular (400) | 1.47 | Standard body text |
| Caption | 12px | 12px | Regular (400) | 1.33 | Metadata, labels |

### Typography Rules

1. **Headlines**: Use `font-display` (DM Sans). Bold weight. Tight tracking (-0.02em).
2. **Body**: Use `font-body` (Inter). Regular weight. Relaxed line-height.
3. **Data/Labels**: Use `font-mono` (JetBrains Mono). Use tabular figures for numbers.
4. **Responsive scaling**: Use `clamp()` for fluid typography between breakpoints.
5. **Max line width**: Body text should not exceed 65-70 characters (45-50ch optimal).

---

## Spacing System

Base unit: 4px. All spacing should be multiples of 4.

| Token | Value | Use Case |
|-------|-------|----------|
| `space-1` | 4px | Tight gaps, icon padding |
| `space-2` | 8px | Inner padding, small gaps |
| `space-3` | 12px | List item spacing |
| `space-4` | 16px | Standard element gaps |
| `space-6` | 24px | Card padding, section gaps |
| `space-8` | 32px | Large gaps |
| `space-12` | 48px | Section separation (mobile) |
| `space-16` | 64px | Section separation |
| `space-20` | 80px | Section padding (desktop) |
| `space-24` | 96px | Hero/major section padding |

### Section Padding

- **Desktop**: 80-96px vertical padding
- **Tablet**: 64px vertical padding
- **Mobile**: 48px vertical padding

### Container Widths

- **Max width**: 1280px (`max-w-7xl`)
- **Content width**: 768px for readable text blocks
- **Horizontal padding**: 16px mobile, 24px tablet, 32px desktop

---

## Corner Radii

Apple uses consistent, meaningful corner radii.

| Token | Value | Use Case |
|-------|-------|----------|
| `rounded-sm` | 6px | Small elements, tags |
| `rounded-md` | 8px | Buttons, small cards |
| `rounded-lg` | 12px | Standard cards, inputs |
| `rounded-xl` | 18px | Large cards, modals |
| `rounded-2xl` | 24px | Hero cards, featured content |
| `rounded-full` | 9999px | Pills, avatars, icons |

### Rules

1. **Consistency**: Use the same radius for related elements.
2. **Nesting**: Inner elements should have smaller radii than their containers.
3. **Buttons**: 8-12px radius standard.
4. **Cards**: 12-18px radius standard.

---

## Color & Contrast

### Contrast Requirements (WCAG)

| Context | Minimum Ratio | Target |
|---------|--------------|--------|
| Body text on background | 4.5:1 | 7:1 (AAA) |
| Large text (24px+) | 3:1 | 4.5:1 |
| Interactive elements | 3:1 | 4.5:1 |
| Focus indicators | 3:1 | - |

### Light Mode

- **Background**: Pure white (#FFFFFF) primary, subtle gray (#F5F5F7) for alternating sections
- **Text**: Near-black (#1D1D1F) for maximum contrast
- **Secondary text**: Dark gray (#424245) for supporting content
- **Borders**: Subtle, use rgba(0, 0, 0, 0.06-0.12)

### Dark Mode

- **Background**: Soft black (#1D1D1F), not pure black
- **Text**: Off-white (#F5F5F7) for readability
- **Secondary text**: Gray (#AEAEB2)
- **Borders**: Subtle, use rgba(255, 255, 255, 0.06-0.12)

### Accent Colors

- **Primary action**: Brand Blue (#0066CC / #0071E3)
- **Dark mode accent**: Brighter blue (#5AC8FA) for contrast
- **Success**: Green with sufficient contrast on both modes
- **Warning**: Amber, avoid pure yellow (low contrast)
- **Error**: Red, ensure readability

---

## Animation Principles

### Bold & Dynamic Style (DriveCommand preference)

| Type | Duration | Easing | Distance |
|------|----------|--------|----------|
| Scroll reveal | 600-800ms | cubic-bezier(0.16, 1, 0.3, 1) | 40-60px |
| Count-up | 1200-1500ms | ease-out-expo | - |
| Hover | 200-300ms | ease-out | 2-8px lift |
| Stagger delay | 100-150ms | - | - |
| Scale | 0.95 → 1.0 | cubic-bezier(0.16, 1, 0.3, 1) | - |

### Core Rules

1. **Dramatic ease-out**: `cubic-bezier(0.16, 1, 0.3, 1)` — fast start, smooth deceleration
2. **No bounce**: Never use spring physics that overshoot (Apple rule)
3. **Respect reduced motion**: Always check `prefers-reduced-motion`
4. **Purposeful**: Every animation should communicate or guide
5. **Direction**: Elements should enter from logical directions (bottom-up for lists)

### Implementation

```tsx
// Scroll reveal
<ScrollReveal direction="up" distance={60} duration={0.8} delay={index * 0.12}>

// Count-up
<CountUp end={99.7} suffix="%" duration={1500} />

// Stagger container
<StaggerContainer stagger={0.12}>
  <StaggerItem>Card 1</StaggerItem>
  <StaggerItem>Card 2</StaggerItem>
</StaggerContainer>
```

---

## Shadows & Elevation

Apple uses subtle shadows to create hierarchy without heavy borders.

| Level | Shadow | Use Case |
|-------|--------|----------|
| Flat | None | Default state |
| Elevated | `0 2px 8px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)` | Cards at rest |
| Hover | `0 8px 24px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.06)` | Card hover |
| Modal | `0 24px 48px rgba(0,0,0,0.16)` | Modals, dialogs |

### Rules

1. **Subtle by default**: Shadows should be barely visible at rest
2. **Increase on interaction**: Hovering/focusing increases shadow depth
3. **Dark mode**: Shadows are less effective; rely more on borders and glow
4. **Glow for brand**: Use colored shadows (brand blue) for accent elements

---

## Interactive States

### Buttons

| State | Transform | Shadow | Opacity |
|-------|-----------|--------|---------|
| Rest | none | base | 1 |
| Hover | translateY(-2px) | elevated | 1 |
| Active/Tap | scale(0.97) | reduced | 1 |
| Disabled | none | none | 0.5 |
| Focus | none | ring | 1 |

### Cards

| State | Transform | Shadow |
|-------|-----------|--------|
| Rest | none | elevated |
| Hover | translateY(-4px) to (-8px), scale(1.01-1.02) | hover |

### Links

| State | Style |
|-------|-------|
| Rest | brand color, no underline |
| Hover | slightly darker, underline appears |
| Active | darker still |
| Visited | optional different color |

---

## Accessibility Checklist

1. **Color contrast**: 4.5:1 minimum for text, 3:1 for large text
2. **Focus indicators**: Visible focus rings on all interactive elements
3. **Reduced motion**: All animations respect `prefers-reduced-motion`
4. **Touch targets**: Minimum 44x44px for mobile
5. **Alt text**: All images have descriptive alt text
6. **Semantic HTML**: Use proper heading hierarchy, landmarks, and ARIA
7. **Keyboard navigation**: All interactive elements keyboard accessible

---

## Component Patterns

### Cards

```
┌─────────────────────────────┐
│  [Icon]                     │  ← 24px icon, muted color
│                             │
│  Title                      │  ← H3, primary text
│                             │
│  Description text that      │  ← Body, secondary text
│  spans multiple lines       │
│                             │
│  [Action →]                 │  ← Link, accent color
└─────────────────────────────┘
   ↑ 24px padding, 12-18px radius
```

### Sections

```
┌─────────────────────────────────────────────┐
│                                             │
│  [EYEBROW]                                  │  ← Mono, small, accent
│                                             │
│  Section Headline                           │  ← H2, bold
│                                             │
│  Supporting text that provides              │  ← Body large, secondary
│  context for the section content.           │
│                                             │
│  ┌─────┐ ┌─────┐ ┌─────┐                   │  ← Cards grid
│  │     │ │     │ │     │                   │
│  └─────┘ └─────┘ └─────┘                   │
│                                             │
└─────────────────────────────────────────────┘
   ↑ 80-96px vertical padding
```

---

## Quick Reference

### Tailwind Classes

```tsx
// Typography
className="font-display text-3xl font-bold"  // H2
className="font-body text-lg text-theme-secondary"  // Body

// Spacing
className="py-20 lg:py-24"  // Section padding
className="px-6 lg:px-8"  // Container padding
className="space-y-6"  // Vertical stack

// Cards
className="rounded-xl p-6 bg-theme-card border border-theme-subtle shadow-sm hover:shadow-lg transition-all duration-300"

// Buttons
className="rounded-lg px-6 py-3 bg-dc-accent text-dc-text-on-accent font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
```

### CSS Variables

```css
/* Use semantic tokens */
var(--text-primary)
var(--text-secondary)
var(--surface-base)
var(--surface-elevated)
var(--accent-brand)
var(--border-divider)

/* Avoid raw values */
/* Bad: color: #1D1D1F */
/* Good: color: var(--text-primary) */
```

---

## Changelog

- **v1.0 (May 2026)**: Initial standards document
  - Typography hierarchy from Apple HIG
  - Spacing system (4px base)
  - Animation guidelines (bold & dynamic style)
  - Accessibility checklist
