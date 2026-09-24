'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SITE, DISCLOSURES } from '@/lib/site'
import { ALL_STATES, routeState, type RouteResult } from '@/lib/states'
import { emptyConsent, DISCLOSURE_VERSION, type ConsentState } from '@/lib/consent'
import { validateLead, formatPhone, hasErrors, type FieldErrors } from '@/lib/validation'
import ConsentBlock from './ConsentBlock'

/**
 * Multi-step intake. Steps are deliberately ordered easiest-first
 * (ZIP → household → situation → income → contact) so the consumer makes
 * small commitments before being asked for a phone number. Contact details
 * are collected last, which is where most drop-off happens.
 */

const SITUATIONS = [
  { value: 'open-enrollment', label: 'I want to enroll or compare plans', hint: 'Open Enrollment' },
  { value: 'lost-coverage', label: 'I lost job-based coverage', hint: 'Special Enrollment Period' },
  { value: 'life-event', label: 'I got married, had a baby, or moved', hint: 'Special Enrollment Period' },
  { value: 'first-time', label: "It's my first time getting health insurance", hint: '' },
  { value: 'comparing', label: 'I just want to compare options', hint: 'No commitment' },
]

const HOUSEHOLD = ['1', '2', '3', '4', '5', '6+']

const INCOME_BANDS = [
  { value: 'under-20k', label: 'Under $20,000' },
  { value: '20k-30k', label: '$20,000 – $30,000' },
  { value: '30k-45k', label: '$30,000 – $45,000' },
  { value: '45k-65k', label: '$45,000 – $65,000' },
  { value: '65k-100k', label: '$65,000 – $100,000' },
  { value: 'over-100k', label: 'Over $100,000' },
  { value: 'prefer-not', label: "I'd rather not say" },
]

const TOTAL_STEPS = 5

interface Answers {
  zip: string
  state: string
  householdSize: string
  situation: string
  incomeBand: string
  firstName: string
  lastName: string
  email: string
  phone: string
  notes: string
}

const emptyAnswers = (): Answers => ({
  zip: '', state: '', householdSize: '', situation: '', incomeBand: '',
  firstName: '', lastName: '', email: '', phone: '', notes: '',
})

export default function QuizFunnel({ source = 'quiz' }: { source?: string }) {
  const [step, setStep] = useState(1)
  const [a, setA] = useState<Answers>(emptyAnswers)
  const [consent, setConsent] = useState<ConsentState>(emptyConsent)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<RouteResult | null>(null)
  const [refId, setRefId] = useState<string | null>(null)
  /** Honeypot — hidden from people, filled by naive bots. */
  const [company, setCompany] = useState('')

  const set = <K extends keyof Answers>(k: K, v: Answers[K]) => {
    setA((prev) => ({ ...prev, [k]: v }))
    setErrors((prev) => {
      if (!prev[k as keyof FieldErrors]) return prev
      const next = { ...prev }
      delete next[k as keyof FieldErrors]
      return next
    })
  }

  function validateStep(n: number): boolean {
    const e: FieldErrors = {}
    if (n === 1) {
      if (!/^\d{5}$/.test(a.zip)) e.zip = 'Please enter a 5-digit ZIP code.'
      if (!/^[A-Z]{2}$/.test(a.state)) e.state = 'Please select your state.'
    }
    if (n === 2 && !a.householdSize) e.householdSize = 'Please choose a household size.'
    if (n === 3 && !a.situation) e.form = 'Please choose the option that best describes you.'
    setErrors(e)
    return !hasErrors(e)
  }

  const next = () => {
    if (!validateStep(step)) return
    setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  }
  const back = () => {
    setErrors({})
    setStep((s) => Math.max(s - 1, 1))
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault()
    const payload = {
      firstName: a.firstName.trim(),
      lastName: a.lastName.trim(),
      email: a.email.trim(),
      phone: a.phone,
      zip: a.zip,
      state: a.state,
      householdSize: a.householdSize === '6+' ? 6 : Number(a.householdSize) || undefined,
      situation: a.situation,
      incomeBand: a.incomeBand,
      notes: a.notes.trim(),
      company,
      coverageType: 'aca',
      consent,
      disclosureVersion: DISCLOSURE_VERSION,
      source,
      submittedAt: new Date().toISOString(),
    }

    const clientErrors = validateLead(payload)
    if (hasErrors(clientErrors)) {
      setErrors(clientErrors)
      return
    }

    setSubmitting(true)
    setErrors({})
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrors(data?.errors ?? { form: data?.message ?? 'Something went wrong. Please try again.' })
        return
      }
      setRefId(data.referenceId ?? null)
      setResult(routeState(a.state))
    } catch {
      setErrors({ form: `Submission failed. Please try again or call ${SITE.phone}.` })
    } finally {
      setSubmitting(false)
    }
  }

  if (result) return <Result result={result} refId={refId} />

  return (
    <div className="card relative overflow-hidden sm:p-8">
      <Progress step={step} />

      <form onSubmit={submit} noValidate>
        <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="company">Company (leave blank)</label>
          <input
            id="company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        {step === 1 && (
          <Step title="Where do you live?" sub="Plans and prices are set by state and ZIP code. No personal information needed yet.">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="zip" className="label">ZIP code</label>
                <input
                  id="zip" name="zip" inputMode="numeric" autoComplete="postal-code"
                  className={`field ${errors.zip ? 'field-error' : ''}`}
                  placeholder="33101" maxLength={5} value={a.zip}
                  onChange={(e) => set('zip', e.target.value.replace(/\D/g, '').slice(0, 5))}
                  aria-invalid={!!errors.zip}
                />
                {errors.zip && <p className="error-text">{errors.zip}</p>}
              </div>
              <div>
                <label htmlFor="state" className="label">State</label>
                <select
                  id="state" name="state" value={a.state}
                  className={`field ${errors.state ? 'field-error' : ''}`}
                  onChange={(e) => set('state', e.target.value)}
                  aria-invalid={!!errors.state}
                >
                  <option value="">Select your state…</option>
                  {ALL_STATES.map((s) => (
                    <option key={s.abbr} value={s.abbr}>{s.name}</option>
                  ))}
                </select>
                {errors.state && <p className="error-text">{errors.state}</p>}
              </div>
            </div>
          </Step>
        )}

        {step === 2 && (
          <Step title="How many people need coverage?" sub="Include everyone you file taxes with, including yourself.">
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {HOUSEHOLD.map((n) => (
                <button
                  key={n} type="button" onClick={() => set('householdSize', n)}
                  className={`rounded-xl border-2 py-4 text-lg font-bold transition-colors ${
                    a.householdSize === n
                      ? 'border-teal-500 bg-teal-50 text-teal-700 shadow-card'
                      : 'border-navy-100 bg-white text-navy-700 hover:border-teal-300 hover:bg-teal-50/40'
                  }`}
                  aria-pressed={a.householdSize === n}
                >
                  {n}
                </button>
              ))}
            </div>
            {errors.householdSize && <p className="error-text">{errors.householdSize}</p>}
          </Step>
        )}

        {step === 3 && (
          <Step title="Which best describes your situation?" sub="This helps determine whether you can enroll now or during Open Enrollment.">
            <div className="space-y-2.5">
              {SITUATIONS.map((s) => (
                <button
                  key={s.value} type="button" onClick={() => set('situation', s.value)}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl border-2 px-4 py-4 text-left transition-colors ${
                    a.situation === s.value
                      ? 'border-teal-500 bg-teal-50 shadow-card'
                      : 'border-navy-100 bg-white hover:border-teal-300 hover:bg-teal-50/40'
                  }`}
                  aria-pressed={a.situation === s.value}
                >
                  <span className="text-[15px] font-bold text-navy-800">{s.label}</span>
                  {s.hint && (
                    <span className="hidden flex-shrink-0 rounded-full bg-grass-100 px-2.5 py-1 text-xs font-bold text-grass-700 sm:inline">
                      {s.hint}
                    </span>
                  )}
                </button>
              ))}
            </div>
            {errors.form && <p className="error-text">{errors.form}</p>}
          </Step>
        )}

        {step === 4 && (
          <Step
            title="Estimated annual household income"
            sub="Used only to check whether savings may be available. A range is fine — you can also skip this."
          >
            <div className="space-y-2.5">
              {INCOME_BANDS.map((b) => (
                <button
                  key={b.value} type="button" onClick={() => set('incomeBand', b.value)}
                  className={`w-full rounded-xl border-2 px-4 py-3.5 text-left text-[15px] font-semibold transition-colors ${
                    a.incomeBand === b.value
                      ? 'border-teal-500 bg-teal-50 text-teal-700 shadow-card'
                      : 'border-navy-100 bg-white text-navy-700 hover:border-teal-300 hover:bg-teal-50/40'
                  }`}
                  aria-pressed={a.incomeBand === b.value}
                >
                  {b.label}
                </button>
              ))}
            </div>
            <p className="legal mt-3">
              Eligibility and any savings are determined by the Marketplace based on your full
              application, not by this form.
            </p>
          </Step>
        )}

        {step === 5 && (
          <Step title="Where should the agent reach you?" sub="A licensed agent will review verified options available in your area.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="firstName" label="First name" value={a.firstName} error={errors.firstName}
                autoComplete="given-name" onChange={(v) => set('firstName', v)} />
              <Field id="lastName" label="Last name" value={a.lastName} error={errors.lastName}
                autoComplete="family-name" onChange={(v) => set('lastName', v)} />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field id="email" label="Email" type="email" value={a.email} error={errors.email}
                autoComplete="email" placeholder="you@example.com" onChange={(v) => set('email', v)} />
              <Field id="phone" label="Phone" type="tel" value={a.phone} error={errors.phone}
                autoComplete="tel" placeholder="(555) 123-4567"
                onChange={(v) => set('phone', formatPhone(v))} />
            </div>
            <div className="mt-4">
              <label htmlFor="notes" className="label">
                Anything else the agent should know? <span className="font-normal text-navy-400">(optional)</span>
              </label>
              <textarea
                id="notes" name="notes" rows={3} className="field resize-none" value={a.notes}
                placeholder="Current doctors, prescriptions, budget, or questions…"
                onChange={(e) => set('notes', e.target.value.slice(0, 1000))}
              />
              <p className="legal mt-1.5">
                Please do not enter a Social Security number, immigration document number, or
                payment details here.
              </p>
            </div>

            <div className="mt-5">
              <ConsentBlock value={consent} onChange={setConsent} />
            </div>

            {errors.form && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm font-semibold text-red-700">
                {errors.form}
              </div>
            )}

            <p className="legal mt-4">
              By submitting, you confirm you have read and agree to our{' '}
              <Link href="/privacy-policy" className="underline">Privacy Policy</Link> and{' '}
              <Link href="/terms" className="underline">Terms of Service</Link>.{' '}
              {DISCLOSURES.notGovernment}
            </p>
          </Step>
        )}

        <div className="mt-7 flex items-center gap-3">
          {step > 1 && (
            <button type="button" onClick={back} className="btn-ghost px-5">
              ← Back
            </button>
          )}
          {step < TOTAL_STEPS ? (
            <button type="button" onClick={next} className="btn-primary flex-1 sm:flex-none sm:px-10">
              Continue →
            </button>
          ) : (
            <button type="submit" disabled={submitting} className="btn-accent flex-1 sm:flex-none sm:px-10">
              {submitting ? 'Submitting…' : 'See My Options'}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

/* ── pieces ─────────────────────────────────────────────────── */

function Progress({ step }: { step: number }) {
  const pct = Math.round((step / TOTAL_STEPS) * 100)
  return (
    <div className="mb-7">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-extrabold text-navy-800">Step {step} of {TOTAL_STEPS}</span>
        <span className="text-navy-400">About {Math.max(1, TOTAL_STEPS - step)} min left</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-navy-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-teal-500 to-grass-500 transition-all duration-500"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Form progress"
        />
      </div>
    </div>
  )
}

function Step({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl sm:text-2xl">{title}</h2>
      {sub && <p className="mt-2 text-[15px] leading-relaxed text-navy-500">{sub}</p>}
      <div className="mt-6">{children}</div>
    </div>
  )
}

function Field({
  id, label, value, onChange, error, type = 'text', placeholder, autoComplete,
}: {
  id: string; label: string; value: string; onChange: (v: string) => void
  error?: string; type?: string; placeholder?: string; autoComplete?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      <input
        id={id} name={id} type={type} value={value} placeholder={placeholder}
        autoComplete={autoComplete} aria-invalid={!!error}
        className={`field ${error ? 'field-error' : ''}`}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <p className="error-text">{error}</p>}
    </div>
  )
}

function Result({ result, refId }: { result: RouteResult; refId: string | null }) {
  const tone =
    result.status === 'GREEN' ? 'border-grass-400 bg-grass-50'
    : result.status === 'RED' ? 'border-amber-400 bg-amber-50'
    : 'border-teal-400 bg-teal-50'

  return (
    <div className={`rounded-2xl border-2 ${tone} p-6 sm:p-8`}>
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-grass-600" aria-hidden="true">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>

      <h2 className="text-2xl">{result.headline}</h2>
      <p className="mt-3 text-[15px] leading-relaxed text-navy-600">{result.body}</p>

      {result.canEnrollOnline && (
        <div className="mt-6 rounded-xl border border-navy-100 bg-white p-5">
          <p className="text-sm font-extrabold text-navy-900">Continue to secure enrollment</p>
          <p className="mt-1.5 text-sm leading-relaxed text-navy-500">
            {SITE.enrollmentPartner} is a CMS-certified enrollment platform. Plan comparison and
            selection happen inside that secure environment — never in this form.
          </p>
          <a
            href={`https://www.healthsherpa.com/?_agent_id=MHE`}
            target="_blank" rel="noopener noreferrer"
            className="btn-accent mt-4 w-full sm:w-auto sm:px-8"
          >
            Open secure enrollment →
          </a>
        </div>
      )}

      {result.status === 'RED' && result.state?.exchangeUrl && (
        <div className="mt-6 rounded-xl border border-navy-100 bg-white p-5">
          <p className="text-sm font-extrabold text-navy-900">
            {result.state.name}&apos;s official marketplace
          </p>
          <a
            href={result.state.exchangeUrl}
            target="_blank" rel="noopener noreferrer"
            className="btn-outline mt-3 w-full sm:w-auto sm:px-8"
          >
            Visit {result.state.exchangeName} ↗
          </a>
        </div>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Book a time with the agent
        </a>
        <a href={SITE.phoneHref} className="btn-ghost">
          Or call {SITE.phone}
        </a>
      </div>

      {refId && (
        <p className="legal mt-5">
          Your submission was recorded with a timestamp. Reference #{refId}
        </p>
      )}
      <p className="legal mt-2">
        Only the contact methods you checked are active. You can change or revoke them at any
        time by replying STOP to a text, using the unsubscribe link in an email, or calling{' '}
        {SITE.phone}.
      </p>
    </div>
  )
}
