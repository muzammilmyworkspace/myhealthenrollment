import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'
import { STATES } from '@/lib/states'

/**
 * Paid-traffic pages under /lp are intentionally excluded — they are
 * noindex and should never compete with the SEO pages for the same terms.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = (
    [
      { url: `${SITE.url}/`, changeFrequency: 'weekly', priority: 1.0 },
      { url: `${SITE.url}/aca-health-insurance`, changeFrequency: 'weekly', priority: 0.9 },
      { url: `${SITE.url}/quote`, changeFrequency: 'monthly', priority: 0.9 },
      { url: `${SITE.url}/subsidy-calculator`, changeFrequency: 'monthly', priority: 0.8 },
      { url: `${SITE.url}/life-insurance`, changeFrequency: 'monthly', priority: 0.8 },
      { url: `${SITE.url}/dental-vision`, changeFrequency: 'monthly', priority: 0.7 },
      { url: `${SITE.url}/employer-group`, changeFrequency: 'monthly', priority: 0.7 },
      { url: `${SITE.url}/about`, changeFrequency: 'monthly', priority: 0.6 },
      { url: `${SITE.url}/privacy-policy`, changeFrequency: 'yearly', priority: 0.3 },
      { url: `${SITE.url}/terms`, changeFrequency: 'yearly', priority: 0.3 },
    ] as const
  ).map((p) => ({ ...p, lastModified: now }))

  const statePages: MetadataRoute.Sitemap = STATES.map((s) => ({
    url: `${SITE.url}/aca/${s.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: s.tier === 'GREEN' ? 0.8 : 0.6,
  }))

  return [...staticPages, ...statePages]
}
