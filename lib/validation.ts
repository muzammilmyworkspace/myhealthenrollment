/**
 * Shared validation used by both the client form and the API route.
 * The server re-validates everything — never trust the client.
 */

import { ALL_STATES } from './states'

const VALID_STATES = new Set(ALL_STATES.map((s) => s.abbr))

export interface LeadInput {
  firstName: string
  lastName: string
  email: string
  phone: string
  zip: string
  state: string
  householdSize?: number
  income?: number
  situation?: string
  coverageType?: string
  notes?: string
  consent: Record<string, boolean>
  disclosureVersion: string
  source: string
  submittedAt: string
}

export type FieldErrors = Partial<Record<keyof LeadInput | 'form', string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
const ZIP_RE = /^\d{5}$/
const STATE_RE = /^[A-Z]{2}$/

/** Strip everything but digits, then keep the 10 national digits. */
export function normalizePhone(raw: string): string | null {
  const digits = (raw || '').replace(/\D/g, '')
  const national = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits
  if (national.length !== 10) return null
  // US area codes and exchange codes cannot start with 0 or 1.
  if (/^[01]/.test(national) || /^[01]/.test(national.slice(3))) return null
  return national
}

export const toE164 = (national: string) => `+1${national}`

/** (555) 123-4567 — progressive, safe to call on every keystroke. */
export function formatPhone(raw: string): string {
  const d = (raw || '').replace(/\D/g, '').slice(0, 10)
  if (d.length < 4) return d
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
}

const isBlank = (v: unknown) => typeof v !== 'string' || v.trim().length === 0

export function validateLead(input: Partial<LeadInput>): FieldErrors {
  const errors: FieldErrors = {}

  if (isBlank(input.firstName) || input.firstName!.trim().length < 2) {
    errors.firstName = 'Please enter your first name.'
  }
  if (isBlank(input.lastName) || input.lastName!.trim().length < 2) {
    errors.lastName = 'Please enter your last name.'
  }
  if (isBlank(input.email) || !EMAIL_RE.test(input.email!.trim())) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!normalizePhone(input.phone || '')) {
    errors.phone = 'Please enter a valid 10-digit US phone number.'
  }
  if (isBlank(input.zip) || !ZIP_RE.test(input.zip!.trim())) {
    errors.zip = 'Please enter a 5-digit ZIP code.'
  }
  const state = isBlank(input.state) ? '' : input.state!.trim().toUpperCase()
  if (!STATE_RE.test(state) || !VALID_STATES.has(state)) {
    errors.state = 'Please select your state.'
  }
  if (input.householdSize !== undefined) {
    const n = Number(input.householdSize)
    if (!Number.isInteger(n) || n < 1 || n > 12) {
      errors.householdSize = 'Household size must be between 1 and 12.'
    }
  }
  if (input.income !== undefined && input.income !== null) {
    const n = Number(input.income)
    if (!Number.isFinite(n) || n < 0 || n > 10_000_000) {
      errors.income = 'Please enter a valid annual household income.'
    }
  }

  return errors
}

export const hasErrors = (e: FieldErrors) => Object.keys(e).length > 0
