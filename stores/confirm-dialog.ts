export const confirmDialogStore = defineStore("confirmDialog", () => {
  const shown = ref(false);
  const title = ref("");
  const icon = ref<string | undefined>("");
  const onConfirm = ref<() => void>();

  function confirm(options: ConfirmOptions) {
    shown.value = true;
    title.value = options.title;
    icon.value = options.icon;
    onConfirm.value = options.action;
  }

  return { shown, confirm, onConfirm, title, icon };
});
