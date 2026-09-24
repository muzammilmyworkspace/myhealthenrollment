import Link from 'next/link'
import type { ReactNode } from 'react'
import Reveal from './Reveal'
import { SITE, DISCLOSURES } from '@/lib/site'

/* ── small atoms ───────────────────────────────────────────── */

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-3 chip">{children}</p>
}

export function Check({ tone = 'grass' }: { tone?: 'grass' | 'teal' | 'white' }) {
  const color =
    tone === 'white' ? 'text-white' : tone === 'teal' ? 'text-teal-500' : 'text-grass-500'
  return (
    <svg className={`mt-0.5 h-5 w-5 flex-shrink-0 ${color}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  center = true,
  onDark = false,
}: {
  eyebrow?: string
  title: ReactNode
  sub?: string
  center?: boolean
  onDark?: boolean
}) {
  return (
    <Reveal className={`${center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} mb-12`}>
      {eyebrow && (
        <p
          className={
            center
              ? 'mb-3 flex justify-center'
              : 'mb-3'
          }
        >
          <span
            className={
              onDark
                ? 'inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-sm font-bold text-teal-200 backdrop-blur-sm'
                : 'chip'
            }
          >
            {eyebrow}
          </span>
        </p>
      )}
      <h2 className={`text-3xl sm:text-4xl ${onDark ? 'text-white' : ''}`}>{title}</h2>
      {sub && (
        <p className={`mt-4 text-lg leading-relaxed ${onDark ? 'text-navy-100' : 'text-navy-500'}`}>
          {sub}
        </p>
      )}
    </Reveal>
  )
}

/* ── decorative ────────────────────────────────────────────── */

/** Soft floating colour blobs. Purely decorative. */
export function Blobs({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const a = variant === 'dark' ? 'bg-teal-400/25' : 'bg-teal-300/30'
  const b = variant === 'dark' ? 'bg-grass-400/20' : 'bg-grass-300/30'
  const c = variant === 'dark' ? 'bg-navy-400/25' : 'bg-navy-200/40'
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <span className={`blob ${a} left-[-8%] top-[-10%] h-80 w-80 animate-float`} />
      <span className={`blob ${b} right-[-6%] top-[18%] h-96 w-96 animate-drift`} />
      <span className={`blob ${c} bottom-[-14%] left-[28%] h-72 w-72 animate-float`} style={{ animationDelay: '3s' }} />
    </div>
  )
}

/** Curved divider so sections don't butt together with a hard line. */
export function WaveDivider({
  from = 'fill-white',
  flip = false,
  className = '',
}: {
  from?: string
  flip?: boolean
  className?: string
}) {
  return (
    <div className={`pointer-events-none relative ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className={`block h-[60px] w-full sm:h-[90px] ${from} ${flip ? 'rotate-180' : ''}`}
      >
        <path d="M0 90V38c180 34 360 50 540 38s360-52 540-60 300 16 360 26v46z" />
      </svg>
    </div>
  )
}

/* ── content blocks ────────────────────────────────────────── */

export function FeatureCard({
  title,
  body,
  href,
  cta,
  icon,
  delay = 0,
}: {
  title: string
  body: string
  href?: string
  cta?: string
  icon?: ReactNode
  delay?: number
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="group card-hover flex h-full flex-col">
        {icon && (
          <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-50 to-grass-50 text-teal-600 ring-1 ring-teal-100 transition-transform duration-300 group-hover:scale-110">
            {icon}
          </span>
        )}
        <h3 className="text-lg">{title}</h3>
        <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-navy-500">{body}</p>
        {href && (
          <Link
            href={href}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-teal-700 transition-all group-hover:gap-3"
          >
            {cta ?? 'Learn more'} <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </Reveal>
  )
}

export function Steps({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <ol className="relative grid gap-6 md:grid-cols-3">
      {/* connector line behind the numbers on desktop */}
      <span
        className="pointer-events-none absolute left-[16%] right-[16%] top-11 hidden h-0.5 bg-gradient-to-r from-teal-200 via-grass-200 to-teal-200 md:block"
        aria-hidden="true"
      />
      {steps.map((s, i) => (
        <Reveal as="li" key={s.title} delay={i * 110} className="relative">
          <div className="card-hover h-full text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-navy-700 to-teal-600 text-lg font-extrabold text-white shadow-glow">
              {i + 1}
            </span>
            <h3 className="mt-5 text-lg">{s.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-navy-500">{s.body}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  )
}

export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {items.map((item, i) => (
        <Reveal key={item.q} delay={i * 60}>
          <details className="group overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card transition-colors open:border-teal-200">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[15px] font-bold text-navy-800 hover:text-teal-700">
              {item.q}
              <span
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-teal-50 text-lg font-bold text-teal-600 transition-transform duration-300 group-open:rotate-45"
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <p className="px-6 pb-5 text-[15px] leading-relaxed text-navy-500">{item.a}</p>
          </details>
        </Reveal>
      ))}
    </div>
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
    <ul className="stagger flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
      {items.map((t) => (
        <li key={t} className="flex animate-fade-up items-center gap-2 text-sm font-semibold text-navy-600">
          <Check />
          {t}
        </li>
      ))}
    </ul>
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
    info: 'border-teal-200 bg-teal-50/70 text-teal-900',
    warn: 'border-amber-200 bg-amber-50 text-amber-900',
    success: 'border-grass-200 bg-grass-50 text-grass-900',
  } as const
  return (
    <div className={`rounded-2xl border-l-4 border-y border-r p-5 ${tones[tone]}`}>
      {title && <p className="mb-1.5 font-extrabold">{title}</p>}
      <div className="text-sm leading-relaxed">{children}</div>
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
    <section className="relative overflow-hidden bg-brand-deep">
      <div className="absolute inset-0 bg-grid-light" aria-hidden="true" />
      <Blobs variant="dark" />
      <div className="container-page relative py-20 text-center">
        <Reveal>
          <h2 className="text-3xl text-white sm:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-navy-100">{body}</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/quote" className="btn-accent px-9 text-lg">
              Get My Options
            </Link>
            <a href={SITE.phoneHref} className="btn-glass px-9">
              Call {SITE.phone}
            </a>
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-xs leading-relaxed text-navy-300">
            {DISCLOSURES.notGovernment}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ── page hero used by the inner pages ─────────────────────── */

export function PageHero({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow?: string
  title: string
  sub?: string
  children?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden border-b border-navy-100 bg-wash">
      <div className="absolute inset-0 bg-dots mask-fade opacity-60" aria-hidden="true" />
      <Blobs />
      <div className="container-page relative py-16 text-center lg:py-20">
        <div className="mx-auto max-w-3xl">
          {eyebrow && (
            <p className="mb-4 flex justify-center">
              <span className="chip animate-fade-up">{eyebrow}</span>
            </p>
          )}
          <h1 className="animate-fade-up text-4xl sm:text-5xl" style={{ animationDelay: '.08s' }}>
            {title}
          </h1>
          {sub && (
            <p
              className="mt-5 animate-fade-up text-lg leading-relaxed text-navy-500"
              style={{ animationDelay: '.16s' }}
            >
              {sub}
            </p>
          )}
          {children && (
            <div className="mt-8 animate-fade-up" style={{ animationDelay: '.24s' }}>
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/* ── icons used on the coverage cards ──────────────────────── */

const iconProps = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export const IconShield = () => (
  <svg {...iconProps}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="M9 12h6M12 9v6" /></svg>
)
export const IconHeart = () => (
  <svg {...iconProps}><path d="M19 14c1.5-1.5 3-3.4 3-5.5A4.5 4.5 0 0 0 12 5.8 4.5 4.5 0 0 0 2 8.5c0 2.1 1.5 4 3 5.5l7 7Z" /></svg>
)
export const IconSmile = () => (
  <svg {...iconProps}><circle cx="12" cy="12" r="9" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><path d="M9 9h.01M15 9h.01" /></svg>
)
export const IconBuilding = () => (
  <svg {...iconProps}><path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M15 10h2a2 2 0 0 1 2 2v9" /><path d="M9 7h2M9 11h2M9 15h2" /></svg>
)
export const IconCalc = () => (
  <svg {...iconProps}><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h8" /></svg>
)

export const IconBadge = () => (
  <svg {...iconProps}><path d="M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" /><path d="m8.5 14-1 7 4.5-2.5L16.5 21l-1-7" /></svg>
)
export const IconWallet = () => (
  <svg {...iconProps}><path d="M3 7a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v1" /><rect x="2" y="8" width="20" height="12" rx="2" /><path d="M17 14h.01" /></svg>
)
export const IconLock = () => (
  <svg {...iconProps}><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /><path d="M12 15v2" /></svg>
)
export const IconCompare = () => (
  <svg {...iconProps}><path d="M12 3v18" /><path d="m6 8-4 6h8Z" /><path d="m18 8-4 6h8Z" /><path d="M4 5h6M14 5h6" /></svg>
)
