'use client'

import { motion, useReducedMotion, AnimatePresence } from 'motion/react'
import { useEffect, useState } from 'react'

interface WelcomeAnimationProps {
  onComplete: () => void
}

// Dramatic ease-out curve
const dramaticEase = [0.16, 1, 0.3, 1] as const

export function WelcomeAnimation({ onComplete }: WelcomeAnimationProps) {
  const prefersReducedMotion = useReducedMotion()
  const [stage, setStage] = useState(0)

  // Stage progression: 0 → 1 → 2 → 3 → 4 → complete
  useEffect(() => {
    if (prefersReducedMotion) {
      // Skip to final stage immediately
      setStage(4)
      const timer = setTimeout(onComplete, 1500)
      return () => clearTimeout(timer)
    }

    const timings = [1000, 1000, 1200, 1400, 1200] // ms for each stage - slower for better UX
    let currentStage = 0

    const advanceStage = () => {
      currentStage++
      if (currentStage <= 4) {
        setStage(currentStage)
        setTimeout(advanceStage, timings[currentStage])
      } else {
        onComplete()
      }
    }

    const timer = setTimeout(advanceStage, timings[0])
    return () => clearTimeout(timer)
  }, [prefersReducedMotion, onComplete])

  return (
    <div className="flex flex-col items-center justify-center py-8 px-6 min-h-[300px]">
      <AnimatePresence mode="wait">
        {/* Stage 0-1: Checkmark draws in */}
        {stage >= 0 && stage < 2 && (
          <motion.div
            key="checkmark"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: dramaticEase }}
            className="flex items-center justify-center"
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Circle */}
              <motion.circle
                cx="40"
                cy="40"
                r="36"
                stroke="var(--state-success)"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: dramaticEase }}
              />
              {/* Checkmark */}
              <motion.path
                d="M24 42L34 52L56 28"
                stroke="var(--state-success)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.3, ease: dramaticEase }}
              />
            </svg>
          </motion.div>
        )}

        {/* Stage 2: Logo + Welcome text */}
        {stage >= 2 && stage < 3 && (
          <motion.div
            key="welcome"
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: dramaticEase }}
          >
            {/* Mini DriveCommand logo */}
            <motion.div
              className="w-16 h-16 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'var(--accent-brand)' }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: dramaticEase }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M8 10L16 6L24 10V22L16 26L8 22V10Z"
                  stroke="var(--text-on-brand)"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M16 14V20"
                  stroke="var(--text-on-brand)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="16" cy="11" r="2" fill="var(--text-on-brand)" />
              </svg>
            </motion.div>
            <motion.h3
              className="font-display text-2xl font-bold text-center"
              style={{ color: 'var(--text-primary)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15, ease: dramaticEase }}
            >
              Welcome to the future
            </motion.h3>
          </motion.div>
        )}

        {/* Stage 3: Truck animation */}
        {stage >= 3 && stage < 4 && (
          <motion.div
            key="truck"
            className="relative w-full h-24 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="absolute top-1/2 -translate-y-1/2"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Truck with trail */}
              <div className="flex items-center">
                {/* Trail */}
                <motion.div
                  className="h-1 rounded-full mr-2"
                  style={{
                    background: 'linear-gradient(to right, transparent, var(--accent-brand))',
                    width: '120px'
                  }}
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 0.6, width: 120 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
                {/* Semi truck */}
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <rect x="1" y="8" width="14" height="8" rx="1" fill="var(--accent-brand)" />
                  <path d="M15 10H20C21.1 10 22 10.9 22 12V16H15V10Z" fill="var(--accent-brand)" />
                  <circle cx="5" cy="17" r="2" fill="var(--accent-brand)" />
                  <circle cx="11" cy="17" r="2" fill="var(--accent-brand)" />
                  <circle cx="19" cy="17" r="2" fill="var(--accent-brand)" />
                </svg>
              </div>
            </motion.div>
            {/* Road line */}
            <div
              className="absolute bottom-6 left-0 right-0 h-0.5"
              style={{ backgroundColor: 'var(--border-subtle)' }}
            />
          </motion.div>
        )}

        {/* Stage 4: Success confirmation */}
        {stage >= 4 && (
          <motion.div
            key="success"
            className="flex flex-col items-center gap-6 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: dramaticEase }}
          >
            <motion.div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--state-success-tint)' }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, ease: dramaticEase }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <motion.path
                  d="M5 12L10 17L20 7"
                  stroke="var(--state-success)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.1, ease: dramaticEase }}
                />
              </svg>
            </motion.div>

            <div>
              <p
                className="font-display text-2xl font-bold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                You&apos;re on the list!
              </p>
              <p
                className="font-body text-base"
                style={{ color: 'var(--text-secondary)' }}
              >
                We&apos;ll be in touch soon
              </p>
            </div>

            <motion.p
              className="font-body text-sm max-w-xs"
              style={{ color: 'var(--text-secondary)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Get ready to leave spreadsheets behind.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
