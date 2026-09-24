/**
 * State routing matrix + per-state page content.
 * ─────────────────────────────────────────────────────────────
 * Mirrors the routing tiers already used by the production backend:
 *
 *   GREEN  → agent is licensed & ready; consumer may continue to the
 *            secure HealthSherpa enrollment portal.
 *   YELLOW → in the service area but needs coordination (most run their
 *            own state-based exchange); licensed agent reviews first.
 *   RED    → state-based exchange that does not allow our agent role;
 *            lead is captured and referred out.
 *
 * ⚠️  VERIFY ANNUALLY. Exchange type and Medicaid expansion status change
 *     year to year, and licensing is per-agent. Confirm with the agent
 *     before publishing.
 */

export type Tier = 'GREEN' | 'YELLOW' | 'RED'

export interface StateInfo {
  abbr: string
  name: string
  slug: string
  tier: Tier
  /** Consumers apply through healthcare.gov, or a state-run exchange. */
  exchange: 'federal' | 'state'
  exchangeName?: string
  exchangeUrl?: string
  /** Medicaid expansion changes who falls into the "coverage gap". */
  medicaidExpanded: boolean
}

export const STATES: StateInfo[] = [
  // ── GREEN — federal marketplace, agent ready ──────────────────
  { abbr: 'AL', name: 'Alabama',        slug: 'alabama',        tier: 'GREEN', exchange: 'federal', medicaidExpanded: false },
  { abbr: 'AZ', name: 'Arizona',        slug: 'arizona',        tier: 'GREEN', exchange: 'federal', medicaidExpanded: true },
  { abbr: 'FL', name: 'Florida',        slug: 'florida',        tier: 'GREEN', exchange: 'federal', medicaidExpanded: false },
  { abbr: 'IA', name: 'Iowa',           slug: 'iowa',           tier: 'GREEN', exchange: 'federal', medicaidExpanded: true },
  { abbr: 'IN', name: 'Indiana',        slug: 'indiana',        tier: 'GREEN', exchange: 'federal', medicaidExpanded: true },
  { abbr: 'KS', name: 'Kansas',         slug: 'kansas',         tier: 'GREEN', exchange: 'federal', medicaidExpanded: false },
  { abbr: 'LA', name: 'Louisiana',      slug: 'louisiana',      tier: 'GREEN', exchange: 'federal', medicaidExpanded: true },
  { abbr: 'MI', name: 'Michigan',       slug: 'michigan',       tier: 'GREEN', exchange: 'federal', medicaidExpanded: true },
  { abbr: 'MS', name: 'Mississippi',    slug: 'mississippi',    tier: 'GREEN', exchange: 'federal', medicaidExpanded: false },
  { abbr: 'MO', name: 'Missouri',       slug: 'missouri',       tier: 'GREEN', exchange: 'federal', medicaidExpanded: true },
  { abbr: 'NE', name: 'Nebraska',       slug: 'nebraska',       tier: 'GREEN', exchange: 'federal', medicaidExpanded: true },
  { abbr: 'NC', name: 'North Carolina', slug: 'north-carolina', tier: 'GREEN', exchange: 'federal', medicaidExpanded: true },
  { abbr: 'OH', name: 'Ohio',           slug: 'ohio',           tier: 'GREEN', exchange: 'federal', medicaidExpanded: true },
  { abbr: 'OK', name: 'Oklahoma',       slug: 'oklahoma',       tier: 'GREEN', exchange: 'federal', medicaidExpanded: true },
  { abbr: 'SC', name: 'South Carolina', slug: 'south-carolina', tier: 'GREEN', exchange: 'federal', medicaidExpanded: false },
  { abbr: 'TN', name: 'Tennessee',      slug: 'tennessee',      tier: 'GREEN', exchange: 'federal', medicaidExpanded: false },
  { abbr: 'TX', name: 'Texas',          slug: 'texas',          tier: 'GREEN', exchange: 'federal', medicaidExpanded: false },
  { abbr: 'WI', name: 'Wisconsin',      slug: 'wisconsin',      tier: 'GREEN', exchange: 'federal', medicaidExpanded: false },

  // ── YELLOW — in service area, agent review required ───────────
  { abbr: 'CO', name: 'Colorado',  slug: 'colorado',  tier: 'YELLOW', exchange: 'state', exchangeName: 'Connect for Health Colorado', exchangeUrl: 'https://connectforhealthco.com', medicaidExpanded: true },
  { abbr: 'GA', name: 'Georgia',   slug: 'georgia',   tier: 'YELLOW', exchange: 'state', exchangeName: 'Georgia Access', exchangeUrl: 'https://georgiaaccess.gov', medicaidExpanded: false },
  { abbr: 'MD', name: 'Maryland',  slug: 'maryland',  tier: 'YELLOW', exchange: 'state', exchangeName: 'Maryland Health Connection', exchangeUrl: 'https://marylandhealthconnection.gov', medicaidExpanded: true },
  { abbr: 'NM', name: 'New Mexico',slug: 'new-mexico',tier: 'YELLOW', exchange: 'state', exchangeName: 'beWellnm', exchangeUrl: 'https://bewellnm.com', medicaidExpanded: true },
  { abbr: 'NY', name: 'New York',  slug: 'new-york',  tier: 'YELLOW', exchange: 'state', exchangeName: 'NY State of Health', exchangeUrl: 'https://nystateofhealth.ny.gov', medicaidExpanded: true },
  { abbr: 'OR', name: 'Oregon',    slug: 'oregon',    tier: 'YELLOW', exchange: 'state', exchangeName: 'Oregon Health Insurance Marketplace', exchangeUrl: 'https://orhim.info', medicaidExpanded: true },
  { abbr: 'PA', name: 'Pennsylvania', slug: 'pennsylvania', tier: 'YELLOW', exchange: 'state', exchangeName: 'Pennie', exchangeUrl: 'https://pennie.com', medicaidExpanded: true },
  { abbr: 'VA', name: 'Virginia',  slug: 'virginia',  tier: 'YELLOW', exchange: 'state', exchangeName: "Virginia's Insurance Marketplace", exchangeUrl: 'https://marketplace.virginia.gov', medicaidExpanded: true },
  { abbr: 'WA', name: 'Washington',slug: 'washington',tier: 'YELLOW', exchange: 'state', exchangeName: 'Washington Healthplanfinder', exchangeUrl: 'https://wahealthplanfinder.org', medicaidExpanded: true },

  // ── RED — state exchange, our agent role does not extend ──────
  { abbr: 'IL', name: 'Illinois',   slug: 'illinois',   tier: 'RED', exchange: 'state', exchangeName: 'Get Covered Illinois', exchangeUrl: 'https://getcoveredillinois.gov', medicaidExpanded: true },
  { abbr: 'NJ', name: 'New Jersey', slug: 'new-jersey', tier: 'RED', exchange: 'state', exchangeName: 'Get Covered New Jersey', exchangeUrl: 'https://getcovered.nj.gov', medicaidExpanded: true },
]

/** Every US state + DC — used to populate the state <select>. */
export const ALL_STATES: { abbr: string; name: string }[] = [
  { abbr: 'AL', name: 'Alabama' }, { abbr: 'AK', name: 'Alaska' }, { abbr: 'AZ', name: 'Arizona' },
  { abbr: 'AR', name: 'Arkansas' }, { abbr: 'CA', name: 'California' }, { abbr: 'CO', name: 'Colorado' },
  { abbr: 'CT', name: 'Connecticut' }, { abbr: 'DC', name: 'District of Columbia' }, { abbr: 'DE', name: 'Delaware' },
  { abbr: 'FL', name: 'Florida' }, { abbr: 'GA', name: 'Georgia' }, { abbr: 'HI', name: 'Hawaii' },
  { abbr: 'ID', name: 'Idaho' }, { abbr: 'IL', name: 'Illinois' }, { abbr: 'IN', name: 'Indiana' },
  { abbr: 'IA', name: 'Iowa' }, { abbr: 'KS', name: 'Kansas' }, { abbr: 'KY', name: 'Kentucky' },
  { abbr: 'LA', name: 'Louisiana' }, { abbr: 'ME', name: 'Maine' }, { abbr: 'MD', name: 'Maryland' },
  { abbr: 'MA', name: 'Massachusetts' }, { abbr: 'MI', name: 'Michigan' }, { abbr: 'MN', name: 'Minnesota' },
  { abbr: 'MS', name: 'Mississippi' }, { abbr: 'MO', name: 'Missouri' }, { abbr: 'MT', name: 'Montana' },
  { abbr: 'NE', name: 'Nebraska' }, { abbr: 'NV', name: 'Nevada' }, { abbr: 'NH', name: 'New Hampshire' },
  { abbr: 'NJ', name: 'New Jersey' }, { abbr: 'NM', name: 'New Mexico' }, { abbr: 'NY', name: 'New York' },
  { abbr: 'NC', name: 'North Carolina' }, { abbr: 'ND', name: 'North Dakota' }, { abbr: 'OH', name: 'Ohio' },
  { abbr: 'OK', name: 'Oklahoma' }, { abbr: 'OR', name: 'Oregon' }, { abbr: 'PA', name: 'Pennsylvania' },
  { abbr: 'RI', name: 'Rhode Island' }, { abbr: 'SC', name: 'South Carolina' }, { abbr: 'SD', name: 'South Dakota' },
  { abbr: 'TN', name: 'Tennessee' }, { abbr: 'TX', name: 'Texas' }, { abbr: 'UT', name: 'Utah' },
  { abbr: 'VT', name: 'Vermont' }, { abbr: 'VA', name: 'Virginia' }, { abbr: 'WA', name: 'Washington' },
  { abbr: 'WV', name: 'West Virginia' }, { abbr: 'WI', name: 'Wisconsin' }, { abbr: 'WY', name: 'Wyoming' },
]

const BY_ABBR = new Map(STATES.map((s) => [s.abbr, s]))
const BY_SLUG = new Map(STATES.map((s) => [s.slug, s]))

export const getStateByAbbr = (abbr: string) => BY_ABBR.get(abbr.toUpperCase().trim())
export const getStateBySlug = (slug: string) => BY_SLUG.get(slug.toLowerCase().trim())

export const greenStates = () => STATES.filter((s) => s.tier === 'GREEN')
export const servedStates = () => STATES.filter((s) => s.tier !== 'RED')

export type RouteStatus = 'GREEN' | 'YELLOW' | 'RED' | 'UNKNOWN'

export interface RouteResult {
  status: RouteStatus
  state?: StateInfo
  headline: string
  body: string
  /** Show the secure enrollment CTA (GREEN only). */
  canEnrollOnline: boolean
}

/**
 * Decide what a submitted lead sees next. Mirrors the backend's
 * `/api/triage/route` behaviour so the two stay consistent.
 */
export function routeState(abbr?: string): RouteResult {
  const state = abbr ? getStateByAbbr(abbr) : undefined

  if (!state) {
    return {
      status: 'UNKNOWN',
      headline: 'Your request has been received',
      body:
        'We have not yet confirmed agent availability for your state. Your information has been saved and a team member will follow up within one business day to confirm eligibility and next steps. In the meantime you can review plans directly at HealthCare.gov — no agent required.',
      canEnrollOnline: false,
    }
  }

  if (state.tier === 'GREEN') {
    return {
      status: 'GREEN',
      state,
      headline: `A licensed agent is available in ${state.name}`,
      body:
        'You can continue to the secure enrollment portal, where plans and carriers available for your ZIP code are displayed. A licensed agent will also reach out to review verified options with you. No plan is selected and no application is submitted without your explicit review and confirmation.',
      canEnrollOnline: true,
    }
  }

  if (state.tier === 'YELLOW') {
    return {
      status: 'YELLOW',
      state,
      headline: `${state.name} requires agent review before enrollment`,
      body: `${state.name} operates its own health insurance exchange${
        state.exchangeName ? ` (${state.exchangeName})` : ''
      }, which requires additional coordination. Your information has been saved and a licensed agent will contact you within one business day via your preferred contact method. No automated enrollment occurs without your explicit confirmation.`,
      canEnrollOnline: false,
    }
  }

  return {
    status: 'RED',
    state,
    headline: `Direct enrollment is not available for ${state.name}`,
    body: `${state.name} operates a state-run exchange${
      state.exchangeName ? ` (${state.exchangeName})` : ''
    } that does not allow independent agents to enroll consumers through the federal Marketplace. Our agent role does not extend to your state's exchange. Your information has been saved and a team member will contact you with referral options and alternative coverage paths.`,
    canEnrollOnline: false,
  }
}
