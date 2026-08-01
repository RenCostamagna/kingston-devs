"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowLeft, Send, Sparkles } from "lucide-react"
import { toast } from "sonner"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from "@/components/ui/input-group"
import { QuoteCards } from "@/components/seguro/quote-cards"
import { vehicle } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

type Msg = {
  id: number
  role: "assistant" | "user"
  text?: string
  quotes?: boolean
}

// Scripted assistant flow: each user reply advances the conversation.
const SCRIPT: { prompt: string; suggestions: string[]; reply: string; quotesAfter?: boolean }[] = [
  {
    prompt: `Detecté que tenés un ${vehicle.brand} ${vehicle.model} ${vehicle.year} (${vehicle.plate}). ¿Qué tipo de cobertura buscás?`,
    suggestions: ["Todo riesgo", "Terceros completo", "Responsabilidad civil"],
    reply: "Excelente elección. ¿El auto se usa de forma particular o comercial?",
  },
  {
    prompt: "",
    suggestions: ["Particular", "Comercial"],
    reply: `Perfecto. ¿Dónde guardás el auto habitualmente? Esto impacta en el precio.`,
  },
  {
    prompt: "",
    suggestions: ["En cochera", "En la calle"],
    reply: "Genial, guardarlo en cochera reduce el riesgo. Estoy comparando aseguradoras para tu perfil...",
    quotesAfter: true,
  },
]

let nextId = 1

export function InsuranceChat() {
  const [messages, setMessages] = useState<Msg[]>([
    { id: 0, role: "assistant", text: SCRIPT[0].prompt },
  ])
  const [stepIndex, setStepIndex] = useState(0)
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const done = stepIndex >= SCRIPT.length
  const currentSuggestions = !done && !typing ? SCRIPT[stepIndex].suggestions : []

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, typing])

  function send(text: string) {
    const value = text.trim()
    if (!value || typing || done) return
    setInput("")
    const step = SCRIPT[stepIndex]
    setMessages((m) => [...m, { id: nextId++, role: "user", text: value }])
    setTyping(true)

    setTimeout(() => {
      setTyping(false)
      setMessages((m) => [
        ...m,
        { id: nextId++, role: "assistant", text: step.reply },
        ...(step.quotesAfter ? [{ id: nextId++, role: "assistant" as const, quotes: true }] : []),
      ])
      setStepIndex((s) => s + 1)
    }, 900)
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => history.back()} aria-label="Volver">
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
                <QuoteCards onSelect={(name) => toast.success(`¡Solicitud enviada a ${name}!`)} />
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
        {currentSuggestions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {currentSuggestions.map((s) => (
              <Button key={s} variant="outline" size="sm" className="rounded-full" onClick={() => send(s)}>
                {s}
              </Button>
            ))}
          </div>
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
