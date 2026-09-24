import Link from 'next/link'
import type { Metadata } from 'next'
import { SectionHeading, FAQ, CtaBand, FeatureCard, Steps } from '@/components/ui'
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
    body: 'Fully insured or self-funded medical plans for groups of 1–500+ employees, with plan designs matched to your budget and workforce.',
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
    body: 'Short-term and long-term disability replacing a portion of income — typically around 60% of salary — when an employee cannot work.',
  },
]

const FAQS = [
  {
    q: 'How small can a group be?',
    a: 'Options exist for groups as small as one or two enrolled employees, though availability and participation requirements vary by state and carrier. We can tell you quickly what your group qualifies for.',
  },
  {
    q: 'Are employer contributions tax-deductible?',
    a: 'Employer contributions toward group health premiums are generally treated as a deductible business expense, and employees typically pay their share with pre-tax dollars, which reduces payroll taxes for both parties. Confirm the specifics with your tax advisor — we are insurance agents, not tax professionals.',
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
      <section className="border-b border-slate-200 bg-gradient-to-b from-brand-50 to-white py-14 lg:py-20">
        <div className="container-page mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-brand-700">
            For Employers
          </p>
          <h1 className="text-4xl sm:text-5xl">Benefits that help you compete for good people</h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Health coverage is consistently one of the benefits employees value most. We compare
            carriers and plan designs, then deliver a custom proposal — free of charge.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/quote" className="btn-primary px-8">
              Request a proposal
            </Link>
            <a href={SITE.phoneHref} className="btn-ghost px-8">
              Call {SITE.phone}
            </a>
          </div>
        </div>
      </section>

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

      <section className="border-y border-slate-200 bg-slate-50 py-16">
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
