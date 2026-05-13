'use client'

import type { JSX } from 'react'
import { useRef } from 'react'
import { motion, useReducedMotion, useInView, type Variants } from 'motion/react'

interface ScrollRevealProps {
  /** Child elements to animate */
  children: React.ReactNode
  /** Animation direction: 'up', 'down', 'left', 'right' (default: 'up') */
  direction?: 'up' | 'down' | 'left' | 'right'
  /** Distance to travel in pixels (default: 60) */
  distance?: number
  /** Animation duration in seconds (default: 0.8) */
  duration?: number
  /** Stagger delay for sequential animations in seconds (default: 0) */
  delay?: number
  /** Enable blur effect on entrance (default: false) */
  blur?: boolean
  /** Enable scale effect (default: true) */
  scale?: boolean
  /** Viewport margin for triggering animation (default: '-100px') */
  margin?: string
  /** Additional CSS classes */
  className?: string
  /** Run animation once or every time element enters view (default: true) */
  once?: boolean
  /** HTML element type to render (default: 'div') */
  as?: keyof JSX.IntrinsicElements
}

// Bold dramatic ease-out curve
const dramaticEase = [0.16, 1, 0.3, 1] as const

export function ScrollReveal({
  children,
  direction = 'up',
  distance = 60,
  duration = 0.8,
  delay = 0,
  blur = false,
  scale = true,
  margin = '-100px',
  className = '',
  once = true,
  as = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isInView = useInView(ref, { once, margin: margin as any })
  const prefersReducedMotion = useReducedMotion()

  // Calculate initial position based on direction
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { x: 0, y: distance }
      case 'down':
        return { x: 0, y: -distance }
      case 'left':
        return { x: distance, y: 0 }
      case 'right':
        return { x: -distance, y: 0 }
    }
  }

  const initialPosition = getInitialPosition()

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: initialPosition.x,
      y: initialPosition.y,
      scale: scale ? 0.95 : 1,
      filter: blur ? 'blur(10px)' : 'blur(0px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
    },
  }

  // If reduced motion, skip animation
  if (prefersReducedMotion) {
    const Component = as as keyof JSX.IntrinsicElements
    return <Component className={className}>{children}</Component>
  }

  const MotionComponent = motion[as as keyof typeof motion] as typeof motion.div

  return (
    <MotionComponent
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: dramaticEase,
      }}
    >
      {children}
    </MotionComponent>
  )
}

// Staggered container for animating multiple children
interface StaggerContainerProps {
  children: React.ReactNode
  /** Stagger delay between children in seconds (default: 0.1) */
  stagger?: number
  /** Additional CSS classes */
  className?: string
  /** HTML element type to render (default: 'div') */
  as?: keyof JSX.IntrinsicElements
}

export function StaggerContainer({
  children,
  stagger = 0.1,
  className = '',
  as = 'div',
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const prefersReducedMotion = useReducedMotion()

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : stagger,
        delayChildren: 0,
      },
    },
  }

  const MotionComponent = motion[as as keyof typeof motion] as typeof motion.div

  return (
    <MotionComponent
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {children}
    </MotionComponent>
  )
}

// Item to be used inside StaggerContainer
interface StaggerItemProps {
  children: React.ReactNode
  /** Animation direction (default: 'up') */
  direction?: 'up' | 'down' | 'left' | 'right'
  /** Distance to travel in pixels (default: 40) */
  distance?: number
  /** Enable scale effect (default: true) */
  scale?: boolean
  /** Additional CSS classes */
  className?: string
  /** HTML element type to render (default: 'div') */
  as?: keyof JSX.IntrinsicElements
}

export function StaggerItem({
  children,
  direction = 'up',
  distance = 40,
  scale = true,
  className = '',
  as = 'div',
}: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion()

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { x: 0, y: distance }
      case 'down':
        return { x: 0, y: -distance }
      case 'left':
        return { x: distance, y: 0 }
      case 'right':
        return { x: -distance, y: 0 }
    }
  }

  const initialPosition = getInitialPosition()

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      x: initialPosition.x,
      y: initialPosition.y,
      scale: scale ? 0.95 : 1,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.7,
        ease: dramaticEase,
      },
    },
  }

  const MotionComponent = motion[as as keyof typeof motion] as typeof motion.div

  return (
    <MotionComponent className={className} variants={itemVariants}>
      {children}
    </MotionComponent>
  )
}

// Text reveal animation (word by word)
interface TextRevealProps {
  /** Text to animate */
  text: string
  /** Delay between words in seconds (default: 0.08) */
  wordDelay?: number
  /** Initial delay before animation starts (default: 0) */
  delay?: number
  /** Additional CSS classes */
  className?: string
}

export function TextReveal({
  text,
  wordDelay = 0.08,
  delay = 0,
  className = '',
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const prefersReducedMotion = useReducedMotion()
  const words = text.split(' ')

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>
  }

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
            transition={{
              duration: 0.6,
              delay: delay + i * wordDelay,
              ease: dramaticEase,
            }}
          >
            {word}
            {i < words.length - 1 && '\u00A0'}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
