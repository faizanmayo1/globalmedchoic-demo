import { useState } from 'react'

import type { GeoPoint, Provider } from '@/types'
import { ORIGIN, providers as allProviders } from '@/data/network'
import { cn } from '@/utils/cn'

/**
 * Signature abstract world map — an equirectangular meridian graticule with
 * accredited-provider nodes and animated great-circle route arcs from the
 * patient origin. Not a literal coastline map; a premium "global care network"
 * motif. The highlighted route (the matched provider) is drawn in gold.
 */

const W = 1000
const H = 500

const project = (p: GeoPoint) => ({
  x: ((p.lng + 180) / 360) * W,
  y: ((90 - p.lat) / 180) * H,
})

/** Quadratic arc bulging poleward, evoking a great-circle flight path. */
function arcPath(a: GeoPoint, b: GeoPoint) {
  const pa = project(a)
  const pb = project(b)
  const mx = (pa.x + pb.x) / 2
  const my = (pa.y + pb.y) / 2
  const dist = Math.hypot(pb.x - pa.x, pb.y - pa.y)
  const lift = Math.min(150, dist * 0.32)
  return `M ${pa.x} ${pa.y} Q ${mx} ${my - lift} ${pb.x} ${pb.y}`
}

export function WorldMap({
  providers = allProviders,
  highlightId,
  className,
}: {
  providers?: Provider[]
  highlightId?: string
  className?: string
}) {
  const [hover, setHover] = useState<string | null>(null)
  const origin = project(ORIGIN.coords)

  // Graticule lines
  const lats = [-60, -30, 0, 30, 60]
  const lngs = [-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150]

  return (
    <div className={cn('map-grid relative overflow-hidden rounded-2xl border border-hairline bg-teal-900/[0.015]', className)}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_30%_-10%,rgba(14,91,82,0.10),transparent_60%)]" />
      <svg viewBox={`0 0 ${W} ${H}`} className="relative h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="routeHot" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C2A24C" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#C2A24C" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* Graticule */}
        <g stroke="#0E5B52" strokeOpacity="0.10" strokeWidth="1" fill="none">
          {lats.map((lat) => {
            const y = ((90 - lat) / 180) * H
            return <line key={`lat-${lat}`} x1="0" y1={y} x2={W} y2={y} />
          })}
          {lngs.map((lng) => {
            const x = ((lng + 180) / 360) * W
            return <line key={`lng-${lng}`} x1={x} y1="0" x2={x} y2={H} />
          })}
        </g>

        {/* Route arcs */}
        {providers.map((p) => {
          const hot = p.id === highlightId
          return (
            <path
              key={`arc-${p.id}`}
              d={arcPath(ORIGIN.coords, p.coords)}
              fill="none"
              stroke={hot ? 'url(#routeHot)' : '#0E5B52'}
              strokeOpacity={hot ? 1 : hover === p.id ? 0.5 : 0.18}
              strokeWidth={hot ? 2.4 : 1.4}
              strokeLinecap="round"
              strokeDasharray={hot ? '2 9' : '1 7'}
              className={hot ? 'animate-route-dash' : undefined}
            />
          )
        })}

        {/* Provider nodes */}
        {providers.map((p) => {
          const { x, y } = project(p.coords)
          const hot = p.id === highlightId
          return (
            <g
              key={p.id}
              transform={`translate(${x} ${y})`}
              onMouseEnter={() => setHover(p.id)}
              onMouseLeave={() => setHover(null)}
              className="cursor-pointer"
            >
              {hot && <circle r="11" fill="#C2A24C" opacity="0.18" className="animate-ping-soft" />}
              <circle r={hot ? 6 : 4.5} fill={hot ? '#C2A24C' : '#0E5B52'} stroke="#FBF8F3" strokeWidth="1.6" />
              {(hot || hover === p.id) && (
                <g transform="translate(10 -6)">
                  <rect x="0" y="-12" width={p.city.length * 7.6 + 18} height="20" rx="5" fill="#0A312C" opacity="0.92" />
                  <text x="9" y="2.5" fill="#FBF8F3" fontSize="11" fontFamily="IBM Plex Mono, monospace">
                    {p.flag} {p.city}
                  </text>
                </g>
              )}
            </g>
          )
        })}

        {/* Origin node */}
        <g transform={`translate(${origin.x} ${origin.y})`}>
          <circle r="9" fill="#16241F" opacity="0.12" className="animate-ping-soft" />
          <circle r="5.5" fill="#16241F" stroke="#FBF8F3" strokeWidth="1.8" />
          <g transform="translate(-8 -10)">
            <rect x={-(ORIGIN.city.length * 6.2 + 14)} y="-12" width={ORIGIN.city.length * 6.2 + 14} height="20" rx="5" fill="#16241F" opacity="0.92" />
            <text x={-(ORIGIN.city.length * 6.2 + 7)} y="2.5" fill="#FBF8F3" fontSize="11" fontFamily="IBM Plex Mono, monospace">
              {ORIGIN.city}
            </text>
          </g>
        </g>
      </svg>
    </div>
  )
}
