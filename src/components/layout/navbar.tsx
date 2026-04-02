'use client'

import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { ArrowRight, Truck } from 'lucide-react'
import { NavbarScrollWrapper } from './navbar-scroll-client'
import { MobileMenu } from './mobile-menu'
import { ThemeToggle } from '@/components/shared/theme-toggle'

const NAV_LINKS = [
  { href: '/#features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/demo', label: 'Demo' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

function NavLink({ href, label }: { href: string; label: string }) {
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  return (
    <Link
      href={href}
      className="relative text-sm font-body transition-colors px-3 py-2"
      style={{ color: 'var(--text-secondary)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label}
      {!prefersReducedMotion && (
        <motion.span
          className="absolute bottom-1 left-3 right-3 h-0.5 rounded-full"
          style={{ backgroundColor: 'var(--accent-cyan)' }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        />
      )}
    </Link>
  )
}

// Variant A: Primary filled button with lift + glow + arrow animation
const primaryButtonVariants = {
  rest: { y: 0, boxShadow: '0 4px 15px rgba(117, 240, 212, 0.25)' },
  hover: { y: -2, boxShadow: '0 8px 25px rgba(117, 240, 212, 0.35)' },
  tap: { y: 0, boxShadow: '0 2px 8px rgba(117, 240, 212, 0.25)' },
}

const arrowVariants = {
  rest: { opacity: 0, x: -4 },
  hover: { opacity: 1, x: 0 },
}

function CTAButton() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      animate="rest"
    >
      <Link href="/contact" className="block">
        <motion.span
          className="inline-flex items-center gap-1.5 text-sm font-body font-medium bg-dc-accent text-dc-text-on-accent px-4 py-2 rounded-lg"
          variants={prefersReducedMotion ? {} : primaryButtonVariants}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          Get Early Access
          <motion.span
            variants={prefersReducedMotion ? {} : arrowVariants}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="inline-flex"
          >
            <ArrowRight size={16} />
          </motion.span>
        </motion.span>
      </Link>
    </motion.div>
  )
}

// Variant B: Ghost button with border + background fill on hover
function GhostButton({ href, label }: { href: string; label: string }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      whileHover={prefersReducedMotion ? {} : { y: -1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <Link
        href={href}
        className="text-sm font-body text-theme-secondary hover:text-theme-primary px-4 py-2 rounded-lg border border-transparent hover:border-sky-400/40 hover:bg-sky-400/10 transition-all duration-200"
      >
        {label}
      </Link>
    </motion.div>
  )
}

export function Navbar() {
  return (
    <NavbarScrollWrapper>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-display font-bold text-lg"
            style={{ color: 'var(--text-primary)' }}
            aria-label="DriveCommand home"
          >
            {/* Truck icon for brand anchoring */}
            <Truck size={20} style={{ color: 'var(--accent-load)' }} />
            <span className="font-display font-bold">DriveCommand</span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-4" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </nav>

          {/* Desktop CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <GhostButton href="https://app.drivecommand.com/sign-in" label="Sign In" />
            <ThemeToggle />
            <CTAButton />
          </div>

          {/* Mobile hamburger */}
          <MobileMenu />
        </div>
      </div>
    </NavbarScrollWrapper>
  )
}
