<script lang="tsx" setup>
import {
  useDraggable,
  useElementBounding,
  useMouseInElement,
} from "@vueuse/core";

const props = defineProps({
  destiny: {
    type: Object as PropType<Destiny>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const emits = defineEmits<{
  (name: "change", value: Partial<Destiny>): void;
  (name: "delete"): void;
}>();

const draggingIndex = defineModel<number>("draggingIndex", {
  required: true,
});
const hoveringIndex = defineModel<number>("hoveringIndex", {
  required: true,
});

const hoveringBound = defineModel<number>("hoveringBound", {
  required: true,
});

const { t } = useI18n();
const showItems = ref(false);
const searchResult = ref<any[]>([]);
const listItems = ref<HTMLDivElement>();
const loading = ref(false);
const modelValue = ref<Destiny>(props.destiny);
const rgLongitudeLatitude =
  /^(-?([1-8]?\d(\.\d+)?|90(\.0+)?)),\s*(-?((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;

const btnDrag = useTemplateRef<HTMLButtonElement>("btnDrag");
const target = useTemplateRef<HTMLDivElement>("target");

const { isOutside } = useMouseInElement(target);

const { top, height } = useElementBounding(target);
const boundTop = ref(top.value);
const positionY = ref();

const { isDragging } = useDraggable(btnDrag, {
  onStart() {
    boundTop.value = top.value;
    draggingIndex.value = props.index;
    hoveringIndex.value = -1;
  },
  onMove({ y }) {
    positionY.value = y - boundTop.value;
  },
  onEnd() {
    draggingIndex.value = -1;
  },
});

watch(
  () => isOutside.value,
  () => {
    if (!isOutside.value) {
      hoveringIndex.value = props.index;
      hoveringBound.value = top.value;
    }
  }
);

const styles = computed(
  () =>
    isDragging.value && {
      opacity: 0.5,
      border: "2px dashed #745AC3",
    }
);

watch(
  () => props.destiny,
  () => {
    modelValue.value = props.destiny;
  }
);

watch(
  () => props.index,
  () => {
    boundTop.value = hoveringBound.value;
  }
);

onMounted(() => {
  window.addEventListener("click", onClickOutside);
});

onUnmounted(() => {
  window.removeEventListener("click", onClickOutside);
});

function onClickOutside(event: MouseEvent) {
  if (!event.target) return;

  if (
    event.target !== listItems.value &&
    !listItems.value?.contains(event.target as any)
  ) {
    showItems.value = false;
  }
}

async function onUpdateDestiny(value: string | undefined) {
  if (!value) return;

  modelValue.value.coords = [];
  if (!value.trim().length) {
    return;
  }

  if (rgLongitudeLatitude.test(value)) {
    const coords = value.split(", ").map((coord) => +coord);
    modelValue.value.coords = coords;
    return;
  }

  loading.value = true;

  await fetchGeocode(value)
    .then((result) => {
      searchResult.value = result.features;
      showItems.value = true;
    })
    .finally(() => {
      loading.value = false;
    });
}

function onSelectItem(item: any) {
  modelValue.value.value = item.properties.label;
  modelValue.value.coords = item.geometry.coordinates;
  showItems.value = false;
  emits("change", modelValue.value);
}
</script>

<template>
  <div
    ref="target"
    class="relative target transition rounded-md border-2 border-transparent flex items-center"
    :style="{
      top: `${isDragging ? positionY : 0}px`,
      ...styles,
    }"
  >
    <AppInputText
      v-model="modelValue.value"
      icon="fa-solid fa-location-dot"
      class="flex-1"
      :input-classes="modelValue.coords.length || loading ? 'pr-10' : ''"
      :placeholder="t('labels.location')"
      @debounce="onUpdateDestiny"
    >
      <template #before>
        <button
          ref="btnDrag"
          class="bg-base-200 w-full h-full pt-[6px] text-sm lg:text-base cursor-grab rounded-l-md"
        >
          <client-only>
            <font-awesome-icon icon="fa-solid fa-grip-vertical" />
          </client-only>
        </button>
      </template>
    </AppInputText>
    <div
      v-if="loading"
      class="absolute right-3 top-3 lg:top-[14px] border-2 border-primary-1 border-t-transparent animate-spin w-4 h-4 rounded-full"
    />
    <div
      v-else-if="modelValue.coords.length"
      class="tooltip absolute right-3 top-[6px] lg:top-2 w-7 h-7 text-sm lg:text-base rounded-full bg-base-100 hover:bg-base-200 flex items-center justify-center"
      :content="modelValue.coords.join(', ')"
      :aria-label="modelValue.coords.join(', ')"
    >
      <client-only>
        <font-awesome-icon icon="fa-solid fa-map-pin" />
      </client-only>
    </div>

    <button
      v-if="index >= 2"
      class="w-9 h-9 ml-2 rounded-full hover:bg-base-100 text-base flex items-center justify-center"
      :title="t('buttons.delete')"
      @click="emits('delete')"
    >
      <font-awesome-icon icon="fa-regular fa-trash-can" />
    </button>

    <div
      v-if="showItems"
      ref="listItems"
      class="bg-base-100 rounded-md absolute top-12 w-full z-50 max-h-72 overflow-auto"
    >
      <ul v-if="searchResult.length">
        <li
          v-for="item in searchResult"
          :key="item.properties.id"
          class="p-3 hover:bg-base-200 cursor-pointer"
          @click="() => onSelectItem(item)"
        >
          {{ item.properties.label }}
        </li>
      </ul>
      <p v-else class="p-3">{{ t("labels.noResults") }}</p>
    </div>
  </div>
</template>

<style scoped>
.target {
  touch-action: none;
}
</style>
