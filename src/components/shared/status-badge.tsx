/**
 * StatusBadge — Load status indicator with semantic state colors.
 * UX reference: UX_GUIDELINES.md §6 Components (Status pills)
 *
 * Per brand guide:
 * - Height: 24px
 * - Radius: 0px
 * - Border: 1px in semantic color
 * - Background: 10% tint of semantic color
 * - Text: Mono 12/16 uppercase in semantic color
 * - Icon: Required (dot indicator serves as icon)
 *
 * Status → Semantic mapping:
 * - in-transit → warning (movement requires attention)
 * - delivered → success
 * - dispatched → info
 * - invoiced → success
 */

'use client'

import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

type LoadStatus = 'in-transit' | 'delivered' | 'dispatched' | 'invoiced'

// Map statuses to semantic state CSS variables
const STATUS_STYLES: Record<LoadStatus, {
  bg: string
  text: string
  border: string
  dot: string
}> = {
  'in-transit': {
    bg: 'var(--state-warning-tint)',
    text: 'var(--state-warning)',
    border: 'var(--state-warning)',
    dot: 'var(--state-warning)',
  },
  'delivered': {
    bg: 'var(--state-success-tint)',
    text: 'var(--state-success)',
    border: 'var(--state-success)',
    dot: 'var(--state-success)',
  },
  'dispatched': {
    bg: 'var(--state-info-tint)',
    text: 'var(--state-info)',
    border: 'var(--state-info)',
    dot: 'var(--state-info)',
  },
  'invoiced': {
    bg: 'var(--state-success-tint)',
    text: 'var(--state-success)',
    border: 'var(--state-success)',
    dot: 'var(--state-success)',
  },
}

const STATUS_LABELS: Record<LoadStatus, string> = {
  'in-transit': 'IN TRANSIT',
  'delivered': 'DELIVERED',
  'dispatched': 'DISPATCHED',
  'invoiced': 'INVOICED',
}

interface StatusBadgeProps {
  status?: LoadStatus
  className?: string
}

export function StatusBadge({ status = 'dispatched', className }: StatusBadgeProps) {
  const prefersReducedMotion = useReducedMotion()
  const isInTransit = status === 'in-transit'
  const styles = STATUS_STYLES[status]

  return (
    <motion.span
      className={cn(
        'inline-flex items-center gap-1.5 h-6 px-2 rounded-none',
        'text-[12px] leading-[16px] font-mono font-medium uppercase tracking-wide',
        'border',
        className
      )}
      style={{
        backgroundColor: styles.bg,
        color: styles.text,
        borderColor: styles.border,
      }}
      initial={{ scale: prefersReducedMotion ? 1 : 0.85, opacity: prefersReducedMotion ? 1 : 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Status dot — required per UX guidelines (never color alone) */}
      {isInTransit && !prefersReducedMotion ? (
        <motion.span
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: styles.dot }}
          aria-hidden="true"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      ) : (
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: styles.dot }}
          aria-hidden="true"
        />
      )}
      {STATUS_LABELS[status]}
    </motion.span>
  )
}
