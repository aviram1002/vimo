import { MetadataRoute } from 'next'
import { blogArticles } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://vimo.co.il'

  const staticPages: MetadataRoute.Sitemap = [
    { url: base,                              lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/templates`,              lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/pricing`,                lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/faq`,                    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog`,                   lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/invitations/wedding`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/invitations/birthday`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/invitations/bar-mitzvah`,lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/invitations/rsvp`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]

  const blogPages: MetadataRoute.Sitemap = blogArticles.map((a) => ({
    url: `${base}/blog/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...blogPages]
}
