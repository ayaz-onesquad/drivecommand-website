'use client'

import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap'

type Direction = 'up' | 'down' | 'left' | 'right' | 'iris'

const START: Record<Direction, string> = {
  up: 'inset(0 0 100% 0)',
  down: 'inset(100% 0 0 0)',
  left: 'inset(0 0 0 100%)',
  right: 'inset(0 100% 0 0)',
  iris: 'inset(45% 45% 45% 45% round 24px)',
}
const END: Record<Direction, string> = {
  up: 'inset(0 0 0% 0)',
  down: 'inset(0% 0 0 0)',
  left: 'inset(0 0 0 0%)',
  right: 'inset(0 0% 0 0)',
  iris: 'inset(0% 0% 0% 0% round 0px)',
}

/**
 * REVEAL (wipe device)
 * A clip-path wipe scrubbed by the element's own entry. A wipe reads as a
 * change of state, so use it where something becomes something else.
 * Under reduced motion the content is simply present.
 */
export function RevealPanel({
  children,
  direction = 'up',
  className = '',
  start = 'top 88%',
  end = 'top 30%',
}: {
  children: ReactNode
  direction?: Direction
  className?: string
  start?: string
  end?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          el,
          { clipPath: START[direction] },
          {
            clipPath: END[direction],
            ease: 'none',
            scrollTrigger: { trigger: el, start, end, scrub: true },
          }
        )
      })
      return () => mm.revert()
    },
    { scope: ref, dependencies: [direction, start, end] }
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
