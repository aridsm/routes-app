<script lang="tsx" setup>
import type { CircleMarker, LatLngExpression, Layer, Map } from "leaflet";
import type Leaflet from "leaflet";

const L = inject("L");

const activeTab = ref("navigate");

const windowLoaded = computed(() => typeof window !== "undefined");

const map = ref<Map>();

const polylines = ref<Layer>();
const circlePoints = ref<CircleMarker[]>([]);
const summary = ref<Summary>();

onMounted(() => {
  loadMap();
});

async function loadMap() {
  const coords: {
    longitude: number;
    latitude: number;
  } = await getUserPosition();

  map.value = (L as typeof Leaflet)
    .map("map")
    .setView([coords.latitude, coords.longitude], 13);

  map.value?.on("click", (e) => {});

  (L as typeof Leaflet)
    .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    })
    .addTo(map.value);
}

const tabs = [
  {
    id: "navigate",
    text: "Navegar",
    route: "/",
  },
  {
    id: "routes",
    text: "Suas rotas",
    route: "/routes",
  },
];

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
    const point = (L as typeof Leaflet)
      .circleMarker(coord, {
        radius: 15,
        color: "#4CC285",
      })
      .addTo(map.value!);

    point.bindTooltip(destinies[i].value, {
      permanent: false,
      direction: "top",
      opacity: 0.8,
      className: "point-tooltip",
    });

    circlePoints.value.push(point);
    markers.push(coord);
  }

  map.value!.fitBounds((L as typeof Leaflet).latLngBounds(markers));
}

function drawPolyline(coords: LatLngExpression[]) {
  if (polylines.value) {
    map.value?.removeLayer(polylines.value);
  }

  polylines.value = new (L as typeof Leaflet).Polyline(coords, {
    color: "#745AC3",
    weight: 5,
  }).addTo(map.value!);
}
</script>

<template>
  <div class="flex flex-1 h-full">
    <div class="w-[33rem] flex flex-col">
      <div class="p-6 flex justify-between items-center">
        <AppTabs v-model="activeTab" :tabs="tabs" />
        <button class="flex items-center gap-2">
          pt-BR
          <font-awesome-icon
            icon="fa-solid fa-language"
            class="ml-1 -mt-1 text-xl"
          />
        </button>
      </div>
      <NuxtPage
        @set-polyline="(coords) => drawPolyline(coords)"
        @set-points="(points, destinies) => drawPoints(points, destinies)"
        @set-summary="($event) => (summary = $event)"
      />
    </div>
    <div class="bg-base-300 flex-1 text-base-0 flex flex-col">
      <header class="bg-primary-2 h-16 flex">
        <h1
          class="bg-primary-3 px-12 text-xl tracking-wider font-bold flex items-center"
        >
          LOGO
        </h1>
        <div class="px-8 flex items-center w-full">
          <p v-if="!polylines">
            Insira pelo menos duas localizações para calcular o percurso
          </p>
          <div
            v-if="summary"
            class="flex gap-4 items-center justify-between flex-1"
          >
            <div class="flex gap-4">
              <div class="flex gap-3">
                <font-awesome-icon icon="fa-solid fa-car-side" />
                {{ convertMetersToKm(summary?.distance) }} km
              </div>
              |
              <div class="flex gap-3">
                <font-awesome-icon icon="fa-regular fa-clock" />
                {{ convertTime(summary?.duration) }}
              </div>
            </div>

            <div class="flex gap-1 items-center">
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
                title="Meu GitHub"
              >
                <font-awesome-icon icon="fa-brands fa-github" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <div v-if="windowLoaded" id="map" class="flex-1 min-h-0 h-full"></div>
    </div>
  </div>
</template>

<style>
.point-tooltip {
  background: #f6f6f6;
  font-family: "Manjari", serif;
}
</style>
