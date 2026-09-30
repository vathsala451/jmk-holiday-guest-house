import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { DM_Sans, Fraunces } from 'next/font/google'
import { site } from '@/data/site'
import './globals.css'

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap' })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', display: 'swap' })

const description = `${site.name} in Mawsmai, Sohra (Cherrapunji), Meghalaya. Family rooms with hot water, kitchen access and parking near Eco Park. Call ${site.phone.display}.`

export const metadata: Metadata = {
  title: `${site.name} | Stay in Sohra, Meghalaya`,
  description,
  openGraph: {
    title: site.name,
    description,
    type: 'website',
    locale: 'en_IN',
    images: [{ url: '/images/exterior-night.png', width: 505, height: 357, alt: `${site.name} at night` }],
  },
  twitter: { card: 'summary_large_image', title: site.name, description, images: ['/images/exterior-night.png'] },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#1F3D2F',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: site.name,
  telephone: site.phone.tel,
  image: '/images/exterior-night.png',
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  hasMap: site.mapsLink,
  ...(site.rating && {
    aggregateRating: { '@type': 'AggregateRating', ratingValue: site.rating.value, reviewCount: site.rating.count },
  }),
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
