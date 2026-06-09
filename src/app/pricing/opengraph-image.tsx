import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'DriveCommand Pricing - Simple, Transparent Fleet Management Pricing'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

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
          backgroundColor: '#141619',
          padding: '80px',
        }}
      >
        {/* Logo glyph */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
          <svg width="80" height="80" viewBox="0 0 500 500" fill="none">
            <path
              d="M 252.861 234.066 L 226.697 219.631 L 209.697 209.631 L 187.697 197.631 L 179.697 192.631 L 178.697 285.631 L 183.697 287.631 L 207.697 300.631 L 258.409 326.536 L 258.951 416.518 L 181.698 377.631 L 156.698 363.631 L 132.698 349.631 L 105.698 334.631 L 101.698 331.631 L 101.698 151.631 L 124.698 138.631 L 139.698 129.631 L 168.698 112.631 L 177.698 107.631 L 181.698 108.631 L 200.698 118.631 L 223.698 131.631 L 252.564 147.557 L 253.219 234.263 L 252.861 234.066 Z"
              fill="#0a21c0"
            />
            <path
              d="M 255.697 235.631 L 253.219 234.263 L 252.564 147.557 L 252.698 147.631 L 257.243 149.904 L 259.662 151.094 L 260.765 236.629 L 255.697 235.631 Z"
              fill="#0a21c0"
            />
            <path
              d="M 260.697 323.631 L 260.697 243.469 L 334.732 210.887 L 335.667 383.128 L 261.695 415.408 L 260.697 323.631 Z"
              fill="#b3b4bd"
            />
            <path
              d="M 259.646 144.791 L 259.646 64.629 L 333.681 32.047 L 334.616 204.288 L 260.644 236.568 L 259.646 144.791 Z"
              fill="#b3b4bd"
            />
          </svg>
        </div>

        {/* Page title */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '24px',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          Simple, Transparent Pricing
        </div>

        {/* Pricing tiers */}
        <div
          style={{
            display: 'flex',
            gap: '32px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '24px 32px',
              backgroundColor: '#2c2e3a',
              borderRadius: '16px',
            }}
          >
            <span style={{ fontSize: '20px', color: '#b3b4bd', fontFamily: 'system-ui' }}>Starter</span>
            <span style={{ fontSize: '36px', fontWeight: 700, color: '#FFFFFF', fontFamily: 'system-ui' }}>$29</span>
            <span style={{ fontSize: '16px', color: '#b3b4bd', fontFamily: 'system-ui' }}>/truck/mo</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '24px 32px',
              backgroundColor: '#0a21c0',
              borderRadius: '16px',
            }}
          >
            <span style={{ fontSize: '20px', color: '#f4f5f7', fontFamily: 'system-ui' }}>Growth</span>
            <span style={{ fontSize: '36px', fontWeight: 700, color: '#FFFFFF', fontFamily: 'system-ui' }}>$49</span>
            <span style={{ fontSize: '16px', color: '#f4f5f7', fontFamily: 'system-ui' }}>/truck/mo</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '24px 32px',
              backgroundColor: '#2c2e3a',
              borderRadius: '16px',
            }}
          >
            <span style={{ fontSize: '20px', color: '#b3b4bd', fontFamily: 'system-ui' }}>Enterprise</span>
            <span style={{ fontSize: '36px', fontWeight: 700, color: '#FFFFFF', fontFamily: 'system-ui' }}>Custom</span>
            <span style={{ fontSize: '16px', color: '#b3b4bd', fontFamily: 'system-ui' }}>pricing</span>
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '24px',
            color: '#b3b4bd',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          No hidden fees • No long-term contracts • Unlimited trucks
        </div>
      </div>
    ),
    { ...size }
  )
}
