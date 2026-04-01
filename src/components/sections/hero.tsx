'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-dark"
    >
      {/* Parallax background - animated dot grid */}
      <motion.div
        className="absolute inset-0 hidden md:block"
        style={{ y }}
      >
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dot-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#3b82f6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dot-grid)" />
          </svg>
        </div>
        {/* Animated route lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <motion.path
            d="M0,450 Q360,200 720,450 T1440,450"
            stroke="#3b82f6"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }}
          />
          <motion.path
            d="M0,300 Q480,500 960,300 T1440,300"
            stroke="#f59e0b"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop', delay: 1 }}
          />
        </svg>
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center"
        style={{ opacity }}
      >
        <motion.h1
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Fleet Management Built for{' '}
          <span className="text-brand-blue">Modern Carriers</span>
        </motion.h1>

        <motion.p
          className="font-body text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Dispatch, track, invoice, and stay compliant — all in one platform.
          DriveCommand gives independent operators and growing fleets the tools
          they need to run smarter.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link
            href="https://app.drivecommand.com/sign-up"
            className="w-full sm:w-auto px-8 py-4 bg-brand-blue text-white font-body font-medium rounded-lg hover:bg-blue-500 transition-colors text-center"
          >
            Start Free Trial
          </Link>
          <Link
            href="#demo-video"
            className="w-full sm:w-auto px-8 py-4 border border-slate-600 text-slate-200 font-body font-medium rounded-lg hover:border-slate-400 hover:text-white transition-colors text-center"
          >
            Watch the Demo
          </Link>
        </motion.div>

        {/* Trust line */}
        <motion.p
          className="font-body text-sm text-slate-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          No credit card required · Setup in under 10 minutes · Cancel anytime
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  )
}
