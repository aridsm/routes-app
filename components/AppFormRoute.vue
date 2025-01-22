<script lang="tsx" setup>
import type Leaflet from "leaflet";

const props = defineProps({
  item: {
    type: Object as PropType<Route>,
  },
});

const emits = defineEmits<{
  (name: "set-polyline", polyline: any): void;
  (name: "set-points", points: any, destinies: Destiny[]): void;
  (name: "set-summary", summary: Summary): void;
  (name: "set-item", data: Route): void;
}>();

const L = inject("L");
const router = useRouter();
const segments = ref<Segment[]>();
const currentDestinies = ref<Destiny[]>([]);
const { deleteRoute, saveRoute } = useSavedRoutesStore();
const { confirm } = confirmDialogStore();

const modalRoute = ref({
  open: false,
  item: {} as Route,
});

const locomotions: { id: locomotion; text: string; icon: string }[] = [
  {
    id: "driving-car",
    text: "Carro",
    icon: "fa-solid fa-car",
  },
  {
    id: "cycling-regular",
    text: "Bicicleta",
    icon: "fa-solid fa-bicycle",
  },
  {
    id: "foot-walking",
    text: "A pé",
    icon: "fa-solid fa-person-walking",
  },
];

const routeForm = ref<Route>({
  id: 0,
  name: "",
  locomotion: "driving-car" as locomotion,
  destinies: [] as Destiny[],
});

onMounted(() => {
  if (props.item) {
    routeForm.value = JSON.parse(JSON.stringify(props.item));
  }
  if (!routeForm.value.destinies.length) {
    routeForm.value.destinies = [
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
    ];
  }
});

const disabledCalculateRoute = computed(() => {
  const destiniesFilled = routeForm.value.destinies.filter(
    (destiny) => destiny.coords?.length
  );

  if (destiniesFilled.length < 2) {
    return true;
  }

  return false;
});

async function getRoutes() {
  const coords = routeForm.value.destinies
    .filter((destiny) => destiny.coords.length)
    .map((destiny) => destiny.coords);

  const options = {
    locomotion: routeForm.value.locomotion,
    coordinates: coords,
  };

  await fetchRoutes(options as any)
    .then((response) => response.json())
    .then((data) => {
      const features = data.features[0];
      const polyline = features.geometry.coordinates.map((coordinate: any) => {
        return (L as typeof Leaflet).latLng(coordinate[1], coordinate[0]);
      });

      emits("set-polyline", polyline);
      emits("set-summary", features.properties.summary);
      emits("set-points", coords, routeForm.value.destinies);

      segments.value = features.properties.segments;
      currentDestinies.value = JSON.parse(
        JSON.stringify(
          routeForm.value.destinies.filter((destiny) => destiny.coords?.length)
        )
      );
    });
}

async function setCurrentLocation() {
  const pos: any = await getUserPosition();

  let firstBlankField = routeForm.value.destinies.find(
    (destiny) => !destiny.value.trim()
  );

  if (!firstBlankField && routeForm.value.destinies.length < 6) {
    routeForm.value.destinies.push({
      id: Math.random(),
      value: "",
      coords: [],
    });
    firstBlankField = routeForm.value.destinies.at(-1);
  }

  if (firstBlankField) {
    firstBlankField.coords = [pos.longitude, pos.latitude];
    firstBlankField.value = firstBlankField.coords.join(", ");
  }
}

function onSelectLocomotion(locomotionId: locomotion) {
  routeForm.value.locomotion = locomotionId;
  if (!disabledCalculateRoute.value) {
    getRoutes();
  }
}

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
        action: () => {
          deleteRoute(item.id!);
          router.push("/routes");
        },
        title: "Deseja excluir o item selecionado?",
      });
    },
  },
];

function onSaveRoute() {
  confirm({
    action: () => {
      const routeItem = saveRoute(routeForm.value);
      setItem(routeItem);
    },
    title: "Deseja salvar as alterações?",
  });
}

function assignLastRouteData() {
  confirm({
    action: () => {
      routeForm.value = JSON.parse(JSON.stringify(props.item));
    },
    title: "Deseja desfazer as alterações?",
  });
}

function setItem(item: Route) {
  emits("set-item", item);
}
</script>

<template>
  <div v-if="props.item" class="px-6 flex justify-between">
    <div
      class="bg-primary-1/[.1] h-8 mb-4 rounded-full leading-none pr-6 pl-2 text-primary-1 text-sm gap-3 flex items-center"
    >
      <button title="Voltar" class="flex" @click="router.push(`/routes`)">
        <font-awesome-icon
          icon="fa-solid fa-circle-chevron-left"
          class="text-xl"
        />
      </button>
      <span class="pt-1">{{ props.item?.name }}</span>
    </div>
    <AppOptions :item="props.item" :options="options" />
  </div>
  <div class="flex-1 overflow-auto flex flex-col gap-8 pb-8">
    <section class="px-6">
      <h2 class="font-bold tracking-wide mb-2">Meio de locomoção</h2>

      <div class="flex gap-3 w-full">
        <button
          v-for="locomotion in locomotions"
          :key="locomotion.id"
          class="flex-1 bg-base-100 rounded-md h-11 flex items-center justify-center text-xl hover:bg-base-200"
          :class="{
            '!bg-primary-2 !text-base-0':
              routeForm.locomotion === locomotion.id,
          }"
          @click="() => onSelectLocomotion(locomotion.id)"
        >
          <font-awesome-icon :icon="locomotion.icon" />
        </button>
      </div>
    </section>

    <section class="px-6">
      <div class="flex justify-between mb-2 items-center">
        <h2 class="font-bold tracking-wide">Rota</h2>
        <AppBtn
          @click="
            () =>
              routeForm.destinies.push({
                id: Math.random(),
                value: '',
                coords: [],
              })
          "
          icon
          transparent
          :disabled="routeForm.destinies.length > 5"
          title="Adicionar destino"
        >
          <font-awesome-icon
            icon="fa-solid fa-circle-plus"
            class="!text-primary-1 text-xl"
          />
        </AppBtn>
      </div>

      <div class="flex flex-col gap-3">
        <div
          v-for="(destiny, index) in routeForm.destinies"
          :key="destiny.id"
          class="flex gap-2 items-center"
        >
          <AppInputLocation
            :destiny="destiny"
            @change="Object.assign(destiny, $event)"
            class="flex-1"
          />
          <button
            v-if="index >= 2"
            class="w-9 h-9 rounded-full hover:bg-base-100 flex items-center justify-center"
            title="excluir"
            @click="routeForm.destinies.splice(index, 1)"
          >
            <font-awesome-icon icon="fa-regular fa-trash-can" />
          </button>
        </div>
      </div>
      <p v-if="disabledCalculateRoute" class="text-sm mt-1 text-red-600">
        Pelo menos duas coordenadas devem estar preenchidas
      </p>

      <div class="flex justify-between items-center mt-3">
        <button
          class="bg-primary-1/[.1] rounded-full px-6 text-primary-1 hover:bg-primary-1/[.2] active:hover:bg-primary-1/[.3] pb-1 pt-2 text-sm gap-3 flex"
          @click="() => setCurrentLocation()"
        >
          <font-awesome-icon icon="fa-solid fa-map-pin" />
          Usar localização atual
        </button>
        <AppBtn @click="() => getRoutes()" :disabled="disabledCalculateRoute">
          <font-awesome-icon icon="fa-solid fa-signs-post" class="mr-2" />
          Calcular percurso
        </AppBtn>
      </div>
    </section>
    <section v-if="segments && currentDestinies.length" class="px-6">
      <h2 class="font-bold tracking-wide mb-2">Como chegar</h2>
      <ul
        v-for="(segment, index) in segments"
        :key="segment.distance"
        class="bg-base-100 rounded-md mt-2 overflow-hidden"
      >
        <li class="overflow-hidden">
          <button
            class="flex justify-between bg-base-100 z-10 relative items-center gap-4 p-4 pr-6 w-full transition"
            :class="{
              'bg-primary-2 text-base-0': segment.show,
            }"
            @click="() => (segment.show = !segment.show)"
          >
            <div class="w-full text-start flex flex-col gap-1">
              <span class="text-sm block opacity-80">
                Trecho {{ index + 1 }}
              </span>
              <div class="flex gap-4 items-center font-bold">
                <p>{{ currentDestinies[index].value }}</p>

                <font-awesome-icon
                  icon="fa-solid fa-chevron-right"
                  class="text-xs mb-1"
                />
                <p>{{ currentDestinies[index + 1].value }}</p>
              </div>
              <div>
                {{ convertMetersToKm(segment.distance) }} km |
                {{ convertTime(segment.duration) }}
              </div>
            </div>
            <font-awesome-icon
              icon="fa-solid fa-chevron-left"
              class="transition"
              :class="{
                '-rotate-90': segment.show,
              }"
            />
          </button>

          <Transition>
            <ul
              v-if="segment.show"
              class="flex flex-col list-decimal pr-4 py-6 !pl-10"
            >
              <li
                v-for="step in segment.steps"
                :key="step.way_points.toString()"
                class="item-step"
              >
                {{ step.instruction }}
              </li>
            </ul>
          </Transition>
        </li>
      </ul>
    </section>
  </div>
  <div v-if="props.item" class="flex h-12 w-full">
    <button
      class="w-14 bg-primary-3 text-base-0 flex items-center justify-center"
      @click="assignLastRouteData"
    >
      <font-awesome-icon icon="fa-solid fa-arrow-rotate-left" />
    </button>
    <button
      class="bg-primary-2 hover:bg-primary-3 text-base-0 flex-1 pt-1"
      @click="onSaveRoute"
    >
      Salvar alterações
    </button>
  </div>

  <AppModalRoute v-model="modalRoute" @set-item="setItem" />
</template>

<style scoped>
.item-step + .item-step {
  @apply pt-4 mt-4 border-t border-t-base-200;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
}
.v-enter-from,
.v-leave-to {
  transform: translateY(-50%);
  opacity: 0;
}
</style>
