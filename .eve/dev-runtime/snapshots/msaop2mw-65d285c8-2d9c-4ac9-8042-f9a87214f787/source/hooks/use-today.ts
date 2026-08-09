"use client"

import { useEffect, useState } from "react"

import { todayISO } from "@/lib/vehicle-insights"

/**
 * Fecha de hoy disponible recién después del montaje.
 * Todos los cálculos de vencimientos dependen del día actual, así que evitamos
 * resolverlos en el servidor para que el HTML inicial coincida con el del cliente.
 */
export function useToday(): string | null {
  const [today, setToday] = useState<string | null>(null)
  useEffect(() => {
    setToday(todayISO())
  }, [])
  return today
}
