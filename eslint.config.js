// eslint.config.js
const nodeGlobals = require('globals/node');
const mochaGlobals = require('globals/mocha');
const es2021Globals = require('globals/es2021');
const eslintRecommended = require('@eslint/js');

module.exports = [
  {
    languageOptions: {
      globals: {
        ...nodeGlobals, // Node.js globals
        ...mochaGlobals, // Mocha globals
        ...es2021Globals, // ES2021 globals
      },
      ecmaVersion: 'latest',
    },
    rules: {
      'no-console': 'off',
      indent: ['warn', 2],
      'linebreak-style': ['warn', 'unix'],
      quotes: ['warn', 'single'],
      semi: ['warn', 'always'],
    },
  },
  eslintRecommended.configs.recommended,
];