import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { fetchCsHeroes } from "#/lib/cs-heroes";

const csHeroesQueryOptions = () =>
  queryOptions({
    queryKey: ["cs-heroes"],
    queryFn: () => fetchCsHeroes(),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const Route = createFileRoute("/ssr-three-ways/ssr-true-query")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(csHeroesQueryOptions());
  },
  component: SsrTrueQueryPage,
});

function SsrTrueQueryPage() {
  const { data: heroes } = useQuery(csHeroesQueryOptions());

  return (
    <div className="page-wrap px-4 pb-8 pt-14">
      <div className="island-shell rise-in max-w-2xl mx-auto rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
        <p className="island-kicker mb-1 text-emerald-600">
          ssr: true + React Query
        </p>
        <h1 className="display-title mb-2 text-3xl font-bold tracking-tight text-[var(--sea-ink)]">
          SSR Preload into Query Cache
        </h1>
        <p className="mb-6 text-sm text-[var(--sea-ink-soft)]">
          Loader runs on the server and preloads the CS heroes into TanStack
          Query with <code>ensureQueryData</code>. The component hydrates with
          ready data from the cache.
        </p>

        <ul className="space-y-1">
          {(heroes ?? []).map((hero) => (
            <li
              key={hero.id}
              className="rounded-lg bg-white/60 border border-black/5 p-2 text-sm text-[var(--sea-ink)]"
            >
              {hero.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
