import Link from 'next/link'
import type { Metadata } from 'next'
import { SectionHeading, FAQ, CtaBand, FeatureCard, Callout, PageHero } from '@/components/ui'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Life Insurance & Final Expense',
  description:
    'Compare term, whole life, universal life and final expense coverage from multiple A-rated carriers with licensed independent guidance.',
  alternates: { canonical: '/life-insurance' },
}

const PRODUCTS = [
  {
    title: 'Term Life',
    body: 'Coverage for a set period, commonly 10, 20 or 30 years. Pays a death benefit if you pass away during the term. The most affordable way to cover income replacement, a mortgage, or the years until children are independent.',
  },
  {
    title: 'Whole Life',
    body: 'Permanent coverage that does not expire and builds cash value over time. Premiums are fixed for life and the death benefit is guaranteed as long as premiums are paid.',
  },
  {
    title: 'Universal Life',
    body: 'Permanent coverage with flexible premiums and an adjustable death benefit. Cash value growth depends on interest rates or an index, depending on the product.',
  },
  {
    title: 'Final Expense',
    body: 'Smaller whole life policies, often $5,000 to $50,000, designed to cover funeral and end-of-life costs so the bill does not fall to family. Simplified underwriting, frequently with no medical exam.',
  },
]

const FAQS = [
  {
    q: 'How much life insurance do I actually need?',
    a: 'A common starting point is 10 to 12 times annual income, then adjusted for debts, the mortgage balance, future education costs, and any coverage you already have through work. An agent can walk through the arithmetic with you rather than guessing at a round number.',
  },
  {
    q: 'Do I need a medical exam?',
    a: 'It depends on the product, the amount, and your age and health. Many final expense policies and some term policies use simplified or accelerated underwriting with no exam. Larger term and permanent policies more often require one.',
  },
  {
    q: 'Is coverage through my employer enough?',
    a: 'Group life through an employer is a good benefit but usually modest, often one or two times salary, and it typically ends when you leave the job. Many people carry an individual policy alongside it so coverage does not depend on staying employed.',
  },
  {
    q: 'Can I be turned down?',
    a: 'Unlike ACA health coverage, life insurance is medically underwritten and applicants can be declined or rated. That is exactly where an independent agent helps: different carriers treat the same health history very differently, so placement matters.',
  },
]

export default function LifeInsurancePage() {
  return (
    <>
      <PageHero
        eyebrow="Life & Final Expense"
        title="Protection sized to what your family would need"
        sub="We compare policies from multiple A-rated carriers. As an independent agency we are not tied to one company, which matters most when health history is a factor."
      >
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/quote" className="btn-accent px-8">Request a quote</Link>
          <a href={SITE.phoneHref} className="btn-ghost px-8">Call {SITE.phone}</a>
        </div>
      </PageHero>

      <section className="container-page py-16">
        <SectionHeading
          eyebrow="Options"
          title="Types of coverage"
          sub="Which one fits depends on what you are protecting and for how long."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {PRODUCTS.map((p) => (
            <FeatureCard key={p.title} title={p.title} body={p.body} />
          ))}
        </div>
      </section>

      <section className="border-y border-navy-100 bg-wash py-16">
        <div className="container-page mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="How to think about it"
            title="Term or permanent?"
            center={false}
          />
          <div className="prose-page">
            <p>
              Most families are protecting a <strong>window of time</strong>: the years until the
              mortgage is paid and the children are independent. Term insurance covers exactly
              that window at the lowest cost per dollar of coverage.
            </p>
            <p>
              Permanent insurance makes sense when the need does not end: a lifelong dependent, an
              estate or business obligation, or simply wanting to guarantee funeral costs are
              covered whenever that day comes. Many term policies can be converted to permanent
              later without new medical underwriting, which is worth asking about up front.
            </p>
          </div>
          <div className="mt-6">
            <Callout tone="info" title="Independent placement matters">
              Carriers underwrite the same condition very differently. One may decline a health
              history another accepts at standard rates. Because we are independent, we can shop
              the case rather than fit you to one company&apos;s rules.
            </Callout>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <SectionHeading eyebrow="Questions" title="Life insurance FAQ" />
        <FAQ items={FAQS} />
      </section>

      <CtaBand
        title="Not sure how much coverage you need?"
        body="A licensed agent can walk through the numbers with you, free and with no obligation."
      />
    </>
  )
}
