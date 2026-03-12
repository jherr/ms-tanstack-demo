import { createFileRoute } from '@tanstack/react-router'
import { fetchApiServerData } from '#/lib/ssr-three-ways-api'

export const Route = createFileRoute('/ssr-three-ways/ssr-data-only')({
  ssr: 'data-only',
  loader: async () => {
    try {
      return await fetchApiServerData()
    } catch (e) {
      return e instanceof Error ? e : new Error(String(e))
    }
  },
  component: SsrDataOnlyPage,
})

function SsrDataOnlyPage() {
  const data = Route.useLoaderData()

  return (
    <div className="page-wrap px-4 pb-8 pt-14">
      <div className="island-shell rise-in max-w-2xl mx-auto rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
        <p className="island-kicker mb-1 text-emerald-600">ssr: &apos;data-only&apos;</p>
        <h1 className="display-title mb-2 text-3xl font-bold tracking-tight text-[var(--sea-ink)]">
          Data-only SSR
        </h1>
        <p className="mb-6 text-sm text-[var(--sea-ink-soft)]">
          Loader runs on the server; the component renders on the client. Fetch
          happens on the server, so it succeeds without CORS.
        </p>
        {data instanceof Error ? (
          <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800">
            <strong>Loader error:</strong> {data.message}. Is api-server running?{' '}
            <code>pnpm --filter api-server dev</code>
          </div>
        ) : (
          <pre className="rounded-lg bg-[var(--chip-bg)] p-4 text-sm overflow-x-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </div>
  )
}
