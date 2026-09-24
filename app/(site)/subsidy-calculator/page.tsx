import type { Metadata } from 'next'
import SubsidyCalculator from '@/components/SubsidyCalculator'
import { CtaBand, Callout, PageHero } from '@/components/ui'

export const metadata: Metadata = {
  title: 'ACA Savings Estimator',
  description:
    'Estimate how ACA premium tax credits are calculated for your household size and income. Educational tool, no personal information required.',
  alternates: { canonical: '/subsidy-calculator' },
}

export default function SubsidyCalculatorPage() {
  return (
    <>
      <PageHero
        eyebrow="Free tool · No sign-up"
        title="ACA savings estimator"
        sub="See how the Affordable Care Act calculates what a household is expected to contribute toward health coverage. No name, email or phone number required."
      />

      <section className="container-page py-12 lg:py-16">
        <SubsidyCalculator />
      </section>

      <section className="container-page pb-16">
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="text-2xl">How ACA savings actually work</h2>
          <div className="prose-page">
            <p>
              The Affordable Care Act caps what a household is expected to pay for a{' '}
              <strong>benchmark plan</strong>, the second-lowest-cost Silver plan in your area.
              That cap is a percentage of your income, and the percentage rises as income rises.
            </p>
            <p>
              A <strong>premium tax credit</strong> covers the difference between that cap and the
              benchmark plan&apos;s actual premium. If you choose a cheaper plan than the
              benchmark, you pay less; if you choose a more expensive one, you pay the difference
              yourself.
            </p>
            <p>
              Below 250% of the Federal Poverty Level, <strong>cost-sharing reductions</strong> may
              also apply. These lower your deductible, copays and out-of-pocket maximum, but only
              on Silver plans. This is why an agent will often point a lower-income household
              toward Silver even when Bronze looks cheaper on paper.
            </p>
          </div>

          <Callout tone="warn" title="What this tool cannot tell you">
            It cannot tell you the price of a specific plan. That depends on your exact rating
            area, the ages of everyone covered, tobacco use, and which carriers file rates where
            you live. Only the Marketplace can determine your actual eligibility, and only the
            secure enrollment platform shows real prices for your ZIP code.
          </Callout>
        </div>
      </section>

      <CtaBand
        title="Want the real numbers for your ZIP code?"
        body="A licensed agent can show you the actual plans and prices available where you live."
      />
    </>
  )
}
