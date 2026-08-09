import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function ModuleHeader({
  title,
  subtitle,
  backHref = "/",
}: {
  title: string
  subtitle?: string
  backHref?: string
}) {
  return (
    <header className="flex items-center gap-3 px-5 pt-6">
      <Link
        href={backHref}
        aria-label="Volver"
        className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary"
      >
        <ArrowLeft className="size-5" />
      </Link>
      <div className="min-w-0">
        <h1 className="truncate text-xl font-bold">{title}</h1>
        {subtitle && <p className="truncate text-sm text-muted-foreground">{subtitle}</p>}
      </div>
    </header>
  )
}
