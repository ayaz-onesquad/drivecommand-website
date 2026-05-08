---
phase: quick-8
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - package.json
  - src/components/sections/why-drivecommand-scroll.tsx
autonomous: true
must_haves:
  truths:
    - "GSAP and @gsap/react dependencies are installed"
    - "WhyDriveCommandScroll component renders 5 branded panels"
    - "Scroll-pinned rotation animation works on supported browsers"
    - "Reduced motion users see static stacked panels"
    - "Section has id='why-drivecommand' for anchor navigation"
  artifacts:
    - path: "src/components/sections/why-drivecommand-scroll.tsx"
      provides: "5-panel scroll-pinned section component"
      exports: ["WhyDriveCommandScroll", "FlowSection", "FlowArt"]
    - path: "package.json"
      provides: "GSAP dependencies"
      contains: "gsap"
  key_links:
    - from: "src/components/sections/why-drivecommand-scroll.tsx"
      to: "@/lib/utils"
      via: "cn() import"
      pattern: "import.*cn.*from.*@/lib/utils"
---

<objective>
Add GSAP scroll dependencies and create a 5-panel scroll-pinned "Why DriveCommand" section component.

Purpose: Create an engaging scroll-based storytelling section that highlights DriveCommand's value propositions using the 21st.dev FlowArt/story-scroll pattern adapted to DriveCommand brand.

Output: Working WhyDriveCommandScroll component with GSAP animations, branded content, and accessibility fallback.
</objective>

<execution_context>
@/Users/ayazmohammed/.claude/get-shit-done/workflows/execute-plan.md
@/Users/ayazmohammed/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@src/lib/utils.ts (cn utility)
@package.json (current dependencies)
@src/components/sections/features-grid.tsx (existing section pattern)
@tailwind.config.ts (font utilities: font-display, font-body, font-mono)
</context>

<tasks>

<task type="auto">
  <name>Task 1: Install GSAP dependencies</name>
  <files>package.json</files>
  <action>
Run from project root:
```bash
npm install gsap @gsap/react
```

This adds:
- `gsap` - Core GSAP animation library with ScrollTrigger plugin
- `@gsap/react` - React hooks for GSAP (useGSAP)

Do NOT modify any other dependencies. Do NOT add any Tailwind v4 imports.
  </action>
  <verify>
Run `npm ls gsap @gsap/react` to confirm both packages installed.
Check package.json contains both in dependencies.
  </verify>
  <done>package.json has gsap and @gsap/react in dependencies section</done>
</task>

<task type="auto">
  <name>Task 2: Create WhyDriveCommandScroll component</name>
  <files>src/components/sections/why-drivecommand-scroll.tsx</files>
  <action>
Create a new file at `src/components/sections/why-drivecommand-scroll.tsx` with:

1. **Directive**: `'use client'` at top (required for GSAP/ScrollTrigger)

2. **Imports**:
   - `useRef, useEffect, useState` from 'react'
   - `gsap` from 'gsap'
   - `ScrollTrigger` from 'gsap/ScrollTrigger'
   - `useGSAP` from '@gsap/react'
   - `cn` from '@/lib/utils'

3. **Register plugin**: `gsap.registerPlugin(ScrollTrigger)`

4. **Type definitions** (TypeScript strict):
   - `FlowSectionProps`: children, className
   - `FlowArtProps`: children, className
   - `PanelProps`: bg, text, divider, eyebrow, headline, body, children (optional), className

5. **FlowSection component**: Simple wrapper div with className merge

6. **FlowArt component**:
   - Root `<section id="why-drivecommand">` with full 5-panel content
   - Check `matchMedia('(prefers-reduced-motion: reduce)').matches` on mount
   - If reduced motion: render panels stacked normally (no GSAP)
   - If normal motion: use useGSAP hook with ScrollTrigger to:
     - Pin each panel
     - Rotate next panel from 30deg to 0deg as it scrolls over previous
     - Use scrub: true for smooth scroll-linked animation
   - Keep the exact GSAP animation math from 21st.dev source

7. **Panel content** (5 panels with exact copy from requirements):

   **Panel 01 — The carrier truth**
   - Style: bg #1D1D1F, text #F5F5F7, divider rgba(245,245,247,0.2)
   - Eyebrow: "01 — THE CARRIER TRUTH"
   - Headline: "Built / For The / Road." (each line on own line, separated by <br/>)
   - Body: "Dispatchers juggle seventeen tabs. Drivers chase paperwork. Owner-operators reconcile spreadsheets at midnight. DriveCommand is the operating system that ends all of that — built by people who've actually moved freight."

   **Panel 02 — One platform**
   - Style: bg #0066CC, text #FFFFFF, divider rgba(255,255,255,0.4)
   - Eyebrow: "02 — ONE PLATFORM"
   - Headline: "Replace / Five Tools / With One."
   - Body: "Stop paying for separate dispatch, GPS, payroll, invoicing, and compliance tools. DriveCommand collapses them into one surface — loads, lanes, drivers, hours, settlements — so decisions happen in seconds, not minutes."
   - 3 sub-cards (grid layout):
     - "DISPATCH" / "Drag-and-drop loads onto drivers in real time. Status, miles, ETA — all live."
     - "SETTLEMENTS" / "Pay drivers correctly the first time. Per-mile, percentage, or hybrid — all automated."
     - "COMPLIANCE" / "HOS, DOT, IFTA, and FMCSA logs — generated from data you already have."

   **Panel 03 — Transparent pricing**
   - Style: bg #F5F5F7, text #1D1D1F, divider rgba(29,29,31,0.2)
   - Eyebrow: "03 — TRANSPARENT PRICING"
   - Headline: "No / Sales Calls / Required."
   - Body: "Per-truck pricing. Visible on the page. Calculator on the home page. Cancel any month. We don't hide pricing because we don't need to."
   - 3 sub-cards:
     - "PER-TRUCK" / "Pay only for active trucks. Scale up in busy season, down in quiet months. No seat charges."
     - "NO LOCK-IN" / "Month-to-month by default. Annual discount available, never required."
     - "EVERY FEATURE" / "Same product across every tier. We don't gate compliance behind enterprise plans."

   **Panel 04 — Compliance built in**
   - Style: bg #003C82, text #E5F0FB, divider rgba(229,240,251,0.3)
   - Eyebrow: "04 — COMPLIANCE, AUTOMATED"
   - Headline: "DOT-Ready. / IFTA-Ready. / Audit-Ready."
   - Body: "Compliance isn't a feature we tacked on — it's how the platform was built. HOS violations flagged before they happen. IFTA filed from the data you're already capturing. Audit packages generated in one click."
   - 3 stat cards (different layout - big number + label):
     - "99.7%" / "HOS compliance rate across customer fleets in the last 12 months."
     - "0" / "Manual IFTA filings required. We file from the GPS data you're already capturing."
     - "1-CLICK" / "DOT audit packages. Past 6 months of logs, in seconds."

   **Panel 05 — Built for SMB**
   - Style: bg #1D1D1F, text #FFFFFF, accent #0066CC for "Carriers" word only
   - Eyebrow: "05 — BUILT FOR YOU"
   - Headline: "For Carriers / Running 1 To 25 / Trucks." — wrap "Carriers" in span with color #0066CC
   - Body: "Samsara built for 500-truck fleets. Motive built for ELD compliance. We built DriveCommand for the operators they ignore — owner-ops, family carriers, growing fleets. Start a 14-day trial. No credit card. No demo gate."
   - CTA button: "Start free trial →" linking to https://app.drivecommand.com/sign-up
     - Style: bg #0066CC, text white, hover bg #2D8FE0
   - Secondary link: "Or talk to a human →" linking to /contact
     - Style: text #5AC8FA

8. **Typography classes** (apply to all panels):
   - Eyebrow: `font-mono text-xs font-medium uppercase tracking-[0.2em]`
   - Headline: `font-display text-[clamp(3.5rem,12vw,14rem)] font-bold leading-[0.85] uppercase tracking-tight`
   - Body: `font-body text-[clamp(1rem,2.5vw,1.75rem)] font-normal leading-relaxed max-w-[50ch]`
   - Sub-card label: `font-mono text-xs font-semibold uppercase tracking-wider`
   - Sub-card body: `font-body text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75`
   - Stat number: `font-mono text-[clamp(3rem,6vw,5rem)] font-bold leading-none`

9. **Exports**:
   - Named: `WhyDriveCommandScroll`, `FlowSection`, `FlowArt`
   - Default: `WhyDriveCommandScroll`

**Color constraints** - ONLY use these hex values:
- #1D1D1F (Ink)
- #F5F5F7 (Bone)
- #FFFFFF (Paper)
- #0066CC (Brand Blue)
- #003C82 (Deep Navy)
- #E5F0FB (Tint)
- #2D8FE0 (B400 Hover)
- #5AC8FA (Air)
  </action>
  <verify>
1. `npx tsc --noEmit` - zero TypeScript errors
2. Verify file exports WhyDriveCommandScroll as default and named
3. Verify section has `id="why-drivecommand"`
4. Verify reduced-motion check exists
5. Grep for raw Tailwind colors (amber, emerald, red, etc.) - should find none
  </verify>
  <done>
- Component file exists at src/components/sections/why-drivecommand-scroll.tsx
- TypeScript compiles without errors
- All 5 panels have correct content and brand colors
- FlowSection, FlowArt, WhyDriveCommandScroll exported
- Section has id="why-drivecommand"
- Reduced-motion fallback renders static panels
  </done>
</task>

<task type="auto">
  <name>Task 3: Verify build and integration readiness</name>
  <files>src/components/sections/why-drivecommand-scroll.tsx</files>
  <action>
Run verification commands to ensure component is ready for integration:

1. Run `npm run build` to verify production build succeeds
2. Verify no console warnings/errors during build related to the new component
3. Confirm the component can be imported without errors:
   ```bash
   echo "import { WhyDriveCommandScroll } from '@/components/sections/why-drivecommand-scroll'" | npx tsc --noEmit --allowJs --esModuleInterop --resolveJsonModule --moduleResolution node --target esnext --jsx react-jsx --skipLibCheck --baseUrl ./src --paths '{"@/*":["*"]}' -
   ```

Note: Do NOT modify page.tsx - that's handled in Prompt 2.
  </action>
  <verify>
- `npm run build` exits with code 0
- No TypeScript errors
- No ESLint errors related to the new component
  </verify>
  <done>
- Production build succeeds
- Component ready for integration into page.tsx (Prompt 2)
  </done>
</task>

</tasks>

<verification>
After all tasks complete:
1. `npm ls gsap @gsap/react` shows both packages
2. `npx tsc --noEmit` passes
3. `npm run build` succeeds
4. File exists: src/components/sections/why-drivecommand-scroll.tsx
5. Grep for `id="why-drivecommand"` in the component file returns match
6. Grep for `prefers-reduced-motion` in the component file returns match
</verification>

<success_criteria>
- gsap and @gsap/react installed in package.json
- WhyDriveCommandScroll component created with all 5 panels
- TypeScript strict mode passes
- Production build succeeds
- Component exports WhyDriveCommandScroll (named + default), FlowSection, FlowArt
- Section has id="why-drivecommand" for anchor nav
- Reduced-motion users get static fallback
- No hardcoded colors outside the approved brand palette
</success_criteria>

<output>
After completion, create `.planning/quick/8-add-gsap-scroll-dependencies-and-whydriv/8-SUMMARY.md`
</output>
