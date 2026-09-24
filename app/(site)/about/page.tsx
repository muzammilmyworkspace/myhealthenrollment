import Link from 'next/link'
import type { Metadata } from 'next'
import { SectionHeading, CtaBand, Callout, Check } from '@/components/ui'
import { SITE, DISCLOSURES } from '@/lib/site'
import { STATES } from '@/lib/states'

export const metadata: Metadata = {
  title: 'About & Licensing',
  description:
    'My Health Enrollment is a licensed independent insurance agency operated by JINSUNG INTERNATIONAL LLC. Meet the agent and review our licensing and compliance commitments.',
  alternates: { canonical: '/about' },
}

const COMMITMENTS = [
  'We never promise a premium, a subsidy amount, or "free" coverage before an application is completed.',
  'We never suggest government affiliation or endorsement.',
  'We never misrepresent plan benefits or disparage other plans.',
  'We collect documented consent before contacting you, and honor opt-outs immediately.',
  'We never ask for a Social Security number, payment details, or immigration documents by web form, text or email.',
  'Plan recommendations and eligibility determinations are made only by a licensed agent.',
]

export default function AboutPage() {
  const served = STATES.filter((s) => s.tier !== 'RED')

  return (
    <>
      <section className="border-b border-slate-200 bg-gradient-to-b from-brand-50 to-white py-14 lg:py-20">
        <div className="container-page mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-brand-700">About us</p>
          <h1 className="text-4xl sm:text-5xl">A licensed agent, not a call center</h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            {SITE.name} is the doing-business-as brand of {SITE.legalEntity}, an independent
            insurance agency. Independent means we are not employed by any single carrier — so we
            can compare options rather than sell one company&apos;s products.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="mx-auto max-w-3xl">
          <div className="card sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div
                className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-100 text-3xl font-extrabold text-brand-700"
                aria-hidden="true"
              >
                ZM
              </div>
              <div>
                <h2 className="text-2xl">{SITE.agent.name}</h2>
                <p className="mt-1 font-semibold text-brand-700">{SITE.agent.title}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
                  Licensed in {SITE.agent.stateCount} states, helping individuals, families and
                  employers compare ACA Marketplace, life, dental, vision and group coverage.
                  Enrollment is completed through {SITE.enrollmentPartner}, a CMS-certified
                  platform — never through a web form or text message.
                </p>
                <p className="legal mt-4">{SITE.licenseNote}</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Callout tone="info" title="Verify any agent before you share information">
              Every state maintains a public license lookup, and the National Association of
              Insurance Commissioners publishes a national directory. Checking a license takes a
              minute and is worth doing with any agent — including us.
            </Callout>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-16">
        <div className="container-page mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="How we work"
            center={false}
            title="Our compliance commitments"
            sub="ACA marketing has a real fraud problem. These are the lines we do not cross, and you should expect the same from anyone you work with."
          />
          <ul className="space-y-3">
            {COMMITMENTS.map((c) => (
              <li key={c} className="flex gap-3 text-[15px] leading-relaxed text-slate-700">
                <Check /> {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Coverage area"
            center={false}
            title="States we serve"
            sub="Marketplace availability differs by state. Some states run their own exchange, which changes how an agent may assist you."
          />
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th scope="col" className="px-5 py-3 font-bold text-slate-900">State</th>
                  <th scope="col" className="px-5 py-3 font-bold text-slate-900">Marketplace</th>
                  <th scope="col" className="px-5 py-3 font-bold text-slate-900">Enrollment path</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {served.map((s) => (
                  <tr key={s.abbr}>
                    <th scope="row" className="px-5 py-3 font-semibold text-slate-800">
                      <Link href={`/aca/${s.slug}`} className="hover:text-brand-700">{s.name}</Link>
                    </th>
                    <td className="px-5 py-3 text-slate-600">
                      {s.exchange === 'federal' ? 'HealthCare.gov' : s.exchangeName ?? 'State exchange'}
                    </td>
                    <td className="px-5 py-3 text-slate-600">
                      {s.tier === 'GREEN' ? 'Secure agent-assisted enrollment' : 'Agent review required first'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="legal mt-4">{DISCLOSURES.agentLicensing}</p>
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-5 text-2xl">Contact</h2>
          <div className="card">
            <dl className="grid gap-5 sm:grid-cols-3">
              <div>
                <dt className="text-sm font-semibold text-slate-500">Phone</dt>
                <dd className="mt-1">
                  <a href={SITE.phoneHref} className="text-lg font-bold text-brand-700">{SITE.phone}</a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-slate-500">Email</dt>
                <dd className="mt-1">
                  <a href={SITE.emailHref} className="font-medium text-brand-700 break-all">{SITE.email}</a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-slate-500">Legal entity</dt>
                <dd className="mt-1 font-medium text-slate-800">
                  {SITE.legalEntity}
                  <br />
                  <span className="text-sm text-slate-600">
                    {SITE.address.line1}, {SITE.address.region}
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
