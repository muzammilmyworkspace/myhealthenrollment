import Link from 'next/link'
import QuizFunnel from './QuizFunnel'
import Logo from './Logo'
import Reveal from './Reveal'
import { FAQ, Check, Blobs, WaveDivider } from './ui'
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
      <header className="border-b border-navy-100 bg-white">
        <div className="container-page flex h-16 items-center justify-between">
          <Link href="/" aria-label="My Health Enrollment home">
            <Logo />
          </Link>
          <a
            href={SITE.phoneHref}
            className="btn-accent px-4 py-2.5 text-sm sm:px-5"
          >
            Call {SITE.phone}
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden bg-brand-deep py-10 lg:py-16">
        <div className="absolute inset-0 bg-grid-light" aria-hidden="true" />
        <Blobs variant="dark" />
        <div className="container-page relative grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center">
            <p className="inline-flex w-fit animate-fade-up items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-grass-400" /><span className="relative inline-flex h-2 w-2 rounded-full bg-grass-400" /></span>
              {eyebrow}
            </p>

            <h1 className="mt-5 animate-fade-up text-3xl leading-[1.12] text-white sm:text-4xl lg:text-5xl" style={{ animationDelay: '.08s' }}>{headline}</h1>
            <p className="mt-4 max-w-xl animate-fade-up text-lg leading-relaxed text-navy-100" style={{ animationDelay: '.16s' }}>{subhead}</p>

            <ul className="stagger mt-7 space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex animate-fade-up gap-2.5 text-[15px] font-medium text-white/90">
                  <Check tone="white" /> {b}
                </li>
              ))}
            </ul>

            <a href="#form" className="btn-accent mt-8 px-8 lg:hidden">
              See my options →
            </a>

            <p className="mt-6 max-w-xl text-xs leading-relaxed text-navy-300">
              {DISCLOSURES.notGovernment}
            </p>
          </div>

          <div id="form" className="animate-scale-in scroll-mt-6" style={{ animationDelay: '.2s' }}>
            <QuizFunnel source={source} />
            {note && (
              <p className="mt-4 rounded-xl border border-white/15 bg-white/10 p-4 text-sm leading-relaxed text-navy-100 backdrop-blur-sm">
                {note}
              </p>
            )}
          </div>
        </div>
        <WaveDivider from="fill-white" />
      </section>

      {/* Trust */}
      <section className="border-b border-navy-100 bg-white py-8">
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
                d: `Applications are completed inside ${SITE.enrollmentPartner}, a CMS-certified platform, never by text or email.`,
              },
            ].map((item) => (
              <div key={item.t} className="text-center sm:text-left">
                <p className="font-bold text-navy-900">{item.t}</p>
                <p className="mt-1 text-sm leading-relaxed text-navy-500">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-page py-16">
        <h2 className="mb-10 text-center text-2xl sm:text-3xl">How it works</h2>
        <ol className="grid gap-6 md:grid-cols-3">
          {[
            { t: 'Answer a few questions', d: 'ZIP code, household size, your situation. Takes about two minutes.' },
            { t: 'We check your state', d: 'You see immediately whether a licensed agent is available where you live.' },
            { t: 'Review real options', d: 'A licensed agent walks through verified plans for your area. You decide, or you do not.' },
          ].map((s, i) => (
            <li key={s.t} className="card-hover text-center">
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-navy-700 to-teal-600 text-base font-extrabold text-white shadow-glow">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg">{s.t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-navy-500">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="border-t border-navy-100 bg-wash py-16">
        <div className="container-page">
          <h2 className="mb-8 text-center text-2xl sm:text-3xl">Common questions</h2>
          <FAQ items={faqs} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-brand-deep py-16">
        <div className="absolute inset-0 bg-grid-light" aria-hidden="true" />
        <div className="container-page relative text-center">
          <h2 className="text-2xl text-white sm:text-3xl">Ready to see your options?</h2>
          <p className="mx-auto mt-3 max-w-xl text-navy-100">
            Free, and no obligation to enroll.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#form" className="btn-accent px-8">
              See my options
            </a>
            <a
              href={SITE.phoneHref}
              className="btn-glass px-8"
            >
              Call {SITE.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Compliance footer — ad reviewers look for this */}
      <footer className="border-t border-navy-100 bg-navy-900 py-10 text-navy-300">
        <div className="container-page space-y-3">
          <p className="text-sm font-bold text-white">
            {SITE.legalEntity} DBA {SITE.name}
          </p>
          <p className="legal !text-navy-300">{DISCLOSURES.notGovernment}</p>
          <p className="legal !text-navy-300">{DISCLOSURES.solicitation}</p>
          <p className="legal !text-navy-300">{DISCLOSURES.noGuarantee}</p>
          <p className="legal !text-navy-300">
            {DISCLOSURES.agentLicensing} {SITE.licenseNote}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 pt-3 text-xs">
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            <Link href="/about" className="hover:text-white">About &amp; Licensing</Link>
            <a href={SITE.emailHref} className="hover:text-white">{SITE.email}</a>
          </div>
          <p className="pt-2 text-xs text-navy-400">
            © {new Date().getFullYear()} {SITE.legalEntity}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
