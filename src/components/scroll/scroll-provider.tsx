'use client'

import { useEffect } from 'react'
import { ScrollTrigger } from '@/lib/gsap'

/**
 * Page-level housekeeping for scroll-driven acts.
 * Refreshes ScrollTrigger once web fonts have painted (pinned act heights
 * depend on real line boxes) and again after images settle.
 */
export function ScrollProvider() {
  useEffect(() => {
    let cancelled = false
    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh()
    }
    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh)
    }
    const t = window.setTimeout(refresh, 600)
    window.addEventListener('load', refresh)
    return () => {
      cancelled = true
      window.clearTimeout(t)
      window.removeEventListener('load', refresh)
    }
  }, [])

  return null
}
