import { Command, flags } from '@oclif/command'
import gql from 'graphql-tag'

import createClient from '../../client'

const CurrentUserDocument = gql`
  query CurrentUser {
    currentUser {
      id
      fullName
    }
  }
`

export default class Status extends Command {
  static description = 'Get current user'

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  async run(): Promise<void> {
    const { flags } = this.parse(Status)
    const client = createClient()
    const { currentUser } = await client.request(CurrentUserDocument, flags)
    if (currentUser) {
      const { fullName } = currentUser
      this.log(`Authenticated as ${fullName}`)
    } else {
      this.error('Not logged!')
    }
  }
}
