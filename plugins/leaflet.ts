export default defineNuxtPlugin(async (nuxtApp) => {
  if (process.client) {
    const { default: L } = await import("leaflet");

    nuxtApp.vueApp.provide("L", L);
  }
});
