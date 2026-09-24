'use client'

import {
  useEffect, useLayoutEffect, useRef, useState,
  type ElementType, type ReactNode,
} from 'react'

/** useLayoutEffect warns during SSR; fall back to useEffect on the server. */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * Scroll-reveal wrapper.
 *
 * Content is visible in the server-rendered HTML and only *becomes* hidden
 * once JavaScript has armed it — synchronously, before paint. That ordering
 * matters: if the CSS hid it by default, a JS failure, a blocked bundle or a
 * browser without IntersectionObserver would leave whole sections invisible.
 * This way the worst case is simply no animation.
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
}: {
  children: ReactNode
  delay?: number
  as?: ElementType
  className?: string
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [armed, setArmed] = useState(false)
  const [shown, setShown] = useState(false)

  useIsomorphicLayoutEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    // Respect the OS setting here too, not just in CSS.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    setArmed(true)
  }, [])

  useEffect(() => {
    if (!armed) return
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true)
            io.disconnect()
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    )
    io.observe(el)

    // Safety net: never leave content hidden if the observer never fires.
    const timer = window.setTimeout(() => setShown(true), 2500)

    return () => {
      io.disconnect()
      window.clearTimeout(timer)
    }
  }, [armed])

  return (
    <Tag
      ref={ref}
      data-reveal={armed && !shown ? 'hidden' : undefined}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
