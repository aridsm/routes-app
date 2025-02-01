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
  return x.value > 0 ? x.value * 0.5 : 0;
});
</script>

<template>
  <div
    :style="{
      left: `${leftPosition}px`,
    }"
    ref="notificationEl"
    class="text-base-0 w-full relative notification lg:w-80 rounded-md px-4 py-3"
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
</template>

<style scoped>
.notification {
  touch-action: none;
}
</style>
