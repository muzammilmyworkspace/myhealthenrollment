import Link from 'next/link'
import type { Metadata } from 'next'
import { SectionHeading, FAQ, CtaBand, Callout, Steps, Check } from '@/components/ui'
import { SITE, OEP } from '@/lib/site'
import { greenStates } from '@/lib/states'

export const metadata: Metadata = {
  title: 'ACA Marketplace Health Insurance',
  description:
    'Understand ACA Marketplace health plans, metal tiers, premium tax credits and enrollment periods — with guidance from a licensed independent agent.',
  alternates: { canonical: '/aca-health-insurance' },
}

const TIERS = [
  {
    tier: 'Bronze',
    premium: 'Lowest premium',
    share: 'Highest cost when you use care',
    fit: 'Generally healthy, want protection against a major event, rarely see a doctor.',
  },
  {
    tier: 'Silver',
    premium: 'Moderate premium',
    share: 'Moderate cost-sharing',
    fit: 'The only tier where cost-sharing reductions apply. Often the best value below 250% FPL.',
  },
  {
    tier: 'Gold',
    premium: 'Higher premium',
    share: 'Lower cost when you use care',
    fit: 'Regular prescriptions, ongoing care, or you expect to use coverage often.',
  },
  {
    tier: 'Platinum',
    premium: 'Highest premium',
    share: 'Lowest cost when you use care',
    fit: 'Frequent specialist care. Not offered by every carrier in every area.',
  },
]

const SEP_EVENTS = [
  'Lost job-based or other qualifying coverage',
  'Got married or divorced',
  'Had a baby, adopted, or placed a child in foster care',
  'Moved to a new ZIP code or county',
  'Had a change in income that affects eligibility',
  'Aged off a parent’s plan at 26',
]

const FAQS = [
  {
    q: 'What is the ACA Marketplace?',
    a: 'The Health Insurance Marketplace was created by the Affordable Care Act so that people without job-based coverage can buy individual and family health plans. Most states use HealthCare.gov; some run their own exchange. All Marketplace plans must cover a set of essential health benefits and cannot deny you or charge more for a pre-existing condition.',
  },
  {
    q: 'What are essential health benefits?',
    a: 'Every ACA Marketplace plan must cover ten categories, including outpatient care, emergency services, hospitalization, maternity and newborn care, mental health and substance use treatment, prescription drugs, rehabilitative services, laboratory services, preventive care, and pediatric services including dental and vision. Adult dental and vision are not included and are usually bought separately.',
  },
  {
    q: 'Can I be denied for a pre-existing condition?',
    a: 'No. ACA Marketplace plans cannot deny coverage, charge you more, or exclude treatment because of a pre-existing condition. Premiums can vary by age, location, tobacco use and plan tier — but not health status.',
  },
  {
    q: 'What if I have coverage through my job?',
    a: 'You can still buy a Marketplace plan, but if your employer offers coverage that the law considers affordable and adequate, you generally will not qualify for a premium tax credit. An agent can walk through how that test works for your situation.',
  },
  {
    q: 'What does an agent cost me?',
    a: 'Nothing. Licensed agents are compensated by the carrier when someone enrolls. The premium is the same whether you use an agent or enroll yourself — the difference is having someone compare plans, check whether your doctors are in network, and handle the paperwork.',
  },
  {
    q: 'What is a benchmark plan?',
    a: 'The second-lowest-cost Silver plan available in your area. It is the reference point used to calculate premium tax credits. You do not have to buy the benchmark plan — it is simply the yardstick the subsidy math uses.',
  },
]

export default function AcaPage() {
  const states = greenStates()

  return (
    <>
      <section className="border-b border-slate-200 bg-gradient-to-b from-brand-50 to-white py-14 lg:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-brand-700">
              ACA Marketplace
            </p>
            <h1 className="text-4xl sm:text-5xl">
              Health coverage for individuals and families
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              ACA Marketplace plans cannot turn you down for a pre-existing condition, and many
              households qualify for savings. A licensed agent can help you compare what is
              actually available in your ZIP code.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/quote" className="btn-primary px-8">
                See my options
              </Link>
              <a href={SITE.phoneHref} className="btn-ghost px-8">
                Call {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment timing */}
      <section className="container-page py-16">
        <SectionHeading
          eyebrow="Timing"
          title="When you can enroll"
          sub="Marketplace enrollment is not open year-round. There are two ways in."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card border-brand-200 bg-brand-50">
            <h3 className="text-xl">Open Enrollment</h3>
            <p className="mt-2 text-2xl font-extrabold text-brand-700">
              {OEP.startLabel} – {OEP.endLabel}
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-700">
              During this window anyone eligible can enroll or change plans for {OEP.planYear}{' '}
              coverage — no qualifying event needed. Enrolling earlier in the window usually means
              coverage starts sooner.
            </p>
            <p className="legal mt-4">
              Some state-run exchanges use different dates. An agent will confirm the window that
              applies to you.
            </p>
          </div>

          <div className="card">
            <h3 className="text-xl">Special Enrollment Period</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
              Outside Open Enrollment, a qualifying life event can open a limited window —
              typically 60 days from the event:
            </p>
            <ul className="mt-4 space-y-2">
              {SEP_EVENTS.map((e) => (
                <li key={e} className="flex gap-2 text-[15px] text-slate-700">
                  <Check />
                  <span>{e}</span>
                </li>
              ))}
            </ul>
            <p className="legal mt-4">
              Documentation is usually required. Eligibility rules are set by the Marketplace and
              can change.
            </p>
          </div>
        </div>
      </section>

      {/* Metal tiers */}
      <section className="border-y border-slate-200 bg-slate-50 py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="Plan tiers"
            title="Bronze, Silver, Gold and Platinum"
            sub="Tiers describe how you and the plan split costs — not the quality of care. Every tier covers the same essential health benefits."
          />
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th scope="col" className="px-5 py-3.5 font-bold text-slate-900">Tier</th>
                  <th scope="col" className="px-5 py-3.5 font-bold text-slate-900">Monthly premium</th>
                  <th scope="col" className="hidden px-5 py-3.5 font-bold text-slate-900 sm:table-cell">When you use care</th>
                  <th scope="col" className="px-5 py-3.5 font-bold text-slate-900">Often a fit if…</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TIERS.map((t) => (
                  <tr key={t.tier}>
                    <th scope="row" className="px-5 py-4 font-bold text-brand-700">{t.tier}</th>
                    <td className="px-5 py-4 text-slate-600">{t.premium}</td>
                    <td className="hidden px-5 py-4 text-slate-600 sm:table-cell">{t.share}</td>
                    <td className="px-5 py-4 text-slate-600">{t.fit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="legal mx-auto mt-4 max-w-3xl text-center">
            Plan availability varies by state and ZIP code. Not every carrier offers every tier in
            every area.
          </p>
        </div>
      </section>

      {/* Savings */}
      <section className="container-page py-16">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Savings"
            title="How Marketplace savings work"
            sub="There are two separate programs, and they work differently."
          />
          <div className="space-y-5">
            <div className="card">
              <h3 className="text-lg">Premium Tax Credit</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
                Lowers your monthly premium. The ACA caps what your household is expected to
                contribute toward the benchmark Silver plan as a percentage of income; the credit
                covers the rest. It can be applied in advance each month, so you never see the
                full premium.
              </p>
            </div>
            <div className="card">
              <h3 className="text-lg">Cost-Sharing Reductions</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
                Lowers your deductible, copays and out-of-pocket maximum — but{' '}
                <strong>only on Silver plans</strong>, and generally only below 250% of the
                Federal Poverty Level. This is why a Bronze plan that looks cheaper each month can
                cost more overall for a lower-income household.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <Callout tone="warn" title="Be careful who you trust on subsidies">
              No one can tell you your exact subsidy before you complete an application. Anyone
              promising a specific dollar amount, a &ldquo;government card,&rdquo; or free cash up
              front is not describing how the ACA works. Eligibility is determined by the
              Marketplace based on your full application.
            </Callout>
          </div>

          <div className="mt-6 text-center">
            <Link href="/subsidy-calculator" className="btn-outline px-8">
              Try the savings estimator
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-slate-200 bg-slate-50 py-16">
        <div className="container-page">
          <SectionHeading eyebrow="Our process" title="What working with us looks like" />
          <Steps
            steps={[
              {
                title: 'Share your basics',
                body: 'ZIP code, household size, and your situation. Nothing sensitive — no Social Security number in a web form, ever.',
              },
              {
                title: 'We confirm your state',
                body: 'Licensing and enrollment paths differ by state. You see your status right away instead of waiting for a callback to find out.',
              },
              {
                title: 'Compare and decide',
                body: `A licensed agent reviews verified plans with you. Enrollment happens inside ${SITE.enrollmentPartner}, a CMS-certified platform, only after you confirm.`,
              },
            ]}
          />
        </div>
      </section>

      {/* States */}
      <section className="container-page py-16">
        <SectionHeading
          eyebrow="Coverage area"
          title="Marketplace guidance by state"
          sub="Select your state for local enrollment details."
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {states.map((s) => (
            <Link
              key={s.abbr}
              href={`/aca/${s.slug}`}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 transition-colors hover:border-brand-400 hover:text-brand-700"
            >
              {s.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page pb-16">
        <SectionHeading eyebrow="Questions" title="ACA Marketplace FAQ" />
        <FAQ items={FAQS} />
      </section>

      <CtaBand />
    </>
  )
}
