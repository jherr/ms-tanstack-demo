import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/ssr-three-ways/')({
  component: SsrThreeWaysIndex,
})

const ROUTING_GUIDE =
  'https://tanstack.com/start/latest/docs/framework/react/guide/selective-ssr'

const modes = [
  {
    title: 'ssr: false (direct fetch)',
    description:
      'Loader runs only on the client. Direct fetch to api-server (no CORS) fails in the browser.',
    to: '/ssr-three-ways/ssr-false' as const,
    tag: 'Fails (client fetch)',
    tagClass: 'bg-red-100 text-red-800 border-red-200',
  },
  {
    title: 'ssr: false (server function)',
    description:
      'Loader runs on the client but calls a server function. Fetch runs on the app server, so it works.',
    to: '/ssr-three-ways/ssr-false-works' as const,
    tag: 'Works',
    tagClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  },
  {
    title: "ssr: true",
    description:
      'Loader runs on the server (and client on nav). Server fetch to api-server succeeds.',
    to: '/ssr-three-ways/ssr-true' as const,
    tag: 'Works',
    tagClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  },
  {
    title: "ssr: 'data-only'",
    description:
      'Loader runs on the server; component renders on client. Server fetch succeeds.',
    to: '/ssr-three-ways/ssr-data-only' as const,
    tag: 'Works',
    tagClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  },
  {
    title: 'ssr: true + query preload',
    description:
      'Loader preloads CS heroes into TanStack Query cache before render.',
    to: '/ssr-three-ways/ssr-true-query' as const,
    tag: 'Works',
    tagClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  },
]

function SsrThreeWaysIndex() {
  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
        <p className="island-kicker mb-3">Demo</p>
        <h1 className="display-title mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-tight text-[var(--sea-ink)] sm:text-5xl">
          SSR Three Ways
        </h1>
        <p className="mb-6 max-w-2xl text-base text-[var(--sea-ink-soft)] sm:text-lg">
          Each route uses a loader that does a direct <code className="rounded bg-[var(--chip-bg)] px-1.5 py-0.5 text-sm">fetch()</code> to a
          local api-server (Hono, no CORS). When the loader runs on the server it
          works; when it runs on the client the browser blocks the request.{' '}
          <strong>Always</strong> put code that should only run on the server into a
          server function. Loaders are isomorphic.
        </p>

        <section className="mb-6">
          <h2 className="mb-3 text-lg font-semibold text-[var(--sea-ink)]">
            Docs
          </h2>
          <a
            href={ROUTING_GUIDE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-4 py-2 text-sm font-semibold text-[var(--lagoon-deep)] no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.22)]"
          >
            Selective SSR
          </a>
        </section>

        <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-5">
          {modes.map((m) => (
            <li key={m.to}>
              <Link
                to={m.to}
                className="island-shell feature-card group block rounded-2xl p-6 no-underline transition hover:-translate-y-1"
              >
                <span
                  className={`mb-3 inline-block rounded-full border px-3 py-1 text-xs font-semibold ${m.tagClass}`}
                >
                  {m.tag}
                </span>
                <h2 className="mb-2 text-lg font-semibold text-[var(--sea-ink)] group-hover:text-[var(--lagoon-deep)]">
                  {m.title}
                </h2>
                <p className="m-0 text-sm text-[var(--sea-ink-soft)]">
                  {m.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
