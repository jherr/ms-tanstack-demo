import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import {
  createGreeting,
  getHttpStream,
  getMiddlewareMessage,
  getServerStatus,
} from '#/lib/server-functions-are-awesome'

export const Route = createFileRoute('/server-functions-are-awesome/')({
  component: ServerFunctionsAreAwesomePage,
})

const BUTTON_BASE =
  'inline-flex items-center gap-2 rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-4 py-2 text-sm font-semibold text-[var(--lagoon-deep)] transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.22)] disabled:opacity-40 disabled:pointer-events-none'

const TAG_BASE =
  'inline-block rounded-full border px-3 py-1 text-xs font-semibold'

function DemoCard({
  tag,
  tagClass,
  title,
  description,
  children,
  wide,
}: {
  tag: string
  tagClass: string
  title: string
  description: string
  children: React.ReactNode
  wide?: boolean
}) {
  return (
    <article
      className={`island-shell feature-card rounded-2xl p-6${wide ? ' sm:col-span-2 lg:col-span-3' : ''}`}
    >
      <span className={`mb-3 ${TAG_BASE} ${tagClass}`}>{tag}</span>
      <h2 className="mt-2 mb-1 text-lg font-semibold text-[var(--sea-ink)]">
        {title}
      </h2>
      <p className="mb-4 text-sm text-[var(--sea-ink-soft)]">{description}</p>
      {children}
    </article>
  )
}

function ResultBox({ value }: { value: string }) {
  return (
    <pre className="mt-3 min-h-16 rounded-xl bg-[var(--chip-bg)] p-3 text-xs overflow-x-auto whitespace-pre-wrap">
      {value}
    </pre>
  )
}

function ServerFunctionsAreAwesomePage() {
  const sseUrl = '/server-functions-are-awesome/api/sse'
  const [jsonResult, setJsonResult] = useState<string>('')
  const [jsonLoading, setJsonLoading] = useState(false)

  const [postResult, setPostResult] = useState<string>('')
  const [postLoading, setPostLoading] = useState(false)
  const [name, setName] = useState('TanStack')
  const [excitementLevel, setExcitementLevel] = useState(3)

  const [middlewareResult, setMiddlewareResult] = useState<string>('')
  const [middlewareLoading, setMiddlewareLoading] = useState(false)

  const [httpStreamLines, setHttpStreamLines] = useState<string[]>([])
  const [httpStreamLoading, setHttpStreamLoading] = useState(false)

  const [sseLines, setSseLines] = useState<string[]>([])
  const [sseLoading, setSseLoading] = useState(false)
  const sseRef = useRef<EventSource | null>(null)

  useEffect(() => {
    return () => {
      sseRef.current?.close()
      sseRef.current = null
    }
  }, [])

  async function runGetJson() {
    setJsonLoading(true)
    setJsonResult('')
    try {
      const data = await getServerStatus()
      setJsonResult(JSON.stringify(data, null, 2))
    } catch (err) {
      setJsonResult(`Error: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setJsonLoading(false)
    }
  }

  async function onPostSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPostLoading(true)
    setPostResult('')
    try {
      const result = await createGreeting({ data: { name, excitementLevel } })
      setPostResult(JSON.stringify(result, null, 2))
    } catch (err) {
      setPostResult(
        `Validation error: ${err instanceof Error ? err.message : String(err)}`,
      )
    } finally {
      setPostLoading(false)
    }
  }

  async function runMiddleware() {
    setMiddlewareLoading(true)
    setMiddlewareResult('')
    try {
      const result = await getMiddlewareMessage()
      setMiddlewareResult(JSON.stringify(result, null, 2))
    } catch (err) {
      setMiddlewareResult(
        `Error: ${err instanceof Error ? err.message : String(err)}`,
      )
    } finally {
      setMiddlewareLoading(false)
    }
  }

  async function runHttpStream() {
    setHttpStreamLoading(true)
    setHttpStreamLines([])
    try {
      for await (const chunk of await getHttpStream()) {
        setHttpStreamLines((prev) => [
          ...prev,
          `chunk #${chunk.index}: ${chunk.text}`,
        ])
      }
    } catch (err) {
      setHttpStreamLines([
        `Error: ${err instanceof Error ? err.message : String(err)}`,
      ])
    } finally {
      setHttpStreamLoading(false)
    }
  }

  async function runSse() {
    sseRef.current?.close()
    sseRef.current = null
    setSseLoading(true)
    setSseLines([])

    const source = new EventSource(sseUrl)
    sseRef.current = source

    source.addEventListener('tick', (event) => {
      try {
        const parsed = JSON.parse((event as MessageEvent).data) as {
          step: number
          message: string
        }
        setSseLines((prev) => [
          ...prev,
          `[tick] step ${parsed.step}: ${parsed.message}`,
        ])
      } catch {
        setSseLines((prev) => [...prev, `[tick] ${(event as MessageEvent).data}`])
      }
    })

    source.addEventListener('done', () => {
      setSseLines((prev) => [...prev, '[done] stream complete'])
      source.close()
      if (sseRef.current === source) sseRef.current = null
      setSseLoading(false)
    })

    source.onerror = () => {
      setSseLines((prev) => [...prev, 'SSE connection closed'])
      source.close()
      if (sseRef.current === source) sseRef.current = null
      setSseLoading(false)
    }
  }

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.32),transparent_66%)]" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(47,106,74,0.18),transparent_66%)]" />
        <p className="island-kicker mb-3">Demo</p>
        <h1 className="display-title mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-tight text-[var(--sea-ink)] sm:text-5xl">
          Server Functions Are Awesome
        </h1>
        <p className="mb-0 max-w-3xl text-base text-[var(--sea-ink-soft)] sm:text-lg">
          GET &amp; POST server functions, Zod input validation, middleware
          context injection, typed HTTP streaming, and SSE-style streams — all
          with full type safety across the network boundary.
        </p>
      </section>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* GET + JSON */}
        <DemoCard
          tag="GET"
          tagClass="bg-emerald-100 text-emerald-800 border-emerald-200"
          title="GET + JSON"
          description="A GET server function that runs only on the server and returns plain JSON."
        >
          <button
            className={BUTTON_BASE}
            onClick={runGetJson}
            disabled={jsonLoading}
            type="button"
          >
            {jsonLoading ? 'Loading…' : 'Call getServerStatus()'}
          </button>
          {jsonResult && <ResultBox value={jsonResult} />}
        </DemoCard>

        {/* POST + Zod validation */}
        <DemoCard
          tag="POST + Zod"
          tagClass="bg-blue-100 text-blue-800 border-blue-200"
          title="POST + Validation"
          description="A POST server function with a Zod schema — shorten the name to trigger a validation error."
        >
          <form onSubmit={onPostSubmit} className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--sea-ink-soft)]">
                Name
              </label>
              <input
                className="w-full rounded-lg border border-[var(--line)] bg-[var(--chip-bg)] px-3 py-2 text-sm text-[var(--sea-ink)] outline-none focus:border-[var(--lagoon-deep)]"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="min 2 chars"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--sea-ink-soft)]">
                Excitement level: {excitementLevel}
              </label>
              <input
                type="range"
                min={1}
                max={5}
                value={excitementLevel}
                onChange={(e) => setExcitementLevel(Number(e.target.value))}
                className="w-full accent-[var(--lagoon-deep)]"
              />
            </div>
            <button className={BUTTON_BASE} disabled={postLoading} type="submit">
              {postLoading ? 'Posting…' : 'Call createGreeting()'}
            </button>
          </form>
          {postResult && <ResultBox value={postResult} />}
        </DemoCard>

        {/* Middleware */}
        <DemoCard
          tag="Middleware"
          tagClass="bg-purple-100 text-purple-800 border-purple-200"
          title="Middleware"
          description="Middleware intercepts the call, generates a requestId, and injects it into context before the handler runs."
        >
          <button
            className={BUTTON_BASE}
            onClick={runMiddleware}
            disabled={middlewareLoading}
            type="button"
          >
            {middlewareLoading ? 'Loading…' : 'Call getMiddlewareMessage()'}
          </button>
          {middlewareResult && <ResultBox value={middlewareResult} />}
        </DemoCard>

        {/* Streaming: HTTP + SSE side by side */}
        <DemoCard
          tag="Streaming"
          tagClass="bg-orange-100 text-orange-800 border-orange-200"
          title="HTTP Stream + SSE Stream"
          description="HTTP stream comes from a server function and is consumed with for await...of. SSE stream comes from an API route and is consumed with browser-native EventSource."
          wide
        >
          <div className="flex flex-wrap gap-3">
            <button
              className={BUTTON_BASE}
              onClick={runHttpStream}
              disabled={httpStreamLoading}
              type="button"
            >
              {httpStreamLoading ? 'Streaming…' : 'Start HTTP stream'}
            </button>
            <button
              className={BUTTON_BASE}
              onClick={runSse}
              disabled={sseLoading}
              type="button"
            >
              {sseLoading ? 'Streaming…' : 'Start SSE stream'}
            </button>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-1 text-xs font-semibold text-[var(--sea-ink)]">
                HTTP stream chunks
              </p>
              <pre className="min-h-20 rounded-xl bg-[var(--chip-bg)] p-3 text-xs overflow-x-auto whitespace-pre-wrap">
                {httpStreamLines.length > 0
                  ? httpStreamLines.join('\n')
                  : 'Press "Start HTTP stream" above.'}
              </pre>
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold text-[var(--sea-ink)]">
                SSE events
              </p>
              <pre className="min-h-20 rounded-xl bg-[var(--chip-bg)] p-3 text-xs overflow-x-auto whitespace-pre-wrap">
                {sseLines.length > 0
                  ? sseLines.join('\n')
                  : 'Press "Start SSE stream" above.'}
              </pre>
            </div>
          </div>
        </DemoCard>
      </div>
    </main>
  )
}
