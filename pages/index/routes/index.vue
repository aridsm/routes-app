<script lang="tsx" setup>
const modalRoute = ref({
  open: false,
  item: {} as Route,
});

const { routes, deleteRoute } = useSavedRoutesStore();
const { confirm } = confirmDialogStore();
const { addNotification } = useNotificationStore();
const { t } = useI18n();

const options = computed(() => [
  {
    text: t("buttons.edit"),
    icon: "fa-regular fa-pen-to-square",
    click: (item: Route) => {
      modalRoute.value.open = true;
      modalRoute.value.item = { ...item };
    },
  },
  {
    text: t("buttons.delete"),
    icon: "fa-regular fa-trash-can",
    class: "text-red-600",
    click: (item: Route) => {
      confirm({
        action: () => {
          deleteRoute(item.id!);

          addNotification(t("labels.routeWasDeleted", { obj: item.name }));
        },
        title: t("labels.wantToDeleteItem"),
      });
    },
  },
]);

function addNewRoute() {
  modalRoute.value.open = true;
  modalRoute.value.item = {
    name: "",
    destinies: [
      {
        id: 1,
        value: "",
        coords: [],
      },
      {
        id: 2,
        value: "",
        coords: [],
      },
    ],
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
        class="bg-base-100 hover:bg-base-200 rounded-md flex justify-between items-center pr-4"
      >
        <NuxtLink :to="`/routes/${route.id}`" class="p-4 flex-1">
          {{ route.name }}
        </NuxtLink>
        <AppOptions @click.stop :options="options" :item="route" />
      </li>
    </ul>
    <p v-if="!routes.length" class="text-base-300/[.7] text-center py-4 flex-1">
      {{ t("labels.noRouteAdded") }}
    </p>
    <AppBtn class="mx-6" @click="() => addNewRoute()">
      <font-awesome-icon icon="fa-solid fa-circle-plus" class="mr-2" />
      {{ t("labels.addRoute") }}
    </AppBtn>

    <AppModalRoute v-model="modalRoute" />
  </main>
</template>

<style scoped></style>
