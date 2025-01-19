<script lang="tsx" setup>
const props = defineProps({
  placeholder: {
    default: "Digite...",
  },
  icon: String,
  drag: Boolean,
  lazy: Boolean,
  debounceTime: {
    type: Number,
    default: 600,
  },
});

const emits = defineEmits<{
  (name: "debounce", value: string): void;
}>();

const modelValue = defineModel<string>({ required: true });
const lazyValue = ref<string>(modelValue.value);
const timeOut = ref();

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
  <div class="bg-base-100 rounded-md flex items-center text-base-300 relative">
    <button
      v-if="drag"
      class="bg-base-200 w-10 h-full pt-[6px] cursor-grab rounded-l-md absolute"
    >
      <font-awesome-icon icon="fa-solid fa-grip-vertical" />
    </button>

    <font-awesome-icon
      v-if="icon"
      :icon="icon"
      class="ml-4 absolute top-[14px]"
      :class="{
        'text-base-300/[.35]': !lazyValue,
        '!ml-14': drag,
      }"
    />
    <input
      type="text"
      v-model="lazyValue"
      :placeholder="placeholder"
      class="bg-transparent w-full h-11 px-4 pt-1 placeholder:text-base-300/[.35] rounded-md outline-offset-1 focus:outline-purple-500"
      :class="{
        'pl-10': icon && !drag,
        'pl-20': icon && drag,
        'pl-14': !icon && drag,
      }"
      @input="onInput"
      @blur="onBlur"
    />
  </div>
</template>

<style scoped></style>
