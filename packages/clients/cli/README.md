gql
===

CLI client

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/gql.svg)](https://npmjs.org/package/gql)
[![Downloads/week](https://img.shields.io/npm/dw/gql.svg)](https://npmjs.org/package/gql)
[![License](https://img.shields.io/npm/l/gql.svg)](https://github.com/branchvincent/gql/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g gql
$ gql COMMAND
running command...
$ gql (-v|--version|version)
gql/0.0.0 darwin-x64 node-v15.13.0
$ gql --help [COMMAND]
USAGE
  $ gql COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`gql hello [FILE]`](#gql-hello-file)
* [`gql help [COMMAND]`](#gql-help-command)

## `gql hello [FILE]`

describe the command here

```
USAGE
  $ gql hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ gql hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/branchvincent/gql/blob/v0.0.0/src/commands/hello.ts)_

## `gql help [COMMAND]`

display help for gql

```
USAGE
  $ gql help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_
<!-- commandsstop -->
