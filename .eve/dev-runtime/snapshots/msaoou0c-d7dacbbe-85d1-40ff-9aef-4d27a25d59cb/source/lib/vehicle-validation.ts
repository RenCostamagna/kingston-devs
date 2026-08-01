// Validaciones de patente y año para vehículos radicados en Argentina.

/** Patente vieja: AAA123 (vigente hasta 2016). */
const PLATE_OLD = /^[A-Z]{3}\d{3}$/
/** Patente Mercosur: AA123BB (desde 2016). */
const PLATE_MERCOSUR = /^[A-Z]{2}\d{3}[A-Z]{2}$/

export const MIN_YEAR = 1950

export function maxYear() {
  return new Date().getFullYear() + 1
}

/** Quita espacios, guiones y pasa a mayúsculas: "ae 482 kp" -> "AE482KP". */
export function normalizePlate(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "")
}

/** Muestra la patente separada: "AE482KP" -> "AE 482 KP", "ABC123" -> "ABC 123". */
export function formatPlate(plate: string) {
  const p = normalizePlate(plate)
  if (PLATE_MERCOSUR.test(p)) return `${p.slice(0, 2)} ${p.slice(2, 5)} ${p.slice(5)}`
  if (PLATE_OLD.test(p)) return `${p.slice(0, 3)} ${p.slice(3)}`
  return p
}

export function isValidPlate(value: string) {
  const p = normalizePlate(value)
  return PLATE_OLD.test(p) || PLATE_MERCOSUR.test(p)
}

/** Devuelve el mensaje de error o null si la patente es válida. */
export function validatePlate(value: string): string | null {
  const p = normalizePlate(value)
  if (!p) return "Ingresá la patente de tu vehículo."
  if (!isValidPlate(p)) return "Formato inválido. Usá AAA123 o AA123BB."
  return null
}

/** Devuelve el mensaje de error o null si el año es válido. */
export function validateYear(value: string): string | null {
  if (!value.trim()) return "Ingresá el año del vehículo."
  if (!/^\d{4}$/.test(value.trim())) return "El año debe tener 4 dígitos."

  const year = Number(value)
  const max = maxYear()
  if (year < MIN_YEAR || year > max) return `Ingresá un año entre ${MIN_YEAR} y ${max}.`
  return null
}
