/**
 * Client testimonials.
 * ═════════════════════════════════════════════════════════════
 * ⚠️  THIS ARRAY MUST ONLY EVER CONTAIN REAL, DOCUMENTED QUOTES.
 *
 * It ships empty on purpose, and the section does not render while it is
 * empty. Inventing quotes here would put fabricated endorsements on a live
 * insurance site, which is both an FTC problem (endorsements must reflect a
 * real person's genuine experience, and you must be able to substantiate
 * them) and exactly the behaviour CMS has been penalising in ACA marketing.
 *
 * To turn the section on, add entries below. For each one you should be able
 * to produce, on request:
 *   • written permission from the client to publish the quote and name
 *   • the date and channel it came from (email, Google review, SMS, call)
 *
 * House rules for the copy itself:
 *   • no dollar amounts, no "$0 premium", no promised savings
 *   • nothing implying a specific subsidy or eligibility outcome
 *   • no health details about the person
 *   • first name plus last initial is enough; never a full address
 *
 * If you would rather pull live Google reviews instead of maintaining this
 * by hand, say so and it can be wired to the Google Business Profile.
 */

export interface Testimonial {
  /** The quote, exactly as given. Do not paraphrase or polish. */
  quote: string
  /** First name + last initial, e.g. "Maria G." */
  name: string
  /** City and state, e.g. "Tampa, FL" */
  location: string
  /** What they came to us for, e.g. "ACA Marketplace" */
  coverage: string
  /** When it was given. Shown as context and kept for your records. */
  date: string
}

export const TESTIMONIALS: Testimonial[] = [
  // Add real, permissioned testimonials here. See the notes above.
]

/**
 * Required alongside any testimonial display. Experiences differ by person,
 * state and plan, and saying so is not optional.
 */
export const TESTIMONIAL_DISCLOSURE =
  'Testimonials reflect the individual experience of the person quoted and are shared with their permission. They are not a guarantee of eligibility, plan availability, premium, or any particular outcome. Coverage and costs vary by state, household and plan.'
