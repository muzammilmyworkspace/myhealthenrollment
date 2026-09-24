/**
 * Educational ACA affordability estimator.
 * ═════════════════════════════════════════════════════════════
 * ⚠️  READ BEFORE CHANGING — COMPLIANCE-SENSITIVE
 *
 * This deliberately does NOT estimate "your subsidy is $X". Doing that
 * requires the benchmark Silver premium for the consumer's exact rating
 * area and age, which we do not have. Guessing it produces numbers that
 * are wrong often enough to be a real compliance problem.
 *
 * Instead it computes the one thing that follows directly from income
 * and household size: the share of income the ACA expects a household to
 * contribute toward the benchmark plan. That is a defensible, genuinely
 * useful number, and it is framed as an estimate everywhere it appears.
 *
 * Every figure below is set by policy and changes ANNUALLY.
 * Verify against healthcare.gov / IRS before each Open Enrollment.
 */

/** 2025 HHS Federal Poverty Guidelines — 48 contiguous states + DC. */
const FPL_BASE = 15_650
const FPL_PER_ADDITIONAL_PERSON = 5_500

/** Alaska and Hawaii use higher guidelines. */
const FPL_BY_REGION: Record<'default' | 'AK' | 'HI', { base: number; step: number }> = {
  default: { base: FPL_BASE, step: FPL_PER_ADDITIONAL_PERSON },
  AK: { base: 19_550, step: 6_870 },
  HI: { base: 17_990, step: 6_320 },
}

/**
 * Whether the enhanced premium tax credits (ARPA/IRA) are in effect.
 *
 * ⚠️  These were scheduled to sunset and their status has been subject to
 *     legislative change. CONFIRM THE CURRENT PLAN YEAR before launch and
 *     flip this flag if they no longer apply — it changes results a lot,
 *     especially above 400% FPL where the original schedule has a hard
 *     subsidy cliff.
 */
export const ENHANCED_SUBSIDIES_IN_EFFECT = true

/** Applicable percentage of income, by FPL band. */
const ENHANCED_SCHEDULE: [number, number, number, number][] = [
  // [fplMin, fplMax, pctAtMin, pctAtMax]
  [0, 150, 0, 0],
  [150, 200, 0, 2.0],
  [200, 250, 2.0, 4.0],
  [250, 300, 4.0, 6.0],
  [300, 400, 6.0, 8.5],
  [400, Infinity, 8.5, 8.5],
]

const STANDARD_SCHEDULE: [number, number, number, number][] = [
  [0, 133, 2.1, 2.1],
  [133, 150, 3.14, 4.19],
  [150, 200, 4.19, 6.6],
  [200, 250, 6.6, 8.44],
  [250, 300, 8.44, 9.96],
  [300, 400, 9.96, 9.96],
  [400, Infinity, -1, -1], // -1 → subsidy cliff, no premium tax credit
]

export interface SubsidyInput {
  annualIncome: number
  householdSize: number
  state: string
  medicaidExpanded: boolean
}

export type Eligibility =
  | 'BELOW_FPL_EXPANSION'   // likely Medicaid
  | 'BELOW_FPL_GAP'         // coverage gap in non-expansion states
  | 'SUBSIDY_LIKELY'
  | 'SUBSIDY_LIMITED'       // above 400% with no enhanced credits
  | 'INVALID'

export interface SubsidyResult {
  eligibility: Eligibility
  fplPercent: number
  fplAmount: number
  /** Estimated monthly cap on what the household contributes, in USD. */
  monthlyContributionCap: number | null
  applicablePercent: number | null
  /** Cost-sharing reductions attach to Silver plans under 250% FPL. */
  csrEligible: boolean
  headline: string
  detail: string
}

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max)

function fplFor(householdSize: number, state: string): number {
  const region = state === 'AK' || state === 'HI' ? state : 'default'
  const { base, step } = FPL_BY_REGION[region]
  return base + step * (clamp(householdSize, 1, 12) - 1)
}

function applicablePercent(fplPercent: number): number | null {
  const schedule = ENHANCED_SUBSIDIES_IN_EFFECT ? ENHANCED_SCHEDULE : STANDARD_SCHEDULE
  for (const [min, max, pctMin, pctMax] of schedule) {
    if (fplPercent >= min && fplPercent < max) {
      if (pctMin < 0) return null // subsidy cliff
      if (pctMin === pctMax) return pctMin
      const progress = (fplPercent - min) / (max - min)
      return pctMin + (pctMax - pctMin) * progress
    }
  }
  return null
}

export function estimateSubsidy(input: SubsidyInput): SubsidyResult {
  const { annualIncome, householdSize, state, medicaidExpanded } = input

  if (
    !Number.isFinite(annualIncome) ||
    annualIncome < 0 ||
    !Number.isInteger(householdSize) ||
    householdSize < 1
  ) {
    return {
      eligibility: 'INVALID',
      fplPercent: 0,
      fplAmount: 0,
      monthlyContributionCap: null,
      applicablePercent: null,
      csrEligible: false,
      headline: 'Please enter a valid household size and annual income.',
      detail: '',
    }
  }

  const fplAmount = fplFor(householdSize, state)
  const fplPercent = Math.round((annualIncome / fplAmount) * 1000) / 10

  if (fplPercent < 100) {
    return medicaidExpanded
      ? {
          eligibility: 'BELOW_FPL_EXPANSION',
          fplPercent,
          fplAmount,
          monthlyContributionCap: null,
          applicablePercent: null,
          csrEligible: false,
          headline: 'You may qualify for Medicaid in your state',
          detail:
            'Your estimated income is below 100% of the Federal Poverty Level. Your state has expanded Medicaid, so a Medicaid program may be available to you at little or no cost. A licensed agent can point you to the right application and review Marketplace options if Medicaid does not apply.',
        }
      : {
          eligibility: 'BELOW_FPL_GAP',
          fplPercent,
          fplAmount,
          monthlyContributionCap: null,
          applicablePercent: null,
          csrEligible: false,
          headline: 'Your options depend on your state',
          detail:
            'Your estimated income is below 100% of the Federal Poverty Level, and your state has not expanded Medicaid. Marketplace premium tax credits generally do not apply at this income level. What is available depends on your state and circumstances. A licensed agent can walk you through the options that do exist.',
        }
  }

  const pct = applicablePercent(fplPercent)
  const csrEligible = fplPercent < 250

  if (pct === null) {
    return {
      eligibility: 'SUBSIDY_LIMITED',
      fplPercent,
      fplAmount,
      monthlyContributionCap: null,
      applicablePercent: null,
      csrEligible: false,
      headline: 'Premium tax credits may be limited at this income',
      detail:
        'Based on your estimated income and household size, federal premium tax credits may not apply. Other ACA Marketplace options may still be available depending on your state and circumstances. A licensed agent can help you review what is offered in your area.',
    }
  }

  const monthlyContributionCap = Math.round((annualIncome * (pct / 100)) / 12)

  return {
    eligibility: 'SUBSIDY_LIKELY',
    fplPercent,
    fplAmount,
    monthlyContributionCap,
    applicablePercent: Math.round(pct * 100) / 100,
    csrEligible,
    headline: 'You may qualify for a Premium Tax Credit',
    detail: csrEligible
      ? 'At this income level you may also qualify for cost-sharing reductions, which lower deductibles and out-of-pocket costs on Silver plans. A licensed agent can confirm what applies to you.'
      : 'A licensed agent can review the plans available in your area and confirm what you would actually pay.',
  }
}

export const formatUSD = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
