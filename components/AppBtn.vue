<script lang="tsx" setup>
defineProps({
  disabled: Boolean,
  icon: Boolean,
  transparent: Boolean,
});
</script>

<template>
  <button
    class="bg-primary-1 hover:bg-primary-1 active:bg-purple-800 disabled:opacity-30 disabled:cursor-not-allowed rounded-md px-8 h-10 lg:h-11 pt-1 min-w-32 text-white"
    :class="{
      ' !px-0 !h-6 !pt-0 !min-w-6 !w-6 flex items-center justify-center': icon,
      '!bg-transparent': transparent,
    }"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style scoped></style>
