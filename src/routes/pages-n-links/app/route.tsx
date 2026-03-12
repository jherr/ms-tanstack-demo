import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/pages-n-links/app')({
  component: AppLayout,
})

function AppLayout() {
  return (
    <div className="page-wrap px-4 pb-8 pt-14">
      <div className="island-shell rounded-2xl border border-[var(--line)] p-0 overflow-hidden sm:p-0">
        <header className="flex items-center justify-between border-b border-[var(--line)] bg-[var(--chip-bg)] px-4 py-3 sm:px-6">
          <span className="text-sm font-semibold text-[var(--sea-ink)]">
            Nested layout (app){' '}
            <a
              href="https://tanstack.com/router/latest/docs/api/file-based-routing#routetoken"
              target="_blank"
              rel="noopener noreferrer"
              className="font-normal text-[var(--lagoon-deep)] underline hover:no-underline"
            >
              routeToken
            </a>
          </span>
          <span className="rounded-full bg-[rgba(79,184,178,0.2)] px-3 py-1 text-xs font-medium text-[var(--lagoon-deep)]">
            Logged in as Demo User
          </span>
        </header>
        <nav className="flex gap-1 border-b border-[var(--line)] bg-[var(--chip-bg)] px-4 py-2 sm:px-6">
          <Link
            to="/pages-n-links/app"
            className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--sea-ink-soft)] no-underline transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
            activeProps={{
              className:
                'bg-[rgba(79,184,178,0.14)] text-[var(--lagoon-deep)] font-semibold',
            }}
          >
            Dashboard
          </Link>
          <Link
            to="/pages-n-links/app/settings"
            className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--sea-ink-soft)] no-underline transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
            activeProps={{
              className:
                'bg-[rgba(79,184,178,0.14)] text-[var(--lagoon-deep)] font-semibold',
            }}
          >
            Settings
          </Link>
        </nav>
        <div className="p-6 sm:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
