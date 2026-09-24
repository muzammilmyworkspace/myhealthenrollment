import Link from 'next/link'
import QuizFunnel from './QuizFunnel'
import { FAQ, Check } from './ui'
import { SITE, DISCLOSURES } from '@/lib/site'

/**
 * Paid-traffic landing page.
 *
 * Deliberately different from the site pages:
 *   • no navigation — nothing competes with the one action
 *   • one CTA, repeated
 *   • the form is above the fold on desktop and one tap away on mobile
 *   • trust + disclosure are visible, because ad reviewers read the landing
 *     page, not just the ad
 *
 * Copy rules for anything passed in here — see README:
 *   never assert a reader's health or financial situation ("Are you
 *   uninsured?", "You qualify for $0"), never promise an amount, never imply
 *   government affiliation.
 */

export interface LandingPageProps {
  eyebrow: string
  headline: string
  subhead: string
  bullets: string[]
  source: string
  faqs: { q: string; a: string }[]
  /** Optional context block rendered under the form. */
  note?: string
}

export default function LandingPage({
  eyebrow,
  headline,
  subhead,
  bullets,
  source,
  faqs,
  note,
}: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Minimal header — logo + phone only, no nav */}
      <header className="border-b border-slate-200 bg-white">
        <div className="container-page flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-sm font-extrabold text-white">
              MHE
            </span>
            <span className="text-[15px] font-bold leading-tight text-slate-900">
              My Health
              <br className="hidden sm:block" /> Enrollment
            </span>
          </Link>
          <a
            href={SITE.phoneHref}
            className="rounded-xl bg-accent-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-accent-700 sm:px-5"
          >
            Call {SITE.phone}
          </a>
        </div>
      </header>

      <section className="bg-gradient-to-b from-brand-50 to-white py-10 lg:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center">
            <p className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
              <span className="h-2 w-2 rounded-full bg-accent-500" aria-hidden="true" />
              {eyebrow}
            </p>

            <h1 className="mt-5 text-3xl leading-[1.12] sm:text-4xl lg:text-5xl">{headline}</h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">{subhead}</p>

            <ul className="mt-7 space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex gap-2.5 text-[15px] font-medium text-slate-700">
                  <Check /> {b}
                </li>
              ))}
            </ul>

            <a href="#form" className="btn-primary mt-8 px-8 lg:hidden">
              See my options →
            </a>

            <p className="mt-6 text-xs leading-relaxed text-slate-500">
              {DISCLOSURES.notGovernment}
            </p>
          </div>

          <div id="form" className="scroll-mt-6">
            <QuizFunnel source={source} />
            {note && (
              <p className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">
                {note}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-y border-slate-200 bg-white py-8">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                t: `Licensed in ${SITE.agent.stateCount} states`,
                d: `${SITE.agent.name}, ${SITE.agent.title}. ${SITE.licenseNote}`,
              },
              {
                t: 'Free, with no obligation',
                d: 'Agents are paid by the carrier. Your premium is the same either way.',
              },
              {
                t: 'Secure enrollment',
                d: `Applications are completed inside ${SITE.enrollmentPartner}, a CMS-certified platform — never by text or email.`,
              },
            ].map((item) => (
              <div key={item.t} className="text-center sm:text-left">
                <p className="font-bold text-slate-900">{item.t}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-page py-14">
        <h2 className="mb-8 text-center text-2xl sm:text-3xl">How it works</h2>
        <ol className="grid gap-6 md:grid-cols-3">
          {[
            { t: 'Answer a few questions', d: 'ZIP code, household size, your situation. Takes about two minutes.' },
            { t: 'We check your state', d: 'You see immediately whether a licensed agent is available where you live.' },
            { t: 'Review real options', d: 'A licensed agent walks through verified plans for your area. You decide — or you do not.' },
          ].map((s, i) => (
            <li key={s.t} className="card">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-base font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg">{s.t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="border-t border-slate-200 bg-slate-50 py-14">
        <div className="container-page">
          <h2 className="mb-8 text-center text-2xl sm:text-3xl">Common questions</h2>
          <FAQ items={faqs} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-brand-700 py-14">
        <div className="container-page text-center">
          <h2 className="text-2xl text-white sm:text-3xl">Ready to see your options?</h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-100">
            Free, and no obligation to enroll.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#form" className="btn bg-white px-8 text-brand-700 hover:bg-brand-50">
              See my options
            </a>
            <a
              href={SITE.phoneHref}
              className="btn border-2 border-white/60 px-8 text-white hover:bg-white/10"
            >
              Call {SITE.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Compliance footer — ad reviewers look for this */}
      <footer className="border-t border-slate-200 bg-slate-900 py-10 text-slate-400">
        <div className="container-page space-y-3">
          <p className="text-sm font-bold text-white">
            {SITE.legalEntity} DBA {SITE.name}
          </p>
          <p className="legal !text-slate-400">{DISCLOSURES.notGovernment}</p>
          <p className="legal !text-slate-400">{DISCLOSURES.solicitation}</p>
          <p className="legal !text-slate-400">{DISCLOSURES.noGuarantee}</p>
          <p className="legal !text-slate-400">
            {DISCLOSURES.agentLicensing} {SITE.licenseNote}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 pt-3 text-xs">
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            <Link href="/about" className="hover:text-white">About &amp; Licensing</Link>
            <a href={SITE.emailHref} className="hover:text-white">{SITE.email}</a>
          </div>
          <p className="pt-2 text-xs text-slate-500">
            © {new Date().getFullYear()} {SITE.legalEntity}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
