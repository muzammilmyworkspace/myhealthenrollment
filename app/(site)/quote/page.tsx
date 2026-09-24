import type { Metadata } from 'next'
import QuizFunnel from '@/components/QuizFunnel'
import { TrustBar, FAQ, Callout, PageHero } from '@/components/ui'
import { SITE, OEP } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Request Insurance Guidance',
  description:
    'Answer a few questions and a licensed agent will review the coverage options available in your state. Free, with no obligation to enroll.',
  alternates: { canonical: '/quote' },
}

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Free · No obligation"
        title="See what is available in your state"
        sub="Five short questions. No Social Security number, no payment details, and no obligation to enroll. A licensed agent reviews verified options with you."
      >
        <TrustBar />
      </PageHero>

      <section className="container-page py-12 lg:py-16">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <QuizFunnel source="quote-page" />
          </div>

          <aside className="space-y-5 lg:col-span-2">
            <Callout tone="info" title="Prefer to talk to someone?">
              Call{' '}
              <a href={SITE.phoneHref} className="font-bold underline">
                {SITE.phone}
              </a>{' '}
              and speak with a licensed agent directly.
            </Callout>

            <div className="card">
              <h2 className="text-lg">What happens next</h2>
              <ol className="mt-4 space-y-3 text-[15px] leading-relaxed text-navy-500">
                <li>
                  <strong className="text-navy-900">1.</strong> You see your state routing status
                  immediately after submitting.
                </li>
                <li>
                  <strong className="text-navy-900">2.</strong> A licensed agent contacts you
                  through the method you chose, usually within one business day.
                </li>
                <li>
                  <strong className="text-navy-900">3.</strong> If you decide to move forward,
                  enrollment happens in a secure CMS-certified platform — never over email or text.
                </li>
              </ol>
            </div>

            <div className="card">
              <h2 className="text-lg">Enrollment timing</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-navy-500">
                Open Enrollment for {OEP.planYear} coverage runs {OEP.startLabel} through{' '}
                {OEP.endLabel}. Outside that window, a qualifying life event may open a Special
                Enrollment Period. Rules are set by the Marketplace and can change.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl">Before you submit</h2>
          <FAQ
            items={[
              {
                q: 'Is my information safe?',
                a: 'Your information is transmitted over an encrypted connection and used only to respond to your inquiry. We do not sell personal information. Never send a Social Security number, immigration document number, or payment details through a web form or text message — legitimate enrollment collects those only inside the secure enrollment platform.',
              },
              {
                q: 'Do I have to agree to texts or calls?',
                a: 'No. Every contact permission on the form is optional and starts unchecked. You can submit the form without checking any of them, and a licensed agent can still help you. You may revoke any permission at any time.',
              },
              {
                q: 'Will this affect my current coverage?',
                a: 'No. Submitting this form does not change, cancel or apply for any coverage. Nothing happens to your existing plan unless you explicitly complete an application yourself.',
              },
            ]}
          />
        </div>
      </section>
    </>
  )
}
