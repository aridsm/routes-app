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

async function onClickTab(tab: Tab) {
  /* if (tab.route) {
    await router.push(tab.route).then((e) => {
      if (e?.name !== "Error") activeTab.value = tab.id;
    });
  } else {
    activeTab.value = tab.id;
  }
    */
  router.push(tab.route!);
  activeTab.value = tab.id;
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
      class="rounded-full px-4 lg:px-8 h-6 lg:h-7 pt-1 lg:hover:bg-base-100 transition"
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
