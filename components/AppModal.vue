<script lang="tsx" setup>
defineProps({
  contentClass: String,
  zIndex: String,
});

const isOpen = defineModel<boolean>({ required: true });
</script>

<template>
  <Teleport v-show="isOpen" to="body">
    <div
      v-show="isOpen"
      class="bg-base-300/[.3] absolute top-0 left-0 w-screen h-screen flex justify-center items-center px-4"
      :style="{
        'z-index': zIndex || 999999,
      }"
      @click.self="isOpen = false"
    >
      <div class="bg-base-0 p-4 lg:p-6 rounded-md" :class="contentClass">
        <slot />
      </div>
    </div>
  </Teleport>
</template>
