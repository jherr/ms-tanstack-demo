import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/pages-n-links/_grouped')({
  component: GroupedLayout,
})

function GroupedLayout() {
  return (
    <div className="page-wrap px-4 pb-8 pt-14">
      <div className="island-shell rounded-2xl border border-dashed border-[var(--line)] p-6 sm:p-8">
        <p className="island-kicker mb-2">Pathless layout (_grouped)</p>
        <p className="mb-6 text-sm text-[var(--sea-ink-soft)]">
          This layout wraps children under <code className="rounded bg-[var(--chip-bg)] px-1.5 py-0.5">_grouped/</code> but
          does not add a URL segment — the path stays <code className="rounded bg-[var(--chip-bg)] px-1.5 py-0.5">/pages-n-links/…</code>.
        </p>
        <Outlet />
      </div>
    </div>
  )
}
