export const useSavedRoutesStore = defineStore("savedRoutes", () => {
  const routes = ref<Route[]>([]);
  const lastId = ref(0);

  function saveRoute(route: Route): Route {
    if (route.id) {
      let index = routes.value.findIndex((r) => r.id === route.id);
      if (index >= 0) {
        routes.value[index] = JSON.parse(JSON.stringify(route));
      }
      return routes.value[index];
    } else {
      const newRoute = {
        ...route,
        id: lastId.value + 1,
      };
      routes.value.push(newRoute);

      ++lastId.value;

      return newRoute;
    }
  }

  function deleteRoute(id: number) {
    const index = routes.value.findIndex((r) => r.id === id);
    if (index >= 0) routes.value.splice(index, 1);
  }

  function getRouteById(id: number) {
    return routes.value.find((route) => route.id === id);
  }

  return { routes, saveRoute, deleteRoute, getRouteById };
});
