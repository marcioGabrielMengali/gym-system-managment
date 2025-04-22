import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['src/**/*.ts'],
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'no-unused-vars': ['error'],
    },
  },
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      '**/build/**',
      '**/lib/**',
      '**/out/**',
    ],
  },
  tseslint.configs.recommended,
]);
