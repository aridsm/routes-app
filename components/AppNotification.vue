<script lang="tsx" setup>
const { notifications } = storeToRefs(useNotificationStore());
</script>

<template>
  <div class="absolute right-4 bottom-4 z-[9999] flex flex-col gap-2">
    <div
      v-for="notification in notifications"
      :key="notification.id"
      class="bg-primary-3 text-base-0 w-80 rounded-md px-4 py-3"
    >
      <client-only>
        <font-awesome-icon icon="fa-regular fa-circle-check" class="mr-2" />
      </client-only>
      {{ notification.text }}
    </div>
  </div>
</template>

<style scoped></style>
