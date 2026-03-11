import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Le Petit Resto | Restaurant fait maison à Rodez',
  description: 'Cuisine 100% fait maison au cœur de Rodez. Carte du jour qui change selon le marché. 4.9★ sur Google. Réservez votre table.',
  keywords: ['restaurant', 'Rodez', 'cuisine française', 'fait maison', 'gastronomique', 'Aveyron', 'cuisine de marché'],
  authors: [{ name: 'Le Petit Resto' }],
  openGraph: {
    title: 'Le Petit Resto | Restaurant fait maison à Rodez',
    description: 'Cuisine 100% fait maison au cœur de Rodez. Carte du jour qui change selon le marché. 4.9★ sur Google.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Le Petit Resto',
    url: 'https://lepetitresto-rodez.fr',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Le Petit Resto — Restaurant fait maison à Rodez',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Le Petit Resto | Restaurant fait maison à Rodez',
    description: 'Cuisine 100% fait maison au cœur de Rodez. Carte du jour qui change selon le marché. 4.9★ sur Google.',
    images: ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#FAF8F5',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable} ${cormorant.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "name": "Le Petit Resto",
              "image": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
              "url": "https://lepetitresto-rodez.fr",
              "telephone": "+33601312574",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "43 Avenue Victor Hugo",
                "addressLocality": "Rodez",
                "postalCode": "12000",
                "addressRegion": "Aveyron",
                "addressCountry": "FR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 44.3497,
                "longitude": 2.5725
              },
              "servesCuisine": ["French", "Cuisine de marché", "Fait maison"],
              "priceRange": "€€",
              "currenciesAccepted": "EUR",
              "paymentAccepted": "Cash, Credit Card",
              "menu": "https://lepetitresto-rodez.fr/#menu",
              "acceptsReservations": "True",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "bestRating": "5",
                "ratingCount": "132"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Tuesday",
                  "opens": "09:00",
                  "closes": "15:30"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Wednesday",
                  "opens": "09:00",
                  "closes": "19:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Thursday",
                  "opens": "09:00",
                  "closes": "22:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Friday",
                  "opens": "09:00",
                  "closes": "22:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Saturday",
                  "opens": "10:00",
                  "closes": "22:00"
                }
              ]
            })
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
