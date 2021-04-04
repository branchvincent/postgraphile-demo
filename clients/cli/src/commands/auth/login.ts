import { Command, flags } from '@oclif/command'
import conf from '../../config';
import createClient from '../../client';
import gql from 'graphql-tag';
import cli from 'cli-ux'


const AuthenticateDocument = gql`
mutation authenticate($username: String!, $password: String!) {
  authenticate(input: {email: $username, password: $password}) {
    jwtToken
  }
}`

export default class Login extends Command {
  static description = 'login'

  static flags = {
    help: flags.help({ char: 'h' }),
    username: flags.string({ char: 'u', description: 'username' }),
    password: flags.string({ char: 'p', description: 'password' }),
  }

  async run() {
    const { args, flags } = this.parse(Login)
    const username = flags.username ?? await cli.prompt('Username');
    const password = flags.password ?? await cli.prompt('Password', { type: 'hide' });

    const client = createClient();
    const { authenticate: { jwtToken } } = await client.request(AuthenticateDocument, { username, password });
    if (!jwtToken) {
        this.log('Failed!')
    } else {
        conf.set('headers', { Authorization: `Bearer ${jwtToken}`});
        this.log('Success!');
    }
  }
}
