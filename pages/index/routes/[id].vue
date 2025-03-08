<script lang="tsx" setup>
const route = useRoute();
const { getRouteById } = useSavedRoutesStore();
const routeItem = ref<Route>();
const routeForm = defineModel<Route>({ required: true });

defineProps({
  hoveredPoint: {
    type: Object as PropType<Destiny>,
  },
});

const emits = defineEmits<{
  (name: "set-polyline", polyline: any): void;
  (name: "set-points"): void;
}>();

onMounted(() => {
  routeItem.value = getRouteById(Number(route.params.id));
});
</script>

<template>
  <main class="flex-1 min-h-0 flex flex-col">
    <AppFormRoute
      v-if="routeItem"
      :hovered-point="hoveredPoint"
      v-model="routeForm"
      :item="routeItem"
      @set-item="routeItem = $event"
      @set-polyline="emits('set-polyline', $event)"
      @set-points="() => emits('set-points')"
    />
  </main>
</template>

<style scoped></style>
