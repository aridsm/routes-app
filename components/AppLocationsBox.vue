<script lang="tsx" setup>
import Draggable from "vuedraggable";

const props = defineProps({
  hoveredPoint: {
    type: Object as PropType<Destiny>,
  },
});

const emits = defineEmits<{
  (name: "set-points"): void;
}>();

const destinies = defineModel<Destiny[]>({ required: true });
const draggingId = ref<number>();
function onStart(e: any) {
  draggingId.value = e.item.__draggable_context.element.id;
}

function onEnd() {
  draggingId.value = undefined;
}
</script>

<template>
  <Draggable
    v-model="destinies"
    :animation="200"
    item-key="id"
    handle=".handle"
    group="destinies"
    @start="onStart"
    @end="onEnd"
  >
    <template #item="{ element, index }">
      <AppInputLocation
        :key="element.id"
        :destiny="element"
        @change="Object.assign(element, $event)"
        class="flex-1 block mb-1"
        :class="{
          ' !border-primary-1 border-dashed opacity-60':
            draggingId === element.id || hoveredPoint?.id === element.id,
        }"
        :index="index"
        @delete="destinies.splice(index, 1), emits('set-points')"
        @set-points="emits('set-points')"
      />
    </template>
  </Draggable>
</template>
