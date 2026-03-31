# Pitfalls Research

**Domain:** B2B SaaS marketing website — fleet management / logistics vertical
**Researched:** 2026-03-31
**Confidence:** MEDIUM (WebSearch unavailable; based on training knowledge of B2B SaaS conversion patterns, fleet management vertical buyer psychology, and direct analysis of the DriveCommand codebase and PROJECT.md)

---

## Research Notes

WebSearch and WebFetch were denied during this research session. All pitfalls derive from:
1. Training knowledge of B2B SaaS marketing website failure modes (HubSpot, CXL Institute, growth.design patterns through mid-2025)
2. Fleet management vertical buyer psychology (owner-operator and small carrier segment — 1-25 trucks)
3. Direct analysis of the DriveCommand codebase, PROJECT.md requirements, FEATURES.md, and STACK.md
4. Domain knowledge of Framer Motion + Next.js App Router gotchas specific to this architecture

Pitfalls are ordered by consequence severity and specificity to this project. Generic "have a CTA" advice is excluded.

---

## Critical Pitfalls

### Pitfall 1: Enterprise SaaS Voice Alienating Owner-Operators

**What goes wrong:**
Copy defaults to enterprise SaaS patterns — "streamline workflows," "leverage synergies," "accelerate growth," "empower your team." Owner-operators and small fleet managers recognize this voice immediately as "not for me" and bounce. The audience runs 5-25 trucks, often alone or with a dispatcher. They don't have "teams." They have a wife, a driver who might not show up, and a load that won't deliver itself.

**Why it happens:**
Developers (and most copywriters) write for the SaaS they've seen, not for truckers. The default mental model is "startup founder reading Product Hunt," not "guy in a Peterbilt who needs to issue an invoice from a Flying J parking lot."

**How to avoid:**
Use vertical-specific language throughout: "loads" not "tasks," "drivers" not "team members," "dispatch" not "assignments," "HOS" not "hours tracking," "DOT" not "compliance." Every hero headline, feature card, and CTA should pass the test: "Would a trucker read this and think 'this is for me'?" Run copy through that lens before shipping. Specific triggers to replace: "workspace" → "dashboard," "team" → "fleet," "projects" → "loads," "collaborate" → "coordinate," "empower" → (delete entirely).

**Warning signs:**
- Any headline containing "streamline," "leverage," "empower," or "synergize"
- Feature copy that doesn't mention loads, drivers, trucks, dispatch, or compliance
- CTAs that say "Get started" without specifying what they're starting (free trial, demo, etc.)
- About page that describes the company mission without mentioning trucking

**Phase to address:**
Content/copy pass — every section of every page before shipping. Applies to all phases. Flag in design review as a mandatory check.

---

### Pitfall 2: Pricing Opacity Creating the Exact Friction That Costs DriveCommand Its Differentiator

**What goes wrong:**
The interactive pricing calculator is a primary differentiator — Samsara hides pricing, Motive gates demos, DriveCommand is supposed to be transparent. If the calculator's output is vague ("starting at" language, undisclosed per-truck rates, or a modal that says "contact sales for exact pricing"), the differentiator evaporates. Owner-ops have been burned by enterprise software hidden costs before. "Starting at" = "this is a trap."

**Why it happens:**
Rates are stored in a constants file (correct decision from PROJECT.md), but then developers add hedging language to components: "estimated," "approximately," "may vary." The calculator output becomes so hedged it's meaningless. Additionally, if the Enterprise tier calculator output is "contact us," the trust damage from refusing to give a number undermines the transparency of the Basic and Advanced calculator too.

**How to avoid:**
Show exact rates. For Basic and Advanced tiers, the calculator must show a hard number: "$X/month for N trucks." Only the Enterprise tier can route to /contact — and that path must be explicitly labeled "Enterprise (50+ trucks)" so non-enterprise users understand the calculator gave them an exact answer. Include "Cancel anytime, no contract required" near the calculator output to neutralize the risk of the number feeling final.

**Warning signs:**
- Calculator output copy contains "approximately," "estimate," or "may vary"
- Basic or Advanced tier results link to /contact instead of showing a price
- No per-truck/per-driver breakdown visible alongside the total
- Calculator result CTA is "Talk to sales" instead of "Start free trial"

**Phase to address:**
Pricing calculator implementation phase. Verify in design review that the output is a hard dollar figure, not hedged copy.

---

### Pitfall 3: Framer Motion Causing Jank on Mobile (Owner-Operators' Primary Device)

**What goes wrong:**
Parallax effects, staggered reveals, and scroll-synced animations look polished on a MacBook Pro. On a mid-range Android phone (Samsung Galaxy A-series — the actual device of many truckers), `transform: translateY()` layered on top of `overflow: hidden` creates paint storms. Chrome on Android has GPU compositing limitations that cause jank on parallax effects with multiple moving layers. Result: the site feels broken to the exact user who matters most.

**Why it happens:**
Development happens on desktop. Framer Motion's `useScroll` + `useTransform` hooks work without observable degradation on developer hardware. Mobile testing either doesn't happen or happens on an iPhone 15 Pro (which has enough GPU to compensate). Mid-range Android — the dominant device among owner-operators and small fleet operators — is never tested.

**How to avoid:**
The FEATURES.md already flags this: "Framer Motion conflicts with mobile parallax: must disable on mobile." Concretely:
1. Use `useReducedMotion()` from Framer Motion — returns `true` on reduced-motion OS preference AND should be extended to disable parallax below 768px via a `useWindowSize` hook.
2. Gate `useScroll` + `useTransform` transforms in a `isDesktop` check: parallax only fires when `window.innerWidth >= 768`.
3. For reveal animations (fade-in, slide-up): these are fine on mobile if the stagger delay is ≤ 100ms and the transform distance is ≤ 20px. Keep mobile animations simple.
4. Test on a real mid-range Android (or use Chrome DevTools throttled to "Mid-tier mobile" profile) before declaring any animation section done.

**Warning signs:**
- `motion.div` with `useScroll` or `y: useTransform(...)` props that are not gated by viewport size
- `whileHover` effects on touch targets (hover doesn't exist on touchscreens)
- Multiple `motion.div` elements with `layoutId` on a single scroll section (causes layout thrash on repaint)
- No `useReducedMotion()` import in any animation component

**Phase to address:**
Phase implementing Framer Motion animations. Verify on Chrome DevTools throttled mobile before marking animations complete.

---

### Pitfall 4: Interactive Demo Feeling Like a Slide Deck Instead of a Product

**What goes wrong:**
The interactive demo section is the highest-complexity feature and the primary differentiator. When built as a series of static images with a "Next" button, it reads as a slide deck — something every prospect has seen from every SaaS vendor. It doesn't demonstrate the product; it demonstrates that a developer made some screenshots. Owner-operators who have seen Samsara demos will recognize the pattern and disengage.

**Why it happens:**
Pressure to ship. The demo section is hard to build well. The path of least resistance is img tags with a step counter. The mockups look real on a Figma frame but lose fidelity when rendered as PNG at varying mobile widths. Without real interaction (hover states, number changes, status badge transitions), it feels static.

**How to avoid:**
The demo must have at least two types of interactivity that feel like the real app:
1. **Status-changing elements**: A load card that transitions from "Pending" → "In Transit" → "Delivered" with appropriate badge color changes (amber → blue → green) when the user clicks "Dispatch" or "Confirm Delivery."
2. **Data that responds**: A driver payroll row where hours update when a step progresses. Not animated counters — actual value changes that make the UI feel live.
Build mockups as React components with hardcoded data, not image files. The components can be simplified versions of the real app's components — same classes, same shadcn/ui primitives, but with hardcoded data props. This costs more upfront but passes the "feels like the real thing" test.

**Warning signs:**
- Demo section implemented as `<img src="mockup-step-1.png" />` files
- No state changes between demo steps (only the visible step changes, not any values within the mockup)
- Step transitions are instant (no animation) or use page-reload-style transitions
- Demo section looks identical on mobile and desktop (means it's not responsive, just scaled)

**Phase to address:**
Interactive demo implementation phase. Requires explicit acceptance criteria: "each step must include at least one value/status change inside the mockup UI, not just a change in which step is visible."

---

### Pitfall 5: Hardcoded Pricing Getting Out of Sync With Actual Product Pricing

**What goes wrong:**
The pricing constants file is created correctly at the start. Then pricing changes — tiers get renamed, per-truck rates change, a new tier is added. The constants file gets updated. But the /pricing page has a hardcoded feature comparison table that was built separately, with feature bullet points that don't match what's in the constants. The landing page inline calculator reflects the new rates; the /pricing page comparison table still shows the old tiers. Now there are two authoritative-looking pricing sources that contradict each other.

**Why it happens:**
The constants file controls numbers (rates, limits) but not prose (feature descriptions, tier names, what's included). Developers update the numbers but miss the copy. On a marketing site with a /pricing page, a /demo page, and an inline calculator on the landing page, there are at minimum 3 surfaces where pricing information appears. Keeping them in sync manually is error-prone.

**How to avoid:**
Centralize everything that can vary into the constants file — not just rates, but tier names, feature inclusion lists (as boolean flags), and limits (e.g., "up to X trucks"). The /pricing comparison table renders from the same constants file as the calculator. Tier names rendered as `PRICING_CONFIG.tiers[0].name`, not as the string `"Basic"` repeated in JSX. When a non-developer updates pricing, they touch one file and all three surfaces update.

**Warning signs:**
- `/pricing` page feature table has hardcoded strings like "Up to 10 trucks" that don't come from the config
- Tier names (Basic, Advanced, Enterprise) appear as string literals in multiple components
- Feature inclusion ("Dispatch module: yes/no") is hardcoded in JSX rather than derived from config
- Two different monthly prices for the same tier appear on different pages

**Phase to address:**
Phase establishing the pricing constants architecture — before any pricing UI is built. The structure of the constants file should be finalized in the same phase as the calculator, not after.

---

## Moderate Pitfalls

### Pitfall 6: Demo Video Fallback Looking Like an Obvious Placeholder

**What goes wrong:**
The demo video section uses `NEXT_PUBLIC_DEMO_VIDEO_URL` with a fallback for when the env var isn't set (which is most of the build lifecycle before a video is produced). The fallback is a gray box with the text "Video coming soon" or a broken-looking thumbnail. Visitors see it and think the site is unfinished — which is worse than having no video section at all.

**Why it happens:**
Developers treat the fallback as a temporary state and design it lazily, expecting the real video to replace it quickly. The real video takes 6-12 weeks to produce. The fallback ships to production.

**How to avoid:**
Design the fallback as a real content element from day one. Specifically: a full-bleed dark card at the aspect ratio of a video player (16:9), with a styled "play button" overlay, a strong caption ("Watch DriveCommand in action — live GPS, dispatch, invoicing in under 3 minutes"), and a secondary CTA ("Request a personalized demo" → /demo). The fallback should look intentional — like a coming-soon teaser, not a broken embed.

**Warning signs:**
- Fallback state renders a visible div with no styling other than background color
- Fallback has placeholder text like "Video coming soon" or "TODO"
- Fallback is smaller or differently shaped than the live video player would be
- No CTA in the fallback state

**Phase to address:**
Demo video section implementation. Verify fallback state in Storybook or a local env with the env var unset before shipping.

---

### Pitfall 7: Lead Capture Form With Fields That Drive Away the Target Audience

**What goes wrong:**
The /contact form adds fields that feel like a sales qualification process: "How many trucks do you operate?", "What is your annual revenue?", "What is your current software budget?" Owner-operators recognize a lead qualification form immediately. They close it. They're truck operators, not enterprise IT buyers who expect a sales process.

**Why it happens:**
CRM-driven thinking: more fields = better lead qualification = sales team can prioritize. True for enterprise SaaS targeting Fortune 500. Catastrophic for SMB trucking where the buyer IS the operator and the decision is made in 24 hours or not at all.

**How to avoid:**
Four fields maximum: name, email, company (or "your fleet / company name"), message. Optional fifth field: "fleet size" as a dropdown (1-5 trucks, 6-15 trucks, 16-50 trucks, 50+). This gives qualification data without feeling invasive. No phone number field in the form — owner-ops will not enter a phone number on a SaaS site they're evaluating for the first time. If phone is needed, collect it after the first email reply.

**Warning signs:**
- Form has more than 5 fields
- Form includes "Phone number" as a required field
- Form includes "Annual revenue" or "Current software" fields
- Form has a "How did you hear about us?" dropdown on the first contact page

**Phase to address:**
/contact page implementation. Review form field list against the "4 fields maximum" rule before building.

---

### Pitfall 8: Sticky Navbar CTA Disappearing Into the Dark Background

**What goes wrong:**
The navbar starts transparent (correct — doesn't obscure the hero background). On scroll, it transitions to solid. The solid state uses `background: #0f172a` (the dark navy). The CTA button in the navbar is also dark-styled — electric blue text on a transparent background, or an outline button. Against the dark solid navbar, both the outline and the text-only button disappear. Users scrolling mid-page lose the primary CTA from view.

**Why it happens:**
The transparent state is designed first (hero background visible through nav, any button style works). The solid state is added as a modifier class later and often isn't re-tested with the button in it.

**How to avoid:**
The sticky solid navbar CTA must always be a filled button: `bg-blue-500 text-white` (or equivalent brand blue on white text). Never an outline or text-only button. The filled button is visible against both the transparent (hero image) and solid (dark navy) states. Test both scroll positions during development.

**Warning signs:**
- Navbar CTA button uses `variant="outline"` or `variant="ghost"` from shadcn/ui
- Button is not tested in the solid-background scroll state (only in the hero transparent state)
- Button text color is dark on a dark background in any scroll state

**Phase to address:**
Navbar implementation phase. Include "button visible in both scroll states" as an explicit acceptance criterion.

---

### Pitfall 9: Social Proof Using Generic Testimonials That Break Trust

**What goes wrong:**
Testimonials are made up (or heavily embellished) using generic trucker names and vague praise: "DriveCommand changed the way we manage our fleet. Highly recommend!" — John D., Trucker. Owner-operators are highly skeptical. They talk to other truckers. They know what real feedback sounds like. Generic praise from "John D., Trucker" reads as fake and poisons the credibility of the rest of the page.

**Why it happens:**
Real testimonials require real customers to write them, which requires real customers to have used the product, which requires a launch. Before launch there are no customers. The temptation is to fabricate.

**How to avoid:**
Three paths, in order of preference:
1. **Real quotes from beta users or pilot customers.** Even one sentence from a real person is worth more than three fake paragraphs. Get written permission to attribute name and fleet size.
2. **Attributed to a specific role without a name:** "Owner-operator, 3 trucks, Texas" is more credible than "John D." because it's specific without being verifiable. This is a gray area but widely accepted for pre-launch sites.
3. **No testimonials at all.** A testimonial section with a "Launching soon — be the first to share your experience" placeholder is more honest than fake quotes and doesn't actively harm trust.

Do not use AI-generated testimonials. They are detectable by trucking operators who will share screenshots in Facebook groups.

**Warning signs:**
- Testimonials have no specific fleet size, route type, or operational detail
- All testimonials have the same sentence structure and length
- Attribution is "John D., Trucker" without company name or specific use case
- Testimonial photo is a stock photo that reverse-image-searches to a model agency

**Phase to address:**
Social proof section implementation. Requires sign-off that source of testimonials is real or explicitly designated as placeholder.

---

### Pitfall 10: Framer Motion Bundle Size Bloating Core Web Vitals

**What goes wrong:**
`motion` (framer-motion) is 50-80KB gzipped. If imported at the top level of the root layout or a non-lazy component, it ships to every visitor on every page — including /about and /contact, which have minimal animations. LCP degrades. For owner-operators on spotty rural LTE, an extra 80KB of JS is meaningful.

**Why it happens:**
Developers import `motion` where it's convenient — often in a shared component file or a layout that wraps everything. The import propagates to routes that don't use animation.

**How to avoid:**
Import `motion` only in components that use it. Use `next/dynamic` with `ssr: false` for sections with heavy Framer Motion use (interactive demo, hero animation), so the animation code is lazy-loaded after the page paint. Specifically for the interactive demo: it is below the fold, which means it doesn't affect LCP. Lazy load it with a loading skeleton. `next/dynamic(() => import('./InteractiveDemo'), { ssr: false, loading: () => <DemoSkeleton /> })`.

**Warning signs:**
- `import { motion } from 'motion/react'` in `layout.tsx` or a top-level shared file
- Interactive demo section is not wrapped in `next/dynamic`
- Bundle analyzer shows `framer-motion` in the initial JS chunk
- LCP > 2.5s in Lighthouse audit (often a symptom of unoptimized animation library loading)

**Phase to address:**
Animation implementation phase and the interactive demo phase. Run `next build` + Lighthouse audit as acceptance criteria before declaring either phase complete.

---

## Minor Pitfalls

### Pitfall 11: Dark Mode Inconsistency Between Marketing Site and App

**What goes wrong:**
The marketing site uses a dark-navy aesthetic (`#0f172a` background) as its primary design. The DriveCommand app also has a dark sidebar but a white content area. If a user clicks "Sign in" from the navbar and lands in the app, the shift from dark marketing site to white app UI is jarring. It's not a conversion blocker, but it reads as two different products.

**Prevention:**
The marketing site's dark sections should use the exact same dark navy token (`#0f172a`) as the app sidebar. White marketing sections (social proof cards, feature cards) should use the same off-white (`slate-50`) as the app's content area. Consistent tokens mean the transition to the app doesn't feel like entering a different product.

---

### Pitfall 12: CTA Button Text That Doesn't Describe the Action

**What goes wrong:**
"Get Started" — started with what? "Learn More" — learn more about what? "Book a Demo" — how long is the demo? CTAs that describe the process ("book a call") rather than the outcome ("see your fleet live") convert worse with skeptical buyers who have been burned by sales calls before.

**Prevention:**
Primary CTAs must name the outcome: "Start my free trial," "See it with my fleet size," "Get my pricing estimate." Secondary CTAs should set expectations: "Watch a 3-min demo" (not "Watch Demo"). Owner-operators are time-constrained; knowing a demo is 3 minutes removes the "is this a 45-minute sales call?" objection.

---

### Pitfall 13: /pricing Page FAQ Missing the Top 5 Trucking-Specific Objections

**What goes wrong:**
FAQ sections on SaaS pricing pages address generic questions: "Can I cancel anytime?" "Is there a free trial?" "What payment methods do you accept?" Owner-operators have entirely different objections: "What happens if a driver quits? Do I still pay for their seat?" "What if I'm seasonal — can I pause?" "Do you require a contract?" "Does this work without internet in rural areas?" Missing these objections means the FAQ doesn't actually reduce friction for the target audience.

**Prevention:**
The /pricing FAQ must address: contract/commitment terms, what happens to unused seats if fleet size shrinks, whether the product works offline or with intermittent connectivity (critical for rural routes), IFTA reporting support (a major compliance pain point), and ELD integration or distinction from ELD-only tools. These are the questions that end the evaluation process for skeptical owner-ops.

---

## Technical Debt Patterns

Shortcuts that seem reasonable now but create problems later.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Hardcoding tier names as string literals in multiple components | Faster to type `"Basic"` than `PRICING_CONFIG.tiers[0].name` | When tiers get renamed, 10+ string literals need hunting | Never — centralize from day one |
| Using `<img>` tags for demo mockup screenshots instead of React components | Faster to build demo section | Screenshot breaks at mobile widths; interactive states impossible without rebuilding | Only for throwaway prototypes, never for production demo section |
| Importing `motion` at top level without code-splitting | No lazy loading setup required | Motion ships to all routes, degrades LCP by 50-80KB on fast connections | Acceptable only if Core Web Vitals are passing and budget allows |
| Shipping with placeholder testimonials | Unblocks launch | Trust damage that cannot be recovered once a trucker screenshots it | Never — use role-based attribution or no testimonials |
| Parallax enabled on mobile | Same code path for desktop and mobile | Jank on mid-range Android; accessibility issues for vestibular users | Never — disable parallax below 768px unconditionally |
| Form submission posting directly to a Google Sheet | No backend required | Sheets change URLs, permissions expire, submissions silently fail | Acceptable for day-0 prototype only; replace with Resend Server Action before launch |

---

## Integration Gotchas

Common mistakes when connecting to external services in this architecture.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Resend (lead capture email) | Calling Resend directly from a client component, exposing the API key in the browser | Server Action only — `'use server'` function calls `resend.emails.send()`. API key lives in environment, never in `NEXT_PUBLIC_*` |
| Vercel Analytics | Installing `@vercel/analytics` but forgetting `<Analytics />` in the marketing layout (not the root layout) | Add `<Analytics />` to `apps/web/src/app/(marketing)/layout.tsx`, not `apps/web/src/app/layout.tsx`, so it only fires on marketing routes |
| `NEXT_PUBLIC_DEMO_VIDEO_URL` | Video URL is an unsigned S3 URL that expires | Use a public video hosting URL (YouTube unlisted, Vimeo, Cloudflare Stream public URL) — never an expiring signed URL |
| shadcn/ui Form + react-hook-form | Using `register()` directly instead of `<FormField>` + `<Controller>` — breaks shadcn/ui's validation display | Always use shadcn/ui `<Form>` wrapper with `<FormField control={form.control} ...>` for correct error message rendering |
| `next/font/google` in a nested layout | Declaring the font in the marketing layout AND the root layout causes duplicate font loading | Declare fonts once in the marketing layout. Root layout keeps existing Inter/Poppins. Nested layout applies `className` to the `<div>` wrapper, not `<html>` (which the root layout already owns) |

---

## Performance Traps

Patterns that work in development but fail in production or at scale.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Unoptimized hero background image | LCP > 2.5s on slow connections; Lighthouse flags hero image | Use `<Image>` from `next/image` with `priority` prop for above-the-fold images | Immediately on any slow connection — owner-ops on rural LTE will see this |
| Interactive demo rendered without skeleton | CLS (Cumulative Layout Shift) score > 0.1 as demo section mounts | Provide `loading` skeleton in `next/dynamic` call that matches the demo section's dimensions | Every page load on the demo section |
| Recharts chart rendering server-side | Hydration mismatch error in production (`window is not defined`) | Wrap Recharts chart in `next/dynamic` with `ssr: false` | First deployment to Vercel |
| All Framer Motion components in one bundle | Initial JS payload > 250KB; INP degrades on interaction | Code-split animation-heavy sections with `next/dynamic` | When Core Web Vitals are measured (Vercel Analytics dashboard) |
| Pricing calculator using floating-point arithmetic | `$10.50 * 23 = $241.50000000000003` displayed to users | Use integer cents internally, divide for display: `(trucksCount * RATE_CENTS) / 100` | Any fleet size where the multiplication produces a repeating decimal |

---

## Security Mistakes

Domain-specific security issues for this site.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Exposing Resend API key as `NEXT_PUBLIC_RESEND_API_KEY` | API key visible in browser JS bundle; attacker can send unlimited emails from your domain | Use `RESEND_API_KEY` (non-public) and access only in Server Actions or Route Handlers |
| No rate limiting on /api/contact route | Bot can spam the lead capture form, generating hundreds of Resend emails | Add Vercel's built-in rate limiting or a simple in-memory check in the Server Action; alternatively use a honeypot field in the form |
| Form submissions without server-side validation | Malformed data (XSS payloads, SQL injection attempts) in lead emails | Validate all form fields with Zod schema on the server before calling Resend — `@hookform/resolvers` validates on client, but server validation is required independently |
| Pricing config file committed with internal margin data | If pricing includes cost/margin data alongside display rates, it should not be in a public repo | Keep display rates in `pricing.config.ts`; keep cost/margin analysis in an internal spreadsheet or private document |

---

## UX Pitfalls

Common UX mistakes for this specific audience.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Autoplay video with audio | Owner-ops often browse on phone in the cab; sudden audio = immediate close and do not return | Never autoplay with audio. Autoplay muted is acceptable for background loops. Demo video requires explicit play action |
| Pricing page requiring signup before seeing the calculator | Defeats the transparency differentiator; mirrors the Samsara experience DriveCommand is supposed to beat | Calculator is fully functional with no signup required. Email capture only after the user has seen their price |
| Mobile menu that requires double-tap to open | Touch targets on the hamburger icon must be minimum 44x44px; icon-only buttons often fail this | Set minimum touch target to 48px. Include a text label or aria-label on the hamburger button |
| Section headings that don't tell you what to do | "Features" as a section heading — owner-ops won't read below it if they're scanning | Use outcome-framed headings: "Everything you need to run your fleet" not "Features" |
| Pricing page that requires scrolling to see trial CTA | If the CTA to start the trial is below the fold of the pricing comparison table, conversion drops | Pricing page must have a trial CTA above the fold and immediately after the comparison table (sticky footer CTA or inline below each tier) |

---

## "Looks Done But Isn't" Checklist

Things that appear complete in development but break in production.

- [ ] **Demo video section:** Verify fallback renders when `NEXT_PUBLIC_DEMO_VIDEO_URL` is unset locally (unset the var, reload, check it looks intentional)
- [ ] **Pricing calculator:** Verify output renders correct numbers for edge cases: 1 truck (solo owner-op), 0 trucks (should block or show a message), 50+ trucks (should route to Enterprise contact)
- [ ] **Sticky navbar:** Verify CTA button is visible against solid dark background at mid-scroll — not just in the transparent hero state
- [ ] **Interactive demo steps:** Verify step transition works on a touch device (swipe or tap-only input) — not just mouse click
- [ ] **Lead capture form:** Verify success state is visible and the form resets cleanly — test with real email receiving the Resend notification
- [ ] **Social proof testimonials:** Verify each testimonial has a name (or explicit role attribution) and is not using a stock photo that reverse-image-searches to a model
- [ ] **Mobile parallax disabled:** Verify with Chrome DevTools device emulator (375px width) that no `useScroll`/`useTransform` effects are running
- [ ] **Framer Motion reduced motion:** Verify animations are disabled when `prefers-reduced-motion: reduce` is set in OS settings
- [ ] **OG image:** Verify Open Graph image generates correctly for homepage, /pricing, and /demo routes (test with https://opengraph.xyz)
- [ ] **Enterprise CTA path:** Verify Enterprise tier CTA routes to /contact, not an external Calendly link or a broken URL

---

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Enterprise SaaS copy voice shipped | LOW | Copywriting pass only — no code changes. 1-2 hours of find-replace across all section files |
| Calculator shows hedged/vague output | LOW-MEDIUM | Update calculator output component copy and verify config structure. No architectural change required |
| Mobile parallax causes jank in production | MEDIUM | Add `isDesktop` gate to each `useScroll`/`useTransform` usage. Requires testing across animation components |
| Interactive demo built with static images | HIGH | Full rebuild of demo section as React components. The hardest recovery because the static-image approach cannot be incrementally improved into the interactive-component approach |
| Pricing constants out of sync across pages | MEDIUM | Audit all pricing-related JSX strings, migrate hardcoded values to config. ~4-8 hours depending on how many surfaces were built |
| Fake testimonials discovered and screenshot | HIGH | Cannot recover trust after screenshot circulates in trucking Facebook groups. Requires removing testimonials entirely and issuing a correction. Prevention is the only strategy |
| Resend API key exposed in public env | HIGH | Immediately rotate the key in Resend dashboard. Audit build output for `NEXT_PUBLIC_RESEND_*`. Audit git history for any committed .env files |
| Recharts hydration mismatch in production | LOW | Wrap chart in `next/dynamic({ ssr: false })`. 30-minute fix |

---

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Enterprise SaaS copy voice | Every content phase — treat as ongoing | Copy review checklist before each section ships: does it pass the "would a trucker read this?" test? |
| Pricing opacity | Pricing calculator implementation | Calculator renders a hard dollar figure for Basic and Advanced; only Enterprise routes to /contact |
| Framer Motion mobile jank | Animation implementation phase | Chrome DevTools throttled mobile profile shows no jank on hero and demo sections |
| Interactive demo as slide deck | Interactive demo implementation phase | Demo has at minimum one value-change and one status-change inside mockup per step |
| Pricing constants out of sync | Phase establishing pricing config architecture (before any pricing UI) | Zero hardcoded tier names or rates in component JSX; all rendered from config |
| Demo video fallback looks like placeholder | Demo video section implementation | Fallback renders with full-bleed styled card and secondary CTA when env var is unset |
| Lead form with too many fields | /contact page implementation | Form has ≤ 5 fields; no phone required; no revenue or budget fields |
| Sticky navbar CTA invisible on dark background | Navbar implementation | CTA button visible against solid dark navbar state (test at mid-scroll) |
| Generic testimonials | Social proof section implementation | Each testimonial has specific operational detail (fleet size, route type, or specific DriveCommand module mentioned) |
| Framer Motion bundle bloat | Animation implementation phase | `next build` bundle analysis confirms no motion in initial chunk; Lighthouse LCP < 2.5s |
| Resend API key exposed | Lead capture backend implementation | `grep -r "NEXT_PUBLIC_RESEND" .` returns no results in component files |
| Recharts SSR hydration error | Pricing calculator chart implementation | `next build` completes without hydration errors; pricing page loads without console errors in production |

---

## Sources

- Training knowledge of B2B SaaS marketing website conversion patterns (HubSpot Research, CXL Institute, growth.design, Conversion Rate Experts) — confidence MEDIUM, knowledge through mid-2025
- Fleet management vertical buyer psychology: owner-operator and small carrier segment behavior — confidence MEDIUM (industry knowledge)
- DriveCommand PROJECT.md requirements — confidence HIGH (direct read)
- DriveCommand FEATURES.md (existing research) — confidence MEDIUM
- DriveCommand STACK.md (existing research) — confidence HIGH (version-verified)
- Next.js 15 App Router Server Component / Client Component boundary patterns — confidence HIGH
- Framer Motion v12 (`motion`) mobile performance characteristics — confidence MEDIUM
- Resend API security model — confidence MEDIUM (training knowledge)

**Note:** WebSearch was not available during this research session. A second pass is recommended to verify:
1. Current trucking owner-operator device demographics (Android vs iOS split may have shifted since mid-2025)
2. Whether any direct competitor has launched a transparent pricing calculator since mid-2025 (would affect the differentiator framing)
3. Trucking industry-specific compliance objections (IFTA, FMCSA, ELD) — may have evolved with regulatory changes

---
*Pitfalls research for: DriveCommand marketing website — B2B SaaS fleet management, small carrier / owner-operator segment*
*Researched: 2026-03-31*
