"use client"

import { useEffect, useState } from "react"

import { vehicle, type Vehicle } from "./mock-data"

export const PROFILE_KEY = "wheelo:profile"

export type UserProfile = Vehicle

export const defaultProfile: UserProfile = vehicle

export function loadProfile(): UserProfile {
  if (typeof window === "undefined") return defaultProfile
  try {
    const raw = window.localStorage.getItem(PROFILE_KEY)
    return raw ? { ...defaultProfile, ...JSON.parse(raw) } : defaultProfile
  } catch {
    return defaultProfile
  }
}

export function saveProfile(profile: UserProfile) {
  try {
    window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
  } catch {
    // ignore write errors (private mode, quota, etc.)
  }
}

/**
 * Reads the stored profile on the client. Starts from the default so the first
 * client render matches the server, then hydrates from localStorage on mount.
 */
export function useProfile(): UserProfile {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile)
  useEffect(() => {
    setProfile(loadProfile())
  }, [])
  return profile
}
