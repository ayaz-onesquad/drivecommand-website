import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DriveCommand',
    short_name: 'DriveCommand',
    description: 'Fleet management software for trucking carriers. Dispatch, track, invoice, and stay compliant — all in one place.',
    start_url: '/',
    display: 'standalone',
    background_color: '#141619',
    theme_color: '#0a21c0',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['business', 'productivity', 'utilities'],
    screenshots: [],
    prefer_related_applications: false,
  }
}
