import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/pages-n-links/app/settings')({
  component: AppSettings,
})

function AppSettings() {
  return (
    <section>
      <p className="island-kicker mb-2">Settings</p>
      <h1 className="display-title mb-3 text-2xl font-bold text-[var(--sea-ink)] sm:text-3xl">
        Settings
      </h1>
      <p className="mb-6 text-base text-[var(--sea-ink-soft)]">
        Child route under the same app layout. The header and nav are rendered by
        the parent layout route.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          to="/pages-n-links/app"
          className="rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-4 py-2 text-sm font-semibold text-[var(--lagoon-deep)] no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.22)]"
        >
          Dashboard
        </Link>
        <Link
          to="/pages-n-links"
          className="rounded-full border border-[var(--line)] bg-[var(--chip-bg)] px-4 py-2 text-sm font-semibold text-[var(--sea-ink)] no-underline transition hover:bg-[var(--link-bg-hover)]"
        >
          Back to demo index
        </Link>
      </div>
    </section>
  )
}
