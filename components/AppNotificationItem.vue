<script lang="tsx" setup>
import { useDraggable } from "@vueuse/core";
import { NotificationType } from "~/utils/enums/NotificationType";

const props = defineProps({
  notification: {
    type: Object as PropType<NotificationItem>,
    required: true,
  },
});

const notificationEl = useTemplateRef<HTMLDivElement>("notificationEl");

const { x } = useDraggable(notificationEl, {
  onEnd(position) {
    if (position.x > 170) {
      props.notification.delete();
    }

    position.x = 0;
  },
});

const leftPosition = computed(() => {
  return x.value > 0 ? x.value * 0.7 : 0;
});
</script>

<template>
  <div
    :style="{
      left: `${leftPosition}px`,
    }"
    ref="notificationEl"
    class="text-base-0 w-full gap-3 flex relative notification lg:w-80 rounded-md px-4 py-3"
    :class="{
      'bg-base-0 !text-base-300':
        notification.type === NotificationType.Success,
      'bg-red-500': notification.type === NotificationType.Failure,
    }"
  >
    <AppIcon
      v-if="notification.type === NotificationType.Success"
      icon="fa-regular fa-circle-check"
    />
    <AppIcon v-else icon="fa-regular fa-circle-xmark" />
    {{ notification.text }}
  </div>
</template>

<style scoped>
.notification {
  touch-action: none;
  box-shadow: 5px 10px 10px rgb(69, 73, 112, 0.1);
}
</style>
