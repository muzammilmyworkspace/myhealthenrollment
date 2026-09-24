import type { Metadata } from 'next'
import LandingPage from '@/components/LandingPage'
import { OEP, SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Health Insurance for Self-Employed & Freelancers',
  description:
    'Health coverage options for self-employed workers, freelancers and small business owners without employer benefits. Licensed independent agent guidance.',
  robots: { index: false, follow: true },
}

export default function SelfEmployedLP() {
  return (
    <LandingPage
      source="lp-self-employed"
      eyebrow="For self-employed & freelancers"
      headline="Health coverage when there is no employer plan"
      subhead="Working for yourself means buying your own coverage. The ACA Marketplace was built for exactly that, and many self-employed households qualify for savings based on income."
      bullets={[
        'Built for people without employer-sponsored coverage',
        'Income-based premium tax credits may apply',
        'Coverage for you, a spouse and dependents on one plan',
        'Our help is free, because agents are paid by the carrier',
      ]}
      note={`Open Enrollment for ${OEP.planYear} coverage runs ${OEP.startLabel} through ${OEP.endLabel}. Outside that window, a qualifying life event may open a Special Enrollment Period.`}
      faqs={[
        {
          q: 'How do I estimate income if my earnings vary?',
          a: 'The Marketplace asks for your expected income for the coverage year, not last year’s. For variable income, a reasonable annual estimate based on recent months is normal. If your actual income ends up different, it is reconciled when you file taxes, and you can update your estimate during the year.',
        },
        {
          q: 'Can I deduct my health insurance premiums?',
          a: 'Self-employed individuals may be able to deduct health insurance premiums, subject to IRS rules and limits. This interacts with premium tax credits in ways worth getting right, so confirm the specifics with your tax professional. We are insurance agents, not tax advisors.',
        },
        {
          q: 'What if my spouse has coverage through a job?',
          a: 'If affordable, adequate employer coverage is available to you through a spouse’s job, that generally affects whether you qualify for a premium tax credit. It can still be worth comparing both. An agent can walk through how the test works for your household.',
        },
        {
          q: 'Are there options besides the Marketplace?',
          a: 'Depending on your state and situation there may be other paths, including small group coverage if you have employees. Some non-Marketplace products marketed to the self-employed are not comprehensive coverage and do not have to cover pre-existing conditions, which is worth understanding clearly before buying anything.',
        },
        {
          q: 'What does your service cost?',
          a: `Nothing. Agents are compensated by the carrier when someone enrolls, so your premium is the same whether you use an agent or not. You can also call ${SITE.phone} directly.`,
        },
      ]}
    />
  )
}
