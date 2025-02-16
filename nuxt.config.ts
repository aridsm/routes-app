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
  // plugins: ["~/plugins/service-worker-registration.ts"],
  css: [
    "~/assets/main.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
    "leaflet/dist/leaflet.css",
  ],
  i18n: {
    vueI18n: "./i18n.config.ts",
  },
  modules: ["@pinia/nuxt", "@nuxtjs/i18n", "@vite-pwa/nuxt"],
  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "Routes PWA",
      short_name: "Routes PWA",
      description: "Search for routes using Leaftet and OpenRouteService",
      theme_color: "#E8E5F2",
      background_color: "#E8E5F2",
      display: "standalone",
      start_url: "/",
      icons: [
        {
          src: "android/android-launchericon-512-512.png",
          sizes: "512x",
          type: "image/png",
        },
        {
          src: "android/android-launchericon-192-192.png",
          sizes: "192x",
          type: "image/png",
        },
        {
          src: "android/android-launchericon-144-144.png",
          sizes: "144x",
          type: "image/png",
        },
        {
          src: "android/android-launchericon-96-96.png",
          sizes: "96x",
          type: "image/png",
        },
        {
          src: "android/android-launchericon-72-72.png",
          sizes: "72x",
          type: "image/png",
        },
        {
          src: "android/android-launchericon-48-48.png",
          sizes: "48x",
          type: "image/png",
        },
        {
          src: "ios/16.png",
          sizes: "16x",
          type: "image/png",
        },
        {
          src: "ios/20.png",
          sizes: "20x",
          type: "image/png",
        },
        {
          src: "ios/29.png",
          sizes: "29x",
        },
        {
          src: "ios/32.png",
          sizes: "32x",
          type: "image/png",
        },
        {
          src: "ios/40.png",
          sizes: "40x",
          type: "image/png",
        },
        {
          src: "ios/50.png",
          sizes: "50x",
          type: "image/png",
        },
        {
          src: "ios/57.png",
          sizes: "57x",
          type: "image/png",
        },
        {
          src: "ios/58.png",
          sizes: "58x",
          type: "image/png",
        },
        {
          src: "ios/60.png",
          sizes: "60x60",
          type: "image/png",
        },
        {
          src: "ios/64.png",
          sizes: "64x",
          type: "image/png",
        },
        {
          src: "ios/72.png",
          sizes: "72x",
          type: "image/png",
        },
        {
          src: "ios/76.png",
          sizes: "76x",
          type: "image/png",
        },
        {
          src: "ios/80.png",
          sizes: "80x80",
          type: "image/png",
        },
        {
          src: "ios/87.png",
          sizes: "87x",
          type: "image/png",
        },
        {
          src: "ios/100.png",
          sizes: "100x",
          type: "image/png",
        },
        {
          src: "ios/114.png",
          sizes: "114x",
          type: "image/png",
        },
        {
          src: "ios/120.png",
          sizes: "120x",
          type: "image/png",
        },
        {
          src: "ios/128.png",
          sizes: "128x",
          type: "image/png",
        },
        {
          src: "ios/144.png",
          sizes: "144x",
          type: "image/png",
        },
        {
          src: "ios/152.png",
          sizes: "152x",
          type: "image/png",
        },
        {
          src: "ios/167.png",
          sizes: "167x",
          type: "image/png",
        },
        {
          src: "ios/180.png",
          sizes: "180x",
          type: "image/png",
        },
        {
          src: "ios/192.png",
          sizes: "192x",
          type: "image/png",
        },
        {
          src: "ios/256.png",
          sizes: "256x",
          type: "image/png",
        },
        {
          src: "ios/512.png",
          sizes: "512x",
          type: "image/png",
        },
        {
          src: "ios/1024.png",
          sizes: "1024x",
          type: "image/png",
        },
      ],
    },
    workbox: {
      runtimeCaching: [
        {
          handler: "NetworkFirst",
          urlPattern: "**/*.{js,css,html,png,svg,ico}",
          options: {
            cacheName: "routes-app",
            expiration: {
              maxEntries: 70,
              maxAgeSeconds: 3600,
            },
          },
        },
      ],
    },
  },
  app: {
    head: {
      link: [
        {
          rel: "icon",
          href: "android/android-launchericon-512-512.png",
          sizes: "512x512",
        },
        {
          rel: "icon",
          href: "android/android-launchericon-192-192.png",
          sizes: "192x192",
        },
        {
          rel: "apple-touch-icon",
          href: "ios/180.png",
        },
      ],
      meta: [
        { name: "mobile-web-app-capable", content: "yes" },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black-translucent",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
});
