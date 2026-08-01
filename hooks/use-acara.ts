"use client"

import useSWR from "swr"

import type { AcaraItem } from "@/lib/acara"

async function fetcher(url: string): Promise<AcaraItem[]> {
  const res = await fetch(url)
  if (!res.ok) throw new Error("Error al consultar la guía de ACARA")
  const json = (await res.json()) as { data?: AcaraItem[] }
  return json.data ?? []
}

const swrOptions = { revalidateOnFocus: false }

/** Marcas de autos publicadas en la Guía Oficial de Precios de ACARA. */
export function useAcaraBrands() {
  const { data, error, isLoading } = useSWR<AcaraItem[]>("/api/acara/brands", fetcher, swrOptions)
  return { brands: data ?? [], error, isLoading }
}

/** Modelos de la marca seleccionada. No dispara pedido si no hay marca. */
export function useAcaraModels(brandId: number | null) {
  const { data, error, isLoading } = useSWR<AcaraItem[]>(
    brandId ? `/api/acara/models?brandId=${brandId}` : null,
    fetcher,
    swrOptions,
  )
  return { models: data ?? [], error, isLoading }
}
