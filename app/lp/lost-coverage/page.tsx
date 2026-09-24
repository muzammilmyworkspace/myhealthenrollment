import type { Metadata } from 'next'
import LandingPage from '@/components/LandingPage'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Coverage Ending? Special Enrollment Period Options',
  description:
    'Losing job-based health coverage can open a Special Enrollment Period. Compare ACA Marketplace options with a licensed independent agent.',
  robots: { index: false, follow: true },
}

export default function LostCoverageLP() {
  return (
    <LandingPage
      source="lp-lost-coverage"
      eyebrow="Special Enrollment Period"
      headline="Job-based coverage ending? There may be a path to a new plan"
      subhead="Losing qualifying coverage is one of the life events that opens a Special Enrollment Period, a limited window to enroll in an ACA Marketplace plan outside of Open Enrollment."
      bullets={[
        'Typically a 60-day window from the date coverage ends',
        'Pre-existing conditions cannot be denied or surcharged',
        'Many households qualify for a premium tax credit',
        'Our help is free, because agents are paid by the carrier',
      ]}
      note="Documentation of the coverage loss is usually required. Eligibility rules are set by the Marketplace and can change. A licensed agent can confirm what applies to your situation."
      faqs={[
        {
          q: 'How long do I have to enroll?',
          a: 'A Special Enrollment Period is typically 60 days from the qualifying event. In some cases you can enroll shortly before coverage ends so there is no gap. Because the window is limited, it is worth starting early rather than waiting until the last week.',
        },
        {
          q: 'Which events open a Special Enrollment Period?',
          a: 'Common ones include losing job-based or other qualifying coverage, getting married or divorced, having or adopting a child, moving to a new ZIP code or county, certain income changes, and turning 26 and coming off a parent’s plan. Documentation is generally required.',
        },
        {
          q: 'Is this the same as COBRA?',
          a: 'No. COBRA lets you continue your former employer’s plan, usually at full cost without the employer contribution, which is often expensive. A Marketplace plan is a separate option and may qualify for a premium tax credit that COBRA does not. Comparing both is worth doing before you decide.',
        },
        {
          q: 'Will a gap in coverage cause a problem?',
          a: 'There is no federal penalty for a coverage gap, but you would be responsible for the full cost of any care during it. A few states have their own coverage requirements. An agent can help you line up start dates to avoid a gap where possible.',
        },
        {
          q: 'What does your service cost?',
          a: `Nothing. Licensed agents are compensated by the insurance carrier when someone enrolls, so your premium is the same either way. You can also call ${SITE.phone} to speak with someone directly.`,
        },
      ]}
    />
  )
}
