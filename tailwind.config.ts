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
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
