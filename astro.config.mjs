import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

import astropodConfig from "./.astropod/astropod.config.json";



// https://astro.build/config
export default defineConfig({
  site: astropodConfig.site,
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),

  ],
});
