import { NotificationType } from "~/utils/enums/NotificationType";

export const useNotificationStore = defineStore("notificationStore", () => {
  const notifications = ref<
    { text: string; id: number; type: NotificationType }[]
  >([]);

  function addNotification(
    text: string,
    type: NotificationType = NotificationType.Success
  ) {
    const id = Math.random();
    notifications.value.push({
      text,
      id,
      type,
    });

    setTimeout(() => {
      const index = notifications.value.findIndex((not) => not.id === id);
      if (index >= 0) notifications.value.splice(index, 1);
    }, 5000);
  }

  return { notifications, addNotification };
});
