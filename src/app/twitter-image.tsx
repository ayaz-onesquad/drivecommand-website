import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'DriveCommand - Miles Ahead'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

// Image generation - same as OG image
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#1D1D1F',
          padding: '80px',
        }}
      >
        {/* Logo glyph */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
          <svg
            width="80"
            height="80"
            viewBox="0 0 400 500"
            fill="none"
          >
            {/* Blue arrow/D shape */}
            <path
              d="M 152 227 L 126 213 L 109 203 L 87 191 L 79 186 L 78 279 L 83 281 L 107 294 L 158 320 L 158 410 L 81 371 L 56 357 L 32 343 L 5 328 L 1 325 L 1 145 L 24 132 L 39 123 L 68 106 L 77 101 L 81 102 L 100 112 L 123 125 L 152 141 L 152 228 L 152 227 Z"
              fill="#0066CC"
            />
            {/* Silver right panels */}
            <path
              d="M 160 317 L 160 237 L 234 205 L 235 377 L 161 409 L 160 317 Z"
              fill="#B3B4BD"
            />
            <path
              d="M 159 138 L 159 58 L 233 26 L 234 198 L 160 230 L 159 138 Z"
              fill="#B3B4BD"
            />
          </svg>
        </div>

        {/* DriveCommand wordmark */}
        <div
          style={{
            fontSize: '72px',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '24px',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          DriveCommand
        </div>

        {/* Tagline */}
        <div
          style={{
            display: 'flex',
            fontSize: '48px',
            fontWeight: 700,
            marginBottom: '32px',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <span style={{ color: '#FFFFFF' }}>Miles </span>
          <span style={{ color: '#0066CC' }}>Ahead.</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '28px',
            color: '#AEAEB2',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          Fleet management built for carriers. Dispatch, track, and invoice — all in one place.
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
