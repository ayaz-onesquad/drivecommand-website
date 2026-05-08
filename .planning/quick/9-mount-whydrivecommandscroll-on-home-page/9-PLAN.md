---
phase: quick-9
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/app/page.tsx
  - src/components/layout/navbar.tsx
  - src/components/layout/mobile-menu.tsx
autonomous: true
must_haves:
  truths:
    - "WhyDriveCommandScroll renders between FeaturesGrid and DemoVideo on the home page"
    - "Navbar shows 'Why us' link between Features and Pricing"
    - "Mobile menu shows 'Why us' link between Features and Pricing"
    - "Clicking 'Why us' scrolls to #why-drivecommand section with heading visible"
  artifacts:
    - path: "src/app/page.tsx"
      provides: "WhyDriveCommandScroll mounted in correct position"
      contains: "WhyDriveCommandScroll"
    - path: "src/components/layout/navbar.tsx"
      provides: "Why us nav link"
      contains: "#why-drivecommand"
    - path: "src/components/layout/mobile-menu.tsx"
      provides: "Why us mobile nav link"
      contains: "#why-drivecommand"
  key_links:
    - from: "navbar.tsx"
      to: "why-drivecommand-scroll.tsx"
      via: "anchor link #why-drivecommand"
      pattern: "href.*#why-drivecommand"
---

<objective>
Mount WhyDriveCommandScroll on the marketing home page and add navigation links.

Purpose: Complete integration of the 5-panel scroll section built in quick-8 so users can discover and navigate to it.
Output: Home page displays WhyDriveCommandScroll between Features Grid and Demo Video; navbar and mobile menu include "Why us" anchor link.
</objective>

<execution_context>
@/Users/ayazmohammed/.claude/get-shit-done/workflows/execute-plan.md
@/Users/ayazmohammed/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@src/app/page.tsx
@src/components/layout/navbar.tsx
@src/components/layout/mobile-menu.tsx
@src/components/sections/why-drivecommand-scroll.tsx
</context>

<tasks>

<task type="auto">
  <name>Task 1: Mount WhyDriveCommandScroll on home page</name>
  <files>src/app/page.tsx</files>
  <action>
1. Add import for WhyDriveCommandScroll at the top of the file, after the barrel import from '@/components/sections':
   ```tsx
   import { WhyDriveCommandScroll } from '@/components/sections/why-drivecommand-scroll'
   ```

2. In the JSX return, insert `<WhyDriveCommandScroll />` between `<FeaturesGrid />` and `<DemoVideo />`:
   ```tsx
   <FeaturesGrid />
   <WhyDriveCommandScroll />
   <DemoVideo />
   ```

DO NOT:
- Wrap the component in any container, section, or padding div
- Change the order of any other sections
- Add motion wrappers or extra styling
  </action>
  <verify>Run `npx tsc --noEmit` - zero TypeScript errors</verify>
  <done>WhyDriveCommandScroll renders between FeaturesGrid and DemoVideo with no wrapper</done>
</task>

<task type="auto">
  <name>Task 2: Add "Why us" link to navbar and mobile menu</name>
  <files>src/components/layout/navbar.tsx, src/components/layout/mobile-menu.tsx</files>
  <action>
DISCOVERY: mobile-menu.tsx has its OWN copy of NAV_LINKS (does NOT import from navbar.tsx). Both files must be updated.

1. In navbar.tsx, find the NAV_LINKS array (line 12-18). Insert this entry between Features and Pricing:
   ```tsx
   const NAV_LINKS = [
     { href: '/#features', label: 'Features' },
     { href: '#why-drivecommand', label: 'Why us' },  // ADD THIS LINE
     { href: '/pricing', label: 'Pricing' },
     ...
   ]
   ```

2. In mobile-menu.tsx, find the NAV_LINKS array (line 29-35). Insert the same entry between Features and Pricing:
   ```tsx
   const NAV_LINKS = [
     { href: '/#features', label: 'Features' },
     { href: '#why-drivecommand', label: 'Why us' },  // ADD THIS LINE
     { href: '/pricing', label: 'Pricing' },
     ...
   ]
   ```

Note: Use `#why-drivecommand` (not `/#why-drivecommand`) since the section is on the home page and the anchor should work from any page context.
  </action>
  <verify>Run `npm run dev`, click "Why us" in desktop and mobile nav - both scroll to section</verify>
  <done>Both navbar and mobile menu show "Why us" between Features and Pricing, clicking scrolls to section</done>
</task>

<task type="auto">
  <name>Task 3: Verify anchor scroll offset and fix if needed</name>
  <files>src/components/sections/why-drivecommand-scroll.tsx (only if fix needed)</files>
  <action>
1. With dev server running, click "Why us" in the navbar
2. Observe if the section heading is visible or hidden under the fixed navbar (navbar is h-16 = 64px)

IF heading is clipped under navbar:
- Open why-drivecommand-scroll.tsx
- Find the root element (likely a section or div with id="why-drivecommand")
- Add `scroll-mt-16` class to account for navbar height

IF heading is visible:
- No change needed, verify complete

3. Run final verification:
   - `npx tsc --noEmit` passes
   - `npm run dev` starts cleanly
   - Desktop nav "Why us" scrolls correctly
   - Mobile menu "Why us" scrolls correctly
   - No layout shift when scrolling through pinned section
  </action>
  <verify>npx tsc --noEmit passes; npm run dev shows no warnings; clicking Why us shows heading not clipped</verify>
  <done>Anchor scroll lands with section heading fully visible; build and dev server run clean</done>
</task>

</tasks>

<verification>
1. `npx tsc --noEmit` - zero TypeScript errors
2. `npm run dev` - starts cleanly with no warnings
3. Home page renders: Hero > ProblemBar > FeaturesGrid > WhyDriveCommandScroll > DemoVideo > ...
4. Desktop navbar shows: Features | Why us | Pricing | Demo | About | Contact
5. Mobile menu shows same order
6. Clicking "Why us" scrolls smoothly with heading visible (not hidden under navbar)
7. No layout shift or jank when scrolling through the pinned section
</verification>

<success_criteria>
- WhyDriveCommandScroll mounted between FeaturesGrid and DemoVideo
- "Why us" link appears in correct position in both desktop and mobile nav
- Anchor scroll works correctly with heading visible
- Zero TypeScript errors, clean dev server start
</success_criteria>

<output>
After completion, create `.planning/quick/9-mount-whydrivecommandscroll-on-home-page/9-SUMMARY.md`
</output>
