'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Logo from './Logo'
import { SITE } from '@/lib/site'

const NAV = [
  { href: '/aca-health-insurance', label: 'ACA Health Plans' },
  { href: '/life-insurance', label: 'Life Insurance' },
  { href: '/dental-vision', label: 'Dental & Vision' },
  { href: '/employer-group', label: 'For Employers' },
  { href: '/subsidy-calculator', label: 'Savings Estimator' },
  { href: '/about', label: 'About' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Don't let the page scroll behind the open mobile menu.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      {/* utility bar */}
      <div className="bg-navy-900 text-white">
        <div className="container-page flex h-9 items-center justify-center gap-3 text-[12px] font-medium sm:justify-between sm:text-[13px]">
          <p className="hidden items-center gap-2 whitespace-nowrap md:flex">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-grass-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-grass-400" />
            </span>
            Licensed in {SITE.agent.stateCount} states · Free guidance, no obligation
          </p>
          <a
            href={SITE.phoneHref}
            className="flex min-w-0 items-center gap-2 whitespace-nowrap hover:text-teal-300"
          >
            <PhoneIcon />
            <span className="hidden sm:inline">Free quotes, call or text</span>
            <strong className="font-bold">{SITE.phone}</strong>
          </a>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? 'border-navy-100 bg-white/90 shadow-card backdrop-blur-md'
            : 'border-transparent bg-white'
        }`}
      >
        <div className="container-page flex h-[72px] items-center justify-between gap-6">
          <Link href="/" onClick={() => setOpen(false)} className="flex-shrink-0" aria-label="My Health Enrollment home">
            <Logo />
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-0.5 xl:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative whitespace-nowrap rounded-lg px-2.5 py-2 text-[13.5px] font-semibold text-navy-600 transition-colors hover:bg-teal-50 hover:text-teal-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={SITE.phoneHref}
              className="hidden items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2 text-sm font-bold text-navy-700 hover:bg-navy-50 2xl:flex"
            >
              <PhoneIcon />
              {SITE.phone}
            </a>
            <Link href="/quote" className="btn-accent hidden whitespace-nowrap px-5 py-2.5 text-sm md:inline-flex">
              Get My Options
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="rounded-lg p-2 text-navy-700 hover:bg-navy-50 xl:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                {open ? (
                  <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>
                ) : (
                  <><path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" /></>
                )}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-navy-100 bg-white xl:hidden">
            <nav className="container-page flex flex-col py-3">
              {NAV.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  style={{ animationDelay: `${i * 45}ms` }}
                  className="animate-fade-up rounded-lg px-2 py-3 text-[15px] font-semibold text-navy-700 hover:bg-teal-50 hover:text-teal-700"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-navy-100 pt-3">
                <Link href="/quote" className="btn-accent w-full" onClick={() => setOpen(false)}>
                  Get My Options
                </Link>
                <a href={SITE.phoneHref} className="btn-ghost w-full">
                  <PhoneIcon /> Call {SITE.phone}
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  )
}
