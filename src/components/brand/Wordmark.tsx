/**
 * Wordmark — Typographic "DriveCommand" brand component.
 * UX reference: UX_GUIDELINES.md §4 Typography, Apple WWDC25 left-aligned patterns
 *
 * Replaces logo image in most contexts. Logo images reserved for:
 * - Favicon
 * - OG images
 * - Social-share card
 * - Footer ceremonial mark
 *
 * Contrast pairings used:
 *   --text-primary on --surface-base (15.46:1 AAA)
 *   --text-on-brand on --accent-brand (5.57:1 AA)
 */

import { cn } from '@/lib/utils'

interface WordmarkProps {
  /**
   * Size variant:
   * - default: 24px (nav, footer)
   * - compact: 18px (mobile, dense contexts)
   * - large: 32px (hero, about page)
   */
  variant?: 'default' | 'compact' | 'large'

  /**
   * Color mode:
   * - auto: Uses --text-primary (adapts to light/dark)
   * - light: Forces light text (for dark backgrounds)
   * - dark: Forces dark text (for light backgrounds)
   */
  mode?: 'auto' | 'light' | 'dark'

  className?: string
}

const sizeClasses = {
  compact: 'text-lg',   // 18px
  default: 'text-2xl',  // 24px
  large: 'text-[32px]', // 32px
}

const colorClasses = {
  auto: 'text-[var(--text-primary)]',
  light: 'text-[#F5F5F7]', // Bone
  dark: 'text-[#1D1D1F]',  // Ink
}

export function Wordmark({
  variant = 'default',
  mode = 'auto',
  className,
}: WordmarkProps) {
  return (
    <span
      className={cn(
        'font-display font-semibold tracking-[-0.02em]',
        sizeClasses[variant],
        colorClasses[mode],
        className
      )}
    >
      DriveCommand
    </span>
  )
}
