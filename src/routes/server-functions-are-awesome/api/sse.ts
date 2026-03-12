import { createFileRoute } from "@tanstack/react-router";

type SseEvent = {
  event: "tick";
  step: number;
  message: string;
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const Route = createFileRoute("/server-functions-are-awesome/api/sse")({
  server: {
    handlers: {
      GET: async () => {
        const encoder = new TextEncoder();

        const stream = new ReadableStream<Uint8Array>({
          async start(controller) {
            for (let i = 1; i <= 5; i++) {
              await sleep(1000);

              const payload: SseEvent = {
                event: "tick",
                step: i,
                message: `SSE timer fired (${i}/5) at ${new Date().toLocaleTimeString()}`,
              };

              controller.enqueue(
                encoder.encode(
                  `event: tick\ndata: ${JSON.stringify(payload)}\n\n`,
                ),
              );
            }

            controller.enqueue(
              encoder.encode('event: done\ndata: {"done":true}\n\n'),
            );
            controller.close();
          },
        });

        return new Response(stream, {
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          },
        });
      },
    },
  },
});
