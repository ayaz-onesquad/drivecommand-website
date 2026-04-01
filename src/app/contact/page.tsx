import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Sales',
  description: 'Talk to our team about Enterprise pricing, custom integrations, and onboarding support.',
  openGraph: {
    title: 'Contact DriveCommand Sales',
    description: 'Talk to our team about Enterprise pricing and custom solutions.',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <section className="min-h-screen py-24 px-4">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-4xl font-bold text-white mb-4">
          Contact Sales
        </h1>
        <p className="font-body text-slate-400 mb-12">
          Interested in Enterprise? Tell us about your fleet and we&apos;ll be in touch within one business day.
        </p>
        {/* Lead capture form — full implementation in Phase 4 */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-8">
          <p className="font-body text-slate-500 text-sm">
            Contact form coming soon. Email us at{' '}
            <a href="mailto:sales@drivecommand.com" className="text-brand-blue hover:underline">
              sales@drivecommand.com
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
