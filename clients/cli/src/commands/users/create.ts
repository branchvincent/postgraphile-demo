import * as Types from '../../types';

import { Command, flags } from '@oclif/command'
import handler from '../../handler'
import gql from 'graphql-tag';

const RegisterUserDocument = `
mutation RegisterUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  registerUser(
    input: {firstName: $firstName, lastName: $lastName, email: $email, password: $password}
  ) {
    clientMutationId
    user {
      id
      firstName
      lastName
    }
  }
}`

export default class RegisterUser extends Command {
  
static description = "Create a new user";

  
static examples: string[] = [];

  static flags = {
    help: flags.help({ char: 'h' }),
    firstName: flags.string({
      multiple: false,
      required: true,
    }),
    lastName: flags.string({
      multiple: false,
      required: true,
    }),
    email: flags.string({
      multiple: false,
      required: true,
    }),
    password: flags.string({
      multiple: false,
      required: true,
    })
  };

  async run() {
    const { flags } = this.parse(RegisterUser);
    await handler({ command: this, query: RegisterUserDocument, variables: flags });
  }
}
