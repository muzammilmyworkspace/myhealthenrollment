import Link from 'next/link'
import type { Metadata } from 'next'
import QuizFunnel from '@/components/QuizFunnel'
import Reveal from '@/components/Reveal'
import { LogoFull } from '@/components/Logo'
import {
  SectionHeading, FeatureCard, Steps, FAQ, CtaBand, TrustBar, Check,
  Blobs, WaveDivider, IconShield, IconHeart, IconSmile, IconBuilding,
} from '@/components/ui'
import { SITE, OEP } from '@/lib/site'
import { greenStates } from '@/lib/states'

export const metadata: Metadata = {
  // Title omitted on purpose — see the note in the root layout's metadata.
  description:
    'Compare ACA Marketplace, life, dental, vision and group coverage with a licensed independent agent. Free guidance, no obligation to enroll.',
  alternates: { canonical: '/' },
}

const FAQS = [
  {
    q: 'How much does your help cost?',
    a: 'Nothing. Our service is free to you. Licensed agents are compensated by the insurance carrier when someone enrolls. You pay the same premium whether you use an agent or enroll on your own.',
  },
  {
    q: 'When can I enroll in an ACA Marketplace plan?',
    a: `Open Enrollment for ${OEP.planYear} coverage runs from ${OEP.startLabel} through ${OEP.endLabel}. Outside that window you can enroll if you have a qualifying life event, such as losing job-based coverage, getting married, having a baby, or moving. That opens a Special Enrollment Period. Dates and eligibility rules are set by the Marketplace and can change.`,
  },
  {
    q: 'Will I qualify for savings?',
    a: 'Many households qualify for a Premium Tax Credit that lowers the monthly cost, and some also qualify for cost-sharing reductions on Silver plans. Eligibility depends on your income, household size, location, and access to other coverage. Only the Marketplace can determine your actual eligibility based on your full application.',
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
    a: `You will immediately see whether a licensed agent is available in your state. A licensed agent then reaches out through the contact method you chose, usually within one business day, to review verified options with you. Nothing is submitted, selected, or purchased without your explicit confirmation. You can also call us directly at ${SITE.phone}.`,
  },
]

export default function HomePage() {
  const states = greenStates()

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-deep">
        <div className="absolute inset-0 bg-grid-light" aria-hidden="true" />
        <Blobs variant="dark" />

        <div className="container-page relative grid gap-12 py-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-16 lg:py-20">
          <div className="flex flex-col justify-center">
            <p
              className="inline-flex w-fit animate-fade-up items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-grass-400" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-grass-400" />
              </span>
              Open Enrollment {OEP.planYear}: {OEP.startLabel} to {OEP.endLabel}
            </p>

            <h1
              className="mt-7 animate-fade-up text-[2.6rem] leading-[1.06] text-white sm:text-5xl lg:text-[3.6rem]"
              style={{ animationDelay: '.09s' }}
            >
              Health coverage,
              <br />
              <span className="text-gradient">explained by a real agent</span>
            </h1>

            <p
              className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-navy-100"
              style={{ animationDelay: '.18s' }}
            >
              Compare ACA Marketplace plans for individuals and families across{' '}
              {SITE.agent.stateCount} states. We handle the paperwork and the comparison. You
              decide. Our help costs nothing and there is no obligation to enroll.
            </p>

            <ul className="stagger mt-8 space-y-3.5">
              {[
                'A licensed independent agent, not a call centre',
                'Enrollment through a CMS-certified secure platform',
                'We never promise a price before checking your state',
              ].map((t) => (
                <li key={t} className="flex animate-fade-up gap-3 text-[15px] font-medium text-white/90">
                  <Check tone="white" /> {t}
                </li>
              ))}
            </ul>

            <div
              className="mt-9 flex animate-fade-up flex-col gap-3 sm:flex-row"
              style={{ animationDelay: '.42s' }}
            >
              <Link href="#start" className="btn-accent px-9 text-lg">
                See My Options →
              </Link>
              <a href={SITE.phoneHref} className="btn-glass px-8">
                Call {SITE.phone}
              </a>
            </div>

            <div
              className="mt-8 max-w-xl animate-fade-up rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm"
              style={{ animationDelay: '.5s' }}
            >
              <p className="text-xs leading-relaxed text-navy-100">
                <strong className="font-bold text-white">Important:</strong> My Health Enrollment
                is an independent, licensed insurance agency. We are{' '}
                <strong className="font-bold text-white">
                  not affiliated with or endorsed by the U.S. government
                </strong>{' '}
                or CMS. Calling{' '}
                <a href={SITE.phoneHref} className="font-bold text-teal-200 underline underline-offset-2">
                  {SITE.phone}
                </a>{' '}
                connects you first to the My Health Enrollment AI customer support assistant. It
                may collect basic routing information, help with general educational questions,
                send a secure enrollment link or schedule a callback with consent, and connect you
                with a licensed insurance agent when appropriate. Do not provide Social Security
                numbers, banking information, payment card information, passwords, or sensitive
                medical information to the AI assistant. Plans and availability vary by state. Not
                all plans are available in all areas.
              </p>
            </div>
          </div>

          <div id="start" className="animate-scale-in scroll-mt-24" style={{ animationDelay: '.25s' }}>
            <QuizFunnel source="home-hero" />
          </div>
        </div>

        <WaveDivider from="fill-white" />
      </section>

      {/* ── Trust bar ────────────────────────────────────── */}
      <section className="border-b border-navy-100 bg-white py-7">
        <div className="container-page">
          <TrustBar />
        </div>
      </section>

      {/* ── Brand / logo moment ──────────────────────────── */}
      <section className="relative overflow-hidden bg-white py-20">
        <div className="absolute inset-0 bg-grid mask-fade" aria-hidden="true" />
        <div className="container-page relative">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal className="order-2 lg:order-1">
              <span className="chip">Why us</span>
              <h2 className="mt-4 text-3xl sm:text-4xl">
                An open door, not a{' '}
                <span className="underline-brush">sales pitch</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-navy-500">
                Our mark is a doorway inside a heart, with a path leading up to it. That is the
                job as we see it: show you the way in, walk it with you, and let you decide what
                is right for your family.
              </p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {[
                  { t: 'Independent', d: 'Not owned by any carrier, so we can compare instead of push.' },
                  { t: 'Licensed', d: `${SITE.agent.name} personally handles your case in ${SITE.agent.stateCount} states.` },
                  { t: 'Transparent', d: 'No promised numbers before your state and ZIP are checked.' },
                  { t: 'Secure', d: 'Applications only inside a CMS-certified platform.' },
                ].map((x) => (
                  <div key={x.t} className="border-l-2 border-teal-200 pl-4">
                    <p className="font-extrabold text-navy-800">{x.t}</p>
                    <p className="mt-1 text-sm leading-relaxed text-navy-500">{x.d}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={140} className="order-1 lg:order-2">
              <div className="relative mx-auto flex max-w-md items-center justify-center">
                <span className="absolute h-[21rem] w-[21rem] rounded-full border border-teal-100" aria-hidden="true" />
                <span className="absolute h-[16rem] w-[16rem] rounded-full border border-grass-100" aria-hidden="true" />
                <span className="blob absolute h-64 w-64 animate-float bg-teal-200/40" aria-hidden="true" />
                <div className="relative animate-bob rounded-[2rem] bg-white p-8 shadow-lift ring-1 ring-navy-100">
                  <LogoFull className="h-auto w-56 sm:w-64" priority />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Coverage types ───────────────────────────────── */}
      <section className="relative bg-wash py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we help with"
            title="Coverage for individuals, families and employers"
            sub="Choose the path that fits your situation. A licensed agent reviews the details with you before anything is decided."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              delay={0}
              icon={<IconShield />}
              title="ACA Marketplace Plans"
              body="Individual and family health coverage through the Marketplace, including guidance on premium tax credits and cost-sharing reductions."
              href="/aca-health-insurance"
              cta="Explore ACA plans"
            />
            <FeatureCard
              delay={90}
              icon={<IconHeart />}
              title="Life & Final Expense"
              body="Term, whole and final expense policies from multiple A-rated carriers, sized to what your family would actually need."
              href="/life-insurance"
              cta="Explore life insurance"
            />
            <FeatureCard
              delay={180}
              icon={<IconSmile />}
              title="Dental & Vision"
              body="Standalone dental and vision plans, available in most states without buying a health plan. Most health plans leave adult dental and vision out."
              href="/dental-vision"
              cta="Explore dental & vision"
            />
            <FeatureCard
              delay={270}
              icon={<IconBuilding />}
              title="Employer Group Benefits"
              body="Group health, dental, vision, life and disability for businesses of 1 to 500+ employees, with custom proposals at no cost."
              href="/employer-group"
              cta="Explore group benefits"
            />
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white py-20">
        <div className="absolute inset-0 bg-dots mask-fade opacity-50" aria-hidden="true" />
        <div className="container-page relative">
          <SectionHeading
            eyebrow="How it works"
            title="Three steps, no surprises"
            sub="We check what is actually available in your state before anyone talks about price."
          />
          <Steps
            steps={[
              {
                title: 'Tell us where you live',
                body: 'A few quick questions: ZIP code, household size, and your situation. No Social Security number, and nothing sensitive.',
              },
              {
                title: 'We check your state',
                body: 'Your state is checked against our licensing and readiness matrix. You see your status immediately, along with what happens next.',
              },
              {
                title: 'A licensed agent reviews with you',
                body: 'Verified options for your area, walked through by a licensed agent. Enrollment happens in a secure CMS-certified platform, only when you say so.',
              },
            ]}
          />
        </div>
      </section>

      {/* ── Savings estimator ────────────────────────────── */}
      <section className="relative overflow-hidden bg-wash py-20">
        <div className="container-page relative">
          <div className="grid items-center gap-10 overflow-hidden rounded-3xl border border-teal-100 bg-white p-8 shadow-card lg:grid-cols-2 lg:p-12">
            <Reveal>
              <span className="chip">Free tool</span>
              <h2 className="mt-4 text-3xl sm:text-4xl">See how ACA savings are calculated</h2>
              <p className="mt-4 text-lg leading-relaxed text-navy-500">
                Enter your household size and estimated income to see the share of income the ACA
                expects you to contribute toward a benchmark plan. No personal details required.
              </p>
              <Link href="/subsidy-calculator" className="btn-teal mt-7 px-8">
                Open the estimator →
              </Link>
              <p className="legal mt-5 max-w-md">
                Educational only. Actual eligibility and amounts are determined by the Marketplace
                based on your full application.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative rounded-2xl bg-brand-deep p-7 text-white shadow-lift">
                <div className="absolute inset-0 rounded-2xl bg-grid-light" aria-hidden="true" />
                <div className="relative">
                  <p className="text-sm font-bold uppercase tracking-wider text-teal-300">
                    Example: household of 3
                  </p>
                  <p className="mt-5 text-sm text-navy-200">Estimated annual income</p>
                  <p className="text-3xl font-extrabold">$45,000</p>
                  <div className="my-5 h-px bg-white/15" />
                  <p className="text-sm text-navy-200">
                    Expected monthly contribution toward a benchmark Silver plan
                  </p>
                  <p className="mt-1 text-4xl font-extrabold text-grass-300">capped by income</p>
                  <p className="mt-5 text-xs leading-relaxed text-navy-300">
                    Illustration only. Your result depends on your state, household size, income
                    and the plans available in your ZIP code.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── States ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white py-20">
        <div className="absolute inset-0 bg-grid mask-fade" aria-hidden="true" />
        <div className="container-page relative">
          <SectionHeading
            eyebrow="Where we work"
            title="Marketplace guidance across these states"
            sub="Select your state to see local enrollment details. Availability is always confirmed during your consultation."
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {states.map((s, i) => (
              <Reveal key={s.abbr} delay={Math.min(i * 28, 400)}>
                <Link
                  href={`/aca/${s.slug}`}
                  className="group flex items-center justify-between gap-2 rounded-xl border border-navy-100 bg-white px-4 py-3 text-sm font-bold text-navy-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-teal-300 hover:text-teal-700 hover:shadow-card"
                >
                  {s.name}
                  <span className="text-teal-400 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true">
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="bg-wash py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Questions" title="Frequently asked" />
          <FAQ items={FAQS} />
        </div>
      </section>

      <CtaBand />
    </>
  )
}
