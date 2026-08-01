"use client"

import dynamic from "next/dynamic"

import type { MapSpot } from "@/components/leaflet-map"

// Leaflet touches `window`/`document` at module load, which breaks Next's
// server render pass — this must never be part of the SSR bundle.
const LeafletMap = dynamic(() => import("@/components/leaflet-map").then((m) => m.LeafletMap), {
  ssr: false,
  loading: () => <div className="size-full animate-pulse rounded-2xl border border-border bg-secondary" />,
})

export type { MapSpot }

export function MapView({
  spots,
  className,
  activeId,
  onSelectId,
  zoom,
}: {
  spots: MapSpot[]
  className?: string
  activeId?: string
  onSelectId?: (id: string) => void
  zoom?: number
}) {
  return <LeafletMap spots={spots} activeId={activeId} onSelectId={onSelectId} zoom={zoom} className={className} />
}
