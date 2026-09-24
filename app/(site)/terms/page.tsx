import Link from 'next/link'
import type { Metadata } from 'next'
import { SITE, DISCLOSURES } from '@/lib/site'
import { Callout } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms governing use of the My Health Enrollment website, insurance information, forms and communication services.',
  alternates: { canonical: '/terms' },
}

/** ⚠️  Template, not legal advice. Have counsel review before launch. */
const LAST_UPDATED = 'September 2026'

export default function TermsPage() {
  return (
    <section className="container-page py-14 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl">Terms of Service</h1>
        <p className="mt-3 text-sm text-slate-500">Last updated: {LAST_UPDATED}</p>

        <div className="mt-8">
          <Callout tone="warn" title="Not a government website">
            {DISCLOSURES.notGovernment}
          </Callout>
        </div>

        <div className="prose-page mt-10">
          <h2>1. Who we are</h2>
          <p>
            {SITE.name} is the doing-business-as brand of {SITE.legalEntity}, an independent
            licensed insurance agency. By using this site you agree to these Terms. If you do not
            agree, please do not use the site.
          </p>

          <h2>2. What we provide</h2>
          <p>
            We provide insurance education, consultation and enrollment assistance through
            licensed independent agents. We help consumers understand ACA Marketplace options,
            obtain quotes for life, dental, vision and group coverage, and schedule consultations.
          </p>
          <p>
            <strong>We are not:</strong> an insurance carrier, a government agency, a healthcare
            provider, a tax advisor, or a legal advisor.
          </p>

          <h2>3. Information is educational, not a quote</h2>
          <p>{DISCLOSURES.noGuarantee}</p>
          <p>
            Any estimator or calculator on this site produces an educational illustration based on
            assumptions. It does not determine eligibility, subsidy amounts, or plan prices. Only
            the Marketplace can determine eligibility, based on your complete application.
          </p>

          <h2>4. Licensing</h2>
          <p>{DISCLOSURES.agentLicensing} {SITE.licenseNote}</p>

          <h2>5. Carrier independence</h2>
          <p>{DISCLOSURES.carriers}</p>

          <h2>6. Communications</h2>
          <p>
            When you check a contact-consent box on a form, you agree to the communications
            described beside that box. Message frequency varies and message and data rates may
            apply. Reply STOP to opt out of texts or HELP for help. Consent is not a condition of
            purchase, and you may revoke it at any time. See our{' '}
            <Link href="/privacy-policy">Privacy Policy</Link> for details.
          </p>

          <h2>7. Your responsibilities</h2>
          <ul>
            <li>Provide accurate information — insurance applications rely on it, and inaccurate information can affect coverage</li>
            <li>Do not submit sensitive identifiers or payment details through this site</li>
            <li>Do not use the site unlawfully or attempt to disrupt it</li>
            <li>Review any policy documents before enrolling; the carrier&apos;s documents control</li>
          </ul>

          <h2>8. Third-party sites</h2>
          <p>
            We link to third-party resources, including HealthCare.gov, state exchanges and
            enrollment platforms. We do not control those sites and are not responsible for their
            content, availability or practices.
          </p>

          <h2>9. Intellectual property</h2>
          <p>
            Site content is owned by {SITE.legalEntity} or its licensors and may not be reproduced
            or distributed without permission.
          </p>

          <h2>10. Disclaimer and limitation of liability</h2>
          <p>
            The site is provided &ldquo;as is&rdquo; without warranties of any kind, express or
            implied. To the maximum extent permitted by law, {SITE.name} shall not be liable for
            indirect, incidental, special or consequential damages arising from your use of this
            site or reliance on information provided here. Our total liability for any claim
            arising from these Terms shall not exceed $100.
          </p>

          <h2>11. Changes</h2>
          <p>
            We may update these Terms. Continued use of the site after changes constitutes
            acceptance of the revised Terms.
          </p>

          <h2>12. Governing law</h2>
          <p>
            These Terms are governed by the laws of the State of New York, without regard to
            conflict of law principles.
          </p>

          <h2>13. Contact</h2>
          <p>
            {SITE.legalEntity} DBA {SITE.name}
            <br />
            {SITE.address.line1}, {SITE.address.region}
            <br />
            <a href={SITE.phoneHref}>{SITE.phone}</a>
            <br />
            <a href={SITE.emailHref}>{SITE.email}</a>
          </p>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-8">
          <p className="legal">{DISCLOSURES.solicitation}</p>
        </div>
      </div>
    </section>
  )
}
