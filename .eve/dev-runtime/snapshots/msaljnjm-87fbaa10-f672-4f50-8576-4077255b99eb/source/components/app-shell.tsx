import type { ReactNode } from "react"

import { BottomNav } from "@/components/bottom-nav"
import { cn } from "@/lib/utils"

export function AppShell({
  children,
  hideNav = false,
  className,
}: {
  children: ReactNode
  hideNav?: boolean
  className?: string
}) {
  return (
    <div className="relative mx-auto flex min-h-dvh max-w-md flex-col bg-background">
      <div className={cn("flex-1", hideNav ? "pb-6" : "pb-24", className)}>{children}</div>
      {!hideNav && <BottomNav />}
    </div>
  )
}
