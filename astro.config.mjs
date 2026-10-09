// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // Set by .github/workflows/preview.yml to serve from <user>.github.io/<repo>/<branch>/
  site: process.env.SITE,
  base: process.env.BASE_PATH,
  vite: {
    plugins: [tailwindcss()],
  },
});
