'use client'

import { useState, useEffect } from 'react'
import { motionValue, type MotionValue } from 'motion/react'

const DESKTOP_BREAKPOINT = 768

/**
 * Hook to detect if viewport is desktop size (>= 768px).
 * Returns false on initial render (SSR-safe) and updates on resize.
 *
 * This is a JS-based check to avoid hydration mismatches.
 * All parallax effects should be gated behind this hook.
 */
export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT)
    }

    // Initial check
    checkIsDesktop()

    // Listen for resize
    window.addEventListener('resize', checkIsDesktop)
    return () => window.removeEventListener('resize', checkIsDesktop)
  }, [])

  return isDesktop
}

/**
 * Returns a static motion value (0) when not on desktop.
 * Useful for conditionally disabling parallax transforms.
 */
export function useStaticMotionValue(value: number = 0): MotionValue<number> {
  const [mv] = useState(() => motionValue(value))
  return mv
}
