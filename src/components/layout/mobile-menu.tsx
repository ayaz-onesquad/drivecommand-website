'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'

const NAV_LINKS = [
  { href: '/#features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/demo', label: 'Demo' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          aria-label="Open navigation menu"
          className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
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
                className="fixed inset-0 bg-brand-dark z-50 md:hidden flex flex-col p-6"
                initial={{ y: '-100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-100%' }}
                transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              >
                <div className="flex items-center justify-between mb-10">
                  <span className="font-display font-bold text-xl text-white">
                    DriveCommand
                  </span>
                  <Dialog.Close asChild>
                    <button
                      aria-label="Close navigation menu"
                      className="p-2 text-slate-300 hover:text-white transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </Dialog.Close>
                </div>
                <nav className="flex flex-col gap-6">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-xl font-display text-slate-200 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto flex flex-col gap-3">
                  <Link
                    href="https://app.drivecommand.com/sign-in"
                    onClick={() => setOpen(false)}
                    className="w-full py-3 text-center text-slate-200 border border-slate-700 rounded-lg hover:border-slate-500 transition-colors font-body"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="https://app.drivecommand.com/sign-up"
                    onClick={() => setOpen(false)}
                    className="w-full py-3 text-center bg-brand-blue text-white rounded-lg hover:bg-blue-500 transition-colors font-body font-medium"
                  >
                    Start Free Trial
                  </Link>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
