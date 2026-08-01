import { parkingSpots } from "./mock-data"

export type MockPlace = {
  id: string
  label: string
  sublabel: string
  /** Text used to actually filter parkingSpots — matches label/sublabel by design. */
  query: string
}

// Built from the real mock spots so every suggestion is guaranteed to return
// at least one result — no dead-end "0 resultados" from picking a suggestion.
const PLACES: MockPlace[] = parkingSpots.map((s) => ({
  id: s.id,
  label: s.neighborhood,
  sublabel: s.address,
  query: s.neighborhood,
}))

export function mockPlaceSuggestions(query: string, limit = 5): MockPlace[] {
  const q = query.trim().toLowerCase()
  const pool = q
    ? PLACES.filter((p) => p.label.toLowerCase().includes(q) || p.sublabel.toLowerCase().includes(q))
    : PLACES
  return pool.slice(0, limit)
}
