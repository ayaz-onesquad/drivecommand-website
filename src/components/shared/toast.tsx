/**
 * Toast — Notification component with semantic state colors.
 * UX reference: UX_GUIDELINES.md §6 Components, §11 Motion
 *
 * Per brand guide:
 * - Motion: 240ms cubic-out for modals/notifications
 * - Radius: 0px (exception: could use input radius for softer feel)
 * - No bounce animations
 *
 * Contrast pairings used:
 *   --state-success on --state-success-tint (high contrast)
 *   --state-critical on --state-critical-tint (high contrast)
 */

'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle, XCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ToastProps {
  message: string
  type: 'success' | 'error'
  isVisible: boolean
  onClose: () => void
  duration?: number
}

export function Toast({ message, type, isVisible, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  const isSuccess = type === 'success'

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="flex items-start gap-3 p-4 rounded-none shadow-lg max-w-md border"
            style={{
              backgroundColor: isSuccess ? 'var(--state-success-tint)' : 'var(--state-critical-tint)',
              borderColor: isSuccess ? 'var(--state-success)' : 'var(--state-critical)',
            }}
          >
            {isSuccess ? (
              <CheckCircle
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                style={{ color: 'var(--state-success)' }}
              />
            ) : (
              <XCircle
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                style={{ color: 'var(--state-critical)' }}
              />
            )}
            <p
              className="font-body text-sm flex-1"
              style={{ color: isSuccess ? 'var(--state-success)' : 'var(--state-critical)' }}
            >
              {message}
            </p>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-1 rounded-none hover:opacity-70 transition-opacity"
              style={{ color: isSuccess ? 'var(--state-success)' : 'var(--state-critical)' }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Custom hook for toast management
export function useToast() {
  const [toast, setToast] = useState<{
    message: string
    type: 'success' | 'error'
    isVisible: boolean
  }>({
    message: '',
    type: 'success',
    isVisible: false,
  })

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type, isVisible: true })
  }

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }))
  }

  return { toast, showToast, hideToast }
}
