'use client'

import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP, once, MOTION_OK } from '@/lib/gsap'

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
 * A clip-path wipe that plays once, to completion, the moment the element
 * enters the viewport. It is not tied to scroll position, so nobody is ever
 * left looking at a half-clipped heading. Under reduced motion the content
 * is simply present.
 */
export function RevealPanel({
  children,
  direction = 'up',
  className = '',
  start = 'top 80%',
  duration = 1.1,
}: {
  children: ReactNode
  direction?: Direction
  className?: string
  start?: string
  duration?: number
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
          { clipPath: END[direction], duration, ease: 'power3.inOut', scrollTrigger: once(el, start), clearProps: 'clipPath' }
        )
      })
      return () => mm.revert()
    },
    { scope: ref, dependencies: [direction, start, duration] }
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
