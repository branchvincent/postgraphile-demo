import Conf from 'conf'

const schema = {
  url: {
    type: 'string',
    // format: 'url',
    default: 'http://localhost:3000/graphql',
  },
  headers: {
    type: 'object',
    default: {},
  },
  foo: {
    type: 'string',
    default: 'bar',
  },
};

const config = new Conf({ schema });

export default config;
