import { MapPin, Navigation } from "lucide-react"

import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/format"

type Pin = { top: string; left: string; price?: number; active?: boolean }

export function MapPlaceholder({
  className,
  pins = [],
  showCenter = true,
}: {
  className?: string
  pins?: Pin[]
  showCenter?: boolean
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-border bg-secondary", className)}>
      {/* Stylized street grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(1 0 0 / 8%) 1px, transparent 1px), linear-gradient(to bottom, oklch(1 0 0 / 8%) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(115deg, transparent 0 46%, oklch(0.87 0.21 128 / 18%) 46% 54%, transparent 54%), linear-gradient(30deg, transparent 0 62%, oklch(1 0 0 / 10%) 62% 66%, transparent 66%)",
        }}
      />

      {pins.map((pin, i) => (
        <div key={i} className="absolute -translate-x-1/2 -translate-y-full" style={{ top: pin.top, left: pin.left }}>
          {pin.price != null ? (
            <span
              className={cn(
                "flex items-center rounded-full px-2.5 py-1 text-xs font-bold shadow-lg",
                pin.active ? "bg-primary text-primary-foreground" : "bg-card text-foreground",
              )}
            >
              {formatCurrency(pin.price)}
            </span>
          ) : (
            <MapPin className="size-6 fill-primary text-primary-foreground drop-shadow" />
          )}
        </div>
      ))}

      {showCenter && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="relative flex size-4 items-center justify-center">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/50" />
            <span className="relative inline-flex size-3 rounded-full bg-primary ring-2 ring-background" />
          </span>
        </div>
      )}

      <button
        type="button"
        className="absolute bottom-3 right-3 flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md"
        aria-label="Centrar mapa en mi ubicación"
      >
        <Navigation className="size-4" />
      </button>
    </div>
  )
}
