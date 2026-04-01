'use client'

import { useScroll, useTransform, useReducedMotion, type MotionValue } from 'motion/react'
import { useIsDesktop, useStaticMotionValue } from './use-is-desktop'

interface UseParallaxOptions {
  /**
   * Parallax speed multiplier.
   * - Positive values move element opposite to scroll (standard parallax)
   * - 0.1 = very subtle, 0.5 = medium, 1.0 = matches scroll
   */
  speed?: number

  /**
   * Output range in pixels. Defaults to [-speed * 100, speed * 100].
   * For finer control, pass explicit values like [-40, 0] or [0, -60].
   */
  outputRange?: [number, number]
}

interface UseParallaxReturn {
  y: MotionValue<number>
  scrollYProgress: MotionValue<number>
  isDesktop: boolean
  shouldAnimate: boolean
}

/**
 * Hook for section-level parallax effects.
 *
 * Motion value flow:
 * 1. useScroll creates scrollYProgress (0-1) tracking window scroll
 * 2. useTransform maps scrollYProgress to y offset without re-renders
 * 3. The returned y motion value drives CSS transform via style={{ y }}
 *
 * All transforms are computed via Framer Motion's animation engine,
 * completely outside React's render cycle for optimal performance.
 *
 * Returns static motion value (0) on mobile OR when user prefers reduced motion.
 */
export function useParallax(options: UseParallaxOptions = {}): UseParallaxReturn {
  const {
    speed = 0.2,
    outputRange,
  } = options

  const isDesktop = useIsDesktop()
  const prefersReducedMotion = useReducedMotion()
  const staticY = useStaticMotionValue(0)

  // Track window scroll position (0-1 over document height)
  const { scrollYProgress } = useScroll()

  // Calculate output range: default is symmetric around 0 based on speed
  const range = outputRange ?? [0, -speed * 200]

  const y = useTransform(scrollYProgress, [0, 1], range)

  // Parallax only on desktop AND when user doesn't prefer reduced motion
  const shouldAnimate = isDesktop && !prefersReducedMotion

  // Return static motion value on mobile or reduced motion to avoid transforms
  return {
    y: shouldAnimate ? y : staticY,
    scrollYProgress,
    isDesktop,
    shouldAnimate,
  }
}

/**
 * Hook for rotation-based parallax (e.g., compass rose effect).
 * Returns a rotation motion value in degrees.
 */
export function useParallaxRotation(
  maxRotation: number = 8
): UseParallaxReturn & { rotation: MotionValue<number> } {
  const isDesktop = useIsDesktop()
  const prefersReducedMotion = useReducedMotion()
  const staticRotation = useStaticMotionValue(0)
  const staticY = useStaticMotionValue(0)

  // Track window scroll position
  const { scrollYProgress } = useScroll()

  const rotation = useTransform(scrollYProgress, [0, 1], [0, maxRotation])
  const y = useTransform(scrollYProgress, [0, 1], [0, -40])

  const shouldAnimate = isDesktop && !prefersReducedMotion

  return {
    y: shouldAnimate ? y : staticY,
    rotation: shouldAnimate ? rotation : staticRotation,
    scrollYProgress,
    isDesktop,
    shouldAnimate,
  }
}

/**
 * Hook for content micro-parallax (subtle floating text effect).
 * Uses smaller offset for headlines/subheadlines.
 * TIER 3: 0.5x effective speed for gentle content float.
 */
export function useContentParallax(): UseParallaxReturn {
  return useParallax({
    speed: 0.1,
    outputRange: [0, -20],
  })
}
