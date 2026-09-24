import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import QuizFunnel from '@/components/QuizFunnel'
import { SectionHeading, FAQ, CtaBand, Callout, TrustBar, Check } from '@/components/ui'
import { SITE, OEP, DISCLOSURES } from '@/lib/site'
import { STATES, getStateBySlug, greenStates } from '@/lib/states'

type Params = { state: string }

/** Pre-render every state page at build time — these are the SEO assets. */
export function generateStaticParams() {
  return STATES.map((s) => ({ state: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { state: slug } = await params
  const s = getStateBySlug(slug)
  if (!s) return { title: 'State not found' }

  return {
    // Kept short so the brand suffix from title.template does not push the
    // keywords past where search results truncate.
    title: `${s.name} ACA Health Insurance Plans`,
    description: `Compare ACA Marketplace health insurance in ${s.name} with a licensed independent agent. Open Enrollment runs ${OEP.startLabel} through ${OEP.endLabel}. Free guidance, no obligation.`,
    alternates: { canonical: `/aca/${s.slug}` },
    openGraph: {
      title: `${s.name} Health Insurance & ACA Marketplace Plans`,
      description: `Licensed agent guidance for ACA Marketplace coverage in ${s.name}.`,
      url: `${SITE.url}/aca/${s.slug}`,
    },
  }
}

export default async function StatePage({ params }: { params: Promise<Params> }) {
  const { state: slug } = await params
  const s = getStateBySlug(slug)
  if (!s) notFound()

  const others = greenStates()
    .filter((x) => x.abbr !== s.abbr)
    .slice(0, 12)

  const applyVia =
    s.exchange === 'federal'
      ? 'HealthCare.gov, the federal Marketplace'
      : `${s.exchangeName ?? 'a state-run exchange'}, ${s.name}'s own health insurance exchange`

  const faqs = [
    {
      q: `When is Open Enrollment in ${s.name}?`,
      a:
        s.exchange === 'federal'
          ? `${s.name} uses the federal Marketplace, so Open Enrollment for ${OEP.planYear} coverage runs ${OEP.startLabel} through ${OEP.endLabel}. Outside that window you need a qualifying life event to enroll. Dates are set by CMS and can change.`
          : `${s.name} runs its own exchange${s.exchangeName ? ` (${s.exchangeName})` : ''}, and state exchanges sometimes set different enrollment dates than the federal Marketplace. The federal window for ${OEP.planYear} coverage runs ${OEP.startLabel} through ${OEP.endLabel} — confirm your state's dates before relying on them.`,
    },
    {
      q: `Where do I apply for coverage in ${s.name}?`,
      a: `Residents of ${s.name} apply through ${applyVia}. We can walk you through that process — and, where available, help you complete it inside a secure CMS-certified enrollment platform.`,
    },
    {
      q: `Does ${s.name} have expanded Medicaid?`,
      a: s.medicaidExpanded
        ? `Yes. ${s.name} has expanded Medicaid, so adults with income below roughly 138% of the Federal Poverty Level may qualify for Medicaid rather than a subsidized Marketplace plan. An agent can help you figure out which path applies.`
        : `${s.name} has not expanded Medicaid. That creates a coverage gap: adults with income below 100% of the Federal Poverty Level may earn too little for Marketplace premium tax credits but too much for the state's existing Medicaid rules. If that describes your situation, an agent can walk through what options do exist.`,
    },
    {
      q: `Can I be denied coverage in ${s.name} for a pre-existing condition?`,
      a: 'No. ACA Marketplace plans cannot deny you, charge you more, or exclude treatment because of a pre-existing condition. Premiums vary by age, location, tobacco use and plan tier — not health status.',
    },
    {
      q: 'What does your help cost?',
      a: 'Nothing. Licensed agents are compensated by the carrier when someone enrolls, and the premium is the same whether you use an agent or enroll on your own.',
    },
  ]

  return (
    <>
      <section className="border-b border-slate-200 bg-gradient-to-b from-brand-50 to-white py-12 lg:py-16">
        <div className="container-page">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
            <Link href="/" className="hover:text-brand-700">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href="/aca-health-insurance" className="hover:text-brand-700">ACA Plans</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="font-medium text-slate-700">{s.name}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h1 className="text-4xl leading-tight sm:text-5xl">
                {s.name} health insurance &amp; ACA Marketplace plans
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                Compare Marketplace coverage available in {s.name} with a licensed independent
                agent. We check which plans and carriers are actually offered in your ZIP code —
                free, and with no obligation to enroll.
              </p>

              <ul className="mt-7 space-y-3">
                <li className="flex gap-2.5 text-[15px] font-medium text-slate-700">
                  <Check /> Applications go through {applyVia}
                </li>
                <li className="flex gap-2.5 text-[15px] font-medium text-slate-700">
                  <Check />{' '}
                  {s.medicaidExpanded
                    ? `${s.name} has expanded Medicaid`
                    : `${s.name} has not expanded Medicaid`}
                </li>
                <li className="flex gap-2.5 text-[15px] font-medium text-slate-700">
                  <Check /> Open Enrollment: {OEP.startLabel} – {OEP.endLabel}
                </li>
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="#start" className="btn-primary px-8">See my options</Link>
                <a href={SITE.phoneHref} className="btn-ghost px-8">Call {SITE.phone}</a>
              </div>
            </div>

            <div id="start" className="scroll-mt-20">
              <QuizFunnel source={`state-${s.slug}`} />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-6">
        <div className="container-page"><TrustBar /></div>
      </section>

      <section className="container-page py-16">
        <div className="mx-auto max-w-3xl space-y-6">
          <SectionHeading
            eyebrow={s.name}
            center={false}
            title={`What to know about coverage in ${s.name}`}
          />

          <div className="prose-page">
            <h2>How enrollment works here</h2>
            <p>
              {s.exchange === 'federal' ? (
                <>
                  {s.name} uses the federal Marketplace at HealthCare.gov. That means the standard
                  federal Open Enrollment window applies, and a licensed agent can assist you
                  through a CMS-certified enrollment platform rather than leaving you to navigate
                  the application alone.
                </>
              ) : (
                <>
                  {s.name} operates its own health insurance exchange
                  {s.exchangeName ? `, ${s.exchangeName}` : ''}. State-based exchanges set their
                  own enrollment dates and their own rules about how agents may assist consumers,
                  so the process differs from the federal Marketplace.
                </>
              )}
            </p>

            <h2>Medicaid in {s.name}</h2>
            <p>
              {s.medicaidExpanded ? (
                <>
                  {s.name} expanded Medicaid under the ACA. Adults with household income below
                  roughly 138% of the Federal Poverty Level may qualify for Medicaid instead of a
                  subsidized Marketplace plan. If your income is near that line it is worth
                  checking both paths — an agent can point you to the right application.
                </>
              ) : (
                <>
                  {s.name} has not expanded Medicaid. This creates what is often called the
                  coverage gap: households below 100% of the Federal Poverty Level may earn too
                  little to qualify for Marketplace premium tax credits, while also not meeting
                  the state&apos;s existing Medicaid eligibility rules. If that is your situation,
                  a licensed agent can walk you through the options that do exist rather than
                  leaving you guessing.
                </>
              )}
            </p>

            <h2>What plans cost</h2>
            <p>
              Premiums in {s.name} depend on your rating area, the ages of everyone covered,
              tobacco use, and which carriers file rates where you live. Because of that, no
              honest source can quote you a price before checking your ZIP code. What we can tell
              you is how the savings math works — and then show you real plans inside the secure
              enrollment platform.
            </p>
          </div>

          {s.tier === 'YELLOW' && (
            <Callout tone="warn" title={`${s.name} requires agent review first`}>
              Because {s.name} runs its own exchange, we review your submission before enrollment
              rather than sending you straight through. Your information is saved and a licensed
              agent will contact you within one business day.
            </Callout>
          )}

          {s.tier === 'RED' && (
            <Callout tone="warn" title={`Direct enrollment is not available in ${s.name}`}>
              {s.name} operates a state-run exchange that does not allow independent agents to
              enroll consumers through the federal Marketplace. We can still capture your request
              and refer you appropriately, and we can help with life, dental, vision and other
              non-Marketplace coverage.{' '}
              {s.exchangeUrl && (
                <a
                  href={s.exchangeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline"
                >
                  Visit {s.exchangeName} ↗
                </a>
              )}
            </Callout>
          )}

          <Callout tone="info" title="Watch out for subsidy scams">
            No one can tell you your exact subsidy in {s.name} before you complete an application.
            Anyone promising a specific dollar amount, a &ldquo;government card,&rdquo; or cash
            benefits is not describing how the ACA works.
          </Callout>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-16">
        <div className="container-page">
          <SectionHeading eyebrow="Questions" title={`${s.name} ACA FAQ`} />
          <FAQ items={faqs} />
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="mb-6 text-center text-2xl">Other states we serve</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {others.map((o) => (
            <Link
              key={o.abbr}
              href={`/aca/${o.slug}`}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 transition-colors hover:border-brand-400 hover:text-brand-700"
            >
              {o.name}
            </Link>
          ))}
        </div>
        <p className="legal mx-auto mt-6 max-w-3xl text-center">
          {DISCLOSURES.agentLicensing} {DISCLOSURES.solicitation}
        </p>
      </section>

      <CtaBand
        title={`See what is available in ${s.name}`}
        body="A licensed agent will review verified options for your ZIP code. Free, with no obligation to enroll."
      />
    </>
  )
}
