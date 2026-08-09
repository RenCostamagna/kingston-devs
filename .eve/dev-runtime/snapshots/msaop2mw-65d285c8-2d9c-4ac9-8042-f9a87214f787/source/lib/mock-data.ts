export type ParkingFeature = "techada" | "camara" | "grande" | "electrico" | "24hs" | "seguridad"

export type ParkingSpot = {
  id: string
  title: string
  address: string
  neighborhood: string
  pricePerHour: number
  distanceKm: number
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
    id: "palermo-01",
    title: "Cochera techada en Palermo Soho",
    address: "Honduras 4900, Palermo",
    neighborhood: "Palermo",
    pricePerHour: 850,
    distanceKm: 0.4,
    rating: 4.9,
    reviews: 128,
    image: "/parking-covered-garage.png",
    gallery: ["/parking-covered-garage.png", "/parking-garage-interior.png", "/parking-entrance-ramp.png"],
    features: ["techada", "camara", "seguridad"],
    size: "Mediana",
    host: "Martina G.",
    available: "Lun a Dom · 07 a 23 hs",
    description:
      "Cochera cubierta en el corazón de Palermo Soho, ideal para autos medianos. Acceso con control remoto, cámaras 24 hs y a metros de bares y locales.",
  },
  {
    id: "centro-02",
    title: "Estacionamiento amplio Microcentro",
    address: "Av. Corrientes 800, Centro",
    neighborhood: "Microcentro",
    pricePerHour: 620,
    distanceKm: 1.2,
    rating: 4.6,
    reviews: 74,
    image: "/parking-open-lot-city.png",
    gallery: ["/parking-open-lot-city.png", "/parking-garage-interior.png"],
    features: ["grande", "24hs", "seguridad"],
    size: "Grande",
    host: "Estacionamiento Río",
    available: "Todos los días · 24 hs",
    description:
      "Playa de estacionamiento con espacios amplios para SUV y camionetas. Abierto las 24 horas con personal de seguridad permanente.",
  },
  {
    id: "belgrano-03",
    title: "Garage privado en Belgrano",
    address: "Cabildo 2200, Belgrano",
    neighborhood: "Belgrano",
    pricePerHour: 700,
    distanceKm: 2.1,
    rating: 4.8,
    reviews: 53,
    image: "/parking-private-garage-house.png",
    gallery: ["/parking-private-garage-house.png", "/parking-covered-garage.png"],
    features: ["techada", "electrico"],
    size: "Mediana",
    host: "Carlos M.",
    available: "Lun a Sáb · 08 a 22 hs",
    description:
      "Garage privado en casa de familia, con cargador para autos eléctricos incluido. Muy seguro y tranquilo, sobre calle interna.",
  },
  {
    id: "recoleta-04",
    title: "Cochera premium Recoleta",
    address: "Av. Callao 1300, Recoleta",
    neighborhood: "Recoleta",
    pricePerHour: 980,
    distanceKm: 1.8,
    rating: 5.0,
    reviews: 96,
    image: "/parking-luxury-underground.png",
    gallery: ["/parking-luxury-underground.png", "/parking-garage-interior.png", "/parking-entrance-ramp.png"],
    features: ["techada", "camara", "seguridad", "24hs"],
    size: "Grande",
    host: "Torre Callao",
    available: "Todos los días · 24 hs",
    description:
      "Cochera subterránea premium en edificio con seguridad las 24 horas, cámaras y espacios extra amplios. Ideal para vehículos de alta gama.",
  },
  {
    id: "caballito-05",
    title: "Espacio cubierto Caballito",
    address: "Av. Rivadavia 5000, Caballito",
    neighborhood: "Caballito",
    pricePerHour: 540,
    distanceKm: 3.4,
    rating: 4.5,
    reviews: 41,
    image: "/parking-covered-spot-residential.png",
    gallery: ["/parking-covered-spot-residential.png", "/parking-private-garage-house.png"],
    features: ["techada", "camara"],
    size: "Chica",
    host: "Lucía P.",
    available: "Lun a Vie · 07 a 20 hs",
    description:
      "Espacio cubierto en cochera comunitaria, perfecto para autos chicos. Cámaras de seguridad y acceso rápido desde Av. Rivadavia.",
  },
  {
    id: "nunez-06",
    title: "Cochera cerca del estadio",
    address: "Av. Libertador 8000, Núñez",
    neighborhood: "Núñez",
    pricePerHour: 760,
    distanceKm: 4.7,
    rating: 4.7,
    reviews: 62,
    image: "/parking-lot-near-stadium.png",
    gallery: ["/parking-lot-near-stadium.png", "/parking-open-lot-city.png"],
    features: ["grande", "seguridad"],
    size: "Grande",
    host: "Playón Norte",
    available: "Todos los días · 06 a 24 hs",
    description:
      "Playón amplio a pocas cuadras del estadio, ideal para eventos y partidos. Gran capacidad y seguridad reforzada los días de espectáculo.",
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
    monthly: 18400,
    coverage: "Todo riesgo",
    vsAverage: -12,
    badge: "Mejor precio",
  },
  {
    id: "ins-02",
    name: "Sancor Seguros",
    monthly: 19900,
    coverage: "Todo riesgo",
    vsAverage: -4,
  },
  {
    id: "ins-03",
    name: "La Caja",
    monthly: 21500,
    coverage: "Todo riesgo",
    vsAverage: 3,
  },
  {
    id: "ins-04",
    name: "Mercantil Andina",
    monthly: 22800,
    coverage: "Todo riesgo",
    vsAverage: 9,
  },
]

export const historicalAverage = 20700
