export function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatKm(km: number) {
  if (km < 1) {
    return `${Math.round(km * 1000)} m`
  }
  return `${km.toLocaleString("es-AR", { maximumFractionDigits: 1 })} km`
}
