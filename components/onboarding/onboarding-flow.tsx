"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Car, Fuel, Gauge, MapPin, Wallet, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Field, FieldLabel, FieldSet, FieldLegend } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Progress } from "@/components/ui/progress"
import { ONBOARDING_KEY } from "@/components/onboarding/onboarding-gate"
import { defaultProfile, saveProfile } from "@/lib/profile"
import type { FuelType, UsagePreference, VehicleUse } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const SLIDES = [
  {
    image: "/onboarding-find.png",
    title: "Encontrá cochera en segundos",
    text: "Buscá lugares disponibles cerca tuyo, compará precios y reservá al instante desde el mapa.",
  },
  {
    image: "/onboarding-earn.png",
    title: "Generá ingresos con tu cochera",
    text: "¿Tenés un espacio libre? Publicalo gratis y empezá a ganar dinero cuando no lo uses.",
  },
  {
    image: "/onboarding-insure.png",
    title: "Asegurá tu auto con IA",
    text: "Nuestro asistente inteligente te ayuda a encontrar el mejor seguro en una conversación.",
  },
]

const FUEL_OPTIONS: FuelType[] = ["Nafta", "Diésel", "GNC", "Híbrido", "Eléctrico"]

const PREFERENCES: { value: UsagePreference; label: string; desc: string; icon: typeof Wallet }[] = [
  { value: "precio", label: "Precio", desc: "Mostrarme siempre las opciones más económicas", icon: Wallet },
  { value: "cercania", label: "Cercanía", desc: "Priorizar lo más cerca de mi ubicación", icon: MapPin },
  { value: "rapidez", label: "Rapidez", desc: "Reservar en la menor cantidad de pasos", icon: Zap },
]

// 0-2 intro slides · 3 vehicle · 4 use+zone · 5 preference · 6 summary
const TOTAL = SLIDES.length + 4

type Form = {
  brand: string
  model: string
  year: string
  fuel: FuelType | ""
  mileage: string
  use: VehicleUse | ""
  zone: string
  preference: UsagePreference | ""
}

const emptyForm: Form = {
  brand: "",
  model: "",
  year: "",
  fuel: "",
  mileage: "",
  use: "",
  zone: "",
  preference: "",
}

export function OnboardingFlow() {
  const router = useRouter()
  const [index, setIndex] = useState(0)
  const [form, setForm] = useState<Form>(emptyForm)

  const isSlide = index < SLIDES.length
  const isSummary = index === TOTAL - 1

  function set<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function complete(persist: boolean) {
    if (persist) {
      saveProfile({
        ...defaultProfile,
        brand: form.brand.trim() || defaultProfile.brand,
        model: form.model.trim() || defaultProfile.model,
        year: Number(form.year) || defaultProfile.year,
        mileage: Number(form.mileage) || defaultProfile.mileage,
        fuel: (form.fuel || defaultProfile.fuel) as FuelType,
        use: (form.use || defaultProfile.use) as VehicleUse,
        zone: form.zone.trim() || defaultProfile.zone,
        preference: (form.preference || defaultProfile.preference) as UsagePreference,
      })
    }
    localStorage.setItem(ONBOARDING_KEY, "1")
    router.push("/")
  }

  const canAdvance =
    index !== 3
      ? index !== 4
        ? index !== 5 || !!form.preference
        : !!form.use && form.zone.trim().length > 1
      : !!form.brand.trim() && !!form.model.trim() && !!form.year && !!form.fuel && !!form.mileage

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="flex items-center justify-between gap-4 px-5 pt-6">
        {index > 0 ? (
          <button
            onClick={() => setIndex((i) => i - 1)}
            className="flex size-9 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
            aria-label="Atrás"
          >
            <ArrowLeft className="size-5" />
          </button>
        ) : (
          <span className="text-lg font-bold tracking-tight">
            wheelo<span className="text-primary">.</span>
          </span>
        )}
        <button
          onClick={() => complete(false)}
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          Saltar
        </button>
      </div>

      {!isSlide && (
        <div className="px-5 pt-5">
          <Progress value={((index - SLIDES.length + 1) / 4) * 100} className="h-1.5" />
        </div>
      )}

      <div className="flex flex-1 flex-col overflow-y-auto">
        {isSlide && <SlideView slide={SLIDES[index]} index={index} />}

        {index === 3 && (
          <StepShell
            title="Contanos de tu vehículo"
            subtitle="Con estos datos personalizamos las cocheras y cotizamos tu seguro."
          >
            <Field>
              <FieldLabel htmlFor="brand">Marca</FieldLabel>
              <Input id="brand" placeholder="Ej. Volkswagen" value={form.brand} onChange={(e) => set("brand", e.target.value)} />
            </Field>
            <Field>
              <FieldLabel htmlFor="model">Modelo</FieldLabel>
              <Input id="model" placeholder="Ej. Golf" value={form.model} onChange={(e) => set("model", e.target.value)} />
            </Field>
            <div className="flex gap-3">
              <Field className="flex-1">
                <FieldLabel htmlFor="year">Año</FieldLabel>
                <Input
                  id="year"
                  inputMode="numeric"
                  placeholder="2021"
                  value={form.year}
                  onChange={(e) => set("year", e.target.value.replace(/\D/g, "").slice(0, 4))}
                />
              </Field>
              <Field className="flex-1">
                <FieldLabel htmlFor="mileage">Kilometraje</FieldLabel>
                <Input
                  id="mileage"
                  inputMode="numeric"
                  placeholder="48200"
                  value={form.mileage}
                  onChange={(e) => set("mileage", e.target.value.replace(/\D/g, "").slice(0, 7))}
                />
              </Field>
            </div>
            <FieldSet>
              <FieldLegend className="flex items-center gap-2 text-sm">
                <Fuel className="size-4 text-primary" /> Combustible
              </FieldLegend>
              <ToggleGroup
                value={form.fuel ? [form.fuel] : []}
                onValueChange={(v) => v[0] && set("fuel", v[0] as FuelType)}
                variant="outline"
                className="flex-wrap justify-start"
              >
                {FUEL_OPTIONS.map((f) => (
                  <ToggleGroupItem key={f} value={f} className="rounded-full px-4">
                    {f}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </FieldSet>
          </StepShell>
        )}

        {index === 4 && (
          <StepShell
            title="¿Cómo y dónde lo usás?"
            subtitle="El uso y la zona habitual son clave para calcular el precio del seguro."
          >
            <FieldSet>
              <FieldLegend className="text-sm">Tipo de uso</FieldLegend>
              <ToggleGroup
                value={form.use ? [form.use] : []}
                onValueChange={(v) => v[0] && set("use", v[0] as VehicleUse)}
                variant="outline"
                className="grid grid-cols-2 gap-3"
              >
                <ToggleGroupItem value="Particular" className="h-auto flex-col items-start gap-1 rounded-2xl p-4 text-left">
                  <span className="text-sm font-semibold">Particular</span>
                  <span className="text-xs text-muted-foreground">Uso personal diario</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="Comercial" className="h-auto flex-col items-start gap-1 rounded-2xl p-4 text-left">
                  <span className="text-sm font-semibold">Comercial</span>
                  <span className="text-xs text-muted-foreground">Trabajo o reparto</span>
                </ToggleGroupItem>
              </ToggleGroup>
            </FieldSet>
            <Field>
              <FieldLabel htmlFor="zone">Zona / ubicación habitual</FieldLabel>
              <Input
                id="zone"
                placeholder="Ej. Palermo, CABA"
                value={form.zone}
                onChange={(e) => set("zone", e.target.value)}
              />
            </Field>
          </StepShell>
        )}

        {index === 5 && (
          <StepShell title="¿Qué es lo más importante para vos?" subtitle="Ajustamos las recomendaciones a tu prioridad.">
            <ToggleGroup
              value={form.preference ? [form.preference] : []}
              onValueChange={(v) => v[0] && set("preference", v[0] as UsagePreference)}
              variant="outline"
              className="flex flex-col gap-3"
            >
              {PREFERENCES.map((p) => {
                const Icon = p.icon
                return (
                  <ToggleGroupItem
                    key={p.value}
                    value={p.value}
                    className="h-auto w-full justify-start gap-3 rounded-2xl p-4 text-left"
                  >
                    <span className="flex size-10 items-center justify-center rounded-xl bg-primary/15">
                      <Icon className="size-5 text-primary" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-semibold">{p.label}</span>
                      <span className="text-xs text-muted-foreground">{p.desc}</span>
                    </span>
                  </ToggleGroupItem>
                )
              })}
            </ToggleGroup>
          </StepShell>
        )}

        {isSummary && <SummaryView form={form} />}
      </div>

      <div className="p-6">
        <Button
          size="lg"
          className="w-full rounded-full"
          disabled={!isSlide && !isSummary && !canAdvance}
          onClick={() => (isSummary ? complete(true) : setIndex((i) => i + 1))}
        >
          {isSummary ? "Empezar a usar Wheelo" : isSlide ? "Siguiente" : "Continuar"}
          <ArrowRight data-icon="inline-end" />
        </Button>
      </div>
    </div>
  )
}

function SlideView({ slide, index }: { slide: (typeof SLIDES)[number]; index: number }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 text-center">
      <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-3xl border border-border bg-card">
        <Image src={slide.image || "/placeholder.svg"} alt="" fill className="object-cover" priority />
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold text-balance">{slide.title}</h1>
        <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">{slide.text}</p>
      </div>
      <div className="flex gap-2" role="tablist" aria-label="Progreso">
        {SLIDES.map((_, i) => (
          <span key={i} className={cn("h-2 rounded-full transition-all", i === index ? "w-6 bg-primary" : "w-2 bg-muted")} />
        ))}
      </div>
    </div>
  )
}

function StepShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-6 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-balance">{title}</h1>
        <p className="text-pretty leading-relaxed text-muted-foreground">{subtitle}</p>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  )
}

function SummaryView({ form }: { form: Form }) {
  const prefLabel = PREFERENCES.find((p) => p.value === form.preference)?.label ?? "Precio"
  const rows = [
    { icon: Car, label: "Vehículo", value: [form.brand, form.model, form.year].filter(Boolean).join(" ") || "—" },
    { icon: Fuel, label: "Combustible", value: form.fuel || "—" },
    { icon: Gauge, label: "Kilometraje", value: form.mileage ? `${Number(form.mileage).toLocaleString("es-AR")} km` : "—" },
    { icon: MapPin, label: "Uso y zona", value: [form.use, form.zone].filter(Boolean).join(" · ") || "—" },
    { icon: Wallet, label: "Prioridad", value: prefLabel },
  ]

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-6 pt-6">
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4">
        <p className="text-pretty leading-relaxed">
          ¡Listo{form.brand ? `, tu ${form.brand} ${form.model} ya está cargado` : ""}! Con estos datos vamos a
          mostrarte las mejores cocheras y cotizar tu seguro al instante.
        </p>
      </div>
      <div className="flex flex-col gap-1">
        {rows.map((r) => {
          const Icon = r.icon
          return (
            <div key={r.label} className="flex items-center gap-3 border-b border-border/60 py-3 last:border-0">
              <span className="flex size-9 items-center justify-center rounded-xl bg-secondary">
                <Icon className="size-4 text-primary" />
              </span>
              <span className="flex-1 text-sm text-muted-foreground">{r.label}</span>
              <span className="text-right text-sm font-semibold">{r.value}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
