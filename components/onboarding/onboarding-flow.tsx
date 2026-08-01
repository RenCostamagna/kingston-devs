"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
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

export function OnboardingFlow() {
  const router = useRouter()
  const [index, setIndex] = useState(0)
  const isLast = index === SLIDES.length - 1
  const slide = SLIDES[index]

  function finish() {
    router.push("/")
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="flex justify-between px-5 pt-6">
        <span className="text-lg font-bold tracking-tight">
          wheelo<span className="text-primary">.</span>
        </span>
        <button onClick={finish} className="text-sm font-medium text-muted-foreground hover:text-foreground">
          Saltar
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 text-center">
        <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-3xl border border-border bg-card">
          <Image src={slide.image || "/placeholder.svg"} alt="" fill className="object-cover" priority />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-balance">{slide.title}</h1>
          <p className="max-w-sm text-pretty text-muted-foreground leading-relaxed">{slide.text}</p>
        </div>
        <div className="flex gap-2" role="tablist" aria-label="Progreso">
          {SLIDES.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-2 rounded-full transition-all",
                i === index ? "w-6 bg-primary" : "w-2 bg-muted",
              )}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 p-6">
        <Button
          size="lg"
          className="w-full rounded-full"
          onClick={() => (isLast ? finish() : setIndex((i) => i + 1))}
        >
          {isLast ? "Empezar" : "Siguiente"}
          <ArrowRight data-icon="inline-end" />
        </Button>
      </div>
    </div>
  )
}
