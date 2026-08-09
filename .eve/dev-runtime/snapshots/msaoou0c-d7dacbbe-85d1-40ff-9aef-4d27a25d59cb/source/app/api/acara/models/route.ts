import { NextResponse } from "next/server"

import { ACARA_API, ACARA_VEHICLE_TYPE_CAR, dedupeByName, type AcaraItem } from "@/lib/acara"

// Modelos de una marca según la Guía Oficial de Precios de ACARA.
export async function GET(request: Request) {
  const brandId = new URL(request.url).searchParams.get("brandId")

  if (!brandId || !/^\d+$/.test(brandId)) {
    return NextResponse.json({ error: "brandId inválido" }, { status: 400 })
  }

  try {
    const res = await fetch(
      `${ACARA_API}/model-list?vehiculeType=${ACARA_VEHICLE_TYPE_CAR}&vehiculeBrandId=${brandId}`,
      { next: { revalidate: 86400 } },
    )

    if (!res.ok) {
      return NextResponse.json({ error: "No pudimos obtener los modelos de ACARA" }, { status: 502 })
    }

    const json = (await res.json()) as { data?: AcaraItem[] }
    // ACARA repite el mismo modelo con distintos ids (0km y usado).
    const models = dedupeByName(json.data ?? []).filter((m) => !/^todos los modelos$/i.test(m.name))

    return NextResponse.json({ data: models })
  } catch {
    return NextResponse.json({ error: "No pudimos obtener los modelos de ACARA" }, { status: 502 })
  }
}
