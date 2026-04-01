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

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className={cn(
              'flex items-start gap-3 p-4 rounded-lg shadow-lg max-w-md',
              type === 'success'
                ? 'bg-brand-green/10 border border-brand-green/30'
                : 'bg-red-500/10 border border-red-500/30'
            )}
          >
            {type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            )}
            <p className={cn(
              'font-body text-sm flex-1',
              type === 'success' ? 'text-brand-green' : 'text-red-400'
            )}>
              {message}
            </p>
            <button
              onClick={onClose}
              className={cn(
                'flex-shrink-0 p-1 rounded hover:bg-white/10 transition-colors',
                type === 'success' ? 'text-brand-green' : 'text-red-400'
              )}
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
