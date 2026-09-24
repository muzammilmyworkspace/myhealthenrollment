import { NextResponse } from 'next/server'

/**
 * What is actually deployed right now.
 *
 * Vercel keeps every past deployment in its list, and an old entry's build
 * log looks identical to a current one — so reading logs is a bad way to
 * answer "did my fix ship?". Hit this instead:
 *
 *     curl https://<your-domain>/api/version
 *
 * It reports the running Next version and the exact commit serving the
 * request, straight from the live deployment.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  let nextVersion = 'unknown'
  try {
    // Read at request time so the answer reflects what is actually installed.
    nextVersion = (require('next/package.json') as { version: string }).version
  } catch {
    /* fall through to 'unknown' */
  }

  const sha = process.env.VERCEL_GIT_COMMIT_SHA

  return NextResponse.json(
    {
      next: nextVersion,
      node: process.version,
      commit: sha ? sha.slice(0, 7) : 'local',
      branch: process.env.VERCEL_GIT_COMMIT_REF ?? 'local',
      message: process.env.VERCEL_GIT_COMMIT_MESSAGE?.split('\n')[0] ?? null,
      environment: process.env.VERCEL_ENV ?? 'development',
      checkedAt: new Date().toISOString(),
    },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}
