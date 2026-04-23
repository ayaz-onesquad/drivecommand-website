'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

/**
 * Logo variant determines the visual arrangement of the logo.
 * - `horizontal`: Primary lockup with glyph left, wordmark right (default for nav/footer)
 * - `stacked`: Compact lockup with glyph above wordmark (for tight spaces)
 * - `wordmark`: Text only, editorial use
 * - `glyph`: Icon only, for favicon/app icon/stamp use
 */
export type LogoVariant = 'horizontal' | 'stacked' | 'wordmark' | 'glyph'

/**
 * Approved background colors for the logo per brand guide.
 * Use `auto` to inherit from parent context.
 */
export type LogoBackground =
  | 'ink'
  | 'navy'
  | 'signal'
  | 'slate'
  | 'bone'
  | 'bone2'
  | 'silver'
  | 'paper'
  | 'auto'

/**
 * Predefined size presets per brand guide:
 * - `sm`: 24px (minimum allowed)
 * - `md`: 48px (UI standard)
 * - `lg`: 96px (digital standard)
 * - `xl`: 144px (hero/display)
 * Or pass a number for custom pixel height.
 */
export type LogoSize = 'sm' | 'md' | 'lg' | 'xl' | number

export interface LogoProps {
  /**
   * Visual arrangement of the logo.
   * @default 'horizontal'
   */
  variant?: LogoVariant

  /**
   * Background context for contrast handling.
   * Dark backgrounds (ink, navy, signal, slate) use light wordmark.
   * Light backgrounds (bone, bone2, silver, paper) use dark wordmark.
   * @default 'auto'
   */
  background?: LogoBackground

  /**
   * Height of the logo. Uses brand guide presets or custom pixel value.
   * Minimum size is 24px per brand guidelines.
   * @default 'md' (48px)
   */
  size?: LogoSize

  /**
   * Additional CSS classes to apply to the logo container.
   */
  className?: string
}

const SIZE_MAP: Record<Exclude<LogoSize, number>, number> = {
  sm: 24,
  md: 48,
  lg: 96,
  xl: 144,
}

const DARK_BACKGROUNDS = new Set(['ink', 'navy', 'signal', 'slate'])

/**
 * DriveCommand Logo Component
 *
 * Renders the official DriveCommand logo per brand guide v1.0.
 * Currently only the glyph SVG is available; wordmark is rendered
 * using DM Sans 700 (the brand display font).
 *
 * @example
 * // Navbar usage
 * <Logo variant="horizontal" size="md" />
 *
 * @example
 * // Footer usage
 * <Logo variant="horizontal" size="md" background="ink" />
 *
 * @example
 * // Favicon usage
 * <Logo variant="glyph" size="sm" />
 */
export function Logo({
  variant = 'horizontal',
  background = 'auto',
  size = 'md',
  className = '',
}: LogoProps) {
  const pixelSize = typeof size === 'number' ? size : SIZE_MAP[size]
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Warn in dev if size is below minimum
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && pixelSize < 24) {
      console.warn(
        `[Logo] Size ${pixelSize}px is below the minimum allowed size of 24px per brand guidelines.`
      )
    }
  }, [pixelSize])

  // Determine if we're on a dark background:
  // - If background is explicitly set, use that
  // - If background is 'auto', detect from current theme
  const isDarkBg =
    background === 'auto'
      ? mounted && resolvedTheme === 'dark'
      : DARK_BACKGROUNDS.has(background)

  const textColor = isDarkBg ? 'var(--dc-color-text-primary)' : 'var(--dc-color-text-dark)'

  // Select glyph variant based on background:
  // - Dark backgrounds → use light glyph (Logo 2)
  // - Light backgrounds → use dark glyph (Logo 1)
  // Default to dark glyph before mount to match light theme SSR
  const glyphSrc = isDarkBg ? '/brand/logo/glyph-on-dark.svg' : '/brand/logo/glyph-on-light.svg'

  // Calculate dimensions based on variant
  const glyphSize = pixelSize
  const wordmarkFontSize = Math.max(12, pixelSize * 0.35)
  const gap = Math.max(4, pixelSize * 0.1)

  // Render glyph SVG inline for color control (the SVG uses its own fills)
  const GlyphMark = (
    <Image
      src={glyphSrc}
      alt=""
      width={glyphSize}
      height={glyphSize}
      className="flex-shrink-0"
      priority
    />
  )

  // Wordmark text using DM Sans (--font-display)
  const Wordmark = (
    <span
      className="font-display font-bold whitespace-nowrap"
      style={{
        color: textColor,
        fontSize: `${wordmarkFontSize}px`,
        lineHeight: 1,
      }}
    >
      DriveCommand
    </span>
  )

  // Render based on variant
  switch (variant) {
    case 'glyph':
      return (
        <div className={`inline-flex ${className}`} aria-label="DriveCommand">
          {GlyphMark}
        </div>
      )

    case 'wordmark':
      return (
        <div className={`inline-flex ${className}`} aria-label="DriveCommand">
          {Wordmark}
        </div>
      )

    case 'stacked':
      return (
        <div
          className={`inline-flex flex-col items-center ${className}`}
          style={{ gap: `${gap}px` }}
          aria-label="DriveCommand"
        >
          {GlyphMark}
          {Wordmark}
        </div>
      )

    case 'horizontal':
    default:
      return (
        <div
          className={`inline-flex items-center ${className}`}
          style={{ gap: `${gap}px` }}
          aria-label="DriveCommand"
        >
          {GlyphMark}
          {Wordmark}
        </div>
      )
  }
}

export default Logo
