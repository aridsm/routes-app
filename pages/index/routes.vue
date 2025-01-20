<script lang="tsx" setup>
const modalRoute = ref({
  open: false,
  item: {} as Route,
});

const { routes, saveRoute, deleteRoute } = useSavedRoutesStore();

const options = [
  {
    text: "Editar",
    icon: "fa-regular fa-pen-to-square",
    click: (item: Route) => {
      modalRoute.value.open = true;
      modalRoute.value.item = { ...item };
    },
  },
  {
    text: "Excluir",
    icon: "fa-regular fa-trash-can",
    class: "text-red-600",
    click: (item: Route) => {
      deleteRoute(item.id!);
    },
  },
];

function addNewRoute() {
  modalRoute.value.open = true;
  modalRoute.value.item = {
    name: "",
    destinies: [],
    locomotion: "driving-car",
  };
}

function onSaveRoute() {
  saveRoute(modalRoute.value.item);
  modalRoute.value.open = false;
}
</script>

<template>
  <main class="flex-1 min-h-0 overflow-auto flex flex-col gap-3 pb-8 px-6">
    <ul class="flex flex-col gap-3">
      <li
        v-for="route in routes"
        :key="route.id"
        class="bg-base-100 hover:bg-base-200 p-4 rounded-md cursor-pointer flex justify-between items-center"
      >
        <span>{{ route.name }}</span>

        <AppOptions :options="options" :item="route" />
      </li>
    </ul>
    <p v-if="!routes.length" class="text-base-300/[.7] text-center py-4">
      Nenhuma rota adicionada!
    </p>
    <AppBtn class="self-end" @click="addNewRoute">
      <font-awesome-icon icon="fa-solid fa-circle-plus" class="mr-2" />
      Adicionar rota
    </AppBtn>

    <AppModal
      v-model="modalRoute.open"
      content-class="flex flex-col gap-3 w-[25rem]"
    >
      <span class="text-xl text-center">{{
        modalRoute.item.id ? "Editar rota" : "Criar rota"
      }}</span>

      <AppInputText
        v-model="modalRoute.item.name"
        placeholder="Digite..."
        label="Nome da rota"
      />

      <AppBtn
        class="w-full"
        :disabled="!modalRoute.item.name.trim().length"
        @click="onSaveRoute"
      >
        Salvar
      </AppBtn>
    </AppModal>
  </main>
</template>

<style scoped></style>
