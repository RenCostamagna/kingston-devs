import { cn } from "@/lib/utils"
import { statusLabel, type Status } from "@/lib/vehicle-insights"

/** Semáforo compartido por vencimientos y mantenimiento. */
const styles: Record<Status, string> = {
  ok: "bg-primary/15 text-primary",
  soon: "bg-accent/20 text-accent-foreground",
  due: "bg-destructive/15 text-destructive",
  unknown: "bg-muted text-muted-foreground",
}

export function StatusPill({
  status,
  children,
  className,
}: {
  status: Status
  children?: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-medium",
        styles[status],
        className,
      )}
    >
      {children ?? statusLabel[status]}
    </span>
  )
}

/** Punto de color para listas densas. */
export function StatusDot({ status }: { status: Status }) {
  const dot: Record<Status, string> = {
    ok: "bg-primary",
    soon: "bg-accent",
    due: "bg-destructive",
    unknown: "bg-muted-foreground/40",
  }
  return <span className={cn("size-2 shrink-0 rounded-full", dot[status])} aria-hidden="true" />
}
