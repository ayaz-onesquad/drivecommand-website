'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

export function NavbarScrollWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ WebkitBackdropFilter: isScrolled ? 'saturate(180%) blur(20px)' : 'blur(0px)' }}
      animate={
        isScrolled
          ? {
              backgroundColor: 'var(--navbar-bg)',
              backdropFilter: 'saturate(180%) blur(20px)',
              boxShadow: '0 1px 0 0 var(--navbar-border)',
              borderBottomWidth: '0px',
              borderBottomColor: 'transparent',
            }
          : {
              backgroundColor: 'rgba(0, 0, 0, 0)',
              backdropFilter: 'blur(0px)',
              boxShadow: 'none',
              borderBottomWidth: '0px',
              borderBottomColor: 'transparent',
            }
      }
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {children}
    </motion.header>
  )
}
