import type { Metadata, Viewport } from 'next'
import { SITE } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Affordable Health Insurance Guidance | My Health Enrollment',
    template: '%s | My Health Enrollment',
  },
  description:
    'Compare ACA Marketplace, life, dental, vision and group coverage with a licensed independent agent. Free guidance, no obligation to enroll.',
  applicationName: SITE.name,
  authors: [{ name: `${SITE.name}, Agent ${SITE.agent.name}` }],
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    url: SITE.url,
    title: 'Affordable Health Insurance Guidance | My Health Enrollment',
    description:
      'Compare ACA Marketplace, life, dental, vision and group coverage with a licensed independent agent.',
    images: [{ url: '/icon-512.png', width: 512, height: 512, alt: 'My Health Enrollment' }],
  },
  twitter: { card: 'summary', images: ['/icon-512.png'] },
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#102348',
}

/** schema.org — helps the business surface in local/branded search. */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['InsuranceAgency', 'LocalBusiness'],
      '@id': `${SITE.url}/#organization`,
      name: SITE.name,
      legalName: SITE.legalEntity,
      description:
        'Licensed independent insurance agency providing ACA Marketplace, life, dental, vision and group coverage guidance.',
      url: SITE.url,
      logo: `${SITE.url}/icon-512.png`,
      image: `${SITE.url}/icon-512.png`,
      telephone: '+18444828281',
      email: SITE.email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: SITE.address.line1,
        addressRegion: SITE.address.region,
        addressCountry: SITE.address.country,
      },
      areaServed: { '@type': 'Country', name: 'United States' },
      priceRange: 'Free consultation',
      employee: {
        '@type': 'Person',
        name: SITE.agent.name,
        jobTitle: SITE.agent.title,
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      publisher: { '@id': `${SITE.url}/#organization` },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
