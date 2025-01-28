<script lang="tsx" setup>
const emits = defineEmits<{
  (name: "set-item", item: Route): void;
}>();

const { saveRoute } = useSavedRoutesStore();
const { addNotification } = useNotificationStore();
const { t } = useI18n();

const modelValue = defineModel<{ item: Route; open: boolean }>({
  required: true,
});

function onSaveRoute() {
  const newItem = saveRoute(modelValue.value.item);
  modelValue.value.open = false;
  emits("set-item", newItem);

  if (modelValue.value.item.id) {
    addNotification(t("labels.routeWasUpdated", { obj: newItem.name }));
  } else {
    addNotification(t("labels.routeWasCreated", { obj: newItem.name }));
  }
}
</script>

<template>
  <AppModal
    v-model="modelValue.open"
    content-class="flex flex-col gap-3 w-[95vw] lg:w-[25rem]"
  >
    <span class="text-lg lg:text-xl text-center">{{
      modelValue.item.id ? t("labels.edit") : t("labels.create")
    }}</span>

    <AppInputText
      v-model="modelValue.item.name"
      :placeholder="t('labels.typeAvalue')"
      :label="t('labels.routeName')"
    />

    <AppBtn
      class="w-full"
      :disabled="!modelValue.item.name?.trim().length"
      @click="onSaveRoute"
    >
      {{ t("buttons.save") }}
    </AppBtn>
  </AppModal>
</template>

<style scoped></style>
