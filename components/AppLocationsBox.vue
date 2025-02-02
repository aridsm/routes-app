<script lang="tsx" setup>
const props = defineProps({
  destinies: {
    type: Object as PropType<Destiny[]>,
    required: true,
  },
});

const draggingElIndex = ref(-1);
const hoveringElIndex = ref(-1);
const hoveringElBound = ref(0);

watch(
  () => [draggingElIndex.value, hoveringElIndex.value],
  () => {
    if (
      draggingElIndex.value >= 0 &&
      hoveringElIndex.value >= 0 &&
      draggingElIndex.value !== hoveringElIndex.value
    ) {
      const element = props.destinies.splice(draggingElIndex.value, 1);
      props.destinies.splice(hoveringElIndex.value, 0, element[0]);
      draggingElIndex.value = hoveringElIndex.value;
    }
  }
);
</script>

<template>
  <TransitionGroup name="list">
    <AppInputLocation
      v-for="(destiny, index) in destinies"
      :key="destiny.id"
      v-model:dragging-index="draggingElIndex"
      v-model:hovering-index="hoveringElIndex"
      v-model:hovering-bound="hoveringElBound"
      :destiny="destiny"
      @change="Object.assign(destiny, $event)"
      class="flex-1 block"
      :index="index"
      @delete="destinies.splice(index, 1)"
  /></TransitionGroup>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}
.list-enter-from,
.list-leave-to {
  transform: translateX(50px);
  opacity: 0;
}
</style>
