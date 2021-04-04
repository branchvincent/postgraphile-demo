# Database

## Migrations

Database migrations use [graphile-migrate](https://github.com/graphile/migrate).
### [afterReset.sql](./migrations/afterReset.sql)

This file is ran once only, when you reset (or create) your database. It
currently grants permissions to the relevant roles and creates the required
extensions. It's expected that this is ran with database superuser privileges as
normal users often don't have sufficient permissions to install extensions.

### [current.sql](./migrations/current.sql)

This is where your new database changes go. They need to be idempotent.
The `yarn start` command will automatically watch this file and re-run it whenever
it changes, updating your database in realtime.

**IMPORTANT**: because we use `ignoreRBAC: false` in PostGraphile's
configuration, new tables _will not show up_ until you `GRANT` permissions on
them.

```sql
create table app_public.my_new_table (
  id serial primary key,
  my_column text
);

-- Doesn't appear until we add:
grant
  select,
  insert (my_column),
  update (my_column),
  delete
on app_public.my_new_table to :DATABASE_VISITOR;
```

### [committed](./migrations/committed)

When you're happy with the changes you have made, you can commit your migration
with

```
yarn db commit
```

This will call `graphile-migrate commit` which involves moving `current.sql`
into the `committed` folder, and hashing it to prevent later modifications
(which should instead be done with additional migrations).

If you've not yet merged your changes (and no-one else has ran them) then you
can run

```
yarn db uncommit
```

and it will perform the reverse of this process so that you may modify the
migrations again.

## Roles

Graphile Starter uses three roles:

- `DATABASE_OWNER` - this is the role that owns the database (**not** the
  database cluster, just the individual database); i.e. it's the role that runs
  all the migrations and owns the resulting schemas, tables and functions.
- `DATABASE_AUTHENTICATOR` - this is the role that PostGraphile connects to the
  database with; it has absolutely minimal permissions (only enough to run the
  introspection queries, and the ability to "switch to" `DATABASE_VISITOR`
  below). When a GraphQL request comes in, we connect to the database as
  `DATABASE_AUTHENTICATOR` and then start a transaction and evaluate the
  equivalent of `SET LOCAL role TO 'DATABASE_VISITOR'`. You might choose to add
  more visitor-like roles (such as an admin role), but the maintainer finds that
  the single role solution tends to be more straightforward and has been
  sufficient for all his needs.
- `DATABASE_VISITOR` - this is the role that the SQL generated from GraphQL
  queries runs as, it's what the vast majority of your `GRANT`s will reference
  and the row level security policies will apply to. It represents both logged
  in AND logged out users to your GraphQL API - it's assumed that your Row Level
  Security policies will deferentiate between these states (and any other
  "application roles" the user may have) to determine what they are permitted to
  do.

The `DATABASE_OWNER` role is also used for certain "elevated privilege"
operations such as login and user registration. Note that `SECURITY DEFINER`
functions adopt the security level of the role that defined the function (as
opposed to `SECURITY INVOKER` which uses the security of the role that is
invoking the function), so you should therefore **make sure to create all
schema, tables, etc. with the `DATABASE_OWNER` in all environments** (local,
dev, production), not with your own user role nor the default superuser role
(often named `postgres`). This ensures that the system behaves as expected when
graduating from your local dev environment to hosted database systems in
production.
