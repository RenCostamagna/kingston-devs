import type { NextConfig } from "next"
import { withEve } from "eve/next"

const nextConfig: NextConfig = {
  // Estas dependencias del scraper de Rosario son nativas/pesadas y no deben
  // ser empaquetadas por el bundler del servidor.
  serverExternalPackages: ["playwright-core", "@sparticuz/chromium"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ]
  },
}

// Mounts the eve agent living in `agent/` on the same origin (routes under /eve/v1/*).
export default withEve(nextConfig)
