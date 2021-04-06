import express from 'express';
import { postgraphile } from 'postgraphile';

import { database, options, schemas } from './config.js';

const app = express();

const middleware = postgraphile(database, schemas, options);

app.use(middleware);

export default app;