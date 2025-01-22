export const useNotificationStore = defineStore("notificationStore", () => {
  const notifications = ref<{ text: string; id: number }[]>([]);

  function addNotification(text: string) {
    const id = Math.random();
    notifications.value.push({
      text,
      id,
    });

    setTimeout(() => {
      const index = notifications.value.findIndex((not) => not.id === id);
      if (index >= 0) notifications.value.splice(index, 1);
    }, 5000);
  }

  return { notifications, addNotification };
});
