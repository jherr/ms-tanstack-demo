import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/pages-n-links/catchall/$')({
  component: CatchallPage,
})

const ROUTING_GUIDE =
  'https://tanstack.com/start/latest/docs/framework/react/guide/routing'

function CatchallPage() {
  const { _splat } = Route.useParams()

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <p className="island-kicker mb-2">Catch-all route</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          Wildcard match
        </h1>
        <p className="mb-4 text-base text-[var(--sea-ink-soft)]">
          File: <code className="rounded bg-[var(--chip-bg)] px-1.5 py-0.5 text-sm">pages-n-links/catchall/$.tsx</code>.
          The rest of the path is in <code className="rounded bg-[var(--chip-bg)] px-1.5 py-0.5 text-sm">params._splat</code>.
        </p>
        <p className="mb-6 font-mono text-sm text-[var(--sea-ink)]">
          _splat = &quot;{_splat ?? '(empty)'}&quot;
        </p>
        <p className="mb-6">
          <a
            href={`${ROUTING_GUIDE}#types-of-routes`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[var(--lagoon-deep)] underline hover:no-underline"
          >
            Docs: Types of routes
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
