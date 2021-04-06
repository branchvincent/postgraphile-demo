# Codegen

We can leverage our GraphQL schema to generate client code via [GraphQL Code Generator](https://graphql-code-generator.com/).

## Setup

To install, first make sure our graph server is up and then run the following:

```bash
npm install
```

This will install and generate the following:

* `cli/`: A CLI client
* `sdk/`: A TypeScript + JavaScript SDK

## CLI

The CLI generator uses the documents `cli/src/commands/*.graphql` to produce associated typescript commands at `cli/src/commands/*.ts`.

To use after generating:

```bash
./cli/bin/run --help
```
