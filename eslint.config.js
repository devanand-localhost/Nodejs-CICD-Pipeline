// eslint.config.js
import nodeGlobals from 'globals/node';
import mochaGlobals from 'globals/mocha';
import es2021Globals from 'globals/es2021';
import eslintRecommended from '@eslint/js';

export default [
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