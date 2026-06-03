'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useInView } from 'motion/react'

interface CountUpProps {
  /** The target number to count up to */
  end: number
  /** Starting number (default: 0) */
  start?: number
  /** Animation duration in milliseconds (default: 1200) */
  duration?: number
  /** Number of decimal places (default: 0) */
  decimals?: number
  /** Prefix to display before the number (e.g., "$") */
  prefix?: string
  /** Suffix to display after the number (e.g., "%", "K", "M") */
  suffix?: string
  /** Whether to format with thousands separators (default: true) */
  separator?: boolean
  /** Additional CSS classes */
  className?: string
  /** Inline styles */
  style?: React.CSSProperties
  /** Delay before starting animation in milliseconds (default: 0) */
  delay?: number
}

// Dramatic ease-out curve for bold animations
const easeOutExpo = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

function formatNumber(value: number, decimals: number, separator: boolean): string {
  const fixed = value.toFixed(decimals)
  if (!separator) return fixed

  const [intPart, decPart] = fixed.split('.')
  const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return decPart ? `${formatted}.${decPart}` : formatted
}

export function CountUp({
  end,
  start = 0,
  duration = 1200,
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = true,
  className = '',
  style,
  delay = 0,
}: CountUpProps) {
  const [count, setCount] = useState(start)
  const ref = useRef<HTMLSpanElement>(null)
  const animationRef = useRef<number | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const prefersReducedMotion = useReducedMotion()

  // Handle animation based on view state
  useEffect(() => {
    // Cancel any ongoing animation when leaving view
    if (!isInView) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      setCount(start)
      return
    }

    // If reduced motion, show final value immediately
    if (prefersReducedMotion) {
      setCount(end)
      return
    }

    // Start animation after delay
    timeoutRef.current = setTimeout(() => {
      const startTime = performance.now()
      const difference = end - start

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easedProgress = easeOutExpo(progress)
        const currentValue = start + difference * easedProgress

        setCount(currentValue)

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate)
        } else {
          animationRef.current = null
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }, delay)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [isInView, end, start, duration, delay, prefersReducedMotion])

  const displayValue = formatNumber(count, decimals, separator)

  return (
    <motion.span
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: isInView ? delay / 1000 : 0,
      }}
    >
      {prefix}
      {displayValue}
      {suffix}
    </motion.span>
  )
}

// Preset variants for common use cases
export function CountUpPercentage({
  end,
  decimals = 1,
  style,
  ...props
}: Omit<CountUpProps, 'suffix' | 'decimals'> & { decimals?: number; style?: React.CSSProperties }) {
  return <CountUp end={end} decimals={decimals} suffix="%" style={style} {...props} />
}

export function CountUpDollars({
  end,
  decimals = 0,
  style,
  ...props
}: Omit<CountUpProps, 'prefix' | 'decimals'> & { decimals?: number; style?: React.CSSProperties }) {
  return <CountUp end={end} decimals={decimals} prefix="$" style={style} {...props} />
}

export function CountUpK({
  end,
  decimals = 0,
  style,
  ...props
}: Omit<CountUpProps, 'suffix' | 'decimals'> & { decimals?: number; style?: React.CSSProperties }) {
  return <CountUp end={end / 1000} decimals={decimals} suffix="K" style={style} {...props} />
}
