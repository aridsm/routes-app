<script lang="tsx" setup>
const props = defineProps({
  contentClass: String,
});

const isOpen = defineModel<boolean>({ required: true });
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="bg-base-300/[.3] absolute left-0 right-0 w-screen h-screen z-[9999] flex justify-center items-center"
      @click.self="isOpen = false"
    >
      <div class="bg-base-0 p-6 rounded-md" :class="contentClass">
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<style scoped></style>
