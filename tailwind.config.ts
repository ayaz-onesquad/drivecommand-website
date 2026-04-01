import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0f172a',
          blue: '#3b82f6',
          amber: '#f59e0b',
          green: '#10b981',
          cyan: '#38bdf8',
        },
        logistics: {
          asphalt: '#1a1f2e',   // Deep road-dark — primary dark background
          steel: '#2d3748',     // Steel panel — card backgrounds
          stripe: '#f7c948',    // Highway lane stripe yellow — data highlights ONLY
          signal: '#22c55e',    // "Delivered" green — success states
          diesel: '#94a3b8',    // Slate mist — secondary text
          load: '#3b82f6',      // Electric blue — primary CTA
          cab: '#e2e8f0',       // Clean white-grey — primary text on dark
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
