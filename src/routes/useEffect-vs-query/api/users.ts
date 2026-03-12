import { createFileRoute } from "@tanstack/react-router";

type DemoUser = {
  id: number;
  name: string;
};

const users: DemoUser[] = [
  { id: 1, name: "Ada Lovelace" },
  { id: 2, name: "Grace Hopper" },
  { id: 3, name: "Alan Turing" },
  { id: 4, name: "Margaret Hamilton" },
  { id: 5, name: "Donald Knuth" },
  { id: 6, name: "Katherine Johnson" },
];

export const Route = createFileRoute("/useEffect-vs-query/api/users")({
  server: {
    handlers: {
      GET: async () => {
        // Tiny delay makes request behavior easier to see in demos.
        await new Promise((resolve) => setTimeout(resolve, 250));
        return Response.json(users);
      },
    },
  },
});
