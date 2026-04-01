import Link from 'next/link'

const FOOTER_LINKS = {
  Product: [
    { href: '#features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: '#demo', label: 'Demo' },
    { href: '/changelog', label: 'Changelog' },
  ],
  Company: [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/careers', label: 'Careers' },
    { href: '/blog', label: 'Blog' },
  ],
  Resources: [
    { href: '/docs', label: 'Documentation' },
    { href: '/support', label: 'Support' },
    { href: '/status', label: 'System Status' },
    { href: '/security', label: 'Security' },
  ],
  Legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/cookies', label: 'Cookie Policy' },
    { href: '/dpa', label: 'Data Processing' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Logo + tagline */}
        <div className="mb-10">
          <Link
            href="/"
            className="font-display font-bold text-xl text-white"
            aria-label="DriveCommand home"
          >
            DriveCommand
          </Link>
          <p className="mt-2 text-sm font-body text-slate-400 max-w-xs">
            Fleet management built for modern carriers. Dispatch, track, and invoice — all in one platform.
          </p>
        </div>

        {/* 4-column link grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-display font-semibold text-slate-400 uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-body text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright bar */}
        <div className="mt-10 border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-body text-slate-500">
            &copy; {new Date().getFullYear()} DriveCommand, Inc. All rights reserved.
          </p>
          <p className="text-xs font-body text-slate-600">
            Built for the road. Designed for scale.
          </p>
        </div>
      </div>
    </footer>
  )
}
