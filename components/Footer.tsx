import Link from 'next/link'
import { SITE, DISCLOSURES } from '@/lib/site'
import { greenStates } from '@/lib/states'

export default function Footer() {
  const year = new Date().getFullYear()
  const states = greenStates()

  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-sm font-extrabold text-white">
                MHE
              </span>
              <span className="text-[15px] font-bold leading-tight text-white">
                My Health
                <br /> Enrollment
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Licensed independent insurance agency helping individuals, families and
              employers compare coverage options.
            </p>
            <a href={SITE.phoneHref} className="mt-4 inline-block text-lg font-bold text-white hover:text-brand-300">
              {SITE.phone}
            </a>
            <br />
            <a href={SITE.emailHref} className="text-sm text-slate-400 hover:text-white">
              {SITE.email}
            </a>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">Coverage</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/aca-health-insurance" className="hover:text-white">ACA Health Plans</Link></li>
              <li><Link href="/life-insurance" className="hover:text-white">Life Insurance</Link></li>
              <li><Link href="/dental-vision" className="hover:text-white">Dental &amp; Vision</Link></li>
              <li><Link href="/employer-group" className="hover:text-white">Employer Group</Link></li>
              <li><Link href="/subsidy-calculator" className="hover:text-white">Savings Estimator</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/about" className="hover:text-white">About &amp; Licensing</Link></li>
              <li><Link href="/quote" className="hover:text-white">Get a Quote</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li>
                <a href="https://www.healthcare.gov" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  HealthCare.gov ↗
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">
              States We Serve
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {states.map((s) => s.abbr).join(' · ')}
            </p>
            <p className="mt-3 text-xs text-slate-500">
              Availability is confirmed during your consultation. Additional states may be
              available for non-Marketplace products.
            </p>
          </div>
        </div>

        <div className="mt-12 space-y-3 border-t border-slate-800 pt-8">
          <p className="legal !text-slate-400">
            <strong className="text-slate-300">Not a government website.</strong>{' '}
            {DISCLOSURES.notGovernment}
          </p>
          <p className="legal !text-slate-400">{DISCLOSURES.solicitation}</p>
          <p className="legal !text-slate-400">{DISCLOSURES.noGuarantee}</p>
          <p className="legal !text-slate-400">{DISCLOSURES.carriers}</p>
          <p className="legal !text-slate-400">
            {DISCLOSURES.agentLicensing} {SITE.licenseNote}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
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
