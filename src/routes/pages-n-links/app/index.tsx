import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/pages-n-links/app/')({
  component: AppIndex,
})

function AppIndex() {
  return (
    <section>
      <p className="island-kicker mb-2">Dashboard</p>
      <h1 className="display-title mb-3 text-2xl font-bold text-[var(--sea-ink)] sm:text-3xl">
        Dashboard home
      </h1>
      <p className="mb-6 text-base text-[var(--sea-ink-soft)]">
        This is the index route under the app layout. The layout (header + nav)
        is shared with child routes like Settings.
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
