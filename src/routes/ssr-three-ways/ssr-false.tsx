import { createFileRoute } from '@tanstack/react-router'
import { rawFetchApiServerData } from '#/lib/ssr-three-ways-api'

export const Route = createFileRoute('/ssr-three-ways/ssr-false')({
  ssr: false,
  loader: async () => {
    try {
      return await rawFetchApiServerData()
    } catch (e) {
      return e instanceof Error ? e : new Error(String(e))
    }
  },
  component: SsrFalsePage,
})

function SsrFalsePage() {
  const data = Route.useLoaderData()

  return (
    <div className="page-wrap px-4 pb-8 pt-14">
      <div className="island-shell rise-in max-w-2xl mx-auto rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
        <p className="island-kicker mb-1 text-red-600">ssr: false</p>
        <h1 className="display-title mb-2 text-3xl font-bold tracking-tight text-[var(--sea-ink)]">
          Client-only loader
        </h1>
        <p className="mb-6 text-sm text-[var(--sea-ink-soft)]">
          This route has <code className="rounded bg-[var(--chip-bg)] px-1.5 py-0.5">ssr: false</code>, so the
          loader runs in the browser. A direct fetch to the api-server (no CORS)
          fails.
        </p>
        {data instanceof Error ? (
          <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800">
            <strong>Loader error (expected):</strong> {data.message}
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
