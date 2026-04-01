'use client'

import { useState } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/shared/theme-toggle'

// Variant A: Primary filled button with lift + glow + arrow animation
const primaryButtonVariants = {
  rest: { y: 0, boxShadow: '0 4px 15px rgba(59, 130, 246, 0.2)' },
  hover: { y: -2, boxShadow: '0 8px 25px rgba(59, 130, 246, 0.35)' },
  tap: { y: 0, boxShadow: '0 2px 8px rgba(59, 130, 246, 0.2)' },
}

const arrowVariants = {
  rest: { opacity: 0, x: -4 },
  hover: { opacity: 1, x: 0 },
}

// Variant B: Ghost button
const ghostButtonVariants = {
  rest: { y: 0 },
  hover: { y: -1 },
}

const NAV_LINKS = [
  { href: '/#features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/demo', label: 'Demo' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          aria-label="Open navigation menu"
          className="md:hidden p-2 text-theme-secondary hover:text-theme-primary transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
      </Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-black/60 z-40 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild aria-describedby={undefined}>
              <motion.div
                className="fixed inset-0 bg-theme-primary z-50 md:hidden flex flex-col p-6"
                initial={{ y: '-100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-100%' }}
                transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              >
                <div className="flex items-center justify-between mb-10">
                  <span className="font-display font-bold text-xl text-theme-primary">
                    DriveCommand
                  </span>
                  <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <Dialog.Close asChild>
                      <button
                        aria-label="Close navigation menu"
                        className="p-2 text-theme-secondary hover:text-theme-primary transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </Dialog.Close>
                  </div>
                </div>
                <nav className="flex flex-col gap-6">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-xl font-display text-theme-secondary hover:text-theme-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto flex flex-col gap-3">
                  {/* Variant B: Ghost button */}
                  <motion.div
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                    variants={prefersReducedMotion ? {} : ghostButtonVariants}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <Link
                      href="https://app.drivecommand.com/sign-in"
                      onClick={() => setOpen(false)}
                      className="block w-full py-3 text-center text-theme-secondary border border-theme-medium rounded-lg hover:border-sky-400/40 hover:bg-sky-400/10 transition-all duration-200 font-body"
                    >
                      Sign In
                    </Link>
                  </motion.div>

                  {/* Variant A: Primary button with arrow */}
                  <motion.div
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    animate="rest"
                  >
                    <Link
                      href="/contact"
                      onClick={() => setOpen(false)}
                      className="block"
                    >
                      <motion.span
                        className="w-full py-3 flex items-center justify-center gap-2 bg-accent-blue text-white rounded-lg font-body font-medium"
                        variants={prefersReducedMotion ? {} : primaryButtonVariants}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      >
                        Get Early Access
                        <motion.span
                          className="inline-flex"
                          variants={prefersReducedMotion ? {} : arrowVariants}
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        >
                          <ArrowRight size={16} />
                        </motion.span>
                      </motion.span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
