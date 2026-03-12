import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/pages-n-links/normal')({
  component: NormalPage,
})

const ROUTING_GUIDE =
  'https://tanstack.com/start/latest/docs/framework/react/guide/routing'

function NormalPage() {
  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <p className="island-kicker mb-2">Normal route</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          Static page (dot-file)
        </h1>
        <p className="mb-6 text-base text-[var(--sea-ink-soft)]">
          This route is defined by a single file:{' '}
          <code className="rounded bg-[var(--chip-bg)] px-1.5 py-0.5 text-sm">
            pages-n-links.normal.tsx
          </code>
          — same level as the <code className="rounded bg-[var(--chip-bg)] px-1.5 py-0.5 text-sm">pages-n-links</code> folder, using a dot for the segment.
        </p>
        <p className="mb-6">
          <a
            href={`${ROUTING_GUIDE}#creating-file-routes`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[var(--lagoon-deep)] underline hover:no-underline"
          >
            Docs: Creating file routes
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
