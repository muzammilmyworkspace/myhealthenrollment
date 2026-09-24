'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ALL_STATES, getStateByAbbr } from '@/lib/states'
import { estimateSubsidy, formatUSD, type SubsidyResult } from '@/lib/subsidy'
import { Callout } from './ui'

/**
 * Lead magnet. Collects no personal information on purpose — that keeps it
 * genuinely useful, keeps it out of scope for consent rules, and gives us a
 * natural hand-off to the real intake form afterwards.
 */
export default function SubsidyCalculator() {
  const [state, setState] = useState('')
  const [household, setHousehold] = useState('1')
  const [income, setIncome] = useState('')
  const [result, setResult] = useState<SubsidyResult | null>(null)
  const [error, setError] = useState('')

  function calculate(ev: React.FormEvent) {
    ev.preventDefault()
    setError('')

    if (!/^[A-Z]{2}$/.test(state)) {
      setError('Please select your state so we can apply the right guidelines.')
      return
    }
    const annualIncome = Number(income.replace(/[^0-9.]/g, ''))
    if (!Number.isFinite(annualIncome) || annualIncome <= 0) {
      setError('Please enter a valid annual household income.')
      return
    }

    // Medicaid expansion status changes what happens below 100% FPL. States
    // outside our service area are not in the matrix — assume expansion so we
    // never tell someone they are in a coverage gap when they may not be.
    const info = getStateByAbbr(state)
    setResult(
      estimateSubsidy({
        annualIncome,
        householdSize: Number(household),
        state,
        medicaidExpanded: info?.medicaidExpanded ?? true,
      }),
    )
  }

  function reset() {
    setResult(null)
    setError('')
  }

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <form onSubmit={calculate} className="card sm:p-7" noValidate>
          <h2 className="text-xl">Your household</h2>
          <p className="mt-1.5 text-sm text-slate-600">
            No name, email or phone number needed.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="calc-state" className="label">State</label>
              <select
                id="calc-state"
                className="field"
                value={state}
                onChange={(e) => { setState(e.target.value); reset() }}
              >
                <option value="">Select your state…</option>
                {ALL_STATES.map((s) => (
                  <option key={s.abbr} value={s.abbr}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="calc-household" className="label">People in your household</label>
              <select
                id="calc-household"
                className="field"
                value={household}
                onChange={(e) => { setHousehold(e.target.value); reset() }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>
                ))}
              </select>
              <p className="legal mt-1.5">Everyone you file taxes with, including yourself.</p>
            </div>

            <div>
              <label htmlFor="calc-income" className="label">Estimated annual household income</label>
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                <input
                  id="calc-income"
                  inputMode="numeric"
                  className="field pl-8"
                  placeholder="45,000"
                  value={income}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/[^0-9]/g, '').slice(0, 9)
                    setIncome(digits ? Number(digits).toLocaleString('en-US') : '')
                    reset()
                  }}
                />
              </div>
              <p className="legal mt-1.5">Before taxes, for the coverage year.</p>
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
              {error}
            </p>
          )}

          <button type="submit" className="btn-primary mt-6 w-full">
            Show my estimate
          </button>
        </form>
      </div>

      <div className="lg:col-span-3">
        {result ? <ResultPanel result={result} /> : <EmptyPanel />}
      </div>
    </div>
  )
}

function EmptyPanel() {
  return (
    <div className="flex h-full flex-col justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center">
      <h3 className="text-lg text-slate-700">Your estimate appears here</h3>
      <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-slate-500">
        Fill in your state, household size and estimated income to see how the ACA calculates
        what a household is expected to contribute.
      </p>
    </div>
  )
}

function ResultPanel({ result }: { result: SubsidyResult }) {
  const positive = result.eligibility === 'SUBSIDY_LIKELY'

  return (
    <div className="space-y-5">
      <div
        className={`rounded-2xl border-2 p-6 sm:p-8 ${
          positive ? 'border-accent-500 bg-accent-50' : 'border-brand-300 bg-brand-50'
        }`}
      >
        <p className="text-sm font-bold uppercase tracking-wide text-slate-600">
          Estimated result
        </p>
        <h3 className="mt-2 text-2xl">{result.headline}</h3>

        {positive && result.monthlyContributionCap !== null && (
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-600">
              Expected monthly contribution toward a benchmark Silver plan
            </p>
            <p className="mt-1 text-4xl font-extrabold text-accent-700">
              about {formatUSD(result.monthlyContributionCap)}
              <span className="text-lg font-semibold text-slate-500">/mo</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Under ACA rules a household at {result.fplPercent}% of the Federal Poverty Level is
              expected to contribute roughly {result.applicablePercent}% of income toward the
              benchmark plan. A premium tax credit covers the rest of that benchmark premium.
              What you actually pay depends on which plan you pick.
            </p>
          </div>
        )}

        <p className="mt-5 text-[15px] leading-relaxed text-slate-700">{result.detail}</p>

        {result.csrEligible && (
          <div className="mt-5">
            <Callout tone="success" title="You may also qualify for cost-sharing reductions">
              Below 250% of the Federal Poverty Level, Silver plans can come with lower
              deductibles, copays and out-of-pocket maximums. This is separate from the premium
              tax credit and only applies to Silver plans.
            </Callout>
          </div>
        )}

        <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-200 pt-5 text-sm">
          <div>
            <dt className="text-slate-500">Your income as % of FPL</dt>
            <dd className="mt-0.5 text-lg font-bold text-slate-900">{result.fplPercent}%</dd>
          </div>
          <div>
            <dt className="text-slate-500">100% FPL for your household</dt>
            <dd className="mt-0.5 text-lg font-bold text-slate-900">{formatUSD(result.fplAmount)}</dd>
          </div>
        </dl>
      </div>

      <Callout tone="warn" title="This is an educational estimate, not a determination">
        Actual eligibility, premium tax credit amounts and plan prices are determined by the
        Marketplace based on your complete application, your exact ZIP code, the ages of everyone
        covered, and access to other coverage. Federal poverty guidelines and subsidy rules are
        set annually and can change. A licensed agent can review verified options with you.
      </Callout>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-lg">Want the real numbers for your ZIP code?</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
          A licensed agent can show you the actual plans, carriers and prices available where you
          live. Free, and no obligation to enroll.
        </p>
        <Link href="/quote" className="btn-primary mt-5 w-full sm:w-auto sm:px-8">
          See my options
        </Link>
      </div>
    </div>
  )
}
