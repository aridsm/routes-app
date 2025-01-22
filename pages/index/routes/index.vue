<script lang="tsx" setup>
const modalRoute = ref({
  open: false,
  item: {} as Route,
});

const { routes, deleteRoute } = useSavedRoutesStore();
const { confirm } = confirmDialogStore();

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
      confirm({
        action: () => deleteRoute(item.id!),
        title: "Deseja excluir o item selecionado?",
      });
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
</script>

<template>
  <main class="flex-1 min-h-0 overflow-auto flex flex-col gap-3 pb-6">
    <ul class="flex flex-col gap-3 flex-1 min-h-0 overflow-auto pb-2 px-6">
      <li
        v-for="route in routes"
        :key="route.id"
        class="bg-base-100 hover:bg-base-200 rounded-md"
      >
        <NuxtLink
          :to="`/routes/${route.id}`"
          class="flex justify-between items-center p-4"
        >
          <span>{{ route.name }}</span>
          <AppOptions :options="options" :item="route" />
        </NuxtLink>
      </li>
    </ul>
    <p v-if="!routes.length" class="text-base-300/[.7] text-center py-4 flex-1">
      Nenhuma rota adicionada!
    </p>
    <AppBtn class="self-end mr-6" @click="() => addNewRoute()">
      <font-awesome-icon icon="fa-solid fa-circle-plus" class="mr-2" />
      Adicionar rota
    </AppBtn>

    <AppModalRoute v-model="modalRoute" />
  </main>
</template>

<style scoped></style>
