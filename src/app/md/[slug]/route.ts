import { NextRequest, NextResponse } from 'next/server';
import { PAGE_CONTENT, isValidSlug, type PageSlug } from '@/lib/page-content';

/**
 * Dynamic route handler for markdown mirror pages.
 *
 * Serves static markdown versions of key pages for AI crawlers and LLMs.
 * These are referenced from /llms.txt for discoverability.
 *
 * Example: /md/pricing → returns markdown content for pricing page
 *          (use rewrites in next.config to serve as /pricing.md)
 *
 * TODO: When migrating to CMS, replace the static PAGE_CONTENT lookup
 * with an async fetch call here. The handler is already async-ready.
 */

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(
  _request: NextRequest,
  context: RouteContext
): Promise<NextResponse> {
  const { slug } = await context.params;

  // Validate the slug exists in our content map
  if (!isValidSlug(slug)) {
    return new NextResponse('Not Found', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }

  // Retrieve markdown content
  // TODO: Replace with CMS fetch when dynamic content is needed
  // e.g., const content = await fetchMarkdownFromCMS(slug);
  const content = PAGE_CONTENT[slug];

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      // Allow caching for performance; adjust as needed
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}

/**
 * Generate static params for all known slugs.
 * Enables static generation of markdown routes at build time.
 */
export function generateStaticParams(): Array<{ slug: PageSlug }> {
  return Object.keys(PAGE_CONTENT).map((slug) => ({ slug: slug as PageSlug }));
}
