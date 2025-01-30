<script lang="tsx" setup>
const props = defineProps({
  destiny: {
    type: Object as PropType<Destiny>,
    required: true,
  },
});

const emits = defineEmits<{
  (name: "change", value: Partial<Destiny>): void;
}>();

const { t } = useI18n();
const showItems = ref(false);
const searchResult = ref<any[]>([]);
const listItems = ref<HTMLDivElement>();
const loading = ref(false);
const modelValue = ref<Destiny>(props.destiny);
const rgLongitudeLatitude =
  /^(-?([1-8]?\d(\.\d+)?|90(\.0+)?)),\s*(-?((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;

watch(
  () => props.destiny,
  () => {
    modelValue.value = props.destiny;
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
  <div class="relative">
    <AppInputText
      v-model="modelValue.value"
      icon="fa-solid fa-location-dot"
      drag
      :placeholder="t('labels.location')"
      @debounce="onUpdateDestiny"
    />
    <div
      v-if="loading"
      class="absolute right-3 top-[14px] border-2 border-primary-1 border-t-transparent animate-spin w-4 h-4 rounded-full"
    />
    <div
      v-else-if="modelValue.coords.length"
      class="tooltip absolute right-3 top-[6px] lg:top-2 w-7 h-7 text-sm lg:text-base rounded-full hover:bg-base-200 flex items-center justify-center"
      :content="modelValue.coords.join(', ')"
      :aria-label="modelValue.coords.join(', ')"
    >
      <client-only>
        <font-awesome-icon icon="fa-solid fa-map-pin" />
      </client-only>
    </div>
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
