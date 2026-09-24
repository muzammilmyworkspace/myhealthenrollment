# My Health Enrollment — Website

Marketing and lead-generation site for **My Health Enrollment** (JINSUNG INTERNATIONAL LLC),
a licensed independent insurance agency. Built with Next.js 16 (App Router), TypeScript and
Tailwind CSS.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build (also typechecks)
npm start          # serve the production build
npm run typecheck  # types only
```

## Why this stack

The previous site was a client-rendered SPA: search engines and social crawlers received an
empty `<div id="root">` and had to execute a 683 KB JavaScript bundle to see any content. Here
every public page is **prerendered to static HTML at build time** (47 pages) and first-load JS
is ~103 KB. That is the single biggest SEO and mobile-conversion change.

## Dependency notes

**TypeScript is pinned to `^5.9` on purpose.** TypeScript 7 fails to resolve the `@/*` path
aliases and the `globals.css` side-effect import under this config, which breaks the build.
Do not bump it to `latest` without re-running `npm run build`.

Keep `npm audit` at zero. This project was briefly on `next@15.1.6`, which is affected by
[CVE-2025-66478](https://nextjs.org/blog/CVE-2025-66478) — a CVSS 10.0 remote code execution
flaw in the React Server Components protocol that was actively exploited. There is no
workaround for that class of issue; upgrading is the only fix. Check `npm audit` before every
deploy.

## Structure

```
app/
  layout.tsx              root: <html>, fonts, schema.org JSON-LD
  (site)/                 route group — adds Header + Footer
    layout.tsx
    page.tsx              home
    aca-health-insurance/ ACA pillar page
    aca/[state]/          29 prerendered state pages  ← main SEO asset
    life-insurance/ dental-vision/ employer-group/
    quote/                full intake funnel
    subsidy-calculator/   lead magnet
    about/ privacy-policy/ terms/
  lp/                     paid-traffic landing pages (own chrome, noindex)
    open-enrollment/ lost-coverage/ self-employed/
  api/leads/route.ts      lead intake + consent record
  sitemap.ts  robots.ts  not-found.tsx

components/
  QuizFunnel.tsx          5-step intake — the main conversion mechanism
  LandingPage.tsx         shared paid-traffic template
  SubsidyCalculator.tsx   educational estimator
  ConsentBlock.tsx        TCPA consent checkboxes
  Header / Footer / ui

lib/
  site.ts        business identity, disclosures, OEP dates
  states.ts      routing matrix (GREEN/YELLOW/RED) + state content
  consent.ts     consent disclosure text + version
  subsidy.ts     FPL and applicable-percentage math
  validation.ts  shared client + server validation
```

## Before launch — required

These are placeholders in `lib/site.ts` and must come from the agent:

- [ ] **Real state license numbers** (currently "available upon request")
- [ ] **Full street address** — required by CAN-SPAM and by Meta ad review
- [ ] **Professional headshot** for `/about` (currently initials placeholder)
- [ ] **Logo files** to replace the `MHE` wordmark and `public/favicon.svg`
- [ ] **Legal review of `/privacy-policy` and `/terms`** — both are templates, not legal advice

## Annual verification — do not skip

Several values are set by federal policy and change every year. Each is marked with a
`⚠️ VERIFY` comment in code:

| File | What to verify |
|---|---|
| `lib/subsidy.ts` | Federal Poverty Guidelines, applicable-percentage schedule, and whether enhanced premium tax credits are still in effect (`ENHANCED_SUBSIDIES_IN_EFFECT`) |
| `lib/site.ts` | Open Enrollment start/end dates |
| `lib/states.ts` | Medicaid expansion status, exchange type (federal vs state), agent licensing per state |

Getting `ENHANCED_SUBSIDIES_IN_EFFECT` wrong changes results substantially above 400% FPL,
where the original schedule has a hard subsidy cliff.

## Compliance rules baked into the code

This is an ACA lead-generation site, a category with active FTC and CMS enforcement. The
following are deliberate and should not be "simplified" away:

**Consent (`lib/consent.ts`, `components/ConsentBlock.tsx`)**
- Every consent box starts **unchecked** — pre-checked boxes are not valid express consent
- Marketing and non-marketing SMS are **separate** consents
- The form **submits with every box unchecked** — consent is never a condition of service
- Each submission stores the **disclosure version**, timestamp, IP and user agent as an
  immutable audit trail

**Copy — never write these**
- Any specific subsidy or premium amount ("you qualify for $6,400")
- "Free money", "government card", "cash benefit", or any implied government affiliation
- Language asserting the reader's health or financial situation ("Are you uninsured?",
  "Struggling with medical bills?") — this is Meta's *Personal Attributes* policy and the most
  common cause of ad account bans in this category
- False urgency ("only 3 spots left")

**Safe equivalents** are used throughout: "See what plans are available in your state",
"Subsidies may be available based on income", "Speak with a licensed agent".

**Never send health or income data to the Meta Pixel or Conversions API.** Event payloads must
carry the event name and hashed contact identifiers only.

## Lead intake

`POST /api/leads` validates, writes an immutable consent record, and appends the lead to
`data/leads.jsonl` (gitignored). Leads are never lost, even before the CRM is connected.

### Connecting GoHighLevel

One function — `forwardToCrm()` in `app/api/leads/route.ts` — is the only place to change.

```bash
cp .env.example .env.local
```

```
GHL_PRIVATE_INTEGRATION_TOKEN=pit-xxxxxxxx
GHL_LOCATION_ID=xxxxxxxxxxxx
```

Generate the token in the sub-account: **Settings → Integrations → Private Integrations → Create**.

When mapping to GHL, carry each consent flag across as a tag or custom field. A contact without
`sms-marketing-consent` must never be able to enter an SMS marketing workflow — enforce that in
the workflow trigger, not only in the copy.

## Testimonials

The section on the homepage renders only when  has
entries, and it ships empty. Nothing is invented there, and nothing should be:
endorsements have to be real, substantiable, and published with the person's
permission, and ACA marketing is an area where that gets checked.

To switch it on, add entries to . For each one you should be able
to produce written permission and the date and channel it came from. Keep dollar
amounts, promised savings, eligibility claims and health details out of the
quotes.  renders underneath automatically.

## Paid traffic notes

- `/lp/*` pages are `noindex` and excluded from the sitemap so they never compete with the SEO
  pages for the same terms
- They render their own minimal header and compliance footer — no site navigation competing
  with the single call to action
- Meta reviews the **landing page**, not only the ad. The compliance footer exists for that
- Before spending: complete Meta Business verification and domain verification (DNS TXT), and
  finish A2P 10DLC registration in GHL or SMS will be silently dropped by carriers

## Testing checklist

```bash
npm run build     # must pass with no type errors
npm start
```

Verified working: all 20 routes return 200 (404 page returns 404), state routing produces
GREEN/YELLOW/RED correctly, validation rejects bad email/phone/ZIP/state, phone normalises to
E.164, honeypot and rate limiting active, malformed JSON returns 400, and every page ships
full server-rendered HTML.
