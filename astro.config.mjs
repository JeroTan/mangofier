// @ts-check
import { defineConfig, envField } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  image: {
    // Allow processing all images from remote. This allow modifying the images size depending on the device.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.placehold.co",
      },
      {
        protocol: "https",
        hostname: "**.gomanga-api.vercel.app",
      },
    ],
  },
  env: {
    schema: {
      SECRET_MANGA_API_URL: envField.string({ context: "server", access: "secret", default: "abc.com" }),
      SECRET_MANWHA_API_URL: envField.string({ context: "server", access: "secret", default: "abc.com" }),
    },
  },
  output: "server",
  server: {
    port: 7890,
    host: true,
  },
  devToolbar: {
    enabled: false,
  },

  adapter: cloudflare({
    imageService: "passthrough",
  }),

  vite: {
    ssr: {
      external: ["node:buffer"],
    },
    plugins: [tailwindcss()],
    define: {
      'process.env.SECRET_MANGA_API_URL':JSON.stringify(process.env.SECRET_MANGA_API_URL),
      'process.env.SECRET_MANWHA_API_URL':JSON.stringify(process.env.SECRET_MANWHA_API_URL),
    }
  },
  i18n: {
    defaultLocale: "ph",
    locales: ["en", "ph"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      filter: (page) =>
        page !== "https://mangofier.com/auth/" &&
        page !== "https://mangofier.com/500" &&
        page !== "https://mangofier.com/404",
      i18n: {
        defaultLocale: "ph",
        locales: {
          en: "en-PH",
          ph: "ph-PH",
        },
      },
    }),
  ],
  site: "https://mangofier.com",
});
