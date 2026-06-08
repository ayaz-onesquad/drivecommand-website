import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | DriveCommand',
  description: 'Read the terms and conditions for using DriveCommand fleet management services.',
}

export default function TermsPage() {
  return (
    <main className="bg-dc2-ink min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <h1 className="text-4xl font-display font-bold text-dc-text-primary mb-4">
          Terms of Service
        </h1>
        <p className="text-dc-text-secondary mb-12">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="prose prose-invert prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-display font-semibold text-dc-text-primary mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-dc-text-secondary leading-relaxed">
              By accessing or using DriveCommand&apos;s fleet management platform (&quot;Service&quot;),
              you agree to be bound by these Terms of Service. If you do not agree to these terms,
              do not use the Service. These terms apply to all users, including fleet operators,
              dispatchers, drivers, and administrators.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-dc-text-primary mb-4">
              2. Description of Service
            </h2>
            <p className="text-dc-text-secondary leading-relaxed">
              DriveCommand provides a cloud-based fleet management platform that includes dispatch
              management, real-time tracking, invoicing, compliance tools, and related services.
              Features may vary based on your subscription plan. We reserve the right to modify,
              suspend, or discontinue any aspect of the Service at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-dc-text-primary mb-4">
              3. Account Registration
            </h2>
            <p className="text-dc-text-secondary leading-relaxed">
              You must provide accurate and complete information when creating an account. You are
              responsible for maintaining the security of your account credentials and for all
              activities that occur under your account. Notify us immediately of any unauthorized
              use of your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-dc-text-primary mb-4">
              4. Subscription and Payment
            </h2>
            <p className="text-dc-text-secondary leading-relaxed">
              Paid features require a valid subscription. Fees are billed in advance on a monthly
              or annual basis depending on your selected plan. All fees are non-refundable except
              as required by law. We may change our pricing with 30 days&apos; notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-dc-text-primary mb-4">
              5. Acceptable Use
            </h2>
            <p className="text-dc-text-secondary leading-relaxed">
              You agree to use the Service only for lawful purposes and in accordance with these
              Terms. You may not: (a) violate any applicable laws or regulations; (b) infringe on
              the rights of others; (c) interfere with or disrupt the Service; (d) attempt to gain
              unauthorized access to any systems; or (e) use the Service to transmit malware or
              harmful code.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-dc-text-primary mb-4">
              6. Data Ownership
            </h2>
            <p className="text-dc-text-secondary leading-relaxed">
              You retain ownership of all data you submit to the Service (&quot;Your Data&quot;).
              You grant DriveCommand a limited license to use Your Data solely to provide and
              improve the Service. We will not sell or share Your Data with third parties except
              as described in our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-dc-text-primary mb-4">
              7. Intellectual Property
            </h2>
            <p className="text-dc-text-secondary leading-relaxed">
              The Service, including all software, designs, and content, is owned by DriveCommand
              and protected by intellectual property laws. You may not copy, modify, distribute,
              or reverse engineer any part of the Service without our written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-dc-text-primary mb-4">
              8. Disclaimer of Warranties
            </h2>
            <p className="text-dc-text-secondary leading-relaxed">
              THE SERVICE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR
              IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR
              SECURE. YOU USE THE SERVICE AT YOUR OWN RISK.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-dc-text-primary mb-4">
              9. Limitation of Liability
            </h2>
            <p className="text-dc-text-secondary leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, DRIVECOMMAND SHALL NOT BE LIABLE FOR ANY
              INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF
              PROFITS OR REVENUES. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US
              IN THE TWELVE MONTHS PRECEDING THE CLAIM.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-dc-text-primary mb-4">
              10. Termination
            </h2>
            <p className="text-dc-text-secondary leading-relaxed">
              Either party may terminate this agreement at any time. Upon termination, your right
              to use the Service will cease immediately. You may export Your Data before
              termination. We may retain certain data as required by law or for legitimate
              business purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-dc-text-primary mb-4">
              11. Governing Law
            </h2>
            <p className="text-dc-text-secondary leading-relaxed">
              These Terms shall be governed by the laws of the State of Delaware, without regard
              to conflict of law principles. Any disputes shall be resolved in the state or
              federal courts located in Delaware.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-dc-text-primary mb-4">
              12. Changes to Terms
            </h2>
            <p className="text-dc-text-secondary leading-relaxed">
              We may modify these Terms at any time. Material changes will be communicated via
              email or through the Service. Continued use of the Service after changes constitutes
              acceptance of the modified Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-dc-text-primary mb-4">
              13. Contact
            </h2>
            <p className="text-dc-text-secondary leading-relaxed">
              For questions about these Terms, contact us at{' '}
              <a
                href="mailto:legal@drivecommand.com"
                className="text-dc-accent hover:underline"
              >
                legal@drivecommand.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
