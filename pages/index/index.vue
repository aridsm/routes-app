<script lang="tsx" setup></script>

<template>
  <main class="flex-1 min-h-0 flex flex-col">
    <AppFormRoute />
  </main>
</template>

<style scoped>
.item-step + .item-step {
  @apply pt-4 mt-4 border-t border-t-base-200;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
}
.v-enter-from,
.v-leave-to {
  transform: translateY(-50%);
  opacity: 0;
}
</style>
