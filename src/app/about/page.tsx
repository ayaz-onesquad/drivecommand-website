import type { Metadata } from 'next'
import Link from 'next/link'
import { Truck, Users, Target, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description: 'DriveCommand is built for the people who keep supply chains moving — independent truckers and fleet operators who deserve better tools.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About DriveCommand',
    description: 'Built for the people who keep supply chains moving.',
    type: 'website',
  },
}

const VALUES = [
  {
    icon: Truck,
    title: 'Built for Trucking',
    description: 'We\'re not a generic SaaS trying to fit trucking into our box. Every feature is designed for how fleet operators actually work.',
  },
  {
    icon: Users,
    title: 'Operator-First',
    description: 'We build for the dispatcher at 5 AM, the owner-operator on the road, and the fleet manager juggling a dozen things at once.',
  },
  {
    icon: Target,
    title: 'Focused Simplicity',
    description: 'Most fleet software is bloated. We build what you need, skip what you don\'t, and make it all work together.',
  },
  {
    icon: Shield,
    title: 'Reliability Matters',
    description: 'Your business runs 24/7. DriveCommand is built for uptime and performance you can count on, every single day.',
  },
]

const TEAM = [
  {
    name: 'Ayaz Mohammed',
    role: 'Co-Founder',
    bio: 'Former logistics carrier owner who built and ran a 20-truck fleet. Software engineer who experienced firsthand the gaps in fleet management tools and set out to fix them.',
  },
  {
    name: 'Sammy Issa',
    role: 'Co-Founder',
    bio: 'Owner-operator turned software engineer. Brings real-world experience from behind the wheel and under the hood to every feature we build.',
  },
  {
    name: 'Nadeem Awawda',
    role: 'Co-Founder',
    bio: 'Former dispatcher and software engineer. Knows the daily chaos of coordinating loads and drivers, and builds tools that actually solve those problems.',
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero section */}
      <section className="pt-32 pb-16 px-4 bg-theme-primary">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-theme-primary mb-6">
            Fleet Management Built by<br />
            <span className="text-accent-blue">People Who Get It</span>
          </h1>
          <p className="font-body text-lg text-theme-secondary max-w-2xl mx-auto">
            DriveCommand was founded by trucking operators frustrated with clunky, overpriced software.
            We build the tools we wished we had.
          </p>
        </div>
      </section>

      {/* Mission section */}
      <section className="py-16 px-4 bg-theme-secondary">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border p-8 md:p-12 bg-theme-card border-theme-medium">
            <h2 className="font-display text-2xl font-bold text-theme-primary mb-6">Our Mission</h2>
            <p className="font-body text-lg text-theme-secondary leading-relaxed mb-6">
              We believe every carrier — from owner-operators to growing fleets — deserves powerful,
              professional tools without the complexity or inflated price tags.
            </p>
            <p className="font-body text-lg text-theme-secondary leading-relaxed">
              DriveCommand exists to level the playing field. We build software that helps smaller
              operations compete, grow, and thrive in an industry that often overlooks them.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-theme-secondary">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-theme-primary text-center mb-12">
            What Drives Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="flex gap-4 p-6 rounded-xl border bg-theme-card border-theme-medium"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-glow-accent)' }}>
                  <value.icon className="w-6 h-6" style={{ color: 'var(--color-brand)' }} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-theme-primary mb-2">
                    {value.title}
                  </h3>
                  <p className="font-body text-sm text-theme-secondary leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 bg-theme-primary">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl font-bold text-theme-primary text-center mb-4">
            Leadership Team
          </h2>
          <p className="font-body text-theme-secondary text-center mb-12 max-w-2xl mx-auto">
            We grew up around logistics and technology. Three software engineers who lived the trucking life — running fleets, dispatching loads, and driving trucks — combined both worlds to build DriveCommand.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((person) => (
              <div
                key={person.name}
                className="p-6 rounded-xl border bg-theme-card border-theme-medium"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center bg-theme-card-hover">
                    <span className="font-display text-lg font-semibold text-theme-primary">
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-theme-primary">
                      {person.name}
                    </h3>
                    <p className="font-body text-sm text-accent-blue mb-2">{person.role}</p>
                    <p className="font-body text-sm text-theme-secondary leading-relaxed">
                      {person.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-theme-secondary">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold text-theme-primary mb-4">
            Ready to See DriveCommand in Action?
          </h2>
          <p className="font-body text-theme-secondary mb-8">
            Join thousands of fleet operators who trust DriveCommand to run their business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex px-8 py-3 font-body font-medium rounded-lg transition-colors bg-dc-accent hover:opacity-90 text-dc-text-on-accent"
            >
              Get Early Access
            </Link>
            <Link
              href="/contact"
              className="inline-flex px-8 py-3 border text-theme-primary font-body font-medium rounded-lg transition-colors border-theme-medium hover:border-theme-primary hover:bg-theme-card"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
