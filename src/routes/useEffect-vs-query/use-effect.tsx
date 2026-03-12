import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/useEffect-vs-query/use-effect")({
  component: UseEffectVersion,
});

const API_URL = "/useEffect-vs-query/api/users";

function UseEffectVersion() {
  const [users, setUsers] = useState<Array<{ id: number; name: string }>>([]);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch(API_URL);
      const data = await res.json();
      setUsers(data);
    }
    if (started) {
      fetchUsers();
    }
  }, [started, users]);

  return (
    <div className="page-wrap px-4 pb-8 pt-14">
      <div className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14 max-w-2xl mx-auto">
        <p className="island-kicker mb-1 text-red-600">Broken</p>
        <h1 className="display-title mb-2 text-3xl font-bold tracking-tight text-[var(--sea-ink)]">
          useEffect Version
        </h1>
        <p className="mb-6 text-sm text-[var(--sea-ink-soft)]">
          Effect depends on <code>started</code> and <code>users</code>. Setting{" "}
          <code>users</code> inside the effect triggers a re-render, so the
          effect runs again → infinite loop.
        </p>

        {!started ? (
          <button
            onClick={() => setStarted(true)}
            className="rounded-full border border-red-300 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-700 transition hover:-translate-y-0.5 hover:bg-red-100 cursor-pointer"
          >
            Start (triggers infinite loop)
          </button>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-red-600">
              Check the network tab — requests are looping.
            </p>
            {users.length > 0 && (
              <ul className="space-y-1">
                {users.slice(0, 5).map((user) => (
                  <li
                    key={user.id}
                    className="rounded-lg bg-white/60 border border-black/5 p-2 text-sm text-[var(--sea-ink)]"
                  >
                    {user.name}
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => setStarted(false)}
              className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:-translate-y-0.5 cursor-pointer"
            >
              Stop
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
