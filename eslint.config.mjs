import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["src/**/*.ts"],
    rules: {
      quotes: ["error", "single"],
      semi: ["error", "always"],
      "no-unused-vars": ["error"],
      indent: ["error", 2],
    },
  },
]);
