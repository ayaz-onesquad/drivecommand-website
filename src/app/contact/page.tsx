import type { Metadata } from 'next'
import { ContactForm } from './contact-form'
import { Mail, Phone, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Sales',
  description: 'Talk to our team about Enterprise pricing, custom integrations, and onboarding support.',
  openGraph: {
    title: 'Contact DriveCommand Sales',
    description: 'Talk to our team about Enterprise pricing and custom solutions.',
    type: 'website',
  },
}

const CONTACT_INFO = [
  {
    icon: Mail,
    label: 'Email',
    value: 'sales@drivecommand.co',
    href: 'mailto:sales@drivecommand.co',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '(888) 555-0123',
    href: 'tel:+18885550123',
  },
  {
    icon: MapPin,
    label: 'Office',
    value: 'Austin, TX',
    href: null,
  },
]

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Hero section */}
      <section className="pt-32 pb-16 px-4 bg-theme-primary">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-theme-primary mb-4">
            Let&apos;s Talk
          </h1>
          <p className="font-body text-lg text-theme-secondary max-w-2xl mx-auto">
            Interested in Enterprise? Have questions about DriveCommand?
            Fill out the form and we&apos;ll get back to you within one business day.
          </p>
        </div>
      </section>

      {/* Form section */}
      <section className="py-16 px-4 bg-theme-secondary">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact info sidebar */}
            <div className="lg:col-span-1">
              <h2 className="font-display text-xl font-semibold text-theme-primary mb-6">
                Get in Touch
              </h2>
              <div className="space-y-6">
                {CONTACT_INFO.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-brand-blue" />
                    </div>
                    <div>
                      <p className="font-body text-sm text-theme-secondary">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-body text-theme-primary hover:text-accent-blue transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-body text-theme-primary">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-6 rounded-xl border bg-theme-card border-theme-medium">
                <h3 className="font-display text-lg font-semibold text-theme-primary mb-3">
                  Enterprise Benefits
                </h3>
                <ul className="space-y-2 font-body text-sm text-theme-secondary">
                  <li>• Unlimited trucks and users</li>
                  <li>• Custom integrations & API access</li>
                  <li>• Dedicated account manager</li>
                  <li>• SLA-backed uptime guarantee</li>
                  <li>• Custom onboarding & training</li>
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border p-8 bg-theme-card border-theme-medium">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
