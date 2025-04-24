import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig(({ mode }) => ({
  test: {
    setupFiles: ["__tests__/setup.ts"],
    env: loadEnv(mode, process.cwd(), ""),
  },
}));
