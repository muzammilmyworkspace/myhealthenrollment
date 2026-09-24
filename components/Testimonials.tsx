import Reveal from './Reveal'
import { SectionHeading } from './ui'
import { TESTIMONIALS, TESTIMONIAL_DISCLOSURE, type Testimonial } from '@/lib/testimonials'

/**
 * Renders nothing until real testimonials exist in lib/testimonials.ts.
 * That is deliberate: an empty section is better than a fabricated one.
 */
export default function Testimonials() {
  if (TESTIMONIALS.length === 0) return null

  return (
    <section id="testimonials" className="relative scroll-mt-24 overflow-hidden bg-wash py-20">
      <div className="absolute inset-0 bg-dots mask-fade opacity-50" aria-hidden="true" />
      <div className="container-page relative">
        <SectionHeading
          eyebrow="In their words"
          title="What clients say"
          sub="Shared with permission. Every experience is different, and nothing here is a promise about your own."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Card key={`${t.name}-${i}`} t={t} delay={i * 90} />
          ))}
        </div>

        <Reveal delay={200}>
          <p className="legal mx-auto mt-10 max-w-3xl text-center">{TESTIMONIAL_DISCLOSURE}</p>
        </Reveal>
      </div>
    </section>
  )
}

function Card({ t, delay }: { t: Testimonial; delay: number }) {
  const initials = t.name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <Reveal delay={delay} className="h-full">
      <figure className="card-hover flex h-full flex-col">
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          className="text-teal-200"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.5 5C6.5 6.6 4.7 9.4 4.7 12.6c0 .5 0 1 .1 1.4A4 4 0 1 0 9.3 11c-.3 0-.6 0-.9.1.3-1.6 1.3-3 2.8-4L9.5 5Zm9.3 0c-3 1.6-4.8 4.4-4.8 7.6 0 .5 0 1 .1 1.4A4 4 0 1 0 18.6 11c-.3 0-.6 0-.9.1.3-1.6 1.3-3 2.8-4L18.8 5Z" />
        </svg>

        <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-navy-700">
          {t.quote}
        </blockquote>

        <figcaption className="mt-5 flex items-center gap-3 border-t border-navy-100 pt-4">
          <span
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-navy-700 to-teal-600 text-sm font-extrabold text-white"
            aria-hidden="true"
          >
            {initials}
          </span>
          <span className="min-w-0">
            <span className="block truncate font-bold text-navy-800">{t.name}</span>
            <span className="block truncate text-[13px] text-navy-400">
              {t.location} · {t.coverage}
            </span>
          </span>
        </figcaption>
      </figure>
    </Reveal>
  )
}
