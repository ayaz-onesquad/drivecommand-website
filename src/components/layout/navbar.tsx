import Link from 'next/link'
import { NavbarScrollWrapper } from './navbar-scroll-client'
import { MobileMenu } from './mobile-menu'

const NAV_LINKS = [
  { href: '/#features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/demo', label: 'Demo' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  return (
    <NavbarScrollWrapper>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-display font-bold text-lg text-white"
            aria-label="DriveCommand home"
          >
            {/* DC Mark — simple SVG logotype */}
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              aria-hidden="true"
            >
              <rect width="28" height="28" rx="6" fill="#3b82f6" />
              <path
                d="M7 8h6c3.866 0 7 3.134 7 7s-3.134 7-7 7H7V8z"
                fill="white"
              />
              <path
                d="M17 14l4-4v8l-4-4z"
                fill="#0f172a"
              />
            </svg>
            <span>DriveCommand</span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-4" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-body text-slate-300 hover:text-white transition-colors px-3 py-2"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="https://app.drivecommand.com/sign-in"
              className="text-sm font-body text-slate-300 hover:text-white px-4 py-2 rounded-lg border border-transparent hover:border-slate-700 transition-all"
            >
              Sign In
            </Link>
            <Link
              href="https://app.drivecommand.com/sign-up"
              className="text-sm font-body font-medium bg-brand-blue text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Mobile hamburger */}
          <MobileMenu />
        </div>
      </div>
    </NavbarScrollWrapper>
  )
}
