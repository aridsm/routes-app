<script lang="tsx" setup generic="T">
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
  options: {
    type: Array as PropType<Option<T>[]>,
    required: true,
  },
  item: {
    type: Object as PropType<T>,
    required: true,
  },
});

const optionsShown = ref(false);
const button = ref<HTMLButtonElement>();

onClickOutside(button, () => (optionsShown.value = false));
</script>

<template>
  <div class="relative">
    <button
      ref="button"
      class="w-9 h-9 rounded-full hover:bg-base-100 flex items-center justify-center"
      title="Opções"
      @click="optionsShown = true"
    >
      <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" />
    </button>
    <ul
      v-if="optionsShown"
      class="absolute right-1 top-100% z-10 bg-base-0 rounded-md options-container overflow-hidden"
    >
      <li
        v-for="option in options"
        :key="option.text"
        class="py-2 px-4 flex items-center gap-3 hover:bg-base-100 cursor-pointer"
        :class="option.class"
        @click="option.click(props.item as T)"
      >
        <font-awesome-icon v-if="option.icon" :icon="option.icon" />
        <span class="mt-1">
          {{ option.text }}
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.options-container {
  box-shadow: 5px 5px 10px rgb(69, 73, 112, 0.1);
}
</style>
