<script lang="tsx" setup generic="T">
import { onClickOutside, useElementBounding } from "@vueuse/core";

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
const list = ref<HTMLUListElement>();
const { t } = useI18n();

onClickOutside(activator, () => (optionsShown.value = false));

const { width: listWidth, height: listHeight } = useElementBounding(list);

function openOptions() {
  optionsShown.value = true;
}

const styles = computed(() => {
  const { top, left, width, height } = useElementBounding(activator);
  let posTop = top.value + height.value;
  if (posTop + listHeight.value + 20 > window.innerHeight) {
    posTop = top.value - listHeight.value;
  }
  return {
    top: `${posTop}px`,
    left: `${left.value + width.value - listWidth.value}px`,
  };
});
</script>

<template>
  <div class="relative">
    <div ref="activator">
      <slot :open="openOptions">
        <button
          class="w-7 h-7 lg:w-9 lg:h-9 rounded-full text-base hover:bg-base-300/[.2] flex items-center justify-center"
          :class="{
            'bg-base-300/[.2]': optionsShown,
          }"
          :title="t('labels.options')"
          @click="openOptions"
        >
          <AppIcon icon="fa-solid fa-ellipsis-vertical" />
        </button>
      </slot>
    </div>
    <Teleport to="body">
      <ul
        v-if="optionsShown"
        ref="list"
        class="absolute transition z-[999999] !text-base-300 bg-base-0 rounded-md options-container overflow-hidden"
        :style="styles"
      >
        <li
          v-for="option in options"
          :key="option.text"
          class="py-2 px-4 flex items-center gap-3 hover:bg-base-100 cursor-pointer"
          :class="option.class"
          @click="option.click(props.item as T)"
        >
          <AppIcon v-if="option.icon" :icon="option.icon" />

          <span class="mt-1">
            {{ option.text }}
          </span>
        </li>
      </ul>
    </Teleport>
  </div>
</template>

<style scoped>
.options-container {
  box-shadow: 5px 5px 10px rgb(69, 73, 112, 0.1);
}
</style>
