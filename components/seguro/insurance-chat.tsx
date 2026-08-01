"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Send, Sparkles } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from "@/components/ui/input-group"
import { QuoteCards } from "@/components/seguro/quote-cards"
import { defaultProfile, loadProfile, type UserProfile } from "@/lib/profile"
import { cn } from "@/lib/utils"

type Msg = {
  id: number
  role: "assistant" | "user"
  text?: string
  quotes?: boolean
}

type Step = { prompt: string; suggestions: string[]; reply: string; quotesAfter?: boolean }

// Scripted assistant flow built from the onboarding profile so it already knows
// the vehicle, its use and its usual zone — and only asks what's still missing.
function buildScript(p: UserProfile): Step[] {
  return [
    {
      prompt: `Detecté tu ${p.brand} ${p.model} ${p.year} (${p.plate}) · uso ${p.use.toLowerCase()} en ${p.zone}. ¿Qué tipo de cobertura buscás?`,
      suggestions: ["Todo riesgo", "Terceros completo", "Responsabilidad civil"],
      reply: "Excelente elección. ¿Dónde guardás el auto habitualmente? Esto impacta en el precio.",
    },
    {
      prompt: "",
      suggestions: ["En cochera", "En la calle"],
      reply: "Genial, ya tengo todo. Estoy comparando aseguradoras para tu perfil...",
      quotesAfter: true,
    },
  ]
}

let nextId = 1

export function InsuranceChat() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile>(defaultProfile)
  const [messages, setMessages] = useState<Msg[]>([])
  const [stepIndex, setStepIndex] = useState(0)
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  // Sugerencias de la fase posterior a la cotización (elegir otra aseguradora).
  const [followup, setFollowup] = useState<string[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  const script = useMemo(() => buildScript(profile), [profile])

  // Seed the greeting once on mount from the stored profile (client-only) to
  // avoid a hydration mismatch on the personalized text.
  useEffect(() => {
    const p = loadProfile()
    setProfile(p)
    setMessages([{ id: 0, role: "assistant", text: buildScript(p)[0].prompt }])
  }, [])

  const done = stepIndex >= script.length
  const currentSuggestions = !done && !typing ? script[stepIndex]?.suggestions ?? [] : []

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, typing])

  function send(text: string) {
    const value = text.trim()
    if (!value || typing || done) return
    setInput("")
    const step = script[stepIndex]
    setMessages((m) => [...m, { id: nextId++, role: "user", text: value }])
    setTyping(true)

    setTimeout(() => {
      setTyping(false)
      setMessages((m) => [...m, { id: nextId++, role: "assistant", text: step.reply }])
      setStepIndex((s) => s + 1)

      // Antes de mostrar las cotizaciones, el agente "piensa" un poco más
      // mientras dice que está comparando aseguradoras, para que se sienta real.
      if (step.quotesAfter) {
        setTyping(true)
        setTimeout(() => {
          setTyping(false)
          setMessages((m) => [
            ...m,
            { id: nextId++, role: "assistant", text: "Consultando precios en tiempo real de cada aseguradora..." },
          ])
          setTyping(true)
          setTimeout(() => {
            setTyping(false)
            setMessages((m) => [...m, { id: nextId++, role: "assistant", quotes: true }])
          }, 1800)
        }, 1500)
      }
    }, 900)
  }

  // El usuario eligió una aseguradora: el agente "piensa" y confirma que envió
  // la solicitud de cotización por WhatsApp, y ofrece cotizar con otra.
  function handleSelectInsurer(name: string) {
    if (typing) return
    setFollowup([])
    setMessages((m) => [...m, { id: nextId++, role: "user", text: `Quiero cotizar con ${name}` }])
    setTyping(true)

    // Primero el agente "piensa" y avisa que está gestionando la solicitud,
    // y recién después confirma el envío por WhatsApp.
    setTimeout(() => {
      setTyping(false)
      setMessages((m) => [
        ...m,
        { id: nextId++, role: "assistant", text: `Perfecto. Estoy preparando tu solicitud de cotización para ${name}...` },
      ])
      setTyping(true)
      setTimeout(() => {
        setTyping(false)
        setMessages((m) => [
          ...m,
          {
            id: nextId++,
            role: "assistant",
            text: `Listo, le envié una solicitud de cotización a ${name} por WhatsApp. Un asesor se va a comunicar con vos en breve para avanzar. ¿Querés que cotice con otra aseguradora?`,
          },
        ])
        setFollowup(["Sí, cotizar con otra", "No, así está bien"])
      }, 2000)
    }, 1400)
  }

  // Respuesta a "¿cotizar con otra aseguradora?".
  function handleFollowup(choice: string) {
    if (typing) return
    const wantsMore = choice.startsWith("Sí")
    setFollowup([])
    setMessages((m) => [...m, { id: nextId++, role: "user", text: choice }])
    setTyping(true)

    setTimeout(() => {
      setTyping(false)
      setMessages((m) => [
        ...m,
        wantsMore
          ? { id: nextId++, role: "assistant" as const, text: "Perfecto, acá tenés de nuevo las opciones. Elegí la que prefieras." }
          : { id: nextId++, role: "assistant" as const, text: "Genial. Quedo a disposición para lo que necesites con tu seguro." },
        ...(wantsMore ? [{ id: nextId++, role: "assistant" as const, quotes: true }] : []),
      ])
    }, 1200)
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.push("/")} aria-label="Volver">
          <ArrowLeft />
        </Button>
        <Avatar className="size-9">
          <AvatarFallback className="bg-primary/15 text-primary">
            <Sparkles className="size-4" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="text-sm font-semibold">Asistente de seguros</p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            En línea · IA
          </p>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mx-auto flex max-w-md flex-col gap-3">
          {messages.map((m) =>
            m.quotes ? (
              <div key={m.id} className="w-full">
                <QuoteCards onSelect={handleSelectInsurer} />
              </div>
            ) : (
              <div
                key={m.id}
                className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                    m.role === "user"
                      ? "rounded-br-md bg-primary text-primary-foreground"
                      : "rounded-bl-md bg-card text-card-foreground",
                  )}
                >
                  {m.text}
                </div>
              </div>
            ),
          )}

          {typing && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-card px-4 py-3">
                <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                <span className="size-2 animate-bounce rounded-full bg-muted-foreground" />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="sticky bottom-0 flex flex-col gap-3 border-t border-border bg-background/90 p-4 backdrop-blur">
        {followup.length > 0 && !typing ? (
          <div className="flex flex-wrap gap-2">
            {followup.map((s) => (
              <Button key={s} variant="outline" size="sm" className="rounded-full" onClick={() => handleFollowup(s)}>
                {s}
              </Button>
            ))}
          </div>
        ) : (
          currentSuggestions.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {currentSuggestions.map((s) => (
                <Button key={s} variant="outline" size="sm" className="rounded-full" onClick={() => send(s)}>
                  {s}
                </Button>
              ))}
            </div>
          )
        )}
        <InputGroup>
          <InputGroupInput
            placeholder={done ? "Conversación finalizada" : "Escribí tu respuesta..."}
            value={input}
            disabled={done}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                e.preventDefault()
                send(input)
              }
            }}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size="icon-xs"
              variant="default"
              disabled={done || !input.trim()}
              onClick={() => send(input)}
              aria-label="Enviar"
            >
              <Send />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  )
}
