import {GraphQLClient} from 'graphql-request';

import config from './config'

export default function createClient() {
  const url = config.get('url') as string;
  const headers = config.get('headers') as object;
  return new GraphQLClient(url, { headers })
}