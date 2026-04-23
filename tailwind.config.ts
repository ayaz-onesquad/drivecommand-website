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
        // NEW BRAND SYSTEM (v1.0 April 2026) - use dc2.* classes
        dc2: {
          // Primary palette
          ink: 'var(--dc-ink)',
          slate: 'var(--dc-slate)',
          navy: 'var(--dc-navy)',
          signal: {
            DEFAULT: 'var(--dc-signal)',
            50: 'var(--dc-l50)',
            100: 'var(--dc-l100)',
            150: 'var(--dc-l150)',
            200: 'var(--dc-l200)',
            250: 'var(--dc-l250)',
            300: 'var(--dc-l300)',
            350: 'var(--dc-l350)',
            400: 'var(--dc-l400)',
            450: 'var(--dc-l450)',
            500: 'var(--dc-l500)',
          },
          silver: 'var(--dc-silver)',
          // Ink ramp (neutral)
          n: {
            0: 'var(--dc-n0)',
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
          // Navy ramp (depth)
          s: {
            50: 'var(--dc-s50)',
            100: 'var(--dc-s100)',
            150: 'var(--dc-s150)',
            200: 'var(--dc-s200)',
            250: 'var(--dc-s250)',
            300: 'var(--dc-s300)',
            350: 'var(--dc-s350)',
            400: 'var(--dc-s400)',
            450: 'var(--dc-s450)',
            500: 'var(--dc-s500)',
          },
          // Surface colors
          bone: 'var(--dc-bone)',
          bone2: 'var(--dc-bone2)',
          paper: 'var(--dc-paper)',
          // Semantic state colors
          state: {
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
          brand: {
            DEFAULT: 'var(--dc-color-brand)',
            signal: 'var(--dc-color-brand-signal)',
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
    },
  },
  plugins: [],
}

export default config
