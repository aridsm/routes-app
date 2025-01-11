<script lang="tsx" setup>
const props = defineProps({
  placeholder: {
    default: "Digite...",
  },
  icon: String,
  drag: Boolean,
});

const modelValue = defineModel<string>({ required: true });
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
        'text-base-300/[.35]': !modelValue,
        '!ml-14': drag,
      }"
    />
    <input
      type="text"
      v-model="modelValue"
      :placeholder="placeholder"
      class="bg-transparent w-full h-11 px-4 pt-1 placeholder:text-base-300/[.35] rounded-md outline-offset-1 focus:outline-purple-500"
      :class="{
        'pl-10': icon && !drag,
        'pl-20': icon && drag,
        'pl-14': !icon && drag,
        'pr-10': modelValue,
      }"
    />
    <button
      v-if="modelValue"
      class="absolute right-3 mt-[2px] w-6 h-6 transition hover:bg-base-200 rounded-full flex items-center justify-center text-base-400/[.7]"
      @click="modelValue = ''"
      title="Limpar"
    >
      <font-awesome-icon icon="fa-solid fa-xmark" />
    </button>
  </div>
</template>

<style scoped></style>
