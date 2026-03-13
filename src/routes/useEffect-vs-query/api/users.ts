import { createFileRoute } from "@tanstack/react-router";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

export type DemoUser = {
  id: number;
  name: string;
};

const defaultUsers: DemoUser[] = [
  { id: 1, name: "Ada Lovelace" },
  { id: 2, name: "Grace Hopper" },
  { id: 3, name: "Alan Turing" },
  { id: 4, name: "Margaret Hamilton" },
  { id: 5, name: "Donald Knuth" },
  { id: 6, name: "Katherine Johnson" },
];

const usersFilePath = resolve(
  process.cwd(),
  ".local-data",
  "use-effect-vs-query-users.json",
);

export let users: DemoUser[] = [...defaultUsers];

async function ensureUsersFile(): Promise<DemoUser[]> {
  try {
    const fileContents = await readFile(usersFilePath, "utf-8");
    const parsed = JSON.parse(fileContents) as DemoUser[];

    if (!Array.isArray(parsed)) {
      throw new Error("Invalid users file shape");
    }

    return parsed.filter(
      (user): user is DemoUser =>
        typeof user?.id === "number" && typeof user?.name === "string",
    );
  } catch {
    await mkdir(dirname(usersFilePath), { recursive: true });
    await writeFile(usersFilePath, JSON.stringify(defaultUsers, null, 2), "utf-8");
    return [...defaultUsers];
  }
}

async function persistUsers(nextUsers: DemoUser[]) {
  await mkdir(dirname(usersFilePath), { recursive: true });
  await writeFile(usersFilePath, JSON.stringify(nextUsers, null, 2), "utf-8");
  users = nextUsers;
}

export async function addCsHero(name: string): Promise<DemoUser> {
  const currentUsers = await ensureUsersFile();
  const hero: DemoUser = {
    id:
      currentUsers.length === 0
        ? 1
        : Math.max(...currentUsers.map((user) => user.id)) + 1,
    name,
  };
  const nextUsers = [...currentUsers, hero];
  await persistUsers(nextUsers);
  return hero;
}

export const Route = createFileRoute("/useEffect-vs-query/api/users")({
  server: {
    handlers: {
      GET: async () => {
        // Tiny delay makes request behavior easier to see in demos.
        await new Promise((resolve) => setTimeout(resolve, 250));
        users = await ensureUsersFile();
        return Response.json(users);
      },
    },
  },
});
