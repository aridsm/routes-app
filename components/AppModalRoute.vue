<script lang="tsx" setup>
const emits = defineEmits<{
  (name: "set-item", item: Route): void;
}>();

const { saveRoute } = useSavedRoutesStore();

const modelValue = defineModel<{ item: Route; open: boolean }>({
  required: true,
});

function onSaveRoute() {
  const newItem = saveRoute(modelValue.value.item);
  modelValue.value.open = false;
  emits("set-item", newItem);
}
</script>

<template>
  <AppModal
    v-model="modelValue.open"
    content-class="flex flex-col gap-3 w-[25rem]"
  >
    <span class="text-xl text-center">{{
      modelValue.item.id ? "Editar rota" : "Criar rota"
    }}</span>

    <AppInputText
      v-model="modelValue.item.name"
      placeholder="Digite..."
      label="Nome da rota"
    />

    <AppBtn
      class="w-full"
      :disabled="!modelValue.item.name?.trim().length"
      @click="onSaveRoute"
    >
      Salvar
    </AppBtn>
  </AppModal>
</template>

<style scoped></style>
