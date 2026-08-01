export type ParkingFeature = "techada" | "camara" | "grande" | "electrico" | "24hs" | "seguridad"

export type ParkingSpot = {
  id: string
  title: string
  address: string
  neighborhood: string
  pricePerHour: number
  monthlyPrice: number
  distanceKm: number
  /** Real-world coordinates in Rosario, Argentina, for the map. */
  lat: number
  lng: number
  rating: number
  reviews: number
  image: string
  gallery: string[]
  features: ParkingFeature[]
  size: "Chica" | "Mediana" | "Grande"
  host: string
  available: string
  description: string
}

export const featureLabels: Record<ParkingFeature, string> = {
  techada: "Techada",
  camara: "Cámara",
  grande: "Espacio amplio",
  electrico: "Carga eléctrica",
  "24hs": "24 hs",
  seguridad: "Seguridad",
}

export const allFeatures: ParkingFeature[] = [
  "techada",
  "camara",
  "grande",
  "electrico",
  "24hs",
  "seguridad",
]

export const parkingSpots: ParkingSpot[] = [
  {
    id: "pichincha-01",
    title: "Cochera techada en Pichincha",
    address: "Presidente Roca 1250, Pichincha",
    neighborhood: "Pichincha",
    pricePerHour: 700,
    monthlyPrice: 65000,
    distanceKm: 0.6,
    lat: -32.943,
    lng: -60.648,
    rating: 4.8,
    reviews: 94,
    image: "/parking-covered-garage.png",
    gallery: ["/parking-covered-garage.png", "/parking-garage-interior.png", "/parking-entrance-ramp.png"],
    features: ["techada", "camara", "seguridad"],
    size: "Mediana",
    host: "Martina G.",
    available: "Lun a Dom · 07 a 23 hs",
    description:
      "Cochera cubierta en el corazón de Pichincha, a pasos de los bares y restaurantes del barrio. Acceso con control remoto y cámaras 24 hs.",
  },
  {
    id: "puerto-norte-02",
    title: "Estacionamiento Puerto Norte",
    address: "Av. de los Inmigrantes 420, Puerto Norte",
    neighborhood: "Puerto Norte",
    pricePerHour: 850,
    monthlyPrice: 78000,
    distanceKm: 1.4,
    lat: -32.927,
    lng: -60.636,
    rating: 4.9,
    reviews: 61,
    image: "/parking-open-lot-city.png",
    gallery: ["/parking-open-lot-city.png", "/parking-garage-interior.png"],
    features: ["grande", "24hs", "seguridad"],
    size: "Grande",
    host: "Torre del Puerto",
    available: "Todos los días · 24 hs",
    description:
      "Playa de estacionamiento frente al río en Puerto Norte, con espacios amplios para SUV y camionetas. Seguridad permanente y cámaras.",
  },
  {
    id: "centro-monumento-03",
    title: "Cochera Centro - Monumento a la Bandera",
    address: "Av. Belgrano 250, Centro",
    neighborhood: "Centro",
    pricePerHour: 620,
    monthlyPrice: 58000,
    distanceKm: 0.3,
    lat: -32.9475,
    lng: -60.639,
    rating: 4.6,
    reviews: 112,
    image: "/parking-luxury-underground.png",
    gallery: ["/parking-luxury-underground.png", "/parking-garage-interior.png", "/parking-entrance-ramp.png"],
    features: ["techada", "camara", "seguridad", "24hs"],
    size: "Grande",
    host: "Estacionamiento Monumento",
    available: "Todos los días · 24 hs",
    description:
      "Cochera subterránea a metros del Monumento a la Bandera, ideal para quienes trabajan o pasean por el centro de Rosario.",
  },
  {
    id: "fisherton-04",
    title: "Garage privado en Fisherton",
    address: "Ovidio Lagos 5520, Fisherton",
    neighborhood: "Fisherton",
    pricePerHour: 540,
    monthlyPrice: 48000,
    distanceKm: 5.8,
    lat: -32.9605,
    lng: -60.718,
    rating: 4.7,
    reviews: 38,
    image: "/parking-private-garage-house.png",
    gallery: ["/parking-private-garage-house.png", "/parking-covered-spot-residential.png"],
    features: ["techada", "electrico"],
    size: "Mediana",
    host: "Carlos M.",
    available: "Lun a Sáb · 08 a 22 hs",
    description:
      "Garage privado en casa de familia en Fisherton, con cargador para autos eléctricos incluido. Zona tranquila y residencial.",
  },
]

export function getParkingSpot(id: string) {
  return parkingSpots.find((s) => s.id === id)
}

export type VehicleUse = "Particular" | "Comercial"
export type FuelType = "Nafta" | "Diésel" | "GNC" | "Híbrido" | "Eléctrico"
export type UsagePreference = "precio" | "cercania" | "rapidez"

export type Vehicle = {
  brand: string
  model: string
  year: number
  plate: string
  mileage: number
  fuel: FuelType
  use: VehicleUse
  zone: string
  preference: UsagePreference
}

export const vehicle: Vehicle = {
  brand: "Volkswagen",
  model: "Golf",
  year: 2021,
  plate: "AE 482 KP",
  mileage: 48200,
  fuel: "Nafta",
  use: "Particular",
  zone: "Palermo, CABA",
  preference: "precio",
}

export type Insurer = {
  id: string
  name: string
  monthly: number
  coverage: string
  vsAverage: number // percentage difference vs historical average
  badge?: string
}

export const insurers: Insurer[] = [
  {
    id: "ins-01",
    name: "Zurich Seguros",
    monthly: 73600,
    coverage: "Todo riesgo",
    vsAverage: -12,
    badge: "Mejor precio",
  },
  {
    id: "ins-02",
    name: "Sancor Seguros",
    monthly: 79600,
    coverage: "Todo riesgo",
    vsAverage: -4,
  },
  {
    id: "ins-03",
    name: "La Caja",
    monthly: 86000,
    coverage: "Todo riesgo",
    vsAverage: 3,
  },
  {
    id: "ins-04",
    name: "Mercantil Andina",
    monthly: 91200,
    coverage: "Todo riesgo",
    vsAverage: 9,
  },
]

export const historicalAverage = 82800
