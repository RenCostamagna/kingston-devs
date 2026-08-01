/**
 * Scraper de multas de la Municipalidad de Rosario.
 *
 * La página https://www.rosario.gob.ar/gdm/patente.do?accion=ir está protegida
 * con Google reCAPTCHA v3 (invisible, basado en score). El token se genera en
 * el navegador sobre el dominio real de rosario.gob.ar y no se puede reproducir
 * con un simple fetch del servidor. Por eso, para el modo "live" usamos un
 * navegador headless (Playwright + Chromium) que carga la página, deja correr
 * el reCAPTCHA v3, completa la patente y envía el formulario como lo haría una
 * persona, tomando precauciones anti-detección (locale, timezone, user-agent y
 * viewport realistas, y ocultando navigator.webdriver).
 *
 * Modo demo: si ROSARIO_LIVE_SCRAPE no está activado (o si el navegador no se
 * puede lanzar en el entorno), devolvemos un set de datos de ejemplo para que
 * el flujo del asistente sea siempre demostrable en el preview. NO se persiste
 * nada en la base: estas multas se muestran solo en el chat.
 */

export type RosarioMulta = {
  code: string // número de acta
  description: string
  location: string | null
  infractionDate: string | null // YYYY-MM-DD
  amount: number // en pesos
  status: string // estado del acta (ej. "Pendiente", "En convenio")
}

export type RosarioResult = {
  plate: string
  mode: "live" | "demo"
  multas: RosarioMulta[]
  libreMulta: boolean // true si no hay infracciones pendientes
  note?: string
}

const RECAPTCHA_SITE_KEY = "6LcUUMUUAAAAAHd5V8Y7RYJ4L91xP9uhD8uAspSL"
const PATENTE_URL = "https://www.rosario.gob.ar/gdm/patente.do?accion=ir"

export function normalizePlate(plate: string): string {
  return plate.toUpperCase().replace(/[\s-]/g, "")
}

export function rosarioLiveEnabled(): boolean {
  const flag = process.env.ROSARIO_LIVE_SCRAPE
  return flag === "1" || flag === "true"
}

// ---- Datos demo (usados cuando el scraping live no está activado) ----

const DEMO_MULTAS: Record<string, RosarioMulta[]> = {
  AB123CD: [
    {
      code: "A-2026-0148821",
      description: "Exceso de velocidad en zona urbana (superó en más de 20 km/h)",
      location: "Av. Pellegrini y Bv. Oroño",
      infractionDate: "2026-01-14",
      amount: 68400,
      status: "Pendiente",
    },
    {
      code: "A-2025-0993210",
      description: "Estacionar en lugar prohibido / doble fila",
      location: "Córdoba al 1200",
      infractionDate: "2025-12-03",
      amount: 24300,
      status: "Pendiente",
    },
  ],
  AD789GH: [
    {
      code: "A-2026-0150077",
      description: "Cruce de semáforo en rojo",
      location: "Av. Francia y 27 de Febrero",
      infractionDate: "2026-01-22",
      amount: 91200,
      status: "Pendiente",
    },
  ],
}

function demoResult(plate: string, note?: string): RosarioResult {
  const multas = DEMO_MULTAS[plate] ?? []
  return {
    plate,
    mode: "demo",
    multas,
    libreMulta: multas.length === 0,
    note:
      note ??
      "Modo demostración: el scraping en vivo del sitio de Rosario no está activado (ROSARIO_LIVE_SCRAPE). Se muestran datos de ejemplo.",
  }
}

// ---- Parsing de la tabla de resultados ----

type RawRow = { cells: string[] }

function toNumberARS(raw: string): number {
  // "$ 68.400,00" -> 68400 ; "24.300" -> 24300
  const cleaned = raw
    .replace(/[^\d,.-]/g, "")
    .replace(/\.(?=\d{3}(\D|$))/g, "") // quita separador de miles
    .replace(",", ".")
  const n = Number.parseFloat(cleaned)
  return Number.isFinite(n) ? Math.round(n) : 0
}

function toISODate(raw: string): string | null {
  // "14/01/2026" -> "2026-01-14"
  const m = raw.match(/(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})/)
  if (!m) return null
  const [, d, mo, y] = m
  const year = y.length === 2 ? `20${y}` : y
  return `${year}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`
}

function parseRows(rows: RawRow[]): RosarioMulta[] {
  const out: RosarioMulta[] = []
  for (const { cells } of rows) {
    if (!cells.length) continue
    const joined = cells.join(" ")
    // Una fila de acta tiene un código tipo A-2026-000000 o similar.
    const codeMatch = joined.match(/\b[A-Z]?-?\d{3,4}-\d{4,}\b|\bACTA[-\s]?[\d-]+\b/i)
    if (!codeMatch) continue

    const amountCell = cells.find((c) => /\$|\d{1,3}(\.\d{3})+(,\d{2})?/.test(c)) ?? ""
    const dateCell = cells.find((c) => /\d{1,2}[/-]\d{1,2}[/-]\d{2,4}/.test(c)) ?? ""
    const statusCell =
      cells.find((c) => /pendiente|convenio|pag|descargo|vencid|inicial/i.test(c)) ?? "Pendiente"
    const descCell =
      cells
        .filter((c) => c && c !== amountCell && c !== dateCell && c !== statusCell && c !== codeMatch[0])
        .sort((a, b) => b.length - a.length)[0] ?? "Infracción de tránsito"

    out.push({
      code: codeMatch[0],
      description: descCell.trim(),
      location: null,
      infractionDate: toISODate(dateCell),
      amount: toNumberARS(amountCell),
      status: statusCell.trim(),
    })
  }
  return out
}

// ---- Scraping en vivo con navegador headless ----

async function launchBrowser() {
  // Import dinámico para que estas dependencias pesadas solo se carguen cuando
  // realmente se hace scraping en vivo (evita cargarlas en el preview demo).
  const { chromium: playwright } = await import("playwright-core")

  // En serverless (Vercel) usamos el Chromium de @sparticuz/chromium. En local
  // caemos al Chrome del sistema vía el canal "chrome".
  try {
    const chromiumPkg = (await import("@sparticuz/chromium")).default
    const executablePath = await chromiumPkg.executablePath()
    if (executablePath) {
      return playwright.launch({
        args: [...chromiumPkg.args, "--disable-blink-features=AutomationControlled"],
        executablePath,
        headless: true,
      })
    }
  } catch {
    // @sparticuz/chromium no disponible en este entorno; probamos Chrome local.
  }

  return playwright.launch({
    channel: "chrome",
    headless: true,
    args: ["--disable-blink-features=AutomationControlled"],
  })
}

async function scrapeLive(plate: string): Promise<RosarioResult> {
  const browser = await launchBrowser()
  try {
    const context = await browser.newContext({
      locale: "es-AR",
      timezoneId: "America/Argentina/Buenos_Aires",
      viewport: { width: 1280, height: 800 },
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      extraHTTPHeaders: { "Accept-Language": "es-AR,es;q=0.9" },
    })

    // Precaución anti-detección: ocultar navigator.webdriver.
    await context.addInitScript(() => {
      Object.defineProperty(navigator, "webdriver", { get: () => undefined })
    })

    const page = await context.newPage()
    await page.goto(PATENTE_URL, { waitUntil: "networkidle", timeout: 45000 })

    // Esperar a que reCAPTCHA v3 popule el token oculto antes de enviar.
    await page.waitForFunction(
      () => {
        const el = document.getElementById("g-recaptcha-response") as HTMLInputElement | null
        return Boolean(el && el.value && el.value.length > 0)
      },
      { timeout: 30000 },
    )

    // Completar la patente con pequeñas pausas para simular tipeo humano.
    await page.click("#patente")
    await page.type("#patente", plate, { delay: 90 })
    await page.waitForTimeout(600)

    await Promise.all([
      page.waitForLoadState("networkidle", { timeout: 45000 }),
      page.click("button.govuk-button"),
    ])

    // Detectar "libre multa" (sin infracciones pendientes).
    const bodyText = (await page.textContent("body")) ?? ""
    const libreMulta = /no (existen|registra|posee).*(infrac|multa|acta)/i.test(bodyText)

    // Extraer filas de todas las tablas de resultados.
    const rows: RawRow[] = await page.evaluate(() => {
      const result: { cells: string[] }[] = []
      document.querySelectorAll("table").forEach((table) => {
        table.querySelectorAll("tr").forEach((tr) => {
          const cells = Array.from(tr.querySelectorAll("td")).map((td) =>
            (td.textContent ?? "").replace(/\s+/g, " ").trim(),
          )
          if (cells.some((c) => c.length > 0)) result.push({ cells })
        })
      })
      return result
    })

    const multas = parseRows(rows)
    return {
      plate,
      mode: "live",
      multas,
      libreMulta: libreMulta || multas.length === 0,
    }
  } finally {
    await browser.close()
  }
}

/**
 * Consulta las multas de una patente en el sitio de la Municipalidad de
 * Rosario. Si el scraping en vivo no está activado o falla, cae en modo demo.
 * No persiste datos: el resultado es solo para mostrar en el chat.
 */
export async function fetchMultasRosario(rawPlate: string): Promise<RosarioResult> {
  const plate = normalizePlate(rawPlate)

  if (!rosarioLiveEnabled()) {
    return demoResult(plate)
  }

  try {
    return await scrapeLive(plate)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return demoResult(
      plate,
      `No se pudo consultar el sitio de Rosario en vivo (${message}). Se muestran datos de ejemplo.`,
    )
  }
}

export { RECAPTCHA_SITE_KEY }
