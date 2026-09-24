/**
 * Single source of truth for business identity.
 * ─────────────────────────────────────────────────────────────
 * TODO before launch — confirm every value below with the agent:
 *   • licenseNote  → replace with real state license numbers
 *   • address      → full street address (required by CAN-SPAM + Meta)
 *   • agent.photo  → real professional headshot in /public
 */

export const SITE = {
  name: 'My Health Enrollment',
  legalEntity: 'JINSUNG INTERNATIONAL LLC',
  url: 'https://myhealthenrollment.net',
  phone: '(844) 482-8281',
  phoneHref: 'tel:+18444828281',
  email: 'contact@myhealthenrollment.net',
  emailHref: 'mailto:contact@myhealthenrollment.net',
  address: {
    line1: 'Valley Stream',
    region: 'NY',
    country: 'US',
    // TODO: full street address + ZIP from the agent
  },
  agent: {
    name: 'Zubair Munir',
    title: 'Licensed Independent Insurance Agent',
    stateCount: 23,
    photo: '/agent.svg', // TODO: replace with real headshot
  },
  // TODO: replace with actual per-state license numbers
  licenseNote: 'License information is available upon request.',
  enrollmentPartner: 'HealthSherpa',
  bookingUrl: 'https://backoffice.jsint.us/widget/booking/tLnx7O034eUyiTTHHY5H',
} as const

/**
 * Open Enrollment window for the federal Marketplace.
 * VERIFY ANNUALLY — dates are set by CMS and some state exchanges differ.
 */
export const OEP = {
  planYear: 2027,
  start: '2026-11-01',
  end: '2027-01-15',
  startLabel: 'November 1, 2026',
  endLabel: 'January 15, 2027',
} as const

/** Compliance strings that must appear site-wide. */
export const DISCLOSURES = {
  notGovernment:
    'My Health Enrollment is a private insurance agency. We are not affiliated with, endorsed by, or acting on behalf of any government agency, including the Centers for Medicare & Medicaid Services (CMS) or Healthcare.gov.',
  solicitation:
    'This is a solicitation for insurance. Coverage availability, premiums, and benefits vary by state, plan, and individual circumstances. Not all products are available in all areas.',
  noGuarantee:
    'Information on this site, including any estimated premiums or subsidy amounts, is for general educational purposes only and is not a binding quote or guarantee of coverage. Actual premiums, coverage terms, and eligibility are determined by the Marketplace and the applicable carrier.',
  carriers:
    'Carrier names referenced on this site are for informational purposes only. My Health Enrollment is an independent agency and is not employed by, owned by, or exclusively affiliated with any single insurance carrier.',
  agentLicensing:
    'Our licensed agent(s) transact insurance only in states where they hold an active license. We do not provide insurance services in states where we are not licensed.',
} as const
