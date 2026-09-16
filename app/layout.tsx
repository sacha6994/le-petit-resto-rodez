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

// Site de démonstration : aucune donnée réelle, aucun établissement existant.
// L'indexation par les moteurs de recherche est explicitement désactivée.
export const metadata: Metadata = {
  title: 'La Table d\'Émile | Site de démonstration',
  description:
    'Site vitrine de démonstration pour un restaurant fictif. Les informations, prix et coordonnées affichés sont des exemples et ne correspondent à aucun établissement réel.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-snippet': -1,
      'max-image-preview': 'none',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'La Table d\'Émile | Site de démonstration',
    description:
      'Modèle de site vitrine pour restaurant. Contenu fictif à titre d\'exemple.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'La Table d\'Émile (démo)',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Site de démonstration — restaurant fictif',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'La Table d\'Émile | Site de démonstration',
    description: 'Modèle de site vitrine pour restaurant. Contenu fictif à titre d\'exemple.',
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
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
