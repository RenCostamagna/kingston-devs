import Link from "next/link"
import {
  SquareParking,
  ShieldCheck,
  ReceiptText,
  TriangleAlert,
  Wrench,
  Droplets,
  type LucideIcon,
} from "lucide-react"

type Module = {
  href: string
  label: string
  description: string
  icon: LucideIcon
}

const modules: Module[] = [
  { href: "/cochera", label: "Cochera", description: "Estacioná o alquilá", icon: SquareParking },
  { href: "/seguro", label: "Seguro", description: "Cotizá y compará", icon: ShieldCheck },
  { href: "/patente", label: "Patente", description: "Pagá tu patente", icon: ReceiptText },
  { href: "/multas", label: "Multas", description: "Consultá infracciones", icon: TriangleAlert },
  { href: "/service", label: "Service", description: "Agendá tu turno", icon: Wrench },
  { href: "/lavadero", label: "Lavadero", description: "Reservá un lavado", icon: Droplets },
]

export function ModuleGrid() {
  return (
    <section className="flex flex-col gap-3 px-5">
      <h2 className="text-lg font-bold">Todo para tu auto</h2>
      <div className="grid grid-cols-2 gap-3">
        {modules.map((mod) => {
          const Icon = mod.icon
          return (
            <Link
              key={mod.href}
              href={mod.href}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-secondary"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/15">
                <Icon className="size-6 text-primary" />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="font-semibold">{mod.label}</p>
                <p className="text-xs text-muted-foreground">{mod.description}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
