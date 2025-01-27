// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  typescript: {
    typeCheck: true,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: [
    "~/assets/main.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
    "leaflet/dist/leaflet.css",
  ],
  i18n: {
    vueI18n: "./i18n.config.ts",
  },
  modules: ["@pinia/nuxt", "@nuxtjs/i18n"],
  app: {
    head: {
      meta: [
        { name: "apple-mobile-web-app-capable", content: "yes" },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black-translucent",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
});
