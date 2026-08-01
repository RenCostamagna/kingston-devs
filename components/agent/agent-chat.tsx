"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowLeft, Check, ShieldCheck, Sparkles, Wrench, X } from "lucide-react"
import Link from "next/link"

import { useEveAgent } from "eve/react"
import type { EveMessage, EveMessagePart } from "eve/react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"

const TOOL_LABELS: Record<string, string> = {
  get_patente_status: "Consultando estado de patente",
  list_multas: "Buscando multas",
  scan_gmail_multas: "Revisando Gmail",
  pay_multa: "Preparando pago de multa",
  pay_patente: "Preparando pago de patente",
}

type InputRequest = {
  requestId: string
  prompt?: string
  options?: { id: string; label?: string }[]
}

function getInputRequest(message: EveMessage | undefined): InputRequest | undefined {
  const part = message?.parts.find(
    (p) => p.type === "dynamic-tool" && p.toolMetadata?.eve?.inputRequest,
  )
  return part?.toolMetadata?.eve?.inputRequest as InputRequest | undefined
}

function renderInline(text: string) {
  const segments = text.split(/(\*\*[^*]+\*\*)/g)
  return segments.map((seg, i) => {
    const bold = seg.match(/^\*\*([^*]+)\*\*$/)
    if (bold)
      return (
        <strong key={i} className="font-semibold">
          {bold[1]}
        </strong>
      )
    return <span key={i}>{seg}</span>
  })
}

function Markdown({ text }: { text: string }) {
  const lines = text.split("\n")
  return (
    <div className="flex flex-col gap-1">
      {lines.map((line, i) => {
        const trimmed = line.trim()
        if (trimmed.length === 0) return <div key={i} className="h-1" />
        const bullet = trimmed.match(/^[-*]\s+(.*)$/)
        if (bullet) {
          return (
            <div key={i} className="flex gap-2">
              <span className="text-primary" aria-hidden>
                •
              </span>
              <span className="flex-1">{renderInline(bullet[1])}</span>
            </div>
          )
        }
        return <div key={i}>{renderInline(trimmed)}</div>
      })}
    </div>
  )
}

function MessageText({ parts }: { parts: EveMessagePart[] }) {
  const text = parts
    .filter((p) => p.type === "text")
    .map((p) => (p as { text: string }).text)
    .join("")
  return <Markdown text={text} />
}

function ToolBadges({ parts }: { parts: EveMessagePart[] }) {
  const tools = parts.filter(
    (p) => p.type === "dynamic-tool" && !p.toolMetadata?.eve?.inputRequest,
  )
  if (tools.length === 0) return null
  return (
    <div className="flex flex-col gap-1.5">
      {tools.map((p, i) => {
        const name = (p as { toolName?: string }).toolName ?? ""
        return (
          <div
            key={i}
            className="flex w-fit items-center gap-2 rounded-lg border border-border bg-secondary/50 px-2.5 py-1.5 text-xs text-muted-foreground"
          >
            <Wrench className="size-3.5 shrink-0 text-primary" />
            <span>{TOOL_LABELS[name] ?? name}</span>
          </div>
        )
      })}
    </div>
  )
}

export function AgentChat({
  title,
  subtitle,
  greeting,
  suggestions,
}: {
  title: string
  subtitle: string
  greeting: string
  suggestions: string[]
}) {
  const agent = useEveAgent()
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  const isBusy = agent.status === "submitted" || agent.status === "streaming"
  const messages = agent.data.messages
  const pending = getInputRequest(messages.at(-1))

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, agent.status, pending])

  function send(text: string) {
    const value = text.trim()
    if (!value || isBusy) return
    setInput("")
    void agent.send({ message: value })
  }

  function answerApproval(optionId: string) {
    if (!pending) return
    void agent.send({ inputResponses: [{ requestId: pending.requestId, optionId }] })
  }

  const showSuggestions = messages.length === 0 && !isBusy

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur">
        <Link
          href="/"
          aria-label="Volver"
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <Avatar className="size-9">
          <AvatarFallback className="bg-primary/15 text-primary">
            <Sparkles className="size-4" />
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{title}</p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            {subtitle}
          </p>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mx-auto flex max-w-md flex-col gap-3">
          {/* Static greeting bubble */}
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-card px-4 py-2.5 text-sm leading-relaxed text-card-foreground">
              {greeting}
            </div>
          </div>

          {messages.map((m) => {
            const hasText = m.parts.some((p) => p.type === "text" && p.text.trim().length > 0)
            return (
              <div key={m.id} className="flex flex-col gap-2">
                {m.role === "assistant" && <ToolBadges parts={m.parts} />}

                {hasText && (
                  <div className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                        m.role === "user"
                          ? "rounded-br-md bg-primary text-primary-foreground"
                          : "rounded-bl-md bg-card text-card-foreground",
                      )}
                    >
                      <MessageText parts={m.parts} />
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          {/* Single approval panel for the pending human-in-the-loop request */}
          {pending && (
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                <ShieldCheck className="size-4 text-primary" />
                Confirmación requerida
              </div>
              {pending.prompt && (
                <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                  {pending.prompt}
                </p>
              )}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 rounded-full"
                  disabled={isBusy}
                  onClick={() => answerApproval("approve")}
                >
                  <Check className="size-4" />
                  Confirmar pago
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 rounded-full"
                  disabled={isBusy}
                  onClick={() => answerApproval("deny")}
                >
                  <X className="size-4" />
                  Cancelar
                </Button>
              </div>
            </div>
          )}

          {isBusy && !pending && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-card px-4 py-3">
                <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                <span className="size-2 animate-bounce rounded-full bg-muted-foreground" />
              </div>
            </div>
          )}

          {agent.status === "error" && (
            <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
              {agent.error?.message ?? "Ocurrió un error. Intentá de nuevo."}
            </div>
          )}
        </div>
      </div>

      {!pending && (
        <div className="sticky bottom-0 flex flex-col gap-3 border-t border-border bg-background/90 p-4 backdrop-blur">
          {showSuggestions && suggestions.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <Button
                  key={s}
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => send(s)}
                >
                  {s}
                </Button>
              ))}
            </div>
          )}
          <InputGroup>
            <InputGroupInput
              placeholder="Escribí tu mensaje..."
              value={input}
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
                disabled={isBusy || !input.trim()}
                onClick={() => send(input)}
                aria-label="Enviar"
              >
                <Sparkles />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
      )}
    </div>
  )
}
