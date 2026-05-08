import { notFound } from 'next/navigation'
import { Logo } from '@/components/brand/Logo'
import type { LogoVariant, LogoSize, LogoBackground } from '@/components/brand/Logo'

export const metadata = {
  title: 'Brand Preview | DriveCommand',
  robots: { index: false, follow: false },
}

// Development-only page
export default function BrandPreviewPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound()
  }

  return (
    <div className="min-h-screen bg-dc2-ink text-dc2-text-primary p-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <header className="border-b border-dc2-border pb-8">
          <h1 className="font-display text-4xl font-bold mb-2">
            DriveCommand Brand Preview
          </h1>
          <p className="text-dc2-text-secondary font-body">
            Brand Guide v1.0 — April 2026
          </p>
        </header>

        {/* Tagline */}
        <section>
          <SectionTitle>Tagline</SectionTitle>
          <p className="font-display text-6xl font-bold">
            Miles{' '}
            <span style={{ color: 'var(--dc-signal)' }}>Ahead.</span>
          </p>
        </section>

        {/* Primary Palette */}
        <section>
          <SectionTitle>Primary Palette (5 Colors)</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <ColorSwatch name="Ink" hex="#141619" cssVar="--dc-ink" balance="40%" />
            <ColorSwatch name="Slate" hex="#2c2e3a" cssVar="--dc-slate" balance="20%" />
            <ColorSwatch name="Navy" hex="#050a44" cssVar="--dc-navy" balance="15%" />
            <ColorSwatch name="Signal" hex="#0a21c0" cssVar="--dc-signal" balance="10%" />
            <ColorSwatch name="Silver" hex="#b3b4bd" cssVar="--dc-silver" balance="15%" light />
          </div>
        </section>

        {/* Surface Colors */}
        <section>
          <SectionTitle>Surface Colors</SectionTitle>
          <div className="grid grid-cols-3 gap-4">
            <ColorSwatch name="Bone" hex="#f4f5f7" cssVar="--dc-bone" light />
            <ColorSwatch name="Bone 2" hex="#e6e7eb" cssVar="--dc-bone2" light />
            <ColorSwatch name="Paper" hex="#ffffff" cssVar="--dc-paper" light />
          </div>
        </section>

        {/* Ink Ramp */}
        <section>
          <SectionTitle>Ink Ramp (Surfaces & Text)</SectionTitle>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            <RampSwatch stop="N0" hex="#f4f5f7" light />
            <RampSwatch stop="N100" hex="#e6e7eb" light />
            <RampSwatch stop="N200" hex="#d0d1d7" light />
            <RampSwatch stop="N300" hex="#b3b4bd" light />
            <RampSwatch stop="N400" hex="#8e909a" />
            <RampSwatch stop="N500" hex="#6b6e78" />
            <RampSwatch stop="N600" hex="#4a4d56" />
            <RampSwatch stop="N700" hex="#2c2e3a" />
            <RampSwatch stop="N800" hex="#1c1e26" />
            <RampSwatch stop="N900" hex="#141619" />
          </div>
        </section>

        {/* Navy Ramp */}
        <section>
          <SectionTitle>Navy Ramp (Depth & Ground)</SectionTitle>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            <RampSwatch stop="S50" hex="#e8eaf5" light />
            <RampSwatch stop="S100" hex="#bfc4e0" light />
            <RampSwatch stop="S150" hex="#8f97c0" />
            <RampSwatch stop="S200" hex="#5e69a0" />
            <RampSwatch stop="S250" hex="#363f7d" />
            <RampSwatch stop="S300" hex="#1a225b" />
            <RampSwatch stop="S350" hex="#0f153f" />
            <RampSwatch stop="S400" hex="#0a0f32" />
            <RampSwatch stop="S450" hex="#070a28" />
            <RampSwatch stop="S500" hex="#050a44" />
          </div>
        </section>

        {/* Electric Ramp */}
        <section>
          <SectionTitle>Electric Ramp (Signal & Accent)</SectionTitle>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            <RampSwatch stop="L50" hex="#e7eaff" light />
            <RampSwatch stop="L100" hex="#bfc7ff" light />
            <RampSwatch stop="L150" hex="#8e9bff" />
            <RampSwatch stop="L200" hex="#5e70ff" />
            <RampSwatch stop="L250" hex="#3449f0" />
            <RampSwatch stop="L300" hex="#0a21c0" />
            <RampSwatch stop="L350" hex="#081a99" />
            <RampSwatch stop="L400" hex="#061473" />
            <RampSwatch stop="L450" hex="#040d4d" />
            <RampSwatch stop="L500" hex="#020726" />
          </div>
        </section>

        {/* Semantic State Colors */}
        <section>
          <SectionTitle>Semantic State Colors (8 States)</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StateSwatch name="On-Time" hex="#22c07a" cssVar="--dc-state-on-time" usage="Delivery on schedule" />
            <StateSwatch name="At-Risk" hex="#f5b841" cssVar="--dc-state-at-risk" usage="Trending late" />
            <StateSwatch name="Delayed" hex="#ff3b30" cssVar="--dc-state-delayed" usage="Past window" />
            <StateSwatch name="Detention" hex="#8c6fff" cssVar="--dc-state-detention" usage="Dwell > threshold" />
            <StateSwatch name="In-Transit" hex="#0a21c0" cssVar="--dc-state-in-transit" usage="Primary lane" />
            <StateSwatch name="Delivered" hex="#2bb5a5" cssVar="--dc-state-delivered" usage="Completed POD" />
            <StateSwatch name="Scheduled" hex="#64748b" cssVar="--dc-state-scheduled" usage="Pending pickup" />
            <StateSwatch name="Unassigned" hex="#050a44" cssVar="--dc-state-unassigned" usage="No driver yet" />
          </div>
        </section>

        {/* Typography Scale */}
        <section>
          <SectionTitle>Typography Scale</SectionTitle>
          <div className="space-y-8">
            <TypographySample
              name="Display"
              size="96px"
              lineHeight="92px"
              font="DM Sans"
              sample="Miles Ahead."
              className="font-display text-[96px] leading-[92px] font-bold"
            />
            <TypographySample
              name="Headline"
              size="64px"
              lineHeight="64px"
              font="DM Sans"
              sample="Fleet Management Built for Carriers"
              className="font-display text-[64px] leading-[64px] font-bold"
            />
            <TypographySample
              name="Quote"
              size="40px"
              lineHeight="48px"
              font="DM Sans"
              sample="Every load. Every driver. Every mile."
              className="font-display text-[40px] leading-[48px] font-medium italic"
            />
            <TypographySample
              name="Lead"
              size="22px"
              lineHeight="34px"
              font="Inter"
              sample="Dispatch a load in 40 seconds. Track every mile. Invoice on delivery."
              className="font-body text-[22px] leading-[34px]"
            />
            <TypographySample
              name="Body"
              size="16px"
              lineHeight="26px"
              font="Inter"
              sample="DriveCommand streamlines carrier operations with real-time visibility, automated dispatch, and integrated invoicing. Built by operators, for operators."
              className="font-body text-[16px] leading-[26px]"
            />
            <TypographySample
              name="Small"
              size="13px"
              lineHeight="20px"
              font="Inter"
              sample="Last updated 5 minutes ago. Driver ETA: 2h 15m. Status: On-Time."
              className="font-body text-[13px] leading-[20px]"
            />
            <TypographySample
              name="Label"
              size="12px"
              lineHeight="16px"
              font="Inter"
              sample="LOAD STATUS • DRIVER ASSIGNMENT • ETA"
              className="font-body text-[12px] leading-[16px] uppercase tracking-wider font-medium"
            />
            <TypographySample
              name="Data"
              size="14px"
              lineHeight="20px"
              font="JetBrains Mono"
              sample="1,082 miles • 08:12:34 • $2,450.00"
              className="font-mono text-[14px] leading-[20px]"
            />
            <TypographySample
              name="Code"
              size="14px"
              lineHeight="24px"
              font="JetBrains Mono"
              sample="const eta = calculateETA(origin, destination, speed);"
              className="font-mono text-[14px] leading-[24px] bg-dc2-slate p-4 rounded"
            />
          </div>
        </section>

        {/* Logo Variants */}
        <section>
          <SectionTitle>Logo Variants</SectionTitle>
          <div className="space-y-8">
            {(['horizontal', 'stacked', 'wordmark', 'glyph'] as LogoVariant[]).map((variant) => (
              <div key={variant} className="space-y-4">
                <h3 className="font-display text-lg font-semibold capitalize text-dc2-text-secondary">
                  {variant}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {(['sm', 'md', 'lg', 'xl'] as LogoSize[]).map((size) => (
                    <div
                      key={`${variant}-${size}`}
                      className="p-4 bg-dc2-slate rounded-lg flex items-center justify-center min-h-[120px]"
                    >
                      <Logo variant={variant} size={size} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Logo on Backgrounds */}
        <section>
          <SectionTitle>Logo on Approved Backgrounds</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(
              [
                { bg: 'ink', hex: '#141619' },
                { bg: 'navy', hex: '#050a44' },
                { bg: 'signal', hex: '#0a21c0' },
                { bg: 'slate', hex: '#2c2e3a' },
                { bg: 'bone', hex: '#f4f5f7' },
                { bg: 'bone2', hex: '#e6e7eb' },
                { bg: 'silver', hex: '#b3b4bd' },
                { bg: 'paper', hex: '#ffffff' },
              ] as { bg: LogoBackground; hex: string }[]
            ).map(({ bg, hex }) => (
              <div
                key={bg}
                className="p-6 rounded-lg flex flex-col items-center justify-center gap-4 min-h-[140px]"
                style={{ backgroundColor: hex }}
              >
                <Logo variant="horizontal" size="md" background={bg} />
                <span
                  className="text-xs font-mono"
                  style={{
                    color: ['bone', 'bone2', 'silver', 'paper'].includes(bg)
                      ? '#141619'
                      : '#ffffff',
                  }}
                >
                  {bg}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-dc2-border pt-8 text-center">
          <p className="text-dc2-text-muted text-sm font-body">
            DriveCommand Brand Guide v1.0 — Development Preview
          </p>
        </footer>
      </div>
    </div>
  )
}

// Helper Components

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-2xl font-bold mb-6 text-dc2-text-primary">
      {children}
    </h2>
  )
}

function ColorSwatch({
  name,
  hex,
  cssVar,
  balance,
  light = false,
}: {
  name: string
  hex: string
  cssVar: string
  balance?: string
  light?: boolean
}) {
  return (
    <div className="space-y-2">
      <div
        className="h-24 rounded-lg border border-dc2-border"
        style={{ backgroundColor: hex }}
      />
      <div>
        <p className={`font-display font-semibold ${light ? 'text-dc2-n300' : ''}`}>
          {name}
        </p>
        <p className="font-mono text-xs text-dc2-text-muted">{hex}</p>
        <p className="font-mono text-xs text-dc2-text-muted">{cssVar}</p>
        {balance && (
          <p className="font-mono text-xs text-dc2-text-muted">Balance: {balance}</p>
        )}
      </div>
    </div>
  )
}

function RampSwatch({
  stop,
  hex,
  light = false,
}: {
  stop: string
  hex: string
  light?: boolean
}) {
  return (
    <div className="space-y-1">
      <div
        className="h-16 rounded border border-dc2-border"
        style={{ backgroundColor: hex }}
      />
      <p className="font-mono text-[10px] text-dc2-text-muted text-center">{stop}</p>
    </div>
  )
}

function StateSwatch({
  name,
  hex,
  cssVar,
  usage,
}: {
  name: string
  hex: string
  cssVar: string
  usage: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="w-12 h-12 rounded-lg flex-shrink-0"
        style={{ backgroundColor: hex }}
      />
      <div>
        <p className="font-display font-semibold">{name}</p>
        <p className="font-mono text-xs text-dc2-text-muted">{hex}</p>
        <p className="text-xs text-dc2-text-secondary mt-1">{usage}</p>
      </div>
    </div>
  )
}

function TypographySample({
  name,
  size,
  lineHeight,
  font,
  sample,
  className,
}: {
  name: string
  size: string
  lineHeight: string
  font: string
  sample: string
  className: string
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline gap-4">
        <span className="font-display font-semibold text-dc2-text-secondary w-24">
          {name}
        </span>
        <span className="font-mono text-xs text-dc2-text-muted">
          {size} / {lineHeight} — {font}
        </span>
      </div>
      <p className={className}>{sample}</p>
    </div>
  )
}
