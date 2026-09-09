import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /**
   * Rewrites to serve markdown mirror routes at .md URLs.
   * Example: /pricing.md → /md/pricing (route handler)
   */
  async rewrites() {
    return [
      {
        source: '/:slug(pricing|about|contact|home).md',
        destination: '/md/:slug',
      },
    ];
  },
}

export default nextConfig
