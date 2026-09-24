import Link from 'next/link'
import type { Metadata } from 'next'
import QuizFunnel from '@/components/QuizFunnel'
import { SectionHeading, FeatureCard, Steps, FAQ, CtaBand, TrustBar, Check } from '@/components/ui'
import { SITE, OEP } from '@/lib/site'
import { greenStates } from '@/lib/states'

export const metadata: Metadata = {
  // Title is deliberately omitted so the root layout's `title.default` is
  // used as-is. Setting a string here would run it through `title.template`
  // and append "| My Health Enrollment" a second time.
  description:
    'Compare ACA Marketplace, life, dental, vision and group coverage with a licensed independent agent. Free guidance, no obligation to enroll.',
  alternates: { canonical: '/' },
}

const FAQS = [
  {
    q: 'How much does your help cost?',
    a: 'Nothing. Our service is free to you — licensed agents are compensated by the insurance carrier when someone enrolls. You pay the same premium whether you use an agent or enroll on your own.',
  },
  {
    q: 'When can I enroll in an ACA Marketplace plan?',
    a: `Open Enrollment for ${OEP.planYear} coverage runs from ${OEP.startLabel} through ${OEP.endLabel}. Outside that window you can enroll if you have a qualifying life event — such as losing job-based coverage, getting married, having a baby, or moving — which opens a Special Enrollment Period. Dates and eligibility rules are set by the Marketplace and can change, so an agent will confirm what applies to you.`,
  },
  {
    q: 'Will I qualify for savings?',
    a: 'Many households qualify for a Premium Tax Credit that lowers the monthly cost, and some also qualify for cost-sharing reductions on Silver plans. Eligibility depends on your income, household size, location, and access to other coverage. Only the Marketplace can determine your actual eligibility based on your full application — we can help you understand the process and review what is available.',
  },
  {
    q: 'Do you sell my information?',
    a: 'No. We do not sell your personal information. We use it to respond to your inquiry and, with your permission, to contact you about coverage. You can revoke any contact permission at any time.',
  },
  {
    q: 'Which insurance companies do you work with?',
    a: 'We are an independent agency, not tied to any single carrier. The plans and carriers available to you depend on your state and ZIP code, and are shown inside the secure enrollment platform. That independence means we can compare options rather than push one company.',
  },
  {
    q: 'What happens after I submit the form?',
    a: `You will immediately see whether a licensed agent is available in your state. A licensed agent then reaches out through the contact method you chose — usually within one business day — to review verified options with you. Nothing is submitted, selected, or purchased without your explicit confirmation. You can also call us directly at ${SITE.phone}.`,
  },
]

export default function HomePage() {
  const states = greenStates()

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-brand-50 to-white">
        <div className="container-page grid gap-12 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div className="flex flex-col justify-center">
            <p className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
              <span className="h-2 w-2 rounded-full bg-accent-500" aria-hidden="true" />
              Open Enrollment for {OEP.planYear}: {OEP.startLabel} – {OEP.endLabel}
            </p>

            <h1 className="mt-6 text-4xl leading-[1.1] sm:text-5xl lg:text-[3.4rem]">
              Health coverage options,
              <span className="text-brand-700"> explained by a licensed agent</span>
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              Compare ACA Marketplace plans for individuals and families across{' '}
              {SITE.agent.stateCount} states. We handle the paperwork and the comparison — you
              decide. Our help costs nothing and there is no obligation to enroll.
            </p>

            <ul className="mt-7 space-y-3">
              {[
                'Licensed independent agent — not a call center',
                'Enrollment through a CMS-certified secure platform',
                'We never promise a price before checking your state',
              ].map((t) => (
                <li key={t} className="flex gap-2.5 text-[15px] font-medium text-slate-700">
                  <Check /> {t}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="#start" className="btn-primary px-8">
                See My Options
              </Link>
              <a href={SITE.phoneHref} className="btn-ghost px-8">
                Call {SITE.phone}
              </a>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-slate-500">
              My Health Enrollment is a private insurance agency. We are not affiliated with,
              endorsed by, or acting on behalf of any government agency.
            </p>
          </div>

          <div id="start" className="scroll-mt-20">
            <QuizFunnel source="home-hero" />
          </div>
        </div>
      </section>

      {/* ── Trust bar ────────────────────────────────────── */}
      <section className="border-b border-slate-200 bg-white py-6">
        <div className="container-page">
          <TrustBar />
        </div>
      </section>

      {/* ── Coverage types ───────────────────────────────── */}
      <section className="container-page py-16 lg:py-20">
        <SectionHeading
          eyebrow="What we help with"
          title="Coverage for individuals, families and employers"
          sub="Choose the path that fits your situation. A licensed agent reviews the details with you before anything is decided."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            title="ACA Marketplace Plans"
            body="Individual and family health coverage through the Marketplace, including guidance on premium tax credits and cost-sharing reductions."
            href="/aca-health-insurance"
            cta="Explore ACA plans"
          />
          <FeatureCard
            title="Life & Final Expense"
            body="Term, whole and final expense policies from multiple A-rated carriers — coverage sized to what your family would actually need."
            href="/life-insurance"
            cta="Explore life insurance"
          />
          <FeatureCard
            title="Dental & Vision"
            body="Standalone dental and vision plans, available in most states without buying a health plan. Most health plans do not include adult dental or vision."
            href="/dental-vision"
            cta="Explore dental & vision"
          />
          <FeatureCard
            title="Employer Group Benefits"
            body="Group health, dental, vision, life and disability for businesses of 1–500+ employees, with custom proposals at no cost."
            href="/employer-group"
            cta="Explore group benefits"
          />
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────── */}
      <section className="border-y border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="How it works"
            title="Three steps, no surprises"
            sub="We check what is actually available in your state before anyone talks about price."
          />
          <Steps
            steps={[
              {
                title: 'Tell us where you live',
                body: 'A few quick questions — ZIP code, household size, and your situation. No Social Security number, and nothing sensitive.',
              },
              {
                title: 'We check your state',
                body: 'Your state is checked against our licensing and readiness matrix. You see your status immediately, along with what happens next.',
              },
              {
                title: 'A licensed agent reviews with you',
                body: 'Verified options for your area, walked through by a licensed agent. Enrollment happens in a secure CMS-certified platform — only when you say so.',
              },
            ]}
          />
        </div>
      </section>

      {/* ── Savings estimator teaser ─────────────────────── */}
      <section className="container-page py-16 lg:py-20">
        <div className="grid items-center gap-10 rounded-2xl border border-brand-100 bg-brand-50 p-8 lg:grid-cols-2 lg:p-12">
          <div>
            <SectionHeading
              eyebrow="Free tool"
              center={false}
              title="See how ACA savings are calculated"
              sub="Enter your household size and estimated income to see the share of income the ACA expects you to contribute toward a benchmark plan. No personal details required."
            />
            <Link href="/subsidy-calculator" className="btn-primary px-8">
              Open the estimator
            </Link>
            <p className="legal mt-4 max-w-md">
              Educational only. Actual eligibility and amounts are determined by the Marketplace
              based on your full application.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">Example — household of 3</p>
            <p className="mt-4 text-sm text-slate-600">Estimated annual income</p>
            <p className="text-2xl font-bold text-slate-900">$45,000</p>
            <div className="my-4 h-px bg-slate-200" />
            <p className="text-sm text-slate-600">Expected monthly contribution toward a benchmark Silver plan</p>
            <p className="text-3xl font-extrabold text-brand-700">capped by income</p>
            <p className="legal mt-4">
              Illustration only. Your result depends on your state, household size, income and the
              plans available in your ZIP code.
            </p>
          </div>
        </div>
      </section>

      {/* ── States ───────────────────────────────────────── */}
      <section className="border-y border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Where we work"
            title="Marketplace guidance across these states"
            sub="Select your state to see local enrollment details. Availability is always confirmed during your consultation."
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
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="container-page py-16 lg:py-20">
        <SectionHeading eyebrow="Questions" title="Frequently asked" />
        <FAQ items={FAQS} />
      </section>

      <CtaBand />
    </>
  )
}
