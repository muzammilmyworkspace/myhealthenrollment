import Link from 'next/link'
import type { Metadata } from 'next'
import { SectionHeading, FAQ, CtaBand, FeatureCard, Steps, PageHero } from '@/components/ui'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Employer Group Benefits',
  description:
    'Group health, dental, vision, life and disability benefits for businesses of 1 to 500+ employees. Custom proposals at no cost.',
  alternates: { canonical: '/employer-group' },
}

const BENEFITS = [
  {
    title: 'Group Health',
    body: 'Fully insured or self-funded medical plans for groups of 1 to 500+ employees, with plan designs matched to your budget and workforce.',
  },
  {
    title: 'Group Dental & Vision',
    body: 'Preventive and comprehensive dental with PPO or DHMO options, plus exams, frames, lenses and contact allowances for employees and dependents.',
  },
  {
    title: 'Group Life & AD&D',
    body: 'Term life and accidental death & dismemberment, often provided at low or no cost to employees as a baseline benefit.',
  },
  {
    title: 'Disability',
    body: 'Short-term and long-term disability replacing a portion of income, typically around 60% of salary, when an employee cannot work.',
  },
]

const FAQS = [
  {
    q: 'How small can a group be?',
    a: 'Options exist for groups as small as one or two enrolled employees, though availability and participation requirements vary by state and carrier. We can tell you quickly what your group qualifies for.',
  },
  {
    q: 'Are employer contributions tax-deductible?',
    a: 'Employer contributions toward group health premiums are generally treated as a deductible business expense, and employees typically pay their share with pre-tax dollars, which reduces payroll taxes for both parties. Confirm the specifics with your tax advisor. We are insurance agents, not tax professionals.',
  },
  {
    q: 'What is an Applicable Large Employer?',
    a: 'Employers with 50 or more full-time-equivalent employees are generally required to offer minimum essential coverage that meets affordability and minimum-value tests, or face a potential penalty. We help groups near that threshold understand where they stand.',
  },
  {
    q: 'What does a proposal cost?',
    a: 'Nothing. We prepare custom proposals at no charge. Agents are compensated by the carrier if a group enrolls, so there is no fee to compare.',
  },
]

export default function EmployerGroupPage() {
  return (
    <>
      <PageHero
        eyebrow="For Employers"
        title="Benefits that help you compete for good people"
        sub="Health coverage is consistently one of the benefits employees value most. We compare carriers and plan designs, then deliver a custom proposal, free of charge."
      >
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/quote" className="btn-accent px-8">Request a proposal</Link>
          <a href={SITE.phoneHref} className="btn-ghost px-8">Call {SITE.phone}</a>
        </div>
      </PageHero>

      <section className="container-page py-16">
        <SectionHeading
          eyebrow="Coverage lines"
          title="Build the package that fits"
          sub="Start with medical, or layer in ancillary lines that add real value at modest cost."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {BENEFITS.map((b) => (
            <FeatureCard key={b.title} title={b.title} body={b.body} />
          ))}
        </div>
      </section>

      <section className="border-y border-navy-100 bg-wash py-16">
        <div className="container-page">
          <SectionHeading eyebrow="Process" title="From first call to enrollment" />
          <Steps
            steps={[
              {
                title: 'Discovery',
                body: 'Headcount, budget, current plan and renewal date, and what matters most to your team. Usually a 20-minute call.',
              },
              {
                title: 'Custom proposal',
                body: 'We compare carriers and plan designs available to your group and present options side by side, with the trade-offs made explicit.',
              },
              {
                title: 'Enrollment support',
                body: 'We handle employee enrollment meetings, paperwork and carrier coordination, and stay on as your point of contact at renewal.',
              },
            ]}
          />
        </div>
      </section>

      <section className="container-page py-16">
        <SectionHeading eyebrow="Questions" title="Group benefits FAQ" />
        <FAQ items={FAQS} />
      </section>

      <CtaBand
        title="Get a custom group proposal"
        body="Tell us about your business and a licensed group benefits specialist will follow up within one business day."
      />
    </>
  )
}
