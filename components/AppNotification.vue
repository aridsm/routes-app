<script lang="tsx" setup>
import { NotificationType } from "~/utils/enums/NotificationType";

const { notifications } = storeToRefs(useNotificationStore());
</script>

<template>
  <div
    class="absolute top-4 lg:top-[initial] lg:right-4 lg:bottom-4 z-[9999] flex flex-col gap-2 px-4 lg:px-0 w-full lg:w-fit"
  >
    <div
      v-for="notification in notifications"
      :key="notification.id"
      class="text-base-0 w-full lg:w-80 rounded-md px-4 py-3"
      :class="{
        'bg-primary-3': notification.type === NotificationType.Success,
        'bg-red-500': notification.type === NotificationType.Failure,
      }"
    >
      <client-only>
        <font-awesome-icon icon="fa-regular fa-circle-check" class="mr-2" />
      </client-only>
      {{ notification.text }}
    </div>
  </div>
</template>

<style scoped></style>
