import { Command } from '@oclif/command'

import createClient from './client'

interface QueryHandlerProps {
  command: Command
  query: string
  variables?: Record<string, unknown>
}

export default async function handler({
  command,
  query,
  variables,
}: QueryHandlerProps): Promise<void> {
  const client = createClient()
  try {
    const result = await client.request(query, variables)
    const resultStr = JSON.stringify(result, null, '  ')
    return command.log(resultStr)
  } catch (error) {
    return command.error(error)
  }
}
