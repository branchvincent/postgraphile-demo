import express from 'express';
import { postgraphile } from 'postgraphile';
import { database, schemas, options } from './config.js';

const app = express();

const middleware = postgraphile(database, schemas, options);

app.use(middleware);

export default app;
