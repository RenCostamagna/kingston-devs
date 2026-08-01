import { NextResponse } from "next/server"

import { ACARA_API, ACARA_VEHICLE_TYPE_CAR, dedupeByName, type AcaraItem } from "@/lib/acara"

// Guía Oficial de Precios de ACARA — acara.org.ar/guia-oficial-de-precios
export async function GET() {
  try {
    const res = await fetch(`${ACARA_API}/brand-list?vehiculeType=${ACARA_VEHICLE_TYPE_CAR}`, {
      // La guía se actualiza mensualmente: cacheamos un día.
      next: { revalidate: 86400 },
    })

    if (!res.ok) {
      return NextResponse.json({ error: "No pudimos obtener las marcas de ACARA" }, { status: 502 })
    }

    const json = (await res.json()) as { data?: AcaraItem[] }
    return NextResponse.json({ data: dedupeByName(json.data ?? []) })
  } catch {
    return NextResponse.json({ error: "No pudimos obtener las marcas de ACARA" }, { status: 502 })
  }
}
