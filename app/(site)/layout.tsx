import Header from '@/components/Header'
import Footer from '@/components/Footer'

/**
 * Chrome for the public marketing site.
 *
 * Paid-traffic landing pages under /lp deliberately sit OUTSIDE this group:
 * they render their own minimal header and compliance footer so nothing
 * competes with the single call to action.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  )
}
