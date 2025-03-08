export default defineNuxtRouteMiddleware((to, from) => {
  const { getRouteById } = useSavedRoutesStore();

  if (to.name === "index-routes-id" && !getRouteById(Number(to.params.id))) {
    return navigateTo("/");
  }
});
