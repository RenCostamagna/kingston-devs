"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Check, MapPin } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group"
import { MapPlaceholder } from "@/components/map-placeholder"
import { allFeatures, featureLabels, type ParkingFeature } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const STEPS = ["Ubicación", "Detalles", "Precio", "Listo"]

export function PublishForm() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [address, setAddress] = useState("")
  const [type, setType] = useState("cubierta")
  const [features, setFeatures] = useState<string[]>(["camara", "techada"])
  const [price, setPrice] = useState("1200")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const progress = ((step + 1) / STEPS.length) * 100

  function next() {
    if (step === 0 && !address.trim()) {
      toast.error("Ingresá la dirección de tu cochera")
      return
    }
    if (step < STEPS.length - 1) setStep((s) => s + 1)
  }
  function back() {
    if (step > 0) setStep((s) => s - 1)
    else router.back()
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={back} aria-label="Volver">
          <ArrowLeft />
        </Button>
        <div className="flex-1">
          <p className="text-sm font-semibold">Publicar cochera</p>
          <p className="text-xs text-muted-foreground">
            Paso {step + 1} de {STEPS.length} · {STEPS[step]}
          </p>
        </div>
      </header>

      <div className="px-4 pt-4">
        <Progress value={progress} />
      </div>

      <div className="flex-1 px-4 py-5">
        {step === 0 && (
          <FieldGroup>
            <div>
              <h2 className="text-xl font-bold text-balance">¿Dónde está tu cochera?</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Los conductores verán la ubicación aproximada hasta confirmar la reserva.
              </p>
            </div>
            <Field>
              <FieldLabel htmlFor="address">Dirección</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="address"
                  placeholder="Av. Corrientes 1234, CABA"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <InputGroupAddon>
                  <MapPin className="size-4 text-muted-foreground" />
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription>Incluí calle, altura y barrio.</FieldDescription>
            </Field>
            <div className="overflow-hidden rounded-2xl border border-border">
              <MapPlaceholder className="h-52" showCenter />
            </div>
          </FieldGroup>
        )}

        {step === 1 && (
          <FieldGroup>
            <div>
              <h2 className="text-xl font-bold text-balance">Contanos los detalles</h2>
              <p className="mt-1 text-sm text-muted-foreground">Esto ayuda a que tu cochera destaque.</p>
            </div>
            <Field>
              <FieldLabel htmlFor="title">Título del anuncio</FieldLabel>
              <Input
                id="title"
                placeholder="Cochera cubierta con seguridad 24hs"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel>Tipo de cochera</FieldLabel>
              <ToggleGroup
                type="single"
                value={type}
                onValueChange={(v) => v && setType(v)}
                variant="outline"
                className="w-full"
              >
                <ToggleGroupItem value="cubierta" className="flex-1">
                  Cubierta
                </ToggleGroupItem>
                <ToggleGroupItem value="descubierta" className="flex-1">
                  Descubierta
                </ToggleGroupItem>
                <ToggleGroupItem value="garage" className="flex-1">
                  Garage
                </ToggleGroupItem>
              </ToggleGroup>
            </Field>
            <Field>
              <FieldLabel>Comodidades</FieldLabel>
              <ToggleGroup
                type="multiple"
                value={features}
                onValueChange={setFeatures}
                variant="outline"
                className="flex flex-wrap justify-start gap-2"
              >
                {allFeatures.map((f) => (
                  <ToggleGroupItem key={f} value={f} className="rounded-full">
                    {featureLabels[f as ParkingFeature]}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </Field>
            <Field>
              <FieldLabel htmlFor="desc">Descripción</FieldLabel>
              <Textarea
                id="desc"
                rows={4}
                placeholder="Contá cómo es el acceso, horarios disponibles, tamaño del vehículo, etc."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Field>
          </FieldGroup>
        )}

        {step === 2 && (
          <FieldGroup>
            <div>
              <h2 className="text-xl font-bold text-balance">Definí tu precio</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Cocheras similares en tu zona cobran entre $900 y $1.500 por hora.
              </p>
            </div>
            <Field>
              <FieldLabel htmlFor="price">Precio por hora</FieldLabel>
              <InputGroup>
                <InputGroupAddon>$</InputGroupAddon>
                <InputGroupInput
                  id="price"
                  inputMode="numeric"
                  value={price}
                  onChange={(e) => setPrice(e.target.value.replace(/\D/g, ""))}
                />
                <InputGroupAddon align="inline-end">ARS / hora</InputGroupAddon>
              </InputGroup>
            </Field>
            <div className="rounded-2xl border border-border bg-card p-4">
              <p className="text-sm text-muted-foreground">Ganancia estimada</p>
              <p className="mt-1 text-2xl font-bold text-primary">
                ${(Number(price || 0) * 4 * 22).toLocaleString("es-AR")}
                <span className="text-sm font-medium text-muted-foreground"> /mes</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Estimado con 4 horas de uso por día, 22 días al mes.
              </p>
            </div>
          </FieldGroup>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center gap-4 pt-8 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Check className="size-8" />
            </div>
            <h2 className="text-2xl font-bold text-balance">¡Tu cochera está lista para publicarse!</h2>
            <p className="max-w-sm text-sm text-muted-foreground text-pretty">
              Revisá el resumen y publicá. Vas a poder editar todo desde tu panel cuando quieras.
            </p>
            <div className="w-full rounded-2xl border border-border bg-card p-4 text-left">
              <dl className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Dirección</dt>
                  <dd className="truncate font-medium">{address || "—"}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Tipo</dt>
                  <dd className="font-medium capitalize">{type}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Precio</dt>
                  <dd className="font-medium text-primary">${Number(price || 0).toLocaleString("es-AR")} /hora</dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </div>

      <div className="sticky bottom-0 border-t border-border bg-background/90 p-4 backdrop-blur">
        {step < STEPS.length - 1 ? (
          <Button className={cn("w-full rounded-full")} size="lg" onClick={next}>
            Continuar
            <ArrowRight data-icon="inline-end" />
          </Button>
        ) : (
          <Button
            className="w-full rounded-full"
            size="lg"
            onClick={() => {
              toast.success("¡Cochera publicada con éxito!")
              router.push("/")
            }}
          >
            Publicar cochera
          </Button>
        )}
      </div>
    </div>
  )
}
