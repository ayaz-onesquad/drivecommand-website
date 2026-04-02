import type { Metadata } from 'next'
import Link from 'next/link'
import { Truck, Users, Target, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description: 'DriveCommand is built for the people who keep supply chains moving — independent truckers and fleet operators who deserve better tools.',
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
    description: 'Enterprise tools are bloated. We build what you need, skip what you don\'t, and make it all work together.',
  },
  {
    icon: Shield,
    title: 'Reliability Matters',
    description: 'Your business runs 24/7. DriveCommand is built for uptime and performance you can count on, every single day.',
  },
]

const TEAM = [
  {
    name: 'Marcus Chen',
    role: 'Co-Founder & CEO',
    bio: 'Former logistics operator. Built and sold a 50-truck fleet before starting DriveCommand to solve the software problems he faced firsthand.',
  },
  {
    name: 'Sarah Williams',
    role: 'Co-Founder & CTO',
    bio: 'Ex-Convoy engineering lead. 12 years building logistics systems that scale from startup to enterprise.',
  },
  {
    name: 'James Rodriguez',
    role: 'Head of Product',
    bio: 'Previously product at Samsara. Obsessed with building software that trucking professionals actually want to use.',
  },
  {
    name: 'Lisa Thompson',
    role: 'Head of Customer Success',
    bio: '15 years in trucking operations. Knows the industry inside and out and leads our support team.',
  },
]

const STATS = [
  { value: '2,500+', label: 'Fleets Served' },
  { value: '45,000+', label: 'Trucks Managed' },
  { value: '99.9%', label: 'Uptime' },
  { value: '4.8', label: 'Customer Rating' },
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
              We believe independent truckers and growing fleets deserve the same powerful tools
              that enterprise carriers have — without the enterprise complexity or price tag.
            </p>
            <p className="font-body text-lg text-theme-secondary leading-relaxed">
              DriveCommand exists to level the playing field. We build software that helps smaller
              operations compete, grow, and thrive in an industry that often overlooks them.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-theme-primary">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-4xl font-bold text-accent-blue mb-2">
                  {stat.value}
                </div>
                <div className="font-body text-sm text-theme-secondary">{stat.label}</div>
              </div>
            ))}
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
            A team with deep roots in trucking and logistics, building software that actually solves real problems.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
