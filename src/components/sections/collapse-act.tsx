'use client'

import Link from 'next/link'
import { useRef, type CSSProperties } from 'react'
import { ArrowRight, Sheet, MessageSquare, Navigation, FileText, Inbox } from 'lucide-react'
import { StatusBadge } from '@/components/shared/status-badge'
import { gsap, useGSAP, once, MOTION_OK, DESKTOP, MOBILE, FINE_POINTER } from '@/lib/gsap'

/**
 * THE COLLAPSE (the page's peak)
 *
 * Desktop: a pinned stage. Five tool windows sit scattered around the copy,
 * pull apart, then fly into one DriveCommand panel, each lighting its tab as
 * it lands. A hairline at the bottom shows how far through the act you are.
 * The opening frame is complete on its own: headline, body, and every window
 * fully inside the frame.
 *
 * Phone: no pin. The same story told top to bottom: the problem, the five
 * windows, then the panel. When the panel scrolls into view the windows
 * collapse into it on their own in about two seconds, so the reader never
 * has to "keep scrolling to make it work".
 */

type ToolWindow = {
  id: string
  tab: string
  title: string
  icon: typeof Sheet
  lines: { text: string; tone?: 'bad' | 'muted' }[]
  pos: { left: string; top: string }
  rot: number
  drift: { x: number; y: number }
}

const WINDOWS: ToolWindow[] = [
  {
    id: 'sheet',
    tab: 'Dispatch',
    title: 'loads_final_v7.xlsx',
    icon: Sheet,
    lines: [
      { text: 'LD-1847  Dallas to Houston  $1,850' },
      { text: 'LD-1848  Austin to ???  #REF!', tone: 'bad' },
      { text: 'Last saved Sunday 11:48 PM', tone: 'muted' },
    ],
    pos: { left: '3%', top: '10%' },
    rot: -5,
    drift: { x: -22, y: -16 },
  },
  {
    id: 'texts',
    tab: 'Drivers',
    title: 'Messages · Mike R.',
    icon: MessageSquare,
    lines: [
      { text: 'where is the BOL for 1848?' },
      { text: 'sent it to your personal cell', tone: 'muted' },
      { text: 'which one', tone: 'bad' },
    ],
    pos: { left: '64%', top: '7%' },
    rot: 4,
    drift: { x: 22, y: -18 },
  },
  {
    id: 'gps',
    tab: 'GPS',
    title: 'TruckTrak Lite',
    icon: Navigation,
    lines: [
      { text: 'Truck 12 · last ping 43 min ago', tone: 'bad' },
      { text: 'Truck 07 · subscription expired', tone: 'muted' },
    ],
    pos: { left: '74%', top: '48%' },
    rot: -3,
    drift: { x: 24, y: 4 },
  },
  {
    id: 'payroll',
    tab: 'Payroll',
    title: 'settlements_wk32.pdf',
    icon: FileText,
    lines: [
      { text: 'Mike R.   2,140.00   (manual)' },
      { text: 'Sarah K.  1,905.50   (manual)' },
      { text: 'Fuel advance: see other file', tone: 'muted' },
    ],
    pos: { left: '3%', top: '74%' },
    rot: 3,
    drift: { x: -22, y: 18 },
  },
  {
    id: 'invoices',
    tab: 'Invoices',
    title: 'Inbox (1,204)',
    icon: Inbox,
    lines: [
      { text: 'Invoice #1791 · 34 days overdue', tone: 'bad' },
      { text: 'RE: RE: RE: rate confirmation', tone: 'muted' },
    ],
    pos: { left: '48%', top: '78%' },
    rot: -2,
    drift: { x: 14, y: 22 },
  },
]

const PANEL_ROWS = [
  { id: 'LD-1847', route: 'Dallas to Houston', driver: 'Mike R.', status: 'delivered' as const },
  { id: 'LD-1848', route: 'Austin to Phoenix', driver: 'Sarah K.', status: 'in-transit' as const },
  { id: 'LD-1849', route: 'Denver to Salt Lake', driver: 'James T.', status: 'dispatched' as const },
  { id: 'LD-1850', route: 'LA to Las Vegas', driver: 'Anna M.', status: 'invoiced' as const },
]

/** Layout centre of an element relative to `root`, ignoring transforms. */
function layoutCenter(el: HTMLElement, root: HTMLElement) {
  let x = el.offsetWidth / 2
  let y = el.offsetHeight / 2
  let node: HTMLElement | null = el
  while (node && node !== root) {
    x += node.offsetLeft
    y += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return { x, y }
}

function ToolWindowCard({ w, className = '', style }: { w: ToolWindow; className?: string; style?: CSSProperties }) {
  return (
    <div data-window={w.id} className={`tool-window ${className}`} style={style} aria-hidden="true">
      <div className="tool-window__bar">
        <w.icon size={12} />
        <span className="truncate">{w.title}</span>
      </div>
      <div className="tool-window__body">
        {w.lines.map((l) => (
          <p
            key={l.text}
            className="tool-window__line"
            style={{
              color: l.tone === 'bad' ? 'var(--state-critical)' : l.tone === 'muted' ? 'var(--text-tertiary)' : 'var(--text-primary)',
            }}
          >
            {l.text}
          </p>
        ))}
      </div>
    </div>
  )
}

function UnifiedPanel() {
  return (
    <div
      data-tilt
      className="rounded-xl overflow-hidden"
      style={{
        border: '1px solid var(--surface-dashboard-border)',
        background: 'var(--surface-dashboard)',
        boxShadow: 'var(--shadow-panel)',
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'var(--border-divider)', backgroundColor: 'var(--surface-dashboard-header)' }}>
        <span className="text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>DriveCommand · Active Loads</span>
        <span data-live className="flex items-center gap-1.5 motion-reduce:!opacity-100">
          <span className="w-2 h-2 rounded-full animate-live-pulse" style={{ backgroundColor: 'var(--state-success)' }} />
          <span className="text-xs font-mono" style={{ color: 'var(--state-success)' }}>LIVE</span>
        </span>
      </div>

      <div className="flex gap-1 px-3 pt-3 pb-2 overflow-x-auto" role="list" aria-label="Modules">
        {WINDOWS.map((w) => (
          <span
            key={w.tab}
            role="listitem"
            className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-body font-medium whitespace-nowrap"
            style={{ color: 'var(--text-secondary)', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border-subtle)' }}
          >
            <span className="inline-flex items-center gap-1.5">
              <w.icon size={12} />
              {w.tab}
            </span>
            <span
              data-tab-on
              className="absolute inset-0 rounded-md inline-flex items-center gap-1.5 px-3 py-1.5 motion-reduce:!opacity-100"
              style={{ backgroundColor: 'var(--accent-brand)', color: 'var(--text-on-brand)', opacity: 0 }}
              aria-hidden="true"
            >
              <w.icon size={12} />
              {w.tab}
            </span>
          </span>
        ))}
      </div>

      <div className="px-3 pb-3">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,1fr)_auto] gap-x-3 px-3 py-2 text-[11px] font-mono uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
          <span>Load</span>
          <span>Route</span>
          <span>Driver</span>
          <span>Status</span>
        </div>
        {PANEL_ROWS.map((r) => (
          <div
            key={r.id}
            data-row
            className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,1fr)_auto] gap-x-3 items-center px-3 py-2.5 rounded-lg mb-1 motion-reduce:!opacity-100 motion-reduce:!translate-y-0"
            style={{ backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border-subtle)' }}
          >
            <span className="text-xs font-mono" style={{ color: 'var(--text-primary)' }}>{r.id}</span>
            <span className="text-xs sm:text-sm font-body truncate" style={{ color: 'var(--text-primary)' }}>{r.route}</span>
            <span className="text-xs sm:text-sm font-body truncate" style={{ color: 'var(--text-secondary)' }}>{r.driver}</span>
            <StatusBadge status={r.status} />
          </div>
        ))}
      </div>
    </div>
  )
}

const H2 = 'font-display font-bold tracking-[-0.03em] leading-[0.98] text-[clamp(2.2rem,5.6vw,4.6rem)]'

function CopyA() {
  return (
    <>
      <h2 className={H2} style={{ color: 'var(--text-primary)', textWrap: 'balance' }}>
        Seventeen tabs. Five logins. One Sunday night.
      </h2>
      <p className="mt-5 font-body text-base sm:text-lg max-w-[44ch]" style={{ color: 'var(--text-secondary)', textWrap: 'pretty' }}>
        Dispatch lives in a spreadsheet. Drivers live in a text thread. Payroll is a PDF. Invoices are somebody&apos;s inbox.
      </p>
    </>
  )
}

function CopyC() {
  return (
    <>
      <h2 className={H2} style={{ color: 'var(--text-primary)', textWrap: 'balance' }}>
        One surface. <span style={{ color: 'var(--accent-brand)' }}>Every load.</span>
      </h2>
      <p className="mt-5 font-body text-base sm:text-lg max-w-[44ch]" style={{ color: 'var(--text-secondary)', textWrap: 'pretty' }}>
        Dispatch, GPS, drivers, payroll, and invoicing in one login. Built by people who have actually moved freight.
      </p>
      <Link href="#demo" className="mt-6 inline-flex items-center gap-1.5 font-body text-sm font-medium underline-offset-4 hover:underline" style={{ color: 'var(--accent-brand)' }}>
        See how it works
        <ArrowRight size={14} />
      </Link>
    </>
  )
}

export function CollapseAct() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const mobileRef = useRef<HTMLDivElement>(null)
  const mobilePanelRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return
      const mm = gsap.matchMedia()

      // ---------------- Desktop: pinned stage ----------------
      mm.add(`${MOTION_OK} and ${DESKTOP}`, () => {
        const stage = stageRef.current
        const panel = panelRef.current
        if (!stage || !panel) return
        const windows = gsap.utils.toArray<HTMLElement>('[data-window]', stage)
        const tabsOn = gsap.utils.toArray<HTMLElement>('[data-tab-on]', panel)
        const rows = gsap.utils.toArray<HTMLElement>('[data-row]', panel)
        const copyA = stage.querySelector('[data-copy="a"]')
        const copyB = stage.querySelector('[data-copy="b"]')
        const copyC = stage.querySelector('[data-copy="c"]')
        const live = panel.querySelector('[data-live]')

        gsap.set(copyB, { opacity: 0, y: 28 })
        gsap.set(copyC, { opacity: 0, y: 28 })
        gsap.set(panel, { opacity: 0.22, scale: 0.9, y: 30 })
        gsap.set(tabsOn, { opacity: 0 })
        gsap.set(rows, { opacity: 0, y: 10 })
        gsap.set(live, { opacity: 0 })
        gsap.set(windows, { rotation: (i) => WINDOWS[i].rot, transformOrigin: '50% 50%' })

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=260%',
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`
            },
          },
        })

        windows.forEach((w, i) => {
          tl.to(w, { x: WINDOWS[i].drift.x, y: WINDOWS[i].drift.y, rotation: WINDOWS[i].rot * 1.5, duration: 0.2 }, 0)
        })
        tl.to(copyA, { opacity: 0, y: -24, duration: 0.06, ease: 'power2.in' }, 0.2)
        tl.to(copyB, { opacity: 1, y: 0, duration: 0.08, ease: 'power2.out' }, 0.27)
        tl.to(panel, { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.3)
        windows.forEach((w, i) => {
          const at = 0.28 + i * 0.05
          tl.to(
            w,
            {
              x: () => layoutCenter(panel, stage).x - layoutCenter(w, stage).x,
              y: () => layoutCenter(panel, stage).y - layoutCenter(w, stage).y,
              rotation: 0,
              scale: 0.28,
              duration: 0.28,
              ease: 'power3.inOut',
            },
            at
          )
          tl.to(w, { opacity: 0, duration: 0.05, ease: 'power2.in' }, at + 0.23)
          if (tabsOn[i]) tl.to(tabsOn[i], { opacity: 1, duration: 0.03 }, at + 0.25)
        })
        tl.to(copyB, { opacity: 0, y: -24, duration: 0.06, ease: 'power2.in' }, 0.58)
        tl.to(copyC, { opacity: 1, y: 0, duration: 0.08, ease: 'power2.out' }, 0.65)
        tl.to(live, { opacity: 1, duration: 0.04 }, 0.64)
        rows.forEach((r, i) => {
          tl.to(r, { opacity: 1, y: 0, duration: 0.06, ease: 'power2.out' }, 0.66 + i * 0.04)
        })
        tl.to({}, { duration: 0.15 }, 0.85)
      })

      mm.add(`${MOTION_OK} and ${DESKTOP} and ${FINE_POINTER}`, () => {
        const panel = panelRef.current
        const inner = panel?.querySelector<HTMLElement>('[data-tilt]')
        if (!panel || !inner) return
        const rx = gsap.quickTo(inner, 'rotateX', { duration: 0.8, ease: 'power3.out' })
        const ry = gsap.quickTo(inner, 'rotateY', { duration: 0.8, ease: 'power3.out' })
        const onMove = (e: PointerEvent) => {
          const r = panel.getBoundingClientRect()
          rx(-((e.clientY - r.top) / r.height - 0.5) * 6)
          ry(((e.clientX - r.left) / r.width - 0.5) * 7)
        }
        const onLeave = () => {
          rx(0)
          ry(0)
        }
        panel.addEventListener('pointermove', onMove, { passive: true })
        panel.addEventListener('pointerleave', onLeave)
        return () => {
          panel.removeEventListener('pointermove', onMove)
          panel.removeEventListener('pointerleave', onLeave)
        }
      })

      // ---------------- Phone: flowing story, self-completing collapse ----------------
      mm.add(`${MOTION_OK} and ${MOBILE}`, () => {
        const root = mobileRef.current
        const panel = mobilePanelRef.current
        if (!root || !panel) return
        const windows = gsap.utils.toArray<HTMLElement>('[data-window]', root)
        const tabsOn = gsap.utils.toArray<HTMLElement>('[data-tab-on]', panel)
        const rows = gsap.utils.toArray<HTMLElement>('[data-row]', panel)
        const live = panel.querySelector('[data-live]')
        const grid = root.querySelector<HTMLElement>('[data-window-grid]')

        gsap.utils.toArray<HTMLElement>('[data-in]', root).forEach((el) => {
          gsap.fromTo(el, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: once(el, 'top 85%') })
        })

        // Ground state: windows visible in a grid, panel faint, tabs off, rows in place
        gsap.set(panel, { opacity: 0.35, scale: 0.96 })
        gsap.set(tabsOn, { opacity: 0 })
        gsap.set(live, { opacity: 0 })
        gsap.set(windows, { rotation: (i) => WINDOWS[i].rot * 0.6, transformOrigin: '50% 50%' })

        const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.inOut' } })
        windows.forEach((w, i) => {
          const at = i * 0.12
          tl.to(
            w,
            {
              x: () => layoutCenter(panel, root).x - layoutCenter(w, root).x,
              y: () => layoutCenter(panel, root).y - layoutCenter(w, root).y,
              rotation: 0,
              scale: 0.3,
              duration: 0.75,
            },
            at
          )
          tl.to(w, { opacity: 0, duration: 0.2, ease: 'power2.in' }, at + 0.55)
          if (tabsOn[i]) tl.to(tabsOn[i], { opacity: 1, duration: 0.15, ease: 'none' }, at + 0.7)
        })
        tl.to(panel, { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }, 0.3)
        tl.to(live, { opacity: 1, duration: 0.2, ease: 'none' }, 1.1)
        tl.fromTo(rows, { y: 8, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' }, 1.0)
        // The grid keeps its height while the windows fly away, then closes up
        if (grid) tl.to(grid, { height: 0, marginBottom: 0, duration: 0.5, ease: 'power2.inOut' }, 1.2)

        gsap.timeline({ scrollTrigger: once(panel, 'top 80%') }).add(() => tl.play())
      })

      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section id="one-surface" ref={sectionRef} className="relative scroll-mt-16" style={{ backgroundColor: 'var(--surface-sunken)' }} aria-label="Why DriveCommand">
      {/* ===== Desktop: pinned stage ===== */}
      <div ref={stageRef} className="hidden md:block relative h-[100svh] min-h-[640px] overflow-hidden" style={{ perspective: '1600px' }}>
        <div className="absolute inset-0 pattern-dots opacity-70 pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-0 hero-grain pointer-events-none" aria-hidden="true" />

        {WINDOWS.map((w) => (
          <ToolWindowCard key={w.id} w={w} className="motion-reduce:hidden" style={{ left: w.pos.left, top: w.pos.top }} />
        ))}

        <div className="relative z-10 h-full mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-[minmax(0,44%)_minmax(0,56%)] gap-12 items-center">
          <div className="relative min-h-[20rem]">
            <div data-copy="a" className="absolute inset-x-0 top-0 motion-reduce:hidden">
              <CopyA />
            </div>
            <div data-copy="b" className="absolute inset-x-0 top-0 motion-reduce:hidden">
              <h2 className={H2} style={{ color: 'var(--text-primary)', textWrap: 'balance' }}>
                Then it all comes together.
              </h2>
            </div>
            <div data-copy="c" className="absolute inset-x-0 top-0 motion-reduce:static">
              <CopyC />
            </div>
          </div>
          <div ref={panelRef} className="relative w-full max-w-[640px] justify-self-end motion-reduce:!opacity-100 will-change-transform" style={{ transformStyle: 'preserve-3d' }}>
            <UnifiedPanel />
          </div>
        </div>

        {/* Progress hairline: this act has extent, and here is how far you are */}
        <div className="absolute left-0 right-0 bottom-8 mx-auto max-w-7xl px-6 lg:px-8 motion-reduce:hidden" aria-hidden="true">
          <div className="h-px w-full" style={{ backgroundColor: 'var(--border-divider)' }}>
            <div ref={progressRef} className="h-px w-full origin-left will-change-transform" style={{ backgroundColor: 'var(--accent-brand)', transform: 'scaleX(0)' }} />
          </div>
        </div>
      </div>

      {/* ===== Phone: the story in flow ===== */}
      <div ref={mobileRef} className="md:hidden relative overflow-hidden px-5 py-20">
        <div className="absolute inset-0 pattern-dots opacity-70 pointer-events-none" aria-hidden="true" />
        <div className="relative">
          <div data-in>
            <CopyA />
          </div>

          <div data-window-grid className="relative mt-10 mb-10 grid grid-cols-2 gap-3 overflow-visible">
            {WINDOWS.map((w, i) => (
              <ToolWindowCard
                key={w.id}
                w={w}
                className="!static !w-auto motion-reduce:!opacity-100"
                style={i === WINDOWS.length - 1 ? { gridColumn: 'span 2', maxWidth: '60%', justifySelf: 'center' } : undefined}
              />
            ))}
          </div>

          <div ref={mobilePanelRef} className="relative will-change-transform">
            <UnifiedPanel />
          </div>

          <div data-in className="mt-12">
            <CopyC />
          </div>
        </div>
      </div>
    </section>
  )
}
