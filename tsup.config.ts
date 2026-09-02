import { defineConfig } from "tsup";

export default defineConfig({
  esbuildOptions(options) {
    options.banner = { js: '"use client";' };
  },
});
