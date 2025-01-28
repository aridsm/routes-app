<script lang="tsx" setup>
const router = useRouter();
const route = useRoute();

interface Tab {
  id: string | number;
  text: string;
  route?: string;
}

const props = defineProps({
  tabs: {
    type: Object as PropType<Tab[]>,
    required: true,
  },
  navigate: Boolean,
});

const activeTab = defineModel({ required: true });

function onClickTab(tab: Tab) {
  activeTab.value = tab.id;
  if (tab.route) {
    router.push(tab.route);
  }
}

onMounted(() => {
  props.tabs.forEach((tab) => {
    if (tab.route === route.path) {
      activeTab.value = tab.id;
    }
  });
});
</script>

<template>
  <div class="flex gap-1 lg:gap-2 items-center">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      class="rounded-full px-4 lg:px-8 h-6 lg:h-7 pt-1 hover:bg-base-100 transition"
      :class="{
        'bg-primary-1 text-base-0 hover:!bg-primary-1 ': activeTab === tab.id,
      }"
      @click="onClickTab(tab)"
    >
      {{ tab.text }}
    </button>
  </div>
</template>

<style scoped></style>
