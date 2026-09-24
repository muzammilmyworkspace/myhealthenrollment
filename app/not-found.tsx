import Link from 'next/link'
import { SITE } from '@/lib/site'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-bold uppercase tracking-wider text-brand-700">404</p>
      <h1 className="mt-3 text-3xl sm:text-4xl">We couldn&apos;t find that page</h1>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-slate-600">
        The page may have moved or the link may be out of date. You can start from the homepage,
        or speak with a licensed agent directly.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-primary px-8">
          Go to homepage
        </Link>
        <a href={SITE.phoneHref} className="btn-ghost px-8">
          Call {SITE.phone}
        </a>
      </div>
      <nav className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-slate-500">
        <Link href="/aca-health-insurance" className="hover:text-brand-700">ACA Plans</Link>
        <Link href="/subsidy-calculator" className="hover:text-brand-700">Savings Estimator</Link>
        <Link href="/quote" className="hover:text-brand-700">Get a Quote</Link>
        <Link href="/about" className="hover:text-brand-700">About</Link>
      </nav>
    </div>
  )
}
