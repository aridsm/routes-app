<script lang="tsx" setup generic="T">
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
  options: {
    type: Array as PropType<Option<T>[]>,
    required: true,
  },
  item: {
    type: Object as PropType<T>,
  },
});

const optionsShown = ref(false);
const activator = ref<HTMLButtonElement>();
const { t } = useI18n();

onClickOutside(activator, () => (optionsShown.value = false));

function openOptions() {
  optionsShown.value = true;
}
</script>

<template>
  <div class="relative">
    <div ref="activator">
      <slot :open="openOptions">
        <button
          class="w-7 h-7 lg:w-9 lg:h-9 rounded-full text-base hover:bg-base-300/[.2] flex items-center justify-center"
          :title="t('labels.options')"
          @click="openOptions"
        >
          <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" />
        </button>
      </slot>
    </div>
    <ul
      v-if="optionsShown"
      class="absolute right-1 top-100% z-[9999] !text-base-300 bg-base-0 rounded-md options-container overflow-hidden"
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
