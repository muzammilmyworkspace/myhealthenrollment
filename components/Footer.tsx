import Link from 'next/link'
import Logo from './Logo'
import { SITE, DISCLOSURES } from '@/lib/site'
import { greenStates } from '@/lib/states'

export default function Footer() {
  const year = new Date().getFullYear()
  const states = greenStates()

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-navy-200">
      <div className="absolute inset-0 bg-grid-light opacity-60" aria-hidden="true" />
      {/* brand glow along the top edge */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent"
        aria-hidden="true"
      />

      <div className="container-page relative py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Logo onDark />
            <p className="mt-5 text-sm leading-relaxed text-navy-300">
              Licensed independent insurance agency helping individuals, families and employers
              compare coverage options.
            </p>
            <a
              href={SITE.phoneHref}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-lg font-extrabold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              {SITE.phone}
            </a>
            <br />
            <a href={SITE.emailHref} className="mt-3 inline-block text-sm text-navy-300 hover:text-teal-300">
              {SITE.email}
            </a>
          </div>

          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">Coverage</h3>
            <ul className="mt-5 space-y-2.5 text-sm">
              {[
                ['/aca-health-insurance', 'ACA Health Plans'],
                ['/life-insurance', 'Life Insurance'],
                ['/dental-vision', 'Dental & Vision'],
                ['/employer-group', 'Employer Group'],
                ['/subsidy-calculator', 'Savings Estimator'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-teal-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">Company</h3>
            <ul className="mt-5 space-y-2.5 text-sm">
              {[
                ['/about', 'About & Licensing'],
                ['/quote', 'Get a Quote'],
                ['/privacy-policy', 'Privacy Policy'],
                ['/terms', 'Terms of Service'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-teal-300">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://www.healthcare.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-teal-300"
                >
                  HealthCare.gov ↗
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">
              States We Serve
            </h3>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {states.map((s) => (
                <Link
                  key={s.abbr}
                  href={`/aca/${s.slug}`}
                  className="rounded-md bg-white/5 px-2 py-1 text-xs font-bold text-navy-200 transition-colors hover:bg-teal-500/20 hover:text-teal-200"
                >
                  {s.abbr}
                </Link>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-navy-400">
              Availability is confirmed during your consultation. Additional states may be
              available for non-Marketplace products.
            </p>
          </div>
        </div>

        <div className="mt-14 space-y-3 border-t border-white/10 pt-8">
          <p className="text-xs leading-relaxed text-navy-400">
            <strong className="text-navy-200">Not a government website.</strong>{' '}
            {DISCLOSURES.notGovernment}
          </p>
          <p className="text-xs leading-relaxed text-navy-400">{DISCLOSURES.solicitation}</p>
          <p className="text-xs leading-relaxed text-navy-400">{DISCLOSURES.noGuarantee}</p>
          <p className="text-xs leading-relaxed text-navy-400">{DISCLOSURES.carriers}</p>
          <p className="text-xs leading-relaxed text-navy-400">
            {DISCLOSURES.agentLicensing} {SITE.licenseNote}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-navy-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.legalEntity} DBA {SITE.name}. All rights reserved.
          </p>
          <p>
            {SITE.agent.name} · {SITE.agent.title} · {SITE.address.line1}, {SITE.address.region}
          </p>
        </div>
      </div>
    </footer>
  )
}
