import {
  createFileRoute,
  Link,
  useRouter,
} from '@tanstack/react-router'
import { zodValidator, fallback } from '@tanstack/zod-adapter'
import { z } from 'zod'

const searchSchema = z.object({
  query: z.string().min(1, 'Search query is required'),
  page: fallback(z.number().int().positive('Page must be a positive number'), 1),
})

export const Route = createFileRoute('/pages-n-links/search')({
  validateSearch: zodValidator(searchSchema),
  errorComponent: SearchError,
  component: SearchPage,
})

const VALIDATE_SEARCH_DOCS =
  'https://tanstack.com/router/latest/docs/how-to/validate-search-params'

function SearchError({ error }: { error: Error }) {
  const router = useRouter()
  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section className="island-shell rounded-2xl border-2 border-red-200 bg-red-50/50 p-6 dark:border-red-800 dark:bg-red-950/20 sm:p-8">
        <p className="island-kicker mb-2 text-red-700 dark:text-red-400">
          Validation failed
        </p>
        <h1 className="display-title mb-3 text-2xl font-bold text-red-800 dark:text-red-300 sm:text-3xl">
          Invalid search parameters
        </h1>
        <p className="mb-6 font-mono text-sm text-red-700 dark:text-red-400">
          {error.message}
        </p>
        <p className="mb-6 text-sm text-[var(--sea-ink-soft)]">
          This is the route&apos;s <code className="rounded bg-[var(--chip-bg)] px-1.5 py-0.5">errorComponent</code>.
          Fix the URL or reset to a valid example.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() =>
              router.navigate({
                to: '/pages-n-links/search',
                search: { query: 'hello', page: 1 },
              })
            }
            className="rounded-full border border-red-300 bg-red-100 px-4 py-2 text-sm font-semibold text-red-800 no-underline transition hover:bg-red-200 dark:border-red-700 dark:bg-red-900/50 dark:text-red-200 dark:hover:bg-red-800/50"
          >
            Go to valid example
          </button>
          <Link
            to="/pages-n-links"
            className="rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-4 py-2 text-sm font-semibold text-[var(--lagoon-deep)] no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.22)]"
          >
            Back to demo index
          </Link>
        </div>
        <p className="mt-6">
          <a
            href={`${VALIDATE_SEARCH_DOCS}#error-handling-strategies`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[var(--lagoon-deep)] underline hover:no-underline"
          >
            Docs: Error handling
          </a>
        </p>
      </section>
    </main>
  )
}

function SearchPage() {
  const { query, page } = Route.useSearch()

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <p className="island-kicker mb-2">Search (Zod)</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          Validated search params
        </h1>
        <p className="mb-6 text-base text-[var(--sea-ink-soft)]">
          Search params are validated at runtime with Zod. Invalid URLs show the
          route&apos;s <code className="rounded bg-[var(--chip-bg)] px-1.5 py-0.5">errorComponent</code>.
        </p>
        <div className="mb-6 rounded-xl bg-[var(--chip-bg)] p-4 font-mono text-sm text-[var(--sea-ink)]">
          <p>query = &quot;{query}&quot;</p>
          <p>page = {page}</p>
        </div>
        <p className="mb-4 text-sm font-semibold text-[var(--sea-ink)]">
          Try these links:
        </p>
        <div className="mb-6 flex flex-wrap gap-3">
          <Link
            to="/pages-n-links/search"
            search={{ query: 'hello', page: 1 }}
            className="rounded-full border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800 no-underline transition hover:bg-emerald-100 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200 dark:hover:bg-emerald-800/30"
          >
            Valid: ?query=hello&page=1
          </Link>
          <a
            href="/pages-n-links/search?page=notanumber"
            className="rounded-full border border-red-300 bg-red-50 px-4 py-2 text-sm font-semibold text-red-800 no-underline transition hover:bg-red-100 dark:border-red-700 dark:bg-red-900/30 dark:text-red-200 dark:hover:bg-red-800/30"
          >
            Invalid: ?page=notanumber
          </a>
          <a
            href="/pages-n-links/search"
            className="rounded-full border border-red-300 bg-red-50 px-4 py-2 text-sm font-semibold text-red-800 no-underline transition hover:bg-red-100 dark:border-red-700 dark:bg-red-900/30 dark:text-red-200 dark:hover:bg-red-800/30"
          >
            Invalid: missing query
          </a>
        </div>
        <p className="mb-6">
          <a
            href={VALIDATE_SEARCH_DOCS}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[var(--lagoon-deep)] underline hover:no-underline"
          >
            Docs: Validate search parameters
          </a>
        </p>
        <Link
          to="/pages-n-links"
          className="rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-4 py-2 text-sm font-semibold text-[var(--lagoon-deep)] no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.22)]"
        >
          Back to demo index
        </Link>
      </section>
    </main>
  )
}
