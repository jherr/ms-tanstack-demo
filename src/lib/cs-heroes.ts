import { createServerFn } from '@tanstack/react-start'
import { getCsHeroes, type DemoUser } from '#/routes/useEffect-vs-query/api/users'

export const fetchCsHeroes = createServerFn({ method: 'GET' }).handler(
  async (): Promise<DemoUser[]> => getCsHeroes(),
)
