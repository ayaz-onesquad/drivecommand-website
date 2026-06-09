'use client'

import { usePathname } from 'next/navigation'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://drivecommand.co'

// Human-readable names for routes
const ROUTE_NAMES: Record<string, string> = {
  '': 'Home',
  'pricing': 'Pricing',
  'about': 'About',
  'demo': 'Demo',
  'contact': 'Contact',
  'privacy': 'Privacy Policy',
  'terms': 'Terms of Service',
}

export function BreadcrumbSchema() {
  const pathname = usePathname()

  // Don't render breadcrumbs for home page
  if (pathname === '/') {
    return null
  }

  const segments = pathname.split('/').filter(Boolean)

  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: BASE_URL,
    },
    ...segments.map((segment, index) => ({
      '@type': 'ListItem',
      position: index + 2,
      name: ROUTE_NAMES[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
      item: `${BASE_URL}/${segments.slice(0, index + 1).join('/')}`,
    })),
  ]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
