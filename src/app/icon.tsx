import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0066CC 0%, #003C82 100%)',
          borderRadius: '6px',
        }}
      >
        {/* Simplified DC glyph paths */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 400 500"
          fill="none"
        >
          {/* Blue arrow/D shape */}
          <path
            d="M 152 227 L 126 213 L 109 203 L 87 191 L 79 186 L 78 279 L 83 281 L 107 294 L 158 320 L 158 410 L 81 371 L 56 357 L 32 343 L 5 328 L 1 325 L 1 145 L 24 132 L 39 123 L 68 106 L 77 101 L 81 102 L 100 112 L 123 125 L 152 141 L 152 228 L 152 227 Z"
            fill="#FFFFFF"
          />
          {/* Silver right panels */}
          <path
            d="M 160 317 L 160 237 L 234 205 L 235 377 L 161 409 L 160 317 Z"
            fill="#E8E8ED"
          />
          <path
            d="M 159 138 L 159 58 L 233 26 L 234 198 L 160 230 L 159 138 Z"
            fill="#E8E8ED"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
