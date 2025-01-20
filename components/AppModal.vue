<script lang="tsx" setup>
defineProps({
  contentClass: String,
});

const isOpen = defineModel<boolean>({ required: true });
</script>

<template>
  <div
    v-show="isOpen"
    class="bg-base-300/[.3] absolute top-0 left-0 w-screen h-screen z-[9999] flex justify-center items-center"
    @click.self="isOpen = false"
  >
    <div class="bg-base-0 p-6 rounded-md" :class="contentClass">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
