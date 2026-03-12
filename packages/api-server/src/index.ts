import { Hono } from 'hono'
import { serve } from '@hono/node-server'

// No CORS — intentional. When the TanStack app's loader runs on the client,
// fetch() to this origin will fail (CORS). When the loader runs on the server, it works.
const app = new Hono()

app.get('/api/data', (c) => {
  return c.json({
    message: 'Data from api-server (no CORS)',
    timestamp: new Date().toISOString(),
    source: 'api-server',
  })
})

const port = Number(process.env.PORT) || 3001
serve({ fetch: app.fetch, port }, (info) => {
  console.log(`api-server listening on http://localhost:${info.port}`)
})
