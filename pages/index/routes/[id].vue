<script lang="tsx" setup>
const route = useRoute();
const { getRouteById } = useSavedRoutesStore();
const routeItem = ref<Route>();

onMounted(() => {
  routeItem.value = getRouteById(Number(route.params.id));
});
</script>

<template>
  <main class="flex-1 min-h-0 flex flex-col">
    <AppFormRoute
      v-if="routeItem"
      :item="routeItem"
      @set-item="routeItem = $event"
    />
  </main>
</template>

<style scoped></style>
