<script lang="tsx" setup>
import { templateRef, useDraggable, useElementBounding } from "@vueuse/core";

const { t } = useI18n();

const props = defineProps({
  placeholder: String,
  icon: String,
  drag: Boolean,
  lazy: Boolean,
  debounceTime: {
    type: Number,
    default: 600,
  },
  label: String,
});

const emits = defineEmits<{
  (name: "debounce", value: string | undefined): void;
}>();

const modelValue = defineModel<string | undefined>({ required: true });
const lazyValue = ref<string | undefined>(modelValue.value);
const timeOut = ref();
const btnDrag = useTemplateRef<HTMLButtonElement>("btnDrag");
const target = useTemplateRef<HTMLDivElement>("target");

const { left, top } = useElementBounding(target);

const { x, y, isDragging } = useDraggable(btnDrag, {
  onMove(position, event) {
    console.log(position);
    console.log(left.value, top.value);
  },
});

const styles = computed(() => {
  const positions = { x: x.value - left.value, y: y.value - top.value };

  return {
    left: `${isDragging ? positions.x : 0}px`,
    top: `${isDragging ? positions.y : 0}px`,
  };
});

watch(
  () => modelValue.value,
  () => {
    lazyValue.value = modelValue.value;
  }
);

function onInput() {
  clearTimeout(timeOut.value);

  timeOut.value = setTimeout(() => {
    emits("debounce", lazyValue.value);
  }, props.debounceTime);

  if (!props.lazy) {
    modelValue.value = lazyValue.value;
  }
}

function onBlur() {
  if (props.lazy) {
    modelValue.value = lazyValue.value;
  }
}
</script>

<template>
  <div ref="target" class="relative target">
    <span class="text-primary-1 font-bold">{{ label }}</span>
    <div
      class="bg-base-100 rounded-md flex items-center text-base-300 relative"
    >
      <button
        v-if="drag"
        ref="btnDrag"
        class="bg-base-200 w-10 h-full pt-[6px] text-sm lg:text-base cursor-grab rounded-l-md absolute"
      >
        <client-only>
          <font-awesome-icon icon="fa-solid fa-grip-vertical" />
        </client-only>
      </button>

      <client-only>
        <font-awesome-icon
          v-if="icon"
          :icon="icon"
          class="ml-4 absolute top-[14px] text-sm lg:text-base"
          :class="{
            'text-base-300/[.35]': !lazyValue,
            '!ml-14': drag,
          }"
      /></client-only>
      <input
        type="text"
        v-model="lazyValue"
        :placeholder="placeholder || t('labels.enterAValue')"
        class="bg-transparent w-full h-10 lg:h-11 px-3 lg:px-4 pt-1 placeholder:text-base-300/[.35] rounded-md outline-offset-1 focus:outline-purple-500"
        :class="{
          '!pl-10': icon && !drag,
          '!pl-20': icon && drag,
          '!pl-14': !icon && drag,
        }"
        @input="onInput"
        @blur="onBlur"
      />
    </div>
  </div>
</template>

<style scoped>
.target {
  touch-action: none;
}
</style>
