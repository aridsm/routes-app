import { NotificationType } from "~/utils/enums/NotificationType";

export const useNotificationStore = defineStore("notificationStore", () => {
  const notifications = ref<NotificationItem[]>([]);

  function addNotification(
    text: string,
    type: NotificationType = NotificationType.Success
  ) {
    const id = Math.random();

    const newNotification = {
      text,
      id,
      type,
      delete: () => {
        const index = notifications.value.findIndex((not) => not.id === id);
        if (index >= 0) notifications.value.splice(index, 1);
      },
    };
    notifications.value.push(newNotification);

    setTimeout(() => {
      newNotification.delete();
    }, 5000);
  }

  return { notifications, addNotification };
});
