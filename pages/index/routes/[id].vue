<script lang="tsx" setup>
const route = useRoute();
const { getRouteById } = useSavedRoutesStore();
const routeItem = ref<Route>();

const emits = defineEmits<{
  (name: "set-polyline", polyline: any): void;
  (name: "set-points", destinies: Destiny[]): void;
}>();

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
      @set-polyline="emits('set-polyline', $event)"
      @set-points="(destinies) => emits('set-points', destinies)"
    />
  </main>
</template>

<style scoped></style>
