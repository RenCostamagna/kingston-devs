"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export const ONBOARDING_KEY = "wheelo:onboarding-completed"

export function OnboardingGate({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem(ONBOARDING_KEY)
    if (!seen) {
      router.replace("/onboarding")
    } else {
      setReady(true)
    }
  }, [router])

  if (!ready) return null

  return <>{children}</>
}
