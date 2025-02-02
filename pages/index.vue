<script lang="tsx" setup>
import type { CircleMarker, LatLngExpression, Layer, Map } from "leaflet";
import type Leaflet from "leaflet";

const L = inject<typeof Leaflet>("L")!;

const activeTab = ref("navigate");

const map = ref<Map>();
const { setLocale, locale, t } = useI18n();

const polylines = ref<Layer>();
const circlePoints = ref<CircleMarker[]>([]);
const summary = ref<Summary>();
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  await loadMap();
  loading.value = false;
});

async function loadMap() {
  try {
    const coords: {
      longitude: number;
      latitude: number;
    } = await getUserPosition();
    map.value = L.map("map").setView([coords.latitude, coords.longitude], 13);
  } catch (err: any) {
    map.value = L.map("map").setView([-14.235, -50], 4);
  }

  map.value?.on("dragend", () => {
    map.value?.fitBounds(map.value.getBounds());
  });

  // map.value?.on("click", (e) => {});

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map.value);
}

const tabs = computed(() => [
  {
    id: "navigate",
    text: t("tabs.navigate"),
    route: "/",
  },
  {
    id: "routes",
    text: t("tabs.savedRoutes"),
    route: "/routes",
  },
]);

function drawPoints(points: number[][], destinies: Destiny[]) {
  circlePoints.value?.forEach((point: any) => {
    map.value?.removeLayer(point);
  });

  const markers: LatLngExpression[] = [];

  for (let i = 0; i < points.length; i++) {
    const coord = {
      lat: points[i][1],
      lng: points[i][0],
    };
    const point = L.circleMarker(coord, {
      radius: 15,
      color: "#4CC285",
    }).addTo(map.value!);

    point.bindTooltip(destinies[i].value, {
      permanent: false,
      direction: "top",
      opacity: 0.8,
      className: "point-tooltip",
    });

    circlePoints.value.push(point);
    markers.push(coord);
  }

  map.value!.fitBounds(L.latLngBounds(markers));
}

function drawPolyline(coords: LatLngExpression[]) {
  if (polylines.value) {
    map.value?.removeLayer(polylines.value);
  }

  polylines.value = new L.Polyline(coords, {
    color: "#745AC3",
    weight: 5,
  }).addTo(map.value!);
}

const options = [
  {
    text: "Português",
    click: () => {
      setLocale("pt");
    },
  },
  {
    text: "English",
    click: () => {
      setLocale("en");
    },
  },
];

const menuOptions = [
  {
    text: "Leaflet",
    click: () => {
      window.open("https://leafletjs.com/", "_blank");
    },
  },
  {
    text: "OpenRouteService",
    click: () => {
      window.open("https://openrouteservice.org/", "_blank");
    },
  },
  {
    text: "GitHub",
    icon: "fa-brands fa-github",
    click: () => {
      window.open("https://github.com/aridsm", "_blank");
    },
  },
];

const formShown = ref(true);
function toggleShowForm() {
  formShown.value = !formShown.value;
}
</script>

<template>
  <div class="flex flex-1 overflow-hidden min-h-0 relative">
    <div
      class="w-screen transition top-0 z-[9999] absolute bg-base-0 h-full lg:relative lg:!translate-y-0 lg:w-[33rem] flex flex-col"
      :class="{
        'form-hidden': formShown,
      }"
    >
      <button class="h-9 lg:hidden w-full" @click="toggleShowForm">
        <client-only>
          <font-awesome-icon
            icon="fa-solid fa-chevron-up"
            class="transition"
            :class="{ 'rotate-180': !formShown }"
          />
        </client-only>
      </button>
      <div class="px-4 pb-4 pt-1 lg:p-6 flex justify-between items-center">
        <AppTabs v-model="activeTab" :tabs="tabs" />
        <AppOptions :options="options" v-slot="{ open }">
          <button class="flex items-center gap-2" @click="open">
            {{ locale === "pt" ? "pt-BR" : "en-US" }}

            <client-only>
              <font-awesome-icon
                icon="fa-solid fa-language"
                class="ml-1 -mt-1 text-xl"
              />
            </client-only>
          </button>
        </AppOptions>
      </div>
      <NuxtPage
        @set-polyline="(coords) => drawPolyline(coords)"
        @set-points="(points, destinies) => drawPoints(points, destinies)"
        @set-summary="($event) => (summary = $event)"
      />
    </div>
    <div class="bg-base-300 flex-1 text-base-0 flex flex-col pb-9 lg:pb-0">
      <header class="bg-primary-2 h-12 lg:h-16 flex">
        <h1
          class="bg-primary-3 px-4 lg:px-12 pt-1 text-sm lg:text-xl tracking-wider font-bold flex items-center"
        >
          LOGO
        </h1>
        <div class="px-4 lg:px-8 flex items-center w-full justify-between">
          <p
            v-if="!polylines"
            class="mr-auto flex-1 pt-1 sm:pt-0 text-xs lg:text-base"
          >
            {{ t("header.insert") }}
          </p>

          <div v-if="summary" class="flex gap-4 items-center">
            <div class="flex gap-3 items-center">
              <font-awesome-icon icon="fa-solid fa-car-side" />
              <span class="pt-1">
                {{ convertMetersToKm(summary?.distance) }} km
              </span>
            </div>
            <div class="w-[2px] h-6 bg-primary-3" />
            <div class="flex gap-3 items-center">
              <font-awesome-icon icon="fa-regular fa-clock" />
              <span class="pt-1">
                {{ convertTime(summary?.duration) }}
              </span>
            </div>
          </div>

          <AppOptions :options="menuOptions" class="ml-2 2xl:hidden" />

          <div class="hidden 2xl:flex items-center">
            <a
              href="https://leafletjs.com/"
              target="_blank"
              class="hover:bg-primary-3 rounded-full pt-1 px-6 transition"
            >
              Leaflet
            </a>
            <a
              href="https://openrouteservice.org/"
              target="_blank"
              class="hover:bg-primary-3 rounded-full pt-1 px-6 transition"
            >
              OpenRouteService
            </a>
            <a
              href="https://github.com/aridsm"
              target="_blank"
              class="p-1 mt-1 text-xl ml-2"
              :title="t('labels.myGithub')"
            >
              <font-awesome-icon icon="fa-brands fa-github" />
            </a>
          </div>
        </div>
      </header>

      <div
        id="map"
        class="flex-1 min-h-0 bg-base-100 flex items-center justify-center"
      >
        <AppLoading v-if="loading" class="text-base-300" />
        <div class="flex flex-col"></div>
      </div>
    </div>
  </div>
</template>

<style>
.point-tooltip {
  background: #f6f6f6;
  font-family: "Manjari", serif;
}

.form-hidden {
  transform: translateY(calc(100svh - 36px));
}
</style>
