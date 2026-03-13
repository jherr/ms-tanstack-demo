import { createFileRoute } from "@tanstack/react-router";
import { addCsHero } from "./users";

type AddHeroBody = {
  name?: string;
};

export const Route = createFileRoute("/useEffect-vs-query/api/add-hero")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const body = (await request.json()) as AddHeroBody;
        const name = body.name?.trim();

        if (!name) {
          return Response.json(
            { error: "Name is required." },
            {
              status: 400,
            },
          );
        }

        const hero = await addCsHero(name);
        return Response.json(hero, { status: 201 });
      },
    },
  },
});
