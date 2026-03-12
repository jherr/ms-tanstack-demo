import { createServerFn } from '@tanstack/react-start'

/**
 * Base URL for the local api-server (Hono, no CORS).
 * Used by SSR Three Ways demo: loaders that run on the server can fetch this;
 * loaders that run on the client will fail due to CORS.
 */
export const API_SERVER_BASE =
  typeof window !== 'undefined'
    ? 'http://localhost:3001'
    : process.env.API_SERVER_URL ?? 'http://localhost:3001'

export type ApiServerData = {
  message: string
  timestamp: string
  source: string
}

/** Direct fetch to api-server. Fails when run on the client (no CORS). */
export async function rawFetchApiServerData(): Promise<ApiServerData> {
  const res = await fetch(`${API_SERVER_BASE}/api/data`)
  if (!res.ok) throw new Error(`api-server: ${res.status}`)
  return res.json()
}

/** Server function: runs on the app server and fetches from api-server. Safe to call from any loader. */
export const fetchApiServerData = createServerFn({ method: 'GET' }).handler(
  async (): Promise<ApiServerData> => {
    const base = process.env.API_SERVER_URL ?? 'http://localhost:3001'
    const res = await fetch(`${base}/api/data`)
    if (!res.ok) throw new Error(`api-server: ${res.status}`)
    return res.json()
  },
)
