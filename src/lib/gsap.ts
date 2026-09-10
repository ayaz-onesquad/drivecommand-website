'use client'

/**
 * Single GSAP registration point.
 * Import { gsap, ScrollTrigger, useGSAP } from here so the plugin is only
 * registered once and ScrollTrigger config is applied consistently.
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
  ScrollTrigger.config({ ignoreMobileResize: true })
}

/** Dramatic ease-out used across the scroll devices (brand guide: nothing bounces). */
export const EASE_OUT = 'power3.out'

/** Media conditions shared by every act. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)'
export const REDUCED = '(prefers-reduced-motion: reduce)'
export const DESKTOP = '(min-width: 768px)'
export const MOBILE = '(max-width: 767px)'
export const FINE_POINTER = '(hover: hover) and (pointer: fine)'

/**
 * A play-once trigger. The beat plays to completion when it enters the
 * viewport and never rewinds, so a reader who stops scrolling always sees a
 * finished frame, never a half-risen headline.
 */
export function once(trigger: Element | string, start = 'top 78%') {
  return { trigger, start, toggleActions: 'play none none none', once: true } as const
}

export { gsap, ScrollTrigger, useGSAP }
