import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/useEffect-vs-query/use-query')({
  component: UseQueryVersion,
})

const API_URL = '/useEffect-vs-query/api/users'

async function fetchUsers(): Promise<Array<{ id: number; name: string }>> {
  const res = await fetch(API_URL)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  // Simulate 1 second delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return res.json()
}

function UseQueryVersion() {
  const { data: users, isLoading, error, dataUpdatedAt } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  return (
    <div className="page-wrap px-4 pb-8 pt-14">
      <div className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14 max-w-2xl mx-auto">
        <p className="island-kicker mb-1 text-emerald-600">Fixed</p>
        <h1 className="display-title mb-2 text-3xl font-bold tracking-tight text-[var(--sea-ink)]">
          useQuery Version
        </h1>
        <p className="mb-6 text-sm text-[var(--sea-ink-soft)]">
          Same data, same API, but using <code>useQuery</code>. No infinite
          loops. Automatic caching, deduplication, and background refetching
          built in.
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-lg bg-emerald-50 border border-emerald-200 p-4">
            <span className="text-emerald-600 text-lg">
              {isLoading ? '...' : 'OK'}
            </span>
            <div>
              <p className="text-sm font-semibold text-emerald-800">
                {isLoading ? 'Fetching...' : 'Fetched once, cached.'}
              </p>
              <p className="text-xs text-emerald-600">
                {isLoading
                  ? 'One request in flight'
                  : `Last updated: ${new Date(dataUpdatedAt).toLocaleTimeString()}`}
              </p>
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
              Error: {error.message}
            </div>
          )}

          <div className="rounded-lg bg-black/5 p-4">
            <p className="text-xs font-mono text-[var(--sea-ink-soft)] mb-2">
              That's it. That's the whole thing.
            </p>
            <pre className="text-xs text-[var(--sea-ink-soft)] overflow-x-auto whitespace-pre-wrap">
              {`const { data: users, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
})
// No dependency arrays. No setState. No cleanup.
// Caching, deduplication, and retries are free.`}
            </pre>
          </div>

          {users && (
            <ul className="space-y-1">
              {users.slice(0, 5).map((user) => (
                <li
                  key={user.id}
                  className="rounded-lg bg-white/60 border border-black/5 p-2 text-sm text-[var(--sea-ink)]"
                >
                  {user.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
