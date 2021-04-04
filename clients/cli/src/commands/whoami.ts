import * as Types from '../types';

import { Command, flags } from '@oclif/command'
import handler from '../handler'
import gql from 'graphql-tag';

const GetCurrentUserDocument = `
query getCurrentUser {
  currentUser {
    id
    firstName
    lastName
  }
}`

export default class getCurrentUser extends Command {

static description = "Get current user";


static examples: string[] = ["gql me"];

  static flags = {
    help: flags.help({ char: 'h' }),

  };

  async run() {
    const { flags } = this.parse(getCurrentUser);
    await handler({ command: this, query: GetCurrentUserDocument, variables: flags });
  }
}
