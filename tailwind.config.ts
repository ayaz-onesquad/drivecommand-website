import type { Config } from 'tailwindcss'
import tokens from './brand/tokens.json'

// Build color utilities from tokens.json
const neutralColors = Object.fromEntries(
  Object.entries(tokens.color.neutral).map(([k, v]) => [k.replace('n', ''), v])
)

const brandColors = Object.fromEntries(
  Object.entries(tokens.color.brand).map(([k, v]) => [k.replace('b', ''), v])
)

// Resolve alias values to actual hex colors
const resolveAlias = (alias: string): string => {
  if (alias.startsWith('n')) {
    return tokens.color.neutral[alias as keyof typeof tokens.color.neutral]
  }
  if (alias.startsWith('b')) {
    return tokens.color.brand[alias as keyof typeof tokens.color.brand]
  }
  return alias
}

const aliasColors = Object.fromEntries(
  Object.entries(tokens.alias).map(([name, tokenRef]) => [name, resolveAlias(tokenRef)])
)

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Legacy dc.* classes (backward compatibility)
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
        // NEW: Token-driven colors from tokens.json
        // Direct neutral ramp access: bg-n050, text-n900
        n: neutralColors,
        // Direct brand ramp access: bg-b500, text-b400
        b: brandColors,
        // Semantic aliases from tokens.json: bg-ink, text-bone, bg-brand
        ...aliasColors,
        // Semantic states
        success: tokens.color.semantic.success,
        warning: tokens.color.semantic.warning,
        critical: tokens.color.semantic.critical,
        info: tokens.color.semantic.info,
        // Backward compatibility dc2.* namespace
        dc2: {
          // Primary palette
          ink: aliasColors.ink,
          bone: aliasColors.bone,
          graphite: aliasColors.graphite,
          brand: aliasColors.brand,
          // Neutral ramp (N000-N900)
          n: {
            '000': tokens.color.neutral.n000,
            '050': tokens.color.neutral.n050,
            100: tokens.color.neutral.n100,
            200: tokens.color.neutral.n200,
            300: tokens.color.neutral.n300,
            400: tokens.color.neutral.n400,
            500: tokens.color.neutral.n500,
            600: tokens.color.neutral.n600,
            700: tokens.color.neutral.n700,
            800: tokens.color.neutral.n800,
            900: tokens.color.neutral.n900,
          },
          // Brand Blue ramp (B050-B800)
          b: {
            '050': tokens.color.brand.b050,
            100: tokens.color.brand.b100,
            200: tokens.color.brand.b200,
            300: tokens.color.brand.b300,
            400: tokens.color.brand.b400,
            500: tokens.color.brand.b500,
            600: tokens.color.brand.b600,
            700: tokens.color.brand.b700,
            800: tokens.color.brand.b800,
          },
          // Surface colors
          paper: tokens.color.neutral.n000,
          // Backward compat aliases
          slate: aliasColors.slate,
          navy: aliasColors.trench,
          signal: aliasColors.brand,
          silver: aliasColors.silver,
          // Semantic state colors
          state: {
            success: tokens.color.semantic.success,
            warning: tokens.color.semantic.warning,
            critical: tokens.color.semantic.critical,
            info: tokens.color.semantic.info,
            onTime: tokens.color.semantic.success,
            atRisk: tokens.color.semantic.warning,
            delayed: tokens.color.semantic.critical,
            detention: '#8c6fff',
            inTransit: tokens.color.semantic.info,
            delivered: tokens.color.semantic.success,
            scheduled: tokens.color.neutral.n400,
            unassigned: tokens.color.brand.b700,
          },
          // Semantic aliases
          bg: {
            dark: tokens.color.neutral.n900,
            card: tokens.color.neutral.n800,
            light: tokens.color.neutral.n050,
            secondary: tokens.color.neutral.n700,
          },
          accent: {
            DEFAULT: tokens.color.brand.b500,
            hover: tokens.color.brand.b400,
          },
          text: {
            primary: '#FFFFFF',
            secondary: tokens.color.neutral.n300,
            dark: tokens.color.neutral.n900,
            darkSecondary: tokens.color.neutral.n500,
            muted: tokens.color.neutral.n400,
            onAccent: tokens.color.neutral.n050,
          },
          border: {
            DEFAULT: tokens.color.neutral.n700,
            light: tokens.color.neutral.n100,
          },
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      // Typography scale per brand guide (from tokens.json)
      fontSize: {
        // DM Sans scales
        'display': [`${tokens.typography.scale.display.size}px`, { lineHeight: `${tokens.typography.scale.display.lineHeight}px`, fontWeight: `${tokens.typography.scale.display.weight}` }],
        'headline': [`${tokens.typography.scale.headline.size}px`, { lineHeight: `${tokens.typography.scale.headline.lineHeight}px`, fontWeight: `${tokens.typography.scale.headline.weight}` }],
        'quote': [`${tokens.typography.scale.quote.size}px`, { lineHeight: `${tokens.typography.scale.quote.lineHeight}px`, fontWeight: `${tokens.typography.scale.quote.weight}` }],
        // Inter scales
        'lead': [`${tokens.typography.scale.lead.size}px`, { lineHeight: `${tokens.typography.scale.lead.lineHeight}px`, fontWeight: `${tokens.typography.scale.lead.weight}` }],
        'body': [`${tokens.typography.scale.body.size}px`, { lineHeight: `${tokens.typography.scale.body.lineHeight}px`, fontWeight: `${tokens.typography.scale.body.weight}` }],
        'small': [`${tokens.typography.scale.small.size}px`, { lineHeight: `${tokens.typography.scale.small.lineHeight}px`, fontWeight: `${tokens.typography.scale.small.weight}` }],
        // JetBrains Mono scales
        'label': [`${tokens.typography.scale.label.size}px`, { lineHeight: `${tokens.typography.scale.label.lineHeight}px`, fontWeight: `${tokens.typography.scale.label.weight}` }],
        'data': [`${tokens.typography.scale.data.size}px`, { lineHeight: `${tokens.typography.scale.data.lineHeight}px`, fontWeight: `${tokens.typography.scale.data.weight}` }],
        'code': [`${tokens.typography.scale.code.size}px`, { lineHeight: `${tokens.typography.scale.code.lineHeight}px`, fontWeight: `${tokens.typography.scale.code.weight}` }],
      },
      // Motion from tokens.json
      transitionTimingFunction: {
        brand: tokens.motion.easing.brand,
      },
      transitionDuration: {
        fast: tokens.motion.duration.fast,
        medium: tokens.motion.duration.medium,
        slow: tokens.motion.duration.slow,
      },
      // Border radius from tokens.json
      borderRadius: {
        none: tokens.radius.none,
        input: tokens.radius.input,
        full: tokens.radius.full,
      },
    },
  },
  plugins: [],
}

export default config
