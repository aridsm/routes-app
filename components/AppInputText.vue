<script lang="tsx" setup>
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
  inputClasses: String,
});

const emits = defineEmits<{
  (name: "debounce", value: string | undefined): void;
}>();

const modelValue = defineModel<string | undefined>({ required: true });
const lazyValue = ref<string | undefined>(modelValue.value);
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
  <div class="relative">
    <span class="text-primary-1 font-bold">{{ label }}</span>
    <div
      class="bg-white border border-base-200 rounded-md flex items-center text-base-300 relative"
    >
      <div v-if="$slots.before" class="absolute z-10 w-10 h-10 lg:h-11">
        <slot name="before" />
      </div>

      <AppIcon
        v-if="icon"
        :icon="icon"
        class="ml-4 absolute top-[14px] text-sm lg:text-base"
        :class="{
          'text-base-300/[.35]': !lazyValue,
          'pl-10': $slots.before,
        }"
      />
      <input
        type="text"
        v-model="lazyValue"
        :placeholder="placeholder || t('labels.enterAValue')"
        class="bg-transparent w-full h-10 lg:h-11 px-3 lg:px-4 pt-1 placeholder:text-base-300/[.35] rounded-md outline-offset-1 focus:outline-purple-500"
        :class="[
          inputClasses,
          {
            'pl-10': icon,
            '!pl-20': $slots.before,
          },
        ]"
        @input="onInput"
        @blur="onBlur"
      />
    </div>
  </div>
</template>
