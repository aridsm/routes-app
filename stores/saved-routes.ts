export const useSavedRoutesStore = defineStore("savedRoutes", () => {
  const routes = ref<Route[]>([]);

  function saveRoute(route: Route) {
    if (route.id) {
      const existingRoute = routes.value.find((r) => r.id === route.id);
      if (existingRoute) {
        Object.assign(existingRoute, route);
      }
    } else {
      routes.value.push({
        ...route,
        id: Math.random(),
      });
    }
  }

  function deleteRoute(id: number) {
    const index = routes.value.findIndex((r) => r.id === id);
    if (index >= 0) routes.value.splice(index, 1);
  }

  return { routes, saveRoute, deleteRoute };
});
