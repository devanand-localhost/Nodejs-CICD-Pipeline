// eslint.config.js
module.exports = [
  {
    languageOptions: {
      globals: {
        ...require('globals').node, // Node.js globals
        ...require('globals').mocha, // Mocha globals
        ...require('globals').es2021, // ES2021 globals
      },
      ecmaVersion: 'latest',
    },
    extends: 'eslint:recommended',
    rules: {
      'no-console': 'off',
      indent: ['warn', 2],
      'linebreak-style': ['warn', 'unix'],
      quotes: ['warn', 'single'],
      semi: ['warn', 'always'],
    },
  },
];