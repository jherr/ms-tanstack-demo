import { createFileRoute } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type Hero = {
  id: number;
  name: string;
};

const USERS_API_URL = "/useEffect-vs-query/api/users";
const ADD_HERO_API_URL = "/useEffect-vs-query/api/add-hero";

async function fetchUsers(): Promise<Hero[]> {
  const res = await fetch(USERS_API_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function createHero(name: string): Promise<Hero> {
  const res = await fetch(ADD_HERO_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    const errorBody = (await res.json()) as { error?: string };
    throw new Error(errorBody.error ?? `HTTP ${res.status}`);
  }

  return res.json();
}

export const Route = createFileRoute("/useEffect-vs-query/use-mutation")({
  component: UseMutationVersion,
});

function UseMutationVersion() {
  const [heroName, setHeroName] = useState("");
  const queryClient = useQueryClient();

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const addHeroMutation = useMutation({
    mutationFn: createHero,
    onSuccess: () => {
      setHeroName("");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = heroName.trim();
    if (!trimmedName) return;
    addHeroMutation.mutate(trimmedName);
  }

  return (
    <div className="page-wrap px-4 pb-8 pt-14">
      <div className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14 max-w-2xl mx-auto">
        <p className="island-kicker mb-1 text-indigo-600">Mutation Demo</p>
        <h1 className="display-title mb-2 text-3xl font-bold tracking-tight text-[var(--sea-ink)]">
          useMutation Version
        </h1>
        <p className="mb-6 text-sm text-[var(--sea-ink-soft)]">
          Add a new CS hero with <code>useMutation</code>, then invalidate the{" "}
          <code>users</code> query to refresh the list.
        </p>

        <form onSubmit={handleSubmit} className="mb-5 flex gap-2">
          <input
            value={heroName}
            onChange={(event) => setHeroName(event.target.value)}
            placeholder="Enter a CS hero name"
            className="flex-1 rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[var(--sea-ink)]"
          />
          <button
            type="submit"
            disabled={addHeroMutation.isPending || heroName.trim().length === 0}
            className="rounded-full border border-indigo-300 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 transition hover:-translate-y-0.5 hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            {addHeroMutation.isPending ? "Adding..." : "Add Hero"}
          </button>
        </form>

        {addHeroMutation.error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
            Error: {addHeroMutation.error.message}
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
            Error loading users: {error.message}
          </div>
        )}

        {isLoading ? (
          <p className="text-sm text-[var(--sea-ink-soft)]">Loading users...</p>
        ) : (
          <ul className="space-y-1">
            {(users ?? []).map((user) => (
              <li
                key={user.id}
                className="rounded-lg bg-white/60 border border-black/5 p-2 text-sm text-[var(--sea-ink)]"
              >
                {user.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
