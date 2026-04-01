'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'

interface StatProps {
  value: number
  suffix: string
  label: string
  delay: number
}

function AnimatedStat({ value, suffix, label, delay }: StatProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps
    const increment = value / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <motion.div
      ref={ref}
      className="text-center px-6 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <div className="font-display text-4xl sm:text-5xl font-bold text-white mb-2">
        {count.toLocaleString()}
        <span className="text-brand-blue">{suffix}</span>
      </div>
      <div className="font-body text-sm text-slate-400">{label}</div>
    </motion.div>
  )
}

const STATS = [
  {
    value: 73,
    suffix: '%',
    label: 'of carriers still use spreadsheets for dispatch',
  },
  {
    value: 12,
    suffix: 'hrs',
    label: 'average time wasted weekly on paperwork',
  },
  {
    value: 40,
    suffix: '%',
    label: 'revenue lost to invoicing delays',
  },
]

export function ProblemBar() {
  return (
    <section className="bg-slate-900 border-y border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-800">
          {STATS.map((stat, index) => (
            <AnimatedStat
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
