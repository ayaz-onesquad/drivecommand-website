'use client'

import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef, useState } from 'react'
import type { LucideIcon } from 'lucide-react'

export type AnimationType =
  | 'truck-drive'
  | 'pulse-ring'
  | 'rotate-once'
  | 'bounce-up'
  | 'shake'
  | 'draw-path'

interface AnimatedIconProps {
  icon: LucideIcon | React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>
  animation: AnimationType
  size?: number
  className?: string
  triggerOnHover?: boolean
  color?: string
  staggerDelay?: number
}

// Spring config for one-time animations
const bounceSpring = { type: 'spring' as const, stiffness: 300, damping: 20 }

export function AnimatedIcon({
  icon: Icon,
  animation,
  size = 24,
  className = '',
  triggerOnHover = false,
  color,
  staggerDelay = 0,
}: AnimatedIconProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const prefersReducedMotion = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)

  // If reduced motion is preferred, render static icon
  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        <Icon size={size} style={color ? { color } : undefined} />
      </div>
    )
  }

  const shouldTrigger = triggerOnHover ? isHovered : isInView

  // Render based on animation type
  switch (animation) {
    case 'truck-drive':
      // CSS animation for infinite loop - compositor thread
      return (
        <div
          ref={ref}
          className={`${className} animate-truck-drive`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Icon size={size} style={color ? { color } : undefined} />
        </div>
      )

    case 'pulse-ring':
      // CSS animation for infinite loop - compositor thread
      return (
        <div
          ref={ref}
          className={`relative ${className}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Pulsing ring behind the icon */}
          <span
            className="absolute inset-0 rounded-full animate-pulse-ring"
            style={{
              backgroundColor: color || 'currentColor',
            }}
          />
          <Icon size={size} className="relative z-10" style={color ? { color } : undefined} />
        </div>
      )

    case 'rotate-once':
      // Framer Motion for one-time triggered animation
      return (
        <motion.div
          ref={ref}
          className={className}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          animate={shouldTrigger ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut', delay: staggerDelay }}
        >
          <Icon size={size} style={color ? { color } : undefined} />
        </motion.div>
      )

    case 'bounce-up':
      // Framer Motion with tween for one-time bounce (spring doesn't support 3+ keyframes)
      return (
        <motion.div
          ref={ref}
          className={className}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          initial={{ y: 0 }}
          animate={shouldTrigger ? { y: [0, -6, 0] } : {}}
          transition={{
            duration: 0.4,
            ease: 'easeOut',
            delay: staggerDelay,
            times: [0, 0.4, 1],
          }}
        >
          <Icon size={size} style={color ? { color } : undefined} />
        </motion.div>
      )

    case 'shake':
      // Framer Motion for one-time shake (urgency)
      return (
        <motion.div
          ref={ref}
          className={className}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          initial={{ x: 0 }}
          animate={shouldTrigger ? { x: [0, -3, 3, -2, 2, 0] } : {}}
          transition={{
            duration: 0.4,
            ease: 'easeOut',
            delay: staggerDelay,
          }}
        >
          <Icon size={size} style={color ? { color } : undefined} />
        </motion.div>
      )

    case 'draw-path':
      // Framer Motion for draw-in effect with line underneath
      return (
        <motion.div
          ref={ref}
          className={`relative ${className}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={shouldTrigger ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: staggerDelay }}
          >
            <Icon size={size} style={color ? { color } : undefined} />
          </motion.div>
          {/* Progress line underneath */}
          <motion.div
            className="absolute -bottom-1 left-0 h-0.5 rounded-full"
            style={{ backgroundColor: color || 'currentColor' }}
            initial={{ width: '0%' }}
            animate={shouldTrigger ? { width: '100%' } : {}}
            transition={{ duration: 0.8, ease: 'easeOut', delay: staggerDelay + 0.2 }}
          />
        </motion.div>
      )

    default:
      return (
        <div ref={ref} className={className}>
          <Icon size={size} style={color ? { color } : undefined} />
        </div>
      )
  }
}

// Animated quote mark SVG with draw-path effect
interface AnimatedQuoteMarkProps {
  className?: string
  color?: string
  staggerDelay?: number
}

export function AnimatedQuoteMark({
  className = '',
  color,
  staggerDelay = 0,
}: AnimatedQuoteMarkProps) {
  const ref = useRef<SVGSVGElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const prefersReducedMotion = useReducedMotion()

  const fillColor = color || 'var(--accent-cyan)'

  // Static render for reduced motion
  if (prefersReducedMotion) {
    return (
      <svg
        ref={ref}
        className={className}
        style={{ color: fillColor }}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
    )
  }

  return (
    <motion.svg
      ref={ref}
      className={className}
      style={{ color: fillColor }}
      viewBox="0 0 24 24"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 0.2, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: staggerDelay, ease: 'easeOut' }}
    >
      <motion.path
        d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
        fill="currentColor"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 0.8, delay: staggerDelay + 0.2, ease: 'easeOut' }}
      />
    </motion.svg>
  )
}
