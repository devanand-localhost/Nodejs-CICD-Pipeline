module.exports = {
  env: {
    node: true,
    mocha: true,
    es2021: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-console': 'off'
  }
};
