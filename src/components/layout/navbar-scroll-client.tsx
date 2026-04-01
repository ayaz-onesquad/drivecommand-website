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
      animate={
        isScrolled
          ? {
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 1px 3px 0 rgba(0,0,0,0.3)',
              borderBottomWidth: '1px',
              borderBottomColor: 'rgba(30,41,59,0.5)',
            }
          : {
              backgroundColor: 'rgba(0, 0, 0, 0)',
              backdropFilter: 'blur(0px)',
              boxShadow: 'none',
              borderBottomWidth: '1px',
              borderBottomColor: 'rgba(0,0,0,0)',
            }
      }
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {children}
    </motion.header>
  )
}
