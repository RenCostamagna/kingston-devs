import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Wheelo — Cocheras y seguros para tu auto",
  description:
    "Wheelo es el marketplace de cocheras tipo Airbnb: publicá o encontrá dónde estacionar. Además cotizá tu seguro vehicular con nuestro agente de IA.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#121212",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={cn("dark bg-background antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  )
}
