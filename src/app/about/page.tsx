import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'DriveCommand is built for the people who keep supply chains moving — independent truckers and fleet operators who deserve better tools.',
  openGraph: {
    title: 'About DriveCommand',
    description: 'Built for the people who keep supply chains moving.',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <section className="min-h-screen py-24 px-4">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-4xl font-bold text-white mb-6">
          About DriveCommand
        </h1>
        <p className="font-body text-lg text-slate-300 leading-relaxed">
          DriveCommand is fleet management built for the people who keep supply chains moving.
          We build tools that are as capable as enterprise software but actually designed for how
          independent operators and growing fleets work.
        </p>
        {/* Full about content — Phase 4 */}
      </div>
    </section>
  )
}
