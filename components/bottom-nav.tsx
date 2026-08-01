"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Shield } from "lucide-react"

import { cn } from "@/lib/utils"

const items = [
  { href: "/", label: "Home", icon: Home, primary: true },
  { href: "/buscar", label: "Buscar", icon: Search, primary: true },
  { href: "/seguro", label: "Seguro", icon: Shield, primary: false },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Navegación principal"
      className="fixed inset-x-0 bottom-0 z-40 mx-auto flex max-w-md items-stretch justify-around border-t border-border bg-card/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur"
    >
      {items.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
              item.primary ? "" : "opacity-60",
              active ? "text-primary opacity-100" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className={cn(item.primary ? "size-6" : "size-5")} strokeWidth={active ? 2.4 : 2} />
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
