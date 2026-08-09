import { Check, TrendingDown, TrendingUp } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/format"
import { historicalAverage, insurers } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export function QuoteCards({ onSelect }: { onSelect: (name: string) => void }) {
  const sorted = [...insurers].sort((a, b) => a.monthly - b.monthly)
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-xl border border-border bg-background/60 p-3 text-xs text-muted-foreground">
        Promedio histórico del mercado para tu perfil:{" "}
        <span className="font-semibold text-foreground">{formatCurrency(historicalAverage)}/mes</span>
      </div>
      {sorted.map((ins, i) => {
        const cheaper = ins.vsAverage < 0
        return (
          <div
            key={ins.id}
            className={cn(
              "flex flex-col gap-3 rounded-2xl border bg-card p-4",
              i === 0 ? "border-primary" : "border-border",
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{ins.name}</p>
                  {i === 0 && <Badge className="rounded-full">Mejor precio</Badge>}
                </div>
                <p className="text-xs text-muted-foreground">{ins.coverage}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-primary">{formatCurrency(ins.monthly)}</p>
                <p className="text-[11px] text-muted-foreground">/mes</p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span
                className={cn(
                  "inline-flex items-center gap-1 text-xs font-medium",
                  cheaper ? "text-primary" : "text-muted-foreground",
                )}
              >
                {cheaper ? <TrendingDown className="size-3.5" /> : <TrendingUp className="size-3.5" />}
                {Math.abs(ins.vsAverage)}% {cheaper ? "bajo" : "sobre"} el promedio
              </span>
              <Button size="sm" variant={i === 0 ? "default" : "outline"} className="rounded-full" onClick={() => onSelect(ins.name)}>
                <Check data-icon="inline-start" />
                Elegir
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
