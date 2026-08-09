import { Camera, Car, Clock, Maximize, Plug, ShieldCheck, Umbrella } from "lucide-react"

import { featureLabels, type ParkingFeature } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const iconMap: Record<ParkingFeature, typeof Camera> = {
  techada: Umbrella,
  camara: Camera,
  grande: Maximize,
  electrico: Plug,
  "24hs": Clock,
  seguridad: ShieldCheck,
}

export function FeatureBadge({ feature, className }: { feature: ParkingFeature; className?: string }) {
  const Icon = iconMap[feature] ?? Car
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground",
        className,
      )}
    >
      <Icon className="size-3.5 text-primary" />
      {featureLabels[feature]}
    </span>
  )
}

export function FeatureIcon({ feature, className }: { feature: ParkingFeature; className?: string }) {
  const Icon = iconMap[feature] ?? Car
  return <Icon className={cn("size-4", className)} />
}
