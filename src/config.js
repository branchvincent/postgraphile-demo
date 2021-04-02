// See https://github.com/graphile/postgraphile/blob/v4/examples/servers/common.ts
import PgSimplifyInflectorPlugin from '@graphile-contrib/pg-simplify-inflector';

// Connection string (or pg.Pool) for PostGraphile to use
export const database = process.env.DATABASE_URL || 'postgraphile';

// Database schemas to use
export const schemas = ['public'];

// PostGraphile options; see https://www.graphile.org/postgraphile/usage-library/#api-postgraphilepgconfig-schemaname-options
export const options = {
  pgSettings(req) {
    // Adding this to ensure that all servers pass through the request in a
    // good enough way that we can extract headers.
    // CREATE FUNCTION current_user_id() RETURNS text AS $$ SELECT current_setting('graphile.test.x-user-id', TRUE); $$ LANGUAGE sql STABLE;
    return {
      'graphile.test.x-user-id':
        req.headers['x-user-id'] ||
        // `normalizedConnectionParams` comes from websocket connections, where
        // the headers often cannot be customized by the client.
        req.normalizedConnectionParams?.['x-user-id'],
    };
  },
  watchPg: true,
  graphiql: true,
  enhanceGraphiql: true,
  subscriptions: true,
  dynamicJson: true,
  setofFunctionsContainNulls: false,
  ignoreRBAC: false,
  showErrorStack: 'json',
  extendedErrors: ['hint', 'detail', 'errcode'],
  allowExplain: true,
  legacyRelations: 'omit',
  exportGqlSchemaPath: new URL('./graphql/schema.graphql', import.meta.url).pathname,
  sortExport: true,
  enableQueryBatching: true,
  appendPlugins: [PgSimplifyInflectorPlugin],
};

// Server port
export const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
