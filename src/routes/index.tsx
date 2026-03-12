import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

const demos = [
  {
    title: 'useEffect vs React Query',
    description:
      'A triggerable infinite loop with useEffect, and the same fetch done right with useQuery.',
    path: '/useEffect-vs-query',
    tag: 'React Query',
  },
  {
    title: 'File Routing & Type-Safe Links',
    description:
      'Normal routes, catch-all, parameterized routes, and underscore grouping with typed Link components.',
    path: '/pages-n-links',
    tag: 'Router',
  },
  {
    title: 'SSR Three Ways',
    description:
      'ssr: false, ssr: true, and ssr: "data-only" with a no-CORS api-server — loaders that run on the client fail.',
    path: '/ssr-three-ways',
    tag: 'Start',
  },
  {
    title: 'Server Functions Are Awesome',
    description:
      'GET and POST server functions, input validation, middleware, JSON responses, HTTP streaming, and SSE.',
    path: '/server-functions-are-awesome',
    tag: 'Start',
  },
]

function App() {
  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.32),transparent_66%)]" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(47,106,74,0.18),transparent_66%)]" />
        <p className="island-kicker mb-3">TanStack Samples</p>
        <h1 className="display-title mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-tight text-[var(--sea-ink)] sm:text-5xl">
          Interactive Demos
        </h1>
        <p className="mb-0 max-w-2xl text-base text-[var(--sea-ink-soft)] sm:text-lg">
          Bite-sized examples showing why TanStack libraries make React
          development easier.
        </p>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {demos.map((demo, index) => (
          <Link
            key={demo.path}
            to={demo.path}
            className="island-shell feature-card rise-in group rounded-2xl p-6 no-underline transition hover:-translate-y-1"
            style={{ animationDelay: `${index * 90 + 80}ms` }}
          >
            <span className="mb-3 inline-block rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-3 py-1 text-xs font-semibold text-[var(--lagoon-deep)]">
              {demo.tag}
            </span>
            <h2 className="mb-2 text-lg font-semibold text-[var(--sea-ink)] group-hover:text-[var(--lagoon-deep)] transition-colors">
              {demo.title}
            </h2>
            <p className="m-0 text-sm text-[var(--sea-ink-soft)]">
              {demo.description}
            </p>
          </Link>
        ))}
      </section>
    </main>
  )
}
