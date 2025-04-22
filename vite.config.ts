import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vitest-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    include: ['**/*.spec.ts'],
    coverage: {
      include: ['src/http/use-cases/**'],
    },
  },
});
