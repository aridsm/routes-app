<script lang="tsx" setup>
const emits = defineEmits<{
  (name: "set-polyline", polyline: any): void;
  (name: "set-points", points: any, destinies: Destiny[]): void;
  (name: "set-summary", summary: Summary): void;
}>();
</script>

<template>
  <main class="flex-1 min-h-0 flex flex-col">
    <AppFormRoute
      @set-polyline="emits('set-polyline', $event)"
      @set-points="
        (points, destinies) => emits('set-points', points, destinies)
      "
      @set-summary="emits('set-summary', $event)"
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
