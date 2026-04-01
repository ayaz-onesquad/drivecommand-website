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
    description: 'Enterprise tools are bloated. We build what you need, skip what you don\'t, and make it all work together seamlessly.',
  },
  {
    icon: Shield,
    title: 'Reliability Matters',
    description: 'Your business runs 24/7. Our platform is built for uptime and performance you can count on, every single day.',
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
  { value: '99.9%', label: 'Platform Uptime' },
  { value: '4.8', label: 'Customer Rating' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-brand-dark to-slate-900">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
            Fleet Management Built by<br />
            <span className="text-brand-blue">People Who Get It</span>
          </h1>
          <p className="font-body text-lg text-slate-400 max-w-2xl mx-auto">
            DriveCommand was founded by trucking operators frustrated with clunky, overpriced software.
            We build the tools we wished we had.
          </p>
        </div>
      </section>

      {/* Mission section */}
      <section className="py-16 px-4 bg-slate-900">
        <div className="mx-auto max-w-4xl">
          <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-8 md:p-12">
            <h2 className="font-display text-2xl font-bold text-white mb-6">Our Mission</h2>
            <p className="font-body text-lg text-slate-300 leading-relaxed mb-6">
              We believe independent truckers and growing fleets deserve the same powerful tools
              that enterprise carriers have — without the enterprise complexity or price tag.
            </p>
            <p className="font-body text-lg text-slate-300 leading-relaxed">
              DriveCommand exists to level the playing field. We build software that helps smaller
              operations compete, grow, and thrive in an industry that often overlooks them.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-brand-dark">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-4xl font-bold text-brand-blue mb-2">
                  {stat.value}
                </div>
                <div className="font-body text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-slate-900">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-white text-center mb-12">
            What Drives Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="flex gap-4 p-6 rounded-xl border border-slate-700 bg-slate-800/30"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                  <value.icon className="w-6 h-6 text-brand-blue" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="font-body text-sm text-slate-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 bg-brand-dark">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl font-bold text-white text-center mb-4">
            Leadership Team
          </h2>
          <p className="font-body text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            A team with deep roots in trucking and logistics, building software that actually solves real problems.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TEAM.map((person) => (
              <div
                key={person.name}
                className="p-6 rounded-xl border border-slate-700 bg-slate-800/30"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center">
                    <span className="font-display text-lg font-semibold text-white">
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">
                      {person.name}
                    </h3>
                    <p className="font-body text-sm text-brand-blue mb-2">{person.role}</p>
                    <p className="font-body text-sm text-slate-400 leading-relaxed">
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
      <section className="py-16 px-4 bg-slate-900">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold text-white mb-4">
            Ready to See DriveCommand in Action?
          </h2>
          <p className="font-body text-slate-400 mb-8">
            Join thousands of fleet operators who trust DriveCommand to run their business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://app.drivecommand.com/sign-up"
              className="inline-flex px-8 py-3 bg-brand-blue text-white font-body font-medium rounded-lg hover:bg-blue-500 transition-colors"
            >
              Start Free Trial
            </Link>
            <Link
              href="/contact"
              className="inline-flex px-8 py-3 border border-slate-600 text-white font-body font-medium rounded-lg hover:border-slate-400 hover:bg-slate-800 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
