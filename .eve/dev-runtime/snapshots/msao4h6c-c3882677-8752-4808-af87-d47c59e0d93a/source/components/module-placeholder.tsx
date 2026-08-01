import Link from "next/link"
import type { LucideIcon } from "lucide-react"

import { AppShell } from "@/components/app-shell"
import { ModuleHeader } from "@/components/module-header"
import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"

export function ModulePlaceholder({
  title,
  subtitle,
  icon: Icon,
  description,
}: {
  title: string
  subtitle: string
  icon: LucideIcon
  description: string
}) {
  return (
    <AppShell>
      <ModuleHeader title={title} subtitle={subtitle} />

      <main className="mt-10 flex flex-col px-5">
        <Empty className="border border-border bg-card py-12">
          <EmptyHeader>
            <EmptyMedia className="size-16 rounded-2xl bg-primary/15">
              <Icon className="size-8 text-primary" />
            </EmptyMedia>
            <EmptyTitle className="text-lg">Próximamente</EmptyTitle>
            <EmptyDescription>{description}</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              render={<Link href="/" />}
              nativeButton={false}
              variant="outline"
              className="rounded-full"
            >
              Volver al inicio
            </Button>
          </EmptyContent>
        </Empty>
      </main>
    </AppShell>
  )
}
