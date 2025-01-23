<script lang="tsx" setup>
const { shown, onConfirm, title, icon } = storeToRefs(confirmDialogStore());
const { t } = useI18n();
</script>

<template>
  <AppModal
    v-model="shown"
    content-class="w-[20rem] flex flex-col items-center"
  >
    <font-awesome-icon
      :icon="icon ? icon : 'fa-regular fa-hand'"
      class="mb-4 text-2xl"
    />
    <span class="mb-4 text-center">
      {{ title || t("labels.continue") }}
    </span>
    <div class="flex gap-3">
      <AppBtn
        @click="
          () => {
            onConfirm?.();
            shown = false;
          }
        "
      >
        {{ t("labels.confirm") }}
      </AppBtn>
    </div>
  </AppModal>
</template>

<style scoped></style>
