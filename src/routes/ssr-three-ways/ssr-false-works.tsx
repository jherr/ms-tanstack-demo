import { createFileRoute } from '@tanstack/react-router'
import { fetchApiServerData } from '#/lib/ssr-three-ways-api'

export const Route = createFileRoute('/ssr-three-ways/ssr-false-works')({
  ssr: false,
  loader: async () => {
    try {
      return await fetchApiServerData()
    } catch (e) {
      return e instanceof Error ? e : new Error(String(e))
    }
  },
  component: SsrFalseWorksPage,
})

function SsrFalseWorksPage() {
  const data = Route.useLoaderData()

  return (
    <div className="page-wrap px-4 pb-8 pt-14">
      <div className="island-shell rise-in max-w-2xl mx-auto rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
        <p className="island-kicker mb-1 text-emerald-600">ssr: false (works)</p>
        <h1 className="display-title mb-2 text-3xl font-bold tracking-tight text-[var(--sea-ink)]">
          Client-only loader, server function
        </h1>
        <p className="mb-6 text-sm text-[var(--sea-ink-soft)]">
          Same <code className="rounded bg-[var(--chip-bg)] px-1.5 py-0.5">ssr: false</code>, but the loader
          calls a server function instead of a direct fetch. The fetch runs on
          the app server, so it works even when the loader runs in the browser.
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
