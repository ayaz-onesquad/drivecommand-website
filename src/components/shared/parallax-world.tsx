'use client'

/**
 * THREE-TIER PARALLAX LAYER ARCHITECTURE
 * ========================================
 *
 * TIER 1 — GLOBAL BACKGROUND LAYER (this file: ParallaxWorld)
 * ├── Position: fixed, inset: 0, z-index: 0
 * ├── Contains: Slowly drifting geometric elements (roads/lines)
 * ├── Contains: Radial gradient "light sources" that shift with scroll
 * ├── Speed: 0.05x scroll (nearly imperceptible)
 * └── Purpose: Creates subliminal depth continuity across all sections
 *
 * TIER 2 — SECTION-LEVEL DECORATIVE PARALLAX (in each section file)
 * ├── Position: absolute within section, z-index: 0
 * ├── Contains: Section-specific decorative SVGs
 * ├── Speed: 0.25x scroll
 * └── Purpose: Adds depth behind section content
 *
 * TIER 3 — CONTENT MICRO-PARALLAX (in each section file)
 * ├── Position: relative within section content
 * ├── Applies to: Headline + subheadline text blocks
 * ├── Speed: 0.1x scroll (y: 0 → -20px)
 * └── Purpose: Makes text feel like it's floating above background
 *
 * LAYER STACKING (z-index):
 * 0: ParallaxWorld (fixed, global)
 * 1: Section backgrounds (relative)
 * 2: Section decorative parallax elements
 * 10: Section content (text, cards, etc.)
 */

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { useIsDesktop } from '@/hooks/use-is-desktop'

export function ParallaxWorld() {
  const isDesktop = useIsDesktop()
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()

  // Global layer moves very slowly — 0.05x scroll speed
  const globalY = useTransform(scrollYProgress, [0, 1], ['0%', '5%'])

  // Light sources shift positions subtly
  const light1X = useTransform(scrollYProgress, [0, 1], ['20%', '25%'])
  const light1Y = useTransform(scrollYProgress, [0, 1], ['15%', '20%'])
  const light2X = useTransform(scrollYProgress, [0, 1], ['70%', '65%'])
  const light2Y = useTransform(scrollYProgress, [0, 1], ['60%', '55%'])
  const light3X = useTransform(scrollYProgress, [0, 1], ['40%', '45%'])
  const light3Y = useTransform(scrollYProgress, [0, 1], ['80%', '75%'])

  // Don't render on mobile or when reduced motion is preferred
  if (!isDesktop || prefersReducedMotion) {
    return null
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Slowly drifting geometric road/route lines */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: globalY }}
      >
        <svg
          className="w-full h-[200vh] opacity-[0.03]"
          viewBox="0 0 1920 2160"
          preserveAspectRatio="xMidYMin slice"
          fill="none"
        >
          {/* Horizontal route lines representing roads */}
          <line x1="0" y1="200" x2="1920" y2="220" stroke="#38bdf8" strokeWidth="1" />
          <line x1="0" y1="400" x2="1920" y2="380" stroke="#38bdf8" strokeWidth="0.5" />
          <line x1="0" y1="600" x2="1920" y2="620" stroke="#38bdf8" strokeWidth="1" />
          <line x1="0" y1="800" x2="1920" y2="790" stroke="#38bdf8" strokeWidth="0.5" />
          <line x1="0" y1="1000" x2="1920" y2="1010" stroke="#38bdf8" strokeWidth="1" />
          <line x1="0" y1="1200" x2="1920" y2="1180" stroke="#38bdf8" strokeWidth="0.5" />
          <line x1="0" y1="1400" x2="1920" y2="1420" stroke="#38bdf8" strokeWidth="1" />
          <line x1="0" y1="1600" x2="1920" y2="1590" stroke="#38bdf8" strokeWidth="0.5" />
          <line x1="0" y1="1800" x2="1920" y2="1810" stroke="#38bdf8" strokeWidth="1" />
          <line x1="0" y1="2000" x2="1920" y2="1990" stroke="#38bdf8" strokeWidth="0.5" />

          {/* Subtle diagonal connectors */}
          <path d="M0,300 Q480,350 960,300 T1920,320" stroke="#38bdf8" strokeWidth="0.5" opacity="0.5" />
          <path d="M0,900 Q480,850 960,900 T1920,880" stroke="#38bdf8" strokeWidth="0.5" opacity="0.5" />
          <path d="M0,1500 Q480,1550 960,1500 T1920,1520" stroke="#38bdf8" strokeWidth="0.5" opacity="0.5" />
        </svg>
      </motion.div>

      {/* Radial gradient light sources that shift with scroll */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full will-change-transform"
        style={{
          left: light1X,
          top: light1Y,
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.05) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full will-change-transform"
        style={{
          left: light2X,
          top: light2Y,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full will-change-transform"
        style={{
          left: light3X,
          top: light3Y,
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.04) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  )
}
