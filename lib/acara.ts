// Helpers compartidos (servidor + cliente) para la Guía Oficial de Precios de ACARA.
// Fuente: https://www.acara.org.ar/guia-oficial-de-precios

export const ACARA_API = "https://api.acara.org.ar/api/v1/prices"
export const ACARA_VEHICLE_TYPE_CAR = 1

export type AcaraItem = { id: number; name: string }

/** ACARA devuelve el mismo nombre con varios ids (0km y usado). */
export function dedupeByName(items: AcaraItem[]): AcaraItem[] {
  const seen = new Map<string, AcaraItem>()
  for (const item of items) {
    const key = item.name.trim().toUpperCase()
    if (key && !seen.has(key)) seen.set(key, { id: item.id, name: item.name.trim() })
  }
  return [...seen.values()].sort((a, b) => a.name.localeCompare(b.name, "es"))
}
