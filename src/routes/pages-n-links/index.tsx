import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/pages-n-links/')({
  component: PagesNLinksIndex,
})

const ROUTING_GUIDE =
  'https://tanstack.com/start/latest/docs/framework/react/guide/routing'
const API_REF =
  'https://tanstack.com/router/latest/docs/api/file-based-routing'

const examples = [
  {
    title: 'Normal page',
    description: 'Static route defined with a dot-file (pages-n-links.normal.tsx).',
    to: '/pages-n-links/normal' as const,
    docsHash: '#creating-file-routes',
  },
  {
    title: 'Catch-all route',
    description: 'Wildcard segment via catchall/$.tsx matches any path under /pages-n-links/catchall/….',
    to: '/pages-n-links/catchall/$' as const,
    params: { _splat: 'any/path/you/like' },
    docsHash: '#types-of-routes',
  },
  {
    title: 'Parameterized route',
    description: 'Dynamic segment params/$exampleId.tsx — type-safe params and Link params.',
    to: '/pages-n-links/params/$exampleId' as const,
    params: { exampleId: 'hello' },
    docsHash: '#defining-routes',
  },
  {
    title: 'Underscore grouping',
    description: 'Pathless layout _grouped/ — URL is /pages-n-links/inside, files live under _grouped/.',
    to: '/pages-n-links/inside' as const,
    docsHash: '#types-of-routes',
  },
]

function PagesNLinksIndex() {
  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
        <p className="island-kicker mb-3">Demo</p>
        <h1 className="display-title mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-tight text-[var(--sea-ink)] sm:text-5xl">
          File routing & type-safe Links
        </h1>
        <p className="mb-6 max-w-2xl text-base text-[var(--sea-ink-soft)] sm:text-lg">
          Normal routes, catch-all, parameterized routes, and underscore
          grouping — all with typed <code className="rounded bg-[var(--chip-bg)] px-1.5 py-0.5 text-sm">Link</code> components.
        </p>

        <section className="mb-8 rounded-2xl border border-[var(--line)] bg-[var(--chip-bg)] p-6 sm:p-8">
          <h2 className="mb-3 text-lg font-semibold text-[var(--sea-ink)]">
            Routing docs
          </h2>
          <p className="mb-4 text-sm text-[var(--sea-ink-soft)]">
            TanStack Start uses TanStack Router for file-based routing and
            type-safe navigation.
          </p>
          <ul className="m-0 flex flex-wrap gap-3 list-none p-0">
            <li>
              <a
                href={ROUTING_GUIDE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-4 py-2 text-sm font-semibold text-[var(--lagoon-deep)] no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.22)]"
              >
                Routing guide
              </a>
            </li>
            <li>
              <a
                href={API_REF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-4 py-2 text-sm font-semibold text-[var(--lagoon-deep)] no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.22)]"
              >
                File-based routing API
              </a>
            </li>
          </ul>
        </section>

        <ul className="grid list-none gap-4 p-0 sm:grid-cols-2">
          {examples.map((ex) => (
            <li key={ex.to}>
              <div className="island-shell feature-card group rounded-2xl p-6 transition hover:-translate-y-1">
                <Link
                  to={ex.to}
                  params={ex.params ?? undefined}
                  className="block no-underline"
                >
                  <h2 className="mb-2 text-lg font-semibold text-[var(--sea-ink)] group-hover:text-[var(--lagoon-deep)]">
                    {ex.title}
                  </h2>
                  <p className="mb-3 text-sm text-[var(--sea-ink-soft)]">
                    {ex.description}
                  </p>
                </Link>
                <a
                  href={`${ROUTING_GUIDE}${ex.docsHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[var(--lagoon-deep)] underline hover:no-underline"
                >
                  Docs: {ex.docsHash}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
