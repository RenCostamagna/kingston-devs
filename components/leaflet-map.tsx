"use client"

import "leaflet/dist/leaflet.css"

import L from "leaflet"
import { useEffect } from "react"
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet"

import { formatCurrency } from "@/lib/format"
import { cn } from "@/lib/utils"

export type MapSpot = {
  id: string
  lat: number
  lng: number
  title: string
  price?: number
}

// Rosario, Argentina — fallback center when there are no spots to fit.
const ROSARIO_CENTER: [number, number] = [-32.9468, -60.6393]

function buildIcon(price: number | undefined, active: boolean) {
  const bg = active ? "var(--primary)" : "var(--card)"
  const fg = active ? "var(--primary-foreground)" : "var(--foreground)"
  const border = active ? "var(--primary)" : "var(--border)"
  const label = price != null ? formatCurrency(price) : ""

  const pill = label
    ? `<div style="padding:6px 12px;border-radius:9999px;background:${bg};color:${fg};font-size:12px;font-weight:700;white-space:nowrap;border:1.5px solid ${border};">${label}</div>`
    : `<div style="width:14px;height:14px;border-radius:9999px;background:${bg};border:2px solid ${fg};"></div>`
  const tail = label
    ? `<div style="width:9px;height:9px;background:${bg};border-right:1.5px solid ${border};border-bottom:1.5px solid ${border};border-radius:0 0 2px 0;transform:translateY(-5px) rotate(45deg);"></div>`
    : ""

  return L.divIcon({
    className: "",
    html: `<div style="transform:translate(-50%,-100%);display:flex;flex-direction:column;align-items:center;filter:drop-shadow(0 6px 8px rgba(0,0,0,.45));">
      ${pill}
      ${tail}
    </div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  })
}

function FitBounds({ spots }: { spots: MapSpot[] }) {
  const map = useMap()
  useEffect(() => {
    if (spots.length === 0) return
    if (spots.length === 1) {
      map.setView([spots[0].lat, spots[0].lng], map.getZoom())
      return
    }
    const bounds = L.latLngBounds(spots.map((s) => [s.lat, s.lng] as [number, number]))
    map.fitBounds(bounds, { padding: [40, 40] })
  }, [map, spots])
  return null
}

// Restyles Leaflet's own DOM controls (zoom buttons, attribution) to match
// the app's dark theme — Leaflet ships them as plain light-mode HTML/CSS
// with no theming hook, so this has to happen via a scoped style override.
function MapChrome() {
  return (
    <style jsx global>{`
      .wheelo-map .leaflet-control-zoom {
        border: 1px solid var(--border) !important;
        border-radius: 0.75rem !important;
        overflow: hidden;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.35) !important;
      }
      .wheelo-map .leaflet-control-zoom a {
        background: var(--card) !important;
        color: var(--foreground) !important;
        border-color: var(--border) !important;
      }
      .wheelo-map .leaflet-control-zoom a:hover {
        background: var(--secondary) !important;
      }
      .wheelo-map .leaflet-control-attribution {
        background: color-mix(in oklch, var(--card) 85%, transparent) !important;
        color: var(--muted-foreground) !important;
        border-radius: 0.5rem 0 0 0;
      }
      .wheelo-map .leaflet-control-attribution a {
        color: var(--foreground) !important;
      }
    `}</style>
  )
}

export function LeafletMap({
  spots,
  className,
  activeId,
  onSelectId,
  zoom = 14,
}: {
  spots: MapSpot[]
  className?: string
  activeId?: string
  onSelectId?: (id: string) => void
  zoom?: number
}) {
  const center: [number, number] = spots.length > 0 ? [spots[0].lat, spots[0].lng] : ROSARIO_CENTER

  return (
    <div className={cn("wheelo-map overflow-hidden rounded-2xl border border-border", className)}>
      <MapChrome />
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", background: "var(--card)" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={19}
        />
        <FitBounds spots={spots} />
        {spots.map((spot) => (
          <Marker
            key={spot.id}
            position={[spot.lat, spot.lng]}
            icon={buildIcon(spot.price, spot.id === activeId)}
            eventHandlers={onSelectId ? { click: () => onSelectId(spot.id) } : undefined}
          />
        ))}
      </MapContainer>
    </div>
  )
}
