import type { MetadataRoute } from 'next'

// Site de démonstration : on interdit l'exploration à tous les robots.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
  }
}
