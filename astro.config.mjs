import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import dcapConfig from "./src/admin/decap.config.mjs/index.js";
import astropodConfig from "./.astropod/astropod.config.json";
import robotsTxt from "astro-robots-txt";
import NetlifyCMS from 'astro-netlify-cms';


// https://astro.build/config
import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  site: astropodConfig.site,
  integrations: [
    robotsTxt({
      policy: [
        {
          userAgent: "*",
          allow: "/",
          disallow: "/admin",
        },
      ],
    }),
    mdx(),
    sitemap(),
    tailwind(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
      cacheDir: "./.cache/image",
      logLevel: "debug",
    }),

    NetlifyCMS({
      config: {
        backend: {
          name: 'git-gateway',
          branch: 'main',
        },
        collections: [
          {
            name: "episodes",
            label: "Episodes",
            label_singular: "Episode",
            folder: "src/content/episode",
            sortable_fields: ["title", "pubDate", "episode", "season"],
            create: true,
            delete: true,
            fields: [
              { name: "title", widget: "string", label: "Episode Title" },
              { name: "audioUrl", widget: "string", label: "Audio URL" },
              { name: "pubDate", widget: "date", label: "Publish Date", format: "DD MMM YYYY" },
              { name: "body", widget: "markdown", label: "Episode Body", required: false },
              { name: "voices", widget: "string", label: "Contributor" },
              { name: "keywords", widget: "string", label: "keywords" },
              { name: "intro", widget: "string", label: "Introduction" },
              {
                name: "duration",
                widget: "string",
                label: "Episode Duration",
                pattern: [
                  "^(?:[01]?[0-9]|2[0-3]):[0-5]?[0-9]:[0-5]?[0-9]$|^[0-5]?[0-9]:[0-5]?[0-9]$",
                  "Must have format hh:mm:ss or mm:ss",
                ],
              },
              { name: "size", widget: "number", label: "Episode Size (MB)", value_type: "float" },
              { name: "cover", widget: "image", label: "Custom Cover URL", required: false },
              { name: "explicit", widget: "boolean", label: "Explicit", required: false, default: astropodConfig.explicit },
              { name: "episode", widget: "number", label: "Episode", required: false },
              { name: "season", widget: "number", label: "Season", required: false },
              {
                name: "episodeType",
                widget: "select",
                label: "Episode Type",
                default: "full",
                options: [
                  { label: "Full", value: "full" },
                  { label: "Trailer", value: "trailer" },
                  { label: "Bonus", value: "bonus" },
                ],
              },
            ],
          },
        ],
      },
    }),
    
  ],
});
