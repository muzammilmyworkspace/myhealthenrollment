import Link from 'next/link'
import type { Metadata } from 'next'
import QuizFunnel from '@/components/QuizFunnel'
import Reveal from '@/components/Reveal'
import Testimonials from '@/components/Testimonials'
import { LogoFull } from '@/components/Logo'
import {
  SectionHeading, FeatureCard, Steps, FAQ, CtaBand, TrustBar, Check,
  Blobs, WaveDivider, IconShield, IconHeart, IconSmile, IconBuilding,
  IconBadge, IconWallet, IconLock, IconCompare,
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

/** The reasons to pick a licensed independent agent over a call centre. */
const USPS = [
  {
    title: `Licensed in ${SITE.agent.stateCount} states`,
    body: 'One named agent handles your case, not a rotating call centre.',
    icon: <IconBadge />,
  },
  {
    title: 'Costs you nothing',
    body: 'Agents are paid by the carrier. Your premium is the same either way.',
    icon: <IconWallet />,
  },
  {
    title: 'CMS-certified enrollment',
    body: `Applications complete inside ${SITE.enrollmentPartner}, never by text or email.`,
    icon: <IconLock />,
  },
  {
    title: 'No obligation, no pressure',
    body: 'We never promise a price before checking your state and ZIP.',
    icon: <IconCompare />,
  },
]

export default function HomePage() {
  const states = greenStates()

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-deep">
        {/* layered decoration: drifting grid, shifting colour field, blobs,
            and one slow light sweep. All of it stops under
            prefers-reduced-motion via the global rule in globals.css. */}
        <div className="absolute inset-0 bg-grid-light animate-grid-drift" aria-hidden="true" />
        <div className="absolute inset-0 bg-aurora" aria-hidden="true" />
        <Blobs variant="dark" />
        <div className="sweep-layer" aria-hidden="true" />

        <div className="container-page relative py-12 lg:py-16">
          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
            <div className="flex flex-col justify-center">
              <p className="inline-flex w-fit animate-fade-up items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-grass-400" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-grass-400" />
                </span>
                Open Enrollment {OEP.planYear}: {OEP.startLabel} to {OEP.endLabel}
              </p>

              <h1
                className="mt-6 animate-fade-up text-[2.5rem] leading-[1.06] text-white sm:text-5xl lg:text-[3.4rem]"
                style={{ animationDelay: '.09s' }}
              >
                Health coverage,
                <br />
                <span className="text-gradient">explained by a real agent</span>
              </h1>

              <p
                className="mt-5 max-w-xl animate-fade-up text-lg leading-relaxed text-navy-100"
                style={{ animationDelay: '.18s' }}
              >
                Compare ACA Marketplace plans for individuals and families across{' '}
                {SITE.agent.stateCount} states. We handle the paperwork and the comparison.
                You decide.
              </p>

              {/* USPs — the reasons to choose this agency over a call centre */}
              <ul className="stagger mt-7 grid items-stretch gap-3 sm:grid-cols-2">
                {USPS.map((u) => (
                  <li key={u.title} className="glass-hover flex h-full animate-fade-up items-start gap-3 p-3.5">
                    <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white/15 text-grass-300">
                      {u.icon}
                    </span>
                    <span>
                      <span className="block text-[14.5px] font-bold text-white">{u.title}</span>
                      <span className="mt-0.5 block text-[13px] leading-snug text-navy-200">
                        {u.body}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              <div
                className="mt-8 flex animate-fade-up flex-col gap-3 sm:flex-row"
                style={{ animationDelay: '.5s' }}
              >
                <Link href="#start" className="btn-accent group relative overflow-hidden px-9 text-lg">
                  <span className="relative z-10">See My Options</span>
                  <span className="relative z-10 transition-transform group-hover:translate-x-1" aria-hidden="true">
                    →
                  </span>
                  {/* shine sweep on hover */}
                  <span
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                    aria-hidden="true"
                  />
                </Link>
                <a href={SITE.phoneHref} className="btn-glass px-8">
                  Call {SITE.phone}
                </a>
              </div>
            </div>

            <div id="start" className="relative scroll-mt-24">
              {/* Trust badges pinned to the card edges so they read as
                  attached chrome without ever covering form content. Hidden
                  on small screens and from assistive tech. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-4 left-6 z-20 hidden animate-bob items-center gap-2 rounded-full border border-navy-100 bg-white px-4 py-2 text-[12.5px] font-extrabold text-navy-800 shadow-lift sm:flex"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-grass-100 text-grass-600">
                  <IconBadge />
                </span>
                Licensed agent
              </span>

              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-4 right-6 z-20 hidden animate-bob items-center gap-2 rounded-full border border-navy-100 bg-white px-4 py-2 text-[12.5px] font-extrabold text-navy-800 shadow-lift sm:flex"
                style={{ animationDelay: '1.4s' }}
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-teal-100 text-teal-600">
                  <IconWallet />
                </span>
                $0 cost to you
              </span>

              {/* soft halo behind the card */}
              <span
                aria-hidden="true"
                className="blob absolute -inset-6 -z-10 animate-float bg-teal-400/25"
              />

              <div
                className="animate-scale-in rounded-2xl animate-glow-ring"
                style={{ animationDelay: '.25s' }}
              >
                <QuizFunnel source="home-hero" />
              </div>

              <div className="mt-4 flex items-start gap-3 rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0 text-grass-300" aria-hidden="true">
                  <rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>
                <p className="text-[13px] leading-relaxed text-navy-100">
                  <strong className="font-bold text-white">This form never asks for sensitive data.</strong>{' '}
                  No Social Security number, no banking or card details, no passwords. Anyone who
                  asks for those by web form, text or email is not us.
                </p>
              </div>
            </div>
          </div>

          {/* Full width so the notice reads in a few lines instead of a tall
              narrow column, which keeps the hero short. */}
          <div className="mt-10 animate-fade-up glass p-4 sm:p-5" style={{ animationDelay: '.6s' }}>
            <p className="text-[12.5px] leading-relaxed text-navy-200">
              <strong className="font-bold text-white">Important:</strong> My Health Enrollment is
              an independent, licensed insurance agency. We are{' '}
              <strong className="font-bold text-white">
                not affiliated with or endorsed by the U.S. government
              </strong>{' '}
              or CMS. Calling{' '}
              <a href={SITE.phoneHref} className="font-bold text-teal-200 underline underline-offset-2">
                {SITE.phone}
              </a>{' '}
              connects you first to the My Health Enrollment AI customer support assistant. It may
              collect basic routing information, help with general educational questions, send a
              secure enrollment link or schedule a callback with consent, and connect you with a
              licensed insurance agent when appropriate. Do not provide Social Security numbers,
              banking information, payment card information, passwords, or sensitive medical
              information to the AI assistant. Plans and availability vary by state. Not all plans
              are available in all areas.
            </p>
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

      {/* ── Testimonials ─────────────────────────────────── */}
      <Testimonials />

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
