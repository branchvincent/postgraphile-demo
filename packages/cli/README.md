CLI
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
$ npm install -g cli
$ gql COMMAND
running command...
$ gql (-v|--version|version)
cli/0.0.0 darwin-x64 node-v15.13.0
$ gql --help [COMMAND]
USAGE
  $ gql COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`gql auth:login`](#gql-authlogin)
* [`gql auth:logout`](#gql-authlogout)
* [`gql auth:status`](#gql-authstatus)
* [`gql config [KEY] [VALUE]`](#gql-config-key-value)
* [`gql help [COMMAND]`](#gql-help-command)
* [`gql users:create`](#gql-userscreate)
* [`gql users:list`](#gql-userslist)

## `gql auth:login`

login

```
USAGE
  $ gql auth:login

OPTIONS
  -h, --help               show CLI help
  -p, --password=password  password
  -u, --username=username  username
```

## `gql auth:logout`

logout

```
USAGE
  $ gql auth:logout

OPTIONS
  -h, --help  show CLI help
```

## `gql auth:status`

Get current user

```
USAGE
  $ gql auth:status

OPTIONS
  -h, --help  show CLI help
```

## `gql config [KEY] [VALUE]`

manage configuration

```
USAGE
  $ gql config [KEY] [VALUE]

ARGUMENTS
  KEY    key of the config
  VALUE  value of the config

OPTIONS
  -c, --config=config  config file location
  -d, --delete         delete?
  -h, --help           show CLI help
```

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

## `gql users:create`

Create a new user

```
USAGE
  $ gql users:create

OPTIONS
  -h, --help             show CLI help
  --email=email          (required)
  --firstName=firstName  (required)
  --lastName=lastName    (required)
  --password=password    (required)
```

## `gql users:list`

List all users

```
USAGE
  $ gql users:list

OPTIONS
  -h, --help         show CLI help
  --after=after
  --before=before
  --first=first
  --last=last
  --offset=offset
  --orderBy=orderBy  (required)
```
<!-- commandsstop -->
