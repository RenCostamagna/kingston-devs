import { AppShell } from "@/components/app-shell"
import { SearchScreen } from "@/components/search/search-screen"

export default async function BuscarPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  return (
    <AppShell>
      <SearchScreen initialQuery={q ?? ""} />
    </AppShell>
  )
}
