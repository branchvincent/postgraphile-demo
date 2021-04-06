import * as Types from '../../types';

import { Command, flags } from '@oclif/command'
import handler from '../../handler'
import gql from 'graphql-tag';

const UsersDocument = `
query Users($first: Int, $last: Int, $offset: Int, $orderBy: [UsersOrderBy!] = NATURAL, $before: Cursor, $after: Cursor) {
  users(
    first: $first
    last: $last
    offset: $offset
    orderBy: $orderBy
    before: $before
    after: $after
  ) {
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    nodes {
      firstName
      lastName
      updatedAt
      createdAt
      id
    }
  }
}`

export default class Users extends Command {
  
static description = "List all users";

  
static examples: string[] = [];

  static flags = {
    help: flags.help({ char: 'h' }),
    first: flags.integer({
      multiple: false,
      required: false,
    }),
    last: flags.integer({
      multiple: false,
      required: false,
    }),
    offset: flags.integer({
      multiple: false,
      required: false,
    }),
    orderBy: flags.string({
      multiple: true,
      required: true,
    }),
    before: flags.string({
      multiple: false,
      required: false,
    }),
    after: flags.string({
      multiple: false,
      required: false,
    })
  };

  async run() {
    const { flags } = this.parse(Users);
    await handler({ command: this, query: UsersDocument, variables: flags });
  }
}
