<script lang="tsx" setup>
const activeTab = ref("navigate");

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
      <NuxtPage />
    </div>
    <div class="bg-base-300 flex-1 text-base-0">
      <header class="bg-primary-2 h-16 flex">
        <h1
          class="bg-primary-3 px-12 text-xl tracking-wider font-bold flex items-center"
        >
          LOGO
        </h1>
        <div class="px-8 flex items-center">
          <p>Insira pelo menos duas localizações para calcular o percurso</p>
        </div>
      </header>
    </div>
  </div>
</template>
