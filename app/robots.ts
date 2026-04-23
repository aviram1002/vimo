import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/app/', '/api/'],
      },
    ],
    sitemap: 'https://vimo.co.il/sitemap.xml',
  }
}
