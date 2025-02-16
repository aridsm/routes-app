<script lang="tsx" setup>
import type Leaflet from "leaflet";
import { NotificationType } from "~/utils/enums/NotificationType";

const props = defineProps({
  item: {
    type: Object as PropType<Route>,
  },
});

const emits = defineEmits<{
  (name: "set-polyline", polyline: any): void;
  (name: "set-points", points: any, destinies: Destiny[]): void;
  (name: "set-item", data: Route): void;
}>();

const L = inject("L");
const router = useRouter();
const segments = ref<Segment[]>();
const currentDestinies = ref<Destiny[]>([]);
const summary = ref<Summary>();
const { deleteRoute, saveRoute, getRouteById } = useSavedRoutesStore();
const { confirm } = confirmDialogStore();
const { addNotification } = useNotificationStore();
const loading = ref(false);
const { t, locale } = useI18n();
const isScrolling = ref(false);
const container = ref<HTMLDivElement>();
const hasChanges = ref(false);

watch(
  () => locale.value,
  () => {
    if (!disabledCalculateRoute.value) {
      getRoutes();
    }
  }
);

const modalRoute = ref({
  open: false,
  item: {} as Route,
});

const locomotions = computed<{ id: locomotion; text: string; icon: string }[]>(
  () => [
    {
      id: "driving-car",
      text: t("labels.car"),
      icon: "fa-solid fa-car",
    },
    {
      id: "cycling-regular",
      text: t("labels.bicycle"),
      icon: "fa-solid fa-bicycle",
    },
    {
      id: "foot-walking",
      text: t("labels.afoot"),
      icon: "fa-solid fa-person-walking",
    },
  ]
);

const routeForm = ref<Route>({
  id: 0,
  name: "",
  locomotion: "driving-car" as locomotion,
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
  ] as Destiny[],
});

onMounted(() => {
  if (props.item) {
    routeForm.value = JSON.parse(JSON.stringify(props.item));
    if (!disabledCalculateRoute.value) {
      getRoutes();
    }
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
  currentDestinies.value = [];
  segments.value = [];

  const coords = routeForm.value.destinies
    .filter((destiny) => destiny.coords.length)
    .map((destiny) => destiny.coords);

  const options = {
    locomotion: routeForm.value.locomotion,
    coordinates: coords,
    language: locale.value,
  };

  loading.value = true;
  await fetchRoutes(options as any)
    .then((response) => response.json())
    .then((data) => {
      const features = data.features[0];
      const polyline = features.geometry.coordinates.map((coordinate: any) => {
        return (L as typeof Leaflet).latLng(coordinate[1], coordinate[0]);
      });

      segments.value = features.properties.segments;
      currentDestinies.value = JSON.parse(
        JSON.stringify(
          routeForm.value.destinies.filter((destiny) => destiny.coords?.length)
        )
      );
      emits("set-polyline", polyline);
      summary.value = features.properties.summary;
      emits("set-points", coords, routeForm.value.destinies);
    })
    .catch((err: any) => {
      addNotification(t("errors.errorGetRoutes"), NotificationType.Failure);
    })
    .finally(() => {
      loading.value = false;
    });
}

async function setCurrentLocation() {
  try {
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
  } catch (err: any) {
    addNotification(
      t("errors.errorGetCurrentLocation"),
      NotificationType.Failure
    );
  }
}

function onSelectLocomotion(locomotionId: locomotion) {
  routeForm.value.locomotion = locomotionId;
  if (!disabledCalculateRoute.value) {
    getRoutes();
  }
}

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
          router.push("/routes");

          addNotification(t("labels.routeWasDeleted", { obj: item.name }));
        },
        title: t("labels.wantToDeleteItem"),
      });
    },
  },
]);

function onSaveRoute() {
  confirm({
    action: () => {
      const routeItem = saveRoute(routeForm.value);
      setItem(routeItem);

      addNotification(
        t("labels.routeWasUpdated", { obj: routeForm.value.name })
      );
    },
    title: t("labels.saveChanges"),
  });
}

function assignLastRouteData() {
  confirm({
    action: () => {
      routeForm.value = JSON.parse(JSON.stringify(props.item));
      addNotification(
        t("labels.routeWasRestored", { obj: routeForm.value.name })
      );
      if (!disabledCalculateRoute.value) {
        getRoutes();
      }
    },
    title: t("labels.undoChanges"),
  });
}

function setItem(item: Route) {
  emits("set-item", item);
}

watch(
  () => [routeForm.value, props.item],
  () => {
    if (props.item) {
      hasChanges.value = objectsAreDifferent(props.item, routeForm.value);
    }
  },
  {
    deep: true,
  }
);

onBeforeRouteLeave(() => {
  if (hasChanges.value && !!getRouteById(routeForm.value.id!)) {
    const answer = window.confirm(t("labels.confirmExit"));
    if (!answer) return false;
  }
});

function onScroll(e: any) {
  isScrolling.value = e.target.scrollTop > 0;
}

function onScrollTop() {
  container.value?.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<template>
  <div v-if="props.item" class="px-4 lg:px-6 flex justify-between">
    <div
      class="bg-primary-1/[.1] h-7 lg:h-8 mb-4 rounded-full leading-none pr-4 lg:pr-6 pl-1 lg:pl-2 text-primary-1 text-sm lg:text-sm gap-2 lg:gap-3 flex items-center"
    >
      <button
        :title="t('buttons.back')"
        class="flex"
        @click="router.push(`/routes`)"
      >
        <AppIcon icon="fa-solid fa-circle-chevron-left" class="text-xl" />
      </button>
      <span class="pt-1">{{ props.item?.name }}</span>
    </div>
    <AppOptions :item="props.item" :options="options" />
  </div>
  <div
    ref="container"
    class="flex-1 overflow-auto scroll-smooth flex relative flex-col gap-4 lg:gap-8"
    @scroll="onScroll"
  >
    <button
      @click="onScrollTop"
      class="bg-primary-1 text-base-0 btn-top transition z-0 opacity-0 sticky rounded-full -mb-[52px] !w-12 min-h-5 h-5 top-2"
      :class="{
        '!opacity-100 !z-[9999]': isScrolling,
      }"
    >
      <AppIcon icon="fa-solid fa-chevron-up" />
    </button>
    <section class="px-4 lg:px-6">
      <h2 class="font-bold tracking-wide mb-1 lg:mb-2">
        {{ t("labels.meansOfLocomotion") }}
      </h2>

      <div class="flex gap-2 lg:gap-3 w-full">
        <button
          v-for="locomotion in locomotions"
          :key="locomotion.id"
          class="flex-1 bg-base-100 rounded-md h-9 lg:h-11 flex items-center justify-center text-base lg:text-xl hover:bg-base-200"
          :class="{
            '!bg-primary-2 !text-base-0':
              routeForm.locomotion === locomotion.id,
          }"
          @click="() => onSelectLocomotion(locomotion.id)"
        >
          <AppIcon :icon="locomotion.icon" />
        </button>
      </div>
    </section>

    <section class="px-4 lg:px-6">
      <div class="flex justify-between mb-1 lg:mb-2 items-center">
        <h2 class="font-bold tracking-wide">{{ t("labels.routes") }}</h2>
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
          class="tooltip relative"
          :disabled="routeForm.destinies.length > 5"
          :content="t('labels.addDestination')"
        >
          <AppIcon
            icon="fa-solid fa-circle-plus"
            class="!text-primary-1 text-xl"
          />
        </AppBtn>
      </div>

      <div class="flex flex-col gap-2 lg:gap-3">
        <AppLocationsBox v-model="routeForm.destinies" />
      </div>
      <p v-if="disabledCalculateRoute" class="lg:text-sm mt-1 text-red-600">
        {{ t("labels.atLeastTwo") }}
      </p>

      <div
        class="flex justify-between items-center flex-col lg:flex-row gap-3 mt-3"
      >
        <button
          class="bg-primary-1/[.1] rounded-full px-6 text-primary-1 hover:bg-primary-1/[.2] active:hover:bg-primary-1/[.3] pb-1 pt-2 text-sm lg:text-sm gap-3 items-center flex"
          @click="() => setCurrentLocation()"
        >
          <AppIcon icon="fa-solid fa-map-pin" class="mb-1" />
          {{ t("labels.useCurrentLocation") }}
        </button>
        <AppBtn
          @click="() => getRoutes()"
          :disabled="disabledCalculateRoute"
          class="w-full lg:w-auto flex items-center justify-center"
        >
          <AppIcon icon="fa-solid fa-signs-post" class="mr-2" />
          {{ t("labels.calculateRoute") }}
        </AppBtn>
      </div>
    </section>
    <AppLoading v-if="loading" class="flex-1" />
    <section
      v-if="segments && currentDestinies.length"
      class="px-4 lg:px-6 relative"
    >
      <h2 class="font-bold tracking-wide mb-2">
        {{ t("labels.howToGetThere") }}
      </h2>
      <div
        v-if="summary"
        class="flex justify-center bg-base-100 rounded-md px-4 py-2 text-base-300 gap-4 items-center"
      >
        <div class="flex gap-2 items-center">
          <AppIcon icon="fa-solid fa-car-side" />
          <span class="pt-1">
            {{ convertMetersToKm(summary.distance) }} km
          </span>
        </div>
        <div class="flex gap-2 items-center">
          <AppIcon icon="fa-regular fa-clock" />
          <span class="pt-1">
            {{ convertTime(summary.duration) }}
          </span>
        </div>
      </div>
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
              <span class="text-sm lg:text-sm block opacity-80">
                {{ t("labels.path") }} {{ index + 1 }}
              </span>
              <div class="flex gap-3 lg:gap-4 items-center font-bold">
                <p>{{ currentDestinies[index].value }}</p>

                <AppIcon
                  icon="fa-solid fa-chevron-right"
                  class="text-sm mb-1"
                />

                <p>{{ currentDestinies[index + 1].value }}</p>
              </div>
              <div>
                {{ convertMetersToKm(segment.distance) }} km |
                {{ convertTime(segment.duration) }}
              </div>
            </div>

            <AppIcon
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
              class="flex flex-col list-decimal pr-4 py-6 pl-8 lg:!pl-10"
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
  <div v-if="props.item" class="flex w-full p-4 lg:px-6 lg:pb-4 gap-2">
    <AppBtn
      icon
      class="!w-[44px] !min-w-[44px] !h-full !bg-primary-2"
      :disabled="!hasChanges"
      @click="assignLastRouteData"
      :title="t('buttons.restore')"
    >
      <AppIcon icon="fa-solid fa-arrow-rotate-left" />
    </AppBtn>
    <AppBtn class="flex-1" :disabled="!hasChanges" @click="onSaveRoute">
      {{ t("buttons.save") }}
    </AppBtn>
  </div>

  <AppModalRoute
    v-model="modalRoute"
    @set-item="
      ($event) => {
        setItem($event);
        routeForm.name = $event.name;
      }
    "
  />
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

.btn-top {
  left: calc(50% - 24px);
}
</style>
