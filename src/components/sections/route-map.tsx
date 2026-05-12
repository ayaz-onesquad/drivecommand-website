'use client'

import { motion, useReducedMotion, AnimatePresence } from 'motion/react'
import { useEffect, useState } from 'react'

// City coordinates on a 400x240 viewBox (includes Canada)
const CITIES = {
  // USA
  SEA: { x: 55, y: 85, name: 'Seattle' },
  SFO: { x: 45, y: 125, name: 'San Francisco' },
  LAX: { x: 55, y: 150, name: 'Los Angeles' },
  DEN: { x: 135, y: 125, name: 'Denver' },
  DAL: { x: 165, y: 170, name: 'Dallas' },
  CHI: { x: 225, y: 105, name: 'Chicago' },
  ATL: { x: 250, y: 155, name: 'Atlanta' },
  NYC: { x: 315, y: 100, name: 'New York' },
  MIA: { x: 290, y: 200, name: 'Miami' },
  // Canada
  VAN: { x: 55, y: 55, name: 'Vancouver' },
  CAL: { x: 105, y: 55, name: 'Calgary' },
  TOR: { x: 275, y: 75, name: 'Toronto' },
  MTL: { x: 320, y: 65, name: 'Montreal' },
} as const

type CityKey = keyof typeof CITIES

interface TruckRoute {
  id: string
  from: CityKey
  to: CityKey
  status: 'on-time' | 'stopped' | 'delayed' | 'arriving'
  statusLabel: string
  progress: number // 0-1 where along the path
  color: string
}

const ROUTES: TruckRoute[] = [
  { id: 'van-chi', from: 'VAN', to: 'CHI', status: 'on-time', statusLabel: 'On Time', progress: 0.45, color: 'var(--state-success)' },
  { id: 'tor-dal', from: 'TOR', to: 'DAL', status: 'stopped', statusLabel: 'Fuel Stop', progress: 0.35, color: 'var(--state-warning)' },
  { id: 'lax-nyc', from: 'LAX', to: 'NYC', status: 'on-time', statusLabel: 'On Time', progress: 0.65, color: 'var(--state-success)' },
  { id: 'sea-mia', from: 'SEA', to: 'MIA', status: 'delayed', statusLabel: 'Traffic', progress: 0.25, color: 'var(--state-critical)' },
  { id: 'mtl-atl', from: 'MTL', to: 'ATL', status: 'arriving', statusLabel: 'Arriving', progress: 0.85, color: 'var(--accent-brand)' },
  { id: 'cal-sfo', from: 'CAL', to: 'SFO', status: 'on-time', statusLabel: 'On Time', progress: 0.55, color: 'var(--state-success)' },
]

// Generate curved path between two cities
function generatePath(from: CityKey, to: CityKey): string {
  const start = CITIES[from]
  const end = CITIES[to]

  const midX = (start.x + end.x) / 2
  const midY = (start.y + end.y) / 2

  const dx = end.x - start.x
  const dy = end.y - start.y
  const distance = Math.sqrt(dx * dx + dy * dy)

  // Perpendicular offset for control point
  const offsetAmount = distance * 0.12
  const perpX = -dy / distance * offsetAmount
  const perpY = dx / distance * offsetAmount

  const controlX = midX + perpX
  const controlY = midY + perpY

  return `M${start.x},${start.y} Q${controlX},${controlY} ${end.x},${end.y}`
}

// Calculate point along a quadratic bezier curve at t (0-1)
function getPointOnPath(from: CityKey, to: CityKey, t: number): { x: number; y: number; angle: number } {
  const start = CITIES[from]
  const end = CITIES[to]

  const midX = (start.x + end.x) / 2
  const midY = (start.y + end.y) / 2

  const dx = end.x - start.x
  const dy = end.y - start.y
  const distance = Math.sqrt(dx * dx + dy * dy)

  const offsetAmount = distance * 0.12
  const perpX = -dy / distance * offsetAmount
  const perpY = dx / distance * offsetAmount

  const controlX = midX + perpX
  const controlY = midY + perpY

  // Quadratic bezier: B(t) = (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
  const x = Math.pow(1 - t, 2) * start.x + 2 * (1 - t) * t * controlX + Math.pow(t, 2) * end.x
  const y = Math.pow(1 - t, 2) * start.y + 2 * (1 - t) * t * controlY + Math.pow(t, 2) * end.y

  // Calculate tangent for rotation
  const tangentX = 2 * (1 - t) * (controlX - start.x) + 2 * t * (end.x - controlX)
  const tangentY = 2 * (1 - t) * (controlY - start.y) + 2 * t * (end.y - controlY)
  const angle = Math.atan2(tangentY, tangentX) * (180 / Math.PI)

  return { x, y, angle }
}

// Realistic semi-truck silhouette
function SemiTruck({ color }: { color: string }) {
  return (
    <g style={{ color }}>
      {/* Trailer */}
      <rect x="-18" y="-6" width="20" height="10" rx="1" fill="currentColor" opacity="0.9" />
      {/* Cab */}
      <path
        d="M2,-5 L8,-5 C10,-5 11,-3 11,0 L11,3 C11,4 10,4 9,4 L2,4 Z"
        fill="currentColor"
      />
      {/* Windshield detail */}
      <path
        d="M5,-4 L8,-4 C9,-4 10,-3 10,-1 L10,1 L6,1 Z"
        fill="currentColor"
        opacity="0.6"
      />
      {/* Wheels */}
      <circle cx="-14" cy="5" r="2.5" fill="currentColor" />
      <circle cx="-6" cy="5" r="2.5" fill="currentColor" />
      <circle cx="6" cy="5" r="2.5" fill="currentColor" />
      {/* Wheel hubs */}
      <circle cx="-14" cy="5" r="1" fill="var(--surface-dashboard)" />
      <circle cx="-6" cy="5" r="1" fill="var(--surface-dashboard)" />
      <circle cx="6" cy="5" r="1" fill="var(--surface-dashboard)" />
    </g>
  )
}

// Status bubble component
function StatusBubble({ status, label, x, y }: { status: TruckRoute['status']; label: string; x: number; y: number }) {
  const getStatusColor = () => {
    switch (status) {
      case 'on-time': return 'var(--state-success)'
      case 'stopped': return 'var(--state-warning)'
      case 'delayed': return 'var(--state-critical)'
      case 'arriving': return 'var(--accent-brand)'
    }
  }

  const bubbleWidth = label.length * 5 + 16
  const isNearRightEdge = x > 320
  const isNearTopEdge = y < 50
  const bubbleX = isNearRightEdge ? x - bubbleWidth - 5 : x + 15
  const bubbleY = isNearTopEdge ? y + 12 : y - 22

  return (
    <g>
      {/* Bubble background */}
      <rect
        x={bubbleX}
        y={bubbleY}
        width={bubbleWidth}
        height="16"
        rx="3"
        fill="var(--surface-elevated)"
        stroke={getStatusColor()}
        strokeWidth="1"
      />
      {/* Status dot */}
      <circle
        cx={bubbleX + 8}
        cy={bubbleY + 8}
        r="3"
        fill={getStatusColor()}
      >
        {(status === 'on-time' || status === 'arriving') && (
          <animate
            attributeName="opacity"
            values="1;0.5;1"
            dur="2s"
            repeatCount="indefinite"
          />
        )}
      </circle>
      {/* Status text */}
      <text
        x={bubbleX + 14}
        y={bubbleY + 11.5}
        fontSize="8"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="500"
        fill="var(--text-primary)"
      >
        {label}
      </text>
      {/* Connector line */}
      <line
        x1={isNearRightEdge ? bubbleX + bubbleWidth : bubbleX}
        y1={isNearTopEdge ? bubbleY : bubbleY + 16}
        x2={x}
        y2={y}
        stroke={getStatusColor()}
        strokeWidth="1"
        strokeDasharray="2 2"
        opacity="0.6"
      />
    </g>
  )
}

interface RouteMapProps {
  className?: string
}

export function RouteMap({ className = '' }: RouteMapProps) {
  const prefersReducedMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [visibleBubbles, setVisibleBubbles] = useState<string[]>([])
  const [truckPositions, setTruckPositions] = useState<Record<string, number>>({})

  useEffect(() => {
    setMounted(true)
    // Initialize truck positions
    const initialPositions: Record<string, number> = {}
    ROUTES.forEach(route => {
      initialPositions[route.id] = route.progress
    })
    setTruckPositions(initialPositions)
  }, [])

  // Animate truck positions
  useEffect(() => {
    if (!mounted || prefersReducedMotion) return

    const interval = setInterval(() => {
      setTruckPositions(prev => {
        const newPositions = { ...prev }
        ROUTES.forEach(route => {
          // Slowly move trucks along their paths
          let newPos = (prev[route.id] || route.progress) + 0.002
          if (newPos > 0.95) newPos = 0.05 // Loop back
          newPositions[route.id] = newPos
        })
        return newPositions
      })
    }, 100)

    return () => clearInterval(interval)
  }, [mounted, prefersReducedMotion])

  // Cycle through showing status bubbles
  useEffect(() => {
    if (!mounted) return

    // Show first two bubbles immediately
    setVisibleBubbles([ROUTES[0].id, ROUTES[2].id])

    const interval = setInterval(() => {
      setVisibleBubbles(prev => {
        // Rotate which bubbles are visible (show 2-3 at a time)
        const allIds = ROUTES.map(r => r.id)
        const currentIndex = allIds.indexOf(prev[0] || allIds[0])
        const nextIndex = (currentIndex + 1) % allIds.length
        return [allIds[nextIndex], allIds[(nextIndex + 2) % allIds.length], allIds[(nextIndex + 4) % allIds.length]]
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [mounted])

  const shouldAnimate = mounted && !prefersReducedMotion

  return (
    <svg
      viewBox="0 0 400 240"
      className={`w-full h-auto ${className}`}
      aria-label="Live fleet map showing truck routes across the United States and Canada"
    >
      <defs>
        {/* Glow filter for trucks */}
        <filter id="truck-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Canada outline (simplified) */}
      <path
        d="M45,20
           C80,15 140,12 200,18
           C250,22 290,20 340,25
           C355,27 360,35 355,45
           L350,55 C345,60 330,62 310,60
           L295,58 C285,56 275,58 270,62
           L260,68 C250,72 235,75 225,72
           L215,68 C200,64 180,60 160,58
           L140,56 C120,54 95,52 70,55
           L55,58 C45,60 40,55 40,45
           L40,35 C40,28 42,22 45,20"
        fill="none"
        stroke="var(--pattern-dot)"
        strokeWidth="1.5"
        strokeDasharray="4 2"
        opacity="0.35"
      />

      {/* US outline (simplified) */}
      <path
        d="M40,70
           C50,68 60,65 75,68
           L90,72 C110,78 130,80 150,78
           L180,75 C200,72 220,70 240,72
           L270,75 C290,78 310,82 330,88
           C350,94 360,102 358,115
           L355,130 C352,145 345,160 335,175
           C325,190 310,200 290,208
           C270,216 245,218 220,215
           C195,212 170,205 145,195
           C120,185 95,175 75,162
           C55,149 42,135 38,118
           C34,101 36,85 40,70"
        fill="none"
        stroke="var(--pattern-dot)"
        strokeWidth="1.5"
        strokeDasharray="4 2"
        opacity="0.35"
      />

      {/* US-Canada border hint */}
      <path
        d="M40,62 C100,58 180,55 260,62 C300,66 340,70 355,55"
        fill="none"
        stroke="var(--border-divider)"
        strokeWidth="0.5"
        strokeDasharray="8 4"
        opacity="0.25"
      />

      {/* State/Province divider hints */}
      <g stroke="var(--pattern-dot)" strokeWidth="0.5" opacity="0.12">
        <line x1="110" y1="55" x2="110" y2="200" />
        <line x1="180" y1="55" x2="180" y2="210" />
        <line x1="260" y1="62" x2="260" y2="210" />
        <line x1="40" y1="120" x2="358" y2="120" />
      </g>

      {/* City markers */}
      {Object.entries(CITIES).map(([key, city]) => (
        <g key={key}>
          {/* Outer glow ring */}
          <circle
            cx={city.x}
            cy={city.y}
            r="5"
            fill="none"
            stroke="var(--text-tertiary)"
            strokeWidth="1"
            opacity="0.25"
          />
          {/* City dot */}
          <circle
            cx={city.x}
            cy={city.y}
            r="2.5"
            fill="var(--text-tertiary)"
            opacity="0.5"
          />
          {/* City label */}
          <text
            x={city.x + (city.x > 200 ? -8 : 8)}
            y={city.y + 3}
            fontSize="7"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="500"
            fill="var(--text-tertiary)"
            textAnchor={city.x > 200 ? 'end' : 'start'}
            opacity="0.7"
          >
            {key}
          </text>
        </g>
      ))}

      {/* Route paths */}
      {ROUTES.map((route, i) => {
        const pathD = generatePath(route.from, route.to)

        return (
          <g key={route.id}>
            {/* Path background */}
            <path
              d={pathD}
              fill="none"
              stroke={route.color}
              strokeWidth="1"
              opacity="0.15"
            />

            {/* Animated path draw */}
            <motion.path
              d={pathD}
              fill="none"
              stroke={route.color}
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: shouldAnimate ? 1 : 0,
                opacity: shouldAnimate ? 0.7 : 0
              }}
              transition={{
                duration: 1.2,
                delay: shouldAnimate ? 0.3 + i * 0.15 : 0,
                ease: [0.77, 0, 0.175, 1],
              }}
            />
          </g>
        )
      })}

      {/* Animated trucks with status bubbles */}
      {ROUTES.map((route, i) => {
        const position = truckPositions[route.id] || route.progress
        const point = getPointOnPath(route.from, route.to, position)
        const showBubble = visibleBubbles.includes(route.id)

        return (
          <g key={`truck-${route.id}`}>
            {/* Truck */}
            <motion.g
              transform={`translate(${point.x}, ${point.y}) rotate(${point.angle})`}
              filter="url(#truck-glow)"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: shouldAnimate ? 1 : 0, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: shouldAnimate ? 1.2 + i * 0.15 : 0,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <g transform="scale(0.5)">
                <SemiTruck color={route.color} />
              </g>
            </motion.g>

            {/* Status bubble */}
            <AnimatePresence>
              {showBubble && (
                <motion.g
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <StatusBubble
                    status={route.status}
                    label={route.statusLabel}
                    x={point.x}
                    y={point.y}
                  />
                </motion.g>
              )}
            </AnimatePresence>
          </g>
        )
      })}

      {/* Live indicator */}
      <g transform="translate(365, 225)">
        <rect
          x="-8"
          y="-10"
          width="38"
          height="16"
          rx="3"
          fill="var(--surface-elevated)"
          stroke="var(--state-success)"
          strokeWidth="1"
          opacity="0.9"
        />
        <circle r="3" fill="var(--state-success)">
          <animate
            attributeName="opacity"
            values="1;0.4;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <text
          x="7"
          y="4"
          fontSize="9"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="600"
          fill="var(--state-success)"
        >
          LIVE
        </text>
      </g>

      {/* Legend */}
      <g transform="translate(15, 220)">
        <rect
          x="-5"
          y="-12"
          width="110"
          height="20"
          rx="3"
          fill="var(--surface-elevated)"
          opacity="0.8"
        />
        <circle cx="0" cy="0" r="3" fill="var(--state-success)" />
        <text x="8" y="3" fontSize="7" fill="var(--text-tertiary)">On Time</text>
        <circle cx="38" cy="0" r="3" fill="var(--state-warning)" />
        <text x="46" y="3" fontSize="7" fill="var(--text-tertiary)">Stopped</text>
        <circle cx="80" cy="0" r="3" fill="var(--state-critical)" />
        <text x="88" y="3" fontSize="7" fill="var(--text-tertiary)">Delay</text>
      </g>
    </svg>
  )
}
