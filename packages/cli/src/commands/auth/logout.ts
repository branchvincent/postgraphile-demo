import { Command, flags } from '@oclif/command'

import conf from '../../config'

export default class Logout extends Command {
  static description = 'logout'

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  async run(): Promise<void> {
    conf.delete('headers')
  }
}
