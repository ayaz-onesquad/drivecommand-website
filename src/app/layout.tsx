import type { Metadata } from 'next'
import { DM_Sans, Inter, JetBrains_Mono } from 'next/font/google'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ThemeProvider } from '@/lib/theme-provider'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  // NOTE: Brand guide uses drivecommand.co, audit found drivecommand.com
  // Defaulting to .co per authoritative brand guide — FLAG for human review
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://drivecommand.co'
  ),
  title: {
    default: 'DriveCommand — Miles Ahead.',
    template: '%s | DriveCommand',
  },
  description:
    'Carrier operations built for the road. Dispatch, track, invoice, and stay compliant — all in one place. Miles Ahead.',
  openGraph: {
    siteName: 'DriveCommand',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
