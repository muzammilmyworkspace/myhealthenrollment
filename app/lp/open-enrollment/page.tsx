import type { Metadata } from 'next'
import LandingPage from '@/components/LandingPage'
import { OEP, SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: `Open Enrollment ${OEP.planYear} | Compare ACA Marketplace Plans`,
  description: `Open Enrollment for ${OEP.planYear} coverage runs ${OEP.startLabel} through ${OEP.endLabel}. Compare ACA Marketplace plans with a licensed independent agent.`,
  // Paid-traffic pages stay out of the index so they never compete with the
  // SEO pages for the same terms.
  robots: { index: false, follow: true },
}

export default function OpenEnrollmentLP() {
  return (
    <LandingPage
      source="lp-open-enrollment"
      eyebrow={`Open Enrollment: ${OEP.startLabel} – ${OEP.endLabel}`}
      headline={`Compare ACA Marketplace plans for ${OEP.planYear}`}
      subhead="Open Enrollment is the one time of year anyone eligible can enroll or switch plans without a qualifying life event. A licensed agent can show you what is available in your ZIP code."
      bullets={[
        'Plans for individuals and families in 23 states',
        'Pre-existing conditions cannot be denied or surcharged',
        'Our help is free — agents are paid by the carrier',
        'Nothing is submitted without your confirmation',
      ]}
      note={`Coverage start dates depend on when you enroll during the window. If you would rather talk it through, call ${SITE.phone}.`}
      faqs={[
        {
          q: `When exactly is Open Enrollment for ${OEP.planYear}?`,
          a: `For the federal Marketplace, ${OEP.startLabel} through ${OEP.endLabel}. Some state-run exchanges set different dates. Enrolling earlier in the window generally means coverage starts sooner. These dates are set by the Marketplace and can change.`,
        },
        {
          q: 'What if I miss the deadline?',
          a: 'After Open Enrollment closes you generally need a qualifying life event — losing job-based coverage, marriage, a new baby, or a move — to enroll. That opens a Special Enrollment Period, usually 60 days from the event.',
        },
        {
          q: 'How much will a plan cost me?',
          a: 'That depends on your ZIP code, household size, income, and the ages of everyone covered. Many households qualify for a premium tax credit that lowers the monthly cost. No one can tell you an exact figure before an application is completed — an agent can show you real prices inside the secure enrollment platform.',
        },
        {
          q: 'What does your service cost?',
          a: 'Nothing. Licensed agents are compensated by the insurance carrier when someone enrolls. Your premium is identical whether you use an agent or enroll on your own.',
        },
        {
          q: 'What happens after I submit the form?',
          a: `You will see immediately whether a licensed agent is available in your state. An agent then follows up through the contact method you chose, usually within one business day. You can also call ${SITE.phone} directly.`,
        },
      ]}
    />
  )
}
