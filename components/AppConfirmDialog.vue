<script lang="tsx" setup>
const { shown, onConfirm, title, icon } = storeToRefs(confirmDialogStore());
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
    <span class="text-xl mb-4 text-center">
      {{ title || "Deseja continuar?" }}
    </span>
    <div class="flex gap-3">
      <AppBtn
        @click="
          () => {
            onConfirm?.();
            shown = false;
          }
        "
        >Confirmar</AppBtn
      >
    </div>
  </AppModal>
</template>

<style scoped></style>
