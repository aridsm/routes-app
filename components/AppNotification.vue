<script lang="tsx" setup>
const { notifications } = storeToRefs(useNotificationStore());
</script>

<template>
  <div
    class="absolute overflow-hidden top-4 lg:top-[initial] pb-4 lg:right-4 lg:bottom-4 z-[9999] flex flex-col gap-2 px-4 lg:px-0 w-full lg:w-fit"
  >
    <TransitionGroup name="list">
      <AppNotificationItem
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>
