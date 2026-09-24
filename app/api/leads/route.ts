import { NextResponse } from 'next/server'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import { validateLead, hasErrors, normalizePhone, toE164 } from '@/lib/validation'
import { routeState } from '@/lib/states'
import { DISCLOSURE_VERSION } from '@/lib/consent'

/**
 * Lead intake.
 * ─────────────────────────────────────────────────────────────
 * Today this validates, stores an immutable consent record, and writes the
 * lead to a local JSONL file so nothing is ever lost while the CRM hookup
 * is pending. `forwardToCrm()` below is the single place to add the
 * GoHighLevel call — everything else stays as-is.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const STORE_DIR = path.join(process.cwd(), 'data')
const STORE_FILE = path.join(STORE_DIR, 'leads.jsonl')

/** Simple in-memory rate limit. Swap for Redis/Upstash when multi-instance. */
const RATE_LIMIT = { windowMs: 60_000, max: 5 }
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear() // crude guard against unbounded growth
  return recent.length > RATE_LIMIT.max
}

function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for')
  return (fwd ? fwd.split(',')[0] : req.headers.get('x-real-ip') ?? 'unknown').trim()
}

export async function POST(req: Request) {
  const ip = clientIp(req)

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: 'Too many submissions. Please wait a moment and try again.' },
      { status: 429 },
    )
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot — real users never fill a hidden field.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return NextResponse.json({ ok: true, referenceId: randomUUID().slice(0, 8).toUpperCase() })
  }

  const errors = validateLead(body as never)
  if (hasErrors(errors)) {
    return NextResponse.json({ ok: false, errors }, { status: 422 })
  }

  const national = normalizePhone(String(body.phone))!
  const state = String(body.state).toUpperCase()
  const referenceId = randomUUID().slice(0, 8).toUpperCase()
  const receivedAt = new Date().toISOString()

  const consent = (body.consent ?? {}) as Record<string, boolean>

  const record = {
    referenceId,
    receivedAt,
    firstName: String(body.firstName).trim(),
    lastName: String(body.lastName).trim(),
    email: String(body.email).trim().toLowerCase(),
    phone: toE164(national),
    zip: String(body.zip).trim(),
    state,
    householdSize: body.householdSize ?? null,
    incomeBand: body.incomeBand ?? null,
    situation: body.situation ?? null,
    coverageType: body.coverageType ?? 'aca',
    notes: typeof body.notes === 'string' ? body.notes.trim().slice(0, 1000) : '',
    source: typeof body.source === 'string' ? body.source.slice(0, 64) : 'website',
    routing: routeState(state).status,
    /**
     * Immutable consent record — this is the TCPA audit trail. Never
     * overwrite it; a change of preference is a NEW record referencing this
     * one. Storing the disclosure version proves what text was agreed to.
     */
    consent: {
      smsMarketing: !!consent.smsMarketing,
      smsService: !!consent.smsService,
      phone: !!consent.phone,
      email: !!consent.email,
      disclosureVersion: String(body.disclosureVersion ?? DISCLOSURE_VERSION),
      capturedAt: receivedAt,
      ip,
      userAgent: req.headers.get('user-agent')?.slice(0, 255) ?? '',
    },
  }

  try {
    await fs.mkdir(STORE_DIR, { recursive: true })
    await fs.appendFile(STORE_FILE, JSON.stringify(record) + '\n', 'utf8')
  } catch (err) {
    // Never lose a lead silently — surface it in logs even if the write failed.
    console.error('[leads] failed to persist lead', referenceId, err)
  }

  await forwardToCrm(record)

  return NextResponse.json({
    ok: true,
    referenceId,
    routing: record.routing,
  })
}

/**
 * ── GoHighLevel hookup goes here ─────────────────────────────
 * Wire this up by setting these in .env.local:
 *
 *   GHL_PRIVATE_INTEGRATION_TOKEN=pit-xxxxxxxx
 *   GHL_LOCATION_ID=xxxxxxxxxxxx
 *
 * Generate the token in the sub-account:
 *   Settings → Integrations → Private Integrations → Create
 *
 * Map consent flags to GHL tags/custom fields so workflows can branch on
 * them — a contact without `sms-marketing-consent` must never enter an SMS
 * marketing workflow.
 */
async function forwardToCrm(record: { referenceId: string; routing: string }) {
  const token = process.env.GHL_PRIVATE_INTEGRATION_TOKEN
  const locationId = process.env.GHL_LOCATION_ID

  if (!token || !locationId) {
    console.info(
      `[leads] ${record.referenceId} stored locally (routing=${record.routing}). ` +
        'CRM sync skipped — GHL_PRIVATE_INTEGRATION_TOKEN / GHL_LOCATION_ID not set.',
    )
    return
  }

  // TODO: POST to https://services.leadconnectorhq.com/contacts/
  // Kept unimplemented on purpose so no half-working call ships.
  console.info(`[leads] ${record.referenceId} ready for CRM sync.`)
}
