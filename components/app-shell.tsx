import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export function AppShell({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className="relative mx-auto flex min-h-dvh max-w-md flex-col bg-background">
      <div className={cn("flex-1 pb-6", className)}>{children}</div>
    </div>
  )
}
