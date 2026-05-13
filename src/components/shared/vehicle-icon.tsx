'use client'

interface VehicleIconProps {
  /** Vehicle type */
  type: 'semi' | 'box' | 'tractor'
  /** Color (defaults to currentColor) */
  color?: string
  /** Size in pixels (default: 24) */
  size?: number
  /** Direction the vehicle faces */
  direction?: 'left' | 'right'
  /** Additional CSS classes */
  className?: string
}

export function VehicleIcon({
  type,
  color = 'currentColor',
  size = 24,
  direction = 'right',
  className = '',
}: VehicleIconProps) {
  const transform = direction === 'left' ? `scale(-1, 1)` : undefined
  const transformOrigin = direction === 'left' ? 'center' : undefined

  switch (type) {
    case 'semi':
      return <SemiTruck color={color} size={size} transform={transform} transformOrigin={transformOrigin} className={className} />
    case 'box':
      return <BoxTruck color={color} size={size} transform={transform} transformOrigin={transformOrigin} className={className} />
    case 'tractor':
      return <Tractor color={color} size={size} transform={transform} transformOrigin={transformOrigin} className={className} />
  }
}

interface IconProps {
  color: string
  size: number
  transform?: string
  transformOrigin?: string
  className?: string
}

// Semi-truck (18-wheeler silhouette: cab + trailer)
function SemiTruck({ color, size, transform, transformOrigin, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform, transformOrigin }}
    >
      {/* Trailer */}
      <rect x="1" y="8" width="14" height="8" rx="1" fill={color} />
      {/* Cab */}
      <path
        d="M15 10H20C21.1 10 22 10.9 22 12V16H15V10Z"
        fill={color}
      />
      {/* Cab window */}
      <rect x="17" y="11" width="3" height="2" rx="0.5" fill="currentColor" opacity="0.3" />
      {/* Cab hood */}
      <path
        d="M22 14H23V16H22V14Z"
        fill={color}
      />
      {/* Wheels */}
      <circle cx="5" cy="17" r="2" fill={color} />
      <circle cx="11" cy="17" r="2" fill={color} />
      <circle cx="19" cy="17" r="2" fill={color} />
      {/* Wheel hubs */}
      <circle cx="5" cy="17" r="0.75" fill="currentColor" opacity="0.4" />
      <circle cx="11" cy="17" r="0.75" fill="currentColor" opacity="0.4" />
      <circle cx="19" cy="17" r="0.75" fill="currentColor" opacity="0.4" />
    </svg>
  )
}

// Box truck (delivery van with integrated body)
function BoxTruck({ color, size, transform, transformOrigin, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform, transformOrigin }}
    >
      {/* Main body */}
      <rect x="1" y="7" width="16" height="9" rx="1" fill={color} />
      {/* Cab */}
      <path
        d="M17 9H21C21.55 9 22 9.45 22 10V16H17V9Z"
        fill={color}
      />
      {/* Cab windshield */}
      <path
        d="M18 10H20.5C20.78 10 21 10.22 21 10.5V12H18V10Z"
        fill="currentColor"
        opacity="0.3"
      />
      {/* Box panel lines */}
      <line x1="6" y1="7" x2="6" y2="16" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <line x1="11" y1="7" x2="11" y2="16" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      {/* Wheels */}
      <circle cx="5" cy="17" r="2" fill={color} />
      <circle cx="19" cy="17" r="2" fill={color} />
      {/* Wheel hubs */}
      <circle cx="5" cy="17" r="0.75" fill="currentColor" opacity="0.4" />
      <circle cx="19" cy="17" r="0.75" fill="currentColor" opacity="0.4" />
    </svg>
  )
}

// Tractor (farm/utility vehicle with large wheels)
function Tractor({ color, size, transform, transformOrigin, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform, transformOrigin }}
    >
      {/* Engine hood */}
      <rect x="14" y="10" width="6" height="4" rx="0.5" fill={color} />
      {/* Cab */}
      <path
        d="M6 8H14V14H6C5.45 14 5 13.55 5 13V9C5 8.45 5.45 8 6 8Z"
        fill={color}
      />
      {/* Cab roof */}
      <rect x="6" y="6" width="7" height="2" rx="0.5" fill={color} />
      {/* Window */}
      <rect x="7" y="9" width="4" height="3" rx="0.5" fill="currentColor" opacity="0.3" />
      {/* Exhaust */}
      <rect x="17" y="7" width="1.5" height="3" rx="0.5" fill={color} />
      {/* Large rear wheel */}
      <circle cx="8" cy="16" r="3.5" fill={color} />
      <circle cx="8" cy="16" r="1.5" fill="currentColor" opacity="0.4" />
      {/* Small front wheel */}
      <circle cx="18" cy="16" r="2" fill={color} />
      <circle cx="18" cy="16" r="0.75" fill="currentColor" opacity="0.4" />
      {/* Wheel spokes (rear) */}
      <line x1="8" y1="12.5" x2="8" y2="19.5" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <line x1="4.5" y1="16" x2="11.5" y2="16" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
    </svg>
  )
}

// Export individual components for direct use
export { SemiTruck, BoxTruck, Tractor }
