import Link from 'next/link'
import type { Metadata } from 'next'
import { SectionHeading, FAQ, CtaBand, Callout, Check, PageHero } from '@/components/ui'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Dental & Vision Insurance',
  description:
    'Standalone dental and vision plans for individuals, families and employers. Available in most states without buying a health plan.',
  alternates: { canonical: '/dental-vision' },
}

const DENTAL = [
  'Preventive care: exams, X-rays and cleanings, often covered at 100%',
  'Basic services: fillings and simple extractions',
  'Major services: crowns, root canals and dentures',
  'PPO (any dentist) or DHMO (network only) options',
  'Orthodontic coverage available on some plans',
]

const VISION = [
  'Annual comprehensive eye exam, typically a $10 to $20 copay',
  'Frames and lenses allowance, commonly $100 to $200 per year',
  'Contact lens fitting and supply allowance',
  'Access to major optical chains and independent providers',
  'Discounts on LASIK and premium lens options',
]

const FAQS = [
  {
    q: 'Does my ACA health plan already include dental and vision?',
    a: 'ACA Marketplace plans are required to cover pediatric dental and vision, but adult dental and vision are not required and most plans do not include them. That is why standalone plans exist.',
  },
  {
    q: 'Do I need a health plan to buy dental or vision?',
    a: 'No. Standalone dental and vision plans are available in most states on their own, whether or not you have health coverage with us or anywhere else.',
  },
  {
    q: 'Is there a waiting period?',
    a: 'Often yes for major services such as crowns and root canals, commonly six to twelve months. Preventive care usually starts immediately. Waiting periods vary by plan and carrier, so it is worth checking before you enroll if you already know you need work done.',
  },
  {
    q: 'What is the difference between PPO and DHMO dental?',
    a: 'A PPO lets you see any dentist, with lower cost when you stay in network. A DHMO requires you to use a network dentist but usually costs less each month. If you already have a dentist you want to keep, check the network before enrolling.',
  },
]

export default function DentalVisionPage() {
  return (
    <>
      <PageHero
        eyebrow="Dental & Vision"
        title="The coverage most health plans leave out"
        sub="Adult dental and vision are usually sold separately from health insurance. Standalone plans are available in most states, with or without a health plan."
      >
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/quote" className="btn-accent px-8">Compare plans</Link>
          <a href={SITE.phoneHref} className="btn-ghost px-8">Call {SITE.phone}</a>
        </div>
      </PageHero>

      <section className="container-page py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card">
            <h2 className="text-2xl">Dental plans</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-navy-500">
              Coverage tiers generally follow preventive, basic and major categories, with the
              plan paying a larger share of preventive care.
            </p>
            <ul className="mt-5 space-y-2.5">
              {DENTAL.map((d) => (
                <li key={d} className="flex gap-2.5 text-[15px] text-navy-700">
                  <Check /> {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h2 className="text-2xl">Vision plans</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-navy-500">
              Vision coverage is usually straightforward: an annual exam plus an allowance toward
              glasses or contacts.
            </p>
            <ul className="mt-5 space-y-2.5">
              {VISION.map((v) => (
                <li key={v} className="flex gap-2.5 text-[15px] text-navy-700">
                  <Check /> {v}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-3xl">
          <Callout tone="info" title="Check the network before you enroll">
            If you already have a dentist or optometrist you want to keep, confirm they are in the
            plan&apos;s network first. Benefits look similar on paper. Networks are where plans
            differ most in practice.
          </Callout>
        </div>
      </section>

      <section className="border-y border-navy-100 bg-wash py-16">
        <div className="container-page">
          <SectionHeading eyebrow="Questions" title="Dental &amp; vision FAQ" />
          <FAQ items={FAQS} />
        </div>
      </section>

      <CtaBand
        title="Compare dental and vision options"
        body="A licensed specialist can review what is available in your area, free and with no obligation."
      />
    </>
  )
}
