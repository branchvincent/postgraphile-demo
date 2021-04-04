# PostGraphile

## Setup

1. Install deps

   ```console
   npm install
   ```

2. Start server

   ```console
   npm run dev
   ```

By default, the following services will be available:

- Postgres at <postgres://user:pass@localhost:5432/db>
- GraphQL server at <http://localhost:3000/graphiql>

## Migrations

```console
npx graphile-migrate watch
npx graphile-migrate commit/uncommit
npx graphile-migrate reset
```
