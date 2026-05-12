const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://drivecommand.co'

interface OrganizationSchema {
  '@context': 'https://schema.org'
  '@type': 'Organization'
  name: string
  description: string
  url: string
  logo: string
  sameAs?: string[]
  contactPoint?: {
    '@type': 'ContactPoint'
    contactType: string
    email?: string
  }
}

interface SoftwareApplicationSchema {
  '@context': 'https://schema.org'
  '@type': 'SoftwareApplication'
  name: string
  description: string
  applicationCategory: string
  operatingSystem: string
  offers: {
    '@type': 'Offer'
    price: string
    priceCurrency: string
    priceSpecification?: {
      '@type': 'UnitPriceSpecification'
      price: string
      priceCurrency: string
      unitText: string
    }
  }
  aggregateRating?: {
    '@type': 'AggregateRating'
    ratingValue: string
    ratingCount: string
  }
}

interface WebSiteSchema {
  '@context': 'https://schema.org'
  '@type': 'WebSite'
  name: string
  description: string
  url: string
  potentialAction?: {
    '@type': 'SearchAction'
    target: string
    'query-input': string
  }
}

const organizationSchema: OrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DriveCommand',
  description:
    'Fleet management software for independent carriers and growing fleets. Dispatch, track, invoice, and stay compliant — all in one place.',
  url: BASE_URL,
  logo: `${BASE_URL}/brand/wordmark-on-light.svg`,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'team@drivecommand.io',
  },
}

const softwareApplicationSchema: SoftwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'DriveCommand',
  description:
    'All-in-one fleet management platform for carriers of any size. Includes dispatch, GPS tracking, settlements, invoicing, HOS compliance, and IFTA reporting.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '49',
      priceCurrency: 'USD',
      unitText: 'per truck per month',
    },
  },
}

const webSiteSchema: WebSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'DriveCommand',
  description: 'Miles Ahead. Fleet management for carriers.',
  url: BASE_URL,
}

export function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webSiteSchema),
        }}
      />
    </>
  )
}
