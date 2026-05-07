import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        dc: {
          'bg-dark': 'var(--color-bg-dark)',
          'bg-light': 'var(--color-bg-light)',
          'bg-card': 'var(--color-bg-card)',
          'bg-secondary': 'var(--color-bg-secondary)',
          'brand': 'var(--color-brand)',
          'brand-mid': 'var(--color-brand-mid)',
          'accent': 'var(--color-accent)',
          'accent-hover': 'var(--color-accent-hover)',
          'text-on-accent': 'var(--color-text-on-accent)',
          'text-primary': 'var(--color-text-primary)',
          'text-secondary': 'var(--color-text-secondary)',
          'text-dark': 'var(--color-text-dark)',
          'text-dark-secondary': 'var(--color-text-dark-secondary)',
          'text-muted': 'var(--color-text-muted)',
          'border': 'var(--color-border)',
          'border-light': 'var(--color-border-light)',
          'live-green': 'var(--color-live-green)',
          'status-transit': 'var(--color-status-transit)',
          'status-dispatched': 'var(--color-status-dispatched)',
          'status-invoiced': 'var(--color-status-invoiced)',
        },
        // NEW BRAND SYSTEM (v2.0 May 2026) - use dc2.* classes
        dc2: {
          // Primary palette
          ink: 'var(--dc-ink)',
          bone: 'var(--dc-bone)',
          graphite: 'var(--dc-graphite)',
          brand: 'var(--dc-brand)',
          // Neutral ramp (N000-N900)
          n: {
            '000': 'var(--dc-n000)',
            '050': 'var(--dc-n050)',
            100: 'var(--dc-n100)',
            200: 'var(--dc-n200)',
            300: 'var(--dc-n300)',
            400: 'var(--dc-n400)',
            500: 'var(--dc-n500)',
            600: 'var(--dc-n600)',
            700: 'var(--dc-n700)',
            800: 'var(--dc-n800)',
            900: 'var(--dc-n900)',
          },
          // Brand Blue ramp (B050-B800)
          b: {
            '050': 'var(--dc-b050)',
            100: 'var(--dc-b100)',
            200: 'var(--dc-b200)',
            300: 'var(--dc-b300)',
            400: 'var(--dc-b400)',
            500: 'var(--dc-b500)',
            600: 'var(--dc-b600)',
            700: 'var(--dc-b700)',
            800: 'var(--dc-b800)',
          },
          // Surface colors
          paper: 'var(--dc-paper)',
          // Backward compat aliases
          slate: 'var(--dc-slate)',
          navy: 'var(--dc-navy)',
          signal: 'var(--dc-signal)',
          silver: 'var(--dc-silver)',
          // Semantic state colors
          state: {
            success: 'var(--dc-state-success)',
            warning: 'var(--dc-state-warning)',
            critical: 'var(--dc-state-critical)',
            info: 'var(--dc-state-info)',
            onTime: 'var(--dc-state-on-time)',
            atRisk: 'var(--dc-state-at-risk)',
            delayed: 'var(--dc-state-delayed)',
            detention: 'var(--dc-state-detention)',
            inTransit: 'var(--dc-state-in-transit)',
            delivered: 'var(--dc-state-delivered)',
            scheduled: 'var(--dc-state-scheduled)',
            unassigned: 'var(--dc-state-unassigned)',
          },
          // Semantic aliases
          bg: {
            dark: 'var(--dc-color-bg-dark)',
            card: 'var(--dc-color-bg-card)',
            light: 'var(--dc-color-bg-light)',
            secondary: 'var(--dc-color-bg-secondary)',
          },
          accent: {
            DEFAULT: 'var(--dc-color-accent)',
            hover: 'var(--dc-color-accent-hover)',
          },
          text: {
            primary: 'var(--dc-color-text-primary)',
            secondary: 'var(--dc-color-text-secondary)',
            dark: 'var(--dc-color-text-dark)',
            darkSecondary: 'var(--dc-color-text-dark-secondary)',
            muted: 'var(--dc-color-text-muted)',
            onAccent: 'var(--dc-color-text-on-accent)',
          },
          border: {
            DEFAULT: 'var(--dc-color-border)',
            light: 'var(--dc-color-border-light)',
          },
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      // Typography scale per brand guide (pg 12-13)
      fontSize: {
        // DM Sans scales
        'display': ['96px', { lineHeight: '92px', fontWeight: '700' }],
        'headline': ['64px', { lineHeight: '64px', fontWeight: '700' }],
        'quote': ['40px', { lineHeight: '48px', fontWeight: '400' }],
        // Inter scales
        'lead': ['22px', { lineHeight: '34px', fontWeight: '400' }],
        'body': ['16px', { lineHeight: '26px', fontWeight: '400' }],
        'small': ['13px', { lineHeight: '20px', fontWeight: '400' }],
        // JetBrains Mono scales
        'label': ['12px', { lineHeight: '16px', fontWeight: '500' }],
        'data': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'code': ['14px', { lineHeight: '24px', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
}

export default config
