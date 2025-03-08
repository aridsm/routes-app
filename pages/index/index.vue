<script lang="tsx" setup>
const emits = defineEmits<{
  (name: "set-polyline", polyline: any): void;
  (name: "set-points"): void;
}>();

const routeForm = defineModel<Route>({ required: true });

defineProps({
  hoveredPoint: {
    type: Object as PropType<Destiny>,
  },
});
</script>

<template>
  <main class="flex-1 min-h-0 flex flex-col">
    <AppFormRoute
      :hovered-point="hoveredPoint"
      v-model="routeForm"
      @set-polyline="emits('set-polyline', $event)"
      @set-points="() => emits('set-points')"
    />
  </main>
</template>

<style scoped>
.item-step + .item-step {
  @apply pt-4 mt-4 border-t border-t-base-200;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
}
.v-enter-from,
.v-leave-to {
  transform: translateY(-50%);
  opacity: 0;
}
</style>
