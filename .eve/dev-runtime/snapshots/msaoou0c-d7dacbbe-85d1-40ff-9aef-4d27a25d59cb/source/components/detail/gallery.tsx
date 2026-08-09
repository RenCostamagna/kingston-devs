"use client"

import Image from "next/image"
import { useState } from "react"

import { cn } from "@/lib/utils"

export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0)

  return (
    <div className="flex flex-col gap-2">
      <div className="relative h-60 w-full overflow-hidden">
        <Image
          src={images[active] || "/placeholder.svg"}
          alt={`${alt} — foto ${active + 1}`}
          fill
          sizes="(max-width: 448px) 100vw, 448px"
          className="object-cover"
          priority
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/70 to-transparent" />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 px-4">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver foto ${i + 1}`}
              className={cn(
                "relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors",
                active === i ? "border-primary" : "border-transparent opacity-70",
              )}
            >
              <Image src={img || "/placeholder.svg"} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
