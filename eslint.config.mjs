import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['src/**/*.ts'],
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'no-unused-vars': ['error'],
      indent: ['error', 2],
      camelcase: ['error', { properties: 'always' }],
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
  },
]);
