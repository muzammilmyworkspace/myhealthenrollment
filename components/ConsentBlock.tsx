'use client'

import { useState } from 'react'
import { CONSENT_OPTIONS, CONSENT_FOOTER, DISCLOSURE_VERSION, type ConsentState, type ConsentId } from '@/lib/consent'

/**
 * Consent checkboxes. Every box starts unchecked and the form must remain
 * submittable with all of them unchecked — see lib/consent.ts.
 */
export default function ConsentBlock({
  value,
  onChange,
}: {
  value: ConsentState
  onChange: (next: ConsentState) => void
}) {
  const [expanded, setExpanded] = useState<ConsentId | null>(null)

  const toggle = (id: ConsentId) => onChange({ ...value, [id]: !value[id] })

  return (
    <fieldset className="rounded-xl border border-navy-100 bg-navy-50 p-4">
      <legend className="px-1 text-sm font-semibold text-navy-700">
        How may we contact you? <span className="font-normal text-navy-400">(all optional)</span>
      </legend>

      <div className="mt-2 space-y-2.5">
        {CONSENT_OPTIONS.map((opt) => (
          <div key={opt.id} className="rounded-lg bg-white p-3 ring-1 ring-navy-100">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={value[opt.id]}
                onChange={() => toggle(opt.id)}
                className="mt-0.5 h-5 w-5 flex-shrink-0 rounded border-navy-200 text-teal-600 focus:ring-teal-500"
              />
              <span className="text-sm font-medium leading-snug text-navy-700">{opt.label}</span>
            </label>

            <button
              type="button"
              onClick={() => setExpanded(expanded === opt.id ? null : opt.id)}
              className="mt-1.5 pl-8 text-xs font-medium text-navy-400 underline underline-offset-2 hover:text-navy-700"
              aria-expanded={expanded === opt.id}
            >
              {expanded === opt.id ? 'Hide full disclosure' : 'Read full disclosure'}
            </button>

            {expanded === opt.id && (
              <p className="mt-2 pl-8 text-xs leading-relaxed text-navy-400">{opt.detail}</p>
            )}
          </div>
        ))}
      </div>

      <p className="legal mt-3">{CONSENT_FOOTER}</p>
      <p className="legal mt-1.5 text-navy-300">Disclosure version {DISCLOSURE_VERSION}</p>
    </fieldset>
  )
}
