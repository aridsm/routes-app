<script lang="tsx" setup>
import { useDraggable } from "@vueuse/core";
import type { CircleMarker, LatLngExpression, Layer, Map } from "leaflet";
import type Leaflet from "leaflet";

const L = inject<typeof Leaflet>("L")!;

const activeTab = ref("navigate");

const map = ref<Map>();
const { setLocale, locale, t } = useI18n();

const polylines = ref<Layer>();
const circlePoints = ref<CircleMarker[]>([]);
const loading = ref(true);

onMounted(async () => {
  loading.value = true;
  await loadMap();
  onCheckScreenWidth();
  window.addEventListener("resize", onCheckScreenWidth);
  loading.value = false;
});

async function loadMap() {
  map.value = L.map("map").setView([-14.235, -35], 4);

  map.value?.on("dragend", () => {
    map.value?.fitBounds(map.value.getBounds());
  });

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

const btnDrag = useTemplateRef("btnDrag");
const formShown = ref(false);
const largeScreen = ref(true);
const posY = ref(0);
const initialTop = 128;

function openForm() {
  formShown.value = true;
}

const { y, isDragging } = useDraggable(btnDrag, {
  onMove(position) {
    posY.value = position.y;
  },
  onEnd(position) {
    if (position.y - initialTop > 140) {
      formShown.value = false;
    }
    posY.value = 0;
  },
});

function onCheckScreenWidth() {
  if (window.innerWidth >= 1024) {
    largeScreen.value = true;
  } else {
    largeScreen.value = false;
  }
}

const styles = computed(() => {
  if (formShown.value && !largeScreen.value) {
    return isDragging.value && posY.value > initialTop
      ? {
          top: `${posY.value}px`,
        }
      : {
          top: `${initialTop}px`,
          transition: "all 0.2s ease",
        };
  } else if (largeScreen.value) {
    return {
      top: 0,
    };
  }

  return {
    transition: "all 0.2s ease",
    top: "100%",
  };
});
</script>

<template>
  <div class="flex flex-1 overflow-hidden min-h-0 relative">
    <div
      v-if="!loading"
      class="w-screen rounded-t-2xl container-form pb-32 lg:pb-0 z-[9999] absolute bg-base-0 h-full lg:relative lg:!translate-y-0 lg:w-[33rem] flex flex-col"
      :style="styles"
    >
      <button
        ref="btnDrag"
        :aria-label="t('buttons.openForm')"
        class="h-9 lg:hidden w-full cursor-grab flex justify-center items-center"
      >
        <div class="w-7 h-1 bg-base-200 rounded-lg mx-a" />
      </button>
      <div class="px-4 pb-4 pt-1 lg:p-6 flex justify-between items-center">
        <AppTabs v-model="activeTab" :tabs="tabs" />
        <AppOptions :options="options" v-slot="{ open }">
          <button class="flex items-center gap-2" @click="open">
            {{ locale === "pt" ? "pt-BR" : "en-US" }}

            <AppIcon icon="fa-solid fa-language" class="ml-1 -mt-1 text-xl" />
          </button>
        </AppOptions>
      </div>
      <NuxtPage
        @set-polyline="(coords) => drawPolyline(coords)"
        @set-points="(points, destinies) => drawPoints(points, destinies)"
      />
    </div>
    <div class="bg-base-300 relative flex-1 flex flex-col pb-0">
      <button
        v-if="!loading"
        class="absolute right-4 bg-base-300/[.5] text-base-0 bottom-8 z-[999] w-12 h-12 flex lg:hidden items-center justify-center text-lg rounded-full"
        @click="openForm"
        :aria-label="t('buttons.drag')"
      >
        <AppIcon icon="fa-solid fa-map-location-dot" />
      </button>

      <AppOptions
        v-if="!loading"
        :options="menuOptions"
        class="ml-auto !absolute top-4 right-4 z-[9999] bg-base-0 rounded-full"
      />

      <div
        id="map"
        class="flex-1 min-h-0 bg-base-100 flex items-center justify-center"
      >
        <AppLoading v-if="loading" class="text-base-300" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.point-tooltip {
  background: #f6f6f6;
  font-family: "Manjari", serif;
}

.container-form {
  box-shadow: 0 -5px 20px rgb(69, 73, 112, 0.06);
  touch-action: none;
}
</style>
