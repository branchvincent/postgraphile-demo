import { Command, flags } from '@oclif/command'
import conf from '../config';

export default class Config extends Command {
  static description = 'manage configuration'

  static flags = {
    help: flags.help({ char: 'h' }),
    delete: flags.boolean({ char: 'd', description: 'delete?' }),
    config: flags.string({ char: 'c', description: 'config file location' }),
  }

  static args = [
    { name: 'key', description: 'key of the config' },
    { name: 'value', description: 'value of the config' }
  ]

  async run() {
    const { args, flags } = this.parse(Config)

    if (args.key && flags.delete) {
        // Delete key
        conf.delete(args.key)
    } else if (args.key && args.value) {
        // Set key=value
        conf.set(args.key, JSON.parse(args.value));
    } else if (args.key) {
        // Display key
        const value = conf.get(args.key);
        this.log(value);
    } else {
        // Display all
        this.log(`${conf.path}:`);
        for (let [key, value] of conf) {
            this.log(`  ${key} = ${JSON.stringify(value)}`)
        }
    }
  }
}
