import type { MetadataRoute } from 'next'

// Base URL from environment with production fallback
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://drivecommand.co'

/**
 * Next.js Native Sitemap
 *
 * This file uses the built-in Next.js sitemap convention.
 * Output is automatically served at /sitemap.xml
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  // ─────────────────────────────────────────────────────────────────────────────
  // Static Pages
  // ─────────────────────────────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/demo`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // ─────────────────────────────────────────────────────────────────────────────
  // Dynamic Routes (uncomment and adapt when you add blog/docs)
  // ─────────────────────────────────────────────────────────────────────────────
  //
  // Example: Blog posts from a CMS or database
  //
  // interface BlogPost {
  //   slug: string
  //   updatedAt: Date
  // }
  //
  // const posts = await fetchBlogPosts() // Replace with your data fetching logic
  // const blogPages: MetadataRoute.Sitemap = posts.map((post: BlogPost) => ({
  //   url: `${BASE_URL}/blog/${post.slug}`,
  //   lastModified: post.updatedAt,
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.6,
  // }))
  //
  // Example: Documentation pages
  //
  // const docs = await fetchDocs()
  // const docPages: MetadataRoute.Sitemap = docs.map((doc) => ({
  //   url: `${BASE_URL}/docs/${doc.slug}`,
  //   lastModified: doc.updatedAt,
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.5,
  // }))
  //
  // Then combine: return [...staticPages, ...blogPages, ...docPages]

  return staticPages
}
