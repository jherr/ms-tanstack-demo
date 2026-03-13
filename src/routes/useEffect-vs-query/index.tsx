import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/useEffect-vs-query/')({
  component: UseEffectVsQueryIndex,
})

function UseEffectVsQueryIndex() {
  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
        <p className="island-kicker mb-3">Demo</p>
        <h1 className="display-title mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-tight text-[var(--sea-ink)] sm:text-5xl">
          useEffect vs React Query
        </h1>
        <p className="mb-8 max-w-2xl text-base text-[var(--sea-ink-soft)] sm:text-lg">
          Two approaches to fetching data. One creates an infinite loop. The
          other just works.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/useEffect-vs-query/use-effect"
            className="rounded-full border border-red-300 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-700 no-underline transition hover:-translate-y-0.5 hover:bg-red-100"
          >
            useEffect Version (Broken)
          </Link>
          <Link
            to="/useEffect-vs-query/use-query"
            className="rounded-full border border-emerald-300 bg-emerald-50 px-5 py-2.5 text-sm font-semibold text-emerald-700 no-underline transition hover:-translate-y-0.5 hover:bg-emerald-100"
          >
            useQuery Version (Fixed)
          </Link>
          <Link
            to="/useEffect-vs-query/use-mutation"
            className="rounded-full border border-indigo-300 bg-indigo-50 px-5 py-2.5 text-sm font-semibold text-indigo-700 no-underline transition hover:-translate-y-0.5 hover:bg-indigo-100"
          >
            useMutation Version (Add Hero)
          </Link>
        </div>
      </section>
    </main>
  )
}
