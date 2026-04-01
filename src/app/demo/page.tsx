import type { Metadata } from 'next'
import Link from 'next/link'
import { InteractiveDemo } from '@/components/sections/interactive-demo'

export const metadata: Metadata = {
  title: 'Demo',
  description: 'See DriveCommand in action. Walk through a day in the life of a fleet operator using our platform.',
  openGraph: {
    title: 'DriveCommand Demo',
    description: 'See DriveCommand in action. Walk through a day in the life of a fleet operator.',
    type: 'website',
  },
}

export default function DemoPage() {
  return (
    <main className="min-h-screen">
      {/* Hero section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-brand-dark to-slate-50">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            See DriveCommand in Action
          </h1>
          <p className="font-body text-lg text-slate-300 max-w-2xl mx-auto">
            Walk through a typical day managing your fleet with DriveCommand.
            From booking a load to tracking your profit, see how every step just works.
          </p>
        </div>
      </section>

      {/* Interactive Demo */}
      <InteractiveDemo />

      {/* CTA Section */}
      <section className="py-24 px-4 bg-brand-dark">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Run Your Fleet Smarter?
          </h2>
          <p className="font-body text-lg text-slate-400 max-w-2xl mx-auto mb-8">
            Start your free trial today. No credit card required.
            Get up and running in under 5 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://app.drivecommand.com/sign-up"
              className="inline-flex px-8 py-4 bg-brand-blue text-white font-body font-medium rounded-lg hover:bg-blue-500 transition-colors"
            >
              Start Free Trial
            </Link>
            <Link
              href="/contact"
              className="inline-flex px-8 py-4 border border-slate-600 text-white font-body font-medium rounded-lg hover:border-slate-400 hover:bg-slate-800 transition-colors"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
