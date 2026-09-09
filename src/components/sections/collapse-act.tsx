'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { ArrowRight, Sheet, MessageSquare, Navigation, FileText, Inbox } from 'lucide-react'
import { StatusBadge } from '@/components/shared/status-badge'
import { gsap, useGSAP, MOTION_OK, FINE_POINTER } from '@/lib/gsap'

/**
 * THE COLLAPSE (signature move, the page's peak)
 *
 * Pinned for ~3.5 viewport-heights. Five tool windows start scattered around
 * the stage. As the reader scrolls they drift further apart (tension), then
 * fly into one DriveCommand panel, each lighting its tab as it lands. The
 * final state holds: one surface, every load.
 *
 * Copy anchors lead (left). The panel holds the trail. Nothing is centred.
 */

type ToolWindow = {
  id: string
  tab: string
  title: string
  icon: typeof Sheet
  lines: { text: string; tone?: 'bad' | 'muted' }[]
  /** Percent position inside the stage (left / top) */
  pos: { left: string; top: string }
  /** Phone position: peeks in from the stage edge so the copy stays clear */
  mobile: { left: string; top: string }
  rot: number
  /** Direction of the tension drift, in px */
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
    pos: { left: '3%', top: '9%' },
    mobile: { left: '-14%', top: '-5%' },
    rot: -5,
    drift: { x: -28, y: -22 },
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
    pos: { left: '66%', top: '6%' },
    mobile: { left: '62%', top: '-6%' },
    rot: 4,
    drift: { x: 30, y: -24 },
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
    pos: { left: '72%', top: '46%' },
    mobile: { left: '80%', top: '44%' },
    rot: -3,
    drift: { x: 34, y: 6 },
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
    pos: { left: '2%', top: '78%' },
    mobile: { left: '-42%', top: '56%' },
    rot: 3,
    drift: { x: -30, y: 26 },
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
    pos: { left: '50%', top: '80%' },
    mobile: { left: '34%', top: '94%' },
    rot: -2,
    drift: { x: 18, y: 30 },
  },
]

const PANEL_ROWS = [
  { id: 'LD-1847', route: 'Dallas to Houston', driver: 'Mike R.', status: 'delivered' as const },
  { id: 'LD-1848', route: 'Austin to Phoenix', driver: 'Sarah K.', status: 'in-transit' as const },
  { id: 'LD-1849', route: 'Denver to Salt Lake', driver: 'James T.', status: 'dispatched' as const },
  { id: 'LD-1850', route: 'LA to Las Vegas', driver: 'Anna M.', status: 'invoiced' as const },
]

/** Layout centre of an element relative to `stage`, ignoring transforms. */
function layoutCenter(el: HTMLElement, stage: HTMLElement) {
  let x = el.offsetWidth / 2
  let y = el.offsetHeight / 2
  let node: HTMLElement | null = el
  while (node && node !== stage) {
    x += node.offsetLeft
    y += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return { x, y }
}

export function CollapseAct() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      const stage = stageRef.current
      const panel = panelRef.current
      if (!section || !stage || !panel) return

      const mm = gsap.matchMedia()

      mm.add(MOTION_OK, () => {
        const windows = gsap.utils.toArray<HTMLElement>('[data-window]', stage)
        const tabsOn = gsap.utils.toArray<HTMLElement>('[data-tab-on]', panel)
        const rows = gsap.utils.toArray<HTMLElement>('[data-row]', panel)
        const copyA = stage.querySelector('[data-copy="a"]')
        const copyB = stage.querySelector('[data-copy="b"]')
        const copyC = stage.querySelector('[data-copy="c"]')
        const live = panel.querySelector('[data-live]')

        // Ground state (also what the page shows before any scroll)
        gsap.set(copyB, { opacity: 0, y: 28 })
        gsap.set(copyC, { opacity: 0, y: 28 })
        gsap.set(panel, { opacity: 0.18, scale: 0.9, y: 30 })
        gsap.set(tabsOn, { opacity: 0 })
        gsap.set(rows, { opacity: 0, y: 10 })
        gsap.set(live, { opacity: 0 })
        gsap.set(windows, { rotation: (i) => WINDOWS[i].rot, transformOrigin: '50% 50%' })

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=350%',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        // 0.00 to 0.22: tension. The windows pull apart, the rotation grows.
        windows.forEach((w, i) => {
          tl.to(
            w,
            { x: WINDOWS[i].drift.x, y: WINDOWS[i].drift.y, rotation: WINDOWS[i].rot * 1.6, duration: 0.22 },
            0
          )
        })

        // 0.22 to 0.32: copy A out, copy B in
        tl.to(copyA, { opacity: 0, y: -24, duration: 0.07, ease: 'power2.in' }, 0.2)
        tl.to(copyB, { opacity: 1, y: 0, duration: 0.09, ease: 'power2.out' }, 0.28)

        // 0.30 to 0.68: convergence. Each window flies to the panel and lights its tab.
        tl.to(panel, { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.32)
        windows.forEach((w, i) => {
          const at = 0.3 + i * 0.055
          tl.to(
            w,
            {
              x: () => layoutCenter(panel, stage).x - layoutCenter(w, stage).x,
              y: () => layoutCenter(panel, stage).y - layoutCenter(w, stage).y,
              rotation: 0,
              scale: 0.28,
              duration: 0.3,
              ease: 'power3.inOut',
            },
            at
          )
          tl.to(w, { opacity: 0, duration: 0.06, ease: 'power2.in' }, at + 0.24)
          if (tabsOn[i]) tl.to(tabsOn[i], { opacity: 1, duration: 0.03 }, at + 0.27)
        })

        // 0.60 to 0.70: copy B out, copy C in. Copy C holds to the end.
        tl.to(copyB, { opacity: 0, y: -24, duration: 0.06, ease: 'power2.in' }, 0.6)
        tl.to(copyC, { opacity: 1, y: 0, duration: 0.09, ease: 'power2.out' }, 0.67)

        // 0.66 to 0.86: the panel comes alive
        tl.to(live, { opacity: 1, duration: 0.04 }, 0.66)
        rows.forEach((r, i) => {
          tl.to(r, { opacity: 1, y: 0, duration: 0.06, ease: 'power2.out' }, 0.68 + i * 0.045)
        })

        // Breathing room so the hold is felt before the un-pin
        tl.to({}, { duration: 0.1 }, 0.9)

        return () => {
          tl.scrollTrigger?.kill()
          tl.kill()
        }
      })

      // Pointer: once collapsed, the panel tilts toward the pointer.
      mm.add(`${MOTION_OK} and ${FINE_POINTER}`, () => {
        const inner = panel.querySelector<HTMLElement>('[data-tilt]')
        if (!inner) return
        const rx = gsap.quickTo(inner, 'rotateX', { duration: 0.8, ease: 'power3.out' })
        const ry = gsap.quickTo(inner, 'rotateY', { duration: 0.8, ease: 'power3.out' })
        const onMove = (e: PointerEvent) => {
          const r = panel.getBoundingClientRect()
          const nx = (e.clientX - r.left) / r.width - 0.5
          const ny = (e.clientY - r.top) / r.height - 0.5
          rx(-ny * 6)
          ry(nx * 7)
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

      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section
      id="one-surface"
      ref={sectionRef}
      className="relative scroll-mt-16"
      style={{ backgroundColor: 'var(--surface-sunken)' }}
      aria-label="Why DriveCommand"
    >
      <div ref={stageRef} className="relative h-[100svh] min-h-[640px] overflow-hidden" style={{ perspective: '1600px' }}>
        {/* Ground texture */}
        <div className="absolute inset-0 pattern-dots opacity-70 pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-0 hero-grain pointer-events-none" aria-hidden="true" />

        {/* Scattered tool windows */}
        {WINDOWS.map((w) => (
          <div
            key={w.id}
            data-window={w.id}
            className="tool-window motion-reduce:hidden"
            style={
              {
                '--pos-left': w.pos.left,
                '--pos-top': w.pos.top,
                '--m-left': w.mobile.left,
                '--m-top': w.mobile.top,
              } as React.CSSProperties
            }
            aria-hidden="true"
          >
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
                    color:
                      l.tone === 'bad'
                        ? 'var(--state-critical)'
                        : l.tone === 'muted'
                          ? 'var(--text-tertiary)'
                          : 'var(--text-primary)',
                  }}
                >
                  {l.text}
                </p>
              ))}
            </div>
          </div>
        ))}

        {/* Copy + panel */}
        <div className="relative z-10 h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[minmax(0,44%)_minmax(0,56%)] gap-8 lg:gap-12 items-center">
          <div className="relative min-h-[14rem] lg:min-h-[20rem]">
            {/* Copy A */}
            <div data-copy="a" className="absolute inset-x-0 top-0 motion-reduce:hidden">
              <h2
                className="font-display font-bold tracking-[-0.03em] leading-[0.98] text-[clamp(2.2rem,5.6vw,4.6rem)]"
                style={{ color: 'var(--text-primary)', textWrap: 'balance' }}
              >
                Seventeen tabs. Five logins. One Sunday night.
              </h2>
              <p className="mt-5 font-body text-base sm:text-lg max-w-[44ch]" style={{ color: 'var(--text-secondary)', textWrap: 'pretty' }}>
                Dispatch lives in a spreadsheet. Drivers live in a text thread. Payroll is a PDF. Invoices are somebody&apos;s inbox.
              </p>
            </div>

            {/* Copy B */}
            <div data-copy="b" className="absolute inset-x-0 top-0 motion-reduce:hidden">
              <h2
                className="font-display font-bold tracking-[-0.03em] leading-[0.98] text-[clamp(2.2rem,5.6vw,4.6rem)]"
                style={{ color: 'var(--text-primary)', textWrap: 'balance' }}
              >
                Then it all comes together.
              </h2>
            </div>

            {/* Copy C (holds) */}
            <div data-copy="c" className="absolute inset-x-0 top-0 motion-reduce:static">
              <h2
                className="font-display font-bold tracking-[-0.03em] leading-[0.98] text-[clamp(2.2rem,5.6vw,4.6rem)]"
                style={{ color: 'var(--text-primary)', textWrap: 'balance' }}
              >
                One surface. <span style={{ color: 'var(--accent-brand)' }}>Every load.</span>
              </h2>
              <p className="mt-5 font-body text-base sm:text-lg max-w-[44ch]" style={{ color: 'var(--text-secondary)', textWrap: 'pretty' }}>
                Dispatch, GPS, drivers, payroll, and invoicing in one login. Built by people who have actually moved freight.
              </p>
              <Link
                href="#demo"
                className="mt-6 inline-flex items-center gap-1.5 font-body text-sm font-medium underline-offset-4 hover:underline"
                style={{ color: 'var(--accent-brand)' }}
              >
                See how it works
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* The unified panel */}
          <div ref={panelRef} className="relative w-full max-w-[640px] lg:justify-self-end motion-reduce:!opacity-100 will-change-transform" style={{ transformStyle: 'preserve-3d' }}>
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
              <div
                className="flex items-center justify-between px-4 py-3 border-b"
                style={{ borderColor: 'var(--border-divider)', backgroundColor: 'var(--surface-dashboard-header)' }}
              >
                <span className="text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>DriveCommand · Active Loads</span>
                <span data-live className="flex items-center gap-1.5 motion-reduce:!opacity-100">
                  <span className="w-2 h-2 rounded-full animate-live-pulse" style={{ backgroundColor: 'var(--state-success)' }} />
                  <span className="text-xs font-mono" style={{ color: 'var(--state-success)' }}>LIVE</span>
                </span>
              </div>

              {/* Tabs: one per tool window. The "on" layer is what lights up. */}
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
                    {/* Lit state: a full overlay so the label swaps to on-brand text with it */}
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

              {/* Rows */}
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
          </div>
        </div>
      </div>
    </section>
  )
}
