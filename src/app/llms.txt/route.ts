/**
 * llms.txt Route Handler
 *
 * Serves a markdown document at /llms.txt following the llmstxt.org specification.
 * This provides LLM-readable site information for AI crawlers and assistants.
 *
 * @see https://llmstxt.org/
 */

// Base URL from environment with production fallback
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://drivecommand.co'

export async function GET() {
  const content = `# DriveCommand

> Fleet management software for trucking companies. Miles Ahead.

DriveCommand is a project management tool built specifically for logistics and trucking operations. It helps fleet owners, dispatchers, and managers coordinate loads, track performance, and streamline operations.

## Pages

- [Home](${BASE_URL}/): Main landing page with product overview
- [Pricing](${BASE_URL}/pricing): Pricing plans and features
- [Demo](${BASE_URL}/demo): Interactive product demo
- [Contact](${BASE_URL}/contact): Get in touch with sales
- [About](${BASE_URL}/about): Company information
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
