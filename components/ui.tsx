import Link from 'next/link'
import type { ReactNode } from 'react'
import { SITE, DISCLOSURES } from '@/lib/site'

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-sm font-bold uppercase tracking-wider text-brand-700">{children}</p>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  center = true,
}: {
  eyebrow?: string
  title: string
  sub?: string
  center?: boolean
}) {
  return (
    <div className={`${center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} mb-10`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-3xl sm:text-4xl">{title}</h2>
      {sub && <p className="mt-4 text-lg leading-relaxed text-slate-600">{sub}</p>}
    </div>
  )
}

export function Check() {
  return (
    <svg
      className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-600"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export function TrustBar() {
  const items = [
    `Licensed in ${SITE.agent.stateCount} states`,
    'No cost for our help',
    'CMS-certified enrollment platform',
    'No obligation to enroll',
  ]
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
          <Check />
          {t}
        </li>
      ))}
    </ul>
  )
}

export function FeatureCard({
  title,
  body,
  href,
  cta,
}: {
  title: string
  body: string
  href?: string
  cta?: string
}) {
  return (
    <div className="card flex flex-col transition-shadow hover:shadow-md">
      <h3 className="text-lg">{title}</h3>
      <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-slate-600">{body}</p>
      {href && (
        <Link
          href={href}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:gap-2"
        >
          {cta ?? 'Learn more'} <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  )
}

export function Steps({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <ol className="grid gap-6 md:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s.title} className="card">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-base font-bold text-white">
            {i + 1}
          </span>
          <h3 className="mt-4 text-lg">{s.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{s.body}</p>
        </li>
      ))}
    </ol>
  )
}

export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
      {items.map((item) => (
        <details key={item.q} className="group px-6 py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold text-slate-900">
            {item.q}
            <span className="flex-shrink-0 text-xl text-brand-600 transition-transform group-open:rotate-45" aria-hidden="true">
              +
            </span>
          </summary>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{item.a}</p>
        </details>
      ))}
    </div>
  )
}

export function CtaBand({
  title = 'Ready to see your options?',
  body = 'Answer a few quick questions and a licensed agent will review what is available in your state. Free, and no obligation to enroll.',
}: {
  title?: string
  body?: string
}) {
  return (
    <section className="bg-brand-700">
      <div className="container-page py-16 text-center">
        <h2 className="text-3xl text-white sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-brand-100">{body}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/quote" className="btn bg-white px-8 text-brand-700 hover:bg-brand-50">
            Get My Options
          </Link>
          <a href={SITE.phoneHref} className="btn border-2 border-white/60 px-8 text-white hover:bg-white/10">
            Call {SITE.phone}
          </a>
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-xs leading-relaxed text-brand-200">
          {DISCLOSURES.notGovernment}
        </p>
      </div>
    </section>
  )
}

export function Callout({
  tone = 'info',
  title,
  children,
}: {
  tone?: 'info' | 'warn' | 'success'
  title?: string
  children: ReactNode
}) {
  const tones = {
    info: 'border-brand-200 bg-brand-50 text-brand-900',
    warn: 'border-amber-200 bg-amber-50 text-amber-900',
    success: 'border-accent-100 bg-accent-50 text-accent-700',
  } as const
  return (
    <div className={`rounded-xl border p-5 ${tones[tone]}`}>
      {title && <p className="mb-1.5 font-bold">{title}</p>}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  )
}
