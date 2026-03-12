import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/pages-n-links/_grouped/inside')({
  component: InsidePage,
})

const ROUTING_GUIDE =
  'https://tanstack.com/start/latest/docs/framework/react/guide/routing'

function InsidePage() {
  return (
    <section className="rounded-xl bg-[var(--chip-bg)] p-6">
      <p className="island-kicker mb-2">Underscore grouping</p>
      <h1 className="display-title mb-3 text-2xl font-bold text-[var(--sea-ink)] sm:text-3xl">
        Inside _grouped
      </h1>
      <p className="mb-6 text-base text-[var(--sea-ink-soft)]">
        This page lives at <code className="rounded bg-[var(--chip-bg)] px-1.5 py-0.5 text-sm">pages-n-links/_grouped/inside.tsx</code> but
        the URL is <code className="rounded bg-[var(--chip-bg)] px-1.5 py-0.5 text-sm">/pages-n-links/inside</code> — the{' '}
        <code className="rounded bg-[var(--chip-bg)] px-1.5 py-0.5 text-sm">_grouped</code> segment is pathless (grouping/organization only).
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
  )
}
