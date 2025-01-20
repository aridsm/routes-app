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
  modules: ["@pinia/nuxt"],
});
