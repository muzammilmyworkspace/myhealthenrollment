/**
 * TCPA / CAN-SPAM consent disclosures.
 * ─────────────────────────────────────────────────────────────
 * Rules this file encodes — do not "simplify" them away:
 *
 *  1. Every consent box starts UNCHECKED. Pre-checked boxes are not
 *     valid express consent.
 *  2. Marketing and non-marketing (transactional) SMS are SEPARATE
 *     consents. Bundling them is a common TCPA failure.
 *  3. No consent is a condition of purchase or of receiving help —
 *     the form must submit with every box unchecked.
 *  4. The disclosure VERSION is stored with each submission so you can
 *     prove what language a consumer actually agreed to. Bump the
 *     version whenever any text below changes.
 */

export const DISCLOSURE_VERSION = 'v1.1'

export interface ConsentOption {
  id: ConsentId
  label: string
  detail: string
}

export type ConsentId =
  | 'smsMarketing'
  | 'smsService'
  | 'phone'
  | 'email'

export const CONSENT_OPTIONS: ConsentOption[] = [
  {
    id: 'smsService',
    label: 'Text me about my request (appointments, status updates, support)',
    detail:
      'I consent to receive non-marketing text messages from JINSUNG INTERNATIONAL LLC DBA My Health Enrollment about requested insurance assistance, appointment confirmations, application or enrollment status updates, and customer support. Message frequency may vary. Message & data rates may apply. Text HELP for assistance, reply STOP to opt out.',
  },
  {
    id: 'smsMarketing',
    label: 'Text me about plan information, enrollment periods and offers',
    detail:
      'I consent to receive marketing text messages about health insurance plan information, enrollment opportunities, reminders, and service updates from JINSUNG INTERNATIONAL LLC DBA My Health Enrollment at the phone number provided. Message frequency may vary. Message & data rates may apply. Text HELP for assistance, reply STOP to opt out.',
  },
  {
    id: 'phone',
    label: 'Call me about my insurance inquiry',
    detail:
      'I consent to receive calls from a licensed agent at My Health Enrollment at (844) 482-8281 regarding my insurance inquiry, enrollment, or policy questions. Calls may use automated or prerecorded voice technology, including AI-assisted intake calls and automated reminders. Frequency may vary.',
  },
  {
    id: 'email',
    label: 'Email me plan information and updates',
    detail:
      'I consent to receive emails from My Health Enrollment at contact@myhealthenrollment.net. Messages may include confirmation of my inquiry, plan comparisons, enrollment status, and open enrollment news. Frequency may vary.',
  },
]

export const CONSENT_FOOTER =
  'Consenting to any category above is voluntary and is not a condition of purchase or of receiving assistance. You may revoke any or all consent at any time by replying STOP to a text, clicking unsubscribe in an email, or calling (844) 482-8281. Consenting does not guarantee enrollment or plan availability.'

export type ConsentState = Record<ConsentId, boolean>

export const emptyConsent = (): ConsentState => ({
  smsMarketing: false,
  smsService: false,
  phone: false,
  email: false,
})
