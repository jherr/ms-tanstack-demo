import { zodValidator } from '@tanstack/zod-adapter'
import { createMiddleware, createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

const createGreetingSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  excitementLevel: z.number().int().min(1).max(5),
})

const requestIdMiddleware = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    const requestId = `req_${Math.random().toString(36).slice(2, 10)}`
    return next({ context: { requestId } })
  },
)

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// --- GET: returns plain JSON ---
export const getServerStatus = createServerFn({ method: 'GET' }).handler(
  async () => ({
    message: 'Server functions are awesome.',
    nowIso: new Date().toISOString(),
    runtime: process.env.NODE_ENV ?? 'development',
  }),
)

// --- POST: validates input with Zod before running ---
export const createGreeting = createServerFn({ method: 'POST' })
  .inputValidator(zodValidator(createGreetingSchema))
  .handler(async ({ data }) => ({
    greeting: `Hello, ${data.name}${'!'.repeat(data.excitementLevel)}`,
    acceptedAt: new Date().toISOString(),
  }))

// --- GET: middleware injects a requestId into context ---
export const getMiddlewareMessage = createServerFn({ method: 'GET' })
  .middleware([requestIdMiddleware])
  .handler(async ({ context }) => ({
    message: 'Middleware ran and injected a requestId into context.',
    requestId: context.requestId,
  }))

export type StreamChunk = { index: number; text: string }

// --- HTTP stream: async generator yields typed chunks ---
export const getHttpStream = createServerFn({ method: 'GET' }).handler(
  async function* (): AsyncGenerator<StreamChunk> {
    for (let i = 1; i <= 5; i++) {
      await sleep(1000)
      yield {
        index: i,
        text: `HTTP timer fired (${i}/5) at ${new Date().toLocaleTimeString()}`,
      }
    }
  },
)
