<script lang="tsx" setup>
defineProps({
  icon: String,
});
</script>

<template>
  <div class="flex justify-center items-center">
    <ClientOnly>
      <font-awesome-icon :icon="icon" />
    </ClientOnly>
  </div>
</template>

<style scoped></style>
