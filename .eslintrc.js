// eslint-disable-next-line  @typescript-eslint/no-var-requires
const { readGitignoreFiles } = require('eslint-gitignore')

module.exports = {
  ignorePatterns: readGitignoreFiles({ cwd: __dirname }),
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  // parserOptions: {
  //   ecmaVersion: 12,
  //   sourceType: module,
  // },
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
}
