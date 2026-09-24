import type { Metadata } from 'next'
import { SITE, DISCLOSURES } from '@/lib/site'
import { Callout } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How My Health Enrollment collects, uses, protects and shares information, including consent and communication preferences.',
  alternates: { canonical: '/privacy-policy' },
}

/**
 * ⚠️  Template, not legal advice. Have counsel review before launch —
 * state privacy laws (CA, CO, VA, TX and others) add specific rights and
 * disclosure requirements this page does not attempt to enumerate.
 */
const LAST_UPDATED = 'September 2026'

export default function PrivacyPolicyPage() {
  return (
    <section className="container-page py-14 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl">Privacy Policy</h1>
        <p className="mt-3 text-sm text-slate-500">Last updated: {LAST_UPDATED}</p>

        <div className="mt-8">
          <Callout tone="info">
            {SITE.name} is operated by {SITE.legalEntity}, the legal entity responsible for this
            site and its communications. Questions? Email{' '}
            <a href={SITE.emailHref} className="font-semibold underline">{SITE.email}</a> or call{' '}
            <a href={SITE.phoneHref} className="font-semibold underline">{SITE.phone}</a>.
          </Callout>
        </div>

        <div className="prose-page mt-10">
          <h2>Information we collect</h2>
          <p>We collect information you provide directly to us, including:</p>
          <ul>
            <li>Name, phone number and email address</li>
            <li>ZIP code and state</li>
            <li>Household size and estimated income, where you choose to provide them</li>
            <li>Coverage interests and preferred contact method</li>
            <li>Any notes or questions you submit</li>
          </ul>
          <p>
            We also automatically collect limited technical information such as IP address,
            browser type and pages visited.
          </p>
          <p>
            <strong>We do not ask for and you should never submit</strong> a Social Security
            number, immigration document number, password, banking or payment details, or medical
            records through this website, by text or by email. Information of that kind is
            collected only inside the secure, CMS-certified enrollment platform when you complete
            an application.
          </p>

          <h2>How we use information</h2>
          <ul>
            <li>To respond to your inquiry and provide quotes or consultations</li>
            <li>To contact you about coverage options using the methods you consented to</li>
            <li>To comply with applicable insurance regulatory requirements</li>
            <li>To fulfill our legal obligations as a licensed insurance agency</li>
          </ul>

          <h2>Communication consent</h2>
          <p>
            Each contact method on our forms is a separate, optional consent, and every box starts
            unchecked. You can submit a request without agreeing to any of them and a licensed
            agent can still assist you. Consent is never a condition of purchase.
          </p>
          <p>
            When you submit a form we retain a record of which consents you gave, the exact
            disclosure text and version you agreed to, and the date and time. That record is kept
            as an audit trail and is not public.
          </p>
          <p>You may withdraw consent at any time:</p>
          <ul>
            <li>Reply <strong>STOP</strong> to any text message to end texts</li>
            <li>Use the unsubscribe link in any marketing email</li>
            <li>
              Call <a href={SITE.phoneHref}>{SITE.phone}</a> or email{' '}
              <a href={SITE.emailHref}>{SITE.email}</a>
            </li>
          </ul>
          <p>
            Revocations are timestamped and logged. If you have an active enrollment or policy
            inquiry, a licensed agent may still contact you about that specific request unless you
            ask us to stop entirely.
          </p>

          <h2>Sharing</h2>
          <p>
            <strong>We do not sell your personal information.</strong> We may share it with:
          </p>
          <ul>
            <li>Insurance carriers and CMS-certified enrollment platforms, to obtain quotes or process an application you requested</li>
            <li>Service providers who operate our website, CRM and communication systems on our behalf</li>
            <li>Regulators or other parties where required by law</li>
          </ul>

          <h2>Your rights</h2>
          <ul>
            <li>Request access to the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion, subject to legal and regulatory retention requirements</li>
            <li>Opt out of marketing communications at any time</li>
          </ul>
          <p>
            To exercise these rights, email <a href={SITE.emailHref}>{SITE.email}</a>. Residents of
            some states have additional rights under state privacy laws.
          </p>

          <h2>Security</h2>
          <p>
            We use reasonable administrative, technical and physical safeguards to protect
            personal information. No method of transmission or storage is completely secure. If
            you believe your information may have been compromised, contact us immediately.
          </p>

          <h2>HIPAA</h2>
          <p>
            As an independent insurance agency we are generally not a covered entity under the
            Health Insurance Portability and Accountability Act for most of our activities. We
            nonetheless treat health-related information you share with us as confidential and use
            it only to help you find appropriate coverage.
          </p>

          <h2>Cookies and analytics</h2>
          <p>
            We use cookies and similar technologies to operate the site and understand how it is
            used. You can control cookies through your browser settings. Disabling essential
            cookies may break some features. Browser controls do not necessarily opt you out of
            every analytics technology.
          </p>

          <h2>Children</h2>
          <p>
            This website is not directed to children under 13 and we do not knowingly collect
            their personal information. If we learn we have, we will delete it promptly.
          </p>

          <h2>Changes</h2>
          <p>
            We may update this policy. The &ldquo;last updated&rdquo; date above reflects the most
            recent revision.
          </p>

          <h2>Contact</h2>
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

        <div className="mt-10 space-y-3 border-t border-slate-200 pt-8">
          <p className="legal">{DISCLOSURES.notGovernment}</p>
          <p className="legal">{DISCLOSURES.solicitation}</p>
        </div>
      </div>
    </section>
  )
}
