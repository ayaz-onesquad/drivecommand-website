import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how DriveCommand collects, uses, and protects your personal information.',
  alternates: {
    canonical: '/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <main className="bg-dc2-ink min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <h1 className="text-4xl font-display font-bold text-dc-text-primary mb-4">
          Privacy Policy
        </h1>
        <p className="text-dc-text-secondary mb-12">
          Last updated: June 1, 2026
        </p>

        <div className="prose prose-invert prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-display font-semibold text-dc-text-primary mb-4">
              1. Information We Collect
            </h2>
            <p className="text-dc-text-secondary leading-relaxed">
              DriveCommand collects information you provide directly to us, including your name,
              email address, company information, and fleet data when you create an account or
              use our services. We also collect usage data, device information, and location data
              necessary to provide fleet management services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-dc-text-primary mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-dc-text-secondary leading-relaxed">
              We use the information we collect to provide, maintain, and improve our fleet
              management services, including dispatch, tracking, invoicing, and compliance features.
              We may also use your information to communicate with you about service updates,
              respond to your inquiries, and send promotional communications with your consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-dc-text-primary mb-4">
              3. Information Sharing
            </h2>
            <p className="text-dc-text-secondary leading-relaxed">
              We do not sell your personal information. We may share your information with service
              providers who assist in operating our platform, with your consent, or as required by
              law. Fleet data may be shared with authorized users within your organization as
              configured in your account settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-dc-text-primary mb-4">
              4. Data Security
            </h2>
            <p className="text-dc-text-secondary leading-relaxed">
              We implement industry-standard security measures to protect your data, including
              encryption in transit and at rest, secure data centers, access controls, and regular
              security audits. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-dc-text-primary mb-4">
              5. Data Retention
            </h2>
            <p className="text-dc-text-secondary leading-relaxed">
              We retain your information for as long as your account is active or as needed to
              provide services. We may retain certain information as required by law or for
              legitimate business purposes, such as resolving disputes or enforcing agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-dc-text-primary mb-4">
              6. Your Rights
            </h2>
            <p className="text-dc-text-secondary leading-relaxed">
              You have the right to access, correct, or delete your personal information. You may
              also opt out of promotional communications at any time. To exercise these rights,
              please contact us at team@drivecommand.io.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-dc-text-primary mb-4">
              7. Cookies and Tracking
            </h2>
            <p className="text-dc-text-secondary leading-relaxed">
              We use cookies and similar technologies to enhance your experience, analyze usage
              patterns, and deliver relevant content. You can manage cookie preferences through
              your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-dc-text-primary mb-4">
              8. Changes to This Policy
            </h2>
            <p className="text-dc-text-secondary leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any
              material changes by posting the new policy on this page and updating the
              &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-dc-text-primary mb-4">
              9. Contact Us
            </h2>
            <p className="text-dc-text-secondary leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a
                href="mailto:team@drivecommand.io"
                className="text-dc-accent hover:underline"
              >
                team@drivecommand.io
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
